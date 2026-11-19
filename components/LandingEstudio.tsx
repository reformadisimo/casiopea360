import Link from "next/link";
import VideoAlClic from "@/components/VideoAlClic";
import VideoFondo from "@/components/VideoFondo";
import Subrayado from "@/components/Subrayado";
import { Nebulosa, Etiqueta } from "@/components/Vida";
import { ENVOLTORIO } from "@/components/secciones";

const BOTON =
  "boton-brillo inline-flex items-center justify-center rounded-full bg-estrella px-7 py-3.5 text-base font-bold text-tinta transition-colors hover:bg-estrella-2";

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
          <Etiqueta tono="estrella">Estudio gratuito · Sin compromiso</Etiqueta>
          <h1 className="mt-5 text-4xl font-extrabold sm:text-6xl">
            ¿Tu web no te trae <Subrayado>clientes</Subrayado>?
          </h1>
          <p className="mt-5 max-w-xl text-xl text-white/85">
            Haz un test de 5 minutos. Si podemos ayudarte, te preparamos <b className="text-white">tu estudio gratis</b>: qué falla, qué haríamos y cuánto costaría. Sin compromiso y sin darnos ningún acceso.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="#solicitud" className={BOTON}>Haz el test gratis (5 minutos)</Link>
            <span className="text-sm text-white/70">Te escribimos siempre. Sin llamadas comerciales.</span>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/85">
            <li>Una sola persona te atiende</li>
            <li>Cuentas a tu nombre</li>
            <li>Anuncios sin comisión</li>
            <li>Sin permanencia</li>
          </ul>
        </div>
        <VideoAlClic
          id="vDNia2X3YpY"
          titulo="Casiopea 360: tu marketing digital, al máximo nivel"
          etiqueta="Vídeo generado con inteligencia artificial."
        />
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
  ["4. Decides tú", "Sin compromiso. Si no sigues, el estudio es tuyo igualmente."],
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
