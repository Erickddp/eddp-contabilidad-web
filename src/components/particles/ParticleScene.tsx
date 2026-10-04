"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { DESKTOP_MIN, FORM_META, LAYOUTS, type Stop } from "./config";
import { buildShape, rng, type FormId, type Shape } from "./shapes";
import { fragmentShader, vertexShader } from "./shaders";
import { particleState } from "./state";

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

function Particles({ count, mobile }: Props) {
  const points = useRef<THREE.Points>(null);
  const shapes = useRef(new Map<FormId, Shape>());
  const applied = useRef<{ from: Stop; to: Stop } | null>(null);
  const smooth = useRef(0);
  const pointer = useRef({ x: 0, y: 0, on: false });
  const fps = useRef({ frames: 0, time: 0, warm: 0, reduced: false });

  const shape = (form: FormId) => {
    let s = shapes.current.get(form);
    if (!s) {
      s = buildShape(form, count);
      shapes.current.set(form, s);
    }
    return s;
  };

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const random = rng(2024);
    const rand = new Float32Array(count * 4);
    for (let i = 0; i < rand.length; i++) rand[i] = random();
    const dyn = (n: number) =>
      new THREE.BufferAttribute(new Float32Array(count * n), n).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aFrom", dyn(3));
    g.setAttribute("aTo", dyn(3));
    g.setAttribute("aColorFrom", dyn(3));
    g.setAttribute("aColorTo", dyn(3));
    g.setAttribute("aRandom", new THREE.BufferAttribute(rand, 4));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: mobile ? 34 : 26 },
          uPixelRatio: { value: 1 },
          uNoise: { value: 1 },
          uDrift: { value: 0 },
          uIntro: { value: 0 },
          uAlpha: { value: 1 },
          uPointer: { value: new THREE.Vector3() },
          uPointerOn: { value: 0 },
        },
      }),
    [mobile],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  // Entrada: la balanza se forma desde partículas dispersas (1.4 s).
  useEffect(() => {
    const tween = gsap.to(particleState, { intro: 1, duration: 1.4, ease: "expo.out", delay: 0.1 });
    return () => {
      tween.kill();
    };
  }, []);

  // Puntero solo en desktop con mouse.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.on = true;
    };
    const onLeave = () => (pointer.current.on = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useFrame((state, rawDt) => {
    const obj = points.current;
    if (!obj) return;
    const geom = obj.geometry;
    const u = (obj.material as THREE.ShaderMaterial).uniforms;
    const { camera, size } = state;
    const dt = Math.min(rawDt, 0.1);
    const st = particleState;

    // Cambio de tramo: se reescriben aFrom/aTo.
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

    // Encuadre: cada parada tiene su lugar en pantalla; se interpola con el tramo.
    const desktop = size.width >= DESKTOP_MIN;
    const cam = camera as THREE.PerspectiveCamera;
    const place = (stop: Stop) => {
      const L = LAYOUTS[stop.layout][desktop ? "desktop" : "mobile"];
      const m = FORM_META[stop.form];
      const visH = 2 * L.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
      const visW = visH * (size.width / size.height);
      const s = Math.min((L.w * visW) / m.width, (L.h * visH) / m.height);
      return { x: L.cx * visW, y: L.cy * visH, s, z: L.z };
    };
    const pf = place(st.from);
    const pt = place(st.to);
    cam.position.z = lerp(pf.z, pt.z, e);
    obj.position.set(lerp(pf.x, pt.x, e), lerp(pf.y, pt.y, e), 0);
    obj.scale.setScalar(lerp(pf.s, pt.s, e));

    // Las balanzas giran lento; las demás formas regresan de frente.
    const spin = lerp(mf.spin, mt.spin, e);
    obj.rotation.y += dt * 0.22 * spin;
    if (spin < 1) {
      const target = Math.round(obj.rotation.y / TAU) * TAU;
      obj.rotation.y = lerp(obj.rotation.y, target, (1 - spin) * Math.min(1, dt * 2.5));
    }

    // Puntero en el plano z = 0.
    if (pointer.current.on && desktop) {
      tmp.set(pointer.current.x, pointer.current.y, 0.5).unproject(cam).sub(cam.position).normalize();
      const k = -cam.position.z / tmp.z;
      u.uPointer.value.copy(cam.position).addScaledVector(tmp, k);
      u.uPointerOn.value = 1;
    } else u.uPointerOn.value = 0;

    // Si el promedio de 2 s baja de 40 fps, la mitad de partículas (una sola vez).
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
        }
        f.frames = 0;
        f.time = 0;
      }
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
