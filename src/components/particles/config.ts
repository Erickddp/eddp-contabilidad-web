import type { FormId } from "./shapes";

/** Dónde vive la figura en pantalla. cx/cy: centro como fracción del ancho/alto visible
 *  (0 = centro, + = derecha/arriba). w/h: fracción máxima del ancho/alto que puede ocupar. */
export type Layout = { cx: number; cy: number; w: number; h: number; z: number };
export type LayoutName = "hero" | "centro" | "derecha" | "borde" | "cta";
export type Stop = { form: FormId; layout: LayoutName };

export const LAYOUTS: Record<LayoutName, { mobile: Layout; desktop: Layout }> = {
  // Móvil: la balanza en el 45% superior. Desktop: llena el lado derecho.
  hero: {
    mobile: { cx: 0, cy: 0.225, w: 0.86, h: 0.27, z: 6 },
    desktop: { cx: 0.25, cy: -0.03, w: 0.44, h: 0.64, z: 6 },
  },
  centro: {
    mobile: { cx: 0, cy: 0, w: 1.15, h: 0.85, z: 5.4 },
    desktop: { cx: 0, cy: 0, w: 0.95, h: 0.9, z: 5.4 },
  },
  derecha: {
    mobile: { cx: 0, cy: 0.2, w: 0.85, h: 0.42, z: 5.4 },
    desktop: { cx: 0.24, cy: -0.02, w: 0.4, h: 0.72, z: 5.4 },
  },
  // Camino del proceso: en móvil, vertical y pegado al borde derecho para no tapar los pasos.
  borde: {
    mobile: { cx: 0.37, cy: -0.02, w: 0.2, h: 0.78, z: 5.4 },
    desktop: { cx: 0.24, cy: -0.02, w: 0.4, h: 0.72, z: 5.4 },
  },
  cta: {
    mobile: { cx: 0, cy: 0.25, w: 0.8, h: 0.3, z: 5.6 },
    desktop: { cx: 0, cy: 0.2, w: 0.36, h: 0.42, z: 5.6 },
  },
};

/** Por forma: tamaño natural (para escalar), opacidad, turbulencia y si gira. */
export const FORM_META: Record<
  FormId,
  {
    width: number;
    height: number;
    alpha: number;
    drift: number;
    spin: number;
    layout: LayoutName;
    /** En móvil la forma se gira (el camino del proceso queda vertical). */
    mobileRotZ?: number;
  }
> = {
  0: { width: 4.4, height: 3.0, alpha: 1, drift: 0, spin: 1, layout: "hero" },
  1: { width: 8, height: 6, alpha: 0.6, drift: 0.14, spin: 0, layout: "centro" },
  2: { width: 6.4, height: 3.6, alpha: 0.6, drift: 0, spin: 0, layout: "centro" },
  3: { width: 3.2, height: 3.4, alpha: 0.65, drift: 0, spin: 0, layout: "derecha" },
  4: { width: 6.4, height: 2.4, alpha: 0.5, drift: 0, spin: 0, layout: "borde", mobileRotZ: Math.PI / 2 },
  5: { width: 3.2, height: 3.2, alpha: 0.25, drift: 0.06, spin: 0, layout: "centro" },
  6: { width: 4.4, height: 3.0, alpha: 0.95, drift: 0, spin: 1, layout: "cta" },
};

export const DESKTOP_MIN = 1024;

/** N constante por dispositivo (CAMBIO-V2, sección 4). */
export function particleCount(): number {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowEnd =
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory !== undefined && nav.deviceMemory <= 4);
  if (lowEnd) return 2500;
  const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  return mobile ? 4000 : 14000;
}

export function isMobileDevice() {
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
}
