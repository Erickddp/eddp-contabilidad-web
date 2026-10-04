import type { Stop } from "./config";

/** Estado compartido entre el scroll (ParticleScroll) y la escena (ParticleScene). */
export const particleState = {
  from: { form: 0, layout: "hero" } as Stop,
  to: { form: 0, layout: "hero" } as Stop,
  /** Progreso crudo del tramo (0→1); la escena lo suaviza (equivalente a scrub: 1). */
  progress: 0,
  /** Amplitud de la disolución del tramo (0 = morph limpio, como el equilibrio del hero). */
  noise: 1,
  /** Entrada: partículas dispersas que convergen (0→1). */
  intro: 0,
};

export function setSegment(from: Stop, to: Stop, progress: number, noise: number) {
  particleState.from = from;
  particleState.to = to;
  particleState.progress = progress;
  particleState.noise = noise;
}
