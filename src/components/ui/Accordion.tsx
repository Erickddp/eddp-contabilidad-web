"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE_EXPO } from "@/lib/motion";

type Item = { q: string; a: string };

/** Acordeón: altura animada y el + rota 45°. Operable con teclado (botones nativos). */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <ul>
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={it.q} className="border-t border-claro/12 bg-noche/55 last:border-b">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-lg font-medium tracking-[-0.01em] text-claro md:text-xl"
              >
                {it.q}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-claro/20"
                >
                  <Plus size={18} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[64ch] pb-5 pr-12 text-claro/80">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
