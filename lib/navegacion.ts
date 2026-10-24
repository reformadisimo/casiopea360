// Menú principal. Lo usan la cabecera, el pie y el mapa del sitio.
export const SITIO = {
  nombre: "Casiopea 360",
  // Mientras no esté comprado y apuntado el dominio, se usa la dirección de Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://casiopea360.vercel.app",
  descripcion:
    "Todo tu marketing digital con un solo equipo: web, apps, Google, anuncios, redes y automatizaciones. Precio fijo, sin comisiones y un parte cada día.",
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
];

export const MENU: (Enlace & { hijos?: Enlace[] })[] = [
  { texto: "Servicios", href: "/servicios", hijos: SERVICIOS_MENU },
  { texto: "Cómo trabajamos", href: "/como-trabajamos" },
  { texto: "Trabajos", href: "/trabajos" },
  {
    texto: "Haz el test",
    href: "/test",
    hijos: [
      { texto: "Test rápido", href: "/test#rapido", detalle: "Un minuto: ¿cómo está tu marketing?" },
      { texto: "Calculadora de gastos", href: "/test#calculadora", detalle: "Lo que pagas hoy, sumado" },
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
