"use client";
import { useEffect } from "react";

/* Piezas comunes del CRM (cl·v817). */
export const eur = (n: number | null) => (n === null || n === undefined ? "" : `${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" } as Intl.NumberFormatOptions).format(n)} €`);
export const fecha = (s: string | null) => (s ? new Date(s.length === 10 ? `${s}T12:00:00` : s).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) : "");
export const hora = (s: string) => new Date(s).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
export const hoyMadrid = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
export const campo = "w-full rounded-[12px] border border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-teal";
export const etiqueta = "mb-1 block text-[12px] font-bold uppercase tracking-[0.08em] text-ink/50";
export async function api(accion: string, cuerpo?: unknown, metodo = "POST") {
  // Demostración temporal (cl·v820): datos inventados en memoria, sin tocar el servidor
  if (typeof window !== "undefined" && (window as unknown as { __crmDemo?: boolean }).__crmDemo) return (await import("./demo")).apiDemo(accion, cuerpo, metodo);
  const r = await fetch(`/api/crm/${accion}`, metodo === "GET" ? { cache: "no-store" } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo ?? {}) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error ?? `Error ${r.status}`);
  return j;
}

export function Panel({ titulo, cerrar, children, ancho = "max-w-[720px]" }: { titulo: string; cerrar: () => void; children: React.ReactNode; ancho?: string }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") cerrar(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [cerrar]);
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onMouseDown={(e) => { if (e.target === e.currentTarget) cerrar(); }}>
      <div className={`flex h-full w-full ${ancho} flex-col bg-cream shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3">
          <h2 className="font-serif text-[22px] italic text-ink">{titulo}</h2>
          <button type="button" onClick={cerrar} className="rounded-full border border-line px-3 py-1 text-[14px] font-semibold text-ink">Cerrar</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
