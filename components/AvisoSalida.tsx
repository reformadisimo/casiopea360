"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import VideoFondo from "@/components/VideoFondo";
import ConstelacionAnimada from "@/components/ConstelacionAnimada";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Ventana al irse: invita al test de idoneidad y resume el estudio gratuito.
// Ordenador: cuando el ratón sale por arriba (va a cerrar o cambiar de pestaña).
// Móvil: cuando alguien ha leído buena parte de la página y vuelve hacia arriba de golpe.
// Una sola vez por visita; nunca en el estudio gratuito ni encima del aviso de cookies.
const CLAVE = "casiopea-salida";
// Lo que se lleva hoy mismo cualquiera que termine el test, encaje o no.
const HOY = ["Tu nota, de 0 a 100", "Dónde se te escapan clientes", "Qué arreglaríamos primero"];
// Lo que recibe gratis quien encaja: el estudio completo.
const RESUMEN = [
  "Tu situación, con un semáforo por áreas",
  "Tu competencia y sus anuncios reales",
  "Cómo quedaría tu web, rediseñada",
  "Tu asistente con inteligencia artificial",
  "Cuánto ahorrarías, al euro",
  "Tu plan para los primeros 30 días",
];

export default function AvisoSalida() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ruta?.startsWith("/estudio-gratuito")) return;
    let visto = false;
    try {
      visto = sessionStorage.getItem(CLAVE) === "1";
    } catch {}
    if (visto) return;
    const inicio = Date.now();
    let maxScroll = 0;
    let ultimaY = window.scrollY;
    let ultimaT = performance.now();

    const puede = () => {
      if (Date.now() - inicio < 12000) return false; // nada de saltar nada más llegar
      const aviso = document.querySelector<HTMLElement>("[data-aviso-cookies]");
      if (aviso && aviso.offsetParent !== null) return false;
      if (document.querySelector("[role=dialog][aria-modal=true]")) return false;
      return true;
    };
    const abrir = () => {
      if (!puede()) return;
      try {
        sessionStorage.setItem(CLAVE, "1");
        sessionStorage.setItem("casiopea-burbuja", "1"); // que no salga también la burbuja del asistente
      } catch {}
      setAbierto(true);
      quitar();
    };
    const raton = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) abrir();
    };
    let subida: { y: number; t: number } | null = null;
    const scroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto > 0) maxScroll = Math.max(maxScroll, y / alto);
      if (y < ultimaY) {
        // Subiendo: medimos el gesto entero, no cada evento suelto.
        if (!subida || t - ultimaT > 250) subida = { y: ultimaY, t: ultimaT };
        const recorrido = subida.y - y;
        const tiempo = Math.max(t - subida.t, 1);
        if (maxScroll > 0.35 && recorrido > 500 && recorrido / tiempo > 0.8) abrir();
      } else {
        subida = null;
      }
      ultimaY = y;
      ultimaT = t;
    };
    const quitar = () => {
      document.removeEventListener("mouseout", raton);
      window.removeEventListener("scroll", scroll);
    };
    const tactil = window.matchMedia("(pointer: coarse)").matches;
    if (tactil) window.addEventListener("scroll", scroll, { passive: true });
    else document.addEventListener("mouseout", raton);
    return quitar;
  }, [ruta]);

  useEffect(() => {
    if (!abierto) return;
    boton.current?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [abierto]);

  if (!abierto) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-noche/75 p-3 backdrop-blur-sm sm:place-items-center sm:p-6" onClick={() => setAbierto(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="salida-titulo"
        aria-describedby="salida-texto"
        onClick={(e) => e.stopPropagation()}
        className="aviso-entra relative max-h-[92dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-[2rem] bg-white text-tinta shadow-[0_40px_80px_-30px_rgba(14,26,61,0.8)]"
      >
        {/* Cabecera: el logo y la constelación de Casiopea dibujándose, como en la portada y en los correos */}
        <div className="relative overflow-hidden bg-noche px-6 pb-5 pt-5 text-white sm:px-8 sm:pb-7 sm:pt-6">
          {/* Cielo: las constelaciones azules de la portada, en movimiento; en negro no pintan, así que solo se ven los puntos y las líneas sobre el azul noche */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90">
            <VideoFondo nombre="constelaciones-azules" alt="" className="mix-blend-screen" />
          </div>
          {/* Un velo suave a la izquierda para que el texto se lea bien sobre las constelaciones */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,26,61,0.6),rgba(14,26,61,0)_65%)]" />
          {/* La W de Casiopea dibujándose en bucle: los puntos se encienden al paso de la línea y la estrella dorada cierra con sus ondas */}
          <ConstelacionAnimada className="pointer-events-none absolute right-3 top-[4.5rem] h-32 w-32 sm:right-8 sm:top-16 sm:h-52 sm:w-52" />
          <div className="relative flex items-center justify-between">
            <Logo claro fundido chico />
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <p className="relative mt-3 text-sm font-bold uppercase tracking-wider text-estrella sm:mt-4">Antes de irte</p>
          <p id="salida-titulo" className="relative mt-1.5 max-w-[10ch] font-titular text-[1.9rem] font-extrabold leading-[1.02] sm:max-w-[11ch] sm:text-[2.6rem]">
            ¿Qué nota tiene tu marketing?
          </p>
          <p id="salida-texto" className="relative mt-3 text-[0.97rem] leading-relaxed text-white/85 sm:mt-4 sm:max-w-[23rem] sm:text-[1.02rem]">
            En cinco minutos lo sabes: una pregunta cada vez, tocando, sin escribir. Y si encajamos, te preparamos gratis tu plan completo.
          </p>
        </div>

        {/* Lo que se lleva hoy, seguro */}
        <div className="border-b border-linea bg-[#fff8e1] px-6 py-3.5 sm:px-8 sm:py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#8a5d00] sm:text-xs">Hoy mismo, al terminar el test</p>
          <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] sm:mt-2 sm:gap-x-5 sm:gap-y-1.5 sm:text-base">
            {HOY.map((x) => (
              <li key={x} className="flex items-center gap-2 font-bold">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-[#047857]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                {x}
              </li>
            ))}
          </ul>
        </div>

        {/* Lo que recibe quien encaja */}
        <div className="px-6 pb-4 pt-4 sm:px-8 sm:pt-5">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-gris sm:text-xs">Y si encajamos, gratis, en 48 horas laborables</p>
          <ul className="mt-2 grid gap-x-6 gap-y-1 text-[0.93rem] sm:mt-3 sm:gap-y-2.5 sm:grid-cols-2 sm:text-base">
            {RESUMEN.map((x, i) => (
              <li key={x} className="flex items-center gap-3">
                <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-[0.7rem] font-extrabold text-white sm:h-7 sm:w-7 sm:rounded-lg sm:text-xs" style={{ background: ["#1d4ed8", "#6d28d9", "#be185d", "#047857", "#b45309", "#0f766e"][i] }}>
                  {i + 1}
                </span>
                <span className="font-bold leading-snug">{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="sticky bottom-0 border-t border-linea bg-white px-6 pb-5 pt-4 sm:px-8 sm:pb-7 sm:pt-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              ref={boton}
              href="/test#solicitud"
              onClick={() => setAbierto(false)}
              className="late inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-estrella px-7 py-3.5 text-lg font-extrabold text-tinta hover:bg-estrella-2"
            >
              Ver mi nota en 5 minutos
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <button type="button" onClick={() => setAbierto(false)} className="hidden min-h-11 rounded-full px-5 py-3 font-bold text-gris hover:text-tinta sm:inline-block">
              Ahora no
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4 sm:block">
            <p className="text-[13px] leading-snug text-gris sm:text-sm">Sin llamadas ni reuniones. Encajes o no, te escribimos siempre con el porqué.</p>
            <button type="button" onClick={() => setAbierto(false)} className="min-h-11 shrink-0 rounded-full px-3 font-bold text-gris hover:text-tinta sm:hidden">
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
