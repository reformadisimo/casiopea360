import type { Metadata } from "next";

const SUFIJO = " · Casiopea 360";

// Título de la pestaña y de Google: con « · Casiopea 360» solo si cabe en 60 caracteres; si no, sin sufijo.
export function tituloCorto(titulo: string): Metadata["title"] {
  return titulo.length + SUFIJO.length > 60 ? { absolute: titulo } : titulo;
}

// Metadatos de cada página: título, descripción, dirección canónica y ficha para compartir.
export function meta(titulo: string, descripcion: string, ruta: string): Metadata {
  return {
    title: tituloCorto(titulo),
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: { title: `${titulo} · Casiopea 360`, description: descripcion, url: ruta, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}
