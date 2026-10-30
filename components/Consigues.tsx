import Link from "next/link";
import { ChipIcono, Etiqueta, Nebulosa } from "@/components/Vida";
import { BOTON, BOTON_CLARO, ENVOLTORIO } from "@/components/secciones";
import { PIEZAS, PIEZAS_RESUMEN, type Pieza } from "@/lib/consigues";

/* Captura dentro de una «ventana de navegador», para que se vea que es una web de verdad. */
export function Ventana({ src, alt, movil, color, prioridad = false }: { src: string; alt: string; movil?: string; color: string; prioridad?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2.4rem] opacity-40 blur-2xl" style={{ background: color }} aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.4rem] bg-white shadow-[0_30px_60px_-30px_rgba(14,26,61,0.6)] ring-1 ring-black/10">
        <div className="flex h-8 items-center gap-1.5 border-b border-black/5 bg-[#f4f5f8] px-3" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-4 flex-1 rounded-md bg-white ring-1 ring-black/5" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={1400} height={875} loading={prioridad ? "eager" : "lazy"} decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
      </div>
      {movil && (
        <div className="absolute -bottom-6 -right-3 w-[27%] overflow-hidden rounded-[1.2rem] border-[5px] border-tinta bg-tinta shadow-[0_24px_40px_-20px_rgba(0,0,0,0.7)] sm:-right-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={movil} alt="" width={600} height={1299} loading="lazy" decoding="async" className="block aspect-[9/16] w-full object-cover object-top" />
        </div>
      )}
    </div>
  );
}

/* Una pieza completa: número grande, captura, frase y botón. Alterna izquierda y derecha. */
function PiezaGrande({ p, k }: { p: Pieza; k: number }) {
  const par = k % 2 === 1;
  return (
    <article id={p.id} className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={par ? "lg:order-2" : ""}>
        <Ventana src={p.captura} alt={`${p.titulo}: captura del ejemplo`} movil={p.movil} color={p.color} prioridad={k === 0} />
      </div>
      <div className={`${par ? "lg:order-1" : ""} ${p.movil ? "mt-8 lg:mt-0" : ""}`}>
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold text-white shadow-lg" style={{ background: p.color }}>{p.n}</span>
          <ChipIcono icono={p.icono} i={k} tam="h-12 w-12" />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{p.titulo}</h2>
        <p className="mt-3 text-xl font-bold text-noche-3">{p.frase}</p>
        <p className="mt-3 max-w-xl text-lg text-gris">{p.detalle}</p>
        <a href={p.href} target="_blank" rel="noopener" className={`${BOTON} mt-6 min-h-12`}>
          {p.ver} ↗
        </a>
      </div>
    </article>
  );
}

/* Página entera: /lo-que-consigues */
export function ConsiguesCompleto() {
  return (
    <>
      <section className="relative overflow-hidden bg-niebla py-16 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative grid gap-20 sm:gap-28`}>
          {PIEZAS.map((p, k) => (
            <PiezaGrande key={p.id} p={p} k={k} />
          ))}
        </div>
      </section>
      <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-24">
        <Nebulosa oscura variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta tono="estrella" icono="regalo">Si podemos ayudarte, esto es lo que recibes</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl">Todo esto, gratis y sin ningún compromiso. En menos de una semana.</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            No es una propuesta de lo que haríamos: es trabajo hecho, de varias personas, para tu empresa. Nos comprometemos a enviártelo en menos de una semana desde que hacemos tu estudio; lo normal es que lo tengas en tres días. El test no es un examen: nos sirve para ver dónde podemos aportarte más. Hacemos pocos estudios a la vez y los revisamos uno a uno, por pura cuestión de tiempo. Lo que has visto es de un despacho inventado, Fuero Abogados, para que puedas tocarlo todo; el tuyo sería con tu negocio, tu competencia y tus clientes. La guía te la puedes descargar en PDF; el resto lo ves en un enlace privado durante un mes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/test" className={BOTON}>Hacer el test de idoneidad (5 min)</Link>
            <Link href="/estudio-gratuito" className={BOTON_CLARO}>Cómo funciona el estudio</Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* Galería compacta para el test y el estudio: 6 capturas en tarjetas, cada una abre su ejemplo. */
export function ConsiguesGaleria({ claro = false }: { claro?: boolean }) {
  return (
    <div className="mt-8">
      <p className={`text-sm font-extrabold uppercase tracking-wider ${claro ? "text-noche-3" : "text-estrella"}`}>Un ejemplo real de lo que te llevas</p>
      <p className={`mt-1 text-lg font-extrabold ${claro ? "text-tinta" : "text-white"}`}>Toca cualquiera y ábrelo.</p>
      <ul className="mt-5 grid grid-cols-2 gap-3">
        {PIEZAS_RESUMEN.map((p, k) => (
          <li key={p.id}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              className={`group block overflow-hidden rounded-2xl ring-1 transition-transform hover:-translate-y-1 ${claro ? "bg-white ring-linea hover:ring-noche" : "bg-white/[0.07] ring-white/15 hover:bg-white/[0.12]"}`}
            >
              <span className="relative block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.captura} alt="" width={700} height={438} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
                <span aria-hidden="true" className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-lg text-sm font-extrabold text-white shadow" style={{ background: p.color }}>{p.n}</span>
              </span>
              <span className="block p-3">
                <span className={`block text-[0.95rem] font-extrabold leading-snug ${claro ? "text-tinta" : "text-white"}`}>{p.corto}</span>
                <span className={`mt-1 block text-xs font-bold underline underline-offset-2 ${claro ? "text-noche-3" : "text-estrella"}`}>Ver ejemplo ↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <Link href="/lo-que-consigues" className={`mt-4 inline-flex min-h-11 items-center font-bold underline decoration-estrella decoration-2 underline-offset-4 ${claro ? "text-tinta" : "text-white"}`}>
        Ver el ejemplo completo, cosa por cosa →
      </Link>
    </div>
  );
}
