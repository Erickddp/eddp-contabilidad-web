"use client";

import { Button } from "@/components/ui/Button";
import { Carrusel } from "@/components/ui/Carrusel";
import { Desplegable } from "@/components/ui/Desplegable";
import { servicios, serviciosCopy, type Servicio } from "@/content/home";
import { pricingConfig } from "@/content/pricing";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

/** Tarjeta compacta: lo esencial a la vista y los entregables en un desplegable. */
function Tarjeta({ s }: { s: Servicio }) {
  return (
    <article className="flex h-full flex-col rounded-vidrio border border-claro/10 bg-tinta-2 p-5 md:p-7">
      <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] md:text-2xl">
        {s.nombre}
      </h3>
      {s.paraQuien && <p className="mt-1.5 text-sm text-claro/70 md:text-[15px]">{s.paraQuien}</p>}
      <p className="cifras mb-4 mt-4 text-sm text-claro/70">
        Desde <span className="font-display text-lg font-semibold text-claro">{s.desde}</span>
        {pricingConfig.pricesPlusTax && /^[+$]/.test(s.desde) ? " + IVA" : ""}
      </p>
      <Desplegable label="Qué incluye" className="mt-auto">
        <ul className="space-y-1.5 text-sm text-claro/85">
          {s.entregables.map((e) => (
            <li key={e} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pluma" />
              {e}
            </li>
          ))}
        </ul>
      </Desplegable>
      <Button
        href={waLink(s.wa.template, s.wa.vars)}
        external
        variant="secundario"
        size="sm"
        className="mt-3 w-full"
        onClick={() => trackWhatsapp("servicios", s.wa.template)}
      >
        Pedir información
      </Button>
    </article>
  );
}

/**
 * Servicios. Móvil y tablet: carrusel deslizable. Desktop: track horizontal pineado
 * (el pin con scrub vive en HomeMotion).
 */
export function Servicios() {
  return (
    <section id="servicios" data-forma="2" data-wa="general" className="relative py-16 md:py-24 lg:py-0">
      <div
        data-servicios-pin
        className="lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-[var(--nav-h)]"
      >
        <div className="contenedor">
          <h2 className="h2 legible text-claro">{serviciosCopy.titulo}</h2>
          <p className="legible mt-3 max-w-[58ch] text-claro/80">{serviciosCopy.intro}</p>
        </div>

        <div className="contenedor mt-7 lg:hidden">
          <Carrusel label="Servicios" items={servicios.map((s) => <Tarjeta key={s.nombre} s={s} />)} />
        </div>

        <div className="mt-10 hidden lg:block">
          {/* Sin animación (reduced motion) el track se recorre con scroll horizontal nativo. */}
          <div data-servicios-scroller className="sin-barra overflow-x-auto">
            <ul
              data-servicios-track
              className="flex w-max items-stretch gap-5 pl-[max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))] pr-[var(--gutter)]"
            >
              {servicios.map((s) => (
                <li key={s.nombre} className="w-[340px] shrink-0">
                  <Tarjeta s={s} />
                </li>
              ))}
            </ul>
          </div>
          <div className="contenedor mt-8">
            <div className="h-0.5 w-full bg-claro/15">
              <div data-servicios-barra className="h-0.5 w-full origin-left bg-pluma motion-reduce:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
