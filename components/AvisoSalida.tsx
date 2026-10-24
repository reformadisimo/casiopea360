"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Ventana al irse: invita al test de idoneidad y resume el estudio gratuito.
// Ordenador: cuando el ratón sale por arriba (va a cerrar o cambiar de pestaña).
// Móvil: cuando alguien ha leído buena parte de la página y vuelve hacia arriba de golpe.
// Una sola vez por visita; nunca en el estudio gratuito ni encima del aviso de cookies.
const CLAVE = "casiopea-salida";
const RESUMEN = [
  "Tu situación, con un semáforo por áreas",
  "Tu competencia y sus anuncios reales",
  "La propuesta de rediseño completo de tu web",
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
    boton.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [abierto]);

  if (!abierto) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-noche/70 p-3 backdrop-blur-sm sm:place-items-center sm:p-6" onClick={() => setAbierto(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="salida-titulo"
        onClick={(e) => e.stopPropagation()}
        className="entra relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white text-tinta shadow-[0_40px_80px_-30px_rgba(14,26,61,0.8)]"
      >
        <div className="relative bg-noche px-7 pb-6 pt-7 text-white">
          <span aria-hidden="true" className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-estrella/30 blur-2xl" />
          <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <p className="text-sm font-bold text-estrella">Antes de irte</p>
          <p id="salida-titulo" className="mt-2 pr-8 font-titular text-3xl font-extrabold leading-tight">Tu estudio gratuito te está esperando.</p>
          <p className="mt-3 text-white/85">Haz el test de idoneidad, son dos minutos. Si encajamos, te preparamos gratis tu plan completo:</p>
        </div>
        <ul className="grid gap-2.5 px-7 py-6">
          {RESUMEN.map((x, i) => (
            <li key={x} className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-white" style={{ background: ["#1d4ed8", "#6d28d9", "#be185d", "#047857", "#b45309", "#0f766e"][i] }}>
                {i + 1}
              </span>
              <span className="font-bold">{x}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 px-7 pb-7 sm:flex-row sm:items-center">
          <Link ref={boton} href="/estudio-gratuito#solicitud" onClick={() => setAbierto(false)} className="inline-flex items-center justify-center rounded-full bg-estrella px-6 py-3.5 font-bold text-tinta hover:bg-estrella-2">
            Hacer el test de idoneidad
          </Link>
          <button type="button" onClick={() => setAbierto(false)} className="rounded-full px-5 py-3 font-bold text-gris hover:text-tinta">
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
}
