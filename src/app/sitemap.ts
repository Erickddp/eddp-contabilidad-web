import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Solo rutas que ya existen. Agregar aquí /precios y las landings cuando se publiquen (fases 3 y 4).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
