"use client";

import { useMemo, useState } from "react";
import { FILAS, TAMANOS, type Fila } from "@/lib/costes";

// Calculadora: marca lo que necesitas y mira lo que te costaría contratarlo por separado,
// con cuántos proveedores, facturas y reuniones. Sin dar nuestra cifra.
const eur = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
const UMBRAL = 1800; // por encima de esto ya pagas más que con nosotros por todo (no se muestra la cifra)

function Interruptor({ activo }: { activo: boolean }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${activo ? "bg-emerald-600" : "bg-linea"}`}>
      <span className={`absolute h-5 w-5 rounded-full bg-white shadow transition-all ${activo ? "left-6" : "left-1"}`} />
    </span>
  );
}

export default function CostesPorTamano() {
  const [t, setT] = useState(1);
  const [marcados, setMarcados] = useState<Set<string>>(() => new Set(FILAS.filter((f) => f.base).map((f) => f.id)));
  const cambiar = (id: string) =>
    setMarcados((m) => {
      const n = new Set(m);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const r = useMemo(() => {
    const sel = FILAS.filter((f) => marcados.has(f.id));
    const mes = sel.filter((f) => f.mensual).reduce((a, f) => a + f.valores[t], 0);
    const unaVez = sel.filter((f) => !f.mensual).reduce((a, f) => a + f.valores[t], 0);
    const proveedores = new Set(sel.map((f) => f.quien)).size;
    const facturas = sel.filter((f) => f.mensual).length;
    return { sel, mes, unaVez, proveedores, facturas, reuniones: proveedores * 2, culpas: (proveedores * (proveedores - 1)) / 2 };
  }, [marcados, t]);

  const grupos: [string, string, Fila[]][] = [
    ["Lo básico", "Lo que casi toda empresa necesita", FILAS.filter((f) => f.base)],
    ["Y además, también incluido en nuestra cuota", "Lo que otras agencias cobran aparte", FILAS.filter((f) => f.extra)],
  ];

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

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          {grupos.map(([titulo, sub, filas]) => (
            <div key={titulo} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-linea">
              <div className="flex flex-wrap items-end justify-between gap-2 bg-noche px-5 py-4 text-white sm:px-6">
                <div>
                  <p className="font-extrabold">{titulo}</p>
                  <p className="text-sm text-white/70">{sub}</p>
                </div>
                <div className="flex gap-2 text-xs font-bold">
                  <button type="button" onClick={() => setMarcados((m) => new Set([...m, ...filas.map((f) => f.id)]))} className="rounded-full bg-white/15 px-3 py-1.5 hover:bg-white/25">Marcar todo</button>
                  <button type="button" onClick={() => setMarcados((m) => new Set([...m].filter((id) => !filas.some((f) => f.id === id))))} className="rounded-full bg-white/15 px-3 py-1.5 hover:bg-white/25">Quitar todo</button>
                </div>
              </div>
              <ul>
                {filas.map((f) => {
                  const activo = marcados.has(f.id);
                  return (
                    <li key={f.id} className="border-t border-linea first:border-t-0">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={activo}
                        onClick={() => cambiar(f.id)}
                        className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 text-left transition-colors sm:px-6 ${activo ? "bg-emerald-50/60" : "hover:bg-niebla"}`}
                      >
                        <Interruptor activo={activo} />
                        <span className="min-w-0">
                          <b className={`block ${activo ? "" : "text-gris"}`}>{f.que}</b>
                          <span className="block text-sm text-gris">{f.nota} · {f.quien}</span>
                        </span>
                        <span className={`text-right font-extrabold ${activo ? "" : "text-gris line-through decoration-1"}`}>
                          <span key={`${f.id}-${t}`} className="aparece inline-block">{eur(f.valores[t])}</span>
                          <span className="block text-xs font-normal text-gris">{f.mensual ? "al mes" : "una vez"}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <p className="text-xs text-gris">
            Precios orientativos en España en 2026. Lo básico, según guías de Cronoshare, Duotach y Clientify; lo demás, estimación nuestra con precios habituales de herramientas y proveedores. En tu caso puede ser algo más o algo menos. Va aparte solo lo que pagas a terceros: la inversión en anuncios, la grabación de vídeo profesional, la impresión y el espacio en radio o prensa.
          </p>
        </div>

        <div className="space-y-5 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[2rem] border-2 border-dashed border-rose-300 bg-white p-7" aria-live="polite">
            <p className="text-sm font-bold text-rose-700">Por separado, {TAMANOS[t].toLowerCase()}</p>
            <p key={`${r.mes}-${t}`} className="aparece mt-2 text-5xl font-extrabold">
              {eur(r.mes)} <span className="text-2xl text-gris">al mes</span>
            </p>
            <p className="mt-2 text-gris">
              {r.unaVez > 0 ? <>Más {eur(r.unaVez)} de una sola vez. </> : null}
              El primer año, unos <b className="text-tinta">{eur(Math.round((r.mes * 12 + r.unaVez) / 1000) * 1000)}</b>.
            </p>
            {r.mes > UMBRAL && (
              <p className="aparece mt-4 rounded-2xl bg-emerald-600 px-4 py-3 font-extrabold text-white">Ya pagarías más que con nosotros por todo.{r.sel.length < FILAS.length / 2 ? " Y aún no has marcado ni la mitad." : " Con nosotros, todo esto va dentro."}</p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              {[
                [r.proveedores, "proveedores que coordinar"],
                [r.facturas, "facturas cada mes"],
                [r.reuniones, "reuniones al mes, más o menos"],
                [r.culpas, "cruces de «eso es cosa del otro»"],
              ].map(([n, txt]) => (
                <div key={txt as string} className="rounded-2xl bg-niebla px-3 py-4">
                  <p key={String(n)} className="aparece text-3xl font-extrabold text-rose-600">{n}</p>
                  <p className="mt-1 text-xs font-bold leading-snug text-gris">{txt}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gris">Y ninguno habla con los demás: el de los anuncios no toca la web, el de la web no mira los anuncios, y tú haces de intermediario.</p>
          </div>

          <div className="rounded-[2rem] bg-noche p-7 text-white">
            <p className="text-sm font-bold text-estrella">Con Casiopea 360</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              {[["1", "equipo"], ["1", "factura al mes"], ["0", "reuniones si no las quieres"], ["0", "excusas"]].map(([n, txt]) => (
                <div key={txt} className="rounded-2xl bg-white/10 px-3 py-4">
                  <p className="text-3xl font-extrabold text-estrella">{n}</p>
                  <p className="mt-1 text-xs font-bold leading-snug text-white/80">{txt}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-2xl font-extrabold">Una sola cuota fija. La misma para cualquier tamaño.</p>
            <p className="mt-2 text-white/85">Con todo lo que marques, y lo que no, dentro. La web y el CRM, ya hechos. ¿Otra web, otra landing, otra calculadora? Incluidas.</p>
            <a href="/estudio-gratuito" className="mt-5 inline-flex rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">Quiero mi estudio gratuito</a>
            <p className="mt-4 text-sm text-white/70">
              <b className="text-estrella">Seis meses de permanencia</b>, porque la web te la regalamos. Después te vas cuando quieras. <a href="#barato" className="font-bold text-white underline underline-offset-4">¿Cómo puede costar tan poco?</a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid items-center gap-6 rounded-[2rem] bg-estrella p-7 text-tinta sm:p-9 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide opacity-70">Pruébalo seis meses</p>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
            En tus seis primeros meses ya tienes lo que por separado valdría {eur(Math.round((r.unaVez + r.mes * 6) / 1000) * 1000)}.
          </p>
          <p className="mt-3 text-lg">Y tu web, en unos días (normalmente menos de una semana), no en los tres, cuatro o cinco meses de una agencia. Nosotros solo vendemos una cuota.</p>
        </div>
        <div className="rounded-2xl bg-white/60 p-5">
          <p className="text-sm font-extrabold">Lo que tardan en hacerte la web</p>
          <div className="mt-3 space-y-3 text-sm">
            <div>
              <div className="flex justify-between font-bold"><span>Una agencia</span><span className="text-rose-700">3 a 5 meses</span></div>
              <div className="mt-1 h-3 rounded-full bg-rose-500" />
            </div>
            <div>
              <div className="flex justify-between font-bold"><span>Casiopea 360</span><span className="text-emerald-800">Unos días</span></div>
              <div className="mt-1 h-3 w-[8%] min-w-6 rounded-full bg-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
