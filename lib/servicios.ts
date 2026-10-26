// Una página propia por servicio: /servicios/<slug>.
// Solo datos comprobados; donde no hay dato público, no se pone cifra.
import { FRENTES } from "@/lib/contenido";

export type PaginaServicio = {
  slug: string;
  frente?: string; // id en FRENTES (si existe)
  nombre: string;
  tituloSeo: string;
  descripcionSeo: string;
  titular: string;
  entradilla: string;
  video: string;
  videoAlt: string;
  // Segundo vídeo, distinto del de la cabecera, para el bloque "Qué incluye".
  video2: string;
  videoAlt2: string;
  color: string; // color de acento
  dolores: { dolor: string; arreglo: string }[];
  incluye?: string[]; // si no hay frente
  como: { paso: string; texto: string }[];
  plazos: { que: string; cuando: string }[];
  dato?: { cifra: string; texto: string; fuente: string };
  caso?: { nombre: string; texto: string; slug: string };
  preguntas: { p: string; r: string }[];
  articulos: string[]; // slugs del blog
};

export const PAGINAS_SERVICIO: PaginaServicio[] = [
  {
    slug: "diseno-web",
    frente: "web",
    nombre: "Web y apps",
    tituloSeo: "Diseño de páginas web a medida, rápidas y tuyas",
    descripcionSeo:
      "Web a medida en unos días, con calculadoras y asistente con IA, 100 en PageSpeed como objetivo, y tuya al cumplir los doce meses. Incluida en tu cuota de marketing.",
    titular: "Tu web, en días. Rápida, bonita y a tu nombre.",
    entradilla:
      "Donde otros tardan meses, tú la tienes en unos días: normalmente menos de una semana. Con calculadoras, asistente con IA y una velocidad que tu competencia no tiene.",
    video: "mano-pantalla",
    videoAlt: "Una mano toca una pantalla luminosa",
    video2: "arquitecto-mesa",
    videoAlt2: "Un profesional dibuja a mano sobre una mesa de diseño",
    color: "#1f6feb",
    dolores: [
      { dolor: "«Mi web es vieja y tarda en cargar.»", arreglo: "Te hacemos una nueva, rápida en el móvil. Y te la regalamos." },
      { dolor: "«Cada cambio es un presupuesto y una espera.»", arreglo: "Los cambios del día a día, en 48 horas como máximo, dentro de la cuota." },
      { dolor: "«Mi web es de mi agencia, no mía.»", arreglo: "Dominio y cuentas a tu nombre desde el primer día, y la web tuya al cumplir los doce meses. Si te vas, te llevas tus cuentas y tus contactos." },
    ],
    como: [
      { paso: "Miramos lo que tienes", texto: "Qué te trae clientes hoy y qué no, para no perder nada de lo que ya habías ganado en Google." },
      { paso: "La hacemos en días", texto: "Diseño a tu medida, textos que venden y herramientas como calculadoras o un asistente con IA." },
      { paso: "La medimos", texto: "Velocidad, accesibilidad y buenas prácticas en PageSpeed, con 100 como objetivo." },
      { paso: "La mejoramos cada semana", texto: "Lo que aprendemos en los anuncios y en el asistente se convierte en cambios en tu web." },
    ],
    plazos: [
      { que: "Una web nueva", cuando: "Unos días: normalmente menos de una semana" },
      { que: "Una página, un artículo o una calculadora", cuando: "Máximo 48 horas" },
      { que: "Cambiar un texto, una foto o un horario", cuando: "Minutos u horas" },
      { que: "Una app para iPhone y Android", cuando: "Fecha cerrada desde el primer día" },
    ],
    dato: {
      cifra: "48 %",
      texto: "Solo el 48 % de las webs aprueba en el móvil la velocidad que pide Google. La tuya va a estar en el otro lado.",
      fuente: "HTTP Archive, Web Almanac 2025",
    },
    caso: { nombre: "AMS Cerramientos", texto: "Configurador con precio al momento y una velocidad en el móvil que pasó de 56 a 94 sobre 100.", slug: "ams-cerramientos" },
    preguntas: [
      {
        p: "¿Cuánto tardáis en hacer una web?",
        r: "Unos días, no meses. Según el volumen de trabajo pueden ser 48 horas, tres días o una semana; lo normal es no pasar de una semana.",
      },
      {
        p: "¿La web es mía?",
        r: "El dominio y las cuentas, sí, a tu nombre desde el primer día. La web te la regalamos y es tuya al cumplir los doce meses, o antes si pagas la parte que falte. Si un día te vas, te llevas siempre tus cuentas y tus contactos.",
      },
      {
        p: "¿Usáis WordPress?",
        r: "No. Trabajamos con tecnología actual, sin plugins ni panel de administración a la vista, que es por donde entran la mayoría de los ataques. Y si algo falla, volvemos a la versión anterior en minutos.",
      },
    ],
    articulos: ["cuanto-se-tarda-en-hacer-una-web", "cuantos-proveedores-necesita-una-web-que-trae-clientes"],
  },
  {
    slug: "seo-google-ia",
    frente: "google",
    nombre: "Google y las IA",
    tituloSeo: "SEO en Google y visibilidad en ChatGPT y las IA",
    descripcionSeo:
      "Que te encuentre quien te busca: SEO, ficha de Google, reseñas y visibilidad en ChatGPT y las demás IA. Sin permanencias eternas ni informes que no se entienden.",
    titular: "Que te encuentre quien te está buscando. También en ChatGPT.",
    entradilla:
      "Tu ficha de Google al día, todas las reseñas contestadas, artículos que atraen clientes y una web que Google y las IA entienden. Todo con el mismo equipo que lleva tus anuncios.",
    video: "ojo-pantallas",
    videoAlt: "Un ojo rodeado de pantallas con resultados",
    video2: "brujula",
    videoAlt2: "Una brújula antigua sobre un mapa",
    color: "#188038",
    dolores: [
      { dolor: "«Me busco en Google y no salgo.»", arreglo: "Ponemos al día tu ficha de Google y tu web para que te encuentre quien está cerca." },
      { dolor: "«Tengo reseñas sin contestar.»", arreglo: "Las contestamos todas, con tu visto bueno, y pedimos reseñas nuevas a clientes reales." },
      { dolor: "«ChatGPT recomienda a mi competencia.»", arreglo: "Trabajamos tu web y tus menciones para que las IA te conozcan y te recomienden." },
    ],
    como: [
      { paso: "Vemos dónde estás", texto: "Qué buscan tus clientes, dónde sales tú y dónde sale tu competencia, también en las IA." },
      { paso: "Arreglamos la base", texto: "Ficha de Google, Bing y Apple Maps, y una web rápida que Google entiende sin esfuerzo." },
      { paso: "Creamos contenido útil", texto: "Artículos que responden a lo que de verdad te preguntan. Los escribimos nosotros; tú solo los revisas." },
      { paso: "Lo medimos cada semana", texto: "Qué búsquedas te traen clientes, no solo visitas." },
    ],
    plazos: [
      { que: "Ficha de Google al día", cuando: "Desde la primera semana" },
      { que: "Notarlo en la ficha de Google", cuando: "Semanas" },
      { que: "Notarlo en Google y en las IA", cuando: "De 3 a 6 meses" },
      { que: "Un artículo nuevo", cuando: "Máximo 48 horas" },
    ],
    preguntas: [
      {
        p: "¿Cuándo voy a notar el SEO?",
        r: "La ficha de Google se nota en semanas. Posicionar la web en Google y en las IA lleva de 3 a 6 meses, y te enseñamos el avance cada semana en tu panel.",
      },
      {
        p: "¿Se puede salir en ChatGPT?",
        r: "Sí, aunque nadie puede prometerlo con fecha. Las IA recomiendan a quien tiene una web clara, contenido útil y menciones en otros sitios. En eso trabajamos.",
      },
      {
        p: "¿Me garantizáis el primer puesto?",
        r: "No, y desconfía de quien lo haga. Te garantizamos por escrito plazos, transparencia cada día y objetivos medibles. Hasta hoy, los resultados han llegado en todas las empresas con las que hemos trabajado.",
      },
    ],
    articulos: ["como-aparecer-en-chatgpt-y-google"],
  },
  {
    slug: "publicidad-google-ads-redes",
    frente: "anuncios",
    nombre: "Anuncios",
    tituloSeo: "Gestión de Google Ads y anuncios en redes, sin comisiones",
    descripcionSeo:
      "Google Ads, Instagram, Facebook, TikTok y Bing con precio fijo: no cobramos comisión sobre lo que inviertes. Cada euro vigilado y revisado cada semana.",
    titular: "Cada euro, vigilado. Y sin comisiones sobre lo que inviertes.",
    entradilla:
      "Anuncios en Google, Instagram, Facebook, TikTok y Bing que llevan a páginas hechas para que te contacten. Pagas tú a Google y a Meta, con el tope que tú decidas. Nosotros, ni un porcentaje.",
    video: "holograma-mesa",
    videoAlt: "Dos personas ríen alrededor de un holograma",
    video2: "holograma-redes",
    videoAlt2: "Una mano sostiene un móvil del que salen notificaciones",
    color: "#7c3aed",
    dolores: [
      { dolor: "«Pago anuncios y no sé si sirven.»", arreglo: "Vigilamos cada euro y te decimos cuánto te cuesta cada cliente." },
      { dolor: "«Mi agencia se lleva un porcentaje de lo que invierto.»", arreglo: "Precio fijo. Nunca cobramos comisión sobre tu inversión, sea la que sea." },
      { dolor: "«Los anuncios llevan a mi portada y nadie llama.»", arreglo: "Cada campaña tiene su página, hecha por el mismo equipo, para que te contacten." },
    ],
    como: [
      { paso: "Revisamos lo que gastas hoy", texto: "En qué se va el dinero y qué búsquedas traen curiosos en vez de clientes." },
      { paso: "Montamos campañas con su página", texto: "El anuncio y la página que lo recibe, pensados juntos." },
      { paso: "Medimos clientes, no clics", texto: "Formularios, llamadas y WhatsApp, cada uno con el anuncio del que vino." },
      { paso: "Ajustamos cada semana", texto: "Lo que funciona sube; lo que no, se quita." },
    ],
    plazos: [
      { que: "Una campaña nueva o un cambio", cuando: "Máximo 48 horas" },
      { que: "Una página para la campaña", cuando: "Máximo 48 horas" },
      { que: "Notarlo en los anuncios", cuando: "Días" },
      { que: "Informe de lo que funciona", cuando: "Cada semana, en tu panel" },
    ],
    preguntas: [
      {
        p: "¿Cobráis un porcentaje de la inversión?",
        r: "No. Es lo habitual en muchas agencias, entre un 10 y un 20 %, pero nosotros cobramos una cuota fija. Lo que inviertes va entero a tus anuncios.",
      },
      {
        p: "¿Quién paga a Google y a Meta?",
        r: "Tú, directamente, con tu tarjeta y con el tope que tú decidas. Las cuentas son tuyas desde el primer día.",
      },
      {
        p: "¿Y si me llegan más clientes de los que puedo atender?",
        r: "Bajamos la publicidad en ese momento. Nuestro objetivo es que no des abasto, y si llega, es el mejor problema que se puede tener.",
      },
    ],
    articulos: ["comision-sobre-inversion-en-anuncios", "cuanto-cuesta-el-marketing-digital-por-separado"],
  },
  {
    slug: "redes-sociales",
    frente: "redes",
    nombre: "Redes y contenido",
    tituloSeo: "Gestión de redes sociales para empresas",
    descripcionSeo:
      "Instagram, Facebook, LinkedIn y TikTok con ideas, publicaciones y guiones de reels. Que se vea lo bien que trabajas, dentro de tu cuota de marketing.",
    titular: "Que se vea lo bien que trabajas. Sin que tengas que ser influencer.",
    entradilla:
      "Ideas, publicaciones y guiones para Instagram, Facebook, LinkedIn y TikTok. Te enseñamos a grabar con el móvil y nos ocupamos del montaje.",
    video: "graba-movil",
    videoAlt: "Una mujer graba un vídeo con el móvil en una cafetería",
    video2: "movil-personas",
    videoAlt2: "Dos figuras en 3D conversan sobre un móvil",
    color: "#be185d",
    dolores: [
      { dolor: "«No tengo tiempo para las redes.»", arreglo: "Te damos las ideas y el guion. Tú grabas un minuto con el móvil; el resto es cosa nuestra." },
      { dolor: "«Publico y no pasa nada.»", arreglo: "Contamos lo que tus clientes quieren ver: tu trabajo, tu equipo y los resultados." },
      { dolor: "«Mis redes no tienen nada que ver con mi web ni mis anuncios.»", arreglo: "El mismo equipo lleva las tres cosas, así que todo cuenta lo mismo." },
    ],
    como: [
      { paso: "Elegimos qué contar", texto: "Lo que diferencia a tu empresa y lo que tus clientes preguntan." },
      { paso: "Te damos el guion", texto: "Qué grabar, cómo y en cuánto tiempo. Sin complicaciones." },
      { paso: "Montamos y publicamos", texto: "Edición, textos y publicación en cada red." },
      { paso: "Lo reaprovechamos", texto: "Lo que funciona en redes pasa a tus anuncios y a tu web." },
    ],
    plazos: [
      { que: "Un reel montado con tu material", cuando: "Máximo 48 horas" },
      { que: "Publicaciones de la semana", cuando: "Planificadas cada semana" },
      { que: "Grabación profesional", cuando: "Te ponemos en contacto con la agencia" },
    ],
    preguntas: [
      {
        p: "¿Tengo que salir yo en los vídeos?",
        r: "No es obligatorio, aunque las caras de verdad funcionan muy bien. Podemos contarlo con tu trabajo, tu equipo o tus resultados.",
      },
      {
        p: "¿Grabáis vosotros?",
        r: "No hacemos grabación profesional. Te damos las ideas y el guion, y montamos lo que grabes. Para grabar con equipo, te ponemos en contacto con la agencia con la que trabajamos y le pagas tú directamente.",
      },
      {
        p: "¿En qué redes?",
        r: "En las que estén tus clientes: Instagram, Facebook, LinkedIn o TikTok. No hace falta estar en todas.",
      },
    ],
    articulos: ["cinco-proveedores-de-marketing-y-ningun-responsable"],
  },
  {
    slug: "automatizacion-ia",
    frente: "automatizacion",
    nombre: "Automatización e IA",
    tituloSeo: "Asistente con IA, WhatsApp y automatización para empresas",
    descripcionSeo:
      "Asistente con inteligencia artificial en tu web, también por voz; WhatsApp de empresa, correos automáticos y un panel con cada conversación. Contactos que no se pierden.",
    titular: "Contactos que no se pierden, aunque estés en plena faena.",
    entradilla:
      "Un asistente con inteligencia artificial que atiende en tu web a cualquier hora, también por voz. Correos y WhatsApp que se envían solos. Y un panel con cada conversación.",
    video: "neon-llamada",
    videoAlt: "Una mujer habla por el móvil entre luces de neón",
    video2: "fibra-luz",
    videoAlt2: "Haces de luz que fluyen y se entrelazan",
    color: "#0f766e",
    dolores: [
      { dolor: "«Me escriben de noche y cuando contesto ya es tarde.»", arreglo: "Un asistente atiende a cualquier hora y te avisa con todo apuntado." },
      { dolor: "«Se me olvida volver a llamar.»", arreglo: "Correos y recordatorios que se envían solos para no perder a nadie que pidió información." },
      { dolor: "«No sé qué preguntan mis clientes.»", arreglo: "Un panel con cada conversación: sabrás qué les preocupa con sus propias palabras." },
    ],
    como: [
      { paso: "Le enseñamos tu negocio", texto: "Precios orientativos, zonas, plazos y lo que no hace tu empresa, para que responda como tú." },
      { paso: "Lo ponemos donde te escriben", texto: "Tu web, por texto o por voz, y tu WhatsApp de empresa." },
      { paso: "Lo conectamos con tu CRM", texto: "Cada contacto entra solo, con la página y el anuncio de donde vino." },
      { paso: "Lo afinamos cada día", texto: "Leemos las conversaciones y mejoramos sus respuestas." },
    ],
    plazos: [
      { que: "Asistente en tu web", cuando: "Unos días" },
      { que: "Respuestas preparadas en WhatsApp", cuando: "Máximo 48 horas" },
      { que: "Conectar con tu CRM", cuando: "Fecha cerrada desde el primer día" },
    ],
    caso: { nombre: "Reformadísimo", texto: "Una asistente con inteligencia artificial que atiende por voz, conectada a calculadoras de precio y a la medición completa.", slug: "reformadisimo" },
    preguntas: [
      {
        p: "¿El asistente se inventa cosas?",
        r: "Le damos solo lo que tu empresa quiere contar y le decimos qué no debe prometer. Y revisamos sus conversaciones para corregirlo.",
      },
      {
        p: "¿Funciona por voz?",
        r: "Sí. Tus clientes pueden hablarle desde el móvil, como si llamaran.",
      },
      {
        p: "¿Cuesta aparte?",
        r: "No. Entra en tu cuota, igual que el resto.",
      },
    ],
    articulos: ["que-es-un-crm-y-para-que-sirve"],
  },
  {
    slug: "crm-a-medida",
    nombre: "Tu CRM a medida",
    tituloSeo: "CRM a medida para empresas, sin licencias por usuario",
    descripcionSeo:
      "Tu propio CRM hecho a medida: cada contacto entra solo con su origen, fases con un toque y seguimiento automático. Sin licencias por usuario, incluido en tu cuota.",
    titular: "Tu propio CRM, hecho a medida. Sin licencias por usuario.",
    entradilla:
      "Tu agenda de clientes, pero lista: sabe de dónde viene cada uno, en qué punto está y a quién toca llamar hoy. ¿Ya tienes uno? Lo conectamos al tuyo.",
    video: "puntos-luz",
    videoAlt: "Puntos de luz conectados entre sí",
    video2: "despacho",
    videoAlt2: "Un equipo conversa con buen humor en un despacho",
    color: "#b45309",
    dolores: [
      { dolor: "«No sé de dónde vienen mis clientes.»", arreglo: "Cada contacto entra con la página y el anuncio de donde vino." },
      { dolor: "«Pago licencias por cada persona del equipo.»", arreglo: "Tu CRM es tuyo, sin licencias por usuario, y entra en tu cuota." },
      { dolor: "«Los contactos se quedan en el móvil de cada comercial.»", arreglo: "Todo en un sitio, con fases y recordatorios, en el móvil y en el ordenador." },
    ],
    incluye: [
      "Cada contacto entra solo: formulario, chat, WhatsApp, llamadas y calculadoras",
      "La página y el anuncio de donde vino cada contacto",
      "Fases con un toque, del primer contacto a cliente firmado",
      "Seguimientos que te avisan o salen solos",
      "Qué canal trae clientes que firman, no solo clics",
      "En el móvil, para ti y tu equipo, con tus datos a tu nombre",
      "Conexión con el que ya uses: HubSpot, Zoho, Pipedrive o el que sea",
    ],
    como: [
      { paso: "Vemos cómo vendes hoy", texto: "Tus fases, tu equipo y lo que se pierde por el camino." },
      { paso: "Lo hacemos a tu medida", texto: "Solo lo que usas, con tus palabras, sin menús infinitos." },
      { paso: "Lo conectamos todo", texto: "Web, anuncios, WhatsApp, asistente y llamadas entran solos." },
      { paso: "Lo mejoramos contigo", texto: "Cada cambio que pidas, en el día a día de tu cuota." },
    ],
    plazos: [
      { que: "Conectar tu web y tus campañas", cuando: "Unos días" },
      { que: "Un CRM a medida", cuando: "Fecha cerrada desde el primer día" },
      { que: "Un cambio o una fase nueva", cuando: "Máximo 48 horas" },
    ],
    preguntas: [
      {
        p: "Ya tengo HubSpot (o Zoho, o Pipedrive). ¿Tengo que cambiar?",
        r: "No. Conectamos tu web y tus campañas con el que ya usas. Si prefieres dejar de pagar licencias, te hacemos uno a medida.",
      },
      {
        p: "¿Los datos son míos?",
        r: "Sí, siempre. Están a tu nombre y te los llevas si un día te vas.",
      },
      {
        p: "¿Cuánto cuesta?",
        r: "Entra en tu cuota. Contratado por separado, un CRM a medida cuesta en el mercado de 5.000 a 35.000 €.",
      },
    ],
    articulos: ["que-es-un-crm-y-para-que-sirve"],
  },
];

export const paginaServicio = (slug: string) => PAGINAS_SERVICIO.find((p) => p.slug === slug);
export const servicioDeFrente = (id: string) => PAGINAS_SERVICIO.find((p) => p.frente === id || (id === "crm" && p.slug === "crm-a-medida"));
export const incluyeDe = (p: PaginaServicio) => p.incluye ?? FRENTES.find((f) => f.id === p.frente)?.servicios ?? [];
