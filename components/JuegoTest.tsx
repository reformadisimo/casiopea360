"use client";
import type React from "react";

// Piezas compartidas por los tests para que se jueguen y no se rellenen: confeti, estrella, barra con estrella y opciones de colores.

const COLORES = ["#1f6feb", "#e8457a", "#0f9d58", "#f59e0b", "#7c3aed", "#0ea5a4", "#ef4444"];
export const COLOR_OPCION = COLORES;

export function Confeti({ disparo }: { disparo: number }) {
  if (!disparo) return null;
  return (
    <div key={disparo} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30 h-0 overflow-visible">
      {Array.from({ length: 36 }).map((_, i) => {
        const x = (i * 37) % 100;
        return (
          <span
            key={i}
            className="confeti"
            style={{
              left: `${x}%`,
              background: COLORES[i % COLORES.length],
              animationDelay: `${(i % 6) * 0.04}s`,
              ["--dx" as string]: `${((i * 53) % 120) - 60}px`,
              ["--dy" as string]: `${260 + ((i * 71) % 260)}px`,
              ["--rot" as string]: `${(i * 97) % 720}deg`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Estrella({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="estrella-juego" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff6d6" />
          <stop offset="55%" stopColor="#ffc53d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="url(#estrella-juego)" stroke="#f59e0b" strokeWidth="0.6" strokeLinejoin="round" />
    </svg>
  );
}

// Barra de progreso con una estrella que viaja hasta la meta.
export function BarraEstrella({ avance, oscuro = false, texto }: { avance: number; oscuro?: boolean; texto?: string }) {
  const p = Math.max(0, Math.min(1, avance)) * 100;
  return (
    <div>
      {texto && <p className={`mb-2 text-sm font-bold ${oscuro ? "text-white/80" : "text-tinta"}`}>{texto}</p>}
      <div className={`relative h-4 rounded-full ${oscuro ? "bg-white/15" : "bg-white ring-1 ring-linea"}`}>
        <div className="h-full rounded-full bg-[linear-gradient(90deg,#1f6feb,#7c3aed,#e8457a,#ffc53d)] transition-[width] duration-500" style={{ width: `${p}%` }} />
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-500" style={{ left: `${p}%` }}>
          <Estrella className="brinca h-9 w-9 drop-shadow-[0_2px_6px_rgba(245,158,11,0.6)]" />
        </span>
        <span aria-hidden="true" className={`absolute -right-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-xs font-extrabold ${oscuro ? "bg-white text-noche" : "bg-noche text-estrella"}`}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 21V4M6 4h11l-2 4 2 4H6" /></svg>
        </span>
      </div>
    </div>
  );
}

// Burbuja de reacción que sale de la estrella.
export function Reaccion({ texto, tono = "neutro", claro = false }: { texto: string; tono?: "bien" | "medio" | "mal" | "neutro"; claro?: boolean }) {
  const fondo = { bien: "bg-emerald-600 text-white", medio: "bg-amber-400 text-tinta", mal: "bg-rose-600 text-white", neutro: claro ? "bg-white text-noche" : "bg-noche text-estrella" }[tono];
  return (
    <div className="flex items-end gap-2" aria-live="polite">
      <Estrella className="brinca h-10 w-10 shrink-0" />
      <p className={`burbuja rounded-2xl rounded-bl-md px-4 py-2.5 text-[0.98rem] font-extrabold shadow-lg ${fondo}`}>{texto}</p>
    </div>
  );
}

// Una opción grande, de color, con su letra.
const ICONOS: Record<string, React.ReactNode> = {
  sube: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  diana: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  web: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M7 6.5h.01M10 6.5h.01" /></>,
  estrella: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  capas: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  monedas: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
};

export function Opcion({ texto, activa, onClick, sub, icono }: { letra?: string; texto: string; color?: string; activa: boolean; onClick: () => void; compacta?: boolean; sub?: string; icono?: string }) {
  // Fila compacta a todo el ancho: (icono) texto y, si hay, una línea de explicación; flecha a la derecha; la elegida, en amarillo con un tic.
  return (
    <button
      type="button"
      aria-pressed={activa}
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-xl border-[1.5px] px-3 py-2 text-left text-[0.97rem] font-bold leading-snug transition-colors sm:gap-3 sm:px-3.5 sm:py-2.5 sm:text-[1.05rem] ${sub ? "min-h-[3.5rem]" : "min-h-12"} ${
        activa ? "border-estrella bg-estrella/25 text-tinta" : "border-linea bg-white text-tinta hover:border-noche hover:bg-niebla"
      }`}
    >
      {icono && ICONOS[icono] && (
        <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${activa ? "bg-white text-tinta" : "bg-[#eef1ff] text-[#3b4fd8]"}`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{ICONOS[icono]}</svg>
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block">{texto}</span>
        {sub && <span className="mt-0.5 block text-[0.8rem] font-normal sm:text-[0.85rem] leading-snug text-gris">{sub}</span>}
      </span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 ${activa ? "text-tinta" : "text-gris"}`} fill="none" stroke="currentColor" strokeWidth={activa ? 3 : 2.5} strokeLinecap="round" strokeLinejoin="round">
        {activa ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
