import { casos, casosCopy, type Caso } from "@/content/home";

function Ficha({ c }: { c: Caso }) {
  return (
    <article data-ficha className="h-full rounded-libro border border-renglon bg-papel p-6 text-tinta md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-[30ch] font-display text-xl font-semibold leading-snug tracking-[-0.015em] md:text-2xl">
          {c.titulo}
        </h3>
        {c.enProceso && (
          <span className="rounded-boton border border-pluma px-2.5 py-1 text-sm text-pluma">En proceso</span>
        )}
      </div>
      <dl className="mt-5 text-[15px] md:text-base">
        <div className="grid gap-1 border-t border-renglon py-3 md:grid-cols-[9rem_1fr] md:gap-4">
          <dt className="font-medium text-tinta/70">Problema</dt>
          <dd>{c.problema}</dd>
        </div>
        <div className="grid gap-1 border-t border-renglon py-3 md:grid-cols-[9rem_1fr] md:gap-4">
          <dt className="font-medium text-tinta/70">Qué se hizo</dt>
          <dd>
            <ul className="list-disc space-y-1 pl-5 marker:text-tinta/40">
              {c.hecho.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </dd>
        </div>
        {c.resultado && (
          <div className="grid gap-1 border-t border-renglon py-3 md:grid-cols-[9rem_1fr] md:gap-4">
            <dt className="font-medium text-tinta/70">Resultado</dt>
            <dd className="font-medium">{c.resultado}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

/** Casos como fichas de expediente: alterna ancho completo y dos columnas. */
export function Casos() {
  return (
    <section id="casos" data-forma="5" data-wa="general" className="relative py-24 md:py-32">
      <div className="contenedor">
        <h2 className="h2 legible text-claro">{casosCopy.titulo}</h2>
        <p className="legible mt-4 max-w-[60ch] text-claro/80 md:text-lg">{casosCopy.intro}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {casos.map((c, i) => (
            <div key={c.titulo} className={i === 0 || i === casos.length - 1 ? "md:col-span-2" : ""}>
              <Ficha c={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
