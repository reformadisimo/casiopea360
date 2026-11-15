import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import MiniPantalla from "@/components/MiniPantalla";
import { BOTON, ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaFaqArticulo, schemaMigas } from "@/lib/schema";
import { Bocadillo, ChipIcono, Etiqueta, ListaViva, Nebulosa, TarjetaViva } from "@/components/Vida";

// Sesión de altas acompañada y ayuda en remoto (Ig, 15-nov-2026).
// Reglas: las cuentas se abren CONTIGO, nunca por ti; contraseñas, tarjeta, códigos e identidad los teclea el cliente.
// Sin precio (pendiente de Ig), sin nombres de herramientas y sin garantías.
export const metadata = meta(
  "Te ayudamos si te atascas: abrimos tus cuentas contigo",
  "Si te atascas abriendo las cuentas de Google, la ficha o las redes, primero te guiamos por escrito; si no sale, nos conectamos contigo delante y quedan a tu nombre.",
  "/ayuda-en-remoto",
);

// La escalera: de menos a más. Nunca teléfono ni videollamada; la conexión es el último escalón y solo con permiso.
const ESCALERA: [string, string, string, string][] = [
  ["pagina", "Tú nos mandas una captura", "Te atascas, haces una captura de lo que ves y nos la mandas por correo. Es lo más rápido y no hace falta explicar nada.", "Casi siempre basta con esto"],
  ["lista", "Te decimos qué tocar", "Te contestamos por escrito con tu captura marcada: pulsa aquí, escribe esto, elige lo otro. Lo haces tú y sigues.", "Si no sale a la primera, lo repetimos"],
  ["mano", "Si no sale, nos conectamos", "Solo con tu permiso y solo para terminar ese paso. Estás delante, ves todo y cortas cuando quieras.", "El último recurso, no el primero"],
];

const TITULARES: { icono: string; t: string; puntos: string[] }[] = [
  { icono: "reloj", t: "Solo el rato que haga falta", puntos: ["Un paso suelto, o una sesión de 60 a 90 minutos si prefieres dejarlo todo hecho.", "Tú en tu ordenador, nosotros conectados.", "Con cita previa y por correo."] },
  { icono: "ojo", t: "Tú miras, nosotros conducimos", puntos: ["Movemos el ratón y rellenamos los formularios.", "Te vamos contando qué hacemos y por qué.", "Si algo no te convence, lo paramos."] },
  { icono: "llave", t: "Las cuentas son tuyas desde el primer minuto", puntos: ["A tu nombre y con tus datos.", "Nosotros entramos después, como invitados.", "Nos quitas con un clic cuando quieras."] },
  { icono: "mano", t: "Lo delicado lo tecleas tú", puntos: ["Las contraseñas las escribes tú: ni te las pedimos ni las guardamos.", "La tarjeta la pones tú, con tu mano.", "Los códigos del móvil y tu identidad, también tú."] },
  { icono: "escudo", t: "Contigo, y no por ti", puntos: ["Google y Meta desconfían de las cuentas que se abren desde otro sitio, y pueden bloquearlas.", "Desde tu ordenador y contigo delante, la cuenta nace a tu nombre de verdad.", "Y así sabes dónde está cada cosa."] },
  { icono: "check", t: "Al terminar, cerramos la puerta", puntos: ["La conexión la cortas tú al acabar.", "No queda nada preparado para volver a entrar otro día.", "Te mandamos la lista de lo que se ha abierto."] },
];

const PASOS: [string, string, string][] = [
  ["lista", "Te mandamos una lista corta", "Lo que conviene tener a mano: tu ordenador, tu móvil, tu correo y tus datos. Nada más."],
  ["calendario", "Quedamos un día y una hora", "Siempre por correo, con tu visto bueno. Nunca te llamamos por sorpresa ni hacemos videollamada."],
  ["herramienta", "Nos conectamos, contigo delante", "Con un código de un solo uso que generas tú. Ves en tu pantalla todo lo que hacemos."],
  ["mano", "En lo delicado, soltamos el ratón", "Contraseña, tarjeta, código del móvil o DNI: decimos «tuyo» y lo tecleas tú."],
  ["llave", "Nos invitas y cerramos", "Nos añades como invitados en cada cuenta, cortas la conexión y te llega el inventario."],
];

const TUYO = [
  "Tus contraseñas: las escribes tú, con los puntos puestos.",
  "Tu tarjeta: la tecleas tú. No nos la dictas ni la apuntamos.",
  "Los códigos que llegan a tu móvil.",
  "Tu DNI o la foto que pida la plataforma.",
];

const SERIA: [string, string, string][] = [
  ["calendario", "La pides tú, o la acordamos por escrito", "Con día y hora. Quien te llama de improviso para entrar en tu ordenador no es de fiar."],
  ["ojo", "Estás delante todo el rato", "Ves cada movimiento. Si te levantas, paramos."],
  ["escudo", "El banco no se abre", "Ni la web ni la aplicación de tu banco, nunca. Antes de empezar cierras todo lo privado."],
  ["mano", "Cortas tú cuando quieras", "Te enseñamos cómo al empezar, y lo pruebas una vez."],
  ["check", "Una sesión, una cita", "La conexión no se repite sola. Si hace falta otra, se acuerda de nuevo."],
];

// Lo que aceptas antes de empezar. Texto llano; pendiente de revisión por los abogados de Ig.
const ACEPTAS: { icono: string; t: string; puntos: string[] }[] = [
  { icono: "check", t: "Qué vamos a hacer", puntos: ["Conectarnos a tu ordenador el día y a la hora acordados, una sola vez.", "Abrir contigo las cuentas que hayamos acordado por escrito.", "Dejarlas todas a tu nombre y con tus datos."] },
  { icono: "escudo", t: "Qué no vamos a hacer", puntos: ["No pedimos ni guardamos tus contraseñas.", "No tecleamos ni apuntamos tu tarjeta, ni hacemos ningún pago.", "No abrimos tu banco, tu correo personal ni tus archivos.", "No grabamos la sesión."] },
  { icono: "mano", t: "Lo que haces tú", puntos: ["Estás delante toda la sesión.", "Tecleas contraseñas, tarjeta, códigos del móvil y datos de identidad.", "Al final nos añades como invitados en cada cuenta."] },
  { icono: "llave", t: "Lo que puedes hacer siempre", puntos: ["Parar la sesión cuando quieras, sin dar explicaciones.", "Quitarnos el acceso a cualquier cuenta, con un clic.", "Pedirnos que lo hagamos solo viendo tu pantalla, sin tocar nada."] },
];

const EXPERIENCIA: [string, string, string][] = [
  ["reloj", "Un atasco pequeño para semanas", "Lo hemos visto muchas veces: falta una cuenta, y todo lo demás espera."],
  ["cohete", "Nosotros no esperamos", "Si algo te cuesta, no te mandamos otro recordatorio: quedamos y lo resolvemos."],
  ["sonrisa", "Tú, a lo tuyo", "Lo que a ti te llevaría varias tardes y un dolor de cabeza, juntos sale en una."],
];

const PREGUNTAS: { icono: string; p: string; r: string }[] = [
  { icono: "llave", p: "¿Veis mis contraseñas?", r: "No te las pedimos ni las guardamos. Las tecleas tú, y en ese momento soltamos el ratón. Te pedimos también que no abras el gestor de contraseñas durante la sesión." },
  { icono: "escudo", p: "¿Podéis entrar otro día en mi ordenador?", r: "No. Entramos con un código de un solo uso que generas tú, y la conexión se acaba cuando la cortas. Para otra sesión hace falta otra cita y otro código." },
  { icono: "lista", p: "¿Qué necesito tener a mano?", r: "Tu ordenador con internet, tu móvil con cobertura, el correo que vamos a usar, tu DNI y los datos de tu empresa. Y la tarjeta, solo si se abre una cuenta de anuncios." },
  { icono: "reloj", p: "¿Queda todo terminado en la sesión?", r: "Las cuentas quedan abiertas. Alguna verificación, como la de la ficha de Google, la decide la plataforma y puede tardar unos días; te lo dejamos apuntado." },
  { icono: "ojo", p: "¿Y si Google o Meta bloquean una cuenta?", r: "Puede pasar con cuentas nuevas, y no depende de nosotros. No se abre otra para esquivarlo: seguimos contigo el recurso que da la plataforma, con tu identidad." },
  { icono: "mano", p: "¿Y si prefiero hacerlo yo?", r: "También vale. Te damos los pasos en orden, con el enlace de cada cuenta, y con una al día vas bien. Si te atascas, nos mandas una captura." },
  { icono: "telefono", p: "¿Por qué no lo hacemos por teléfono o por videollamada?", r: "Porque por escrito queda todo apuntado, tú vas a tu ritmo y nadie te llama por sorpresa. Una captura con unas flechas dice más que diez minutos al teléfono." },
];

export default function AyudaEnRemoto() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Te ayudamos en remoto", ruta: "/ayuda-en-remoto" }])} />
      <DatosEstructurados datos={schemaFaqArticulo(PREGUNTAS.map(({ p, r }) => ({ p, r })))} />
      <CabeceraPagina
        titulo="¿Te atascas abriendo cuentas? Lo resolvemos contigo, sin parar el proyecto."
        clave="contigo,"
        entradilla="Google, la ficha de tu empresa, el dominio, Facebook, Instagram, LinkedIn. Son muchas y siempre falta un código. Primero te guiamos por escrito; si no sale, nos conectamos a tu ordenador con tu permiso y lo terminamos contigo delante."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Te ayudamos en remoto" }]}
        video="mano-pantalla"
        videoAlt="Una mano toca una pantalla llena de datos"
      />

      <section id="escalera" className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={3} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="lista">Cómo te ayudamos</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Primero lo fácil. Si no sale, lo hacemos contigo.</h2>
          <p className="mt-4 max-w-3xl text-lg text-gris">
            <b className="text-tinta">Todo por escrito: ni llamadas ni videollamadas.</b> Vamos de menos a más, y la conexión a tu ordenador es el último escalón.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {ESCALERA.map(([ic, t, d, nota], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={`${d} ${nota}.`} chip={`Paso ${i + 1}`} />
            ))}
          </ol>
          <Bocadillo className="mt-8 max-w-3xl">Contraseñas, tarjeta, códigos del móvil y datos de identidad los tecleas tú en todos los pasos. Nosotros nunca los pedimos.</Bocadillo>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="mano">Si hace falta conectarnos</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Cuando la captura no basta, nos conectamos.</h2>
          <p className="mt-4 max-w-3xl text-lg text-gris">
            <b className="text-tinta">Abrir las cuentas es lo que más frena un proyecto.</b> No es difícil, pero son muchas, cada una pide algo distinto y nadie te dice el orden. Si prefieres dejarlas todas hechas de una vez, o un paso se resiste, lo hacemos juntos.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TITULARES.map((x, i) => (
              <div key={x.t} className="rounded-[1.8rem] border border-tinta/10 bg-niebla p-6">
                <h3 className="flex items-center gap-3 text-xl font-extrabold">
                  <ChipIcono icono={x.icono} i={i} tam="h-10 w-10" />
                  <span className="min-w-0">{x.t}</span>
                </h3>
                <ListaViva items={x.puntos} className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="cohete">Por nuestra experiencia</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">No somos de frenarnos. Somos de avanzar.</h2>
          <p className="mt-4 max-w-3xl text-lg text-gris">
            <b className="text-tinta">Casi todo el mundo se atasca en lo mismo, y es normal.</b> Lo que no es normal es que tu proyecto se quede parado por eso. Si te da dolor de cabeza, lo hacemos juntos.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {EXPERIENCIA.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} />
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
        <Nebulosa oscura variante={1} />
        <div className={`${ENVOLTORIO} relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <Etiqueta tono="estrella" icono="llave">Lo delicado</Etiqueta>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Esto lo tecleas tú. Siempre.</h2>
            <p className="mt-4 text-lg text-white/85">
              <b className="text-white">Nunca nos mandes una contraseña.</b> Ni por correo, ni por WhatsApp, ni durante la sesión. No la necesitamos.
            </p>
            <ListaViva items={TUYO} claro className="mt-5" />
            <p className="mt-5 text-lg text-white/85">Al terminar, nos añades como invitados en cada cuenta. Tú sigues siendo el dueño.</p>
            <Link href="/tu-control" className={`${BOTON} mt-7 inline-flex`}>Tú tienes el control de todo</Link>
          </div>
          <MiniPantalla
            titulo="Tu sesión de altas"
            filas={[
              { texto: "Cuenta de Google", marca: "abierta" },
              { texto: "Ficha de Google", marca: "pedida" },
              { texto: "Facebook e Instagram", marca: "abiertas" },
              { texto: "LinkedIn", marca: "abierta" },
              { texto: "Casiopea 360", marca: "invitada" },
            ]}
            pie="Ejemplo"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="cohete">Paso a paso</Etiqueta>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Así es la sesión</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PASOS.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} chip={`Paso ${i + 1}`} className="!p-5 [&>h3]:text-lg" />
            ))}
          </ol>
          <div className="mt-8 rounded-[1.8rem] border-2 border-estrella bg-estrella/15 p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold sm:text-3xl">Y no solo para las altas.</h3>
            <p className="mt-3 max-w-3xl text-lg text-gris">
              Un aviso de Google que no entiendes, una verificación que no pasa, un acceso que no sabes dar. Nos lo dices, quedamos y lo vemos juntos del mismo modo. Para que lo que te cuesta trabajo no pare el proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={3} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="escudo">Para tu tranquilidad</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Cinco señales de una ayuda en remoto seria</h2>
          <p className="mt-4 max-w-3xl text-lg text-gris">Dejar entrar a alguien en tu ordenador es cosa seria. Así lo hacemos nosotros, y así deberías exigirlo siempre.</p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SERIA.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i + 1} titulo={t} texto={d} chip={`${i + 1} de 5`} className="!p-5 [&>h3]:text-lg" />
            ))}
          </ol>
          <Bocadillo className="mt-8 max-w-3xl">Nunca te vamos a llamar por sorpresa para pedirte que nos dejes entrar en tu ordenador. La cita se queda siempre por correo.</Bocadillo>
        </div>
      </section>

      <section id="lo-que-aceptas" className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="firma">Antes de empezar</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Lo que aceptas, por escrito y sin letra pequeña</h2>
          <p className="mt-4 max-w-3xl text-lg text-gris">Te lo mandamos por correo antes de la sesión, con la lista de cuentas de tu caso. Lo lees con calma y, si te parece bien, contestas «acepto».</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ACEPTAS.map((x, i) => (
              <div key={x.t} className="rounded-[1.8rem] border border-tinta/10 bg-niebla p-6">
                <h3 className="flex items-center gap-3 text-xl font-extrabold">
                  <ChipIcono icono={x.icono} i={i + 1} tam="h-10 w-10" />
                  <span className="min-w-0">{x.t}</span>
                </h3>
                <ListaViva items={x.puntos} className="mt-4" />
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-gris">Durante la sesión podemos ver lo que haya en tu pantalla. Por eso te pedimos cerrar antes todo lo privado.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <h2 className="flex items-center gap-3 text-3xl font-extrabold sm:gap-4 sm:text-4xl">
            <ChipIcono icono="chat" i={1} />
            <span className="min-w-0">Lo que suele preguntarse</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PREGUNTAS.map((x, i) => (
              <TarjetaViva key={x.p} como="div" icono={x.icono} i={i + 2} titulo={x.p} texto={x.r} />
            ))}
          </div>
          <p className="mt-8 text-lg text-gris">
            Lo contamos con más calma en el blog:{" "}
            <Link href="/blog/abrir-las-cuentas-de-tu-empresa-sin-atascarte" className="font-bold text-noche-3 underline decoration-estrella decoration-2 underline-offset-4">
              Abrir las cuentas de tu empresa sin atascarte
            </Link>
            .
          </p>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
