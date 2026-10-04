import Image from "next/image";
import { Desplegable } from "@/components/ui/Desplegable";
import { sobreMi } from "@/content/home";
import { site } from "@/content/site.config";
import foto from "../../../public/images/erick.png";

/** Sobre mí: en móvil, foto chica junto al título; el detalle va en un desplegable. */
export function SobreMi() {
  const filas = [
    sobreMi.filas[0],
    ...(site.cedula ? [{ concepto: "Cédula", valor: site.cedula }] : []),
    ...sobreMi.filas.slice(1),
  ];
  return (
    <section id="sobre-mi" data-forma="5" data-wa="general" className="relative py-16 md:py-24">
      <div className="contenedor grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex items-center gap-4 lg:col-span-4 lg:block">
          <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-libro bg-tinta-2 md:w-32 lg:aspect-[4/5] lg:w-full lg:max-w-[340px]">
            <Image
              src={foto}
              alt={`${site.owner}, ${site.title}`}
              fill
              sizes="(min-width: 1024px) 340px, 128px"
              className="object-cover object-top grayscale contrast-[1.05]"
            />
            {/* Duotono sutil: sombras en tinta, luces hacia papel */}
            <div className="absolute inset-0 bg-tinta opacity-35 mix-blend-multiply" />
            <div className="absolute inset-0 bg-papel opacity-25 mix-blend-soft-light" />
          </div>
          <h2 className="h2 legible text-claro lg:hidden">{sobreMi.titulo}</h2>
        </div>
        <div className="lg:col-span-8">
          <h2 className="h2 legible hidden text-claro lg:block">{sobreMi.titulo}</h2>
          <p className="legible max-w-[60ch] text-claro/85 lg:mt-4">{sobreMi.corto}</p>
          <Desplegable label={sobreMi.verMas} tono="claro" className="mt-5 max-w-[640px] rounded-libro bg-noche/60">
            <p className="text-sm text-claro/80">{sobreMi.resto}</p>
            <dl className="mt-3 text-sm">
              {filas.map((f) => (
                <div key={f.concepto} className="grid gap-0.5 border-t border-claro/10 py-2.5 md:grid-cols-[8rem_1fr] md:gap-4">
                  <dt className="text-claro/60">{f.concepto}</dt>
                  <dd className="text-claro/90">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </Desplegable>
        </div>
      </div>
    </section>
  );
}
