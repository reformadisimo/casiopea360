// Lista completa de lo que hace Casiopea 360. UN solo sitio: la página /todos-los-servicios sale de aquí.
// Para añadir un servicio, se añade una línea en el grupo que toque. Sin precios ni garantías en estos textos:
// lo que depende de terceros (Google, Meta) se dice como es. El precio está en /servicios#precio.

export type ServicioCatalogo = {
  t: string; // nombre corto
  d: string; // una frase en llano
  nuevo?: boolean; // marca «Nuevo» (quitar a los pocos meses)
  enlace?: { texto: string; href: string };
};

export type GrupoCatalogo = {
  id: string;
  nombre: string;
  frase: string;
  icono: string;
  servicios: ServicioCatalogo[];
};

export const CATALOGO: GrupoCatalogo[] = [
  {
    id: "google",
    nombre: "Google, tu ficha y las IA",
    frase: "Que te encuentre quien te busca, y que lo que vea de ti convenza.",
    icono: "mapa",
    servicios: [
      {
        t: "Tu ficha de Google, a punto",
        d: "La ficha que sale en Google y en Maps cuando te buscan (el Perfil de empresa de Google): categorías, descripción, servicios, horario, zona, fotos y novedades. La llevamos con tu permiso y a tu nombre.",
        enlace: { texto: "Cómo cuidamos tu ficha", href: "/blog/ficha-de-google-que-es-y-como-sacarle-partido" },
      },
      { t: "Publicaciones y fotos en la ficha", d: "Novedades, trabajos terminados y fotos nuevas, para que la ficha no parezca abandonada." },
      { t: "Preguntas de tus clientes en la ficha", d: "Contestamos las preguntas que te dejan tus clientes." },
      { t: "Tu ficha también en Bing y Apple Maps", d: "La misma información, igual en todos los sitios, para que no haya datos distintos de tu empresa." },
      {
        t: "Reseñas: pedirlas y contestarlas",
        d: "Una tarjeta con código QR, un mensaje de WhatsApp o un correo para que tus clientes reales dejen su reseña, y respuesta a cada una con un texto cuidado y tu visto bueno.",
        enlace: { texto: "Cómo pedir reseñas", href: "/blog/como-pedir-resenas-en-google-whatsapp-correo-y-tarjeta-con-qr" },
      },
      {
        t: "Reseñas falsas: las denunciamos",
        d: "Si te dejan una reseña falsa o que incumple las normas, la identificamos, reunimos las pruebas y pedimos a Google que la retire. Quitarla lo decide Google, no nosotros, y no podemos asegurarlo. Y nunca escribimos ni compramos reseñas falsas.",
        nuevo: true,
      },
      { t: "Reseñas difíciles, con calma", d: "Si hay una reseña dura pero real, te preparamos la respuesta para que quede bien delante de quien la lea." },
      { t: "SEO para que te encuentren cerca", d: "Que Google entienda dónde estás y qué haces, para salir cuando alguien busca «cerca de mí» o por tu ciudad." },
      { t: "SEO técnico y de contenidos", d: "Títulos, velocidad, datos estructurados, enlaces entre tus páginas y redirecciones al cambiar de web, sin perder lo ganado." },
      { t: "Artículos que atraen clientes", d: "Los escribimos nosotros y tú solo los revisas." },
      { t: "Que ChatGPT, Claude, Gemini y Perplexity te nombren", d: "Preparamos tu web y tus datos para que las IA te entiendan, y vigilamos qué dicen de ti." },
      { t: "Vigilancia de tu competencia", d: "Cada mes, qué hacen los tuyos en Google, en anuncios y en redes, y cómo adelantarlos." },
    ],
  },
  {
    id: "anuncios",
    nombre: "Anuncios",
    frase: "Cada euro, vigilado. Pagas tú a Google y a Meta, sin comisiones.",
    icono: "euro",
    servicios: [
      { t: "Anuncios en Google", d: "Para quien ya está buscando lo que haces, llevando a páginas hechas para que te contacten." },
      {
        t: "Anuncios locales",
        d: "Para quien busca cerca de ti: los dirigimos a tu ciudad, tu barrio o un radio de kilómetros, en Google y en Maps, y en redes por zona. Así no pagas clics de gente a quien no puedes atender.",
        nuevo: true,
      },
      { t: "Anuncios en Instagram, Facebook, TikTok y LinkedIn", d: "Con el tope de gasto que tú decidas y con anuncios que enseñan trabajo y resuelven dudas, sin gritar." },
      { t: "Anuncios en Bing", d: "Donde casi nadie compite y el clic suele salir más barato." },
      { t: "Anuncios con tu gente o con IA", d: "Vídeos con tus propios dueños o trabajadores, o con IA avisando de ello, siempre sin actores." },
      { t: "Páginas hechas para cada campaña", d: "Una página distinta para cada anuncio, servicio o ciudad, para que quien llega vea justo lo que buscaba." },
      { t: "Contactos y llamadas medidos", d: "Cada formulario, WhatsApp y llamada entra en tu panel con el anuncio que lo trajo." },
      { t: "Revisión cada semana", d: "Miramos qué funciona, quitamos lo que no y probamos versiones nuevas." },
    ],
  },
  {
    id: "web",
    nombre: "Web y apps",
    frase: "Tu escaparate, abierto día y noche, rápido y a tu nombre.",
    icono: "pagina",
    servicios: [
      { t: "Dominio, correo y alojamiento", d: "Nos ocupamos de que tu web esté siempre en marcha, con tu dominio y tu correo." },
      { t: "Web a tu medida, rápida en el móvil", d: "En unos días, normalmente menos de una semana. La velocidad se mide y se mejora." },
      { t: "Cambiar de web sin perder Google", d: "Redirecciones y revisión de lo que ya funciona, para no empezar de cero." },
      { t: "Calculadoras y presupuestos con firma", d: "Tus clientes ven un precio al momento y lo aceptan y firman desde el móvil." },
      { t: "Configuradores de producto", d: "Tu cliente elige medidas, materiales y extras y ve el precio al momento, como un configurador de ventanas, de cocinas o de lo que vendas. Ya sabemos hacerlos y va dentro de la cuota." },
      { t: "Bases de datos y paneles a medida", d: "Si tu empresa necesita guardar y consultar datos propios (clientes, obras, stock, pedidos), la montamos a tu medida." },
      { t: "Reservas y citas online", d: "Reservan desde la web y reciben el recordatorio por WhatsApp. Menos plantones." },
      { t: "Pruebas de versiones (A/B)", d: "Dos fotos, dos titulares o dos webs enteras, para saber cuál te trae más contactos." },
      { t: "Web en varios idiomas", d: "El idioma de tus clientes, bien traducido y posicionado en cada uno." },
      { t: "Tienda online y Google Shopping", d: "Para vender por internet, con pagos y envíos, y tus productos con foto y precio en Google." },
      { t: "Área privada para tus clientes", d: "Donde ven sus pedidos, documentos o el estado de su trabajo." },
      { t: "Apps para iPhone y Android", d: "Publicadas en las tiendas y funcionando, si te conviene." },
      { t: "Herramientas internas", d: "Partes de trabajo, inventario, fichajes o una intranet a la medida de tu empresa." },
      { t: "Accesibilidad y avisos legales", d: "Accesibilidad, cookies, privacidad y avisos al día, como pide la ley." },
    ],
  },
  {
    id: "redes",
    nombre: "Redes y contenido",
    frase: "Llevamos tus redes y te damos el contenido. Tú solo sales en algún vídeo.",
    icono: "video",
    servicios: [
      { t: "LinkedIn, Facebook, Instagram y TikTok", d: "Las llevamos y publicamos nosotros, con las cuentas a tu nombre." },
      { t: "Contenido hecho", d: "Textos, imágenes y piezas para las redes, listos para publicar con tu visto bueno." },
      { t: "Vídeos con IA o con tu móvil", d: "Los montamos nosotros, con tu material o con IA, avisando siempre de que es IA." },
      { t: "Grabación con equipo", d: "La organizamos nosotros y se paga aparte, sin comisión." },
      { t: "Tu marca", d: "Logo, colores, manual de marca, tarjetas y papelería. La imprenta la encargas tú." },
    ],
  },
  {
    id: "automatizacion",
    nombre: "Automatización, CRM y medición",
    frase: "Contactos que no se pierden y cifras que se entienden.",
    icono: "chip",
    servicios: [
      { t: "Asistente con IA", d: "En tu web, en WhatsApp y por voz, a cualquier hora. Responde, recoge los datos y los pasa a tu CRM." },
      { t: "Correos de seguimiento", d: "Salen solos para no perder a nadie que pidió información, con el recorrido de cada contacto hasta que es cliente." },
      { t: "WhatsApp de empresa", d: "Con respuestas ya preparadas y avisos al móvil para citas y recordatorios." },
      { t: "Tu CRM a medida", d: "Sabes de dónde viene cada cliente, qué toca hoy y qué se ha enfriado." },
      { t: "Panel de resultados", d: "Visitas, contactos, gasto y coste por contacto, siempre con la fuente. Si falta un dato, un guion, nunca un cero." },
      { t: "Lupa 360", d: "Dónde hace clic y hasta dónde baja la gente en tu web, sin cookies." },
      { t: "Encuestas y recomendaciones", d: "Tras cada trabajo, una encuesta que avisa a tiempo del descontento y pide la reseña al contento; y un programa para que te recomienden." },
    ],
  },
  {
    id: "control",
    nombre: "Contigo, siempre al mando",
    frase: "Una sola persona te atiende y todo lo importante es tuyo.",
    icono: "llave",
    servicios: [
      { t: "Un encargado de proyecto", d: "Una sola persona te escribe y te responde. Nada de cinco proveedores distintos.", enlace: { texto: "Cómo trabajamos", href: "/como-trabajamos" } },
      { t: "Cuentas a tu nombre", d: "Google, Meta, ficha, dominio y contactos son tuyos. Nos invitas y nos quitas con un clic.", enlace: { texto: "Tú tienes el control", href: "/tu-control" } },
      { t: "Te ayudamos a abrir tus cuentas", d: "Si te atascas, te lo explicamos con una captura y, solo si hace falta y contigo delante, nos conectamos.", enlace: { texto: "Ayuda en remoto", href: "/ayuda-en-remoto" } },
      { t: "Asesoramiento de negocio", d: "Un punto de vista de empresarios: estrategia y planes de marketing y presupuestos. En fiscal, contabilidad y laboral solo orientamos y te derivamos." },
      { t: "Sin permanencia", d: "Si te vas, te llevas una copia completa de tu web, tus cuentas y tus contactos." },
    ],
  },
];

export const TOTAL_CATALOGO = CATALOGO.reduce((n, g) => n + g.servicios.length, 0);
