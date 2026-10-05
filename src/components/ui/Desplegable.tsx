"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_EXPO } from "@/lib/motion";

type Props = {
  /** Texto del botón cerrado, por ejemplo "Qué incluye". */
  label: string;
  children: ReactNode;
  className?: string;
  /** Tono del texto del botón. */
  tono?: "claro" | "suave";
};

/**
 * Contenedor que encapsula el detalle: se ve una línea y se abre al tocar.
 * Altura animada con Motion; operable con teclado (botón nativo).
 */
export function Desplegable({ label, children, className = "", tono = "suave" }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 border-t border-blanco/10 text-left text-sm font-medium transition-colors duration-150 hover:text-blanco ${
          tono === "claro" ? "text-blanco" : "text-blanco/75"
        }`}
      >
        {label}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: EASE_EXPO }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blanco/15"
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="contenido"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <div className="pb-2 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
