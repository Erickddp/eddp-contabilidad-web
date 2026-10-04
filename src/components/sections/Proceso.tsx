import { proceso } from "@/content/home";

/** Cómo trabajamos: aquí sí hay números, porque es una secuencia. */
export function Proceso() {
  return (
    <section id="proceso" data-forma="4" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor lg:grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="h2 legible text-claro">{proceso.titulo}</h2>
          <ol data-proceso className="relative mt-7">
            {/* Línea de progreso vertical (se llena con el scroll) */}
            <div aria-hidden="true" className="absolute bottom-5 left-[15px] top-5 w-px bg-claro/15">
              <div data-proceso-linea className="h-full w-px origin-top bg-pluma" />
            </div>
            {proceso.pasos.map((p, i) => (
              <li key={p.nombre} data-paso className="relative flex gap-4 pb-7 last:pb-0">
                <span
                  data-paso-num
                  className="cifras relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pluma bg-noche font-display text-sm font-semibold text-claro transition-colors duration-300"
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="legible font-display text-lg font-semibold tracking-[-0.015em] md:text-xl">
                    {p.nombre}
                  </h3>
                  <p className="legible mt-1 max-w-[48ch] text-sm text-claro/80 md:text-[15px]">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
