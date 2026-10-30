/* eslint-disable react/no-unescaped-entities */
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
const CRM_RUTA = "/";
import { api, campo, etiqueta, eur, fecha, hora, hoyMadrid, Panel } from "./comun";
import { Guias, perfilDe, Bienvenida } from "./guias";
import { Inicio, TuDia, Redactor, BuzonIdeas, InformeVisita, SeccionObra, EscribirMensaje, Agenda, Bandeja, Alarmas, Instalaciones, type Parte, type Incidencia, type Informe } from "./extras";

/* CRM de Fuero Abogados, despacho ficticio (26-oct, cl·v813). Pensado para Marina: dar de alta una llamada en
   un minuto, mover el estado con un toque y que todo quede apuntado (quién y cuándo). */

type Rol = "admin" | "equipo" | "asignado";
type Usuario = { id: number; email?: string; nombre: string; rol: Rol; puesto?: string | null; activo?: boolean; aprobado?: boolean; conClave?: boolean };
type Lead = {
  id: number; ref: string | null; creado: string; nombre: string | null; apellidos: string | null; telefono: string | null; email: string | null;
  cp: string | null; direccion: string | null; poblacion: string | null; m2: number | null; tipo: string; origen: string | null; canal: string | null;
  estado: string; motivo: string | null; asignado_a: number | null; visita_fecha: string | null; presupuesto_fecha: string | null;
  presupuesto_importe: number | null; firmado_fecha: string | null; firmado_importe: number | null; facturado_importe: number | null;
  notas: string | null; contacto_id: number | null; historico_id: number | null; actualizado: string;
  arquitecto_id: number | null; tipo_vivienda: string | null; temperatura: string | null; inicio_deseado: string | null; presupuesto_cliente: number | null;
  recomendado_por: string | null; resena_pedida: boolean; obra_inicio: string | null; obra_fin: string | null; consentimiento: string | null;
  proxima_accion: string | null; proxima_fecha: string | null; primer_contacto: string | null; paso_seguimiento: number; anonimizado: boolean;
  visita_hora: string | null; probabilidad: number | null; jefe_obra_id: number | null; fase_obra: string | null; avance: number | null; obra_fin_prevista: string | null; decision_fecha: string | null; informe: Informe | null;
  preferencia_contacto: string | null; contacto2_nombre: string | null; contacto2_telefono: string | null; vive_durante_obra: string | null; licencia: string | null; que_reforma: string | null; entrega: Record<string, boolean> | null;
};
type Duplicado = { id: number; nombre: string; estado: string; creado: string };
const TEMPERATURAS = ["Caliente: quiere empezar ya", "Templado: lo está pensando", "Frío: solo mira precios"];
const INICIOS = ["Ya, cuanto antes", "En 1 a 3 meses", "En 3 a 6 meses", "Más de 6 meses", "No lo sabe"];
const PREFERENCIAS = ["WhatsApp", "Llamada por la mañana", "Llamada por la tarde", "Correo", "Le da igual"];
const QUE_REFORMA = ["Me han despedido", "Acoso en el trabajo", "Incapacidad permanente", "Embarazo, maternidad o conciliación", "Soy empresa: busco asesoría"];
const LICENCIAS = ["Papeleta de conciliación: por presentar", "Papeleta de conciliación: presentada", "Conciliación: sin avenencia", "Conciliación: con acuerdo", "Demanda: presentada", "Juicio: señalado"];
const ENTREGA = ["Sentencia o acuerdo explicado al cliente", "Cobro de la indemnización comprobado", "Plazo de recurso vigilado", "Documentos originales devueltos", "Factura final enviada", "Encuesta de satisfacción enviada", "Expediente cerrado y archivado"];
const VIVIENDAS = ["Contrato indefinido", "Contrato temporal", "Fijo discontinuo", "Empleada del hogar", "Funcionario o interino", "Autónomo dependiente", "Empresa"];
/** Tiempo de respuesta en palabras: de la entrada al primer contacto. */
function respuesta(l: Partial<Lead>) {
  if (!l.primer_contacto || !l.creado) return "";
  const m = Math.max(0, (new Date(l.primer_contacto).getTime() - new Date(l.creado).getTime()) / 60000);
  return m < 60 ? `${Math.round(m)} min` : m < 48 * 60 ? `${Math.round(m / 60)} h` : `${Math.round(m / 1440)} días`;
}
function Proxima({ l }: { l: Lead }) {
  if (!l.proxima_accion) return null;
  const hoy = hoyMadrid();
  const f = l.proxima_fecha ?? "";
  const vencida = f && f < hoy, deHoy = f === hoy;
  return (
    <span className={`order-5 col-span-2 block truncate text-[13px] sm:col-span-4 ${vencida ? "font-bold text-[#a3505a]" : deHoy ? "font-bold text-[#7c5e27]" : "text-ink/55"}`}>
      {vencida ? "Vencida: " : deHoy ? "Hoy: " : `${fecha(f)}: `}{l.proxima_accion}
    </span>
  );
}
type Nota = { usuario: string; texto: string; creado: string };
export type Listas = { estados: [string, string][]; origenes: string[]; canales: string[]; motivos: string[]; fases: string[] };

const COLOR_ESTADO: Record<string, [string, string]> = {
  nuevo: ["#e7f2f5", "#236278"],
  contactado: ["#e8edf3", "#4b6c8f"],
  "visita-programada": ["#f7efe0", "#7c5e27"],
  "visita-hecha": ["#f8e9e2", "#a3502f"],
  presupuesto: ["#f8e8ea", "#a3505a"],
  firmado: ["#ebf1e8", "#3f6b39"],
  aplazado: ["#eef0f6", "#5b5f8a"],
  perdido: ["#f1efec", "#6b6b6b"],
  descartado: ["#f1efec", "#8a8a8a"],
};
const nombreDe = (l: Lead) => [l.nombre, l.apellidos].filter(Boolean).join(" ") || l.email || l.telefono || "Sin nombre";
const telLimpio = (t: string) => t.replace(/[^\d+]/g, "");
const waDe = (t: string) => { const d = t.replace(/\D/g, ""); return `https://wa.me/${d.length === 9 ? `34${d}` : d}`; };


function Chip({ estado, listas }: { estado: string; listas: Listas }) {
  const [bg, fg] = COLOR_ESTADO[estado] ?? ["#eee", "#333"];
  return <span className="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-bold" style={{ background: bg, color: fg }}>{listas.estados.find(([k]) => k === estado)?.[1] ?? estado}</span>;
}

const PUESTOS = ["Abogado", "Abogada", "Paralegal", "Abogado de procedimientos", "Recepción", "Dirección", "Administración", "Socio director", "Otro"];

export default function CrmApp({ usuario, listas }: { usuario: Usuario; listas: Listas }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [porEstado, setPorEstado] = useState<Record<string, number>>({});
  const [filtro, setFiltro] = useState({ q: "", estado: "", origen: "", desde: "", hasta: "", asignado: "", mias: "", archivo: "" });
  const [archivados, setArchivados] = useState(0);
  const [verFiltros, setVerFiltros] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [abierto, setAbiertoBase] = useState<number | "nuevo" | null>(null);
  const [ancla, setAncla] = useState("");
  const setAbierto = (n: number | "nuevo" | null, a = "") => { setAncla(a); setAbiertoBase(n); };
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modal, setModal] = useState<"" | "equipo" | "importar" | "agenda" | "mensajes" | "alarmas" | "instalaciones" | "guia" | "ideas">("");
  const [vista, setVista] = useState<"inicio" | "lista">("lista");
  const [menu, setMenu] = useState(false);
  const [sinLeer, setSinLeer] = useState(0);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const p = new URLSearchParams(Object.entries(filtro).filter(([, v]) => v) as [string, string][]);
      const j = await api(`leads?${p}`, undefined, "GET");
      setLeads(j.leads); setTotal(j.total); setPorEstado(j.porEstado); setPendientes(j.pendientes ?? 0); setSinLeer(j.sinLeer ?? 0); if (!filtro.archivo && !filtro.q) setArchivados(j.archivados ?? 0); setError("");
    } catch (e) { setError(String((e as Error).message)); }
    setCargando(false);
  }, [filtro]);
  useEffect(() => { const t = setTimeout(cargar, filtro.q ? 300 : 0); return () => clearTimeout(t); }, [cargar, filtro.q]);
  useEffect(() => { api("usuarios", undefined, "GET").then((j) => setUsuarios(j.usuarios)).catch(() => null); }, [modal]);
  // Enlaces de los correos (?lead=123) abren la ficha directamente
  useEffect(() => { const n = Number(new URLSearchParams(location.search).get("lead")); if (n) setAbierto(n); }, []);
  const exportar = () => { if ((window as unknown as { __crmDemo?: boolean }).__crmDemo) return; const p = new URLSearchParams(Object.entries(filtro).filter(([, v]) => v) as [string, string][]); location.href = `/api/crm/exportar?${p}`; };

  const totalTodos = Object.values(porEstado).reduce((a, b) => a + b, 0);
  const vacio = { q: "", estado: "", origen: "", desde: "", hasta: "", asignado: "", mias: "", archivo: "" };
  const ir = (destino: string, estado?: string) => {
    if (destino === "hoy") { setFiltro({ ...vacio, mias: "1" }); setVista("lista"); }
    else if (destino === "nuevo") setAbierto("nuevo");
    else if (destino === "todos") { setFiltro(vacio); setVista("lista"); }
    else if (destino === "estado") { setFiltro({ ...vacio, estado: estado ?? "" }); setVista("lista"); }
    else if (destino === "exportar") exportar();
    else if (destino === "mesa") window.location.assign("/panel");
    else setModal(destino as typeof modal);
    setMenu(false);
    window.scrollTo({ top: 0 });
  };
  const nombreUsuario = (id: number | null) => usuarios.find((x) => x.id === id)?.nombre ?? "";

  return (
    <div className="min-h-screen bg-cream pb-24">
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-deep">Fuero Abogados</p>
            <button type="button" onClick={() => { setVista("lista"); setFiltro(vacio); setMenu(false); }} className="inline-flex min-h-[44px] items-center font-serif text-[24px] italic leading-none text-ink">CRM</button>
          </div>
          <div className="flex items-center justify-end gap-3 lg:order-3">
            <span className="hidden text-[13px] text-ink/50 sm:inline">{usuario.nombre}</span>
            <button type="button" onClick={async () => { await api("salir"); location.href = CRM_RUTA; }} className="inline-flex min-h-[44px] items-center text-[13px] font-semibold text-teal-deep underline underline-offset-4">Salir</button>
          </div>
          {/* En el centro, grande: lo que más se usa (cl·v834) */}
          <div className="col-span-2 flex flex-wrap items-center justify-center gap-2.5 lg:order-2 lg:col-span-1">
            <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-[15px] font-bold sm:px-6 sm:py-3 sm:text-[17px] ${menu ? "border-ink bg-ink text-white" : "border-ink bg-white text-ink hover:bg-cream"}`}>
              <span aria-hidden="true" className="text-[18px] leading-none">☰</span> Menú<span className="hidden sm:inline">: qué puedo hacer</span> <span aria-hidden="true">{menu ? "▴" : "▾"}</span>
              {sinLeer ? <span className="rounded-full bg-[#a3505a] px-2 py-0.5 text-[12.5px] text-white">{sinLeer} {sinLeer === 1 ? "mensaje" : "mensajes"}</span> : null}
            </button>
            <button type="button" onClick={() => setModal("guia")} className="flex items-center gap-2 rounded-full border-2 border-teal bg-[#e7f2f5] px-4 py-2.5 text-[15px] font-bold text-teal-deep hover:bg-[#d8ebf0] sm:px-6 sm:py-3 sm:text-[17px]">
              <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[14px] text-white">?</span> Guía<span className="hidden sm:inline"> de uso</span>
            </button>
            <button type="button" onClick={() => setAbierto("nuevo")} className="rounded-full bg-yellow px-4 py-2.5 text-[15px] font-bold text-ink shadow-[0_10px_24px_-12px_rgba(17,52,61,0.5)] sm:px-6 sm:py-3 sm:text-[17px]">+ <span className="sm:hidden">Nuevo</span><span className="hidden sm:inline">Apuntar cliente nuevo</span></button>
          </div>
        </div>
        {menu ? (
        <div className="max-h-[70vh] overflow-y-auto border-t border-line bg-cream shadow-[0_24px_40px_-30px_rgba(17,52,61,0.6)]">
          <div className="mx-auto max-w-[1240px] px-4 py-4 sm:px-6">
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink/50">¿Qué quieres hacer? Toca una opción</p>
            <Inicio compacto nombre={usuario.nombre} esAdmin={usuario.rol === "admin"} pendientes={pendientes} sinLeer={sinLeer} porEstado={porEstado} estados={listas.estados} ir={ir} />
          </div>
        </div>
      ) : null}
      </header>
      {vista === "inicio" ? (
        <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
          <Inicio nombre={usuario.nombre} esAdmin={usuario.rol === "admin"} pendientes={pendientes} sinLeer={sinLeer} porEstado={porEstado} estados={listas.estados} ir={ir} />
        </div>
      ) : (
      <div className="mx-auto max-w-[1240px] px-4 pt-5 sm:px-6">
        {!filtro.q && !filtro.estado && !filtro.mias ? <TuDia nombre={usuario.nombre} abrir={(n, a) => setAbierto(n, a ?? "")} ir={ir} recarga={total} /> : null}
        <p className="mb-3 text-[14px] text-ink/60">Estos son tus clientes. <b className="text-ink">Toca uno para abrir su ficha.</b> Los recuadros de colores filtran por el paso en que está cada uno. Todo lo demás está en <b className="text-ink">Menú</b>, arriba.</p>
        {/* Lo mío de hoy: las acciones de seguimiento que tocan hoy o ya han vencido */}
        <button type="button" onClick={() => setFiltro({ ...filtro, mias: filtro.mias ? "" : "1", estado: "" })} className={`mb-3 flex w-full items-center justify-between gap-3 rounded-[18px] border-2 px-4 py-3 text-left ${filtro.mias ? "border-[#a3505a] bg-[#a3505a] text-white" : pendientes ? "border-[#a3505a] bg-[#f8e8ea] text-[#a3505a]" : "border-line bg-white text-ink/60"}`}>
          <span>
            <span className="block text-[12px] font-bold uppercase tracking-[0.1em] opacity-80">Lo mío de hoy</span>
            <span className="text-[15px] font-semibold">{pendientes ? `${pendientes} ${pendientes === 1 ? "acción que toca hoy o ya ha vencido" : "acciones que tocan hoy o ya han vencido"}` : "Nada pendiente para hoy"}</span>
          </span>
          <span className="font-serif text-[30px] leading-none">{filtro.mias ? "Ver todo" : pendientes}</span>
        </button>

        {/* Embudo: toca para filtrar */}
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-2">
          <button type="button" onClick={() => setFiltro({ ...filtro, estado: "" })} className={`shrink-0 rounded-[16px] border px-4 py-2.5 text-left ${filtro.estado === "" ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>
            <span className="block text-[12px] font-bold uppercase tracking-[0.08em] opacity-70">Todos</span>
            <span className="font-serif text-[24px] leading-none">{totalTodos}</span>
          </button>
          {listas.estados.map(([k, t]) => {
            const [bg, fg] = COLOR_ESTADO[k] ?? ["#fff", "#333"];
            const activo = filtro.estado === k;
            return (
              <button key={k} type="button" onClick={() => setFiltro({ ...filtro, estado: activo ? "" : k })} className="shrink-0 rounded-[16px] border px-4 py-2.5 text-left" style={{ background: activo ? fg : bg, borderColor: activo ? fg : "transparent", color: activo ? "#fff" : fg }}>
                <span className="block whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.08em] opacity-80">{t}</span>
                <span className="font-serif text-[24px] leading-none">{porEstado[k] ?? 0}</span>
              </button>
            );
          })}
          {archivados || filtro.archivo ? (
            <button type="button" onClick={() => setFiltro({ ...filtro, archivo: filtro.archivo ? "" : "1" })} title="Fichas del CRM antiguo de hace más de 4 meses" className={`shrink-0 rounded-[16px] border border-dashed px-4 py-2.5 text-left ${filtro.archivo ? "border-ink bg-ink text-white" : "border-ink/30 bg-white text-ink/60"}`}>
              <span className="block whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.08em] opacity-80">{filtro.archivo ? "Quitar el archivo" : "Ver el archivo"}</span>
              <span className="font-serif text-[24px] leading-none">{filtro.archivo ? "×" : archivados}</span>
            </button>
          ) : null}
        </div>
        <p className="mt-1 text-[12.5px] text-ink/50">{filtro.archivo ? "Estás viendo también el archivo: las fichas del CRM antiguo de hace más de 4 meses." : archivados ? `Las ${archivados} fichas antiguas (CRM anterior, de hace más de 4 meses) están en el archivo: no molestan en el día a día, cuentan en las estadísticas y salen al buscar.` : ""}</p>

        {/* Filtros (en el móvil, plegados) */}
        <button type="button" onClick={() => setVerFiltros(!verFiltros)} className="mt-3 w-full rounded-[12px] border border-line bg-white px-3 py-2.5 text-left text-[15px] font-semibold text-ink sm:hidden">{verFiltros ? "Ocultar búsqueda y filtros" : "Buscar o filtrar"} <span aria-hidden="true">{verFiltros ? "▴" : "▾"}</span></button>
        <div className={`mt-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] ${verFiltros ? "grid" : "hidden"}`}>
          <input className={campo} placeholder="Buscar: nombre, teléfono, correo, referencia, CP…" value={filtro.q} onChange={(e) => setFiltro({ ...filtro, q: e.target.value })} />
          <select className={campo} value={filtro.origen} onChange={(e) => setFiltro({ ...filtro, origen: e.target.value })}>
            <option value="">Todos los orígenes</option>
            {listas.origenes.map((o) => <option key={o}>{o}</option>)}
          </select>
          <input className={campo} type="date" value={filtro.desde} onChange={(e) => setFiltro({ ...filtro, desde: e.target.value })} aria-label="Desde" />
          <input className={campo} type="date" value={filtro.hasta} onChange={(e) => setFiltro({ ...filtro, hasta: e.target.value })} aria-label="Hasta" />
          {usuario.rol !== "asignado" ? (
            <select className={campo} value={filtro.asignado} onChange={(e) => setFiltro({ ...filtro, asignado: e.target.value })}>
              <option value="">Cualquier persona</option>
              <option value="sin">Sin asignar</option>
              {usuarios.map((x) => <option key={x.id} value={x.id}>{x.nombre}</option>)}
            </select>
          ) : <span />}
        </div>

        <p className="mt-4 text-[13px] text-ink/55">{cargando ? "Cargando…" : `${total} ${total === 1 ? "lead" : "leads"}${total > leads.length ? ` · se ven los ${leads.length} más recientes, usa los filtros` : ""}`}</p>
        {error ? <p className="mt-2 rounded-[12px] bg-[#f8e8ea] px-4 py-3 text-[14px] text-[#a3505a]">{error}</p> : null}

        {/* Lista */}
        <ul className="mt-3 space-y-2">
          {leads.map((l) => (
            <li key={l.id}>
              <button type="button" onClick={() => setAbierto(l.id)} className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-[18px] border border-line bg-white px-4 py-3 text-left transition-colors hover:border-ink/30 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
                <span className="min-w-0">
                  <span className="block truncate text-[16px] font-semibold text-ink">{nombreDe(l)}</span>
                  <span className="block truncate text-[13px] text-ink/55">{[l.telefono, l.poblacion || l.cp, l.m2 ? `${l.m2} años en la empresa` : null].filter(Boolean).join(" · ") || "Sin datos de contacto"}</span>
                </span>
                <span className="order-3 col-span-2 flex flex-wrap items-center gap-2 text-[13px] text-ink/60 sm:order-none sm:col-span-1">
                  <span className="rounded-full bg-cream px-2 py-0.5 font-semibold text-ink/70">{l.origen ?? "Sin origen"}</span>
                  {nombreUsuario(l.asignado_a) ? <span>· {nombreUsuario(l.asignado_a)}</span> : null}
                  {l.arquitecto_id && l.arquitecto_id !== l.asignado_a && nombreUsuario(l.arquitecto_id) ? <span>· {nombreUsuario(l.arquitecto_id)}</span> : null}
                  {l.jefe_obra_id && nombreUsuario(l.jefe_obra_id) ? <span>· procedimiento: {nombreUsuario(l.jefe_obra_id)}</span> : null}
                  {l.temperatura ? <span title={l.temperatura}>· {l.temperatura.split(":")[0]}</span> : null}
                </span>
                <span className="order-4 col-span-2 text-[13px] text-ink/55 sm:order-none sm:col-span-1">
                  {fecha(l.creado)}
                  {l.firmado_importe ? <b className="ml-2 text-[#3f6b39]">{eur(l.firmado_importe)}</b> : l.presupuesto_importe ? <span className="ml-2">{eur(l.presupuesto_importe)}</span> : null}
                </span>
                <Chip estado={l.estado} listas={listas} />
                <Proxima l={l} />
              </button>
            </li>
          ))}
        </ul>
        {!cargando && !leads.length ? <p className="mt-6 rounded-[18px] border border-dashed border-line bg-white p-6 text-center text-[15px] text-ink/60">No hay clientes con estos filtros.</p> : null}
      </div>
      )}

      {abierto !== null ? <Ficha id={abierto} ancla={ancla} usuario={usuario} usuarios={usuarios} listas={listas} cerrar={(cambio) => { setAbierto(null); if (cambio) cargar(); }} /> : null}
      {modal === "equipo" ? <Equipo cerrar={() => setModal("")} /> : null}
      <Bienvenida perfil={perfilDe(usuario.rol, usuario.puesto)} nombre={usuario.nombre} clave={`crm-bienvenida-v1-${usuario.id}`} verGuia={() => setModal("guia")} />
      {modal === "guia" ? <Guias perfil={perfilDe(usuario.rol, usuario.puesto)} cerrar={() => setModal("")} /> : null}
      {modal === "ideas" ? <BuzonIdeas esAdmin={usuario.rol === "admin"} cerrar={() => setModal("")} /> : null}
      {modal === "agenda" ? <Agenda personas={usuarios} abrir={(n) => { setModal(""); setAbierto(n); }} cerrar={() => setModal("")} /> : null}
      {modal === "mensajes" ? <Bandeja abrir={(n) => { setModal(""); setAbierto(n); }} cerrar={() => { setModal(""); cargar(); }} /> : null}
      {modal === "alarmas" ? <Alarmas personas={usuarios} abrir={(n) => { setModal(""); setAbierto(n); }} cerrar={() => setModal("")} /> : null}
      {modal === "instalaciones" ? <Instalaciones personas={usuarios} abrir={(n) => { setModal(""); setAbierto(n); }} cerrar={() => setModal("")} /> : null}
      {modal === "importar" ? <Importar cerrar={(hecho) => { setModal(""); if (hecho) cargar(); }} /> : null}
    </div>
  );
}


/** Arriba de la ficha: de un vistazo, quién es, en qué punto está y un índice para no perderse (cl·v831). */
function CabeceraFicha({ l, listas, usuarios }: { l: Lead; listas: Listas; usuarios: Usuario[] }) {
  const camino = listas.estados.filter(([k]) => !["perdido", "descartado", "aplazado"].includes(k));
  const i = camino.findIndex(([k]) => k === l.estado);
  const dias = Math.max(0, Math.round((Date.now() - new Date(l.creado).getTime()) / 86400000));
  const nombre = (n: number | null) => usuarios.find((x) => x.id === n)?.nombre;
  const quien = [nombre(l.asignado_a), nombre(l.arquitecto_id) ? `abog. ${nombre(l.arquitecto_id)}` : "", nombre(l.jefe_obra_id) ? `procedimiento: ${nombre(l.jefe_obra_id)}` : ""].filter(Boolean).join(" · ");
  const indice: [string, string][] = [["f-punto", "Punto"], ...(l.informe || ["visita-hecha", "presupuesto", "firmado"].includes(l.estado) ? [["f-informe", "Informe"] as [string, string]] : []), ...(l.estado === "firmado" ? [["f-instalacion", "Procedimiento"] as [string, string]] : []), ["f-persona", "Persona"], ["f-casa", "Asunto"], ["f-historial", "Historial"]];
  return (
    <div className="mb-4">
      <p className="text-[14px] text-ink/70">
        <Chip estado={l.estado} listas={listas} /> <span className="ml-1">{l.origen ?? "Sin origen"}</span>
        {quien ? <span> · {quien}</span> : <span className="text-[#a3505a]"> · sin nadie asignado</span>}
        <span> · con nosotros desde hace {dias === 0 ? "hoy" : `${dias} ${dias === 1 ? "día" : "días"}`}</span>
      </p>
      {i >= 0 ? (
        <ol className="mt-3 flex items-center gap-1">
          {camino.map(([k, t], n) => (
            <li key={k} className="flex flex-1 flex-col items-center gap-1" title={t}>
              <span className={`h-2 w-full rounded-full ${n <= i ? "bg-teal" : "bg-line"}`} />
              <span className={`hidden text-center text-[10.5px] leading-tight sm:block ${n === i ? "font-bold text-ink" : "text-ink/45"}`}>{t}</span>
            </li>
          ))}
        </ol>
      ) : <p className="mt-2 text-[13px] text-ink/60">{l.estado === "aplazado" ? "Aplazado: quiere seguir más adelante." : "Fuera del camino: " + (listas.estados.find(([k]) => k === l.estado)?.[1] ?? l.estado)}</p>}
      {i >= 0 ? <p className="mt-1 text-[12.5px] text-ink/55 sm:hidden">Paso {i + 1} de {camino.length}: {camino[i][1]}</p> : null}
      <nav className="mt-3 flex flex-wrap gap-1.5 text-[13px]">
        <span className="py-1 text-ink/45">Ir a:</span>
        {indice.map(([a, t]) => <a key={a} href={`#${a}`} onClick={(e) => { e.preventDefault(); document.getElementById(a)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="rounded-full border border-line bg-white px-2.5 py-1 font-semibold text-teal-deep">{t}</a>)}
      </nav>
    </div>
  );
}

/** En el alta, todo lo que no es esencial va plegado. */
function Plegable({ abierto, children }: { abierto: boolean; children: React.ReactNode }) {
  if (abierto) return <>{children}</>;
  return (
    <details className="mt-4 rounded-[20px] border border-line bg-white/60 p-4">
      <summary className="cursor-pointer text-[15px] font-bold text-teal-deep">Más datos (opcional): correo, asunto, consulta, en qué punto está…</summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function Ficha({ id, ancla = "", usuario, usuarios, listas, cerrar }: { id: number | "nuevo"; ancla?: string; usuario: Usuario; usuarios: Usuario[]; listas: Listas; cerrar: (cambio: boolean) => void }) {
  const nuevo = id === "nuevo";
  const [l, setL] = useState<Partial<Lead>>(nuevo ? { estado: "nuevo", canal: "Llamada", tipo: "Despido" } : {});
  const [orig, setOrig] = useState<Partial<Lead>>({});
  const [notas, setNotas] = useState<Nota[]>([]);
  const [dups, setDups] = useState<Duplicado[]>([]);
  const [partes, setPartes] = useState<Parte[]>([]);
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [msg, setMsg] = useState("");
  const [cambio, setCambio] = useState(false);

  useEffect(() => {
    if (nuevo) return;
    api(`lead?id=${id}`, undefined, "GET").then((j) => { setL(j.lead); setOrig(j.lead); setNotas(j.notas); setDups(j.duplicados ?? []); setPartes(j.partes ?? []); setIncidencias(j.incidencias ?? []);
      if (ancla) setTimeout(() => document.getElementById(ancla)?.scrollIntoView({ behavior: "smooth", block: "start" }), 250); }).catch((e) => setMsg(String(e.message)));
  }, [id, nuevo]);

  const recargar = async () => { const d = await api(`lead?id=${id}`, undefined, "GET"); setL(d.lead); setOrig(d.lead); setNotas(d.notas); setDups(d.duplicados ?? []); setPartes(d.partes ?? []); setIncidencias(d.incidencias ?? []); };
  const marcarHecho = async () => {
    setGuardando(true);
    try { await api("hecho", { id, texto: comentario }); setComentario(""); await recargar(); setCambio(true); setMsg("Apuntado. Ya tienes el siguiente paso."); }
    catch (e) { setMsg(String((e as Error).message)); }
    setGuardando(false);
  };
  const pon = (k: keyof Lead, v: string | number | boolean | null | Informe) => setL((x) => ({ ...x, [k]: v }));
  const sucio = useMemo(() => JSON.stringify(l) !== JSON.stringify(orig), [l, orig]);

  const guardar = async () => {
    setGuardando(true); setMsg("");
    try {
      const cambios: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(l)) if (nuevo || JSON.stringify(v) !== JSON.stringify((orig as Record<string, unknown>)[k])) cambios[k] = v;
      const j = await api("guardar", { id: nuevo ? null : id, cambios });
      if (nuevo && nota.trim()) await api("nota", { id: j.id, texto: nota.trim() });
      setCambio(true);
      if (nuevo) { cerrar(true); return; }
      await recargar(); setMsg("Guardado.");
    } catch (e) { setMsg(String((e as Error).message)); }
    setGuardando(false);
  };
  const anotar = async () => {
    if (!nota.trim() || nuevo) return;
    await api("nota", { id, texto: nota.trim() });
    setNota("");
    const d = await api(`lead?id=${id}`, undefined, "GET");
    setNotas(d.notas); setCambio(true);
  };

  const estado = l.estado ?? "nuevo";
  const inp = (k: keyof Lead, t: string, tipo = "text", ph = "") => (
    <label className="block">
      <span className={etiqueta}>{t}</span>
      <input className={campo} type={tipo} placeholder={ph} value={(l[k] as string | number | null) ?? ""} onChange={(e) => pon(k, tipo === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)} inputMode={tipo === "number" ? "decimal" : undefined} />
    </label>
  );
  const sel = (k: keyof Lead, t: string, opciones: string[], vacio = "Elige…") => (
    <label className="block">
      <span className={etiqueta}>{t}</span>
      <select className={campo} value={(l[k] as string) ?? ""} onChange={(e) => pon(k, e.target.value || null)}>
        <option value="">{vacio}</option>
        {opciones.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );

  return (
    <Panel titulo={nuevo ? "Cliente nuevo" : l.anonimizado ? "Datos borrados" : nombreDe(l as Lead)} cerrar={() => { if (!nuevo && sucio && !window.confirm("Tienes cambios sin guardar. ¿Cerrar sin guardar?")) return; cerrar(cambio); }}>
      {dups.length ? (
        <div className="mb-4 rounded-[16px] border border-[#e8c9a0] bg-[#f7efe0] px-4 py-3 text-[14px] text-[#7c5e27]">
          <b>Ojo, puede estar repetido</b> (mismo teléfono o correo):
          <ul className="mt-1">{dups.map((d) => <li key={d.id}><a href={`?lead=${d.id}`} className="underline underline-offset-2">{d.nombre || "Sin nombre"}</a>, {fecha(d.creado)}, {listas.estados.find(([k]) => k === d.estado)?.[1] ?? d.estado}</li>)}</ul>
        </div>
      ) : null}
      {!nuevo && l.estado ? <CabeceraFicha l={l as Lead} listas={listas} usuarios={usuarios} /> : null}
      {!nuevo ? (
        <section className={`mb-4 rounded-[20px] border-2 p-4 ${l.proxima_fecha && l.proxima_fecha < hoyMadrid() ? "border-[#a3505a] bg-[#f8e8ea]" : "border-ink bg-white"}`}>
          <p className={etiqueta}>Lo siguiente que toca</p>
          {l.proxima_accion ? (
            <>
              <p className="text-[17px] font-semibold text-ink">{l.proxima_accion}</p>
              <p className={`text-[14px] ${l.proxima_fecha && l.proxima_fecha < hoyMadrid() ? "font-bold text-[#a3505a]" : "text-ink/60"}`}>{l.proxima_fecha ? (l.proxima_fecha < hoyMadrid() ? `Vencida desde el ${fecha(l.proxima_fecha)}` : l.proxima_fecha === hoyMadrid() ? "Hoy" : `Para el ${fecha(l.proxima_fecha)}`) : "Sin fecha"}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input className={campo} placeholder="Cómo ha ido (opcional): no contesta, quiere verlo con su pareja…" value={comentario} onChange={(e) => setComentario(e.target.value)} />
                <button type="button" disabled={guardando} onClick={marcarHecho} className="shrink-0 rounded-full bg-yellow px-5 py-2.5 text-[15px] font-bold text-ink disabled:opacity-40">Hecho</button>
              </div>
            </>
          ) : <p className="text-[14px] text-ink/60">Nada programado. Puedes poner una acción a mano abajo.</p>}
          <details className="mt-3 text-[14px]">
            <summary className="cursor-pointer font-semibold text-teal-deep">Cambiar la acción o la fecha a mano</summary>
            <div className="mt-2 grid gap-3 sm:grid-cols-[2fr_1fr]">
              <input className={campo} value={l.proxima_accion ?? ""} placeholder="Qué hay que hacer" onChange={(e) => pon("proxima_accion", e.target.value || null)} />
              <input className={campo} type="date" value={l.proxima_fecha ?? ""} onChange={(e) => pon("proxima_fecha", e.target.value || null)} />
            </div>
            <p className="mt-1 text-[12px] text-ink/50">Luego pulsa Guardar cambios. Al cambiar de estado, la acción se pone sola.</p>
          </details>
          {!l.anonimizado ? <Redactor id={id as number} telefono={l.telefono ?? null} email={l.email ?? null} hecho={() => { recargar(); setCambio(true); }} /> : null}
          {respuesta(l) && !l.historico_id ? <p className="mt-3 text-[12px] text-ink/50">Primera respuesta: {respuesta(l)} después de entrar.</p> : null}
        </section>
      ) : null}
      {!nuevo && l.telefono ? (
        <div className="mb-4 flex flex-wrap gap-2">
          <a href={`tel:${telLimpio(l.telefono)}`} className="rounded-full bg-ink px-4 py-2 text-[14px] font-bold text-white">Llamar</a>
          <a href={waDe(l.telefono)} target="_blank" rel="noopener" className="rounded-full bg-[#25D366] px-4 py-2 text-[14px] font-bold text-ink">WhatsApp</a>
          {l.email ? <a href={`mailto:${l.email}`} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold text-ink">Correo</a> : null}
        </div>
      ) : null}

      {nuevo ? (
        <section className="rounded-[20px] border-2 border-ink bg-white p-4">
          <p className={etiqueta}>Lo esencial (con esto basta)</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {inp("nombre", "Nombre")}
            {inp("telefono", "Teléfono", "tel")}
            {sel("origen", "¿Cómo nos ha conocido?", listas.origenes)}
            {sel("canal", "Por dónde ha contactado", listas.canales)}
          </div>
          <div className="mt-4 rounded-[14px] bg-cream p-3">
            <p className="text-[13px] font-bold text-ink">Preguntas para la llamada <span className="font-normal text-ink/55">(si te lo dice; si no, déjalo)</span></p>
            <p className="mt-2 text-[13px] text-ink/70">¿Qué le pasa?</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {QUE_REFORMA.map((o) => <button key={o} type="button" onClick={() => pon("que_reforma", l.que_reforma === o ? null : o)} className={`rounded-full border px-3 py-1.5 text-[13.5px] font-semibold ${l.que_reforma === o ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>{o}</button>)}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {inp("m2", "¿Cuántos años lleva en la empresa?", "number")}
              {inp("cp", "¿Código postal o barrio?")}
              {sel("inicio_deseado", "¿Cuándo quiere empezar?", INICIOS)}
              {sel("preferencia_contacto", "¿Cómo prefiere que le contactemos?", PREFERENCIAS)}
            </div>
          </div>
          <label className="mt-3 block">
            <span className={etiqueta}>Qué ha pedido</span>
            <textarea className={`${campo} min-h-[80px]`} placeholder="Ej.: le han despedido tras 8 años en una tienda de Chamberí; tiene la carta de despido de hace 5 días" value={nota} onChange={(e) => setNota(e.target.value)} />
          </label>
          <p className="mt-2 text-[13px] text-ink/55">Pulsa "Dar de alta" abajo. Si tienes más datos (correo, dirección, antigüedad, consulta…), ábrelos aquí debajo; si no, no pasa nada.</p>
        </section>
      ) : null}

      <Plegable abierto={!nuevo}>
      <section id="f-punto" className="scroll-mt-3 rounded-[20px] border border-line bg-white p-4">
        <p className={etiqueta}>En qué punto está</p>
        <p className="mb-2 text-[13px] text-ink/55">Toca el paso en que está ahora y pulsa Guardar cambios. El CRM pone solo lo siguiente que toca.</p>
        <div className="flex flex-wrap gap-1.5">
          {listas.estados.map(([k, t]) => {
            const [bg, fg] = COLOR_ESTADO[k] ?? ["#eee", "#333"];
            const activo = estado === k;
            return (
              <button key={k} type="button" onClick={() => pon("estado", k)} className="rounded-full border-2 px-3 py-1.5 text-[13.5px] font-bold" style={{ background: activo ? fg : bg, color: activo ? "#fff" : fg, borderColor: activo ? fg : "transparent" }}>
                {t}
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {["visita-programada", "visita-hecha", "presupuesto", "firmado", "perdido"].includes(estado) ? <>{inp("visita_fecha", "Fecha de la consulta", "date")}{inp("visita_hora", "Hora de la consulta", "time")}
            <label className="block">
              <span className={etiqueta}>Abogado que hace la consulta</span>
              <select className={campo} value={l.arquitecto_id ?? ""} onChange={(e) => pon("arquitecto_id", e.target.value ? Number(e.target.value) : null)}>
                <option value="">Sin abogado</option>
                {usuarios.filter((x) => x.activo !== false).map((x) => <option key={x.id} value={x.id}>{x.nombre}{x.puesto ? ` (${x.puesto})` : ""}</option>)}
              </select>
            </label></> : null}
          {["visita-hecha", "presupuesto"].includes(estado) ? sel("probabilidad", "Probabilidad de que firme", ["10", "25", "50", "75", "90"].map((x) => x), "Elige…") : null}
          {["presupuesto", "firmado", "perdido"].includes(estado) ? <>{inp("presupuesto_fecha", "Propuesta entregada el", "date")}{inp("presupuesto_importe", "Honorarios propuestos (€)", "number")}</> : null}
          {estado === "firmado" ? <>{inp("firmado_fecha", "Encargo firmado el", "date")}{inp("firmado_importe", "Honorarios firmados (€)", "number")}{inp("facturado_importe", "Facturado hasta hoy (€)", "number")}
            <label className="flex items-center gap-2 self-end pb-2 text-[15px] text-ink"><input type="checkbox" checked={Boolean(l.resena_pedida)} onChange={(e) => pon("resena_pedida", e.target.checked)} className="h-5 w-5" /> Reseña y recomendación pedidas</label></> : null}
          {["visita-hecha", "presupuesto"].includes(estado) ? inp("decision_fecha", "Día en que dice que decidirá (si lo ha dicho)", "date") : null}
          {estado === "aplazado" ? <>{inp("proxima_fecha", "¿Cuándo volvemos a llamar? (si no pones nada, en 2 meses)", "date")}<p className="self-end pb-2 text-[13px] text-ink/55">Aplazado es para quien sí quiere seguir con el caso, pero más adelante. Si ya no quiere, usa "No firmó".</p></> : null}
          {["perdido", "descartado"].includes(estado) ? sel("motivo", "Motivo", listas.motivos) : null}
        </div>
      </section>

      {["visita-hecha", "presupuesto", "firmado", "perdido"].includes(estado) || l.informe ? (
        <div id="f-informe" className="mt-4 scroll-mt-3"><InformeVisita valor={l.informe} cambiar={(i) => pon("informe", i)} abierto={estado === "visita-hecha" && !String(l.informe?.impresiones ?? "").trim()} /></div>
      ) : null}

      {estado === "firmado" ? (
        <section id="f-instalacion" className="mt-4 scroll-mt-3 rounded-[20px] border border-line bg-white p-4">
          <p className={etiqueta}>El procedimiento</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={etiqueta}>Abogado del procedimiento</span>
              <select className={campo} value={l.jefe_obra_id ?? ""} onChange={(e) => pon("jefe_obra_id", e.target.value ? Number(e.target.value) : null)}>
                <option value="">Sin abogado del procedimiento</option>
                {usuarios.filter((x) => x.activo !== false).map((x) => <option key={x.id} value={x.id}>{x.nombre}{x.puesto ? ` (${x.puesto})` : ""}</option>)}
              </select>
            </label>
            {sel("fase_obra", "Fase en la que está", listas.fases)}
            {inp("obra_inicio", "Empieza el procedimiento", "date")}
            {inp("obra_fin_prevista", "Fin previsto (juicio o acuerdo)", "date")}
            {inp("obra_fin", "Fin real (cierre)", "date")}
            <label className="block">
              <span className={etiqueta}>Avance: {l.avance ?? 0}%</span>
              <input type="range" min={0} max={100} step={5} className="w-full accent-[#1c8caa]" value={Number(l.avance ?? 0)} onChange={(e) => pon("avance", Number(e.target.value))} />
            </label>
            {sel("licencia", "Trámites", LICENCIAS)}
            {sel("vive_durante_obra", "¿Sigue trabajando en la empresa?", ["Sí", "No", "De baja"])}
          </div>
          <div className="mt-4 rounded-[14px] bg-cream p-3">
            <p className="text-[13px] font-bold text-ink">Lista de cierre del caso <span className="font-normal text-ink/55">(marca lo que esté hecho)</span></p>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {ENTREGA.map((e) => {
                const on = Boolean(l.entrega?.[e]);
                return <label key={e} className="flex items-center gap-2 text-[14.5px] text-ink"><input type="checkbox" className="h-5 w-5" checked={on} onChange={() => pon("entrega", { ...(l.entrega ?? {}), [e]: !on })} />{e}</label>;
              })}
            </div>
            <p className="mt-1 text-[12px] text-ink/50">{ENTREGA.filter((e) => l.entrega?.[e]).length} de {ENTREGA.length} hechas.</p>
          </div>
          <p className="mt-1 text-[12px] text-ink/50">Estos datos se guardan con Guardar cambios. El parte de actuaciones y los cambios de honorarios se guardan con su propio botón.</p>
          {!nuevo ? <div id="f-parte" className="scroll-mt-3" /> : null}
          {!nuevo ? <SeccionObra id={id as number} partes={partes} incidencias={incidencias} recargar={recargar} /> : null}
        </section>
      ) : null}

      {!nuevo ? (
        <section className="mt-4 rounded-[20px] border border-line bg-white p-4">
          <p className={etiqueta}>Escribir a alguien del equipo sobre este cliente</p>
          <EscribirMensaje id={id as number} personas={usuarios} yo={usuario.id} hecho={() => { recargar(); setCambio(true); }} />
        </section>
      ) : null}

      <section id="f-persona" className="mt-4 scroll-mt-3 rounded-[20px] border border-line bg-white p-4">
        <p className={etiqueta}>La persona</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {inp("nombre", "Nombre")}
          {inp("apellidos", "Apellidos")}
          {inp("telefono", "Teléfono", "tel")}
          {inp("email", "Correo", "email")}
          {sel("temperatura", "Cómo de decidida está", TEMPERATURAS)}
          {sel("inicio_deseado", "Cuándo quiere empezar", INICIOS)}
          {inp("presupuesto_cliente", "Lo que tiene pensado gastar (€)", "number")}
          {inp("consentimiento", "Permiso para escribirle", "text", "Ej.: dado por teléfono el 26/10")}
          {sel("preferencia_contacto", "Cómo prefiere que le contactemos", PREFERENCIAS)}
          {sel("que_reforma", "Qué le pasa", QUE_REFORMA)}
          {inp("contacto2_nombre", "Otra persona de contacto", "text", "Ej.: su pareja, Toni")}
          {inp("contacto2_telefono", "Teléfono de esa persona", "tel")}
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-line bg-white p-4">
        <p className={etiqueta}>De dónde viene</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {sel("origen", "Origen", listas.origenes)}
          {sel("canal", "Por dónde contactó", listas.canales)}
          {usuario.rol !== "asignado" ? (
            <label className="block">
              <span className={etiqueta}>Lo lleva</span>
              <select className={campo} value={l.asignado_a ?? ""} onChange={(e) => pon("asignado_a", e.target.value ? Number(e.target.value) : null)}>
                <option value="">Sin asignar</option>
                {usuarios.filter((x) => x.activo !== false).map((x) => <option key={x.id} value={x.id}>{x.nombre}</option>)}
              </select>
            </label>
          ) : null}
          {!["visita-programada", "visita-hecha", "presupuesto", "firmado", "perdido"].includes(estado) ? <label className="block">
            <span className={etiqueta}>Abogado de la consulta</span>
            <select className={campo} value={l.arquitecto_id ?? ""} onChange={(e) => pon("arquitecto_id", e.target.value ? Number(e.target.value) : null)}>
              <option value="">Sin abogado</option>
              {usuarios.filter((x) => x.activo !== false).map((x) => <option key={x.id} value={x.id}>{x.nombre}{x.puesto ? ` (${x.puesto})` : ""}</option>)}
            </select>
          </label> : null}
          {l.origen === "Recomendado" || l.origen === "Recomendados" || l.recomendado_por ? inp("recomendado_por", "Le recomendó", "text", "Nombre del cliente que le habló de nosotros") : null}
          {inp("ref", "Referencia", "text", "FA26…")}
        </div>
      </section>

      <section id="f-casa" className="mt-4 scroll-mt-3 rounded-[20px] border border-line bg-white p-4">
        <p className={etiqueta}>El asunto</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {inp("direccion", "Dirección")}
          {inp("poblacion", "Población o barrio")}
          {inp("cp", "Código postal")}
          {inp("m2", "Años en la empresa", "number")}
          {sel("tipo_vivienda", "Situación laboral", VIVIENDAS)}
          {sel("tipo", "Tipo de asunto", ["Despido", "Acoso laboral", "Incapacidad permanente", "Mujer y trabajo", "Asesoría a empresas"], "Despido")}
        </div>
        <label className="mt-3 block">
          <span className={etiqueta}>Notas fijas</span>
          <textarea className={`${campo} min-h-[90px]`} value={l.notas ?? ""} onChange={(e) => pon("notas", e.target.value)} />
        </label>
      </section>
      </Plegable>

      <section id="f-historial" className={`mt-4 scroll-mt-3 rounded-[20px] border border-line bg-white p-4 ${nuevo ? "hidden" : ""}`}>
        <p className={etiqueta}>Seguimiento e historial</p>
        <div className="flex gap-2">
          <textarea className={`${campo} min-h-[60px]`} placeholder={nuevo ? "Qué ha pedido, cuándo llamarle…" : "Llamada, mensaje, lo que ha dicho…"} value={nota} onChange={(e) => setNota(e.target.value)} />
          {!nuevo ? <button type="button" onClick={anotar} className="shrink-0 self-end rounded-full border border-ink px-4 py-2 text-[14px] font-bold text-ink">Apuntar</button> : null}
        </div>
        <ul className="mt-3 space-y-2">
          {notas.map((n, i) => (
            <li key={i} className="rounded-[12px] bg-cream px-3 py-2 text-[14px] text-ink/85">
              <span className="block text-[12px] text-ink/50">{hora(n.creado)} · {n.usuario}</span>
              <span className="whitespace-pre-wrap">{n.texto}</span>
            </li>
          ))}
        </ul>
        {!nuevo ? <p className="mt-3 text-[12px] text-ink/45">Entró el {fecha(l.creado ?? null)}{l.contacto_id ? " por la web" : ""}{l.historico_id ? " (CRM antiguo)" : ""} · actualizado {l.actualizado ? hora(l.actualizado) : ""}</p> : null}
      </section>

      <div className={`sticky bottom-0 -mx-5 mt-5 flex-wrap items-center gap-3 border-t border-line bg-white px-5 py-3 ${nuevo || sucio || guardando || msg ? "flex" : "hidden"}`}>
        <button type="button" disabled={guardando || (!nuevo && !sucio)} onClick={guardar} className="rounded-full bg-yellow px-6 py-3 text-[15px] font-bold text-ink disabled:opacity-40">{guardando ? "Guardando…" : nuevo ? "Dar de alta" : "Guardar cambios"}</button>
        {!nuevo && sucio && !guardando ? <span className="text-[14px] font-bold text-[#a3505a]">Tienes cambios sin guardar: pulsa "Guardar cambios".</span> : null}
        {msg ? <span className="text-[14px] text-ink/70">{msg}</span> : null}
      </div>
      {!nuevo && usuario.rol === "admin" ? (
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-dashed border-line pt-4">
        <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink/40">Solo dirección</span>
        {!l.anonimizado ? (
          <button type="button" onClick={async () => { if (confirm("Borra nombre, teléfono, correo, dirección y notas de esta persona (lo pide la ley si ella lo solicita). Se conservan solo las cifras para las estadísticas. ¿Seguro?")) { await api("olvidar", { id }); await recargar(); setCambio(true); } }} className="text-[13px] font-semibold text-ink/55 underline underline-offset-4">Borrar sus datos personales</button>
        ) : null}
        <button type="button" onClick={async () => { if (confirm("¿Borrar esta ficha para siempre?")) { await api("borrar", { id }); cerrar(true); } }} className="text-[13px] font-semibold text-[#a3505a] underline underline-offset-4">Borrar la ficha</button>
      </div>
      ) : null}
    </Panel>
  );
}

function Equipo({ cerrar }: { cerrar: () => void }) {
  const [lista, setLista] = useState<Usuario[]>([]);
  const [nuevo, setNuevo] = useState({ email: "", nombre: "", rol: "equipo", puesto: "Abogado" });
  const [msg, setMsg] = useState("");
  const cargar = () => api("usuarios", undefined, "GET").then((j) => setLista(j.usuarios));
  useEffect(() => { cargar(); }, []);
  return (
    <Panel titulo="Equipo y accesos" cerrar={cerrar} ancho="max-w-[620px]">
      <p className="text-[14px] text-ink/70">Cada persona entra con su correo y su contraseña. Toda alta nueva (salvo Lucía y Álvaro) la aprueba Álvaro desde un correo; solo entonces le llega a la persona el enlace para crear su contraseña.</p>
      <ul className="mt-4 space-y-2">
        {lista.map((x) => (
          <li key={x.id} className="flex flex-wrap items-center justify-between gap-2 rounded-[16px] border border-line bg-white px-4 py-3">
            <span>
              <b className="text-ink">{x.nombre}</b> <span className="text-[13px] text-ink/55">{x.email}</span>
              <span className="block text-[12px] text-ink/50">{x.rol === "admin" ? "Administra (ve todo y da accesos)" : x.rol === "equipo" ? "Equipo (ve y edita todos los leads)" : "Solo sus leads asignados"} · {x.puesto ? `${x.puesto} · ` : ""}{x.aprobado === false ? "pendiente de que Álvaro lo apruebe" : x.conClave ? "con contraseña" : "sin contraseña todavía"}{x.activo === false ? " · desactivada" : ""}</span>
            </span>
            <span className="flex gap-2">
              <select className="rounded-full border border-line px-2 py-1 text-[13px]" value={x.rol} onChange={async (e) => { await api("usuario", { ...x, rol: e.target.value }); cargar(); }}>
                <option value="admin">Administra</option><option value="equipo">Equipo</option><option value="asignado">Solo lo asignado</option>
              </select>
              <button type="button" onClick={async () => { await api("reenviar", { email: x.email }); setMsg(`Enlace enviado a ${x.email}.`); }} className="rounded-full border border-line px-3 py-1 text-[13px] font-semibold">Enviar enlace</button>
              <button type="button" onClick={async () => { await api("usuario", { ...x, activo: x.activo === false }); cargar(); }} className="rounded-full border border-line px-3 py-1 text-[13px] font-semibold">{x.activo === false ? "Activar" : "Desactivar"}</button>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-[20px] border border-line bg-white p-4">
        <p className={etiqueta}>Dar de alta a alguien</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <select className={campo} value={nuevo.puesto} onChange={(e) => setNuevo({ ...nuevo, puesto: e.target.value })}>
            {PUESTOS.map((p) => <option key={p}>{p}</option>)}
          </select>
          <input className={campo} placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
          <input className={campo} placeholder="Correo" type="email" value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} />
          <select className={campo} value={nuevo.rol} onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}>
            <option value="equipo">Equipo</option><option value="asignado">Solo lo asignado</option><option value="admin">Administra</option>
          </select>
        </div>
        <button type="button" disabled={!nuevo.email || !nuevo.nombre} onClick={async () => { await api("usuario", nuevo); setMsg(`Alta de ${nuevo.nombre} pedida. Álvaro recibe un correo para aprobarla; al aprobar, a ${nuevo.email} le llega su enlace.`); setNuevo({ email: "", nombre: "", rol: "equipo", puesto: "Abogado" }); cargar(); }} className="mt-3 rounded-full bg-yellow px-5 py-2.5 text-[14px] font-bold text-ink disabled:opacity-40">Dar de alta (lo aprueba Álvaro)</button>
        {msg ? <p className="mt-2 text-[14px] text-[#3f6b39]">{msg}</p> : null}
      </div>
    </Panel>
  );
}

function Importar({ cerrar }: { cerrar: (hecho: boolean) => void }) {
  const [estado, setEstado] = useState("");
  const [hecho, setHecho] = useState(false);
  return (
    <Panel titulo="Importar el CRM antiguo" cerrar={() => cerrar(hecho)} ancho="max-w-[560px]">
      <p className="text-[14px] leading-relaxed text-ink/75">Sube el CSV exportado del CRM antiguo (separado por punto y coma, con la cabecera idcliente;fecha;referencia…). Se puede subir varias veces: las fichas que ya estén no se duplican.</p>
      <input
        type="file" accept=".csv,text/csv" className="mt-4 block w-full text-[14px]"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setEstado("Subiendo y guardando… (puede tardar un par de minutos)");
          try {
            const texto = await f.text();
            const r = await fetch("/api/crm/importar", { method: "POST", headers: { "Content-Type": "text/plain; charset=utf-8" }, body: texto });
            const j = await r.json();
            if (!r.ok) throw new Error(j.error ?? r.status);
            setEstado(`Hecho: ${j.leidas} fichas leídas, ${j.nuevas} nuevas, ${j.ya} ya estaban.`);
            setHecho(true);
          } catch (err) { setEstado(`No se pudo: ${(err as Error).message}`); }
        }}
      />
      {estado ? <p className="mt-4 rounded-[12px] bg-white px-4 py-3 text-[14px] text-ink/80">{estado}</p> : null}
    </Panel>
  );
}
