import type { Metadata } from "next";

// Metadatos de cada página: título, descripción, dirección canónica y ficha para compartir.
export function meta(titulo: string, descripcion: string, ruta: string): Metadata {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: { title: `${titulo} · Casiopea 360`, description: descripcion, url: ruta, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}
