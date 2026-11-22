"use client";

import { useState } from "react";

// Anuncio de 30 s («¿Cuánta gente que te necesita ni sabe que existes?»): solo se ve el cartel hasta que se pulsa.
// En móvil se pide la versión 4:5 y en pantallas anchas la 16:9. No se descarga nada antes del clic.
export default function VideoPulsar({ titulo }: { titulo: string }) {
  const [src, setSrc] = useState("");
  const pulsar = () => setSrc(window.matchMedia("(min-width: 640px)").matches ? "/video/dolor-30s-16x9.mp4" : "/video/dolor-30s-4x5.mp4");
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-noche ring-1 ring-white/20 sm:aspect-video">
        {src ? (
          <video className="absolute inset-0 h-full w-full object-cover" src={src} autoPlay controls playsInline aria-label={titulo} />
        ) : (
          <button type="button" onClick={pulsar} aria-label={`Ver el vídeo: ${titulo}`} className="group absolute inset-0">
            <picture>
              <source media="(min-width: 640px)" srcSet="/video/dolor-30s-16x9.webp" />
              <img src="/video/dolor-30s-4x5.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </picture>
            <span className="absolute inset-0 bg-noche/20" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-estrella text-tinta shadow-[0_0_0_10px_rgba(255,197,61,0.25),0_0_40px_rgba(255,197,61,0.7)] transition-transform group-hover:scale-110">
              <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-noche/85 px-3.5 py-1.5 text-sm font-bold text-white ring-1 ring-white/30">Míralo en 30 segundos</span>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-white/60">Vídeo generado con inteligencia artificial.</p>
    </div>
  );
}
