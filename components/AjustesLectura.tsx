"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Ajustes de lectura: el botón «Aa» de la barra superior.
// Tamaño del texto, letra más fácil, más espacio, más contraste y parar animaciones y vídeos.
// Se recuerdan en este navegador. No se envía nada a ningún sitio.
type Ajustes = { t: number; f: boolean; e: boolean; c: boolean; p: boolean };
const INICIAL: Ajustes = { t: 0, f: false, e: false, c: false, p: false };
const CLAVE = "casiopea-lectura";
const TAMANOS = ["Normal", "Grande", "Muy grande", "Enorme"];

function leer(): Ajustes {
  try {
    const s = JSON.parse(localStorage.getItem(CLAVE) || "null");
    if (s && typeof s === "object") return { ...INICIAL, ...s, t: Math.min(3, Math.max(0, Number(s.t) || 0)) };
  } catch {}
  return INICIAL;
}

function aplicar(a: Ajustes) {
  const h = document.documentElement;
  if (a.t) h.setAttribute("data-texto", String(a.t));
  else h.removeAttribute("data-texto");
  (["f", "e", "c", "p"] as const).forEach((k) => {
    const nombre = { f: "data-fuente", e: "data-espacio", c: "data-contraste", p: "data-sin-movimiento" }[k];
    if (a[k]) h.setAttribute(nombre, "1");
    else h.removeAttribute(nombre);
  });
  document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
    if (a.p) v.pause();
    else if (v.dataset.visible === "1") v.play().catch(() => {});
  });
}

function Interruptor({ activo, alCambiar, titulo, ayuda }: { activo: boolean; alCambiar: () => void; titulo: string; ayuda: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={alCambiar}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-linea bg-white px-4 py-3 text-left text-tinta hover:border-noche"
    >
      <span>
        <span className="block font-extrabold">{titulo}</span>
        <span className="block text-sm text-gris">{ayuda}</span>
      </span>
      <span aria-hidden="true" className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${activo ? "bg-[#1d4ed8]" : "bg-linea"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${activo ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}

export default function AjustesLectura() {
  const [abierto, setAbierto] = useState(false);
  const [a, setA] = useState<Ajustes>(INICIAL);
  const raiz = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const guardados = leer();
    setA(guardados);
    aplicar(guardados);
    // Los vídeos que se cargan después también deben respetar «parar»
    const obs = new MutationObserver(() => {
      if (document.documentElement.hasAttribute("data-sin-movimiento")) document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => v.pause());
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  const cambiar = useCallback((cambio: Partial<Ajustes>) => {
    setA((previo) => {
      const nuevo = { ...previo, ...cambio };
      aplicar(nuevo);
      try {
        if (JSON.stringify(nuevo) === JSON.stringify(INICIAL)) localStorage.removeItem(CLAVE);
        else localStorage.setItem(CLAVE, JSON.stringify(nuevo));
      } catch {}
      return nuevo;
    });
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: Event) => {
      const d = e.target as Node;
      if (raiz.current?.contains(d) || panel.current?.contains(d)) return;
      setAbierto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", esc);
    };
  }, [abierto]);

  const cambiado = JSON.stringify(a) !== JSON.stringify(INICIAL);

  return (
    <div ref={raiz} className="relative">
      <button
        type="button"
        aria-label="Ajustes de lectura: tamaño de letra, contraste y movimiento"
        aria-expanded={abierto}
        aria-controls="panel-lectura"
        onClick={() => setAbierto((x) => !x)}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white hover:bg-white/10 sm:h-10 sm:w-10"
      >
        <span aria-hidden="true" className="font-titular text-[0.95rem] font-extrabold leading-none">
          A<span className="text-[0.7rem]">a</span>
        </span>
        {cambiado && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-estrella ring-2 ring-noche" />}
      </button>

      {abierto && createPortal(
        <div
          ref={panel}
          id="panel-lectura"
          role="dialog"
          aria-label="Ajustes de lectura"
          className="ajustes-lectura fixed inset-x-3 top-[76px] z-[70] max-h-[calc(100dvh-92px)] overflow-y-auto rounded-3xl bg-niebla p-5 text-tinta shadow-[0_30px_60px_-20px_rgba(14,26,61,0.7)] ring-1 ring-noche/10 sm:inset-x-auto sm:right-6 sm:w-[22rem]"
        >
          <div className="flex items-center justify-between">
            <p className="font-titular text-xl font-extrabold">Ajustes de lectura</p>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full hover:bg-linea">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-linea bg-white p-4">
            <p className="font-extrabold">Tamaño del texto</p>
            <div className="mt-3 flex items-center gap-3">
              <button type="button" onClick={() => cambiar({ t: Math.max(0, a.t - 1) })} disabled={a.t === 0} aria-label="Texto más pequeño" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-linea text-lg font-extrabold hover:border-noche disabled:opacity-35">A−</button>
              <div className="flex-1 text-center">
                <p className="font-bold" aria-live="polite">{TAMANOS[a.t]}</p>
                <div className="mt-1 flex justify-center gap-1.5" aria-hidden="true">
                  {TAMANOS.map((_, i) => <span key={i} className={`h-1.5 w-8 rounded-full ${i <= a.t ? "bg-[#1d4ed8]" : "bg-linea"}`} />)}
                </div>
              </div>
              <button type="button" onClick={() => cambiar({ t: Math.min(3, a.t + 1) })} disabled={a.t === 3} aria-label="Texto más grande" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-linea text-xl font-extrabold hover:border-noche disabled:opacity-35">A+</button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <Interruptor activo={a.f} alCambiar={() => cambiar({ f: !a.f })} titulo="Letra fácil de leer" ayuda="Una letra más abierta y clara." />
            <Interruptor activo={a.e} alCambiar={() => cambiar({ e: !a.e })} titulo="Más espacio entre líneas" ayuda="El texto respira y cuesta menos seguirlo." />
            <Interruptor activo={a.c} alCambiar={() => cambiar({ c: !a.c })} titulo="Más contraste" ayuda="Textos más oscuros y bordes más marcados." />
            <Interruptor activo={a.p} alCambiar={() => cambiar({ p: !a.p })} titulo="Parar animaciones y vídeos" ayuda="Todo se queda quieto." />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-gris">Se recuerda en este dispositivo.</p>
            <button type="button" onClick={() => cambiar(INICIAL)} disabled={!cambiado} className="rounded-full border border-linea bg-white px-4 py-2 text-sm font-bold hover:border-noche disabled:opacity-40">
              Restablecer
            </button>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
