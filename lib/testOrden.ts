/* Orden de las pantallas del test y textos de las opciones que se miran en la mesa (/mesa/test).
   Un solo sitio para el test (components/TestIdoneidad.tsx) y para la mesa. Cambiar aquí si cambia el test. */

export const SECTORES = ["Servicios a particulares", "Servicios a empresas", "Tienda o comercio", "Industria o fabricación", "Salud o bienestar", "Otra"];
export const GASTO = ["Menos de 1.000 € al mes", "De 1.000 a 2.000 € al mes", "De 2.000 a 4.000 € al mes", "Más de 4.000 € al mes", "No lo sé o prefiero no decirlo"];
export const URGE = ["Necesito más clientes y oportunidades", "Invierto en publicidad, pero no sé si funciona", "Mi web recibe visitas, pero pocos contactos", "Mi ficha de Google y mis reseñas", "Quiero destacar en mi zona", "Coordino demasiados proveedores", "No tengo claro si pago de más"];

/** Una línea de explicación e icono por opción de URGE (mismo orden que URGE). Sin cifras ni promesas. */
export const URGE_DETALLE: { sub: string; ic: string }[] = [
  { sub: "Ideas para atraer más demanda", ic: "sube" },
  { sub: "Revisar qué te aportan de verdad", ic: "diana" },
  { sub: "Convertir más visitas en consultas", ic: "web" },
  { sub: "Cómo te ven cuando te buscan", ic: "estrella" },
  { sub: "Que te encuentren los de tu zona", ic: "pin" },
  { sub: "Un solo equipo para todo", ic: "capas" },
  { sub: "Ver si gastas más de lo necesario", ic: "monedas" },
];

/** Pantallas en el orden en que se ven. El primer tramo son tres toques y los datos; lo demás llega después de enviar. */
export const PANTALLAS: { id: string; texto: string; fase: "primero" | "datos" | "despues" | "afinar" | "fin" }[] = [
  { id: "urge", texto: "¿Qué está impidiendo que tu negocio consiga más clientes?", fase: "primero" },
  { id: "sector", texto: "¿A qué se dedica tu empresa?", fase: "primero" },
  { id: "gasto", texto: "¿Cuánto gastas al mes en marketing, en total?", fase: "primero" },
  { id: "datos", texto: "Pantalla de datos (nombre, empresa, correo…)", fase: "datos" },
  { id: "capturado", texto: "«¡Recibido!» y oferta de afinar la nota", fase: "datos" },
  { id: "t1", texto: "¿Cuánto tardáis en responder a un contacto?", fase: "despues" },
  { id: "t3", texto: "¿Hacéis seguimiento de los presupuestos?", fase: "despues" },
  { id: "v1", texto: "¿Cuántos presupuestos acaban en venta?", fase: "despues" },
  { id: "c3", texto: "¿Cuántos proveedores llevan tu marketing?", fase: "despues" },
  { id: "w5", texto: "¿Dominio y web a tu nombre?", fase: "despues" },
  { id: "comision", texto: "¿Te cobran comisión sobre los anuncios?", fase: "despues" },
  { id: "cambiar", texto: "¿Cuándo quieres cambiar?", fase: "despues" },
  { id: "convence", texto: "Si el estudio te convence, ¿qué harías?", fase: "despues" },
  { id: "decide", texto: "¿Quién decide la contratación?", fase: "despues" },
  { id: "fin", texto: "Pantalla final (nota)", fase: "fin" },
];

export const CAMPOS_DATOS: { id: string; texto: string; obligatorio: boolean }[] = [
  { id: "nombre", texto: "Tu nombre", obligatorio: true },
  { id: "correo", texto: "Correo", obligatorio: true },
  { id: "empresa", texto: "Empresa", obligatorio: true },
  { id: "ciudad", texto: "Dónde estáis", obligatorio: true },
  { id: "telefono", texto: "Teléfono", obligatorio: false },
  { id: "web", texto: "Vuestra web", obligatorio: false },
  { id: "mas", texto: "¿Algo más? (texto libre)", obligatorio: false },
  { id: "imagenes", texto: "Casilla: autorizo usar lo público de mi web", obligatorio: true },
  { id: "novedades", texto: "Casilla: quiero novedades por correo", obligatorio: false },
];
