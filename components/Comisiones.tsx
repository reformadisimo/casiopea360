"use client";

import { useState } from "react";

// Mini calculadora: lo que te llevan al año en comisiones sobre lo que inviertes en anuncios.
const eur = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
const PASOS = [500, 1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 30000, 50000];

export default function Comisiones() {
  const [i, setI] = useState(4);
  const [pct, setPct] = useState(15);
  const inv = PASOS[i];
  const ano = inv * 12 * (pct / 100);
  return (
    <div className="grid items-center gap-8 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-linea sm:p-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-rose-700">Haz la cuenta en 5 segundos</p>
        <p className="mt-2 text-3xl font-extrabold sm:text-4xl">¿Cuánto te llevan en comisiones?</p>
        <label htmlFor="inversion" className="mt-7 block font-bold">
          Lo que inviertes en anuncios al mes: <span className="text-noche">{eur(inv)}</span>
        </label>
        <input id="inversion" type="range" min={0} max={PASOS.length - 1} value={i} onChange={(e) => setI(Number(e.target.value))} className="mt-3 w-full accent-[#0e1a3d]" />
        <p className="mt-6 font-bold">Comisión que te cobra tu agencia</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[10, 15, 20].map((p) => (
            <button key={p} type="button" aria-pressed={pct === p} onClick={() => setPct(p)} className={`rounded-full border-2 px-5 py-2 font-bold transition-all ${pct === p ? "salta border-rose-600 bg-rose-600 text-white" : "border-linea hover:border-noche"}`}>
              {p} %
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 text-center">
        <div className="rounded-[1.6rem] bg-rose-50 p-6">
          <p className="text-sm font-bold text-rose-700">Con comisión, al año</p>
          <p key={`${i}-${pct}`} className="aparece mt-1 text-5xl font-extrabold text-rose-600">{eur(ano)}</p>
          <p className="mt-1 text-sm text-gris">solo por gestionar tu dinero, sin contar su cuota</p>
        </div>
        <div className="rounded-[1.6rem] bg-emerald-50 p-6">
          <p className="text-sm font-bold text-emerald-800">Con Casiopea 360</p>
          <p className="mt-1 text-5xl font-extrabold text-emerald-700">0 €</p>
          <p className="mt-1 text-sm text-gris">Precio fijo, inviertas lo que inviertas</p>
        </div>
      </div>
    </div>
  );
}
