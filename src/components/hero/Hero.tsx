"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { bookingLink, waLink } from "@/lib/whatsapp";
import { trackBooking, trackWhatsapp } from "@/lib/analytics";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, SplitText);

/**
 * Hero mobile-first: en 375 px la balanza ocupa el 40% superior (canvas fijo de fondo)
 * y el texto vive abajo, dentro del primer viewport. En desktop el texto va a la
 * izquierda en 6 columnas y la balanza llena el lado derecho.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const booking = bookingLink();

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      const nav = document.querySelector('[data-hero="nav"]');
      let cancelled = false;
      let split: SplitText | undefined;
      let tl: gsap.core.Timeline | undefined;

      const run = () => {
        if (cancelled) return;
        const h1 = q('[data-hero="h1"]')[0];
        split = SplitText.create(h1, { type: "lines", mask: "lines" });
        gsap.set(h1, { opacity: 1 });
        gsap.set(split.lines, { yPercent: 110 });
        gsap.set(q('[data-hero="sub"], [data-hero="cta"]'), { y: 16 });
        if (nav) gsap.set(nav, { y: -12 });

        tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (nav) tl.to(nav, { opacity: 1, y: 0, duration: 0.6 }, 0);
        tl.to(split.lines, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.2);
        tl.to(q('[data-hero="sub"]'), { opacity: 1, y: 0, duration: 0.8 }, 0.55);
        tl.to(q('[data-hero="cta"]'), { opacity: 1, y: 0, duration: 0.8 }, 0.7);
      };

      document.fonts.ready.then(run);
      return () => {
        cancelled = true;
        tl?.kill();
        split?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section id="inicio" ref={root} data-wa="general" data-forma="0" className="relative">
      <div className="contenedor flex min-h-svh flex-col justify-end pb-[calc(96px+env(safe-area-inset-bottom))] pt-[40svh] md:pb-24 lg:grid lg:grid-cols-12 lg:items-center lg:pb-16 lg:pt-[var(--nav-h)]">
        <div className="lg:col-span-6">
          <h1
            data-hero="h1"
            className="font-display text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-claro sm:whitespace-nowrap"
          >
            Tus impuestos,
            <br />
            en equilibrio.
          </h1>
          <p
            data-hero="sub"
            className="mt-4 max-w-[46ch] text-base leading-[1.55] text-claro/80 md:mt-6 md:text-lg"
          >
            Contabilidad, declaraciones y estrategia fiscal para personas y empresas en todo
            México. Pagas lo que marca la ley, ni un peso de más.
          </p>
          <div data-hero="cta" className="mt-6 md:mt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={waLink("general")}
                external
                className="!h-[52px] w-full sm:w-auto"
                onClick={() => trackWhatsapp("hero", "general")}
              >
                Escríbeme por WhatsApp
              </Button>
              <Button
                href={booking.href}
                external={booking.external}
                variant="secundario"
                className="!h-[52px] w-full sm:w-auto"
                onClick={() => trackBooking("hero")}
              >
                Agenda una llamada de 20 min
              </Button>
            </div>
            <p className="mt-3 text-sm text-claro/72">
              Primera revisión gratis. Respondo en menos de 24 horas hábiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
