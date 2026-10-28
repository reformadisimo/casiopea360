import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, ENVOLTORIO, LlamadaFinal, Loseta } from "@/components/secciones";
import { COMPROMISOS, FICHA } from "@/lib/control";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";
import { Bocadillo, CajaIdea, ChipIcono, Etiqueta, Nebulosa, TarjetaViva } from "@/components/Vida";

export const metadata = meta(
  "Tu control: tus cuentas son tuyas",
  "Dominio, Google Ads, Analytics, ficha de Google y redes a tu nombre. Tú decides quién entra, tu dinero va entero a los anuncios y tus cuentas y tus contactos son siempre tuyos. No te pedimos tu facturación: te pedimos dos números.",
  "/tu-control",
);

const PREGUNTAS: [string, string, string][] = [
  ["globo", "¿A nombre de quién está tu dominio?", "Si no es el tuyo, no puedes decidir dónde vive tu web."],
  ["llave", "¿Eres administrador de tu cuenta de Google Ads?", "Si solo eres un usuario más, otro puede cerrarla o quedarse con el historial."],
  ["euro", "¿Quién cobra la comisión sobre tu publicidad?", "Tu dinero de anuncios debería ir entero a los anuncios."],
  ["pagina", "¿Puedes llevarte tu web?", "Con sus textos, sus fotos, sus formularios y su código."],
  ["crm", "¿Tienes tus contactos?", "Quién ha pedido información y qué compró es tuyo, no de quien lo guarda."],
];

const PASOS_TICKET: [string, string, string][] = [
  ["euro", "Tu ticket medio, una vez", "En tu panel pones, a ojo, lo que te deja de media cada cliente. Se guarda en tu dispositivo. Solo la vemos si nos la das para ajustar el coste por contacto."],
  ["firma", "Marcas quién firma", "Y, si quieres, apuntas lo que ha facturado. Sin cifra, eliges un tamaño: más pequeño de lo normal, normal, más grande o mucho más grande."],
  ["grafica", "El panel calcula el índice", "100 es tu ticket medio; 150, un cliente un 50 % más grande; 60, un 40 % más pequeño. Y un percentil del 1 al 100: dónde queda ese cliente entre los tuyos."],
  ["ojo", "Nosotros solo vemos eso, y solo si tú quieres", "Si firmó, su índice, su percentil y por qué campaña llegó. Nunca euros; tu ticket medio, solo si nos lo dices. Apagado de serie; lo apagas cuando quieras."],
];

export default function TuControl() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Tu control", ruta: "/tu-control" }])} />
      <CabeceraPagina
        titulo="Tus cuentas son tuyas. Tú mandas."
        clave="tuyas"
        entradilla="Tu dominio y tus cuentas, a tu nombre. Que te quedes porque te servimos, no porque no puedas irte. Y no te pedimos tu facturación: te pedimos dos números."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Tu control" }]}
      />

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="firma">Siete compromisos</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Esto es lo que te prometemos. Y solo esto.</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            En muchos negocios, la web, el dominio o la cuenta de anuncios están a nombre de otro. Y eso da miedo a la hora de cambiar.
          </p>
          <Bocadillo className="mt-5 max-w-3xl">Aquí es al revés: el jefe eres tú.</Bocadillo>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {COMPROMISOS.map((c, i) => (
              <TarjetaViva key={c.titulo} icono={c.icono} i={i} titulo={c.titulo} texto={c.largo} chip={`Compromiso ${i + 1}`} className="bg-niebla ring-0 [&>h3]:text-2xl" />
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="lista">Un ejemplo</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Así queda tu ficha de cuentas</h2>
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
            Nos da igual que factures un millón o cien mil. Lo que mejora tus anuncios es saber si una campaña trae clientes de 100 y otra, de 1.000. Para eso no hace falta ver ni un euro: basta un índice.
          </p>
          <div className="mt-10 rounded-[1.8rem] border-2 border-estrella bg-estrella/20 p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-extrabold sm:text-3xl">
              <ChipIcono icono="candado" i={1} />
              <span className="min-w-0">No te pedimos tu facturación. Te pedimos dos números.</span>
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gris">
              No pedimos facturación, ni balances, ni cuentas, ni ningún documento de tu empresa. Lo que sí necesitamos son dos datos tuyos, y son importantísimos.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.4rem] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Loseta icono="crm" i={0} />
                  <p className="grid h-9 w-9 place-items-center rounded-full bg-estrella text-lg font-extrabold">1</p>
                </div>
                <p className="mt-3 text-xl font-extrabold">Cuántos contactos acaban siendo clientes</p>
                <p className="mt-2 text-gris">Solo el número, o un porcentaje aproximado. Sin importes. Nos lo cuentas en un mensaje corto cada semana o cada mes.</p>
                <CajaIdea t="Un ejemplo" icono="bombilla" className="mt-4">
                  Invertimos 1.000 euros y llegan 10 contactos. Sabemos que cada contacto cuesta 100 euros, pero desde fuera no vemos si se convirtieron en clientes. Si firman 2, cada cliente cuesta 500 euros.
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
                  No es lo mismo que los contactos traigan clientes de 5.000 euros que de 20.000. Eso decide cuánto podemos pagar por cada contacto.
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
            Tu ticket medio son 100. Un cliente te deja 180: su índice es 180. Nosotros solo vemos ese 180, no cuántos euros son. Ni lo necesitamos.
          </CajaIdea>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <TarjetaViva como="div" icono="diana" i={0} titulo="¿Para qué lo queremos?" texto="Para llevar el presupuesto a las campañas y zonas que traen tus mejores clientes, o más grandes o pequeños si lo prefieres. Siempre en índices, nunca en euros." />
            <TarjetaViva como="div" icono="reloj" i={1} titulo="Lo mismo con el tiempo que tardas en llamar" texto="Es tuyo y no te lo preguntamos cada día. Si lo compartes, vemos si una campaña falla porque se tarda tres días en llamar: cuanto antes, más se convierte." />
          </div>
          <Link prefetch={false} href="/panel" className={`${BOTON} mt-8 inline-flex`}>Probarlo en el panel de ejemplo</Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
        <Nebulosa oscura variante={3} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta tono="estrella" icono="chat">Compruébalo hoy</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Cinco preguntas que puedes hacer a quien lleve tu marketing</h2>
          <p className="mt-5 max-w-3xl text-lg text-white/80">Sirven con cualquiera, también con nosotros. Si alguna respuesta no te gusta, ya sabes dónde mirar.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {PREGUNTAS.map(([ic, p, d], i) => (
              <TarjetaViva key={p} icono={ic} i={i} titulo={p} texto={d} claro chip={`Pregunta ${i + 1}`} />
            ))}
          </ol>
          <p className="mt-10 text-lg text-white/85">
            Lo contamos con calma en un artículo.{" "}
            <Link prefetch={false} href="/blog/si-tu-web-no-esta-a-tu-nombre-no-es-tuya" className="font-bold text-estrella underline underline-offset-4">¿Está tu web realmente bajo tu control?</Link>.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex max-w-2xl items-start gap-4">
            <Loseta icono="mano" i={3} className="mt-1" />
            <p className="text-lg text-gris">
              ¿Y si quieres irte? A los tres meses, sin pagar nada si no has visto que mejoramos; más adelante, pagando solo la parte de la web que falte. Tus cuentas y tus contactos te los llevas siempre.
            </p>
          </div>
          <Link prefetch={false} href="/miedo-al-cambio" className={`${BOTON} shrink-0`}>Ver cómo es la salida</Link>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
