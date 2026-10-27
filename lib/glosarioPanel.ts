// Siglas y palabras en inglés que salen en el panel, con lo que significan en cristiano.
// Se enseñan debajo del título de cada caja que las usa: que nadie tenga que adivinar ni buscarlas.
export const GLOSARIO_PANEL: [string, string][] = [
  ["Tag Manager", "la centralita que coloca en tu web todas las etiquetas que miden"],
  ["Google Analytics", "la herramienta de Google que cuenta tus visitas y tus contactos"],
  ["Analytics", "la herramienta de Google que cuenta tus visitas y tus contactos"],
  ["Search Console", "lo que Google nos cuenta de cómo te encuentran en sus búsquedas"],
  ["Google Ads", "los anuncios de pago de Google"],
  ["Microsoft Ads", "los anuncios de pago de Bing, el buscador de Microsoft"],
  ["Bing Webmaster", "lo que Bing nos cuenta de cómo te encuentra"],
  ["Meta", "la empresa de Facebook e Instagram"],
  ["Clarity", "la herramienta gratuita de Microsoft que enseña dónde pulsa la gente en tu web"],
  ["Resend", "el servicio que envía tus correos automáticos y mide cuáles se abren"],
  ["Semrush", "la herramienta que mide en qué puesto sales en Google"],
  ["PageSpeed", "la prueba de velocidad de Google, de 0 a 100"],
  ["Vercel", "el servicio donde está alojada tu web"],
  ["Google Trends", "lo que Google nos cuenta de qué se busca y cuándo"],
  ["CRM", "el programa donde se apuntan tus contactos y tus clientes"],
  ["UTM", "una etiqueta invisible en el enlace que dice de qué anuncio viene la visita"],
  ["UET", "la etiqueta que mide los contactos que llegan desde los anuncios de Bing"],
  ["API", "un puente automático entre dos programas"],
  ["SEO", "salir arriba en Google sin pagar"],
  ["IA", "inteligencia artificial"],
  ["Copilot", "el asistente de inteligencia artificial de Microsoft"],
];

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Devuelve, sin repetir, lo que hay que explicar de un texto (título o fuente de una caja).
export function glosasDe(...textos: (string | undefined)[]): [string, string][] {
  const t = textos.filter(Boolean).join(" · ");
  const vistas = new Set<string>();
  const salida: [string, string][] = [];
  let resto = t;
  for (const [palabra, explica] of GLOSARIO_PANEL) {
    const re = new RegExp(`(^|[^\\p{L}])${escapar(palabra)}($|[^\\p{L}])`, "u");
    if (re.test(resto) && !vistas.has(explica)) {
      vistas.add(explica);
      salida.push([palabra, explica]);
      // lo ya explicado no se vuelve a buscar dentro de una palabra más larga (Google Analytics y Analytics)
      resto = resto.replace(new RegExp(escapar(palabra), "g"), " ");
    }
  }
  return salida;
}
