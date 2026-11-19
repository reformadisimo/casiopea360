"use client";

import { useState } from "react";

// Vídeo de YouTube que NO carga nada de terceros hasta que la persona lo pulsa (youtube-nocookie).
export default function VideoAlClic({ id, titulo, etiqueta }: { id: string; titulo: string; etiqueta?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-[2.4rem] bg-estrella/20 blur-2xl" aria-hidden="true" />
      <div className="relative aspect-video overflow-hidden rounded-[1.6rem] bg-noche ring-1 ring-white/20">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={titulo}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={`Ver el vídeo: ${titulo}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#16286b] via-[#0b1745] to-[#050b26] text-white"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-estrella text-tinta shadow-[0_0_0_10px_rgba(255,197,61,0.25),0_0_40px_rgba(255,197,61,0.7)] transition-transform group-hover:scale-110">
              <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
            <span className="px-6 text-center text-lg font-bold sm:text-xl">Míralo en 2 minutos</span>
          </button>
        )}
      </div>
      {etiqueta && <p className="mt-2 text-xs text-white/60">{etiqueta}</p>}
    </div>
  );
}
