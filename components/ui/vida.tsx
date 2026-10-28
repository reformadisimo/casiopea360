import Image from "next/image";
import type { ReactNode } from "react";

/* Piezas con vida (25-oct, cl·v801). Ig: "muy sosa… dale colores, dale vidilla;
   estos tochos no se los lee nadie si no los estructuras". Kit común para toda
   la web: tarjetas con foto e icono de color, pasos numerados, caja de cifra y
   chips con check. Colores: la paleta cálida de la casa (teal, ámbar, terracota,
   salvia, pizarra y un rosa empolvado) SOLO para decorar; lo pulsable sigue
   siendo amarillo y tinta. Solo pintura (opacidad, color, sombra): nada se mueve. */

export type Tono = "teal" | "ambar" | "terracota" | "salvia" | "pizarra" | "rosa";

export const TONOS: Record<Tono, { acento: string; fondo: string; borde: string }> = {
  teal: { acento: "#2C7C98", fondo: "#e7f2f5", borde: "#cfe4ea" },
  ambar: { acento: "#a9802f", fondo: "#f7efe0", borde: "#ecdcbd" },
  terracota: { acento: "#b5643f", fondo: "#f8e9e2", borde: "#efd3c6" },
  salvia: { acento: "#5f8458", fondo: "#ebf1e8", borde: "#d5e2d0" },
  pizarra: { acento: "#4b6c8f", fondo: "#e8edf3", borde: "#d2dce8" },
  rosa: { acento: "#b5646e", fondo: "#f8e8ea", borde: "#efd2d6" },
};
export const ORDEN_TONOS: Tono[] = ["teal", "rosa", "ambar", "salvia", "terracota", "pizarra"];
export const tonoN = (i: number) => ORDEN_TONOS[i % ORDEN_TONOS.length];

export type IconoVida =
  | "cocina" | "bano" | "rayo" | "puerta" | "plano" | "brocha" | "casa" | "persona" | "regla" | "llave"
  | "calendario" | "euro" | "check" | "chat" | "lupa" | "escudo" | "corazon" | "reloj" | "documento" | "casco";

const P: Record<IconoVida, ReactNode> = {
  cocina: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M8 6h.01M11 6h.01M9 13h6" /></>,
  bano: <><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M6 12V6a2 2 0 0 1 3.5-1.3" /><path d="M8 19l-1 2M16 19l1 2" /></>,
  rayo: <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12z" />,
  puerta: <><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" /><path d="M3 21h18M14.5 12h.01" /></>,
  plano: <><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M3 10h8v11M11 14h10M15 3v7" /></>,
  brocha: <><rect x="4" y="3" width="13" height="7" rx="1.5" /><path d="M17 6.5h3v5h-8v3" /><rect x="10.5" y="14.5" width="3" height="7" rx="1" /></>,
  casa: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  persona: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
  regla: <><rect x="3" y="8" width="18" height="8" rx="1.5" /><path d="M7 8v3M11 8v4M15 8v3M19 8v4" /></>,
  llave: <><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M17 6l3 3M14.5 8.5l2 2" /></>,
  calendario: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  euro: <><path d="M17 6.5A6.5 6.5 0 0 0 7.5 12a6.5 6.5 0 0 0 9.5 5.5" /><path d="M5 10.5h8M5 13.5h8" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  lupa: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  escudo: <><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z" /><path d="m9 12 2 2 4-4" /></>,
  corazon: <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  reloj: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  documento: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  casco: <><path d="M4 16a8 8 0 0 1 16 0" /><path d="M2.5 16h19v2.5h-19zM10 8.5V6h4v2.5" /></>,
};

export function Icono({ i, className = "h-5 w-5" }: { i: IconoVida; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[i]}
    </svg>
  );
}

/* ── Tarjetas con foto, icono y color ─────────────────────────────── */
export type TarjetaFoto = { titulo: string; texto: ReactNode; icono: IconoVida; foto?: string; alt?: string; tono?: Tono; sello?: string };

export function TarjetasFoto({ items, columnas = 3 }: { items: TarjetaFoto[]; columnas?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${columnas === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((t, n) => {
        const c = TONOS[t.tono ?? tonoN(n)];
        return (
          <div key={t.titulo} className="rise group overflow-hidden rounded-[22px] border bg-white shadow-[0_22px_50px_-38px_rgba(17,52,61,0.55)] transition-shadow hover:shadow-[0_30px_60px_-34px_rgba(17,52,61,0.6)]" style={{ borderColor: c.borde }}>
            {t.foto ? (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={t.foto} alt={t.alt ?? t.titulo} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-[filter] duration-500 group-hover:brightness-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11.5px] font-bold" style={{ color: c.acento }}>
                  {String(n + 1).padStart(2, "0")}
                </span>
              </div>
            ) : null}
            <div className={`relative px-5 pb-5 ${t.foto ? "pt-6" : "pt-5"}`} style={{ background: `linear-gradient(180deg, ${c.fondo} 0%, #fff ${t.foto ? "75%" : "100%"})` }}>
              <span className={`${t.foto ? "absolute -top-5 left-5" : "mb-3"} flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-10px_rgba(17,52,61,0.5)] ring-2`} style={{ color: c.acento, ["--tw-ring-color" as string]: c.borde }}>
                <Icono i={t.icono} />
              </span>
              {t.sello ? <span className="absolute right-4 top-4 rounded-full bg-yellow px-2.5 py-1 text-[11px] font-bold text-ink">{t.sello}</span> : null}
              <p className="font-serif text-[21px] font-medium italic leading-tight text-ink">{t.titulo}</p>
              <div className="mt-1.5 text-[14.5px] leading-relaxed text-ink/75">{t.texto}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Pasos numerados (para convertir un tocho en un camino) ───────── */
export type Paso = { titulo: string; texto: ReactNode; icono: IconoVida; dato?: string; tono?: Tono };

export function PasosVivos({ pasos }: { pasos: Paso[] }) {
  return (
    <ol className="relative space-y-4">
      <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-[2px] bg-gradient-to-b from-teal/40 via-amber/40 to-yellow/60" />
      {pasos.map((p, n) => {
        const c = TONOS[p.tono ?? tonoN(n)];
        return (
          <li key={p.titulo} className="rise relative flex gap-4">
            <span className="relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border-2 bg-white shadow-[0_10px_24px_-14px_rgba(17,52,61,0.55)]" style={{ borderColor: c.acento, color: c.acento }}>
              <Icono i={p.icono} className="h-5 w-5" />
              <span className="mt-0.5 text-[10.5px] font-bold leading-none">{n + 1}</span>
            </span>
            <div className="min-w-0 flex-1 rounded-[18px] border px-5 py-4" style={{ background: c.fondo, borderColor: c.borde }}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-serif text-[20px] font-medium italic leading-tight text-ink">{p.titulo}</p>
                {p.dato ? <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px] font-bold" style={{ color: c.acento }}>{p.dato}</span> : null}
              </div>
              <div className="mt-1.5 text-[15px] leading-relaxed text-ink/80">{p.texto}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Caja de cifra: un número grande que se ve de lejos ───────────── */
export function CajaCifra({ eyebrow, cifra, unidad, texto, pie, tono = "ambar" }: { eyebrow: string; cifra: ReactNode; unidad?: string; texto: ReactNode; pie?: ReactNode; tono?: Tono }) {
  const c = TONOS[tono];
  return (
    <div className="rise relative overflow-hidden rounded-[24px] border p-6 sm:p-8" style={{ background: c.fondo, borderColor: c.borde }}>
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 font-serif text-[180px] italic leading-none opacity-[0.08]" style={{ color: c.acento }}>€</span>
      <p className="relative text-[11.5px] font-bold uppercase tracking-[0.16em]" style={{ color: c.acento }}>{eyebrow}</p>
      <p className="relative mt-2 font-serif text-[clamp(38px,7vw,60px)] font-medium italic leading-none text-ink">
        {cifra}{unidad ? <span className="ml-2 text-[0.42em] not-italic text-ink/70">{unidad}</span> : null}
      </p>
      <div className="relative mt-3 max-w-[560px] text-[15.5px] leading-relaxed text-ink/80">{texto}</div>
      {pie ? <div className="relative mt-5 flex flex-wrap items-center gap-3">{pie}</div> : null}
    </div>
  );
}

/* ── Chips con check: promesas cortas en fila ─────────────────────── */
export function ChipsCheck({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((t, n) => {
        const c = TONOS[tonoN(n)];
        return (
          <li key={t} className="rise inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-2 text-[14px] font-semibold text-ink" style={{ borderColor: c.borde }}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: c.acento }}><Icono i="check" className="h-3.5 w-3.5" /></span>
            {t}
          </li>
        );
      })}
    </ul>
  );
}

/* ── Comparativa: lo habitual frente a cómo lo hacemos ────────────── */
export function Comparativa({ izquierda, derecha }: { izquierda: { titulo: string; items: ReactNode[] }; derecha: { titulo: string; items: ReactNode[] } }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rise rounded-[22px] border border-line bg-[#f3f1ee] p-6">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-ink/50">{izquierda.titulo}</p>
        <ul className="mt-4 space-y-3">
          {izquierda.items.map((t, n) => (
            <li key={n} className="flex gap-3 text-[15px] leading-relaxed text-ink/65">
              <span aria-hidden="true" className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/10 text-[13px] font-bold text-ink/50">×</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rise relative overflow-hidden rounded-[22px] border p-6 shadow-[0_26px_60px_-40px_rgba(17,52,61,0.55)]" style={{ background: TONOS.teal.fondo, borderColor: TONOS.teal.borde }}>
        <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-yellow/30 blur-2xl" />
        <p className="relative text-[11.5px] font-bold uppercase tracking-[0.16em] text-teal-deep">{derecha.titulo}</p>
        <ul className="relative mt-4 space-y-3">
          {derecha.items.map((t, n) => (
            <li key={n} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <span aria-hidden="true" className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-white"><Icono i="check" className="h-3.5 w-3.5" /></span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Frase destacada: una idea que tiene que verse ─────────────────── */
export function Destacado({ children, tono = "rosa" }: { children: ReactNode; tono?: Tono }) {
  const c = TONOS[tono];
  return (
    <div className="rise relative rounded-[22px] border-l-[6px] px-6 py-5 font-serif text-[clamp(19px,2.6vw,23px)] italic leading-snug text-ink" style={{ background: c.fondo, borderColor: c.acento }}>
      {children}
    </div>
  );
}
