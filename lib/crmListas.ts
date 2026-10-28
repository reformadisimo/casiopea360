/* Listas del CRM de ejemplo de Casiopea 360 (las mismas piezas que el CRM de Reformadísimo, con los nombres de una empresa de climatización). */
export const ESTADOS: [string, string][] = [
  ["nuevo", "Nuevo"],
  ["contactado", "Contactado"],
  ["visita-programada", "Visita programada"],
  ["visita-hecha", "Visita hecha"],
  ["presupuesto", "Presupuesto entregado"],
  ["firmado", "Firmado"],
  ["aplazado", "Aplazado"],
  ["perdido", "No firmó"],
  ["descartado", "Descartado"],
];
export const ORIGENES = [
  "Recomendado", "Antiguo cliente", "Conocidos", "Instagram", "Facebook", "Google Ads", "Meta (anuncio)",
  "Google (sin pagar)", "Asistentes de IA", "Web (formulario)", "Calculadora web", "Asistente de la web", "Llamada", "WhatsApp",
  "Landing de anuncios", "Pasó por el local", "Buzoneo", "Prensa", "Otro",
];
export const CANALES = ["Web", "Llamada", "WhatsApp", "Instagram", "Correo", "Local", "Otro"];
export const MOTIVOS = [
  "Trabajo muy pequeño o fuera de lo que hacemos", "Fuera de zona", "Solo pedía información", "Precio", "No contesta", "Eligió otra empresa",
  "Lo deja para más adelante", "Prueba o duplicado", "Otro",
];
export const FASES = ["Por empezar", "Replanteo", "Instalación de tuberías", "Instalación eléctrica", "Montaje de equipos", "Puesta en marcha", "Revisión y entrega", "Entregada"];
