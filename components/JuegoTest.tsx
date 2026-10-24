"use client";

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
  const fondo = { bien: "bg-emerald-500 text-white", medio: "bg-amber-400 text-tinta", mal: "bg-rose-500 text-white", neutro: claro ? "bg-white text-noche" : "bg-noche text-estrella" }[tono];
  return (
    <div className="flex items-end gap-2" aria-live="polite">
      <Estrella className="brinca h-10 w-10 shrink-0" />
      <p className={`burbuja rounded-2xl rounded-bl-md px-4 py-2.5 text-[0.98rem] font-extrabold shadow-lg ${fondo}`}>{texto}</p>
    </div>
  );
}

// Una opción grande, de color, con su letra.
export function Opcion({ letra, texto, color, activa, onClick }: { letra: string; texto: string; color: string; activa: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={activa}
      onClick={onClick}
      style={activa ? { background: color, borderColor: color } : { borderColor: "transparent" }}
      className={`group flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left text-[1.05rem] font-bold shadow-[0_6px_18px_-10px_rgba(14,26,61,0.35)] transition-all sm:px-5 ${
        activa ? "salta text-white" : "bg-white text-tinta hover:-translate-y-1 hover:shadow-[0_14px_28px_-14px_rgba(14,26,61,0.45)]"
      }`}
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base font-extrabold transition-transform group-hover:rotate-[-6deg] group-hover:scale-110"
        style={activa ? { background: "rgba(255,255,255,0.25)", color: "#fff" } : { background: color + "1a", color }}
      >
        {activa ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        ) : (
          letra
        )}
      </span>
      <span>{texto}</span>
    </button>
  );
}
