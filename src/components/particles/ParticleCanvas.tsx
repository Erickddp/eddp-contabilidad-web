"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/lib/motion";
import { isMobileDevice, particleCount } from "./config";

const ParticleScene = dynamic(() => import("./ParticleScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type Mode = { kind: "pending" } | { kind: "webgl"; count: number; mobile: boolean } | { kind: "static" };

/**
 * Fondo fijo de toda la página. El canvas se monta después del primer pintado
 * (requestIdleCallback) para que el LCP sea el h1.
 */
export function ParticleCanvas() {
  const [mode, setMode] = useState<Mode>({ kind: "pending" });

  useEffect(() => {
    const decide = () => {
      if (prefersReducedMotion() || !hasWebGL()) {
        // Fallback: el hero y el CTA muestran la balanza estática (ver BalanzaEstatica).
        document.documentElement.dataset.balanza = "estatica";
        setMode({ kind: "static" });
      } else setMode({ kind: "webgl", count: particleCount(), mobile: isMobileDevice() });
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(decide, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(decide, 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div aria-hidden="true" className="fondo-balanza pointer-events-none fixed inset-0 z-0">
      {mode.kind === "webgl" && <ParticleScene count={mode.count} mobile={mode.mobile} />}
    </div>
  );
}
