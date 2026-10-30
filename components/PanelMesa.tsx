"use client";

// Estilo y piezas compartidas de la mesa de control: tipografía, colores y la vista "Todas las cifras".
// Copiado del orden y el aspecto de la mesa de Reformadísimo (Ig, 27-oct). TODOS LOS DATOS SON INVENTADOS.
import { useState } from "react";
import LogoMarca from "@/components/LogoMarca";
import { GuiaInicio, Icono, LUZ, type Luz, type Modulo, type Vista } from "@/components/PanelModulos";
import { ATAJOS_PREGUNTA, ResumenesCorreo, responderPanel } from "@/components/PanelMandos";

export const AMARILLO = "#ffde00";
export const BORDE = "#e9e2d4";

// Loseta de color con un dibujo dentro: da cara a cada tarjeta. Decorativa (el nombre va escrito al lado).
export function Loseta({ n, color, tam = 44 }: { n: string; color: string; tam?: number }) {
  return (
    <span aria-hidden="true" className="inline-grid shrink-0 place-items-center text-white" style={{ width: tam, height: tam, borderRadius: tam * 0.34, background: color, boxShadow: `0 4px 0 ${color}55` }}>
      <Icono n={n} className="h-[56%] w-[56%]" />
    </span>
  );
}
export const ICONO_HERR: Record<string, [string, string]> = {
  lupa: ["lupa", "#2a6f86"], control360: ["camino", "#7a4fd0"], espejo: ["espejo", "#d9822b"], vigia: ["catalejo", "#1d6b3a"],
  indice: ["moneda", "#c79a00"], avisos: ["campana", "#25a244"], resumenes: ["sobre", "#d93f3f"], pregunta: ["chat", "#2f6fd0"], todo: ["grid", "#1a3d47"],
};

// Colores y fuentes de la mesa, solo dentro de .mesa. Las páginas de cada sección heredan este aspecto.
export const TEMA_CSS = `
@font-face{font-family:'Roboto Mesa';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/panel/roboto-latin-400-normal.woff2) format('woff2')}
@font-face{font-family:'Roboto Mesa';font-style:normal;font-weight:500;font-display:swap;src:url(/fonts/panel/roboto-latin-500-normal.woff2) format('woff2')}
@font-face{font-family:'Roboto Mesa';font-style:normal;font-weight:600;font-display:swap;src:url(/fonts/panel/roboto-latin-600-normal.woff2) format('woff2')}
@font-face{font-family:'Roboto Mesa';font-style:normal;font-weight:700;font-display:swap;src:url(/fonts/panel/roboto-latin-700-normal.woff2) format('woff2')}
@font-face{font-family:'Lora Mesa';font-style:italic;font-weight:500;font-display:swap;src:url(/fonts/panel/lora-latin-500-italic.woff2) format('woff2')}
.mesa{--color-noche:#1a3d47;--color-noche-2:#12303a;--color-noche-3:#2a5663;--color-estrella:#ffde00;--color-estrella-2:#ffe85c;--color-niebla:#f3efe6;--color-tinta:#1a3d47;--color-gris:rgba(26,61,71,.72);--color-linea:#e9e2d4;--font-titular:'Lora Mesa',Georgia,serif;--font-texto:'Roboto Mesa',system-ui,sans-serif;background:#fbfaf7;color:#1a3d47;font-family:'Roboto Mesa',system-ui,sans-serif;font-size:17px;line-height:1.55;min-height:100vh}
.mesa h1,.mesa h2,.mesa h3{font-family:'Lora Mesa',Georgia,serif;font-style:italic;font-weight:500!important;letter-spacing:0;line-height:1.2}
.mesa .sans{font-family:'Roboto Mesa',system-ui,sans-serif!important;font-style:normal!important;font-weight:700!important}
.mesa .sans-ey{font-family:'Roboto Mesa',system-ui,sans-serif!important;font-style:normal!important;font-weight:700!important;font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:rgba(26,61,71,.55)}
.mesa .num{font-family:'Lora Mesa',Georgia,serif;font-weight:500}
.mesa button{font-family:inherit}
.mesa .pn-fade,.mesa .pn-entra{animation:pnFade .35s ease-out both}
@keyframes pnFade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion: reduce){.mesa .pn-fade,.mesa .pn-entra{animation:none}}
@media print{.mesa{background:#fff}}
`;

// --- Fechas: hoy es el martes 27 de octubre de 2026 en la demostración -------------------------------------------------
const HOY = Date.UTC(2026, 9, 27);
const DIA = 86400000;
const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fmt = (t: number) => { const d = new Date(t); return `${d.getUTCDate()} ${MES[d.getUTCMonth()]}`; };
const fmtA = (t: number) => `${fmt(t)} ${new Date(t).getUTCFullYear()}`;

export type Rango = { ini: number; fin: number; dias: number; txt: string; antTxt: string; antDias: string };
export function rangoDe(periodo: string, desde: string, hasta: string, comp: "anterior" | "ano" | "nada"): Rango {
  let ini = HOY - 27 * DIA;
  let fin = HOY - DIA;
  if (periodo === "hoy") { ini = HOY; fin = HOY; }
  else if (periodo === "ayer") { ini = HOY - DIA; fin = HOY - DIA; }
  else if (periodo === "7") { ini = HOY - 6 * DIA; fin = HOY; }
  else if (periodo === "28") { ini = HOY - 27 * DIA; fin = HOY; }
  else if (periodo === "3m") { ini = Date.UTC(2026, 6, 28); fin = HOY; }
  else if (periodo === "mes") { ini = Date.UTC(2026, 9, 1); fin = HOY; }
  else if (periodo === "pasado") { ini = Date.UTC(2026, 8, 1); fin = Date.UTC(2026, 8, 30); }
  else if (periodo === "12m") { ini = Date.UTC(2025, 10, 1); fin = HOY; }
  else if (periodo === "rango") {
    const a = Date.parse(desde); const b = Date.parse(hasta);
    if (Number.isFinite(a) && Number.isFinite(b) && b >= a) { ini = a; fin = b; }
  }
  const dias = Math.round((fin - ini) / DIA) + 1;
  const mismo = ini === fin;
  const txt = mismo ? fmtA(ini) : `${fmt(ini)} – ${fmtA(fin)}`;
  let antTxt = "";
  if (comp === "anterior") {
    const aFin = ini - DIA; const aIni = aFin - (dias - 1) * DIA;
    antTxt = dias === 1 ? fmtA(aIni) : `${fmt(aIni)} – ${fmtA(aFin)}`;
  } else if (comp === "ano") {
    const a = new Date(ini); const b = new Date(fin);
    const aIni = Date.UTC(a.getUTCFullYear() - 1, a.getUTCMonth(), a.getUTCDate());
    const aFin = Date.UTC(b.getUTCFullYear() - 1, b.getUTCMonth(), b.getUTCDate());
    antTxt = dias === 1 ? fmtA(aIni) : `${fmt(aIni)} – ${fmtA(aFin)}`;
  }
  return { ini, fin, dias, txt, antTxt, antDias: `${dias} ${dias === 1 ? "día" : "días"}` };
}

export function Sparkline({ serie, color = "#2a6f86" }: { serie: number[]; color?: string }) {
  const w = 320, h = 44;
  const max = Math.max(...serie), min = Math.min(...serie);
  const y = (v: number) => h - 4 - ((v - min) / Math.max(1, max - min)) * (h - 10);
  const pts = serie.map((v, i) => [(i / (serie.length - 1)) * w, y(v)] as const);
  const l = pts.map(([x, yy], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-3 h-11 w-full" aria-hidden>
      <path d={`${l} L${w} ${h} L0 ${h} Z`} fill={color} opacity=".1" />
      <path d={l} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function serieDe(sem: number, base: number, amp: number): number[] {
  // Serie inventada y siempre la misma para cada tarjeta
  let s = sem * 9301 + 49297;
  return Array.from({ length: 14 }, (_, i) => {
    s = (s * 9301 + 49297) % 233280;
    return base + (s / 233280 - 0.5) * amp + i * (amp / 40);
  });
}

type Delta = { texto: string; mejora: boolean | null };
function TarjetaCifra({ icono, color = "#2a6f86", titulo, desc, valor, delta, antes, nota, serie, resaltada }: { icono?: string; color?: string; titulo: string; desc: string; valor: string; delta?: Delta; antes?: string; nota?: string; serie: number[]; resaltada?: boolean }) {
  return (
    <div className="flex min-h-[250px] flex-col rounded-[22px] border bg-white p-5" style={{ borderColor: resaltada ? "#2a6f86" : BORDE, boxShadow: resaltada ? "0 0 0 1px #2a6f86, 0 8px 24px rgba(26,61,71,.08)" : "none" }}>
      <div className="flex items-center gap-3">{icono && <Loseta n={icono} color={color} tam={40} />}<p className="sans-ey">{titulo}</p></div>
      <p className="mt-3 text-[15px] leading-snug text-gris">{desc}</p>
      <p className="num mt-2 text-[40px] leading-none">{valor}</p>
      {(delta || antes) && (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {delta && <span className="rounded-full px-2.5 py-1 text-[13px] font-bold" style={{ background: delta.mejora === null ? "#efece4" : delta.mejora ? "#e3f1e6" : "#fbe3e1", color: delta.mejora === null ? "#1a3d47" : delta.mejora ? "#1d6b3a" : "#b3261e" }}>{delta.texto}</span>}
          {antes && <span className="text-gris">{antes}</span>}
        </p>
      )}
      <Sparkline serie={serie} />
      {nota && <p className="mt-2 text-sm text-gris">{nota}</p>}
    </div>
  );
}

const CANALES_TABLA: [string, number, number, number, number, number | null, number | null][] = [
  // canal, visitas, rebote %, contactos, contactos antes, inversión, coste por contacto
  ["Google, sin pagar", 3210, 36.1, 74, 66, null, null],
  ["Google Ads", 2140, 31.4, 128, 109, 2304, 18],
  ["Meta (Facebook e Instagram)", 1720, 29.8, 61, 55, 610, 10],
  ["Microsoft Ads", 410, 33.0, 19, 17, 247, 13],
  ["Directo y boca a boca", 696, 44.2, 30, 22, null, null],
];

const LOGO_CANAL: Record<string, string> = { "Google, sin pagar": "Google", "Google Ads": "Google Ads", "Meta (Facebook e Instagram)": "Meta", "Microsoft Ads": "Microsoft Ads", "Directo y boca a boca": "Chrome" };
const nf = (n: number) => n.toLocaleString("es-ES");
const eur = (n: number) => `${nf(n)} €`;

type PropsCompleto = {
  modulos: Modulo[];
  ir: (id: string) => void;
  navegar: (v: Vista) => void;
  periodo: string;
  setPeriodo: (p: string) => void;
  periodos: [string, string][];
  comp: "anterior" | "ano" | "nada";
  setComp: (c: "anterior" | "ano" | "nada") => void;
  desde: string;
  hasta: string;
  setDesde: (s: string) => void;
  setHasta: (s: string) => void;
  factor: number;
  ahora: number;
  segundos: number;
  leer: () => void;
  leyendo: boolean;
  grafico: React.ReactNode;
};

const TAREAS: { t: string; d: string; donde: string; id: string }[] = [
  { t: "Llamar a los 3 contactos que llevan más de 3 días sin respuesta", d: "Cuanto antes se llama, más se convierte.", donde: "Lo tuyo", id: "crm" },
  { t: "Contestar las 2 reseñas nuevas de tu ficha de Google", d: "Te dejamos la respuesta redactada en Tus peticiones.", donde: "Redes y reseñas", id: "redes" },
  { t: "Mirar la Lupa 360 de la portada", d: "El 23 % de los toques no llevan a ningún sitio.", donde: "Tu web", id: "lupa" },
  { t: "Revisar el Espejo de la IA", d: "En 2 de 18 preguntas todavía no sales.", donde: "Lo que dicen de ti", id: "espejo" },
];

const HERRAMIENTAS_LISTA: [string, string, string][] = [
  ["La lupa", "La web con lo que hace la gente encima: dónde tocan y hasta dónde bajan", "lupa"],
  ["Control 360", "Probamos tu recorrido completo como lo haría un cliente", "control360"],
  ["Espejo de la IA", "Qué dicen de ti ChatGPT, Gemini y Claude", "espejo"],
  ["Vigía de la competencia", "Sus webs, reseñas y puestos en Google, cada semana", "vigia"],
  ["Índice de valor", "Qué clientes valen más que tu media, sin decirnos cuánto facturas", "indice"],
  ["Avisos y recordatorios", "Mensajes al móvil para citas y respuesta al momento", "avisos"],
  ["Resúmenes por correo", "El resumen del panel en tu correo, el día que elijas", "resumenes"],
  ["Pregúntale al panel", "Preguntas con tus palabras, respuestas con tus datos", "pregunta"],
];

export function PanelCompleto(p: PropsCompleto) {
  const [revisadas, setRevisadas] = useState<Record<number, boolean>>({});
  const [ayuda, setAyuda] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [orden, setOrden] = useState<{ col: number; desc: boolean }>({ col: 1, desc: true });
  const rango = rangoDe(p.periodo, p.desde, p.hasta, p.comp);
  const f = p.factor;
  const sinComparar = p.comp === "nada";
  const dlt = (porc: number, mejorSube: boolean, ano = 1.6): Delta | undefined => {
    if (sinComparar) return undefined;
    const v = p.comp === "ano" ? Math.round(porc * ano) : porc;
    const sube = v >= 0;
    return { texto: `${sube ? "▲" : "▼"} ${Math.abs(v)} % · ${sube === mejorSube ? "mejor" : "peor"}`, mejora: sube === mejorSube };
  };
  const antes = (n: number, porc: number, unidad = "", ano = 1.6) => {
    if (sinComparar) return undefined;
    const v = p.comp === "ano" ? Math.round(porc * ano) : porc;
    return `antes ${nf(Math.round(n / (1 + v / 100)))}${unidad}`;
  };
  const visitas = Math.round(8176 * f);
  const contactos = Math.max(1, Math.round(312 * f));
  const presu = Math.max(1, Math.round(contactos * 0.54));
  const inversion = Math.round(3161 * f);
  const porCien = (contactos / Math.max(1, visitas)) * 100;

  const urgentes = p.modulos.filter((m) => m.luz === "problema");
  const atencion = p.modulos.filter((m) => m.luz === "atencion");
  const nivel: Luz = urgentes.length ? "problema" : atencion.length ? "atencion" : "ok";
  const numero = ["", "una cosa", "dos cosas", "tres cosas", "cuatro cosas"][(urgentes.length ? urgentes : atencion).length] ?? "varias cosas";
  const filas = CANALES_TABLA.slice().sort((a, b) => {
    const k = orden.col;
    const av = (a as (string | number | null)[])[k] ?? -1;
    const bv = (b as (string | number | null)[])[k] ?? -1;
    const r = typeof av === "string" ? String(av).localeCompare(String(bv)) : (av as number) - (bv as number);
    return orden.desc ? -r : r;
  });
  const cab = ["Canal", "Visitas", "Rebote", "Contactos", "Visita a contacto", "Inversión", "Coste por contacto"];
  const preguntar = (q: string) => { setPregunta(q); setRespuesta(responderPanel(q)); };

  const pill = (activo: boolean) => `min-h-10 rounded-full border px-4 text-[15px] font-semibold ${activo ? "text-white" : "bg-white hover:bg-[#f3efe6]"}`;
  const pillStyle = (activo: boolean) => (activo ? { background: "#1a3d47", borderColor: "#1a3d47" } : { borderColor: BORDE });

  return (
    <div className="pb-28 pt-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="sans-ey">Fuero Abogados · panel de control</p>
          <h1 className="mt-2 text-[42px] leading-[1.1]">Todo lo que pasa, en un sitio</h1>
          <p className="mt-2 flex items-center gap-2 text-[15px] text-gris"><span aria-hidden className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{p.ahora} personas en tu web ahora · actualizado hace {p.segundos} s</p>
        </div>
        <div className="text-right">
          <p className="num text-[22px] italic" style={{ fontFamily: "'Lora Mesa',Georgia,serif", fontStyle: "italic" }}>{rango.txt}</p>
          {rango.antTxt && <p className="text-sm text-gris">frente a {rango.antTxt}</p>}
        </div>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-2 print:hidden">
        <div className="inline-flex rounded-full border bg-white p-1" style={{ borderColor: BORDE }} role="group" aria-label="Vista">
          <button type="button" onClick={() => p.navegar({})} className="min-h-10 rounded-full px-4 text-[15px] font-semibold">Resumen</button>
          <button type="button" aria-pressed className="min-h-10 rounded-full px-4 text-[15px] font-semibold text-white" style={{ background: "#1a3d47" }}>Todas las cifras</button>
        </div>
        <button type="button" onClick={p.leer} aria-pressed={p.leyendo} className={pill(false)} style={pillStyle(false)}>{p.leyendo ? "Parar" : "Oír resumen"}</button>
        <button type="button" onClick={() => setAyuda((x) => !x)} aria-expanded={ayuda} className={pill(false)} style={pillStyle(false)}>Ayuda</button>
      </div>
      {ayuda && <div className="mt-3"><GuiaInicio forzar /></div>}

      <div className="mt-4 flex flex-wrap items-center gap-2 print:hidden" role="group" aria-label="Periodo">
        {p.periodos.map(([id, t]) => (
          <button key={id} type="button" aria-pressed={p.periodo === id} onClick={() => p.setPeriodo(id)} className={pill(p.periodo === id)} style={pillStyle(p.periodo === id)}>{t}</button>
        ))}
        <button type="button" aria-pressed={p.periodo === "rango"} onClick={() => p.setPeriodo("rango")} className={pill(p.periodo === "rango")} style={pillStyle(p.periodo === "rango")}>Desde / hasta</button>
      </div>
      {p.periodo === "rango" && (
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[15px]">
          <label className="flex items-center gap-2 font-semibold">Desde <input type="date" value={p.desde} max={p.hasta} onChange={(e) => p.setDesde(e.target.value)} className="h-10 rounded-xl border bg-white px-2 font-normal" style={{ borderColor: BORDE }} /></label>
          <label className="flex items-center gap-2 font-semibold">hasta <input type="date" value={p.hasta} min={p.desde} onChange={(e) => p.setHasta(e.target.value)} className="h-10 rounded-xl border bg-white px-2 font-normal" style={{ borderColor: BORDE }} /></label>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm print:hidden" role="group" aria-label="Comparar con">
        <span className="font-semibold text-gris">Comparar con:</span>
        {([["anterior", "el periodo anterior"], ["ano", "el mismo periodo del año pasado"], ["nada", "nada"]] as const).map(([id, t]) => (
          <button key={id} type="button" aria-pressed={p.comp === id} onClick={() => p.setComp(id)} className="min-h-9 rounded-full border px-3 font-semibold" style={p.comp === id ? { background: "#fbf1dc", borderColor: "#e3c98a" } : { background: "#fff", borderColor: BORDE }}>{t}</button>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] border p-4 text-[15px]" style={{ background: "#fbf6e6", borderColor: "#eadfb8" }}>
        <p>
          Estás viendo <b>{rango.txt}</b> ({rango.antDias}).{rango.antTxt ? <> Cada flecha lo compara con <b>{p.comp === "ano" ? "el mismo periodo del año pasado" : `los ${rango.antDias} justo anteriores`}</b>: {rango.antTxt}.</> : " No se compara con nada."}
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer font-bold">Cómo se lee esta pantalla</summary>
          <p className="mt-2">El número grande es lo que ha pasado en el periodo. La flecha dice cuánto más o menos que el periodo con el que comparas. Verde es que va mejor, rojo es que va peor y gris es que no hay con qué comparar. Pulsa el signo ? de cada tarjeta si quieres que te la expliquemos.</p>
        </details>
      </div>

      <p className="mt-6 text-[17px] leading-relaxed">
        <span className="serif num text-[24px] italic" style={{ fontFamily: "'Lora Mesa',Georgia,serif", fontStyle: "italic" }}>{nivel === "ok" ? "Hoy no hay nada urgente." : `Hay ${numero} que ${nivel === "problema" ? "son importantes" : "piden un vistazo"}.`}</span>{" "}
        {(urgentes.length ? urgentes : atencion).map((m) => `${m.nombre}: ${m.conclusion}`).join(" ")}
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Estado de cada parte">
        {[["web", "La web", "lupa", "globo", "#2a6f86"], ["dicen", "Reputación e IA", "espejo", "espejo", "#d9822b"], ["mercado", "Competencia", "vigia", "catalejo", "#1d6b3a"], ["anuncios", "Anuncios", "campanas", "megafono", "#d93f3f"], ["tuyo", "Ventas", "crm", "persona", "#2f6fd0"]].map(([g, nombre, dest, ico, col]) => {
          const ms = p.modulos.filter((m) => m.grupo === g);
          const luz: Luz = ms.some((m) => m.luz === "problema") ? "problema" : ms.some((m) => m.luz === "atencion") ? "atencion" : ms.every((m) => m.luz === "preparado") ? "preparado" : "ok";
          return (
            <li key={g}>
              <button type="button" onClick={() => p.ir(dest)} className="w-full rounded-[18px] border bg-white p-4 text-left hover:bg-[#f9f6ee]" style={{ borderColor: BORDE }}>
                <span className="flex items-center gap-2.5 font-bold"><Loseta n={ico} color={col} tam={36} />{nombre}<span aria-hidden className="ml-auto inline-block h-3 w-3 rounded-full" style={{ background: LUZ[luz].color, boxShadow: `0 0 0 4px ${LUZ[luz].color}22` }} /></span>
                <span className="mt-1 block text-sm text-gris">{LUZ[luz].texto} · ver</span>
              </button>
            </li>
          );
        })}
      </ul>

      <section aria-label="Lo más importante hoy" className="mt-6 rounded-[22px] border-[1.6px] bg-white p-5 sm:p-6" style={{ borderColor: AMARILLO }}>
        <h2 className="text-[28px]">Lo más importante hoy</h2>
        <ol className="mt-3 space-y-3">
          {TAREAS.map((t, i) => (
            <li key={t.id} className="flex flex-wrap items-start gap-3">
              <span aria-hidden className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[15px] font-bold" style={{ background: AMARILLO }}>{i + 1}</span>
              <div className="min-w-0 flex-1 basis-60">
                <button type="button" onClick={() => p.ir(t.id)} className={`sans text-left text-[17px] ${revisadas[i] ? "line-through opacity-60" : ""}`}>{t.t}</button>
                <p className="text-[15px] text-gris">{t.d} · Está en «{t.donde}»</p>
              </div>
              <button type="button" onClick={() => setRevisadas((r) => ({ ...r, [i]: !r[i] }))} aria-pressed={!!revisadas[i]} className="min-h-10 rounded-full border px-4 text-sm font-bold" style={revisadas[i] ? { background: "#e3f1e6", borderColor: "#9ccaa6", color: "#1d6b3a" } : { borderColor: BORDE, background: "#fff" }}>{revisadas[i] ? "Revisado" : "Ya lo he revisado"}</button>
            </li>
          ))}
        </ol>
      </section>

      <section id="pn-herramientas" aria-label="Herramientas" className="mt-8 scroll-mt-6">
        <p className="sans-ey">Herramientas</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HERRAMIENTAS_LISTA.map(([t, d, id]) => (
            <li key={id}>
              <button type="button" onClick={() => p.ir(id)} className="h-full w-full rounded-[18px] border bg-white p-4 text-left hover:bg-[#f9f6ee]" style={{ borderColor: BORDE }}>
                <span className="flex items-center gap-3 font-bold"><Loseta n={ICONO_HERR[id][0]} color={ICONO_HERR[id][1]} /><span className="flex-1">{t}</span><span aria-hidden>→</span></span>
                <span className="mt-2 block text-sm text-gris">{d}</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => p.navegar({ g: "web" })} className="h-full w-full rounded-[18px] border bg-white p-4 text-left hover:bg-[#f9f6ee]" style={{ borderColor: BORDE }}>
              <span className="flex items-center gap-3 font-bold"><Loseta n="grid" color="#1a3d47" /><span className="flex-1">Todas las secciones</span><span aria-hidden>→</span></span>
              <span className="mt-2 block text-sm text-gris">El índice completo del panel, con todo explicado</span>
            </button>
          </li>
        </ul>
      </section>

      <section id="pn-pregunta" aria-label="Pregunta lo que quieras" className="mt-8 scroll-mt-6 rounded-[20px] border bg-white p-5 sm:p-6" style={{ borderColor: BORDE }}>
        <h2 className="text-[28px]">Pregunta lo que quieras</h2>
        <p className="mt-1 text-[15px] text-gris">Escribe o dicta tu pregunta como se la harías a una persona. Contesta con los datos de {rango.antDias === "1 día" ? "hoy" : `los últimos ${rango.antDias}`}.</p>
        <form className="mt-4 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (pregunta.trim()) preguntar(pregunta); }}>
          <input value={pregunta} onChange={(e) => setPregunta(e.target.value)} aria-label="Tu pregunta" placeholder="Escribe aquí tu pregunta" className="h-12 min-w-0 flex-1 basis-60 rounded-full border px-5 text-[15px]" style={{ borderColor: BORDE, background: "#fbf8ef" }} />
          <button type="submit" className="min-h-12 rounded-full px-6 text-[15px] font-bold" style={{ background: AMARILLO, opacity: pregunta.trim() ? 1 : 0.55 }}>Preguntar</button>
        </form>
        <p className="mt-4 text-[15px] font-semibold text-gris">O pulsa una de estas:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ATAJOS_PREGUNTA.map((q) => <button key={q} type="button" onClick={() => preguntar(q)} className="min-h-11 rounded-full border px-4 text-[15px]" style={{ borderColor: BORDE, background: "#fbf8ef" }}>{q}</button>)}
        </div>
        {respuesta && <div role="status" className="mt-4 rounded-2xl p-4" style={{ background: "#f3efe6" }}><p className="sans-ey">Respuesta de ejemplo</p><p className="mt-1">{respuesta}</p></div>}
        <p className="mt-3 text-xs text-gris">En esta demostración las respuestas están preparadas. En tu panel, cada pregunta tiene un coste pequeño por uso que va aparte de la cuota.</p>
      </section>

      <section aria-label="Recibe un resumen por correo" className="mt-8">
        <ResumenesCorreo />
      </section>

      <section aria-label="Alertas" className="mt-8 space-y-3">
        {[["3 peticiones de consulta llevan más de 3 días sin respuesta.", "Llámalos hoy. El correo de recordatorio ya ha salido."], ["La ficha de Google tiene 2 reseñas sin contestar.", "Respóndelas esta semana. Te dejamos el texto redactado en Tus peticiones."]].map(([a, q]) => (
          <div key={a} className="rounded-[18px] border p-4" style={{ background: "#fff6e5", borderColor: "#eed9a8" }}>
            <p><b>Alerta:</b> {a}</p>
            <p className="mt-1 text-[15px]"><b>Qué hacer:</b> {q}</p>
          </div>
        ))}
      </section>

      <section aria-label="Cifras" className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TarjetaCifra icono="globo" color="#2a6f86" titulo="Visitas a la web" desc="Veces que alguien entra en la web (Analytics)." valor={nf(visitas)} delta={dlt(12, true)} antes={antes(visitas, 12)} nota={`${nf(Math.round(visitas * 0.67))} personas distintas`} serie={serieDe(1, 50, 30)} />
          <TarjetaCifra icono="camino" color="#d9822b" titulo="Rebote" desc="De cada 100 visitas, cuántas se van sin hacer nada. Cuanto más bajo, mejor." valor="38,2 %" delta={dlt(-6, false)} antes={sinComparar ? undefined : "antes 40,6 %"} nota="Detalle por canal, móvil y página en «La web»" serie={serieDe(2, 40, 14)} />
          <TarjetaCifra icono="persona" color="#1d6b3a" titulo="Contactos únicos" desc="Personas distintas que se ponen en contacto contigo (una persona cuenta una vez al día)." valor={nf(contactos)} delta={dlt(16, true)} antes={antes(contactos, 16)} nota={`${(contactos / rango.dias).toLocaleString("es-ES", { maximumFractionDigits: 1 })} al día`} serie={serieDe(3, 30, 22)} resaltada />
          <TarjetaCifra icono="embudo" color="#7a4fd0" titulo="Visitas que acaban en contacto" desc="De cada 100 visitas a la web, cuántas acaban dejando sus datos." valor={`${porCien.toLocaleString("es-ES", { maximumFractionDigits: 1 })} %`} delta={dlt(4, true)} antes={sinComparar ? undefined : "antes 3,6 %"} serie={serieDe(4, 20, 12)} />
          <TarjetaCifra icono="documento" color="#2f6fd0" titulo="Consultas pedidas" desc="Contactos que piden consulta de verdad, no solo una duda." valor={nf(presu)} delta={dlt(9, true)} antes={antes(presu, 9)} nota="54 de cada 100 contactos" serie={serieDe(5, 25, 16)} />
          <TarjetaCifra icono="megafono" color="#d93f3f" titulo="Inversión en anuncios" desc="Lo que has invertido en Google, Meta y Microsoft. Sin comisión nuestra." valor={eur(inversion)} delta={dlt(5, false)} antes={antes(inversion, 5, " €")} nota="La pagas tú, con tu tarjeta" serie={serieDe(6, 45, 14)} />
          <TarjetaCifra icono="moneda" color="#c79a00" titulo="Coste por contacto" desc="Lo que cuesta cada contacto que traen los anuncios. Cuanto más bajo, mejor." valor="10 €" delta={dlt(-8, false)} antes={sinComparar ? undefined : "antes 11 €"} nota={`${nf(contactos)} contactos · ${eur(inversion)} invertidos`} serie={serieDe(7, 35, 18)} />
          <div className="flex min-h-[250px] flex-col rounded-[22px] border border-dashed p-5" style={{ borderColor: "#9fc0cc", background: "#f6fafb" }}>
            <div className="flex items-center gap-3"><Loseta n="moneda" color="#c79a00" tam={40} /><p className="sans-ey">Clientes e índice de valor</p></div>
            <p className="mt-2 text-[15px] leading-snug text-gris">Cuántos contactos se hacen clientes y cuáles valen más que tu media.</p>
            <p className="num mt-2 text-[34px] leading-none italic" style={{ color: "#2a6f86" }}>Preparado</p>
            <p className="mt-3 text-[15px] text-gris">Se activa cuando marcas quién ha firmado y pones tu ticket medio. Nosotros no lo vemos ni te lo pedimos.</p>
            <button type="button" onClick={() => p.ir("indice")} className="mt-auto min-h-10 self-start rounded-full border px-4 text-sm font-bold" style={{ borderColor: BORDE, background: "#fff" }}>Ver cómo funciona</button>
          </div>
        </div>
      </section>

      <section aria-label="Cada canal, de un vistazo" className="mt-8 rounded-[20px] border bg-white p-5 sm:p-6" style={{ borderColor: BORDE }}>
        <h2 className="text-[28px]">Cada canal, de un vistazo</h2>
        <p className="sans-ey mt-1">Analytics, web y anuncios · toca una columna para ordenar</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[15px]">
            <thead>
              <tr>
                {cab.map((c, i) => (
                  <th key={c} scope="col" className="sans-ey pb-2 pr-3 align-bottom">
                    <button type="button" onClick={() => setOrden((o) => (o.col === i ? { col: i, desc: !o.desc } : { col: i, desc: i !== 0 }))} className="inline-flex min-h-9 items-center gap-1 text-left font-bold uppercase tracking-[.13em]" style={{ color: orden.col === i ? "#1a3d47" : undefined }}>{c}{orden.col === i ? (orden.desc ? " ▼" : " ▲") : ""}</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((r) => (
                <tr key={r[0]} className="border-t" style={{ borderColor: BORDE }}>
                  <th scope="row" className="py-2.5 pr-3 font-bold"><span className="flex items-center gap-2.5"><LogoMarca nombre={LOGO_CANAL[r[0]] ?? r[0]} tam={26} />{r[0]}</span></th>
                  <td className="py-2.5 pr-3">{nf(Math.round(r[1] * f))}</td>
                  <td className="py-2.5 pr-3">{r[2].toLocaleString("es-ES", { minimumFractionDigits: 1 })} %</td>
                  <td className="py-2.5 pr-3">{Math.round(r[3] * f)}{sinComparar ? "" : <span className="text-gris"> (antes {Math.round(r[4] * f)})</span>}</td>
                  <td className="py-2.5 pr-3">{((r[3] / r[1]) * 100).toLocaleString("es-ES", { maximumFractionDigits: 1 })} %</td>
                  <td className="py-2.5 pr-3">{r[5] ? eur(Math.round(r[5] * f)) : "-"}</td>
                  <td className="py-2.5 pr-3">{r[6] ? eur(r[6]) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gris">Los contactos son los que llegan a tu web. «Meta» junta anuncios e Instagram: la web no siempre puede distinguirlos. En los canales sin pagar no hay inversión, así que no hay coste por contacto.</p>
      </section>

      <section aria-label="Cómo has mejorado" className="mt-8 rounded-[20px] border bg-white p-5 sm:p-6" style={{ borderColor: BORDE }}>
        <h2 className="text-[28px]">Cómo has mejorado</h2>
        <p className="sans-ey mt-1">Mes a mes desde que empezamos</p>
        <div className="mt-4">{p.grafico}</div>
      </section>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 print:hidden">
        <button type="button" onClick={() => window.scrollTo({ top: 0 })} className="min-h-11 rounded-full border bg-white px-5 text-[15px] font-bold shadow-md" style={{ borderColor: BORDE }}>Arriba</button>
        <button type="button" onClick={() => p.navegar({})} className="min-h-11 rounded-full px-5 text-[15px] font-bold text-white shadow-md" style={{ background: "#1a3d47" }}>Volver al inicio del panel</button>
      </div>
    </div>
  );
}
