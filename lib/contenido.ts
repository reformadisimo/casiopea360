// Contenido de la portada. Todo lo que dice la web vive aquí, para cambiarlo sin tocar el diseño.

// Canales de contacto de Casiopea 360. Correo activo desde el 28 oct 2026 (Google Workspace).
export const CONTACTO = {
  whatsapp: "34619394733", // 619 394 733 (móvil de Ig), 28 oct 2026
  correo: "hola@casiopea360.es",
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
      "Tu dominio, tu correo y dónde vive tu web: nos ocupamos de todo",
      "Web hecha a tu medida, que carga rápido en el móvil",
      "Rediseño de tu logo e imagen, si lo necesitas",
      "Calculadoras para que tus clientes vean precios al momento",
      "Apps para iPhone y Android, publicadas y cobrando",
      "Cambiar de web sin perder lo ganado en Google",
      "Los avisos legales y de cookies, como pide la ley",
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
      "Que Google entienda tu web y te enseñe a quien te busca cerca",
      "Artículos que atraen clientes: los escribimos nosotros, tú solo los revisas",
      "Que ChatGPT y las demás IA te recomienden cuando preguntan por lo tuyo",
      "Tu ficha también en Bing y Apple Maps, no solo en Google",
    ],
  },
  {
    id: "anuncios",
    nombre: "Anuncios",
    frase: "Cada euro, vigilado. Y pagas tú a Google, sin comisiones.",
    servicios: [
      "Revisamos en qué se va hoy tu dinero en anuncios",
      "Anuncios en Google que llevan a páginas hechas para que te contacten",
      "Anuncios en Instagram, Facebook y TikTok, con el tope de gasto que tú decidas",
      "Anuncios en Bing, donde casi nadie compite y el clic suele salir más barato",
      "Cada semana miramos qué funciona y quitamos lo que no",
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
      "Correos que salen solos, para no perder a nadie que pidió información",
      "WhatsApp de empresa con respuestas ya preparadas",
      "Panel con cada conversación, para saber qué preocupa a tus clientes",
      "Tu web y tus campañas conectadas al CRM que ya uses, o uno a medida",
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
  "Automatización y CRM",
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
  logo?: { src: string; ancho: number; alto: number };
  publicado: boolean; // false = preparado, pero oculto hasta que el cliente dé el sí
};

export const TRABAJOS: Trabajo[] = [
  {
    nombre: "Reformadísimo",
    logo: { src: "/logos/reformadisimo.png", ancho: 687, alto: 187 },
    sector: "Reformas integrales en Madrid",
    resumen:
      "Nuestra empresa, desde 2012 y con más de 1.150 obras. Calculadoras de precio y asistente con IA por voz.",
    url: "https://www.reformadisimo.es",
    enlaceTexto: "Ver la web de Reformadísimo",
    publicado: true,
  },
  {
    nombre: "Mi Estela",
    logo: { src: "/logos/mi-estela.png", ancho: 240, alto: 240 },
    sector: "App familiar para iPhone y Android",
    resumen:
      "De la idea a las dos tiendas en unos 120 días, con suscripción de pago. Mapa en tiempo real, chat e IA.",
    url: "https://miestela.app",
    enlaceTexto: "Conocer la app Mi Estela",
    publicado: true,
  },
  {
    nombre: "Fuero Abogados",
    logo: { src: "/logos/fuero.png", ancho: 500, alto: 148 },
    sector: "Web de ejemplo · despacho ficticio",
    resumen:
      "Así sería tu web: más de 300 páginas, 14 herramientas, asistente con IA, panel y CRM. Despacho inventado, trabajo real.",
    url: "https://fuero-abogados.vercel.app",
    enlaceTexto: "Ver la web de ejemplo",
    publicado: true,
  },
  {
    nombre: "AMS Cerramientos",
    logo: { src: "/logos/ams.png", ancho: 640, alto: 214 },
    sector: "Ventanas y cerramientos",
    resumen:
      "Configurador con precio al momento y páginas por zona. Velocidad en el móvil: de 56 a 94 sobre 100.",
    url: "", // sin enlace hasta que su dueño dé el visto bueno (antes https://ams-cerramientos-ejemplo.vercel.app),
    enlaceTexto: "Ver la web",
    publicado: true,
  },
  {
    nombre: "Tierno Centella",
    logo: { src: "/logos/tierno-centella.png", ancho: 500, alto: 148 },
    sector: "Despacho de abogados laboralistas",
    resumen:
      "14 herramientas gratuitas, 47 guías y asistente con IA. Velocidad en el móvil: de 49 a 94 sobre 100.",
    url: "", // sin enlace hasta que su dueño dé el visto bueno (antes https://tierno-centella-web.vercel.app),
    enlaceTexto: "Ver la web",
    publicado: true,
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
    titulo: "Estudio gratuito",
    texto: "Miramos tu web, tu ficha de Google, tus anuncios y tu competencia. Con datos y fechas, sin rodeos.",
  },
  {
    titulo: "Tu guía personalizada",
    texto: "Te lo contamos todo con calma y en tu idioma: lo que hay hoy y lo que puede haber.",
  },
  {
    titulo: "Tu web nueva, antes de firmar",
    texto: "Ves una demostración de tu futura web, con tu nombre.",
  },
  {
    titulo: "Quince minutos de accesos",
    texto: "Todo queda a tu nombre. Nosotros entramos como invitados.",
  },
  {
    titulo: "Los primeros 30 días",
    texto: "Textos y reseñas, publicación, ficha y artículos, correos y tu panel funcionando. Semana a semana.",
  },
  {
    titulo: "Cada día, mejor",
    texto: "Medimos, miramos, cambiamos lo que no funciona y comprobamos que ha mejorado.",
  },
];

export const PLAZOS = [
  { que: "Cambiar un texto, una foto o un horario", cuando: "Minutos u horas" },
  { que: "Responderte", cuando: "El mismo día laborable" },
  { que: "Una página, un artículo o una calculadora nueva", cuando: "Máximo 48 horas" },
  { que: "Una campaña nueva o un cambio en los anuncios", cuando: "Máximo 48 horas" },
  { que: "Una web nueva", cuando: "Unos días: normalmente menos de una semana" },
  { que: "Una app o una integración grande", cuando: "Fecha cerrada desde el primer día" },
  { que: "Notarlo en los anuncios", cuando: "Días" },
  { que: "Notarlo en la ficha de Google", cuando: "Semanas" },
  { que: "Notarlo en Google y en las IA", cuando: "De 3 a 6 meses" },
];

export const INFORMES = [
  {
    cuando: "Hoy",
    lectura: "Al momento",
    puntos: ["Visitas de la web", "Llamadas, WhatsApp, formularios y chat", "Gasto de los anuncios", "Aviso si algo falla"],
  },
  {
    cuando: "Esta semana",
    lectura: "Una pantalla, sin jerga",
    puntos: [
      "De dónde llega la gente y dónde se pierde",
      "Qué anuncios funcionan y cuáles no",
      "Qué pregunta la gente al asistente",
      "Qué hemos cambiado y qué toca después",
    ],
  },
  {
    cuando: "Este mes",
    lectura: "El balance, ya hecho",
    puntos: ["Cómo sales en Google y en las IA", "Reseñas y nota nueva", "Cuánto cuesta cada contacto", "El plan del mes siguiente"],
  },
];

export const GARANTIAS = [
  {
    titulo: "Tus cuentas, a tu nombre",
    texto: "Dominio y cuentas, tuyos desde el primer día. La web, a los doce meses. Si te vas, te llevas cuentas y contactos.",
  },
  {
    titulo: "Tu web, regalada",
    texto: "Doce meses de permanencia. Si a los tres meses no hemos mejorado los indicadores que fijamos contigo al empezar, te vas sin pagar nada y con tu web.",
  },
  {
    titulo: "Nada sale sin tu visto bueno",
    texto: "Ni una respuesta a una reseña, ni un anuncio, ni un artículo se publica en tu nombre sin que lo hayas visto.",
  },
  {
    titulo: "Precio fijo, sin comisiones",
    texto: "Nunca cobramos un porcentaje de lo que inviertes. Pagas a Google o a Meta con tu tarjeta.",
  },
];

// Preguntas frecuentes: respuesta corta (una frase) y, si hace falta, puntos breves.
// `r` junta las dos cosas en un solo texto, para los datos estructurados y el resumen para IA.
export type Pregunta = { p: string; corta: string; puntos?: string[]; r: string };
const PREGUNTAS_BASE: Omit<Pregunta, "r">[] = [
  {
    p: "Ya tengo web. ¿Hay que tirarla?",
    corta: "No necesariamente. En el estudio gratuito te decimos qué vale y qué no.",
    puntos: ["Si cambiamos de web, redirigimos todas las direcciones antiguas.", "Así no pierdes lo que ya tienes en Google."],
  },
  {
    p: "Me lo lleva un sobrino, o un conocido. ¿Para qué cambiar?",
    corta: "Si te funciona, genial.",
    puntos: [
      "Normalmente esa persona lleva una parte: la web o las redes.",
      "Captar clientes por internet necesita unos veinte oficios trabajando juntos.",
      "Eso es lo que hacemos.",
    ],
  },
  {
    p: "¿Cuánto tardáis en hacer lo que os pido?",
    corta: "Te respondemos el mismo día laborable.",
    puntos: [
      "Lo del día a día (un cambio, una página, un artículo, una campaña): 48 horas como máximo.",
      "Una web nueva: unos días, normalmente menos de una semana.",
      "Lo grande, como una app o conectar tu CRM: fecha cerrada antes de empezar.",
      "Si nos falta algo tuyo, el plazo cuenta desde que lo tenemos.",
      "En tu panel ves cada petición, quién la lleva y cuándo estará lista.",
    ],
  },
  {
    p: "¿Me cobraréis aparte por cada cosa que os pida?",
    corta: "No. Va todo incluido en la cuota, también el SEO.",
    puntos: [
      "Cambios en la web, calculadoras, artículos, campañas y el rediseño del logo si lo necesitas.",
      "Aparte, solo lo que pagas a otros: tus anuncios, la grabación de vídeo profesional y el espacio en radio, prensa o medios.",
      "Te lo proponemos con su precio y nada se compra sin tu visto bueno.",
    ],
  },
  {
    p: "¿Cuánto cuesta?",
    corta: "Una cuota mensual fija, la misma para cualquier tamaño de empresa, con todo dentro.",
    puntos: [
      "Web, CRM, Google, anuncios, redes, automatizaciones y cada cambio que pidas.",
      "Te la contamos en el estudio gratuito, con lo que haríamos por tu negocio.",
      "Por separado costaría bastante más: lo tienes calculado en la tabla de servicios.",
    ],
  },
  {
    p: "¿Hay permanencia?",
    corta: "Doce meses, porque la web te la regalamos.",
    puntos: [
      "Dominio y cuentas, a tu nombre desde el primer día. La web, al cumplir los doce meses.",
      "Si a los tres meses no hemos mejorado los indicadores que fijamos contigo al empezar, te vas sin pagar nada y con tu web.",
      "Más tarde, pagas solo la parte de la web que falte. Baja hasta cero a los doce meses y la conoces antes de firmar.",
      "Pasados los doce meses, ninguna permanencia.",
    ],
  },
  {
    p: "¿Garantizáis resultados?",
    corta: "Nadie puede garantizarlos con honradez: dependen también del mercado y de tu negocio.",
    puntos: [
      "Ni el primer puesto en Google ni que una IA te recomiende.",
      "Sí garantizamos por escrito los plazos, la transparencia diaria y objetivos medibles que revisamos contigo.",
      "Hasta hoy, esos resultados han llegado en todas las empresas con las que hemos trabajado.",
    ],
  },
  {
    p: "¿Con cuántas empresas habéis trabajado?",
    corta: "Con muchas, a lo largo de más de veintidós años.",
    puntos: [
      "Algunas, durante muchos años seguidos.",
      "No damos una cifra: preferimos enseñarte resultados.",
      "En el estudio gratuito te contamos casos parecidos al tuyo.",
    ],
  },
  {
    p: "¿Y si me entra más trabajo del que puedo atender?",
    corta: "Es justo lo que buscamos: que no des abasto. Y nos ha pasado.",
    puntos: [
      "Bajamos o pausamos la publicidad al momento.",
      "Te llegan solo las peticiones que puedes asumir.",
      "Cuando vuelvas a tener hueco, la subimos otra vez.",
    ],
  },
  {
    p: "¿Qué velocidad tendrá mi web?",
    corta: "Más rápida que la de la mayoría: es un compromiso.",
    puntos: [
      "Carga en 2 segundos como máximo; lo ideal, en menos de medio segundo.",
      "Y 100, 100, 100 en PageSpeed Insights, la herramienta de Google.",
      "Quizá no a la primera, pero siempre muy cerca, como esta web.",
      "Solo el 48 % de las webs aprueba en el móvil la velocidad que pide Google (HTTP Archive).",
    ],
  },
  {
    p: "¿Hacéis las webs en WordPress?",
    corta: "No. Código propio, a medida y sin plugins, publicado en la red mundial de Vercel.",
    puntos: [
      "Por eso sacan 100 en PageSpeed y son mucho más difíciles de atacar.",
      "WordPress mueve el 42,6 % de las webs; en 2025 tuvo 11.334 fallos de seguridad nuevos, el 91 % en plugins (Patchstack).",
      "Si ya tienes WordPress, te lo pasamos sin perder lo que tienes en Google.",
    ],
  },
  {
    p: "¿Y si me hackean la web?",
    corta: "Ninguna web es invulnerable, pero la nuestra es muchísimo más difícil de atacar.",
    puntos: [
      "Sin plugins ni panel de administración a la vista.",
      "Si algo pasara, volvemos a la versión anterior en minutos.",
      "En un WordPress hackeado, recuperarlo puede llevar días.",
    ],
  },
  {
    p: "¿Trabajáis también para mi competencia?",
    corta: "No firmamos exclusividad por defecto.",
    puntos: [
      "Si la quieres frente a tu competencia directa, se pacta, con una cuota más alta.",
      "Muchos de nuestros mejores trabajos no los enseñamos: el cliente prefiere que su competencia no lo sepa.",
    ],
  },
  {
    p: "¿Y si lo pruebo y no me convence?",
    corta: "Para eso están los primeros meses.",
    puntos: [
      "Ya tienes tu web nueva, tu CRM y todo lo que hayamos puesto en marcha.",
      "Si a los tres meses no hemos mejorado los indicadores que fijamos contigo al empezar, te vas sin pagar nada y con tu web.",
      "Si te da miedo el cambio, prueba antes con un test A/B: tu web actual y la nueva, con el reparto que elijas.",
    ],
  },
  {
    p: "¿Cuánto tardáis en hacer una web?",
    corta: "Unos días, no meses.",
    puntos: [
      "Según el trabajo que tengamos: 48 horas, tres días o una semana.",
      "Lo normal es no pasar de una semana, aunque no lo garantizamos por escrito.",
      "Y nuestra intención es que sea mejor que la de quien te cobra 25.000 €.",
    ],
  },
  {
    p: "¿Cómo podéis cobrar menos por tanto?",
    corta: "Porque no tenemos estructura que pagar.",
    puntos: [
      "Ni oficinas, ni gastos fijos de personal, ni capas de jefes, ni comerciales a comisión.",
      "Una red de especialistas de confianza entra en cada proyecto cuando hace falta.",
      "Las herramientas las pagamos una vez y sirven a todos. La IA hace en horas lo que llevaba semanas.",
      "Ese ahorro va a tu cuota: preferimos clientes para muchos años.",
    ],
  },
  {
    p: "¿De verdad lo hacéis mejor que quien me cobra 25.000 € por una web?",
    corta: "Esa es nuestra intención en cada cosa que hacemos.",
    puntos: [
      "No podemos garantizarlo por escrito: cada caso es distinto.",
      "Hasta hoy, no ha habido un solo caso en que no lo consiguiéramos.",
      "En el estudio gratuito ves lo que haríamos antes de decidir nada.",
    ],
  },
  {
    p: "¿Cuánto tarda en notarse?",
    corta: "Depende de cada cosa. Te lo contamos cada día.",
    puntos: ["La velocidad de la web: el primer día.", "La ficha de Google y las reseñas: semanas.", "Google y las IA: entre 3 y 6 meses."],
  },
  {
    p: "¿Qué tengo que hacer yo?",
    corta: "Lo mínimo. Del resto nos ocupamos nosotros.",
    puntos: ["Quince minutos para darnos los accesos.", "Unas fotos de tus trabajos.", "Tu visto bueno a lo que salga en tu nombre."],
  },
  {
    p: "Si hacéis de todo, ¿no lo haréis peor que una agencia especializada?",
    corta: "Es justo al revés: trabajamos todos los frentes juntos.",
    puntos: [
      "Por separado, nadie puede tocar el trozo del otro aunque vea que falla.",
      "Lo que descubrimos en los anuncios lo arreglamos en la web el mismo día.",
      "Medimos lo que de verdad importa: los clientes.",
      "Compruébalo en nuestros trabajos, en tu panel y en el estudio gratuito.",
    ],
  },
  {
    p: "¿Podéis hacer cualquier cosa que se me ocurra?",
    corta: "Prácticamente sí: una app, un CRM, radio, prensa o un vídeo profesional.",
    puntos: [
      "Lo poco que no hacemos en casa, con productoras y agencias con las que ya trabajamos.",
      "Te decimos con sinceridad qué te conviene y qué no.",
      "Y te preparamos un plan de inversión mes a mes y para el año.",
    ],
  },
  {
    p: "¿Qué más entra en la cuota, aparte de web, SEO, anuncios y redes?",
    corta: "Mucho. Te montamos lo que tenga sentido para tu empresa, sin pagar más.",
    puntos: [
      "Citas online con recordatorio por WhatsApp, reseñas, landings y asistente con IA.",
      "Presupuestos con firma, encuestas, programa de recomendación y web en varios idiomas.",
      "Tienda online, Google Shopping, área privada para clientes y herramientas internas.",
      "Tu marca (la impresión va aparte), medición de llamadas, vigilancia de la competencia, vídeos con IA y web accesible.",
    ],
  },
  {
    p: "¿Qué es un CRM y para qué lo quiero?",
    corta: "Tu agenda de clientes, pero inteligente. Opcional, pero muy recomendable.",
    puntos: [
      "Cada contacto entra solo, con de dónde vino, qué pidió y si firmó.",
      "Sabemos qué te trae clientes y dónde poner el dinero.",
      "Tu equipo no pierde ningún contacto.",
    ],
  },
  {
    p: "¿Os conectáis con mi CRM? ¿Y si no tengo?",
    corta: "Sí, y te lo recomendamos.",
    puntos: [
      "Cada contacto entra solo en tu CRM, con su origen y lo que hizo antes de escribirte.",
      "Trabajamos con los habituales: HubSpot, Zoho, Salesforce o Pipedrive.",
      "Si no tienes, te creamos uno a medida, a tu nombre y sin licencias por usuario. Es opcional.",
      "Con él hacemos los seguimientos: el mensaje justo a quien lo necesita, sin boletines masivos.",
    ],
  },
  {
    p: "¿Hacéis también radio o prensa?",
    corta: "Sí. Preferimos lo digital porque se mide al euro, pero la radio la recomendamos en muchos casos.",
    puntos: [
      "Radio: guion, voces profesionales, emisoras y franjas. Empuja todo lo demás.",
      "Prensa: no solemos aconsejarla, pero si la quieres, diseñamos el anuncio.",
      "Va en la cuota; el espacio en el medio lo pagas tú directamente.",
    ],
  },
  {
    p: "¿Y Bing? ¿Merece la pena?",
    corta: "Sí, y va incluido.",
    puntos: [
      "En España tiene cerca del 3,5 % de las búsquedas, y más del 12 % en ordenadores.",
      "Alimenta a Copilot, el asistente de Microsoft.",
      "Casi nadie lo trabaja: es más fácil salir arriba y los anuncios suelen costar menos.",
    ],
  },
  {
    p: "¿Cómo sabré qué funciona?",
    corta: "Con tu propio panel de control, en el móvil y en tiempo real.",
    puntos: [
      "Cuántos contactos llegan, de dónde viene cada uno y lo que cuesta.",
      "Todo lo que hemos hecho, día a día.",
      "Tus clientes y su coste, solo si quieres: es tuyo y no te pedimos tu facturación.",
      "En esta web tienes un panel de ejemplo para verlo.",
    ],
  },
  {
    p: "¿Y el vídeo?",
    corta: "Ponemos las ideas, el guion y el montaje.",
    puntos: [
      "Te enseñamos a grabar con el móvil.",
      "La grabación profesional, con la productora con la que trabajamos.",
      "Esa parte va aparte y la pagas tú directamente: más transparente.",
    ],
  },
];
export const PREGUNTAS: Pregunta[] = PREGUNTAS_BASE.map((q) => ({ ...q, r: [q.corta, ...(q.puntos ?? [])].join(" ") }));

// Puntos de dolor, en palabras de quien dirige la empresa, con su solución en una frase.
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
    solucion: "Vigilamos cada euro y te decimos cuánto te cuesta cada contacto. Y si quieres, también cada cliente.",
  },
  {
    dolor: "Me escriben de noche y cuando contesto ya es tarde.",
    solucion: "Un asistente atiende a cualquier hora y te avisa con todo apuntado.",
  },

  {
    dolor: "Encima me cobran un porcentaje de lo que invierto en anuncios.",
    solucion: "Precio fijo. Nunca cobramos comisión sobre tu inversión, sea la que sea.",
  },
  {
    dolor: "Me paso el día en reuniones con proveedores.",
    solucion: "Un solo interlocutor y casi todo por correo. Te quitamos el menor tiempo posible.",
  },
  {
    dolor: "Cada proveedor le echa la culpa al otro.",
    solucion: "Un solo equipo responsable de todo. Si algo falla, es cosa nuestra, y lo arreglamos.",
  },
  {
    dolor: "Mi agencia tiene mi web y mis cuentas. Si me voy, lo pierdo todo.",
    solucion: "Dominio y cuentas a tu nombre desde el primer día. La web, a los doce meses o antes, pagando lo que falte.",
  },
  {
    dolor: "Una web nueva tarda meses y cada cambio es otro presupuesto.",
    solucion: "Tu web en unos días, y cada cambio del día a día en 48 horas, incluido en la cuota.",
  },
];

// Qué incluye el estudio gratuito (sacado de las guías de AMS y Tierno Centella).
// Lo que incluye el estudio gratuito (según las guías reales de AMS y Tierno, 24 oct 2026).
// caso: true = «según tu caso», no se hace en todos los estudios.
export type BloqueEstudio = { titulo: string; icono: string; color: string; items: { t: string; caso?: boolean }[] };
export const ESTUDIO_BLOQUES: BloqueEstudio[] = [
  {
    titulo: "Dónde estás hoy",
    icono: "lupa",
    color: "#1d4ed8",
    items: [
      { t: "Lo esencial en un minuto: tu situación con un semáforo por áreas" },
      { t: "Cómo te encuentra hoy un cliente: qué busca, qué ve, cómo compara y por qué elige" },
      { t: "Lo que ya tienes y vale mucho" },
      { t: "Tu web actual a examen: velocidad en el móvil, fallos y qué mejorar" },
      { t: "Cómo te ve Google y si las IA te recomiendan" },
      { t: "Tu ficha de Google y tus reseñas: tu nota, las que están sin contestar y qué falta para subir" },
      { t: "Por qué se te escapan clientes" },
      { t: "¿Tienes tú las llaves de todo? De quién son tu dominio, tu web y tus cuentas" },
    ],
  },
  {
    titulo: "Tu competencia, sin secretos",
    icono: "estrella",
    color: "#6d28d9",
    items: [
      { t: "Tus competidores en tu zona: quién gana y por qué" },
      { t: "Sus anuncios reales en Google y en redes: qué hacen bien y qué no copiaríamos" },
      { t: "Portales y redes: dónde estás, dónde deberías estar y dónde no merece la pena" },
    ],
  },
  {
    titulo: "Tu web, rediseñada",
    icono: "pincel",
    color: "#be185d",
    items: [
      { t: "Propuesta de rediseño completo: maquetas de tu portada y tus páginas clave en el móvil" },
      { t: "El mapa de tu web nueva: todas las páginas que tendría, también por zona o por servicio" },
      { t: "Tu asistente con IA: cómo atendería a tus clientes a cualquier hora" },
      { t: "Calculadora o configurador de precios", caso: true },
      { t: "Tu imagen y tu logo: si conviene retocarlos y cómo", caso: true },
      { t: "Cómo se haría el cambio sin perder lo ganado en Google" },
    ],
  },
  {
    titulo: "Anuncios y contactos",
    icono: "euro",
    color: "#047857",
    items: [
      { t: "Tus anuncios hoy, el borrador de los nuevos y adónde llega el cliente después del clic" },
      { t: "Dónde se va cada euro que inviertes y cuánto te cuesta cada contacto" },
      { t: "WhatsApp de empresa y respuestas automáticas, para que no se te escape nadie" },
      { t: "Tu CRM a medida, o cómo conectar el que ya usas", caso: true },
      { t: "El camino del cliente: del primer clic hasta que firma, con su seguimiento" },
    ],
  },
  {
    titulo: "Tu plan",
    icono: "calendario",
    color: "#b45309",
    items: [
      { t: "Calendario de contenidos de tres meses, con los artículos ya titulados" },
      { t: "Plan de los primeros 30 días, semana a semana" },
      { t: "Cuánto tarda en notarse cada cosa, sin prometer magia" },
      { t: "Cuánto ahorrarías, al euro: lo que pagas hoy frente a lo que pagarías con nosotros" },
    ],
  },
  {
    titulo: "Cómo trabajaríamos",
    icono: "chat",
    color: "#0f766e",
    items: [
      { t: "Qué recibirías cada día, cada semana y cada mes" },
      { t: "Cómo pides un cambio: tan fácil como un WhatsApp" },
      { t: "Los accesos que hacen falta, siempre a tu nombre, y las preguntas que te haríamos" },
    ],
  },
];
export const ESTUDIO = ESTUDIO_BLOQUES.flatMap((b) => b.items.map((x) => ({ titulo: b.titulo, texto: x.t + (x.caso ? " (según tu caso)" : "") })));
export const ESTUDIO_TOTAL = ESTUDIO_BLOQUES.reduce((n, b) => n + b.items.length, 0);

// Cómo empezamos: del test de idoneidad a tu estudio.
export const EMPEZAMOS: { t: string; d: string }[] = [
  { t: "Haz el test de idoneidad", d: "Unos cinco minutos: nos cuentas tu empresa y en qué momento estás." },
  { t: "Lo revisamos", d: "Si podemos ayudarte, te lo decimos en 48 horas laborables. Y si no, también, con el porqué." },
  { t: "Preparamos tu estudio gratuito", d: "Tu plan completo a medida, con el rediseño de tu web y cuánto ahorrarías, al euro." },
  { t: "Te lo presentamos y decides", d: "Con calma, en una videollamada o como prefieras. Y sin ningún compromiso." },
];


// Más cosas que entran en la cuota, para la visión 360 (decidido por Ig el 24 oct 2026).
export const TAMBIEN_INCLUIDO: { t: string; d: string; logo?: string; icono: string }[] = [
  { icono: "calendario", logo: "WhatsApp", t: "Reservas y citas online", d: "Tus clientes reservan desde la web y reciben el recordatorio por WhatsApp. Menos plantones." },
  { icono: "estrella", logo: "Ficha de Google", t: "Reseñas", d: "Pedimos reseña después de cada venta y contestamos todas, en Google, Bing y Apple Maps." },
  { icono: "pagina", t: "Landings a medida", d: "Una página para cada campaña, servicio o ciudad. Las que necesites, dentro del alcance que acordemos." },
  { icono: "chat", logo: "Claude", t: "Asistente con IA", d: "En tu web y en WhatsApp, a cualquier hora. Responde, recoge los datos y los mete en tu CRM." },
  { icono: "firma", t: "Presupuestos con firma", d: "Calculadoras y presupuestos online que tu cliente acepta y firma desde el móvil, sin papeles." },
  { icono: "sonrisa", t: "Encuestas de satisfacción", d: "Salen solas tras cada trabajo: avisan a tiempo del cliente descontento y al contento le piden la reseña." },
  { icono: "regalo", t: "Programa de recomendación", d: "Trae a un amigo, con su código y su seguimiento en el CRM, para que el boca a boca se note." },
  { icono: "idiomas", t: "Web en varios idiomas", d: "Inglés, francés o el idioma de tus clientes, bien traducido y posicionado en cada uno." },
  { icono: "carrito", logo: "Google", t: "Tienda online y Shopping", d: "Para vender por internet, con pagos y envíos, y tus productos con foto y precio en Google Shopping." },
  { icono: "llave", t: "Área privada para tus clientes", d: "Donde tus clientes ven sus pedidos, documentos o el estado de su trabajo." },
  { icono: "engranaje", t: "Herramientas internas", d: "Partes de trabajo, inventario, fichajes o tu propia intranet, hechas a la medida de tu empresa." },
  { icono: "pincel", t: "Tu marca", d: "Logo, colores, manual de marca, tarjetas y papelería. La impresión la encargas tú a la imprenta." },
  { icono: "telefono", t: "Medición de llamadas", d: "Cada llamada entra en tu CRM con el anuncio o la página que la trajo, no solo los formularios." },
  { icono: "lupa", t: "Vigilancia de tu competencia", d: "Cada mes, qué hacen tus competidores en Google, en anuncios y en redes, y cómo adelantarlos." },
  { icono: "video", logo: "YouTube", t: "Vídeos con IA y con móvil", d: "Vídeos cortos para redes y anuncios, montados por nosotros con tu material o con IA." },
  { icono: "accesible", t: "Web accesible y legal", d: "Accesibilidad, cookies, privacidad y avisos legales al día, como pide la ley." },
];

// Las cuatro promesas de Casiopea 360 (mensaje central, 24 oct 2026).
export const PROMESAS: { t: string; d: string; pie: string }[] = [
  {
    t: "Mejor.",
    d: "Si te piden 25.000 € por una web, queremos hacértela mejor dentro de tu cuota. Igual con SEO, anuncios o CRM.",
    pie: "Por escrito: plazos, transparencia diaria y objetivos medibles.",
  },
  {
    t: "En días, no en meses.",
    d: "Tu web en unos días, normalmente menos de una semana. Lo del día a día, en 48 horas como máximo.",
    pie: "Lo caro de una agencia no es solo la factura: es todo lo que tardan. Aquí no esperas.",
  },
  {
    t: "A precio fijo.",
    d: "Una sola cuota, la misma para cualquier empresa, con todo dentro. Menos que cada cosa por separado.",
    pie: "Si a los tres meses no hemos mejorado los indicadores que fijamos contigo al empezar, te vas sin pagar nada y con tu web.",
  },
  {
    t: "Sin perseguirnos.",
    d: "Lo gestionamos todo nosotros. Sin reuniones innecesarias, casi todo por escrito y tu panel para mirarlo cuando quieras.",
    pie: "Lo único que debería ocuparte son los resultados. Y vamos a por los mejores posibles.",
  },
];

// Por qué podemos cobrar menos.
export const POR_QUE_BARATO: { t: string; d: string }[] = [
  { t: "Sin estructura que pagar", d: "Sin oficinas, capas de jefes ni comerciales a comisión. Especialistas que entran por proyecto." },
  { t: "Herramientas compartidas", d: "Las licencias de análisis, diseño, SEO e IA las pagamos una vez y las aprovechan todos nuestros clientes." },
  { t: "La tecnología de hoy", d: "La IA y la automatización hacen lo repetitivo; las personas, lo que hay que pensar. Lo que antes llevaba semanas hoy lleva horas." },
  { t: "Todo el margen, para ti", d: "Ese ahorro va a tu cuota. Queremos clientes para muchos años, no facturas para hoy." },
];

// Lo que creemos (Quiénes somos).
export const CREEMOS: string[] = [
  "Que el buen marketing no debería ser un lujo. Queremos democratizar los precios.",
  "Que se crece con clientes a largo plazo, no a base de facturas.",
  "Que a un proveedor no hay que perseguirle. Si nos persigues, lo hacemos mal.",
  "Que la mejor tecnología debe estar al alcance de cualquier empresa. Nosotros la estrenamos cada semana.",
  "Que esto se hace bien cuando se disfruta. Y a nosotros nos encanta ver crecer a una empresa.",
  "Que nuestro trabajo es ayudarte a crecer o, cuando toca, a estabilizarte y mantener lo que has construido.",
];

// «¿Cómo es posible?»: lo que se preguntan los clientes cuando lo ven funcionando.
// Antes / ahora según lo que nos cuentan los propios clientes.
export const COMO_ES_POSIBLE: { antes: string; ahora: string; tema: string }[] = [
  { tema: "La web", antes: "Miles de euros y meses de espera por una web.", ahora: "Una web mejor, en días, dentro de la cuota." },
  { tema: "Las landings", antes: "Hasta 900 € por cada landing nueva.", ahora: "Todas las que necesites, en horas, sin pagar aparte." },
  { tema: "Los plazos", antes: "Meses para cualquier cosa.", ahora: "Horas o días. Y por escrito." },
  { tema: "El CRM y los correos", antes: "Licencias por usuario y meses para montar los correos automáticos.", ahora: "Tu CRM a medida y tus correos funcionando, si los quieres." },
  { tema: "La IA", antes: "«Eso de un asistente con IA es para grandes empresas.»", ahora: "Tu asistente con IA atendiendo a cualquier hora, también por voz." },
  { tema: "Los datos", antes: "Informes que no se entienden, cuando llegan.", ahora: "Cada contacto con su origen, en tu panel y al momento. Sin esperar a ningún informe." },
];

// Opiniones REALES de clientes, con su permiso. No inventar ninguna.
// Mientras esté vacío, la web no enseña el bloque de opiniones.
export type Opinion = { texto: string; nombre: string; cargo?: string; empresa: string; logo?: string };
export const OPINIONES: Opinion[] = [];
