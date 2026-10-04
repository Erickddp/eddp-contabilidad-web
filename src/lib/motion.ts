/** Easing global (expo-out) para GSAP y para Motion. */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const GSAP_EASE = "expo.out";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
