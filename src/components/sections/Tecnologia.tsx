import { ArrowUpRight } from "lucide-react";
import { Desplegable } from "@/components/ui/Desplegable";
import { tecnologiaCopy } from "@/content/home";
import { site } from "@/content/site.config";
import { Etiqueta } from "@/components/ui/Etiqueta";

/** Tecnología propia: las disponibles a la vista; las que están en desarrollo, encapsuladas. */
export function Tecnologia() {
  const disponibles = site.tools.filter((t) => t.status === "Disponible");
  const enDesarrollo = site.tools.filter((t) => t.status !== "Disponible");

  return (
    <section id="tecnologia" data-forma="5" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Etiqueta>Tecnología propia</Etiqueta>
          <h2 className="h2 legible mt-3 max-w-[22ch] text-blanco">{tecnologiaCopy.titulo}</h2>
          <p className="legible mt-3 max-w-[50ch] text-blanco/80">{tecnologiaCopy.texto}</p>
        </div>
        <div className="mt-7 lg:col-span-7 lg:mt-0">
          <ul className="grid grid-cols-2 gap-3">
            {disponibles.map((t) => (
              <li key={t.name}>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener"
                  data-tilt
                  className="tarjeta foco borde-vivo group flex h-full min-h-24 flex-col justify-between p-4 transition-transform duration-300"
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-display text-base font-semibold leading-tight">{t.name}</span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-blanco/50 transition-colors duration-150 group-hover:text-blanco"
                    />
                  </span>
                  <span className="mt-2 text-xs leading-snug text-blanco/65">{t.desc}</span>
                </a>
              </li>
            ))}
          </ul>
          <Desplegable
            label={`${tecnologiaCopy.enDesarrollo} (${enDesarrollo.length})`}
            tono="claro"
            className="legible mt-4"
          >
            <ul className="space-y-2 text-sm">
              {enDesarrollo.map((t) => (
                <li key={t.name} className="flex justify-between gap-3">
                  <span className="text-blanco/90">{t.name}</span>
                  <span className="text-right text-blanco/60">{t.desc}</span>
                </li>
              ))}
            </ul>
          </Desplegable>
          <a
            href={site.social.projects}
            target="_blank"
            rel="noopener"
            className="legible mt-2 inline-flex min-h-11 items-center text-sm text-blanco underline decoration-cielo underline-offset-4 hover:decoration-2"
          >
            {tecnologiaCopy.verTodo}
          </a>
        </div>
      </div>
    </section>
  );
}
