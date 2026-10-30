/* Listas del CRM de ejemplo de Casiopea 360 (las mismas piezas que el CRM de Reformadísimo, con los nombres de un despacho de abogados laboralistas). */
export const ESTADOS: [string, string][] = [
  ["nuevo", "Nuevo"],
  ["contactado", "Contactado"],
  ["visita-programada", "Consulta programada"],
  ["visita-hecha", "Consulta hecha"],
  ["presupuesto", "Propuesta entregada"],
  ["firmado", "Encargo firmado"],
  ["aplazado", "Aplazado"],
  ["perdido", "No firmó"],
  ["descartado", "Descartado"],
];
export const ORIGENES = [
  "Recomendado", "Antiguo cliente", "Conocidos", "Instagram", "Facebook", "Google Ads", "Meta (anuncio)",
  "Google (sin pagar)", "Asistentes de IA", "Web (formulario)", "Calculadora de indemnización", "Asistente de la web", "Llamada", "WhatsApp",
  "Landing de anuncios", "Pasó por el despacho", "Otro despacho", "Prensa", "Otro",
];
export const CANALES = ["Web", "Llamada", "WhatsApp", "Instagram", "Correo", "Despacho", "Otro"];
export const MOTIVOS = [
  "Asunto fuera de lo que llevamos", "Fuera de plazo", "Solo pedía información", "Precio", "No contesta", "Eligió otro despacho",
  "Lo deja para más adelante", "Prueba o duplicado", "Otro",
];
export const FASES = ["Por empezar", "Estudio del caso", "Papeleta de conciliación", "Acto de conciliación", "Demanda presentada", "Juicio señalado", "Sentencia", "Cerrado"];
