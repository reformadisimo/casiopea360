"use client";

import { useEffect } from "react";

// Solo con ratón (no en móvil ni si el usuario prefiere menos movimiento):
// 1) las constelaciones de las zonas oscuras se desplazan un poco con el ratón (profundidad);
// 2) las tarjetas con la clase "inclina" se inclinan dos o tres grados hacia el ratón.
export default function Profundidad() {
  useEffect(() => {
    let fino = false;
    let quieto = false;
    try {
      fino = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (!fino || quieto) return;

    const raiz = document.documentElement;
    let marco = 0;
    let mx = 0;
    let my = 0;
    const mover = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (marco) return;
      marco = requestAnimationFrame(() => {
        marco = 0;
        raiz.style.setProperty("--mx", mx.toFixed(3));
        raiz.style.setProperty("--my", my.toFixed(3));
      });
    };

    let tarjeta: HTMLElement | null = null;
    const inclinar = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.(".inclina") as HTMLElement | null;
      if (t !== tarjeta) {
        if (tarjeta) tarjeta.style.transform = "";
        tarjeta = t;
      }
      if (!tarjeta) return;
      const r = tarjeta.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tarjeta.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-3px)`;
    };
    const soltar = () => {
      if (tarjeta) tarjeta.style.transform = "";
      tarjeta = null;
    };

    window.addEventListener("mousemove", mover, { passive: true });
    document.addEventListener("mousemove", inclinar, { passive: true });
    document.addEventListener("mouseleave", soltar);
    return () => {
      window.removeEventListener("mousemove", mover);
      document.removeEventListener("mousemove", inclinar);
      document.removeEventListener("mouseleave", soltar);
      cancelAnimationFrame(marco);
    };
  }, []);
  return null;
}
