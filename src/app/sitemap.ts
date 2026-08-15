import type { MetadataRoute } from "next";
import { productos } from "@/data/productos";
import { SITIO } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = ["", "/productos", "/carrito"].map((ruta) => ({
    url: `${SITIO}${ruta}`,
    changeFrequency: "weekly" as const,
    priority: ruta === "" ? 1 : 0.8,
  }));

  const fichas = productos.map((p) => ({
    url: `${SITIO}/productos/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...fijas, ...fichas];
}
