// Menú principal. Lo usan la cabecera, el pie y el mapa del sitio.
export const SITIO = {
  nombre: "Casiopea 360",
  // Dominio propio desde el 28 oct 2026 (casiopea360.es redirige a www).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.casiopea360.es",
  descripcion:
    "Crece en digital sin ir de proveedor en proveedor: web en días, SEO, anuncios, redes, CRM e IA con un solo equipo. Una cuota fija para cualquier empresa.",
  // Abierta a Google desde el 10 nov 2026 (cas·v250).
  indexable: true,
};

export type Enlace = { texto: string; href: string; detalle?: string; icono?: string };

export const SERVICIOS_MENU: Enlace[] = [
  { icono: "pagina", texto: "Web y apps", href: "/servicios/diseno-web", detalle: "Tu escaparate y tu app, rápidos y tuyos" },
  { icono: "lupa", texto: "Google y las IA", href: "/servicios/seo-google-ia", detalle: "Que te encuentre quien te busca" },
  { icono: "euro", texto: "Anuncios", href: "/servicios/publicidad-google-ads-redes", detalle: "Cada euro vigilado, sin comisiones" },
  { icono: "video", texto: "Redes y contenido", href: "/servicios/redes-sociales", detalle: "Que se vea lo bien que trabajas" },
  { icono: "chip", texto: "Automatización e IA", href: "/servicios/automatizacion-ia", detalle: "Contactos que no se pierden" },
  { icono: "crm", texto: "Tu CRM a medida", href: "/servicios/crm-a-medida", detalle: "Sabes de dónde viene cada cliente" },
  { icono: "lupa", texto: "Lupa 360", href: "/servicios/lupa-360", detalle: "Ves lo que hace la gente en tu web" },
  { icono: "chat", texto: "Avisos y recordatorios", href: "/servicios/avisos-recordatorios", detalle: "Mensajes al móvil para citas y respuesta al momento" },
  { icono: "tienda", texto: "Reservas, reseñas y tienda", href: "/servicios#incluido", detalle: "Y mucho más, dentro de tu cuota" },
  { icono: "cohete", texto: "Apps y lo que se te ocurra", href: "/servicios#lo-que-sea", detalle: "Si te conviene, lo hacemos" },
  { icono: "radio", texto: "Radio y fuera de internet", href: "/servicios#fuera", detalle: "Campañas que empujan lo digital" },
  { icono: "lista", texto: "Cuánto te costaría por separado", href: "/servicios#costes", detalle: "La tabla, por tamaño de empresa" },
  { icono: "grafica", texto: "Calculadora de anuncios", href: "/calculadora", detalle: "Cuánto te puede dejar lo que inviertes" },
];

// soloAncho: en la barra de escritorio solo se ve en pantallas muy anchas (también está dentro de «Cómo trabajamos»).
// pastilla: lo que se queda en la pastilla flotante que sale al bajar (en escritorio).
export const MENU: (Enlace & { hijos?: Enlace[]; soloAncho?: boolean; pastilla?: boolean })[] = [
  { texto: "Servicios", href: "/servicios", hijos: SERVICIOS_MENU, pastilla: true },
  {
    texto: "Cómo trabajamos",
    href: "/como-trabajamos",
    pastilla: true,
    hijos: [
      { icono: "regalo", texto: "Un ejemplo real", href: "/lo-que-consigues", detalle: "Tu web, tu guía, tus correos, tu panel y tu CRM, ya hechos para un despacho inventado" },
      { icono: "engranaje", texto: "Un día de trabajo real", href: "/un-dia-de-trabajo", detalle: "Lo que hacemos por dentro, sin cajas negras" },
      { icono: "escudo", texto: "Miedo al cambio", href: "/miedo-al-cambio", detalle: "Pruébalo con tu web al lado, sin riesgo" },
      { icono: "llave", texto: "Tú tienes el control", href: "/tu-control", detalle: "Tus cuentas, tu web y tus contactos son tuyos" },
      { icono: "lupa", texto: "Lupa 360 de ejemplo", href: "/lupa-ejemplo", detalle: "Lo que hace la gente en tu web, sobre la nuestra" },
      { icono: "chat", texto: "Avisos de ejemplo", href: "/avisos-ejemplo", detalle: "Cómo le llegarían los mensajes a tu cliente" },
      { icono: "crm", texto: "CRM de ejemplo", href: "/crm-ejemplo", detalle: "Cada contacto, lo que toca hoy y de dónde viene" },
      { icono: "calendario", texto: "Panel de ejemplo", href: "/panel", detalle: "Así verás tus resultados en tiempo real" },
    ],
  },
  { texto: "Tu control", href: "/tu-control", detalle: "Tú tienes el control de todo, siempre", pastilla: true },
  { texto: "Panel", href: "/panel", detalle: "Así verás tus resultados", soloAncho: true },
  { texto: "Trabajos", href: "/trabajos", pastilla: true },
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
