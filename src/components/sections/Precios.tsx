"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Carrusel } from "@/components/ui/Carrusel";
import { Cifra } from "@/components/ui/Cifra";
import { Desplegable } from "@/components/ui/Desplegable";
import { preciosCopy } from "@/content/home";
import { extras, plans, pricingConfig, type Plan } from "@/content/pricing";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`;
const VISIBLES = 3;

function precioMensual(plan: Plan, anual: boolean) {
  if (plan.monthly === null) return null;
  return anual ? Math.round(plan.monthly * (1 - pricingConfig.annualDiscount)) : plan.monthly;
}

function PlanCard({ p, anual }: { p: Plan; anual: boolean }) {
  const precio = precioMensual(p, anual);
  const resto = p.includes.slice(VISIBLES);
  return (
    <article
      data-plan
      className={`flex h-full flex-col rounded-vidrio border bg-tinta-2 p-5 md:p-6 ${
        p.featured ? "border-pluma shadow-[inset_0_0_0_1px_var(--color-pluma)]" : "border-claro/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{p.name}</h3>
        {p.featured && (
          <span className="shrink-0 rounded-full bg-pluma/20 px-2.5 py-0.5 text-xs font-medium text-[#b4c4ff]">
            {preciosCopy.destacado}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-claro/65">{p.audience}</p>

      <div className="cifras mt-4">
        {precio === null ? (
          <p className="font-display text-2xl font-semibold">Cotización</p>
        ) : (
          <p className="flex items-baseline gap-1.5">
            <span className="text-xs text-claro/60">Desde</span>
            <span className="font-display text-3xl font-semibold leading-none tracking-[-0.02em]">
              <Cifra value={fmt(precio)} />
            </span>
            <span className="text-xs text-claro/60">/mes{pricingConfig.pricesPlusTax ? " + IVA" : ""}</span>
          </p>
        )}
      </div>

      <ul className="mb-3 mt-4 space-y-1.5 text-sm text-claro/85">
        {p.includes.slice(0, VISIBLES).map((inc) => (
          <li key={inc} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pluma" />
            {inc}
          </li>
        ))}
      </ul>
      {resto.length > 0 && (
        <Desplegable label={`Ver todo (${resto.length} más)`} className="mt-auto">
          <ul className="space-y-1.5 text-sm text-claro/85">
            {resto.map((inc) => (
              <li key={inc} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pluma" />
                {inc}
              </li>
            ))}
          </ul>
        </Desplegable>
      )}
      <Button
        href={waLink("plan", {
          plan: p.name,
          precio: precio === null ? "cotización" : `${fmt(precio)}/mes`,
        })}
        external
        size="sm"
        variant={p.featured ? "primario" : "secundario"}
        className={`w-full ${resto.length > 0 ? "mt-3" : "mt-auto"}`}
        onClick={() => trackWhatsapp("precios", "plan", p.id)}
      >
        {preciosCopy.boton}
      </Button>
    </article>
  );
}

/** Precios en el home: planes simples, el detalle encapsulado y toggle mensual/anual. */
export function Precios() {
  const [anual, setAnual] = useState(false);

  return (
    <section id="precios" data-forma="5" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor">
        <div className="md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <h2 className="h2 legible max-w-[20ch] text-claro">{preciosCopy.titulo}</h2>
            <p className="legible mt-3 max-w-[52ch] text-claro/80">{preciosCopy.intro}</p>
          </div>
          <div
            role="group"
            aria-label="Forma de pago"
            className="mt-5 inline-flex shrink-0 rounded-boton border border-claro/20 bg-noche/70 p-1 md:mt-0"
          >
            {[
              { v: false, l: "Mensual" },
              { v: true, l: `Anual −${pricingConfig.annualDiscount * 100}%` },
            ].map((o) => (
              <button
                key={o.l}
                type="button"
                aria-pressed={anual === o.v}
                onClick={() => setAnual(o.v)}
                className={`min-h-11 cursor-pointer rounded-[9px] px-4 text-sm font-medium transition-colors duration-150 ${
                  anual === o.v ? "bg-pluma text-white" : "text-claro/75 hover:text-claro"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div data-planes className="mt-7">
          <Carrusel
            label="Planes"
            desdeMd="md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:mx-0 md:px-0 md:snap-none xl:grid-cols-4"
            items={plans.map((p) => (
              <PlanCard key={p.id} p={p} anual={anual} />
            ))}
          />
        </div>

        <Desplegable label="Extras y servicios únicos" tono="claro" className="legible mt-6 max-w-[640px]">
          <ul className="space-y-1.5 text-sm text-claro/80">
            <li>
              {extras.nomina.name}: desde {fmt(extras.nomina.monthly)}/mes hasta{" "}
              {extras.nomina.includedWorkers} trabajadores.
            </li>
            <li>
              {extras.facturacion.name}: +{fmt(extras.facturacion.monthly)}/mes.
            </li>
            <li>
              {extras.frontera.name}: +{fmt(extras.frontera.monthly)}/mes.
            </li>
            <li>
              <Link
                href="/precios"
                className="inline-flex min-h-11 items-center text-claro underline decoration-pluma underline-offset-4"
              >
                {preciosCopy.verTodo}
              </Link>
            </li>
          </ul>
        </Desplegable>
      </div>
    </section>
  );
}
