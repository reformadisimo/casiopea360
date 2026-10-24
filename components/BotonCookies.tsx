"use client";

// Enlace del pie para cambiar la elección de cookies. Solo aparece si la web mide algo.
export default function BotonCookies() {
  if (!process.env.NEXT_PUBLIC_GTM_ID && !process.env.NEXT_PUBLIC_CLARITY_ID) return null;
  return (
    <li>
      <button type="button" onClick={() => window.dispatchEvent(new Event("abrir-cookies"))} className="hover:text-white">
        Configurar cookies
      </button>
    </li>
  );
}
