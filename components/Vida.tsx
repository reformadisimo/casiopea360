import type { ReactNode } from "react";
import { COLOR_SELLO, ICONO_SVG, Loseta } from "@/components/secciones";

/* Piezas con vida para toda la web (28-oct-2026, cas·v173). Ig: "toda la web alegre, con iconos, entretenida,
   que te anime, que te ilusione; esto no es un informe de un fiscalista". Kit común: etiquetas con icono,
   tarjetas con loseta, listas con marcas de color, pasos numerados, cajas de idea, nebulosas de fondo y
   bocadillos. Solo pintura: nada obligatorio se mueve. Sin emojis. */

export const Svg = ({ children, className = "h-5 w-5", grosor = 2.2 }: { children: ReactNode; className?: string; grosor?: number }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

/** Elige un icono por lo que dice un texto (etiquetas y títulos). */
export function iconoPorTexto(t: string, i = 0): string {
  const x = t.toLowerCase();
  const reglas: [RegExp, string][] = [
    [/rese[ñn]a|opini/, "estrella"],
    [/google|\bseo\b|busca|encuentr|lupa|\bia\b|las ia/, "lupa"],
    [/tiempo|reuni|llamada|rápid|rapid|minuto|\bhoras?\b|\bd[ií]as?\b|plazo|cuándo|cuando|velocidad|crucero/, "reloj"],
    [/precio|coste|cuesta|cuota|euro|factur|comisi|barato|separado|cobr|pagar|número|numero|cifra/, "euro"],
    [/panel|dato|informe|\bmedi[rd]|\bmedia\b|control|cuenta|índice|indice|n[uú]mero/, "grafica"],
    [/web|landing|página|pagina|versi|prueba a\/b/, "pagina"],
    [/anuncio|campaña|publicidad|ads/, "diana"],
    [/redes|vídeo|video|contenido|instagram|tiktok/, "video"],
    [/automat|asistente|chip|chat|avisos|recordatorio/, "chip"],
    [/crm|contacto|cliente/, "crm"],
    [/equipo|quién|quien|nosotros|especialista|oficio|red de/, "sonrisa"],
    [/tuyo|tuyas|seguridad|garant|compromiso|confidencia|protegid|escudo/, "escudo"],
    [/pregunt|duda|test|suena/, "chat"],
    [/empez|estudio|paso|método|metodo|cómo|como|arranc/, "cohete"],
    [/miedo|cambio|riesgo/, "bombilla"],
    [/trabajo|caso|ejemplo|hecho|real/, "trofeo"],
    [/sueñ|suen|grande|\bm[aá]s\b|crece/, "fiesta"],
    [/regalo|incluido|gratis|dentro/, "regalo"],
    [/radio|prensa|fuera/, "radio"],
    [/tienda|reserva|carrito|compra/, "tienda"],
    [/tecnolog|rayo|luz/, "rayo"],
    [/mundo|global|idioma|país|pais/, "globo"],
    [/ficha|google maps|local/, "mapa"],
    [/prometemos|promesa|firmamos|firma/, "firma"],
  ];
  for (const [re, ic] of reglas) if (re.test(x)) return ic;
  return ["estrella", "cohete", "sonrisa", "fiesta", "bombilla", "regalo"][i % 6];
}

const TONOS_ETIQUETA: Record<string, string> = {
  morado: "etiqueta",
  estrella: "bg-estrella text-tinta shadow-[0_8px_20px_-12px_rgba(255,197,61,0.9)]",
  cristal: "bg-white/10 text-estrella ring-1 ring-white/15",
  verde: "bg-emerald-100 text-emerald-800",
  rosa: "bg-rose-100 text-rose-800",
  blanco: "bg-white text-tinta ring-1 ring-linea",
};

/** Etiqueta (píldora) con su iconito: lo que va encima de cada titular. */
export function Etiqueta({ children, tono = "morado", icono, i = 0, className = "" }: { children: ReactNode; tono?: keyof typeof TONOS_ETIQUETA; icono?: string; i?: number; className?: string }) {
  const texto = typeof children === "string" ? children : "";
  const ic = icono ?? iconoPorTexto(texto, i);
  const cajaIcono = tono === "morado" ? "bg-white/15 text-estrella-2" : tono === "cristal" ? "bg-estrella/20 text-estrella" : tono === "estrella" ? "bg-tinta/10 text-tinta" : "bg-black/5 text-current";
  return (
    <p className={`inline-flex items-center gap-2 rounded-full py-1 pl-1.5 pr-4 text-sm font-bold ${TONOS_ETIQUETA[tono] ?? TONOS_ETIQUETA.morado} ${className}`}>
      <span aria-hidden="true" className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${cajaIcono} ${i % 2 ? "rotate-6" : "-rotate-6"}`}>
        <Svg className="h-4 w-4" grosor={2.4}>{ICONO_SVG[ic] ?? ICONO_SVG.estrella}</Svg>
      </span>
      <span>{children}</span>
    </p>
  );
}

/** Chip cuadrado de color con icono (más pequeño que la loseta), para títulos y filas. */
export function ChipIcono({ icono, i = 0, tam = "h-11 w-11", className = "" }: { icono: string; i?: number; tam?: string; className?: string }) {
  const [fondo, sombra] = COLOR_SELLO[i % COLOR_SELLO.length];
  return (
    <span aria-hidden="true" className={`relative grid shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_20px_-10px_var(--s)] ${tam} ${i % 2 ? "rotate-3" : "-rotate-3"} ${className}`} style={{ background: fondo, ["--s" as string]: sombra }}>
      <span className="absolute inset-[2px] rounded-[inherit] bg-gradient-to-b from-white/25 to-transparent" />
      <Svg className="relative h-6 w-6" grosor={2}>{ICONO_SVG[icono] ?? ICONO_SVG.estrella}</Svg>
    </span>
  );
}

/** Manchas de color difuminadas al fondo de una sección (la sección debe ser relative + overflow-hidden). */
export function Nebulosa({ oscura = false, variante = 0 }: { oscura?: boolean; variante?: number }) {
  const op = oscura ? "opacity-30" : "opacity-60";
  const sets = [
    ["bg-pink-300 -left-24 -top-24", "bg-violet-300 right-[-6rem] top-1/3", "bg-estrella left-1/3 -bottom-28"],
    ["bg-sky-300 -right-24 -top-28", "bg-estrella -left-20 bottom-10", "bg-fuchsia-300 right-1/4 bottom-[-6rem]"],
    ["bg-emerald-300 -left-28 top-1/4", "bg-estrella right-[-5rem] -top-20", "bg-violet-300 left-1/2 -bottom-24"],
    ["bg-estrella -left-20 -top-20", "bg-pink-300 right-1/3 top-[-4rem]", "bg-sky-300 right-[-6rem] bottom-[-6rem]"],
  ];
  const s = sets[variante % sets.length];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${op}`}>
      {s.map((c, k) => (
        <span key={k} className={`absolute h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96 ${c}`} style={{ opacity: oscura ? 0.55 : 0.5 }} />
      ))}
    </div>
  );
}

/** Tarjeta con loseta de color, título y texto. `claro` para fondos oscuros. */
export function TarjetaViva({ icono, i = 0, titulo, texto, claro = false, chip, hijo, className = "", como: Como = "li" }: { icono?: string; i?: number; titulo: string; texto?: ReactNode; claro?: boolean; chip?: string; hijo?: ReactNode; className?: string; como?: "li" | "div" }) {
  const ic = icono ?? iconoPorTexto(titulo, i);
  return (
    <Como className={`flex flex-col gap-3 rounded-[1.6rem] p-6 ${claro ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-tinta shadow-sm ring-1 ring-linea"} ${className}`}>
      <div className="flex items-center gap-3">
        <Loseta icono={ic} i={i} />
        {chip && <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide ${claro ? "bg-estrella/20 text-estrella" : "bg-estrella/30 text-tinta"}`}>{chip}</span>}
      </div>
      <h3 className="text-xl font-extrabold leading-snug">{titulo}</h3>
      {texto && <p className={claro ? "text-white/85" : "text-gris"}>{texto}</p>}
      {hijo}
    </Como>
  );
}

/** Lista con marcas de color (sustituye a los puntos grises). */
export function ListaViva({ items, render, claro = false, icono, className = "" }: { items: string[]; render?: (x: string) => ReactNode; claro?: boolean; icono?: string; className?: string }) {
  return (
    <ul className={`lv grid gap-2.5 ${className}`}>
      {items.map((x, i) => (
        <li key={x} className={`flex items-start gap-3 rounded-2xl p-3.5 sm:p-4 ${claro ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-niebla text-tinta"}`}>
          <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-white" style={{ background: COLOR_SELLO[i % COLOR_SELLO.length][0] }}>
            <Svg className="h-4 w-4" grosor={3}>{icono ? ICONO_SVG[icono] : <path d="m5 12.5 4.5 4.5L19 7" />}</Svg>
          </span>
          <span className="min-w-0">{render ? render(x) : x}</span>
        </li>
      ))}
    </ul>
  );
}

/** Pasos numerados con círculo de color. */
export function PasosVivos({ items, render, claro = false, className = "" }: { items: string[]; render?: (x: string) => ReactNode; claro?: boolean; className?: string }) {
  return (
    <ol className={`lv grid gap-3 ${className}`}>
      {items.map((x, i) => (
        <li key={x} className={`flex items-start gap-4 rounded-2xl p-4 sm:p-5 ${claro ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-tinta ring-1 ring-linea"}`}>
          <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white shadow-md" style={{ background: COLOR_SELLO[i % COLOR_SELLO.length][0] }}>{i + 1}</span>
          <span className="min-w-0 pt-1.5">{render ? render(x) : x}</span>
        </li>
      ))}
    </ol>
  );
}

/** Caja destacada con una idea clave. */
export function CajaIdea({ t = "Idea clave", icono = "estrella", children, className = "" }: { t?: string; icono?: string; children: ReactNode; className?: string }) {
  return (
    <aside className={`rounded-[1.6rem] border-2 border-estrella bg-gradient-to-br from-estrella/25 to-white p-5 text-tinta sm:p-6 ${className}`}>
      <p className="flex items-center gap-3 font-titular text-lg font-extrabold">
        <ChipIcono icono={icono} i={4} tam="h-9 w-9" />
        {t}
      </p>
      <div className="mt-3 text-[1.05rem] leading-relaxed">{children}</div>
    </aside>
  );
}

/** Bocadillo con el icono de Casiopea: una frase con guiño, como si lo dijera el asistente. */
export function Bocadillo({ children, claro = false, className = "" }: { children: ReactNode; claro?: boolean; className?: string }) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/marca/icono.svg" alt="" width={36} height={36} className="mt-1 h-9 w-9 shrink-0 rounded-xl" />
      <p className={`rounded-2xl rounded-tl-md px-4 py-3 font-semibold ${claro ? "bg-white text-tinta" : "bg-noche text-white"}`}>{children}</p>
    </div>
  );
}

/** Pregunta desplegable con marca de color. */
export function PreguntaViva({ p, children, i }: { p: string; children: ReactNode; i: number }) {
  return (
    <details className="group rounded-2xl bg-niebla p-4 open:bg-white open:ring-1 open:ring-linea sm:p-5">
      <summary className="flex cursor-pointer list-none items-center gap-3 font-titular text-lg font-extrabold [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base text-white ${i % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: COLOR_SELLO[i % COLOR_SELLO.length][0] }}>?</span>
        <span className="min-w-0 flex-1">{p}</span>
        <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-xl leading-none text-noche-3 ring-1 ring-linea transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 pl-12">{children}</div>
    </details>
  );
}

export const idDe = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

/** Título h2 con chip de color delante (artículos y páginas largas). */
export function TituloVivo({ t, i, como: Como = "h2" }: { t: string; i: number; como?: "h2" | "h3" }) {
  return (
    <Como id={idDe(t)} className="flex scroll-mt-24 items-center gap-3 sm:gap-4">
      <ChipIcono icono={iconoPorTexto(t, i)} i={i} />
      <span className="min-w-0">{t}</span>
    </Como>
  );
}
