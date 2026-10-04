"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_EXPO } from "@/lib/motion";

const DIGITS = "0123456789";

/**
 * Cifra con dígitos tabulares. Al cambiar el valor, solo ruedan los dígitos que cambian:
 * cada posición (contada desde la derecha) es una columna 0–9 que se desplaza.
 */
export function Cifra({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const chars = value.split("");

  return (
    <span className="cifras inline-flex">
      <span className="sr-only">{value}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i; // posición desde la derecha: estable al cambiar el largo
        const d = DIGITS.indexOf(ch);
        if (d < 0) {
          return (
            <span key={`s${key}`} aria-hidden="true">
              {ch}
            </span>
          );
        }
        return (
          <span
            key={`d${key}`}
            aria-hidden="true"
            className="relative inline-block h-[1em] overflow-hidden leading-none"
          >
            {/* El "0" invisible da el ancho tabular de la columna */}
            <span className="invisible">0</span>
            <motion.span
              className="absolute inset-x-0 top-0 flex flex-col"
              initial={false}
              animate={{ y: `${-d}em` }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_EXPO }}
            >
              {DIGITS.split("").map((n) => (
                <span key={n} className="block h-[1em] text-center leading-none">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
