"use client";

import { useState } from "react";

/* Gráfico interactivo del ahorro (18-nov-2026, Ig, rehecho): SIEMPRE se compara todo contra todo. Primero «todo junto»
   (la cuota, que lo incluye todo) y después ese mismo todo «por separado», desglosado. Solo se mueve el tiempo.
   Se usa la cifra baja del rango para no exagerar el ahorro. Nada sale del navegador. */
export type FilaAhorro = { id: string; que: string; quien: string; min: number; max?: number; mensual: boolean; color: string };

const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export default function GraficoAhorro({ filas, cuota }: { filas: FilaAhorro[]; cuota: number }) {
  const [meses, setMeses] = useState(12);
  const trozos = filas.map((f) => ({ ...f, total: f.mensual ? f.min * meses : f.min }));
  const separado = trozos.reduce((a, t) => a + t.total, 0);
  const nuestra = cuota * meses;
  const tope = Math.max(separado, nuestra, 1);
  const mayor = Math.max(...trozos.map((t) => t.total), 1);
  const ahorro = separado - nuestra;
  const hayMas = filas.some((f) => (f.max ?? f.min) > f.min);

  return (
    <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(14,26,61,0.35)] ring-1 ring-black/5 sm:p-8">
      <h3 className="text-2xl font-extrabold text-tinta sm:text-3xl">Míralo tú: elige cuánto tiempo</h3>
      <p className="mt-2 max-w-2xl text-gris">Primero, todo junto con nosotros. Después, esas mismas cosas una por una, como si las contrataras por separado.</p>

      <label htmlFor="ahorro-meses" className="mt-6 block text-sm font-bold text-tinta">
        ¿Cuánto tiempo? <span className="ml-1 rounded-full bg-noche px-3 py-1 text-white">{meses} {meses === 1 ? "mes" : "meses"}</span>
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

      {/* 1. Todo junto */}
      <div className="mt-8 rounded-[1.6rem] bg-niebla p-5 sm:p-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-gris">1 · Todo junto</p>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-lg font-extrabold text-tinta sm:text-xl">Con Casiopea 360, todo dentro</p>
          <p className="text-3xl font-extrabold text-tinta sm:text-4xl">{euros(nuestra)}</p>
        </div>
        <div className="mt-3 h-12 overflow-hidden rounded-xl bg-white" role="img" aria-label={`Con Casiopea 360, ${euros(nuestra)} en ${meses} meses`}>
          <div className="flex h-full items-center bg-estrella px-3 text-sm font-extrabold text-tinta transition-[width] duration-500 ease-out" style={{ width: `${(nuestra / tope) * 100}%` }}>
            {(nuestra / tope) * 100 > 18 ? `${meses} × ${euros(cuota)}` : ""}
          </div>
        </div>
        <p className="mt-3 text-sm text-gris">
          <b className="text-tinta">Una sola cuota, un solo equipo, una sola factura.</b> Dentro, todo esto y mucho más:
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {filas.map((f) => (
            <li key={f.id} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-tinta ring-1 ring-black/5">
              <span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ background: f.color }} />{f.que}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Por separado */}
      <div className="mt-4 rounded-[1.6rem] bg-niebla p-5 sm:p-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-gris">2 · Esas mismas cosas, por separado</p>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-lg font-extrabold text-tinta sm:text-xl">{filas.length} proveedores, {filas.length} facturas</p>
          <p className="text-3xl font-extrabold text-tinta sm:text-4xl">{euros(separado)}</p>
        </div>
        <div className="mt-3 flex h-12 overflow-hidden rounded-xl bg-white" role="img" aria-label={`Por separado, ${euros(separado)} en ${meses} meses`}>
          {trozos.map((t) => (
            <div key={t.id} title={`${t.que}: ${euros(t.total)}`} className="transition-[width] duration-500 ease-out" style={{ width: `${(t.total / tope) * 100}%`, background: t.color }} />
          ))}
        </div>
        <ul className="mt-5 grid gap-3">
          {trozos.map((t) => (
            <li key={t.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm sm:text-base">
                <span className="font-bold text-tinta">{t.que} <span className="hidden font-normal text-gris sm:inline">· {t.quien}</span></span>
                <span className="whitespace-nowrap font-extrabold text-tinta">{euros(t.total)}</span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full transition-[width] duration-500 ease-out" style={{ width: `${(t.total / mayor) * 100}%`, background: t.color }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-[1.6rem] bg-noche p-6 text-white" aria-live="polite">
        <p className="text-sm font-bold text-white/75">3 · En {meses} {meses === 1 ? "mes" : "meses"} te ahorras, como mínimo</p>
        <p className="mt-1 text-4xl font-extrabold text-estrella sm:text-5xl">{euros(ahorro)}</p>
        <p className="mt-2 text-white/85">{euros(separado)} por separado, menos {euros(nuestra)} con nosotros. Y todavía te llevas más cosas dentro de la cuota que aquí no hemos contado.</p>
      </div>
      <p className="mt-3 text-xs text-gris">
        Usamos la cifra más baja de cada precio{hayMas ? " (en el SEO y los anuncios el mercado llega a más)" : ""}, sin IVA. La web y el CRM se pagan una sola vez, al principio.
      </p>
    </div>
  );
}
