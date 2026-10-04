import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
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
  themeColor: "#0B1733",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${bricolage.variable} ${plex.variable}`}>
      <head>
        <noscript>
          <style>{"[data-hero]{opacity:1!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Nav />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppFab />
        <SmoothScroll />
      </body>
    </html>
  );
}
