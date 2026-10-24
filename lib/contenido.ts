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
      "Tu dominio, tu correo y dónde vive tu web: nos ocupamos de todo",
      "Web hecha a tu medida, que carga rápido en el móvil",
      "Rediseño de tu logo e imagen, si lo necesitas",
      "Calculadoras para que tus clientes vean precios al momento",
      "Apps para iPhone y Android, publicadas y cobrando",
      "Cambiar de web sin perder lo que ya habías ganado en Google",
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
      "También en Bing y Apple Maps: tu ficha en todos los mapas y buscadores, no solo en Google",
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
      "Correos que se envían solos para no perder a nadie que pidió información",
      "WhatsApp de empresa con respuestas ya preparadas",
      "Panel con cada conversación, para saber qué preocupa a tus clientes",
      "Conectamos tu web y tus campañas con el CRM que ya uses, o te creamos uno a medida",
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
      "Nuestra propia empresa, desde 2012 y con más de 1.150 obras. Web con calculadoras de precio, una asistente con inteligencia artificial que atiende por voz y medición completa.",
    url: "https://www.reformadisimo.es",
    enlaceTexto: "Visitar la web",
    publicado: true,
  },
  {
    nombre: "Mi Estela",
    logo: { src: "/logos/mi-estela.png", ancho: 240, alto: 240 },
    sector: "App familiar para iPhone y Android",
    resumen:
      "De la idea a la App Store y Google Play en unos 120 días, con suscripción de pago. Mapa en tiempo real, avisos de llegada, chat, llamadas, asistente con IA y 17 idiomas.",
    url: "https://miestela.app",
    enlaceTexto: "Conocer la app",
    publicado: true,
  },
  {
    nombre: "AMS Cerramientos",
    logo: { src: "/logos/ams.png", ancho: 640, alto: 214 },
    sector: "Ventanas y cerramientos",
    resumen:
      "Web con configurador que da el precio al momento, páginas por zona y una velocidad en el móvil que pasó de 56 a 94 sobre 100.",
    url: "https://ams-cerramientos-ejemplo.vercel.app",
    enlaceTexto: "Ver la web",
    publicado: true,
  },
  {
    nombre: "Tierno Centella",
    logo: { src: "/logos/tierno-centella.png", ancho: 500, alto: 148 },
    sector: "Despacho de abogados laboralistas",
    resumen:
      "Catorce herramientas gratuitas, 47 guías, asistente con IA y versión en inglés. La velocidad en el móvil pasó de 49 a 94 sobre 100.",
    url: "https://tierno-centella-web.vercel.app",
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
    texto: "No pagas la web: solo la cuota mensual, con seis meses de permanencia. Después no hay ninguna: sigues porque te compensa y te vas cuando quieras.",
  },
  {
    titulo: "Nada sale sin tu visto bueno",
    texto: "Ni una respuesta a una reseña, ni un anuncio, ni un artículo se publica en tu nombre sin que lo hayas visto.",
  },
  {
    titulo: "Precio fijo, sin comisiones",
    texto: "Inviertas mil euros en anuncios o un millón, nunca te cobramos un porcentaje de lo que inviertes. Pagas a Google o a Meta con tu tarjeta; nosotros no tocamos ese dinero.",
  },
];

export const PREGUNTAS = [
  {
    p: "Ya tengo web. ¿Hay que tirarla?",
    r: "No necesariamente. En el estudio gratuito te decimos qué vale y qué no. Si cambiamos de web, redirigimos todas las direcciones antiguas para que no pierdas lo que ya tienes en Google.",
  },
  {
    p: "Me lo lleva un sobrino, o un conocido. ¿Para qué cambiar?",
    r: "Si te funciona, genial. Normalmente esa persona lleva una parte, la web o las redes. Una empresa que capta clientes por internet necesita unos veinte oficios trabajando juntos, y eso es lo que hacemos.",
  },
  {
    p: "¿Cuánto tardáis en hacer lo que os pido?",
    r: "Te respondemos el mismo día laborable. Lo del día a día (un cambio, una página nueva, un artículo, una campaña) está hecho en 48 horas como máximo, y normalmente mucho antes. Una web nueva la tienes en unos días, normalmente en menos de una semana según el volumen de trabajo, no en los tres, cuatro o cinco meses habituales. Los proyectos más grandes, como una app o conectar tu CRM, llevan una fecha cerrada que te damos antes de empezar. Si nos falta algo tuyo (un texto, una foto, un acceso), el plazo empieza cuando lo tenemos, y te lo decimos al momento. Y en tu panel ves cada petición, quién la lleva y cuándo estará lista.",
  },
  {
    p: "¿Me cobraréis aparte por cada cosa que os pida?",
    r: "No. Va todo incluido en la cuota: cambios en la web, calculadoras nuevas, artículos, campañas, el rediseño del logo si lo necesitas. Nada de «eso son 100 € más». El SEO también va incluido: muchas agencias lo cobran como cuota aparte. Solo va aparte lo que pagas directamente a otros: lo que inviertas en anuncios, la grabación de vídeo profesional y, si quieres, el espacio en radio o prensa o un artículo en un medio, que cobra el propio medio. Te lo proponemos con su precio y no se compra nada sin tu visto bueno.",
  },
  {
    p: "¿Cuánto cuesta?",
    r: "Una cuota mensual fija, la misma seas pyme, mediana o gran empresa, que lo incluye todo: web, CRM, Google, anuncios, redes, automatizaciones y cada cambio que pidas. Te la contamos en el estudio gratuito, junto con lo que haríamos por tu negocio. Por separado, todo eso te costaría bastante más: lo tienes calculado en la tabla de servicios.",
  },
  {
    p: "¿Hay permanencia?",
    r: "Seis meses, porque la web te la regalamos. Después no hay ninguna: te quedas porque te compensa y te puedes ir cuando quieras, llevándote todo, que ya está a tu nombre.",
  },
  {
    p: "¿Garantizáis resultados?",
    r: "Los resultados no los puede garantizar nadie con honradez: ni el primer puesto en Google ni que una IA te recomiende, porque dependen también del mercado y de tu negocio. Lo que sí te garantizamos es nuestro esfuerzo, con todo lo que sabemos. Y te podemos decir que, hasta hoy, esos resultados los hemos conseguido en todas las empresas con las que hemos trabajado.",
  },
  {
    p: "¿Con cuántas empresas habéis trabajado?",
    r: "Con muchas: las que ves en nuestros trabajos y muchas más a lo largo de más de veintidós años, algunas durante muchos años seguidos. No damos una cifra porque preferimos enseñarte resultados, no números redondos. En el estudio gratuito te contamos casos parecidos al tuyo.",
  },
  {
    p: "¿Y si me entra más trabajo del que puedo atender?",
    r: "Es justo lo que buscamos: que no des abasto. Y nos ha pasado. Si llega el momento, bajamos la publicidad o la pausamos en el momento y ajustamos para que te lleguen solo las peticiones que puedes asumir. Lo hacemos rápido, que es otro de nuestros puntos fuertes, y cuando vuelvas a tener hueco, lo subimos otra vez.",
  },
  {
    p: "¿Qué velocidad tendrá mi web?",
    r: "De las más rápidas de internet: es un compromiso. Tu web, cargada en 2 segundos como máximo y, lo ideal, en menos de medio segundo; y 100, 100, 100 en PageSpeed Insights, la herramienta de Google. No te diremos que lo clavamos a la primera, pero siempre estarás muy cerca de lo óptimo, como esta misma web. Para que te hagas una idea, solo el 48 % de las webs aprueba en el móvil la velocidad que pide Google, según HTTP Archive.",
  },
  {
    p: "¿Trabajáis también para mi competencia?",
    r: "Trabajamos para quien consideramos oportuno y no firmamos exclusividad por defecto. Si quieres que no trabajemos para tu competencia directa, se puede pactar, con una cuota más alta; hay clientes que lo han elegido y están encantados. Por cierto: muchos de nuestros mejores trabajos no los podemos enseñar, porque el cliente prefiere que su competencia no sepa quién está detrás.",
  },
  {
    p: "¿Y si lo pruebo y no me convence?",
    r: "Para eso están los seis meses: es la forma de probarlo. En ese tiempo ya tienes tu web nueva, tu CRM, tus calculadoras y todo lo que hayamos puesto en marcha, que por separado costaría muchísimo más que esas seis cuotas. Si después no te convence, te vas y te lo llevas todo.",
  },
  {
    p: "¿Cuánto tardáis en hacer una web?",
    r: "Unos días, no meses. Según el volumen de trabajo que tengamos, pueden ser 48 horas, tres días o una semana; lo normal es no pasar de una semana. No te lo garantizamos por escrito, igual que quien te dice tres meses tampoco te lo garantiza y luego tarda cinco. Y nuestra intención es que además sea mejor que la de quien te cobra 25.000 €, dentro de tu cuota.",
  },
  {
    p: "¿Cómo podéis cobrar tan poco por tanto?",
    r: "Porque no tenemos estructura que pagar: ni oficinas de lujo, ni capas de jefes, ni comerciales a comisión. Las herramientas profesionales las pagamos una vez y sirven a todos nuestros clientes, y la IA y la automatización hacen en horas lo que antes llevaba semanas. Ese ahorro no nos lo quedamos: lo volcamos en tu cuota, porque preferimos clientes para muchos años a facturas para hoy.",
  },
  {
    p: "¿De verdad lo hacéis mejor que quien me cobra 25.000 € por una web?",
    r: "Esa es nuestra intención, y la de cada cosa que hacemos. No podemos garantizarlo por escrito, porque cada caso es distinto, pero lo intentamos con todas nuestras fuerzas y con más de veintidós años de experiencia, y hasta hoy no ha habido un solo caso en que no lo consiguiéramos. No hace falta que nos creas: en el estudio gratuito ves lo que haríamos antes de decidir nada.",
  },
  {
    p: "¿Cuánto tarda en notarse?",
    r: "La velocidad de la web, el primer día. La ficha de Google y las reseñas, en semanas. Google y las IA, entre 3 y 6 meses. Te lo contamos cada día para que veas por dónde va.",
  },
  {
    p: "¿Qué tengo que hacer yo?",
    r: "Lo mínimo: quince minutos para darnos los accesos, unas fotos de tus trabajos y tu visto bueno a lo que salga en tu nombre. Del resto nos ocupamos nosotros.",
  },
  {
    p: "Si hacéis de todo, ¿no lo haréis peor que una agencia especializada?",
    r: "Es justo al revés. Una agencia de anuncios no puede tocar tu web aunque vea que falla, y un SEO no puede cambiar tus campañas. Cada una hace bien su trozo y nadie responde del resultado. Nosotros dominamos cada frente y los trabajamos juntos: lo que descubrimos en los anuncios lo arreglamos en la web el mismo día, y medimos lo que de verdad importa, los clientes. No hace falta que nos creas: mira nuestros trabajos, tu panel y el estudio gratuito, que compara lo que tienes hoy con lo que haríamos.",
  },
  {
    p: "¿Podéis hacer cualquier cosa que se me ocurra?",
    r: "Prácticamente sí: una app para iPhone y Android, un CRM, una campaña de radio, un anuncio en prensa, un vídeo profesional. Lo poco que no hacemos en casa, como grabar vídeo o la locución de un anuncio, lo hacemos con productoras y agencias con las que ya trabajamos, y tú no tienes que buscar a nadie. Eso sí: te diremos con sinceridad qué te conviene y qué no, y te preparamos un plan de inversión mes a mes y para el año, para sacar el máximo a cada euro.",
  },
  {
    p: "¿Qué más entra en la cuota, aparte de web, SEO, anuncios y redes?",
    r: "Mucho de lo que otras agencias cobran aparte: reservas y citas online con recordatorio por WhatsApp, gestión de reseñas, landings sin límite, un asistente con IA en tu web y en WhatsApp, presupuestos online con firma, encuestas de satisfacción, un programa de recomendación, la web en varios idiomas, Google Shopping, tienda online, un área privada para tus clientes, herramientas internas, el diseño de tu marca (logo, manual y papelería; la impresión va aparte), medición de llamadas, vigilancia de tu competencia, vídeos con IA y una web accesible y legal. Te montamos lo que tenga sentido para tu empresa, cuando lo necesites, sin pagar más.",
  },
  {
    p: "¿Qué es un CRM y para qué lo quiero?",
    r: "Es tu agenda de clientes, pero inteligente. Cada persona que te contacta entra sola, con de dónde vino (Google, un anuncio, Instagram, una recomendación), qué te pidió, qué presupuesto le enviaste y si acabó firmando. Con eso sabemos qué te trae clientes de verdad y dónde poner el dinero, y tu equipo no pierde ningún contacto. Es opcional, pero muy recomendable.",
  },
  {
    p: "¿Os conectáis con mi CRM? ¿Y si no tengo?",
    r: "Sí, y te lo recomendamos: que cada contacto de la web, del chat, de WhatsApp o de los anuncios entre solo en tu programa de clientes, con su origen y todo lo que hizo antes de escribirte. Trabajamos con los habituales, como HubSpot, Zoho, Salesforce o Pipedrive. Y si no tienes ninguno, te creamos un CRM a medida, sencillo y a tu nombre, sin licencias por usuario. Va incluido en tu cuota. Con él hacemos los seguimientos: nada de boletines masivos, sino el mensaje justo a quien lo necesita.",
  },
  {
    p: "¿Hacéis también radio o prensa?",
    r: "Sí. Preferimos lo digital porque se mide al euro, pero la radio la recomendamos en muchos casos: empuja todo lo demás y hace que tus campañas de internet rindan más. Te hacemos el guion, la grabación con voces profesionales, elegimos emisoras y franjas, y tratamos con las emisoras. La prensa escrita no solemos aconsejarla, pero si la quieres te diseñamos el anuncio y hablamos con los periódicos. Todo eso va incluido en la cuota; el espacio en la emisora o el periódico lo pagas tú directamente al medio.",
  },
  {
    p: "¿Y Bing? ¿Merece la pena?",
    r: "Sí, y va incluido. En España Bing se lleva cerca del 3,5 % de las búsquedas, pero en los ordenadores pasa del 12 %, porque viene de serie en Windows y en Edge. Además alimenta a Copilot, el asistente de Microsoft. Como casi nadie lo trabaja, es más fácil salir arriba y los anuncios suelen costar menos. Ponemos tu web y tu ficha en Bing y, si conviene, campañas en Microsoft Ads.",
  },
  {
    p: "¿Cómo sabré qué funciona?",
    r: "Tendrás tu propio panel de control, en el móvil y en tiempo real: cuántos contactos y clientes llegan, de dónde viene cada uno (Google, un anuncio concreto, Instagram, el mapa, ChatGPT, un correo), lo que cuesta cada cliente y todo lo que hemos hecho. Lo medimos con Tag Manager, Google Analytics, el píxel de Meta y las etiquetas de cada red, bien instalados desde el primer día. En esta web tienes un panel de ejemplo para verlo con tus propios ojos.",
  },
  {
    p: "¿Y el vídeo?",
    r: "Te damos las ideas, el guion, cómo grabarlo con el móvil, y lo montamos si nos lo das. Para grabarlo de forma profesional te ponemos en contacto con la agencia audiovisual con la que trabajamos. Va aparte, y se lo pagas tú directamente: más transparente. Lo mismo que lo que inviertas en anuncios o una nota de prensa en un medio, si la quieres.",
  },
];

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
    solucion: "Vigilamos cada euro y te decimos cuánto te cuesta cada cliente.",
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
];

// Qué incluye el estudio gratuito (sacado de las guías de AMS y Tierno Centella).
export const ESTUDIO = [
  { titulo: "Tu situación en cinco minutos", texto: "Un resumen claro y un semáforo por áreas: qué está en verde, qué en ámbar y qué en rojo." },
  { titulo: "Tu web, a examen", texto: "Velocidad en el móvil, fallos y todo lo que hoy te hace perder clientes." },
  { titulo: "Cómo te encuentran en Google", texto: "Qué buscan tus clientes, dónde sales tú y dónde sale tu competencia." },
  { titulo: "Qué dicen de ti las IA", texto: "Preguntamos a ChatGPT y a Gemini lo que preguntaría un cliente, y vemos si te recomiendan." },
  { titulo: "Tu ficha de Google y tus reseñas", texto: "Tu nota, las reseñas sin contestar y lo que haría falta para subir." },
  { titulo: "Tu competencia y sus anuncios", texto: "Quién te gana y por qué, y qué anuncios están pagando, con datos públicos." },
  { titulo: "Lo que haríamos", texto: "Cada problema con su solución, un plan de 30 días y cuánto tarda en notarse." },
  { titulo: "La portada de tu web nueva", texto: "Para que veas, antes de decidir nada, cómo podría ser." },
];

// Más cosas que entran en la cuota, para la visión 360 (decidido por Ig el 24 oct 2026).
export const TAMBIEN_INCLUIDO: { t: string; d: string; logo?: string; icono: string }[] = [
  { icono: "calendario", logo: "WhatsApp", t: "Reservas y citas online", d: "Tus clientes reservan solos desde la web y reciben el recordatorio por WhatsApp. Menos citas a las que no viene nadie." },
  { icono: "estrella", logo: "Ficha de Google", t: "Reseñas", d: "Pedimos reseña después de cada venta y contestamos todas, en Google, Bing y Apple Maps." },
  { icono: "pagina", t: "Landings sin límite", d: "Una página a medida para cada campaña, cada servicio o cada ciudad. ¿Otra? Incluida." },
  { icono: "chat", logo: "Claude", t: "Asistente con IA", d: "En tu web y en WhatsApp, a cualquier hora. Responde, recoge los datos y los mete en tu CRM." },
  { icono: "firma", t: "Presupuestos con firma", d: "Calculadoras y presupuestos online que tu cliente acepta y firma desde el móvil, sin papeles." },
  { icono: "sonrisa", t: "Encuestas de satisfacción", d: "Saltan solas después de cada trabajo: detectan al cliente descontento a tiempo y al contento le piden la reseña." },
  { icono: "regalo", t: "Programa de recomendación", d: "Trae a un amigo, con su código y su seguimiento en el CRM, para que el boca a boca se note." },
  { icono: "idiomas", t: "Web en varios idiomas", d: "Inglés, francés o el idioma de tus clientes, bien traducido y posicionado en cada uno." },
  { icono: "carrito", logo: "Google", t: "Tienda online y Shopping", d: "Para vender por internet, con pagos y envíos, y tus productos con foto y precio en Google Shopping." },
  { icono: "llave", t: "Área privada para tus clientes", d: "Donde tus clientes ven sus pedidos, documentos o el estado de su trabajo." },
  { icono: "engranaje", t: "Herramientas internas", d: "Partes de trabajo, inventario, fichajes o tu propia intranet, hechas a la medida de tu empresa." },
  { icono: "pincel", t: "Tu marca", d: "Diseño de logo, colores, manual de marca, tarjetas y papelería. La impresión, si la necesitas, la encargas tú a la imprenta." },
  { icono: "telefono", t: "Medición de llamadas", d: "Cada llamada entra en tu CRM con el anuncio o la página que la trajo, no solo los formularios." },
  { icono: "lupa", t: "Vigilancia de tu competencia", d: "Cada mes, qué hacen tus competidores en Google, en anuncios y en redes, y cómo adelantarlos." },
  { icono: "video", logo: "YouTube", t: "Vídeos con IA y con móvil", d: "Vídeos cortos para redes y anuncios, montados por nosotros con tu material o con IA." },
  { icono: "accesible", t: "Web accesible y legal", d: "Accesibilidad, cookies, privacidad y avisos legales al día, como pide la ley." },
];

// Las cuatro promesas de Casiopea 360 (mensaje central, 24 oct 2026).
export const PROMESAS: { t: string; d: string; pie: string }[] = [
  {
    t: "Mejor.",
    d: "Si alguien te pide 25.000 € por una web, nuestra intención es hacértela mejor, dentro de tu cuota. Y lo mismo con el SEO, los anuncios o el CRM.",
    pie: "No garantizamos resultados: garantizamos nuestro esfuerzo. Y hasta hoy, los resultados han llegado en todas las empresas con las que hemos trabajado.",
  },
  {
    t: "En días, no en meses.",
    d: "Donde otros tardan tres, cuatro o cinco meses en entregarte una web, tú la tienes en unos días: a veces 48 horas, normalmente menos de una semana. Y cada cambio del día a día, en 48 horas como máximo.",
    pie: "Lo caro de una agencia no es solo la factura: es todo lo que tardan. Aquí no esperas.",
  },
  {
    t: "Por mucho menos.",
    d: "Una sola cuota fija, la misma para cualquier tamaño de empresa, que cuesta bastante menos que contratar cada cosa por separado.",
    pie: "Seis meses de permanencia, porque la web te la regalamos. Después te quedas porque quieres y te vas cuando quieras.",
  },
  {
    t: "Sin darte la lata.",
    d: "Te lo gestionamos todo nosotros. Las menos reuniones posibles, casi todo por escrito y tu panel para mirarlo cuando te apetezca.",
    pie: "Lo único que debería ocuparte son los resultados. Y vamos a por los mejores posibles.",
  },
];

// Por qué podemos cobrar tan poco.
export const POR_QUE_BARATO: { t: string; d: string }[] = [
  { t: "Sin estructura que pagar", d: "Sin oficinas de lujo, sin capas de jefes y sin comerciales a comisión. Trabajamos en remoto, y ese dinero no sale de tu bolsillo." },
  { t: "Herramientas compartidas", d: "Las licencias profesionales de análisis, diseño, SEO e IA las pagamos una vez y las aprovechan todos nuestros clientes." },
  { t: "La tecnología de hoy", d: "La IA y la automatización hacen lo repetitivo; las personas, lo que hay que pensar. Lo que antes llevaba semanas hoy lleva horas." },
  { t: "Todo el margen, para ti", d: "Lo que otros gastan en estructura lo volcamos en tu cuota. Queremos clientes para muchos años, no facturas para hoy." },
];

// Lo que creemos (Quiénes somos).
export const CREEMOS: string[] = [
  "Que el buen marketing no debería ser un lujo. Queremos democratizar los precios.",
  "Que se crece con clientes a largo plazo, no a base de facturas.",
  "Que un proveedor no debería darte la lata. Si nos tienes que perseguir, lo estamos haciendo mal.",
  "Que la mejor tecnología tiene que estar al alcance de cualquier empresa, y nosotros la estrenamos cada semana.",
  "Que esto se hace bien cuando se disfruta. Y a nosotros nos encanta ver crecer a una empresa.",
  "Que nuestro trabajo es ayudarte a crecer o, cuando toca, a estabilizarte y mantener lo que has construido.",
];
