import type { Metadata } from "next";
import Link from "next/link";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";
import { CAMPOS_DATOS, GASTO, PANTALLAS, SECTORES, URGE } from "@/lib/testOrden";

/* RECORRIDO DEL TEST (19-nov-2026). Con clave (middleware.ts), fuera de Google.
   Dónde entra la gente, dónde se para, qué campos deja vacíos y en cuáles falla. Todo sale de la tabla `test_pasos`
   (sin cookies, sin IP y sin lo que escribe la persona: solo pantallas, números de opción y si un campo estaba lleno o vacío). */

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Recorrido del test · Casiopea 360", robots: { index: false, follow: false } };

type Fila = { sesion: string; tipo: string; paso: string; valor: string; fuente: string; disp: string; creado: string; variante: string | null };
const PERIODOS: Record<string, { texto: string; dias: number }> = { hoy: { texto: "Hoy", dias: 1 }, "7": { texto: "7 días", dias: 7 }, "28": { texto: "28 días", dias: 28 } };
const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)} %` : "-");
const nav = "inline-flex min-h-[44px] items-center rounded-full border border-white/25 bg-white/5 px-4 text-[14px] font-semibold text-white hover:bg-white/15";

export default async function TestRecorrido({ searchParams }: { searchParams: Promise<{ p?: string; f?: string; d?: string }> }) {
  const sq = await searchParams;
  const per = PERIODOS[sq.p ?? ""] ? (sq.p as string) : "7";
  const fuenteF = sq.f === "ads" || sq.f === "otras" ? sq.f : "";
  const dispF = sq.d === "movil" || sq.d === "pc" ? sq.d : "";
  const enlace = (nuevo: { p?: string; f?: string; d?: string }) => {
    const q = new URLSearchParams();
    const v = { p: per, f: fuenteF, d: dispF, ...nuevo };
    for (const [k, x] of Object.entries(v)) if (x && !(k === "p" && x === "7")) q.set(k, x);
    const s = q.toString();
    return `/mesa/test${s ? `?${s}` : ""}`;
  };

  const envoltorio = (hijo: React.ReactNode) => (
    <div className="min-h-screen bg-niebla">
      <style>{`body > *:not(main):not([data-versionante]) { display: none !important; } main#contenido { padding: 0 !important; }`}</style>
      <header className="bg-noche px-4 pb-6 pt-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-estrella">Solo para ti</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Recorrido del test</h1>
          <p className="mt-2 max-w-2xl text-white/75">Dónde entra la gente, dónde se para y qué campos deja vacíos. Sin cookies y sin guardar nada de lo que escriben.</p>
          <nav className="mt-5 flex flex-wrap gap-2" aria-label="Secciones de la mesa">
            <Link href="/mesa" prefetch={false} className={nav}>La mesa</Link>
            <Link href="/mesa/crm" prefetch={false} className={nav}>CRM</Link>
            <Link href="/mesa/lupa" prefetch={false} className={nav}>Lupa</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{hijo}</main>
    </div>
  );

  if (!hayBaseDeDatos()) return envoltorio(<div className="rounded-3xl bg-white p-6 ring-1 ring-linea"><h2 className="text-2xl font-extrabold text-tinta">Falta conectar la base de datos</h2></div>);
  await asegurarTablas();
  const desde = new Date(Date.now() - PERIODOS[per].dias * 86400_000).toISOString();
  const filas = ((await sql()`SELECT sesion, tipo, paso, valor, fuente, disp, creado, variante FROM test_pasos WHERE creado >= ${desde} ORDER BY creado ASC LIMIT 40000`) as unknown as Fila[]).filter((f) => {
    if (fuenteF === "ads" && f.fuente !== "google-ads") return false;
    if (fuenteF === "otras" && f.fuente === "google-ads") return false;
    if (dispF && f.disp !== dispF) return false;
    return true;
  });

  // Personas distintas por pantalla vista, y por campo / respuesta.
  const personas = (tipo: string, paso?: string, valor?: string) => new Set(filas.filter((f) => f.tipo === tipo && (paso === undefined || f.paso === paso) && (valor === undefined || f.valor === valor)).map((f) => f.sesion)).size;
  const empiezan = personas("vista", "sector");
  const enviaron = personas("envio", "datos", "ok");
  const fallosEnvio = personas("envio", "datos", "error");
  const ampliaron = personas("ampliado", "fin", "ok");
  const vieronDatos = personas("vista", "datos");
  const visibles = personas("vista", "visible");
  // Formulario A (empresa y ciudad obligatorias) frente a B («empresa o web», ciudad opcional): solo cuenta quien llegó a ver los datos.
  const porVar = (v: string) => {
    const f = filas.filter((x) => (x.variante ?? "A") === v);
    const set = (tipo: string, paso: string, valor?: string) => new Set(f.filter((x) => x.tipo === tipo && x.paso === paso && (valor === undefined || x.valor === valor)).map((x) => x.sesion)).size;
    return { v, empiezan: set("vista", "sector"), datos: set("vista", "datos"), envian: set("envio", "datos", "ok") };
  };
  const variantes = [porVar("A"), porVar("B")];
  // Titular de la landing de Google: E («Todo tu marketing digital. Un solo equipo.») frente a C (el claim arriba). Desde el 22-nov.
  const porTitular = (v: string) => {
    const f = filas.filter((x) => x.variante === v);
    const set = (tipo: string, paso: string, valor?: string) => new Set(f.filter((x) => x.tipo === tipo && (paso === "*" || x.paso === paso) && (valor === undefined || x.valor === valor)).map((x) => x.sesion)).size;
    return { v, entran: new Set(f.map((x) => x.sesion)).size, empiezan: set("respuesta", "*"), datos: set("vista", "datos"), envian: set("envio", "datos", "ok") };
  };
  const titulares = [porTitular("E"), porTitular("C")];

  // Última pantalla vista de quien no envió: dónde se queda cada persona.
  const enviaronSet = new Set(filas.filter((f) => f.tipo === "envio" && f.valor === "ok").map((f) => f.sesion));
  const ultima = new Map<string, string>();
  for (const f of filas) if (f.tipo === "vista") ultima.set(f.sesion, f.paso);
  const sinEnviar = [...ultima.entries()].filter(([s]) => !enviaronSet.has(s));
  const dondeSeQuedan = new Map<string, number>();
  for (const [, p] of sinEnviar) dondeSeQuedan.set(p, (dondeSeQuedan.get(p) ?? 0) + 1);

  const filaPantalla = (id: string) => ({ id, vieron: personas("vista", id) });
  const primeras = PANTALLAS.filter((x) => x.fase === "primero" || x.fase === "datos");
  const despues = PANTALLAS.filter((x) => x.fase === "despues" || x.fase === "afinar" || x.fase === "fin");

  const Tabla = ({ lista, base }: { lista: typeof PANTALLAS; base: number }) => (
    <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-linea">
      <table className="w-full min-w-[640px] text-left text-[14px]">
        <thead className="bg-niebla text-[12px] uppercase tracking-wide text-tinta/60">
          <tr><th className="px-4 py-3">Pantalla</th><th className="px-3 py-3 text-right">La ven</th><th className="px-3 py-3 text-right">Del total</th><th className="px-3 py-3 text-right">Se quedan aquí</th></tr>
        </thead>
        <tbody>
          {lista.map((x) => {
            const { vieron } = filaPantalla(x.id);
            const quedan = dondeSeQuedan.get(x.id) ?? 0;
            return (
              <tr key={x.id} className="border-t border-linea">
                <td className="px-4 py-2.5 text-tinta">{x.texto}</td>
                <td className="px-3 py-2.5 text-right font-bold">{vieron}</td>
                <td className="px-3 py-2.5 text-right text-tinta/70">{pct(vieron, base)}</td>
                <td className="px-3 py-2.5 text-right">{quedan ? <b className={quedan * 4 >= vieron && vieron >= 3 ? "text-rose-700" : "text-tinta"}>{quedan}</b> : <span className="text-tinta/40">0</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const distribucion = (id: string, textos: string[]) => {
    const ultimaResp = new Map<string, string>();
    for (const f of filas) if (f.tipo === "respuesta" && f.paso === id) ultimaResp.set(f.sesion, f.valor);
    const cuenta = textos.map(() => 0);
    for (const v of ultimaResp.values()) { const j = Number(v); if (cuenta[j] !== undefined) cuenta[j]++; }
    const total = ultimaResp.size;
    return (
      <ul className="mt-2 space-y-1.5">
        {textos.map((t, j) => (
          <li key={t} className="grid grid-cols-[1fr_auto] items-center gap-3 text-[13px]">
            <span className="flex items-center gap-2"><span className="h-2 rounded-full bg-noche" style={{ width: `${total ? Math.max((cuenta[j] / total) * 100, cuenta[j] ? 4 : 0) : 0}%`, minWidth: cuenta[j] ? 6 : 0 }} /><span className="text-tinta/80">{t}</span></span>
            <b>{cuenta[j]}</b>
          </li>
        ))}
      </ul>
    );
  };

  return envoltorio(
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap gap-2" aria-label="Periodo">
          {Object.entries(PERIODOS).map(([k, v]) => (
            <Link key={k} href={enlace({ p: k })} prefetch={false} className={`rounded-full px-4 py-2 text-[14px] font-bold ${per === k ? "bg-noche text-white" : "bg-white text-tinta ring-1 ring-linea"}`}>{v.texto}</Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Origen">
          {[["", "Todo el tráfico"], ["ads", "Solo Google Ads"], ["otras", "Sin Google Ads"]].map(([k, t]) => (
            <Link key={k} href={enlace({ f: k })} prefetch={false} className={`rounded-full px-4 py-2 text-[14px] font-bold ${fuenteF === k ? "bg-noche text-white" : "bg-white text-tinta ring-1 ring-linea"}`}>{t}</Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Dispositivo">
          {[["", "Móvil y ordenador"], ["movil", "Móvil"], ["pc", "Ordenador"]].map(([k, t]) => (
            <Link key={k} href={enlace({ d: k })} prefetch={false} className={`rounded-full px-4 py-2 text-[14px] font-bold ${dispF === k ? "bg-noche text-white" : "bg-white text-tinta ring-1 ring-linea"}`}>{t}</Link>
          ))}
        </div>
      </div>

      {!empiezan && filas.length === 0 ? (
        <div className="rounded-3xl bg-white p-6 ring-1 ring-linea">
          <h2 className="text-2xl font-extrabold text-tinta">Todavía no hay recorridos en este periodo</h2>
          <p className="mt-2 text-gris">Se empiezan a contar desde que sale la versión nueva del test (cas·v292). Cada persona que abra el test aparecerá aquí, sin nombre.</p>
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Resumen">
            {[
              ["Empiezan el test", String(empiezan), "personas que ven la primera pregunta"],
              ["Llegan a los datos", `${vieronDatos}`, `${pct(vieronDatos, empiezan)} de las que empiezan`],
              ["Envían sus datos", `${enviaron}`, `${pct(enviaron, empiezan)} de las que empiezan${fallosEnvio ? ` · ${fallosEnvio} con error de envío` : ""}`],
              ["Contestan el resto y ven su nota", `${ampliaron}`, `${pct(ampliaron, enviaron)} de las que envían`],
            ].map(([t, n, a]) => (
              <div key={t} className="rounded-3xl bg-white p-5 ring-1 ring-linea">
                <p className="text-[13px] font-bold uppercase tracking-wide text-tinta/55">{t}</p>
                <p className="mt-1 text-4xl font-extrabold text-tinta">{n}</p>
                <p className="mt-1 text-[13px] text-tinta/65">{a}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-tinta">Prueba del titular (landing de Google): E frente a C</h2>
            <p className="mb-3 mt-1 text-[14px] text-tinta/70">E abre con «Todo tu marketing digital. Un solo equipo.» y C con «¿Cuánta gente que te necesita hoy ni sabe que existes?». La misma dirección reparte mitad y mitad. «Entran» son visitas que cargaron el test en esa landing; «Empiezan», las que contestaron al menos una pregunta. Con poco tráfico no decidas antes de unas 150 visitas por titular.</p>
            <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-linea">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead className="bg-niebla text-[12px] uppercase tracking-wide text-tinta/60">
                  <tr><th className="px-4 py-3">Titular</th><th className="px-3 py-3 text-right">Entran</th><th className="px-3 py-3 text-right">Empiezan</th><th className="px-3 py-3 text-right">Empiezan / entran</th><th className="px-3 py-3 text-right">Llegan a los datos</th><th className="px-3 py-3 text-right">Envían</th></tr>
                </thead>
                <tbody>
                  {titulares.map((x) => (
                    <tr key={x.v} className="border-t border-linea">
                      <td className="px-4 py-2.5 font-bold text-tinta">{x.v === "E" ? "E · Un solo equipo" : "C · Claim"}</td>
                      <td className="px-3 py-2.5 text-right">{x.entran}</td>
                      <td className="px-3 py-2.5 text-right">{x.empiezan}</td>
                      <td className="px-3 py-2.5 text-right text-tinta/70">{pct(x.empiezan, x.entran)}</td>
                      <td className="px-3 py-2.5 text-right">{x.datos}</td>
                      <td className="px-3 py-2.5 text-right font-bold">{x.envian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-tinta">Prueba del formulario: A frente a B (congelada en A el 22-nov)</h2>
            <p className="mb-3 mt-1 text-[14px] text-tinta/70">A pide empresa y ciudad. B pide «empresa o web» y deja la ciudad opcional. Se reparte al azar por visita. Con poco tráfico una diferencia pequeña no se puede distinguir del azar: no decidas hasta tener al menos 100 personas que lleguen a los datos en cada una (unas dos semanas). «Ven la tarjeta» cuenta solo a quien tuvo la mitad de la tarjeta en pantalla: {visibles} en total.</p>
            <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-linea">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead className="bg-niebla text-[12px] uppercase tracking-wide text-tinta/60">
                  <tr><th className="px-4 py-3">Formulario</th><th className="px-3 py-3 text-right">Empiezan</th><th className="px-3 py-3 text-right">Llegan a los datos</th><th className="px-3 py-3 text-right">Envían</th><th className="px-3 py-3 text-right">Envían / llegan</th></tr>
                </thead>
                <tbody>
                  {variantes.map((x) => (
                    <tr key={x.v} className="border-t border-linea">
                      <td className="px-4 py-2.5 font-bold text-tinta">{x.v}</td>
                      <td className="px-3 py-2.5 text-right">{x.empiezan}</td>
                      <td className="px-3 py-2.5 text-right">{x.datos}</td>
                      <td className="px-3 py-2.5 text-right font-bold">{x.envian}</td>
                      <td className="px-3 py-2.5 text-right text-tinta/70">{pct(x.envian, x.datos)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-tinta">1 · Los tres toques y los datos</h2>
            <p className="mb-3 mt-1 text-[14px] text-tinta/70">Cada fila son personas distintas que vieron esa pantalla. «Se quedan aquí» es la última pantalla que vieron las que no enviaron sus datos.</p>
            <Tabla lista={primeras} base={empiezan} />
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-tinta">2 · Campos de los datos</h2>
            <p className="mb-3 mt-1 text-[14px] text-tinta/70">Para cada campo, cuántas personas lo tocaron y lo dejaron lleno o vacío, y a cuántas el navegador les avisó de que faltaba o estaba mal. Si un campo obligatorio acumula avisos, ahí está la fricción.</p>
            <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-linea">
              <table className="w-full min-w-[640px] text-left text-[14px]">
                <thead className="bg-niebla text-[12px] uppercase tracking-wide text-tinta/60">
                  <tr><th className="px-4 py-3">Campo</th><th className="px-3 py-3">Obligatorio</th><th className="px-3 py-3 text-right">Lo llenan</th><th className="px-3 py-3 text-right">Lo dejan vacío</th><th className="px-3 py-3 text-right">Avisos de «falta o está mal»</th></tr>
                </thead>
                <tbody>
                  {CAMPOS_DATOS.map((c) => {
                    const llenan = personas("campo", c.id, "ok");
                    const vacios = personas("campo", c.id, "vacio");
                    const avisos = personas("invalido", c.id);
                    return (
                      <tr key={c.id} className="border-t border-linea">
                        <td className="px-4 py-2.5 text-tinta">{c.texto}</td>
                        <td className="px-3 py-2.5 text-tinta/70">{c.obligatorio ? "Sí" : "No"}</td>
                        <td className="px-3 py-2.5 text-right font-bold">{llenan}</td>
                        <td className="px-3 py-2.5 text-right">{vacios}</td>
                        <td className="px-3 py-2.5 text-right">{avisos ? <b className="text-rose-700">{avisos}</b> : <span className="text-tinta/40">0</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-tinta">3 · Lo que contestan en los tres toques</h2>
            <div className="mt-3 grid gap-4 lg:grid-cols-3">
              {[["¿A qué se dedica?", "sector", SECTORES], ["¿Cuánto gastan en marketing?", "gasto", GASTO], ["¿Qué les urge?", "urge", URGE]].map(([t, id, textos]) => (
                <div key={id as string} className="rounded-3xl bg-white p-5 ring-1 ring-linea">
                  <p className="font-extrabold text-tinta">{t as string}</p>
                  {distribucion(id as string, textos as string[])}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-tinta">4 · Después de enviar: la nota</h2>
            <p className="mb-3 mt-1 text-[14px] text-tinta/70">Solo para quien dijo «sí, quiero mi nota». La columna «La ven» es cuánta gente llega a cada pregunta; en la primera de las que bajan mucho, ahí se cansan.</p>
            <Tabla lista={despues} base={Math.max(personas("vista", "capturado"), 1)} />
          </section>

          <section className="rounded-3xl bg-white p-5 text-[14px] text-tinta/75 ring-1 ring-linea">
            <h2 className="text-lg font-extrabold text-tinta">Cómo leerlo</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Una «persona» es una visita al test, no un individuo: quien lo abre dos veces cuenta dos. No hay cookies ni IP.</li>
              <li>«Se quedan aquí» es la última pantalla que vieron. Quien cambia de pestaña un rato y vuelve no cuenta como salida.</li>
              <li>Con pocas visitas (menos de 30 al día) los porcentajes bailan: mira patrones, no decimales.</li>
            </ul>
          </section>
        </>
      )}
    </div>,
  );
}
