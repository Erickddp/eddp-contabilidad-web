import { site } from "@/content/site.config";

export type WaTemplate =
  | "general"
  | "plan"
  | "frontera"
  | "regularizacion"
  | "sas"
  | "nomina"
  | "servicio"
  | "agendar"
  | "cotizador";

const templates: Record<WaTemplate, string> = {
  general: "Hola Erick, vengo de tu página. Quiero información sobre tus servicios contables.",
  plan: "Hola Erick, me interesa el plan {plan} (desde {precio}). Mi situación es: ",
  frontera: "Hola Erick, facturo en la frontera y quiero revisar si aplico al IVA del 8%.",
  regularizacion: "Hola Erick, tengo declaraciones atrasadas y quiero regularizarme.",
  sas: "Hola Erick, quiero constituir una SAS.",
  nomina: "Hola Erick, necesito llevar la nómina de mi negocio.",
  servicio: "Hola Erick, quiero información sobre: {servicio}.",
  agendar: "Hola Erick, quiero agendar una llamada. Mi horario disponible es: ",
  cotizador:
    "Hola Erick, hice mi cotización en tu página:\n• Tipo: {tipo}\n• Régimen: {regimen}\n• Facturas al mes: {cfdi}\n• Trabajadores: {trabajadores}\n• Frontera: {frontera}\n• Meses sin declarar: {atrasos}\nEstimado: desde {mensual}/mes{unico}. ¿Lo revisamos?",
};

export function waMessage(key: WaTemplate, vars: Record<string, string> = {}): string {
  return templates[key].replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}

export function waLink(key: WaTemplate, vars: Record<string, string> = {}): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage(key, vars))}`;
}

/** Link de agenda: URL de booking si existe; si no, WhatsApp con la plantilla `agendar`. */
export function bookingLink(): { href: string; external: boolean } {
  return site.bookingUrl
    ? { href: site.bookingUrl, external: true }
    : { href: waLink("agendar"), external: true };
}
