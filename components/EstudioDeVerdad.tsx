"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// «Así es un estudio de verdad»: cuatro páginas de la guía de ejemplo (despacho ficticio, datos difuminados),
// encima del test, para que se vea lo que se lleva quien encaja. Al tocar una, se ve en grande.
const PAGINAS = [
  { src: "/marca/muestra-1.webp", t: "Tu guía, a medida" },
  { src: "/marca/muestra-2.webp", t: "Tu semáforo" },
  { src: "/marca/muestra-3.webp", t: "Tu web, rediseñada" },
  { src: "/marca/muestra-4.webp", t: "Tu competencia" },
];

export default function EstudioDeVerdad() {
  const [grande, setGrande] = useState<number | null>(null);

  useEffect(() => {
    if (grande === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGrande(null);
      if (e.key === "ArrowRight") setGrande((g) => (g === null ? g : (g + 1) % PAGINAS.length));
      if (e.key === "ArrowLeft") setGrande((g) => (g === null ? g : (g + PAGINAS.length - 1) % PAGINAS.length));
    };
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [grande]);

  return (
    <div className="mt-8 rounded-[1.8rem] bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
      <p className="text-sm font-extrabold uppercase tracking-wider text-estrella">No te lo pierdas</p>
      <p className="mt-1 text-xl font-extrabold">Así es un estudio de verdad.</p>
      <p className="mt-1 text-sm text-white/75">Esto es lo que preparamos gratis si encajas. Toca una página para verla en grande.</p>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {PAGINAS.map((x, i) => (
          <li key={x.src}>
            <button
              type="button"
              onClick={() => setGrande(i)}
              className={`block w-full overflow-hidden rounded-xl bg-white text-left shadow-lg ring-1 ring-black/10 transition-transform hover:scale-[1.03] ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              <Image src={x.src} alt={`Estudio de ejemplo: ${x.t.toLowerCase()}`} width={360} height={304} className="h-auto w-full" />
              <span className="block truncate px-2 py-1.5 text-xs font-bold text-tinta">{x.t}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-white/60">Estudio de ejemplo de un despacho ficticio, con datos difuminados. El tuyo, con tu empresa, tus datos reales y 29 apartados.</p>

      {grande !== null && (
        <div className="fixed inset-0 z-[85] grid place-items-center bg-noche/85 p-4 backdrop-blur-sm" onClick={() => setGrande(null)}>
          <div role="dialog" aria-modal="true" aria-label={`Estudio de ejemplo: ${PAGINAS[grande].t}`} className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image src={PAGINAS[grande].src} alt={`Estudio de ejemplo: ${PAGINAS[grande].t.toLowerCase()}`} width={720} height={608} className="h-auto w-full rounded-2xl shadow-2xl" />
            <div className="mt-3 flex items-center justify-between gap-3 text-white">
              <button type="button" onClick={() => setGrande((grande + PAGINAS.length - 1) % PAGINAS.length)} className="min-h-11 rounded-full bg-white/15 px-4 font-bold hover:bg-white/25">
                ← Anterior
              </button>
              <span className="text-sm font-bold">{grande + 1} de {PAGINAS.length} · {PAGINAS[grande].t}</span>
              <button type="button" onClick={() => setGrande((grande + 1) % PAGINAS.length)} className="min-h-11 rounded-full bg-white/15 px-4 font-bold hover:bg-white/25">
                Siguiente →
              </button>
            </div>
            <button type="button" onClick={() => setGrande(null)} aria-label="Cerrar" className="absolute -right-2 -top-3 grid h-11 w-11 place-items-center rounded-full bg-white text-tinta shadow-lg">
              <svg viewBox="0 0 24 24" className="pointer-events-none h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
