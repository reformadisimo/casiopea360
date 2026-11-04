"use client";
import { useState } from "react";

/* Calculadora «Cuánto te puede dejar tu inversión» (4-nov-2026, idea tomada de Ícaro, hecha a nuestra manera).
   Todo se calcula en el navegador: no se guarda ni se envía nada. Sin cifras de ejemplo por sector.
   Cuenta: contactos = inversión / coste por contacto; buenos = contactos x % buenos; clientes = buenos x % que compran;
   lo que entra = clientes x lo que deja cada uno. Es una cuenta con tus números, no una previsión. */

type Campo = { id: string; n: string; titulo: string; ayuda: string; min: number; max: number; paso: number; v: number; f: (x: number) => string };

// Con punto de miles también en cuatro cifras (1.000 €), que se lee mejor.
const miles = (x: number) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const eur = (x: number) => `${miles(x)} €`;
const pct = (x: number) => `${x} %`;
const num = (x: number) => (x < 10 ? new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(x) : miles(x));

const INICIAL: Campo[] = [
  { id: "inv", n: "01", titulo: "Lo que inviertes en anuncios al mes", ayuda: "Lo que pagas a Google o a Meta. Sin contar nuestra cuota.", min: 100, max: 10000, paso: 100, v: 1000, f: eur },
  { id: "cpl", n: "02", titulo: "Lo que te cuesta cada contacto", ayuda: "Inversión dividida entre las personas que te escriben o te llaman.", min: 1, max: 200, paso: 1, v: 20, f: eur },
  { id: "buenos", n: "03", titulo: "De cada 100 contactos, cuántos son buenos", ayuda: "Los que de verdad podrían comprarte.", min: 5, max: 100, paso: 5, v: 60, f: pct },
  { id: "cierre", n: "04", titulo: "De los buenos, cuántos acaban comprando", ayuda: "Tu tasa de cierre.", min: 1, max: 100, paso: 1, v: 20, f: pct },
  { id: "ticket", n: "05", titulo: "Lo que te deja cada cliente", ayuda: "Lo que factura de media cada cliente nuevo. Se queda en tu navegador: no lo vemos.", min: 50, max: 50000, paso: 50, v: 1000, f: eur },
];

export default function CalculadoraInversion() {
  const [campos, setCampos] = useState(INICIAL);
  const v = (id: string) => campos.find((c) => c.id === id)!.v;
  const contactos = v("inv") / v("cpl");
  const buenos = (contactos * v("buenos")) / 100;
  const clientes = (buenos * v("cierre")) / 100;
  const entra = clientes * v("ticket");
  const costeCliente = clientes > 0 ? v("inv") / clientes : 0;
  const retorno = v("inv") > 0 ? entra / v("inv") : 0;
  const cambia = (id: string, x: number) => setCampos((cs) => cs.map((c) => (c.id === id ? { ...c, v: x } : c)));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-linea sm:p-7">
        <p className="text-sm font-extrabold uppercase tracking-wide text-gris">Tus números</p>
        <ul className="mt-4 grid gap-6">
          {campos.map((c) => (
            <li key={c.id}>
              <label htmlFor={`calc-${c.id}`} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 font-bold text-tinta"><span className="mr-2 text-sm text-gris">{c.n}</span>{c.titulo}</span>
                <span className="shrink-0 text-lg font-extrabold tabular-nums text-noche-3">{c.f(c.v)}</span>
              </label>
              <input
                id={`calc-${c.id}`}
                type="range"
                min={c.min}
                max={c.max}
                step={c.paso}
                value={c.v}
                onChange={(e) => cambia(c.id, Number(e.target.value))}
                className="calc-barra mt-3 w-full"
                aria-valuetext={c.f(c.v)}
              />
              <p className="mt-1 text-sm text-gris">{c.ayuda}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-[1.8rem] bg-noche p-5 text-white sm:p-7" aria-live="polite">
          <p className="text-sm font-extrabold uppercase tracking-wide text-estrella">Lo que sale de ahí, al mes</p>
          <dl className="mt-4 divide-y divide-white/10">
            {[
              ["Contactos", num(contactos)],
              ["Contactos buenos", num(buenos)],
              ["Clientes nuevos", num(clientes)],
              ["Lo que te cuesta cada cliente", clientes > 0 ? eur(costeCliente) : "-"],
            ].map(([t, x]) => (
              <div key={t} className="flex items-baseline justify-between gap-3 py-3">
                <dt className="text-white/80">{t}</dt>
                <dd className="text-xl font-extrabold tabular-nums">{x}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 pt-4">
              <dt className="font-extrabold text-estrella">Lo que entra</dt>
              <dd className="text-3xl font-extrabold tabular-nums text-estrella">{eur(entra)}</dd>
            </div>
          </dl>
          <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-white/90">
            Por cada euro en anuncios, vuelven <b className="text-white">{new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(retorno)} €</b>.
          </p>
        </div>
        <p className="rounded-[1.4rem] bg-estrella/25 px-5 py-4 text-tinta">
          <b>Mueve cada barra y mira cuál cambia más el resultado.</b> A veces pesa más cerrar un poco mejor que bajar lo que cuesta el anuncio.
        </p>
        <p className="text-sm text-gris">Es una cuenta con tus números, no una previsión ni una garantía. Nada de lo que pongas sale de tu navegador.</p>
      </div>
    </div>
  );
}
