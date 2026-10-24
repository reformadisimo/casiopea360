// Contenido de la portada. Todo lo que dice la web vive aquí, para cambiarlo sin tocar el diseño.

// PENDIENTE de Ig: canales de contacto de Casiopea 360 (WhatsApp y correo).
// Mientras estén vacíos, el formulario no envía y lo dice con claridad.
export const CONTACTO = {
  whatsapp: "", // ej. "34600000000"
  correo: "", // ej. "hola@casiopea360.es"
};

export type Frente = {
  id: string;
  nombre: string;
  frase: string;
  servicios: string[];
};

// Las cinco estrellas de la constelación, en el orden en que se dibuja la W.
export const FRENTES: Frente[] = [
  {
    id: "web",
    nombre: "Web y apps",
    frase: "Tu escaparate, abierto día y noche, y tu app en las tiendas.",
    servicios: [
      "Dominio, servidor y correo: alta, traslado y copias",
      "Web a medida, rápida en el móvil",
      "Calculadoras de precio y configuradores",
      "Apps para iPhone y Android, publicadas y cobrando",
      "Cambio de web sin perder lo que ya tienes en Google",
      "Textos legales y aviso de cookies como pide la ley",
    ],
  },
  {
    id: "google",
    nombre: "Google y las IA",
    frase: "Que te encuentre quien te está buscando, también en ChatGPT.",
    servicios: [
      "Ficha de Google al día, con fotos y publicaciones",
      "Respuesta a todas las reseñas, con tu visto bueno",
      "Campaña para pedir reseñas a clientes reales",
      "SEO técnico, local y de contenidos",
      "Blog con calendario: tú solo revisas",
      "Presencia en directorios y en las respuestas de las IA",
    ],
  },
  {
    id: "anuncios",
    nombre: "Anuncios",
    frase: "Cada euro, vigilado. Y pagas tú a Google, sin comisiones.",
    servicios: [
      "Revisión de lo que ya estás pagando",
      "Google Ads con páginas pensadas para convertir",
      "Instagram, Facebook y TikTok con tope de gasto",
      "Pruebas, ajustes y revisión cada semana",
    ],
  },
  {
    id: "redes",
    nombre: "Redes y contenido",
    frase: "Que se vea lo bien que trabajas, sin que tengas que ser influencer.",
    servicios: [
      "Instagram, Facebook, LinkedIn y TikTok",
      "Ideas, publicaciones y guiones de reels",
      "Cómo grabar con el móvil y el montaje",
      "Grabación profesional: te ponemos en contacto con la agencia",
    ],
  },
  {
    id: "automatizacion",
    nombre: "Automatización e IA",
    frase: "Contactos que no se pierden, aunque estés en plena faena.",
    servicios: [
      "Asistente con inteligencia artificial en tu web, también por voz",
      "Correos automáticos de seguimiento desde tu dominio",
      "WhatsApp Business con respuestas preparadas",
      "Panel con cada conversación, para saber qué preocupa a tus clientes",
    ],
  },
];

// Oficios que haría falta contratar por separado (guías de AMS y Tierno Centella).
export const OFICIOS = [
  "Diseño gráfico",
  "Experiencia de usuario",
  "Programación web",
  "Desarrollo de apps",
  "Herramientas a medida",
  "Inteligencia artificial",
  "Redacción",
  "SEO de contenidos",
  "SEO técnico",
  "SEO local",
  "Visibilidad en IA",
  "Google Ads",
  "Páginas de conversión",
  "Publicidad en redes",
  "Redes sociales",
  "Fotografía y vídeo",
  "Gestión de reseñas",
  "Análisis y medición",
  "Automatización",
  "Estudio de la competencia",
  "Legal y cumplimiento",
  "Pruebas y calidad",
  "Seguridad y mantenimiento",
  "Traducción",
  "Dirección del proyecto",
];

export type Trabajo = {
  nombre: string;
  sector: string;
  resumen: string;
  url: string;
  enlaceTexto: string;
  publicado: boolean; // false = preparado, pero oculto hasta que el cliente dé el sí
};

export const TRABAJOS: Trabajo[] = [
  {
    nombre: "Reformadísimo",
    sector: "Reformas integrales en Madrid",
    resumen:
      "Nuestra propia empresa, desde 2012 y con más de 1.150 obras. Web con calculadoras de precio, una asistente con inteligencia artificial que atiende por voz y medición completa.",
    url: "https://www.reformadisimo.es",
    enlaceTexto: "Visitar la web",
    publicado: true,
  },
  {
    nombre: "Mi Estela",
    sector: "App familiar para iPhone y Android",
    resumen:
      "De la idea a la App Store y Google Play en unos 120 días, con suscripción de pago. Mapa en tiempo real, avisos de llegada, chat, llamadas, asistente con IA y 17 idiomas.",
    url: "https://miestela.app",
    enlaceTexto: "Conocer la app",
    publicado: true,
  },
  {
    nombre: "AMS Cerramientos",
    sector: "Ventanas y cerramientos",
    resumen:
      "Web con configurador que da el precio al momento, páginas por zona y una velocidad en el móvil que pasó de 56 a 94 sobre 100.",
    url: "https://ams-cerramientos-ejemplo.vercel.app",
    enlaceTexto: "Ver la web",
    publicado: false,
  },
  {
    nombre: "Tierno Centella",
    sector: "Despacho de abogados laboralistas",
    resumen:
      "Catorce herramientas gratuitas, 47 guías, asistente con IA y versión en inglés. La velocidad en el móvil pasó de 49 a 94 sobre 100.",
    url: "https://tierno-centella-web.vercel.app",
    enlaceTexto: "Ver la web",
    publicado: false,
  },
  {
    // PENDIENTE: web por hacer. Texto provisional hasta que exista.
    nombre: "Coches Únicos by Nacho",
    sector: "Coches",
    resumen: "En construcción.",
    url: "",
    enlaceTexto: "Ver la web",
    publicado: false,
  },
];

export const PASOS = [
  {
    titulo: "Diagnóstico gratis",
    texto: "Miramos tu web, tu ficha de Google, tus anuncios y tu competencia. Con datos y fechas, sin rodeos.",
  },
  {
    titulo: "Tu guía personalizada",
    texto: "Te lo contamos todo con calma y en tu idioma: lo que hay hoy y lo que puede haber.",
  },
  {
    titulo: "Tu web nueva, ya hecha",
    texto: "Antes de firmar nada, la ves funcionando con tu nombre.",
  },
  {
    titulo: "Quince minutos de accesos",
    texto: "Todo queda a tu nombre. Nosotros entramos como invitados.",
  },
  {
    titulo: "Los primeros 30 días",
    texto: "Textos y reseñas, publicación, ficha y artículos, correos y primer informe. Semana a semana.",
  },
  {
    titulo: "Cada día, mejor",
    texto: "Medimos, miramos, cambiamos lo que no funciona y comprobamos que ha mejorado.",
  },
];

export const PLAZOS = [
  { que: "Cambiar un texto, una foto o un horario", cuando: "Minutos u horas" },
  { que: "Una página o un artículo nuevo", cuando: "24 a 48 horas" },
  { que: "Resolver una duda", cuando: "El mismo día" },
  { que: "Notarlo en los anuncios", cuando: "Días" },
  { que: "Notarlo en la ficha de Google", cuando: "Semanas" },
  { que: "Notarlo en Google y en las IA", cuando: "De 3 a 6 meses" },
];

export const INFORMES = [
  {
    cuando: "Cada día",
    lectura: "Un minuto",
    puntos: ["Visitas de la web", "Llamadas, WhatsApp, formularios y chat", "Gasto de los anuncios", "Aviso si algo falla"],
  },
  {
    cuando: "Cada semana",
    lectura: "Una página, sin jerga",
    puntos: [
      "De dónde llega la gente y dónde se pierde",
      "Qué anuncios funcionan y cuáles no",
      "Qué pregunta la gente al asistente",
      "Qué hemos cambiado y qué toca después",
    ],
  },
  {
    cuando: "Cada mes",
    lectura: "El balance",
    puntos: ["Cómo sales en Google y en las IA", "Reseñas y nota nueva", "Cuánto cuesta cada cliente", "El plan del mes siguiente"],
  },
];

export const GARANTIAS = [
  {
    titulo: "Todo a tu nombre",
    texto: "Web, dominio, cuentas de Google, anuncios y redes son tuyos desde el primer día. Si un día te vas, te lo llevas todo.",
  },
  {
    titulo: "Tu web, regalada",
    texto: "No pagas la web: solo el mantenimiento mensual, con seis meses de compromiso. Después sigues porque te compensa, no porque no puedas irte.",
  },
  {
    titulo: "Nada sale sin tu visto bueno",
    texto: "Ni una respuesta a una reseña, ni un anuncio, ni un artículo se publica en tu nombre sin que lo hayas visto.",
  },
  {
    titulo: "Los anuncios, sin comisión",
    texto: "Pagas a Google o a Meta con tu tarjeta. Nosotros no tocamos ese dinero.",
  },
];

export const PREGUNTAS = [
  {
    p: "Ya tengo web. ¿Hay que tirarla?",
    r: "No necesariamente. En el diagnóstico te decimos qué vale y qué no. Si cambiamos de web, redirigimos todas las direcciones antiguas para que no pierdas lo que ya tienes en Google.",
  },
  {
    p: "Me lo lleva un sobrino, o un conocido. ¿Para qué cambiar?",
    r: "Si te funciona, genial. Normalmente esa persona lleva una parte, la web o las redes. Una empresa que capta clientes por internet necesita unos veinte oficios trabajando juntos, y eso es lo que hacemos.",
  },
  {
    p: "¿Cuánto tarda en notarse?",
    r: "La velocidad de la web, el primer día. La ficha de Google y las reseñas, en semanas. Google y las IA, entre 3 y 6 meses. Te lo contamos cada día para que veas por dónde va.",
  },
  {
    p: "¿Garantizáis resultados?",
    r: "No. Nadie honesto puede garantizar el primer puesto en Google o que una IA te recomiende. Lo que sí garantizamos es trabajo diario, medido y contado.",
  },
  {
    p: "¿Qué tengo que hacer yo?",
    r: "Lo mínimo: quince minutos para darnos los accesos, unas fotos de tus trabajos y tu visto bueno a lo que salga en tu nombre. Del resto nos ocupamos nosotros.",
  },
  {
    p: "¿Y el vídeo?",
    r: "Te damos las ideas, el guion, cómo grabarlo con el móvil, y lo montamos si nos lo das. Para grabarlo de forma profesional te ponemos en contacto con la agencia audiovisual con la que trabajamos. Es lo único que va aparte, y se lo pagas tú directamente: más transparente.",
  },
];

// Puntos de dolor, en palabras del dueño del negocio, con su solución en una frase.
export const DOLORES = [
  {
    dolor: "Mi web es vieja y tarda en cargar.",
    solucion: "Te hacemos una nueva, rápida en el móvil. Y te la regalamos.",
  },
  {
    dolor: "Me busco en Google y no salgo.",
    solucion: "Ponemos al día tu ficha de Google y tu web para que te encuentre quien está cerca.",
  },
  {
    dolor: "Pago anuncios y no sé si sirven.",
    solucion: "Vigilamos cada euro y te decimos cuánto te cuesta cada cliente.",
  },
  {
    dolor: "Me escriben de noche y cuando contesto ya es tarde.",
    solucion: "Un asistente atiende a cualquier hora y te avisa con todo apuntado.",
  },
  {
    dolor: "Tengo pocas reseñas, y alguna mala sin contestar.",
    solucion: "Respondemos todas con tu visto bueno y pedimos opinión a tus clientes contentos.",
  },
  {
    dolor: "No tengo tiempo para las redes.",
    solucion: "Te damos las ideas, los textos y el montaje. Tú solo grabas, si quieres.",
  },
];
