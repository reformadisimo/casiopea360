"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// La calculadora se monta cuando se acerca a la pantalla: la página abre más rápido.
const CostesPorTamano = dynamic(() => import("@/components/CostesPorTamano"), { ssr: false });

export default function CostesDiferido() {
  const ref = useRef<HTMLDivElement>(null);
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setVer(true), { rootMargin: "800px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={ver ? "" : "min-h-[1400px] rounded-[2rem] bg-white/60"}>{ver && <CostesPorTamano />}</div>;
}
