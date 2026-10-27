"use client";

// Vista sencilla del panel, con el orden de la mesa de control de Reformadísimo: conclusión del día, una sola tarea,
// cómo está cada parte (baterías), las cuatro cifras, "Pregunta lo que quieras" y una barra inferior. TODO ES DE DEMOSTRACIÓN.
import { useState } from "react";
import { GuiaInicio, LUZ, type Luz, type Modulo, type Vista } from "@/components/PanelModulos";
import { ATAJOS_PREGUNTA, responderPanel } from "@/components/PanelMandos";

type Props = {
  modulos: Modulo[];
  ir: (id: string) => void;
  navegar: (v: Vista) => void;
  periodo: string;
  setPeriodo: (p: string) => void;
  periodos: [string, string][];
  periodoTxt: string;
  contactos: number;
  comp: "anterior" | "ano" | "nada";
  ahora: number;
  leer: () => void;
  leyendo: boolean;
  revisado: boolean;
  marcarRevisado: () => void;
};

const AMARILLO = "#ffde00";
const GRAVEDAD: Record<Luz, number> = { problema: 4, atencion: 3, sinconectar: 2, ok: 1, preparado: 0 };

const AREAS: { g: string; nombre: string; destino: string; boton: string }[] = [
  { g: "web", nombre: "La web", destino: "lupa", boton: "Ver con la lupa" },
  { g: "dicen", nombre: "Reputación e IA", destino: "espejo", boton: "Ver las consultas" },
  { g: "mercado", nombre: "Competencia", destino: "vigia", boton: "Ver cambios" },
  { g: "anuncios", nombre: "Anuncios", destino: "campanas", boton: "Ver las campañas" },
  { g: "tuyo", nombre: "Ventas", destino: "crm", boton: "Ver Lo tuyo" },
];

function Bateria({ luz }: { luz: Luz }) {
  const llenos = luz === "problema" ? 1 : luz === "atencion" ? 2 : luz === "sinconectar" ? 0 : 3;
  const c = LUZ[luz].color;
  return (
    <svg viewBox="0 0 60 28" className="h-7 w-14 shrink-0" aria-hidden>
      <rect x="1.5" y="3" width="52" height="22" rx="6" fill="none" stroke={c} strokeWidth="2.5" />
      <rect x="55" y="10" width="4" height="8" rx="1.5" fill={c} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={6 + i * 15.5} y="7.5" width="12" height="13" rx="2.5" fill={i < llenos ? c : "#e2e8f0"} />
      ))}
    </svg>
  );
}

function Punto({ luz }: { luz: Luz }) {
  return <span aria-hidden className="mt-1.5 inline-block h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: LUZ[luz].color, boxShadow: `0 0 0 4px ${LUZ[luz].color}22` }} />;
}

function Cifra({ titulo, texto, luz, ayuda }: { titulo: string; texto: string; luz: Luz; ayuda: string }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="rounded-2xl border border-linea bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <Punto luz={luz} />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold leading-snug">{titulo}</p>
          <p className="mt-1 text-sm text-gris">{texto}</p>
          <p className="mt-1 text-sm font-bold" style={{ color: LUZ[luz].color }}>{LUZ[luz].texto}</p>
        </div>
        <button type="button" onClick={() => setAbierta((x) => !x)} aria-expanded={abierta} aria-label={`Qué significa: ${titulo}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-linea font-extrabold text-gris hover:bg-niebla">?</button>
      </div>
      {abierta && <p className="mt-3 rounded-xl bg-niebla p-3 text-sm">{ayuda}</p>}
    </div>
  );
}

export default function PanelSimple(p: Props) {
  const [ayuda, setAyuda] = useState(false);
  const [cambiar, setCambiar] = useState(false);
  const [mas, setMas] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState<string | null>(null);

  const urgentes = p.modulos.filter((m) => m.luz === "problema");
  const atencion = p.modulos.filter((m) => m.luz === "atencion");
  const aviso = urgentes.length ? urgentes : atencion;
  const nivel: Luz = urgentes.length ? "problema" : atencion.length ? "atencion" : "ok";
  const fondo = nivel === "problema" ? "#fdecec" : nivel === "atencion" ? "#fff6e5" : "#e9f7ef";
  const numero = ["", "una cosa", "dos cosas", "tres cosas", "cuatro cosas"][aviso.length] ?? `${aviso.length} cosas`;
  const titular = nivel === "ok" ? "Hoy no hay nada urgente" : nivel === "problema" ? `Hay ${numero} importantes` : `Hay ${numero} que piden un vistazo`;
  const sube = p.comp === "nada" ? "Sin comparar." : p.comp === "ano" ? "Un 16 % más que el mismo periodo del año pasado." : "Un 16 % más que el periodo anterior.";
  const antes = p.comp === "nada" ? "Sin comparar." : "Antes eran 11 €.";

  const preguntar = (q: string) => {
    setPregunta(q);
    setRespuesta(responderPanel(q));
  };
  const bajar = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });

  return (
    <div className="pb-28 pt-24 sm:pt-28">
      <div className="rounded-2xl px-5 py-3 text-sm font-bold text-tinta" style={{ background: AMARILLO }}>
        Panel de demostración con datos inventados de una empresa de ejemplo. Así verás el tuyo, con tus datos reales, en tiempo real y desde el móvil.
      </div>

      <header className="mt-6">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-gris">Climatización Ejemplo · panel de control</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-5xl">Cómo va Climatización Ejemplo</h1>
        <p className="mt-2 text-gris">
          {p.periodoTxt}{p.comp === "nada" ? "" : p.comp === "ano" ? ", comparado con el mismo periodo del año pasado" : ", comparado con el periodo anterior"} · actualizado hoy · {p.ahora} personas en tu web ahora
        </p>
        <p className="mt-1 text-sm text-gris">Casiopea te pone en el siguiente nivel: toda tu visión 360 en una pantalla.</p>
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <button type="button" onClick={p.leer} aria-pressed={p.leyendo} className="min-h-11 rounded-full border border-linea bg-white px-5 text-sm font-bold hover:bg-niebla">{p.leyendo ? "Parar" : "Oír resumen"}</button>
          <button type="button" onClick={() => setAyuda((x) => !x)} aria-expanded={ayuda} className="min-h-11 rounded-full border border-linea bg-white px-5 text-sm font-bold hover:bg-niebla">Ayuda</button>
          <button type="button" onClick={() => setCambiar((x) => !x)} aria-expanded={cambiar} className="min-h-11 rounded-full border border-linea bg-white px-5 text-sm font-bold hover:bg-niebla">Cambiar periodo</button>
          <button type="button" onClick={() => p.navegar({ todo: true })} className="min-h-11 rounded-full bg-noche px-5 text-sm font-bold text-white hover:bg-noche-2">Todas las cifras</button>
        </div>
        {cambiar && (
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Periodo">
            {p.periodos.map(([id, t]) => (
              <button key={id} type="button" aria-pressed={p.periodo === id} onClick={() => p.setPeriodo(id)} className={`min-h-11 rounded-full px-4 text-sm font-bold ${p.periodo === id ? "text-tinta" : "border border-linea bg-white hover:bg-niebla"}`} style={p.periodo === id ? { background: AMARILLO } : undefined}>{t}</button>
            ))}
          </div>
        )}
        {ayuda && <div className="mt-4"><GuiaInicio forzar /></div>}
      </header>

      <section aria-label="Resumen de hoy" className="mt-6 rounded-3xl p-5 sm:p-7" style={{ background: fondo }}>
        <div className="flex items-start gap-3">
          <Punto luz={nivel} />
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{titular}</h2>
            {nivel === "ok" ? (
              <p className="mt-2">Han llegado {p.contactos} contactos en este periodo, a 10 € cada uno. {sube}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {aviso.map((m) => (
                  <li key={m.id} className="flex gap-2"><span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" /><span><b>{m.nombre}.</b> {m.conclusion}</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button type="button" onClick={() => bajar("pn-tarea")} className="mt-4 min-h-11 rounded-full px-6 text-sm font-extrabold text-tinta" style={{ background: AMARILLO }}>Ver lo más importante</button>
      </section>

      <section id="pn-tarea" aria-label="Lo primero que haría hoy" className="mt-5 scroll-mt-24 rounded-3xl border-2 bg-white p-5 sm:p-7" style={{ borderColor: AMARILLO }}>
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-gris">Lo primero que haría hoy</p>
        <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">Llamar a los 3 contactos que llevan más de 3 días sin respuesta</h2>
        <p className="mt-1 text-gris">Por qué: cuanto antes se llama, más se convierte. Dónde: en tu CRM, en Lo tuyo.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => p.ir("crm")} className="min-h-11 rounded-full px-6 text-sm font-extrabold text-tinta" style={{ background: AMARILLO }}>Ir a llamarlos</button>
          <button type="button" onClick={p.marcarRevisado} disabled={p.revisado} className="min-h-11 rounded-full border border-linea bg-white px-5 text-sm font-bold hover:bg-niebla disabled:opacity-60">{p.revisado ? "Revisado. Se olvida a los 7 días" : "Ya lo he revisado"}</button>
        </div>
        <button type="button" onClick={() => setMas((x) => !x)} aria-expanded={mas} className="mt-4 min-h-11 text-sm font-extrabold underline underline-offset-4">{mas ? "Ocultar la otra acción" : "Hay 1 acción más"}</button>
        {mas && (
          <div className="mt-2 rounded-2xl bg-niebla p-4">
            <p className="font-extrabold">Contestar las 2 reseñas nuevas de tu ficha de Google</p>
            <p className="mt-1 text-sm text-gris">Por qué: más reseñas contestadas ayudan a que te elijan. Dónde: en Redes y reseñas. Te dejamos la respuesta redactada en Tus peticiones.</p>
            <button type="button" onClick={() => p.ir("redes")} className="mt-3 min-h-11 rounded-full px-5 text-sm font-extrabold text-tinta" style={{ background: AMARILLO }}>Ver las reseñas</button>
          </div>
        )}
      </section>

      <section id="pn-estado" aria-label="Cómo está cada parte" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-extrabold">Cómo está cada parte</h2>
        <p className="mt-1 text-sm text-gris">Batería llena y verde, todo bien; naranja, mira esto; roja, importante; azul, son datos de tu negocio. Pulsa cada una para ver el detalle.</p>
        <ul className="mt-4 space-y-3">
          {AREAS.map((a) => {
            const ms = p.modulos.filter((m) => m.grupo === a.g);
            const peor = ms.slice().sort((x, y) => GRAVEDAD[y.luz] - GRAVEDAD[x.luz])[0];
            if (!peor) return null;
            const luz: Luz = ms.some((m) => m.luz === "problema") ? "problema" : ms.some((m) => m.luz === "atencion") ? "atencion" : ms.every((m) => m.luz === "preparado") ? "preparado" : "ok";
            return (
              <li key={a.g} className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-linea bg-white p-4 sm:p-5">
                <Bateria luz={luz} />
                <div className="min-w-0 flex-1 basis-56">
                  <p className="font-extrabold"><span className="text-lg">{a.nombre}</span> <span className="ml-1 text-sm" style={{ color: LUZ[luz].color }}>{LUZ[luz].texto}</span></p>
                  <p className="text-sm text-gris">{peor.conclusion}</p>
                </div>
                <button type="button" onClick={() => p.ir(a.destino)} className="min-h-11 rounded-full px-5 text-sm font-extrabold text-tinta" style={{ background: AMARILLO }}>{a.boton}</button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-label="Las cuatro cifras que importan" className="mt-8">
        <h2 className="text-2xl font-extrabold">Las cuatro cifras que importan</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Cifra titulo={`${p.contactos} personas se han puesto en contacto`} texto={sube} luz="ok" ayuda="Son las personas que te han escrito, llamado o pedido presupuesto desde tu web, tus anuncios o Google. Lo medimos solos." />
          <Cifra titulo="54 de cada 100 piden presupuesto de verdad" texto="Es mejor que en el periodo anterior." luz="ok" ayuda="De todos los que te contactan, estos son los que de verdad quieren un presupuesto y no solo una duda." />
          <Cifra titulo="10 € por contacto" texto={antes} luz="ok" ayuda="Lo que has invertido en anuncios dividido entre los contactos que han llegado. Cuanto más bajo, mejor." />
          <Cifra titulo="Sales en 16 de 18 respuestas de las IA" texto="En 2 preguntas todavía no." luz="atencion" ayuda="Preguntamos cada semana a ChatGPT, Gemini y Claude lo que preguntaría un cliente, y contamos en cuántas respuestas apareces." />
        </div>
      </section>

      <section id="pn-pregunta" aria-label="Pregunta lo que quieras" className="mt-8 scroll-mt-24 rounded-3xl border border-linea bg-white p-5 sm:p-7">
        <h2 className="text-2xl font-extrabold">Pregunta lo que quieras</h2>
        <p className="mt-1 text-sm text-gris">Escribe o dicta tu pregunta como se la harías a una persona. Contesta solo con los datos de tu panel.</p>
        <form className="mt-4 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (pregunta.trim()) preguntar(pregunta); }}>
          <input value={pregunta} onChange={(e) => setPregunta(e.target.value)} aria-label="Tu pregunta" placeholder="Por ejemplo: ¿qué canal me trae más contactos?" className="h-12 min-w-0 flex-1 basis-60 rounded-full border border-linea bg-white px-5 text-[15px]" />
          <button type="submit" className="min-h-12 rounded-full px-6 text-sm font-extrabold text-tinta" style={{ background: AMARILLO }}>Preguntar</button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {ATAJOS_PREGUNTA.map((q) => <button key={q} type="button" onClick={() => preguntar(q)} className="min-h-11 rounded-full border border-linea bg-niebla px-4 text-sm font-bold hover:bg-slate-200">{q}</button>)}
        </div>
        {respuesta && <div role="status" className="mt-4 rounded-2xl bg-niebla p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-gris">Respuesta de ejemplo</p><p className="mt-1">{respuesta}</p></div>}
        <p className="mt-3 text-xs text-gris">En esta demostración las respuestas están preparadas. En tu panel, cada pregunta tiene un coste pequeño por uso que va aparte de la cuota; te decimos cuánto antes de activarlo.</p>
      </section>

      <section id="pn-mas" aria-label="Más herramientas" className="mt-8 rounded-3xl border border-linea bg-white p-5 sm:p-7">
        <h2 className="text-2xl font-extrabold">Más herramientas</h2>
        <p className="mt-1 text-sm text-gris">Todas las secciones del panel: la web, lo que dicen de ti, tu mercado, tus anuncios, lo tuyo, tus peticiones, avisos, resúmenes por correo y el histórico.</p>
        <button type="button" onClick={() => p.navegar({ todo: true })} className="mt-4 min-h-11 rounded-full bg-noche px-6 text-sm font-bold text-white hover:bg-noche-2">Abrir</button>
      </section>

      <nav aria-label="Panel" className="fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-white/95 backdrop-blur print:hidden">
        <ul className="mx-auto grid max-w-xl grid-cols-4 pr-20 sm:pr-0">
          {([["Hoy", () => window.scrollTo({ top: 0 })], ["Estado", () => bajar("pn-estado")], ["Preguntar", () => bajar("pn-pregunta")], ["Más", () => p.navegar({ todo: true })]] as [string, () => void][]).map(([t, f]) => (
            <li key={t}><button type="button" onClick={f} className="min-h-14 w-full text-sm font-extrabold hover:bg-niebla">{t}</button></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
