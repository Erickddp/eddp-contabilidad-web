import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

/**
 * Formas de la balanza (morph targets). Toda la geometría se arma en código y se
 * muestrea con MeshSurfaceSampler. Todas las formas usan el mismo N y la misma
 * permutación, así cualquier prefijo del arreglo es una muestra al azar (sirve para
 * bajar partículas a la mitad con drawRange sin perder piezas).
 */

export type FormId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** order: 0→1 por partícula; decide quién llega primero al armar la forma. */
export type Shape = { positions: Float32Array; colors: Float32Array; order: Float32Array };

const CLARO = new THREE.Color("#F3F5F1");
const PLUMA = new THREE.Color("#3157E0");
const AMBAR = new THREE.Color("#F2A541");

/** PRNG determinista (mulberry32) para que las formas salgan iguales en cada carga. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sampler(geom: THREE.BufferGeometry, random: () => number) {
  const s = new MeshSurfaceSampler(new THREE.Mesh(geom));
  // Los tipos de @types/three aún no declaran setRandomGenerator (sí existe en three 0.186).
  (s as unknown as { setRandomGenerator: (f: () => number) => void }).setRandomGenerator(random);
  s.build();
  const v = new THREE.Vector3();
  return {
    sample: (): [number, number, number] => {
      s.sample(v);
      return [v.x, v.y, v.z];
    },
  };
}

/** Reparte N en partes según fracciones; el sobrante va a la última. */
function split(n: number, fractions: number[]): number[] {
  const counts = fractions.map((f) => Math.floor(n * f));
  counts[counts.length - 1] += n - counts.reduce((a, b) => a + b, 0);
  return counts;
}

/** Color base: claro con brillo pluma en una parte de las partículas. */
function tint(out: THREE.Color, random: () => number, plumaShare: number, accent?: THREE.Color) {
  out.copy(CLARO);
  if (accent) out.lerp(accent, 0.65 + random() * 0.35);
  else if (random() < plumaShare) out.lerp(PLUMA, 0.3 + random() * 0.3);
  return out;
}

// ─── Balanza ────────────────────────────────────────────────────────────────

const PIVOT = new THREE.Vector3(0, 1.05, 0);
const HALF_ARM = 1.55;
const HANG = 1.35;
const PAN_R = 0.55;
export const BALANCE_TILT = THREE.MathUtils.degToRad(12);

enum Part {
  Static,
  Arm,
  ChainL,
  ChainR,
  PanL,
  PanR,
  Heap,
}

type BalanceSample = { part: Part[]; data: Float32Array };

const balanceCache = new Map<number, BalanceSample>();

/** Muestra las piezas en su marco local una sola vez; luego se "posa" con cualquier inclinación. */
function sampleBalance(n: number): BalanceSample {
  const cached = balanceCache.get(n);
  if (cached) return cached;
  const random = rng(7);
  const [cBase, cCol, cArm, cChL, cChR, cPanL, cPanR, cHeap] = split(
    n,
    [0.13, 0.08, 0.11, 0.05, 0.05, 0.17, 0.2, 0.21],
  );
  const part: Part[] = [];
  const data = new Float32Array(n * 3);
  let i = 0;
  const push = (p: Part, x: number, y: number, z: number) => {
    part.push(p);
    data[i * 3] = x;
    data[i * 3 + 1] = y;
    data[i * 3 + 2] = z;
    i++;
  };

  const base = sampler(new THREE.CylinderGeometry(0.8, 0.95, 0.14, 48).translate(0, -1.55, 0), random);
  for (let k = 0; k < cBase; k++) push(Part.Static, ...base.sample());

  const colGeom = new THREE.CylinderGeometry(0.045, 0.07, 2.5, 16).translate(0, -0.25, 0);
  const col = sampler(colGeom, random);
  for (let k = 0; k < cCol; k++) push(Part.Static, ...col.sample());

  const arm = sampler(new THREE.BoxGeometry(HALF_ARM * 2 + 0.1, 0.06, 0.08), random);
  for (let k = 0; k < cArm; k++) push(Part.Arm, ...arm.sample());

  // Cadenas: 3 hilos por platillo, del extremo del brazo al borde del platillo.
  const chain = (p: Part, count: number) => {
    for (let k = 0; k < count; k++) {
      const strand = k % 3;
      const t = (Math.floor(k / 3) + random() * 0.4) / Math.ceil(count / 3);
      push(p, Math.min(t, 1), (strand / 3) * Math.PI * 2 + Math.PI / 2, 0);
    }
  };
  chain(Part.ChainL, cChL);
  chain(Part.ChainR, cChR);

  const pan = sampler(new THREE.CylinderGeometry(PAN_R, PAN_R * 0.75, 0.07, 40), random);
  for (let k = 0; k < cPanL; k++) push(Part.PanL, ...pan.sample());
  for (let k = 0; k < cPanR; k++) push(Part.PanR, ...pan.sample());

  // El peso de más: un montón sobre el platillo derecho.
  const heapGeom = new THREE.SphereGeometry(0.36, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.75, 1);
  const heap = sampler(heapGeom, random);
  for (let k = 0; k < cHeap; k++) {
    const [hx, hy, hz] = heap.sample();
    push(Part.Heap, hx, hy + 0.035, hz);
  }

  const sample = { part, data };
  balanceCache.set(n, sample);
  return sample;
}

/** Balanza con el brazo inclinado `tilt` radianes (positivo: baja el lado derecho). */
export function balanceShape(n: number, tilt: number, palette: "peso" | "calma"): Shape {
  const { part, data } = sampleBalance(n);
  const random = rng(palette === "peso" ? 11 : 13);
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  const order = new Float32Array(n);
  const cos = Math.cos(-tilt);
  const sin = Math.sin(-tilt);
  const end = (side: -1 | 1) =>
    new THREE.Vector3(PIVOT.x + side * HALF_ARM * cos, PIVOT.y + side * HALF_ARM * sin, 0);
  const endL = end(-1);
  const endR = end(1);
  const panL = endL.clone().setY(endL.y - HANG);
  const panR = endR.clone().setY(endR.y - HANG);
  const c = new THREE.Color();

  for (let i = 0; i < n; i++) {
    const x = data[i * 3];
    const y = data[i * 3 + 1];
    const z = data[i * 3 + 2];
    let px = x;
    let py = y;
    let pz = z;
    switch (part[i]) {
      case Part.Arm:
        px = PIVOT.x + x * cos - y * sin;
        py = PIVOT.y + x * sin + y * cos;
        break;
      case Part.ChainL:
      case Part.ChainR: {
        const e = part[i] === Part.ChainL ? endL : endR;
        const p = part[i] === Part.ChainL ? panL : panR;
        const rx = p.x + Math.cos(y) * PAN_R;
        const rz = Math.sin(y) * PAN_R;
        px = e.x + (rx - e.x) * x;
        py = e.y + (p.y - e.y) * x;
        pz = rz * x;
        break;
      }
      case Part.PanL:
        px = panL.x + x;
        py = panL.y + y;
        pz = z;
        break;
      case Part.PanR:
      case Part.Heap:
        px = panR.x + x;
        py = panR.y + y;
        pz = z;
        break;
    }
    positions[i * 3] = px;
    positions[i * 3 + 1] = py + 0.25; // centra la balanza en el origen
    positions[i * 3 + 2] = pz;
    order[i] = THREE.MathUtils.clamp((py + 1.7) / 3.2, 0, 1); // se arma de la base hacia arriba

    const heavy = part[i] === Part.Heap || part[i] === Part.PanR;
    if (palette === "peso") tint(c, random, 0.35, heavy && (part[i] === Part.Heap || random() < 0.5) ? AMBAR : undefined);
    else tint(c, random, 0.6);
    c.toArray(colors, i * 3);
  }
  return { positions, colors, order };
}

// ─── Permutación y forma completa ───────────────────────────────────────────

const permCache = new Map<number, Uint32Array>();
function permutation(n: number) {
  let p = permCache.get(n);
  if (p) return p;
  p = new Uint32Array(n);
  for (let i = 0; i < n; i++) p[i] = i;
  const random = rng(99);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  permCache.set(n, p);
  return p;
}

function permute(shape: Shape, n: number): Shape {
  const p = permutation(n);
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  const order = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const s = p[i] * 3;
    positions.set(shape.positions.subarray(s, s + 3), i * 3);
    colors.set(shape.colors.subarray(s, s + 3), i * 3);
    order[i] = shape.order[p[i]];
  }
  return { positions, colors, order };
}

/** Ayudante: llena posiciones, colores y orden con una función por partícula. */
function fill(
  n: number,
  seed: number,
  fn: (random: () => number, pos: THREE.Vector3, color: THREE.Color, i: number) => number | void,
): Shape {
  const random = rng(seed);
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  const order = new Float32Array(n);
  const pos = new THREE.Vector3();
  const color = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const o = fn(random, pos, color, i);
    pos.toArray(positions, i * 3);
    color.toArray(colors, i * 3);
    order[i] = typeof o === "number" ? o : random();
  }
  return { positions, colors, order };
}

// 1. Papeles en caos: ~60 hojas con posición y rotación al azar.
function papersShape(n: number): Shape {
  const random = rng(21);
  const SHEETS = 60;
  const sheets = Array.from({ length: SHEETS }, () => ({
    m: new THREE.Matrix4().compose(
      new THREE.Vector3(
        (random() - 0.5) * 7.6,
        (random() - 0.5) * 5.6,
        (random() - 0.5) * 3.5 - 0.3,
      ),
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(random() * Math.PI, random() * Math.PI, random() * Math.PI),
      ),
      new THREE.Vector3(1, 1, 1),
    ),
    amber: random() < 0.18,
  }));
  const W = 0.42;
  const H = 0.56;
  return fill(n, 22, (r, pos, color, i) => {
    const sheet = sheets[i % SHEETS];
    const kind = r();
    let u: number;
    let v: number;
    if (kind < 0.4) {
      // Borde de la hoja
      const t = r() * 2 * (W + H);
      if (t < W) [u, v] = [t, 0];
      else if (t < W + H) [u, v] = [W, t - W];
      else if (t < 2 * W + H) [u, v] = [t - W - H, H];
      else [u, v] = [0, t - 2 * W - H];
    } else if (kind < 0.8) {
      // Renglones de texto
      const line = Math.floor(r() * 5);
      u = 0.06 + r() * (W - 0.12) * (line === 4 ? 0.5 : 1);
      v = H - 0.1 - line * 0.09;
    } else [u, v] = [r() * W, r() * H];
    pos.set(u - W / 2, v - H / 2, 0).applyMatrix4(sheet.m);
    tint(color, r, 0.3, sheet.amber ? AMBAR : undefined);
  });
}

// 2. Libro ordenado: hoja de cálculo en perspectiva; se arma de izquierda a derecha.
function ledgerShape(n: number): Shape {
  const COLS = 9;
  const ROWS = 13;
  const W = 6.2;
  const H = 3.6;
  const rot = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(-0.62, 0.18, 0.02));
  return fill(n, 31, (r, pos, color) => {
    const kind = r();
    let x: number;
    let y: number;
    if (kind < 0.3) {
      y = Math.floor(r() * (ROWS + 1)) / ROWS; // renglones
      x = r();
    } else if (kind < 0.5) {
      x = Math.floor(r() * (COLS + 1)) / COLS; // columnas
      y = r();
    } else {
      // Cifras alineadas a la derecha dentro de cada celda, como en un libro
      const c = Math.floor(r() * COLS);
      const row = Math.floor(r() * ROWS);
      const len = c === 0 ? 0.75 : 0.3 + ((row * 7 + c * 3) % 5) * 0.1;
      x = (c + 0.9 - r() * len * 0.8) / COLS;
      y = (row + 0.5 + (r() - 0.5) * 0.18) / ROWS;
    }
    pos.set((x - 0.5) * W, (y - 0.5) * H, 0).applyMatrix4(rot);
    tint(color, r, y > (ROWS - 1) / ROWS ? 0.9 : 0.35);
    return Math.min(1, x * 0.85 + r() * 0.15);
  });
}

// 3. Dos columnas: sin estrategia (alta, ámbar) y con estrategia (baja, pluma).
function columnsShape(n: number, ratio: number): Shape {
  const TALL = 3.2;
  const low = Math.max(0.28, TALL * ratio);
  const make = (h: number, x: number, seed: number) =>
    sampler(new THREE.BoxGeometry(0.95, h, 0.95).translate(x, -1.6 + h / 2, 0), rng(seed));
  const left = make(TALL, -0.75, 41);
  const right = make(low, 0.75, 42);
  const floor = sampler(new THREE.BoxGeometry(3, 0.01, 1.4).translate(0, -1.62, 0), rng(43));
  const shareRight = Math.max(0.25, low / (TALL + low));
  return fill(n, 44, (r, pos, color) => {
    const k = r();
    if (k < 0.08) {
      pos.fromArray(floor.sample());
      tint(color, r, 0.5);
      return 0.05 * r();
    }
    const isRight = k < 0.08 + shareRight * 0.92;
    pos.fromArray((isRight ? right : left).sample());
    color.copy(CLARO).lerp(isRight ? PLUMA : AMBAR, 0.55 + r() * 0.4);
    return Math.min(1, ((pos.y + 1.6) / TALL) * 0.9 + r() * 0.1); // crecen de abajo hacia arriba
  });
}

// 4. Camino de 5 nodos: los pasos del proceso.
const PATH_POINTS = [
  new THREE.Vector3(-2.8, -0.55, 0),
  new THREE.Vector3(-1.4, 0.45, 0.3),
  new THREE.Vector3(0, -0.25, -0.2),
  new THREE.Vector3(1.4, 0.55, 0.2),
  new THREE.Vector3(2.8, -0.15, 0),
];
function pathShape(n: number): Shape {
  const curve = new THREE.CatmullRomCurve3(PATH_POINTS);
  const nodes = PATH_POINTS.map((c, k) =>
    sampler(new THREE.SphereGeometry(0.2, 20, 14).translate(c.x, c.y, c.z), rng(51 + k)),
  );
  return fill(n, 52, (r, pos, color) => {
    if (r() < 0.45) {
      const t = r();
      pos.copy(curve.getPointAt(t));
      pos.x += (r() - 0.5) * 0.06;
      pos.y += (r() - 0.5) * 0.06;
      pos.z += (r() - 0.5) * 0.06;
      tint(color, r, 0.6);
      return t;
    }
    const k = Math.floor(r() * 5);
    pos.fromArray(nodes[k].sample());
    tint(color, r, 0.25);
    return Math.min(1, k / 5 + r() * 0.1);
  });
}

// 5. Nube tenue, lejos del centro.
function cloudShape(n: number): Shape {
  return fill(n, 61, (r, pos, color) => {
    const theta = r() * Math.PI * 2;
    const phi = Math.acos(2 * r() - 1);
    const rad = 2.4 + Math.pow(r(), 0.7) * 2.4;
    pos.setFromSphericalCoords(rad, phi, theta);
    pos.z *= 0.5;
    tint(color, r, 0.45);
  });
}

export type ShapeOptions = { columnRatio?: number };

export function buildShape(form: FormId, n: number, opts: ShapeOptions = {}): Shape {
  const raw = (() => {
    switch (form) {
      case 0:
        return balanceShape(n, BALANCE_TILT, "peso");
      case 1:
        return papersShape(n);
      case 2:
        return ledgerShape(n);
      case 3:
        return columnsShape(n, opts.columnRatio ?? 0.25);
      case 4:
        return pathShape(n);
      case 5:
        return cloudShape(n);
      case 6:
        return balanceShape(n, 0, "calma");
    }
  })();
  return permute(raw, n);
}
