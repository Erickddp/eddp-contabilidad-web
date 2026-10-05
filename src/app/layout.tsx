import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ParticleCanvas } from "@/components/particles/ParticleCanvas";
import { Interacciones } from "@/components/layout/Interacciones";
import { ParticleScroll } from "@/components/particles/ParticleScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://contabilidad.erickddp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Contador Público en línea | Frontera norte y CDMX | EDDP Servicios Contables",
  description:
    "Contabilidad mensual, impuestos, nómina y estrategia fiscal para personas físicas y empresas. Estímulo IVA 8% región fronteriza. Primera revisión gratis por WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <head>
        <noscript>
          <style>{"[data-hero]{opacity:1!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <ParticleCanvas />
        <div className="grano" aria-hidden="true" />
        <Nav />
        <main id="contenido" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppFab />
        <SmoothScroll />
        <Interacciones />
        <ParticleScroll />
      </body>
    </html>
  );
}
