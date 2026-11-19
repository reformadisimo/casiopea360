"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { leerAtribucion } from "@/lib/atribucion";

/* Contador propio de Casiopea, sin cookies (el mismo que Reformadísimo, cl·v970-974 y 31-oct).
   Cuenta a todos, acepten o no las cookies: página, de dónde viene, móvil u ordenador,
   si es la primera página de la visita (entrada) y si es la primera vez hoy de este navegador
   (nuevo = una persona distinta del día). Además, el TIEMPO con la página a la vista y el REBOTE
   (visita de una sola página y menos de 10 s), mandados a /api/tiempo al ocultar la pestaña, cambiar
   de página o salir. No viaja nada que identifique a nadie. Los robots no cuentan. */

const INTERNAS = /^\/(panel|panel-antiguo|mesa|crm|crm-ejemplo|lupa-ejemplo|avisos-ejemplo)/;

/** La lupa de la mesa enseña la web dentro de un marco: ahí no se cuenta nada. */
function enMarco() {
  try { return window.top !== window.self; } catch { return true; }
}

function origen() {
  const { fuente } = leerAtribucion();
  const disp = window.matchMedia("(pointer: coarse)").matches ? "movil" : "pc";
  return { fuente, disp };
}

/** Avisa a Tag Manager (dataLayer) de un evento sin datos personales. Si el visitante no aceptó las cookies,
    Tag Manager no está cargado y esto no hace nada: la medición completa es la del contador propio. */
export function avisarGTM(evento: string, extra: Record<string, string> = {}) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    if (!w.dataLayer) return;
    w.dataLayer.push({ event: evento, pagina: window.location.pathname, fuente: leerAtribucion().fuente, ...extra });
  } catch {}
}

/** Apunta un clic en WhatsApp o en llamar, una sola vez por visita y tipo (marcas en sessionStorage). */
export function apuntarContacto(tipo: "contacto_wa" | "contacto_tel") {
  avisarGTM(tipo === "contacto_wa" ? "whatsapp_click" : "llamada_click");
  try {
    if (navigator.webdriver) return;
    const marca = tipo === "contacto_wa" ? "cas-cwa" : "cas-ctel";
    if (sessionStorage.getItem(marca)) return;
    sessionStorage.setItem(marca, "1");
    const { fuente, disp } = origen();
    navigator.sendBeacon?.("/api/evento", JSON.stringify({ tipo, pagina: window.location.pathname, fuente, disp }));
  } catch {}
}

export default function ContadorVistas() {
  // Clics en WhatsApp y en llamar, en fase de captura, en toda la web (una vez montado).
  useEffect(() => {
    if (enMarco()) return;
    const alClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const h = a.getAttribute("href") ?? "";
      if (/^tel:/i.test(h)) apuntarContacto("contacto_tel");
      else if (/wa\.me|api\.whatsapp|^whatsapp:/i.test(h)) apuntarContacto("contacto_wa");
    };
    document.addEventListener("click", alClic, true);
    return () => document.removeEventListener("click", alClic, true);
  }, []);
  const ruta = usePathname();
  useEffect(() => {
    if (!ruta || navigator.webdriver || enMarco() || INTERNAS.test(ruta)) return;
    try { leerAtribucion(); } catch {} // fija el primer toque (origen y página de entrada) nada más llegar
    const t = setTimeout(() => {
      try {
        const { fuente, disp } = origen();
        let entrada = false;
        try { if (!sessionStorage.getItem("cas-visita")) { sessionStorage.setItem("cas-visita", "1"); entrada = true; } } catch {}
        let nuevo = false;
        try {
          const hoy = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
          if (localStorage.getItem("cas-dia") !== hoy) { localStorage.setItem("cas-dia", hoy); nuevo = true; }
        } catch {}
        try { sessionStorage.setItem("cas-pags", String(Number(sessionStorage.getItem("cas-pags") || 0) + 1)); } catch {}
        navigator.sendBeacon?.("/api/vista", JSON.stringify({ pagina: ruta, fuente, disp, entrada, nuevo }));
      } catch {}
    }, 1200);

    // Tiempo con la página a la vista: se acumula mientras la pestaña está visible y se manda en trozos.
    let desde = document.visibilityState === "visible" ? Date.now() : 0;
    let acumulado = 0;
    let total = 0;
    const esRebote = () => {
      try {
        if (sessionStorage.getItem("cas-rebote")) return false;
        if (Number(sessionStorage.getItem("cas-pags") || 0) !== 1 || total >= 10) return false;
        sessionStorage.setItem("cas-rebote", "1");
        return true;
      } catch { return false; }
    };
    const parar = () => { if (desde) { acumulado += Date.now() - desde; desde = 0; } };
    const mandar = (saliendo: boolean) => {
      parar();
      const s = Math.round(acumulado / 1000);
      acumulado = 0;
      total += s;
      const rebote = saliendo && esRebote();
      if (s < 1 && !rebote) return;
      try { const { fuente, disp } = origen(); navigator.sendBeacon?.("/api/tiempo", JSON.stringify({ pagina: ruta, fuente, disp, s, rebote })); } catch {}
    };
    const alCambiar = () => { if (document.visibilityState === "visible") { if (!desde) desde = Date.now(); } else mandar(true); };
    const alSalir = () => mandar(true);
    document.addEventListener("visibilitychange", alCambiar);
    window.addEventListener("pagehide", alSalir);
    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", alCambiar);
      window.removeEventListener("pagehide", alSalir);
      mandar(false); // cambio de página dentro de la web: no es rebote
    };
  }, [ruta]);
  // Lupa propia: dónde se hace clic y hasta dónde se baja. Solo posiciones; se manda con la página a la vista.
  useEffect(() => {
    if (!ruta || navigator.webdriver || enMarco() || INTERNAS.test(ruta)) return;
    const clics: [number, number, number][] = [];
    let prof = 0;
    let profEnviada = false;
    let espera = 0;
    const alto = () => Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0);
    const medirProf = () => {
      espera = 0;
      const h = alto();
      if (h > 0) prof = Math.max(prof, Math.min(100, Math.round(((window.scrollY + window.innerHeight) / h) * 100)));
    };
    const alScroll = () => { if (!espera) espera = requestAnimationFrame(medirProf); };
    const alClic = (e: MouseEvent) => {
      if (!e.isTrusted || clics.length >= 40) return;
      const ancho = document.documentElement.scrollWidth || window.innerWidth;
      const x = Math.max(0, Math.min(1000, Math.round((e.pageX / ancho) * 1000)));
      const el = e.target as Element | null;
      const activo = el?.closest?.("a[href],button,input,select,textarea,summary,label,[role=button],[role=link]") ? 1 : 0;
      clics.push([x, Math.round(e.pageY), activo]);
    };
    const mandar = (saliendo: boolean) => {
      medirProf();
      const mandarProf = saliendo && !profEnviada && prof > 0;
      if (!clics.length && !mandarProf) return;
      try {
        const { disp } = origen();
        const cuerpo: Record<string, unknown> = { pagina: ruta, disp, h: alto(), clics: clics.splice(0) };
        if (mandarProf) { cuerpo.prof = prof; profEnviada = true; }
        navigator.sendBeacon?.("/api/lupa", JSON.stringify(cuerpo));
      } catch {}
    };
    const alCambiar = () => { if (document.visibilityState !== "visible") mandar(true); };
    const alSalir = () => mandar(true);
    medirProf();
    window.addEventListener("scroll", alScroll, { passive: true });
    document.addEventListener("click", alClic, true);
    document.addEventListener("visibilitychange", alCambiar);
    window.addEventListener("pagehide", alSalir);
    return () => {
      window.removeEventListener("scroll", alScroll);
      document.removeEventListener("click", alClic, true);
      document.removeEventListener("visibilitychange", alCambiar);
      window.removeEventListener("pagehide", alSalir);
      mandar(true); // cambio de página dentro de la web
    };
  }, [ruta]);
  return null;
}
