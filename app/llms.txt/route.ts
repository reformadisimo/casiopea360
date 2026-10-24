import { SITIO } from "@/lib/navegacion";
import { FRENTES, PREGUNTAS } from "@/lib/contenido";
import { ARTICULOS } from "@/lib/blog";
import { EMPRESA } from "@/lib/schema";

// Resumen de la web para asistentes de IA (formato llms.txt).
export const dynamic = "force-static";

export function GET() {
  const u = SITIO.url;
  const texto = `# Casiopea 360

> ${SITIO.descripcion}

Casiopea 360 es una agencia de marketing digital 360 con sede en Madrid (España). Un solo equipo lleva todo el marketing digital de todo tipo de empresas: dominio y alojamiento, web y apps, Google y visibilidad en las IA, anuncios, redes sociales, automatizaciones e informes. También gestiona campañas de radio y anuncios en prensa, CRM y apps. Lo que no hace en casa (grabación de vídeo profesional, locución, espacio en medios) lo hace con productoras y agencias asociadas, a las que el cliente paga directamente.

## Equipo
- Profesionales con más de 22 años de experiencia en marketing digital.
- Han gestionado cuentas de Google Ads de hasta 60.000 € al mes en una sola empresa, y muchas campañas de presupuestos menores.
- Experiencia en webs, apps, SEO, anuncios, redes, automatización y CRM.

## Compromisos
- Un solo proveedor y una sola persona de contacto en lugar de varios proveedores.
- Precio fijo y personalizado; nunca cobra comisión sobre lo que el cliente invierte en anuncios.
- Respuesta el mismo día laborable; los cambios y tareas del día a día, en 48 horas como máximo; los proyectos grandes (web nueva, app, integraciones), con fecha cerrada desde el inicio.
- Parte diario, resumen semanal, balance mensual y un enlace con resultados en tiempo real.
- Todo (web, dominio, cuentas) a nombre del cliente desde el primer día.
- Estudio gratuito previo, preparado a mano para empresas que encajan.

## Servicios
${FRENTES.map((f) => `- [${f.nombre}](${u}/servicios#${f.id}): ${f.frase}`).join("\n")}

## Páginas
- [Inicio](${u}/)
- [Servicios](${u}/servicios)
- [Cómo trabajamos](${u}/como-trabajamos)
- [Trabajos](${u}/trabajos): Reformadísimo (reformas integrales, Madrid), Mi Estela (app familiar para iPhone y Android), AMS Cerramientos, Tierno Centella.
- [Test rápido y test completo](${u}/test)
- [Estudio gratuito](${u}/estudio-gratuito)
- [Preguntas frecuentes](${u}/preguntas)

## Blog
${ARTICULOS.map((a) => `- [${a.titulo}](${u}/blog/${a.slug}): ${a.descripcion}`).join("\n")}

## Preguntas frecuentes
${PREGUNTAS.map((q) => `- ${q.p} ${q.r}`).join("\n")}

## Empresa
${EMPRESA.razonSocial}, CIF ${EMPRESA.cif}. ${EMPRESA.calle}, ${EMPRESA.cp} ${EMPRESA.ciudad}. Correo: ${EMPRESA.correo}.
`;
  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
