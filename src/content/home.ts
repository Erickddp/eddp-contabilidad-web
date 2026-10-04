// Textos del home. Precios salen de pricing.ts para no duplicarlos.
import { extras, oneOffServices, plans } from "./pricing";
import { site } from "./site.config";
import type { WaTemplate } from "@/lib/whatsapp";

const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`;
const oneOff = (prefix: string) => oneOffServices.find((s) => s.name.startsWith(prefix))?.from ?? "";

export const franja = [
  site.cedula ? `Contador Público titulado, cédula ${site.cedula}` : "Contador Público titulado",
  site.stats.years,
  site.stats.companies,
  "Personas físicas y morales",
];

export const dolores = {
  titulo: "Si te identificas con alguna, hablemos.",
  frases: [
    "Pagas más impuestos de los que deberías y nadie te explica por qué.",
    "Te negaron un crédito porque tu constancia no refleja lo que ganas.",
    "Llevas meses sin declarar y el buzón tributario ya te está buscando.",
    "Estás cerca del tope de RESICO y nadie te ha dicho qué sigue.",
    "Tu contador solo aparece cuando hay que pagar.",
  ],
  cta: "Cuéntame tu caso",
};

export type Servicio = {
  nombre: string;
  paraQuien?: string;
  entregables: string[];
  desde: string;
  wa: { template: WaTemplate; vars?: Record<string, string> };
};

const arranque = plans.find((p) => p.id === "resico")!;

export const serviciosCopy = {
  titulo: "Lo que hago por ti",
  intro:
    "Todo en línea. Tú me mandas tus documentos por WhatsApp o Drive; yo presento, te explico y te aviso antes de que algo venza.",
};

/** Región fronteriza es uno más, en la posición 6 (CAMBIO-V2). */
export const servicios: Servicio[] = [
  {
    nombre: "Contabilidad mensual",
    paraQuien: "Personas físicas y morales que quieren cumplir sin pensar en el SAT.",
    entregables: [
      "Declaraciones mensuales de ISR e IVA",
      "Contabilidad electrónica",
      "Conciliación bancaria",
      "Reporte mensual de tus números",
    ],
    desde: `${fmt(arranque.monthly!)}/mes`,
    wa: { template: "servicio", vars: { servicio: "Contabilidad mensual" } },
  },
  {
    nombre: "Regularización fiscal",
    paraQuien: "Quien tiene atrasos, errores o nunca declaró.",
    entregables: [
      "Diagnóstico completo",
      "Plan por prioridades",
      "Declaraciones atrasadas y complementarias",
      "Opinión de cumplimiento positiva como meta",
    ],
    desde: oneOff("Regularización"),
    wa: { template: "regularizacion" },
  },
  {
    nombre: "Estrategia fiscal",
    paraQuien: "Quien está por crecer, cambiar de régimen o abrir una empresa.",
    entregables: [
      "Comparativo de regímenes con números",
      "Escenarios de persona física contra SAS",
      "Un plan legal para pagar lo justo",
    ],
    desde: oneOff("Estudio de estrategia"),
    wa: { template: "estrategia" },
  },
  {
    nombre: "Estados financieros",
    paraQuien: "Quien necesita un crédito, una licitación o tomar decisiones.",
    entregables: [
      "Balance general",
      "Estado de resultados",
      "Relaciones analíticas",
      "Explicación en lenguaje claro",
    ],
    desde: oneOff("Estados financieros"),
    wa: { template: "servicio", vars: { servicio: "Estados financieros" } },
  },
  {
    nombre: "Nómina e IMSS",
    paraQuien: "Negocios con 1 a 15 trabajadores.",
    entregables: [
      "Recibos timbrados",
      "Altas y bajas en IMSS, SUA e INFONAVIT",
      "Impuesto sobre nómina",
      "Retenciones",
    ],
    desde: `${fmt(extras.nomina.monthly)}/mes`,
    wa: { template: "nomina" },
  },
  {
    nombre: "Región fronteriza norte",
    paraQuien: "Negocios en municipios fronterizos.",
    entregables: [
      "Alta y mantenimiento en el padrón del estímulo",
      "Validación del requisito de ingresos en la región",
      "Facturación correcta al 8%",
      "Cálculo del beneficio de ISR cuando aplica",
    ],
    desde: `+${fmt(extras.frontera.monthly)}/mes`,
    wa: { template: "frontera" },
  },
  {
    nombre: "Constitución de SAS",
    paraQuien: "Emprendedores que quieren formalizarse.",
    entregables: [
      "Elección de régimen",
      "Constitución en línea",
      "RFC y e.firma de la sociedad",
      "Configuración contable inicial",
    ],
    desde: oneOff("Constitución de SAS"),
    wa: { template: "sas" },
  },
  {
    nombre: "Declaración anual",
    paraQuien: "Asalariados con deducciones, personas con actividad y empresas.",
    entregables: ["Cálculo con deducciones personales bien aplicadas", "Presentación a tiempo"],
    desde: oneOff("Declaración anual persona física (sueldos"),
    wa: { template: "servicio", vars: { servicio: "Declaración anual" } },
  },
  {
    nombre: "Requerimientos y cartas invitación del SAT",
    paraQuien: "Quien recibió un aviso y no sabe qué contestar.",
    entregables: ["Análisis", "Integración de pruebas", "Respuesta en tiempo", "Seguimiento"],
    desde: oneOff("Requerimiento"),
    wa: { template: "servicio", vars: { servicio: "Requerimientos y cartas invitación del SAT" } },
  },
  {
    nombre: "Devoluciones de saldo a favor",
    entregables: ["Revisión", "Expediente", "Solicitud de devolución"],
    desde: oneOff("Devolución"),
    wa: { template: "servicio", vars: { servicio: "Devolución de saldo a favor" } },
  },
];

export const proceso = {
  titulo: "Cómo trabajamos",
  pasos: [
    {
      nombre: "Diagnóstico gratis",
      texto: "20–30 minutos por WhatsApp o llamada. Me cuentas tu situación y te digo qué urge.",
    },
    {
      nombre: "Propuesta y contrato",
      texto: "Precio fijo por escrito, alcance claro y sin letras chiquitas.",
    },
    {
      nombre: "Alta",
      texto:
        "Me compartes accesos (contraseña del SAT y, si aplica, e.firma bajo resguardo) y tus documentos.",
    },
    {
      nombre: "Operación mensual",
      texto: "Presento, te mando el acuse y un resumen de tus números cada mes.",
    },
    {
      nombre: "Cierre anual",
      texto: "Declaración anual y revisión de estrategia para el siguiente año.",
    },
  ],
};

export const preciosCopy = {
  titulo: "Precios claros desde el primer mensaje",
  intro: "Precio fijo al mes. Si pagas el año completo, 10% menos.",
  destacado: "El más elegido",
  boton: "Quiero este plan",
  verTodo: "Ver precios completos y servicios únicos",
};

/** Casos reales anonimizados (PROMPT-MAESTRO, sección 4). No agregar datos. */
export type Caso = {
  titulo: string;
  problema: string;
  hecho: string[];
  resultado?: string;
  enProceso?: boolean;
};

export const casosCopy = {
  titulo: "Casos",
  intro: "Expedientes reales, sin nombres.",
};

export const casos: Caso[] = [
  {
    titulo: "Contratista de energía renovable en Ciudad Juárez (RESICO)",
    problema: "Facturaba al 16% y no tenía el estímulo fronterizo.",
    hecho: [
      "Alta en el padrón de beneficiarios del estímulo de la región fronteriza norte",
      "Seguimiento al retraso del portal del SAT hasta la aprobación",
      "Desglose mensual con IVA al 8%",
      "Contrato de servicios formal",
    ],
    resultado: "Factura al 8% y cumple cada mes.",
  },
  {
    titulo: "Profesional de la salud cerca del tope de RESICO",
    problema: "Sus ingresos iban a rebasar el límite del régimen.",
    hecho: [
      "Modelado de escenarios: seguir como persona física con actividad empresarial o constituir sociedad",
      "Cambio de régimen",
      "Constitución de una SAS para su práctica",
      "Alta patronal ante el IMSS para su primera nómina",
    ],
    resultado: "Estructura lista para crecer sin sorpresas.",
  },
  {
    titulo: "Trabajador transfronterizo del sector reciclaje",
    problema: "Su constancia solo mostraba sueldos y le negaron un crédito hipotecario.",
    hecho: [
      "Recuperación de e.firma y contraseña",
      "Diagnóstico de obligaciones",
      "Plan de regularización de su actividad empresarial",
    ],
    resultado: "En proceso de regularización para volver a solicitar el crédito.",
    enProceso: true,
  },
  {
    titulo: "Devolución de saldo a favor",
    problema: "El contribuyente tenía saldo a favor sin reclamar.",
    hecho: ["Integración del expediente", "Solicitud de devolución ante el SAT (FED)"],
  },
];

export const tecnologiaCopy = {
  titulo: "Herramientas que construí para trabajar más rápido (y cobrarte justo).",
  texto:
    "Estudio Inteligencia Artificial y lo aplico a la contabilidad. Lo repetitivo lo hace la máquina; el criterio fiscal lo pongo yo.",
  enDesarrollo: "En desarrollo",
  verTodo: "Ver todos mis proyectos",
};

export const sobreMi = {
  titulo: "Sobre mí",
  // Lo que se ve de entrada; el resto va en un desplegable.
  corto:
    "Soy Erick Domínguez Del Prado, Contador Público. Llevé la contabilidad de grupos corporativos con más de quince empresas y hoy pongo esa experiencia al servicio de personas y negocios que necesitan un contador que sí conteste.",
  resto:
    "Migraciones a SAP, respuestas a requerimientos del SAT y conciliaciones multiempresa. Trabajo desde el poniente de la Ciudad de México y atiendo en línea a clientes de todo el país.",
  verMas: "Formación y experiencia",
  filas: [
    {
      concepto: "Formación",
      valor: "Contaduría Pública (CESCIJUC) y Licenciatura en IA (UTEL, en curso).",
    },
    {
      concepto: "Experiencia",
      valor:
        "15 radiodifusoras y su controladora: migración a SAP con validación de saldos cuenta por cuenta y atención de un requerimiento del SAT. Antes, 24 inmobiliarias y una comercializadora.",
    },
    {
      concepto: "Herramientas",
      valor: "SAP Business One, Aspel COI, CFDI 4.0, Python, SQL, Power BI, Make y n8n.",
    },
  ],
};

export const ctaFinal = {
  titulo: "Tu primera revisión es gratis.",
  texto: "Cuéntame tu situación y en 20 minutos sabes qué urge, qué cuesta y qué puedes ahorrar.",
  whatsapp: "Escríbeme por WhatsApp",
  agendar: "Agendar llamada",
  formulario: "Prefiero un formulario",
};
