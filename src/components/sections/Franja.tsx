import { franja } from "@/content/home";

/** Franja de confianza: fila con separadores en desktop; marquee lento en móvil. */
export function Franja() {
  return (
    <section aria-label="Credenciales" className="relative border-y border-claro/10 bg-noche/70 backdrop-blur-sm">
      {/* Móvil: marquee continuo (pausa al tocar y con reduced motion) */}
      <div className="marquee overflow-hidden py-4 md:hidden" tabIndex={0}>
        <ul className="marquee-track flex w-max">
          {[...franja, ...franja].map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= franja.length}
              className="flex items-center whitespace-nowrap px-5 text-[15px] text-claro/80 after:ml-10 after:h-4 after:w-px after:bg-claro/20"
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
            className={`flex-1 text-center text-[15px] text-claro/80 lg:text-base ${
              i > 0 ? "border-l border-claro/15" : ""
            }`}
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
