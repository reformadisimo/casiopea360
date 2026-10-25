"use client";

import { useEffect, useRef } from "react";

// Envuelve algo cuyas animaciones deben empezar cuando llega a pantalla, no al cargar la página.
// Hasta entonces las animaciones de dentro están en pausa (clase "en-pausa"); sin JavaScript no se pausan.
export default function AlEntrar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("en-pausa");
    const io = new IntersectionObserver(
      (e) => {
        if (!e.some((x) => x.isIntersecting)) return;
        el.classList.remove("en-pausa");
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
