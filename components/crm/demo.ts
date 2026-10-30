/* Datos INVENTADOS para la demostración temporal del CRM (cl·v820). Ninguna persona es real.
   El CRM de demostración no toca la base de datos: todo vive en la memoria del navegador
   y se pierde al recargar. */

type Fila = Record<string, unknown>;
const hoy = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
const dia = (n: number) => { const d = new Date(`${hoy()}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const hace = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

const USUARIOS = [
  { id: 1, email: "lucia@fueroabogados.es", nombre: "Lucía", rol: "admin", puesto: "Dirección", activo: true, aprobado: true, conClave: true },
  { id: 2, email: "alvaro@fueroabogados.es", nombre: "Álvaro Fuentes", rol: "admin", puesto: "Socio director", activo: true, aprobado: true, conClave: true },
  { id: 3, email: "recepcion@fueroabogados.es", nombre: "Marina", rol: "equipo", puesto: "Recepción", activo: true, aprobado: true, conClave: true },
  { id: 4, email: "daniel@fueroabogados.es", nombre: "Daniel Cruz", rol: "asignado", puesto: "Abogado", activo: true, aprobado: true, conClave: true },
  { id: 5, email: "irene@fueroabogados.es", nombre: "Irene Soto", rol: "asignado", puesto: "Abogada", activo: true, aprobado: true, conClave: true },
  { id: 6, email: "victor@fueroabogados.es", nombre: "Víctor Mena", rol: "asignado", puesto: "Abogado de procedimientos", activo: true, aprobado: true, conClave: true },
];

const base = (o: Fila): Fila => ({
  ref: null, apellidos: null, email: null, cp: null, direccion: null, poblacion: null, m2: null, tipo: "Despido", canal: "Web", motivo: null,
  asignado_a: null, arquitecto_id: null, visita_fecha: null, visita_hora: null, presupuesto_fecha: null, presupuesto_importe: null, firmado_fecha: null,
  firmado_importe: null, facturado_importe: null, notas: null, contacto_id: null, historico_id: null, actualizado: hace(0), tipo_vivienda: "Contrato indefinido",
  temperatura: null, inicio_deseado: null, presupuesto_cliente: null, recomendado_por: null, resena_pedida: false, obra_inicio: null, obra_fin: null,
  consentimiento: "Lo pidió por la web (formulario con aceptación)", proxima_accion: null, proxima_fecha: null, primer_contacto: null, paso_seguimiento: 0,
  anonimizado: false, probabilidad: null, jefe_obra_id: null, fase_obra: null, avance: null, obra_fin_prevista: null, informe: null, gclid: null, fbclid: null,
  ...o,
});

const LEADS: Fila[] = [
  base({ id: 101, creado: hace(0), nombre: "Elena", apellidos: "Prieto Gil", telefono: "600 000 101", email: "elena@ejemplo.es", cp: "28009", poblacion: "Retiro", m2: 8, origen: "Google Ads", estado: "nuevo", proxima_accion: "Llamar por primera vez", proxima_fecha: dia(0), temperatura: "Caliente: quiere empezar ya", notas: "Despedida ayer de una agencia de viajes. Ha usado la calculadora de indemnización." }),
  base({ id: 102, creado: hace(1), nombre: "Javier", apellidos: "Ruiz", telefono: "600 000 102", cp: "28015", poblacion: "Chamberí", m2: 4, origen: "Calculadora de indemnización", estado: "nuevo", proxima_accion: "Segundo intento: llamar y mandar WhatsApp", proxima_fecha: dia(-1), paso_seguimiento: 1 }),
  base({ id: 103, creado: hace(2), nombre: "Marta", apellidos: "Campos", telefono: "600 000 103", poblacion: "Pozuelo", m2: 15, tipo: "Acoso laboral", origen: "Recomendado", recomendado_por: "Cliente: Jorge Vidal (2023)", canal: "Llamada", estado: "contactado", asignado_a: 3, primer_contacto: hace(2), proxima_accion: "Programar la consulta inicial", proxima_fecha: dia(0) }),
  base({ id: 104, creado: hace(5), nombre: "Lucía", apellidos: "Herrero", telefono: "600 000 104", direccion: "Calle Ejemplo 12, 3º", poblacion: "Salamanca", cp: "28006", m2: 11, tipo: "Mujer y trabajo", origen: "Instagram", canal: "WhatsApp", estado: "visita-programada", asignado_a: 3, arquitecto_id: 2, visita_fecha: dia(1), visita_hora: "10:30", primer_contacto: hace(5), proxima_accion: "Hacer la consulta inicial", proxima_fecha: dia(1), notas: "Consulta con Álvaro (250 € + IVA). Tiene reducción de jornada por cuidado de su hija y ahora la quieren cambiar de puesto." }),
  base({ id: 105, creado: hace(6), nombre: "Carlos", apellidos: "Benítez", telefono: "600 000 105", direccion: "Avenida Ejemplo 4", poblacion: "Arganzuela", tipo: "Asesoría a empresas", tipo_vivienda: "Empresa", origen: "Google (sin pagar)", estado: "visita-programada", arquitecto_id: 5, visita_fecha: dia(2), visita_hora: "17:00", primer_contacto: hace(6), proxima_accion: "Hacer la consulta inicial", proxima_fecha: dia(2), notas: "Gerente de una empresa de reparto con 25 personas. Quiere asesoría laboral fija. Consulta con abogada del despacho (150 € + IVA)." }),
  base({ id: 106, creado: hace(9), nombre: "Nuria", apellidos: "Lozano", telefono: "600 000 106", poblacion: "Chamartín", m2: 6, origen: "Meta (anuncio)", estado: "visita-hecha", arquitecto_id: 4, visita_fecha: dia(-3), visita_hora: "12:00", primer_contacto: hace(9), probabilidad: 75,
    proxima_accion: "Entregar la propuesta de honorarios (plazo: 48 horas)", proxima_fecha: dia(-1),
    informe: { presentes: "Nuria y su pareja, Toni", decide: "Nuria", planta: "Empresa de logística, unas 40 personas", ascensor: "Sí", anio: "Hace 6 días", banos: "6", estancias: ["Despido", "Embarazo o maternidad"], estado_casa: "Trae la carta de despido disciplinario, el contrato y las últimas nóminas. La despiden tres semanas después de comunicar su embarazo. Le quedan 14 días hábiles para la papeleta de conciliación.", otros_presupuestos: "Uno, de otro despacho", decide_cuando: "Esta semana: le corre el plazo", impresiones: "Muy afectada. Le preocupa quedarse sin paro y lo que cuesta un juicio. Le gustó que le explicáramos los honorarios por escrito. Si la propuesta llega rápido, firma." } }),
  base({ id: 107, creado: hace(16), nombre: "Rafael", apellidos: "Iglesias", telefono: "600 000 107", poblacion: "Las Rozas", m2: 22, tipo: "Incapacidad permanente", origen: "Recomendado", estado: "presupuesto", arquitecto_id: 5, visita_fecha: dia(-12), presupuesto_fecha: dia(-8), presupuesto_importe: 2900, probabilidad: 50, primer_contacto: hace(16),
    proxima_accion: "Correo de seguimiento de la propuesta", proxima_fecha: dia(-1), paso_seguimiento: 1, informe: { impresiones: "Lleva un año de baja por una lesión de espalda y le han denegado la incapacidad permanente. Quiere reclamar. Compara con dos despachos más." } }),
  base({ id: 108, creado: hace(60), nombre: "Andrés", apellidos: "Montero", telefono: "600 000 108", direccion: "Calle Ejemplo 30", poblacion: "Moncloa", m2: 14, origen: "Instagram", estado: "firmado", arquitecto_id: 4, jefe_obra_id: 6, visita_fecha: dia(-55), presupuesto_fecha: dia(-50), presupuesto_importe: 3400,
    firmado_fecha: dia(-40), firmado_importe: 3200, facturado_importe: 1600, obra_inicio: dia(-20), obra_fin_prevista: dia(70), fase_obra: "Demanda presentada", avance: 45, primer_contacto: hace(60),
    proxima_accion: "Llamar después del juicio: contarle el resultado y pedir reseña y recomendación", proxima_fecha: dia(70), informe: { impresiones: "Despido disciplinario sin pruebas tras 14 años en la empresa. Muy claro con lo que quería. Decidió rápido." } }),
  base({ id: 109, creado: hace(3), nombre: "Óscar", apellidos: "Peña", telefono: "600 000 109", poblacion: "Getafe", m2: 3, origen: "Llamada", canal: "Llamada", estado: "descartado", motivo: "Asunto fuera de lo que llevamos", notas: "Era un problema con su comunidad de vecinos, no laboral." }),
  base({ id: 110, creado: hace(25), nombre: "Teresa", apellidos: "Vidal", telefono: "600 000 110", poblacion: "Tetuán", m2: 9, tipo: "Acoso laboral", origen: "Web (formulario)", estado: "perdido", motivo: "Precio", arquitecto_id: 5, presupuesto_importe: 1800 }),
];

const NOTAS: Record<number, Fila[]> = {
  103: [{ usuario: "Marina", texto: "La llamo; nos la recomienda Jorge Vidal. Quiere la consulta la semana que viene por la tarde.", creado: hace(2) }],
  106: [{ usuario: "Daniel Cruz", texto: "Informe de la consulta: Muy afectada…", creado: hace(3) }, { usuario: "Marina", texto: "Estado: Consulta programada → Consulta hecha", creado: hace(3) }],
  108: [{ usuario: "Víctor Mena", texto: "Cambio de honorarios documentado: se añade la reclamación de horas extra (+450 €)", creado: hace(8) }],
};
const PARTES: Record<number, Fila[]> = {
  108: [
    { id: 1, fecha: dia(-1), horas: 3, personas: 2, equipos: "abogado, paralegal", hecho: "Redacción y presentación de la demanda por despido y reclamación de horas extra en el Juzgado de lo Social de Madrid.", incidencias: "", usuario: "Víctor Mena" },
    { id: 2, fecha: dia(-2), horas: 2.5, personas: 1, equipos: "abogado", hecho: "Acto de conciliación: sin avenencia. La empresa solo ofrece la indemnización del despido objetivo.", incidencias: "La empresa no aporta el registro de jornada: lo pediremos como prueba en la demanda.", usuario: "Víctor Mena" },
  ],
};
const INCIDENCIAS: Record<number, Fila[]> = { 108: [{ id: 1, tipo: "ajuste", fecha: dia(-8), texto: "Se añade la reclamación de horas extra impagadas", importe: 450, resuelta: false, resuelta_fecha: null, usuario: "Víctor Mena" }] };
let MENSAJES: Fila[] = [{ id: 1, lead_id: 106, de: "Álvaro Fuentes", texto: "Daniel, ¿sale hoy la propuesta de honorarios de Nuria? Se pasa del plazo, y a ella le corre el de la papeleta.", leido: false, creado: hace(0.1), cliente: "Nuria Lozano" }];
let IDEAS: Fila[] = [{ usuario: "Marina", texto: "Me vendría bien un botón para mandar por WhatsApp la lista de documentos que cada cliente tiene que traer a la consulta.", creado: hace(1) }];

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
      { id: 4, nombre: "Daniel Cruz", puesto: "Abogado", clientes: 6, clientes_ant: 5, visitas: 5, visitas_ant: 4, presupuestos: 4, a_tiempo: 3, presupuestos_ant: 3, firmas: 1, firmas_ant: 1, seguimientos: 5, vencidos: 1, horas: 0 },
      { id: 5, nombre: "Irene Soto", puesto: "Abogada", clientes: 4, clientes_ant: 6, visitas: 3, visitas_ant: 5, presupuestos: 3, a_tiempo: 3, presupuestos_ant: 4, firmas: 0, firmas_ant: 1, seguimientos: 3, vencidos: 0, horas: 0 },
      { id: 6, nombre: "Víctor Mena", puesto: "Abogado de procedimientos", clientes: 0, clientes_ant: 0, visitas: 0, visitas_ant: 0, presupuestos: 0, a_tiempo: 0, presupuestos_ant: 0, firmas: 0, firmas_ant: 0, seguimientos: 1, vencidos: 0, horas: 41.5 },
    ] };
    if (nombre === "tudia") return { perfil: "direccion", vencidas: LEADS.filter((x) => x.proxima_fecha && String(x.proxima_fecha) < h).length, fueraPlazo: LEADS.filter((x) => x.estado === "visita-hecha" && String(x.proxima_fecha) < h).length, firmasMes: 1, importeMes: 3200, nuevos: LEADS.filter((x) => x.estado === "nuevo").length, visitasSemana: 2 };
    return ok();
  }
  if (nombre === "guardar") {
    const c = (b.cambios ?? {}) as Fila;
    if (c.estado === "visita-hecha" && !String((c.informe as Fila | undefined)?.impresiones ?? "").trim()) {
      const actual = LEADS.find((x) => x.id === Number(b.id));
      if (!String((actual?.informe as Fila | null)?.impresiones ?? "").trim()) throw new Error("Antes de marcar la consulta como hecha, rellena el informe de la consulta (las impresiones son obligatorias).");
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
      ? `Hola, ${n}:\n\nTe escribo para saber si has podido mirar con calma la propuesta de honorarios. En un despido hay 20 días hábiles para presentar la papeleta de conciliación, así que, si quieres, te cuento cómo lo organizaríamos para llegar con margen.\n\nCuando te venga bien, lo hablamos.\n\nUn saludo,\nDaniel, de Fuero Abogados`
      : `Hola, ${n}. Soy Daniel, de Fuero Abogados. ¿Has podido mirar con calma la propuesta de honorarios? Si quieres, te cuento cómo lo organizaríamos para llegar bien de plazo. Sin ninguna prisa, cuando te venga bien.`;
    return ok({ texto: Number(b.otra) ? t.replace("Sin ninguna prisa", "Sin compromiso") : t, asunto: b.canal === "correo" ? "Tu propuesta de honorarios" : "" });
  }
  if (nombre === "enviado" && b.id) { (NOTAS[Number(b.id)] ??= []).unshift({ usuario: yo.nombre, texto: `Mensaje enviado: ${b.texto}`, creado: new Date().toISOString() }); return ok(); }
  if (nombre === "leido") { MENSAJES = MENSAJES.map((m) => ({ ...m, leido: true })); return ok(); }
  if (nombre === "idea") { IDEAS = [{ usuario: yo.nombre, texto: String(b.texto ?? ""), creado: new Date().toISOString() }, ...IDEAS]; return ok(); }
  if (nombre === "parte" && b.id) { (PARTES[Number(b.id)] ??= []).unshift({ id: Date.now(), usuario: yo.nombre, ...b }); return ok(); }
  if (nombre === "incidencia" && b.id) { (INCIDENCIAS[Number(b.id)] ??= []).unshift({ id: Date.now(), resuelta: false, resuelta_fecha: null, usuario: yo.nombre, fecha: h, ...b }); return ok(); }
  if (nombre === "salir") { location.href = "/"; return ok(); }
  return ok();
}
