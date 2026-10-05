import { franja } from "@/content/home";

/** Franja de confianza: fila con separadores en desktop; marquee lento en móvil. */
export function Franja() {
  return (
    <section aria-label="Credenciales" className="relative border-y border-blanco/10 bg-grafito/90">
      {/* Móvil: marquee continuo (pausa al tocar y con reduced motion) */}
      <div className="marquee overflow-hidden py-4 md:hidden" tabIndex={0}>
        <ul className="marquee-track flex w-max">
          {[...franja, ...franja].map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= franja.length}
              className="flex items-center whitespace-nowrap px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-blanco/60 after:ml-10 after:shadow-[0_0_8px_rgba(56,189,248,0.8)] after:h-4 after:w-px after:bg-cielo/70"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <ul className="contenedor hidden items-center justify-between py-5 md:flex">
        {franja.map((t, i) => (
          <li
            key={t}
            className={`flex-1 text-center font-mono text-xs uppercase tracking-[0.16em] text-blanco/60 ${
              i > 0 ? "border-l border-blanco/15" : ""
            }`}
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
