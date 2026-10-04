export const site = {
  brand: "EDDP Servicios Contables",
  shortBrand: "EDDP",
  owner: "Erick Domínguez Del Prado",
  title: "Contador Público",
  cedula: "", // TODO(Rick): confirmar en cedulaprofesional.sep.gob.mx (13182616 vs 13758780)
  education: [
    { title: "Licenciatura en Contaduría Pública", school: "CESCIJUC", years: "2019–2022" },
    { title: "Licenciatura en Inteligencia Artificial", school: "UTEL", years: "En curso" },
  ],
  stats: {
    years: "Más de 6 años de experiencia",
    companies: "Más de 40 empresas llevadas en corporativo", // TODO(Rick): confirmar
  },
  locality: "Cuajimalpa de Morelos, Ciudad de México",
  inPersonArea: ["Cuajimalpa", "Santa Fe", "Álvaro Obregón", "Huixquilucan"],
  hours: "Lunes a viernes, 9:00 a 19:00 (hora CDMX)",
  responseTime: "Respondo en menos de 24 horas hábiles",
  whatsapp: "525534806184",
  phoneDisplay: "+52 55 3480 6184",
  email: "cperickd@gmail.com", // TODO(Rick): contacto@erickddp.com
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  heroMedia: "canvas" as "canvas" | "video",
  borderDecree: {
    validUntil: "31 de diciembre de 2026",
    lastExtension: "31 de diciembre de 2025",
  }, // TODO(Rick): actualizar si hay nueva prórroga
  social: {
    linkedin: "https://www.linkedin.com/in/erick-dominguez-4296411a9/",
    facebook: "https://www.facebook.com/profile.php?id=61584844233250",
    github: "https://github.com/Erickddp",
    personal: "https://erickddp.com",
    projects: "https://proyectos.erickddp.com",
  },
  tools: [
    { name: "Analizador CFDI", desc: "Análisis fiscal masivo de XML", status: "Disponible", url: "https://axml.erickddp.com" },
    { name: "CFDI SQL Lab", desc: "Consultas y dashboards sobre CFDI", status: "Disponible", url: "https://sql.erickddp.com" },
    { name: "EVOAPP", desc: "Herramientas contables en un flujo guiado", status: "Disponible", url: "https://app.evorix.com.mx" },
    { name: "myfiscal", desc: "Declaraciones asistidas", status: "Disponible", url: "https://myfiscal.erickddp.com" },
    { name: "ContHabil", desc: "Contabilidad RESICO automatizada", status: "En desarrollo" },
    { name: "Nómina EDDP", desc: "Motor de nómina propio", status: "En desarrollo" },
    { name: "Descarga masiva de XML", desc: "Descarga y clasificación de CFDI del SAT", status: "En desarrollo" },
    { name: "Facturador CFDI 4.0", desc: "Facturación propia con PAC", status: "En desarrollo" },
  ] as { name: string; desc: string; status: "Disponible" | "En desarrollo"; url?: string }[],
  testimonials: [] as { quote: string; name: string; role: string }[], // solo reales con permiso escrito
  pricesPlusTax: true,
  annualDiscount: 0.1,
};
