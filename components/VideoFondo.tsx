"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo de ambiente: mudo, en bucle, solo se carga cuando asoma en pantalla.
// Con "reducir movimiento" activado se queda en su foto fija.
// El iPhone a veces no deja arrancar vídeos solos (modo de ahorro de batería, o si no ve el vídeo como mudo).
// Si falla, lo intentamos de nuevo con el primer toque o desplazamiento de la persona, que sí lo permite.
const pendientes = new Set<HTMLVideoElement>();
let escuchando = false;
function reintentar() {
  pendientes.forEach((v) => {
    if (v.dataset.visible !== "1") return;
    v.muted = true;
    v.play().then(() => pendientes.delete(v)).catch(() => {});
  });
}
function arrancar(v: HTMLVideoElement) {
  if (document.documentElement.hasAttribute("data-sin-movimiento")) return;
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  v.play()
    .then(() => pendientes.delete(v))
    .catch(() => {
      pendientes.add(v);
      if (escuchando) return;
      escuchando = true;
      ["touchend", "click", "scroll", "keydown"].forEach((e) => window.addEventListener(e, reintentar, { passive: true }));
    });
}

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
  // Las fotos que no son de la cabecera esperan a que la página termine de cargar,
  // para que lo primero que se descargue sea lo que se ve al abrir.
  const [foto, setFoto] = useState(prioridad);

  useEffect(() => {
    if (prioridad) return;
    const ya = () => setFoto(true);
    if (document.readyState === "complete") ya();
    else window.addEventListener("load", ya, { once: true });
    return () => window.removeEventListener("load", ya);
  }, [prioridad]);

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
    // Los de cabecera esperan además a que la persona se mueva por la página (o a unos segundos),
    // para que la primera impresión sea instantánea y la foto no compita con el texto.
    const listo = new Promise<void>((res) => {
      const tras = () => {
        if (!prioridad) return void setTimeout(res, 1500);
        const eventos = ["pointermove", "touchstart", "scroll", "keydown"] as const;
        const ya = () => {
          eventos.forEach((e) => window.removeEventListener(e, ya));
          res();
        };
        eventos.forEach((e) => window.addEventListener(e, ya, { once: true, passive: true }));
        setTimeout(ya, 9000);
      };
      if (document.readyState === "complete") tras();
      else window.addEventListener("load", tras, { once: true });
    });
    let visible = false;
    let cancelado = false;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          visible = e.isIntersecting;
          v.dataset.visible = visible ? "1" : "0";
          if (visible) {
            listo.then(() => {
              if (cancelado || !visible) return;
              setCargar(true);
              arrancar(v);
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
  }, [prioridad]);

  // Al añadir la fuente del vídeo, se carga y arranca.
  useEffect(() => {
    if (!cargar) return;
    const v = ref.current;
    if (!v) return;
    v.load();
    arrancar(v);
  }, [cargar]);

  // La foto fija va como imagen ligera (WebP) que solo se descarga cuando asoma;
  // el vídeo aparece encima cuando ya está cargando.
  return (
    <div className="relative h-full w-full overflow-hidden">
      {foto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
        src={`/video/${nombre}.webp`}
        alt=""
        aria-hidden="true"
        loading={prioridad ? "eager" : "lazy"}
          // La foto de cabecera es decoración: se pide pronto pero sin quitar ancho de banda al texto.
        fetchPriority={prioridad ? "low" : "auto"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        />
      )}
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
