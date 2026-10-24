"use client";

import { useEffect, useRef, useState } from "react";

// Asistente con IA, abierto día y noche. Responde en directo con lo que sabe de la web
// y recoge el contacto de quien quiere que le llamemos.
type Mensaje = { role: "user" | "assistant"; content: string };

const SUGERENCIAS = ["¿Qué entra en la cuota?", "¿Cómo podéis cobrar tan poco?", "¿Hay permanencia?", "¿Hacéis tiendas online?"];
const SALUDO = "Hola. Soy el asistente de Casiopea 360. Pregúntame lo que quieras sobre lo que hacemos, cuánto te costaría por separado o cómo empezar.";

// Convierte las rutas internas (/test, /estudio-gratuito...) en enlaces.
function ConEnlaces({ texto }: { texto: string }) {
  const partes = texto.split(/(\s\/[a-z0-9][a-z0-9\-/#]*)/gi);
  return (
    <>
      {partes.map((p, i) => {
        const ruta = p.trim();
        if (/^\/[a-z0-9]/i.test(ruta) && p !== ruta) {
          const limpia = ruta.replace(/[.,;:)]+$/, "");
          const cola = ruta.slice(limpia.length);
          return (
            <span key={i}>
              {" "}
              <a href={limpia} className="font-bold text-noche underline underline-offset-2">{limpia}</a>
              {cola}
            </span>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [formulario, setFormulario] = useState(false);
  const [estadoContacto, setEstadoContacto] = useState<"" | "enviando" | "ok" | "error">("");
  const lista = useRef<HTMLDivElement>(null);
  const entrada = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight });
  }, [mensajes, formulario, estadoContacto]);

  useEffect(() => {
    if (abierto) entrada.current?.focus();
    const cerrar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [abierto]);

  async function enviar(pregunta: string) {
    const q = pregunta.trim();
    if (!q || ocupado) return;
    const nuevos: Mensaje[] = [...mensajes, { role: "user", content: q }];
    setMensajes([...nuevos, { role: "assistant", content: "" }]);
    setTexto("");
    setOcupado(true);
    try {
      const r = await fetch("/api/asistente", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mensajes: nuevos }) });
      if (!r.ok || !r.body) {
        const e = await r.json().catch(() => ({}));
        throw new Error(e.error || "Ahora mismo no puedo responder. Prueba en un rato o pide tu estudio gratuito en /estudio-gratuito.");
      }
      const lector = r.body.getReader();
      const dec = new TextDecoder();
      let acumulado = "";
      for (;;) {
        const { done, value } = await lector.read();
        if (done) break;
        acumulado += dec.decode(value, { stream: true });
        setMensajes([...nuevos, { role: "assistant", content: acumulado }]);
      }
    } catch (e) {
      setMensajes([...nuevos, { role: "assistant", content: e instanceof Error ? e.message : "No he podido responder." }]);
    } finally {
      setOcupado(false);
    }
  }

  async function pedirContacto(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    setEstadoContacto("enviando");
    const r = await fetch("/api/asistente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "contacto", nombre: f.get("nombre"), contacto: f.get("contacto"), consentimiento: f.get("acepto") === "on", mensajes }),
    }).catch(() => null);
    setEstadoContacto(r?.ok ? "ok" : "error");
    if (r?.ok) setFormulario(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-controls="asistente"
        className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full bg-noche py-2.5 pl-2.5 pr-4 font-bold text-white shadow-[0_12px_30px_-8px_rgba(14,26,61,0.6)] ring-2 ring-estrella/70 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <span aria-hidden="true" className="relative block h-9 w-9">
          <img src="/marca/icono.svg" alt="" className="h-9 w-9 rounded-[0.6rem]" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-noche" />
        </span>
        {abierto ? "Cerrar" : "¿Te ayudo?"}
      </button>

      {abierto && (
        <div
          id="asistente"
          role="dialog"
          aria-label="Asistente de Casiopea 360"
          className="fixed inset-x-2 bottom-20 z-[60] flex max-h-[min(640px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_30px_80px_-20px_rgba(14,26,61,0.55)] ring-1 ring-black/10 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[400px]"
        >
          <div className="flex items-center gap-3 bg-[linear-gradient(90deg,#1228be,#0e1a3d)] px-5 py-4 text-white">
            <img src="/marca/icono.svg" alt="" className="h-9 w-9 rounded-[0.6rem]" />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">Asistente de Casiopea 360</p>
              <p className="text-xs text-white/75">Con inteligencia artificial · responde al momento</p>
            </div>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar el asistente" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div ref={lista} className="flex-1 space-y-3 overflow-y-auto bg-niebla px-4 py-4" aria-live="polite">
            <p className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[0.95rem] shadow-sm">{SALUDO}</p>
            {mensajes.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {SUGERENCIAS.map((s) => (
                  <button key={s} type="button" onClick={() => enviar(s)} className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-noche ring-1 ring-noche/15 hover:ring-noche">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {mensajes.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="ml-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-md bg-noche px-4 py-3 text-[0.95rem] text-white">{m.content}</p>
              ) : (
                <div key={i} className="max-w-[88%] whitespace-pre-line rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[0.95rem] shadow-sm">
                  {m.content ? <ConEnlaces texto={m.content.replace(/\*\*/g, "")} /> : <span className="inline-flex gap-1" aria-label="Escribiendo"><span className="h-2 w-2 animate-bounce rounded-full bg-gris" /><span className="h-2 w-2 animate-bounce rounded-full bg-gris [animation-delay:120ms]" /><span className="h-2 w-2 animate-bounce rounded-full bg-gris [animation-delay:240ms]" /></span>}
                </div>
              ),
            )}
            {formulario && (
              <form onSubmit={pedirContacto} className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-extrabold">Te contactamos nosotros</p>
                <label className="block text-sm">
                  Tu nombre
                  <input name="nombre" autoComplete="name" className="mt-1 w-full rounded-xl border border-linea px-3 py-2" />
                </label>
                <label className="block text-sm">
                  Teléfono o correo
                  <input name="contacto" required autoComplete="email" className="mt-1 w-full rounded-xl border border-linea px-3 py-2" />
                </label>
                <label className="flex items-start gap-2 text-xs text-gris">
                  <input type="checkbox" name="acepto" required className="mt-0.5" />
                  <span>Acepto que Casiopea 360 use estos datos solo para contactarme. Más en la <a href="/privacidad" className="underline">política de privacidad</a>.</span>
                </label>
                <button type="submit" disabled={estadoContacto === "enviando"} className="w-full rounded-full bg-estrella py-2.5 font-bold text-tinta hover:bg-estrella-2 disabled:opacity-60">
                  {estadoContacto === "enviando" ? "Enviando..." : "Enviar"}
                </button>
                {estadoContacto === "error" && <p className="text-sm text-rose-700">No se ha podido enviar. Pide tu estudio gratuito en <a href="/estudio-gratuito" className="font-bold underline">/estudio-gratuito</a> y te contestamos igual.</p>}
              </form>
            )}
            {estadoContacto === "ok" && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">Recibido. Te contactamos muy pronto.</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(texto);
            }}
            className="border-t border-linea bg-white p-3"
          >
            <div className="flex items-end gap-2">
              <label htmlFor="asistente-texto" className="sr-only">Escribe tu pregunta</label>
              <textarea
                id="asistente-texto"
                ref={entrada}
                rows={1}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    enviar(texto);
                  }
                }}
                placeholder="Escribe tu pregunta"
                className="max-h-28 flex-1 resize-none rounded-2xl border border-linea px-4 py-2.5 text-[0.95rem] focus:border-noche focus:outline-none"
              />
              <button type="submit" disabled={ocupado || !texto.trim()} aria-label="Enviar" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-noche text-white disabled:opacity-40">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
            {!formulario && estadoContacto !== "ok" && (
              <button type="button" onClick={() => setFormulario(true)} className="mt-2 text-sm font-bold text-noche underline underline-offset-2">
                Que me contacten
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
