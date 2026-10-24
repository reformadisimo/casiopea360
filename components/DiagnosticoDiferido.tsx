"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// El formulario del estudio se monta cuando se acerca a la pantalla (o si se llega con #solicitud).
const Diagnostico = dynamic(() => import("@/components/Diagnostico"), { ssr: false });

export default function DiagnosticoDiferido() {
  const ref = useRef<HTMLDivElement>(null);
  const [ver, setVer] = useState(false);
  useEffect(() => {
    if (location.hash === "#solicitud") return setVer(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setVer(true), { rootMargin: "900px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={ver ? "" : "min-h-[560px]"}>{ver && <Diagnostico />}</div>;
}
