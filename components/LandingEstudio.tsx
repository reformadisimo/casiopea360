import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import { CONTACTO } from "@/lib/contenido";
import VideoHero from "@/components/VideoHero";
import VideoFondo from "@/components/VideoFondo";
import Subrayado from "@/components/Subrayado";
import { Nebulosa, Etiqueta } from "@/components/Vida";
import { ENVOLTORIO } from "@/components/secciones";

// Vídeo largo (2:24) en YouTube, el que se abre con «Ver el vídeo completo».
const ID_VIDEO_LARGO = "SviXZNrk9FU";

const BOTON =
  "boton-brillo inline-flex items-center justify-center rounded-full bg-estrella px-7 py-3.5 text-base font-bold text-tinta transition-colors hover:bg-estrella-2";

// Lo que recibe quien hace el test (mismo contenido que «tu estudio» de /estudio-gratuito y la barra de /test).
const LO_QUE_TE_LLEVAS: [string, string][] = [
  ["Cómo está tu web:", "qué falla, incluida la velocidad, que es donde más clientes se pierden."],
  ["Tu web rediseñada de muestra,", "para que la veas antes de decidir nada."],
  ["Tu guía:", "qué haríamos primero y cuánto costaría."],
  ["Tu CRM y tu panel de ejemplo,", "para ver cómo llevarías tus contactos y tus cifras."],
  ["Tu nota de marketing digital,", "si te apetece contestar unos toques más."],
];

export function HeroLanding() {
  return (
    <section className="relative overflow-hidden bg-noche pb-14 pt-28 text-white sm:pb-20 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="profundo absolute inset-0"><VideoFondo nombre="constelaciones" alt="" prioridad /></div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noche/85 via-noche/35 to-transparent" />
      <Nebulosa oscura variante={2} />
      <div className={`${ENVOLTORIO} relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <Etiqueta tono="estrella">Agencia de marketing digital en Madrid</Etiqueta>
          <h1 className="mt-5 text-4xl font-extrabold sm:text-6xl">
            ¿Tu web no te trae <Subrayado>clientes</Subrayado>?
          </h1>
          <p className="mt-5 max-w-xl text-xl text-white/85">
            Somos una agencia de marketing digital en Madrid: web, SEO, anuncios y redes con un solo equipo. Haz el test, son tres toques, y si podemos ayudarte te preparamos <b className="text-white">tu estudio</b>. Sin darnos ningún acceso.
          </p>
          <div className="mt-6 max-w-xl rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm font-extrabold uppercase tracking-wide text-estrella">Lo que te llevas con el test, gratis y sin compromiso</p>
            <ul className="mt-3 grid gap-2.5 text-[0.95rem] text-white/90">
              {LO_QUE_TE_LLEVAS.map(([t, d]) => (
                <li key={t} className="flex items-start gap-3">
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-estrella text-tinta">
                    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                  </span>
                  <span><b className="text-white">{t}</b> {d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="#solicitud" className={BOTON}>Haz el test y recibe tu estudio</Link>
            <span className="text-sm text-white/80">Te escribimos siempre; sin llamadas comerciales.</span>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/85">
            <li>Una sola persona te atiende</li>
            <li>Tus cuentas, a tu nombre y bajo tu control</li>
            <li>Anuncios sin comisión</li>
            <li>Sin permanencia</li>
          </ul>
          <p className="mt-5 max-w-xl text-sm text-white/85">
            Una cuota fija, la misma para cualquier tamaño.{" "}
            <Link href="#ahorro" className="font-bold text-estrella underline underline-offset-4">Mira qué incluye y cuánto pagarías por separado</Link>.
          </p>
          <p className="mt-2 max-w-xl text-sm text-white/85">
            Mira lo que hemos hecho:{" "}
            <Link href="#ejemplos" className="font-bold text-estrella underline underline-offset-4">AMS Cerramientos, Reformadísimo y Mi Estela</Link>.
          </p>
        </div>
        <VideoHero idCompleto={ID_VIDEO_LARGO} titulo="Casiopea 360: tu marketing digital, al máximo nivel" />
      </div>
    </section>
  );
}

const DOLORES: [string, string][] = [
  ["Pagas y no sabes qué pasa", "Anuncios, web y redes consumen dinero cada mes y nadie te dice con claridad qué te devuelven."],
  ["Cada proveedor hace su parte", "El de la web, el de los anuncios y el de las redes no hablan entre sí. Y tú haces de coordinador."],
  ["Tu web no vende", "Está antigua, tarda en cargar o no aparece cuando alguien busca lo que haces."],
  ["Informes que no entiendes", "Te mandan gráficos y siglas. Tú solo quieres saber si entran clientes."],
  ["Las cuentas no son tuyas", "Si te vas, se quedan con tu web, tus anuncios o tus contactos. Pedir permiso el día de irte es incómodo."],
  ["No tienes tiempo", "Reuniones, llamadas y correos cruzados. Tu trabajo es tu negocio, no tu marketing."],
];

export function SeccionDolores() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className={ENVOLTORIO}>
        <Etiqueta>Te suena</Etiqueta>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">Casi nunca falla tu producto. Falla que no te encuentran.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOLORES.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-niebla p-6">
              <h3 className="text-lg font-extrabold text-tinta">{t}</h3>
              <p className="mt-2 text-tinta/75">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const VENTAJAS: [string, string][] = [
  ["Todo en un solo equipo", "Web, SEO y que te encuentren en Google y en las IA, anuncios, redes, CRM y asistente. Una sola cuota."],
  ["Una persona, tu encargado", "Te asignamos un encargado de proyecto. Solo te escribe él o ella. Detrás hay un equipo de años de experiencia."],
  ["Cuentas a tu nombre", "Web, anuncios y contactos son tuyos. Nos invitas y nos quitas con un clic. Nunca te pedimos contraseñas."],
  ["Anuncios sin comisión", "Pagas a Google y a Meta directamente. Nosotros no cobramos un porcentaje de tu inversión."],
  ["Cuota única, sin permanencia", "1.800 € + IVA al mes, la misma para cualquier tamaño. Si te vas, te llevas copia completa de todo."],
  ["Experiencia de empresarios", "Hemos llevado empresas propias. Miramos tu negocio, no solo el anuncio, y te damos nuestro punto de vista."],
  ["Ves lo que pasa", "Un panel en llano con las cifras de verdad. Si falta un dato, un guion; nunca un cero inventado."],
  ["Anuncios que informan", "Enseñamos trabajo y resolvemos dudas. Sin gritos, sin miedo y sin cifras mágicas."],
];

export function SeccionVentajas() {
  return (
    <section className="bg-niebla py-16 sm:py-24">
      <div className={ENVOLTORIO}>
        <Etiqueta>Lo que cambia contigo</Etiqueta>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">Un solo equipo, tus cuentas y cero líos.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VENTAJAS.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-tinta/5">
              <h3 className="text-lg font-extrabold text-tinta">{t}</h3>
              <p className="mt-2 text-sm text-tinta/75">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="#solicitud" className={BOTON}>Quiero mi estudio gratis</Link>
        </div>
      </div>
    </section>
  );
}

const PASOS: [string, string][] = [
  ["1. Haz el test", "Cinco minutos, tocando respuestas. Sin darnos accesos ni contraseñas."],
  ["2. Te escribimos en 48 horas laborables", "Te decimos si podemos ayudarte. Si ahora no, te lo decimos igual y te explicamos por qué."],
  ["3. Recibes tu estudio", "Si podemos ayudarte, es gratis: tu situación, tu competencia, tu web rediseñada y tu plan. En menos de una semana."],
  ["4. Decides tú", "Sin compromiso. Si no sigues, tienes un mes para mirarlo con calma y enseñárselo a quien quieras."],
];

export function SeccionPasos() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className={ENVOLTORIO}>
        <Etiqueta>Así de fácil</Etiqueta>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">De tu test a tu plan, en cuatro pasos.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-noche p-6 text-white">
              <h3 className="text-lg font-extrabold text-estrella">{t}</h3>
              <p className="mt-2 text-sm text-white/80">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-tinta/60">Cada empresa es distinta: contamos tu experiencia, no prometemos resultados concretos.</p>
      </div>
    </section>
  );
}

export function SeccionEjemplos() {
  return (
    <section id="ejemplos" className="scroll-mt-24 bg-niebla py-16 sm:py-24">
      <div className={ENVOLTORIO}>
        <Etiqueta>Trabajo hecho</Etiqueta>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">Mira lo que hacemos, no lo que prometemos.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <a href="https://www.reformadisimo.es" target="_blank" rel="noopener" className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-tinta/10">
            <Image src="/antes-despues/reformadisimo-despues.webp" alt="Portada de la web de Reformadísimo" width={1280} height={585} className="h-auto w-full" sizes="(min-width: 1024px) 700px, 100vw" />
            <div className="p-6">
              <h3 className="text-xl font-extrabold text-tinta">Reformadísimo · web</h3>
              <p className="mt-1 text-tinta/75">Reformas integrales en Madrid. Calculadoras de precio y asistente con IA por voz.</p>
              <span className="mt-3 inline-block text-sm font-bold text-noche-3 group-hover:underline">Ver la web →</span>
            </div>
          </a>
          <div className="grid gap-5">
            <a href="https://miestela.app" target="_blank" rel="noopener" className="group flex items-center gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-tinta/10">
              <Image src="/logos/mi-estela.png" alt="Mi Estela" width={96} height={96} className="h-24 w-24 shrink-0 rounded-2xl" />
              <div>
                <h3 className="text-xl font-extrabold text-tinta">Mi Estela · app</h3>
                <p className="mt-1 text-sm text-tinta/75">App familiar para iPhone y Android: de la idea a las dos tiendas en unos 120 días.</p>
                <span className="mt-2 inline-block text-sm font-bold text-noche-3 group-hover:underline">Conocer la app →</span>
              </div>
            </a>
            <a href="https://www.amscerramientos.es" target="_blank" rel="noopener" className="group flex items-center gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-tinta/10">
              <Image src="/logos/ams.png" alt="AMS Cerramientos" width={144} height={48} className="h-12 w-auto shrink-0" />
              <div>
                <h3 className="text-xl font-extrabold text-tinta">AMS · web</h3>
                <p className="mt-1 text-sm text-tinta/75">Ventanas y cerramientos: configurador con precio al momento y páginas por zona.</p>
                <span className="mt-2 inline-block text-sm font-bold text-noche-3 group-hover:underline">Ver la web →</span>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="#solicitud" className={BOTON}>Haz el test</Link>
          <p className="mt-3 text-sm text-tinta/60">Gratis y sin compromiso.</p>
        </div>
      </div>
    </section>
  );
}

// Barra mínima de esta landing: sin menú, solo logo, WhatsApp y el botón al test.
export function BarraLanding() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-noche/[0.97] shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Casiopea 360" className="shrink-0"><Logo claro fundido chico /></Link>
        <div className="flex items-center gap-3">
          <a href={`https://wa.me/${CONTACTO.whatsapp}`} target="_blank" rel="noopener" className="hidden text-sm font-bold text-white/85 hover:text-white sm:inline">WhatsApp</a>
          <Link href="#solicitud" className="rounded-full bg-estrella px-5 py-2 text-sm font-bold text-tinta hover:bg-estrella-2">Haz el test</Link>
        </div>
      </div>
    </div>
  );
}
