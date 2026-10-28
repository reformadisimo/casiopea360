/* Datos INVENTADOS para la demostración temporal del CRM (cl·v820). Ninguna persona es real.
   El CRM de demostración no toca la base de datos: todo vive en la memoria del navegador
   y se pierde al recargar. */

type Fila = Record<string, unknown>;
const hoy = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
const dia = (n: number) => { const d = new Date(`${hoy()}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const hace = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

const USUARIOS = [
  { id: 1, email: "direccion1@ejemplo.es", nombre: "Lucía", rol: "admin", puesto: "Dirección", activo: true, aprobado: true, conClave: true },
  { id: 2, email: "direccion2@ejemplo.es", nombre: "Sergio", rol: "admin", puesto: "Dirección", activo: true, aprobado: true, conClave: true },
  { id: 3, email: "recepcion@ejemplo.es", nombre: "Marina", rol: "equipo", puesto: "Recepción", activo: true, aprobado: true, conClave: true },
  { id: 4, email: "arq1@ejemplo.es", nombre: "Daniel Cruz", rol: "asignado", puesto: "Técnico", activo: true, aprobado: true, conClave: true },
  { id: 5, email: "arq2@ejemplo.es", nombre: "Irene Soto", rol: "asignado", puesto: "Técnico", activo: true, aprobado: true, conClave: true },
  { id: 6, email: "obra1@ejemplo.es", nombre: "Víctor Mena", rol: "asignado", puesto: "Jefe de instalaciones", activo: true, aprobado: true, conClave: true },
];

const base = (o: Fila): Fila => ({
  ref: null, apellidos: null, email: null, cp: null, direccion: null, poblacion: null, m2: null, tipo: "Aerotermia", canal: "Web", motivo: null,
  asignado_a: null, arquitecto_id: null, visita_fecha: null, visita_hora: null, presupuesto_fecha: null, presupuesto_importe: null, firmado_fecha: null,
  firmado_importe: null, facturado_importe: null, notas: null, contacto_id: null, historico_id: null, actualizado: hace(0), tipo_vivienda: "Piso",
  temperatura: null, inicio_deseado: null, presupuesto_cliente: null, recomendado_por: null, resena_pedida: false, obra_inicio: null, obra_fin: null,
  consentimiento: "Lo pidió por la web (formulario con aceptación)", proxima_accion: null, proxima_fecha: null, primer_contacto: null, paso_seguimiento: 0,
  anonimizado: false, probabilidad: null, jefe_obra_id: null, fase_obra: null, avance: null, obra_fin_prevista: null, informe: null, gclid: null, fbclid: null,
  ...o,
});

const LEADS: Fila[] = [
  base({ id: 101, creado: hace(0), nombre: "Elena", apellidos: "Prieto Gil", telefono: "600 000 101", email: "elena@ejemplo.es", cp: "28009", poblacion: "Retiro", m2: 95, origen: "Google Ads", estado: "nuevo", proxima_accion: "Llamar por primera vez", proxima_fecha: dia(0), temperatura: "Caliente: quiere empezar ya" }),
  base({ id: 102, creado: hace(1), nombre: "Javier", apellidos: "Ruiz", telefono: "600 000 102", cp: "28015", poblacion: "Chamberí", m2: 70, origen: "Calculadora web", estado: "nuevo", proxima_accion: "Segundo intento: llamar y mandar WhatsApp", proxima_fecha: dia(-1), paso_seguimiento: 1 }),
  base({ id: 103, creado: hace(2), nombre: "Marta", apellidos: "Campos", telefono: "600 000 103", poblacion: "Pozuelo", m2: 140, origen: "Recomendado", recomendado_por: "Cliente: familia Vidal (2023)", canal: "Llamada", estado: "contactado", asignado_a: 3, primer_contacto: hace(2), proxima_accion: "Programar la visita técnica", proxima_fecha: dia(0) }),
  base({ id: 104, creado: hace(5), nombre: "Lucía", apellidos: "Herrero", telefono: "600 000 104", direccion: "Calle Ejemplo 12, 3º", poblacion: "Salamanca", cp: "28006", m2: 110, origen: "Instagram", canal: "WhatsApp", estado: "visita-programada", asignado_a: 3, arquitecto_id: 4, visita_fecha: dia(1), visita_hora: "10:30", primer_contacto: hace(5), proxima_accion: "Hacer la visita técnica", proxima_fecha: dia(1) }),
  base({ id: 105, creado: hace(6), nombre: "Carlos", apellidos: "Benítez", telefono: "600 000 105", direccion: "Avenida Ejemplo 4", poblacion: "Arganzuela", m2: 85, origen: "Google (sin pagar)", estado: "visita-programada", arquitecto_id: 5, visita_fecha: dia(2), visita_hora: "17:00", primer_contacto: hace(6), proxima_accion: "Hacer la visita técnica", proxima_fecha: dia(2) }),
  base({ id: 106, creado: hace(9), nombre: "Nuria", apellidos: "Lozano", telefono: "600 000 106", poblacion: "Chamartín", m2: 120, origen: "Meta (anuncio)", estado: "visita-hecha", arquitecto_id: 4, visita_fecha: dia(-3), visita_hora: "12:00", primer_contacto: hace(9), probabilidad: 75,
    proxima_accion: "Entregar el presupuesto (plazo: 48 horas)", proxima_fecha: dia(-1),
    informe: { presentes: "Nuria y su pareja, Toni", decide: "Los dos", planta: "5ª", ascensor: "Sí", anio: "1968", banos: "5", estancias: ["Aerotermia", "Suelo radiante", "Agua caliente"], estado_casa: "Caldera de gasoil de 1998, radiadores de hierro fundido y cuadro eléctrico sin diferencial. Hay sitio para la unidad exterior en la terraza.", otros_presupuestos: "Uno, de otra empresa", decide_cuando: "Antes de que llegue el frío", impresiones: "Muy ilusionados. Les preocupa el gasto del invierno y no quedarse días sin calefacción. Les gustó ver los supuestos a la vista. Si el presupuesto llega rápido, lo deciden." } }),
  base({ id: 107, creado: hace(16), nombre: "Rafael", apellidos: "Iglesias", telefono: "600 000 107", poblacion: "Las Rozas", m2: 160, origen: "Recomendado", estado: "presupuesto", arquitecto_id: 5, visita_fecha: dia(-12), presupuesto_fecha: dia(-8), presupuesto_importe: 16800, probabilidad: 50, primer_contacto: hace(16),
    proxima_accion: "Correo de seguimiento del presupuesto", proxima_fecha: dia(-1), paso_seguimiento: 1, informe: { impresiones: "Chalet grande, quieren aerotermia con suelo radiante. Comparan con dos empresas más." } }),
  base({ id: 108, creado: hace(60), nombre: "Familia", apellidos: "Montero", telefono: "600 000 108", direccion: "Calle Ejemplo 30", poblacion: "Moncloa", m2: 100, origen: "Instagram", estado: "firmado", arquitecto_id: 4, jefe_obra_id: 6, visita_fecha: dia(-55), presupuesto_fecha: dia(-50), presupuesto_importe: 12400,
    firmado_fecha: dia(-40), firmado_importe: 11900, facturado_importe: 5950, obra_inicio: dia(-20), obra_fin_prevista: dia(70), fase_obra: "Instalación de tuberías", avance: 30, primer_contacto: hace(60),
    proxima_accion: "Llamar al terminar la instalación: pedir reseña y recomendación", proxima_fecha: dia(70), informe: { impresiones: "Pareja con dos niños. Decisión rápida. Muy claros con lo que querían." } }),
  base({ id: 109, creado: hace(3), nombre: "Óscar", apellidos: "Peña", telefono: "600 000 109", poblacion: "Getafe", m2: 45, origen: "Llamada", canal: "Llamada", estado: "descartado", motivo: "Trabajo muy pequeño o fuera de lo que hacemos", notas: "Solo quería cambiar un filtro." }),
  base({ id: 110, creado: hace(25), nombre: "Teresa", apellidos: "Vidal", telefono: "600 000 110", poblacion: "Tetuán", m2: 75, origen: "Web (formulario)", estado: "perdido", motivo: "Precio", arquitecto_id: 5, presupuesto_importe: 7900 }),
];

const NOTAS: Record<number, Fila[]> = {
  103: [{ usuario: "Marina", texto: "Le llamo; nos recomienda la familia Vidal. Quiere visita la semana que viene por la tarde.", creado: hace(2) }],
  106: [{ usuario: "Daniel Cruz", texto: "Informe de la visita: Muy ilusionados…", creado: hace(3) }, { usuario: "Marina", texto: "Estado: Visita programada → Visita hecha", creado: hace(3) }],
  108: [{ usuario: "Víctor Mena", texto: "Ajuste documentado: piden un equipo más potente para el salón (+420 €)", creado: hace(8) }],
};
const PARTES: Record<number, Fila[]> = {
  108: [
    { id: 1, fecha: dia(-1), horas: 3, personas: 4, equipos: "frigorista, electricista", hecho: "Tendido de tuberías de refrigerante hasta el salón y los dormitorios. Línea eléctrica de la unidad exterior.", incidencias: "", usuario: "Víctor Mena" },
    { id: 2, fecha: dia(-2), horas: 2.5, personas: 3, equipos: "frigorista", hecho: "Colocación de la bancada de la unidad exterior en la terraza y retirada de la caldera antigua.", incidencias: "El forjado de la terraza está más bajo de lo previsto: avisado el técnico.", usuario: "Víctor Mena" },
  ],
};
const INCIDENCIAS: Record<number, Fila[]> = { 108: [{ id: 1, tipo: "ajuste", fecha: dia(-8), texto: "Piden un equipo más potente para el salón", importe: 420, resuelta: false, resuelta_fecha: null, usuario: "Víctor Mena" }] };
let MENSAJES: Fila[] = [{ id: 1, lead_id: 106, de: "Sergio", texto: "Daniel, ¿llega hoy el presupuesto de Nuria? Se pasa del plazo.", leido: false, creado: hace(0.1), cliente: "Nuria Lozano" }];
let IDEAS: Fila[] = [{ usuario: "Marina", texto: "Me vendría bien un botón para mandar por WhatsApp el calendario de revisiones a cada cliente.", creado: hace(1) }];

const ok = (o: Fila = {}) => ({ ok: true, ...o });
const yo = USUARIOS[0];

export async function apiDemo(accion: string, cuerpo?: unknown, metodo = "POST"): Promise<Fila> {
  await new Promise((r) => setTimeout(r, 120));
  const [nombre, qs] = accion.split("?");
  const q = new URLSearchParams(qs ?? "");
  const b = (cuerpo ?? {}) as Fila;
  const h = hoy();
  if (metodo === "GET") {
    if (nombre === "leads") {
      let l = [...LEADS];
      const t = (q.get("q") ?? "").toLowerCase();
      if (t) l = l.filter((x) => JSON.stringify([x.nombre, x.apellidos, x.telefono, x.email, x.poblacion, x.cp]).toLowerCase().includes(t));
      if (q.get("origen")) l = l.filter((x) => x.origen === q.get("origen"));
      const pend = l.filter((x) => x.proxima_fecha && String(x.proxima_fecha) <= h);
      if (q.get("mias")) l = pend;
      const porEstado: Record<string, number> = {};
      for (const x of l) porEstado[String(x.estado)] = (porEstado[String(x.estado)] ?? 0) + 1;
      if (q.get("estado")) l = l.filter((x) => x.estado === q.get("estado"));
      return { leads: l, total: l.length, porEstado, pendientes: pend.length, sinLeer: MENSAJES.filter((m) => !m.leido).length };
    }
    if (nombre === "lead") {
      const id = Number(q.get("id"));
      const lead = LEADS.find((x) => x.id === id);
      return { lead, notas: NOTAS[id] ?? [], duplicados: [], partes: PARTES[id] ?? [], incidencias: INCIDENCIAS[id] ?? [] };
    }
    if (nombre === "usuarios") return { usuarios: USUARIOS };
    if (nombre === "agenda") return { visitas: LEADS.filter((x) => x.estado === "visita-programada").map((x) => ({ id: x.id, nombre: `${x.nombre} ${x.apellidos ?? ""}`.trim(), telefono: x.telefono, donde: [x.direccion, x.poblacion].filter(Boolean).join(", "), m2: x.m2, fecha: x.visita_fecha, hora: x.visita_hora, arquitecto_id: x.arquitecto_id })) };
    if (nombre === "bandeja") return { mensajes: MENSAJES };
    if (nombre === "alarmas") return { alarmas: LEADS.filter((x) => x.proxima_fecha && String(x.proxima_fecha) < h).map((x) => ({ id: x.id, nombre: `${x.nombre} ${x.apellidos ?? ""}`.trim(), estado: x.estado, accion: x.proxima_accion, fecha: x.proxima_fecha, dias: Math.round((Date.parse(`${h}T12:00:00Z`) - Date.parse(`${x.proxima_fecha}T12:00:00Z`)) / 86400000), personas: [x.asignado_a, x.arquitecto_id].filter(Boolean) })) };
    if (nombre === "instalaciones") return { instalaciones: LEADS.filter((x) => x.estado === "firmado").map((x) => ({ id: x.id, nombre: `${x.nombre} ${x.apellidos ?? ""}`.trim(), poblacion: x.poblacion, jefe_obra_id: x.jefe_obra_id, fase: x.fase_obra, avance: x.avance, inicio: x.obra_inicio, prevista: x.obra_fin_prevista, fin: x.obra_fin, importe: x.firmado_importe, horas: (PARTES[Number(x.id)] ?? []).reduce((a, p) => a + Number(p.horas ?? 0), 0), ultimo_parte: PARTES[Number(x.id)]?.[0]?.fecha ?? null, abiertas: 0 })), horasMes: [{ quien: "Víctor Mena", mes: h.slice(0, 7), horas: 5.5, instalaciones: 1 }] };
    if (nombre === "ideas") return { ideas: IDEAS };
    if (nombre === "equipo") return { equipo: [
      { id: 3, nombre: "Marina", puesto: "Recepción", clientes: 18, clientes_ant: 15, visitas: 0, visitas_ant: 0, presupuestos: 0, a_tiempo: 0, presupuestos_ant: 0, firmas: 0, firmas_ant: 0, seguimientos: 4, vencidos: 1, horas: 0 },
      { id: 4, nombre: "Daniel Cruz", puesto: "Técnico", clientes: 6, clientes_ant: 5, visitas: 5, visitas_ant: 4, presupuestos: 4, a_tiempo: 3, presupuestos_ant: 3, firmas: 1, firmas_ant: 1, seguimientos: 5, vencidos: 1, horas: 0 },
      { id: 5, nombre: "Irene Soto", puesto: "Técnico", clientes: 4, clientes_ant: 6, visitas: 3, visitas_ant: 5, presupuestos: 3, a_tiempo: 3, presupuestos_ant: 4, firmas: 0, firmas_ant: 1, seguimientos: 3, vencidos: 0, horas: 0 },
      { id: 6, nombre: "Víctor Mena", puesto: "Jefe de instalaciones", clientes: 0, clientes_ant: 0, visitas: 0, visitas_ant: 0, presupuestos: 0, a_tiempo: 0, presupuestos_ant: 0, firmas: 0, firmas_ant: 0, seguimientos: 1, vencidos: 0, horas: 41.5 },
    ] };
    if (nombre === "tudia") return { perfil: "direccion", vencidas: LEADS.filter((x) => x.proxima_fecha && String(x.proxima_fecha) < h).length, fueraPlazo: LEADS.filter((x) => x.estado === "visita-hecha" && String(x.proxima_fecha) < h).length, firmasMes: 1, importeMes: 11900, nuevos: LEADS.filter((x) => x.estado === "nuevo").length, visitasSemana: 2 };
    return ok();
  }
  if (nombre === "guardar") {
    const c = (b.cambios ?? {}) as Fila;
    if (c.estado === "visita-hecha" && !String((c.informe as Fila | undefined)?.impresiones ?? "").trim()) {
      const actual = LEADS.find((x) => x.id === Number(b.id));
      if (!String((actual?.informe as Fila | null)?.impresiones ?? "").trim()) throw new Error("Antes de marcar la visita como hecha, rellena el informe de la visita (las impresiones son obligatorias).");
    }
    if (!b.id) { const id = Math.max(...LEADS.map((x) => Number(x.id))) + 1; LEADS.unshift(base({ id, creado: new Date().toISOString(), estado: "nuevo", proxima_accion: "Llamar por primera vez", proxima_fecha: h, ...c })); return ok({ id }); }
    const l = LEADS.find((x) => x.id === Number(b.id));
    if (l) Object.assign(l, c, { actualizado: new Date().toISOString() });
    (NOTAS[Number(b.id)] ??= []).unshift({ usuario: yo.nombre, texto: "Cambios guardados (demostración)", creado: new Date().toISOString() });
    return ok({ id: b.id });
  }
  if (["nota", "hecho", "mensaje"].includes(nombre) && b.id) {
    (NOTAS[Number(b.id)] ??= []).unshift({ usuario: yo.nombre, texto: nombre === "hecho" ? `Hecho. ${b.texto ?? ""}` : String(b.texto ?? ""), creado: new Date().toISOString() });
    if (nombre === "hecho") { const l = LEADS.find((x) => x.id === Number(b.id)); if (l) { l.proxima_accion = "Siguiente paso (demostración)"; l.proxima_fecha = dia(2); } }
    return ok();
  }
  if (nombre === "redactar") {
    const l = LEADS.find((x) => x.id === Number(b.id));
    const n = String(l?.nombre ?? "").split(" ")[0];
    const t = b.canal === "correo"
      ? `Hola, ${n}:\n\nTe escribo para saber si habéis podido mirar el presupuesto con calma. Sé que queréis tenerlo listo antes del frío, así que si queréis os cuento cómo organizaríamos la instalación para que llegue a tiempo.\n\nCuando os venga bien, lo hablamos.\n\nUn abrazo,\nDaniel, de Climatización Ejemplo`
      : `Hola, ${n}. Soy Daniel, de Climatización Ejemplo. ¿Habéis podido mirar el presupuesto con calma? Si queréis, os cuento cómo organizaríamos la instalación para que llegue a tiempo. Sin ninguna prisa, cuando os venga bien.`;
    return ok({ texto: Number(b.otra) ? t.replace("Sin ninguna prisa", "Tranquilos") : t, asunto: b.canal === "correo" ? "Vuestro presupuesto" : "" });
  }
  if (nombre === "enviado" && b.id) { (NOTAS[Number(b.id)] ??= []).unshift({ usuario: yo.nombre, texto: `Mensaje enviado: ${b.texto}`, creado: new Date().toISOString() }); return ok(); }
  if (nombre === "leido") { MENSAJES = MENSAJES.map((m) => ({ ...m, leido: true })); return ok(); }
  if (nombre === "idea") { IDEAS = [{ usuario: yo.nombre, texto: String(b.texto ?? ""), creado: new Date().toISOString() }, ...IDEAS]; return ok(); }
  if (nombre === "parte" && b.id) { (PARTES[Number(b.id)] ??= []).unshift({ id: Date.now(), usuario: yo.nombre, ...b }); return ok(); }
  if (nombre === "incidencia" && b.id) { (INCIDENCIAS[Number(b.id)] ??= []).unshift({ id: Date.now(), resuelta: false, resuelta_fecha: null, usuario: yo.nombre, fecha: h, ...b }); return ok(); }
  if (nombre === "salir") { location.href = "/"; return ok(); }
  return ok();
}
