"use client";

import { Button } from "@/components/ui/Button";
import { dolores } from "@/content/home";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

/** "¿Te pasa esto?": frases grandes; en móvil, una por pantalla. */
export function Dolores() {
  return (
    <section id="dolores" data-forma="1" data-wa="general" className="relative py-24 md:py-32">
      <div className="contenedor">
        <h2 className="h2 legible max-w-[18ch] text-claro">{dolores.titulo}</h2>
        <ul className="mt-6 md:mt-16">
          {dolores.frases.map((f) => (
            <li
              key={f}
              data-frase
              className="legible flex min-h-[72svh] max-w-[22ch] items-center font-display text-[1.95rem] font-medium leading-[1.12] tracking-[-0.02em] text-claro md:min-h-0 md:max-w-[30ch] md:py-8 md:text-5xl lg:text-[3.6rem]"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-4 md:mt-14">
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
