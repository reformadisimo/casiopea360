"use client";

import { useEffect, useRef } from "react";

// Un titular que pasa de borroso a nítido al llegar a pantalla (idea de Ícaro). Pensado para pocos titulares.
// Sin JavaScript, o con «reducir movimiento», o si ya está a la vista al cargar, se ve normal: nunca se esconde texto sin motivo.
export default function Nitido({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let quieto = false;
    try {
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (quieto || el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add("nitido-pre");
    const io = new IntersectionObserver(
      (e) => {
        if (!e.some((x) => x.isIntersecting)) return;
        el.classList.add("nitido-ya");
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} className="nitido block">{children}</span>;
}
