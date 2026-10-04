"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FORM_META, type LayoutName, type Stop } from "./config";
import type { FormId } from "./shapes";
import { setSegment } from "./state";

gsap.registerPlugin(ScrollTrigger);

type Segment = { from: Stop; to: Stop; noise: number; st: ScrollTrigger };

/**
 * Cada <section data-forma="N"> define un tramo: al entrar, la forma anterior es aFrom
 * y la nueva aTo; el progreso corre sobre los primeros ~60vh de la sección.
 * El hero tiene un tramo propio: el primer scroll equilibra la balanza (sin disolución).
 * `data-capa` cambia el encuadre de una sección (hero, centro, derecha, borde, cta) y
 * `data-inicio` el punto donde arranca su tramo (por defecto "top 70%").
 */
export function ParticleScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-forma]"));
    const segments: Segment[] = [];

    const recompute = () => {
      let active: Segment | undefined;
      for (const s of segments) if (s.st.progress > 0) active = s;
      const seg = active ?? segments[0];
      if (!seg) return;
      setSegment(seg.from, seg.to, active ? seg.st.progress : 0, seg.noise);
    };

    let prev: Stop | null = null;
    for (const sec of sections) {
      const form = Number(sec.dataset.forma) as FormId;
      const layout = (sec.dataset.capa as LayoutName | undefined) ?? FORM_META[form].layout;
      if (sec.id === "inicio") {
        const tilted: Stop = { form: 0, layout: "hero" };
        const level: Stop = { form: 6, layout: "hero" };
        segments.push({
          from: tilted,
          to: level,
          noise: 0,
          st: ScrollTrigger.create({
            trigger: sec,
            start: "top top",
            end: () => `+=${sec.offsetHeight * 0.35}`,
            onUpdate: recompute,
            onRefresh: recompute,
          }),
        });
        prev = level;
        continue;
      }
      const stop: Stop = { form, layout };
      if (!prev || (prev.form === stop.form && prev.layout === stop.layout)) {
        prev = prev ?? stop;
        continue;
      }
      segments.push({
        from: prev,
        to: stop,
        noise: 1,
        st: ScrollTrigger.create({
          trigger: sec,
          start: sec.dataset.inicio ?? "top 70%",
          end: () => `+=${window.innerHeight * 0.6}`,
          onUpdate: recompute,
          onRefresh: recompute,
        }),
      });
      prev = stop;
    }
    recompute();

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => segments.forEach((s) => s.st.kill());
  }, [pathname]);

  return null;
}
