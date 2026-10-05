"use client";

import { Carrusel } from "@/components/ui/Carrusel";
import { Desplegable } from "@/components/ui/Desplegable";
import { casos, casosCopy, type Caso } from "@/content/home";
import { Etiqueta } from "@/components/ui/Etiqueta";

function Ficha({ c }: { c: Caso }) {
  return (
    <article
      data-ficha
      className="tarjeta foco borde-vivo flex h-full flex-col p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.015em] md:text-xl">
          {c.titulo}
        </h3>
        {c.enProceso && (
          <span className="shrink-0 rounded-full border border-cielo/40 bg-cielo/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cielo-300">En proceso</span>
        )}
      </div>
      <dl className="mb-4 mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-blanco/45">Problema</dt>
          <dd className="mt-0.5 text-blanco/85">{c.problema}</dd>
        </div>
        {c.resultado && (
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-cielo/80">Resultado</dt>
            <dd className="mt-0.5 font-medium text-blanco">{c.resultado}</dd>
          </div>
        )}
      </dl>
      <Desplegable label="Qué se hizo" className="mt-auto">
        <ul className="space-y-1.5 text-sm text-blanco/85">
          {c.hecho.map((h) => (
            <li key={h} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cielo" />
              {h}
            </li>
          ))}
        </ul>
      </Desplegable>
    </article>
  );
}

/** Casos como fichas de expediente: carrusel en móvil; en desktop alternan ancho completo y dos columnas. */
export function Casos() {
  return (
    <section id="casos" data-forma="5" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor">
        <Etiqueta>Expedientes</Etiqueta>
        <h2 className="h2 legible mt-3 text-blanco">{casosCopy.titulo}</h2>
        <p className="legible mt-3 max-w-[58ch] text-blanco/80">{casosCopy.intro}</p>
        <div className="mt-7">
          <Carrusel
            label="Casos"
            desdeMd="md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:mx-0 md:px-0 md:snap-none lg:grid-cols-3"
            itemClass={(i) => (i === 0 ? "lg:col-span-2" : i === casos.length - 1 ? "lg:col-span-2" : "")}
            items={casos.map((c) => (
              <Ficha key={c.titulo} c={c} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
