"use client";

import { useEffect } from "react";

// Dos tareas pequeñas para las definiciones del glosario:
// 1. Que la burbuja no se salga de la pantalla (la desplaza o la pone debajo).
// 2. En pantallas táctiles, el primer toque la abre y el segundo lleva a la página.
export default function GlosarioTactil() {
  useEffect(() => {
    const colocar = (gl: Element) => {
      const tip = gl.querySelector<HTMLElement>(".gl-tip");
      if (!tip) return;
      gl.classList.remove("gl-abajo");
      tip.style.setProperty("--gl-dx", "0px");
      // Cerrada no ocupa sitio: se muestra un instante para medirla.
      const antes = tip.style.display;
      tip.style.display = "block";
      const r = tip.getBoundingClientRect();
      tip.style.display = antes;
      const margen = 10;
      let dx = 0;
      if (r.left < margen) dx = margen - r.left;
      else if (r.right > window.innerWidth - margen) dx = window.innerWidth - margen - r.right;
      tip.style.setProperty("--gl-dx", `${dx}px`);
      if (r.top < 70) gl.classList.add("gl-abajo");
    };

    const alEntrar = (e: Event) => {
      const gl = (e.target as Element | null)?.closest?.(".gl");
      if (gl) colocar(gl);
    };

    const cerrar = (salvo?: Element | null) => {
      document.querySelectorAll(".gl.gl-abierto").forEach((n) => {
        if (n !== salvo) n.classList.remove("gl-abierto");
      });
    };

    // Lo fiable para saber si se ha tocado con el dedo es el tipo de puntero del último toque.
    let ultimoPuntero = "";
    const alBajar = (e: PointerEvent) => {
      ultimoPuntero = e.pointerType;
    };

    const alPulsar = (e: MouseEvent) => {
      const objetivo = e.target as Element | null;
      const enlace = objetivo?.closest?.("a.gl-a");
      if (!enlace) {
        cerrar();
        return;
      }
      const tactil = ultimoPuntero === "touch" || ultimoPuntero === "pen" || window.matchMedia("(hover: none)").matches;
      if (!tactil) return;
      const gl = enlace.closest(".gl");
      if (!gl) return;
      if (!gl.classList.contains("gl-abierto")) {
        e.preventDefault();
        cerrar(gl);
        gl.classList.add("gl-abierto");
        colocar(gl);
      }
    };

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrar();
        (document.activeElement as HTMLElement | null)?.blur?.();
      }
    };

    document.addEventListener("pointerover", alEntrar);
    document.addEventListener("focusin", alEntrar);
    document.addEventListener("pointerdown", alBajar, true);
    document.addEventListener("click", alPulsar, true);
    document.addEventListener("keydown", alTeclear);
    return () => {
      document.removeEventListener("pointerover", alEntrar);
      document.removeEventListener("focusin", alEntrar);
      document.removeEventListener("pointerdown", alBajar, true);
      document.removeEventListener("click", alPulsar, true);
      document.removeEventListener("keydown", alTeclear);
    };
  }, []);
  return null;
}
