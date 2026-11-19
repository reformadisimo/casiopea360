import type { Metadata } from "next";
import Link from "next/link";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";
import LupaViva from "@/components/mesa/LupaViva";

/* LUPA PROPIA DE CASIOPEA 360 (19-nov-2026). Con clave (middleware.ts), fuera de Google.
   Lee lupa_clics y lupa_scroll de la base de datos propia: solo posiciones de clics y hasta dónde se baja, sin cookies
   ni nada que identifique a nadie. Se borra lo de más de 90 días. */

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Lupa de Casiopea 360", robots: { index: false, follow: false } };

const DIAS: [string, string][] = [["7", "7 días"], ["28", "28 días"], ["90", "90 días"]];
const nf = new Intl.NumberFormat("es-ES", { useGrouping: "always" } as Intl.NumberFormatOptions);

type Fila = { pagina: string; disp: string; clics: number; visitas: number };

export default async function LupaPagina({ searchParams }: { searchParams: Promise<{ pagina?: string; disp?: string; d?: string }> }) {
  const sq = await searchParams;
  const dias = DIAS.find(([k]) => k === sq.d)?.[0] ?? "28";
  const cabecera = (
    <header className="bg-noche px-4 pb-6 pt-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-estrella">Solo para ti</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Lupa de Casiopea 360</h1>
        <p className="mt-2 max-w-2xl text-white/75">Dónde hace clic la gente y hasta dónde baja, página por página. Sin cookies y sin guardar nada de la persona: solo posiciones.</p>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Secciones de la mesa">
          <Link href="/mesa" prefetch={false} className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 bg-white/5 px-4 text-[14px] font-semibold text-white hover:bg-white/10">Mesa</Link>
          {DIAS.map(([k, t]) => (
            <Link key={k} href={`/mesa/lupa?d=${k}${sq.pagina ? `&pagina=${encodeURIComponent(sq.pagina)}` : ""}${sq.disp ? `&disp=${sq.disp}` : ""}`} prefetch={false} aria-current={k === dias ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[14px] font-semibold ${k === dias ? "border-estrella bg-estrella text-tinta" : "border-white/25 bg-white/5 text-white hover:bg-white/10"}`}>{t}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
  const envoltorio = (hijo: React.ReactNode) => (
    <div className="min-h-screen bg-niebla">
      <style>{`body > *:not(main):not([data-versionante]) { display: none !important; } main#contenido { padding: 0 !important; }`}</style>
      {cabecera}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{hijo}</main>
    </div>
  );

  if (!hayBaseDeDatos()) {
    return envoltorio(<div className="rounded-3xl bg-white p-6 ring-1 ring-linea"><h2 className="text-2xl font-extrabold text-tinta">Falta conectar la base de datos</h2><p className="mt-2 text-gris">Sin ella no se puede guardar dónde hace clic la gente.</p></div>);
  }

  await asegurarTablas();
  const q = sql();
  const filas = (await q`
    SELECT pagina, disp, sum(clics)::int AS clics, sum(visitas)::int AS visitas FROM (
      SELECT pagina, disp, count(*) AS clics, 0 AS visitas FROM lupa_clics WHERE creado > now() - (${dias} || ' days')::interval GROUP BY 1, 2
      UNION ALL
      SELECT pagina, disp, 0, count(*) FROM lupa_scroll WHERE creado > now() - (${dias} || ' days')::interval GROUP BY 1, 2
    ) t GROUP BY pagina, disp ORDER BY sum(visitas) DESC, sum(clics) DESC LIMIT 60`) as unknown as Fila[];

  if (!filas.length) {
    return envoltorio(<div className="rounded-3xl bg-white p-6 ring-1 ring-linea"><h2 className="text-2xl font-extrabold text-tinta">Todavía no hay datos</h2><p className="mt-2 text-gris">La lupa empieza a apuntar desde que se publica este cambio. Pasa por la web, haz clic y baja un poco; en cuanto salgas de la página aparecerá aquí.</p></div>);
  }

  const elegida = filas.find((f) => f.pagina === sq.pagina && f.disp === sq.disp) ?? filas[0];
  const disp = (elegida.disp === "pc" ? "pc" : "movil") as "pc" | "movil";
  const puntos = (await q`SELECT x, y, activo FROM lupa_clics WHERE pagina = ${elegida.pagina} AND disp = ${elegida.disp} AND creado > now() - (${dias} || ' days')::interval ORDER BY creado DESC LIMIT 8000`) as unknown as { x: number; y: number; activo: boolean }[];
  const altoR = (await q`SELECT coalesce(percentile_cont(0.5) WITHIN GROUP (ORDER BY h), 1600)::int AS h FROM lupa_clics WHERE pagina = ${elegida.pagina} AND disp = ${elegida.disp} AND h IS NOT NULL AND creado > now() - (${dias} || ' days')::interval`) as unknown as { h: number }[];
  const bandas = (await q`SELECT (prof / 10) * 10 AS b, count(*)::int AS n FROM lupa_scroll WHERE pagina = ${elegida.pagina} AND disp = ${elegida.disp} AND creado > now() - (${dias} || ' days')::interval GROUP BY 1`) as unknown as { b: number; n: number }[];
  const totalScroll = bandas.reduce((s, x) => s + x.n, 0);
  // alcance[i] = % de visitas que llegan al menos a la banda (i+1)*10 % de la página
  const alcance = Array.from({ length: 10 }, (_, i) => {
    if (!totalScroll) return 0;
    const desde = (i + 1) * 10;
    const n = bandas.filter((x) => x.b >= desde).reduce((s, x) => s + x.n, 0);
    return Math.round((n / totalScroll) * 100);
  });
  const muertos = puntos.filter((p) => !p.activo).length;

  return envoltorio(
    <>
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="rounded-3xl bg-white p-4 ring-1 ring-linea">
          <h2 className="text-lg font-extrabold text-tinta">Páginas</h2>
          <ul className="mt-3 space-y-1">
            {filas.map((f) => {
              const on = f.pagina === elegida.pagina && f.disp === elegida.disp;
              return (
                <li key={`${f.pagina}|${f.disp}`}>
                  <Link href={`/mesa/lupa?d=${dias}&pagina=${encodeURIComponent(f.pagina)}&disp=${f.disp}`} prefetch={false}
                    className={`block rounded-xl px-3 py-2 text-sm ${on ? "bg-noche text-white" : "text-tinta hover:bg-niebla"}`}>
                    <b className="block break-all">{f.pagina}</b>
                    <span className={on ? "text-white/75" : "text-tinta/60"}>{f.disp === "pc" ? "Ordenador" : "Móvil"} · {nf.format(f.clics)} clics · {nf.format(f.visitas)} visitas medidas</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        <section className="min-w-0">
          <div className="mb-4 rounded-3xl bg-white p-5 ring-1 ring-linea">
            <h2 className="text-xl font-extrabold text-tinta break-all">{elegida.pagina} <span className="text-tinta/50">· {disp === "pc" ? "ordenador" : "móvil"}</span></h2>
            <p className="mt-1 text-tinta/70">{nf.format(puntos.length)} clics en {dias} días{puntos.length ? `, de ellos ${nf.format(muertos)} (${Math.round((muertos / puntos.length) * 100)} %) donde no pasa nada` : ""}. {nf.format(totalScroll)} visitas con la bajada medida.</p>
          </div>
          <LupaViva pagina={elegida.pagina} disp={disp} alto={altoR[0]?.h ?? 1600} puntos={puntos.map((p) => [p.x, p.y, p.activo ? 1 : 0] as [number, number, number])} alcance={alcance} />
          <div className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-linea">
            <h3 className="text-lg font-extrabold text-tinta">Hasta dónde baja la gente</h3>
            {!totalScroll ? <p className="mt-2 text-tinta/60">Todavía sin visitas medidas en esta página.</p> : (
              <ul className="mt-3 space-y-1.5">
                {alcance.map((v, i) => (
                  <li key={i} className="grid grid-cols-[5.5rem_1fr_3rem] items-center gap-3 text-sm">
                    <span className="text-tinta/60">hasta el {(i + 1) * 10} %</span>
                    <span className="h-3 overflow-hidden rounded-full bg-niebla"><span className="block h-full rounded-full bg-noche-3" style={{ width: `${v}%` }} /></span>
                    <b className="text-tinta">{v} %</b>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>,
  );
}
