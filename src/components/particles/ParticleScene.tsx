"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { DESKTOP_MIN, FORM_META, LAYOUTS, type Stop } from "./config";
import { buildEdges, buildShape, rng, type FormId, type Shape } from "./shapes";
import { shaders } from "./shaders";
import { particleState } from "./state";
import { escenariosVisibles } from "@/content/estrategia";

// Altura relativa de las columnas (forma 3): sale del primer escenario del comparativo.
const first = escenariosVisibles[0];
const COLUMN_RATIO = first ? first.con.isrAnual! / first.sin.isrAnual! : 0.25;

type Props = { count: number; mobile: boolean };

/** Un solo canvas WebGL fijo detrás de toda la página. */
export default function ParticleScene({ count, mobile }: Props) {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 6], near: 0.1, far: 60 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Particles count={count} mobile={mobile} />
    </Canvas>
  );
}

const sameForms = (a: Stop, b: Stop) => a.form === b.form;
const sameStop = (a: Stop, b: Stop) => a.form === b.form && a.layout === b.layout;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;
const tmp = new THREE.Vector3();

/** Partículas que forman la red de líneas (las primeras M del arreglo permutado). */
const linkCount = (count: number, mobile: boolean) => Math.min(count, mobile ? 520 : 1400);
const EDGES_PER = 2;

function makeLineGeometry(maxSegments: number) {
  const g = new THREE.BufferGeometry();
  const verts = maxSegments * 2;
  const dyn = (n: number) =>
    new THREE.BufferAttribute(new Float32Array(verts * n), n).setUsage(THREE.DynamicDrawUsage);
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts * 3), 3));
  g.setAttribute("aFrom", dyn(3));
  g.setAttribute("aTo", dyn(3));
  g.setAttribute("aRandom", dyn(4));
  g.setAttribute("aOrder", dyn(1));
  g.setDrawRange(0, 0);
  return g;
}

function Particles({ count, mobile }: Props) {
  const group = useRef<THREE.Group>(null);
  const shapes = useRef(new Map<FormId, Shape>());
  const applied = useRef<{ from: Stop; to: Stop } | null>(null);
  const smooth = useRef(0);
  const pointer = useRef({ x: 0, y: 0, on: false, sx: 0, sy: 0 });
  const fps = useRef({ frames: 0, time: 0, warm: 0, reduced: false });
  const scroll = useRef({ y: 0, last: 0, v: 0 });
  const ripple = useRef({ x: 0, y: 0, t: 99, pending: false, nx: 0, ny: 0 });
  const M = linkCount(count, mobile);

  const shape = (form: FormId) => {
    let s = shapes.current.get(form);
    if (!s) {
      s = buildShape(form, count, { columnRatio: COLUMN_RATIO });
      shapes.current.set(form, s);
    }
    return s;
  };

  const random = useMemo(() => {
    const r = rng(2024);
    const arr = new Float32Array(count * 4);
    for (let i = 0; i < arr.length; i++) arr[i] = r();
    return arr;
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const dyn = (n: number) =>
      new THREE.BufferAttribute(new Float32Array(count * n), n).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aFrom", dyn(3));
    g.setAttribute("aTo", dyn(3));
    g.setAttribute("aColorFrom", dyn(3));
    g.setAttribute("aColorTo", dyn(3));
    g.setAttribute("aRandom", new THREE.BufferAttribute(random, 4));
    g.setAttribute("aOrder", dyn(1));
    return g;
  }, [count, random]);

  // Halo: comparte los atributos de los puntos pero dibuja solo una muestra (30%),
  // porque cada halo es grande y el costo de relleno manda.
  const haloGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    for (const [name, attr] of Object.entries(geometry.attributes)) g.setAttribute(name, attr);
    g.setDrawRange(0, Math.floor(count * 0.3));
    return g;
  }, [geometry, count]);

  const lineGeoms = useMemo(
    () => ({ from: makeLineGeometry(M * EDGES_PER), to: makeLineGeometry(M * EDGES_PER) }),
    [M],
  );

  // Uniforms compartidos por puntos, halo y líneas (mismo objeto = mismo valor).
  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: mobile ? 32 : 26 },
      uPixelRatio: { value: 1 },
      uNoise: { value: 1 },
      uDrift: { value: 0 },
      uIntro: { value: 0 },
      uAlpha: { value: 1 },
      uVelocity: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uPointerOn: { value: 0 },
      uRipple: { value: new THREE.Vector4(0, 0, 0, 99) },
    }),
    [mobile],
  );

  const materials = useMemo(() => {
    const base = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
    return {
      points: new THREE.ShaderMaterial({
        ...base,
        ...shaders.points,
        uniforms: { ...uniforms, uSizeMul: { value: 1 }, uAlphaMul: { value: 1 } },
      }),
      // Halo solo en desktop: duplica el costo de relleno y en móvil no vale la pena.
      halo: mobile
        ? null
        : new THREE.ShaderMaterial({
            ...base,
            ...shaders.halo,
            uniforms: { ...uniforms, uSizeMul: { value: 3.4 }, uAlphaMul: { value: 0.1 } },
          }),
      linesFrom: new THREE.ShaderMaterial({
        ...base,
        ...shaders.lines,
        uniforms: { ...uniforms, uLineAlpha: { value: 0 } },
      }),
      linesTo: new THREE.ShaderMaterial({
        ...base,
        ...shaders.lines,
        uniforms: { ...uniforms, uLineAlpha: { value: 0 } },
      }),
    };
  }, [uniforms, mobile]);

  useEffect(
    () => () => {
      geometry.dispose();
      haloGeometry.dispose();
      lineGeoms.from.dispose();
      lineGeoms.to.dispose();
      Object.values(materials).forEach((m) => m?.dispose());
    },
    [geometry, haloGeometry, lineGeoms, materials],
  );

  // Precalcula formas y redes en tiempo ocioso (una por callback) para que el
  // scroll no tenga picos al cambiar de sección.
  useEffect(() => {
    const pendientes: FormId[] = [6, 1, 2, 3, 4, 5];
    let id = 0;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const paso = () => {
      const form = pendientes.shift();
      if (form === undefined) return;
      const s = shapes.current.get(form) ?? buildShape(form, count, { columnRatio: COLUMN_RATIO });
      shapes.current.set(form, s);
      buildEdges(form, s, M, EDGES_PER, FORM_META[form].lineRadius);
      id = idle(paso) as number;
    };
    const start = window.setTimeout(() => (id = idle(paso) as number), 2200);
    return () => {
      window.clearTimeout(start);
      cancel(id);
    };
  }, [count, M]);

  // Entrada: un remolino de partículas que converge en la balanza (1.8 s).
  useEffect(() => {
    const tween = gsap.to(particleState, { intro: 1, duration: 1.8, ease: "expo.out", delay: 0.1 });
    return () => {
      tween.kill();
    };
  }, []);

  // Posición de scroll desde el evento (leer scrollY dentro del cuadro forzaría un
  // layout síncrono justo después de que GSAP cambió estilos).
  useEffect(() => {
    const onScroll = () => {
      scroll.current.y = window.scrollY;
    };
    onScroll();
    scroll.current.last = scroll.current.y;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Puntero (desktop) y toque/clic (todos): repulsión y onda expansiva.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (!fine || e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.on = true;
    };
    const onLeave = () => (pointer.current.on = false);
    const onDown = (e: PointerEvent) => {
      ripple.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      ripple.current.ny = -(e.clientY / window.innerHeight) * 2 + 1;
      ripple.current.pending = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /** Proyecta coordenadas NDC al plano z = 0. */
  const toPlane = (cam: THREE.Camera, nx: number, ny: number, out: THREE.Vector3) => {
    tmp.set(nx, ny, 0.5).unproject(cam).sub(cam.position).normalize();
    return out.copy(cam.position).addScaledVector(tmp, -cam.position.z / tmp.z);
  };

  /** Reescribe una geometría de líneas con las aristas de una forma. */
  const writeLines = (g: THREE.BufferGeometry, edges: Uint32Array, a: Shape, b: Shape) => {
    const from = g.getAttribute("aFrom") as THREE.BufferAttribute;
    const to = g.getAttribute("aTo") as THREE.BufferAttribute;
    const rnd = g.getAttribute("aRandom") as THREE.BufferAttribute;
    const ord = g.getAttribute("aOrder") as THREE.BufferAttribute;
    const fa = from.array as Float32Array;
    const ta = to.array as Float32Array;
    const ra = rnd.array as Float32Array;
    const oa = ord.array as Float32Array;
    const n = Math.min(edges.length, fa.length / 3);
    for (let v = 0; v < n; v++) {
      const i = edges[v];
      fa.set(a.positions.subarray(i * 3, i * 3 + 3), v * 3);
      ta.set(b.positions.subarray(i * 3, i * 3 + 3), v * 3);
      ra.set(random.subarray(i * 4, i * 4 + 4), v * 4);
      oa[v] = b.order[i];
    }
    from.needsUpdate = to.needsUpdate = rnd.needsUpdate = ord.needsUpdate = true;
    g.setDrawRange(0, n);
  };

  useFrame((state, rawDt) => {
    const obj = group.current;
    if (!obj) return;
    // Todo se toma del grafo de escena (no de los useMemo) para poder mutarlo aquí.
    const puntos = obj.getObjectByName("puntos") as THREE.Points;
    const halo = obj.getObjectByName("halo") as THREE.Points | undefined;
    const lineasDesde = obj.getObjectByName("lineas-desde") as THREE.LineSegments;
    const lineasHacia = obj.getObjectByName("lineas-hacia") as THREE.LineSegments;
    const geom = puntos.geometry;
    const u = (puntos.material as THREE.ShaderMaterial).uniforms;
    const { camera, size } = state;
    const cam = camera as THREE.PerspectiveCamera;
    const dt = Math.min(rawDt, 0.1);
    const st = particleState;

    // Cambio de tramo: se reescriben aFrom/aTo de puntos y líneas.
    const prev = applied.current;
    if (!prev || !sameStop(prev.from, st.from) || !sameStop(prev.to, st.to)) {
      if (!prev || !sameForms(prev.from, st.from) || !sameForms(prev.to, st.to)) {
        const a = shape(st.from.form);
        const b = shape(st.to.form);
        const set = (name: string, data: Float32Array) => {
          const attr = geom.getAttribute(name) as THREE.BufferAttribute;
          (attr.array as Float32Array).set(data);
          attr.needsUpdate = true;
        };
        set("aFrom", a.positions);
        set("aTo", b.positions);
        set("aColorFrom", a.colors);
        set("aColorTo", b.colors);
        set("aOrder", b.order);
        const ma = FORM_META[st.from.form];
        const mb = FORM_META[st.to.form];
        writeLines(lineasDesde.geometry, buildEdges(st.from.form, a, M, EDGES_PER, ma.lineRadius), a, b);
        writeLines(lineasHacia.geometry, buildEdges(st.to.form, b, M, EDGES_PER, mb.lineRadius), a, b);
      }
      if (prev && sameStop(st.from, prev.to)) smooth.current = 0;
      else if (prev && sameStop(st.to, prev.from)) smooth.current = 1;
      else smooth.current = st.progress;
      applied.current = { from: st.from, to: st.to };
    }

    // Equivalente a scrub: 1.
    smooth.current += (st.progress - smooth.current) * (1 - Math.exp(-dt * 5));
    const t = smooth.current;
    const e = t * t * (3 - 2 * t);

    const mf = FORM_META[st.from.form];
    const mt = FORM_META[st.to.form];
    u.uProgress.value = t;
    u.uTime.value = state.clock.elapsedTime;
    u.uNoise.value = st.noise;
    u.uIntro.value = st.intro;
    u.uDrift.value = lerp(mf.drift, mt.drift, e);
    u.uAlpha.value = lerp(mf.alpha, mt.alpha, e);
    u.uPixelRatio.value = state.gl.getPixelRatio();
    (lineasDesde.material as THREE.ShaderMaterial).uniforms.uLineAlpha.value = mf.lineAlpha * (1 - THREE.MathUtils.smoothstep(t, 0, 0.35));
    (lineasHacia.material as THREE.ShaderMaterial).uniforms.uLineAlpha.value = mt.lineAlpha * THREE.MathUtils.smoothstep(t, 0.65, 1);

    // Velocidad de scroll: las partículas se sueltan un poco al hacer scroll rápido.
    const y = scroll.current.y;
    const vRaw = THREE.MathUtils.clamp((y - scroll.current.last) / Math.max(dt, 0.001) / 2600, -1, 1);
    scroll.current.last = y;
    scroll.current.v += (vRaw - scroll.current.v) * (1 - Math.exp(-dt * 6));
    u.uVelocity.value = scroll.current.v;

    // Encuadre: cada parada tiene su lugar en pantalla; se interpola con el tramo.
    const desktop = size.width >= DESKTOP_MIN;
    const place = (stop: Stop) => {
      const L = LAYOUTS[stop.layout][desktop ? "desktop" : "mobile"];
      const m = FORM_META[stop.form];
      const rot = desktop ? 0 : (m.mobileRotZ ?? 0);
      const [mw, mh] = rot ? [m.height, m.width] : [m.width, m.height];
      const visH = 2 * L.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
      const visW = visH * (size.width / size.height);
      const s = Math.min((L.w * visW) / mw, (L.h * visH) / mh);
      return { x: L.cx * visW, y: L.cy * visH, s, z: L.z, rot };
    };
    const pf = place(st.from);
    const pt = place(st.to);

    // Cámara: dolly por sección + parallax suave (puntero en desktop, vaivén en móvil).
    const p = pointer.current;
    const targetX = p.on ? p.x * 0.22 : Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    const targetY = p.on ? p.y * 0.14 : Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    p.sx += (targetX - p.sx) * (1 - Math.exp(-dt * 3));
    p.sy += (targetY - p.sy) * (1 - Math.exp(-dt * 3));
    cam.position.set(p.sx, p.sy, lerp(pf.z, pt.z, e));
    cam.lookAt(0, 0, 0);

    obj.position.set(lerp(pf.x, pt.x, e), lerp(pf.y, pt.y, e), 0);
    obj.scale.setScalar(lerp(pf.s, pt.s, e));
    obj.rotation.z = lerp(pf.rot, pt.rot, e);

    // Las balanzas giran lento; las demás formas regresan de frente.
    const spin = lerp(mf.spin, mt.spin, e);
    obj.rotation.y += dt * 0.22 * spin;
    if (spin < 1) {
      const target = Math.round(obj.rotation.y / TAU) * TAU;
      obj.rotation.y = lerp(obj.rotation.y, target, (1 - spin) * Math.min(1, dt * 2.5));
    }

    // Puntero en el plano z = 0.
    if (p.on && desktop) {
      toPlane(cam, p.x, p.y, u.uPointer.value);
      u.uPointerOn.value = 1;
    } else u.uPointerOn.value = 0;

    // Onda expansiva.
    const r = ripple.current;
    if (r.pending) {
      r.pending = false;
      toPlane(cam, r.nx, r.ny, tmp);
      u.uRipple.value.set(tmp.x, tmp.y, 0, 0);
      r.t = 0;
    }
    if (r.t < 99) {
      r.t += dt;
      u.uRipple.value.w = r.t;
      if (r.t > 2) r.t = 99;
    }

    // Si el promedio de 2 s baja de 40 fps: la mitad de partículas y sin halo (una sola vez).
    const f = fps.current;
    f.warm += rawDt;
    if (f.warm > 2.5) {
      f.frames++;
      f.time += rawDt;
      if (f.time >= 2) {
        const avg = f.frames / f.time;
        (window as unknown as { __particlesFps?: number }).__particlesFps = avg;
        if (avg < 40 && !f.reduced) {
          f.reduced = true;
          geom.setDrawRange(0, Math.floor(count / 2));
          if (halo) halo.visible = false;
        }
        f.frames = 0;
        f.time = 0;
      }
    }
  });

  return (
    <group ref={group}>
      {materials.halo && (
        <points name="halo" geometry={haloGeometry} material={materials.halo} frustumCulled={false} />
      )}
      <lineSegments name="lineas-desde" geometry={lineGeoms.from} material={materials.linesFrom} frustumCulled={false} />
      <lineSegments name="lineas-hacia" geometry={lineGeoms.to} material={materials.linesTo} frustumCulled={false} />
      <points name="puntos" geometry={geometry} material={materials.points} frustumCulled={false} />
    </group>
  );
}
