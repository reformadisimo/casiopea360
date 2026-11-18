"use client";

import { useState } from "react";

/* Gráfico interactivo del ahorro (18-nov-2026, Ig): «para dummies». El visitante elige cuántos meses y qué necesita;
   dos barras crecen: lo que pagaría por separado (a trozos de colores) y la cuota. Se usa SIEMPRE la cifra baja del rango
   para no exagerar el ahorro; el rango completo se dice con palabras. Nada sale del navegador. */
export type FilaAhorro = { id: string; que: string; min: number; max?: number; mensual: boolean; color: string };

const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export default function GraficoAhorro({ filas, cuota }: { filas: FilaAhorro[]; cuota: number }) {
  const [meses, setMeses] = useState(12);
  const [fuera, setFuera] = useState<Set<string>>(new Set());
  const alternar = (id: string) =>
    setFuera((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const activas = filas.filter((f) => !fuera.has(f.id));
  const trozos = activas.map((f) => ({ ...f, total: f.mensual ? f.min * meses : f.min }));
  const separado = trozos.reduce((a, t) => a + t.total, 0);
  const nuestra = cuota * meses;
  const tope = Math.max(separado, nuestra, 1);
  const ahorro = separado - nuestra;
  const hayMas = activas.some((f) => (f.max ?? f.min) > f.min);

  return (
    <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(14,26,61,0.35)] ring-1 ring-black/5 sm:p-8">
      <h3 className="text-2xl font-extrabold text-tinta sm:text-3xl">Míralo tú: mueve los meses</h3>
      <p className="mt-2 max-w-2xl text-gris">Marca lo que necesitas y elige cuánto tiempo. Verás crecer lo que pagarías por separado y lo que pagas con nosotros.</p>

      <p className="mt-6 text-sm font-bold text-tinta">1. Marca lo que necesitas</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {filas.map((f) => {
          const on = !fuera.has(f.id);
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => alternar(f.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 text-sm font-bold transition-colors ${on ? "border-transparent text-white" : "border-linea bg-white text-gris"}`}
              style={on ? { background: f.color } : undefined}
            >
              <span aria-hidden="true">{on ? "✓" : "+"}</span>
              {f.que}
            </button>
          );
        })}
      </div>

      <label htmlFor="ahorro-meses" className="mt-6 block text-sm font-bold text-tinta">
        2. ¿Cuánto tiempo? <span className="ml-1 rounded-full bg-noche px-3 py-1 text-white">{meses} {meses === 1 ? "mes" : "meses"}</span>
      </label>
      <input
        id="ahorro-meses"
        type="range"
        min={1}
        max={12}
        step={1}
        value={meses}
        onChange={(e) => setMeses(Number(e.target.value))}
        className="mt-3 h-11 w-full cursor-pointer accent-[#2440ff]"
      />
      <div className="flex justify-between text-xs text-gris" aria-hidden="true"><span>1 mes</span><span>6 meses</span><span>12 meses</span></div>

      <div className="mt-6 grid gap-5">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-extrabold text-tinta">Por separado</p>
            <p className="text-xl font-extrabold text-tinta sm:text-2xl">{euros(separado)}</p>
          </div>
          <div className="mt-2 flex h-12 overflow-hidden rounded-xl bg-niebla" role="img" aria-label={`Por separado, ${euros(separado)} en ${meses} meses`}>
            {trozos.map((t) => (
              <div
                key={t.id}
                title={`${t.que}: ${euros(t.total)}`}
                className="flex items-center justify-center overflow-hidden text-[11px] font-bold text-white transition-[width] duration-500 ease-out"
                style={{ width: `${(t.total / tope) * 100}%`, background: t.color }}
              >
                {(t.total / tope) * 100 > 11 ? euros(t.total) : ""}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-extrabold text-tinta">Con Casiopea 360, con todo dentro</p>
            <p className="text-xl font-extrabold text-tinta sm:text-2xl">{euros(nuestra)}</p>
          </div>
          <div className="mt-2 h-12 overflow-hidden rounded-xl bg-niebla" role="img" aria-label={`Con Casiopea 360, ${euros(nuestra)} en ${meses} meses`}>
            <div className="flex h-full items-center bg-estrella px-3 text-sm font-extrabold text-tinta transition-[width] duration-500 ease-out" style={{ width: `${(nuestra / tope) * 100}%` }}>
              {(nuestra / tope) * 100 > 18 ? `${meses} × ${euros(cuota)}` : ""}
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gris" aria-label="Leyenda de colores">
        {activas.map((f) => (
          <li key={f.id} className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ background: f.color }} />{f.que}</li>
        ))}
      </ul>

      <div className={`mt-6 rounded-[1.6rem] p-6 ${ahorro > 0 ? "bg-noche text-white" : "bg-niebla text-tinta"}`} aria-live="polite">
        {ahorro > 0 ? (
          <>
            <p className="text-sm font-bold text-white/75">En {meses} {meses === 1 ? "mes" : "meses"} te ahorras, como mínimo</p>
            <p className="mt-1 text-4xl font-extrabold text-estrella sm:text-5xl">{euros(ahorro)}</p>
            <p className="mt-2 text-white/85">Y todavía te llevas más cosas dentro de la cuota que aquí no hemos contado.</p>
          </>
        ) : (
          <>
            <p className="text-lg font-extrabold">Solo con eso, por separado sale parecido o más barato.</p>
            <p className="mt-2 text-gris">La diferencia está en todo lo demás: con la cuota tienes también el resto de cosas, un solo equipo y un solo encargado. Marca más cosas arriba y mira cómo cambia.</p>
          </>
        )}
      </div>
      <p className="mt-3 text-xs text-gris">
        Usamos la cifra más baja de cada precio{hayMas ? " (en el SEO y los anuncios el mercado llega a más)" : ""}, sin IVA. La web y el CRM se pagan una sola vez, al principio.
      </p>
    </div>
  );
}
