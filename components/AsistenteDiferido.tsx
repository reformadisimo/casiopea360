"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// El asistente se carga cuando la página ya está pintada y tranquila, para no restar velocidad.
const Asistente = dynamic(() => import("@/components/Asistente"), { ssr: false });
const AvisoSalida = dynamic(() => import("@/components/AvisoSalida"), { ssr: false });
const Carruseles = dynamic(() => import("@/components/Carruseles"), { ssr: false });

export default function AsistenteDiferido() {
  const [listo, setListo] = useState(false);
  useEffect(() => {
    // Dentro de un marco (la Lupa de ejemplo) no aparece el asistente ni los avisos flotantes.
    if (window.self !== window.top) return;
    // Aparece cuando la persona empieza a moverse por la página, o a los pocos segundos.
    const eventos = ["pointermove", "touchstart", "scroll", "keydown"] as const;
    const ya = () => {
      eventos.forEach((e) => window.removeEventListener(e, ya));
      clearTimeout(t);
      setListo(true);
    };
    eventos.forEach((e) => window.addEventListener(e, ya, { once: true, passive: true }));
    const t = setTimeout(ya, 7000);
    return () => {
      eventos.forEach((e) => window.removeEventListener(e, ya));
      clearTimeout(t);
    };
  }, []);
  return listo ? (
    <>
      <Asistente />
      <AvisoSalida />
      <Carruseles />
    </>
  ) : null;
}
