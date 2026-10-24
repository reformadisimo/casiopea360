"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo de ambiente: mudo, en bucle, solo se carga cuando asoma en pantalla.
// Con "reducir movimiento" activado se queda en su foto fija.
export default function VideoFondo({
  nombre,
  className = "",
  alt,
}: {
  nombre: string;
  className?: string;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let quieto = false;
    try {
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (quieto) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            setCargar(true);
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={`/video/${nombre}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    >
      {cargar && <source src={`/video/${nombre}.mp4`} type="video/mp4" />}
    </video>
  );
}
