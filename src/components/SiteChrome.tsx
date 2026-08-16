"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotonWhatsApp } from "@/components/BotonWhatsApp";

/**
 * Muestra el header y footer de la tienda en todas las páginas, EXCEPTO en
 * /admin — ahí el panel de administración ocupa toda la pantalla, como una
 * app aparte (sin la barra de la tienda ni el pie de página).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const esPanel = pathname?.startsWith("/admin");

  if (esPanel) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BotonWhatsApp />
    </>
  );
}
