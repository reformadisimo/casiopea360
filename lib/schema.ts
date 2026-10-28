import { servicioDeFrente } from "@/lib/servicios";
import { SITIO } from "@/lib/navegacion";
import { FRENTES, PREGUNTAS, TAMBIEN_INCLUIDO } from "@/lib/contenido";

// Datos de la empresa titular (los mismos que en el aviso legal).
export const EMPRESA = {
  razonSocial: "AYR GALIC CONSULTANTS, S.L.",
  cif: "B83340430",
  calle: "Calle Santiago Cordero, 1A",
  cp: "28029",
  ciudad: "Madrid",
  registro:
    "Inscrita en el Registro Mercantil de Madrid, tomo 17722, folio 165, sección octava, hoja M-305353, inscripción 1ª",
  // PENDIENTE: correo propio de Casiopea cuando esté el dominio.
  correo: "hola@casiopea360.es",
};

const url = (ruta = "/") => `${SITIO.url}${ruta}`;

export function schemaOrganizacion() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": url("/#empresa"),
    name: SITIO.nombre,
    url: url("/"),
    description: SITIO.descripcion,
    logo: url("/icon.svg"),
    image: url("/video/constelaciones.jpg"),
    email: EMPRESA.correo,
    legalName: EMPRESA.razonSocial,
    taxID: EMPRESA.cif,
    address: {
      "@type": "PostalAddress",
      streetAddress: EMPRESA.calle,
      postalCode: EMPRESA.cp,
      addressLocality: EMPRESA.ciudad,
      addressCountry: "ES",
    },
    areaServed: { "@type": "Country", name: "España" },
    knowsLanguage: "es",
    slogan: "Todo. Mejor. En días. Deja de coordinar proveedores. Empieza a crecer.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de marketing digital 360",
      itemListElement: [
        ...FRENTES.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f.nombre, description: f.frase } })),
        ...TAMBIEN_INCLUIDO.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x.t, description: x.d } })),
      ],
    },
  };
}

export function schemaWeb() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": url("/#web"),
    name: SITIO.nombre,
    url: url("/"),
    inLanguage: "es-ES",
    publisher: { "@id": url("/#empresa") },
  };
}

export function schemaMigas(migas: { texto: string; ruta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.texto, item: url(m.ruta) })),
  };
}

export function schemaPreguntas() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PREGUNTAS.map((q) => ({
      "@type": "Question",
      name: q.p,
      acceptedAnswer: { "@type": "Answer", text: q.r },
    })),
  };
}

export function schemaServicios() {
  return FRENTES.map((f) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: f.nombre,
    description: `${f.frase} ${f.servicios.join(". ")}.`,
    provider: { "@id": url("/#empresa") },
    areaServed: { "@type": "Country", name: "España" },
    url: url(servicioDeFrente(f.id) ? `/servicios/${servicioDeFrente(f.id)!.slug}` : `/servicios#${f.id}`),
  }));
}

export function schemaArticulo(a: { titulo: string; descripcion: string; slug: string; fecha: string; video?: string; categoria?: string; claves?: string[]; palabras?: number; fuentes?: { texto: string; href: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titulo,
    description: a.descripcion,
    datePublished: a.fecha,
    dateModified: a.fecha,
    inLanguage: "es-ES",
    mainEntityOfPage: url(`/blog/${a.slug}`),
    url: url(`/blog/${a.slug}`),
    image: url(`/video/${a.video ?? "constelaciones"}.jpg`),
    ...(a.categoria ? { articleSection: a.categoria } : {}),
    ...(a.claves?.length ? { keywords: a.claves.join(", ") } : {}),
    ...(a.palabras ? { wordCount: a.palabras } : {}),
    ...(a.fuentes?.length ? { citation: a.fuentes.map((f) => ({ "@type": "CreativeWork", name: f.texto, url: f.href })) } : {}),
    author: { "@type": "Organization", name: SITIO.nombre, url: url("/") },
    publisher: { "@id": url("/#empresa") },
  };
}

export function schemaFaqArticulo(faq: { p: string; r: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({ "@type": "Question", name: q.p, acceptedAnswer: { "@type": "Answer", text: q.r } })),
  };
}

// Glosario: el conjunto de términos y cada término definido, para Google y las IA.
export function schemaGlosario(terminos: { slug: string; nombre: string; corta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": url("/glosario#conjunto"),
    name: "Glosario de marketing digital",
    description: "Qué significan SEO, SEM, Analytics, CRM y el resto de términos del marketing digital, explicados sin jerga.",
    inLanguage: "es-ES",
    url: url("/glosario"),
    publisher: { "@id": url("/#empresa") },
    hasDefinedTerm: terminos.map((t) => ({
      "@type": "DefinedTerm",
      name: t.nombre,
      description: t.corta,
      url: url(`/glosario/${t.slug}`),
    })),
  };
}

export function schemaTermino(t: { slug: string; nombre: string; largo?: string; corta: string; def: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url(`/glosario/${t.slug}#termino`),
    name: t.nombre,
    alternateName: t.largo,
    description: [t.corta, ...t.def].join(" "),
    inLanguage: "es-ES",
    url: url(`/glosario/${t.slug}`),
    inDefinedTermSet: url("/glosario#conjunto"),
  };
}
