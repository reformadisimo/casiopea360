// Casos con página propia: /trabajos/<slug>.
// Regla: solo datos comprobados y ya publicados. Nada de cifras inventadas.
export type Caso = {
  slug: string;
  nombre: string; // igual que en TRABAJOS
  titular: string;
  descripcionSeo: string;
  video: string;
  videoAlt: string;
  color: string;
  reto: string;
  hicimos: string[];
  datos: { cifra: string; texto: string }[];
  servicios: string[]; // slugs de PAGINAS_SERVICIO
  nota?: string;
};

export const CASOS: Caso[] = [
  {
    slug: "reformadisimo",
    nombre: "Reformadísimo",
    titular: "Una empresa de reformas que vende con calculadoras y una asistente que habla.",
    descripcionSeo:
      "Caso Reformadísimo: web con calculadoras de precio, asistente con inteligencia artificial que atiende por voz y medición completa. Desde 2012 y más de 1.150 obras.",
    video: "arquitecto-mesa",
    videoAlt: "Un arquitecto trabaja en su mesa",
    color: "#c2410c",
    reto:
      "Nuestra propia empresa de reformas en Madrid. Lo probamos todo aquí primero: si no trae clientes, no lo vendemos.",
    hicimos: [
      "Calculadoras para que cada cliente vea un precio orientativo al momento",
      "Una asistente con inteligencia artificial que atiende a cualquier hora, también por voz",
      "Medición completa: de qué página y de qué anuncio viene cada contacto",
      "Contenido y fichas para aparecer en Google y en las IA",
    ],
    datos: [
      { cifra: "2012", texto: "trabajando desde entonces" },
      { cifra: "+1.150", texto: "obras realizadas" },
      { cifra: "24 h", texto: "su asistente atiende a cualquier hora" },
    ],
    servicios: ["diseno-web", "automatizacion-ia", "seo-google-ia"],
  },
  {
    slug: "mi-estela",
    nombre: "Mi Estela",
    titular: "De una idea a una app en las dos tiendas, cobrando suscripciones, en unos 120 días.",
    descripcionSeo:
      "Caso Mi Estela: app familiar para iPhone y Android publicada en App Store y Google Play en unos 120 días, con suscripción, mapa en tiempo real, chat, llamadas, asistente con IA y 17 idiomas.",
    video: "movil-personas",
    videoAlt: "Personas en holograma conversando sobre un móvil",
    color: "#7c3aed",
    reto:
      "Una app familiar para saber que los tuyos han llegado bien, sin vigilar a nadie. Con pagos y en muchos idiomas.",
    hicimos: [
      "La app para iPhone y Android, publicada en App Store y Google Play",
      "Suscripción de pago dentro de la app",
      "Mapa en tiempo real y avisos de llegada",
      "Chat, llamadas y un asistente con inteligencia artificial",
      "Traducida a 17 idiomas",
    ],
    datos: [
      { cifra: "≈120", texto: "días de la idea a las tiendas" },
      { cifra: "2", texto: "tiendas: App Store y Google Play" },
      { cifra: "17", texto: "idiomas" },
    ],
    servicios: ["diseno-web", "automatizacion-ia"],
  },
  {
    slug: "ams-cerramientos",
    nombre: "AMS Cerramientos",
    titular: "Una web de ventanas que da el precio al momento y vuela en el móvil.",
    descripcionSeo:
      "Caso AMS Cerramientos: web con configurador que da el precio al momento, páginas por zona y una velocidad en el móvil que pasó de 56 a 94 sobre 100 en PageSpeed.",
    video: "taller-hombre",
    videoAlt: "Un hombre trabaja en su taller",
    color: "#1f6feb",
    reto:
      "Una web lenta en el móvil, justo donde la busca la gente. Y clientes que querían saber el precio antes de llamar.",
    hicimos: [
      "Un configurador que da el precio al momento",
      "Páginas por zona, para aparecer donde trabajan",
      "Una web nueva, rápida en el móvil",
    ],
    datos: [
      { cifra: "56 → 94", texto: "velocidad en el móvil, sobre 100 (PageSpeed)" },
      { cifra: "Al momento", texto: "el precio, con el configurador" },
    ],
    servicios: ["diseno-web", "seo-google-ia"],
    nota: "Datos de PageSpeed Insights medidos antes y después de la web nueva. Las notas varían un poco en cada medición.",
  },
  {
    slug: "tierno-centella",
    nombre: "Tierno Centella",
    titular: "Un despacho de abogados que atrae clientes ayudando gratis.",
    descripcionSeo:
      "Caso Tierno Centella: catorce herramientas gratuitas, 47 guías, asistente con IA y versión en inglés para un despacho laboralista. Velocidad en el móvil de 49 a 94 sobre 100.",
    video: "despacho",
    videoAlt: "Una reunión distendida en un despacho",
    color: "#0f766e",
    reto:
      "Una web lenta en el móvil. La idea: ayudar gratis a quien tiene un problema laboral, para que confíe.",
    hicimos: [
      "Catorce herramientas gratuitas para trabajadores y empresas",
      "47 guías que responden a lo que pregunta la gente",
      "Un asistente con inteligencia artificial",
      "Versión completa en inglés",
      "Una web nueva, rápida en el móvil",
    ],
    datos: [
      { cifra: "49 → 94", texto: "velocidad en el móvil, sobre 100 (PageSpeed)" },
      { cifra: "14", texto: "herramientas gratuitas" },
      { cifra: "47", texto: "guías" },
    ],
    servicios: ["diseno-web", "seo-google-ia", "automatizacion-ia"],
    nota: "Datos de PageSpeed Insights medidos antes y después de la web nueva. Las notas varían un poco en cada medición.",
  },
];

export const casoPorSlug = (slug: string) => CASOS.find((c) => c.slug === slug);
export const casoDe = (nombre: string) => CASOS.find((c) => c.nombre === nombre);
