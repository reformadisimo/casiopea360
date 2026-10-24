"use client";

// Enlace del pie para cambiar la elección de cookies.
export default function BotonCookies() {
  return (
    <li>
      <button type="button" onClick={() => window.dispatchEvent(new Event("abrir-cookies"))} className="hover:text-white">
        Configurar cookies
      </button>
    </li>
  );
}
