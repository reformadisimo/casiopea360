"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { leerAtribucion } from "@/lib/atribucion";

/* Contador propio de Casiopea, sin cookies (como el de Reformadísimo, cl·v970-974).
   Cuenta a todos, acepten o no las cookies: página, de dónde viene, móvil u ordenador,
   si es la primera página de la visita (entrada) y si es la primera vez hoy de este
   navegador (nuevo = una persona distinta del día). No viaja nada que identifique a nadie:
   solo un sí o un no. Los robots (navigator.webdriver) no cuentan; el servidor filtra el resto. */

const INTERNAS = /^\/(panel|panel-antiguo|mesa|crm|crm-ejemplo|lupa-ejemplo|avisos-ejemplo)/;

export default function ContadorVistas() {
  const ruta = usePathname();
  useEffect(() => {
    if (!ruta || navigator.webdriver || INTERNAS.test(ruta)) return;
    const t = setTimeout(() => {
      try {
        const { fuente } = leerAtribucion();
        const disp = window.matchMedia("(pointer: coarse)").matches ? "movil" : "pc";
        let entrada = false;
        try { if (!sessionStorage.getItem("cas-visita")) { sessionStorage.setItem("cas-visita", "1"); entrada = true; } } catch {}
        let nuevo = false;
        try {
          const hoy = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
          if (localStorage.getItem("cas-dia") !== hoy) { localStorage.setItem("cas-dia", hoy); nuevo = true; }
        } catch {}
        navigator.sendBeacon?.("/api/vista", JSON.stringify({ pagina: ruta, fuente, disp, entrada, nuevo }));
      } catch {}
    }, 1200);
    return () => clearTimeout(t);
  }, [ruta]);
  return null;
}
