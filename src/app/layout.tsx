import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.legalName}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Portal de transporte público de EMPRESA VERCELLI HNOS S.A. Horarios, recorridos, paradas y atención al usuario en San Nicolás, San Pedro y la región.",
  keywords: ["EVHSA", "Vercelli", "colectivos San Nicolás", "horarios", "línea 500", "SUBE", "Mi Boleto"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.legalName,
    images: ["/original/slides/foto.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen font-sans">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
