"use client";

import { Carrusel } from "@/components/ui/Carrusel";
import { Desplegable } from "@/components/ui/Desplegable";
import { casos, casosCopy, type Caso } from "@/content/home";

function Ficha({ c }: { c: Caso }) {
  return (
    <article
      data-ficha
      className="flex h-full flex-col rounded-libro border border-claro/10 border-l-2 border-l-pluma bg-tinta-2 p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.015em] md:text-xl">
          {c.titulo}
        </h3>
        {c.enProceso && (
          <span className="shrink-0 rounded-full bg-pluma/20 px-2.5 py-0.5 text-xs text-[#b4c4ff]">En proceso</span>
        )}
      </div>
      <dl className="mb-4 mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-claro/55">Problema</dt>
          <dd className="mt-0.5 text-claro/85">{c.problema}</dd>
        </div>
        {c.resultado && (
          <div>
            <dt className="text-xs font-medium text-claro/55">Resultado</dt>
            <dd className="mt-0.5 font-medium text-claro">{c.resultado}</dd>
          </div>
        )}
      </dl>
      <Desplegable label="Qué se hizo" className="mt-auto">
        <ul className="space-y-1.5 text-sm text-claro/85">
          {c.hecho.map((h) => (
            <li key={h} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pluma" />
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
        <h2 className="h2 legible text-claro">{casosCopy.titulo}</h2>
        <p className="legible mt-3 max-w-[58ch] text-claro/80">{casosCopy.intro}</p>
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
