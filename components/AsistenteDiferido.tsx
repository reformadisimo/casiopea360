"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// El asistente se carga cuando la página ya está pintada y tranquila, para no restar velocidad.
const Asistente = dynamic(() => import("@/components/Asistente"), { ssr: false });

export default function AsistenteDiferido() {
  const [listo, setListo] = useState(false);
  useEffect(() => {
    const arrancar = () => setTimeout(() => setListo(true), 1200);
    if (document.readyState === "complete") arrancar();
    else window.addEventListener("load", arrancar, { once: true });
    return () => window.removeEventListener("load", arrancar);
  }, []);
  return listo ? <Asistente /> : null;
}
