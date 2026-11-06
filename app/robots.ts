import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/navegacion";

// Mientras la web es provisional no se deja rastrear. El día del lanzamiento, SITIO.indexable = true.
export default function robots(): MetadataRoute.Robots {
  if (!SITIO.indexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/mesa", "/api/"] }],
    sitemap: `${SITIO.url}/sitemap.xml`,
  };
}
