import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { ImagenAmpliable } from "@/components/ImagenAmpliable";
import Subrayado from "@/components/Subrayado";
import VideoFondo from "@/components/VideoFondo";
import VideoPulsar from "@/components/VideoPulsar";
import TestYa from "@/components/TestYa";
import { ENVOLTORIO } from "@/components/secciones";
import { PRECIO_CUOTA } from "@/components/SeccionesVender";

/* Landing corta para los anuncios de búsqueda (22-nov-2026): el dolor arriba, el test en la portada
   y cada bloque en una pantalla. Sin tarjetas largas. No se indexa: la página para Google es /estudio-gratuito. */

const BOTON = "boton-brillo inline-flex items-center justify-center rounded-full bg-estrella px-8 py-3.5 text-lg font-bold text-tinta transition-colors hover:bg-estrella-2";

// Lo que hacemos si trabajamos juntos: el problema a la izquierda, cómo lo llevamos a la derecha. Una línea cada uno.
const DOLORES: [string, string][] = [
  ["Pagas anuncios y no sabes qué te traen", "Consultas y seguimiento en un mismo panel"],
  ["Tu web no te trae consultas", "Una web que explique tu oferta y facilite contactarte"],
  ["No sales en Google ni en las IA", "SEO, ficha de Google y reseñas, trabajados cada semana"],
  ["Varios proveedores y coordinas tú", "Un solo equipo y una sola persona que te atiende"],
  ["Las cuentas no están a tu nombre", "Todo a tu nombre: te vas cuando quieras, con todo"],
  ["Informes que no entiendes", "Un panel claro: cuánto gastas y cuántos contactos entran"],
];

const RECIBES: [string, string, string, string][] = [
  ["/ejemplo/mejoras-700.webp", "Revisión", "Tu web, tu Google y tus anuncios, a examen.", "Captura del estudio de ejemplo: lo que falla en la web actual"],
  ["/ejemplo/web-portada-700.webp", "Propuesta", "Tu web rediseñada, de muestra, y borradores de anuncios.", "Captura del estudio de ejemplo: la web rediseñada"],
  ["/ejemplo/guia-700.webp", "Plan", "Treinta días, con prioridades y costes.", "Captura del estudio de ejemplo: la guía con el plan"],
];

export const FAQ_ADS: { p: string; r: string }[] = [
  { p: "¿De verdad es gratis?", r: "Sí. Ni antes ni después, y sin tarjeta ni firmas." },
  { p: "¿Me vais a llamar para venderme algo?", r: "No. Trabajamos por escrito; si quieres hablar, nos escribes tú." },
  { p: "¿Cuánto tarda?", r: "Te escribimos en 48 horas laborables. Si podemos ayudarte, el estudio llega en menos de una semana." },
  { p: "¿Qué tengo que daros?", r: "Solo lo que contestes aquí. Lo demás se ve desde fuera: tu web, tu ficha, tus anuncios y tu competencia." },
  { p: "¿Hay permanencia?", r: "No. Una cuota fija al mes y te vas cuando quieras, con tus cuentas, tu web y tus contactos." },
];

const GARANTIAS = ["Sin compromiso", "Sin llamadas comerciales", "Sin pedirte accesos"];

// Los cuatro frentes, con su icono, en la portada.
const FRENTES_HERO: [string, React.ReactNode][] = [
  ["Web y diseño", <path key="a" d="M4 6h16v10H4zM2 19h20" />],
  ["SEO", <path key="b" d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21" />],
  ["Google Ads", <path key="c" d="M3 20 12 4l9 16M8 20a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />],
  ["Redes sociales", <path key="d" d="M4 5h16v11H9l-5 4zM12 13s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6z" />],
];

function Icono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
  );
}

export function HeroAds({ variante = "E" }: { variante?: "E" | "C" }) {
  return (
    <section className="relative overflow-hidden bg-noche pb-10 pt-[4.5rem] text-white sm:pb-16 sm:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
        <div className="profundo absolute inset-0"><VideoFondo nombre="constelaciones" alt="" prioridad /></div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-noche/80" />
      {/* Al terminar el test, el resultado ocupa todo el ancho: se esconde la columna del mensaje. */}
      <div className={`${ENVOLTORIO} relative grid items-start gap-7 lg:grid-cols-[1fr_1fr] lg:gap-12 [&:has([data-fase=fin])]:lg:grid-cols-1 [&:has([data-fase=fin])>div:first-child]:hidden`}>
        <div className="lg:pt-4">
          <p className="text-sm font-extrabold uppercase tracking-wide text-white/75">Agencia de marketing digital en Madrid</p>
          {variante === "C" ? (
            <>
              <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.1rem]">
                ¿Cuánta gente que te necesita hoy ni sabe que <Subrayado>existes</Subrayado>?
              </h1>
              <p className="mt-4 max-w-xl text-[1.45rem] font-extrabold leading-tight text-estrella sm:text-[1.9rem]">Todo tu marketing digital. Un solo equipo.</p>
            </>
          ) : (
            <>
              <h1 className="mt-3 font-extrabold leading-[1.05]">
            <span className="block whitespace-nowrap text-[1.7rem] min-[400px]:text-[1.85rem] sm:whitespace-normal sm:text-5xl lg:text-[3.25rem]">Todo tu marketing digital.</span>
            <span className="mt-1 block text-[2.5rem] text-estrella sm:text-6xl lg:text-[4rem]">Un solo equipo.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[1.45rem] font-extrabold leading-tight text-white sm:text-[1.9rem]">
            ¿Cuánta gente que te necesita hoy ni sabe que <Subrayado>existes</Subrayado>?
          </p>
            </>
          )}
          <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-4 gap-y-3">
            {FRENTES_HERO.map(([t, ico]) => (
              <li key={t} className="flex items-center gap-2.5 text-[1.05rem] font-extrabold"><Icono className="h-7 w-7 shrink-0 text-estrella">{ico}</Icono>{t}</li>
            ))}
          </ul>
          <ul className="mt-5 grid max-w-xl grid-cols-2 gap-3">
            <li className="rounded-2xl border border-white/25 bg-white/[0.07] px-3.5 py-3 sm:px-4">
              <Icono className="float-left mr-2.5 h-6 w-6 text-estrella"><path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14.5a6 6 0 0 1 3.5 5.5" /></Icono>
              <b className="block font-extrabold leading-6">Tu CRM</b><span className="mt-1 block clear-both text-sm leading-snug text-white/85">Cada contacto, con seguimiento.</span>
            </li>
            <li className="rounded-2xl border border-white/25 bg-white/[0.07] px-3.5 py-3 sm:px-4">
              <Icono className="float-left mr-2.5 h-6 w-6 text-estrella"><path d="M5 20v-6M12 20V9M19 20V4" /></Icono>
              <b className="block font-extrabold leading-6">Tu panel de control</b><span className="mt-1 block clear-both text-sm leading-snug text-white/85">Consultas, inversión y canales.</span>
            </li>
          </ul>
          <p className="mt-5 max-w-xl border-t border-white/20 pt-4 text-lg font-bold">Una persona que conoce tu proyecto y te atiende.</p>
          <Link href="#solicitud" className={`${BOTON} mt-4 w-full sm:w-auto`}>Quiero mi estudio gratuito</Link>
          <ul className="mt-4 flex max-w-xl flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-bold text-white/90 sm:justify-start">
            {GARANTIAS.map((g) => (
              <li key={g} className="flex items-center gap-1.5"><span aria-hidden="true" className="text-estrella">✓</span>{g}</li>
            ))}
          </ul>
          <p className="mt-1.5 max-w-xl text-center text-sm text-white/80 sm:text-left">Te respondemos por escrito en 48 horas laborables.</p>
        </div>
        <div id="solicitud" className="scroll-mt-20">
          <TestYa entregas landing={variante} />
        </div>
      </div>
    </section>
  );
}

export function LogosAds() {
  return (
    <section aria-label="Trabajos hechos" className="bg-white py-5">
      <div className={`${ENVOLTORIO} flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10`}>
        <p className="text-sm font-bold text-tinta/65">Ya funcionan con nosotros:</p>
        <div className="flex items-center gap-7 sm:gap-10">
          <a href="https://www.reformadisimo.es" target="_blank" rel="noopener"><Image src="/logos/reformadisimo.png" alt="Reformadísimo" width={687} height={187} className="h-7 w-auto sm:h-8" /></a>
          <a href="https://www.amscerramientos.es" target="_blank" rel="noopener"><Image src="/logos/ams.png" alt="AMS Cerramientos" width={640} height={214} className="h-7 w-auto sm:h-9" /></a>
          <a href="https://miestela.app" target="_blank" rel="noopener" className="flex items-center gap-2 text-base font-extrabold text-tinta">
            <Image src="/logos/mi-estela.png" alt="" width={240} height={240} className="h-7 w-7 rounded-lg sm:h-8 sm:w-8" />
            Mi Estela
          </a>
        </div>
      </div>
    </section>
  );
}

export function DoloresAds() {
  return (
    <section className="bg-niebla py-10 sm:py-20" aria-labelledby="dolores-ads">
      <div className={ENVOLTORIO}>
        <h2 id="dolores-ads" className="mx-auto max-w-5xl text-center text-[2rem] font-extrabold leading-[1.08] text-tinta sm:text-6xl">¿Pagas web, anuncios y redes y <span className="underline decoration-estrella decoration-[5px] underline-offset-[6px] sm:decoration-[7px]">no sabes si te traen clientes?</span></h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold text-tinta/80 sm:text-2xl">Revisamos el recorrido completo: desde el anuncio hasta la consulta y su seguimiento. Y si trabajamos juntos, lo coordinamos todo.</p>
        <ul className="mt-7 grid gap-2.5 sm:mt-10 lg:grid-cols-2 lg:gap-3">
          {DOLORES.map(([mal, bien]) => (
            <li key={mal} className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-tinta/10 sm:px-5 sm:py-4">
              <p className="flex items-start gap-2.5 font-bold text-tinta/60"><span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-xs font-extrabold text-rose-600">✕</span><span>{mal}</span></p>
              <p className="mt-1.5 flex items-start gap-2.5 text-[1.05rem] font-extrabold text-tinta"><span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs text-white">✓</span><span>{bien}</span></p>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center"><Link href="#solicitud" className={BOTON}>Quiero mi estudio gratuito</Link></div>
      </div>
    </section>
  );
}

export function VideoAds() {
  return (
    <section className="bg-noche py-10 text-white sm:py-16" aria-labelledby="video-ads">
      <div className={`${ENVOLTORIO} grid items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12`}>
        <div>
          <h2 id="video-ads" className="text-3xl font-extrabold sm:text-4xl">Te lo contamos <span className="text-estrella">en 30 segundos.</span></h2>
          <p className="mt-3 max-w-xl text-lg text-white/85">Qué solemos encontrar y cómo lo llevamos: un solo equipo y una sola persona que te atiende.</p>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none"><VideoPulsar titulo="¿Cuánta gente que te necesita ni sabe que existes?" /></div>
      </div>
    </section>
  );
}

export function RecibesAds() {
  return (
    <section className="bg-white py-10 sm:py-20" aria-labelledby="recibes-ads">
      <div className={ENVOLTORIO}>
        <h2 id="recibes-ads" className="max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">Esto recibirás <span className="tono2">en tu estudio gratuito.</span></h2>
        <ol className="mt-7 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {RECIBES.map(([src, t, d, alt], i) => (
            <li key={t} className="flex items-center gap-4 rounded-2xl bg-niebla p-3 ring-1 ring-tinta/10 sm:block sm:p-4">
              <ImagenAmpliable src={src} grande={src.replace("-700", "")} alt={alt} titulo={t} ancho={700} alto={438} sizes="(min-width: 640px) 360px, 112px" className="h-auto w-28 shrink-0 rounded-xl ring-1 ring-tinta/15 sm:w-full" />
              <div className="sm:mt-4">
                <b className="inline-block rounded-full bg-noche px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">{i + 1} · {t}</b>
                <span className="mt-1.5 block font-bold text-tinta">{d}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-tinta/60">Capturas de un estudio de ejemplo, de un despacho inventado. El tuyo se prepara con tu empresa, en menos de una semana si podemos ayudarte.</p>
      </div>
    </section>
  );
}

export function PrecioAds() {
  return (
    <section className="bg-noche py-10 text-white sm:py-16" aria-labelledby="precio-ads">
      <div className={`${ENVOLTORIO} grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-12`}>
        <div>
          <h2 id="precio-ads" className="text-3xl font-extrabold sm:text-4xl">Y si seguimos, <span className="text-estrella">una sola cuota.</span></h2>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Web, SEO, anuncios, redes y CRM por <b className="text-white">{PRECIO_CUOTA} + IVA al mes</b>. Por separado, a precios de mercado, de 4.000 a 4.800 €.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm font-bold">
            {["Sin permanencia", "Sin comisión sobre tus anuncios", "Tus cuentas, a tu nombre"].map((t) => (
              <li key={t} className="rounded-full bg-white/10 px-3.5 py-1.5 ring-1 ring-white/20">{t}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/60">Orientativo y sin IVA. La inversión en anuncios va aparte y la pagas tú directamente a Google o Meta. <Link href="/servicios#ahorro" className="font-bold text-white underline underline-offset-4">Ver el desglose, servicio a servicio</Link>.</p>
        </div>
        <Link href="#solicitud" className={BOTON}>Quiero mi estudio gratuito</Link>
      </div>
    </section>
  );
}

export function DudasAds() {
  return (
    <section className="bg-niebla py-10 sm:py-16" aria-labelledby="dudas-ads">
      <div className={`${ENVOLTORIO} max-w-3xl`}>
        <h2 id="dudas-ads" className="text-2xl font-extrabold text-tinta sm:text-3xl">Lo que nos preguntan</h2>
        <div className="mt-5 grid gap-2">
          {FAQ_ADS.map((f) => (
            <details key={f.p} className="group rounded-2xl bg-white px-4 py-3 ring-1 ring-tinta/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold text-tinta [&::-webkit-details-marker]:hidden">
                {f.p}
                <span aria-hidden="true" className="text-xl leading-none text-noche-3 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-tinta/75">{f.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
