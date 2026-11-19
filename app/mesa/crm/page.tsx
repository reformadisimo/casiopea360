import type { Metadata } from "next";
import Link from "next/link";
import { asegurarTablas, fuenteLegible, hayBaseDeDatos, sql } from "@/lib/db";
import { ESTADOS } from "@/lib/crm";
import { cambiarEstado, guardarNota } from "./acciones";

/* CRM DE CASIOPEA 360 (19-nov-2026). Con clave (middleware.ts), fuera de Google.
   Cada test recibido es una tarjeta que se mueve por el camino: nuevo, contactado, estudio enviado, cliente, descartado.
   Notas propias por persona y descarga en Excel. Todo sale de la tabla `solicitudes`. */

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "CRM de Casiopea 360", robots: { index: false, follow: false } };

type Fila = { id: number; creado: string; estado: string; nombre: string; empresa: string; correo: string; telefono: string; encaje: string; fuente: string; campana: string; aterrizaje: string; notas: string | null; texto: string };
const fechaHora = (d: Date) => d.toLocaleString("es-ES", { timeZone: "Europe/Madrid", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function CrmPagina() {
  const envoltorio = (hijo: React.ReactNode) => (
    <div className="min-h-screen bg-niebla">
      <style>{`body > *:not(main):not([data-versionante]) { display: none !important; } main#contenido { padding: 0 !important; }`}</style>
      <header className="bg-noche px-4 pb-6 pt-8 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-estrella">Solo para ti</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">CRM de Casiopea 360</h1>
          <p className="mt-2 max-w-2xl text-white/75">Cada test que llega es una tarjeta. Muévela por el camino, apunta lo que sepas y descárgalo en Excel cuando quieras.</p>
          <nav className="mt-5 flex flex-wrap gap-2" aria-label="Secciones de la mesa">
            <Link href="/mesa" prefetch={false} className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 bg-white/5 px-4 text-[14px] font-semibold text-white hover:bg-white/10">Mesa</Link>
            <Link href="/mesa/lupa" prefetch={false} className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 bg-white/5 px-4 text-[14px] font-semibold text-white hover:bg-white/10">Lupa</Link>
            <a href="/mesa/crm/exportar" className="inline-flex min-h-[44px] items-center rounded-full bg-estrella px-4 text-[14px] font-bold text-tinta hover:bg-estrella-2">Descargar en Excel</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">{hijo}</main>
    </div>
  );

  if (!hayBaseDeDatos()) {
    return envoltorio(<div className="rounded-3xl bg-white p-6 ring-1 ring-linea"><h2 className="text-2xl font-extrabold text-tinta">Falta conectar la base de datos</h2><p className="mt-2 text-gris">Sin ella no hay dónde guardar los tests.</p></div>);
  }
  await asegurarTablas();
  const filas = (await sql()`SELECT id, creado, estado, nombre, empresa, correo, telefono, encaje, fuente, campana, aterrizaje, notas, texto FROM solicitudes ORDER BY creado DESC LIMIT 500`) as unknown as Fila[];
  if (!filas.length) {
    return envoltorio(<div className="rounded-3xl bg-white p-6 ring-1 ring-linea"><h2 className="text-2xl font-extrabold text-tinta">Todavía no ha llegado ningún test</h2><p className="mt-2 text-gris">Cuando alguien rellene el test de la web aparecerá aquí, en «Nuevos».</p></div>);
  }

  return envoltorio(
    <div className="grid gap-5 lg:grid-cols-5">
      {ESTADOS.map((e) => {
        const lista = filas.filter((f) => (ESTADOS.some((x) => x.clave === f.estado) ? f.estado : "nuevo") === e.clave);
        return (
          <section key={e.clave} className="min-w-0 rounded-3xl bg-white/60 p-3 ring-1 ring-linea">
            <h2 className="px-2 pt-1 text-lg font-extrabold" style={{ color: e.color }}>{e.nombre} <span className="text-tinta/45">({lista.length})</span></h2>
            <p className="px-2 pb-3 text-[13px] text-tinta/60">{e.ayuda}</p>
            <ul className="space-y-3">
              {lista.map((f) => (
                <li key={f.id} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-start justify-between gap-2">
                    <b className="break-words text-tinta">{f.nombre || "Sin nombre"}</b>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${/ALTO/.test(f.encaje ?? "") ? "bg-[#e3f2e8] text-[#1d6b3a]" : /MEDIO/.test(f.encaje ?? "") ? "bg-[#fff1cc] text-[#7a5a00]" : "bg-black/5 text-tinta/70"}`}>{f.encaje || "sin etiqueta"}</span>
                  </div>
                  {f.empresa ? <p className="text-sm text-tinta/75">{f.empresa}</p> : null}
                  <p className="mt-1 break-words text-[13px] text-tinta/60">
                    <a className="underline" href={`mailto:${f.correo}`}>{f.correo}</a>{f.telefono ? ` · ${f.telefono}` : ""}
                  </p>
                  <p className="mt-1 text-[12px] text-tinta/50">{fechaHora(new Date(f.creado))} · {fuenteLegible(f.fuente)}{f.campana ? ` (${f.campana})` : ""}{f.aterrizaje ? ` · entró por ${f.aterrizaje}` : ""}</p>
                  {f.texto ? (
                    <details className="mt-2 text-[13px] text-tinta/75">
                      <summary className="cursor-pointer font-semibold text-noche-3">Lo que contó en el test</summary>
                      <p className="mt-1 whitespace-pre-line">{f.texto}</p>
                    </details>
                  ) : null}
                  <form action={cambiarEstado} className="mt-3 flex gap-2">
                    <input type="hidden" name="id" value={f.id} />
                    <select name="estado" defaultValue={ESTADOS.some((x) => x.clave === f.estado) ? f.estado : "nuevo"} aria-label="Estado" className="min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-2 py-1.5 text-sm">
                      {ESTADOS.map((x) => <option key={x.clave} value={x.clave}>{x.nombre}</option>)}
                    </select>
                    <button type="submit" className="rounded-lg bg-noche px-3 py-1.5 text-sm font-bold text-white hover:bg-noche-3">Mover</button>
                  </form>
                  <form action={guardarNota} className="mt-2">
                    <input type="hidden" name="id" value={f.id} />
                    <textarea name="notas" defaultValue={f.notas ?? ""} rows={2} maxLength={2000} placeholder="Notas: qué hablamos, qué falta…" className="w-full rounded-lg border border-black/15 px-2 py-1.5 text-sm" />
                    <button type="submit" className="mt-1 rounded-lg border border-black/15 bg-white px-3 py-1 text-[13px] font-semibold text-tinta hover:bg-niebla">Guardar nota</button>
                  </form>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>,
  );
}
