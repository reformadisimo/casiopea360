"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo de ambiente: mudo, en bucle, solo se carga cuando asoma en pantalla.
// Con "reducir movimiento" activado se queda en su foto fija.
export default function VideoFondo({
  nombre,
  className = "",
  alt,
  prioridad = false,
}: {
  nombre: string;
  className?: string;
  alt: string;
  prioridad?: boolean;
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
    // Los vídeos esperan a que la página haya terminado de cargar: primero se pinta el texto
    // (con la foto fija de fondo) y después arranca el movimiento.
    const listo = new Promise<void>((res) => {
      const tras = () => setTimeout(res, 1500);
      if (document.readyState === "complete") tras();
      else window.addEventListener("load", tras, { once: true });
    });
    let visible = false;
    let cancelado = false;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          visible = e.isIntersecting;
          if (visible) {
            listo.then(() => {
              if (cancelado || !visible) return;
              setCargar(true);
              v.play().catch(() => {});
            });
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => {
      cancelado = true;
      io.disconnect();
    };
  }, []);

  // Al añadir la fuente del vídeo, se carga y arranca.
  useEffect(() => {
    if (!cargar) return;
    const v = ref.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [cargar]);

  // La foto fija va como imagen ligera (WebP) que solo se descarga cuando asoma;
  // el vídeo aparece encima cuando ya está cargando.
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/video/${nombre}.webp`}
        alt=""
        aria-hidden="true"
        loading={prioridad ? "eager" : "lazy"}
        fetchPriority={prioridad ? "high" : "auto"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${cargar ? "opacity-100" : "opacity-0"} ${className}`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
      >
        {cargar && <source src={`/video/${nombre}.mp4`} type="video/mp4" />}
      </video>
    </div>
  );
}
