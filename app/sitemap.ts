import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/navegacion";
import { ARTICULOS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  const fijas = [
    ["/", 1],
    ["/servicios", 0.9],
    ["/estudio-gratuito", 0.9],
    ["/test", 0.8],
    ["/como-trabajamos", 0.8],
    ["/quienes-somos", 0.7],
    ["/trabajos", 0.8],
    ["/preguntas", 0.7],
    ["/blog", 0.7],
    ["/aviso-legal", 0.2],
    ["/privacidad", 0.2],
    ["/cookies", 0.2],
  ] as const;
  return [
    ...fijas.map(([ruta, prioridad]) => ({ url: `${SITIO.url}${ruta}`, lastModified: hoy, priority: prioridad })),
    ...ARTICULOS.map((a) => ({ url: `${SITIO.url}/blog/${a.slug}`, lastModified: new Date(a.fecha), priority: 0.6 })),
  ];
}
