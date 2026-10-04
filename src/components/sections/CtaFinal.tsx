"use client";

import { Button } from "@/components/ui/Button";
import { ctaFinal } from "@/content/home";
import { trackBooking, trackWhatsapp } from "@/lib/analytics";
import { bookingLink, waLink } from "@/lib/whatsapp";
import { BalanzaEstatica } from "@/components/hero/BalanzaEstatica";

const webhook = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ?? "";

/** CTA final: centrado; la balanza se rearma en equilibrio arriba del título. */
export function CtaFinal() {
  const booking = bookingLink();
  return (
    <section
      id="contacto"
      data-forma="6"
      data-capa="cta"
      data-wa="general"
      className="relative flex min-h-svh flex-col justify-end pb-24 pt-[44svh] text-center md:pb-32 lg:pt-[48svh]"
    >
      <BalanzaEstatica className="absolute inset-x-[var(--gutter)] top-[12svh] h-[28svh] lg:top-[14svh] lg:h-[30svh]" />
      <div className="contenedor">
        <h2
          data-cta-titulo
          className="legible mx-auto max-w-[16ch] font-display text-[2.5rem] font-semibold leading-[1.0] tracking-[-0.03em] text-claro md:text-6xl lg:text-7xl"
        >
          {ctaFinal.titulo}
        </h2>
        <p className="legible mx-auto mt-5 max-w-[46ch] text-claro/85 md:text-lg">{ctaFinal.texto}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={waLink("general")} external onClick={() => trackWhatsapp("cta-final", "general")}>
            {ctaFinal.whatsapp}
          </Button>
          <Button
            href={booking.href}
            external={booking.external}
            variant="secundario"
            onClick={() => trackBooking("cta-final")}
          >
            {ctaFinal.agendar}
          </Button>
          {webhook && (
            <Button href="/#formulario" variant="secundario">
              {ctaFinal.formulario}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
