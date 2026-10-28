import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, ENVOLTORIO, LlamadaFinal, Loseta } from "@/components/secciones";
import { COMPROMISOS, FICHA } from "@/lib/control";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Tu control: tus cuentas son tuyas",
  "Dominio, Google Ads, Analytics, ficha de Google y redes a tu nombre. Tú decides quién entra, tu dinero va entero a los anuncios y tus cuentas y tus contactos son siempre tuyos. No te pedimos tu facturación: solo una cifra aproximada.",
  "/tu-control",
);

const PREGUNTAS: [string, string][] = [
  ["¿A nombre de quién está tu dominio?", "Si no es el tuyo, no puedes decidir dónde vive tu web."],
  ["¿Eres administrador de tu cuenta de Google Ads?", "Si solo eres un usuario más, otro puede cerrarla o quedarse con el historial."],
  ["¿Quién cobra la comisión sobre tu publicidad?", "Tu dinero de anuncios debería ir entero a los anuncios."],
  ["¿Puedes llevarte tu web?", "Con sus textos, sus fotos, sus formularios y su código."],
  ["¿Tienes tus contactos?", "Quién ha pedido información y qué compró es tuyo, no de quien lo guarda."],
];

export default function TuControl() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Tu control", ruta: "/tu-control" }])} />
      <CabeceraPagina
        titulo="Tus cuentas son tuyas. Tú mandas."
        clave="tuyas"
        entradilla="Tu dominio y tus cuentas de Google tienen que estar a tu nombre. No queremos atarte: queremos que te quedes porque te servimos, no porque no puedas irte. Y no te pedimos tu facturación: solo una cifra."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Tu control" }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className={ENVOLTORIO}>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Siete compromisos</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Esto es lo que te prometemos. Y solo esto.</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            A muchos negocios les pasa que su web, su dominio o su cuenta de anuncios están a nombre de otra persona. Y eso da miedo a la hora de cambiar. Aquí es al revés: el jefe eres tú.
          </p>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {COMPROMISOS.map((c, i) => (
              <li key={c.titulo} className="rounded-[1.8rem] bg-niebla p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <Loseta icono={c.icono} i={i} />
                  <span className="text-sm font-extrabold uppercase tracking-wide text-gris">Compromiso {i + 1}</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold leading-snug">{c.titulo}</h3>
                <p className="mt-2 text-gris">{c.largo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-niebla py-20 sm:py-24">
        <div className={ENVOLTORIO}>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Un ejemplo</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Así queda tu ficha de cuentas</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">Es un ejemplo inventado, para que veas cómo se ve. La tuya la tienes siempre a mano y la mantenemos al día.</p>
          <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-linea">
            <div className="hidden grid-cols-[1fr_1.1fr_1fr] gap-3 bg-noche px-5 py-4 text-sm font-extrabold text-white sm:grid sm:px-7">
              <span>Cuenta</span>
              <span>Cómo debe quedar</span>
              <span className="text-estrella">Quién tiene acceso</span>
            </div>
            {FICHA.map(([cuenta, queda, acceso]) => (
              <div key={cuenta} className="grid gap-1 border-t border-linea px-5 py-4 first:border-t-0 sm:grid-cols-[1fr_1.1fr_1fr] sm:gap-3 sm:px-7">
                <b>{cuenta}</b>
                <span className="text-gris"><b className="block text-xs font-extrabold uppercase tracking-wide text-gris sm:hidden">Cómo debe quedar</b>{queda}</span>
                <span><b className="block text-xs font-extrabold uppercase tracking-wide text-gris sm:hidden">Quién tiene acceso</b>{acceso}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="una-cifra" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className={ENVOLTORIO}>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Tu facturación es tuya</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">No necesitamos saber cuánto facturas. Y no te lo vamos a preguntar.</h2>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            Nos da igual que factures un millón o cien mil. Lo que sí ayuda a que tus anuncios mejoren es saber si los contactos de una campaña acaban siendo clientes de 100 y los de otra, clientes de 1.000. Para eso no hace falta ver ni un euro: basta un índice.
          </p>
          <div className="mt-10 rounded-[1.8rem] border-2 border-estrella bg-estrella/20 p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold sm:text-3xl">No te pedimos tu facturación. Solo una cifra.</h3>
            <p className="mt-3 max-w-3xl text-lg text-gris">Muchos piden la facturación; nosotros no la necesitamos. Esto es lo que sí y lo que no.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.4rem] bg-white p-5">
                <p className="text-sm font-extrabold uppercase tracking-wide text-gris">Lo que no te pedimos</p>
                <p className="mt-2">Ni tu facturación, ni tus balances, ni tus cuentas, ni tus márgenes. Ningún papel.</p>
              </div>
              <div className="rounded-[1.4rem] bg-white p-5">
                <p className="text-sm font-extrabold uppercase tracking-wide text-gris">Lo que sí te pedimos</p>
                <p className="mt-2">Una cifra aproximada: el importe medio que te deja cada cliente. Por ejemplo, «más o menos unos 4.000 euros por cliente». Vale a ojo, no hace falta que sea exacta y la puedes cambiar cuando quieras.</p>
              </div>
              <div className="rounded-[1.4rem] bg-white p-5">
                <p className="text-sm font-extrabold uppercase tracking-wide text-gris">Por qué importa</p>
                <p className="mt-2">No es lo mismo un cliente de 5.000 € que uno de 20.000 €. Si cada cliente te deja más, podemos permitirnos pagar más por cada contacto y llegar a más gente. Si te deja menos, hay que vigilar cada euro todavía más de cerca.</p>
              </div>
              <div className="rounded-[1.4rem] bg-white p-5">
                <p className="text-sm font-extrabold uppercase tracking-wide text-gris">Para qué la usamos</p>
                <p className="mt-2">Para decidir cuánto puede costar un contacto sin que tu negocio deje de ser rentable y qué campañas priorizar. Para nada más. Es una estimación para ajustar campañas, no una garantía de resultados.</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-lg font-bold">Solo la sabes tú, y tú mandas siempre sobre ella.</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["Tu ticket medio, una vez", "En tu panel pones, a ojo, lo que te deja de media cada cliente. Se guarda solo en tu dispositivo. Si quieres que ajustemos lo que puede costar un contacto, nos la dices tú; si no, no la vemos."],
              ["Marcas quién firma", "Y, si quieres, apuntas lo que ha facturado. Si no quieres poner la cifra, eliges un tamaño: más pequeño de lo normal, normal, más grande o mucho más grande."],
              ["El panel calcula el índice", "100 es tu ticket medio. 150 es un cliente un 50 % más grande que tu media. 60, un 40 % más pequeño. Además, un percentil del 1 al 100: dónde queda ese cliente entre los tuyos."],
              ["Nosotros solo vemos eso, y solo si tú quieres", "Si el contacto firmó, su índice y su percentil, y por qué campaña llegó. Nunca euros de facturación, y tu cifra media solo si tú nos la dices. Está apagado de serie y lo apagas cuando quieras."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-[1.6rem] bg-niebla p-6">
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-estrella text-lg font-extrabold text-tinta">{i + 1}</span>
                <h3 className="mt-3 text-xl font-extrabold">{t}</h3>
                <p className="mt-2 text-gris">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl rounded-[1.6rem] bg-estrella/25 p-6 text-lg">
            <b>Un ejemplo con números inventados:</b> tu ticket medio son 100. Un cliente te deja 180: su índice es 180. Nosotros solo vemos 180. No sabemos cuánto es en euros, y tampoco lo necesitamos.
          </p>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            <b className="text-tinta">¿Para qué lo queremos?</b> Para mover el dinero de los anuncios hacia las campañas, los anuncios y las zonas que traen tus mejores clientes. Si prefieres clientes más grandes o más pequeños este mes, también nos lo puedes decir y adaptamos las campañas. Y todo lo que te contemos será en porcentajes y en índices, nunca en euros de tu facturación.
          </p>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            <b className="text-tinta">Lo mismo con el tiempo que tardas en llamar.</b> Es tuyo y no te lo vamos a preguntar cada día. Pero si nos lo compartes, podemos decirte, por ejemplo, que una campaña no funciona porque se tarda tres días en llamar a los contactos y los estudios sobre contactos coinciden en que cuanto antes se llama, más se convierte. Por eso, donde hay citas, una confirmación automática por WhatsApp o SMS es otra forma de contestar al momento.
          </p>
          <Link prefetch={false} href="/panel" className={`${BOTON} mt-8 inline-flex`}>Probarlo en el panel de ejemplo</Link>
        </div>
      </section>

      <section className="bg-noche py-20 text-white sm:py-24">
        <div className={ENVOLTORIO}>
          <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Compruébalo hoy</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Cinco preguntas que puedes hacer a quien lleve tu marketing</h2>
          <p className="mt-5 max-w-3xl text-lg text-white/80">Sirven con cualquiera, también con nosotros. Si alguna respuesta no te gusta, ahora ya sabes por qué preguntarlo.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {PREGUNTAS.map(([p, d], i) => (
              <li key={p} className="rounded-[1.6rem] bg-white/[0.07] p-6 ring-1 ring-white/15">
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-estrella text-lg font-extrabold text-tinta">{i + 1}</span>
                <p className="mt-3 text-xl font-extrabold">{p}</p>
                <p className="mt-2 text-white/80">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-lg text-white/85">
            Lo contamos con calma en un artículo.{" "}
            <Link prefetch={false} href="/blog/si-tu-web-no-esta-a-tu-nombre-no-es-tuya" className="font-bold text-estrella underline underline-offset-4">¿Está tu web realmente bajo tu control?</Link>.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={`${ENVOLTORIO} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="max-w-2xl text-lg text-gris">
            ¿Y si algún día quieres irte? Puedes salir con calma: a los tres meses y sin pagar nada, si no has visto que mejoramos; o más adelante, pagando solo la parte de la web que falte. Tus cuentas y tus contactos te los llevas siempre.
          </p>
          <Link prefetch={false} href="/miedo-al-cambio" className={BOTON}>Ver cómo es la salida</Link>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
