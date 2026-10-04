import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/faq";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Preguntas frecuentes: sin animación de entrada, solo el acordeón. */
export function Preguntas() {
  return (
    <section id="preguntas" data-forma="5" data-wa="general" className="relative py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="contenedor lg:grid lg:grid-cols-12 lg:gap-8">
        <h2 className="h2 legible text-claro lg:col-span-4">Preguntas frecuentes</h2>
        <div className="mt-6 lg:col-span-8 lg:mt-0">
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
