"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Botón «Subir» para volver al principio de las páginas largas. Sale al bajar bastante y no estorba a las barras
// de abajo: en móvil va encima de la barra fija, a la derecha; en escritorio, abajo a la izquierda.
export default function SubirArriba() {
  const ruta = usePathname() || "/";
  const [ver, setVer] = useState(false);
  useEffect(() => {
    let marco = 0;
    const revisar = () => {
      marco = 0;
      setVer(window.scrollY > 1200);
    };
    const pedir = () => {
      if (!marco) marco = requestAnimationFrame(revisar);
    };
    revisar();
    window.addEventListener("scroll", pedir, { passive: true });
    return () => {
      window.removeEventListener("scroll", pedir);
      if (marco) cancelAnimationFrame(marco);
    };
  }, [ruta]);
  if (ruta.startsWith("/mesa")) return null;
  const subir = () => {
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: suave ? "smooth" : "auto" });
  };
  return (
    <button
      type="button"
      onClick={subir}
      aria-label="Subir al principio de la página"
      tabIndex={ver ? 0 : -1}
      aria-hidden={!ver}
      className={`fixed bottom-[5.25rem] right-3 z-40 inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-3.5 max-sm:w-11 max-sm:justify-center max-sm:px-0 text-sm font-extrabold text-noche shadow-[0_10px_30px_-10px_rgba(14,26,61,0.6)] ring-1 ring-tinta/15 transition-all duration-300 hover:bg-niebla sm:bottom-5 sm:left-5 sm:right-auto ${
        ver ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      <span className="max-sm:sr-only">Subir</span>
    </button>
  );
}
