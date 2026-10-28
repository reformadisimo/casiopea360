import Link from "next/link";

/* Barra fija para volver a la web desde las herramientas de ejemplo (panel, CRM, lupa, avisos).
   Siempre visible, encima de todo, y empuja hacia abajo la guía lateral del panel para no taparse. */
export default function VolverWeb({ que }: { que: string }) {
  return (
    <>
      <style>{`
        main#contenido { padding-top: 48px !important; }
        [role="dialog"].fixed.inset-0, .fixed.inset-0.z-50 { top: 48px !important; }
        aside[aria-label="Guía de uso"] { top: 48px !important; }
        @media print { [data-volver-web] { display: none !important; } main#contenido { padding-top: 0 !important; } }
      `}</style>
      <div data-volver-web style={{ zIndex: 2147483000 }} className="fixed inset-x-0 top-0 flex h-12 items-center justify-between gap-3 bg-[#0e1a3d] px-3 text-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] sm:px-5">
        <Link
          href="/"
          className="inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#ffd23f] px-4 text-[15px] font-bold text-[#0e1a3d] hover:brightness-105"
        >
          <span aria-hidden="true">←</span> Volver a la web
        </Link>
        <p className="truncate text-[13px] text-white/75 sm:text-[14px]">
          <b className="text-white">Casiopea 360</b> · {que}
        </p>
      </div>
    </>
  );
}
