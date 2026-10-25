"use client";

import { useRef, useState } from "react";

// Comparador antes/después: dos capturas de la misma web, una encima de otra, y un tirador que descubre la nueva.
// Se mueve con el ratón, con el dedo y con el teclado (es un control deslizante de verdad).
export default function AntesDespues({ antes, despues, nombre, ancho = 1280, alto = 585 }: { antes: string; despues: string; nombre: string; ancho?: number; alto?: number }) {
  const [p, setP] = useState(50);
  const caja = useRef<HTMLDivElement>(null);
  const arrastrando = useRef(false);

  const mover = (clientX: number) => {
    const r = caja.current?.getBoundingClientRect();
    if (!r) return;
    setP(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={caja}
      className="relative select-none overflow-hidden rounded-[1.6rem] bg-noche shadow-[0_30px_60px_-30px_rgba(14,26,61,0.6)] ring-1 ring-linea"
      style={{ aspectRatio: `${ancho} / ${alto}` }}
      onPointerDown={(e) => {
        arrastrando.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        mover(e.clientX);
      }}
      onPointerMove={(e) => arrastrando.current && mover(e.clientX)}
      onPointerUp={() => (arrastrando.current = false)}
      onPointerCancel={() => (arrastrando.current = false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={antes} alt={`La web de ${nombre} antes`} width={ancho} height={alto} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${p}%)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={despues} alt={`La web de ${nombre} después, hecha por Casiopea 360`} width={ancho} height={alto} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>

      <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-noche/80 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur sm:text-sm">Antes</span>
      <span aria-hidden="true" className="absolute right-3 top-3 rounded-full bg-estrella px-3 py-1 text-xs font-bold text-tinta sm:text-sm">Después</span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(14,26,61,0.3)]" style={{ left: `${p}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-estrella text-tinta shadow-lg ring-4 ring-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" /></svg>
        </span>
      </div>

      <input
        type="range"
        min={2}
        max={98}
        value={Math.round(p)}
        onChange={(e) => setP(Number(e.target.value))}
        aria-label={`Comparar la web de ${nombre} antes y después`}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
