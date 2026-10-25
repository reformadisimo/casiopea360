"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// La página se va abriendo al bajar: titulares, textos y tarjetas aparecen con un fundido
// suave y un pequeño ascenso, uno detrás de otro. Mismo motor que Reformadísimo.
// - Solo se esconde lo que está por debajo de la pantalla al cargar: lo visible nunca parpadea.
// - Sin JavaScript todo se ve (la clase la pone este componente).
// - Con «Reducir movimiento» solo hay fundido, sin desplazamiento.
// - Con el ajuste de lectura «sin movimiento», no hay efecto.
const OBJETIVOS = [
  "h2",
  "h3",
  "main > section p",
  "main > section figure",
  "main > section blockquote",
  "main > section details",
  "main > section form",
  "main > section video",
  ".grid > *",
  ".carrusel",
  ".revela",
].join(", ");

export default function Revelado() {
  const ruta = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    if (html.hasAttribute("data-sin-movimiento")) return;
    const movil = window.matchMedia("(max-width: 639px)").matches;

    // Lista de pendientes en orden de la página. Al desplazarse se mira solo el primero:
    // si ya asoma (o se pasó de largo con un salto), se suelta y se mira el siguiente.
    // Así nada se queda escondido aunque se baje de golpe, y cuesta una medida por fotograma.
    const pendientes: HTMLElement[] = [];
    let marco = 0;
    const revisar = () => {
      marco = 0;
      const limite = window.innerHeight * 0.9;
      let n = 0;
      while (pendientes.length) {
        const el = pendientes[0];
        if (!el.isConnected) { pendientes.shift(); continue; }
        if (el.getBoundingClientRect().top > limite) break;
        pendientes.shift();
        const retraso = Math.min(n++ * 90, 450);
        window.setTimeout(() => el.classList.add("rv-in"), retraso);
      }
    };
    const alDesplazar = () => { if (!marco) marco = requestAnimationFrame(revisar); };
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar, { passive: true });

    const marcados = new WeakSet<Element>();
    const montar = () => {
      const main = document.querySelector("main");
      if (!main) return;
      const primera = main.querySelector(":scope > section, :scope > div");
      const alto = window.innerHeight;
      main.querySelectorAll<HTMLElement>(OBJETIVOS).forEach((el) => {
        if (marcados.has(el)) return;
        marcados.add(el);
        if (primera && primera.contains(el)) return; // la portada sale ya puesta
        if (el.closest("header, nav, dialog, [role=dialog], .no-revela")) return;
        // En el móvil el carrusel entra entero; en el PC, tarjeta a tarjeta.
        if (movil && el.parentElement?.classList.contains("carrusel")) return;
        if (!movil && el.classList.contains("carrusel") && el.classList.contains("grid")) return;
        // Nada de efectos dentro de algo que ya se revela (evita dobles saltos).
        if (el.parentElement?.closest(".rv")) return;
        // Lo que ya se ve al cargar no se toca.
        if (el.getBoundingClientRect().top < alto * 0.95) return;
        el.classList.add("rv");
        pendientes.push(el);
      });
      // Lo marcado en una segunda pasada puede quedar arriba: se reordena por posición en la página.
      pendientes.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      alDesplazar();
    };

    montar();
    // Secciones que se pintan en diferido: se revisan un poco después.
    const t1 = setTimeout(montar, 1200);
    const t2 = setTimeout(montar, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(marco);
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
      document.querySelectorAll(".rv").forEach((el) => el.classList.remove("rv", "rv-in"));
    };
  }, [ruta]);

  return null;
}
