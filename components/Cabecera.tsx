"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import AjustesLectura from "@/components/AjustesLectura";
import { ICONO_SVG } from "@/components/secciones";
import { MENU } from "@/lib/navegacion";

// Cabecera fija: transparente sobre la portada oscura, azul noche al bajar.
// Submenús que se abren al pasar el ratón, al pulsar o con el teclado. Menú propio en el móvil.
const COLORES_MENU = ["#1d4ed8", "#0f766e", "#b45309", "#be185d", "#6d28d9", "#0369a1", "#047857", "#c2410c", "#7c3aed", "#1e40af"];

export default function Cabecera() {
  const [solida, setSolida] = useState(false);
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movil, setMovil] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // Al salir el ratón, el submenú espera un instante antes de cerrarse: así no se va si el ratón cruza un hueco.
  const cierre = useRef<ReturnType<typeof setTimeout> | null>(null);
  const puntero = useRef("");
  const abrir = (t: string) => {
    if (cierre.current) clearTimeout(cierre.current);
    setAbierto(t);
  };
  const cerrarLuego = () => {
    if (cierre.current) clearTimeout(cierre.current);
    cierre.current = setTimeout(() => setAbierto(null), 250);
  };

  useEffect(() => {
    const alBajar = () => setSolida(window.scrollY > 40);
    alBajar();
    window.addEventListener("scroll", alBajar, { passive: true });
    return () => window.removeEventListener("scroll", alBajar);
  }, []);

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setAbierto(null);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(null);
        setMovil(false);
      }
    };
    document.addEventListener("click", fuera);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", fuera);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = movil ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movil]);

  const cerrarTodo = () => {
    setAbierto(null);
    setMovil(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 overflow-x-clip transition-colors duration-300 ${
        solida || movil ? "bg-noche/[0.97] shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* El azul exacto de la loseta del logo nace detrás de él y se funde hacia la noche: la loseta desaparece y resalta la W. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 -left-[100vw] -z-10 w-[calc(100vw+300px)] bg-[linear-gradient(90deg,#2440ff_0%,#2440ff_calc(100%-240px),rgba(36,64,255,0)_100%)] sm:w-[calc(100vw+520px)] sm:bg-[linear-gradient(90deg,#2440ff_0%,#2440ff_calc(100%-450px),rgba(36,64,255,0)_100%)] ${
            solida || movil ? "" : "[mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
          }`}
        />
        <Link prefetch={false} href="/" title="Ir al inicio" onClick={cerrarTodo} className="relative mr-1 shrink-0 sm:mr-3">
          <Logo claro fundido />
        </Link>

        <nav ref={navRef} aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1 text-[0.95rem] font-bold text-white/85">
            {MENU.map((m) =>
              m.hijos ? (
                <li
                  key={m.texto}
                  className="relative"
                  // Solo el ratón abre al pasar por encima; en pantallas táctiles (iPad) manda el toque.
                  onPointerEnter={(e) => e.pointerType === "mouse" && abrir(m.texto)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && cerrarLuego()}
                >
                  <button
                    type="button"
                    aria-expanded={abierto === m.texto}
                    aria-haspopup="true"
                    onPointerDown={(e) => {
                      puntero.current = e.pointerType;
                    }}
                    onClick={(e) => {
                      // Con ratón el menú ya está abierto por pasar por encima: el clic no debe cerrarlo.
                      if (e.detail > 0 && puntero.current === "mouse") return abrir(m.texto);
                      // Toque o teclado: abre y cierra.
                      setAbierto(abierto === m.texto ? null : m.texto);
                    }}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 hover:text-white 2xl:px-3"
                  >
                    {m.texto}
                    <svg aria-hidden="true" viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${abierto === m.texto ? "rotate-180" : ""}`}>
                      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {abierto === m.texto && (
                    <div className={`absolute top-full pt-2 ${m.hijos.length > 5 ? "left-0 w-[42rem]" : "left-1/2 w-80 -translate-x-1/2"}`}>
                      <ul className={`overflow-hidden rounded-2xl bg-white p-2 text-tinta shadow-[0_24px_48px_-16px_rgba(14,26,61,0.45)] ${m.hijos.length > 5 ? "grid grid-cols-2" : ""}`}>
                        <li className="col-span-2 mb-1">
                          <Link prefetch={false} href={m.href} onClick={cerrarTodo} className="group flex items-center gap-3 rounded-xl bg-[linear-gradient(90deg,#1228be,#0e1a3d)] px-4 py-3 text-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/marca/icono-plano.svg" alt="" className="h-8 w-8 rounded-lg" />
                            <span>
                              <span className="block font-bold">Ver todo</span>
                              <span className="block text-sm font-normal text-white/70">{m.texto}, de un vistazo</span>
                            </span>
                            <span aria-hidden="true" className="ml-auto text-estrella transition-transform group-hover:translate-x-1">→</span>
                          </Link>
                        </li>
                        {m.hijos.map((h, k) => (
                          <li key={h.href}>
                            <Link prefetch={false} href={h.href} onClick={cerrarTodo} className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-niebla">
                              <span aria-hidden="true" className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white shadow-md transition-transform group-hover:-rotate-6 group-hover:scale-110" style={{ background: COLORES_MENU[k % COLORES_MENU.length] }}>
                                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[h.icono ?? "estrella"]}</svg>
                              </span>
                              <span>
                                <span className="block font-bold">{h.texto}</span>
                                {h.detalle && <span className="block text-sm font-normal text-gris">{h.detalle}</span>}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={m.texto}>
                  <Link prefetch={false} href={m.href} className="block whitespace-nowrap rounded-full px-2.5 py-2 hover:text-white 2xl:px-3">
                    {m.texto}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <AjustesLectura />
          <Link prefetch={false}
            href="/estudio-gratuito"
            onClick={cerrarTodo}
            className="whitespace-nowrap rounded-full bg-estrella px-3 py-2 text-[0.8rem] font-bold text-tinta hover:bg-estrella-2 sm:px-5 sm:text-sm"
          >
            Estudio<span className="max-[460px]:hidden"> gratuito</span>
          </Link>
          <button
            type="button"
            aria-label={movil ? "Cerrar el menú" : "Abrir el menú"}
            aria-expanded={movil}
            onClick={() => setMovil(!movil)}
            className="relative grid h-9 w-9 place-items-center rounded-full text-white before:absolute before:-inset-1 before:content-[''] hover:bg-white/10 sm:h-10 sm:w-10 xl:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
              {movil ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {movil && (
        <nav aria-label="Principal" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-noche px-4 pb-10 pt-4 xl:hidden">
          <ul className="space-y-1 text-white">
            {MENU.map((m) => (
              <li key={m.texto}>
                <Link prefetch={false} href={m.href} onClick={cerrarTodo} className="block rounded-xl px-3 py-3 text-lg font-bold hover:bg-white/10">
                  {m.texto}
                </Link>
                {m.hijos && (
                  <ul className="mb-2 ml-3 border-l border-white/15 pl-3">
                    {m.hijos.map((h, k) => (
                      <li key={h.href}>
                        <Link prefetch={false} href={h.href} onClick={cerrarTodo} className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/85 hover:bg-white/10">
                          <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white" style={{ background: COLORES_MENU[k % COLORES_MENU.length] }}>
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[h.icono ?? "estrella"]}</svg>
                          </span>
                          {h.texto}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
