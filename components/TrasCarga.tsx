"use client";

import { useEffect, useState, type ReactNode } from "react";

// Muestra su contenido cuando la página ya ha terminado de cargar (para logos y adornos).
export default function TrasCarga({ children, hueco }: { children: ReactNode; hueco?: ReactNode }) {
  const [listo, setListo] = useState(false);
  useEffect(() => {
    const ya = () => setListo(true);
    if (document.readyState === "complete") ya();
    else window.addEventListener("load", ya, { once: true });
    return () => window.removeEventListener("load", ya);
  }, []);
  return <>{listo ? children : hueco ?? null}</>;
}
