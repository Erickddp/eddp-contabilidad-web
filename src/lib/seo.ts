import { borderCities } from "@/content/cities";
import { site } from "@/content/site.config";

/** URL pública del sitio. En Vercel se fija con NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://clientes.erickddp.com").replace(/\/$/, "");

export const seo = {
  title: "Contador Público en línea | Contabilidad y estrategia fiscal | EDDP Servicios Contables",
  shortTitle: "EDDP Servicios Contables",
  description:
    "Contabilidad mensual, declaraciones, nómina y estrategia fiscal para personas físicas y empresas en todo México. Pagas lo que marca la ley, ni un peso de más. Primera revisión gratis por WhatsApp.",
  ogTitle: "Tus impuestos, en equilibrio. | EDDP Servicios Contables",
  keywords: [
    "contador público",
    "contador en línea",
    "contabilidad mensual",
    "declaración anual",
    "RESICO",
    "estrategia fiscal",
    "nómina IMSS",
    "constitución de SAS",
    "regularización fiscal",
    "IVA 8% región fronteriza",
    "contador CDMX",
    "Cuajimalpa",
  ],
};

/** JSON-LD del negocio (PROMPT-MAESTRO, sección 12). Sin calle: solo localidad. */
export function negocioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService"],
    "@id": `${SITE_URL}/#negocio`,
    name: site.brand,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    description: seo.description,
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-19:00",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cuajimalpa de Morelos",
      addressRegion: "CDMX",
      addressCountry: "MX",
    },
    areaServed: [
      { "@type": "City", name: "Ciudad de México" },
      ...borderCities.map((c) => ({ "@type": "City", name: c.name })),
      { "@type": "Country", name: "México" },
    ],
    founder: {
      "@type": "Person",
      name: site.owner,
      jobTitle: site.title,
      url: site.social.personal,
    },
    sameAs: [site.social.linkedin, site.social.facebook, site.social.github, site.social.personal],
  };
}
