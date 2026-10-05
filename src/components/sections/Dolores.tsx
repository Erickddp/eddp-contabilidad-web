"use client";

import { Button } from "@/components/ui/Button";
import { dolores } from "@/content/home";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { Etiqueta } from "@/components/ui/Etiqueta";

/** "¿Te pasa esto?": frases grandes; en móvil, una por pantalla. */
export function Dolores() {
  return (
    <section id="dolores" data-forma="1" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor">
        <Etiqueta>¿Te pasa esto?</Etiqueta>
        <h2 className="h2 legible mt-3 max-w-[18ch] text-blanco">{dolores.titulo}</h2>
        <ul className="mt-4 md:mt-10">
          {dolores.frases.map((f) => (
            <li
              key={f}
              data-frase
              className="legible flex min-h-[38svh] max-w-[24ch] items-center font-display text-[1.45rem] font-medium leading-[1.15] tracking-[-0.02em] text-blanco md:min-h-0 md:max-w-[30ch] md:py-6 md:text-4xl lg:text-[2.9rem]"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-2 md:mt-10">
          <Button
            href={waLink("general")}
            external
            className="w-full sm:w-auto"
            onClick={() => trackWhatsapp("dolores", "general")}
          >
            {dolores.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
