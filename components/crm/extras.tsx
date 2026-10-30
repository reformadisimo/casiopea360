/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { Icono, type IconoVida } from "@/components/ui/vida";
import { api, campo, etiqueta, eur, fecha, hora, hoyMadrid, Panel } from "./comun";

/* CRM v3 (26-oct, cl·v817): pantalla de inicio "para no perderse", informe de la consulta,
   procedimiento (abogado, fase, partes de actuaciones, cambios de honorarios, después del cierre), mensajes internos, agenda,
   alarmas del equipo y casos en marcha. */

type Persona = { id: number; nombre: string; puesto?: string | null; activo?: boolean };
export type Informe = {
  presentes?: string; decide?: string; planta?: string; ascensor?: string; anio?: string; estado_casa?: string;
  estancias?: string[]; banos?: string; otros_presupuestos?: string; decide_cuando?: string; impresiones?: string;
};
export type Parte = { id: number; fecha: string; horas: number | null; personas: number | null; equipos: string; hecho: string; incidencias: string; usuario: string };
export type Incidencia = { id: number; tipo: string; fecha: string; texto: string; importe: number | null; resuelta: boolean; resuelta_fecha: string | null; usuario: string };

/* ── Inicio: qué se puede hacer, con una frase cada cosa ── */
type Tarjeta = { id: string; icono: IconoVida; titulo: string; texto: string; cifra?: number; alerta?: boolean; principal?: boolean };
export function Inicio({ nombre, esAdmin, pendientes, sinLeer, porEstado, estados, ir, compacto = false }: {
  nombre: string; esAdmin: boolean; pendientes: number; sinLeer: number; porEstado: Record<string, number>; estados: [string, string][];
  ir: (destino: string, estado?: string) => void; compacto?: boolean;
}) {
  const tarjetas: Tarjeta[] = [
    { id: "hoy", icono: "reloj", titulo: "Lo mío de hoy", texto: "Las llamadas y tareas que te tocan hoy o que se han pasado de fecha.", cifra: pendientes, alerta: pendientes > 0, principal: true },
    { id: "nuevo", icono: "persona", titulo: "Apuntar una llamada o un WhatsApp", texto: "Alguien ha contactado: dale de alta en un minuto con su nombre, teléfono y de dónde viene.", principal: true },
    { id: "todos", icono: "lupa", titulo: "Buscar un cliente", texto: "Por nombre, teléfono, correo o código postal. Ves en qué punto está y todo lo hablado." },
    { id: "agenda", icono: "calendario", titulo: "Agenda de consultas", texto: "Las consultas de los próximos 14 días, día a día, con hora, cliente y abogado." },
    { id: "mensajes", icono: "chat", titulo: "Mensajes", texto: "Lo que te ha escrito el equipo sobre sus clientes. Contestas desde la ficha del cliente.", cifra: sinLeer, alerta: sinLeer > 0 },
    { id: "instalaciones", icono: "casco", titulo: "Casos en marcha", texto: "Cada caso firmado: abogado del procedimiento, fase, avance, horas y partes de actuaciones." },
    ...(esAdmin
      ? ([
          { id: "mesa", icono: "lupa", titulo: "Panel de control", texto: "Las cifras del negocio: web, anuncios, Google y ventas, comparadas con antes. Se abre en otra pestaña." },
          { id: "alarmas", icono: "escudo", titulo: "El equipo y sus alarmas", texto: "Cómo va cada uno este mes (frente a su mes anterior) y quién tiene seguimientos vencidos." },
          { id: "equipo", icono: "persona", titulo: "Equipo y accesos", texto: "Dar de alta a Marina y a los abogados. Álvaro aprueba cada alta por correo." },
          { id: "importar", icono: "documento", titulo: "Subir el CRM antiguo", texto: "Carga el archivo CSV del CRM anterior. Si lo subes dos veces, no duplica." },
        ] as Tarjeta[])
      : []),
    { id: "exportar", icono: "documento", titulo: "Descargar en Excel", texto: "Todos los clientes con todos sus datos, para tus cuentas y estadísticas." },
    { id: "guia", icono: "documento", titulo: "Guía de uso", texto: "Qué hace cada cosa y cómo se usa, paso a paso, explicado para tu puesto." },
    { id: "ideas", icono: "corazon", titulo: "Buzón de ideas", texto: "¿Echas algo en falta o se te ocurre una mejora? Escríbelo aquí y le llega a dirección." },
  ];
  if (compacto)
    return (
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((t) => (
          <button key={t.id} type="button" onClick={() => ir(t.id)}
            className={`flex items-start gap-3 rounded-[16px] border p-3 text-left transition-colors ${t.alerta ? "border-[#a3505a] bg-[#f8e8ea]" : "border-line bg-white hover:border-ink/40"}`}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.alerta ? "bg-[#a3505a] text-white" : t.principal ? "bg-yellow text-ink" : "bg-cream text-teal-deep"}`}><Icono i={t.icono} className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2"><span className="text-[15px] font-bold text-ink">{t.titulo}</span>{t.cifra ? <span className="font-serif text-[20px] leading-none text-[#a3505a]">{t.cifra}</span> : null}</span>
              <span className="block text-[13px] leading-snug text-ink/60">{t.texto}</span>
            </span>
          </button>
        ))}
      </div>
    );
  const camino = estados.filter(([k]) => !["perdido", "descartado"].includes(k));
  return (
    <div>
      <h2 className="font-serif text-[30px] italic leading-tight text-ink">Hola, {nombre}. ¿Qué quieres hacer?</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((t) => (
          <button key={t.id} type="button" onClick={() => ir(t.id)}
            className={`group flex items-start gap-4 rounded-[22px] border-2 p-5 text-left transition-colors ${t.alerta ? "border-[#a3505a] bg-[#f8e8ea]" : t.principal ? "border-ink bg-white" : "border-line bg-white hover:border-ink/40"}`}>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${t.alerta ? "bg-[#a3505a] text-white" : t.principal ? "bg-yellow text-ink" : "bg-cream text-teal-deep"}`}>
              <Icono i={t.icono} className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[17px] font-bold leading-snug text-ink">{t.titulo}</span>
                {t.cifra !== undefined ? <span className={`font-serif text-[28px] leading-none ${t.alerta ? "text-[#a3505a]" : "text-ink/40"}`}>{t.cifra}</span> : null}
              </span>
              <span className="mt-1 block text-[14px] leading-relaxed text-ink/65">{t.texto}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-[22px] border border-line bg-white p-5">
        <p className={etiqueta}>El camino de cada cliente (toca un paso para ver quién está ahí)</p>
        <ol className="mt-3 flex flex-wrap items-stretch gap-2">
          {camino.map(([k, t], i) => (
            <li key={k} className="flex items-center gap-2">
              <button type="button" onClick={() => ir("estado", k)} className="rounded-[14px] border border-line bg-cream px-3 py-2 text-left hover:border-ink">
                <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-ink/50">Paso {i + 1}</span>
                <span className="block text-[14.5px] font-semibold text-ink">{t}</span>
                <span className="font-serif text-[22px] leading-none text-teal-deep">{porEstado[k] ?? 0}</span>
              </button>
              {i < camino.length - 1 ? <span className="text-ink/30" aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
        <ul className="mt-4 grid gap-1.5 text-[14px] leading-relaxed text-ink/70 sm:grid-cols-2">
          <li><b className="text-ink">Cada paso pone solo la siguiente tarea</b> y su fecha. Cuando la haces, pulsas "Hecho".</li>
          <li><b className="text-ink">La consulta hecha pide el informe</b> del abogado: quién vino, el caso e impresiones.</li>
          <li><b className="text-ink">La propuesta de honorarios, en 48 horas</b> desde la consulta. Si se pasa, salta la alarma.</li>
          <li><b className="text-ink">Cada mañana a las 8</b> le llega a cada persona un correo con lo suyo de hoy.</li>
        </ul>
      </div>
    </div>
  );
}

/* ── Informe de la consulta inicial (lo rellena el abogado) ── */
const ESTANCIAS = ["Despido", "Reclamación de cantidad", "Acoso laboral", "Incapacidad permanente", "Embarazo o maternidad", "Conciliación y jornada", "Cambio de condiciones", "Asesoría a empresa"];
export function InformeVisita({ valor, cambiar, abierto }: { valor: Informe | null | undefined; cambiar: (i: Informe) => void; abierto: boolean }) {
  const v = valor ?? {};
  const pon = (k: keyof Informe, x: string | string[]) => cambiar({ ...v, [k]: x });
  const txt = (k: keyof Informe, t: string, ph = "") => (
    <label className="block"><span className={etiqueta}>{t}</span><input className={campo} placeholder={ph} value={(v[k] as string) ?? ""} onChange={(e) => pon(k, e.target.value)} /></label>
  );
  const falta = !String(v.impresiones ?? "").trim();
  return (
    <details open={abierto} className={`rounded-[20px] border-2 bg-white p-4 ${abierto && falta ? "border-[#a3505a]" : "border-line"}`}>
      <summary className="cursor-pointer text-[16px] font-bold text-ink">Informe de la consulta inicial {falta ? <span className="ml-1 text-[13px] font-semibold text-[#a3505a]">(falta)</span> : <span className="ml-1 text-[13px] font-semibold text-[#3f6b39]">(hecho)</span>}</summary>
      <p className="mt-1 text-[13px] text-ink/55">Lo rellena el abogado al terminar la consulta. Solo las impresiones son obligatorias; lo demás, cuanto más, mejor.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {txt("presentes", "Quién vino a la consulta", "Ej.: Ana y su marido Luis")}
        {txt("decide", "Quién decide", "Ej.: ella; lo consulta con su pareja")}
        {txt("planta", "Empresa", "Ej.: cadena de tiendas, 200 personas")}
        <label className="block"><span className={etiqueta}>¿Le corre algún plazo?</span>
          <select className={campo} value={v.ascensor ?? ""} onChange={(e) => pon("ascensor", e.target.value)}><option value="">Elige…</option><option>Sí</option><option>No</option><option>No lo sabe</option></select>
        </label>
        {txt("anio", "Fecha del despido o de los hechos", "Ej.: 14 de octubre")}
        {txt("banos", "Años en la empresa", "Ej.: 8")}
      </div>
      <p className={`${etiqueta} mt-4`}>Qué hay que llevar (marca lo que toque)</p>
      <div className="flex flex-wrap gap-2">
        {ESTANCIAS.map((e) => {
          const on = (v.estancias ?? []).includes(e);
          return (
            <label key={e} className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[14px] ${on ? "border-ink bg-ink text-white" : "border-line bg-cream text-ink"}`}>
              <input type="checkbox" className="h-4 w-4" checked={on} onChange={() => pon("estancias", on ? (v.estancias ?? []).filter((x) => x !== e) : [...(v.estancias ?? []), e])} />{e}
            </label>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2"><span className={etiqueta}>Documentos y situación</span><textarea className={`${campo} min-h-[70px]`} placeholder="Ej.: trae carta de despido, contrato y nóminas; falta la vida laboral" value={v.estado_casa ?? ""} onChange={(e) => pon("estado_casa", e.target.value)} /></label>
        {txt("otros_presupuestos", "¿Ha consultado a otros despachos?", "Ej.: sí, uno; le pedían 2.500 €")}
        {txt("decide_cuando", "Cuándo va a decidir", "Ej.: esta semana")}
        <label className="block sm:col-span-2"><span className={`${etiqueta} ${falta ? "text-[#a3505a]" : ""}`}>Impresiones de la consulta (obligatorio)</span>
          <textarea className={`${campo} min-h-[110px] ${falta ? "border-[#a3505a]" : ""}`} placeholder="Cómo le has visto, qué le preocupa, qué le ha gustado, si hay confianza, qué haría falta para que firme…" value={v.impresiones ?? ""} onChange={(e) => pon("impresiones", e.target.value)} />
        </label>
      </div>
    </details>
  );
}

/* ── El procedimiento: abogado, fase, avance, partes de actuaciones, cambios de honorarios y después del cierre ── */
export function SeccionObra({ id, partes, incidencias, recargar }: { id: number; partes: Parte[]; incidencias: Incidencia[]; recargar: () => Promise<void> }) {
  const vacio = { fecha: hoyMadrid(), horas: "", personas: "", equipos: "", hecho: "", incidencias: "" };
  const [p, setP] = useState(vacio);
  const [inc, setInc] = useState({ tipo: "ajuste", texto: "", importe: "" });
  const [msg, setMsg] = useState("");
  const horas = partes.reduce((a, x) => a + (x.horas ?? 0), 0);
  const enviarParte = async () => {
    try {
      await api("parte", { id, ...p, horas: p.horas === "" ? null : Number(p.horas.replace(",", ".")), personas: p.personas === "" ? null : Number(p.personas) });
      setP(vacio); setMsg("Parte guardado."); await recargar();
    } catch (e) { setMsg((e as Error).message); }
  };
  const enviarInc = async () => {
    try {
      await api("incidencia", { id, tipo: inc.tipo, texto: inc.texto, importe: inc.importe === "" ? null : Number(inc.importe.replace(",", ".")) });
      setInc({ ...inc, texto: "", importe: "" }); await recargar();
    } catch (e) { setMsg((e as Error).message); }
  };
  return (
    <>
      <div className="mt-4 rounded-[16px] bg-cream p-4">
        <p className="text-[15px] font-bold text-ink">Parte de actuaciones <span className="font-normal text-ink/55">(lo rellena el abogado del procedimiento)</span></p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <label className="block"><span className={etiqueta}>Fecha</span><input type="date" className={campo} value={p.fecha} onChange={(e) => setP({ ...p, fecha: e.target.value })} /></label>
          <label className="block"><span className={etiqueta}>Tus horas</span><input inputMode="decimal" className={campo} placeholder="Ej.: 3,5" value={p.horas} onChange={(e) => setP({ ...p, horas: e.target.value })} /></label>
          <label className="block"><span className={etiqueta}>Personas que han trabajado</span><input inputMode="numeric" className={campo} placeholder="Ej.: 2" value={p.personas} onChange={(e) => setP({ ...p, personas: e.target.value })} /></label>
          <label className="block sm:col-span-3"><span className={etiqueta}>Quién ha intervenido</span><input className={campo} placeholder="Ej.: abogado, paralegal" value={p.equipos} onChange={(e) => setP({ ...p, equipos: e.target.value })} /></label>
          <label className="block sm:col-span-3"><span className={etiqueta}>Qué se ha hecho</span><textarea className={`${campo} min-h-[60px]`} value={p.hecho} onChange={(e) => setP({ ...p, hecho: e.target.value })} /></label>
          <label className="block sm:col-span-3"><span className={etiqueta}>Incidencias (si las hay)</span><textarea className={`${campo} min-h-[50px]`} value={p.incidencias} onChange={(e) => setP({ ...p, incidencias: e.target.value })} /></label>
        </div>
        <button type="button" onClick={enviarParte} disabled={!p.hecho && !p.horas} className="mt-2 rounded-full bg-yellow px-5 py-2.5 text-[14px] font-bold text-ink disabled:opacity-40">Guardar el parte</button>
        {msg ? <span className="ml-3 text-[14px] text-ink/70">{msg}</span> : null}
      </div>
      {partes.length ? (
        <div className="mt-3">
          <p className="text-[14px] text-ink/70"><b className="text-ink">{partes.length} partes</b> · {String(Math.round(horas * 10) / 10).replace(".", ",")} horas en total</p>
          <ul className="mt-2 space-y-2">
            {partes.map((x) => (
              <li key={x.id} className="rounded-[12px] border border-line bg-white px-3 py-2 text-[14px]">
                <span className="block text-[12px] text-ink/50">{fecha(x.fecha)} · {x.usuario}{x.horas !== null ? ` · ${String(x.horas).replace(".", ",")} h` : ""}{x.personas !== null ? ` · ${x.personas} personas` : ""}{x.equipos ? ` · ${x.equipos}` : ""}</span>
                {x.hecho ? <span className="block whitespace-pre-wrap text-ink/85">{x.hecho}</span> : null}
                {x.incidencias ? <span className="mt-1 block whitespace-pre-wrap text-[#a3505a]">Incidencia: {x.incidencias}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 rounded-[16px] bg-cream p-4">
        <p className="text-[15px] font-bold text-ink">Cambios de honorarios y después del cierre</p>
        <p className="text-[13px] text-ink/55">Cambio de honorarios: lo que cambia el importe del encargo y por qué. Después del cierre: algo que pide el cliente cuando el caso ya está cerrado.</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_2fr_1fr]">
          <select className={campo} value={inc.tipo} onChange={(e) => setInc({ ...inc, tipo: e.target.value })}><option value="ajuste">Cambio de honorarios</option><option value="posventa">Después del cierre</option></select>
          <input className={campo} placeholder={inc.tipo === "ajuste" ? "Ej.: se añade la reclamación de horas extra" : "Ej.: la empresa no ha pagado la indemnización en plazo"} value={inc.texto} onChange={(e) => setInc({ ...inc, texto: e.target.value })} />
          {inc.tipo === "ajuste" ? <input inputMode="decimal" className={campo} placeholder="Importe (€, + o -)" value={inc.importe} onChange={(e) => setInc({ ...inc, importe: e.target.value })} /> : <span />}
        </div>
        <button type="button" onClick={enviarInc} disabled={!inc.texto.trim()} className="mt-2 rounded-full border border-ink px-4 py-2 text-[14px] font-bold text-ink disabled:opacity-40">Apuntar</button>
        {incidencias.length ? (
          <ul className="mt-3 space-y-2">
            {incidencias.map((x) => (
              <li key={x.id} className="flex items-start justify-between gap-3 rounded-[12px] border border-line bg-white px-3 py-2 text-[14px]">
                <span>
                  <span className="block text-[12px] text-ink/50">{x.tipo === "ajuste" ? "Honorarios" : "Después del cierre"} · {fecha(x.fecha)} · {x.usuario}{x.importe !== null ? ` · ${eur(x.importe)}` : ""}</span>
                  {x.texto}
                </span>
                {x.tipo === "posventa" ? (x.resuelta ? <span className="shrink-0 text-[13px] font-bold text-[#3f6b39]">Resuelta {fecha(x.resuelta_fecha)}</span> : <button type="button" onClick={async () => { await api("incidencia", { resolver: x.id }); await recargar(); }} className="shrink-0 rounded-full border border-line px-3 py-1 text-[13px] font-semibold">Marcar resuelta</button>) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}

/* ── Escribir a alguien del equipo sobre este cliente ── */
export function EscribirMensaje({ id, personas, yo, hecho }: { id: number; personas: Persona[]; yo: number; hecho: () => void }) {
  const [para, setPara] = useState("");
  const [texto, setTexto] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[1fr_2fr]">
        <select className={campo} value={para} onChange={(e) => setPara(e.target.value)}>
          <option value="">¿A quién?</option>
          {personas.filter((x) => x.id !== yo && x.activo !== false).map((x) => <option key={x.id} value={x.id}>{x.nombre}{x.puesto ? ` (${x.puesto})` : ""}</option>)}
        </select>
        <textarea className={`${campo} min-h-[48px]`} placeholder="Ej.: ¿Cómo fue la consulta? Mándale la propuesta antes del jueves." value={texto} onChange={(e) => setTexto(e.target.value)} />
      </div>
      <button type="button" disabled={!para || !texto.trim()} onClick={async () => {
        try { await api("mensaje", { para: Number(para), id, texto }); setTexto(""); setMsg("Enviado. Le llega un correo y lo ve en sus mensajes."); hecho(); } catch (e) { setMsg((e as Error).message); }
      }} className="mt-2 rounded-full border border-ink px-4 py-2 text-[14px] font-bold text-ink disabled:opacity-40">Enviar mensaje</button>
      {msg ? <span className="ml-3 text-[14px] text-ink/70">{msg}</span> : null}
    </div>
  );
}

/* ── Pantallas ── */
export function Agenda({ personas, abrir, cerrar }: { personas: Persona[]; abrir: (id: number) => void; cerrar: () => void }) {
  const [v, setV] = useState<{ id: number; nombre: string; telefono: string; donde: string; m2: number | null; fecha: string; hora: string; arquitecto_id: number | null }[] | null>(null);
  useEffect(() => { api("agenda", undefined, "GET").then((j) => setV(j.visitas)).catch(() => setV([])); }, []);
  const dias = [...new Set((v ?? []).map((x) => x.fecha))];
  const hoy = hoyMadrid();
  return (
    <Panel titulo="Agenda de consultas" cerrar={cerrar}>
      <p className="text-[14px] text-ink/65">Las consultas programadas de ayer a dentro de 14 días. Para poner una consulta, abre al cliente, márcalo en "Consulta programada" y pon fecha, hora y abogado.</p>
      {v === null ? <p className="mt-4 text-ink/55">Cargando…</p> : !v.length ? <p className="mt-4 rounded-[16px] border border-dashed border-line bg-white p-5 text-center text-ink/60">No hay consultas programadas estos días.</p> : null}
      {dias.map((d) => (
        <div key={d} className="mt-5">
          <p className={`text-[13px] font-bold uppercase tracking-[0.1em] ${d === hoy ? "text-[#a3505a]" : "text-teal-deep"}`}>{d === hoy ? "Hoy · " : ""}{new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</p>
          <ul className="mt-2 space-y-2">
            {(v ?? []).filter((x) => x.fecha === d).map((x) => (
              <li key={x.id}>
                <button type="button" onClick={() => abrir(x.id)} className="grid w-full grid-cols-[64px_1fr] gap-3 rounded-[16px] border border-line bg-white px-4 py-3 text-left hover:border-ink/40">
                  <span className="font-serif text-[22px] text-ink">{x.hora || "--:--"}</span>
                  <span>
                    <b className="text-ink">{x.nombre}</b>{x.m2 ? <span className="text-ink/55"> · {x.m2} años en la empresa</span> : null}
                    <span className="block text-[13px] text-ink/60">{x.donde || "Sin dirección"}{x.telefono ? ` · ${x.telefono}` : ""}</span>
                    <span className="block text-[13px] font-semibold text-teal-deep">{personas.find((p) => p.id === x.arquitecto_id)?.nombre ?? "Sin abogado asignado"}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Panel>
  );
}

export function Bandeja({ abrir, cerrar }: { abrir: (id: number) => void; cerrar: () => void }) {
  const [m, setM] = useState<{ id: number; lead_id: number | null; de: string; texto: string; leido: boolean; creado: string; cliente: string }[] | null>(null);
  useEffect(() => { api("bandeja", undefined, "GET").then((j) => { setM(j.mensajes); api("leido").catch(() => null); }).catch(() => setM([])); }, []);
  return (
    <Panel titulo="Mensajes" cerrar={cerrar} ancho="max-w-[620px]">
      <p className="text-[14px] text-ink/65">Lo que te ha escrito el equipo. Toca uno para abrir al cliente y contestar desde su ficha (apartado "Escribir a alguien del equipo").</p>
      {m === null ? <p className="mt-4 text-ink/55">Cargando…</p> : !m.length ? <p className="mt-4 rounded-[16px] border border-dashed border-line bg-white p-5 text-center text-ink/60">No tienes mensajes.</p> : null}
      <ul className="mt-4 space-y-2">
        {(m ?? []).map((x) => (
          <li key={x.id}>
            <button type="button" disabled={x.lead_id === null} onClick={() => x.lead_id !== null && abrir(x.lead_id)} className={`w-full rounded-[16px] border px-4 py-3 text-left ${x.leido ? "border-line bg-white" : "border-ink bg-[#fffbe0]"}`}>
              <span className="block text-[12px] text-ink/50">{hora(x.creado)} · de {x.de}{x.cliente ? ` · sobre ${x.cliente}` : ""}{x.leido ? "" : " · nuevo"}</span>
              <span className="whitespace-pre-wrap text-[15px] text-ink">{x.texto}</span>
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

type FilaEquipo = { id: number; nombre: string; puesto: string; clientes: number; clientes_ant: number; visitas: number; visitas_ant: number; presupuestos: number; a_tiempo: number; presupuestos_ant: number; firmas: number; firmas_ant: number; seguimientos: number; vencidos: number; horas: number };
function ComoVa() {
  const [f, setF] = useState<FilaEquipo[] | null>(null);
  useEffect(() => { api("equipo", undefined, "GET").then((j) => setF(j.equipo)).catch(() => setF([])); }, []);
  if (!f) return <p className="mt-3 text-ink/55">Cargando…</p>;
  const comp = (a: number, b: number) => (a === b ? "igual que el mes pasado" : a > b ? `${a - b} más que el mes pasado` : `${b - a} menos que el mes pasado`);
  const vis = f.filter((x) => x.clientes + x.visitas + x.presupuestos + x.firmas + x.seguimientos + x.horas > 0 || x.clientes_ant + x.visitas_ant);
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {vis.length ? vis.map((x) => {
        const pct = x.presupuestos ? Math.round((x.a_tiempo / x.presupuestos) * 100) : null;
        return (
          <div key={x.id} className="rounded-[16px] border border-line bg-white p-3 text-[14px]">
            <p className="font-bold text-ink">{x.nombre} <span className="font-normal text-ink/50">{x.puesto}</span></p>
            <ul className="mt-1 space-y-0.5 text-ink/75">
              {x.clientes || x.clientes_ant ? <li>{x.clientes} clientes nuevos ({comp(x.clientes, x.clientes_ant)})</li> : null}
              {x.visitas || x.visitas_ant ? <li>{x.visitas} consultas hechas ({comp(x.visitas, x.visitas_ant)})</li> : null}
              {x.presupuestos || x.presupuestos_ant ? <li>{x.presupuestos} propuestas entregadas{pct !== null ? `, ${pct} % a tiempo` : ""}</li> : null}
              {x.firmas || x.firmas_ant ? <li><b className="text-[#3f6b39]">{x.firmas} {x.firmas === 1 ? "firma" : "firmas"}</b> ({comp(x.firmas, x.firmas_ant)})</li> : null}
              {x.horas ? <li>{String(Math.round(x.horas * 10) / 10).replace(".", ",")} horas en partes de actuaciones</li> : null}
              <li className={x.vencidos ? "font-semibold text-[#a3505a]" : "text-[#3f6b39]"}>{x.vencidos ? `${x.vencidos} de ${x.seguimientos} seguimientos vencidos` : x.seguimientos ? `${x.seguimientos} ${x.seguimientos === 1 ? "seguimiento, al día" : "seguimientos, todos al día"}` : "Sin seguimientos abiertos"}</li>
            </ul>
          </div>
        );
      }) : <p className="text-ink/55">Todavía no hay actividad del equipo este mes.</p>}
    </div>
  );
}

export function Alarmas({ personas, abrir, cerrar }: { personas: Persona[]; abrir: (id: number) => void; cerrar: () => void }) {
  const [a, setA] = useState<{ id: number; nombre: string; estado: string; accion: string; fecha: string; dias: number; personas: number[] }[] | null>(null);
  useEffect(() => { api("alarmas", undefined, "GET").then((j) => setA(j.alarmas)).catch(() => setA([])); }, []);
  const nombre = (id: number) => personas.find((p) => p.id === id)?.nombre ?? "?";
  const grupos = new Map<string, typeof a>();
  for (const x of a ?? []) for (const n of x.personas.length ? x.personas.map(nombre) : ["Sin asignar"]) grupos.set(n, [...(grupos.get(n) ?? []), x]);
  return (
    <Panel titulo="El equipo y sus alarmas" cerrar={cerrar}>
      <p className={etiqueta}>Cómo va cada uno este mes</p>
      <p className="text-[13px] text-ink/55">Cada persona comparada con su propio mes anterior, sin rankings. Se lo enseñaríamos igual a ellos.</p>
      <ComoVa />
      <p className={`${etiqueta} mt-6`}>Seguimientos vencidos</p>
      <p className="text-[14px] text-ink/65">Seguimientos que se han pasado de fecha, por persona. Toca uno para abrir al cliente; desde su ficha puedes escribir a quien lo lleva.</p>
      {a === null ? <p className="mt-4 text-ink/55">Cargando…</p> : !a.length ? <p className="mt-4 rounded-[16px] border border-dashed border-line bg-white p-5 text-center text-[#3f6b39]">Nada vencido. Todo al día.</p> : null}
      {[...grupos].sort((x, y) => (y[1]?.length ?? 0) - (x[1]?.length ?? 0)).map(([n, lista]) => (
        <div key={n} className="mt-5">
          <p className="text-[15px] font-bold text-ink">{n} <span className="font-normal text-[#a3505a]">· {lista?.length} {lista?.length === 1 ? "vencido" : "vencidos"}</span></p>
          <ul className="mt-2 space-y-1.5">
            {(lista ?? []).map((x) => (
              <li key={x.id}>
                <button type="button" onClick={() => abrir(x.id)} className="flex w-full items-center justify-between gap-3 rounded-[12px] border border-line bg-white px-3 py-2 text-left text-[14px] hover:border-ink/40">
                  <span className="min-w-0"><b className="text-ink">{x.nombre}</b><span className="block truncate text-ink/60">{x.accion}</span></span>
                  <span className="shrink-0 font-bold text-[#a3505a]">{x.dias} {x.dias === 1 ? "día" : "días"}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Panel>
  );
}

export function Instalaciones({ personas, abrir, cerrar }: { personas: Persona[]; abrir: (id: number) => void; cerrar: () => void }) {
  type O = { id: number; nombre: string; poblacion: string; jefe_obra_id: number | null; fase: string; avance: number | null; inicio: string | null; prevista: string | null; fin: string | null; importe: number | null; horas: number; ultimo_parte: string | null; abiertas: number };
  const [d, setD] = useState<{ instalaciones: O[]; horasMes: { quien: string; mes: string; horas: number; instalaciones: number }[] } | null>(null);
  useEffect(() => { api("instalaciones", undefined, "GET").then(setD).catch(() => setD({ instalaciones: [], horasMes: [] })); }, []);
  const hoy = hoyMadrid();
  return (
    <Panel titulo="Casos en marcha" cerrar={cerrar} ancho="max-w-[860px]">
      <p className="text-[14px] text-ink/65">Los casos firmados (y los cerrados hace menos de dos meses). Toca uno para abrirlo: ahí se pone el abogado del procedimiento, la fase, el avance y los partes de actuaciones.</p>
      {d === null ? <p className="mt-4 text-ink/55">Cargando…</p> : !d.instalaciones.length ? <p className="mt-4 rounded-[16px] border border-dashed border-line bg-white p-5 text-center text-ink/60">Todavía no hay casos firmados en el CRM.</p> : null}
      <ul className="mt-4 space-y-2">
        {(d?.instalaciones ?? []).map((o) => {
          const tarde = o.prevista && !o.fin && o.prevista < hoy;
          return (
            <li key={o.id}>
              <button type="button" onClick={() => abrir(o.id)} className="w-full rounded-[16px] border border-line bg-white px-4 py-3 text-left hover:border-ink/40">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <b className="text-[16px] text-ink">{o.nombre}{o.poblacion ? <span className="font-normal text-ink/55"> · {o.poblacion}</span> : null}</b>
                  <span className="text-[13px] font-semibold text-teal-deep">{personas.find((p) => p.id === o.jefe_obra_id)?.nombre ?? "Sin abogado del procedimiento"}</span>
                </span>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-cream"><span className="block h-full rounded-full bg-teal" style={{ width: `${Math.min(100, o.avance ?? 0)}%` }} /></span>
                <span className="mt-1.5 block text-[13px] text-ink/60">
                  {o.fin ? `Cerrado el ${fecha(o.fin)}` : `${o.fase || "Sin fase"} · ${o.avance ?? 0}%`}
                  {o.prevista && !o.fin ? <span className={tarde ? "font-bold text-[#a3505a]" : ""}> · fin previsto {fecha(o.prevista)}{tarde ? " (con retraso)" : ""}</span> : null}
                  {` · ${String(Math.round(o.horas * 10) / 10).replace(".", ",")} h`}{o.ultimo_parte ? ` · último parte ${fecha(o.ultimo_parte)}` : " · sin partes"}
                  {o.abiertas ? <span className="font-bold text-[#a3505a]"> · {o.abiertas} pendientes tras el cierre</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {d?.horasMes.length ? (
        <div className="mt-8">
          <p className={etiqueta}>Horas de los partes por persona y mes</p>
          <table className="w-full text-[14px]">
            <thead><tr className="text-left text-ink/50"><th className="py-1 font-semibold">Mes</th><th className="font-semibold">Persona</th><th className="text-right font-semibold">Horas</th><th className="text-right font-semibold">Casos</th></tr></thead>
            <tbody>{d.horasMes.map((h, i) => <tr key={i} className="border-t border-line"><td className="py-1.5">{h.mes.split("-").reverse().join("/")}</td><td>{h.quien}</td><td className="text-right">{String(Math.round(h.horas * 10) / 10).replace(".", ",")}</td><td className="text-right">{h.instalaciones}</td></tr>)}</tbody>
          </table>
        </div>
      ) : null}
    </Panel>
  );
}

export function BuzonIdeas({ esAdmin, cerrar }: { esAdmin: boolean; cerrar: () => void }) {
  const [texto, setTexto] = useState("");
  const [msg, setMsg] = useState("");
  const [ideas, setIdeas] = useState<{ usuario: string; texto: string; creado: string }[]>([]);
  const cargar = () => { if (esAdmin) api("ideas", undefined, "GET").then((j) => setIdeas(j.ideas)).catch(() => null); };
  useEffect(cargar, [esAdmin]);
  return (
    <Panel titulo="Buzón de ideas" cerrar={cerrar} ancho="max-w-[620px]">
      <p className="text-[15px] leading-relaxed text-ink/75">Cualquier cosa: algo que falta, algo que no se entiende, una idea para trabajar mejor. Le llega por correo a dirección.</p>
      <textarea className={`${campo} mt-3 min-h-[140px]`} placeholder="Ej.: me vendría bien poder ver las consultas de la semana que viene en el móvil." value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button type="button" disabled={!texto.trim()} onClick={async () => { try { await api("idea", { texto }); setTexto(""); setMsg("Enviada. Gracias."); cargar(); } catch (e) { setMsg((e as Error).message); } }} className="mt-3 rounded-full bg-yellow px-6 py-3 text-[15px] font-bold text-ink disabled:opacity-40">Enviar la idea</button>
      {msg ? <span className="ml-3 text-[14px] text-[#3f6b39]">{msg}</span> : null}
      {esAdmin && ideas.length ? (
        <div className="mt-6">
          <p className={etiqueta}>Ideas recibidas</p>
          <ul className="space-y-2">{ideas.map((x, i) => <li key={i} className="rounded-[12px] border border-line bg-white px-3 py-2 text-[14px]"><span className="block text-[12px] text-ink/50">{hora(x.creado)} · {x.usuario}</span><span className="whitespace-pre-wrap">{x.texto}</span></li>)}</ul>
        </div>
      ) : null}
    </Panel>
  );
}

/* ── "Tu día": lo primero que ve cada persona según su puesto (cl·v823) ── */
type DiaVisita = { id: number; nombre: string; telefono: string; donde: string; m2: number | null; fecha: string; hora: string; arquitecto_id: number | null };
type TuDiaDatos =
  | { perfil: "instalación"; instalaciones: { id: number; nombre: string; poblacion: string; fase: string; avance: number | null; prevista: string | null; ultimo_parte: string | null }[] }
  | { perfil: "técnico"; visitas: DiaVisita[]; presupuestos: { id: number; nombre: string; fecha: string | null; tarde: boolean }[] }
  | { perfil: "recepcion"; nuevos: { id: number; nombre: string; creado: string }[]; sinArquitecto: DiaVisita[]; visitasHoy: DiaVisita[] }
  | { perfil: "direccion"; vencidas: number; fueraPlazo: number; firmasMes: number; importeMes: number; nuevos: number; visitasSemana: number };

function Bloque({ titulo, vacio, children, alerta = false }: { titulo: string; vacio: string; children: React.ReactNode[]; alerta?: boolean }) {
  return (
    <div className={`rounded-[18px] border-2 bg-white p-4 ${alerta && children.length ? "border-[#a3505a]" : "border-line"}`}>
      <p className={`text-[13px] font-bold uppercase tracking-[0.08em] ${alerta && children.length ? "text-[#a3505a]" : "text-ink/55"}`}>{titulo}</p>
      {children.length ? <ul className="mt-2 space-y-1.5">{children}</ul> : <p className="mt-2 text-[14px] text-[#3f6b39]">{vacio}</p>}
    </div>
  );
}
const linea = (k: number, texto: React.ReactNode, sub: string, abrir: () => void, rojo = false) => (
  <li key={k}><button type="button" onClick={abrir} className="flex w-full items-baseline justify-between gap-3 rounded-[10px] px-2 py-1.5 text-left hover:bg-cream"><span className="font-semibold text-ink">{texto}</span><span className={`shrink-0 text-[13px] ${rojo ? "font-bold text-[#a3505a]" : "text-ink/55"}`}>{sub}</span></button></li>
);
const diaCorto = (d: string) => (d === hoyMadrid() ? "hoy" : new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", { weekday: "short", day: "numeric" }));

export function TuDia({ nombre, abrir, ir, recarga }: { nombre: string; abrir: (id: number, ancla?: string) => void; ir: (d: string, e?: string) => void; recarga: number }) {
  const [d, setD] = useState<TuDiaDatos | null>(null);
  useEffect(() => { api("tudia", undefined, "GET").then(setD).catch(() => setD(null)); }, [recarga]);
  if (!d) return null;
  return (
    <section className="mb-5">
      <h2 className="font-serif text-[26px] italic leading-tight text-ink">Hola, {nombre}. Esto es tu día.</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {d.perfil === "instalación" ? (
          <Bloque titulo="Tus casos: toca uno y apunta el parte de hoy" vacio="No tienes casos en marcha.">
            {d.instalaciones.map((o) => linea(o.id, `${o.nombre}${o.poblacion ? ` · ${o.poblacion}` : ""}`, `${o.fase || "sin fase"} · ${o.avance ?? 0}%${o.ultimo_parte === hoyMadrid() ? " · parte hecho" : " · falta el parte"}`, () => abrir(o.id, "f-parte"), o.ultimo_parte !== hoyMadrid()))}
          </Bloque>
        ) : null}
        {d.perfil === "técnico" ? (
          <>
            <Bloque titulo="Tus próximas consultas" vacio="No tienes consultas esta semana.">
              {d.visitas.map((v) => linea(v.id, v.nombre, `${diaCorto(v.fecha)} ${v.hora}`, () => abrir(v.id)))}
            </Bloque>
            <Bloque titulo="Propuestas de honorarios que tienes que entregar (48 h)" vacio="Ninguno pendiente. Bien." alerta>
              {d.presupuestos.map((p) => linea(p.id, p.nombre, p.tarde ? "fuera de plazo" : p.fecha ? `antes del ${diaCorto(p.fecha)}` : "", () => abrir(p.id, "f-informe"), p.tarde))}
            </Bloque>
          </>
        ) : null}
        {d.perfil === "recepcion" ? (
          <>
            <Bloque titulo="Nuevos: llámales (lo ideal, en menos de 30 minutos)" vacio="No hay nadie nuevo sin llamar." alerta>
              {d.nuevos.map((n) => {
                const min = Math.round((Date.now() - new Date(n.creado).getTime()) / 60000);
                const txt = min < 60 ? `hace ${min} min` : min < 1440 ? `hace ${Math.round(min / 60)} h` : hora(n.creado);
                return linea(n.id, n.nombre, txt, () => abrir(n.id), min > 30);
              })}
            </Bloque>
            <Bloque titulo="Consultas de hoy y mañana sin abogado" vacio="Todas las consultas tienen abogado." alerta>
              {d.sinArquitecto.map((v) => linea(v.id, v.nombre, `${diaCorto(v.fecha)} ${v.hora}`, () => abrir(v.id), true))}
            </Bloque>
          </>
        ) : null}
        {d.perfil === "direccion" ? (
          <div className="grid grid-cols-2 gap-3 md:col-span-2 lg:grid-cols-5">
            {([
              ["Seguimientos vencidos", d.vencidas, "alarmas", d.vencidas > 0],
              ["Propuestas fuera de plazo", d.fueraPlazo, "estado:visita-hecha", d.fueraPlazo > 0],
              ["Nuevos sin llamar", d.nuevos, "estado:nuevo", d.nuevos > 0],
              ["Consultas esta semana", d.visitasSemana, "agenda", false],
              [`Firmas este mes (${eur(d.importeMes)})`, d.firmasMes, "estado:firmado", false],
            ] as [string, number, string, boolean][]).map(([t, n, dest, rojo]) => (
              <button key={t} type="button" onClick={() => (dest.startsWith("estado:") ? ir("estado", dest.slice(7)) : ir(dest))} className={`rounded-[18px] border-2 bg-white p-4 text-left ${rojo ? "border-[#a3505a]" : "border-line hover:border-ink/40"}`}>
                <span className={`block text-[12.5px] font-bold uppercase tracking-[0.06em] ${rojo ? "text-[#a3505a]" : "text-ink/55"}`}>{t}</span>
                <span className={`font-serif text-[32px] leading-none ${rojo ? "text-[#a3505a]" : "text-ink"}`}>{n}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ── "Escríbeme el mensaje" (cl·v830): Claude prepara el WhatsApp o el correo; la persona lo revisa y lo envía ── */
export function Redactor({ id, telefono, email, hecho }: { id: number; telefono: string | null; email: string | null; hecho: () => void }) {
  const [canal, setCanal] = useState<"whatsapp" | "correo">(telefono ? "whatsapp" : "correo");
  const [texto, setTexto] = useState("");
  const [asunto, setAsunto] = useState("");
  const [otra, setOtra] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [msg, setMsg] = useState("");
  const pedir = async (c: "whatsapp" | "correo", n: number) => {
    setCargando(true); setMsg(""); setCanal(c);
    try { const j = await api("redactar", { id, canal: c, otra: n }); setTexto(j.texto); setAsunto(j.asunto ?? ""); setOtra(n); }
    catch (e) { setMsg((e as Error).message); }
    setCargando(false);
  };
  const enviar = async () => {
    if (canal === "whatsapp" && telefono) {
      const d = telefono.replace(/\D/g, "");
      window.open(`https://wa.me/${d.length === 9 ? `34${d}` : d}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    } else if (email) {
      location.href = `mailto:${email}?subject=${encodeURIComponent(asunto || "Tu caso")}&body=${encodeURIComponent(texto)}`;
    }
    try { await api("enviado", { id, canal, texto }); setMsg("Apuntado en la ficha. Ya tienes el siguiente paso."); setTexto(""); hecho(); }
    catch (e) { setMsg((e as Error).message); }
  };
  if (!telefono && !email) return <p className="mt-3 text-[13px] text-ink/55">Para que te escriba el mensaje, apunta antes su teléfono o su correo.</p>;
  return (
    <div className="mt-3 rounded-[16px] border border-[#cfe3ea] bg-[#f3f9fb] p-3">
      {!texto ? (
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={cargando} onClick={() => pedir(telefono ? "whatsapp" : "correo", 0)} className="rounded-full bg-ink px-4 py-2.5 text-[14.5px] font-bold text-white disabled:opacity-50">{cargando ? "Escribiendo…" : "Escríbeme el mensaje"}</button>
          {telefono && email ? <button type="button" disabled={cargando} onClick={() => pedir("correo", 0)} className="text-[13.5px] font-semibold text-teal-deep underline underline-offset-4">mejor por correo</button> : null}
          <span className="text-[12.5px] text-ink/55">Te lo prepara con lo que hay en la ficha. Tú lo lees, lo cambias si quieres y lo envías.</span>
        </div>
      ) : (
        <>
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink/50">{canal === "whatsapp" ? "WhatsApp" : "Correo"} preparado: cámbialo si quieres</p>
          {canal === "correo" ? <input className={`${campo} mt-2`} value={asunto} onChange={(e) => setAsunto(e.target.value)} placeholder="Asunto" /> : null}
          <textarea className={`${campo} mt-2 min-h-[130px]`} value={texto} onChange={(e) => setTexto(e.target.value)} />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button type="button" onClick={enviar} className={`rounded-full px-5 py-2.5 text-[14.5px] font-bold ${canal === "whatsapp" ? "bg-[#25D366] text-ink" : "bg-yellow text-ink"}`}>{canal === "whatsapp" ? "Enviar por WhatsApp" : "Enviar por correo"}</button>
            <button type="button" disabled={cargando} onClick={() => pedir(canal, otra + 1)} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold text-ink disabled:opacity-50">{cargando ? "Escribiendo…" : "Otra versión"}</button>
            <button type="button" onClick={() => setTexto("")} className="text-[13px] text-ink/55 underline underline-offset-4">Descartar</button>
          </div>
        </>
      )}
      {msg ? <p className="mt-2 text-[13.5px] text-ink/70">{msg}</p> : null}
    </div>
  );
}
