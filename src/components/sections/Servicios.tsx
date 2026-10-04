"use client";

import { Button } from "@/components/ui/Button";
import { servicios, serviciosCopy, type Servicio } from "@/content/home";
import { pricingConfig } from "@/content/pricing";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

function Tarjeta({ s }: { s: Servicio }) {
  return (
    <article className="flex h-full flex-col rounded-vidrio border border-claro/10 bg-tinta-2 p-6 md:p-8">
      <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-[1.75rem]">
        {s.nombre}
      </h3>
      {s.paraQuien && <p className="mt-2 text-claro/72">{s.paraQuien}</p>}
      <ul className="mt-5 flex-1">
        {s.entregables.map((e) => (
          <li key={e} className="border-t border-claro/10 py-2.5 text-[15px] text-claro/90">
            {e}
          </li>
        ))}
      </ul>
      <p className="cifras mt-5 text-claro/72">
        Desde <span className="font-display text-xl font-semibold text-claro">{s.desde}</span>
        {pricingConfig.pricesPlusTax && /^[+$]/.test(s.desde) ? " + IVA" : ""}
      </p>
      <Button
        href={waLink(s.wa.template, s.wa.vars)}
        external
        variant="secundario"
        className="mt-5 w-full"
        onClick={() => trackWhatsapp("servicios", s.wa.template)}
      >
        Pedir información
      </Button>
    </article>
  );
}

/**
 * Servicios. Móvil: deck de tarjetas apiladas con sticky. Desktop: track horizontal
 * (el pin con scrub se agrega en la capa de animación).
 */
export function Servicios() {
  return (
    <section id="servicios" data-forma="2" data-wa="general" className="relative py-24 md:py-32 lg:py-0">
      <div data-servicios-pin className="lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-[var(--nav-h)]">
        <div className="contenedor">
          <h2 className="h2 legible text-claro">{serviciosCopy.titulo}</h2>
          <p className="legible mt-4 max-w-[60ch] text-claro/80 md:text-lg">{serviciosCopy.intro}</p>
        </div>

        {/* Móvil y tablet: deck */}
        <ol className="contenedor mt-10 lg:hidden">
          {servicios.map((s, i) => (
            <li
              key={s.nombre}
              data-deck
              className="sticky pb-6"
              style={{ top: `calc(var(--nav-h) + 12px + ${i * 6}px)` }}
            >
              <Tarjeta s={s} />
            </li>
          ))}
        </ol>

        {/* Desktop: track horizontal */}
        <div className="mt-12 hidden lg:block">
          <ul data-servicios-track className="flex w-max gap-6 pl-[max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))] pr-[var(--gutter)]">
            {servicios.map((s) => (
              <li key={s.nombre} className="w-[400px] shrink-0">
                <Tarjeta s={s} />
              </li>
            ))}
          </ul>
          <div className="contenedor mt-8">
            <div className="h-px w-full bg-claro/15">
              <div data-servicios-barra className="h-px w-full origin-left scale-x-0 bg-pluma" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
