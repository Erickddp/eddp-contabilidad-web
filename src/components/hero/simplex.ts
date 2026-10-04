// Ruido simplex 3D (Stefan Gustavson, dominio público), con semilla fija.
const grad3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

const perm = new Uint8Array(512);
const permMod12 = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = 1337;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
})();

const F3 = 1 / 3;
const G3 = 1 / 6;

function corner(x: number, y: number, z: number, gi: number): number {
  let t = 0.6 - x * x - y * y - z * z;
  if (t < 0) return 0;
  const g = grad3[gi];
  t *= t;
  return t * t * (g[0] * x + g[1] * y + g[2] * z);
}

export function noise3D(xin: number, yin: number, zin: number): number {
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);
  const t = (i + j + k) * G3;
  const x0 = xin - (i - t);
  const y0 = yin - (j - t);
  const z0 = zin - (k - t);
  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
  else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
  else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;

  const n0 = corner(x0, y0, z0, permMod12[ii + perm[jj + perm[kk]]]);
  const n1 = corner(
    x0 - i1 + G3, y0 - j1 + G3, z0 - k1 + G3,
    permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]],
  );
  const n2 = corner(
    x0 - i2 + 2 * G3, y0 - j2 + 2 * G3, z0 - k2 + 2 * G3,
    permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]],
  );
  const n3 = corner(
    x0 - 1 + 3 * G3, y0 - 1 + 3 * G3, z0 - 1 + 3 * G3,
    permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]],
  );
  return 32 * (n0 + n1 + n2 + n3);
}
