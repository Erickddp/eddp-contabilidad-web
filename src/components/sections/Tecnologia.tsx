import { tecnologiaCopy } from "@/content/home";
import { site } from "@/content/site.config";

/** Tecnología propia: lista tipo libro, con estado y link cuando existe. */
export function Tecnologia() {
  return (
    <section id="tecnologia" data-forma="5" data-wa="general" className="relative py-24 md:py-32">
      <div className="contenedor lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="h2 legible text-claro">{tecnologiaCopy.titulo}</h2>
          <p className="legible mt-5 max-w-[56ch] text-claro/80 md:text-lg">{tecnologiaCopy.texto}</p>
          <a
            href={site.social.projects}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex min-h-12 items-center text-claro underline decoration-pluma underline-offset-4 hover:decoration-2"
          >
            {tecnologiaCopy.verTodo}
          </a>
        </div>
        <ul className="mt-10 lg:col-span-7 lg:mt-0">
          {site.tools.map((t) => {
            const disponible = t.status === "Disponible";
            const contenido = (
              <>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold">{t.name}</span>
                  <span className="block text-[15px] text-claro/72">{t.desc}</span>
                </span>
                <span
                  className={`shrink-0 rounded-boton border px-2.5 py-1 text-sm ${
                    disponible ? "border-pluma text-[#9fb4ff]" : "border-claro/20 text-claro/72"
                  }`}
                >
                  {t.status}
                </span>
              </>
            );
            return (
              <li key={t.name} className="border-t border-claro/12 last:border-b">
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener"
                    className="flex min-h-16 items-center justify-between gap-4 bg-noche/50 px-1 py-3.5 transition-colors duration-150 hover:bg-claro/5"
                  >
                    {contenido}
                  </a>
                ) : (
                  <div className="flex min-h-16 items-center justify-between gap-4 bg-noche/50 px-1 py-3.5">
                    {contenido}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
