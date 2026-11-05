import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, ENVOLTORIO, LlamadaFinal, Loseta } from "@/components/secciones";
import { CHEQUEO, COMPROMISOS, FICHA } from "@/lib/control";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";
import { Bocadillo, CajaIdea, ChipIcono, Etiqueta, Nebulosa, TarjetaViva } from "@/components/Vida";

export const metadata = meta(
  "Tú tienes el control de todo, siempre",
  "Tus cuentas, a tu nombre y pagadas con tu tarjeta: dominio, correo, Google Ads, Meta, Analytics, ficha de Google y redes. Tu web, con copia completa. Tus contactos, tuyos. Nosotros solo somos invitados y te vas cuando quieras, con todo lo tuyo.",
  "/tu-control",
);

// Lo que pasa muchas veces en el sector, sin nombrar a nadie (3-nov-2026).
const PROBLEMA: [string, string][] = [
  ["llave", "No puedes entrar ni en tu propia cuenta de Google Ads."],
  ["pagina", "Tu web no es tuya, o no tienes copia."],
  ["grafica", "Tus anuncios y su historial se quedan donde estaban."],
  ["euro", "Te cobran por devolverte lo que ya era tuyo."],
];

// Nuestra regla (Ig, 5-nov-2026): nunca tenemos el control, ni damos de alta las cuentas; guiamos.
const REGLA: [string, string, string][] = [
  ["llave", "No damos de alta tus cuentas", "Las abres tú, con tu correo y tu tarjeta. Nosotros no las abrimos a nuestro nombre ni a medias."],
  ["mano", "Te guiamos paso a paso", "Es más fácil de lo que parece. Te decimos qué abrir, dónde y en qué orden, y lo revisamos contigo."],
  ["escudo", "Si quieres que las lleve otro, no es con nosotros", "Si prefieres que seamos nosotros los dueños de tus cuentas, no podemos trabajar juntos. Es una condición, no una preferencia."],
];

const PASOS_TICKET: [string, string, string][] = [
  ["euro", "Tu ticket medio, una vez", "Lo pones a ojo en tu panel y se guarda en tu dispositivo. Solo lo vemos si nos lo das."],
  ["firma", "Marcas quién firma", "Y, si quieres, lo que facturó. O sin cifra: más pequeño, normal, más grande o mucho más grande."],
  ["grafica", "El panel calcula el índice", "100 es tu ticket medio; 150, un cliente un 50 % más grande. Y un percentil del 1 al 100."],
  ["ojo", "Nosotros solo vemos eso, y solo si tú quieres", "Si firmó, su índice y por qué campaña llegó. Nunca euros. Apagado de serie."],
];

export default function TuControl() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Tú tienes el control", ruta: "/tu-control" }])} />
      <CabeceraPagina
        ejemplo
        titulo="Tú tienes el control de todo. Siempre."
        clave="Siempre."
        entradilla="Tus cuentas, tu web y tus contactos son tuyos. Nosotros solo somos invitados, y te vas cuando quieras con todo lo tuyo."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Tú tienes el control" }]}
      />

      <section className="relative overflow-hidden bg-niebla py-16 sm:py-20">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="bombilla">El problema</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">«Quise cambiar de proveedor y no podía entrar ni en mis cuentas.»</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            <b className="text-tinta">Pasa mucho:</b> las cuentas del negocio se abren a nombre de quien lo lleva. Y el día que quieres irte:
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROBLEMA.map(([ic, t], k) => (
              <li key={t} className="flex items-center gap-4 rounded-[1.4rem] bg-white p-5 ring-1 ring-linea">
                <ChipIcono icono={ic} i={k} />
                <span className="min-w-0 text-lg font-extrabold">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-lg text-gris">
            Por eso muchos negocios no cambian aunque no estén contentos: <b className="text-tinta">por miedo a perderlo todo.</b>
          </p>
          <Bocadillo className="mt-5 max-w-3xl">Aquí no trabajamos así. Con nadie.</Bocadillo>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
        <Nebulosa oscura variante={1} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta tono="estrella" icono="escudo">Nuestra regla</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Nunca tendremos el control de tus cuentas.</h2>
          <p className="mt-5 max-w-3xl text-lg text-white/85">
            <b className="text-white">No es una oferta: es una condición para trabajar contigo.</b> Solo trabajamos con quien quiere tener el control de todo, y no aceptamos clientes que prefieran que las cuentas las tengamos nosotros.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {REGLA.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} claro chip={`${i + 1} de 3`} />
            ))}
          </ol>
          <div className="mt-8 rounded-[1.8rem] border-2 border-estrella bg-estrella/15 p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Al principio da algo de pereza. Y merece la pena.</h3>
            <p className="mt-3 max-w-3xl text-lg text-white/85">
              Abrir y ordenar tus cuentas lleva desde media hora hasta uno o dos días, según cuántas tengas. Te acompañamos en cada paso. Es muy poco comparado con el día en que quieras cambiar de proveedor y tengas que pedir permiso, o casi perdón, para entrar en lo que es tuyo.
            </p>
            <p className="mt-3 max-w-3xl text-lg text-white/85">
              Vale para todo: cuentas de anuncios, redes, correo, web, y también para cada artículo del blog y cada página que publiquemos. Todo queda en tus manos.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="firma">Ocho compromisos</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Cómo trabajamos nosotros</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            <b className="text-tinta">El jefe eres tú.</b> Preferimos clientes que se quedan porque quieren, no porque no pueden irse.
          </p>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {COMPROMISOS.map((c, i) => (
              <TarjetaViva
                key={c.titulo}
                icono={c.icono}
                i={i}
                titulo={c.titulo}
                chip={`Compromiso ${i + 1}`}
                className="bg-niebla ring-0 [&>h3]:text-2xl"
                hijo={
                  <ul className="grid gap-1.5 text-gris">
                    {c.puntos.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 font-extrabold text-noche-3">✓</span>
                        <span className="min-w-0">{x}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="lista">Un ejemplo</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Así queda tu inventario de cuentas</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">Un ejemplo inventado. La tuya la tienes siempre a mano y al día.</p>
          <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-linea">
            <div className="hidden grid-cols-[1fr_1.1fr_1fr] gap-3 bg-noche px-5 py-4 text-sm font-extrabold text-white sm:grid sm:px-7">
              <span>Cuenta</span>
              <span>Cómo debe quedar</span>
              <span className="text-estrella">Quién tiene acceso</span>
            </div>
            {FICHA.map(([cuenta, queda, acceso, icono], i) => (
              <div key={cuenta} className="grid gap-1 border-t border-linea px-5 py-4 first:border-t-0 sm:grid-cols-[1fr_1.1fr_1fr] sm:gap-3 sm:px-7">
                <span className="flex items-center gap-3 font-extrabold">
                  <ChipIcono icono={icono} i={i} tam="h-9 w-9" />
                  <span className="min-w-0">{cuenta}</span>
                </span>
                <span className="text-gris"><b className="block text-xs font-extrabold uppercase tracking-wide text-gris sm:hidden">Cómo debe quedar</b>{queda}</span>
                <span><b className="block text-xs font-extrabold uppercase tracking-wide text-gris sm:hidden">Quién tiene acceso</b>{acceso}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="una-cifra" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="escudo">Tu facturación es tuya</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">No necesitamos saber cuánto facturas. Y no te lo vamos a preguntar.</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            <b className="text-tinta">Basta un índice:</b> saber si una campaña trae clientes de 100 y otra, de 1.000. Sin ver ni un euro.
          </p>
          <div className="mt-10 rounded-[1.8rem] border-2 border-estrella bg-estrella/20 p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-extrabold sm:text-3xl">
              <ChipIcono icono="candado" i={1} />
              <span className="min-w-0">No te pedimos tu facturación. Te pedimos dos números.</span>
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gris">
              Ni balances ni documentos de tu empresa. <b className="text-tinta">Solo dos datos, y son importantísimos.</b>
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.4rem] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Loseta icono="crm" i={0} />
                  <p className="grid h-9 w-9 place-items-center rounded-full bg-estrella text-lg font-extrabold">1</p>
                </div>
                <p className="mt-3 text-xl font-extrabold">Cuántos contactos acaban siendo clientes</p>
                <p className="mt-2 text-gris">Solo el número o un porcentaje, sin importes. En un mensaje corto, cada semana o cada mes.</p>
                <CajaIdea t="Un ejemplo" icono="bombilla" className="mt-4">
                  1.000 euros, 10 contactos: 100 euros cada uno. Si firman 2, cada cliente cuesta 500. Eso solo lo sabes tú.
                </CajaIdea>
              </div>
              <div className="rounded-[1.4rem] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Loseta icono="euro" i={1} />
                  <p className="grid h-9 w-9 place-items-center rounded-full bg-estrella text-lg font-extrabold">2</p>
                </div>
                <p className="mt-3 text-xl font-extrabold">El importe medio aproximado por cliente</p>
                <p className="mt-2 text-gris">Vale una estimación, y la puedes cambiar cuando quieras.</p>
                <CajaIdea t="Por qué importa" icono="diana" className="mt-4">
                  Un cliente de 5.000 euros no es uno de 20.000. Eso decide cuánto pagar por cada contacto.
                </CajaIdea>
              </div>
            </div>
            <p className="mt-6 flex max-w-3xl items-start gap-3 text-lg">
              <ChipIcono icono="escudo" i={2} tam="h-9 w-9" className="mt-0.5" />
              <span className="min-w-0"><b>Solo para ajustar las campañas.</b> No es una promesa de resultados. Y estos datos los conoces solo tú.</span>
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {PASOS_TICKET.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i + 2} titulo={t} texto={d} chip={`Paso ${i + 1}`} className="bg-niebla ring-0" />
            ))}
          </ol>
          <CajaIdea t="Un ejemplo con números inventados" icono="grafica" className="mt-8 max-w-3xl">
            Tu ticket medio son 100. Un cliente te deja 180: su índice es 180. <b>Vemos ese 180, nunca los euros.</b>
          </CajaIdea>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <TarjetaViva como="div" icono="diana" i={0} titulo="¿Para qué lo queremos?" texto="Para llevar el presupuesto a las campañas y zonas que traen tus mejores clientes. Siempre en índices." />
            <TarjetaViva como="div" icono="reloj" i={1} titulo="Lo mismo con el tiempo que tardas en llamar" texto="Si lo compartes, vemos si una campaña falla porque se tarda en llamar. Cuanto antes, más se convierte." />
          </div>
          <Link prefetch={false} href="/panel" className={`${BOTON} mt-8 inline-flex`}>Probarlo en el panel de ejemplo</Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
        <Nebulosa oscura variante={3} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta tono="estrella" icono="chat">Compruébalo hoy</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">¿Tienes tú el control? Revisa estas 10 cosas</h2>
          <p className="mt-5 max-w-3xl text-lg text-white/80">Sirven con cualquiera, también con nosotros. Si alguna respuesta no te gusta, ya sabes dónde mirar.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {CHEQUEO.map(([ic, p, d], i) => (
              <TarjetaViva key={p} icono={ic} i={i} titulo={p} texto={d} claro chip={`${i + 1} de 10`} />
            ))}
          </ol>
          <p className="mt-10 text-lg text-white/85">
            Lo contamos con calma en un artículo.{" "}
            <Link prefetch={false} href="/blog/si-tu-web-no-esta-a-tu-nombre-no-es-tuya" className="font-bold text-estrella underline underline-offset-4">¿Tienes tú el control de tu marketing? Revisa estas 10 cosas</Link>.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex max-w-2xl items-start gap-4">
            <Loseta icono="mano" i={3} className="mt-1" />
            <div className="min-w-0 text-lg text-gris">
              <p className="font-extrabold text-tinta">¿Y si quieres irte? Cuando quieras, sin pedirnos permiso.</p>
              <ul className="mt-2 grid gap-1.5">
                {[
                  ["A los tres meses:", "sin pagar nada, si no hemos mejorado los indicadores que fijamos contigo al empezar."],
                  ["Más adelante:", "pagando solo la parte de la web que falte."],
                  ["Siempre:", "te llevas tus cuentas, tus contactos y la copia de tu web."],
                ].map(([b, r]) => (
                  <li key={b} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-0.5 font-extrabold text-noche-3">✓</span>
                    <span><b className="text-tinta">{b}</b> {r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link prefetch={false} href="/miedo-al-cambio" className={`${BOTON} shrink-0`}>Ver cómo es la salida</Link>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
