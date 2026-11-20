import { ImagenAmpliable } from "@/components/ImagenAmpliable";
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import { CONTACTO } from "@/lib/contenido";
import VideoHero from "@/components/VideoHero";
import VideoFondo from "@/components/VideoFondo";
import BotonBarraTest from "@/components/BotonBarraTest";
import Subrayado from "@/components/Subrayado";
import { Nebulosa, Etiqueta } from "@/components/Vida";
import { ENVOLTORIO } from "@/components/secciones";

// Vídeo largo (2:24) en YouTube, el que se abre con «Ver el vídeo completo».
const ID_VIDEO_LARGO = "SviXZNrk9FU";

const BOTON =
  "boton-brillo inline-flex items-center justify-center rounded-full bg-estrella px-7 py-3.5 text-base font-bold text-tinta transition-colors hover:bg-estrella-2";

// Portada: tres entregables con una captura real del estudio de ejemplo (despacho inventado) cada uno.
const MUESTRA: [string, string, string, string][] = [
  ["/ejemplo/mejoras-700.webp", "Tu web a examen", "Revisamos la velocidad y los fallos que pueden impedir que te contacten.", "Captura del estudio de ejemplo: lo que falla en la web actual"],
  ["/ejemplo/web-portada-700.webp", "Tu web rediseñada", "Mira cómo podría quedar antes de decidir si contratas.", "Captura del estudio de ejemplo: la web rediseñada"],
  ["/ejemplo/guia-700.webp", "Tu plan de 30 días", "Ten claro qué cambiaríamos primero y por qué.", "Captura del estudio de ejemplo: la guía con el plan"],
];

// Lo que incluye el estudio, sin prometer nada que exija accesos del cliente: lo que depende de sus cifras va como estimación.
const INCLUYE: [string, string][] = [
  ["Entiende qué mejorar en tu web", "Test de velocidad en el móvil y fallos que pueden impedir que te contacten."],
  ["Mira cómo te encuentran en Google y las IA", "Cómo te encuentran y si las IA te recomiendan."],
  ["Mira cómo se anuncian otros negocios de tu zona", "Cómo se anuncia en Google y en redes."],
  ["Ve una propuesta antes de decidir", "Rediseño completo de muestra, para que lo veas."],
  ["Ve cómo podrían ser tus anuncios", "Ejemplos de lo que anunciaríamos para ti."],
  ["Sigue a cada contacto hasta que es cliente", "El recorrido de cada contacto, correo a correo, hasta que es cliente."],
  ["Ten claro por dónde empezar", "Qué cambiaríamos primero y por qué, en orden."],
  ["Conoce el coste antes de decidir", "Compara la cuota fija con el coste por separado antes de decidir."],
];
const ADEMAS: string[] = [
  "Tu CRM y tu panel de ejemplo, con tus contactos y tus cifras",
  "Tu ficha de Google y tus reseñas, repasadas",
  "Una muestra de asistente con IA para tu web",
  "Ideas de contenido para tres meses",
  "Cómo cambiar de web sin perder lo que ya tienes en Google",
  "Qué cuentas hacen falta, siempre a tu nombre",
  "Cómo trabajaríamos contigo, por escrito y sin reuniones",
];

function Tic() {
  return (
    <span aria-hidden className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
    </span>
  );
}

// La prueba: la nota real de esta página en PageSpeed (medida el 20-nov-2026). Solo vale mientras la página no cambie: si se toca, volver a medir.
const NOTAS_HERO: [string, string][] = [["100", "Rendimiento"], ["100", "Accesibilidad"], ["100", "Prácticas recomendadas"], ["100", "SEO"]];

export function HeroLanding() {
  return (
    <section className="relative overflow-hidden bg-noche pb-12 pt-20 text-white sm:pb-20 sm:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="profundo absolute inset-0"><VideoFondo nombre="constelaciones" alt="" prioridad /></div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noche/95 via-noche/70 to-noche/30" />
      <div className={`${ENVOLTORIO} relative grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14`}>
        <div>
          <Etiqueta tono="estrella">Predicamos con el ejemplo</Etiqueta>
          <p className="mt-3 text-sm font-bold text-white/75">Agencia de marketing digital en Madrid</p>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3rem]">
            Cuatro 100 en nuestra web. Descubre qué mejorar en tu <Subrayado>marketing</Subrayado>.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            <b className="text-white">Pide tu estudio gratuito.</b> Revisamos tu web, cómo te encuentran y cómo se anuncia tu competencia.
          </p>
          <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">Te enseñamos qué cambiaríamos, cómo podría quedar y cuánto costaría.</p>
          <div className="mt-6">
            <Link href="#solicitud" className={`${BOTON} w-full px-9 py-3.5 text-lg sm:w-auto`}>Quiero mi estudio gratuito</Link>
            <p className="mt-3 text-sm font-semibold text-white/85">Sin compromiso. Sin llamadas comerciales. Sin pedirte accesos.</p>
          </div>
          <p className="mt-6 max-w-xl border-l-2 border-estrella pl-4 text-sm text-white/75">
            Son tres toques y tus datos. Te contestamos por escrito en 48 horas laborables y, si podemos ayudarte, tu estudio llega en menos de una semana.
          </p>
        </div>

        <figure>
          <div className="overflow-hidden rounded-[1.75rem] bg-white text-tinta shadow-2xl ring-1 ring-white/20">
            <div className="flex items-center gap-2 border-b border-tinta/10 bg-niebla px-4 py-2.5 text-xs font-bold text-tinta/70">
              <span aria-hidden className="flex gap-1"><i className="h-2.5 w-2.5 rounded-full bg-tinta/20" /><i className="h-2.5 w-2.5 rounded-full bg-tinta/20" /><i className="h-2.5 w-2.5 rounded-full bg-tinta/20" /></span>
              pagespeed.web.dev · casiopea360.es/estudio-gratuito
            </div>
            <p className="px-5 pt-5 text-lg font-extrabold leading-tight sm:px-6 sm:text-xl">Esta página, medida con PageSpeed Insights.</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-5 sm:grid-cols-4 sm:p-6">
              {NOTAS_HERO.map(([n, t]) => (
                <div key={t} className="text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-[5px] border-emerald-500 bg-emerald-50 text-xl font-extrabold text-emerald-700 sm:h-[4.5rem] sm:w-[4.5rem]">{n}</div>
                  <p className="mt-2 text-xs font-bold leading-tight text-tinta/75">{t}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-tinta/10 px-5 py-4 sm:px-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-extrabold text-emerald-800"><span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-500" />3/3 en navegación para IA</p>
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-white/75">
            Medición real de esta misma página, el 20 de noviembre de 2026, en móvil y en ordenador. Puedes{" "}
            <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.casiopea360.es%2Festudio-gratuito&form_factor=mobile" target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-estrella underline-offset-4">repetirla tú</a>: las notas varían un poco en cada medición. Mide la página, no los resultados de tus anuncios.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// Justo después de la prueba: lo que verá el visitante en SU negocio.
export function SeccionMuestras() {
  return (
    <section id="muestras" className="scroll-mt-24 bg-niebla py-14 sm:py-20">
      <div className={ENVOLTORIO}>
        <div className="mx-auto max-w-5xl">
          <Etiqueta>Ahora, tu negocio</Etiqueta>
          <h2 className="mt-4 text-3xl font-extrabold text-tinta sm:text-4xl">Aplicamos esa misma exigencia a tu web, tus anuncios y el resto de tu marketing.</h2>
          <p className="mt-3 text-lg text-tinta/75">Empezamos enseñándote qué mejoraríamos y por qué. Así se ve un estudio:</p>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {MUESTRA.map(([src, t, d, alt], i) => (
              <li key={t} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-tinta/10 sm:p-5">
                <ImagenAmpliable src={src} grande={src.replace("-700", "")} alt={alt} titulo={t} ancho={700} alto={438} sizes="(min-width: 768px) 320px, 90vw" className="h-auto w-full rounded-xl ring-1 ring-tinta/15" />
                <span className="mt-4 block text-sm font-extrabold text-[#9a6700]">0{i + 1}</span>
                <b className="block text-xl font-extrabold leading-tight text-tinta">{t}</b>
                <span className="mt-1 block text-tinta/70">{d}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-tinta/60">Páginas de un estudio de ejemplo, de un despacho inventado. El tuyo se prepara con tu empresa.</p>
          <Link href="#solicitud" className={`${BOTON} mt-6 w-full py-4 text-lg sm:w-auto sm:px-9`}>Quiero mi estudio gratuito</Link>
        </div>
      </div>
    </section>
  );
}

export function SeccionIncluye() {
  return (
    <section id="incluye" className="scroll-mt-24 bg-niebla py-14 sm:py-20">
      <div className={ENVOLTORIO}>
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-tinta/10 sm:p-10">
          <Etiqueta>Esto es lo que incluye tu estudio gratuito</Etiqueta>
          <h2 className="mt-4 text-3xl font-extrabold text-tinta sm:text-4xl">Descubre qué falla, cómo podría quedar y qué haríamos primero.</h2>
          <p className="mt-3 text-lg text-tinta/75">Un estudio preparado para tu empresa, con análisis, ejemplos que se ven y un plan.</p>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {INCLUYE.map(([t, d]) => (
              <li key={t} className="flex items-start gap-3.5">
                <Tic />
                <span>
                  <b className="block text-xl font-extrabold leading-tight text-tinta">{t}</b>
                  <span className="mt-1 block text-tinta/70">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <details className="group mt-8 border-t border-tinta/10 pt-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-extrabold text-tinta [&::-webkit-details-marker]:hidden">
              Y además, todo esto
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <ul className="mt-5 grid gap-x-10 gap-y-3 text-tinta/80 sm:grid-cols-2">
              {ADEMAS.map((t) => (
                <li key={t} className="flex items-start gap-2.5"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-estrella" />{t}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-tinta/60">Según tu caso: no todas las empresas necesitan lo mismo.</p>
          </details>
          <div className="mt-8 rounded-2xl bg-niebla p-5">
            <b className="block text-lg font-extrabold text-tinta">Sin compromiso y sin pedirte accesos.</b>
            <p className="mt-1 text-tinta/75">Se hace con el test y con lo que es público de tu web. Lo que depende de tus cifras va como estimación, y te lo decimos.</p>
            <b className="mt-4 block text-lg font-extrabold text-tinta">¿Por qué preparáis este estudio gratis?</b>
            <p className="mt-1 text-tinta/75">Para que puedas valorar cómo trabajaríamos en tu empresa antes de contratar. Pedirlo no te compromete a nada.</p>
            <b className="mt-4 block text-lg font-extrabold text-tinta">¿Para quién es?</b>
            <p className="mt-1 text-tinta/75">Para empresas que ya tienen clientes y ya invierten en marketing (agencia, anuncios, SEO, redactores…), y quieren que rinda más. Contestamos a todo el mundo en 48 horas laborables; si vemos que no podemos ayudarte, te lo decimos y no preparamos el estudio.</p>
          </div>
          <Link href="#solicitud" className={`${BOTON} mt-6 w-full py-4 text-lg`}>Quiero mi estudio gratuito</Link>
          <p className="mt-4 text-center text-sm text-tinta/70">
            Una cuota fija, la misma para cualquier tamaño:{" "}
            <Link href="#ahorro" className="font-bold text-noche-3 underline underline-offset-4">mira qué incluye y cuánto pagarías por separado</Link>.{" "}
            Y mira{" "}
            <Link href="#ejemplos" className="font-bold text-noche-3 underline underline-offset-4">lo que ya hemos hecho</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

// La prueba: la nota real de esta página en PageSpeed (medida el 20-nov-2026). Solo vale mientras la página no cambie: si se toca, volver a medir.
const NOTAS_PS: [string, string][] = [["100", "Rendimiento"], ["100", "Accesibilidad"], ["100", "Prácticas recomendadas"], ["100", "SEO"]];
export function SeccionPruebaVelocidad() {
  return (
    <section id="velocidad" className="scroll-mt-24 bg-niebla pb-14 sm:pb-20">
      <div className={ENVOLTORIO}>
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-[2rem] bg-noche p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Etiqueta tono="estrella">Lo medimos primero en la nuestra</Etiqueta>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">¿Tu web saca estos resultados?</h2>
            <p className="mt-3 text-lg text-white/85">Si va lenta, falla en el móvil o las IA no la entienden, hay clientes que no llegan a contactarte.</p>
            <p className="mt-3 text-white/75">En tu estudio la medimos igual y te enseñamos qué cambiar primero.</p>
            <a href="#solicitud" className={`${BOTON} mt-6 w-full py-4 text-lg sm:w-auto sm:px-8`}>Quiero mi estudio gratuito</a>
          </div>
          <figure>
            <div className="overflow-hidden rounded-2xl bg-white text-tinta shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 border-b border-tinta/10 bg-niebla px-4 py-2.5 text-xs font-bold text-tinta/70">
                <span aria-hidden className="flex gap-1"><i className="h-2.5 w-2.5 rounded-full bg-tinta/20" /><i className="h-2.5 w-2.5 rounded-full bg-tinta/20" /><i className="h-2.5 w-2.5 rounded-full bg-tinta/20" /></span>
                pagespeed.web.dev · casiopea360.es/estudio-gratuito
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-5 sm:grid-cols-4 sm:p-6">
                {NOTAS_PS.map(([n, t]) => (
                  <div key={t} className="text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-[5px] border-emerald-500 bg-emerald-50 text-xl font-extrabold text-emerald-700 sm:h-[4.5rem] sm:w-[4.5rem]">{n}</div>
                    <p className="mt-2 text-xs font-bold leading-tight text-tinta/75">{t}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-tinta/10 px-5 py-4 sm:px-6">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-extrabold text-emerald-800"><span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-500" />3/3 en navegación para IA</p>
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-white/70">
              Medición real de esta misma página, el 20 de noviembre de 2026, en móvil y en ordenador. Puedes{" "}
              <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.casiopea360.es%2Festudio-gratuito&form_factor=mobile" target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-estrella underline-offset-4">repetirla tú</a>: las notas varían un poco en cada medición.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

// El vídeo del presentador, que antes iba en la portada: ahora la portada enseña el estudio.
export function SeccionVideo() {
  return (
    <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-24">
      <Nebulosa oscura variante={2} />
      <div className={`${ENVOLTORIO} relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]`}>
        <div>
          <Etiqueta tono="estrella">En 41 segundos</Etiqueta>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Un solo equipo para todo tu marketing.</h2>
          <ul className="mt-6 space-y-2.5 text-lg font-semibold text-white/85">
            <li>Una sola persona te atiende</li>
            <li>Tus cuentas, a tu nombre y bajo tu control</li>
            <li>Anuncios sin comisión</li>
            <li>Sin permanencia</li>
          </ul>
          <Link href="#solicitud" className={`${BOTON} mt-8`}>Quiero mi estudio gratuito</Link>
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
          <Link href="#solicitud" className={BOTON}>Quiero mi estudio gratuito</Link>
        </div>
      </div>
    </section>
  );
}

const PASOS: [string, string][] = [
  ["1. Haz el test", "Tres toques y tus datos. Sin darnos accesos ni contraseñas."],
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
          <Link href="#solicitud" className={BOTON}>Quiero mi estudio gratuito</Link>
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
        <Link href="/" aria-label="casiopea360, inicio" className="shrink-0"><Logo claro fundido chico /></Link>
        <div className="flex items-center gap-3">
          <a href={`https://wa.me/${CONTACTO.whatsapp}`} target="_blank" rel="noopener" className="hidden text-sm font-bold text-white/85 hover:text-white sm:inline">WhatsApp</a>
          <BotonBarraTest />
        </div>
      </div>
    </div>
  );
}

/* Franja de confianza justo bajo la portada (20-nov-2026): trabajos reales, con enlace a «Trabajo hecho». Sin cifras ni testimonios. */
export function FranjaConfianza() {
  return (
    <section aria-label="Trabajos hechos" className="bg-white py-6 sm:py-7">
      <div className={`${ENVOLTORIO} flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10`}>
        <p className="text-center text-sm font-bold text-tinta/65 sm:text-left">Webs y herramientas que ya funcionan:</p>
        <Link href="#ejemplos" className="flex items-center gap-8 sm:gap-10" aria-label="Ver el trabajo hecho para Reformadísimo, AMS Cerramientos y Mi Estela">
          <Image src="/logos/reformadisimo.png" alt="Reformadísimo" width={687} height={187} className="h-7 w-auto sm:h-8" />
          <Image src="/logos/ams.png" alt="AMS Cerramientos" width={640} height={214} className="h-7 w-auto sm:h-9" />
          <span className="flex items-center gap-2 text-base font-extrabold text-tinta">
            <Image src="/logos/mi-estela.png" alt="" width={240} height={240} className="h-7 w-7 rounded-lg sm:h-8 sm:w-8" />
            Mi Estela
          </span>
        </Link>
      </div>
    </section>
  );
}
