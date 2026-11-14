"use client";

import { useEffect, useState } from "react";

// Pildorita de version. Subirla en CADA cambio con regex + assert:
// re.sub(r'cas·v\d+', 'cas·vNNN', s) y comprobar que cambio.
// El público no la ve. Se enciende en un navegador entrando una vez con ?ver=1 en la dirección
// (se recuerda en ese navegador) y se apaga con ?ver=0.
export default function Versionante() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("ver");
      if (q === "1") localStorage.setItem("cas-ver", "1");
      if (q === "0") localStorage.removeItem("cas-ver");
      setVer(localStorage.getItem("cas-ver") === "1");
    } catch {}
  }, []);
  if (!ver) return null;
  return (
    <div
      aria-hidden="true"
      data-versionante
      className="pointer-events-none fixed bottom-1.5 left-1.5 z-50 rounded-full bg-[#f5efe3]/80 px-2 py-0.5 text-[10px] font-medium text-[#3a3a3a]/80"
    >
      cas·v256
    </div>
  );
}
