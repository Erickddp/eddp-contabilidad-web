"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  items: ReactNode[];
  /** Etiqueta accesible, por ejemplo "Planes". */
  label: string;
  /** Clases de la lista en pantallas grandes (p. ej. una rejilla). Vacío = carrusel siempre. */
  desdeMd?: string;
  /** Clases extra por ítem (p. ej. col-span en la rejilla). */
  itemClass?: (i: number) => string;
};

/**
 * Carrusel móvil: deslizable con snap, deja ver un pedazo de la siguiente tarjeta y
 * muestra el avance (barra + "2 / 4"). La tarjeta enfocada crece con una animación
 * ligada al scroll (CSS scroll-driven; ver .carrusel-item en globals.css).
 */
export function Carrusel({ items, label, desdeMd = "", itemClass }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const first = list.children[0] as HTMLElement | undefined;
        if (!first) return;
        const step = first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0");
        setActual(Math.min(items.length - 1, Math.round(list.scrollLeft / step)));
      });
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      list.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        className={`sin-barra -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-1 ${desdeMd}`}
      >
        {items.map((it, i) => (
          <li
            key={i}
            className={`carrusel-item w-[84%] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none ${itemClass?.(i) ?? ""}`}
          >
            {it}
          </li>
        ))}
      </ul>
      {/* Avance: solo donde es carrusel */}
      <div className={`mt-4 flex items-center gap-3 ${desdeMd ? "md:hidden" : ""}`} aria-hidden="true">
        <div className="h-0.5 flex-1 bg-claro/15">
          <div
            className="h-0.5 origin-left bg-pluma transition-transform duration-500 ease-[var(--ease-expo)]"
            style={{ transform: `scaleX(${(actual + 1) / items.length})` }}
          />
        </div>
        <span className="cifras text-xs text-claro/60">
          {actual + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}
