"use client";

import { useEffect, useRef, useState } from "react";

// Una cifra que sube desde cero cuando entra en pantalla. El texto final se renderiza invisible debajo
// para reservar su anchura exacta: así no se mueve nada mientras cuenta.
export default function Cifra({ valor, antes = "", despues = "", decimales = 0, duracion = 1200, className = "" }: { valor: number; antes?: string; despues?: string; decimales?: number; duracion?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);
  const formato = (x: number) => antes + x.toLocaleString("es-ES", { minimumFractionDigits: decimales, maximumFractionDigits: decimales }) + despues;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let quieto = false;
    try {
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (quieto) {
      setN(valor);
      return;
    }
    let marco = 0;
    const io = new IntersectionObserver(
      (e) => {
        if (!e.some((x) => x.isIntersecting)) return;
        io.disconnect();
        const inicio = performance.now();
        const paso = (t: number) => {
          const p = Math.min(1, (t - inicio) / duracion);
          const suave = 1 - Math.pow(1 - p, 3);
          setN(valor * suave);
          if (p < 1) marco = requestAnimationFrame(paso);
        };
        marco = requestAnimationFrame(paso);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(marco);
    };
  }, [valor, duracion]);

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className}`}>
      <span className={n === null ? "" : "invisible"} aria-hidden={n !== null}>{formato(valor)}</span>
      {n !== null && <span className="absolute inset-0 whitespace-nowrap">{formato(n)}</span>}
    </span>
  );
}
