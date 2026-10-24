"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// El test de idoneidad se monta cuando se acerca a la pantalla (o si se llega con #solicitud).
const TestIdoneidad = dynamic(() => import("@/components/TestIdoneidad"), { ssr: false });

export default function DiagnosticoDiferido() {
  const ref = useRef<HTMLDivElement>(null);
  const [ver, setVer] = useState(false);
  useEffect(() => {
    if (location.hash === "#solicitud" || location.hash === "#test") return setVer(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setVer(true), { rootMargin: "900px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={ver ? "" : "min-h-[1170px] sm:min-h-[900px]"}>{ver && <TestIdoneidad />}</div>;
}
