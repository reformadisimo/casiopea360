import type { ReactElement } from "react";

/* Escalera del ahorro (18-nov-2026, Ig, rehecho): sin interacción. Se compara el primer año (12 meses, con la web y el CRM
   una sola vez) con la cifra baja de cada precio. Arriba, Casiopea con TODO. Debajo, lo mismo por separado: todo junto cuesta
   mucho más y, aunque se le vayan quitando cosas, sigue costando más que Casiopea con todo. Se quitan primero las más baratas
   y se para en cuanto el resto saldría por menos que la cuota (no se enseña lo que no sostiene la frase). */
export type FilaAhorro = { id: string; que: string; quien: string; min: number; max?: number; mensual: boolean; color: string };

const MESES = 12;
const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export default function GraficoAhorro({ filas, cuota }: { filas: FilaAhorro[]; cuota: number }): ReactElement {
  const total = (f: FilaAhorro) => (f.mensual ? f.min * MESES : f.min);
  const nuestra = cuota * MESES;
  const porPrecio = [...filas].sort((a, b) => total(a) - total(b)); // de la más barata a la más cara
  // Escalones: todo, y luego sin la más barata, sin las dos más baratas... mientras siga costando más que la cuota
  const pasos: { incluidas: FilaAhorro[]; quitadas: FilaAhorro[]; coste: number }[] = [];
  for (let q = 0; q < porPrecio.length; q++) {
    const incluidas = porPrecio.slice(q);
    const coste = incluidas.reduce((a, f) => a + total(f), 0);
    if (coste <= nuestra) break;
    pasos.push({ incluidas, quitadas: porPrecio.slice(0, q), coste });
  }
  const tope = Math.max(...pasos.map((p) => p.coste), nuestra);
  const marca = (nuestra / tope) * 100;
  const ultimo = pasos[pasos.length - 1];

  return (
    <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(14,26,61,0.35)] ring-1 ring-black/5 sm:p-8">
      <h3 className="text-2xl font-extrabold text-tinta sm:text-3xl">Quita lo que quieras: sigues pagando más</h3>
      <p className="mt-2 max-w-3xl text-gris">
        El primer año, con todo. Y después, lo mismo por separado, quitándole cosas una a una. <b className="text-tinta">Aun con menos cosas, pagas más que con Casiopea 360 con todo dentro.</b>
      </p>

      {/* Casiopea, con todo */}
      <div className="mt-8 rounded-[1.6rem] bg-estrella p-5 text-tinta sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-lg font-extrabold sm:text-xl">Con Casiopea 360, con todo dentro</p>
          <p className="text-3xl font-extrabold sm:text-4xl">{euros(nuestra)}</p>
        </div>
        <p className="mt-1 text-sm font-semibold">Un año: {MESES} cuotas de {euros(cuota)}. Un equipo, una factura.</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {filas.map((f) => (
            <li key={f.id} className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-bold">
              <span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ background: f.color }} />{f.que}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-sm font-extrabold uppercase tracking-wide text-gris">Lo mismo, por separado</p>
      <p className="mt-1 text-sm text-gris">La raya dorada es lo que pagas con Casiopea 360. Todas las barras la pasan.</p>

      <ol className="mt-4 grid gap-4">
        {pasos.map((p, i) => {
          const mas = p.coste - nuestra;
          return (
            <li key={i} className="rounded-[1.4rem] bg-niebla p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-extrabold text-tinta">
                  {i === 0 ? "Todo, por separado" : `Sin ${p.quitadas.map((f) => f.que).join(", ").replace(/, ([^,]*)$/, " ni $1")}`}
                </p>
                <p className="text-2xl font-extrabold text-tinta sm:text-3xl">{euros(p.coste)}</p>
              </div>
              <div className="relative mt-3 h-9 overflow-hidden rounded-lg bg-white" role="img" aria-label={`${euros(p.coste)} por separado, ${euros(mas)} más que con Casiopea 360`}>
                <div className="flex h-full" style={{ width: `${(p.coste / tope) * 100}%` }}>
                  {p.incluidas.map((f) => (
                    <div key={f.id} title={`${f.que}: ${euros(total(f))}`} style={{ width: `${(total(f) / p.coste) * 100}%`, background: f.color }} />
                  ))}
                </div>
                <span aria-hidden="true" className="absolute inset-y-0 w-1 bg-estrella shadow-[0_0_0_2px_rgba(14,26,61,0.85)]" style={{ left: `calc(${marca}% - 2px)` }} />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gris">
                  {p.incluidas.map((f) => (
                    <li key={f.id} className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ background: f.color }} />{f.que}</li>
                  ))}
                </ul>
                <p className="rounded-full bg-noche px-3 py-1 text-sm font-extrabold text-estrella">{euros(mas)} más que con Casiopea 360</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 rounded-[1.6rem] bg-noche p-6 text-white">
        <p className="text-2xl font-extrabold sm:text-3xl">
          Con solo {ultimo.incluidas.map((f) => f.que).join(" y ")} ya pagas {euros(ultimo.coste)}. <span className="text-estrella">Más que con todo en Casiopea 360.</span>
        </p>
        <p className="mt-2 text-white/85">Y todavía te llevas más cosas dentro de la cuota que aquí no hemos contado.</p>
      </div>
      <p className="mt-3 text-xs text-gris">
        Primer año, sin IVA y con la cifra más baja de cada precio (en el SEO y los anuncios el mercado llega a más). La web y el CRM se pagan una sola vez. Una sola cosa suelta, claro, puede salir más barata: la cuota es para quien necesita varias.
      </p>
    </div>
  );
}
