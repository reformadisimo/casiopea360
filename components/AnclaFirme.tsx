"use client";

import { useEffect } from "react";

// Las secciones con content-visibility cambian de altura al pintarse, y el navegador se queda en otro
// sitio tanto al llegar de fuera a una ancla (/servicios#costes) como al tocar un enlace interno
// (#solicitud en el móvil). Esto recoloca el destino hasta que deja de moverse, y se retira en cuanto
// la persona hace scroll o toca otra cosa.
export default function AnclaFirme() {
  useEffect(() => {
    let reloj: ReturnType<typeof setInterval> | undefined;
    let soltar: (() => void) | undefined;
    const eventos = ["wheel", "touchmove", "keydown"] as const;

    const parar = () => {
      if (reloj) clearInterval(reloj);
      reloj = undefined;
      if (soltar) eventos.forEach((e) => window.removeEventListener(e, soltar!));
      soltar = undefined;
    };

    const fijar = (id: string) => {
      parar();
      let detener = false;
      soltar = () => {
        detener = true;
      };
      eventos.forEach((e) => window.addEventListener(e, soltar!, { passive: true }));
      let quieto = 0;
      let vueltas = 0;
      reloj = setInterval(() => {
        const el = document.getElementById(id);
        vueltas += 1;
        if (detener || !el || vueltas > 50) return parar();
        const margen = parseFloat(getComputedStyle(el).scrollMarginTop) || 96;
        const falta = el.getBoundingClientRect().top - margen;
        const tope = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
        if (Math.abs(falta) > 4 && !(falta > 0 && tope < 2)) {
          window.scrollBy({ top: falta, behavior: "instant" });
          quieto = 0;
        } else if (++quieto >= 5) parar();
      }, 120);
    };

    let inicial = "";
    try {
      inicial = decodeURIComponent(window.location.hash.slice(1));
    } catch {}
    if (inicial) {
      // al llegar, solo se suelta si la persona toca o gira la rueda
      fijar(inicial);
      const tocar = () => detenerInicial();
      const detenerInicial = () => soltar?.();
      window.addEventListener("pointerdown", tocar, { passive: true, once: true });
    }

    const alTocar = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const h = a.getAttribute("href") || "";
      if (h.length < 2) return;
      let id = "";
      try {
        id = decodeURIComponent(h.slice(1));
      } catch {
        return;
      }
      // el navegador hace su salto y, justo después, se recoloca
      setTimeout(() => fijar(id), 0);
    };
    document.addEventListener("click", alTocar);

    return () => {
      parar();
      document.removeEventListener("click", alTocar);
    };
  }, []);
  return null;
}
