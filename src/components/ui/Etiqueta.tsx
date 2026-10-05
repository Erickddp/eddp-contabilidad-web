"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const SIGNOS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * Etiqueta mono sobre un título. Al entrar en pantalla el texto se "decodifica"
 * (efecto scramble de erickddp.com). Con reduced motion se muestra tal cual.
 */
export function Etiqueta({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const texto = children;
    let timer: ReturnType<typeof setInterval> | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let i = 0;
        timer = setInterval(() => {
          el.textContent = texto
            .split("")
            .map((c, k) => (k < i || c === " " ? c : SIGNOS[Math.floor(Math.random() * SIGNOS.length)]))
            .join("");
          i += 1 / 2.5;
          if (i >= texto.length) {
            clearInterval(timer);
            el.textContent = texto;
          }
        }, 32);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [children]);

  return (
    <span className={`etiqueta ${className}`}>
      <span className="sr-only">{children}</span>
      <span ref={ref} aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
