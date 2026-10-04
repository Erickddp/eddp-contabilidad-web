/**
 * Genera /public/media/balanza.svg: la balanza en equilibrio como SVG de puntos.
 * Es el fallback sin WebGL o con prefers-reduced-motion. Usa las mismas formas
 * que el canvas (src/components/particles/shapes.ts).
 *
 *   npm run build:balanza
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildShape } from "../src/components/particles/shapes";

const N = 2600;
const W = 480;
const H = 340;
const SCALE = 100; // px por unidad
const YAW = 0.35; // un poco de giro para que se lea en 3D

const { positions, colors } = buildShape(6, N);
const cos = Math.cos(YAW);
const sin = Math.sin(YAW);

const dots: { x: number; y: number; z: number; c: string }[] = [];
for (let i = 0; i < N; i++) {
  const x = positions[i * 3];
  const y = positions[i * 3 + 1];
  const z = positions[i * 3 + 2];
  const rx = x * cos + z * sin;
  const rz = -x * sin + z * cos;
  const hex = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, "0");
  dots.push({
    x: W / 2 + rx * SCALE,
    y: H / 2 - y * SCALE,
    z: rz,
    c: `#${hex(colors[i * 3])}${hex(colors[i * 3 + 1])}${hex(colors[i * 3 + 2])}`,
  });
}
dots.sort((a, b) => a.z - b.z);

const circles = dots
  .map((d) => {
    const r = (1.1 + (d.z + 1) * 0.35).toFixed(2);
    return `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${r}" fill="${d.c}"/>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Balanza en equilibrio hecha de puntos"><g opacity="0.85">${circles}</g></svg>\n`;

const out = join(process.cwd(), "public", "media");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "balanza.svg"), svg);
console.log(`balanza.svg: ${N} puntos, ${(svg.length / 1024).toFixed(0)} KB`);
