"use client";

import { useEffect, useRef, useState } from "react";
import VideoAlClic from "@/components/VideoAlClic";

// Vídeo de la portada de la landing: arranca solo, en bucle y mudo (versión ligera).
// Con el botón de sonido pasa al anuncio con audio. «Ver el vídeo completo» abre el largo de YouTube
// con VideoAlClic (no carga nada de terceros hasta pulsar). Con ahorro de datos no arranca solo.
export default function VideoHero({ idCompleto, titulo }: { idCompleto: string; titulo: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sonido, setSonido] = useState(false);
  const [completo, setCompleto] = useState(false);
  const [ahorro, setAhorro] = useState(false);
  const [arrancar, setArrancar] = useState(false);

  // El vídeo (3,6 MB) no se pide hasta que la página ha cargado y pasan unos segundos, y solo con buena
  // conexión: así no compite con el test. Antes de eso se ve el cartel (foto). Con ahorro de datos, nunca solo.
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (c?.saveData || reducir) {
      setAhorro(true);
      return;
    }
    if (c?.effectiveType && c.effectiveType !== "4g") {
      setAhorro(true);
      return;
    }
    let t: ReturnType<typeof setTimeout> | undefined;
    const lanzar = () => {
      t = setTimeout(() => setArrancar(true), 3000);
    };
    if (document.readyState === "complete") lanzar();
    else window.addEventListener("load", lanzar, { once: true });
    return () => {
      window.removeEventListener("load", lanzar);
      if (t) clearTimeout(t);
    };
  }, []);

  if (completo) {
    return (
      <div>
        <VideoAlClic id={idCompleto} titulo={titulo} etiqueta="Vídeo generado con inteligencia artificial." />
        <button type="button" onClick={() => setCompleto(false)} className="mt-2 text-sm font-semibold text-white/80 underline underline-offset-4 hover:text-white">
          Volver al vídeo corto
        </button>
      </div>
    );
  }

  const activarSonido = () => {
    setSonido(true);
    requestAnimationFrame(() => {
      const v = ref.current;
      if (!v) return;
      v.muted = false;
      v.loop = false;
      v.currentTime = 0;
      v.play().catch(() => undefined);
    });
  };

  const quitarSonido = () => {
    setSonido(false);
    requestAnimationFrame(() => {
      const v = ref.current;
      if (!v) return;
      v.muted = true;
      v.loop = true;
      v.play().catch(() => undefined);
    });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[2.4rem] bg-estrella/20 blur-2xl" aria-hidden="true" />
      <div className="relative aspect-video overflow-hidden rounded-[1.6rem] bg-noche ring-1 ring-white/20">
        <video
          key={sonido ? "con-sonido" : arrancar ? "mudo" : "cartel"}
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/video/anuncio-corto-poster.webp"
          autoPlay={arrancar || sonido}
          muted={!sonido}
          loop={!sonido}
          playsInline
          preload="none"
          controls={sonido}
          aria-label={titulo}
          onEnded={() => sonido && quitarSonido()}
        >
          {(sonido || arrancar) && <source src={sonido ? "/video/anuncio-corto.mp4" : "/video/anuncio-corto-mudo.mp4"} type="video/mp4" />}
        </video>
        {!sonido && (
          <button
            type="button"
            onClick={activarSonido}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-noche/80 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-noche"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor" />
            </svg>
            {ahorro || !arrancar ? "Ver con sonido" : "Activar sonido"}
          </button>
        )}
      </div>
      <div className="relative z-10 mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="text-xs text-white/60">Vídeo generado con inteligencia artificial.</p>
        <button type="button" onClick={() => setCompleto(true)} className="text-sm font-bold text-estrella underline underline-offset-4 hover:text-white">
          Ver el vídeo completo
        </button>
      </div>
    </div>
  );
}
