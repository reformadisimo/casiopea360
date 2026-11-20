/* Orden de las pantallas del test y textos de las opciones que se miran en la mesa (/mesa/test).
   Un solo sitio para el test (components/TestIdoneidad.tsx) y para la mesa. Cambiar aquí si cambia el test. */

export const SECTORES = ["Servicios a particulares", "Servicios a empresas", "Tienda o comercio", "Industria o fabricación", "Salud o bienestar", "Otra"];
export const FACTURACION = ["Menos de 1 millón", "De 1 a 4 millones", "De 4 a 10 millones", "Más de 10 millones", "Prefiero no decirlo"];
export const URGE = ["Más clientes", "Una web nueva", "Dejar de coordinar proveedores", "Medir lo que funciona", "Pagar menos por lo mismo"];

/** Pantallas en el orden en que se ven. El primer tramo son tres toques y los datos; lo demás llega después de enviar. */
export const PANTALLAS: { id: string; texto: string; fase: "primero" | "datos" | "despues" | "afinar" | "fin" }[] = [
  { id: "sector", texto: "¿A qué se dedica tu empresa?", fase: "primero" },
  { id: "facturacion", texto: "¿Cuánto factura al año?", fase: "primero" },
  { id: "urge", texto: "¿Qué es lo que más te urge?", fase: "primero" },
  { id: "datos", texto: "Pantalla de datos (nombre, empresa, correo…)", fase: "datos" },
  { id: "capturado", texto: "«¡Recibido!» y oferta de afinar la nota", fase: "datos" },
  { id: "t1", texto: "¿Cuánto tardáis en responder a un contacto?", fase: "despues" },
  { id: "t3", texto: "¿Hacéis seguimiento de los presupuestos?", fase: "despues" },
  { id: "v1", texto: "¿Cuántos presupuestos acaban en venta?", fase: "despues" },
  { id: "c3", texto: "¿Cuántos proveedores llevan tu marketing?", fase: "despues" },
  { id: "w5", texto: "¿Dominio y web a tu nombre?", fase: "despues" },
  { id: "marketing", texto: "¿Cuánto pagas al mes en marketing?", fase: "despues" },
  { id: "inversion", texto: "¿Cuánto inviertes en anuncios?", fase: "despues" },
  { id: "comision", texto: "¿Te cobran comisión sobre los anuncios?", fase: "despues" },
  { id: "cambiar", texto: "¿Cuándo quieres cambiar?", fase: "despues" },
  { id: "convence", texto: "Si el estudio te convence, ¿qué harías?", fase: "despues" },
  { id: "decide", texto: "¿Quién decide la contratación?", fase: "despues" },
  { id: "fin", texto: "Pantalla final (nota)", fase: "fin" },
];

export const CAMPOS_DATOS: { id: string; texto: string; obligatorio: boolean }[] = [
  { id: "nombre", texto: "Nombre y cargo", obligatorio: true },
  { id: "empresa", texto: "Empresa", obligatorio: true },
  { id: "correo", texto: "Correo", obligatorio: true },
  { id: "ciudad", texto: "Dónde estáis", obligatorio: true },
  { id: "telefono", texto: "Teléfono", obligatorio: false },
  { id: "web", texto: "Vuestra web", obligatorio: false },
  { id: "mas", texto: "¿Algo más? (texto libre)", obligatorio: false },
  { id: "imagenes", texto: "Casilla: autorizo usar lo público de mi web", obligatorio: true },
  { id: "novedades", texto: "Casilla: quiero novedades por correo", obligatorio: false },
];
