import { Check } from "lucide-react";
import { formatMxn } from "@/lib/format";
import { DoubleRule } from "./DoubleRule";

export const ledgerRows = [
  { label: "Ingresos cobrados", value: 78500 },
  { label: "IVA trasladado (8%)", value: 6280 },
  { label: "IVA acreditable", value: -2118.4 },
  { label: "IVA a pagar", value: 4161.6 },
  { label: "ISR RESICO (1.10%)", value: 863.5 },
] as const;

export const ledgerTotal = 5025.1;

/** Tarjeta "libro": un pago provisional de ejemplo, con la doble raya bajo el total. */
export function LedgerCard() {
  return (
    <div
      data-hero="card"
      className="vidrio w-full p-6 md:p-8 lg:max-w-[460px] lg:justify-self-end"
    >
      <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
        Pago provisional de septiembre
      </h2>

      <dl className="mt-6">
        {ledgerRows.map((row) => (
          <div
            key={row.label}
            data-row
            className="flex items-baseline justify-between gap-4 border-t border-claro/10 py-3 first:border-t-0"
          >
            <dt className="text-[15px] text-claro/72 md:text-base">{row.label}</dt>
            <dd
              data-amount
              data-value={row.value}
              className="cifras text-[15px] md:text-base"
            >
              {formatMxn(row.value)}
            </dd>
          </div>
        ))}

        <div
          data-row
          className="flex items-baseline justify-between gap-4 border-t border-claro/30 pt-4"
        >
          <dt className="font-display text-lg font-semibold">Total a pagar</dt>
          <dd
            data-amount
            data-value={ledgerTotal}
            className="cifras font-display text-xl font-semibold md:text-2xl"
          >
            {formatMxn(ledgerTotal)}
          </dd>
        </div>
      </dl>

      <DoubleRule draw="manual" className="mt-2 block" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span
          data-hero="chip"
          className="inline-flex items-center gap-2 rounded-boton border border-cuadre/60 bg-cuadre/15 px-3 py-1.5 text-sm text-claro"
        >
          <Check size={16} className="text-[#ff6b5c]" aria-hidden="true" />
          Cuadra, presentada el 14 de octubre
        </span>
        <span className="text-xs text-claro/60">Ejemplo ilustrativo</span>
      </div>
    </div>
  );
}
