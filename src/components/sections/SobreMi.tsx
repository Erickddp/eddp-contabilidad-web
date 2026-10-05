import Image from "next/image";
import { Desplegable } from "@/components/ui/Desplegable";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { sobreMi } from "@/content/home";
import { site } from "@/content/site.config";
import retrato from "../../../public/images/portada.png";

/** Sobre mí: retrato con degradado al negro y luz cielo; el detalle va en un desplegable. */
export function SobreMi() {
  const filas = [
    sobreMi.filas[0],
    ...(site.cedula ? [{ concepto: "Cédula", valor: site.cedula }] : []),
    ...sobreMi.filas.slice(1),
  ];
  return (
    <section id="sobre-mi" data-forma="5" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
        <figure
          data-retrato
          className="tarjeta borde-vivo activo aspect-[4/3] lg:col-span-5 lg:aspect-[4/5]"
        >
          {/* Caja interior a 1 px: deja ver el borde vivo alrededor de la foto */}
          <div className="absolute inset-[1px] overflow-hidden rounded-[17px]">
            <Image
              src={retrato}
              alt={`${site.owner}, ${site.title}`}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 460px, 92vw"
              className="object-cover object-[50%_18%] contrast-[1.05] saturate-[0.85]"
            />
            {/* Luz cielo y caída a negro: el retrato se funde con la página */}
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,rgba(56,189,248,0.18),transparent_70%)] mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/20 to-transparent" />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 p-5 lg:hidden">
            <Etiqueta>Sobre mí</Etiqueta>
            <p className="mt-2 font-display text-2xl font-extrabold tracking-[-0.03em]">{site.owner}</p>
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <div className="hidden lg:block">
            <Etiqueta>Sobre mí</Etiqueta>
            <h2 className="h2 legible mt-3 text-blanco">{site.owner}</h2>
          </div>
          <h2 className="sr-only lg:hidden">{sobreMi.titulo}</h2>
          <p className="legible max-w-[58ch] text-blanco/80 lg:mt-5">{sobreMi.corto}</p>
          <Desplegable label={sobreMi.verMas} tono="claro" className="mt-5 max-w-[640px]">
            <p className="text-sm text-blanco/75">{sobreMi.resto}</p>
            <dl className="mt-3 text-sm">
              {filas.map((f) => (
                <div
                  key={f.concepto}
                  className="grid gap-0.5 border-t border-blanco/10 py-2.5 md:grid-cols-[8rem_1fr] md:gap-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-blanco/45">{f.concepto}</dt>
                  <dd className="text-blanco/90">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </Desplegable>
        </div>
      </div>
    </section>
  );
}
