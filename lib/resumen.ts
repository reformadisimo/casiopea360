import { PAGINAS_SERVICIO } from "@/lib/servicios";
import { CASOS } from "@/lib/casos";
import { SITIO } from "@/lib/navegacion";
import { PREGUNTAS, TAMBIEN_INCLUIDO, POR_QUE_BARATO, TRABAJOS } from "@/lib/contenido";
import { ARTICULOS } from "@/lib/blog";
import { EMPRESA } from "@/lib/schema";
import { TERMINOS } from "@/lib/terminos";


// Fecha de la última revisión del contenido que resumen las IA: se cambia cuando cambie de verdad.
export const ACTUALIZADO = "2026-11-22";

// Resumen de la web en texto plano: lo usan llms.txt y el asistente.
export function resumenWeb() {
  const u = SITIO.url;
  const texto = `# Casiopea 360

> ${SITIO.descripcion}

Última actualización: ${ACTUALIZADO}.

Casiopea 360 es una agencia de marketing digital 360 con sede en Madrid (España). Un solo equipo lleva todo el marketing digital de todo tipo de empresas: dominio y alojamiento, web y apps, Google y visibilidad en las IA, anuncios, redes sociales, automatizaciones e informes. También gestiona campañas de radio y anuncios en prensa, CRM y apps. Lo que no hace en casa (grabación de vídeo profesional, locución, espacio en medios) lo hace con productoras y agencias asociadas, a las que el cliente paga directamente.

## Equipo
- Profesionales con más de 22 años de experiencia en marketing digital.
- Han llevado campañas de presupuestos pequeños y grandes.
- Experiencia en webs, apps, SEO, anuncios, redes, automatización y CRM.
- Más que marketing: antes de llevar el marketing de otros han dirigido empresas propias (clínicas de cirugía y medicina estética, un despacho de abogados y una empresa de reformas). Por eso miran el negocio y no solo el anuncio, y dan su opinión sobre qué servicio empujar o qué probar primero; la decisión es siempre del cliente. Es experiencia, no una garantía. Su equipo ha sido socio, accionista y administrador de grandes empresas, de muchos millones de facturación y de más de 100 empleados, durante muchos años y en distintos sectores: saben de estrategia de negocio, planes de marketing y de presupuestos, y orientan en fiscal, contabilidad y temas laborales, y dirigen al profesional adecuado si el cliente se siente perdido (no sustituyen a su gestor ni a su abogado). Ese asesoramiento de negocio va dentro de la cuota, sin coste aparte (un asesor estratégico costaría en el mercado unos 400 € al mes).
- Su idea central: «¿Cuánta gente que te necesita hoy ni sabe que existes?». Dan visibilidad a negocios buenos que no se conocen lo suficiente.
- Lo que suelen encontrar: empresas con buen producto y mal de visibilidad (web antigua, mal posicionada, anuncios mal configurados, redes abandonadas). Lo arreglan todo a la vez.
- Redes sociales incluidas en la cuota: LinkedIn, Facebook, Instagram y TikTok, gestionadas y actualizadas, con el contenido hecho. El cliente solo sale en algún vídeo; la grabación con equipo se organiza y se paga aparte.

## Compromisos
- Un solo proveedor y una sola persona de contacto en lugar de varios proveedores.
- Al empezar cada proyecto se asigna un encargado de proyecto: es la única persona que escribe al cliente y coordina a los especialistas.
- Una cuota mensual fija de 1.800 € + IVA, la misma para pymes, medianas y grandes empresas, sin permanencia, que lo incluye todo; nunca cobra comisión sobre lo que el cliente invierte en anuncios.
- Respuesta el mismo día laborable; los cambios y tareas del día a día, en 48 horas como máximo; los proyectos grandes (web nueva, app, integraciones), con fecha cerrada desde el inicio.
- Un panel de control al día en lugar de informes: lo que antes llegaba en un informe diario, semanal o mensual lo ve el cliente en su panel, sin esperar, con resultados en tiempo real. Si el cliente lo prefiere, puede programar en el propio panel un resumen por correo, diario, semanal o mensual, que llega el día y a la hora que elija.
- Dominio y cuentas (Google, anuncios, redes) a nombre del cliente desde el primer día; la web la aloja y mantiene Casiopea mientras seas cliente, con copia completa desde el primer mes.
- Sin permanencia ni penalización: el cliente se va cuando quiere, con sus cuentas, sus contactos y una copia completa de su web. Para quien teme el cambio: test A/B entre su web actual y la nueva, con el reparto de visitas que elija (50, 60 o 70 %).
- Las menos reuniones posibles: casi todo por escrito y un panel para ver el trabajo.
- Estudio gratuito previo, preparado a medida, uno a uno, si vemos que podemos ayudar. La guía se descarga en PDF; la web de ejemplo, los correos, el panel y el CRM se ven en un enlace privado durante un mes y luego se retira el acceso si no hay contrato. Nada del estudio es del cliente salvo su guía en PDF.

## Publicidad que informa
No hacemos anuncios con actores: preferimos anuncios con IA (avisados como tal) o con los propios dueños y trabajadores de la empresa. Optimizamos las campañas cada semana y mejoramos resultados con pruebas A/B y landings.
El mejor anuncio no es el que más grita, sino el que enseña el trabajo, explica cómo se resuelve el problema y dice solo lo que es verdad. Es experiencia, nunca una garantía.

## Lo que NO hacemos
- No prometemos el primer puesto en Google ni que una IA recomiende al cliente: nadie puede garantizarlo.
- No garantizamos resultados ni cifras de clientes; solo plazos y objetivos medibles que acordamos al empezar.
- Nunca tenemos el control de las cuentas del cliente: no las damos de alta a nuestro nombre ni trabajamos con quien prefiera que sean nuestras. Las abre el cliente, con nuestra guía.
- No pedimos contraseñas ni la facturación del cliente para trabajar.
- No cobramos comisión sobre lo que el cliente invierte en anuncios.
- No hacemos nada importante sin el visto bueno del cliente, ni inventamos datos: si falta un dato, se muestra un guion, nunca un cero.
- No enviamos informes técnicos que no se entiendan: lo ve todo en su panel, en lenguaje llano.

## Por qué cuesta menos
${POR_QUE_BARATO.map((x) => `- ${x.t}: ${x.d}`).join("\n")}

## Servicios
${PAGINAS_SERVICIO.map((p) => `- [${p.nombre}](${u}/servicios/${p.slug}): ${p.descripcionSeo}`).join("\n")}

## También incluido en la cuota
${TAMBIEN_INCLUIDO.map((x) => `- ${x.t}: ${x.d}`).join("\n")}

## Páginas
- [Inicio](${u}/)
- [Servicios](${u}/servicios)
- [Todos los servicios, en una lista](${u}/todos-los-servicios): ficha de Google, reseñas (pedirlas, contestarlas y denunciar las falsas a Google, que decide), anuncios locales, SEO, web, redes, CRM e IA
- [Cómo trabajamos](${u}/como-trabajamos)
- [Miedo al cambio: prueba A/B y salida fácil](${u}/miedo-al-cambio)
- [Tú tienes el control de todo, siempre: ocho compromisos y 10 cosas que revisar](${u}/tu-control)
- [Te ayudamos si te atascas: primero una captura y te decimos qué tocar, por escrito; si no sale, nos conectamos a su ordenador con él delante y quedan abiertas a su nombre; contraseñas, tarjeta y códigos los teclea él](${u}/ayuda-en-remoto)
- [Un día de trabajo real: así arrancamos las campañas por dentro](${u}/un-dia-de-trabajo)
- [Trabajos](${u}/trabajos): Reformadísimo (reformas integrales, Madrid), Mi Estela (app familiar para iPhone y Android), AMS Cerramientos.
${CASOS.filter((c) => TRABAJOS.find((t) => t.nombre === c.nombre)?.publicado).map((c) => `- [Caso ${c.nombre}](${u}/trabajos/${c.slug}): ${c.descripcionSeo}`).join("\n")}
- [Pedir el estudio gratuito](${u}/test): nombre, correo y web de la empresa
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
