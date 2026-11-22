"use client";

import dynamic from "next/dynamic";

// El test, montado desde el principio (landing de anuncios: la primera pregunta va en la portada).
const TestIdoneidad = dynamic(() => import("@/components/TestIdoneidad"), {
  ssr: false,
  loading: () => <div className="min-h-[560px] rounded-[1.75rem] bg-white/10 sm:min-h-[520px]" aria-hidden="true" />,
});

export default function TestYa({ entregas = false }: { entregas?: boolean }) {
  return <div className="min-h-[560px] sm:min-h-[520px]"><TestIdoneidad entregas={entregas} /></div>;
}
