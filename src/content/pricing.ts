// Precios en MXN, mostrados como "desde". Todo editable aquí.

export const pricingConfig = {
  pricesPlusTax: true,
  annualDiscount: 0.1,
};

export type Plan = {
  id: "resico" | "profesional" | "empresa" | "medida";
  name: string;
  audience: string;
  monthly: number | null; // null = cotización
  includes: string[];
  featured?: boolean;
  /** Máximo de CFDI al mes incluidos (para el cotizador). */
  cfdiLimit?: number;
};

export const plans: Plan[] = [
  {
    id: "resico",
    name: "Arranque RESICO",
    audience: "Personas físicas en RESICO",
    monthly: 500,
    cfdiLimit: 30,
    includes: [
      "Declaraciones mensuales de ISR e IVA",
      "Revisión de hasta 30 CFDI al mes",
      "Opinión de cumplimiento",
      "Revisión de buzón tributario",
      "Recordatorios y atención por WhatsApp en horario hábil",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    audience: "Actividad empresarial y profesional, arrendamiento, plataformas digitales",
    monthly: 1200,
    cfdiLimit: 80,
    featured: true,
    includes: [
      "Todo lo del plan Arranque RESICO",
      "Contabilidad electrónica",
      "Pagos provisionales con deducciones bien aplicadas",
      "DIOT",
      "Conciliación bancaria",
      "Hasta 80 CFDI al mes",
      "Reporte mensual de resultados",
    ],
  },
  {
    id: "empresa",
    name: "Empresa",
    audience: "Personas morales (SAS, SA de CV; RESICO PM o régimen general)",
    monthly: 2800,
    cfdiLimit: 150,
    includes: [
      "Contabilidad completa",
      "Estados financieros mensuales",
      "Pagos provisionales, IVA, retenciones y DIOT",
      "Contabilidad electrónica",
      "Conciliaciones",
      "Hasta 150 CFDI al mes",
      "Llamada mensual de revisión",
    ],
  },
  {
    id: "medida",
    name: "A la medida",
    audience: "Grupos, varias razones sociales, alto volumen, migraciones de sistema",
    monthly: null,
    includes: ["Diagnóstico y propuesta específica"],
  },
];

export const extras = {
  frontera: {
    name: "Estímulo región fronteriza",
    monthly: 300,
    desc: "Avisos y padrón, validación del 90%, revisión de facturación al 8% y cálculo del crédito de ISR cuando aplica.",
  },
  nomina: {
    name: "Nómina",
    monthly: 450,
    includedWorkers: 3,
    perExtraWorker: 120,
    desc: "Desde $450/mes hasta 3 trabajadores; +$120 por trabajador adicional.",
  },
  facturacion: {
    name: "Facturación por ti",
    monthly: 250,
    maxInvoices: 30,
    desc: "Hasta 30 facturas al mes.",
  },
};

export type OneOffService = { name: string; from: string; note?: string };

export const oneOffServices: OneOffService[] = [
  { name: "Diagnóstico fiscal (20–30 min)", from: "Gratis" },
  { name: "Declaración anual persona física (sueldos, deducciones)", from: "$800" },
  { name: "Declaración anual persona física con actividad", from: "$1,500" },
  { name: "Declaración anual persona moral", from: "$4,500" },
  { name: "Regularización fiscal (diagnóstico y plan)", from: "$2,500", note: "+ $350 por mes atrasado presentado" },
  { name: "Constitución de SAS (honorarios)", from: "$3,500" },
  { name: "Estados financieros para crédito o licitación", from: "$2,500" },
  { name: "Requerimiento o carta invitación del SAT", from: "$2,500", note: "según alcance" },
  { name: "Devolución de saldo a favor", from: "$1,500", note: "o porcentaje del monto recuperado (a convenir)" },
  { name: "Estudio de estrategia fiscal (cambio de régimen, persona física a SAS, frontera)", from: "$3,500" },
  { name: "Alta en RFC, cambio de régimen o recuperación de contraseña", from: "$500" },
];

/** Reglas del cotizador (la lógica se implementa en la Fase 3, con tests). */
export const quoteRules = {
  excessCfdiBlock: 30,
  excessCfdiPrice: 150,
  maxCfdiBeforeCustom: 150,
  regularization: { base: 2500, perMonth: 350 },
  nominaCustomAbove: 10,
};
