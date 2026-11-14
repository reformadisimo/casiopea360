"use client";

import { useEffect } from "react";

// Al llegar de fuera a una dirección con ancla (/servicios#costes), el navegador salta antes de que
// las secciones de arriba tengan su altura real (se pintan al acercarse) y se queda en otro sitio.
// Esto recoloca el destino hasta que deja de moverse, y se retira en cuanto la persona toca algo.
export default function AnclaFirme() {
  useEffect(() => {
    let id = "";
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {}
    if (!id) return;
    let parar = false;
    const soltar = () => {
      parar = true;
    };
    const eventos = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    eventos.forEach((e) => window.addEventListener(e, soltar, { passive: true }));
    let quieto = 0;
    let vueltas = 0;
    const reloj = setInterval(() => {
      const el = document.getElementById(id);
      vueltas += 1;
      if (parar || !el || vueltas > 50) return clearInterval(reloj);
      const margen = parseFloat(getComputedStyle(el).scrollMarginTop) || 96;
      const falta = el.getBoundingClientRect().top - margen;
      const tope = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      if (Math.abs(falta) > 4 && !(falta > 0 && tope < 2)) {
        window.scrollBy({ top: falta, behavior: "instant" });
        quieto = 0;
      } else if (++quieto >= 5) clearInterval(reloj);
    }, 120);
    return () => {
      clearInterval(reloj);
      eventos.forEach((e) => window.removeEventListener(e, soltar));
    };
  }, []);
  return null;
}
