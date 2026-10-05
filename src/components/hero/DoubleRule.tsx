"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  className?: string;
  /** "view": se dibuja una sola vez al entrar al viewport. "manual": la anima quien la monta (clase .regla). */
  draw?: "view" | "manual";
};

/**
 * La doble raya del contador: dos trazos rojos bajo un total.
 * Con draw="manual" arranca oculta (dashoffset 100) y el padre la anima.
 */
export function DoubleRule({ className = "", draw = "view" }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || draw !== "view" || prefersReducedMotion()) return;
    const lines = svg.querySelectorAll(".regla");
    gsap.set(lines, { strokeDashoffset: 100 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
        });
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [draw]);

  return (
    <svg
      ref={ref}
      className={className}
      width="100%"
      height="10"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {[2, 7].map((y) => (
        <line
          key={y}
          className="regla"
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          pathLength={100}
          stroke="var(--color-cielo)"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={0}
        />
      ))}
    </svg>
  );
}
