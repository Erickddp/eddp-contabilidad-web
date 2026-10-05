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
import { SITE_URL, negocioJsonLd, seo } from "@/lib/seo";
import { site } from "@/content/site.config";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: `%s | ${seo.shortTitle}` },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: seo.shortTitle,
  authors: [{ name: site.owner, url: site.social.personal }],
  creator: site.owner,
  publisher: site.brand,
  category: "finance",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: seo.shortTitle,
    title: seo.ogTitle,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <head>
        <noscript>
          <style>{"[data-hero]{opacity:1!important}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(negocioJsonLd()).replace(/</g, "\\u003c") }}
        />
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
