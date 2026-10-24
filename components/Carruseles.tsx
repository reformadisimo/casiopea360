"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// En el móvil, cada lista .carrusel se desliza; aquí se añaden los puntitos y la barra de progreso de lectura.
export default function Carruseles() {
  const ruta = usePathname();

  useEffect(() => {
    const limpiar: (() => void)[] = [];
    const montar = () => {
      document.querySelectorAll<HTMLElement>(".carrusel").forEach((c) => {
        if (c.dataset.puntos === "1") return;
        const n = c.children.length;
        if (n < 2) return;
        c.dataset.puntos = "1";
        const puntos = document.createElement("div");
        puntos.className = "puntos-carrusel";
        puntos.setAttribute("aria-hidden", "true");
        puntos.innerHTML = Array.from({ length: n }, (_, i) => `<span${i === 0 ? ' class="activo"' : ""}></span>`).join("") + "<em>desliza</em>";
        c.after(puntos);
        const marcas = Array.from(puntos.querySelectorAll("span"));
        const actualizar = () => {
          const hijos = Array.from(c.children) as HTMLElement[];
          const izq = c.getBoundingClientRect().left;
          let mejor = 0;
          let dist = Infinity;
          hijos.forEach((h, i) => {
            const d = Math.abs(h.getBoundingClientRect().left - izq - 16);
            if (d < dist) {
              dist = d;
              mejor = i;
            }
          });
          // al llegar al final, el último
          if (c.scrollLeft + c.clientWidth >= c.scrollWidth - 4) mejor = n - 1;
          marcas.forEach((m, i) => m.classList.toggle("activo", i === mejor));
          const txt = puntos.querySelector("em");
          if (txt) txt.style.visibility = mejor === n - 1 ? "hidden" : "visible";
        };
        c.addEventListener("scroll", actualizar, { passive: true });
        limpiar.push(() => {
          c.removeEventListener("scroll", actualizar);
          puntos.remove();
          delete c.dataset.puntos;
        });
      });
    };
    // Las secciones se pintan en diferido: se revisa al cargar y un poco después.
    montar();
    const t = setTimeout(montar, 1500);
    const t2 = setTimeout(montar, 4000);

    const barra = document.createElement("div");
    barra.className = "progreso-lectura";
    barra.setAttribute("aria-hidden", "true");
    document.body.appendChild(barra);
    let pendiente = false;
    const progreso = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        const alto = document.documentElement.scrollHeight - window.innerHeight;
        barra.style.transform = `scaleX(${alto > 0 ? Math.min(window.scrollY / alto, 1) : 0})`;
      });
    };
    window.addEventListener("scroll", progreso, { passive: true });
    progreso();

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      limpiar.forEach((f) => f());
      window.removeEventListener("scroll", progreso);
      barra.remove();
    };
  }, [ruta]);

  return null;
}
