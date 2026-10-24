"use client";

import { useEffect, useRef, useState } from "react";

// Cifras del equipo que cuentan hacia arriba al aparecer en pantalla.
export const CIFRAS_EQUIPO: { valor: number; antes?: string; despues: string; texto: string }[] = [
  { valor: 22, despues: "+", texto: "años de experiencia en marketing digital" },
  { valor: 60000, despues: " €", texto: "al mes en Google Ads, gestionados para una sola empresa" },
  { valor: 360, despues: "°", texto: "todo lo digital, y fuera de internet si hace falta" },
  { valor: 48, despues: " h", texto: "como máximo para lo del día a día" },
];

const formato = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Cuenta({ valor, activo }: { valor: number; activo: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!activo) return;
    let quieto = false;
    try {
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (quieto) {
      setV(valor);
      return;
    }
    const inicio = performance.now();
    let id = 0;
    const paso = (t: number) => {
      const p = Math.min(1, (t - inicio) / 1400);
      setV(Math.round(valor * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [activo, valor]);
  return <>{formato(v)}</>;
}

export default function CifrasEquipo({ claro = false }: { claro?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setActivo(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CIFRAS_EQUIPO.map((c) => (
        <div key={c.texto} className={`rounded-[1.6rem] p-6 ${claro ? "border border-linea bg-white" : "border border-white/15 bg-white/[0.06] backdrop-blur-sm"}`}>
          <p className={`text-5xl font-extrabold leading-none ${claro ? "text-noche" : "text-estrella"}`}>
            <Cuenta valor={c.valor} activo={activo} />
            {c.despues}
          </p>
          <p className={`mt-3 ${claro ? "text-gris" : "text-white/80"}`}>{c.texto}</p>
        </div>
      ))}
    </div>
  );
}
