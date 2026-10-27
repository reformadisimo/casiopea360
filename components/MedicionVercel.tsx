"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Visitas y velocidad real (Vercel), sin cookies. Dentro de un marco (la Lupa de ejemplo) no se envía nada.
const enMarco = () => typeof window !== "undefined" && window.self !== window.top;

export default function MedicionVercel() {
  return (
    <>
      <Analytics beforeSend={(e) => (enMarco() ? null : e)} />
      <SpeedInsights beforeSend={(d) => (enMarco() ? null : d)} />
    </>
  );
}
