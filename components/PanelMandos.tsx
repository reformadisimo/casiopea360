"use client";

// Dos pestañas del panel de ejemplo: «Mis mandos» (lo que lleva Casiopea, lo que decide el cliente y lo que
// nunca tocamos) y «Herramientas 360» (Lupa, Espejo de la IA, Vigía, Sistemas y Recorrido). TODOS LOS DATOS SON INVENTADOS.
import Link from "next/link";
import { useState } from "react";
import { EtiquetaQuien, Glosa, type Quien } from "@/components/GlosaPanel";

function Bloque({ titulo, fuente, quien, children, className = "" }: { titulo: string; fuente?: string; quien?: Quien; children: React.ReactNode; className?: string }) {
  return (
    <section className={`min-w-0 rounded-3xl border border-linea bg-white p-5 sm:p-7 ${className}`}>
      {quien && <EtiquetaQuien quien={quien} />}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-lg font-extrabold sm:text-xl">{titulo}</h2>
        {fuente && <span className="rounded-full bg-niebla px-3 py-1 text-xs font-bold text-gris">{fuente}</span>}
      </div>
      <Glosa textos={[titulo, fuente]} className="mt-2" />
      <div className="mt-5">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------
// Mis mandos
// ---------------------------------------------------------------------------------------------

const NOSOTROS: { id: string; titulo: string; texto: string }[] = [
  { id: "anuncios", titulo: "Tus anuncios", texto: "Google Ads, Meta y Microsoft Ads: los montamos, los revisamos cada día y te contamos qué hemos cambiado." },
  { id: "google", titulo: "Google, Bing y las IA", texto: "Que te encuentren, en el mapa y cuando preguntan a ChatGPT, Gemini o Claude." },
  { id: "web", titulo: "Tu web", texto: "Rápida, segura y con copia de cada cambio. Los cambios del día a día, en 48 horas." },
  { id: "redes", titulo: "Tus redes", texto: "Contenido, publicaciones y reseñas, con tu visto bueno antes de salir." },
  { id: "medicion", titulo: "La medición", texto: "Tag Manager, Analytics y el resto, bien puestos para que cada contacto se cuente una sola vez." },
  { id: "herramientas", titulo: "Las cinco herramientas 360", texto: "Lupa, Espejo de la IA, Vigía, Sistemas y Recorrido: vigilan tu web mientras tú trabajas." },
  { id: "peticiones", titulo: "Tus peticiones", texto: "Pides, te damos fecha, ves en qué punto está y apruebas." },
  { id: "trabajo", titulo: "Todo lo que hacemos", texto: "Un registro con fecha y con el porqué de cada cosa. Sin cajas negras." },
];

type Mando = {
  id: string;
  titulo: string;
  sirve: string;
  ganas: string;
  sin: string;
  con: string;
  cifras: [string, string][];
  extra?: [string, number][];
};

const MANDOS: Mando[] = [
  {
    id: "facturado",
    titulo: "Lo facturado a clientes que vienen de internet",
    sirve: "Ver cuánto dinero trae cada canal, no solo cuántos contactos.",
    ganas: "Dejas de repartir el dinero de anuncios por clics y lo repartes por lo que de verdad factura cada canal.",
    sin: "Sin este dato te decimos qué canal trae más contactos.",
    con: "Con este dato te decimos qué canal trae más dinero. A veces no es el mismo: en el ejemplo, Instagram trae menos contactos que Google, pero cada cliente factura más.",
    cifras: [["Ventas por internet este mes", "318.400 €"], ["Canal que más factura", "Google sin pagar"], ["Sube frente al mes pasado", "14 %"]],
    extra: [["Google sin pagar", 96200], ["Anuncios de Google", 84900], ["Instagram y Facebook", 47800], ["Ficha de Google (mapa)", 38100], ["ChatGPT y otras IA", 19600], ["Correos de seguimiento", 18400], ["Bing", 11800], ["Otros", 1600]],
  },
  {
    id: "respuesta",
    titulo: "Lo que tardas en contestar a cada contacto",
    sirve: "Saber si la gente que te escribe recibe respuesta a tiempo.",
    ganas: "Un contacto contestado enseguida se hace cliente bastante más que uno que espera un día.",
    sin: "Sin este dato te decimos cuántos contactos te llegan.",
    con: "Con este dato te decimos cuántos se pierden por esperar. En el ejemplo, de cada 100 contactos contestados en menos de una hora, firman 38; contestados al día siguiente, 14.",
    cifras: [["Tiempo medio en contestar", "2 h 10 min"], ["Contestados en menos de 1 hora", "78 %"], ["Esperan más de un día", "9 %"]],
  },
  {
    id: "llamadas",
    titulo: "Cuántos contactos has llamado ya",
    sirve: "Que ningún contacto se quede sin llamada.",
    ganas: "Ves de un vistazo a quién te falta por llamar hoy, sin abrir el CRM.",
    sin: "Sin este dato no sabemos si el problema es la web o el seguimiento.",
    con: "Con este dato podemos decirte si el problema está en los contactos que llegan o en los que no se llaman. En el ejemplo, 31 contactos sin llamar, 3 de ellos desde hace más de tres días.",
    cifras: [["Contactos llamados", "90 %"], ["Sin llamar todavía", "31"], ["Sin llamar desde hace más de 3 días", "3"]],
  },
  {
    id: "cierre",
    titulo: "Cuántos presupuestos se firman",
    sirve: "Medir el cierre de presupuestos, que es el paso que va después de nuestro trabajo.",
    ganas: "Sabes si el cuello de botella está en traer gente o en cerrar lo que traemos.",
    sin: "Sin este dato nos paramos en el contacto.",
    con: "Con este dato te decimos si conviene traer más contactos o mejorar el presupuesto. En el ejemplo, de cada 100 presupuestos enviados se firman 41.",
    cifras: [["Cierre de presupuestos", "41 %"], ["Sube frente al mes pasado", "6 %"], ["Presupuestos abiertos", "27"]],
  },
];

const eur = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

function Interruptor({ on, set, etiqueta }: { on: boolean; set: (v: boolean) => void; etiqueta: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={etiqueta}
      onClick={() => set(!on)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${on ? "bg-emerald-500" : "bg-gris/40"}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? "left-7" : "left-1"}`} />
    </button>
  );
}

export function Mandos({ ir }: { ir: (pestana: string) => void }) {
  const [encendido, setEncendido] = useState<Record<string, boolean>>({});
  const [comparte, setComparte] = useState<Record<string, boolean>>({});
  const activos = MANDOS.filter((m) => encendido[m.id]);
  const compartidos = MANDOS.filter((m) => encendido[m.id] && comparte[m.id]);

  return (
    <>
      <section className="rounded-3xl bg-noche p-6 text-white sm:p-8">
        <p className="text-sm font-bold text-estrella">Tu cabina de mandos</p>
        <p className="mt-2 text-2xl font-extrabold sm:text-3xl">Lo importante lo llevamos nosotros. Lo tuyo, lo decides tú.</p>
        <p className="mt-3 max-w-3xl text-white/80">
          Hay tres zonas y siempre sabes en cuál estás. Lo que hacemos nosotros va encendido. Lo que es de tu empresa por dentro, como lo que facturas o lo que tardas en contestar, está apagado hasta que tú lo enciendas. Y tu CRM y tu contabilidad no los tocamos.
        </p>
        <p className="mt-3 max-w-3xl rounded-2xl bg-white/10 p-4 text-sm">
          <b className="text-estrella">Si te ayudas a ti mismo, te ayudamos mejor.</b> Con los datos de tus campañas ya te damos conclusiones. Si además enciendes lo opcional, esas conclusiones suben de nivel. Eso es gestión interna tuya: no te preguntaremos cuánto has facturado ni a cuántos has llamado.
        </p>
      </section>

      <Bloque titulo="Lo llevamos nosotros" fuente="Siempre encendido" quien="nosotros">
        <ul className="grid gap-3 sm:grid-cols-2">
          {NOSOTROS.map((n) => (
            <li key={n.id}>
              <button type="button" onClick={() => ir(n.id)} className="flex h-full w-full items-start gap-3 rounded-2xl border border-linea p-4 text-left transition-colors hover:bg-niebla">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-extrabold">{n.titulo}</span>
                  <span className="mt-1 block text-sm text-gris">{n.texto}</span>
                  <span className="mt-2 block text-xs font-bold text-noche-3 underline underline-offset-4">Verlo</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Bloque>

      <Bloque titulo="Lo decides tú" fuente={`Encendidos: ${activos.length} de ${MANDOS.length}`} quien="opcional">
        <p className="text-gris">
          Son datos de la gestión de tu empresa. Están apagados. Si enciendes uno, lo ves tú en tu panel. Compartirlo con nosotros es otra casilla aparte, y también empieza apagada.
        </p>
        <ul className="mt-5 space-y-4">
          {MANDOS.map((m) => {
            const on = !!encendido[m.id];
            return (
              <li key={m.id} className={`rounded-3xl border p-5 transition-colors ${on ? "border-emerald-300 bg-emerald-50/40" : "border-linea bg-white"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold">{m.titulo}</h3>
                    <p className="mt-1 text-sm text-gris"><b className="text-tinta">Para qué sirve:</b> {m.sirve}</p>
                    <p className="mt-1 text-sm text-gris"><b className="text-tinta">Qué ganas:</b> {m.ganas}</p>
                  </div>
                  <Interruptor on={on} set={(v) => setEncendido({ ...encendido, [m.id]: v })} etiqueta={m.titulo} />
                </div>

                {!on && <p className="mt-3 rounded-2xl bg-niebla p-3 text-sm text-gris">{m.sin} Enciéndelo y verás aquí tus cifras.</p>}

                {on && (
                  <div className="mt-4">
                    <dl className="grid gap-3 sm:grid-cols-3">
                      {m.cifras.map(([t, v]) => (
                        <div key={t} className="rounded-2xl border border-linea bg-white p-4">
                          <dt className="text-xs font-bold text-gris">{t}</dt>
                          <dd className="mt-1 text-2xl font-extrabold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    {m.extra && (
                      <ul className="mt-4 space-y-1.5">
                        {m.extra.map(([canal, valor]) => (
                          <li key={canal} className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 text-sm">
                            <span className="truncate">{canal}</span>
                            <span className="h-2.5 overflow-hidden rounded-full bg-niebla"><span className="block h-full rounded-full bg-estrella" style={{ width: `${(valor / m.extra![0][1]) * 100}%` }} /></span>
                            <b>{eur(valor)}</b>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-4 rounded-2xl bg-estrella/20 p-3 text-sm"><b>Lo que te diríamos con este dato:</b> {m.con}</p>
                    <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm">
                      <input type="checkbox" checked={!!comparte[m.id]} onChange={(e) => setComparte({ ...comparte, [m.id]: e.target.checked })} className="mt-1 h-4 w-4 accent-yellow-500" />
                      <span><b>Compartirlo con Casiopea 360</b> para que ajustemos mejor tus campañas. Solo totales y porcentajes, nunca datos por cliente. Puedes quitarlo cuando quieras.</span>
                    </label>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {activos.length > 0 && (
          <button type="button" onClick={() => { setEncendido({}); setComparte({}); }} className="mt-5 rounded-full border border-linea px-4 py-2 text-sm font-bold hover:bg-niebla">
            Apagarlo todo
          </button>
        )}
      </Bloque>

      <Bloque titulo="Lo que nunca tocamos" fuente="Tu gestión interna" quien="tuyo">
        <p className="text-lg font-extrabold">Tu CRM, tu contabilidad y tu facturación son tuyos. No entramos en ellos.</p>
        <p className="mt-2 text-gris">
          No te pediremos cuánto has facturado, ni a cuántos contactos has llamado, ni cuánto tardas en contestar. Es la gestión de tu empresa. Si algún día quieres conectar un dato de tu CRM para que trabajemos mejor, lo hablamos y lo decides tú.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-niebla p-4">
            <h3 className="font-extrabold">Lo que vemos</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-gris">
              <li>Las visitas a tu web y de dónde vienen.</li>
              <li>Los contactos que entran: web, WhatsApp, llamadas desde Google.</li>
              <li>Tus campañas, lo que gastan y lo que traen.</li>
              <li>Dónde sales en Google, en Bing y en las IA.</li>
              <li>Las cuentas a las que tú nos invitas.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-niebla p-4">
            <h3 className="font-extrabold">Lo que no vemos</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-gris">
              <li>Tu contabilidad, tus facturas a clientes ni tus cuentas del banco.</li>
              <li>Lo que hay dentro de tu CRM.</li>
              <li>Lo que escriben tus visitantes en los formularios, más allá de entregártelo a ti.</li>
              <li>Cualquiera de los mandos de arriba, salvo que lo enciendas y marques compartir.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-estrella/20 p-4 text-sm" aria-live="polite">
          <b>Ahora mismo compartes con nosotros:</b>{" "}
          {compartidos.length ? compartidos.map((m) => m.titulo.toLowerCase()).join("; ") + "." : "nada. Y puedes seguir así todo el tiempo que quieras."}
        </p>
      </Bloque>
    </>
  );
}

// ---------------------------------------------------------------------------------------------
// Herramientas 360
// ---------------------------------------------------------------------------------------------

type Estado = "Disponible" | "En preparación";
type Herramienta = { id: string; nombre: string; frase: string; estado: Estado; nota: string; color: string };

const HERRAMIENTAS: Herramienta[] = [
  { id: "lupa", nombre: "Lupa 360", frase: "Ves lo que hace la gente en tu web.", estado: "En preparación", nota: "La demo ya funciona. El grabador real se activa en tu web con tu permiso de cookies.", color: "#c2410c" },
  { id: "espejo", nombre: "Espejo de la IA", frase: "Ves qué dicen de ti ChatGPT, Gemini y Claude.", estado: "Disponible", nota: "Cada semana, las mismas preguntas que haría un cliente.", color: "#7c3aed" },
  { id: "vigia", nombre: "Vigía", frase: "Ves los cambios importantes de tu competencia.", estado: "En preparación", nota: "Solo con información pública: su web, sus anuncios y sus reseñas.", color: "#0f766e" },
  { id: "sistemas", nombre: "Sistemas", frase: "Comprobamos cada día que tu web, tus formularios y tus anuncios funcionan.", estado: "Disponible", nota: "Cada día, a primera hora y de forma automática.", color: "#1d4ed8" },
  { id: "recorrido", nombre: "Recorrido 360", frase: "Probamos tu recorrido completo como lo haría un cliente.", estado: "En preparación", nota: "De punta a punta, cada semana. Los contactos de prueba van marcados y no cuentan.", color: "#be123c" },
];

const PREGUNTAS_IA: [string, boolean, boolean, boolean][] = [
  ["¿Qué empresa de climatización me recomiendas en Madrid?", true, true, true],
  ["Mejor empresa de aerotermia para un chalet en Pozuelo", true, true, false],
  ["¿Quién instala suelo radiante en Madrid con garantía?", true, false, true],
  ["Mantenimiento de aire acondicionado para oficinas", false, true, true],
  ["Empresa de confianza para cambiar la caldera", true, true, true],
  ["¿Cuánto cuesta una aerotermia y quién la instala?", true, true, true],
];

const VIGIA: [string, string, string][] = [
  ["Hoy", "Precio", "Una empresa de tu zona ha bajado en su web la revisión anual de 89 € a 79 €."],
  ["Ayer", "Anuncios", "Otra ha lanzado un anuncio nuevo en Google con «aerotermia subvencionada». Lo vemos en la biblioteca pública de anuncios."],
  ["Lunes", "Google", "La competidora principal ha subido 3 puestos en «aerotermia madrid». Ahora está justo detrás de ti."],
  ["Lunes", "Reseñas", "Han recibido 6 reseñas nuevas esta semana, con 4,3 de nota media."],
  ["Jueves", "Web", "Ha publicado una página nueva: «mantenimiento para comunidades de vecinos»."],
];

const SISTEMAS: [string, string, string][] = [
  ["Tu web responde y carga rápido", "Correcto", "Hoy, 06:00"],
  ["El formulario de presupuesto envía y llega", "Correcto", "Hoy, 06:02"],
  ["El botón de WhatsApp abre la conversación", "Correcto", "Hoy, 06:03"],
  ["Los anuncios de Google están activos y con presupuesto", "Correcto", "Hoy, 06:05"],
  ["Los anuncios de Instagram y Facebook se muestran", "Correcto", "Hoy, 06:05"],
  ["Las etiquetas de medición se disparan una sola vez", "Correcto", "Hoy, 06:07"],
  ["El certificado de seguridad y el dominio no caducan pronto", "Correcto", "Hoy, 06:08"],
  ["Los correos de seguimiento salen y no caen en spam", "Revisado", "Ayer, 06:10"],
];

const RECORRIDO_PASOS: [string, string][] = [
  ["Abre tu web desde un móvil y desde un ordenador", "Correcto"],
  ["Usa la calculadora de ahorro hasta el final", "Correcto"],
  ["Rellena el formulario con un contacto de prueba", "Correcto"],
  ["Le llega el aviso al comercial por WhatsApp", "Correcto"],
  ["La ficha entra en el CRM marcada como prueba", "Correcto"],
  ["Recibe el correo de bienvenida y el seguimiento número 1", "Correcto"],
  ["Los datos de prueba no entran en Google, Meta ni en tus informes", "Correcto"],
];

const COLOR_ESTADO: Record<Estado, string> = { Disponible: "bg-emerald-100 text-emerald-800", "En preparación": "bg-amber-100 text-amber-800" };

export function Herramientas360() {
  const [abierta, setAbierta] = useState<string>("lupa");
  const h = HERRAMIENTAS.find((x) => x.id === abierta) ?? HERRAMIENTAS[0];
  return (
    <>
      <section className="rounded-3xl bg-noche p-6 text-white sm:p-8">
        <p className="text-sm font-bold text-estrella">Herramientas 360</p>
        <p className="mt-2 text-2xl font-extrabold sm:text-3xl">Cinco vigilantes que trabajan por ti, también cuando no miras.</p>
        <p className="mt-3 max-w-3xl text-white/80">Las llevamos nosotros. Tú ves el resultado aquí, con una luz verde si todo va bien y un aviso si algo necesita atención.</p>
      </section>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {HERRAMIENTAS.map((x) => (
          <li key={x.id}>
            <button
              type="button"
              onClick={() => setAbierta(x.id)}
              aria-pressed={abierta === x.id}
              className={`flex h-full w-full flex-col items-start gap-2 rounded-3xl border p-4 text-left transition-colors ${abierta === x.id ? "border-noche bg-white shadow-md" : "border-linea bg-white hover:bg-niebla"}`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl text-base font-extrabold text-white" style={{ background: x.color }} aria-hidden="true">{x.nombre.slice(0, 1)}</span>
              <span className="font-extrabold">{x.nombre}</span>
              <span className="text-sm text-gris">{x.frase}</span>
              <span className={`mt-auto rounded-full px-2.5 py-1 text-[11px] font-bold ${COLOR_ESTADO[x.estado]}`}>{x.estado}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="rounded-2xl bg-white p-4 text-sm text-gris">
        <b className="text-tinta">{h.nombre}:</b> {h.nota}
      </p>

      {abierta === "lupa" && (
        <Bloque titulo="Lupa 360 · lo que hace la gente en tu web" fuente="Clarity y la Lupa" quien="nosotros">
          <dl className="grid gap-3 sm:grid-cols-3">
            {[["Toques este mes", "1.846"], ["Toques que no llevan a ningún sitio", "23 %"], ["Llegan al final de la página de inicio", "14 %"]].map(([t, v]) => (
              <div key={t} className="rounded-2xl border border-linea p-4"><dt className="text-xs font-bold text-gris">{t}</dt><dd className="mt-1 text-2xl font-extrabold">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-4 rounded-2xl bg-estrella/20 p-3 text-sm"><b>Lo que nos dice:</b> en el inicio, mucha gente toca la foto grande creyendo que es un botón. Convertirla en enlace es un cambio de media hora.</p>
          <Link href="/lupa-ejemplo" className="mt-4 inline-block rounded-full bg-noche px-5 py-2.5 text-sm font-bold text-white hover:bg-noche-2">Abrir la Lupa de ejemplo, a pantalla completa</Link>
        </Bloque>
      )}

      {abierta === "espejo" && (
        <Bloque titulo="Espejo de la IA · qué dicen de ti" fuente="ChatGPT, Gemini y Claude" quien="nosotros">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead><tr className="text-xs text-gris"><th className="pb-2 pr-3 font-bold">Pregunta de un cliente</th><th className="pb-2 pr-3 font-bold">ChatGPT</th><th className="pb-2 pr-3 font-bold">Gemini</th><th className="pb-2 font-bold">Claude</th></tr></thead>
              <tbody>
                {PREGUNTAS_IA.map(([q, a, b, c]) => (
                  <tr key={q} className="border-t border-linea">
                    <td className="py-2 pr-3">{q}</td>
                    {[a, b, c].map((v, i) => (
                      <td key={i} className="py-2 pr-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${v ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700"}`}>{v ? "Te recomienda" : "No sales"}</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gris">Esta semana sales en 16 de 18 respuestas. Hace ocho semanas, en 5. Son muestras: las IA no contestan siempre igual, así que miramos la tendencia, no una respuesta suelta.</p>
          <p className="mt-2 rounded-2xl bg-estrella/20 p-3 text-sm"><b>Lo que hacemos:</b> si en una pregunta no sales, miramos qué fuentes usa la IA y reforzamos esa información en tu web y en tu ficha.</p>
        </Bloque>
      )}

      {abierta === "vigia" && (
        <Bloque titulo="Vigía · lo que hace tu competencia" fuente="Solo información pública" quien="nosotros">
          <ul className="space-y-3">
            {VIGIA.map(([cuando, tipo, texto]) => (
              <li key={texto} className="flex gap-3 rounded-2xl border border-linea p-4">
                <span className="w-16 shrink-0 text-xs font-bold text-gris">{cuando}</span>
                <span className="min-w-0 text-sm"><b className="mr-2 rounded-full bg-niebla px-2 py-0.5 text-xs">{tipo}</b>{texto}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl bg-niebla p-3 text-sm text-gris">Miramos solo lo que cualquiera puede ver: su web, los anuncios en las bibliotecas públicas de Google y de Meta, sus reseñas y su posición en Google. Nunca datos privados suyos.</p>
          <p className="mt-2 rounded-2xl bg-estrella/20 p-3 text-sm"><b>Lo que haríamos:</b> con el precio de la revisión anual, te proponemos mirar si te conviene ajustar la tuya antes de la campaña de primavera. La decisión es tuya.</p>
        </Bloque>
      )}

      {abierta === "sistemas" && (
        <Bloque titulo="Sistemas · ¿está todo funcionando?" fuente="Cada día, a las 06:00" quien="nosotros">
          <ul className="space-y-2">
            {SISTEMAS.map(([t, e, cuando]) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-linea p-3 text-sm">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="min-w-0 flex-1">{t}</span>
                <span className="shrink-0 text-xs text-gris">{e} · {cuando}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl bg-estrella/20 p-3 text-sm"><b>Lo último que arreglamos:</b> el martes a las 03:12 el formulario devolvió un error. Lo detectamos a las 06:00 y quedó resuelto a las 06:14, antes de que llegara nadie.</p>
        </Bloque>
      )}

      {abierta === "recorrido" && (
        <Bloque titulo="Recorrido 360 · como lo haría un cliente" fuente="Cada lunes, de punta a punta" quien="nosotros">
          <ol className="space-y-2">
            {RECORRIDO_PASOS.map(([t, e], i) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-linea p-3 text-sm">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-noche text-xs font-extrabold text-estrella">{i + 1}</span>
                <span className="min-w-0 flex-1">{t}</span>
                <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">{e}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl bg-niebla p-3 text-sm text-gris">Los contactos de prueba llevan una marca y se quedan fuera de tu CRM real, de las conversiones de Google y de Meta y de tus informes. Así nunca inflamos tus resultados.</p>
          <p className="mt-2 text-sm text-gris">Última prueba completa: lunes, 07:30. Próxima: el lunes que viene.</p>
        </Bloque>
      )}
    </>
  );
}
