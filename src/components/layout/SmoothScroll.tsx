"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll suave con Lenis, sincronizado con ScrollTrigger y el ticker de GSAP.
 * Apagado con reduced motion y en táctil (scroll nativo).
 */
export function SmoothScroll() {
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || touch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // El menú móvil bloquea el scroll del body: Lenis se detiene mientras está abierto.
    const mo = new MutationObserver(() => {
      if (document.documentElement.dataset.menu === "open") lenis.stop();
      else lenis.start();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-menu"] });

    return () => {
      gsap.ticker.remove(tick);
      mo.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
