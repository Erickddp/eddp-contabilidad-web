// Ruido simplex 3D de Ashima Arts / Ian McEwan (MIT), base de la disolución.
const simplex = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 snoiseVec3(vec3 p) {
  return vec3(snoise(p), snoise(p + vec3(31.4, 17.2, 5.9)), snoise(p + vec3(-11.7, 43.1, 23.3)));
}
`;


/**
 * Movimiento compartido por puntos y líneas: morph escalonado, disolución, turbulencia,
 * vida en reposo, dispersión por velocidad de scroll, entrada en espiral, puntero y onda.
 * Devuelve la posición en mundo; deja en `vP` el progreso de la partícula y en `vBoost`
 * cuánto brilla extra (pulso de datos + onda).
 */
const morph = /* glsl */ `
#define PI 3.141592653589793
uniform float uProgress;
uniform float uTime;
uniform float uNoise;
uniform float uDrift;
uniform float uIntro;
uniform float uVelocity;
uniform vec3 uPointer;
uniform float uPointerOn;
uniform vec4 uRipple; // xyz centro en mundo, w = segundos desde el toque

attribute vec3 aFrom;
attribute vec3 aTo;
attribute vec4 aRandom;
attribute float aOrder;

float vP;
float vBoost;

${simplex}

vec4 morphWorld() {
  // 1. Progreso escalonado por partícula (azar + orden de armado de la forma destino).
  float o = mix(aRandom.x, aOrder, 0.75);
  vP = smoothstep(o * 0.4, o * 0.4 + 0.6, uProgress);
  vec3 pos = mix(aFrom, aTo, vP);

  // 2. Disolución: máxima a mitad del tramo.
  float dissolve = sin(vP * PI) * uNoise;
  if (dissolve > 0.001) {
    pos += snoiseVec3(pos * 0.45 + aRandom.yzw * 4.0 + uTime * 0.04) * dissolve * 1.4;
  }

  // Turbulencia lenta (papeles en caos, nube) y dispersión por velocidad de scroll.
  float turb = uDrift + abs(uVelocity) * 0.22;
  if (turb > 0.001) {
    pos += snoiseVec3(pos * 0.3 + uTime * 0.09) * turb;
  }
  pos.y += uVelocity * 0.12 * (aRandom.w - 0.5);

  // 3. Vida en reposo (0.02 unidades).
  pos += vec3(
    sin(uTime * 0.7 + aRandom.y * 6.2831),
    cos(uTime * 0.6 + aRandom.z * 6.2831),
    sin(uTime * 0.5 + aRandom.w * 6.2831)
  ) * 0.02;

  // Entrada: un remolino de partículas que converge a la forma.
  float ip = smoothstep(aRandom.y * 0.35, aRandom.y * 0.35 + 0.65, uIntro);
  float ang = aRandom.x * 6.2831 * 3.0 + uTime * 0.6;
  float rad = 4.0 + aRandom.w * 6.0;
  vec3 scatter = vec3(cos(ang) * rad, (aRandom.z - 0.5) * 9.0, sin(ang) * rad * 0.6 - 2.0);
  pos = mix(scatter, pos, ip);

  vec4 world = modelMatrix * vec4(pos, 1.0);

  // 4. Puntero (desktop): repulsión leve.
  if (uPointerOn > 0.5) {
    vec2 d = world.xy - uPointer.xy;
    float l = length(d);
    world.xy += (d / max(l, 0.0001)) * smoothstep(0.9, 0.0, l) * 0.3;
  }

  // Onda expansiva al tocar o hacer clic.
  vBoost = 0.0;
  if (uRipple.w < 1.6) {
    vec3 dir = world.xyz - uRipple.xyz;
    float dist = length(dir);
    float front = uRipple.w * 4.2;
    float wave = exp(-pow((dist - front) * 2.4, 2.0)) * (1.0 - uRipple.w / 1.6);
    world.xyz += (dir / max(dist, 0.0001)) * wave * 0.45;
    vBoost += wave;
  }

  // Pulso de datos: una banda de luz recorre la forma siguiendo su orden de armado.
  float flow = pow(fract(aOrder * 1.5 - uTime * 0.18), 18.0);
  vBoost += flow * 0.9 * ip;

  return world;
}
`;

const pointsVertex = /* glsl */ `
uniform float uSize;
uniform float uSizeMul;
uniform float uPixelRatio;
uniform float uAlpha;
uniform float uAlphaMul;

attribute vec3 aColorFrom;
attribute vec3 aColorTo;

varying vec3 vColor;
varying float vAlpha;

${morph}

void main() {
  vec4 world = morphWorld();
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;

  // Tamaño con perspectiva y variación; el pulso agranda un poco.
  gl_PointSize = uSize * uSizeMul * uPixelRatio * (0.55 + aRandom.y * 0.9) * (1.0 + vBoost * 0.7)
    * (1.0 / -mvPosition.z);

  vec3 color = mix(aColorFrom, aColorTo, vP);
  vColor = mix(color, vec3(0.86, 0.96, 1.0), clamp(vBoost, 0.0, 1.0) * 0.85);
  float ip = smoothstep(aRandom.y * 0.35, aRandom.y * 0.35 + 0.65, uIntro);
  vAlpha = uAlpha * uAlphaMul * mix(0.3, 1.0, ip) * (1.0 + vBoost * 0.8);
}
`;

/** Núcleo del punto: caída radial suave. */
const pointsFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.0, d);
  alpha = alpha * alpha * 0.9;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor, alpha * vAlpha);
}
`;

/** Halo (desktop): el mismo punto, grande y muy tenue; simula bloom sin pase extra. */
const haloFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = exp(-d * d * 18.0);
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor * vec3(0.55, 0.85, 1.0), alpha * vAlpha);
}
`;

/** Red de líneas entre partículas vecinas (la "network" de erickddp.com). */
const linesVertex = /* glsl */ `
uniform float uLineAlpha;
uniform float uAlpha;
varying float vAlpha;
varying float vBoostOut;

${morph}

void main() {
  vec4 world = morphWorld();
  gl_Position = projectionMatrix * viewMatrix * world;
  float ip = smoothstep(aRandom.y * 0.35, aRandom.y * 0.35 + 0.65, uIntro);
  float dissolve = sin(vP * PI) * uNoise;
  vAlpha = uLineAlpha * uAlpha * ip * (1.0 - dissolve) * (1.0 - min(abs(uVelocity) * 1.5, 0.8));
  vBoostOut = vBoost;
}
`;

const linesFragment = /* glsl */ `
varying float vAlpha;
varying float vBoostOut;

void main() {
  vec3 color = mix(vec3(0.22, 0.74, 0.97), vec3(0.86, 0.96, 1.0), clamp(vBoostOut, 0.0, 1.0));
  gl_FragColor = vec4(color, vAlpha * (1.0 + vBoostOut));
}
`;

export const shaders = {
  points: { vertexShader: pointsVertex, fragmentShader: pointsFragment },
  halo: { vertexShader: pointsVertex, fragmentShader: haloFragment },
  lines: { vertexShader: linesVertex, fragmentShader: linesFragment },
};
