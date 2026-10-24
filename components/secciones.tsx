import Image from "next/image";
import Link from "next/link";
import VideoFondo from "@/components/VideoFondo";
import LogoMarca from "@/components/LogoMarca";
import MovilParte from "@/components/MovilParte";
import Diagnostico from "@/components/Diagnostico";
import {
  DOLORES,
  ESTUDIO,
  FRENTES,
  GARANTIAS,
  INFORMES,
  OFICIOS,
  PASOS,
  PLAZOS,
  PREGUNTAS,
  TRABAJOS,
} from "@/lib/contenido";

export const ENVOLTORIO = "mx-auto w-full max-w-6xl px-4 sm:px-6";
export const BOTON =
  "inline-flex items-center justify-center rounded-full bg-estrella px-7 py-3.5 text-base font-bold text-tinta transition-colors hover:bg-estrella-2";
export const BOTON_CLARO =
  "inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-3.5 font-bold text-white hover:border-white";

const Punto = ({ className = "" }: { className?: string }) => (
  <span aria-hidden="true" className={`inline-block h-3 w-3 shrink-0 rounded-full bg-estrella shadow-[0_0_0_5px_rgba(255,197,61,0.25)] ${className}`} />
);

const Visto = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-noche-3">
    <path d="M2 8.5l4 3.5 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Herramientas que manejamos a diario. No son clientes: son las plataformas con las que trabajamos. */
const HERRAMIENTAS = [
  "Google",
  "Google Ads",
  "Search Console",
  "Analytics",
  "Google Maps",
  "Bing",
  "Meta",
  "Facebook",
  "Instagram",
  "TikTok",
  "YouTube",
  "LinkedIn",
  "WhatsApp Business",
  "ChatGPT",
  "Gemini",
  "Claude",
  "Vercel",
  "Semrush",
  "Clarity",
  "App Store",
  "Google Play",
];

export function CintaHerramientas() {
  const fila = [...HERRAMIENTAS, ...HERRAMIENTAS];
  return (
    <section aria-label="Plataformas con las que trabajamos cada día" className="overflow-hidden border-y border-white/10 bg-noche-2 py-5">
      <div className="flex w-max animate-[deslizar_55s_linear_infinite] gap-4 motion-reduce:animate-none">
        {fila.map((h, i) => (
          <span key={`${h}-${i}`} aria-hidden={i >= HERRAMIENTAS.length} className="flex items-center gap-3 whitespace-nowrap rounded-full bg-white px-4 py-2 font-titular text-base font-bold text-tinta shadow-sm">
            <LogoMarca nombre={h} tam={24} />
            {h}
          </span>
        ))}
      </div>
    </section>
  );
}

/* El dolor: el caos de proveedores frente a un solo equipo. */
export function SeccionCaos() {
  const sueltos = OFICIOS.slice(0, 18);
  const giros = [-6, 4, -3, 7, -8, 2, 5, -4, 3, -7, 6, -2, 8, -5, 1, -6, 4, -3];
  return (
    <section className={`${ENVOLTORIO} py-20 sm:py-28`}>
      <div className="max-w-3xl">
        <h2 className="text-4xl font-extrabold sm:text-6xl">¿Cómo trabajas hoy?</h2>
        <p className="mt-5 text-lg text-gris sm:text-xl">
          Una agencia para la web, un SEO, otra empresa para los anuncios, alguien para las redes… Cada uno a lo suyo. Una reunión con este, una llamada con el otro, otro correo más. Y tú en medio, coordinando a todos.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[2rem] border border-linea bg-niebla p-7 sm:p-10">
          <p className="font-titular text-2xl font-extrabold sm:text-3xl">Así es lo normal</p>
          <p className="mt-2 text-gris">Veinticinco oficios, cada uno con su plazo, su factura y su forma de trabajar.</p>
          <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Oficios que suele contratar una empresa por separado">
            {sueltos.map((o, i) => (
              <li
                key={o}
                style={{ transform: `rotate(${giros[i]}deg)` }}
                className="rounded-full border border-dashed border-gris/40 bg-white px-3.5 py-1.5 text-sm text-gris shadow-sm"
              >
                {o}
              </li>
            ))}
            <li className="rounded-full px-3.5 py-1.5 text-sm font-bold text-gris">y siete más…</li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-noche p-7 text-white sm:p-10">
          <div className="absolute inset-0 opacity-50">
            <VideoFondo nombre="fibra-luz" alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-noche via-noche/85 to-noche/50" />
          <div className="relative flex h-full flex-col">
            <p className="font-titular text-2xl font-extrabold sm:text-3xl">Así es con Casiopea 360</p>
            <p className="mt-2 text-white/80">Todos esos oficios en un solo equipo, conectados entre sí.</p>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {[
                ["1", "persona de contacto"],
                ["1", "cuota fija, todo incluido"],
                ["48 h", "como máximo, lo del día a día"],
                ["0 %", "de comisión en tus anuncios"],
              ].map(([n, t]) => (
                <div key={t} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <dt className="sr-only">{t}</dt>
                  <dd>
                    <span className="block font-titular text-4xl font-extrabold text-estrella">{n}</span>
                    <span className="mt-1 block text-sm text-white/80">{t}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-auto pt-8 font-titular text-xl font-extrabold text-estrella">Ir de un proveedor a otro se acabó.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Puntos de dolor con su solución. */
export function SeccionPuntosDolor() {
  return (
    <section className="bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">¿Te suena alguno?</h2>
        <p className="mt-5 max-w-2xl text-lg text-gris">Lo que nos cuentan directores y dueños de empresa, y lo que hacemos con ello.</p>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DOLORES.map((d, i) => (
            <li key={d.dolor} className={`flex flex-col rounded-3xl p-6 sm:p-7 ${i === 0 ? "bg-noche text-white" : "bg-white"}`}>
              <p className="font-titular text-xl font-extrabold leading-snug">«{d.dolor}»</p>
              <div className={`mt-auto flex gap-3 border-t pt-5 ${i === 0 ? "border-white/15" : "border-linea"} mt-6`}>
                <Punto className="mt-1.5" />
                <p className={i === 0 ? "text-white/80" : "text-gris"}>
                  <span className={`font-bold ${i === 0 ? "text-white" : "text-tinta"}`}>Lo arreglamos así: </span>
                  {d.solucion}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Banda amarilla de compromisos: el momento alegre de la página. */
export function BandaCompromisos() {
  return (
    <section className="bg-estrella py-16 sm:py-20">
      <div className={`${ENVOLTORIO} grid gap-10 sm:grid-cols-2 lg:grid-cols-4`}>
        {[
          ["1 equipo", "en lugar de veinticinco proveedores"],
          ["48 horas", "como máximo, para lo del día a día"],
          ["0 %", "de comisión sobre lo que inviertas"],
          ["Cada día", "un parte de lo que hemos hecho"],
        ].map(([n, t]) => (
          <div key={n}>
            <p className="whitespace-nowrap font-titular text-5xl font-extrabold leading-none text-noche sm:text-6xl lg:text-5xl">{n}</p>
            <p className="mt-3 text-lg font-bold text-noche/75">{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Banda de vídeo con personas. */
export function BandaVideo() {
  return (
    <section aria-label="Mientras tú atiendes tu negocio" className="relative h-[70vh] min-h-[420px] overflow-hidden bg-noche">
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3">
        <div className="relative h-full"><VideoFondo nombre="neon-sonrisa" alt="Una mujer sonríe mirando su tableta entre luces de neón" /></div>
        <div className="relative hidden h-full sm:block"><VideoFondo nombre="holograma-mesa" alt="Dos personas ríen alrededor de un holograma" /></div>
        <div className="relative hidden h-full sm:block"><VideoFondo nombre="equipo-celebra" alt="Un equipo celebra un buen resultado delante del ordenador" /></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/35 to-transparent" />
      <div className={`${ENVOLTORIO} relative flex h-full items-end pb-14`}>
        <p className="max-w-3xl font-titular text-4xl font-extrabold text-white sm:text-6xl">
          Tú diriges tu empresa. Nosotros, que el teléfono suene.
        </p>
      </div>
    </section>
  );
}

/* Los cinco frentes, en mosaico. */
export function SeccionFrentes({ completa = false }: { completa?: boolean }) {
  return (
    <section id="servicios" className="scroll-mt-24 py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        {!completa && (
          <>
            <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Qué hacemos: absolutamente todo lo digital.</h2>
            <p className="mt-5 max-w-2xl text-lg text-gris">Del dominio y el servidor a la última reseña. Tú no tienes que buscar a nadie más ni tocar nada.</p>
          </>
        )}
        <div className={`${completa ? "" : "mt-12"} grid gap-5 lg:grid-cols-6`}>
          {FRENTES.map((f, i) => {
            const ancho = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            const oscura = i === 0 || i === 4;
            return (
              <article
                key={f.id}
                id={f.id}
                className={`scroll-mt-28 rounded-[2rem] p-7 sm:p-9 ${ancho} ${oscura ? "bg-noche text-white" : "border border-linea bg-white"}`}
              >
                <p className={`font-titular text-sm font-bold ${oscura ? "text-estrella" : "text-noche-3"}`}>Frente {i + 1} de 5</p>
                <h3 className="mt-2 text-3xl font-extrabold">{f.nombre}</h3>
                <p className={`mt-3 text-lg ${oscura ? "text-white/80" : "text-gris"}`}>{f.frase}</p>
                <ul className="mt-6 space-y-2.5">
                  {f.servicios.map((s) => (
                    <li key={s} className="flex gap-3">
                      {oscura ? <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-estrella" /> : <Visto />}
                      <span className={oscura ? "text-white/90" : ""}>{s}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
          <article className="relative overflow-hidden rounded-[2rem] bg-niebla p-7 sm:p-9 lg:col-span-6">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="text-2xl font-extrabold">Y lo único que no hacemos</h3>
                <p className="mt-2 max-w-3xl text-gris">
                  Grabar vídeos profesionales. Te damos las ideas y el guion, y los montamos si nos los das. Para grabar, te ponemos en contacto con la agencia con la que trabajamos, y le pagas tú directamente.
                </p>
              </div>
              <Link href="/estudio-gratuito" className={BOTON}>Cuéntanos tu caso</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* Los veinticinco oficios frente a uno solo. */
export function SeccionOficios() {
  return (
    <section className={`${ENVOLTORIO} py-20 sm:py-28`}>
      <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Veinticinco oficios, un solo equipo.</h2>
      <p className="mt-5 max-w-2xl text-lg text-gris">Todo esto hace falta para que una web traiga clientes. Con nosotros viene junto, y lo vemos todo a la vez.</p>
      <ul className="mt-10 flex flex-wrap gap-2.5">
        {OFICIOS.map((o) => (
          <li key={o} className="flex items-center gap-2 rounded-full border border-linea bg-white px-4 py-2 text-[0.95rem] font-bold">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-estrella" />
            {o}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Por qué existe Casiopea. */
export function SeccionOrigen() {
  return (
    <section className="relative overflow-hidden bg-noche text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <VideoFondo nombre="papeles" alt="Un despacho con papeles apilados sobre la mesa" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-noche/60 lg:to-noche" />
        </div>
        <div className="flex items-center px-4 py-16 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold sm:text-5xl">La empresa que nos habría gustado contratar.</h2>
            <p className="mt-6 text-lg text-white/80">
              Cuando montamos nuestros primeros negocios, hacer una web tardaba meses y cualquier cambio era eterno. Teníamos un proveedor para cada cosa y ninguno hablaba con los demás.
            </p>
            <p className="mt-4 text-lg text-white/80">
              Casiopea 360 es lo que entonces no encontramos: un solo equipo que lo hace todo, rápido, y que te cuenta cada día lo que pasa. Lo que antes eran semanas, ahora son minutos.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-4xl font-extrabold text-estrella">22+</p><p className="text-sm text-white/75">años de experiencia</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-4xl font-extrabold text-estrella">60.000 €</p><p className="text-sm text-white/75">al mes en Google Ads para una sola empresa</p></div>
            </div>
            <Link href="/quienes-somos" className="mt-6 inline-flex font-bold text-estrella hover:underline">Conoce quiénes somos →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Trabajos reales. */
export function SeccionTrabajos({ titulo = true }: { titulo?: boolean }) {
  const trabajos = TRABAJOS.filter((t) => t.publicado);
  return (
    <section id="trabajos" className={`${ENVOLTORIO} scroll-mt-24 py-20 sm:py-28`}>
      {titulo && (
        <>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Trabajos reales, funcionando hoy.</h2>
          <p className="mt-5 max-w-2xl text-lg text-gris">Lo construimos primero para nosotros. Lo que te ofrecemos ya trae clientes a nuestras propias empresas.</p>
        </>
      )}
      <div className={`${titulo ? "mt-12" : ""} grid gap-6 md:grid-cols-2`}>
        {trabajos.map((t, i) => (
          <article key={t.nombre} className={`group flex flex-col rounded-[2rem] p-7 sm:p-9 ${i % 3 === 0 ? "bg-noche text-white" : "border border-linea bg-white"}`}>
            {t.logo && (
              <div className="mb-6 flex h-16 items-center">
                <Image
                  src={t.logo.src}
                  alt={`Logotipo de ${t.nombre}`}
                  width={t.logo.ancho}
                  height={t.logo.alto}
                  className={`h-full w-auto object-contain ${t.logo.ancho === t.logo.alto ? "rounded-2xl" : ""}`}
                />
              </div>
            )}
            <p className={`text-sm font-bold ${i % 3 === 0 ? "text-estrella" : "text-noche-3"}`}>{t.sector}</p>
            <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t.nombre}</h3>
            <p className={`mt-4 flex-1 text-lg ${i % 3 === 0 ? "text-white/80" : "text-gris"}`}>{t.resumen}</p>
            <a
              href={t.url}
              target="_blank"
              rel="noopener"
              className={`mt-7 inline-flex w-fit items-center rounded-full border-2 px-5 py-2.5 font-bold ${
                i % 3 === 0 ? "border-white text-white hover:bg-white hover:text-noche" : "border-noche text-noche hover:bg-noche hover:text-white"
              }`}
            >
              {t.enlaceTexto}
            </a>
          </article>
        ))}
      </div>
      <p className="mt-6 text-gris">Más proyectos en construcción. Los enseñamos en cuanto sus dueños nos den permiso.</p>
    </section>
  );
}

/* El parte diario y el enlace en tiempo real. */
export function SeccionParte() {
  return (
    <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-28">
      <div className="absolute inset-0 opacity-25">
        <VideoFondo nombre="equipo-riendo" alt="" />
      </div>
      <div className="absolute inset-0 bg-noche/75" />
      <div className={`${ENVOLTORIO} relative grid items-center gap-14 lg:grid-cols-[1fr_auto]`}>
        <div>
          <h2 className="max-w-2xl text-4xl font-extrabold sm:text-6xl">Cada día sabes qué hemos hecho por tu negocio.</h2>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Sin entrar en ninguna herramienta ni entender de números. Te llega un mensaje corto por WhatsApp, por correo o por Slack, como prefieras.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {INFORMES.map((i) => (
              <div key={i.cuando} className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="font-titular text-xl font-extrabold text-estrella">{i.cuando}</p>
                <p className="text-sm text-white/60">{i.lectura}</p>
                <ul className="mt-3 space-y-1.5 text-[0.95rem] text-white/85">
                  {i.puntos.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-white/70">
            Además, tienes tu propio panel de control, donde ves en tiempo real de dónde viene cada cliente, cuánto te cuesta y todo lo que hemos hecho. Y leemos cada conversación de tu asistente, todos los días: sabemos qué preocupa a tus clientes con sus propias palabras.
          </p>
          <Link href="/panel" className={`${BOTON} mt-6 inline-flex`}>Ver un panel de ejemplo</Link>
        </div>
        <MovilParte />
      </div>
    </section>
  );
}

/* La objeción «si hacéis de todo, lo haréis todo regular», respondida. */
const COMPARA: [string, string][] = [
  ["Cada una mira solo su trozo: clics, posiciones, seguidores.", "Miramos lo que te importa: clientes y ventas."],
  ["La de anuncios no puede tocar tu web, aunque vea que falla.", "Quien lleva tus anuncios arregla tu web el mismo día."],
  ["Si algo va mal, cada una culpa a la otra.", "Un solo responsable. Sin excusas ni ping-pong."],
  ["Cinco informes distintos que no cuadran entre sí.", "Un panel con todo, en tiempo real y que cuadra."],
  ["Semanas esperando a que alguien tenga hueco.", "Respuesta el mismo día. Lo de cada día, en 48 horas."],
];

export function SeccionEspecialistas() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <p className="inline-block rounded-full bg-noche px-4 py-1.5 text-sm font-bold text-estrella">La pregunta que todos nos hacen</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">
          «Si hacéis de todo, lo haréis todo regular.» <span className="text-noche-3">Es justo al revés.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-xl text-gris">
          Hacemos todo porque sabemos hacerlo todo bien. Y lo hacemos mejor precisamente porque lo hacemos todo: una campaña solo funciona si la web convence, la web solo vende si se mide, y lo que se mide solo sirve si alguien lo arregla al momento.
        </p>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-linea">
          <div className="grid grid-cols-2 bg-niebla text-sm font-extrabold sm:text-base">
            <p className="p-4 sm:p-6">Cinco agencias especializadas</p>
            <p className="bg-noche p-4 text-estrella sm:p-6">Casiopea 360</p>
          </div>
          {COMPARA.map(([ellos, nosotros]) => (
            <div key={ellos} className="grid grid-cols-2 border-t border-linea text-[0.95rem] sm:text-lg">
              <p className="flex gap-3 p-4 text-gris sm:p-6"><span aria-hidden="true" className="mt-1 text-rose-500">✕</span>{ellos}</p>
              <p className="flex gap-3 bg-noche/[0.03] p-4 font-bold sm:p-6"><span aria-hidden="true" className="mt-1 text-emerald-600">✓</span>{nosotros}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-3xl font-extrabold sm:text-5xl">No somos generalistas. Somos especialistas en todo, en la misma mesa.</p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["No nos creas: entra y compruébalo", "Webs con calculadoras y asistentes de IA, una app en las tiendas. Funcionando hoy, con empresas reales.", "/trabajos", "Ver los trabajos"],
            ["Míralo tú, cada día", "En tu panel ves qué hemos hecho, qué funciona y de dónde viene cada cliente. Sin cajas negras.", "/panel", "Ver un panel de ejemplo"],
            ["Compáranos con lo que tienes", "El estudio gratuito pone lado a lado lo que tienes hoy y lo que haríamos, con datos de tu empresa.", "/estudio-gratuito", "Pedir el estudio"],
          ].map(([t, d, href, cta]) => (
            <Link key={t} href={href} className="group flex flex-col rounded-[2rem] bg-noche p-7 text-white transition-transform hover:-translate-y-1">
              <p className="text-2xl font-extrabold">{t}</p>
              <p className="mt-3 flex-1 text-white/75">{d}</p>
              <p className="mt-6 font-bold text-estrella group-hover:underline">{cta} →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* «Si se te ocurre, lo hacemos»: lo que va más allá de los cinco frentes, con nuestro consejo por delante. */
const ICONO_SVG: Record<string, React.ReactNode> = {
  crm: <path d="M4 5h16v14H4zM8 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0M6.5 16c.5-2 2-3 3.5-3s3 1 3.5 3M15 9h3M15 12h3" />,
  radio: <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />,
  prensa: <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 12h7M7 15h4" />,
};

const LO_QUE_SEA: { t: string; d: string; nota: string; logo?: string; icono?: string }[] = [
  { t: "Tu propia app", d: "Para iPhone y Android, publicada en las dos tiendas, como hicimos con Mi Estela.", nota: "Te diremos con sinceridad si la necesitas o si con la web basta.", logo: "App Store" },
  { icono: "crm", t: "Un CRM", d: "Tu agenda de clientes, pero lista: cada contacto entra solo con de dónde vino, qué pidió, qué presupuesto le enviaste y si firmó. Así sabemos qué te trae clientes de verdad.", nota: "Te conectamos el que ya uses, que es lo que recomendamos, o te creamos uno a medida." },
  { icono: "radio", t: "Campañas de radio", d: "Guion, voces profesionales, emisoras y seguimiento. Empuja todo lo demás.", nota: "Lo recomendamos en muchos casos." },
  { icono: "prensa", t: "Prensa escrita", d: "Diseño del anuncio y trato con periódicos y revistas.", nota: "No solemos aconsejarla, pero si la quieres, te la hacemos." },
  { t: "Vídeo profesional", d: "Guion y montaje nuestros; la grabación, con la productora con la que trabajamos.", nota: "La productora la pagas tú directamente.", logo: "YouTube" },
  { t: "Tu plan de marketing", d: "Cuánto invertir, dónde y cuándo, mes a mes y para todo el año, para sacar el máximo a cada euro.", nota: "Te decimos también en qué no gastar.", logo: "Google Analytics" },
];

export function SeccionLoQueSea() {
  return (
    <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 opacity-25">
        <VideoFondo nombre="constelaciones-azules" alt="" />
      </div>
      <div className={`${ENVOLTORIO} relative`}>
        <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Si se te ocurre, lo hacemos</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">Prácticamente cualquier cosa. Y te decimos si te conviene.</h2>
        <p className="mt-6 max-w-3xl text-xl text-white/80">
          Una app, un CRM, una campaña de radio, un vídeo profesional. Lo hacemos nosotros, y lo poco que no hacemos en casa lo hacemos con las productoras y agencias con las que ya trabajamos. Tú no tienes que buscar a nadie.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LO_QUE_SEA.map((x) => (
            <div key={x.t} className="flex flex-col rounded-[1.8rem] border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                {x.logo ? (
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white"><LogoMarca nombre={x.logo} tam={24} /></span>
                ) : (
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-xl bg-estrella text-tinta">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[x.icono ?? "crm"]}</svg>
                  </span>
                )}
                <p className="text-2xl font-extrabold">{x.t}</p>
              </div>
              <p className="mt-4 flex-1 text-white/80">{x.d}</p>
              <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-sm font-bold text-estrella">{x.nota}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-lg text-white/85">
          <b className="text-white">Nuestro consejo va por delante:</b> te recomendamos lo que te interesa y te desaconsejamos lo que no, aunque podamos hacerlo. Preferimos lo digital porque se mide al euro.
        </p>
      </div>
    </section>
  );
}

/* Valor añadido: CRM a medida incluido. */
export function SeccionCRM() {
  const columnas: [string, string[]][] = [
    ["Nuevo", ["Aerotermia · Google Ads", "Reforma · Instagram"]],
    ["Presupuesto", ["Mantenimiento · ChatGPT"]],
    ["Cliente", ["Suelo radiante · Seguimiento", "Caldera · Mapa de Google"]],
  ];
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className={`${ENVOLTORIO} grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]`}>
        <div>
          <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Valor añadido · incluido en tu cuota</p>
          <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Tu propio CRM, hecho a medida.</h2>
          <p className="mt-5 text-lg text-gris">Tu agenda de clientes, pero lista: sabe de dónde viene cada uno, en qué punto está y a quién toca llamar hoy. Sin licencias que pagar por usuario.</p>
          <ul className="mt-7 space-y-3 text-[1.05rem]">
            {[
              "Cada contacto entra solo: formulario, chat, WhatsApp, llamadas y calculadoras, con la página y el anuncio de donde vino.",
              "Lo mueves de fase con un toque, del primer contacto a cliente firmado.",
              "Seguimientos que te avisan o salen solos. Nada de boletines masivos: el mensaje justo a la persona justa.",
              "Ves qué canal trae clientes que firman, no solo clics.",
              "En el móvil, para ti y tu equipo. Tus datos, a tu nombre.",
              "¿Ya tienes uno? Lo conectamos al tuyo: HubSpot, Zoho, Pipedrive o el que uses.",
            ].map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-noche text-xs text-estrella">✓</span>{t}</li>
            ))}
          </ul>
          <Link href="/panel#crm" className={`${BOTON} mt-8 inline-flex`}>Ver un CRM de ejemplo</Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.6rem] bg-estrella/20 blur-2xl" aria-hidden="true" />
          <div className="relative rounded-[2rem] bg-noche p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between text-white">
              <p className="font-extrabold">Tus contactos</p>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />Entrando solos</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {columnas.map(([t, items]) => (
                <div key={t} className="rounded-2xl bg-white/[0.07] p-3">
                  <p className="text-xs font-extrabold text-white/80">{t}</p>
                  <ul className="mt-2 space-y-2">
                    {items.map((x, i) => (
                      <li key={x} className="flota rounded-xl bg-white p-2.5 text-[0.7rem] font-bold leading-tight text-tinta shadow sm:text-xs" style={{ animationDelay: `${i * 0.6}s` }}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-estrella p-3 text-sm font-bold text-tinta">
              <LogoMarca nombre="WhatsApp" tam={22} />
              Hoy: escribir a J. R., presupuesto de hace 3 días
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Fuera de internet: radio (la recomendamos) y prensa escrita (si el cliente la quiere). */
export function SeccionFueraInternet() {
  return (
    <section className="bg-niebla py-20 sm:py-24">
      <div className={ENVOLTORIO}>
        <p className="inline-block rounded-full bg-noche px-4 py-1.5 text-sm font-bold text-estrella">360 de verdad</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl">Y si hace falta, también fuera de internet.</h2>
        <p className="mt-5 max-w-3xl text-lg text-gris">
          Preferimos lo digital porque se mide al euro. Pero si a tu negocio le conviene la radio, o quieres un anuncio en el periódico, también te lo llevamos. Sin buscar a nadie más.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-noche p-7 text-white sm:p-9">
            <span className="inline-block rounded-full bg-estrella px-3 py-1 text-xs font-extrabold text-tinta">Lo recomendamos</span>
            <p className="mt-4 text-3xl font-extrabold">Campañas de radio</p>
            <p className="mt-3 text-white/80">La radio empuja todo lo demás: después de oír tu anuncio, mucha gente te busca en Google. Bien hecha, hace que tus campañas de internet rindan más.</p>
            <ul className="mt-5 space-y-2 text-white/90">
              {["Idea y guion del anuncio", "Grabación con voces profesionales y música", "Elección de emisoras, franjas y fechas", "Trato y negociación con las emisoras o la central de medios", "Medimos el efecto: cuánto suben las búsquedas de tu marca"].map((t) => (
                <li key={t} className="flex gap-2"><span aria-hidden="true" className="text-estrella">✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-linea bg-white p-7 sm:p-9">
            <span className="inline-block rounded-full bg-niebla px-3 py-1 text-xs font-extrabold text-gris">Si tú lo quieres</span>
            <p className="mt-4 text-3xl font-extrabold">Prensa escrita</p>
            <p className="mt-3 text-gris">No solemos aconsejarla: es cara y no se puede medir bien. Pero si te interesa, por ejemplo en un periódico local o una revista de tu sector, te lo resolvemos.</p>
            <ul className="mt-5 space-y-2">
              {["Redacción y diseño del anuncio", "Contacto con periódicos y revistas", "Comparativa de precios y formatos", "Nada se contrata sin tu visto bueno"].map((t) => (
                <li key={t} className="flex gap-2"><span aria-hidden="true" className="text-emerald-600">✓</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 rounded-2xl bg-white p-5 text-[0.95rem]">
          <b>Cómo se paga:</b> la idea, el guion, el diseño y toda la gestión van incluidos en tu cuota. El espacio en la emisora o en el periódico lo pagas tú directamente al medio, igual que pagas a Google o a Meta tus anuncios. Sin comisiones nuestras.
        </p>
      </div>
    </section>
  );
}

/* Método y plazos. */
export function SeccionMetodo() {
  return (
    <section id="metodo" className={`${ENVOLTORIO} scroll-mt-24 py-20 sm:py-28`}>
      <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Cómo trabajamos, paso a paso.</h2>
      <p className="mt-5 max-w-2xl text-lg text-gris">Casi todo por internet y por escrito. Sin reuniones que no hagan falta y dándote el menor trabajo posible.</p>
      <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {PASOS.map((p, i) => (
          <li key={p.titulo} className="border-t-2 border-noche pt-5">
            <p className="font-titular text-6xl font-extrabold text-estrella">{i + 1}</p>
            <h3 className="mt-2 text-xl font-extrabold">{p.titulo}</h3>
            <p className="mt-2 text-gris">{p.texto}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="overflow-hidden rounded-[2rem]">
          <div className="aspect-[16/10]"><VideoFondo nombre="mano-pantalla" alt="Una mano toca una pantalla luminosa" /></div>
        </div>
        <div>
          <h3 className="text-2xl font-extrabold sm:text-3xl">Lo de cada día, en 48 horas. Lo grande, con fecha.</h3>
          <table className="mt-4 w-full text-left">
            <tbody>
              {PLAZOS.map((p) => (
                <tr key={p.que} className="border-b border-linea">
                  <td className="py-3 pr-4">{p.que}</td>
                  <td className="py-3 text-right font-bold">{p.cuando}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gris">
            Lo que tarda Google en notarlo no depende de nosotros, y te lo decimos claro desde el principio. Y nada de «eso son 100 € más» por cada cambio.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Garantías. */
export function SeccionGarantias() {
  return (
    <section className="bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Tu web es tuya. Y te quedas porque quieres.</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {GARANTIAS.map((g, i) => (
            <div key={g.titulo} className={`rounded-[2rem] p-7 sm:p-9 ${i === 3 ? "bg-estrella" : "bg-white"}`}>
              <h3 className="text-2xl font-extrabold">{g.titulo}</h3>
              <p className={`mt-3 ${i === 3 ? "text-noche/80" : "text-gris"}`}>{g.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Preguntas frecuentes. */
export function SeccionPreguntas({ titulo = true }: { titulo?: boolean }) {
  return (
    <section id="preguntas" className={`${ENVOLTORIO} scroll-mt-24 py-20 sm:py-28`}>
      {titulo && <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Lo que nos suelen preguntar.</h2>}
      <div className={`${titulo ? "mt-10" : ""} divide-y divide-linea border-y border-linea`}>
        {PREGUNTAS.map((q) => (
          <details key={q.p} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-bold">
              {q.p}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-niebla text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-gris">{q.r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* Qué incluye el estudio gratuito. */
export function SeccionEstudio() {
  return (
    <section className={`${ENVOLTORIO} py-20 sm:py-28`}>
      <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Tu estudio gratuito, a medida.</h2>
      <p className="mt-5 max-w-2xl text-lg text-gris">Lo preparamos a mano, para tu empresa, con datos reales y fechados. Esto es lo que incluye.</p>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ESTUDIO.map((e, i) => (
          <li key={e.titulo} className={`rounded-3xl p-6 ${i === ESTUDIO.length - 1 ? "bg-noche text-white" : "border border-linea"}`}>
            <Punto />
            <h3 className="mt-4 text-xl font-extrabold">{e.titulo}</h3>
            <p className={`mt-2 ${i === ESTUDIO.length - 1 ? "text-white/80" : "text-gris"}`}>{e.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* Solicitud con test de idoneidad. */
export function SeccionSolicitud() {
  return (
    <section id="solicitud" className="scroll-mt-24 bg-noche py-20 text-white sm:py-28">
      <div className={`${ENVOLTORIO} grid gap-12 lg:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <h2 className="text-4xl font-extrabold sm:text-5xl">Solicita tu estudio gratuito.</h2>
          <p className="mt-5 text-lg text-white/80">
            Prepararlo es mucho trabajo, así que no lo hacemos a todo el mundo: solo a empresas a las que creemos que podemos ayudar de verdad y con las que podríamos acabar trabajando juntos.
          </p>
          <p className="mt-4 text-lg text-white/80">
            Cuéntanos un poco de tu empresa. Analizamos cada caso con calma y te escribimos siempre: si vemos que podemos ayudarte, para preparar tu estudio; y si creemos que no somos lo que necesitas, también, y te explicamos por qué.
          </p>
          <div className="mt-8 hidden overflow-hidden rounded-[2rem] lg:block">
            <div className="aspect-[16/10]"><VideoFondo nombre="mujer-cielo" alt="Una persona mira al cielo de noche" /></div>
          </div>
        </div>
        <Diagnostico />
      </div>
    </section>
  );
}

/* Llamada final a la acción, para el pie de las páginas interiores. */
export function LlamadaFinal() {
  return (
    <section className={`${ENVOLTORIO} py-20`}>
      <div className="relative overflow-hidden rounded-[2rem] bg-noche p-8 text-white sm:p-14">
        <div aria-hidden="true" className="absolute inset-0 opacity-50"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-5xl">¿Empezamos por un estudio gratuito?</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">Te contamos cómo está hoy tu marketing y qué haríamos. Sin compromiso.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/estudio-gratuito" className={BOTON}>Solicitar estudio</Link>
            <Link href="/test" className={BOTON_CLARO}>Hacer el test</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
