"use client";

import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CalendarDays } from "lucide-react";
import { bookingLink, waLink } from "@/lib/whatsapp";
import { trackBooking, trackWhatsapp } from "@/lib/analytics";

/** Barra inferior fija en móvil. Se oculta con el menú abierto (html[data-menu=open]). */
export function MobileActionBar() {
  const booking = bookingLink();
  return (
    <div
      className="barra-movil sobre-tinta fixed inset-x-0 bottom-0 z-40 border-t border-claro/10 bg-tinta/95 px-[var(--gutter)] pt-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Button
          href={waLink("general")}
          external
          className="!px-4"
          icon={<WhatsAppIcon size={18} />}
          onClick={() => trackWhatsapp("barra-movil", "general")}
        >
          WhatsApp
        </Button>
        <Button
          href={booking.href}
          external={booking.external}
          variant="secundario"
          className="!px-4"
          icon={<CalendarDays size={18} aria-hidden="true" />}
          onClick={() => trackBooking("barra-movil")}
        >
          Agendar
        </Button>
      </div>
    </div>
  );
}
