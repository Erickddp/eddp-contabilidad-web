import Image from "next/image";
import { sobreMi } from "@/content/home";
import { site } from "@/content/site.config";
import foto from "../../../public/images/erick.png";

/** Sobre mí: foto con duotono tinta/papel y datos en filas tipo libro. */
export function SobreMi() {
  const filas = [
    sobreMi.filas[0],
    ...(site.cedula ? [{ concepto: "Cédula", valor: site.cedula }] : []),
    ...sobreMi.filas.slice(1),
  ];
  return (
    <section id="sobre-mi" data-forma="5" data-wa="general" className="relative py-24 md:py-32">
      <div className="contenedor grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-libro bg-tinta-2">
            <Image
              src={foto}
              alt={`${site.owner}, ${site.title}`}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover grayscale contrast-[1.05]"
            />
            {/* Duotono sutil: sombras en tinta, luces hacia papel */}
            <div className="absolute inset-0 bg-tinta mix-blend-multiply opacity-35" />
            <div className="absolute inset-0 bg-papel mix-blend-soft-light opacity-25" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="h2 legible text-claro">{sobreMi.titulo}</h2>
          <p className="legible mt-5 max-w-[62ch] text-claro/85 md:text-lg">{sobreMi.texto}</p>
          <dl className="mt-8">
            {filas.map((f) => (
              <div
                key={f.concepto}
                className="grid gap-1 border-t border-claro/12 bg-noche/50 py-4 last:border-b md:grid-cols-[10rem_1fr] md:gap-6"
              >
                <dt className="font-medium text-claro/72">{f.concepto}</dt>
                <dd className="text-claro/90">{f.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
