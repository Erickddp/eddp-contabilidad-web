"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { bookingLink, waLink } from "@/lib/whatsapp";
import { trackBooking, trackWhatsapp } from "@/lib/analytics";
import { formatMxn } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/site.config";
import { HeroBackground } from "./HeroBackground";
import { LedgerCard } from "./LedgerCard";

gsap.registerPlugin(useGSAP, SplitText);

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
        split = SplitText.create(h1, { type: "lines", mask: "lines", linesClass: "linea" });
        gsap.set(h1, { opacity: 1 });
        gsap.set(split.lines, { yPercent: 110 });

        const amounts = q("[data-amount]") as HTMLElement[];
        const counters = amounts.map((el) => ({
          el,
          target: Number(el.dataset.value),
          obj: { v: 0 },
        }));
        counters.forEach((c) => (c.el.textContent = formatMxn(0)));
        const rules = q(".regla");
        gsap.set(rules, { strokeDashoffset: 100 });
        gsap.set(q('[data-hero="sub"], [data-hero="cta"]'), { y: 16 });
        gsap.set(q('[data-hero="card"]'), { scale: 0.96 });
        gsap.set(q('[data-hero="chip"]'), { scale: 0.9 });
        if (nav) gsap.set(nav, { y: -12 });

        tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (nav) tl.to(nav, { opacity: 1, y: 0, duration: 0.6 }, 0);
        tl.to(q('[data-hero="fondo"]'), { opacity: 1, duration: 1.2, ease: "none" }, 0.15);
        split.lines.forEach((line, i) => {
          tl!.to(line, { yPercent: 0, duration: 0.9 }, 0.3 + i * 0.12);
        });
        tl.to(q('[data-hero="sub"]'), { opacity: 1, y: 0, duration: 0.8 }, 0.75);
        tl.to(q('[data-hero="cta"]'), { opacity: 1, y: 0, duration: 0.8 }, 0.9);
        tl.to(q('[data-hero="card"]'), { opacity: 1, scale: 1, duration: 0.8 }, 1.0);
        counters.forEach((c, i) => {
          tl!.to(
            c.obj,
            {
              v: c.target,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: () => {
                c.el.textContent = formatMxn(c.obj.v);
              },
              onComplete: () => {
                c.el.textContent = formatMxn(c.target);
              },
            },
            1.2 + i * 0.1,
          );
        });
        rules.forEach((r, i) => {
          tl!.to(r, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 2.1 + i * 0.12);
        });
        tl.to(q('[data-hero="chip"]'), { opacity: 1, scale: 1, duration: 0.6 }, 2.7);
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
    <section
      id="inicio"
      ref={root}
      data-wa="general"
      className="sobre-tinta relative isolate overflow-hidden bg-tinta"
    >
      <HeroBackground />

      <div className="contenedor relative z-10 flex min-h-svh flex-col justify-center pb-24 pt-[calc(var(--nav-h)+40px)] md:pb-28 lg:pt-[calc(var(--nav-h)+56px)]">
        <h1
          data-hero="h1"
          className="font-display text-[clamp(2.5rem,6.2vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.03em] text-claro"
        >
          <span className="block">Contabilidad que cuadra,</span>
          <span className="block">de la frontera</span>
          <span className="block">a la Ciudad de México.</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <p
              data-hero="sub"
              className="max-w-[60ch] text-[17px] leading-[1.55] text-claro/72 md:text-lg"
            >
              Soy Erick Domínguez, {site.title}. Llevo tus impuestos, tu contabilidad y tu nómina
              en línea, con el estímulo de región fronteriza aplicado como debe ser y respuesta
              directa por WhatsApp.
            </p>
            <div data-hero="cta" className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={waLink("general")}
                  external
                  onClick={() => trackWhatsapp("hero", "general")}
                >
                  Escríbeme por WhatsApp
                </Button>
                <Button
                  href={booking.href}
                  external={booking.external}
                  variant="secundario"
                  onClick={() => trackBooking("hero")}
                >
                  Agenda una llamada de 20 min
                </Button>
              </div>
              <p className="mt-4 text-sm text-claro/72">
                Primera revisión gratis. Respondo en menos de 24 horas hábiles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LedgerCard />
          </div>
        </div>
      </div>
    </section>
  );
}
