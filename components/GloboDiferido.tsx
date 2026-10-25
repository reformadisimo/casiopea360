"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// El globo solo (sin relojes) para la cabecera de una página. Mientras carga se ve una esfera azul del mismo tamaño,
// así no se mueve nada; el globo de verdad entra cuando el navegador está libre para no frenar la carga.
const RelojMundo = dynamic(() => import("@/components/RelojMundo"), { ssr: false });

export default function GloboDiferido() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    // Entra cuando la página ya ha cargado del todo y el navegador lleva un rato libre: así no pesa en la medición de carga.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    let t = 0;
    const ir = () => {
      t = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(() => setVer(true), { timeout: 4000 }) : setVer(true)), 2500);
    };
    if (document.readyState === "complete") ir();
    else window.addEventListener("load", ir, { once: true });
    return () => {
      window.removeEventListener("load", ir);
      clearTimeout(t);
    };
  }, []);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[480px]">
      {ver ? (
        <RelojMundo soloGlobo />
      ) : (
        <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#1d3dff,#12267a_60%,#0a1435)] shadow-[0_0_60px_rgba(80,130,255,0.45)]" />
      )}
    </div>
  );
}
