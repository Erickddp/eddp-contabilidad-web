"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DoubleRule } from "@/components/hero/DoubleRule";
import { Desplegable } from "@/components/ui/Desplegable";
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
      className="relative py-16 md:py-24 lg:flex lg:min-h-svh lg:items-center"
    >
      <div className="contenedor lg:grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="h2 legible max-w-[16ch] text-claro">{estrategiaCopy.titulo}</h2>
          <p className="legible mt-3 max-w-[52ch] text-claro/80">{estrategiaCopy.bajada}</p>

          {escenariosVisibles.length > 1 && (
            <div
              role="tablist"
              aria-label="Escenarios"
              className="sin-barra -mx-[var(--gutter)] mt-6 flex gap-2 overflow-x-auto px-[var(--gutter)]"
            >
              {escenariosVisibles.map((e, i) => (
                <button
                  key={e.id}
                  role="tab"
                  type="button"
                  aria-selected={i === activo}
                  onClick={() => setActivo(i)}
                  className={`min-h-11 shrink-0 cursor-pointer rounded-boton border px-4 text-sm transition-colors duration-150 ${
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

          <div
            data-estrategia-panel
            role="tabpanel"
            className="mt-6 rounded-vidrio border border-claro/10 bg-noche/85 p-5 backdrop-blur-md md:p-7"
          >
            <p className="font-display text-base font-semibold md:text-lg">{esc.nombre}</p>
            {esc.supuesto && <p className="mt-0.5 text-sm text-claro/70">{esc.supuesto}</p>}

            <p className="mt-5 text-xs text-claro/60">ISR anual estimado</p>
            <dl className="mt-2 grid grid-cols-2 gap-x-4">
              <div className="border-t border-claro/15 pt-2">
                <dt className="text-xs text-claro/70">Sin estrategia</dt>
                <dd data-cuenta={sin} className="cifras mt-1 font-display text-2xl font-semibold text-[#f7c27a] md:text-3xl">
                  {pesos(sin)}
                </dd>
              </div>
              <div className="border-t border-claro/15 pt-2">
                <dt className="text-xs text-claro/70">Con estrategia</dt>
                <dd data-cuenta={con} className="cifras mt-1 font-display text-2xl font-semibold text-[#9fb4ff] md:text-3xl">
                  {pesos(con)}
                </dd>
              </div>
            </dl>

            <div data-ahorro className="mt-6 border-t border-claro/30 pt-3">
              <p className="text-xs text-claro/70">Diferencia</p>
              <p className="cifras mt-1 font-display text-[2rem] font-semibold leading-none tracking-[-0.02em] md:text-[2.75rem]">
                <span data-cuenta={sin - con}>{pesos(sin - con)}</span>
                <span className="ml-2 text-base font-medium text-claro/80">al año</span>
              </p>
              <DoubleRule draw="manual" className="mt-3 block max-w-[300px]" />
            </div>

            <Desplegable label="Supuestos del cálculo" className="mt-5">
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-xs text-claro/60">Sin estrategia</dt>
                  <dd className="text-claro/85">{esc.sin.etiqueta}</dd>
                </div>
                <div>
                  <dt className="text-xs text-claro/60">Con estrategia</dt>
                  <dd className="text-claro/85">{esc.con.etiqueta}</dd>
                </div>
              </dl>
            </Desplegable>
            <p className="mt-3 text-xs leading-relaxed text-claro/60">{estrategiaCopy.pie}</p>
          </div>

          <Button
            href={waLink("estrategia")}
            external
            className="mt-5 w-full sm:w-auto"
            onClick={() => trackWhatsapp("estrategia", "estrategia")}
          >
            {estrategiaCopy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
