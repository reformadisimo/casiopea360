/* De dónde viene quien entra (sin cookies): se mira la dirección y la web de procedencia
   al llegar, y se guarda en el navegador (sessionStorage, se borra al cerrar la pestaña) para esta visita,
   también si no trae nada («directo») y con la página por la que entró (aterrizaje).
   Sirve para el contador propio y para saber qué trajo cada solicitud del test. */

export type Atribucion = { fuente: string; campana: string; aterrizaje: string };

const CLAVE = "cas-atrib";

export function leerAtribucion(): Atribucion {
  try {
    const guardada = sessionStorage.getItem(CLAVE);
    if (guardada) { const a = JSON.parse(guardada) as Partial<Atribucion>; return { fuente: a.fuente || "directo", campana: a.campana ?? "", aterrizaje: a.aterrizaje ?? "" }; }
  } catch {}
  const a = calcular();
  try { sessionStorage.setItem(CLAVE, JSON.stringify(a)); } catch {}
  return a;
}

function calcular(): Atribucion {
  let fuente = "directo";
  let campana = "";
  // Página por la que entró (primer toque de esta pestaña), sin parámetros.
  const aterrizaje = (() => { try { return window.location.pathname.slice(0, 150); } catch { return ""; } })();
  try {
    const q = new URLSearchParams(window.location.search);
    campana = (q.get("utm_campaign") ?? "").slice(0, 80);
    if (q.get("gclid") || q.get("gbraid") || q.get("wbraid")) fuente = "google-ads";
    else if (q.get("fbclid")) fuente = "meta";
    else if (q.get("utm_source")) fuente = (q.get("utm_source") ?? "").toLowerCase().slice(0, 60);
    else if (document.referrer) {
      const h = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (h && h !== window.location.hostname.replace(/^www\./, "")) fuente = h.slice(0, 60);
    }
  } catch {}
  return { fuente, campana, aterrizaje };
}
