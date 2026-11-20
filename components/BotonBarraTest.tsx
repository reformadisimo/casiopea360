"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// «Haz el test» de la barra de la landing: se esconde mientras el test está a la vista (la persona ya está dentro).
export default function BotonBarraTest() {
  const [dentro, setDentro] = useState(false);
  useEffect(() => {
    const el = document.getElementById("solicitud");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const o = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { threshold: 0, rootMargin: "-64px 0px -35% 0px" });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  if (dentro) return null;
  return <Link href="#solicitud" className="rounded-full bg-estrella px-5 py-2 text-sm font-bold text-tinta hover:bg-estrella-2">Haz el test</Link>;
}
