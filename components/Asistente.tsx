"use client";

import { useEffect, useRef, useState } from "react";

// Asistente con IA, abierto día y noche. Responde en directo con lo que sabe de la web
// y recoge el contacto de quien quiere que le llamemos.
type Mensaje = { role: "user" | "assistant"; content: string };

// Lo mínimo que usamos del reconocimiento de voz del navegador (no viene en los tipos estándar).
type ResultadoVoz = { isFinal: boolean; 0: { transcript: string } };
type EventoVoz = { resultIndex: number; results: ArrayLike<ResultadoVoz> };
type Reconocedor = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: EventoVoz) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type ConstructorVoz = new () => Reconocedor;
const vozDelNavegador = (): ConstructorVoz | undefined => {
  const w = window as unknown as { SpeechRecognition?: ConstructorVoz; webkitSpeechRecognition?: ConstructorVoz };
  return w.SpeechRecognition || w.webkitSpeechRecognition;
};

const SUGERENCIAS = ["¿Qué entra en la cuota?", "¿Cómo podéis cobrar menos?", "¿Hay permanencia?", "¿Hacéis tiendas online?"];
const SALUDO = "Hola, soy Cas, la asistente de Casiopea 360. Pregúntame lo que quieras sobre lo que hacemos, cuánto te costaría por separado o cómo empezar.";

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
  const [burbuja, setBurbuja] = useState(false);

  // Una sola vez por visita, a los 20 segundos, el asistente saluda con una pregunta útil.
  useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem("casiopea-burbuja") === "1";
    } catch {}
    if (visto) return;
    // Si el aviso de cookies sigue en pantalla, espera a que lo cierren para no taparlo.
    let t: ReturnType<typeof setTimeout>;
    const intentar = () => {
      const aviso = document.querySelector<HTMLElement>("[data-aviso-cookies]");
      if (aviso && aviso.offsetParent !== null) t = setTimeout(intentar, 4000);
      else setBurbuja(true);
    };
    t = setTimeout(intentar, 20000);
    return () => clearTimeout(t);
  }, []);
  const quitarBurbuja = () => {
    setBurbuja(false);
    try {
      sessionStorage.setItem("casiopea-burbuja", "1");
    } catch {}
  };
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [formulario, setFormulario] = useState(false);
  const [estadoContacto, setEstadoContacto] = useState<"" | "enviando" | "ok" | "error">("");
  const lista = useRef<HTMLDivElement>(null);
  const entrada = useRef<HTMLTextAreaElement>(null);

  // Dictado por voz: el navegador convierte lo que dices en texto y, al terminar, se envía la pregunta.
  // Solo se ofrece si el navegador lo soporta (Chrome, Edge, Safari, iPhone); si no, el botón no aparece.
  const [hayVoz, setHayVoz] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [avisoVoz, setAvisoVoz] = useState("");
  const reconocedor = useRef<Reconocedor | null>(null);
  const enviarRef = useRef<(q: string, porVoz?: boolean) => void>(() => {});

  // Cas contesta en voz alta solo si le has hablado tú, y se apaga con un toque (el altavoz de la cabecera).
  // La elección se recuerda en este navegador.
  const [hayAltavoz, setHayAltavoz] = useState(false);
  const [vozActiva, setVozActiva] = useState(true);
  const [hablando, setHablando] = useState(false);
  useEffect(() => {
    setHayAltavoz("speechSynthesis" in window);
    try {
      if (localStorage.getItem("casiopea-voz-cas") === "0") setVozActiva(false);
    } catch {}
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, []);

  function callar() {
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    setHablando(false);
  }

  function decir(texto: string) {
    if (!("speechSynthesis" in window)) return;
    const limpio = texto
      .replace(/\*\*/g, "")
      .replace(/(^|\s)\/([a-z0-9][a-z0-9-]*)/gi, (_, a: string, b: string) => `${a}${b.replace(/-/g, " ")}`)
      .replace(/\s+/g, " ")
      .trim();
    if (!limpio) return;
    callar();
    const u = new SpeechSynthesisUtterance(limpio);
    u.lang = "es-ES";
    u.rate = 1.03;
    const voces = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("es"));
    const mejor =
      voces.find((v) => /m[oó]nica|paulina|helena|laura|elena|marisol|google espa/i.test(v.name) && v.lang.toLowerCase().startsWith("es-es")) ||
      voces.find((v) => v.lang.toLowerCase().startsWith("es-es")) ||
      voces[0];
    if (mejor) u.voice = mejor;
    u.onstart = () => setHablando(true);
    u.onend = () => setHablando(false);
    u.onerror = () => setHablando(false);
    window.speechSynthesis.speak(u);
  }

  function alternarVoz() {
    const nueva = !vozActiva;
    setVozActiva(nueva);
    try {
      localStorage.setItem("casiopea-voz-cas", nueva ? "1" : "0");
    } catch {}
    if (!nueva) callar();
  }
  useEffect(() => {
    setHayVoz(Boolean(vozDelNavegador()));
    return () => {
      try {
        reconocedor.current?.abort();
      } catch {}
    };
  }, []);

  function hablar() {
    if (escuchando) {
      try {
        reconocedor.current?.stop();
      } catch {}
      return;
    }
    const Reco = vozDelNavegador();
    if (!Reco) return;
    setAvisoVoz("");
    callar();
    // En el iPhone el sonido solo se permite si se pide desde un toque: lo "desbloqueamos" aquí.
    try {
      if (vozActiva && "speechSynthesis" in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    } catch {}
    const r = new Reco();
    r.lang = "es-ES";
    r.interimResults = true;
    r.continuous = false;
    let final = "";
    r.onresult = (e) => {
      let parcial = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else parcial += t;
      }
      setTexto((final + parcial).trimStart());
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setAvisoVoz("Para hablar, permite el micrófono en tu navegador. Mientras tanto, puedes escribir.");
      else if (e.error === "no-speech") setAvisoVoz("No te he oído. Toca el micrófono y vuelve a probar.");
      else if (e.error !== "aborted") setAvisoVoz("No he podido escucharte. Puedes escribir tu pregunta.");
    };
    r.onend = () => {
      setEscuchando(false);
      const dicho = final.trim();
      if (dicho) enviarRef.current(dicho, true);
    };
    reconocedor.current = r;
    try {
      r.start();
      setEscuchando(true);
    } catch {
      setEscuchando(false);
    }
  }

  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight });
  }, [mensajes, formulario, estadoContacto]);

  useEffect(() => {
    if (abierto) entrada.current?.focus();
    const cerrar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        try {
          window.speechSynthesis?.cancel();
        } catch {}
        setAbierto(false);
      }
    };
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [abierto]);

  async function enviar(pregunta: string, porVoz = false) {
    const q = pregunta.trim();
    if (!q || ocupado) return;
    callar();
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
      if (porVoz && vozActiva) decir(acumulado);
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

  enviarRef.current = enviar;

  return (
    <>
      {burbuja && !abierto && (
        <div className="burbuja fixed bottom-20 right-4 z-[60] max-w-[16rem] rounded-2xl rounded-br-md bg-white p-4 pr-9 text-sm text-tinta shadow-[0_18px_40px_-12px_rgba(14,26,61,0.5)] ring-1 ring-linea sm:bottom-24 sm:right-6">
          <button type="button" onClick={quitarBurbuja} aria-label="Cerrar el mensaje" className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-gris hover:bg-niebla">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button
            type="button"
            onClick={() => {
              quitarBurbuja();
              setAbierto(true);
            }}
            className="text-left"
          >
            <b className="block">¿Te calculo lo que pagas hoy?</b>
            <span className="text-gris">Dime qué tienes contratado y te digo cuánto te costaría todo por separado.</span>
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          quitarBurbuja();
          setAbierto((a) => !a);
        }}
        aria-expanded={abierto}
        aria-controls="asistente"
        aria-label="Cas, la asistente de Casiopea 360" className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full bg-noche p-2.5 sm:pr-4 font-bold text-white shadow-[0_12px_30px_-8px_rgba(14,26,61,0.6)] ring-2 ring-estrella/70 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <span aria-hidden="true" className="relative block h-9 w-9">
          <img src="/marca/icono.svg" alt="" className="h-9 w-9 rounded-[0.6rem]" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-noche" />
        </span>
        <span className={abierto ? "" : "hidden sm:inline"}>{abierto ? "Cerrar" : "¿Te ayudo?"}</span>
      </button>

      {abierto && (
        <div
          id="asistente"
          role="dialog"
          aria-label="Cas, la asistente de Casiopea 360"
          className="fixed inset-x-2 bottom-20 z-[60] flex max-h-[min(640px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_30px_80px_-20px_rgba(14,26,61,0.55)] ring-1 ring-black/10 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[400px]"
        >
          <div className="flex items-center gap-3 bg-[linear-gradient(90deg,#1228be,#0e1a3d)] px-5 py-4 text-white">
            <img src="/marca/icono.svg" alt="" className="h-9 w-9 rounded-[0.6rem]" />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">Cas, tu asistente</p>
              <p className="text-xs text-white/75">Con inteligencia artificial · responde al momento</p>
            </div>
            {hayAltavoz && (
              <button
                type="button"
                onClick={alternarVoz}
                aria-pressed={vozActiva}
                aria-label={vozActiva ? "Silenciar la voz de Cas" : "Activar la voz de Cas"}
                title={vozActiva ? "Silenciar la voz de Cas" : "Activar la voz de Cas"}
                className={`relative grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 ${hablando ? "bg-white/15" : ""}`}
              >
                {hablando && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-white/20" />}
                <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H3v6h3l5 4V5z" />
                  {vozActiva ? <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /> : <path d="M17 9l5 6M22 9l-5 6" />}
                </svg>
              </button>
            )}
            <button type="button" onClick={() => { callar(); setAbierto(false); }} aria-label="Cerrar el asistente" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">
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
                placeholder={escuchando ? "Te escucho..." : hayVoz ? "Escribe o toca el micrófono" : "Escribe tu pregunta"}
                className="max-h-28 flex-1 resize-none rounded-2xl border border-linea px-4 py-2.5 text-[0.95rem] focus:border-noche focus:outline-none"
              />
              {hayVoz && (
                <button
                  type="button"
                  onClick={hablar}
                  disabled={ocupado}
                  aria-pressed={escuchando}
                  aria-label={escuchando ? "Dejar de escuchar" : "Hablar en vez de escribir"}
                  className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:opacity-40 ${escuchando ? "bg-rose-600 text-white" : "bg-niebla text-noche ring-1 ring-linea"}`}
                >
                  {escuchando && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-rose-500/40" />}
                  <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
                </button>
              )}
              <button type="submit" disabled={ocupado || !texto.trim()} aria-label="Enviar" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-noche text-white disabled:opacity-40">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
            <p role="status" aria-live="polite" className={avisoVoz ? "mt-2 text-sm text-rose-700" : "sr-only"}>{escuchando ? "Escuchando" : avisoVoz}</p>
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
