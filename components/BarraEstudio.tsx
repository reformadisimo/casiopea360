"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Móvil: el botón «Solicita tu estudio gratuito» fijo abajo, siempre a mano.
// - Aparece cuando ya se ha pasado la portada (el botón grande de arriba deja de verse).
// - Se esconde cuando el test está en pantalla (no tiene sentido invitar a lo que ya se ve),
//   cuando hay otra barra fija abajo (la del calculador de costes) o un aviso abierto.
// - No sale en el estudio gratuito, el test ni las herramientas de ejemplo.
// - A la derecha deja sitio para el botón de Cas, la asistente.
const SIN_BARRA = ["/estudio-gratuito", "/test", "/panel", "/crm-ejemplo", "/lupa-ejemplo", "/avisos-ejemplo", "/panel-antiguo"];

export default function BarraEstudio() {
  const ruta = usePathname() || "/";
  const [ver, setVer] = useState(false);
  const [destino, setDestino] = useState("/test#solicitud");
  const excluida = SIN_BARRA.some((r) => ruta === r || ruta.startsWith(r + "/"));

  useEffect(() => {
    if (excluida) return;
    // Si la página tiene el test dentro, el botón lleva a él sin cambiar de página
    setDestino(document.getElementById("solicitud") ? "#solicitud" : "/test#solicitud");
    let marco = 0;
    const revisar = () => {
      marco = 0;
      const pasado = window.scrollY > window.innerHeight * 0.75;
      const test = document.getElementById("solicitud");
      let testVisible = false;
      if (test) {
        const r = test.getBoundingClientRect();
        testVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      const otraBarra = !!document.querySelector("[data-barra-inferior]");
      const aviso = !!document.querySelector("[role=dialog][aria-modal=true]");
      const cookies = document.querySelector<HTMLElement>("[data-aviso-cookies]");
      const cookiesVisibles = !!cookies && cookies.offsetParent !== null;
      setVer(pasado && !testVisible && !otraBarra && !aviso && !cookiesVisibles);
    };
    const pedir = () => {
      if (!marco) marco = requestAnimationFrame(revisar);
    };
    revisar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir, { passive: true });
    // Avisos y cookies cambian sin desplazarse: miramos cada segundo, que no cuesta nada
    const intervalo = window.setInterval(pedir, 1000);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      window.clearInterval(intervalo);
      if (marco) cancelAnimationFrame(marco);
    };
  }, [ruta, excluida]);

  if (excluida) return null;
  return (
    <div
      aria-hidden={!ver}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-noche/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pr-[5.25rem] pt-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        ver ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <Link
        href={destino}
        tabIndex={ver ? 0 : -1}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-estrella px-5 text-[1.02rem] font-extrabold text-tinta shadow-[0_8px_24px_-8px_rgba(255,197,61,0.7)] active:bg-estrella-2"
      >
        Solicita tu estudio gratuito
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Link>
    </div>
  );
}
