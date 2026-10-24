"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

// Medición con permiso: Tag Manager (con Google Analytics, Google Ads, el píxel de Meta y el resto dentro)
// y Microsoft Clarity. Solo se cargan si el visitante acepta. Mientras no haya códigos en Vercel
// (NEXT_PUBLIC_GTM_ID y NEXT_PUBLIC_CLARITY_ID), aceptar no carga nada: el aviso queda listo para el día que se pongan.
const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;
const CLAVE = "casiopea-cookies";

type Eleccion = "aceptadas" | "rechazadas" | null;

export default function Medicion() {
  const [eleccion, setEleccion] = useState<Eleccion>(null);
  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(false);
  // El aviso sale siempre; las herramientas solo se cargan si tienen su código y el visitante acepta.
  const hayMedicion = true;

  useEffect(() => {
    if (!hayMedicion) return;
    let guardada: Eleccion = null;
    try {
      guardada = localStorage.getItem(CLAVE) as Eleccion;
    } catch {}
    setEleccion(guardada);
    setVisible(!guardada);
    const abrir = () => {
      setDetalle(true);
      setVisible(true);
    };
    window.addEventListener("abrir-cookies", abrir);
    return () => window.removeEventListener("abrir-cookies", abrir);
  }, [hayMedicion]);

  const decidir = (e: Exclude<Eleccion, null>) => {
    try {
      localStorage.setItem(CLAVE, e);
    } catch {}
    const antes = eleccion;
    setEleccion(e);
    setVisible(false);
    // Si retira el permiso después de haberlo dado, se recarga para quitar lo que ya estaba cargado.
    if (antes === "aceptadas" && e === "rechazadas") window.location.reload();
  };

  if (!hayMedicion) return null;

  return (
    <>
      {eleccion === "aceptadas" && GTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      )}
      {eleccion === "aceptadas" && CLARITY && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`}
        </Script>
      )}
      {visible && (
        <div role="dialog" aria-live="polite" aria-label="Aviso de cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-3xl bg-white p-5 text-tinta shadow-[0_24px_60px_-12px_rgba(14,26,61,0.45)] ring-1 ring-linea sm:p-6">
          <p className="font-extrabold">¿Nos dejas medir cómo se usa la web?</p>
          <p className="mt-1 text-sm text-gris">
            Usamos cookies de medición (Google Analytics) y mapas de calor anónimos (Microsoft Clarity) solo si aceptas. Nos sirven para saber qué funciona y mejorar la web. <Link href="/cookies" className="font-bold text-tinta underline underline-offset-2">Más información</Link>.
          </p>
          {detalle && (
            <ul className="mt-3 space-y-1 rounded-2xl bg-niebla p-3 text-sm">
              <li><b>Técnicas:</b> siempre activas, solo para recordar tu elección.</li>
              <li><b>Medición y mapas de calor:</b> solo si pulsas «Aceptar».</li>
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => decidir("aceptadas")} className="rounded-full bg-noche px-5 py-2.5 text-sm font-bold text-white hover:bg-noche-2">Aceptar</button>
            <button type="button" onClick={() => decidir("rechazadas")} className="rounded-full bg-noche px-5 py-2.5 text-sm font-bold text-white hover:bg-noche-2">Rechazar</button>
            {!detalle && (
              <button type="button" onClick={() => setDetalle(true)} className="rounded-full border border-linea px-5 py-2.5 text-sm font-bold hover:border-noche">Configurar</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
