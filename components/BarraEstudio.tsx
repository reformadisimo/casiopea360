"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACTO } from "@/lib/contenido";

// Móvil (y pastilla en escritorio): barra fija abajo en toda la web, como la de Reformadísimo: WhatsApp, Chat con Cas y el botón
// amarillo «Haz el test», que es lo que nos interesa. Sin botón de llamar (no atendemos por teléfono).
// - Se esconde cuando el test está en pantalla (no tiene sentido invitar a lo que ya se ve), cuando hay
//   otra barra fija abajo (la del calculador de costes), un aviso abierto o el aviso de cookies.
// - No sale en las herramientas de ejemplo.
const SIN_BARRA = ["/panel", "/crm-ejemplo", "/lupa-ejemplo", "/avisos-ejemplo", "/panel-antiguo", "/mesa"];

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
      const test = document.getElementById("solicitud");
      let testVisible = false;
      if (test) {
        const r = test.getBoundingClientRect();
        testVisible = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      }
      const otraBarra = !!document.querySelector("[data-barra-inferior]");
      const aviso = !!document.querySelector("[role=dialog][aria-modal=true]");
      const cookies = document.querySelector<HTMLElement>("[data-aviso-cookies]");
      const cookiesVisibles = !!cookies && cookies.offsetParent !== null;
      setVer(!testVisible && !otraBarra && !aviso && !cookiesVisibles);
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
  const t = ver ? 0 : -1;
  return (
    <>
    {/* Escritorio: pastilla fija abajo, centrada, con el estudio gratuito y el WhatsApp. */}
    <div
      aria-hidden={!ver}
      className={`fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full bg-noche/95 py-2 pl-2 pr-2 shadow-[0_18px_40px_-12px_rgba(14,26,61,0.7)] ring-1 ring-white/15 backdrop-blur transition-all duration-300 sm:flex ${
        ver ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <a
        href={`https://wa.me/${CONTACTO.whatsapp}`}
        target="_blank"
        rel="noopener"
        tabIndex={t}
        aria-label="Escríbenos por WhatsApp"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25d366] text-white transition-transform hover:scale-105"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 15l-.3-.18-3.1.82.83-3.03-.2-.32A8.1 8.1 0 0 1 12.04 3.8zm-3.1 3.9c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.88 4.45 3.92 2.2.87 2.65.7 3.13.65.48-.04 1.54-.63 1.76-1.24.22-.6.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.94-.21-.5-.43-.43-.59-.44h-.5z" /></svg>
      </a>
      <span className="hidden text-sm font-bold text-white/85 md:block">Sin compromiso. Sin pedirte accesos.</span>
      <Link
        href={destino}
        tabIndex={t}
        className="boton-brillo inline-flex min-h-11 items-center justify-center rounded-full bg-estrella px-6 text-base font-extrabold text-tinta transition-colors hover:bg-estrella-2"
      >
        Quiero mi estudio gratuito
      </Link>
    </div>
    <div
      aria-hidden={!ver}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-end gap-3 border-t border-white/10 bg-noche/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur transition-transform duration-300 sm:hidden ${
        ver ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a
        href={`https://wa.me/${CONTACTO.whatsapp}`}
        target="_blank"
        rel="noopener"
        tabIndex={t}
        aria-label="WhatsApp" className="flex shrink-0 items-center text-[0.72rem] font-bold text-white"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#25d366] text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 15l-.3-.18-3.1.82.83-3.03-.2-.32A8.1 8.1 0 0 1 12.04 3.8zm-3.1 3.9c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.88 4.45 3.92 2.2.87 2.65.7 3.13.65.48-.04 1.54-.63 1.76-1.24.22-.6.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.94-.21-.5-.43-.43-.59-.44h-.5z" /></svg>
        </span>
      </a>
      <button
        type="button"
        tabIndex={t}
        onClick={() => window.dispatchEvent(new Event("casiopea:chat"))}
        aria-label="Chat con Cas" className="flex shrink-0 items-center text-[0.72rem] font-bold text-white"
      >
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-2 ring-estrella/70">
          <img src="/marca/icono.svg" alt="" className="h-8 w-8 rounded-[0.5rem]" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-noche" />
        </span>
      </button>
      <Link
        href={destino}
        tabIndex={t}
        className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 self-center rounded-full bg-estrella px-4 text-[1.05rem] font-extrabold text-tinta shadow-[0_8px_24px_-8px_rgba(255,197,61,0.7)] active:bg-estrella-2"
      >
        Pide tu estudio
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Link>
    </div>
    </>
  );
}
