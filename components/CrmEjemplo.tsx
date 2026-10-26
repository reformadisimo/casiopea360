"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// CRM de demostración con datos inventados de una empresa de ejemplo.
// Todo se puede tocar; nada se guarda: al recargar, vuelve a empezar.

const FASES = ["Nuevo", "Contactado", "Visita programada", "Visita hecha", "Presupuesto entregado", "Firmado", "No firmó", "Descartado"] as const;
type Fase = (typeof FASES)[number];

const COLOR_FASE: Record<Fase, { fondo: string; texto: string }> = {
  Nuevo: { fondo: "#e0f2fe", texto: "#0369a1" },
  Contactado: { fondo: "#e8edf8", texto: "#3b4f86" },
  "Visita programada": { fondo: "#fef3d8", texto: "#8a5a00" },
  "Visita hecha": { fondo: "#fde6dc", texto: "#a24a22" },
  "Presupuesto entregado": { fondo: "#fce4ea", texto: "#b0243f" },
  Firmado: { fondo: "#dcf3e4", texto: "#1d7a46" },
  "No firmó": { fondo: "#eceef2", texto: "#555d70" },
  Descartado: { fondo: "#eceef2", texto: "#555d70" },
};

const EQUIPO = ["Lola (recepción)", "Dani (comercial)", "Irene (técnica)"];
const ORIGENES = ["Recomendado", "Instagram", "Google Ads", "Meta (anuncio)", "Google (sin pagar)", "Asistentes de IA", "Web (formulario)", "Calculadora web", "Asistente de la web", "Llamada", "WhatsApp"];

// «Lo siguiente que toca» según el paso en que está. dias: 0 = hoy, negativo = vencida.
const SIGUIENTE: Record<Fase, string | null> = {
  Nuevo: "Llamar por primera vez",
  Contactado: "Programar la visita técnica",
  "Visita programada": "Hacer la visita técnica",
  "Visita hecha": "Entregar el presupuesto (plazo: 48 horas)",
  "Presupuesto entregado": "Correo de seguimiento del presupuesto",
  Firmado: "Llamar al terminar la obra: pedir reseña y recomendación",
  "No firmó": null,
  Descartado: null,
};

type Nota = { cuando: string; quien: string; texto: string };
type Lead = {
  id: number;
  nombre: string;
  tel: string;
  zona: string;
  trabajo: string;
  origen: string;
  resp: string;
  entro: string;
  fase: Fase;
  importe?: number;
  calor?: "Caliente" | "Templado" | "Frío";
  dias: number | null; // días hasta la próxima acción (negativo = vencida)
  accion: string | null;
  prob?: number;
  notas: Nota[];
};

const INICIAL: Lead[] = [
  { id: 1, nombre: "Ana Beltrán", tel: "600 000 201", zona: "Zona norte", trabajo: "Aerotermia · vivienda de 120 m²", origen: "Google Ads", resp: "Dani (comercial)", entro: "Hoy", fase: "Nuevo", calor: "Caliente", dias: 0, accion: SIGUIENTE.Nuevo, notas: [{ cuando: "Hoy, 08:12", quien: "El CRM", texto: "Entra por el formulario de la landing de aerotermia" }] },
  { id: 2, nombre: "Marcos Vidal", tel: "600 000 202", zona: "Centro", trabajo: "Aire acondicionado · 3 estancias", origen: "Calculadora web", resp: "Lola (recepción)", entro: "Ayer", fase: "Nuevo", calor: "Templado", dias: -1, accion: "Segundo intento: llamar y mandar WhatsApp", notas: [{ cuando: "Ayer, 18:40", quien: "Lola (recepción)", texto: "Llamada sin respuesta. Se le envía WhatsApp automático" }] },
  { id: 3, nombre: "Paula Roldán", tel: "600 000 203", zona: "Zona sur", trabajo: "Suelo radiante · obra nueva", origen: "Recomendado", resp: "Dani (comercial)", entro: "Hace 2 días", fase: "Contactado", calor: "Caliente", dias: 0, accion: SIGUIENTE.Contactado, notas: [{ cuando: "Hace 2 días", quien: "Dani (comercial)", texto: "Habla con ella: quiere empezar en un mes" }] },
  { id: 4, nombre: "Jorge Salinas", tel: "600 000 204", zona: "Este", trabajo: "Cambio de caldera", origen: "Instagram", resp: "Irene (técnica)", entro: "Hace 5 días", fase: "Visita programada", calor: "Templado", dias: 1, accion: SIGUIENTE["Visita programada"], notas: [{ cuando: "Hace 3 días", quien: "Lola (recepción)", texto: "Visita fijada para mañana a las 10:30" }] },
  { id: 5, nombre: "Clara Ibáñez", tel: "600 000 205", zona: "Oeste", trabajo: "Aerotermia · chalet", origen: "Google (sin pagar)", resp: "Irene (técnica)", entro: "Hace 6 días", fase: "Visita programada", calor: "Caliente", dias: 2, accion: SIGUIENTE["Visita programada"], notas: [] },
  { id: 6, nombre: "Hugo Cárdenas", tel: "600 000 206", zona: "Zona norte", trabajo: "Aire acondicionado · oficina", origen: "Meta (anuncio)", resp: "Irene (técnica)", entro: "Hace 9 días", fase: "Visita hecha", calor: "Caliente", dias: -1, accion: SIGUIENTE["Visita hecha"], notas: [{ cuando: "Hace 3 días", quien: "Irene (técnica)", texto: "Informe de la visita: muy interesado, quiere dos opciones de potencia" }, { cuando: "Hace 3 días", quien: "Lola (recepción)", texto: "Estado: Visita programada → Visita hecha" }] },
  { id: 7, nombre: "Rosa Maldonado", tel: "600 000 207", zona: "Sierra", trabajo: "Aerotermia + suelo radiante", origen: "Recomendado", resp: "Dani (comercial)", entro: "Hace 16 días", fase: "Presupuesto entregado", importe: 14200, calor: "Templado", prob: 50, dias: -2, accion: SIGUIENTE["Presupuesto entregado"], notas: [{ cuando: "Hace 7 días", quien: "Dani (comercial)", texto: "Presupuesto enviado. Lo comenta con su pareja" }] },
  { id: 8, nombre: "Familia Quintana", tel: "600 000 208", zona: "Centro", trabajo: "Climatización de vivienda completa", origen: "Instagram", resp: "Dani (comercial)", entro: "Hace 2 meses", fase: "Firmado", importe: 9800, calor: "Caliente", prob: 90, dias: 40, accion: SIGUIENTE.Firmado, notas: [{ cuando: "Hace 3 semanas", quien: "Dani (comercial)", texto: "Firmado. Obra a cargo de Irene" }] },
  { id: 9, nombre: "Íñigo Paredes", tel: "600 000 209", zona: "Este", trabajo: "Aire acondicionado · local", origen: "Llamada", resp: "Lola (recepción)", entro: "Hace 3 días", fase: "Descartado", dias: null, accion: null, notas: [{ cuando: "Hace 3 días", quien: "Lola (recepción)", texto: "Busca solo alquiler de equipos: no es lo nuestro" }] },
  { id: 10, nombre: "Sandra Lucena", tel: "600 000 210", zona: "Oeste", trabajo: "Cambio de caldera", origen: "Web (formulario)", resp: "Dani (comercial)", entro: "Hace 24 días", fase: "No firmó", importe: 4300, dias: null, accion: null, notas: [{ cuando: "Hace 10 días", quien: "Dani (comercial)", texto: "Prefirió esperar al año que viene" }] },
];

function textoDias(d: number | null) {
  if (d === null) return "";
  if (d < 0) return "Vencida";
  if (d === 0) return "Hoy";
  if (d === 1) return "Mañana";
  return `En ${d} días`;
}

function mensajeDe(l: Lead): string {
  const nombre = l.nombre.split(" ")[0];
  const yo = l.resp.split(" ")[0];
  const base = `Hola ${nombre}, soy ${yo} de Climatización Ejemplo. `;
  switch (l.fase) {
    case "Nuevo": return `${base}He visto tu petición de ${l.trabajo.split(" · ")[0].toLowerCase()} en ${l.zona.toLowerCase()}. ¿Te viene bien que te llame hoy a mediodía o prefieres por la tarde?`;
    case "Contactado": return `${base}Para darte un precio cerrado necesito ver la instalación. ¿Te va mejor el jueves por la mañana o por la tarde?`;
    case "Visita programada": return `${base}Te recuerdo que pasamos a verlo ${l.dias === 1 ? "mañana" : "en los próximos días"}. Si necesitas cambiar la hora, dímelo y lo movemos.`;
    case "Visita hecha": return `${base}Ya tengo preparado tu presupuesto de ${l.trabajo.split(" · ")[0].toLowerCase()}. Te lo envío hoy por correo y, si quieres, lo repasamos juntos por teléfono.`;
    case "Presupuesto entregado": return `${base}¿Has podido mirar el presupuesto? Si tienes alguna duda, te la resuelvo hoy mismo. Y si prefieres otra opción de potencia, te la preparo.`;
    case "Firmado": return `${base}Gracias por confiar en nosotros. ¿Te importaría dejarnos una reseña en Google? Nos ayuda muchísimo.`;
    default: return `${base}Gracias por tu tiempo. Si más adelante quieres retomarlo, aquí estamos.`;
  }
}

export default function CrmEjemplo() {
  const [leads, setLeads] = useState<Lead[]>(INICIAL);
  const [abierto, setAbierto] = useState<number | null>(null);
  const [fase, setFase] = useState<Fase | "Todos" | "Hoy">("Todos");
  const [origen, setOrigen] = useState("Todos");
  const [resp, setResp] = useState("Todos");
  const [q, setQ] = useState("");
  const [nota, setNota] = useState("");
  const [faseNueva, setFaseNueva] = useState<Fase | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [aviso, setAviso] = useState("");
  const cajon = useRef<HTMLDivElement>(null);

  const lead = leads.find((l) => l.id === abierto) ?? null;
  const toca = (l: Lead) => l.dias !== null && l.dias <= 0;

  const cifras = useMemo(() => {
    const vencidas = leads.filter((l) => l.dias !== null && l.dias < 0 && l.fase !== "Presupuesto entregado" && l.fase !== "Visita hecha").length;
    return {
      vencidos: leads.filter((l) => l.dias !== null && l.dias < 0).length,
      presupuestos: leads.filter((l) => (l.fase === "Visita hecha" || l.fase === "Presupuesto entregado") && l.dias !== null && l.dias < 0).length,
      sinLlamar: leads.filter((l) => l.fase === "Nuevo").length,
      visitas: leads.filter((l) => l.fase === "Visita programada").length,
      firmas: leads.filter((l) => l.fase === "Firmado").reduce((s, l) => s + (l.importe ?? 0), 0),
      hoy: leads.filter(toca).length,
      vencidas,
    };
  }, [leads]);

  const visibles = leads.filter(
    (l) =>
      (fase === "Todos" || (fase === "Hoy" ? toca(l) : l.fase === fase)) &&
      (origen === "Todos" || l.origen === origen) &&
      (resp === "Todos" || l.resp === resp) &&
      (!q.trim() || `${l.nombre} ${l.tel} ${l.zona}`.toLowerCase().includes(q.trim().toLowerCase())),
  );

  useEffect(() => {
    if (!lead) return;
    setFaseNueva(lead.fase);
    setNota("");
    setMensaje("");
    setAviso("");
    cajon.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    document.addEventListener("keydown", esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = prev;
    };
  }, [abierto]); // eslint-disable-line react-hooks/exhaustive-deps

  const actualiza = (id: number, f: (l: Lead) => Lead) => setLeads((ls) => ls.map((l) => (l.id === id ? f(l) : l)));

  const hecho = () => {
    if (!lead) return;
    const sig = FASES[Math.min(FASES.indexOf(lead.fase) + 1, 5)];
    const nuevaNota: Nota = { cuando: "Ahora mismo", quien: lead.resp, texto: `Hecho: ${lead.accion}${nota.trim() ? ` · ${nota.trim()}` : ""}` };
    if (lead.fase === "Firmado") {
      actualiza(lead.id, (l) => ({ ...l, dias: null, accion: null, notas: [nuevaNota, ...l.notas] }));
    } else if (lead.fase === "Presupuesto entregado") {
      actualiza(lead.id, (l) => ({ ...l, dias: 3, accion: "Llamar para ver si tiene dudas del presupuesto", notas: [nuevaNota, ...l.notas] }));
    } else {
      actualiza(lead.id, (l) => ({ ...l, fase: sig, dias: sig === "Visita programada" ? 2 : 0, accion: SIGUIENTE[sig], notas: [{ ...nuevaNota }, { cuando: "Ahora mismo", quien: "El CRM", texto: `Estado: ${l.fase} → ${sig}` }, ...l.notas] }));
    }
    setNota("");
    setAviso("Hecho. El CRM ya ha puesto lo siguiente que toca.");
  };

  const guardar = () => {
    if (!lead || !faseNueva || faseNueva === lead.fase) return;
    const f = faseNueva;
    actualiza(lead.id, (l) => ({
      ...l,
      fase: f,
      dias: SIGUIENTE[f] ? (f === "Visita programada" ? 2 : 0) : null,
      accion: SIGUIENTE[f],
      notas: [{ cuando: "Ahora mismo", quien: "El CRM", texto: `Estado: ${l.fase} → ${f}` }, ...l.notas],
    }));
    setAviso("Guardado. El CRM ha puesto lo siguiente que toca.");
  };

  const anadeNota = () => {
    if (!lead || !nota.trim()) return;
    actualiza(lead.id, (l) => ({ ...l, notas: [{ cuando: "Ahora mismo", quien: l.resp, texto: nota.trim() }, ...l.notas] }));
    setNota("");
  };

  const reinicia = () => {
    setLeads(INICIAL);
    setAbierto(null);
    setFase("Todos");
    setOrigen("Todos");
    setResp("Todos");
    setQ("");
  };

  const Cifra = ({ t, v, alerta }: { t: string; v: string | number; alerta?: boolean }) => (
    <div className={`rounded-2xl border bg-white p-4 ${alerta && Number(v) > 0 ? "border-rose-300" : "border-linea"}`}>
      <p className={`text-[0.7rem] font-extrabold uppercase tracking-wide ${alerta && Number(v) > 0 ? "text-rose-700" : "text-gris"}`}>{t}</p>
      <p className="mt-1 text-3xl font-extrabold">{v}</p>
    </div>
  );

  return (
    <div className="bg-niebla pb-20">
      <div className="bg-noche pb-10 pt-24 text-white sm:pt-28">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-estrella px-5 py-3 text-sm font-bold text-tinta">
            CRM de demostración con datos inventados de una empresa de ejemplo. Puedes tocarlo todo: no se guarda nada.
          </div>
          <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white/70">Tu CRM · Climatización Ejemplo, S.L.</p>
              <h1 className="mt-1 text-3xl font-extrabold sm:text-5xl">Hola. Esto es tu día.</h1>
            </div>
            <button type="button" onClick={reinicia} className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold hover:bg-white/10">Volver a empezar</button>
          </header>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Cifra t="Seguimientos vencidos" v={cifras.vencidos} alerta />
          <Cifra t="Presupuestos fuera de plazo" v={cifras.presupuestos} alerta />
          <Cifra t="Nuevos sin llamar" v={cifras.sinLlamar} alerta />
          <Cifra t="Visitas esta semana" v={cifras.visitas} />
          <Cifra t={`Firmas este mes`} v={`${cifras.firmas.toLocaleString("es-ES")} €`} />
        </div>

        <p className="mt-5 text-sm text-gris">Toca un cliente para abrir su ficha. Los recuadros de colores filtran por el paso en que está cada uno.</p>

        <button
          type="button"
          onClick={() => setFase(fase === "Hoy" ? "Todos" : "Hoy")}
          aria-pressed={fase === "Hoy"}
          className={`mt-3 flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-left ${fase === "Hoy" ? "border-rose-500 bg-rose-100" : "border-rose-300 bg-rose-50"}`}
        >
          <span>
            <span className="block text-[0.7rem] font-extrabold uppercase tracking-wide text-rose-700">Lo mío de hoy</span>
            <span className="block font-extrabold text-rose-800">{cifras.hoy === 0 ? "Nada pendiente para hoy" : `${cifras.hoy} acciones que tocan hoy o ya han vencido`}</span>
          </span>
          <span className="text-3xl font-extrabold text-rose-700">{cifras.hoy}</span>
        </button>

        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Filtrar por paso">
          {(["Todos", ...FASES] as const).map((f) => {
            const n = f === "Todos" ? leads.length : leads.filter((l) => l.fase === f).length;
            const c = f === "Todos" ? { fondo: "#0e1a3d", texto: "#fff" } : COLOR_FASE[f];
            const activo = fase === f;
            return (
              <button key={f} type="button" aria-pressed={activo} onClick={() => setFase(activo && f !== "Todos" ? "Todos" : f)} className="shrink-0 rounded-2xl px-4 py-2.5 text-left" style={{ background: c.fondo, color: c.texto, outline: activo ? `3px solid ${c.texto}` : "none", outlineOffset: -1, opacity: f !== "Todos" && fase !== "Todos" && !activo ? 0.6 : 1 }}>
                <span className="block text-[0.65rem] font-extrabold uppercase tracking-wide">{f}</span>
                <span className="block text-xl font-extrabold">{n}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr]">
          <label className="sr-only" htmlFor="crm-buscar">Buscar</label>
          <input id="crm-buscar" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar: nombre, teléfono, zona…" className="rounded-2xl border border-linea bg-white px-4 py-3 focus:border-noche focus:outline-none" />
          <label className="sr-only" htmlFor="crm-origen">Origen</label>
          <select id="crm-origen" value={origen} onChange={(e) => setOrigen(e.target.value)} className="rounded-2xl border border-linea bg-white px-4 py-3">
            <option>Todos</option>
            {ORIGENES.map((o) => <option key={o}>{o}</option>)}
          </select>
          <label className="sr-only" htmlFor="crm-resp">Responsable</label>
          <select id="crm-resp" value={resp} onChange={(e) => setResp(e.target.value)} className="rounded-2xl border border-linea bg-white px-4 py-3">
            <option>Todos</option>
            {EQUIPO.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <p className="mt-4 text-sm font-bold text-gris" aria-live="polite">{visibles.length} contactos</p>
        <ul className="mt-2 space-y-3">
          {visibles.map((l) => {
            const c = COLOR_FASE[l.fase];
            return (
              <li key={l.id}>
                <button type="button" onClick={() => setAbierto(l.id)} className="grid w-full gap-2 rounded-2xl border border-linea bg-white p-4 text-left transition-colors hover:border-noche sm:grid-cols-[1.4fr_1.2fr_auto] sm:items-center sm:gap-4">
                  <span>
                    <span className="block text-lg font-extrabold">{l.nombre}</span>
                    <span className="block text-sm text-gris">{l.tel} · {l.zona} · {l.trabajo}</span>
                    {l.accion && (
                      <span className={`mt-1 block text-sm font-bold ${l.dias !== null && l.dias < 0 ? "text-rose-700" : l.dias === 0 ? "text-amber-800" : "text-gris"}`}>
                        {textoDias(l.dias)}: {l.accion}
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-gris">
                    <span className="rounded-full bg-niebla px-2.5 py-1 font-bold">{l.origen}</span>
                    <span className="ml-2">{l.resp.split(" ")[0]}</span>
                    <span className="mt-1 block text-xs">Entró: {l.entro}{l.importe ? ` · ${l.importe.toLocaleString("es-ES")} €` : ""}</span>
                  </span>
                  <span className="justify-self-start rounded-full px-3 py-1 text-xs font-extrabold sm:justify-self-end" style={{ background: c.fondo, color: c.texto }}>{l.fase}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <section className="mt-12" aria-labelledby="crm-mas">
          <h2 id="crm-mas" className="text-2xl font-extrabold sm:text-3xl">Y además, en el menú de tu CRM</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Lo mío de hoy", "Las llamadas y tareas que te tocan hoy o que se han pasado de fecha."],
              ["Apuntar una llamada o un WhatsApp", "Alguien ha contactado: lo das de alta en un minuto, con su nombre, teléfono y de dónde viene."],
              ["Agenda de visitas", "Las visitas de los próximos 14 días, día a día, con hora y dirección."],
              ["Mensajes del equipo", "Lo que te escribe el equipo sobre sus clientes. Contestas desde la ficha del cliente."],
              ["Alarmas del equipo", "Quién tiene seguimientos vencidos, con qué cliente y desde hace cuántos días."],
              ["Subir tu CRM antiguo", "Cargamos el archivo del CRM anterior para que no pierdas a ninguno de tus clientes."],
              ["Descargar en Excel", "Todos los clientes con todos sus datos, siempre que los quieras."],
              ["Guía de uso", "Qué hace cada cosa y cómo se usa, paso a paso, para tu puesto."],
              ["Buzón de ideas", "¿Echas algo en falta? Lo escribes ahí y nos llega directamente."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-linea bg-white p-5">
                <p className="font-extrabold">{t}</p>
                <p className="mt-1 text-sm text-gris">{d}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {lead && (
        <div className="fixed inset-0 z-[75] flex justify-end" role="presentation">
          <button type="button" aria-label="Cerrar la ficha" tabIndex={-1} onClick={() => setAbierto(null)} className="absolute inset-0 cursor-default bg-noche/60" />
          <div ref={cajon} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`Ficha de ${lead.nombre}`} className="relative flex h-full w-full max-w-xl flex-col bg-niebla shadow-2xl outline-none">
            <div className="flex items-center justify-between border-b border-linea bg-white px-5 py-4">
              <h2 className="text-2xl font-extrabold">{lead.nombre}</h2>
              <button type="button" onClick={() => setAbierto(null)} className="rounded-full border border-linea px-4 py-2 text-sm font-bold hover:border-noche">Cerrar</button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {lead.accion ? (
                <div className={`rounded-2xl border-2 p-5 ${lead.dias !== null && lead.dias < 0 ? "border-rose-300 bg-rose-50" : "border-amber-200 bg-amber-50"}`}>
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">Lo siguiente que toca</p>
                  <p className="mt-1 text-lg font-extrabold">{lead.accion}</p>
                  <p className={`text-sm font-bold ${lead.dias !== null && lead.dias < 0 ? "text-rose-700" : "text-gris"}`}>{lead.dias !== null && lead.dias < 0 ? "Vencida" : textoDias(lead.dias)}</p>
                  <div className="mt-3 flex gap-2">
                    <input value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Cómo ha ido (opcional): no contesta, lo habla con su pareja…" className="min-w-0 flex-1 rounded-xl border border-linea bg-white px-3 py-2.5 text-sm focus:border-noche focus:outline-none" />
                    <button type="button" onClick={hecho} className="rounded-full bg-estrella px-5 py-2.5 font-extrabold text-tinta hover:bg-estrella-2">Hecho</button>
                  </div>
                  <div className="mt-3 rounded-xl bg-white p-4">
                    <button type="button" onClick={() => setMensaje(mensajeDe(lead))} className="rounded-full bg-noche px-4 py-2 text-sm font-bold text-white hover:bg-noche-2">Escríbeme el mensaje</button>
                    <p className="mt-2 text-xs text-gris">Te lo prepara con lo que hay en la ficha. Tú lo lees, lo cambias si quieres y lo envías.</p>
                    {mensaje && <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={4} className="mt-3 w-full rounded-xl border border-linea p-3 text-sm focus:border-noche focus:outline-none" aria-label="Mensaje preparado" />}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-linea bg-white p-5">
                  <p className="font-extrabold">Sin tareas pendientes</p>
                  <p className="text-sm text-gris">Este contacto no necesita ninguna acción ahora.</p>
                </div>
              )}

              <div className="flex gap-2">
                <button type="button" onClick={() => setAviso("En tu móvil, esto abre la llamada directamente.")} className="rounded-full bg-noche px-5 py-2.5 font-bold text-white">Llamar</button>
                <button type="button" onClick={() => setAviso("En tu móvil, esto abre WhatsApp con el mensaje preparado.")} className="rounded-full bg-emerald-500 px-5 py-2.5 font-bold text-white">WhatsApp</button>
              </div>
              {aviso && <p className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-noche-3" role="status">{aviso}</p>}

              <div className="rounded-2xl border border-linea bg-white p-5">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">En qué punto está</p>
                <p className="mt-1 text-sm text-gris">Toca el paso en que está ahora y pulsa Guardar. El CRM pone solo lo siguiente que toca.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FASES.map((f) => {
                    const c = COLOR_FASE[f];
                    const sel = faseNueva === f;
                    return (
                      <button key={f} type="button" aria-pressed={sel} onClick={() => setFaseNueva(f)} className="rounded-full px-3.5 py-1.5 text-sm font-bold" style={sel ? { background: c.texto, color: "#fff" } : { background: c.fondo, color: c.texto }}>{f}</button>
                    );
                  })}
                </div>
                <button type="button" onClick={guardar} disabled={faseNueva === lead.fase} className="mt-4 rounded-full bg-estrella px-5 py-2.5 font-extrabold text-tinta disabled:opacity-40">Guardar cambios</button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-linea bg-white p-5">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">La persona</p>
                  <dl className="mt-2 space-y-1 text-sm">
                    <div><dt className="inline text-gris">Teléfono: </dt><dd className="inline font-bold">{lead.tel}</dd></div>
                    <div><dt className="inline text-gris">Cómo de decidida está: </dt><dd className="inline font-bold">{lead.calor ?? "Sin valorar"}</dd></div>
                    <div><dt className="inline text-gris">Permiso para escribirle: </dt><dd className="inline font-bold">Sí</dd></div>
                    {lead.prob ? <div><dt className="inline text-gris">Probabilidad de que firme: </dt><dd className="inline font-bold">{lead.prob} %</dd></div> : null}
                  </dl>
                </div>
                <div className="rounded-2xl border border-linea bg-white p-5">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">De dónde viene</p>
                  <dl className="mt-2 space-y-1 text-sm">
                    <div><dt className="inline text-gris">Origen: </dt><dd className="inline font-bold">{lead.origen}</dd></div>
                    <div><dt className="inline text-gris">Lo lleva: </dt><dd className="inline font-bold">{lead.resp}</dd></div>
                    <div><dt className="inline text-gris">Entró: </dt><dd className="inline font-bold">{lead.entro}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="rounded-2xl border border-linea bg-white p-5">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">Lo que quiere</p>
                <p className="mt-2 text-sm font-bold">{lead.trabajo}</p>
                <p className="text-sm text-gris">{lead.zona}{lead.importe ? ` · ${lead.importe.toLocaleString("es-ES")} €` : ""}</p>
              </div>

              <div className="rounded-2xl border border-linea bg-white p-5">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">Seguimiento</p>
                <div className="mt-2 flex gap-2">
                  <input value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Apunta algo de este cliente…" className="min-w-0 flex-1 rounded-xl border border-linea px-3 py-2.5 text-sm focus:border-noche focus:outline-none" aria-label="Nueva nota" />
                  <button type="button" onClick={anadeNota} className="rounded-full border border-linea px-4 py-2.5 text-sm font-bold hover:border-noche">Apuntar</button>
                </div>
                <ul className="mt-3 space-y-2">
                  {lead.notas.map((n, i) => (
                    <li key={i} className="rounded-xl bg-niebla p-3 text-sm">
                      <span className="block text-xs text-gris">{n.cuando} · {n.quien}</span>
                      {n.texto}
                    </li>
                  ))}
                  {lead.notas.length === 0 && <li className="text-sm text-gris">Todavía no hay nada apuntado.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
