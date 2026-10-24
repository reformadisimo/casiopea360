"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { MENU } from "@/lib/navegacion";

// Cabecera fija: transparente sobre la portada oscura, azul noche al bajar.
// Submenús que se abren al pasar el ratón, al pulsar o con el teclado. Menú propio en el móvil.
export default function Cabecera() {
  const [solida, setSolida] = useState(false);
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movil, setMovil] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solida || movil ? "bg-noche/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" aria-label="Casiopea 360, inicio" onClick={cerrarTodo}>
          <Logo claro />
        </Link>

        <nav ref={navRef} aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1 text-[0.95rem] font-bold text-white/85">
            {MENU.map((m) =>
              m.hijos ? (
                <li
                  key={m.texto}
                  className="relative"
                  onMouseEnter={() => setAbierto(m.texto)}
                  onMouseLeave={() => setAbierto(null)}
                >
                  <button
                    type="button"
                    aria-expanded={abierto === m.texto}
                    aria-haspopup="true"
                    onClick={() => setAbierto(abierto === m.texto ? null : m.texto)}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 hover:text-white"
                  >
                    {m.texto}
                    <svg aria-hidden="true" viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${abierto === m.texto ? "rotate-180" : ""}`}>
                      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {abierto === m.texto && (
                    <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                      <ul className="overflow-hidden rounded-2xl bg-white p-2 text-tinta shadow-[0_24px_48px_-16px_rgba(14,26,61,0.45)]">
                        <li>
                          <Link href={m.href} onClick={cerrarTodo} className="block rounded-xl px-4 py-3 hover:bg-niebla">
                            <span className="block font-bold">Ver todo</span>
                            <span className="block text-sm font-normal text-gris">{m.texto}, de un vistazo</span>
                          </Link>
                        </li>
                        {m.hijos.map((h) => (
                          <li key={h.href}>
                            <Link href={h.href} onClick={cerrarTodo} className="block rounded-xl px-4 py-3 hover:bg-niebla">
                              <span className="flex items-center gap-2.5 font-bold">
                                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-estrella" />
                                {h.texto}
                              </span>
                              {h.detalle && <span className="block pl-[1.125rem] text-sm font-normal text-gris">{h.detalle}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={m.texto}>
                  <Link href={m.href} className="block whitespace-nowrap rounded-full px-3 py-2 hover:text-white">
                    {m.texto}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/estudio-gratuito"
            onClick={cerrarTodo}
            className="whitespace-nowrap rounded-full bg-estrella px-3 py-2 text-[0.8rem] font-bold text-tinta hover:bg-estrella-2 sm:px-5 sm:text-sm"
          >
            Estudio gratuito
          </Link>
          <button
            type="button"
            aria-label={movil ? "Cerrar el menú" : "Abrir el menú"}
            aria-expanded={movil}
            onClick={() => setMovil(!movil)}
            className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
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
                <Link href={m.href} onClick={cerrarTodo} className="block rounded-xl px-3 py-3 text-lg font-bold hover:bg-white/10">
                  {m.texto}
                </Link>
                {m.hijos && (
                  <ul className="mb-2 ml-3 border-l border-white/15 pl-3">
                    {m.hijos.map((h) => (
                      <li key={h.href}>
                        <Link href={h.href} onClick={cerrarTodo} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white/80 hover:bg-white/10">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-estrella" />
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
