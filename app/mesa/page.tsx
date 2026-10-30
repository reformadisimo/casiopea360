import type { Metadata } from "next";
import Link from "next/link";
import { LogoCanal } from "@/components/mesa/Alegria";
import { asegurarTablas, fuenteLegible, hayBaseDeDatos, sql } from "@/lib/db";

/* MESA DE CASIOPEA 360 (real, 31-oct-2026). Con clave (middleware.ts, MESA_CLAVE), fuera de Google y del mapa del sitio.
   Lee la base de datos propia: el contador sin cookies (tabla vistas) y las solicitudes del test.
   Analytics, Google Ads y Meta se añadirán cuando existan esas cuentas. */

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mesa de Casiopea 360", robots: { index: false, follow: false } };

type Periodo = "hoy" | "ayer" | "7" | "28" | "mes" | "mespasado";
const PERIODOS: [Periodo, string][] = [["hoy", "Hoy"], ["ayer", "Ayer"], ["7", "7 días"], ["28", "28 días"], ["mes", "Este mes"], ["mespasado", "Mes pasado"]];

const hoyMadrid = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
const suma = (s: string, n: number) => { const d = new Date(`${s}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const dias = (a: string, b: string) => Math.round((new Date(`${b}T12:00:00Z`).getTime() - new Date(`${a}T12:00:00Z`).getTime()) / 86400000) + 1;
function rango(p: Periodo, hoy: string): [string, string] {
  switch (p) {
    case "hoy": return [hoy, hoy];
    case "ayer": return [suma(hoy, -1), suma(hoy, -1)];
    case "7": return [suma(hoy, -6), hoy];
    case "mes": return [`${hoy.slice(0, 7)}-01`, hoy];
    case "mespasado": { const fin = suma(`${hoy.slice(0, 7)}-01`, -1); return [`${fin.slice(0, 7)}-01`, fin]; }
    default: return [suma(hoy, -27), hoy];
  }
}
const nf = new Intl.NumberFormat("es-ES", { useGrouping: "always" } as Intl.NumberFormatOptions);
const nf1 = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1, useGrouping: "always" } as Intl.NumberFormatOptions);
const num = (n: number) => nf.format(Math.round(n));
const fechaCorta = (s: string) => new Date(`${s}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
const fechaHora = (d: Date) => d.toLocaleString("es-ES", { timeZone: "Europe/Madrid", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

type Tot = { u: number; e: number; n: number };
async function totales(a: string, b: string): Promise<Tot> {
  const r = (await sql()`SELECT count(*)::int AS n, count(*) FILTER (WHERE entrada)::int AS e, count(*) FILTER (WHERE nuevo)::int AS u
    FROM vistas WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${a}::date AND ${b}::date`) as { n: number; e: number; u: number }[];
  return { n: r[0]?.n ?? 0, e: r[0]?.e ?? 0, u: r[0]?.u ?? 0 };
}

function Cambio({ a, b }: { a: number; b: number }) {
  if (!b) return null;
  const p = ((a - b) / b) * 100;
  const igual = Math.abs(p) < 0.5;
  return (
    <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-bold ${igual ? "bg-black/5 text-tinta/60" : p > 0 ? "bg-[#e3f2e8] text-[#1d6b3a]" : "bg-[#fbe6e6] text-[#a32626]"}`}>
      {igual ? "=" : p > 0 ? "▲" : "▼"} {igual ? "igual" : `${nf1.format(Math.abs(p))} %`}
      <span className="font-semibold text-tinta/45">antes: {num(b)}</span>
    </span>
  );
}

export default async function MesaCasiopea({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p: pq } = await searchParams;
  const per: Periodo = (PERIODOS.find(([k]) => k === pq)?.[0] ?? "28") as Periodo;
  const hoy = hoyMadrid();
  const [a, b] = rango(per, hoy);
  const n = dias(a, b);
  const [ca, cb] = [suma(a, -n), suma(a, -1)];

  const cabecera = (
    <header className="bg-noche px-4 pb-6 pt-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-estrella">Solo para ti</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Mesa de Casiopea 360</h1>
        <p className="mt-2 text-white/75">{a === b ? fechaCorta(a) : `${fechaCorta(a)} – ${fechaCorta(b)}`} · comparado con los {n === 1 ? "el día anterior" : `${n} días anteriores`}</p>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Elegir fechas">
          {PERIODOS.map(([k, t]) => (
            <Link key={k} href={`?p=${k}`} prefetch={false} aria-current={k === per ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[14px] font-semibold ${k === per ? "border-estrella bg-estrella text-tinta" : "border-white/25 bg-white/5 text-white hover:bg-white/10"}`}>
              {t}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );

  const sinWeb = <style>{`body > *:not(main):not([data-versionante]) { display: none !important; } main#contenido { padding: 0 !important; }`}</style>;
  if (!hayBaseDeDatos()) {
    return (
      <div className="min-h-screen bg-niebla">
        {sinWeb}
        {cabecera}
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-linea">
            <h2 className="text-2xl font-extrabold text-tinta">Falta conectar la base de datos</h2>
            <p className="mt-2 text-gris">En cuanto la crees en Vercel (proyecto casiopea360, pestaña Storage, Neon), esta mesa empieza a contar sola: personas, visitas, de dónde vienen y cada test que llegue.</p>
          </div>
        </main>
      </div>
    );
  }

  await asegurarTablas();
  const q = sql();
  const [T, C, origenes, paginas, serie, sols, solsAntes, desde] = await Promise.all([
    totales(a, b),
    totales(ca, cb),
    q`SELECT fuente, disp, count(*)::int AS n, count(*) FILTER (WHERE entrada)::int AS e, count(*) FILTER (WHERE nuevo)::int AS u
      FROM vistas WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${a}::date AND ${b}::date GROUP BY fuente, disp` as unknown as Promise<{ fuente: string; disp: string; n: number; e: number; u: number }[]>,
    q`SELECT pagina, count(*)::int AS n FROM vistas WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${a}::date AND ${b}::date
      GROUP BY pagina ORDER BY n DESC LIMIT 12` as unknown as Promise<{ pagina: string; n: number }[]>,
    q`SELECT to_char((creado AT TIME ZONE 'Europe/Madrid')::date, 'YYYY-MM-DD') AS dia, count(*) FILTER (WHERE nuevo)::int AS u, count(*)::int AS n
      FROM vistas WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${a}::date AND ${b}::date GROUP BY 1 ORDER BY 1` as unknown as Promise<{ dia: string; u: number; n: number }[]>,
    q`SELECT creado, nombre, empresa, correo, telefono, encaje, fuente, campana, correo_enviado FROM solicitudes
      WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${a}::date AND ${b}::date ORDER BY creado DESC LIMIT 60` as unknown as Promise<{ creado: string; nombre: string; empresa: string; correo: string; telefono: string; encaje: string; fuente: string; campana: string; correo_enviado: boolean }[]>,
    q`SELECT count(*)::int AS n FROM solicitudes WHERE (creado AT TIME ZONE 'Europe/Madrid')::date BETWEEN ${ca}::date AND ${cb}::date` as unknown as Promise<{ n: number }[]>,
    q`SELECT to_char(min((creado AT TIME ZONE 'Europe/Madrid')::date), 'YYYY-MM-DD') AS d FROM vistas` as unknown as Promise<{ d: string | null }[]>,
  ]);

  const porOrigen: Record<string, { n: number; e: number; u: number; movil: number; tests: number }> = {};
  for (const r of origenes) {
    const k = fuenteLegible(r.fuente);
    const x = (porOrigen[k] ??= { n: 0, e: 0, u: 0, movil: 0, tests: 0 });
    x.n += r.n; x.e += r.e; x.u += r.u; if (r.disp === "movil") x.movil += r.n;
  }
  for (const s of sols) { const k = fuenteLegible(s.fuente); (porOrigen[k] ??= { n: 0, e: 0, u: 0, movil: 0, tests: 0 }).tests += 1; }
  const filasOrigen = Object.entries(porOrigen).sort((x, y) => y[1].u - x[1].u || y[1].n - x[1].n);
  const empiezaEl = desde[0]?.d ?? null;
  const maxSerie = Math.max(1, ...serie.map((d) => d.u));
  const conversion = T.u ? (sols.length / T.u) * 100 : 0;

  const cifras: { t: string; v: number; c: number; nota?: string; fmt?: (x: number) => string; grande?: boolean }[] = [
    { t: n > 1 ? "Personas distintas (suma de cada día)" : "Personas distintas", v: T.u, c: C.u, nota: n > 1 ? "Quien vuelve otro día cuenta otra vez" : undefined, grande: true },
    { t: "Visitas", v: T.e, c: C.e },
    { t: "Páginas vistas", v: T.n, c: C.n },
    { t: "Tests recibidos", v: sols.length, c: solsAntes[0]?.n ?? 0, nota: T.u ? `${nf1.format(conversion)} % de las personas` : undefined },
  ];

  return (
    <div className="min-h-screen bg-niebla pb-16">
      {sinWeb}
      {cabecera}
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-8">
        {empiezaEl && empiezaEl > a && (
          <p className="rounded-2xl bg-[#fff6d6] px-4 py-3 text-[15px] text-tinta ring-1 ring-[#f0dc9a]">Se cuenta desde el <b>{fechaCorta(empiezaEl)}</b>: antes de ese día no hay datos.</p>
        )}

        <section className="rounded-[24px] border-2 border-[#2a6f86] bg-[#2a6f8612] p-5">
          <h2 className="text-2xl font-extrabold text-tinta">Quién entra de verdad en la web</h2>
          <p className="mt-1 text-[14px] text-tinta/65">Contador propio, sin cookies: cuenta también a quien rechaza las cookies. Sin robots.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cifras.map((x) => (
              <div key={x.t} className={`rounded-[18px] bg-white p-4 ring-1 ${x.grande ? "ring-2 ring-[#2a6f86]" : "ring-linea"}`}>
                <p className="text-[11.5px] font-bold uppercase leading-tight tracking-[0.08em] text-tinta/55">{x.t}</p>
                <p className={`mt-1 font-extrabold leading-none text-tinta ${x.grande ? "text-[40px]" : "text-[30px]"}`}>{num(x.v)}</p>
                <Cambio a={x.v} b={x.c} />
                {x.nota && <p className="mt-1.5 text-[12px] leading-snug text-tinta/55">{x.nota}</p>}
              </div>
            ))}
          </div>
          {serie.length > 1 && (
            <div className="mt-5" aria-label="Personas por día">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-tinta/55">Personas por día</p>
              <div className="mt-2 flex h-28 items-end gap-1 rounded-2xl bg-white p-3 ring-1 ring-linea">
                {serie.map((d) => (
                  <div key={d.dia} className="group relative flex-1" title={`${fechaCorta(d.dia)}: ${num(d.u)} personas`}>
                    <div className="rounded-t bg-[#2a6f86]" style={{ height: `${Math.max(3, (d.u / maxSerie) * 88)}px` }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-[24px] bg-white p-5 ring-1 ring-linea">
          <h2 className="text-xl font-extrabold text-tinta">De dónde vienen</h2>
          {filasOrigen.length === 0 ? (
            <p className="mt-2 text-gris">Todavía no hay visitas en estas fechas.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-[15px] text-tinta">
                <thead className="text-[11.5px] uppercase tracking-[0.08em] text-tinta/55">
                  <tr><th className="py-2 pr-3 font-bold">Origen</th><th className="py-2 pr-3 text-right font-bold">Personas</th><th className="py-2 pr-3 text-right font-bold">Visitas</th><th className="py-2 pr-3 text-right font-bold">Páginas vistas</th><th className="py-2 pr-3 text-right font-bold">En móvil</th><th className="py-2 text-right font-bold">Tests</th></tr>
                </thead>
                <tbody>
                  {filasOrigen.map(([k, x]) => (
                    <tr key={k} className="border-t border-linea">
                      <td className="py-2.5 pr-3 font-semibold"><span className="flex items-center"><LogoCanal canal={k} />{k}</span></td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{num(x.u)}</td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{num(x.e)}</td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{num(x.n)}</td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{x.n ? `${Math.round((x.movil / x.n) * 100)} %` : "-"}</td>
                      <td className="py-2.5 text-right font-bold tabular-nums">{x.tests || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-3 text-[12.5px] text-tinta/55"><b>Personas:</b> gente distinta cada día. <b>Visitas:</b> cada vez que alguien abre la web. <b>Páginas vistas:</b> todas las páginas que ven. Anuncios y Analytics se añaden cuando existan esas cuentas.</p>
        </section>

        <section className="rounded-[24px] bg-white p-5 ring-1 ring-linea">
          <h2 className="text-xl font-extrabold text-tinta">Tests recibidos <span className="text-tinta/45">({sols.length})</span></h2>
          {sols.length === 0 ? (
            <p className="mt-2 text-gris">Ninguno en estas fechas.</p>
          ) : (
            <ul className="mt-3 divide-y divide-linea">
              {sols.map((s, i) => (
                <li key={i} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-4">
                  <span className="text-[13px] text-tinta/55">{fechaHora(new Date(s.creado))}</span>
                  <span>
                    <b className="text-tinta">{s.nombre || "Sin nombre"}</b>{s.empresa ? <span className="text-tinta/70"> · {s.empresa}</span> : null}
                    <span className="block text-[13.5px] text-tinta/60"><a className="underline" href={`mailto:${s.correo}`}>{s.correo}</a>{s.telefono ? ` · ${s.telefono}` : ""} · {fuenteLegible(s.fuente)}{s.campana ? ` (${s.campana})` : ""}{s.correo_enviado ? "" : " · no salió por correo"}</span>
                  </span>
                  <span className={`justify-self-start rounded-full px-3 py-1 text-[12px] font-extrabold sm:justify-self-end ${/ALTO/.test(s.encaje ?? "") ? "bg-[#e3f2e8] text-[#1d6b3a]" : /MEDIO/.test(s.encaje ?? "") ? "bg-[#fff1cc] text-[#7a5a00]" : "bg-black/5 text-tinta/70"}`}>{s.encaje || "sin etiqueta"}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[24px] bg-white p-5 ring-1 ring-linea">
          <h2 className="text-xl font-extrabold text-tinta">Páginas más vistas</h2>
          {paginas.length === 0 ? <p className="mt-2 text-gris">Todavía no hay visitas en estas fechas.</p> : (
            <ul className="mt-3 grid gap-2">
              {paginas.map((p) => (
                <li key={p.pagina} className="grid grid-cols-[1fr_auto] items-center gap-3">
                  <span className="relative overflow-hidden rounded-lg bg-niebla px-3 py-1.5 text-[14px] text-tinta">
                    <span className="absolute inset-y-0 left-0 bg-[#2a6f8622]" style={{ width: `${(p.n / paginas[0].n) * 100}%` }} aria-hidden="true" />
                    <span className="relative">{p.pagina}</span>
                  </span>
                  <span className="text-right font-bold tabular-nums text-tinta">{num(p.n)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
