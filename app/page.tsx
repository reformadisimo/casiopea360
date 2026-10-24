import Link from "next/link";
import Logo from "@/components/Logo";
import Constelacion from "@/components/Constelacion";
import VideoFondo from "@/components/VideoFondo";
import MovilParte from "@/components/MovilParte";
import Diagnostico from "@/components/Diagnostico";
import { DOLORES, ESTUDIO, FRENTES, OFICIOS, TRABAJOS, PASOS, PLAZOS, INFORMES, GARANTIAS, PREGUNTAS } from "@/lib/contenido";

const BOTON =
  "inline-flex items-center justify-center rounded-full bg-estrella px-7 py-3.5 text-base font-bold text-tinta transition-colors hover:bg-estrella-2";
const ENVOLTORIO = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const PROVEEDORES = [
  { quien: "SEO", que: "Posicionamiento en Google" },
  { quien: "SEM", que: "Anuncios de Google" },
  { quien: "Diseñador", que: "La imagen y la web" },
  { quien: "Programador", que: "Cambios y fallos" },
  { quien: "Redes sociales", que: "Instagram, Facebook" },
  { quien: "Analítica", que: "Informes, si los hay" },
];

export default function Inicio() {
  const trabajos = TRABAJOS.filter((t) => t.publicado);

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Saltar al contenido
      </a>

      {/* Cabecera */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className={`${ENVOLTORIO} flex items-center justify-between py-5`}>
          <Link href="/" aria-label="Casiopea 360, inicio">
            <Logo claro />
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-7 text-[0.95rem] font-bold text-white/85 md:flex">
            <a href="#que-hacemos" className="hover:text-white">Qué hacemos</a>
            <a href="#trabajos" className="hover:text-white">Trabajos</a>
            <a href="#como-trabajamos" className="hover:text-white">Cómo trabajamos</a>
            <a href="#preguntas" className="hover:text-white">Preguntas</a>
          </nav>
          <a href="#diagnostico" className="rounded-full bg-estrella px-4 py-2 text-sm font-bold text-tinta hover:bg-estrella-2 sm:px-5">
            Estudio gratuito
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* Héroe: la constelación */}
        <section className="relative overflow-hidden bg-noche pb-16 pt-28 text-white sm:pb-24 sm:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 12% 22%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 78% 14%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 64% 72%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 30% 82%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 90% 58%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 46% 40%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 6% 64%, #fff 50%, transparent 51%)",
            }}
          />
          <div className={`${ENVOLTORIO} relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]`}>
            <div>
              <h1 className="text-[2.6rem] font-extrabold sm:text-6xl">Todo tu marketing digital, con un solo equipo.</h1>
              <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
                Web, apps, Google, anuncios, redes y automatizaciones para tu empresa. Todo a tu nombre, y cada día sabes qué hemos hecho por tu negocio.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#diagnostico" className={BOTON}>Solicita tu estudio gratuito</a>
                <a href="#trabajos" className="inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-3.5 font-bold text-white hover:border-white">
                  Ver trabajos reales
                </a>
              </div>
            </div>
            <div className="mx-auto w-full max-w-xl px-2">
              <Constelacion />
              <p className="mt-4 text-center text-[0.95rem] text-white/60">Cinco frentes, un solo equipo.</p>
            </div>
          </div>
        </section>

        {/* El punto de dolor */}
        <section className={`${ENVOLTORIO} py-20 sm:py-28`}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">¿Cómo trabajas hoy?</h2>
          <p className="mt-5 max-w-2xl text-lg text-gris">
            Seguramente tienes una agencia para la web, un SEO, otra empresa para los anuncios, alguien para las redes… Cada uno a lo suyo. Una reunión con este, una llamada con el otro, otro correo más, y tú en medio, coordinando a todos y repitiendo lo mismo a cada uno.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-linea bg-niebla p-6 sm:p-8">
              <p className="font-titular text-2xl font-extrabold text-tinta">6 proveedores, 6 facturas, 6 conversaciones</p>
              <ul className="mt-6 divide-y divide-linea">
                {PROVEEDORES.map((p) => (
                  <li key={p.quien} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-bold">{p.quien}</span>
                    <span className="text-right text-gris">{p.que}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gris">
                Cada uno ve su trozo. Los informes no se hablan entre sí. Y cuando algo falla, cada uno mira al de al lado.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-noche p-6 text-white sm:p-8">
              <p className="font-titular text-2xl font-extrabold">1 equipo. Lo hacemos todo, tú solo decides.</p>
              <p className="mt-5 text-white/80">
                Una sola persona de contacto, una sola factura y todo conectado en el mismo informe. Casi todo por correo, con respuestas rápidas y sin reuniones que no hagan falta. Como lo vemos todo junto, lo que descubrimos en los datos se arregla en la web el mismo día.
              </p>
              <p className="mt-5 font-titular text-xl font-extrabold text-estrella">Ir de un proveedor a otro se acabó.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 px-2 py-4">
                  <p className="font-titular text-3xl font-extrabold text-estrella">1</p>
                  <p className="text-sm text-white/75">persona de contacto</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-2 py-4">
                  <p className="font-titular text-3xl font-extrabold text-estrella">1</p>
                  <p className="text-sm text-white/75">factura</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-2 py-4">
                  <p className="font-titular text-3xl font-extrabold text-estrella">1</p>
                  <p className="text-sm text-white/75">informe con todo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Puntos de dolor y soluciones */}
        <section className="bg-niebla py-20 sm:py-28">
          <div className={ENVOLTORIO}>
            <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">¿Te suena alguno?</h2>
            <p className="mt-5 max-w-2xl text-lg text-gris">Lo que nos cuentan directores y dueños de empresa, y lo que hacemos con ello.</p>
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {DOLORES.map((d) => (
                <li key={d.dolor} className="flex flex-col rounded-3xl bg-white p-6 sm:p-7">
                  <p className="font-titular text-xl font-extrabold leading-snug">«{d.dolor}»</p>
                  <div className="mt-5 flex gap-3 border-t border-linea pt-5">
                    <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-estrella shadow-[0_0_0_5px_rgba(255,197,61,0.25)]" />
                    <p className="text-gris"><span className="font-bold text-tinta">Lo arreglamos así: </span>{d.solucion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Banda de vídeo */}
        <section aria-label="Mientras tú atiendes tu negocio" className="relative h-[62vh] min-h-[380px] overflow-hidden bg-noche">
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3">
            <div className="relative h-full"><VideoFondo nombre="taller-hombre" alt="Un hombre trabaja en su taller" /></div>
            <div className="relative hidden h-full sm:block"><VideoFondo nombre="llamada-risa" alt="Un cliente habla por teléfono, sonriente" /></div>
            <div className="relative hidden h-full sm:block"><VideoFondo nombre="sonrisa-luces" alt="Una mujer sonríe mirando su móvil" /></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/40 to-transparent" />
          <div className={`${ENVOLTORIO} relative flex h-full items-end pb-12`}>
            <p className="max-w-3xl font-titular text-3xl font-extrabold text-white sm:text-5xl">
              Tú atiendes tu negocio. Nosotros, que el teléfono suene.
            </p>
          </div>
        </section>

        {/* Los oficios */}
        <section className={`${ENVOLTORIO} py-20 sm:py-28`}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Lo normal: veinticinco proveedores.</h2>
          <p className="mt-5 max-w-2xl text-lg text-gris">
            Una web que trae clientes necesita todos estos oficios trabajando a la vez. Lo normal es buscarlos por separado: cada uno con su plazo, su factura y su forma de trabajar. Un cambio puede tardar semanas, y nadie mira el conjunto.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {OFICIOS.map((o) => (
              <li key={o} className="rounded-full border border-dashed border-linea bg-white px-4 py-2 text-[0.95rem] text-gris">
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-12 grid items-center gap-8 rounded-3xl bg-noche p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-titular text-3xl font-extrabold sm:text-4xl">Con Casiopea 360, uno solo.</p>
              <p className="mt-3 max-w-2xl text-lg text-white/80">
                Todos esos oficios en un mismo equipo, con una sola persona de contacto. Y un compromiso: como máximo 48 horas para todo lo que nos pidas. Normalmente, mucho antes.
              </p>
            </div>
            <div className="text-center">
              <p className="font-titular text-7xl font-extrabold leading-none text-estrella">48 h</p>
              <p className="mt-2 text-sm text-white/70">como máximo, para todo</p>
            </div>
          </div>
        </section>

        {/* Los cinco frentes */}
        <section id="que-hacemos" className="scroll-mt-6 bg-niebla py-20 sm:py-28">
          <div className={ENVOLTORIO}>
            <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Qué hacemos: absolutamente todo lo digital.</h2>
            <p className="mt-5 max-w-2xl text-lg text-gris">
              Del dominio y el servidor a la última reseña. Tú no tienes que buscar a nadie más ni tocar nada.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {FRENTES.map((f) => (
                <article key={f.id} className="rounded-3xl bg-white p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-3 w-3 rounded-full bg-estrella shadow-[0_0_0_6px_rgba(255,197,61,0.25)]" />
                    <h3 className="text-2xl font-extrabold">{f.nombre}</h3>
                  </div>
                  <p className="mt-3 text-gris">{f.frase}</p>
                  <ul className="mt-5 space-y-2.5">
                    {f.servicios.map((s) => (
                      <li key={s} className="flex gap-3">
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-noche-3">
                          <path d="M2 8.5l4 3.5 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="flex flex-col justify-between rounded-3xl bg-noche p-6 text-white sm:p-7">
                <div>
                  <h3 className="text-2xl font-extrabold">Y lo único que no hacemos</h3>
                  <p className="mt-3 text-white/80">
                    Grabar vídeos profesionales. Te damos las ideas y el guion, y los montamos si nos los das. Para grabar, te ponemos en contacto con la agencia con la que trabajamos, y le pagas tú directamente.
                  </p>
                </div>
                <a href="#diagnostico" className={`${BOTON} mt-8 self-start`}>Cuéntanos tu caso</a>
              </article>
            </div>
          </div>
        </section>

        {/* Por qué existe Casiopea */}
        <section className="relative overflow-hidden bg-noche text-white">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[520px]">
              <VideoFondo nombre="arquitecto-mesa" alt="Un hombre trabaja en su mesa de diseño" />
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
              </div>
            </div>
          </div>
        </section>

        {/* Trabajos reales */}
        <section id="trabajos" className={`${ENVOLTORIO} scroll-mt-6 py-20 sm:py-28`}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Trabajos reales, funcionando hoy.</h2>
          <p className="mt-5 max-w-2xl text-lg text-gris">
            Lo construimos primero para nosotros. Lo que te ofrecemos ya trae clientes a nuestra propia empresa.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trabajos.map((t) => (
              <article key={t.nombre} className="flex flex-col rounded-3xl border border-linea p-6 sm:p-8">
                <p className="text-sm font-bold text-noche-3">{t.sector}</p>
                <h3 className="mt-2 text-3xl font-extrabold">{t.nombre}</h3>
                <p className="mt-4 flex-1 text-gris">{t.resumen}</p>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex w-fit items-center rounded-full border-2 border-noche px-5 py-2.5 font-bold text-noche hover:bg-noche hover:text-white"
                >
                  {t.enlaceTexto}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-gris">Más proyectos en construcción. Los enseñamos en cuanto sus dueños nos den permiso.</p>
        </section>

        {/* El parte diario */}
        <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-28">
          <div className="absolute inset-0 opacity-25">
            <VideoFondo nombre="mujer-movil" alt="" />
          </div>
          <div className="absolute inset-0 bg-noche/70" />
          <div className={`${ENVOLTORIO} relative grid items-center gap-14 lg:grid-cols-[1fr_auto]`}>
            <div>
              <h2 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">Cada día sabes qué hemos hecho por tu negocio.</h2>
              <p className="mt-5 max-w-xl text-lg text-white/80">
                Sin entrar en ninguna herramienta ni entender de números. Te llega un mensaje corto por WhatsApp, por correo o por Slack, como prefieras.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {INFORMES.map((i) => (
                  <div key={i.cuando} className="rounded-2xl border border-white/15 bg-white/5 p-5">
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
                Además, tienes un enlace propio donde ves todos tus resultados en tiempo real, cuando quieras. Y leemos cada conversación de tu asistente, todos los días: sabemos qué preocupa a tus clientes con sus propias palabras.
              </p>
            </div>
            <MovilParte />
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section id="como-trabajamos" className={`${ENVOLTORIO} scroll-mt-6 py-20 sm:py-28`}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Cómo trabajamos, paso a paso.</h2>
          <p className="mt-5 max-w-2xl text-lg text-gris">Casi todo por internet y por escrito. Sin reuniones que no hagan falta y dándote el menor trabajo posible.</p>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="border-t-2 border-noche pt-5">
                <p className="font-titular text-5xl font-extrabold text-estrella">{i + 1}</p>
                <h3 className="mt-2 text-xl font-extrabold">{p.titulo}</h3>
                <p className="mt-2 text-gris">{p.texto}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="overflow-hidden rounded-3xl">
              <div className="aspect-[16/10]"><VideoFondo nombre="hombre-sonriendo" alt="Un profesional sonríe en su oficina" /></div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold">Lo que pides, en 48 horas como máximo</h3>
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
              <p className="mt-4 text-sm text-gris">Lo que tarda Google en notarlo no depende de nosotros, y te lo decimos claro desde el principio. Y nada de «eso son 100 € más» por cada cambio.</p>
            </div>
          </div>
        </section>

        {/* Garantías */}
        <section className="bg-niebla py-20 sm:py-28">
          <div className={ENVOLTORIO}>
            <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Tu web es tuya. Y te quedas porque quieres.</h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {GARANTIAS.map((g) => (
                <div key={g.titulo} className="rounded-3xl bg-white p-6 sm:p-8">
                  <h3 className="text-2xl font-extrabold">{g.titulo}</h3>
                  <p className="mt-3 text-gris">{g.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className={`${ENVOLTORIO} scroll-mt-6 py-20 sm:py-28`}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Lo que nos suelen preguntar.</h2>
          <div className="mt-10 divide-y divide-linea border-y border-linea">
            {PREGUNTAS.map((q) => (
              <details key={q.p} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-bold">
                  {q.p}
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-niebla text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-gris">{q.r}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Qué incluye el estudio gratuito */}
        <section className={`${ENVOLTORIO} py-20 sm:py-28`}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Tu estudio gratuito, a medida.</h2>
          <p className="mt-5 max-w-2xl text-lg text-gris">
            Lo preparamos a mano, para tu empresa, con datos reales y fechados. Esto es lo que incluye.
          </p>
          <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {ESTUDIO.map((e) => (
              <li key={e.titulo} className="rounded-3xl border border-linea p-6">
                <span aria-hidden="true" className="block h-3 w-3 rounded-full bg-estrella shadow-[0_0_0_5px_rgba(255,197,61,0.25)]" />
                <h3 className="mt-4 text-xl font-extrabold">{e.titulo}</h3>
                <p className="mt-2 text-gris">{e.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Test de idoneidad */}
        <section id="diagnostico" className="scroll-mt-6 bg-noche py-20 text-white sm:py-28">
          <div className={`${ENVOLTORIO} grid gap-12 lg:grid-cols-[0.9fr_1.1fr]`}>
            <div>
              <h2 className="text-4xl font-extrabold sm:text-5xl">Solicita tu estudio gratuito.</h2>
              <p className="mt-5 text-lg text-white/80">
                Prepararlo es mucho trabajo, así que no lo hacemos a todo el mundo: solo a empresas a las que creemos que podemos ayudar de verdad y con las que podríamos acabar trabajando juntos.
              </p>
              <p className="mt-4 text-lg text-white/80">
                Cuéntanos un poco de tu empresa. Analizamos cada caso con calma y te escribimos siempre: si vemos que podemos ayudarte, para preparar tu estudio; y si creemos que no somos lo que necesitas, también, y te explicamos por qué.
              </p>
              <div className="mt-8 hidden overflow-hidden rounded-3xl lg:block">
                <div className="aspect-[16/10]"><VideoFondo nombre="llamada-sonrisa" alt="Un hombre sonríe mientras lee su móvil" /></div>
              </div>
            </div>
            <Diagnostico />
          </div>
        </section>
      </main>

      <footer className="bg-noche-2 py-10 text-white/70">
        <div className={`${ENVOLTORIO} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
          <Logo claro />
          <p className="text-sm">Marketing digital 360 para empresas, desde Madrid</p>
        </div>
      </footer>
    </>
  );
}
