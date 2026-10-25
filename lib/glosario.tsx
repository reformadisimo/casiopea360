import { cache, type ReactNode } from "react";
import TerminoEnlace from "@/components/TerminoEnlace";
import { TERMINOS, terminoPorSlug } from "@/lib/terminos";

// Enlazado interno automático: cada término del glosario que aparece en un texto
// se convierte en un enlace a su página, con la definición al pasar el ratón.

export type ContextoGlosario = {
  /** Términos ya enlazados en este texto o artículo: cada uno se enlaza una sola vez. */
  usados?: Set<string>;
  /** Término que no debe enlazarse (por ejemplo, el de la propia página). */
  excluir?: string;
  /** Máximo de enlaces por llamada, para no llenar un párrafo de subrayados. */
  max?: number;
};

type Candidata = { slug: string; ini: number; fin: number; texto: string };

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const esSigla = (s: string) => s === s.toUpperCase() && /\p{Lu}/u.test(s) && s.length <= 7 && !/\s/.test(s);

// Formas de escribir cada término: el nombre, lo que va entre paréntesis y los alias.
function formasDe(t: (typeof TERMINOS)[number]): string[] {
  const salida = new Set<string>();
  const base = [t.nombre, ...(t.formas ?? [])];
  for (const f of base) {
    salida.add(f.trim());
    const paren = /^(.*?)\s*\((.+)\)\s*$/.exec(f);
    if (paren) {
      salida.add(paren[1].trim());
      salida.add(paren[2].trim());
    }
    if (f.includes(" / ")) f.split(" / ").forEach((x) => salida.add(x.trim()));
  }
  return [...salida].filter((x) => x.length >= 2);
}

type Indice = {
  reSiglas: RegExp | null;
  reNormales: RegExp | null;
  porSigla: Map<string, string>;
  porNormal: Map<string, string>;
};

let indice: Indice | null = null;

function construir(): Indice {
  const porSigla = new Map<string, string>();
  const porNormal = new Map<string, string>();
  for (const t of TERMINOS) {
    if (t.auto === false) continue;
    for (const f of formasDe(t)) {
      if (esSigla(f)) {
        if (!porSigla.has(f)) porSigla.set(f, t.slug);
      } else {
        const k = f.toLowerCase();
        if (!porNormal.has(k)) porNormal.set(k, t.slug);
      }
    }
  }
  const alt = (claves: string[]) => claves.sort((a, b) => b.length - a.length).map(escapar).join("|");
  const ini = "(?<![\\p{L}\\p{N}_])";
  const fin = "(?![\\p{L}\\p{N}_])";
  const siglas = [...porSigla.keys()];
  const normales = [...porNormal.keys()];
  return {
    porSigla,
    porNormal,
    reSiglas: siglas.length ? new RegExp(`${ini}(${alt(siglas)})(?:s)?${fin}`, "gu") : null,
    reNormales: normales.length ? new RegExp(`${ini}(${alt(normales)})(?:e?s)?${fin}`, "giu") : null,
  };
}

function candidatas(texto: string): Candidata[] {
  indice ??= construir();
  const salida: Candidata[] = [];
  const recoger = (re: RegExp | null, mapa: Map<string, string>, minusculas: boolean) => {
    if (!re) return;
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(texto))) {
      const clave = minusculas ? m[1].toLowerCase() : m[1];
      const slug = mapa.get(clave);
      if (slug) salida.push({ slug, ini: m.index, fin: m.index + m[0].length, texto: m[0] });
    }
  };
  recoger(indice.reSiglas, indice.porSigla, false);
  recoger(indice.reNormales, indice.porNormal, true);
  // De izquierda a derecha; si dos se pisan, gana la más larga.
  return salida.sort((a, b) => a.ini - b.ini || b.fin - b.ini - (a.fin - a.ini));
}

// Sin contexto propio, cada término se enlaza una sola vez por página (la caché vale para una petición).
const usadosDeLaPagina = cache(() => new Set<string>());

export function glosar(texto: string, ctx: ContextoGlosario = {}): ReactNode {
  const usados = ctx.usados ?? usadosDeLaPagina();
  const max = ctx.max ?? 3;
  const elegidas: Candidata[] = [];
  let hasta = 0;
  for (const c of candidatas(texto)) {
    if (elegidas.length >= max) break;
    if (c.ini < hasta) continue;
    if (c.slug === ctx.excluir || usados.has(c.slug)) continue;
    usados.add(c.slug);
    elegidas.push(c);
    hasta = c.fin;
  }
  if (!elegidas.length) return texto;
  const partes: ReactNode[] = [];
  let cursor = 0;
  elegidas.forEach((c, i) => {
    const t = terminoPorSlug(c.slug);
    if (!t) return;
    if (c.ini > cursor) partes.push(texto.slice(cursor, c.ini));
    partes.push(<TerminoEnlace key={`${c.slug}-${i}`} slug={t.slug} nombre={t.nombre} corta={t.corta} texto={c.texto} />);
    cursor = c.fin;
  });
  if (cursor < texto.length) partes.push(texto.slice(cursor));
  return <>{partes}</>;
}
