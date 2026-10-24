"use client";

import { useState } from "react";

// Lo que costaría contratar cada cosa por separado según el tamaño de la empresa.
// Precios orientativos del mercado español (Cronoshare, Duotach, Clientify) y, donde se dice, estimación nuestra.
import { MES, TAMANOS, UNA_VEZ, type Fila } from "@/lib/costes";

const eur = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export default function CostesPorTamano() {
  const [t, setT] = useState(1);
  const mes = MES.reduce((a, f) => a + f.valores[t], 0);
  const unaVez = UNA_VEZ.reduce((a, f) => a + f.valores[t], 0);
  return (
    <div>
      <div role="tablist" aria-label="Tamaño de tu empresa" className="flex flex-wrap gap-2">
        {TAMANOS.map((n, i) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={t === i}
            onClick={() => setT(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all sm:text-base ${t === i ? "scale-105 bg-noche text-white shadow-lg" : "bg-white text-tinta ring-1 ring-linea hover:ring-noche"}`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-linea">
        {([["Cada mes", MES, true], ["Una sola vez", UNA_VEZ, false]] as [string, Fila[], boolean][]).map(([titulo, filas, mensual]) => (
          <div key={titulo}>
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-noche px-5 py-3 text-sm font-extrabold text-white sm:px-6">
              <span>{titulo}</span>
              <span className="text-right">Por separado</span>
              <span className="w-24 text-right text-estrella sm:w-28">Con nosotros</span>
            </div>
            {filas.map((f) => (
              <div key={f.que} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-linea px-5 py-4 first:border-t-0 sm:px-6">
                <span>
                  <b className="block">{f.que}</b>
                  {f.nota && <span className="block text-sm text-gris">{f.nota}</span>}
                </span>
                <span key={`${f.que}-${t}`} className="aparece text-right font-extrabold">
                  {eur(f.valores[t])}
                  {mensual && <span className="block text-xs font-normal text-gris">al mes</span>}
                </span>
                <span className="w-24 text-right sm:w-28">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800 sm:text-sm">✓ Incluido</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] border-2 border-dashed border-rose-300 bg-white p-7">
          <p className="text-sm font-bold text-rose-700">Por separado, {TAMANOS[t].toLowerCase()}</p>
          <p key={t} className="aparece mt-2 text-5xl font-extrabold">
            {eur(mes)} <span className="text-2xl text-gris">al mes</span>
          </p>
          <p className="mt-2 text-gris">
            {eur(mes * 12)} al año, más {eur(unaVez)} de web y CRM. El primer año, unos <b className="text-tinta">{eur(Math.round((mes * 12 + unaVez) / 1000) * 1000)}</b>. Y cinco o seis proveedores que coordinar tú.
          </p>
          <div className="mt-6 rounded-2xl bg-niebla p-5">
            <p className="text-sm font-extrabold">Y lo que tardan: tu web nueva</p>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <div className="flex justify-between font-bold"><span>Una agencia</span><span className="text-rose-700">3 a 5 meses</span></div>
                <div className="mt-1 h-3 rounded-full bg-rose-400" />
              </div>
              <div>
                <div className="flex justify-between font-bold"><span>Casiopea 360</span><span className="text-emerald-700">Unos días</span></div>
                <div className="mt-1 h-3 w-[8%] min-w-6 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-noche p-7 text-white">
          <p className="text-sm font-bold text-estrella">Con Casiopea 360</p>
          <p className="mt-2 text-4xl font-extrabold">La misma cuota fija para todos.</p>
          <p className="mt-3 text-white/85">Seas pyme, mediana o gran empresa, pagas lo mismo. Aquí no nos andamos con tonterías: una cuota que lo incluye todo, con la web y el CRM ya hechos y dentro.</p>
          <ul className="mt-4 space-y-1.5 text-white/85">
            <li>¿Quieres otra web? <b className="text-white">Incluida.</b></li>
            <li>¿Cambiar de diseño el año que viene? <b className="text-white">Incluido.</b></li>
            <li>¿Otro CRM o más funciones? <b className="text-white">Incluido.</b></li>
            <li>¿Una calculadora, una landing o un informe nuevo? <b className="text-white">Incluido.</b></li>
            <li>¿Reservas con WhatsApp, una tienda online o la web en inglés? <b className="text-white">Incluido.</b></li>
          </ul>
          <p className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/90">
            <b className="text-estrella">Seis meses de permanencia</b>, porque la web te la regalamos. Después te vas cuando quieras. <a href="#barato" className="font-bold text-white underline underline-offset-4">¿Cómo puede costar tan poco?</a>
          </p>
        </div>
      </div>
      <div className="mt-5 grid items-center gap-6 rounded-[2rem] bg-estrella p-7 text-tinta sm:p-9 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide opacity-70">Pruébalo seis meses</p>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">En tus seis primeros meses ya tienes lo que por separado valdría {eur(Math.round((unaVez + mes * 6) / 1000) * 1000)}.</p>
          <p className="mt-3 text-lg">Tu web nueva, tu CRM, tus calculadoras y seis meses de todo lo demás. Y la web, en unos días, no en los tres, cuatro o cinco meses de una agencia. Nosotros solo vendemos una cuota.</p>
        </div>
        <ul className="space-y-2.5 text-[1.02rem] font-bold">
          {["Web nueva en unos días", "CRM a medida", "Calculadoras y landings", "Google, anuncios y redes", "Y después, te vas cuando quieras"].map((x) => (
            <li key={x} className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-2.5">
              <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-noche text-xs text-estrella">✓</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-xs text-gris">
        Precios orientativos en España en 2026, según guías de Cronoshare, Duotach y Clientify; en gran empresa, estimación nuestra con la parte alta de esos rangos. En tu caso puede ser algo más o algo menos. Va aparte solo lo que pagas a terceros: la inversión en anuncios, la grabación de vídeo profesional y el espacio en radio o prensa.
      </p>
    </div>
  );
}
