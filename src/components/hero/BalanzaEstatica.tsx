/* eslint-disable @next/next/no-img-element -- SVG estático de puntos; next/image no aporta aquí */

/**
 * Balanza en equilibrio como imagen estática (fallback sin WebGL o con reduced motion).
 * Oculta por defecto; se muestra cuando ParticleCanvas marca html[data-balanza="estatica"].
 * Con loading="lazy" y display:none el navegador no la descarga si no hace falta.
 */
export function BalanzaEstatica({ className = "" }: { className?: string }) {
  return (
    <img
      src="/media/balanza.svg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`balanza-estatica pointer-events-none object-contain ${className}`}
    />
  );
}
