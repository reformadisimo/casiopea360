"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// Calculadora: suma lo que hoy se paga a cada proveedor de marketing.
// Los tramos son orientativos; el cálculo se hace en el navegador y no se envía nada.
const TRAMOS = [
  { texto: "Nada", valor: 0 },
  { texto: "Hasta 300 €", valor: 200 },
  { texto: "300 - 500 €", valor: 400 },
  { texto: "500 - 1.000 €", valor: 750 },
  { texto: "1.000 - 2.000 €", valor: 1500 },
  { texto: "Más de 2.000 €", valor: 2500 },
];

const PROVEEDORES = [
  { id: "web", texto: "Agencia o programador de la web" },
  { id: "seo", texto: "SEO (posicionamiento en Google)" },
  { id: "anuncios", texto: "Gestión de anuncios (sin contar lo invertido)" },
  { id: "redes", texto: "Redes sociales" },
  { id: "diseno", texto: "Diseño, fotos y contenidos" },
  { id: "otros", texto: "Herramientas, mantenimiento y otros" },
];

const COMISIONES = [
  { texto: "No pago comisión", valor: 0 },
  { texto: "Un 5 %", valor: 0.05 },
  { texto: "Un 10 %", valor: 0.1 },
  { texto: "Un 15 % o más", valor: 0.15 },
];

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function CalculadoraGastos() {
  const [gastos, setGastos] = useState<Record<string, number>>(Object.fromEntries(PROVEEDORES.map((p) => [p.id, 0])));
  const [inversion, setInversion] = useState(0);
  const [comision, setComision] = useState(0);

  const { proveedores, mensual, comisionMes } = useMemo(() => {
    const valores = Object.values(gastos);
    const com = inversion * comision;
    return {
      proveedores: valores.filter((v) => v > 0).length,
      mensual: valores.reduce((a, b) => a + b, 0) + com,
      comisionMes: com,
    };
  }, [gastos, inversion, comision]);

  const selector = "mt-2 w-full rounded-xl border border-linea bg-white px-4 py-3 text-base focus:border-noche focus:outline-none";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[2rem] border border-linea bg-white p-6 sm:p-9">
        <p className="font-titular text-2xl font-extrabold">¿Cuánto pagas al mes a cada uno?</p>
        <p className="mt-1 text-gris">Elige el tramo que más se acerque. Si no tienes ese proveedor, déjalo en «Nada».</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {PROVEEDORES.map((p) => (
            <label key={p.id} className="block text-sm font-bold">
              {p.texto}
              <select className={selector} value={gastos[p.id]} onChange={(e) => setGastos({ ...gastos, [p.id]: Number(e.target.value) })}>
                {TRAMOS.map((t) => (
                  <option key={t.texto} value={t.valor}>
                    {t.texto}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <label className="block text-sm font-bold">
            Lo que inviertes en anuncios al mes
            <select className={selector} value={inversion} onChange={(e) => setInversion(Number(e.target.value))}>
              {[0, 500, 1000, 3000, 5000, 10000].map((v) => (
                <option key={v} value={v}>
                  {v === 0 ? "Nada" : `${fmt(v)} €`}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-bold">
            Comisión que te cobran sobre esa inversión
            <select className={selector} value={comision} onChange={(e) => setComision(Number(e.target.value))}>
              {COMISIONES.map((c) => (
                <option key={c.texto} value={c.valor}>
                  {c.texto}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col rounded-[2rem] bg-noche p-6 text-white sm:p-9" aria-live="polite">
        <p className="text-sm text-white/70">Hoy, en marketing digital, pagas más o menos</p>
        <p className="mt-2 font-titular text-6xl font-extrabold leading-none text-estrella">
          {fmt(mensual)} €<span className="text-2xl text-white/60"> al mes</span>
        </p>
        <p className="mt-3 text-lg text-white/80">
          Son unos <strong className="text-white">{fmt(mensual * 12)} € al año</strong>
          {proveedores > 0 && (
            <>
              {" "}
              repartidos entre <strong className="text-white">{proveedores} proveedor{proveedores === 1 ? "" : "es"}</strong>
            </>
          )}
          .
        </p>
        {comisionMes > 0 && (
          <p className="mt-3 text-white/80">
            De ellos, <strong className="text-white">{fmt(comisionMes * 12)} € al año</strong> son solo comisiones sobre tus anuncios. Con nosotros, cero.
          </p>
        )}
        <div className="mt-8 rounded-2xl bg-white/10 p-5">
          <p className="font-titular text-xl font-extrabold">Con Casiopea 360</p>
          <ul className="mt-3 space-y-2 text-white/85">
            <li>Un solo equipo para todo, con una cuota fija.</li>
            <li>Sin comisiones sobre lo que inviertas.</li>
            <li>48 horas como máximo para lo que pidas.</li>
            <li>Un parte de resultados cada día.</li>
          </ul>
        </div>
        <p className="mt-6 text-sm text-white/60">Cifras orientativas, calculadas con los tramos que has elegido. No se envía ningún dato.</p>
        <Link href="/estudio-gratuito" className="mt-auto inline-flex justify-center rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2">
          Quiero saber cuánto ahorraría
        </Link>
      </div>
    </div>
  );
}
