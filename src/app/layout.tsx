import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TiendaProvider } from "@/context/TiendaContext";
import { SiteChrome } from "@/components/SiteChrome";
import { MARCA, SITIO } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: `${MARCA.nombre} — ${MARCA.tagline}`,
    template: `%s · ${MARCA.nombre}`,
  },
  description: MARCA.descripcion,
  keywords: [
    "ropa de damas",
    "ropa de niñas",
    "ropa por mayor",
    "fábrica de ropa",
    "indumentaria mayorista Argentina",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: MARCA.nombre,
    title: `${MARCA.nombre} — ${MARCA.tagline}`,
    description: MARCA.descripcion,
    url: SITIO,
    // Archivo estático (no ruta generada) para que GitHub Pages lo sirva
    // como image/png; si no, WhatsApp no muestra la vista previa.
    images: [
      {
        url: `${SITIO}/og.png`,
        width: 1200,
        height: 630,
        alt: `${MARCA.nombre} — ${MARCA.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <TiendaProvider>
          <SiteChrome>{children}</SiteChrome>
        </TiendaProvider>
      </body>
    </html>
  );
}
