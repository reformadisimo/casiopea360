import { ARTICULOS, type Articulo } from "@/lib/blog";
import type { TerminoGlosario } from "@/lib/terminos";

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function textoDe(a: Articulo): string {
  const partes = [a.respuesta];
  for (const b of a.cuerpo) {
    if ("p" in b) partes.push(b.p);
    else if ("ul" in b) partes.push(...b.ul);
    else if ("ol" in b) partes.push(...b.ol);
  }
  return partes.join(" \n ");
}

// Artículos del blog que hablan de un término (para enlazarlos desde su página del glosario).
export function articulosQueMencionan(t: TerminoGlosario): Articulo[] {
  const formas = [t.nombre.replace(/\s*\(.*\)\s*$/, ""), ...(t.formas ?? [])].filter((f) => f.length >= 3);
  if (!formas.length) return [];
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(${formas.map(escapar).join("|")})(?![\\p{L}\\p{N}])`, "iu");
  return ARTICULOS.filter((a) => re.test(textoDe(a))).slice(0, 4);
}
