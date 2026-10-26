import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/navegacion";
import { ARTICULOS } from "@/lib/blog";
import { PAGINAS_SERVICIO } from "@/lib/servicios";
import { CASOS } from "@/lib/casos";
import { TRABAJOS } from "@/lib/contenido";
import { TERMINOS } from "@/lib/terminos";

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  const fijas = [
    ["/", 1],
    ["/servicios", 0.9],
    ["/estudio-gratuito", 0.9],
    ["/test", 0.8],
    ["/como-trabajamos", 0.8],
    ["/miedo-al-cambio", 0.7],
    ["/un-dia-de-trabajo", 0.7],
    ["/quienes-somos", 0.7],
    ["/trabajos", 0.8],
    ["/preguntas", 0.7],
    ["/blog", 0.7],
    ["/glosario", 0.7],
    ["/aviso-legal", 0.2],
    ["/privacidad", 0.2],
    ["/cookies", 0.2],
  ] as const;
  return [
    ...fijas.map(([ruta, prioridad]) => ({ url: `${SITIO.url}${ruta}`, lastModified: hoy, priority: prioridad })),
    ...PAGINAS_SERVICIO.map((p) => ({ url: `${SITIO.url}/servicios/${p.slug}`, lastModified: hoy, priority: 0.85 })),
    ...CASOS.filter((c) => TRABAJOS.find((t) => t.nombre === c.nombre)?.publicado).map((c) => ({ url: `${SITIO.url}/trabajos/${c.slug}`, lastModified: hoy, priority: 0.7 })),
    ...TERMINOS.map((t) => ({ url: `${SITIO.url}/glosario/${t.slug}`, lastModified: hoy, priority: 0.5 })),
    ...ARTICULOS.map((a) => ({ url: `${SITIO.url}/blog/${a.slug}`, lastModified: new Date(a.fecha), priority: 0.6 })),
  ];
}
