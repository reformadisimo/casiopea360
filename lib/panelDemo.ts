import type { Modulo, Reloj, Tarea, Resumen, CifrasBase } from "@/lib/mesaTipos";

/* Panel de EJEMPLO de Casiopea 360 (27-oct-2026): mismas piezas que la mesa de control de Reformadísimo
   (luces, qué hago hoy, relojes), con datos INVENTADOS de una empresa ficticia, "Climatización Ejemplo".
   Las cifras de aquí coinciden con las que calcula lib/mesaDemo.ts para los últimos 28 días (29 sep a 26 oct 2026):
   71 contactos (antes 50), 19 piden visita (27 de cada 100, antes 48), 5.582 € invertidos y 93 € por contacto (antes 84). */

export const temasDemo: Modulo[] = [
  { id: "web", titulo: "La web", ver: "Ver con la lupa", que: "Qué hace la gente en tu web y si todo funciona", luz: "ambar",
    conclusion: "3 cosas de la web para mirar. La primera: en la portada la mitad de la gente no pasa del 25 % de la página.",
    filas: [
      { t: "Visitas con la lupa (28 días)", v: "672 visitas · 1,8 páginas por visita" },
      { t: "Para mirar 1", v: "En la portada la mitad de la gente no pasa del 25 % de la página.", luz: "ambar" },
      { t: "Para mirar 2", v: "En /aerotermia, 14 toques en fotos que no hacen nada.", luz: "ambar" },
      { t: "Lo que funciona", v: "Donde más se pulsa WhatsApp es /contacto.", luz: "verde" },
      { t: "Control 360", v: "Esta semana hemos probado tu recorrido completo, de la portada al formulario, y funciona.", luz: "verde" },
      { t: "Sistemas", v: "Todo al día", luz: "verde" },
    ], enlaces: [{ t: "Ver una lupa de ejemplo", href: "/lupa-ejemplo" }] },
  { id: "dicen", titulo: "Reputación e IA", ver: "Ver las consultas", que: "Tus reseñas y qué responden las inteligencias artificiales", luz: "verde",
    conclusion: "Google 4,7 con 180 reseñas. Las IAs te nombran en 16 de 18 respuestas.",
    filas: [
      { t: "Google", v: "4,7 de 5 · 180 opiniones" },
      { t: "Espejo de la IA", v: "Sales en 16 de 18 respuestas de ChatGPT, Gemini y Claude", luz: "verde" },
      { t: "Para mirar", v: "En 2 preguntas todavía no sales: «aerotermia precio vivienda» y «mantenimiento anual».", luz: "ambar" },
      { t: "Ficha de Google: veces que sale", v: "2.100 (+8 % frente a antes)" },
    ], enlaces: [] },
  { id: "mercado", titulo: "Competencia", ver: "Ver cambios", que: "Los cambios importantes de tu competencia", luz: "verde",
    conclusion: "Una empresa de tu zona ha bajado la revisión anual a 79 €. No hace falta reaccionar.",
    filas: [
      { t: "Vigía de la competencia", v: "Una empresa de tu zona ha bajado la revisión anual a 79 €. Tú cobras 89 €, con filtros incluidos.", luz: "verde" },
      { t: "Otras dos", v: "Sin cambios esta semana.", luz: "verde" },
    ], enlaces: [] },
  { id: "anuncios", titulo: "Anuncios", ver: "Ver campañas", que: "Cuántos contactos llegan y cuánto cuestan", luz: "ambar",
    conclusion: "El coste por contacto sube a 93 € (antes 84 €). Una campaña gasta mucho y casi no trae contactos.",
    filas: [
      { t: "Contactos en la web", v: "71 (+42 % frente a antes)" },
      { t: "Invertido en anuncios", v: "5.582 €" },
      { t: "Coste por contacto", v: "93 € (+11 % frente a antes)", luz: "ambar" },
      { t: "Google · Búsqueda", v: "2.354 € · 18 contactos · 131 € cada uno", luz: "verde" },
      { t: "Google · Marca", v: "423 € · 8 contactos · 53 € cada uno", luz: "verde" },
      { t: "Meta · Captación con formulario", v: "1.702 € · 29 contactos · 59 € cada uno", luz: "verde" },
      { t: "Meta · Remarketing", v: "608 € · 1 contacto · 608 € cada uno", luz: "ambar" },
      { t: "ChatGPT · Tráfico a la web", v: "496 € · 4 contactos · 124 € cada uno", luz: "verde" },
    ], enlaces: [] },
  { id: "tuyo", titulo: "Ventas", que: "Tus ventas y tus clientes. Lo usas si quieres", luz: "azul", estado: "Datos de tu negocio", ver: "Ver recorrido comercial",
    conclusion: "De los contactos de este periodo hay 33 visitas técnicas, 25 presupuestos y 9 instalaciones firmadas.",
    filas: [
      { t: "Ventas (CRM)", v: "76 contactos · 33 visitas técnicas" },
      { t: "Instalaciones firmadas", v: "9", luz: "azul" },
      { t: "Contactos sin respuesta", v: "3 llevan más de 3 días esperando. Cuanto antes se llama, más se convierte.", luz: "ambar" },
      { t: "Índice de valor", v: "Preparado: qué clientes valen más que tu media, sin decirnos cuánto facturas. Se activa cuando marcas quién ha firmado.", luz: "azul" },
      { t: "Avisos y recordatorios", v: "Ejemplo: avisamos al cliente por WhatsApp o SMS antes de su cita. Va incluido en tu cuota; solo se pagan los mensajes. Aquí no se envía nada.", luz: "azul" },
    ], enlaces: [{ t: "Ver el recorrido de un contacto", href: "/crm-ejemplo" }, { t: "Ver los avisos de ejemplo", href: "/avisos-ejemplo" }] },
];

export const resumenDemo: Resumen = { titulo: "Hay dos cosas que requieren atención", texto: "Hay 3 contactos esperando respuesta desde hace más de 3 días. Y la campaña «Meta · Remarketing» ha gastado 608 € y solo ha traído 1 contacto." };

export const tareasDemo: Tarea[] = [
  { id: "d1", texto: "Llama a los 3 contactos que llevan más de 3 días sin respuesta", porque: "Cuanto antes se llama, más se convierte. Están en tu CRM.", donde: "Ventas", ir: "tuyo", boton: "Ver quiénes son" },
  { id: "d2", texto: "Revisa la campaña «Meta · Remarketing»", porque: "Ha gastado 608 € en 28 días y solo ha traído 1 contacto. Mira primero si se está midiendo bien, antes de tocar nada.", donde: "Anuncios", ir: "anuncios", boton: "Ver qué anuncio es" },
  { id: "d3", texto: "Mejora la portada", porque: "En la portada la mitad de la gente no pasa del 25 % de la página.", donde: "La web", ir: "web", boton: "Ver con la lupa" },
];

/** Cifras base de ejemplo para "Tus sueños y tus cuentas": 28 días, todo inventado. */
export const baseDemo: CifrasBase = { dias: 28, coste: 5582, contactosAnuncios: 49, contactos: 71, visitasPedidas: 19, leadsCrm: 76, firmas: 9, ticket: 2400, medicionIncompleta: false };

export const relojesDemo: Reloj[] = [
  { n: 71, frase: "71 personas dejaron sus datos", detalle: "Un 42 % más que antes (eran 50).", t: "Contactos", v: "71", sub: "+42 % frente a antes", lleno: 0.8, luz: "verde", ayuda: "Personas distintas que han enviado un formulario desde la web. Una misma persona solo cuenta una vez al día." },
  { n: 19, frase: "19 pidieron una visita", detalle: "Son 27 de cada 100 personas que dejaron sus datos. Antes eran 48.", t: "Piden la visita", v: "27 %", sub: "de los contactos", lleno: 0.27, luz: "ambar", ayuda: "De cada 100 personas que dejaron sus datos, cuántas solicitaron una visita técnica." },
  { n: 93, frase: "Cada contacto costó 93 €", detalle: "Antes costaba 84 €.", t: "Coste por contacto", v: "93 €", sub: "+11 % frente a antes", lleno: 0.62, luz: "ambar", ayuda: "El dinero gastado en anuncios dividido entre los contactos conseguidos por esos anuncios. Cuanto más bajo, mejor." },
  { frase: "Tus clientes te valoran con un 4,7", detalle: "Sobre 5, con 180 reseñas de Google.", t: "Nota en Google", v: "4,7", sub: "180 reseñas", lleno: 0.94, luz: "verde", ayuda: "La valoración media que han dejado los clientes en Google, sobre 5." },
];
