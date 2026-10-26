import { PAGINAS_SERVICIO } from "@/lib/servicios";
import { CASOS } from "@/lib/casos";
import { SITIO } from "@/lib/navegacion";
import { PREGUNTAS, TAMBIEN_INCLUIDO, POR_QUE_BARATO } from "@/lib/contenido";
import { ARTICULOS } from "@/lib/blog";
import { EMPRESA } from "@/lib/schema";
import { TERMINOS } from "@/lib/terminos";


// Resumen de la web en texto plano: lo usan llms.txt y el asistente.
export function resumenWeb() {
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
- Una cuota mensual fija, la misma para pymes, medianas y grandes empresas, que lo incluye todo; nunca cobra comisión sobre lo que el cliente invierte en anuncios.
- Respuesta el mismo día laborable; los cambios y tareas del día a día, en 48 horas como máximo; los proyectos grandes (web nueva, app, integraciones), con fecha cerrada desde el inicio.
- Parte diario, resumen semanal, balance mensual y un enlace con resultados en tiempo real.
- Todo (web, dominio, cuentas) a nombre del cliente desde el primer día.
- Seis meses de permanencia, porque la web va regalada y es del cliente; si a los tres meses no ha visto que mejoramos puede irse, quitándonos los accesos y quedándose con todo lo construido; después no hay permanencia. Para quien teme el cambio: test A/B entre su web actual y la nueva, con el reparto de visitas que elija (50, 60 o 70 %).
- Las menos reuniones posibles: casi todo por escrito y un panel para ver el trabajo.
- Estudio gratuito previo, preparado a medida, uno a uno, para empresas que encajan.

## Por qué cuesta menos
${POR_QUE_BARATO.map((x) => `- ${x.t}: ${x.d}`).join("\n")}

## Servicios
${PAGINAS_SERVICIO.map((p) => `- [${p.nombre}](${u}/servicios/${p.slug}): ${p.descripcionSeo}`).join("\n")}

## También incluido en la cuota
${TAMBIEN_INCLUIDO.map((x) => `- ${x.t}: ${x.d}`).join("\n")}

## Páginas
- [Inicio](${u}/)
- [Servicios](${u}/servicios)
- [Cómo trabajamos](${u}/como-trabajamos)
- [Miedo al cambio: prueba A/B y salida fácil](${u}/miedo-al-cambio)
- [Un día de trabajo real: así arrancamos las campañas por dentro](${u}/un-dia-de-trabajo)
- [Trabajos](${u}/trabajos): Reformadísimo (reformas integrales, Madrid), Mi Estela (app familiar para iPhone y Android), AMS Cerramientos, Tierno Centella.
${CASOS.map((c) => `- [Caso ${c.nombre}](${u}/trabajos/${c.slug}): ${c.descripcionSeo}`).join("\n")}
- [Test de idoneidad](${u}/test): unos 4 minutos, nota de marketing y paso para el estudio gratuito
- [Estudio gratuito](${u}/estudio-gratuito)
- [Preguntas frecuentes](${u}/preguntas)

## Blog
${ARTICULOS.map((a) => `- [${a.titulo}](${u}/blog/${a.slug}): ${a.descripcion}`).join("\n")}

## Glosario
Glosario de marketing digital con definiciones sin jerga: [Glosario](${u}/glosario). Términos: ${TERMINOS.map((t) => `[${t.nombre}](${u}/glosario/${t.slug})`).join(", ")}.

## Preguntas frecuentes
${PREGUNTAS.map((q) => `- ${q.p} ${q.r}`).join("\n")}

## Empresa
${EMPRESA.razonSocial}, CIF ${EMPRESA.cif}. ${EMPRESA.calle}, ${EMPRESA.cp} ${EMPRESA.ciudad}. Correo: ${EMPRESA.correo}.
`;
  return texto;
}
