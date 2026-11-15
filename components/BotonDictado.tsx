"use client";

// Botón «Hablar» para cualquier caja de texto: dicta con el reconocimiento de voz del propio navegador.
// Coste cero y sin servidor nuestro: la voz la convierte en texto el navegador (Google Chrome, Apple Safari...) y nosotros solo recibimos el texto.
// Si el navegador no sabe dictar, el botón no se enseña. El texto dictado se añade al final de la caja; la persona lo revisa y lo envía ella.
import { useEffect, useRef, useState } from "react";

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

function vozDelNavegador(): ConstructorVoz | undefined {
  const w = window as unknown as { SpeechRecognition?: ConstructorVoz; webkitSpeechRecognition?: ConstructorVoz };
  return w.SpeechRecognition || w.webkitSpeechRecognition;
}

// Pone texto en una caja (con o sin estado de React) y avisa de que ha cambiado.
function escribirEn(caja: HTMLTextAreaElement, texto: string) {
  const poner = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  poner?.call(caja, texto);
  caja.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function BotonDictado({ destino, className = "" }: { destino: React.RefObject<HTMLTextAreaElement | null>; className?: string }) {
  const [hay, setHay] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [aviso, setAviso] = useState("");
  const reco = useRef<Reconocedor | null>(null);

  useEffect(() => {
    setHay(Boolean(vozDelNavegador()));
    return () => {
      try {
        reco.current?.abort();
      } catch {}
    };
  }, []);

  if (!hay) return null;

  function alternar() {
    if (escuchando) {
      try {
        reco.current?.stop();
      } catch {}
      return;
    }
    const Reco = vozDelNavegador();
    const caja = destino.current;
    if (!Reco || !caja) return;
    setAviso("");
    const r = new Reco();
    r.lang = "es-ES";
    r.interimResults = true;
    r.continuous = true;
    // Lo que había escrito antes se respeta: lo dictado se añade detrás.
    const antes = caja.value.trim();
    const base = antes ? `${antes} ` : "";
    let final = "";
    r.onresult = (e) => {
      let parcial = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else parcial += t;
      }
      const limite = caja.maxLength > 0 ? caja.maxLength : 100000;
      escribirEn(caja, (base + final + parcial).slice(0, limite));
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setAviso("Para hablar, permite el micrófono en tu navegador. Mientras tanto, puedes escribir.");
      else if (e.error === "no-speech") setAviso("No te he oído. Toca «Hablar» y vuelve a probar.");
      else if (e.error !== "aborted") setAviso("No he podido escucharte. Puedes escribir.");
    };
    r.onend = () => setEscuchando(false);
    reco.current = r;
    try {
      r.start();
      setEscuchando(true);
    } catch {
      setEscuchando(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={alternar}
        aria-pressed={escuchando}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold ${escuchando ? "bg-rose-600 text-white" : "bg-niebla text-noche ring-1 ring-linea"}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
        {escuchando ? "Parar de hablar" : "Hablar en vez de escribir"}
      </button>
      <p role="status" aria-live="polite" className={aviso ? "mt-2 text-sm text-rose-700" : "sr-only"}>{escuchando ? "Escuchando" : aviso}</p>
      <p className="mt-1 text-xs text-gris">Tu navegador convierte la voz en texto. Nosotros solo recibimos lo que tú envíes.</p>
    </div>
  );
}
