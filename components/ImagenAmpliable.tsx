"use client";
import Image from "next/image";
import { useRef } from "react";

/* Miniatura que se amplía al pulsar (20-nov-2026): <dialog> nativo, se cierra con Escape, con la X o pulsando fuera.
   La imagen grande es la original (sin «-700») y solo se pide al abrir. */
export function ImagenAmpliable({ src, grande, alt, titulo, ancho, alto, sizes, className }: { src: string; grande: string; alt: string; titulo: string; ancho: number; alto: number; sizes: string; className?: string }) {
  const d = useRef<HTMLDialogElement>(null);
  const abierto = useRef(false);
  return (
    <>
      <button
        type="button"
        aria-label={`Ampliar: ${titulo}`}
        onClick={() => { abierto.current = true; d.current?.showModal(); }}
        className="group relative shrink-0 cursor-zoom-in rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-estrella"
      >
        <Image src={src} alt={alt} width={ancho} height={alto} sizes={sizes} className={className} />
        <span aria-hidden className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-noche/85 px-2 py-0.5 text-[11px] font-bold text-white">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4M11 8v6M8 11h6" /></svg>
          Ampliar
        </span>
      </button>
      <dialog
        ref={d}
        onClick={(e) => { if (e.target === d.current) d.current?.close(); }}
        className="m-auto w-[min(96vw,1100px)] max-w-none rounded-2xl bg-white p-0 text-tinta shadow-2xl backdrop:bg-noche/80"
      >
        <div className="flex items-center justify-between gap-3 border-b border-tinta/10 px-4 py-3 sm:px-5">
          <p className="text-sm font-extrabold sm:text-base">{titulo}</p>
          <button type="button" onClick={() => d.current?.close()} className="rounded-full bg-noche px-4 py-1.5 text-sm font-bold text-white">Cerrar</button>
        </div>
        <div className="max-h-[78vh] overflow-auto bg-niebla p-2 sm:p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={grande} alt={alt} loading="lazy" className="mx-auto h-auto w-full rounded-lg ring-1 ring-tinta/15" />
        </div>
        <p className="border-t border-tinta/10 px-4 py-2.5 text-xs text-tinta/70 sm:px-5">Ejemplo de estudio para un negocio ficticio. El tuyo se prepara con tu empresa.</p>
      </dialog>
    </>
  );
}
