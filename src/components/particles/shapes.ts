import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

/**
 * Formas de la balanza (morph targets). Toda la geometría se arma en código y se
 * muestrea con MeshSurfaceSampler. Todas las formas usan el mismo N y la misma
 * permutación, así cualquier prefijo del arreglo es una muestra al azar (sirve para
 * bajar partículas a la mitad con drawRange sin perder piezas).
 */

export type FormId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Shape = { positions: Float32Array; colors: Float32Array };

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

    const heavy = part[i] === Part.Heap || part[i] === Part.PanR;
    if (palette === "peso") tint(c, random, 0.35, heavy && (part[i] === Part.Heap || random() < 0.5) ? AMBAR : undefined);
    else tint(c, random, 0.6);
    c.toArray(colors, i * 3);
  }
  return { positions, colors };
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
  for (let i = 0; i < n; i++) {
    const s = p[i] * 3;
    positions.set(shape.positions.subarray(s, s + 3), i * 3);
    colors.set(shape.colors.subarray(s, s + 3), i * 3);
  }
  return { positions, colors };
}

export type ShapeOptions = { columnRatio?: number };

export function buildShape(form: FormId, n: number, opts: ShapeOptions = {}): Shape {
  void opts;
  switch (form) {
    case 0:
      return permute(balanceShape(n, BALANCE_TILT, "peso"), n);
    case 6:
      return permute(balanceShape(n, 0, "calma"), n);
    default:
      return permute(balanceShape(n, 0, "calma"), n);
  }
}
