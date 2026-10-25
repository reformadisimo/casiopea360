// Un término del glosario. Los textos están pensados para quien no sabe nada de marketing.
export type FamiliaId = "buscadores" | "anuncios" | "medicion" | "web" | "redes" | "crm" | "ia" | "legal";

export type TerminoGlosario = {
  slug: string;
  nombre: string; // como se muestra: "SEO", "enlace entrante (backlink)"
  largo?: string; // desarrollo de la sigla o nombre completo
  formas?: string[]; // otras maneras de escribirlo en un texto (plurales, sinónimos) para el enlazado automático
  familia: FamiliaId;
  corta: string; // una frase: es lo que se ve al pasar el ratón
  def: string[]; // párrafos de la definición
  ejemplo: string; // un caso en un negocio normal
  rel: string[]; // slugs de términos relacionados
  servicio?: string; // slug de la página de servicio relacionada
  auto?: boolean; // false: no se enlaza solo en los textos (palabras demasiado corrientes)
};

export const FAMILIAS: { id: FamiliaId; nombre: string; frase: string; icono: string; color: string }[] = [
  { id: "buscadores", nombre: "Buscadores y SEO", frase: "Cómo te encuentra la gente en Google sin pagar por cada clic.", icono: "lupa", color: "#15803d" },
  { id: "anuncios", nombre: "Anuncios", frase: "Publicidad de pago en Google, Meta y compañía, y cómo se mide.", icono: "euro", color: "#6d28d9" },
  { id: "medicion", nombre: "Medición", frase: "Saber qué funciona: visitas, clics, llamadas y ventas.", icono: "lista", color: "#1d4ed8" },
  { id: "web", nombre: "Tu web", frase: "Lo que hay detrás de una web que funciona.", icono: "pagina", color: "#0f766e" },
  { id: "redes", nombre: "Redes y contenido", frase: "Instagram, Facebook, vídeos y cómo conectar con tu público.", icono: "video", color: "#be185d" },
  { id: "crm", nombre: "CRM y automatización", frase: "Que ningún cliente se pierda y que nadie repita tareas.", icono: "crm", color: "#b45309" },
  { id: "ia", nombre: "Inteligencia artificial", frase: "Qué es y cómo afecta a que te encuentren.", icono: "chip", color: "#7c3aed" },
  { id: "legal", nombre: "Privacidad y legal", frase: "Cookies, datos y lo que exige la ley.", icono: "escudo", color: "#475569" },
];
