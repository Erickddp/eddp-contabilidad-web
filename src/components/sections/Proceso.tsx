import { proceso } from "@/content/home";

/** Cómo trabajamos: aquí sí hay números, porque es una secuencia. */
export function Proceso() {
  return (
    <section id="proceso" data-forma="4" data-wa="general" className="relative py-24 md:py-32">
      <div className="contenedor lg:grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="h2 legible text-claro">{proceso.titulo}</h2>
          <ol data-proceso className="relative mt-10">
            {/* Línea de progreso vertical (se llena con el scroll) */}
            <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-claro/15">
              <div data-proceso-linea className="h-full w-px origin-top bg-pluma" />
            </div>
            {proceso.pasos.map((p, i) => (
              <li key={p.nombre} data-paso className="relative flex gap-5 pb-10 last:pb-0">
                <span
                  data-paso-num
                  className="cifras relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pluma bg-noche font-display text-base font-semibold text-claro"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="legible font-display text-xl font-semibold tracking-[-0.015em] md:text-2xl">
                    {p.nombre}
                  </h3>
                  <p className="legible mt-1.5 max-w-[48ch] text-claro/80">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
