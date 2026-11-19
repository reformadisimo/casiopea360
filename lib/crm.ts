/* Estados del CRM de la mesa de Casiopea (19-nov-2026). El orden es el del camino de una persona. */
export const ESTADOS = [
  { clave: "nuevo", nombre: "Nuevos", color: "#16286b", ayuda: "Han hecho el test y aún no les hemos escrito." },
  { clave: "contactado", nombre: "Contactados", color: "#7a5a00", ayuda: "Ya les hemos contestado." },
  { clave: "estudio", nombre: "Estudio enviado", color: "#6d28d9", ayuda: "Tienen su estudio; esperamos su respuesta." },
  { clave: "cliente", nombre: "Clientes", color: "#1d6b3a", ayuda: "Han empezado a trabajar con nosotros." },
  { clave: "descartado", nombre: "Descartados", color: "#6b7280", ayuda: "No encajan o no siguen." },
] as const;
export type Estado = (typeof ESTADOS)[number]["clave"];
