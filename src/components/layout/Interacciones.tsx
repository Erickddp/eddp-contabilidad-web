"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/lib/motion";

/** Elementos con animaciones CSS que repintan: solo corren mientras se ven. */
const ANIMADOS = ".borde-vivo, .brillo-metal";

/**
 * Microinteracciones globales:
 * - `data-vista` en `.borde-vivo` y `.brillo-metal` mientras están en pantalla
 *   (sus animaciones repintan en cada cuadro y competirían con el canvas).
 * - Con mouse: `.foco` (halo que sigue al cursor) y `[data-tilt]` (inclinación 3D leve).
 */
export function Interacciones() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.dataset.vista = "";
          else delete el.dataset.vista;
        }
      },
      { rootMargin: "80px 0px" },
    );
    document.querySelectorAll(ANIMADOS).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const tilt = !prefersReducedMotion();
    let activo: HTMLElement | null = null;

    const soltar = () => {
      if (activo?.dataset.tilt !== undefined) activo.style.transform = "";
      activo = null;
    };

    const onMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".foco, [data-tilt]");
      if (target !== activo) soltar();
      if (!target) return;
      activo = target;
      const r = target.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      target.style.setProperty("--mx", `${x * 100}%`);
      target.style.setProperty("--my", `${y * 100}%`);
      if (tilt && target.dataset.tilt !== undefined) {
        target.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg)`;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", soltar);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", soltar);
    };
  }, []);

  return null;
}
