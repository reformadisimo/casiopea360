// Menú principal. Lo usan la cabecera, el pie y el mapa del sitio.
export const SITIO = {
  nombre: "Casiopea 360",
  // Mientras no esté comprado y apuntado el dominio, se usa la dirección de Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://casiopea360.vercel.app",
  descripcion:
    "Crece en digital sin lidiar con cinco agencias: web en días, SEO, anuncios, redes, CRM e IA con un solo equipo. Una cuota fija para cualquier empresa.",
  // Mientras la web sea provisional, no se deja indexar. El día del lanzamiento: true.
  indexable: false,
};

export type Enlace = { texto: string; href: string; detalle?: string };

export const SERVICIOS_MENU: Enlace[] = [
  { texto: "Web y apps", href: "/servicios#web", detalle: "Tu escaparate y tu app, rápidos y tuyos" },
  { texto: "Google y las IA", href: "/servicios#google", detalle: "Que te encuentre quien te busca" },
  { texto: "Anuncios", href: "/servicios#anuncios", detalle: "Cada euro vigilado, sin comisiones" },
  { texto: "Redes y contenido", href: "/servicios#redes", detalle: "Que se vea lo bien que trabajas" },
  { texto: "Automatización e IA", href: "/servicios#automatizacion", detalle: "Contactos que no se pierden" },
  { texto: "Tu CRM a medida", href: "/servicios#crm", detalle: "Sabes de dónde viene cada cliente" },
  { texto: "Reservas, reseñas y tienda", href: "/servicios#incluido", detalle: "Y mucho más, dentro de tu cuota" },
  { texto: "Apps y lo que se te ocurra", href: "/servicios#lo-que-sea", detalle: "Si te conviene, lo hacemos" },
  { texto: "Radio y fuera de internet", href: "/servicios#fuera", detalle: "Campañas que empujan lo digital" },
  { texto: "Cuánto te costaría por separado", href: "/servicios#costes", detalle: "La tabla, por tamaño de empresa" },
];

export const MENU: (Enlace & { hijos?: Enlace[] })[] = [
  { texto: "Servicios", href: "/servicios", hijos: SERVICIOS_MENU },
  {
    texto: "Cómo trabajamos",
    href: "/como-trabajamos",
    hijos: [
      { texto: "Panel de ejemplo", href: "/panel", detalle: "Así verás tus resultados en tiempo real" },
    ],
  },
  { texto: "Trabajos", href: "/trabajos" },
  { texto: "Nosotros", href: "/quienes-somos" },
  {
    texto: "Haz el test",
    href: "/test",
    hijos: [
      { texto: "Test rápido", href: "/test#rapido", detalle: "Un minuto: ¿cómo está tu marketing?" },
      { texto: "Test completo", href: "/test#completo", detalle: "50 preguntas: tu nota, lo que pagas y qué mejorar" },
    ],
  },
  { texto: "Blog", href: "/blog" },
  { texto: "Preguntas", href: "/preguntas" },
];

export const LEGALES: Enlace[] = [
  { texto: "Aviso legal", href: "/aviso-legal" },
  { texto: "Privacidad", href: "/privacidad" },
  { texto: "Cookies", href: "/cookies" },
];
