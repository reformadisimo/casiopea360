"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { META_PIXEL } from "@/lib/pixel";

// Medición con permiso: Tag Manager (con Google Analytics, Google Ads, el píxel de Meta y el resto dentro)
// y Microsoft Clarity. Solo se cargan si el visitante acepta. Mientras no haya códigos en Vercel
// (NEXT_PUBLIC_GTM_ID y NEXT_PUBLIC_CLARITY_ID), aceptar no carga nada: el aviso queda listo para el día que se pongan.
// Contenedor de Google Analytics 4 de Casiopea (propiedad «Casiopea 360 web»). Es un identificador público.
const GTM = process.env.NEXT_PUBLIC_GTM_ID || "GTM-T7XCVW44";
// Proyecto de Clarity de Casiopea (identificador público). Sigue cargándose SOLO si el visitante acepta las cookies.
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID || "zg5ngcgsqr";
const CLAVE = "casiopea-cookies";

type Eleccion = "aceptadas" | "rechazadas" | null;

export default function Medicion() {
  const [eleccion, setEleccion] = useState<Eleccion>(null);
  // El aviso viene ya pintado desde el servidor (así no aparece de golpe más tarde);
  // si ya se decidió, un script en <head> lo oculta antes de pintar.
  const [visible, setVisible] = useState(true);
  const [detalle, setDetalle] = useState(false);
  // El aviso sale siempre; las herramientas solo se cargan si tienen su código y el visitante acepta.
  const hayMedicion = true;

  useEffect(() => {
    if (!hayMedicion) return;
    // Dentro de un marco (la Lupa de ejemplo) no se mide nada ni se pregunta por las cookies.
    if (window.self !== window.top) {
      setVisible(false);
      return;
    }
    let guardada: Eleccion = null;
    try {
      guardada = localStorage.getItem(CLAVE) as Eleccion;
    } catch {}
    setEleccion(guardada);
    setVisible(!guardada);
    const abrir = () => {
      document.documentElement.classList.remove("cookies-decididas");
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
      {eleccion === "aceptadas" && META_PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL}');fbq('track','PageView');`}
        </Script>
      )}
      {eleccion === "aceptadas" && CLARITY && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`}
        </Script>
      )}
      {visible && (
        <div data-aviso-cookies role="dialog" aria-live="polite" aria-label="Aviso de cookies" className="fixed inset-x-2 bottom-2 z-50 mx-auto max-w-3xl rounded-2xl bg-white p-3.5 sm:flex sm:max-w-5xl sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:px-6 sm:py-3 text-tinta shadow-[0_24px_60px_-12px_rgba(14,26,61,0.45)] ring-1 ring-linea sm:inset-x-3 sm:bottom-3 sm:rounded-3xl sm:p-6">
          <div className="sm:min-w-0 sm:flex-1">
          <p className="text-[0.95rem] font-extrabold sm:text-base">¿Nos dejas medir cómo se usa la web?</p>
          <p className="mt-1 text-xs text-gris sm:text-[0.8rem] sm:leading-snug">
            Usamos cookies de medición (Google Analytics) y mapas de calor anónimos (Microsoft Clarity){META_PIXEL ? " y el píxel de Meta, para medir nuestros anuncios," : ""} solo si aceptas. <span className="max-sm:hidden">Nos sirven para saber qué funciona y mejorar la web. </span><Link prefetch={false} href="/cookies" className="font-bold text-tinta underline underline-offset-2">Más sobre las cookies</Link>.
          </p>
          </div>
          {detalle && (
            <ul className="mt-3 space-y-1 rounded-2xl bg-niebla p-3 text-sm sm:order-3 sm:w-full">
              <li><b>Técnicas:</b> siempre activas, solo para recordar tu elección.</li>
              <li><b>Medición y mapas de calor:</b> solo si pulsas «Aceptar».</li>
            </ul>
          )}
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
            <button type="button" onClick={() => decidir("aceptadas")} className="rounded-full bg-noche px-5 py-2 text-sm font-bold text-white hover:bg-noche-2 sm:py-2">Aceptar</button>
            <button type="button" onClick={() => decidir("rechazadas")} className="rounded-full bg-noche px-5 py-2 text-sm font-bold text-white hover:bg-noche-2 sm:py-2">Rechazar</button>
            {!detalle && (
              <button type="button" onClick={() => setDetalle(true)} className="rounded-full border border-linea px-5 py-2 text-sm font-bold hover:border-noche sm:py-2">Configurar</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
