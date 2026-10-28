import Link from "next/link";
import { BOTON, BOTON_CLARO, ENVOLTORIO } from "@/components/secciones";

/* Secciones de la portada que "venden" Casiopea: el mensaje es que el cliente manda hasta dónde quiere llegar y nosotros le acompañamos
   con datos al momento. Tono: alegre, cercano, tuteo. Nada de promesas de resultado ("podemos", "probamos", "medimos"), sin porcentajes
   inventados y sin nombres de marcas reales. */

/** "Soñar en grande": la imagen se construye, y se puede construir para otro público sin perder al de siempre. */
export function SeccionSonarEnGrande() {
  const ideas: [string, string][] = [
    ["Tú pones el sueño", "Dinos hasta dónde quieres llegar: más clientes, clientes que gasten más, abrir otra línea de negocio. Sin vergüenza."],
    ["Nosotros lo convertimos en objetivo", "Con tus cifras y con supuestos a la vista te decimos si es un sueño o un objetivo, cuánto tardaríamos y qué haría falta."],
    ["Probamos, medimos, corregimos", "Una prueba A/B no es una opinión: es una medida. Lo que funciona se queda, lo que no, se cambia."],
  ];
  return (
    <section className="bg-noche py-14 text-white sm:py-20" aria-labelledby="sonar-en-grande">
      <div className={ENVOLTORIO}>
        <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-estrella ring-1 ring-white/15">Soñar en grande</p>
        <h2 id="sonar-en-grande" className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Hasta donde tú quieras llegar. Y más.</h2>
        <p className="mt-5 max-w-3xl text-lg text-white/85">
          Las marcas grandes no venden solo por lo que hacen: venden por la imagen que proyectan. Y esa imagen se construye. Empresas enormes tienen webs flojas, y empresas pequeñas pueden tener una web y unas campañas pensadas para el público que quieren atraer.
        </p>
        <p className="mt-4 max-w-3xl text-lg text-white/85">
          ¿Por qué no ir a por clientes que gastan mucho más? Con una web pensada para ese público, campañas para ese público y una prueba A/B que lo mida, se puede intentar. <b className="text-white">Y sin dejar de atender al cliente de hoy: tú eliges el reparto</b>, por ejemplo la mayor parte para el de siempre y una parte para el de más nivel.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {ideas.map(([t, d]) => (
            <li key={t} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
              <h3 className="text-xl font-extrabold text-estrella">{t}</h3>
              <p className="mt-2 text-white/85">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-white/85">
          No te traemos más de lo que puedes atender bien: tú nos dices tu capacidad y la meta se ajusta a ella. Y si una meta es poco realista, te lo decimos claro y te proponemos un escalón intermedio.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/panel" className={BOTON}>Prueba «Tus sueños y tus cuentas»</Link>
          <a href="#solicitud" className={BOTON_CLARO}>Cuéntanos tu sueño</a>
        </div>
      </div>
    </section>
  );
}

/** "Cómo trabajamos": un solo contacto, todo el equipo detrás; datos al momento; los errores se buscan cada día. */
export function SeccionComoTrabajamos() {
  const pasos = ["Investigamos", "Probamos", "Medimos", "Corregimos", "Volvemos a probar"];
  return (
    <section className="bg-niebla py-14 sm:py-20" aria-labelledby="como-trabajamos">
      <div className={ENVOLTORIO}>
        <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Cómo trabajamos</p>
        <h2 id="como-trabajamos" className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Un solo contacto, todo el equipo detrás</h2>
        <p className="mt-5 max-w-3xl text-lg text-gris">
          No tienes que hablar con un diseñador, un programador, el de Analytics, el del SEO y el de los anuncios. Hablas con una persona, y detrás está todo el equipo. Te acompañamos, te asesoramos, te guiamos y te damos <b className="text-tinta">todos los datos, al momento</b>, en un panel que se entiende desde el móvil.
        </p>
        <ol className="mt-8 flex flex-wrap gap-3" aria-label="Nuestro ciclo de trabajo">
          {pasos.map((p, i) => (
            <li key={p} className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-tinta ring-1 ring-linea">
              <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-estrella text-sm">{i + 1}</span>{p}
            </li>
          ))}
        </ol>
        <div className="mt-8 max-w-3xl rounded-3xl bg-white p-6 ring-1 ring-linea">
          <h3 className="text-xl font-extrabold">Un equipo de especialistas, sin oficinas que pagar</h3>
          <p className="mt-2 text-gris">
            Detrás de tu contacto trabajan programadores, diseñadores, expertos en experiencia de usuario, en analítica, en SEO y en anuncios. No tenemos oficinas ni gastos fijos de personal: trabajamos con especialistas independientes, por proyecto y con un método de colaboración continuo. Cada uno hace lo que mejor sabe hacer, cuando hace falta, y tú solo pagas ese trabajo. Por eso podemos tener muy buenos precios sin renunciar a la calidad.
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-lg text-gris">No nos quedamos quietos: si trabajamos en equipo, llegamos a la luna.</p>
        <div className="mt-8 max-w-3xl rounded-3xl bg-white p-6 ring-1 ring-linea">
          <h3 className="text-xl font-extrabold">Una curva de aprendizaje muy pequeña</h3>
          <p className="mt-2 text-gris">
            Un panel con tanta información pide un poco de costumbre, y lo sabemos. Por eso la primera vez te lleva de la mano, paso a paso, y cada cosa que pueda no entenderse tiene un «?» que la explica en una frase. En pocos días te sabes mover por todas las herramientas, y cada una te cuenta algo útil de tu negocio. Tú no tienes que aprender marketing: nosotros te lo traducimos.
          </p>
        </div>
        <div className="mt-4 max-w-3xl rounded-3xl bg-white p-6 ring-1 ring-linea">
          <h3 className="text-xl font-extrabold">Y los errores, a la vista</h3>
          <p className="mt-2 text-gris">
            Ninguna herramienta está libre de errores, y la nuestra tampoco. La diferencia es que los buscamos cada día con pruebas automáticas y, si ves uno, nos lo cuentas con un toque («Avisar de un error») y lo arreglamos. Nos encanta encontrarlos: cada uno que arreglamos es un problema menos para ti.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Ficha de Google (Perfil de empresa): sección corta para la página de servicios, con llamada a la acción. */
export function SeccionFichaGoogle() {
  const cosas = [
    "Respondemos cada reseña con un texto cuidado, no con un «gracias» suelto.",
    "Publicamos novedades y trabajos terminados, y subimos fotos nuevas.",
    "Mantenemos servicios, horario y categorías al día, y contestamos las preguntas de tus clientes.",
    "Te damos una tarjeta con código QR para que tus clientes dejen su reseña fácil.",
  ];
  return (
    <section className="bg-niebla py-14 sm:py-20" aria-labelledby="ficha-google">
      <div className={`${ENVOLTORIO} grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Tu ficha de Google</p>
          <h2 id="ficha-google" className="mt-5 text-3xl font-extrabold sm:text-5xl">Lo primero que ve quien te busca</h2>
          <p className="mt-5 text-lg text-gris">
            Cuando alguien busca «ventanas cerca de mí» o «abogado laboralista en Madrid», lo primero que ve es una ficha con tu nota, tus reseñas y tu teléfono. <b className="text-tinta">Esa ficha es tuya; nosotros la cuidamos con tu permiso y tú apruebas todo antes de que se publique.</b>
          </p>
          <p className="mt-4 text-lg text-gris">Puedes quitarnos el acceso cuando quieras. Tus cuentas son tuyas, siempre.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/blog/ficha-de-google-que-es-y-como-sacarle-partido" className={BOTON}>Cómo cuidamos tu ficha</Link>
            <a href="/estudio-gratuito" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 font-bold text-tinta underline underline-offset-4">Que miren la mía, sin compromiso</a>
          </div>
        </div>
        <ul className="grid gap-3">
          {cosas.map((c) => (
            <li key={c} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-linea">
              <span aria-hidden="true" className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-estrella text-sm font-extrabold">✓</span>
              <span className="text-tinta">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
