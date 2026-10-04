"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { formatMxn } from "@/lib/format";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const MOTION = "(prefers-reduced-motion: no-preference)";
const pesos = (n: number) => formatMxn(n).replace(/\.\d\d$/, "");

/**
 * Gestos de scroll de cada sección (CAMBIO-V2, 7). Todo vive dentro de matchMedia:
 * con reduced motion no se registra nada y el contenido queda visible, sin pin ni conteo.
 */
export function HomeMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      // ¿Te pasa esto? Cada frase se ilumina de 15% a 100% al cruzar el centro.
      gsap.utils.toArray<HTMLElement>("[data-frase]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "center 50%", scrub: true },
          },
        );
      });

      // Servicios en móvil y tablet: deck; la tarjeta de atrás baja a escala 0.94.
      const deck = gsap.utils.toArray<HTMLElement>("[data-deck]");
      deck.forEach((li, i) => {
        const next = deck[i + 1];
        const card = li.firstElementChild;
        if (!next || !card) return;
        gsap.to(card, {
          scale: 0.94,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
        });
      });

      // Comparativo: el conteo corre sincronizado con el crecimiento de las columnas
      // y el ahorro aparece al final con la doble raya.
      const panel = document.querySelector<HTMLElement>("[data-estrategia-panel]");
      if (panel) {
        const nums = gsap.utils.toArray<HTMLElement>("[data-cuenta]", panel);
        const ahorro = panel.querySelector<HTMLElement>("[data-ahorro]");
        const reglas = panel.querySelectorAll(".regla");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: "top 85%", end: "+=55%", scrub: 1 },
        });
        nums.forEach((el) => {
          const target = Number(el.dataset.cuenta);
          const proxy = { v: 0 };
          const isAhorro = !!el.closest("[data-ahorro]");
          tl.fromTo(
            proxy,
            { v: 0 },
            {
              v: target,
              ease: "power1.out",
              duration: 1,
              onUpdate: () => {
                el.textContent = pesos(proxy.v);
              },
            },
            isAhorro ? 0.9 : 0,
          );
        });
        if (ahorro) tl.fromTo(ahorro, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.75);
        tl.fromTo(reglas, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.12 }, 1.6);
      }

      // Cómo trabajamos: la línea se llena con el scroll; cada paso se enciende al llegar.
      const proceso = document.querySelector<HTMLElement>("[data-proceso]");
      if (proceso) {
        gsap.fromTo(
          "[data-proceso-linea]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: proceso, start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-paso]").forEach((paso) => {
          const num = paso.querySelector("[data-paso-num]");
          const texto = paso.querySelector("div");
          gsap.set(texto, { opacity: 0.4 });
          ScrollTrigger.create({
            trigger: paso,
            start: "top 60%",
            onEnter: () => {
              gsap.to(texto, { opacity: 1, duration: 0.5 });
              num?.classList.add("!bg-pluma");
            },
            onLeaveBack: () => {
              gsap.to(texto, { opacity: 0.4, duration: 0.3 });
              num?.classList.remove("!bg-pluma");
            },
          });
        });
      }

      // Precios: las tarjetas entran con un leve giro 3D, en stagger.
      const planes = gsap.utils.toArray<HTMLElement>("[data-plan]");
      if (planes.length) {
        gsap.from(planes, {
          rotateX: 8,
          y: 36,
          opacity: 0,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-planes]", start: "top 82%", once: true },
        });
      }

      // Casos: cada ficha se abre de abajo hacia arriba, como un expediente.
      gsap.utils.toArray<HTMLElement>("[data-ficha]").forEach((ficha) => {
        gsap.fromTo(
          ficha,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: ficha, start: "top 88%", once: true },
          },
        );
      });

      // CTA final: el título aparece por letras.
      const titulo = document.querySelector<HTMLElement>("[data-cta-titulo]");
      let split: SplitText | undefined;
      if (titulo) {
        split = SplitText.create(titulo, { type: "words,chars" });
        gsap.from(split.chars, {
          opacity: 0,
          yPercent: 40,
          duration: 0.6,
          ease: "expo.out",
          stagger: 0.025,
          scrollTrigger: { trigger: titulo, start: "top 80%", once: true },
        });
      }

      return () => split?.revert();
    });

    // Servicios en desktop: sección pineada y track horizontal con scrub: 1.
    mm.add(`(min-width: 1024px) and ${MOTION}`, () => {
      const pin = document.querySelector<HTMLElement>("[data-servicios-pin]");
      const scroller = document.querySelector<HTMLElement>("[data-servicios-scroller]");
      const track = document.querySelector<HTMLElement>("[data-servicios-track]");
      if (!pin || !scroller || !track) return;
      scroller.style.overflow = "visible";
      const distance = () => track.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -distance(), ease: "none" }, 0);
      tl.fromTo("[data-servicios-barra]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      return () => {
        scroller.style.overflow = "";
      };
    });

    // Los tramos de partículas se crearon antes que el pin de Servicios: reordenar y recalcular.
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    refresh();
    document.fonts.ready.then(refresh);
    return () => mm.revert();
  });

  return null;
}
