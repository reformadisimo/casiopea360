import Link from "next/link";
import { BOTON, BOTON_CLARO, ENVOLTORIO, Loseta } from "@/components/secciones";
import { Bocadillo, Etiqueta, ListaViva, Nebulosa, PasosVivos, TarjetaViva } from "@/components/Vida";

/* Secciones de la portada que "venden" Casiopea: el mensaje es que el cliente manda hasta dónde quiere llegar y nosotros le acompañamos
   con datos al momento. Tono: alegre, cercano, tuteo. Nada de promesas de resultado ("podemos", "probamos", "medimos"), sin porcentajes
   inventados y sin nombres de marcas reales. 28-oct (cas·v173): todo con losetas, listas de color y nebulosas; menos párrafo, más tarjeta. */

/** "Soñar en grande": la imagen se construye, y se puede construir para otro público sin perder al de siempre. */
export function SeccionSonarEnGrande() {
  const ideas: [string, string, string][] = [
    ["fiesta", "Tú pones el sueño", "Más clientes, clientes que gasten más, otra línea de negocio. Sin vergüenza."],
    ["diana", "Nosotros lo convertimos en objetivo", "Con tus cifras te decimos si es un sueño o un objetivo, cuánto tardaríamos y qué haría falta."],
    ["lupa", "Probamos, medimos, corregimos", "Una prueba A/B no es una opinión: es una medida. Lo que funciona se queda."],
  ];
  return (
    <section className="relative overflow-hidden bg-noche py-14 text-white sm:py-20" aria-labelledby="sonar-en-grande">
      <Nebulosa oscura variante={1} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta tono="cristal" icono="fiesta">Soñar en grande</Etiqueta>
        <h2 id="sonar-en-grande" className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Hasta donde tú quieras llegar. Y más.</h2>
        <p className="mt-5 max-w-3xl text-lg text-white/85">
          La imagen de una marca se construye. ¿Por qué no ir a por clientes que gastan más? Una web y unas campañas para ese público, y una prueba A/B que lo mida. <b className="text-white">Sin dejar de atender al cliente de hoy: tú eliges el reparto.</b>
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {ideas.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} claro />
          ))}
        </ul>
        <Bocadillo claro className="mt-8 max-w-3xl">
          No te traemos más de lo que puedas atender. Y si una meta no es realista, te lo decimos y te proponemos un escalón intermedio.
        </Bocadillo>
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
  const tarjetas: [string, string, string][] = [
    ["sonrisa", "Una red de especialistas, sin oficinas que pagar", "Una persona lleva tu proyecto de principio a fin. Detrás, colaboradores de años: programación, diseño, analítica, SEO y anuncios. Entran cuando hacen falta."],
    ["bombilla", "Una curva de aprendizaje muy pequeña", "La primera vez, el panel te lleva de la mano. Cada cosa rara tiene un «?» que la explica en una frase. En pocos días te sabes mover."],
    ["lupa", "Y los errores, a la vista", "Ninguna herramienta está libre de errores. Los buscamos cada día y, si ves uno, nos lo dices con un toque y lo arreglamos."],
  ];
  return (
    <section className="relative overflow-hidden bg-niebla py-14 sm:py-20" aria-labelledby="como-trabajamos">
      <Nebulosa variante={2} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta icono="cohete">Cómo trabajamos</Etiqueta>
        <h2 id="como-trabajamos" className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Un solo contacto, los especialistas que haga falta</h2>
        <p className="mt-5 max-w-3xl text-lg text-gris">
          Hablas con una persona. Detrás están los especialistas que tu proyecto necesite. Te acompañamos, te asesoramos y te damos todos los datos al momento.
        </p>
        <ol className="mt-8 flex flex-wrap gap-3" aria-label="Nuestro ciclo de trabajo">
          {pasos.map((p, i) => (
            <li key={p} className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-tinta shadow-sm ring-1 ring-linea">
              <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-estrella text-sm font-extrabold">{i + 1}</span>{p}
            </li>
          ))}
        </ol>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {tarjetas.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i + 1} titulo={t} texto={d} />
          ))}
        </ul>
        <Bocadillo className="mt-8 max-w-3xl">No nos quedamos quietos: si trabajamos en equipo, llegamos a la luna.</Bocadillo>
      </div>
    </section>
  );
}

/** Ficha de Google (Perfil de empresa): sección corta para la página de servicios, con llamada a la acción. */
export function SeccionFichaGoogle() {
  const cosas = [
    "Respondemos cada reseña con un texto cuidado, no con un «gracias» suelto.",
    "Publicamos novedades y trabajos terminados, y subimos fotos nuevas.",
    "Servicios, horario y categorías al día, y contestamos las preguntas de tus clientes.",
    "Te damos una tarjeta con código QR para que tus clientes dejen su reseña fácil.",
  ];
  return (
    <section className="relative overflow-hidden bg-niebla py-14 sm:py-20" aria-labelledby="ficha-google">
      <Nebulosa variante={3} />
      <div className={`${ENVOLTORIO} relative grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <Etiqueta icono="mapa">Tu ficha de Google</Etiqueta>
          <h2 id="ficha-google" className="mt-5 text-3xl font-extrabold sm:text-5xl">Lo primero que ve quien te busca</h2>
          <p className="mt-5 text-lg text-gris">
            Quien busca «ventanas cerca de mí» ve primero una ficha con tu nota, tus reseñas y tu teléfono. <b className="text-tinta">Es tuya; nosotros la cuidamos con tu permiso y sin quitarte tiempo.</b>
          </p>
          <Bocadillo className="mt-5">Puedes quitarnos el acceso cuando quieras. Tus cuentas son tuyas, siempre.</Bocadillo>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/blog/ficha-de-google-que-es-y-como-sacarle-partido" className={BOTON}>Cómo cuidamos tu ficha</Link>
            <a href="/estudio-gratuito" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 font-bold text-tinta underline underline-offset-4">Que miren la mía, sin compromiso</a>
          </div>
        </div>
        <div className="rounded-[1.8rem] bg-white p-4 shadow-sm ring-1 ring-linea sm:p-5">
          <p className="flex items-center gap-3 font-extrabold"><Loseta icono="estrella" i={4} /> Lo que hacemos por tu ficha</p>
          <ListaViva items={cosas} className="mt-4" />
        </div>
      </div>
    </section>
  );
}

/** Probamos versiones (landings y pruebas A/B, A/B/C/D...), también de la web entera, por el mismo coste. Sin promesas de resultado. */
export function SeccionPruebasAB() {
  const que = [
    "La imagen principal: dos fotos distintas para la misma página.",
    "El titular y el botón: qué frase y qué color hacen que más gente te escriba.",
    "El orden de la página y el formulario: qué se ve primero y qué se pide.",
    "Una landing distinta para cada campaña, servicio o ciudad.",
  ];
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="pruebas-ab">
      <Nebulosa variante={0} />
      <div className={`${ENVOLTORIO} relative grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <Etiqueta icono="lupa">Probamos versiones</Etiqueta>
          <h2 id="pruebas-ab" className="mt-5 text-3xl font-extrabold sm:text-5xl">Dos versiones, una medida. También de tu web.</h2>
          <p className="mt-5 text-lg text-gris">
            Landings y pruebas A/B (o A/B/C/D), en los anuncios y en la web. Hay clientes que enseñan <b className="text-tinta">dos imágenes distintas a la mitad de sus visitas</b> para ver cuál les escribe más. De cada prueba se aprende, y eso mejora los resultados.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <TarjetaViva como="div" icono="regalo" i={2} titulo="Por el mismo coste" texto="Una versión alternativa de tu web va dentro de tu cuota. Solemos aconsejarlo nosotros; decides tú." />
            <TarjetaViva como="div" icono="grafica" i={0} titulo="Con números, no a ojo" texto="No prometemos cuánto mejora cada prueba. Te damos el dato para decidir." />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/panel" className={BOTON}>Cómo lo verías en tu panel</Link>
            <a href="/estudio-gratuito" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 font-bold text-tinta underline underline-offset-4">Cuéntanos qué probarías</a>
          </div>
        </div>
        <div className="rounded-[1.8rem] bg-niebla p-4 ring-1 ring-linea sm:p-5">
          <p className="flex items-center gap-3 font-extrabold"><Loseta icono="pagina" i={1} /> Qué se puede probar</p>
          <ListaViva items={que} className="mt-4 [&>li]:bg-white" />
          <Bocadillo className="mt-4">Una prueba necesita visitas suficientes. Con pocas, tarda más en responder. Te lo decimos claro.</Bocadillo>
        </div>
      </div>
    </section>
  );
}

/** "Rápida, eficaz y robándote el menor tiempo posible": sin reuniones ni llamadas, por correo y WhatsApp. Valor de Casiopea. */
export function SeccionTiempo() {
  const pasos: [string, string, string][] = [
    ["mano", "Al principio, un poco de esfuerzo", "Tu parte: accesos, datos y fotos. Nosotros también nos volcamos, para que arranque cuanto antes."],
    ["cohete", "Después, velocidad de crucero", "Tú, casi todo el tiempo a tu trabajo. Cada vez te robamos menos."],
    ["chat", "Sin reuniones ni llamadas", "Salvo que sean imprescindibles, y casi nunca lo son. Correo y WhatsApp, a diario si hace falta, breve y rápido."],
  ];
  return (
    <section className="relative overflow-hidden bg-noche py-14 text-white sm:py-20" aria-labelledby="tiempo">
      <Nebulosa oscura variante={0} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta tono="estrella" icono="reloj">Tu tiempo es para tu trabajo</Etiqueta>
        <h2 id="tiempo" className="mt-5 max-w-4xl text-3xl font-extrabold sm:text-5xl">Rápida, eficaz y robándote el menor tiempo posible</h2>
        <p className="mt-5 max-w-3xl text-lg text-white/85">
          Nuestro objetivo: el mayor número de clientes posible, dentro de lo que puedas atender, dándote la menor guerra. No prometemos cifras; sí cuidar tu tiempo.
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {pasos.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} claro chip={`Paso ${i + 1}`} />
          ))}
        </ol>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="rounded-[1.6rem] bg-estrella/15 p-6 ring-1 ring-estrella/40">
            <p className="flex items-center gap-3 text-lg font-extrabold text-estrella"><Loseta icono="reloj" i={4} /> Lo que pasa con varios proveedores</p>
            <p className="mt-3 text-lg">Reuniones, desplazamientos, llamadas y correos cruzados. Acabas más dedicado al marketing que a tu trabajo. En más de 22 años nos ha pasado. Con nosotros no ocurre, y es uno de nuestros puntos fuertes.</p>
          </div>
          <Bocadillo claro>Tu agenda, para tus clientes. La nuestra, para tu marketing. Así se reparte.</Bocadillo>
        </div>
      </div>
    </section>
  );
}

/** "¿Por qué contratarnos?": el mensaje central de Casiopea. Sin promesas de cifras, sin precios publicados. */
export function SeccionPorQueContratarnos() {
  const razones: [string, string, string][] = [
    ["reloj", "Tu tiempo vuelve a tu trabajo", "Sin reuniones ni llamadas innecesarias. Correo y WhatsApp, breve y rápido."],
    ["sonrisa", "Un solo contacto para todo", "Web, Google, anuncios, redes, CRM e IA. Una persona coordina a la red de especialistas."],
    ["rayo", "Rápido", "Tu web en unos días, no en meses. Las mejoras, en horas o pocos días, sin presupuestos nuevos."],
    ["grafica", "Todos tus datos, al momento", "Un panel que se entiende a la primera y un CRM que dice de dónde viene cada cliente."],
    ["escudo", "Todo es tuyo", "Dominio, cuentas, ficha de Google y contactos, a tu nombre. No te pedimos tu facturación."],
    ["euro", "Una cuota fija, razonable", "Sin comisiones sobre tus anuncios y con mucho dentro. Por separado cuesta bastante más."],
  ];
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="por-que">
      <Nebulosa variante={1} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta icono="trofeo">¿Por qué contratarnos?</Etiqueta>
        <h2 id="por-que" className="mt-5 max-w-4xl text-3xl font-extrabold sm:text-5xl">Con nosotros no pierdes tiempo. Lo que ganas son datos y trabajo hecho.</h2>
        <p className="mt-5 max-w-3xl text-lg text-gris">
          Lo que más oímos: «esto me lleva muchísimo tiempo». Por eso todo está pensado para quitártelo de encima. No prometemos cifras: medimos cada euro y cada contacto.
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {razones.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} chip={`Razón ${i + 1}`} className="bg-niebla ring-0" />
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/blog/por-que-contratar-casiopea-360-tiempo-para-tu-trabajo-y-un-solo-equipo" className={BOTON}>Las seis razones, con detalle</Link>
          <a href="/estudio-gratuito" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 font-bold text-tinta underline underline-offset-4">Pide tu estudio gratuito</a>
        </div>
      </div>
    </section>
  );
}

/** El equipo: una red de especialistas seleccionada desde 2004, autónomos por proyecto, plazos cerrados y un solo contacto. Sin nombres. */
export function SeccionEquipo() {
  const oficios: [string, string, string][] = [
    ["lupa", "SEO y posicionamiento", "Que Google y las IA entiendan tu web y te enseñen a quien te busca."],
    ["diana", "Campañas en Google", "Anuncios de búsqueda y de marca, medidos al céntimo."],
    ["video", "Campañas en Meta", "Facebook e Instagram, con el mensaje y el público correctos."],
    ["pincel", "Diseño", "Imagen, web y materiales que se reconocen y se recuerdan."],
    ["ojo", "Experiencia de usuario", "Que quien llega encuentre lo que busca y dé el paso."],
    ["grafica", "Analítica", "Que cada cifra se mida bien y se entienda."],
    ["chip", "Programación", "Webs rápidas, herramientas a medida y automatizaciones."],
    ["prensa", "Contenidos y textos", "Lo que explicas, escrito para que se lea y convenza."],
  ];
  const claves: [string, string, string][] = [
    ["trofeo", "22 años seleccionando", "Desde 2004, probando y quedándonos con los que cumplen: en calidad, en plazos y en trato."],
    ["euro", "Autónomos, por proyecto", "Cobran por cada proyecto. Sin gasto fijo de personal: no pagas a nadie parado."],
    ["calendario", "Plazos cerrados", "Cada encargo sale con su fecha desde el principio, y se cumple o se te cuenta por qué."],
    ["sonrisa", "Un solo contacto", "Hablas con una persona, que coordina a los especialistas que haga falta."],
  ];
  return (
    <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-24" aria-labelledby="equipo-detras">
      <Nebulosa oscura variante={2} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta tono="cristal" icono="sonrisa">El equipo detrás</Etiqueta>
        <h2 id="equipo-detras" className="mt-5 max-w-4xl text-3xl font-extrabold sm:text-5xl">Un equipo seleccionado durante 22 años</h2>
        <p className="mt-5 max-w-3xl text-lg text-white/85">
          No contratamos a quien tiene un hueco: elegimos con quién queremos trabajar, y llevamos más de veinte años afinando esa lista.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {claves.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} claro />
          ))}
        </ul>
        <h3 className="mt-12 flex items-center gap-3 text-2xl font-extrabold"><Loseta icono="herramienta" i={5} /> Los oficios que cubrimos con especialistas</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {oficios.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} chip="De nuestra red" className="!p-5 [&>h3]:text-lg" />
          ))}
        </ul>
        <Bocadillo claro className="mt-8 max-w-3xl">Por eso el precio es tan bueno: sin oficinas ni plantilla parada, todo va a trabajo hecho.</Bocadillo>
      </div>
    </section>
  );
}
