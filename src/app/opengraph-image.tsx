import { ImageResponse } from "next/og";
import { site } from "@/content/site.config";
import { SITE_URL } from "@/lib/seo";

export const alt = "EDDP Servicios Contables: tus impuestos, en equilibrio.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir (Open Graph y Twitter): negro, cielo y la doble raya. */
export default function OpengraphImage() {
  const host = SITE_URL.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 60% 70% at 78% 40%, rgba(56,189,248,0.22), transparent 70%), #000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 6, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ width: 40, height: 2, background: "#38bdf8" }} />
          CONTADOR PÚBLICO · ESTRATEGIA FISCAL
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Tus impuestos,</div>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05, color: "#38bdf8" }}>
            en equilibrio.
          </div>
          {/* Doble raya */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 28, width: 420 }}>
            <div style={{ height: 4, background: "#38bdf8", boxShadow: "0 0 18px #38bdf8" }} />
            <div style={{ height: 4, background: "#38bdf8", boxShadow: "0 0 18px #38bdf8" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
          <div style={{ display: "flex" }}>{site.brand}</div>
          <div style={{ display: "flex", color: "#7dd3fc" }}>{host}</div>
        </div>
      </div>
    ),
    size,
  );
}
