"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink, type WaTemplate } from "@/lib/whatsapp";

/**
 * FAB de WhatsApp (solo desktop). Aparece al pasar el hero y cambia el mensaje
 * según la sección visible: cada <section data-wa="plantilla"> la declara.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [template, setTemplate] = useState<WaTemplate>("general");

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const heroIo = hero
      ? new IntersectionObserver(([e]) => setVisible(!e.isIntersecting))
      : null;
    if (hero) heroIo!.observe(hero);
    else queueMicrotask(() => setVisible(true));

    const current = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => current.set(e.target, e.intersectionRatio));
        let best: Element | null = null;
        let ratio = 0;
        current.forEach((r, el) => {
          if (r > ratio) {
            ratio = r;
            best = el;
          }
        });
        if (best) setTemplate(((best as HTMLElement).dataset.wa as WaTemplate) ?? "general");
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    document.querySelectorAll("[data-wa]").forEach((el) => io.observe(el));

    return () => {
      heroIo?.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <a
      href={waLink(template)}
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp"
      tabIndex={visible ? 0 : -1}
      onClick={() => trackWhatsapp("fab", template)}
      className={`fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-blanco/20 bg-[#1d4d3b] text-blanco transition-all duration-500 ease-[var(--ease-expo)] hover:bg-[#256349] md:flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
