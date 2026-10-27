"use client";

// Piezas de la cabina de mando del panel: iconos, luces, relojes y módulos plegables.
// Animaciones solo de opacidad o color. Sin librerías de gráficos: los relojes son SVG propio.
import type { ReactNode } from "react";

export type Luz = "ok" | "atencion" | "problema" | "sinconectar" | "preparado";

export const LUZ: Record<Luz, { texto: string; color: string }> = {
  ok: { texto: "Funcionando", color: "#059669" },
  atencion: { texto: "Atención", color: "#d97706" },
  problema: { texto: "Problema", color: "#dc2626" },
  sinconectar: { texto: "Sin conectar", color: "#94a3b8" },
  preparado: { texto: "Preparado", color: "#0284c7" },
};

export type Modulo = {
  id: string;
  grupo: string;
  nombre: string;
  corto: string;
  linea: string;
  conclusion: string;
  luz: Luz;
  icono: string;
  contenido: ReactNode;
};

export const GRUPOS_MODULOS: { id: string; titulo: string; frase?: string; color: string }[] = [
  { id: "web", titulo: "Tu web", color: "#4f46e5" },
  { id: "dicen", titulo: "Lo que dicen de ti", color: "#be185d" },
  { id: "mercado", titulo: "Tu mercado", color: "#0e7490" },
  { id: "anuncios", titulo: "Tus anuncios", color: "#1d4ed8" },
  { id: "tuyo", titulo: "Lo tuyo", frase: "Preparado para ti, por si quieres usarlo. Nosotros no lo vemos ni te lo pedimos.", color: "#7c3aed" },
  { id: "contigo", titulo: "Contigo", color: "#334155" },
  { id: "informes", titulo: "Informes", color: "#0f766e" },
  { id: "historico", titulo: "Histórico", color: "#64748b" },
];

const TRAZOS: Record<string, string> = {
  lupa: "M11 5a6 6 0 100 12 6 6 0 000-12zM16 16l5 5",
  escudo: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z",
  camino: "M5 18c3-9 11-3 14-11M5 18m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0M19 7m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0",
  espejo: "M12 3c3.3 0 6 3 6 7s-2.7 7-6 7-6-3-6-7 2.7-7 6-7zM12 17v4M8 21h8",
  catalejo: "M3 15l11-6 2 4-11 6zM16 9l4-2 1 2-4 2z",
  persona: "M12 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM5 20c0-4 3-6 7-6s7 2 7 6",
  moneda: "M12 4a8 8 0 100 16 8 8 0 000-16zM12 7v10M9.5 9.5c0-1.5 5-1.5 5 0s-5 1.5-5 3 5 1.5 5 0",
  embudo: "M4 5h16l-6 8v6l-4-2v-4z",
  globo: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  documento: "M7 3h7l4 4v14H7zM14 3v4h4M9.5 12h5M9.5 16h5",
  historia: "M4 19V5M4 19h16M7 15l4-4 3 3 5-6",
  mapa: "M12 21s-6-5.5-6-10a6 6 0 0112 0c0 4.5-6 10-6 10zM12 9a2 2 0 100 4 2 2 0 000-4z",
  chat: "M4 5h16v11H9l-5 4z",
  caja: "M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8",
  ajustes: "M4 8h10M18 8h2M4 16h2M10 16h10M16 6v4M8 14v4",
  estrella: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",
  megafono: "M4 10v4h3l7 4V6L7 10zM17 9c1.5 1 1.5 5 0 6",
  red: "M6 7a2 2 0 100-4 2 2 0 000 4zM18 21a2 2 0 100-4 2 2 0 000 4zM18 7a2 2 0 100-4 2 2 0 000 4zM6 7v4a4 4 0 004 4h6M18 7v10",
};

export function Icono({ n, className = "h-6 w-6" }: { n: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={TRAZOS[n] ?? TRAZOS.estrella} />
    </svg>
  );
}

export function PuntoLuz({ luz, tam = 14 }: { luz: Luz; tam?: number }) {
  const c = LUZ[luz].color;
  return <span className="inline-block shrink-0 rounded-full" style={{ width: tam, height: tam, background: c, boxShadow: `0 0 ${tam}px ${Math.round(tam / 3)}px ${c}55` }} aria-hidden="true" />;
}

// ---------------------------------------------------------------------------------------------
// Fila de luces: una por control, como los testigos de un salpicadero
// ---------------------------------------------------------------------------------------------
export function FilaLuces({ modulos, ir }: { modulos: Modulo[]; ir: (id: string) => void }) {
  return (
    <ul className="flex gap-1.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible" aria-label="Estado de cada control">
      {modulos.map((m) => {
        const l = LUZ[m.luz];
        return (
          <li key={m.id} className="shrink-0">
            <button type="button" onClick={() => ir(m.id)} title={`${m.linea} (${l.texto})`} className="flex w-[84px] flex-col items-center gap-1 rounded-xl bg-white/5 px-1.5 py-2 text-center text-white transition-colors hover:bg-white/10" aria-label={`${m.nombre}: ${l.texto}. Abrir`}>
              <PuntoLuz luz={m.luz} tam={14} />
              <span className="text-[11px] font-extrabold leading-tight">{m.corto}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------------------------
// Reloj: semicírculo con franja verde/ámbar/roja y una aguja fija. La aguja no se mueve.
// ---------------------------------------------------------------------------------------------
function arco(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => `${(cx + r * Math.cos((a * Math.PI) / 180)).toFixed(2)} ${(cy - r * Math.sin((a * Math.PI) / 180)).toFixed(2)}`;
  return `M ${p(a0)} A ${r} ${r} 0 0 1 ${p(a1)}`;
}

export function Reloj({ titulo, valor, sub, pct, invertir = false }: { titulo: string; valor: string; sub: string; pct: number; invertir?: boolean }) {
  const colores = invertir ? ["#059669", "#d97706", "#dc2626"] : ["#dc2626", "#d97706", "#059669"];
  const ang = 180 - Math.max(0, Math.min(100, pct)) * 1.8;
  const cx = 70;
  const cy = 70;
  const ax = cx + 46 * Math.cos((ang * Math.PI) / 180);
  const ay = cy - 46 * Math.sin((ang * Math.PI) / 180);
  return (
    <figure className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-4 text-center text-white">
      <svg viewBox="0 0 140 80" className="mx-auto w-full max-w-[190px]" role="img" aria-label={`${titulo}: ${valor}`}>
        {colores.map((c, i) => (
          <path key={i} d={arco(cx, cy, 58, 180 - i * 60, 180 - (i + 1) * 60 + 1)} stroke={c} strokeWidth={10} fill="none" opacity={0.9} />
        ))}
        <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={5} fill="#ffffff" />
      </svg>
      <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{valor}</p>
      <figcaption className="mt-0.5 text-sm font-bold text-estrella">{titulo}</figcaption>
      <p className="mt-0.5 text-xs text-white/70">{sub}</p>
    </figure>
  );
}

// ---------------------------------------------------------------------------------------------
// Módulo plegable: cerrado es una sola franja; al abrir, el contenido entra con un fundido
// ---------------------------------------------------------------------------------------------
export function ModuloPlegable({ m, abierto, alternar, color }: { m: Modulo; abierto: boolean; alternar: () => void; color: string }) {
  const l = LUZ[m.luz];
  return (
    <section id={`mod-${m.id}`} className="scroll-mt-24 overflow-hidden rounded-3xl border border-linea bg-white" style={{ borderLeft: `8px solid ${color}` }}>
      <button type="button" onClick={alternar} aria-expanded={abierto} aria-controls={`cuerpo-${m.id}`} className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-niebla sm:items-center sm:gap-4 sm:p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: `${color}18`, color }}>
          <Icono n={m.icono} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-base font-extrabold sm:text-lg">{m.nombre}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-niebla px-2.5 py-0.5 text-[11px] font-bold text-gris">
              <PuntoLuz luz={m.luz} tam={9} />
              {l.texto}
            </span>
          </span>
          <span className="mt-0.5 block text-sm text-gris">{m.linea}</span>
          <span className="mt-1 block text-sm font-bold text-tinta">{m.conclusion}</span>
        </span>
        <span className="mt-1 shrink-0 text-lg font-bold text-gris" aria-hidden="true">{abierto ? "▴" : "▾"}</span>
      </button>
      {abierto && (
        <div id={`cuerpo-${m.id}`} className="pn-fade space-y-5 border-t border-linea bg-niebla/60 p-4 sm:p-6">
          {m.contenido}
        </div>
      )}
    </section>
  );
}
