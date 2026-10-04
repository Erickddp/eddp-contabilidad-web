"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/** Scroll suave con Lenis. Apagado con reduced motion y en táctil (scroll nativo). */
export function SmoothScroll() {
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || touch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // El menú móvil bloquea el scroll del body: Lenis se detiene mientras está abierto.
    const mo = new MutationObserver(() => {
      if (document.documentElement.dataset.menu === "open") lenis.stop();
      else lenis.start();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-menu"] });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
