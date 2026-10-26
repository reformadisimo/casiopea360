// Menú principal. Lo usan la cabecera, el pie y el mapa del sitio.
export const SITIO = {
  nombre: "Casiopea 360",
  // Mientras no esté comprado y apuntado el dominio, se usa la dirección de Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://casiopea360.vercel.app",
  descripcion:
    "Crece en digital sin ir de proveedor en proveedor: web en días, SEO, anuncios, redes, CRM e IA con un solo equipo. Una cuota fija para cualquier empresa.",
  // Mientras la web sea provisional, no se deja indexar. El día del lanzamiento: true.
  indexable: false,
};

export type Enlace = { texto: string; href: string; detalle?: string; icono?: string };

export const SERVICIOS_MENU: Enlace[] = [
  { icono: "pagina", texto: "Web y apps", href: "/servicios/diseno-web", detalle: "Tu escaparate y tu app, rápidos y tuyos" },
  { icono: "lupa", texto: "Google y las IA", href: "/servicios/seo-google-ia", detalle: "Que te encuentre quien te busca" },
  { icono: "euro", texto: "Anuncios", href: "/servicios/publicidad-google-ads-redes", detalle: "Cada euro vigilado, sin comisiones" },
  { icono: "video", texto: "Redes y contenido", href: "/servicios/redes-sociales", detalle: "Que se vea lo bien que trabajas" },
  { icono: "chip", texto: "Automatización e IA", href: "/servicios/automatizacion-ia", detalle: "Contactos que no se pierden" },
  { icono: "crm", texto: "Tu CRM a medida", href: "/servicios/crm-a-medida", detalle: "Sabes de dónde viene cada cliente" },
  { icono: "tienda", texto: "Reservas, reseñas y tienda", href: "/servicios#incluido", detalle: "Y mucho más, dentro de tu cuota" },
  { icono: "cohete", texto: "Apps y lo que se te ocurra", href: "/servicios#lo-que-sea", detalle: "Si te conviene, lo hacemos" },
  { icono: "radio", texto: "Radio y fuera de internet", href: "/servicios#fuera", detalle: "Campañas que empujan lo digital" },
  { icono: "lista", texto: "Cuánto te costaría por separado", href: "/servicios#costes", detalle: "La tabla, por tamaño de empresa" },
];

export const MENU: (Enlace & { hijos?: Enlace[] })[] = [
  { texto: "Servicios", href: "/servicios", hijos: SERVICIOS_MENU },
  {
    texto: "Cómo trabajamos",
    href: "/como-trabajamos",
    hijos: [
      { icono: "engranaje", texto: "Un día de trabajo real", href: "/un-dia-de-trabajo", detalle: "Lo que hacemos por dentro, sin cajas negras" },
      { icono: "escudo", texto: "Miedo al cambio", href: "/miedo-al-cambio", detalle: "Pruébalo con tu web al lado, sin riesgo" },
      { icono: "llave", texto: "Tu control", href: "/tu-control", detalle: "Tus cuentas son tuyas y tú mandas" },
      { icono: "crm", texto: "CRM de ejemplo", href: "/crm-ejemplo", detalle: "Cada contacto, lo que toca hoy y de dónde viene" },
      { icono: "calendario", texto: "Panel de ejemplo", href: "/panel", detalle: "Así verás tus resultados en tiempo real" },
    ],
  },
  { texto: "Trabajos", href: "/trabajos" },
  { texto: "Nosotros", href: "/quienes-somos" },
  {
    texto: "Haz el test",
    href: "/test",
  },
  { texto: "Blog", href: "/blog" },
  { texto: "Preguntas", href: "/preguntas" },
];

export const LEGALES: Enlace[] = [
  { texto: "Aviso legal", href: "/aviso-legal" },
  { texto: "Privacidad", href: "/privacidad" },
  { texto: "Cookies", href: "/cookies" },
];
