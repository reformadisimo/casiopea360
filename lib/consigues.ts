// «Lo que consigues»: cada pieza del estudio gratuito, con su captura real y su ejemplo vivo.
// Las capturas salen de la web de ejemplo (Fuero Abogados, despacho inventado) y de los ejemplos de esta web.
export const FUERO = "https://fuero-abogados.vercel.app";

export type Pieza = {
  id: string;
  n: number;
  titulo: string; // «Tu web, entera y nueva»
  corto: string; // dos o tres palabras, para la galería pequeña
  frase: string; // una línea, para dummies
  detalle: string; // dos frases más, en la página completa
  captura: string; // /ejemplo/<archivo>.webp (1400 de ancho, 16:10)
  movil?: string; // captura vertical opcional
  href: string;
  ver: string; // texto del botón
  color: string;
  icono: string; // iconos del kit Vida
};

export const PIEZAS: Pieza[] = [
  {
    id: "web",
    n: 1,
    titulo: "Tu web, entera y nueva",
    corto: "Tu web nueva",
    frase: "No un boceto: tu web completa, página a página, lista para abrir.",
    detalle: "La hacemos con lo que sabemos de tu negocio y te la enseñamos funcionando, también en el móvil. La ves en un enlace privado, como la verían tus clientes. Si trabajas con nosotros, se publica.",
    captura: "/ejemplo/web-portada.webp",
    movil: "/ejemplo/web-movil.webp",
    href: FUERO,
    ver: "Abrir la web de ejemplo",
    color: "#1d4ed8",
    icono: "pagina",
  },
  {
    id: "guia",
    n: 2,
    titulo: "Tu guía: 29 apartados sobre tu empresa",
    corto: "Tu guía",
    frase: "Cómo estás hoy, qué falla y qué haríamos, con fotos y sin palabrería.",
    detalle: "Cada apartado empieza con una foto y una frase. Si quieres más, pulsas «Ver el detalle». Se lee en cinco minutos o en una tarde, como prefieras, y la puedes descargar en PDF.",
    captura: "/ejemplo/guia.webp",
    href: `${FUERO}/guia-fuero`,
    ver: "Leer la guía de ejemplo",
    color: "#7c3aed",
    icono: "lista",
  },
  {
    id: "fallos",
    n: 3,
    titulo: "Lo que falla en tu web de hoy, con pruebas",
    corto: "Qué falla hoy",
    frase: "Velocidad, textos, botones, Google: te enseñamos dónde se te escapan clientes.",
    detalle: "No opinamos: medimos. Cuánto tarda tu web en el móvil, qué nota le pone Google y qué pasa cuando alguien intenta llamarte. Y al lado, cómo queda arreglado.",
    captura: "/ejemplo/mejoras.webp",
    href: `${FUERO}/guia-fuero#4-lo-que-falla-en-la-web-actual-con-pruebas`,
    ver: "Ver un ejemplo",
    color: "#be185d",
    icono: "lupa",
  },
  {
    id: "competencia",
    n: 4,
    titulo: "Tu competencia, sin secretos",
    corto: "Tu competencia",
    frase: "Quién gana en tu zona, qué anuncios pone y qué prometen (y qué no copiaríamos).",
    detalle: "Miramos a tus competidores reales: sus visitas, sus reseñas, sus anuncios y sus trucos. Así sabes dónde brillar y dónde no merece la pena pelear.",
    captura: "/ejemplo/competencia.webp",
    href: `${FUERO}/guia-fuero#7-tus-competidores-en-madrid`,
    ver: "Ver un ejemplo",
    color: "#b45309",
    icono: "trofeo",
  },
  {
    id: "herramientas",
    n: 5,
    titulo: "Calculadoras y tests para tus clientes",
    corto: "Tus herramientas",
    frase: "Herramientas que resuelven dudas solas y te traen contactos con nombre y teléfono.",
    detalle: "En el ejemplo hay 21: calculadoras, tests y comprobadores. Cada una responde una pregunta real de un cliente y acaba con su contacto en tu CRM.",
    captura: "/ejemplo/herramientas.webp",
    href: `${FUERO}/herramientas`,
    ver: "Probar las herramientas",
    color: "#0f766e",
    icono: "herramienta",
  },
  {
    id: "correos",
    n: 6,
    titulo: "Los correos que recibirían tus clientes",
    corto: "Tus correos",
    frase: "Desde el minuto uno hasta que te contratan: escritos, uno a uno, para firmar.",
    detalle: "Una secuencia por cada tipo de cliente: confirmación al momento, consejos útiles, un caso parecido al suyo y la invitación a hablar. Tú los revisas, nosotros los enviamos solos.",
    captura: "/ejemplo/correos.webp",
    movil: "/ejemplo/correos-movil.webp",
    href: `${FUERO}/guia-fuero/correos`,
    ver: "Leer los correos de ejemplo",
    color: "#e8457a",
    icono: "prensa",
  },
  {
    id: "panel",
    n: 7,
    titulo: "Tu panel de control, cada día al día",
    corto: "Tu panel",
    frase: "De dónde llegan tus clientes, qué funciona y qué haríamos hoy, en lenguaje llano.",
    detalle: "Sin informes que nadie lee. Entras desde el móvil y lo ves: baterías de colores, las cuatro cifras que importan y la tarea del día. Y si quieres, un resumen por correo.",
    captura: "/ejemplo/panel.webp",
    movil: "/ejemplo/panel-movil.webp",
    href: "/panel",
    ver: "Probar el panel de ejemplo",
    color: "#047857",
    icono: "grafica",
  },
  {
    id: "crm",
    n: 8,
    titulo: "Tu CRM: ningún contacto se pierde",
    corto: "Tu CRM",
    frase: "Cada persona que te escribe, con su historia y lo que toca hacer hoy.",
    detalle: "Te avisa de a quién llamar, guarda cada presupuesto y te dice qué anuncio trajo a cada cliente. Hecho a tu medida y sin licencias por persona.",
    captura: "/ejemplo/crm.webp",
    href: "/crm-ejemplo",
    ver: "Probar el CRM de ejemplo",
    color: "#6d28d9",
    icono: "crm",
  },
  {
    id: "lupa",
    n: 9,
    titulo: "La lupa: ves lo que hace la gente en tu web",
    corto: "Tu lupa",
    frase: "Dónde tocan, dónde se atascan y hasta dónde bajan. Sin adivinar.",
    detalle: "Mapas de calor de tu web, página a página, con conclusiones en una frase. Es lo que nos dice qué cambiar la semana que viene.",
    captura: "/ejemplo/lupa.webp",
    href: "/lupa-ejemplo",
    ver: "Probar la lupa de ejemplo",
    color: "#0369a1",
    icono: "lupa",
  },
  {
    id: "avisos",
    n: 10,
    titulo: "Avisos por WhatsApp a tus clientes",
    corto: "Tus avisos",
    frase: "Confirmación, recordatorio de cita y petición de reseña, solos.",
    detalle: "Para negocios con citas o visitas. Tú apruebas los textos una vez y los mensajes salen solos, con tu nombre. Pagas solo los mensajes.",
    captura: "/ejemplo/avisos.webp",
    href: "/avisos-ejemplo",
    ver: "Ver los avisos de ejemplo",
    color: "#15803d",
    icono: "chat",
  },
];

export const PIEZAS_RESUMEN = PIEZAS.filter((p) => ["web", "guia", "correos", "panel", "crm", "competencia"].includes(p.id));
