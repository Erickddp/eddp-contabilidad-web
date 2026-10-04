"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { preciosCopy } from "@/content/home";
import { extras, plans, pricingConfig, type Plan } from "@/content/pricing";
import { trackWhatsapp } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { Cifra } from "@/components/ui/Cifra";

const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`;

function precioMensual(plan: Plan, anual: boolean) {
  if (plan.monthly === null) return null;
  return anual ? Math.round(plan.monthly * (1 - pricingConfig.annualDiscount)) : plan.monthly;
}

/** Precios en el home: planes mensuales con toggle mensual/anual. */
export function Precios() {
  const [anual, setAnual] = useState(false);

  return (
    <section id="precios" data-forma="5" data-wa="general" className="relative py-24 md:py-32">
      <div className="contenedor">
        <h2 className="h2 legible max-w-[20ch] text-claro">{preciosCopy.titulo}</h2>
        <p className="legible mt-4 max-w-[60ch] text-claro/80 md:text-lg">{preciosCopy.intro}</p>

        <div
          role="group"
          aria-label="Forma de pago"
          className="mt-8 inline-flex rounded-boton border border-claro/20 bg-noche/60 p-1"
        >
          {[
            { v: false, l: "Mensual" },
            { v: true, l: `Anual (−${pricingConfig.annualDiscount * 100}%)` },
          ].map((o) => (
            <button
              key={o.l}
              type="button"
              aria-pressed={anual === o.v}
              onClick={() => setAnual(o.v)}
              className={`min-h-12 cursor-pointer rounded-[9px] px-5 text-[15px] font-medium transition-colors duration-150 ${
                anual === o.v ? "bg-pluma text-white" : "text-claro/80 hover:text-claro"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>

        <ul data-planes className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => {
            const precio = precioMensual(p, anual);
            return (
              <li
                key={p.id}
                data-plan
                className={`relative flex flex-col rounded-libro border bg-papel p-6 text-tinta ${
                  p.featured ? "border-pluma outline outline-2 outline-pluma" : "border-renglon"
                }`}
              >
                {p.featured && (
                  <p className="mb-3 text-sm font-medium text-pluma">{preciosCopy.destacado}</p>
                )}
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-1 text-[15px] text-tinta/70">{p.audience}</p>
                <div className="cifras mt-5 border-y border-renglon py-4">
                  {precio === null ? (
                    <p className="font-display text-3xl font-semibold">Cotización</p>
                  ) : (
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-sm text-tinta/70">Desde</span>
                      <span className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.02em]">
                        <Cifra value={fmt(precio)} />
                      </span>
                      <span className="text-sm text-tinta/70">
                        /mes{pricingConfig.pricesPlusTax ? " + IVA" : ""}
                      </span>
                    </p>
                  )}
                </div>
                <ul className="mt-4 flex-1 text-[15px]">
                  {p.includes.map((inc) => (
                    <li key={inc} className="border-b border-renglon/70 py-2 last:border-0">
                      {inc}
                    </li>
                  ))}
                </ul>
                <Button
                  href={waLink("plan", {
                    plan: p.name,
                    precio: precio === null ? "cotización" : `${fmt(precio)}/mes`,
                  })}
                  external
                  variant="papel-oscuro"
                  className="mt-5 w-full"
                  onClick={() => trackWhatsapp("precios", "plan", p.id)}
                >
                  {preciosCopy.boton}
                </Button>
              </li>
            );
          })}
        </ul>

        <p className="legible mt-8 max-w-[70ch] text-[15px] text-claro/80">
          Extras: {extras.nomina.name.toLowerCase()} desde {fmt(extras.nomina.monthly)}/mes,{" "}
          {extras.facturacion.name.toLowerCase()} +{fmt(extras.facturacion.monthly)}/mes y{" "}
          {extras.frontera.name.toLowerCase()} +{fmt(extras.frontera.monthly)}/mes.{" "}
          <Link href="/precios" className="text-claro underline decoration-pluma underline-offset-4 hover:decoration-2">
            {preciosCopy.verTodo}
          </Link>
        </p>
      </div>
    </section>
  );
}
