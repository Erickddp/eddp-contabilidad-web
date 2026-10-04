type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Envía un evento a GA4 si el script está cargado; si no, no hace nada. */
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

export const trackWhatsapp = (section: string, template: string, plan?: string) =>
  track("whatsapp_click", { section, template, plan });

export const trackBooking = (section: string) => track("booking_click", { section });
