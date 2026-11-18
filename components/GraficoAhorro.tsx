"use client";
import { useState, type ReactElement } from "react";

/* Ahorro con botones (18-nov-2026, Ig): la persona marca lo que contrataría por separado y se ve, en el primer año,
   lo que pagaría frente a la cuota de Casiopea, que lleva TODO. Lo que no marca sale como «y además te llevas». Cifra baja de
   cada rango; web y CRM se pagan una sola vez. Todo en el navegador, no se guarda nada. */
export type FilaAhorro = { id: string; que: string; quien: string; min: number; max?: number; mensual: boolean; color: string };

const MESES = 12;
const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
const lista = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}` : xs[0] ?? "");

export default function GraficoAhorro({ filas, cuota }: { filas: FilaAhorro[]; cuota: number }): ReactElement {
  const total = (f: FilaAhorro) => (f.mensual ? f.min * MESES : f.min);
  const nuestra = cuota * MESES;
  const [sel, setSel] = useState<string[]>(() => filas.slice(0, 2).map((f) => f.id));
  const marcadas = filas.filter((f) => sel.includes(f.id));
  const sinMarcar = filas.filter((f) => !sel.includes(f.id));
  const suma = marcadas.reduce((a, f) => a + total(f), 0);
  const todo = filas.reduce((a, f) => a + total(f), 0);
  const tope = Math.max(todo, nuestra);
  const mas = suma - nuestra;
  const alternar = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(14,26,61,0.35)] ring-1 ring-black/5 sm:p-8">
      <h3 className="text-2xl font-extrabold text-tinta sm:text-3xl">Elige tú qué contratarías por separado</h3>
      <p className="mt-2 max-w-3xl text-gris">
        Toca cada cosa para ponerla o quitarla. Verás lo que pagarías el primer año, y lo que te llevas de más con Casiopea 360, que lo lleva todo dentro.
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Servicios">
        {filas.map((f) => {
          const on = sel.includes(f.id);
          return (
            <li key={f.id}>
              <button type="button" aria-pressed={on} onClick={() => alternar(f.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold ring-2 transition ${on ? "bg-tinta text-white ring-tinta" : "bg-white text-gris ring-black/10 hover:ring-tinta/40"}`}>
                <span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ background: f.color, opacity: on ? 1 : 0.45 }} />
                {on ? "✓ " : "+ "}{f.que}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Por separado */}
      <div className="mt-6 rounded-[1.4rem] bg-niebla p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="font-extrabold text-tinta">Por separado, solo lo que has marcado</p>
          <p className="text-2xl font-extrabold text-tinta sm:text-3xl">{euros(suma)}</p>
        </div>
        <div className="relative mt-3 h-9 overflow-hidden rounded-lg bg-white">
          <div className="flex h-full transition-all duration-300" style={{ width: `${(suma / tope) * 100}%` }}>
            {marcadas.map((f) => (<div key={f.id} title={`${f.que}: ${euros(total(f))}`} style={{ width: `${(total(f) / suma) * 100}%`, background: f.color }} />))}
          </div>
          <span aria-hidden="true" className="absolute inset-y-0 w-1 bg-estrella shadow-[0_0_0_2px_rgba(14,26,61,0.85)]" style={{ left: `calc(${(nuestra / tope) * 100}% - 2px)` }} />
        </div>
        <p className="mt-2 text-xs text-gris">La raya dorada es lo que cuesta Casiopea 360.</p>
      </div>

      {/* Casiopea */}
      <div className="mt-4 rounded-[1.4rem] bg-estrella p-4 text-tinta sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="font-extrabold">Con Casiopea 360, todo dentro</p>
          <p className="text-2xl font-extrabold sm:text-3xl">{euros(nuestra)}</p>
        </div>
        <div className="mt-3 flex h-9 overflow-hidden rounded-lg bg-white/60" style={{ width: `${(nuestra / tope) * 100}%` }}>
          {filas.map((f) => (<div key={f.id} style={{ width: `${100 / filas.length}%`, background: f.color, opacity: sel.includes(f.id) ? 1 : 0.55 }} />))}
        </div>
        <p className="mt-2 text-sm font-semibold">12 cuotas de {euros(cuota)}. Un equipo, una factura.</p>
      </div>

      {/* Lectura */}
      <div className="mt-4 rounded-[1.6rem] bg-noche p-5 text-white sm:p-6">
        {marcadas.length === 0 ? (
          <p className="text-xl font-extrabold">Marca algo arriba y lo comparamos.</p>
        ) : mas > 0 ? (
          <>
            <p className="text-2xl font-extrabold sm:text-3xl">Solo con {lista(marcadas.map((f) => f.que))} ya pagas <span className="text-estrella">{euros(mas)} más</span>.</p>
            {sinMarcar.length > 0 && <p className="mt-2 text-white/90">Y te pierdes lo que Casiopea 360 sí incluye: <b className="text-estrella">{lista(sinMarcar.map((f) => f.que))}</b>.</p>}
          </>
        ) : (
          <>
            <p className="text-xl font-extrabold sm:text-2xl">Con solo {lista(marcadas.map((f) => f.que))} por separado pagas {euros(suma)}: {mas === 0 ? "lo mismo" : `${euros(-mas)} menos`} que la cuota.</p>
            <p className="mt-2 text-white/90">Con Casiopea 360 además te llevas: <b className="text-estrella">{lista(sinMarcar.map((f) => f.que))}</b>.</p>
          </>
        )}
      </div>
      <p className="mt-3 text-xs text-gris">
        Primer año, sin IVA y con la cifra más baja de cada precio (en el SEO y los anuncios el mercado llega a más). La web y el CRM se pagan una sola vez. Una sola cosa suelta, claro, puede salir más barata: la cuota es para quien necesita varias.
      </p>
    </div>
  );
}
