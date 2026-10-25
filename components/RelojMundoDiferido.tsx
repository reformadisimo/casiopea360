"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// El globo (y sus 2.600 puntos de tierra) solo se descarga cuando se acerca a la pantalla.
const RelojMundo = dynamic(() => import("@/components/RelojMundo"), { ssr: false });

export default function RelojMundoDiferido() {
  const ref = useRef<HTMLDivElement>(null);
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setVer(true), { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="min-h-[640px] lg:min-h-[520px]">{ver && <RelojMundo />}</div>;
}
