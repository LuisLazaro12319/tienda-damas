import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El panel no tiene por qué aparecer en Google.
      disallow: "/admin",
    },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}
