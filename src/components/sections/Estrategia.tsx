"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DoubleRule } from "@/components/hero/DoubleRule";
import { escenariosVisibles, estrategiaCopy } from "@/content/estrategia";
import { trackWhatsapp } from "@/lib/analytics";
import { formatMxn } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

const pesos = (n: number) => formatMxn(n).replace(/\.00$/, "");

/** 9.16 "Mismo ingreso. Otra estrategia." Sustituye a la tarjeta del pago provisional. */
export function Estrategia() {
  const [activo, setActivo] = useState(0);
  const esc = escenariosVisibles[activo];
  if (!esc) return null;
  const sin = esc.sin.isrAnual!;
  const con = esc.con.isrAnual!;

  return (
    <section
      id="estrategia"
      data-forma="3"
      data-wa="estrategia"
      className="relative py-24 md:py-32 lg:flex lg:min-h-svh lg:items-center"
    >
      <div className="contenedor lg:grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="h2 legible max-w-[16ch] text-claro">{estrategiaCopy.titulo}</h2>
          <p className="legible mt-4 max-w-[52ch] text-claro/80 md:text-lg">{estrategiaCopy.bajada}</p>

          {escenariosVisibles.length > 1 && (
            <div
              role="tablist"
              aria-label="Escenarios"
              className="sin-barra -mx-[var(--gutter)] mt-8 flex gap-2 overflow-x-auto px-[var(--gutter)]"
            >
              {escenariosVisibles.map((e, i) => (
                <button
                  key={e.id}
                  role="tab"
                  type="button"
                  aria-selected={i === activo}
                  onClick={() => setActivo(i)}
                  className={`min-h-12 shrink-0 cursor-pointer rounded-boton border px-4 text-[15px] transition-colors duration-150 ${
                    i === activo
                      ? "border-pluma bg-pluma/25 text-claro"
                      : "border-claro/20 text-claro/80 hover:bg-claro/10"
                  }`}
                >
                  {e.nombre}
                </button>
              ))}
            </div>
          )}

          <div data-estrategia-panel className="mt-8 rounded-vidrio border border-claro/10 bg-noche/85 p-6 backdrop-blur-md md:p-8" role="tabpanel">
            <p className="font-display text-lg font-semibold">{esc.nombre}</p>
            {esc.supuesto && <p className="mt-1 text-claro/72">{esc.supuesto}</p>}

            <dl className="mt-6 grid grid-cols-2 gap-x-4">
              <div className="border-t border-claro/15 pt-3">
                <dt className="text-sm text-claro/72">Sin estrategia</dt>
                <dd className="mt-1 text-sm text-claro/72">{esc.sin.etiqueta}</dd>
              </div>
              <div className="border-t border-claro/15 pt-3">
                <dt className="text-sm text-claro/72">Con estrategia</dt>
                <dd className="mt-1 text-sm text-claro/72">{esc.con.etiqueta}</dd>
              </div>
              <div className="col-span-2 mt-5 text-sm text-claro/72">ISR anual estimado</div>
              <div className="mt-1">
                <span data-cuenta={sin} className="cifras font-display text-[1.6rem] font-semibold text-[#f7c27a] md:text-4xl">
                  {pesos(sin)}
                </span>
              </div>
              <div className="mt-1">
                <span data-cuenta={con} className="cifras font-display text-[1.6rem] font-semibold text-[#9fb4ff] md:text-4xl">
                  {pesos(con)}
                </span>
              </div>
            </dl>

            <div data-ahorro className="mt-8 border-t border-claro/30 pt-4">
              <p className="text-sm text-claro/72">Diferencia</p>
              <p className="cifras mt-1 font-display text-[2.2rem] font-semibold leading-none tracking-[-0.02em] md:text-5xl">
                <span data-cuenta={sin - con}>{pesos(sin - con)}</span>
                <span className="ml-2 text-lg font-medium text-claro/80 md:text-xl">al año</span>
              </p>
              <DoubleRule draw="manual" className="mt-3 block max-w-[340px]" />
            </div>
            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-claro/72">{estrategiaCopy.pie}</p>
          </div>

          <Button
            href={waLink("estrategia")}
            external
            className="mt-6 w-full sm:w-auto"
            onClick={() => trackWhatsapp("estrategia", "estrategia")}
          >
            {estrategiaCopy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
