"use client";

// Vista sencilla del panel, con el orden y el aspecto de la mesa de control de Reformadísimo: conclusión del día,
// una sola tarea, cómo está cada parte (baterías), las cuatro cifras, "Pregunta lo que quieras" y una barra inferior en el móvil.
// TODO ES DE DEMOSTRACIÓN.
import { useRef, useState } from "react";
import { GuiaInicio, LUZ, type Luz, type Modulo, type Vista } from "@/components/PanelModulos";
import { ATAJOS_PREGUNTA, responderPanel } from "@/components/PanelMandos";
import { AMARILLO, BORDE, rangoDe } from "@/components/PanelMesa";

type Props = {
  modulos: Modulo[];
  ir: (id: string) => void;
  navegar: (v: Vista) => void;
  periodo: string;
  setPeriodo: (p: string) => void;
  periodos: [string, string][];
  contactos: number;
  comp: "anterior" | "ano" | "nada";
  desde: string;
  hasta: string;
  ahora: number;
  leer: () => void;
  leyendo: boolean;
  revisado: boolean;
  marcarRevisado: () => void;
};

const GRAVEDAD: Record<Luz, number> = { problema: 4, atencion: 3, sinconectar: 2, ok: 1, preparado: 0 };

const AREAS: { g: string; nombre: string; destino: string; boton: string }[] = [
  { g: "web", nombre: "La web", destino: "lupa", boton: "Ver con la lupa" },
  { g: "dicen", nombre: "Reputación e IA", destino: "espejo", boton: "Ver las consultas" },
  { g: "mercado", nombre: "Competencia", destino: "vigia", boton: "Ver cambios" },
  { g: "anuncios", nombre: "Anuncios", destino: "campanas", boton: "Ver las campañas" },
  { g: "tuyo", nombre: "Ventas", destino: "crm", boton: "Ver recorrido comercial" },
];

function Bateria({ luz }: { luz: Luz }) {
  const llenos = luz === "problema" ? 1 : luz === "atencion" ? 2 : luz === "sinconectar" ? 0 : 3;
  const c = LUZ[luz].color;
  return (
    <svg viewBox="0 0 60 28" className="h-7 w-[3.4rem] shrink-0" aria-hidden>
      <rect x="1.5" y="3" width="52" height="22" rx="7" fill="none" stroke={c} strokeWidth="2.2" />
      <rect x="55" y="10" width="4" height="8" rx="1.5" fill={c} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={6 + i * 15.5} y="7.5" width="12" height="13" rx="2.5" fill={i < llenos ? c : "#eae6da"} />
      ))}
    </svg>
  );
}

function Punto({ luz, grande = false }: { luz: Luz; grande?: boolean }) {
  const t = grande ? 18 : 16;
  return <span aria-hidden className="mt-1.5 inline-block shrink-0 rounded-full" style={{ width: t, height: t, background: LUZ[luz].color, boxShadow: `0 0 0 4px ${LUZ[luz].color}26` }} />;
}

function Cifra({ titulo, texto, luz, ayuda, estado }: { titulo: string; texto: string; luz: Luz; ayuda: string; estado?: string }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="rounded-[20px] border bg-white p-4 sm:p-5" style={{ borderColor: BORDE }}>
      <div className="flex items-start gap-3">
        <Punto luz={luz} />
        <div className="min-w-0 flex-1">
          <p className="sans text-[19px] leading-snug">{titulo}</p>
          <p className="mt-1 text-[15px] text-gris">{texto}</p>
          <p className="mt-1 text-[15px] font-bold" style={{ color: LUZ[luz].color }}>{estado ?? LUZ[luz].texto}</p>
        </div>
        <button type="button" onClick={() => setAbierta((x) => !x)} aria-expanded={abierta} aria-label={`Qué significa: ${titulo}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border font-bold text-gris hover:bg-[#f3efe6]" style={{ borderColor: BORDE }}>?</button>
      </div>
      {abierta && <p className="mt-3 rounded-xl p-3 text-[15px]" style={{ background: "#f3efe6" }}>{ayuda}</p>}
    </div>
  );
}

type Reconocimiento = { start: () => void; stop: () => void; lang: string; interimResults: boolean; onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null };

export default function PanelSimple(p: Props) {
  const [ayuda, setAyuda] = useState(false);
  const [cambiar, setCambiar] = useState(false);
  const [mas, setMas] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [dictando, setDictando] = useState(false);
  const [sinDictado, setSinDictado] = useState(false);
  const rec = useRef<Reconocimiento | null>(null);

  const rango = rangoDe(p.periodo, p.desde, p.hasta, p.comp);
  const urgentes = p.modulos.filter((m) => m.luz === "problema");
  const atencion = p.modulos.filter((m) => m.luz === "atencion");
  const aviso = urgentes.length ? urgentes : atencion;
  const nivel: Luz = urgentes.length ? "problema" : atencion.length ? "atencion" : "ok";
  const fondo = nivel === "problema" ? "#fbecea" : nivel === "atencion" ? "#fcf2dd" : "#e9f4ec";
  const numero = ["", "una cosa", "dos cosas", "tres cosas", "cuatro cosas"][aviso.length] ?? `${aviso.length} cosas`;
  const titular = nivel === "ok" ? "Hoy no hay nada urgente" : nivel === "problema" ? `Hay ${numero} importantes` : `Hay ${numero} que piden un vistazo`;
  const sube = p.comp === "nada" ? "Sin comparar." : p.comp === "ano" ? "Un 26 % más que el mismo periodo del año pasado." : "Un 16 % más que el periodo anterior.";
  const antes = p.comp === "nada" ? "Sin comparar." : "Antes eran 11 €.";
  const compTxt = p.comp === "nada" ? "" : p.comp === "ano" ? `, comparado con el mismo periodo del año pasado` : `, comparado con los ${rango.antDias} anteriores`;
  const periodoNombre = p.periodos.find(([id]) => id === p.periodo)?.[1] ?? "Este mes";

  const preguntar = (q: string) => { setPregunta(q); setRespuesta(responderPanel(q)); };
  const bajar = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start" });

  const dictar = () => {
    try {
      const W = window as unknown as { SpeechRecognition?: new () => Reconocimiento; webkitSpeechRecognition?: new () => Reconocimiento };
      const R = W.SpeechRecognition ?? W.webkitSpeechRecognition;
      if (!R) { setSinDictado(true); return; }
      if (dictando) { rec.current?.stop(); return; }
      const r = new R();
      r.lang = "es-ES";
      r.interimResults = false;
      r.onresult = (e) => { const t = e.results[0][0].transcript; setPregunta(t); preguntar(t); };
      r.onend = () => setDictando(false);
      r.onerror = () => { setDictando(false); setSinDictado(true); };
      rec.current = r;
      setDictando(true);
      r.start();
    } catch { setSinDictado(true); }
  };

  const chip = "min-h-11 rounded-full border bg-white px-5 text-[15px] font-semibold hover:bg-[#f3efe6]";

  return (
    <div className="pb-28 pt-6">
      <header>
        <p className="sans-ey">Climatización Ejemplo · panel de control</p>
        <h1 className="mt-2 text-[34px] leading-[1.1] sm:text-[42px]">Cómo va Climatización Ejemplo</h1>
        <p className="mt-2 text-[15px] text-gris">{periodoNombre}{compTxt} · actualizado hoy · {p.ahora} personas en tu web ahora</p>
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <button type="button" onClick={p.leer} aria-pressed={p.leyendo} className={chip} style={{ borderColor: p.leyendo ? "#1a3d47" : BORDE }}>{p.leyendo ? "Parar" : "Oír resumen"}</button>
          <button type="button" onClick={() => setAyuda((x) => !x)} aria-expanded={ayuda} className={chip} style={{ borderColor: BORDE }}>Ayuda</button>
          <button type="button" onClick={() => setCambiar((x) => !x)} aria-expanded={cambiar} className={`${chip} text-gris`} style={{ borderColor: BORDE }}>Cambiar periodo</button>
        </div>
        {cambiar && (
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Periodo">
            {p.periodos.map(([id, t]) => (
              <button key={id} type="button" aria-pressed={p.periodo === id} onClick={() => p.setPeriodo(id)} className="min-h-11 rounded-full border px-4 text-[15px] font-semibold" style={p.periodo === id ? { background: AMARILLO, borderColor: AMARILLO } : { background: "#fff", borderColor: BORDE }}>{t}</button>
            ))}
          </div>
        )}
        {ayuda && <div className="mt-4"><GuiaInicio forzar /></div>}
      </header>

      <section aria-label="Resumen de hoy" className="mt-5 rounded-[22px] p-5 sm:p-6" style={{ background: fondo }}>
        <div className="flex items-start gap-3">
          <Punto luz={nivel} grande />
          <div className="min-w-0">
            <h2 className="text-[26px] sm:text-[30px]">{titular}</h2>
            {nivel === "ok" ? (
              <p className="mt-2">Han llegado {p.contactos} contactos en este periodo, a 10 € cada uno. {sube}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {aviso.map((m) => (
                  <li key={m.id} className="flex gap-2.5"><span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" /><span>{m.nombre}: {m.conclusion}</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button type="button" onClick={() => bajar("pn-tarea")} className="mt-4 min-h-11 rounded-full px-6 text-[15.5px] font-semibold" style={{ background: AMARILLO }}>Ver lo más importante</button>
      </section>

      <section id="pn-tarea" aria-label="Lo primero que haría hoy" className="mt-4 scroll-mt-6 rounded-[22px] border-[1.6px] bg-white p-5 sm:p-6" style={{ borderColor: AMARILLO }}>
        <p className="sans-ey">Lo primero que haría hoy</p>
        <h2 className="sans mt-2 text-[20px] leading-snug">Llamar a los 3 contactos que llevan más de 3 días sin respuesta</h2>
        <p className="mt-1 text-[15px] text-gris">Cuanto antes se llama, más se convierte. Está en «Lo tuyo», en tu CRM.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => p.ir("crm")} className="min-h-11 rounded-full px-5 text-[15px] font-semibold" style={{ background: AMARILLO }}>Ir a llamarlos</button>
          <button type="button" onClick={p.marcarRevisado} disabled={p.revisado} className="min-h-11 rounded-full border px-5 text-[15px] font-semibold disabled:opacity-60" style={{ borderColor: BORDE }}>{p.revisado ? "Revisado. Se olvida a los 7 días" : "Ya lo he revisado"}</button>
        </div>
        <button type="button" onClick={() => setMas((x) => !x)} aria-expanded={mas} className="mt-3 min-h-11 text-[15px] font-bold underline underline-offset-4">{mas ? "Ocultar la otra acción" : "Hay 3 acciones más"}</button>
        {mas && (
          <ul className="mt-2 space-y-2">
            {[["Contestar las 2 reseñas nuevas de tu ficha de Google", "Te dejamos la respuesta redactada en Tus peticiones.", "redes", "Ver las reseñas"], ["Mirar la Lupa 360 de la portada", "El 23 % de los toques no llevan a ningún sitio.", "lupa", "Ver con la lupa"], ["Revisar el Espejo de la IA", "En 2 de 18 preguntas todavía no sales.", "espejo", "Ver las consultas"]].map(([t, d, id, b]) => (
              <li key={id} className="rounded-2xl p-4" style={{ background: "#f3efe6" }}>
                <p className="sans">{t}</p>
                <p className="text-[15px] text-gris">{d}</p>
                <button type="button" onClick={() => p.ir(id)} className="mt-2 min-h-10 rounded-full px-5 text-[15px] font-semibold" style={{ background: AMARILLO }}>{b}</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="pn-estado" aria-label="Cómo está cada parte" className="mt-8 scroll-mt-6">
        <h2 className="text-[28px]">Cómo está cada parte</h2>
        <p className="mt-1 text-[15px] text-gris">Batería llena y verde, todo bien; naranja, mira esto; roja, importante; azul, son datos de tu negocio. Pulsa cada una para ver el detalle.</p>
        <ul className="mt-4 space-y-3">
          {AREAS.map((a) => {
            const ms = p.modulos.filter((m) => m.grupo === a.g);
            const peor = ms.slice().sort((x, y) => GRAVEDAD[y.luz] - GRAVEDAD[x.luz])[0];
            if (!peor) return null;
            const luz: Luz = ms.some((m) => m.luz === "problema") ? "problema" : ms.some((m) => m.luz === "atencion") ? "atencion" : ms.every((m) => m.luz === "preparado") ? "preparado" : "ok";
            return (
              <li key={a.g} className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[20px] border bg-white p-4 sm:px-5" style={{ borderColor: BORDE }}>
                <Bateria luz={luz} />
                <div className="min-w-0 flex-1 basis-56">
                  <p className="leading-tight"><span className="sans text-[18px]">{a.nombre}</span> <span className="ml-1 text-[14px] font-semibold" style={{ color: LUZ[luz].color }}>{LUZ[luz].texto}</span></p>
                  <p className="mt-0.5 text-[15px] text-gris">{peor.conclusion}</p>
                </div>
                <button type="button" onClick={() => p.ir(a.destino)} className="min-h-11 rounded-full px-5 text-[15px] font-semibold" style={{ background: AMARILLO }}>{a.boton}</button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-label="Las cuatro cifras que importan" className="mt-8">
        <h2 className="text-[28px]">Las cuatro cifras que importan</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Cifra titulo={`${p.contactos} personas se han puesto en contacto`} texto={sube} luz="ok" ayuda="Son las personas que te han escrito, llamado o pedido presupuesto desde tu web, tus anuncios o Google. Lo medimos solos." />
          <Cifra titulo="54 piden presupuesto de cada 100" texto="Es mejor que en el periodo anterior." luz="ok" ayuda="De todos los que te contactan, estos son los que de verdad quieren un presupuesto y no solo una duda." />
          <Cifra titulo="10 € por contacto anunciado" texto={antes} luz="ok" ayuda="Lo que has invertido en anuncios dividido entre los contactos que han llegado. Cuanto más bajo, mejor." />
          <Cifra titulo="Sales en 16 de 18 respuestas de las IA" texto="En 2 preguntas todavía no." luz="atencion" ayuda="Preguntamos cada semana a ChatGPT, Gemini y Claude lo que preguntaría un cliente, y contamos en cuántas respuestas apareces." />
        </div>
      </section>

      <section id="pn-pregunta" aria-label="Pregunta lo que quieras" className="mt-8 scroll-mt-6 rounded-[20px] border bg-white p-5 sm:p-6" style={{ borderColor: BORDE }}>
        <h2 className="text-[28px]">Pregunta lo que quieras</h2>
        <p className="mt-1 text-[15px] text-gris">Escribe o dicta tu pregunta como se la harías a una persona. Contesta con los datos de {rango.antDias === "1 día" ? "hoy" : `los últimos ${rango.antDias}`}.</p>
        <form className="mt-4 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (pregunta.trim()) preguntar(pregunta); }}>
          <input value={pregunta} onChange={(e) => setPregunta(e.target.value)} aria-label="Tu pregunta" placeholder="Escribe aquí tu pregunta" className="h-12 min-w-0 flex-1 basis-56 rounded-full border px-5 text-[15px]" style={{ borderColor: BORDE, background: "#fbf8ef" }} />
          <button type="button" onClick={dictar} aria-pressed={dictando} className="min-h-12 rounded-full border bg-white px-5 text-[15px] font-bold" style={{ borderColor: BORDE }}>{dictando ? "Escuchando" : "Dictar"}</button>
          <button type="submit" className="min-h-12 rounded-full px-6 text-[15px] font-bold" style={{ background: AMARILLO, opacity: pregunta.trim() ? 1 : 0.55 }}>Preguntar</button>
        </form>
        {sinDictado && <p className="mt-2 text-sm text-gris">Este navegador no deja dictar desde aquí. Puedes usar el micrófono de tu teclado.</p>}
        <p className="mt-4 text-[15px] font-semibold text-gris">O pulsa una de estas:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ATAJOS_PREGUNTA.map((q) => <button key={q} type="button" onClick={() => preguntar(q)} className="min-h-11 rounded-full border px-4 text-[15px]" style={{ borderColor: BORDE, background: "#fbf8ef" }}>{q}</button>)}
        </div>
        {respuesta && <div role="status" className="mt-4 rounded-2xl p-4" style={{ background: "#f3efe6" }}><p className="sans-ey">Respuesta de ejemplo</p><p className="mt-1">{respuesta}</p></div>}
        <p className="mt-3 text-xs text-gris">En esta demostración las respuestas están preparadas. En tu panel, cada pregunta tiene un coste pequeño por uso que va aparte de la cuota; te decimos cuánto antes de activarlo.</p>
      </section>

      <div className="mt-8 text-center print:hidden">
        <button type="button" onClick={() => p.navegar({ todo: true })} className="min-h-12 rounded-full border-2 bg-white px-7 text-[16px] font-bold" style={{ borderColor: "#1a3d47" }}>Ver todas las cifras y gráficas</button>
        <p className="mt-3 text-[15px] text-gris">Ahí están los canales, las campañas, los recorridos paso a paso y las fechas a elegir.</p>
      </div>

      <section id="pn-mas" aria-label="Más herramientas" className="mt-8 rounded-[20px] border bg-white p-5 sm:p-6" style={{ borderColor: BORDE }}>
        <h2 className="text-[28px]">Más herramientas</h2>
        <p className="mt-1 text-[15px] text-gris">La lupa, el Control 360, el Espejo de la IA, el Vigía, el índice de valor, los avisos, los resúmenes por correo y todas las secciones del panel.</p>
        <button type="button" onClick={() => { p.navegar({ todo: true }); setTimeout(() => document.getElementById("pn-herramientas")?.scrollIntoView({ block: "start" }), 120); }} className="mt-4 min-h-11 rounded-full px-6 text-[15px] font-bold text-white" style={{ background: "#1a3d47" }}>Abrir</button>
      </section>

      <nav aria-label="Panel" className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur md:hidden print:hidden" style={{ borderColor: BORDE }}>
        <ul className="mx-auto grid max-w-xl grid-cols-4">
          {([["Hoy", () => window.scrollTo({ top: 0 })], ["Estado", () => bajar("pn-estado")], ["Preguntar", () => bajar("pn-pregunta")], ["Más", () => bajar("pn-mas")]] as [string, () => void][]).map(([t, f]) => (
            <li key={t}><button type="button" onClick={f} className="min-h-14 w-full text-[15px] font-bold hover:bg-[#f3efe6]">{t}</button></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
