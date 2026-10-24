"use client";

import { useEffect, useId, useRef, useState } from "react";

// Palabra técnica con su explicación en una frase, al tocarla.
export default function Termino({ palabra, explicacion }: { palabra: string; explicacion: string }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: Event) => ref.current && !ref.current.contains(e.target as Node) && setAbierto(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", esc);
    };
  }, [abierto]);
  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        aria-expanded={abierto}
        aria-describedby={abierto ? id : undefined}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setAbierto((a) => !a);
        }}
        className="cursor-help underline decoration-estrella decoration-dotted decoration-2 underline-offset-4"
      >
        {palabra}
      </button>
      {abierto && (
        <span role="tooltip" id={id} className="aparece absolute bottom-full left-1/2 z-40 mb-2 block w-64 -translate-x-1/2 rounded-2xl bg-noche px-4 py-3 text-left text-sm font-normal normal-case leading-snug tracking-normal text-white shadow-xl">
          <b className="text-estrella">{palabra}:</b> {explicacion}
        </span>
      )}
    </span>
  );
}
