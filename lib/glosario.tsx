import type { ReactNode } from "react";
import Termino from "@/components/Termino";

// Las palabras técnicas que explicamos en una frase, para que nadie se pierda.
export const GLOSARIO: Record<string, string> = {
  SEO: "trabajar tu web para que salga arriba en Google sin pagar por cada clic.",
  CRM: "tu agenda de clientes, pero lista: sabe de dónde viene cada uno, en qué punto está y a quién toca llamar.",
  "Google Ads": "los anuncios de Google: sales arriba cuando alguien busca lo que haces y pagas cuando hacen clic.",
  landing: "una página pensada para una sola cosa, normalmente que te pidan presupuesto desde un anuncio.",
  Landings: "páginas pensadas para una sola cosa, normalmente que te pidan presupuesto desde un anuncio.",
  píxel: "un pequeño código que avisa a Google o a Meta de quién ha visitado tu web, para medir y afinar los anuncios.",
  "Tag Manager": "la caja de Google donde se colocan todos los códigos de medición de la web, sin tocar la programación.",
  "Merchant Center": "donde se dan de alta tus productos para que salgan con foto y precio en Google Shopping.",
  "Google Shopping": "la pestaña de Google que enseña productos con foto y precio de varias tiendas.",
  "ficha de Google": "lo que sale en el mapa de Google cuando buscan tu negocio: horario, fotos, teléfono y reseñas.",
  Bing: "el buscador de Microsoft, el que viene en Windows y en Edge; también alimenta a Copilot.",
  SEM: "anuncios en buscadores, como Google Ads.",
};

// Envuelve la primera aparición de cada término en una explicación desplegable.
export function glosar(texto: string): ReactNode {
  const claves = Object.keys(GLOSARIO).sort((a, b) => b.length - a.length);
  const re = new RegExp(`(?<![\\p{L}])(${claves.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}])`, "u");
  const m = re.exec(texto);
  if (!m) return texto;
  const antes = texto.slice(0, m.index), despues = texto.slice(m.index + m[0].length);
  return (
    <>
      {antes}
      <Termino palabra={m[0]} explicacion={GLOSARIO[m[0]]} />
      {despues}
    </>
  );
}
