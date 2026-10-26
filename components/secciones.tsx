import { servicioDeFrente } from "@/lib/servicios";
import { casoDe } from "@/lib/casos";
import Image from "next/image";
import Link from "next/link";
import { COMPROMISOS } from "@/lib/control";
import VideoFondo from "@/components/VideoFondo";
import Cifra from "@/components/Cifra";
import ChipVideo from "@/components/ChipVideo";
import Subrayado from "@/components/Subrayado";
import LogoMarca from "@/components/LogoMarca";
import AlEntrar from "@/components/AlEntrar";
import Constelacion from "@/components/Constelacion";
import AntesDespues from "@/components/AntesDespues";
import TrasCarga from "@/components/TrasCarga";
import Comisiones from "@/components/Comisiones";
import { glosar } from "@/lib/glosario";
import CostesDiferido from "@/components/CostesDiferido";
import MovilParte from "@/components/MovilParte";
import DiagnosticoDiferido from "@/components/DiagnosticoDiferido";
import RelojMundoDiferido from "@/components/RelojMundoDiferido";
import {
  DOLORES,
  ESTUDIO_BLOQUES,
  ESTUDIO_TOTAL,
  EMPEZAMOS,
  FRENTES,
  GARANTIAS,
  INFORMES,
  OFICIOS,
  PASOS,
  PLAZOS,
  PREGUNTAS,
  TRABAJOS,
  TAMBIEN_INCLUIDO,
  PROMESAS,
  POR_QUE_BARATO,
  COMO_ES_POSIBLE,
  OPINIONES,
} from "@/lib/contenido";

export const ENVOLTORIO = "mx-auto w-full max-w-6xl px-4 sm:px-6";
export const BOTON =
  "boton-brillo inline-flex items-center justify-center rounded-full bg-estrella px-7 py-3.5 text-base font-bold text-tinta transition-colors hover:bg-estrella-2";
export const BOTON_CLARO =
  "inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur hover:border-white hover:bg-white/20";

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
            <TrasCarga hueco={<span className="inline-block h-6 w-6" />}><LogoMarca nombre={h} tam={24} /></TrasCarga>
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
          <div className="absolute inset-0 opacity-90">
            <VideoFondo nombre="fibra-luz" alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-noche/90 via-noche/60 to-noche/10" />
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
    <section id="dolores" className="scroll-mt-24 bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">¿Te suena alguno?</h2>
        <p className="mt-5 max-w-2xl text-lg text-gris">Lo que nos cuentan directores y dueños de empresa, y lo que hacemos con ello.</p>
        <ul className="carrusel mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-10"><Comisiones /></div>
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
        <div className="relative hidden h-full sm:block"><VideoFondo nombre="movil-sonrisa" alt="Una mujer sonríe mirando su móvil en la ciudad" /></div>
        <div className="relative hidden h-full sm:block"><VideoFondo nombre="graba-movil" alt="Una mujer graba un vídeo con el móvil en una cafetería" /></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/35 to-transparent" />
      <div className={`${ENVOLTORIO} relative flex h-full items-end pb-14`}>
        <div className="max-w-3xl">
          <p className="font-titular text-4xl font-extrabold text-white sm:text-6xl">Nuestro objetivo: que no des abasto.</p>
          <p className="mt-4 text-lg text-white/85 sm:text-xl">Y si un día te llega más trabajo del que puedes atender, bajamos la publicidad en ese momento. Nos ha pasado, y es el mejor problema que se puede tener.</p>
        </div>
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
        <div className={`carrusel ${completa ? "" : "mt-12"} grid gap-5 lg:grid-cols-6`}>
          {FRENTES.map((f, i) => {
            const ancho = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            const oscura = i === 0 || i === 4;
            return (
              <article
                key={f.id}
                id={f.id}
                className={`inclina scroll-mt-28 rounded-[2rem] p-7 sm:p-9 ${ancho} ${oscura ? "bg-noche text-white" : "border border-linea bg-white"}`}
              >
                <p className={`font-titular text-sm font-bold ${oscura ? "text-estrella" : "text-noche-3"}`}>Frente {i + 1} de 5</p>
                <h2 className="mt-2 text-3xl font-extrabold">{f.nombre}</h2>
                <p className={`mt-3 text-lg ${oscura ? "text-white/80" : "text-gris"}`}>{glosar(f.frase)}</p>
                <ul className="mt-6 space-y-2.5">
                  {f.servicios.map((s) => (
                    <li key={s} className="flex gap-3">
                      {oscura ? <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-estrella" /> : <Visto />}
                      <span className={oscura ? "text-white/90" : ""}>{glosar(s)}</span>
                    </li>
                  ))}
                </ul>
                {servicioDeFrente(f.id) && (
                  <Link href={`/servicios/${servicioDeFrente(f.id)!.slug}`} className={`mt-6 inline-flex items-center gap-2 font-bold ${oscura ? "bg-noche text-estrella" : "text-noche-3"}`}>
                    Más sobre {f.nombre} <span aria-hidden="true">→</span>
                  </Link>
                )}
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
      <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Un especialista para cada oficio. Coordinados en un solo equipo.</h2>
      <p className="mt-5 max-w-2xl text-lg text-gris">Todo esto hace falta para que una web traiga clientes. Con nosotros viene junto, y lo vemos todo a la vez.</p>
      <ul className="mt-10 flex flex-wrap gap-2.5">
        {OFICIOS.map((o) => (
          <li key={o} className="flex items-center gap-2 rounded-full border border-linea bg-white px-3 py-1.5 text-sm font-bold sm:px-4 sm:py-2 sm:text-[0.95rem]">
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
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-4xl font-extrabold text-estrella"><Cifra valor={22} despues="+" /></p><p className="text-sm text-white/75">años de experiencia</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-4xl font-extrabold text-estrella"><Cifra valor={60000} despues=" €" /></p><p className="text-sm text-white/75">al mes en Google Ads para una sola empresa</p></div>
            </div>
            <Link href="/quienes-somos" className="mt-6 inline-flex font-bold text-estrella hover:underline">Conoce quiénes somos →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Antes y después: la misma web, con un tirador para descubrir la nueva. */
export function SeccionAntesDespues({ compacta = false }: { compacta?: boolean }) {
  return (
    <section id="antes-despues" className="scroll-mt-24 bg-niebla py-20 sm:py-24">
      <div className={ENVOLTORIO}>
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Antes y después</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Mueve el tirador. <Subrayado>Mira la diferencia</Subrayado>.</h2>
          </div>
          {!compacta && <p className="text-lg text-gris">Reformadísimo, nuestra propia empresa de reformas: la web que tenía y la que tiene ahora, con calculadoras de precio y una asistente que atiende por voz.</p>}
        </div>
        <div className="mt-10">
          <AntesDespues nombre="Reformadísimo" antes="/antes-despues/reformadisimo-antes.webp" despues="/antes-despues/reformadisimo-despues.webp" />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gris">Capturas reales de la portada de cada web, vistas en ordenador.</p>
          <Link href="/trabajos/reformadisimo" className="inline-flex items-center gap-2 font-bold text-noche-3">Ver el caso completo <span aria-hidden="true">→</span></Link>
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
          <p className="mt-5 max-w-2xl text-lg text-gris">Webs, apps y asistentes que ya traen clientes, a nuestra propia empresa y a quienes confían en nosotros. Y muchos más que no podemos enseñar: hay clientes que prefieren discreción.</p>
        </>
      )}
      <div className={`carrusel ${titulo ? "mt-12" : ""} grid gap-6 md:grid-cols-2`}>
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
            {titulo ? <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t.nombre}</h3> : <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t.nombre}</h2>}
            <p className={`mt-4 flex-1 text-lg ${i % 3 === 0 ? "text-white/80" : "text-gris"}`}>{t.resumen}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {casoDe(t.nombre) && (
                <Link
                  href={`/trabajos/${casoDe(t.nombre)!.slug}`}
                  className={`inline-flex w-fit items-center rounded-full px-5 py-2.5 font-bold ${i % 3 === 0 ? "bg-estrella text-tinta hover:bg-estrella-2" : "bg-noche text-white hover:bg-noche-2"}`}
                >
                  Ver el caso
                </Link>
              )}
              <a
                href={t.url}
                target="_blank"
                rel="noopener"
                className={`inline-flex w-fit items-center rounded-full border-2 px-5 py-2.5 font-bold ${
                  i % 3 === 0 ? "border-white text-white hover:bg-white hover:text-noche" : "border-noche text-noche hover:bg-noche hover:text-white"
                }`}
              >
                {t.enlaceTexto}
              </a>
            </div>
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
      <div className="absolute inset-0">
        <VideoFondo nombre="equipo-riendo" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-noche/90 via-noche/70 to-noche/40 lg:bg-gradient-to-r lg:from-noche lg:via-noche/80 lg:to-noche/20" />
      <div className={`${ENVOLTORIO} relative grid items-center gap-14 lg:grid-cols-[1fr_auto]`}>
        <div>
          <h2 className="max-w-2xl text-4xl font-extrabold sm:text-6xl">Cada día sabes qué hemos hecho por tu negocio.</h2>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Sin entrar en ninguna herramienta ni entender de números. Te llega un mensaje corto por WhatsApp, por correo o por Slack, como prefieras.
          </p>
          <div className="carrusel mt-10 grid gap-4 sm:grid-cols-3">
            {INFORMES.map((i, k) => (
              <div key={i.cuando} className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <Loseta icono={["calendario", "lista", "estrella"][k % 3]} i={k} className="mb-4" />
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
        <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">La pregunta que todos nos hacen</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">
          «Si hacéis de todo, lo haréis todo regular.» <span className="text-noche-3">Es justo al revés.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-xl text-gris">
          Hacemos todo porque sabemos hacerlo todo bien. Y lo hacemos mejor precisamente porque lo hacemos todo: una campaña solo funciona si la web convence, la web solo vende si se mide, y lo que se mide solo sirve si alguien lo arregla al momento.
        </p>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-linea">
          <div className="grid grid-cols-2 bg-niebla text-sm font-extrabold sm:text-base">
            <p className="p-4 sm:p-6">Un proveedor para cada cosa</p>
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

        <div className="carrusel mt-12 grid gap-5 md:grid-cols-3">
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
export const ICONO_SVG: Record<string, React.ReactNode> = {
  crm: <path d="M4 5h16v14H4zM8 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0M6.5 16c.5-2 2-3 3.5-3s3 1 3.5 3M15 9h3M15 12h3" />,
  radio: <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />,
  prensa: <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 12h7M7 15h4" />,
  calendario: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" />,
  estrella: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" />,
  pagina: <path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 15h7M9 18h4" />,
  chat: <path d="M4 5h16v11H9l-5 4zM8 10h.01M12 10h.01M16 10h.01" />,
  firma: <path d="M3 17c3-1 4-6 6-6s1 5 3 5 3-3 4-3 1 2 2 2M3 21h18M15 4l4 4-6 6h-4v-4z" />,
  sonrisa: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 14c1 1.5 2.3 2 4 2s3-.5 4-2M9 9.5h.01M15 9.5h.01" />,
  regalo: <path d="M4 10h16v4H4zM6 14h12v7H6zM12 10v11M12 10c-2 0-4-1-4-3s3-2 4 3c1-5 4-5 4-3s-2 3-4 3" />,
  idiomas: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9" />,
  carrito: <path d="M3 4h2l2.5 11h11L21 7H6.5M9 20h.01M17 20h.01" />,
  tienda: <path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9c0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0M10 20v-5h4v5" />,
  llave: <path d="M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4M12 15v2" />,
  engranaje: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  telefono: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2zM15 3a6 6 0 0 1 6 6M15 7a2 2 0 0 1 2 2" />,
  lupa: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5M8 11h6M11 8v6" />,
  accesible: <path d="M12 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8l7 1.5L19 8M12 9.5V14l-3 7M12 14l3 7" />,
  euro: <path d="M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9" />,
  birrete: <path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" />,
  video: <path d="M3 6h12v12H3zM15 10l6-3v10l-6-3" />,
  escudo: <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6zM9 12l2 2 4-4" />,
  pincel: <path d="M18 3l3 3-9 9-3-3zM9 12c-2 0-4 1.5-4 4 0 1.5-1 2.5-2 3 4 1 8 0 8-4" />,
  edificio: <path d="M4 21V5l8-2v18M12 21V9l8 2v10M4 21h16M7 8h2M7 12h2M7 16h2M15 14h2M15 17h2" />,
  herramienta: <path d="M14.5 6.5a4 4 0 0 0 5 5L9 22l-3-3zM14.5 6.5L18 3l3 3-3.5 3.5M9 22l-3-3" />,
  chip: <path d="M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" />,
  cohete: <path d="M12 2c3 2 5 6 5 11l-5 4-5-4c0-5 2-9 5-11zM12 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7 13l-3 3h4M17 13l3 3h-4M10 17l-1 4 3-2 3 2-1-4" />,
  lista: <path d="M4 5h16v16H4zM8 3v4M16 3v4M8 12l2 2 4-4M8 17h8" />,
  reloj: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" />,
};

/* Loseta de color, ligeramente girada, con su icono y una estrella: la pieza que da vida a cualquier tarjeta. */
export function Loseta({ icono, i = 0, tam = "md", className = "" }: { icono: string; i?: number; tam?: "md" | "lg"; className?: string }) {
  const [fondo, sombra] = COLOR_SELLO[i % COLOR_SELLO.length];
  const caja = tam === "lg" ? "h-[4.5rem] w-[4.5rem] rounded-[1.4rem]" : "h-14 w-14 rounded-2xl";
  const ic = tam === "lg" ? "h-9 w-9" : "h-7 w-7";
  return (
    <span
      aria-hidden="true"
      className={`loseta relative grid shrink-0 place-items-center text-white shadow-[0_14px_28px_-12px_var(--sombra)] transition-transform duration-300 ${caja} ${i % 2 ? "rotate-6" : "-rotate-6"} ${className}`}
      style={{ background: fondo, ["--sombra" as string]: sombra }}
    >
      <span className="absolute inset-[3px] rounded-[inherit] bg-gradient-to-b from-white/25 to-transparent" />
      <svg viewBox="0 0 24 24" className={`relative drop-shadow ${ic}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[icono]}</svg>
      <span className="brilla absolute -right-2 -top-2" style={{ animationDelay: `${i * 0.4}s` }}><Estrellita /></span>
    </span>
  );
}

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
    <section id="lo-que-sea" className="scroll-mt-24 relative overflow-hidden bg-noche py-20 text-white sm:py-28">
      <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60">
        <VideoFondo nombre="constelaciones-azules" alt="" />
      </div>
      <div className={`${ENVOLTORIO} relative`}>
        <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Si se te ocurre, lo hacemos</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">Prácticamente cualquier cosa. Y te decimos si te conviene.</h2>
        <p className="mt-6 max-w-3xl text-xl text-white/80">
          Una app, un CRM, una campaña de radio, un vídeo profesional. Lo hacemos nosotros, y lo poco que no hacemos en casa lo hacemos con las productoras y agencias con las que ya trabajamos. Tú no tienes que buscar a nadie.
        </p>
        <div className="carrusel mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="mt-4 flex-1 text-white/80">{glosar(x.d)}</p>
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

/* Más servicios que entran en la cuota: la visión 360 completa. */
export function SeccionTambienIncluido() {
  const colores = ["#1f6feb", "#e8457a", "#0f9d58", "#f59e0b", "#7c3aed", "#0ea5a4"];
  const tarjeta = (x: (typeof TAMBIEN_INCLUIDO)[number], i: number) => {
    const c = colores[i % colores.length];
    return (
      <li key={x.t} className="group relative flex gap-4 overflow-hidden rounded-[1.6rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(14,26,61,0.35)] ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-[0_22px_40px_-20px_rgba(14,26,61,0.45)]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
        <span aria-hidden="true" className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-md transition-transform group-hover:rotate-[-6deg] group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${c}, ${c}bb)` }}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[x.icono]}</svg>
          {x.logo && (
            <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-white shadow ring-2 ring-white"><LogoMarca nombre={x.logo} tam={16} /></span>
          )}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">✓ Incluido</p>
          <p className="mt-0.5 text-lg font-extrabold">{x.t}</p>
          <p className="mt-1.5 text-[0.97rem] text-gris">{glosar(x.d)}</p>
        </div>
      </li>
    );
  };
  const mitad = Math.ceil(TAMBIEN_INCLUIDO.length / 2 / 3) * 3;
  return (
    <section id="incluido" className="scroll-mt-24 overflow-hidden bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">Y también entra en tu cuota</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Lo que otras agencias te cobran aparte, aquí va dentro.</h2>
            <p className="mt-5 text-lg text-gris">
              No es una lista para rellenar. Es lo que de verdad hace crecer a una empresa, y te montamos lo que tenga sentido para la tuya, cuando lo necesites.
            </p>
            <div className="mt-7 inline-flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-linea">
              <span className="font-titular text-5xl font-extrabold text-emerald-600">{TAMBIEN_INCLUIDO.length}</span>
              <span className="text-[0.95rem] font-bold leading-snug">servicios más,<br />sin pagar un euro más</span>
            </div>
          </div>
          <div aria-hidden="true" className="grid h-[300px] grid-cols-5 grid-rows-2 gap-3 sm:h-[360px]">
            <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[1.6rem] shadow-lg"><VideoFondo nombre="movil-personas" alt="" /></div>
            <div className="relative col-span-2 overflow-hidden rounded-[1.6rem] shadow-lg"><VideoFondo nombre="neon-sonrisa" alt="" /></div>
            <div className="relative col-span-2 overflow-hidden rounded-[1.6rem] shadow-lg"><VideoFondo nombre="equipo-celebra" alt="" /></div>
          </div>
        </div>
        <ul className="carrusel mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TAMBIEN_INCLUIDO.slice(0, mitad).map((x, i) => tarjeta(x, i))}
          <li className="relative overflow-hidden rounded-[1.8rem] bg-noche text-white sm:col-span-2 lg:col-span-3">
            <div aria-hidden="true" className="absolute inset-0"><VideoFondo nombre="holograma-redes" alt="" /></div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-noche via-noche/70 to-transparent" />
            <div className="relative flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <p className="max-w-xl text-2xl font-extrabold sm:text-3xl">Una sola cuota. Todo esto dentro. Y te lo gestionamos nosotros.</p>
              <a href="/estudio-gratuito" className="shrink-0 rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">Pide tu estudio gratuito</a>
            </div>
          </li>
          {TAMBIEN_INCLUIDO.slice(mitad).map((x, i) => tarjeta(x, i + mitad))}
          {(TAMBIEN_INCLUIDO.length - mitad) % 3 !== 0 && (
            <li className={`flex flex-col justify-center rounded-[1.6rem] border-2 border-dashed border-noche/25 p-6 text-center ${(TAMBIEN_INCLUIDO.length - mitad) % 3 === 1 ? "lg:col-span-2" : ""} ${(TAMBIEN_INCLUIDO.length - mitad) % 2 === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <p className="text-lg font-extrabold">¿Se te ocurre otra cosa?</p>
              <p className="mt-1 text-gris">Pídelo. Si te conviene, lo hacemos.</p>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

/* Las cuatro promesas: mejor, en días, a precio fijo y sin perseguirnos. */
/* «¿Cómo es posible?»: lo que dicen los clientes cuando lo ven funcionando. */
const COSTE_OCULTO: [string, string, string][] = [
  ["Reuniones", "Una por proveedor, y otra para que se pongan de acuerdo.", "Una sola conversación, con quien lo hace."],
  ["Coordinación", "Eres tú quien pasa el mensaje de uno a otro.", "Todo está conectado. No pasas nada de uno a otro."],
  ["Tu tiempo", "Semanas de tu agenda, lejos de tu negocio.", "Lo mínimo: casi todo se hace por correo."],
  ["Plazo", "Meses hasta que todo funciona a la vez.", "Días para tenerlo en marcha."],
  ["Dinero", "Un presupuesto por cada proveedor, más lo que se pierde en el camino.", "Una cuota fija, sin comisiones."],
];
/* Nuestra ventaja: el trabajo de un equipo grande, sin la estructura de uno. */
export function SeccionVentaja() {
  const T: [string, string, string][] = [
    ["Sin capas", "Quien te lo cuenta es quien lo hace. Nada se pierde entre comerciales, jefes de cuenta y subcontratas.", "chat"],
    ["Sin lastre", "Cambiamos en días. Las estructuras grandes tardan meses en adaptarse porque primero tienen que desmontar lo que ya tienen.", "cohete"],
    ["Todos los oficios, conectados", "Web, Google, anuncios, redes, CRM e IA trabajando juntos. En otros sitios, cada una de esas cosas es un departamento distinto.", "engranaje"],
    ["Pagas el trabajo, no la estructura", "Menos que con una agencia grande, porque no mantenemos jerarquías ni oficinas enormes. Pero no es low-cost: cuidamos cada cosa como si fuera nuestra.", "euro"],
  ];
  return (
    <section id="ventaja" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Nuestra ventaja</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">El trabajo de un equipo enorme. <Subrayado>Sin la estructura</Subrayado> de uno.</h2>
        <p className="mt-6 max-w-3xl text-lg text-gris">
          Una gran empresa de marketing necesita cien personas, reuniones entre departamentos y mucho tiempo para adaptarse a cada cambio. Aquí quien dirige la agencia está dentro del trabajo, la inteligencia artificial y la automatización se encargan de lo pesado, y cada oficio está conectado con los demás. El resultado es el de un equipo muy grande, hecho con más cuidado y a un precio razonable.
        </p>
        <ul className="carrusel mt-12 grid gap-5 sm:grid-cols-2">
          {T.map(([t, d, ic], i) => (
            <li key={t} className="rounded-[1.8rem] bg-niebla p-6 sm:p-7">
              <Loseta icono={ic} i={i} />
              <p className="mt-4 text-2xl font-extrabold">{t}</p>
              <p className="mt-2 text-gris">{d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-noche text-white">
          <div className="grid gap-px bg-white/10 sm:grid-cols-[0.8fr_1fr_1fr]">
            <span className="hidden bg-noche p-5 sm:block" />
            <span className="hidden bg-noche p-5 text-sm font-extrabold uppercase tracking-wide text-rose-300 sm:block">Hacerlo por tu cuenta</span>
            <span className="hidden bg-noche p-5 text-sm font-extrabold uppercase tracking-wide text-estrella sm:block">Con Casiopea 360</span>
            {COSTE_OCULTO.map(([q, a, b]) => (
              <div key={q} className="contents">
                <b className="bg-noche px-5 pt-5 sm:py-5">{q}</b>
                <span className="bg-noche px-5 pb-1 text-white/70 sm:py-5"><b className="block text-xs font-extrabold uppercase tracking-wide text-rose-300 sm:hidden">Por tu cuenta</b>{a}</span>
                <span className="bg-noche px-5 pb-5 pt-2 font-bold text-white sm:py-5"><b className="block text-xs font-extrabold uppercase tracking-wide text-estrella sm:hidden">Con Casiopea 360</b>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-lg text-gris">
          Lo que de verdad cuesta el marketing digital no es solo la factura: son las reuniones, las horas de coordinar a cada proveedor y el tiempo que no dedicas a tu negocio. Eso es lo que te quitamos. Lo vivimos cada día en nuestras propias empresas, y por eso lo decimos con tranquilidad.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link prefetch={false} href="/un-dia-de-trabajo" className={BOTON}>Ver un día de trabajo real</Link>
          <Link prefetch={false} href="/estudio-gratuito" className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-bold text-tinta underline decoration-estrella decoration-4 underline-offset-4">Pide tu estudio gratuito</Link>
        </div>
      </div>
    </section>
  );
}

export function SeccionComoEsPosible() {
  return (
    <section id="como-es-posible" className="relative scroll-mt-24 overflow-hidden bg-noche py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[70%]"><VideoFondo nombre="equipo-celebra" alt="" /></div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-noche/45 via-noche/85 via-40% to-noche" />
      <div className={`${ENVOLTORIO} relative`}>
        <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Lo que nos dicen todos</p>
        <h2 className="mt-6 font-titular text-5xl font-extrabold leading-[1.02] sm:text-7xl">
          «Pero… <span className="text-estrella">¿cómo es posible?</span>»
        </h2>
        <p className="mt-6 max-w-3xl text-xl text-white/85">
          Nuestros clientes no se lo creen hasta que lo ven. ¿Una web mejor, su CRM, landings sin límite y su asistente con IA, en días y por una cuota? <b className="text-white">Es posible. Lo hacemos cada día.</b> Con el trabajo de un equipo enorme y sin su estructura. <Link prefetch={false} href="/quienes-somos#ventaja" className="font-bold text-estrella underline underline-offset-4">Cómo lo hacemos</Link>.
        </p>
        <ul className="carrusel mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMO_ES_POSIBLE.map((x, i) => (
            <li key={x.tema} className="flex flex-col rounded-3xl bg-white p-6 text-tinta shadow-[0_24px_50px_-28px_rgba(0,0,0,0.8)]">
              <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: ["#1d4ed8", "#6d28d9", "#047857", "#be185d", "#b45309", "#0f766e"][i % 6] }}>{x.tema}</p>
              <p className="mt-3 flex items-start gap-3 text-gris">
                <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </span>
                <span><b className="text-tinta">Antes:</b> <span className="line-through decoration-rose-400/70">{x.antes}</span></span>
              </p>
              <p className="mt-3 flex items-start gap-3 text-[1.05rem] font-bold">
                <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </span>
                <span><span className="text-emerald-700">Ahora:</span> {x.ahora}</span>
              </p>
            </li>
          ))}
        </ul>
        {OPINIONES.length > 0 && (
          <div className="mt-14">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Lo que dicen nuestros clientes.</h3>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {OPINIONES.map((o) => (
                <li key={o.nombre + o.empresa}>
                  <figure className="h-full rounded-3xl bg-white/[0.08] p-7 ring-1 ring-white/15">
                    <span aria-hidden="true" className="font-titular text-6xl leading-none text-estrella">«</span>
                    <blockquote className="-mt-4 text-lg text-white/90">{o.texto}</blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      {o.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={o.logo} alt="" className="h-10 w-10 rounded-xl bg-white object-contain p-1" />
                      )}
                      <span>
                        <b className="block">{o.nombre}</b>
                        <span className="text-sm text-white/70">{[o.cargo, o.empresa].filter(Boolean).join(", ")}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/60">Opiniones reales de nuestros clientes, publicadas con su permiso.</p>
          </div>
        )}
        <div className="mt-14 grid items-center gap-6 rounded-[2rem] bg-estrella p-7 text-tinta sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-titular text-3xl font-extrabold sm:text-4xl">Deja de preguntártelo. Déjanos enseñártelo.</p>
            <p className="mt-3 text-lg">Te sorprenderán los resultados. Y si quieres saber cómo lo hacemos, <Link href="/servicios#barato" className="font-bold underline underline-offset-4">te lo contamos sin trampa</Link>.</p>
          </div>
          <Link href="/estudio-gratuito" className="inline-flex items-center justify-center rounded-full bg-noche px-7 py-3.5 font-bold text-white hover:bg-noche-2">Quiero verlo con mi empresa</Link>
        </div>
      </div>
    </section>
  );
}

export function SeccionPromesas() {
  return (
    <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-28">
      <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
      <div className={`${ENVOLTORIO} relative`}>
        <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Nuestras cuatro promesas</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">No solo lo hacemos todo. Mejor, en días y a precio fijo.</h2>
        <p className="mt-6 max-w-3xl text-xl text-white/80">Ya sabemos que suena demasiado bien. Por eso no te pedimos que nos creas: pide el estudio gratuito y compáralo con lo que tienes hoy.</p>
        <div className="carrusel mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROMESAS.map((x, i) => (
            <div key={x.t} className={`flex flex-col rounded-[2rem] p-7 sm:p-8 ${i === 2 ? "bg-estrella text-tinta" : "bg-white/[0.07] ring-1 ring-white/15 backdrop-blur-sm"}`}>
              <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-full text-lg font-extrabold ${i === 2 ? "bg-noche text-estrella" : "bg-estrella text-tinta"}`}>{i + 1}</span>
              <p className="mt-5 text-3xl font-extrabold xl:text-4xl">{x.t}</p>
              <p className={`mt-4 flex-1 text-lg ${i === 2 ? "text-tinta/85" : "text-white/85"}`}>{x.d}</p>
              <p className={`mt-5 border-t pt-4 text-[0.95rem] ${i === 2 ? "border-tinta/15 text-tinta/75" : "border-white/15 text-white/70"}`}>{x.pie}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Por qué podemos cobrar menos. */
export function SeccionPorQueBarato() {
  return (
    <section id="barato" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className={`${ENVOLTORIO} grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]`}>
        <div className="min-w-0">
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Sin trampa</p>
          <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">¿Cómo puede costar <Subrayado>menos</Subrayado>? Así de sencillo.</h2>
          <div className="carrusel mt-10 grid gap-4 sm:grid-cols-2">
            {POR_QUE_BARATO.map((x, i) => (
              <div key={x.t} className="group inclina relative rounded-[1.6rem] bg-white p-6 ring-1 ring-linea">
                {i > 0 && (
                  <span aria-hidden="true" className="absolute -left-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-noche font-titular text-xl font-extrabold text-estrella shadow-md ring-2 ring-white">+</span>
                )}
                <Loseta icono={["edificio", "herramienta", "chip", "cohete"][i]} i={i} />
                <p className="mt-4 text-xl font-extrabold">{x.t}</p>
                <p className="mt-2 text-gris">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-6 flex items-center gap-4 rounded-[1.6rem] bg-noche p-6 text-white sm:gap-5 sm:p-7">
            <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-estrella font-titular text-2xl font-extrabold text-tinta shadow-md">=</span>
            <div>
              <p className="font-titular text-2xl font-extrabold leading-tight sm:text-3xl">Menos de lo que te costaría por separado.</p>
              <p className="mt-1 text-white/75">Con todo dentro, a precio fijo y sin comisiones. <Link href="/servicios#costes" className="font-bold text-estrella hover:underline">Haz cuentas con lo tuyo →</Link></p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-lg">
            <b>Y porque nos gusta.</b> Disfrutamos haciendo crecer empresas, no a base de facturas, sino a base de resultados. Y estamos siempre estrenando la última tecnología.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2.4rem] bg-estrella/25 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"><VideoFondo nombre="mujer-celebra" alt="Una mujer celebra un buen resultado delante de su portátil" /><ChipVideo grande="−36 %" chico="AMS Cerramientos, en lo que paga cada mes" icono={ICONO_SVG.euro} /></div>
        </div>
      </div>
    </section>
  );
}

/* Lo que firmamos: seriedad de gran agencia, por escrito. */
const SELLOS: { t: string; d: string; icono: string }[] = [
  { icono: "firma", t: "Plazos por escrito", d: "Respuesta el mismo día, 48 horas para el día a día y fecha cerrada para lo grande. Por escrito desde el primer día." },
  { icono: "llave", t: "Tus cuentas, a tu nombre", d: "Dominio y cuentas de Google y de anuncios, desde el primer día. La web, tuya a los doce meses." },
  { icono: "euro", t: "Cero comisiones", d: "Inviertas lo que inviertas en anuncios, nunca nos llevamos un porcentaje." },
  { icono: "escudo", t: "Tus datos, protegidos", d: "Confidencialidad y protección de datos como manda la ley. Lo tuyo no sale de aquí." },
  { icono: "sonrisa", t: "Nada sin tu visto bueno", d: "Ni un anuncio, ni una respuesta a una reseña, ni un artículo sale sin que lo veas." },
  { icono: "calendario", t: "Salida fácil", d: "Doce meses de permanencia, y la web es tuya al cumplirlos. Si a los tres meses no has visto que mejoramos, te vas sin pagar nada." },
];

const COLOR_SELLO: [string, string][] = [
  ["linear-gradient(140deg,#3b82f6,#1d4ed8)", "rgba(29,78,216,0.7)"],
  ["linear-gradient(140deg,#a855f7,#6d28d9)", "rgba(109,40,217,0.7)"],
  ["linear-gradient(140deg,#22c55e,#047857)", "rgba(4,120,87,0.7)"],
  ["linear-gradient(140deg,#f472b6,#be185d)", "rgba(190,24,93,0.7)"],
  ["linear-gradient(140deg,#fbbf24,#d97706)", "rgba(217,119,6,0.7)"],
  ["linear-gradient(140deg,#2dd4bf,#0f766e)", "rgba(15,118,110,0.7)"],
];
const Estrellita = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 drop-shadow"><path fill="#ffc53d" stroke="#0e1a3d" strokeWidth="1.2" strokeLinejoin="round" d="M12 2.5l2.6 6.4 6.9.5-5.3 4.4 1.7 6.7L12 16.8l-5.9 3.7 1.7-6.7-5.3-4.4 6.9-.5z" /></svg>
);

export function SeccionLoFirmamos() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Más de 22 años de experiencia en marketing digital</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">La seriedad de una gran agencia. <Subrayado>Sin su factura.</Subrayado></h2>
          </div>
          <p className="text-lg text-gris">Hemos llevado cuentas de Google Ads de hasta 60.000 € al mes en una sola empresa. Sabemos lo que es la responsabilidad, y por eso lo importante lo dejamos por escrito.</p>
        </div>
        <ul className="carrusel mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SELLOS.map((x, i) => (
            <li key={x.t} className="group inclina relative flex gap-5 rounded-[1.8rem] border border-linea p-6 hover:-translate-y-1 hover:border-noche hover:shadow-[0_20px_40px_-24px_rgba(14,26,61,0.5)] sm:p-7">
              <Loseta icono={x.icono} i={i} tam="lg" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Compromiso {i + 1}</p>
                <p className="mt-0.5 text-xl font-extrabold">{x.t}</p>
                <p className="mt-1.5 text-gris">{x.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-5 rounded-[2rem] bg-noche p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-estrella text-tinta">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG.escudo}</svg>
          </span>
          <p className="text-xl font-extrabold sm:text-2xl">
            Nos comprometemos por escrito: plazos, transparencia cada día y objetivos medibles. <span className="text-estrella">Y hasta hoy, los resultados han llegado en todas las empresas con las que hemos trabajado.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* Miedo al cambio: prueba A/B y salida fácil. */
export function SeccionMiedoAlCambio() {
  const reparto = [70, 60, 50];
  return (
    <section id="miedo-al-cambio" className="relative overflow-hidden bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">¿Te da miedo cambiar?</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Pruébalo con tu web actual al lado. <Subrayado>Sin riesgo.</Subrayado></h2>
          </div>
          <p className="text-lg text-gris">Es normal. Por eso no te pedimos que cierres los ojos: te proponemos que lo compruebes con tus propios números.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-[2rem] bg-noche p-7 text-white sm:p-9">
            <p className="text-sm font-extrabold uppercase tracking-wide text-estrella">Test A/B</p>
            <p className="mt-2 text-2xl font-extrabold sm:text-3xl">Tu web actual y la nuestra, a la vez.</p>
            <p className="mt-3 text-white/85">Repartimos las visitas entre las dos webs. El reparto lo eliges tú: que la mitad vea la nueva, o seis de cada diez, o siete. En unos días o semanas comparas cuál consigue más contactos.</p>
            <ul className="mt-6 space-y-4" aria-label="Ejemplos de reparto de visitas">
              {reparto.map((n) => (
                <li key={n}>
                  <div className="flex justify-between text-sm font-bold"><span>{100 - n} % ve tu web actual</span><span className="text-estrella">{n} % ve la nueva</span></div>
                  <div className="mt-1.5 flex h-4 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${100 - n} por ciento a la web actual y ${n} por ciento a la nueva`}>
                    <div className="bg-white/35" style={{ width: `${100 - n}%` }} />
                    <div className="bg-estrella" style={{ width: `${n}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/70">Hasta hoy, la nuestra ha funcionado mejor en todos los clientes con los que hemos trabajado. No lo damos por hecho: te lo enseñamos con tus datos.</p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              ["Tres meses para demostrarlo", "Si en ese tiempo no has visto que mejoramos, te vas sin pagar nada y te quedas con la web."],
              ["Doce meses y se acabó", "Es la única permanencia. Después, te quedas solo si te compensa."],
              ["Lo tuyo, siempre tuyo", "Tus cuentas y tus contactos, siempre. La web, al cumplir los doce meses, o antes si pagas la parte que falte."],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 rounded-[1.6rem] border border-linea bg-white p-5">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-estrella text-lg font-extrabold text-tinta">{i + 1}</span>
                <div>
                  <p className="text-lg font-extrabold">{t}</p>
                  <p className="mt-1 text-gris">{d}</p>
                </div>
              </div>
            ))}
            <p className="px-2 text-lg font-bold text-noche-3">No queremos clientes que no quieran estar con nosotros. Por eso la salida es siempre fácil.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Aviso corto en la portada: lleva a la sección completa de «Cómo trabajamos». */
export function BandaMiedoAlCambio() {
  return (
    <section className="bg-niebla py-6">
      <div className={ENVOLTORIO}>
        <a href="/miedo-al-cambio" className="group flex flex-col gap-3 rounded-[1.6rem] border border-linea bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-noche sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <span>
            <span className="block text-sm font-extrabold uppercase tracking-wide text-amber-800">¿Te da miedo cambiar?</span>
            <span className="mt-1 block text-xl font-extrabold sm:text-2xl">Prueba la nueva web al lado de la tuya, sin riesgo, y vete a los tres meses sin pagar nada si no mejoramos.</span>
          </span>
          <span className="shrink-0 font-bold text-noche-3 underline decoration-estrella decoration-2 underline-offset-4 group-hover:text-[#1d4ed8]">Cómo lo hacemos</span>
        </a>
        <a href="/un-dia-de-trabajo" className="group mt-4 flex flex-col gap-3 rounded-[1.6rem] border border-linea bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-noche sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <span>
            <span className="block text-sm font-extrabold uppercase tracking-wide text-amber-800">Sin cajas negras</span>
            <span className="mt-1 block text-xl font-extrabold sm:text-2xl">Mira lo que hacemos por dentro en un día de trabajo real. Casi nadie te lo cuenta.</span>
          </span>
          <span className="shrink-0 font-bold text-noche-3 underline decoration-estrella decoration-2 underline-offset-4 group-hover:text-[#1d4ed8]">Ver un día de trabajo</span>
        </a>
      </div>
    </section>
  );
}

/* Portada: tus cuentas son tuyas (siete compromisos de control). */
export function BandaControl() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className={`${ENVOLTORIO} grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]`}>
        <div>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Tu control</p>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Tus cuentas son tuyas. Tú mandas.</h2>
          <p className="mt-5 text-lg text-gris">
            Queremos que seas tú quien tenga el control, no nosotros. Tu dominio y tus cuentas de Google están a tu nombre, y nosotros entramos como invitados. Si un día quieres irte, te llevas tus cuentas y tus contactos, y la web la tienes tuya al cumplir los doce meses. Sin enfados.
          </p>
          <p className="mt-4 text-lg text-gris">Te quedas porque te servimos, no porque no puedas irte.</p>
          <a href="/tu-control" className={`${BOTON} mt-8 inline-flex`}>Ver tus siete compromisos</a>
        </div>
        <ol className="grid gap-3">
          {COMPROMISOS.map((c, i) => (
            <li key={c.titulo} className="flex items-start gap-4 rounded-[1.4rem] bg-niebla p-4 sm:p-5">
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-estrella font-extrabold text-tinta">{i + 1}</span>
              <span>
                <b className="block text-lg leading-snug">{c.titulo}</b>
                <span className="mt-1 block text-gris">{c.corto}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Lo que no podemos enseñar: trabajos confidenciales. */
export function SeccionConfidenciales() {
  return (
    <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-20">
      <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
      <div className={`${ENVOLTORIO} relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]`}>
        <div>
          <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-estrella ring-1 ring-white/15">Bajo llave</p>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Lo que ves es solo una parte.</h2>
          <p className="mt-5 text-lg text-white/80">
            Muchos de nuestros mejores trabajos no los podemos enseñar: el cliente prefiere que su competencia no sepa quién está detrás de lo bien que le va. Nos encantaría publicarlos todos. En el estudio gratuito te contamos casos parecidos al tuyo.
          </p>
        </div>
        <ul aria-hidden="true" className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <li key={i} className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] bg-white/10 ring-1 ring-white/15">
              <div className="absolute inset-0 scale-110 blur-md" style={{ background: ["linear-gradient(160deg,#1f6feb,#7c3aed)", "linear-gradient(160deg,#0f9d58,#0ea5a4)", "linear-gradient(160deg,#f59e0b,#e8457a)"][i] }} />
              <div className="absolute inset-x-4 top-5 space-y-2 opacity-60">
                <span className="block h-2.5 w-3/4 rounded-full bg-white/80" />
                <span className="block h-2.5 w-1/2 rounded-full bg-white/60" />
                <span className="mt-4 block h-16 rounded-xl bg-white/30" />
              </div>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-noche text-estrella shadow-xl ring-4 ring-estrella/30">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG.llave}</svg>
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-3 text-center text-xs font-bold text-white">Confidencial</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Versión compacta de todo lo incluido, para la portada (la completa está en Servicios). */
export function SeccionIncluidoCompacta() {
  const colores = ["#1f6feb", "#e8457a", "#0f9d58", "#f59e0b", "#7c3aed", "#0ea5a4"];
  const todo = [...FRENTES.map((f) => f.nombre), "CRM a medida", ...TAMBIEN_INCLUIDO.map((x) => x.t)];
  return (
    <section className="bg-niebla py-20 sm:py-24">
      <div className={ENVOLTORIO}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">Todo esto entra en tu cuota</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Lo que otras agencias te cobran aparte, aquí va dentro.</h2>
          </div>
          <p className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-linea">
            <span className="font-titular text-4xl font-extrabold text-emerald-600">{todo.length}</span>
            <span className="text-sm font-bold leading-snug">servicios, una sola cuota</span>
          </p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {todo.map((t, i) => (
            <li key={t} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.95rem] font-bold shadow-sm ring-1 ring-black/5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: colores[i % colores.length] }} />
              {t}
            </li>
          ))}
        </ul>
        <Link href="/servicios#incluido" className="mt-8 inline-flex rounded-full bg-noche px-6 py-3 font-bold text-white hover:bg-noche-2">Ver todo lo que incluye</Link>
      </div>
    </section>
  );
}

/* Velocidad: el compromiso, con esta web como prueba. */
export function SeccionVelocidad() {
  const notas: [string, string][] = [["100", "Rendimiento"], ["100", "Accesibilidad"], ["100", "Buenas prácticas"]];
  return (
    <section id="velocidad" className="relative scroll-mt-24 overflow-hidden bg-noche py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 opacity-70"><VideoFondo nombre="fibra-luz" alt="" /></div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-noche/85 via-noche/50 to-noche/20" />
      <div className={`${ENVOLTORIO} relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Nuestro compromiso de velocidad</p>
          <h2 className="mt-5 text-4xl font-extrabold sm:text-6xl">Tu web, más rápida que la de la mayoría.</h2>
          <p className="mt-6 text-lg text-white/85">
            Solo el 48 % de las webs aprueba en el móvil la velocidad que pide Google. Una web lenta pierde visitas antes de que la vean, y Google lo tiene en cuenta al ordenar los resultados.
          </p>
          <ul className="mt-8 space-y-3 text-lg">
            {[
              "Tu web cargada en 2 segundos como máximo. Lo ideal, menos de medio segundo.",
              "100, 100, 100 en PageSpeed Insights, la herramienta de Google que mide rendimiento, accesibilidad y buenas prácticas.",
              "No te diremos que lo clavamos a la primera, pero siempre vas a estar muy cerca de lo óptimo y muy por encima de la media.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-sm font-extrabold text-white">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/60">Dato: HTTP Archive, Web Almanac 2025 (webs de todo el mundo). Las notas de PageSpeed varían un poco en cada medición.</p>
        </div>
        <div className="rounded-[2rem] bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur-sm sm:p-9">
          <p className="text-sm font-bold text-estrella">Predicamos con el ejemplo</p>
          <p className="mt-2 text-2xl font-extrabold">Esta misma web, medida en PageSpeed Insights</p>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {notas.map(([n, t]) => (
              <div key={t} className="text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full sm:h-28 sm:w-28" style={{ background: "conic-gradient(#10b981 360deg, transparent 0)" }}>
                  <div className="grid h-[86%] w-[86%] place-items-center rounded-full bg-noche">
                    <span className="text-3xl font-extrabold text-emerald-400 sm:text-4xl">{n}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm font-bold text-white/85">{t}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-white/75">Y en ordenador, lo principal carga en unas seis décimas de segundo. Si quieres, mide tu web ahora en PageSpeed y compárala.</p>
          <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">Medir mi web en PageSpeed</a>
        </div>
      </div>
    </section>
  );
}

/* El lío de un proveedor para cada cosa frente a una sola factura. */
const PROVEEDORES_LIO = [
  "Agencia web", "Mantenimiento de WordPress", "Plugins de pago", "Alojamiento", "Agencia de velocidad", "Agencia SEO", "Google Ads", "Anuncios en Meta",
  "Community manager", "Diseñador", "Consultora de CRM", "Licencias de HubSpot", "Chatbot", "Reseñas", "Programa de citas", "Firma electrónica",
  "Encuestas", "Medición de llamadas", "Copias y seguridad", "Editor de vídeo",
];
export function SeccionVeinteProveedores() {
  const giros = [-4, 3, -2, 5, -5, 2, 4, -3, 3, -4, 2, -2, 5, -3, 1, -5, 4, -1, 3, -4];
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <div className="max-w-4xl">
          <p className="inline-block rounded-full bg-rose-100 px-4 py-1.5 text-sm font-bold text-rose-800">El lío de siempre</p>
          <h2 className="mt-5 text-4xl font-extrabold sm:text-6xl">¿Sientes que, en tu marketing, cada proveedor va a lo suyo? Y tú, en medio, coordinándolos a todos.</h2>
          <p className="mt-5 text-lg text-gris sm:text-xl">
            Quieres que tu web vaya rápida y contratas a una empresa. Luego a otra para el SEO, otra para las campañas, otra para el diseño, una consultora para el CRM y las licencias de HubSpot para el seguimiento. Cuando te das cuenta, tienes un proveedor para cada cosa, una factura de cada uno y una contraseña para cada sitio. Ninguno habla con los demás. Y cuando algo falla, nadie responde.
          </p>
        </div>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ul aria-label="Proveedores que tendrías que contratar por separado" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {PROVEEDORES_LIO.map((p, i) => (
              <li key={p} className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-900 shadow-sm" style={{ transform: `rotate(${giros[i]}deg)` }}>
                <span className="block text-[0.7rem] font-extrabold uppercase tracking-wide text-rose-700">Factura {i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="relative rounded-[2rem] bg-noche p-8 text-white shadow-[0_30px_60px_-30px_rgba(14,26,61,0.8)] sm:p-10">
            <span aria-hidden="true" className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-estrella shadow-[0_0_0_8px_rgba(255,197,61,0.25),0_0_30px_rgba(255,197,61,0.8)]" />
            <p className="text-sm font-bold text-estrella">Te facilitamos la vida.</p>
            <p className="mt-3 text-4xl font-extrabold sm:text-5xl">1 equipo.<br />1 factura.<br />Todo dentro.</p>
            <p className="mt-5 text-lg text-white/85">Un solo equipo que lo hace todo. Y responde. Todo eso, con la misma cuota.</p>
            <Link href="/servicios#costes" className="mt-7 inline-flex rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">Calcula lo que te ahorras</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tecnología limpia, sin lastre: por qué podemos lo que otros no. */
const COMPARA_TECNO: [string, string, string][] = [
  ["Cómo se hace", "Una plantilla y decenas de plugins de terceros", "Código propio, a medida, sin plugins"],
  ["Velocidad", "Depende de cada plugin; lo normal es que vaya lenta", "100, 100, 100 en PageSpeed, como esta web"],
  ["Seguridad", "11.334 fallos de seguridad nuevos en su ecosistema en 2025; el 91 %, en plugins", "Sin plugins ni panel de administración a la vista: muchísimo más difícil de atacar"],
  ["Si algo sale mal", "Restaurar copias, buscar al culpable, días de web caída", "Volvemos a la versión anterior en minutos"],
  ["Cada cambio", "Una actualización puede romper otra cosa", "Revisado antes de publicar y guardado con su historial"],
  ["Dónde vive", "Un servidor que hay que mantener y vigilar", "La red mundial de Vercel, cerca de cada visitante"],
];
export function SeccionTecnologia() {
  return (
    <section id="tecnologia" className="relative scroll-mt-24 overflow-hidden bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Tecnología limpia, sin lastre</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Lo último en tecnología. Sin la carga de lo antiguo.</h2>
          </div>
          <p className="text-lg text-gris">
            Muchas agencias no pueden cambiar: tienen equipos enteros montados sobre la tecnología de hace diez años, y empezar de nuevo les saldría carísimo. Nosotros no arrastramos esa carga. Trabajamos limpios, con lo mejor de hoy, y eso se nota en cada web.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-linea">
          <div className="hidden grid-cols-[0.8fr_1fr_1fr] gap-3 bg-noche px-5 py-4 text-sm font-extrabold text-white sm:grid sm:px-7">
            <span />
            <span className="text-rose-300">Una web típica en WordPress</span>
            <span className="text-estrella">Una web de Casiopea 360</span>
          </div>
          {COMPARA_TECNO.map(([q, a, b]) => (
            <div key={q} className="grid items-start gap-2 border-t border-linea px-5 py-4 text-[0.95rem] transition-colors first:border-t-0 hover:bg-niebla/60 sm:grid-cols-[0.8fr_1fr_1fr] sm:gap-3 sm:px-7">
              <b>{q}</b>
              <span className="flex gap-2.5 text-gris"><span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></span><span><b className="font-bold text-rose-700 sm:hidden">WordPress: </b>{a}</span></span>
              <span className="flex gap-2.5"><span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span><span><b className="font-bold text-emerald-700 sm:hidden">Casiopea: </b>{q === "Velocidad" ? <><span className="mr-1.5 inline-flex gap-1 align-middle">{[0, 1, 2].map((k) => <span key={k} className="grid h-7 w-7 place-items-center rounded-full bg-emerald-600 text-[0.65rem] font-extrabold text-white ring-2 ring-emerald-200">100</span>)}</span>en PageSpeed, como esta web</> : b}</span></span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-gris">
          WordPress mueve el 42,6 % de las webs del mundo (W3Techs, 2026), y por eso es el blanco favorito de los ataques. Datos de seguridad: Patchstack, informe sobre la seguridad de WordPress en 2026. Ninguna web es invulnerable; la nuestra es mucho más difícil de atacar y mucho más fácil de recuperar.
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
    <section id="crm" className="scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28">
      <div className={`${ENVOLTORIO} grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]`}>
        <div>
          <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Valor añadido · si lo quieres</p>
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
          <Link href="/crm-ejemplo" className={`${BOTON} mt-8 inline-flex`}>Ver un CRM de ejemplo</Link>
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
    <section id="fuera" className="scroll-mt-24 bg-niebla py-20 sm:py-24">
      <div className={ENVOLTORIO}>
        <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">360 de verdad</p>
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

/* Lo que costaría por separado, según el tamaño de la empresa. */
export function SeccionCostes() {
  return (
    <section id="costes" className="relative scroll-mt-24 overflow-hidden bg-niebla py-20 sm:py-28">
      <div className={ENVOLTORIO}>
        <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Haz cuentas</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">Esto es lo que te costaría por separado.</h2>
        <p className="mt-5 mb-10 max-w-3xl text-lg text-gris">Elige el tamaño de tu empresa y marca lo que necesitas. Verás lo que pagarías contratándolo por separado, a cuántos proveedores y cuántas facturas. Spoiler: la suma asusta.</p>
        <CostesDiferido />
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
      <ol className="carrusel mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {PASOS.map((p, i) => (
          <li key={p.titulo} className="group inclina rounded-3xl bg-white p-6 shadow-sm ring-1 ring-linea">
            <div className="flex items-center justify-between">
              <Loseta icono={["lupa", "pagina", "firma", "cohete", "calendario", "reloj"][i % 6]} i={i} />
              <span aria-hidden="true" className="font-titular text-4xl font-extrabold text-noche/20">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-xl font-extrabold">{p.titulo}</h3>
            <p className="mt-2 text-gris">{glosar(p.texto)}</p>
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
        <h2 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">Tus cuentas son tuyas. Y te quedas porque quieres.</h2>
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
const PREGUNTAS_PORTADA = ["¿Cuánto cuesta?", "¿Hay permanencia?", "¿Cuánto tardáis en hacer una web?", "¿Cómo podéis cobrar menos por tanto?", "Si hacéis de todo, ¿no lo haréis peor que una agencia especializada?", "¿Garantizáis resultados?", "¿Y si me entra más trabajo del que puedo atender?"];

export function SeccionPreguntas({ titulo = true, todas = true, propias, fondo = "bg-niebla" }: { titulo?: boolean; todas?: boolean; propias?: { p: string; r: string }[]; fondo?: string }) {
  const lista = propias ?? (todas ? PREGUNTAS : PREGUNTAS.filter((q) => PREGUNTAS_PORTADA.includes(q.p)));
  const colores = ["#1d4ed8", "#6d28d9", "#be185d", "#047857", "#b45309", "#0f766e", "#e8457a"];
  // La primera frase es la respuesta corta; lo demás, el detalle.
  const partir = (r: string) => {
    const m = r.match(/^(.+?[.!?])\s+([\s\S]*)$/);
    return m ? [m[1], m[2]] : [r, ""];
  };
  return (
    <section id="preguntas" className={`scroll-mt-24 ${fondo} py-20 sm:py-28`}>
      <div className={ENVOLTORIO}>
        {titulo && (
          <>
            <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Pregúntanos lo que quieras</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">Lo que nos suelen preguntar.</h2>
            <p className="mt-4 max-w-2xl text-lg text-gris">Toca una pregunta y te contestamos al momento.</p>
          </>
        )}
        <div className={`${titulo ? "mt-10" : ""} gap-3 lg:columns-2`}>
          {lista.map((q, i) => {
            const [corta, resto] = partir(q.r);
            const color = colores[i % colores.length];
            return (
              <details key={q.p} className="group mb-3 break-inside-avoid rounded-[1.6rem] bg-white shadow-sm ring-1 ring-linea transition-shadow open:shadow-[0_20px_40px_-24px_rgba(14,26,61,0.45)]">
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-md ${i % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: color }}>?</span>
                  <span className="flex-1 text-[1.05rem] font-extrabold leading-snug">{q.p}</span>
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-niebla text-xl transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5">
                  <div className="flex items-start gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/marca/icono.svg" alt="" width={32} height={32} className="mt-1 h-8 w-8 shrink-0 rounded-lg" />
                    <div className="aparece rounded-2xl rounded-tl-md bg-noche px-4 py-3 text-white">
                      <p className="font-bold">{glosar(corta)}</p>
                      {resto && <p className="mt-2 text-[0.95rem] leading-relaxed text-white/85">{glosar(resto)}</p>}
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {!todas && !propias && (
            <Link href="/preguntas" className="inline-flex justify-center rounded-full bg-noche px-6 py-3 font-bold text-white hover:bg-noche-2">
              Ver todas las preguntas
            </Link>
          )}
          <p className="text-gris">¿No está la tuya? Pregúntale a nuestro asistente, abajo a la derecha.</p>
        </div>
      </div>
    </section>
  );
}

/* Qué incluye el estudio gratuito. */
/* Cómo empezamos: test de idoneidad, revisión, estudio y decisión. */
export function SeccionEmpezamos({ base = "" }: { base?: string }) {
  const colores = ["#1d4ed8", "#6d28d9", "#be185d", "#047857"];
  return (
    <section id="como-empezamos" className="scroll-mt-24 bg-niebla py-20 sm:py-24">
      <div className={ENVOLTORIO}>
        <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Cómo empezamos</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl">Cuatro pasos. Y el primero son <Subrayado>dos minutos</Subrayado>.</h2>
        <ol className="carrusel mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EMPEZAMOS.map((x, i) => (
            <li key={x.t} className="group inclina relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-linea">
              <div className="flex items-center justify-between">
                <Loseta icono={["lista", "lupa", "pagina", "video"][i]} i={i} />
                <span aria-hidden="true" className="font-titular text-4xl font-extrabold" style={{ color: colores[i], opacity: 0.35 }}>0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold">{x.t}</h3>
              <p className="mt-2 text-gris">{x.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`${base}#solicitud`} className={BOTON}>Hacer el test de idoneidad</Link>
          <Link href={`${base}#estudio`} className="inline-flex items-center justify-center rounded-full border-2 border-noche px-7 py-3.5 font-bold text-noche hover:bg-noche hover:text-white">Qué incluye el estudio</Link>
        </div>
      </div>
    </section>
  );
}

/* Portada: el estudio, resumido (el detalle completo vive en /estudio-gratuito). */
export function SeccionEstudioResumen() {
  return (
    <section id="estudio" className={`${ENVOLTORIO} scroll-mt-24 py-20 sm:py-24`}>
      <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Tu estudio gratuito</p>
      <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-5xl">No es un informe. Es tu plan <Subrayado>completo</Subrayado>.</h2>
      <p className="mt-4 max-w-3xl text-lg text-gris">{ESTUDIO_TOTAL} apartados hechos a medida, con la propuesta de rediseño de tu web y cuánto ahorrarías, al euro.</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ESTUDIO_BLOQUES.map((b, k) => (
          <li key={b.titulo} className="inclina flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-linea">
            <span aria-hidden="true" className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-md ${k % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: b.color }}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[b.icono]}</svg>
            </span>
            <span>
              <span className="block text-lg font-extrabold">{b.titulo}</span>
              <span className="text-sm text-gris">{b.items.length} apartados</span>
            </span>
          </li>
        ))}
      </ul>
      <MuestraEstudio />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="#solicitud" className={BOTON}>Hacer el test de idoneidad</a>
        <Link href="/estudio-gratuito#estudio" className="inline-flex items-center justify-center rounded-full border-2 border-noche px-7 py-3.5 font-bold text-noche hover:bg-noche hover:text-white">Ver los {ESTUDIO_TOTAL} apartados</Link>
      </div>
    </section>
  );
}

/* Por qué nos llamamos Casiopea: la reina del cielo del norte, que desde España se ve todas las noches. */
export function SeccionNombre() {
  return (
    <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
      <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
      <div className={`${ENVOLTORIO} relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]`}>
        <AlEntrar className="mx-auto w-full max-w-lg">
          <Constelacion />
          <p className="mt-3 text-center text-sm text-white/60">La W de Casiopea, como se ve desde España cualquier noche del año.</p>
        </AlEntrar>
        <div>
          <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-estrella ring-1 ring-white/15">Por qué nos llamamos así</p>
          <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Casiopea es la <Subrayado>reina</Subrayado> del cielo del norte.</h2>
          <p className="mt-6 text-lg text-white/80">Sus cinco estrellas dibujan una W que, desde España, se ve todas las noches del año. Nunca se pone. Nunca se esconde. Siempre está ahí.</p>
          <p className="mt-4 text-lg text-white/80">Así queremos ser para tu negocio: cinco frentes, un solo equipo y siempre ahí. Por eso nuestra W sube y termina en una estrella.</p>
        </div>
      </div>
    </section>
  );
}

/* La Tierra en directo: tu web no cierra nunca. */
export function SeccionMundo() {
  return (
    <section id="mundo" className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
      <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
      <div className={`${ENVOLTORIO} relative`}>
        <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">En directo, ahora mismo</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">Tu web no cierra <Subrayado>nunca</Subrayado>.</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">Mientras lees esto, en algún sitio es de día y alguien está buscando lo que haces. Tu web y tu asistente con IA le atienden a cualquier hora, estés donde estés.</p>
        <div className="mt-10">
          <RelojMundoDiferido />
        </div>
      </div>
    </section>
  );
}

/* Portada: lo que ya no cabe aquí, a un toque. */
export function SeccionSaberMas() {
  const tarjetas = [
    { t: "Cuánto te costaría por separado", d: "La calculadora, por tamaño de empresa.", href: "/servicios#costes", icono: "euro", color: "#047857" },
    { t: "Haz cuentas: ¿cuánto pagas hoy?", d: "Marca lo que tienes y mira lo que cuesta por separado.", href: "/servicios#costes", icono: "euro", color: "#b45309" },
    { t: "Tu web, de las rápidas", d: "Nuestro compromiso de velocidad, con datos.", href: "/servicios#velocidad", icono: "telefono", color: "#1d4ed8" },
    { t: "Tecnología de hoy", d: "Sin WordPress ni plugins: más segura.", href: "/servicios#tecnologia", icono: "escudo", color: "#6d28d9" },
    { t: "Tu propio CRM", d: "Cada contacto con su origen, sin licencias.", href: "/servicios/crm-a-medida", icono: "chat", color: "#be185d" },
    { t: "Todo lo que entra en la cuota", d: "Reservas, reseñas, tienda, apps y más.", href: "/servicios#incluido", icono: "regalo", color: "#0f766e" },
    { t: "Cada día sabes qué hemos hecho", d: "Tu parte diario y tu panel.", href: "/como-trabajamos", icono: "calendario", color: "#e37400" },
    { t: "¿Te suena alguno?", d: "Los problemas de siempre y cómo los arreglamos.", href: "/como-trabajamos#dolores", icono: "lupa", color: "#e8457a" },
  ];
  return (
    <section className="bg-niebla py-20 sm:py-24">
      <div className={ENVOLTORIO}>
        <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Para saber más.</h2>
        <p className="mt-4 max-w-2xl text-lg text-gris">Todo lo demás, a un toque.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tarjetas.map((x, k) => (
            <li key={x.t}>
              <Link href={x.href} className="group inclina flex h-full flex-col rounded-3xl bg-white p-4 shadow-sm ring-1 ring-linea sm:p-5">
                <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md ${k % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: x.color }}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[x.icono]}</svg>
                </span>
                <span className="mt-3 text-[0.98rem] font-extrabold leading-snug sm:mt-4 sm:text-lg">{x.t}</span>
                <span className="mt-1 hidden text-sm text-gris sm:block">{x.d}</span>
                <span className="mt-auto pt-3 text-sm font-bold text-noche-3">Ver <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Muestra de cómo es por dentro un estudio (guía de ejemplo de un despacho inventado, difuminada). */
export function MuestraEstudio() {
  const pags = [
    { src: "/marca/muestra-1.webp", t: "La portada de tu guía" },
    { src: "/marca/muestra-2.webp", t: "Tu situación, con semáforo" },
    { src: "/marca/muestra-3.webp", t: "Tu web, rediseñada" },
    { src: "/marca/muestra-4.webp", t: "Tus anuncios frente a tu competencia" },
  ];
  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-noche-3">Así es por dentro</p>
          <p className="mt-1 text-2xl font-extrabold sm:text-3xl">Un vistazo a una guía de ejemplo.</p>
        </div>
        <p className="text-sm text-gris">Guía de ejemplo de un despacho ficticio. El tuyo, con tus datos.</p>
      </div>
      <ul className="carrusel mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pags.map((x, i) => (
          <li key={x.src} className={`overflow-hidden rounded-[1.4rem] bg-white shadow-[0_20px_40px_-24px_rgba(14,26,61,0.55)] ring-1 ring-linea transition-transform hover:-translate-y-1 ${i % 2 ? "lg:rotate-1" : "lg:-rotate-1"}`}>
            <Image src={x.src} alt={`Guía de ejemplo: ${x.t.toLowerCase()}`} width={720} height={608} className="h-auto w-full" />
            <p className="px-4 py-3 text-sm font-bold">{x.t}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Todo lo que incluye el estudio gratuito. */
export function SeccionEstudio() {
  return (
    <section id="estudio" className={`${ENVOLTORIO} scroll-mt-24 py-20 sm:py-28`}>
      <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Tu estudio gratuito</p>
      <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">No es un informe. Es tu plan completo.</h2>
      <p className="mt-5 max-w-3xl text-lg text-gris sm:text-xl">
        {ESTUDIO_TOTAL} apartados hechos a medida para tu empresa, con datos reales y fechados, y la propuesta de rediseño completo de tu web. Por eso no se lo hacemos a todo el mundo.
      </p>
      <div className="carrusel mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ESTUDIO_BLOQUES.map((b, k) => (
          <div key={b.titulo} className="relative overflow-hidden rounded-[1.8rem] bg-white p-6 shadow-sm ring-1 ring-linea sm:p-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: b.color }} />
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-md ${k % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: b.color }}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[b.icono]}</svg>
              </span>
              <h3 className="text-xl font-extrabold">{b.titulo}</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              {b.items.map((x) => (
                <li key={x.t} className="flex gap-2.5 text-[0.98rem]">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: b.color }} />
                  <span>
                    {x.t}
                    {x.caso && <span className="ml-1.5 whitespace-nowrap rounded-full bg-niebla px-2 py-0.5 text-xs font-bold text-gris">según tu caso</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <MuestraEstudio />
      <div className="mt-8 grid gap-6 rounded-[2rem] bg-estrella p-7 text-tinta sm:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Tu inversión, optimizada al máximo</p>
          <p className="mt-2 font-titular text-3xl font-extrabold sm:text-4xl">Lo normal es ahorrar, y mucho.</p>
          <p className="mt-3 text-lg">Unificamos lo que hoy pagas a cada proveedor y lo optimizamos. Con lo que liberas, tú eliges: ahorrártelo o invertirlo en publicidad para crecer más. Y casi siempre, solo con esa optimización, ya tienes mejores resultados con la misma inversión, y encima margen para subirla. El estudio te lo dice al euro.</p>
          <p className="mt-3 font-bold">Dos casos reales, con permiso de sus dueños:</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.6rem] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-gris">Reformadísimo</p>
            <p className="mt-2 font-titular text-5xl font-extrabold text-emerald-700"><Cifra valor={23} antes="−" despues=" %" /></p>
            <p className="mt-1 font-bold">en toda su inversión en marketing</p>
            <p className="mt-2 text-[0.95rem] text-gris">Proveedores, anuncios y herramientas, todo sumado.</p>
          </div>
          <div className="rounded-[1.6rem] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-gris">AMS Cerramientos</p>
            <p className="mt-2 font-titular text-5xl font-extrabold text-emerald-700"><Cifra valor={36} antes="−" despues=" %" /></p>
            <p className="mt-1 font-bold">en lo que paga cada mes en marketing</p>
            <p className="mt-2 text-[0.95rem] text-gris">Lo que antes repartía entre varios proveedores.</p>
          </div>
        </div>
      </div>
      <div className="mt-5 grid items-center gap-6 rounded-[2rem] bg-noche p-7 text-white sm:p-9 lg:grid-cols-[1fr_auto]">
        <p className="text-xl font-extrabold sm:text-2xl">
          Es una guía viva: se actualiza mientras la comentamos contigo. <span className="text-estrella">En una consultora, esto es un proyecto de pago. Para las empresas que encajan, es nuestro regalo.</span>
        </p>
        <a href="#solicitud" className={BOTON}>Hacer el test de idoneidad</a>
      </div>
    </section>
  );
}

/* «¿Quieres ver ejemplos?»: las cuatro webs que enseñamos por ahora. */
export function EjemplosTrabajos({ claro = false }: { claro?: boolean }) {
  const lista = [
    { n: "Reformadísimo", d: "Reformas integrales", url: "https://www.reformadisimo.es" },
    { n: "AMS Cerramientos", d: "Ventanas y cerramientos", url: "https://ams-cerramientos-ejemplo.vercel.app" },
    { n: "Tierno Centella", d: "Abogados laboralistas", url: "https://tierno-centella-web.vercel.app" },
    { n: "Mi Estela", d: "App para iPhone y Android", url: "https://miestela.app" },
  ];
  return (
    <div className={`mt-8 rounded-[1.8rem] p-6 ${claro ? "bg-niebla" : "bg-white/[0.07] ring-1 ring-white/15"}`}>
      <p className="text-lg font-extrabold">¿Quieres ver ejemplos de nuestros trabajos?</p>
      <p className={`mt-1 text-sm ${claro ? "text-gris" : "text-white/75"}`}>Entra y pruébalos: están funcionando hoy.</p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {lista.map((x) => (
          <li key={x.n}>
            <a href={x.url} target="_blank" rel="noopener" className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 font-bold transition-colors ${claro ? "bg-white ring-1 ring-linea hover:ring-noche" : "bg-white/10 hover:bg-white/20"}`}>
              <span>
                {x.n}
                <span className={`block text-xs font-normal ${claro ? "text-gris" : "text-white/70"}`}>{x.d}</span>
              </span>
              <span aria-hidden="true" className="text-estrella">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Solicitud con test de idoneidad. */
export function SeccionSolicitud() {
  return (
    <section id="solicitud" className="scroll-mt-24 bg-noche py-20 text-white sm:py-28">
      <div className={`${ENVOLTORIO} grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]`}>
        <div className="lg:sticky lg:top-28">
          <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Unos 4 minutos · Una pregunta cada vez</p>
          <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Haz tu test de idoneidad.</h2>
          <p className="mt-5 text-lg text-white/80">
            Preparar un estudio nos lleva un día de trabajo, así que solo lo hacemos a empresas a las que podemos ayudar de verdad. Contesta tocando, sin escribir, y al final te damos tu nota.
          </p>
          <p className="mt-4 text-lg text-white/80">Te escribimos siempre: si encajas, para preparar tu estudio; y si no, también, con el porqué.</p>
          <div className="hidden lg:block"><EjemplosTrabajos /></div>
        </div>
        <DiagnosticoDiferido />
      </div>
    </section>
  );
}

/* Llamada final a la acción, para el pie de las páginas interiores. */
export function LlamadaFinal() {
  return (
    <section className={`${ENVOLTORIO} py-20`}>
      <div className="relative overflow-hidden rounded-[2rem] bg-noche p-8 text-white sm:p-14">
        <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-80"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-5xl">¿Empezamos por un estudio gratuito?</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">Te contamos cómo está hoy tu marketing y qué haríamos. Sin compromiso.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/estudio-gratuito" className={BOTON}>Solicitar estudio</Link>
            <Link href="/test" className={BOTON_CLARO}>Hacer el test de idoneidad</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
