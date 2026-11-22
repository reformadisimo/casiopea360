"use client";
import { useState, type ReactElement } from "react";

/* Ahorro con botones (18-nov-2026, Ig): la persona marca lo que contrataría por separado y se ve, en el primer año,
   lo que pagaría frente a la cuota de Casiopea, que lleva TODO. Lo que no marca sale como «y además te llevas». Cifra baja de
   cada rango; web y CRM se pagan una sola vez. Todo en el navegador, no se guarda nada. */
export type FilaAhorro = { id: string; que: string; quien: string; min: number; max?: number; mensual: boolean; color: string; desc?: string };

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
  const extra = sinMarcar.reduce((a, f) => a + total(f), 0);
  const [foco, setFoco] = useState<string>(() => filas[0]?.id ?? "");
  const alternar = (id: string) => { setFoco(id); setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])); };
  const f0 = filas.find((f) => f.id === foco);
  const precio0 = f0 ? `${f0.max ? `${euros(f0.min)} a ${euros(f0.max)}` : f0.mensual ? euros(f0.min) : `desde ${euros(f0.min)}`}${f0.mensual ? " al mes" : ", una sola vez"}` : "";

  return (
    <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(14,26,61,0.35)] ring-1 ring-black/5 sm:p-8">
      <h3 className="text-2xl font-extrabold text-tinta sm:text-3xl">Elige tú qué contratarías por separado</h3>
      <p className="mt-2 max-w-3xl text-gris">
        Toca cada cosa y mira lo que pagarías el primer año.
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

      {f0 && (
        <div className="mt-4 rounded-2xl bg-niebla p-4 sm:p-5" aria-live="polite" style={{ borderLeft: `6px solid ${f0.color}` }}>
          <p className="text-lg font-extrabold text-tinta">{f0.que}</p>
          {f0.desc && <p className="mt-1 text-tinta/90">{f0.desc}</p>}
          <p className="mt-2 text-sm font-bold text-tinta">Por separado ({f0.quien.toLowerCase()}): <span className="rounded-full bg-white px-2 py-0.5">{precio0}</span> <span className="ml-1 text-gris">Con Casiopea 360: incluido.</span></p>
        </div>
      )}

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
          <p className="font-extrabold">Con Casiopea 360 pagas esto, y tienes todo dentro</p>
          <p className="text-2xl font-extrabold sm:text-3xl">{euros(nuestra)}</p>
        </div>
        <p className="mt-1 text-sm font-semibold">12 cuotas de {euros(cuota)}. Un equipo, una factura.</p>

        {marcadas.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-extrabold uppercase tracking-wide">Lo que has marcado, incluido</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {marcadas.map((f) => (
                <li key={f.id} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold">
                  <span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ background: f.color }} />✓ {f.que}
                </li>
              ))}
            </ul>
          </div>
        )}

        {sinMarcar.length > 0 && (
          <div className="mt-4 rounded-2xl bg-noche p-4 text-white">
            <p className="text-lg font-extrabold text-estrella">Y además, sin pagar nada más:</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {sinMarcar.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2 text-sm">
                  <span className="inline-flex items-center gap-2 font-bold"><span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ background: f.color }} />+ {f.que}</span>
                  <span className="whitespace-nowrap text-white/80">{euros(total(f))}{f.mensual ? " al año" : " una vez"}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-extrabold">Por separado, eso serían <span className="text-estrella">{euros(extra)} más</span>. Con Casiopea 360, 0 € más.</p>
          </div>
        )}
      </div>

      {/* Lectura */}
      <div className="mt-4 rounded-[1.6rem] bg-noche p-5 text-white sm:p-6">
        {marcadas.length === 0 ? (
          <p className="text-xl font-extrabold">Marca algo arriba y lo comparamos.</p>
        ) : mas > 0 ? (
          <p className="text-2xl font-extrabold sm:text-3xl">
            Solo con {lista(marcadas.map((f) => f.que))} pagas <span className="text-estrella">{euros(mas)} más</span> que con Casiopea 360{sinMarcar.length > 0 ? ", y encima no tienes todo lo demás." : "."}
          </p>
        ) : (
          <p className="text-xl font-extrabold sm:text-2xl">
            Por separado, {lista(marcadas.map((f) => f.que))} te cuestan {euros(suma)}{mas === 0 ? ", lo mismo que la cuota" : `, ${euros(-mas)} menos que la cuota`}{sinMarcar.length > 0 ? <>. Pero con Casiopea 360 <span className="text-estrella">además tienes {lista(sinMarcar.map((f) => f.que))}</span>.</> : "."}
          </p>
        )}
      </div>
      <p className="mt-3 text-xs text-gris">
        Primer año, sin IVA y con la cifra más baja. Una sola cosa suelta puede salir más barata: la cuota es para quien necesita varias.
      </p>
    </div>
  );
}
