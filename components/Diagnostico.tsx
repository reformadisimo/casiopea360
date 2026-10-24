"use client";

import { useState } from "react";
import { CONTACTO } from "@/lib/contenido";

// Formulario corto del diagnóstico gratis: cuatro datos.
// Mientras no haya canal de contacto configurado, avisa en vez de fingir que envía.
export default function Diagnostico() {
  const [estado, setEstado] = useState<"" | "sin-canal">("");

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const texto =
      `Hola, quiero el diagnóstico gratis.\n` +
      `Nombre: ${d.get("nombre")}\n` +
      `Negocio: ${d.get("negocio")}\n` +
      `Web o ficha de Google: ${d.get("web")}\n` +
      `Teléfono: ${d.get("telefono")}`;
    if (CONTACTO.whatsapp) {
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
      return;
    }
    if (CONTACTO.correo) {
      window.location.href = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent("Diagnóstico gratis")}&body=${encodeURIComponent(texto)}`;
      return;
    }
    setEstado("sin-canal");
  }

  const campo =
    "mt-1.5 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-estrella focus:outline-none";

  return (
    <form onSubmit={enviar} className="grid content-start gap-4 sm:grid-cols-2">
      <label className="block text-sm font-bold text-white">
        Tu nombre
        <input name="nombre" required autoComplete="name" className={campo} />
      </label>
      <label className="block text-sm font-bold text-white">
        Tu negocio
        <input name="negocio" required placeholder="Ej.: carpintería de aluminio" className={campo} />
      </label>
      <label className="block text-sm font-bold text-white">
        Tu web o tu ficha de Google
        <input name="web" placeholder="Si no tienes, déjalo en blanco" className={campo} />
      </label>
      <label className="block text-sm font-bold text-white">
        Tu teléfono
        <input name="telefono" required type="tel" autoComplete="tel" className={campo} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-full bg-estrella px-7 py-4 text-lg font-bold text-tinta transition-colors hover:bg-estrella-2 sm:w-auto"
        >
          Pedir mi diagnóstico gratis
        </button>
        <p className="mt-3 text-sm text-white/70">Te responde una persona, no un robot. Sin compromiso.</p>
        {estado === "sin-canal" && (
          <p role="status" className="mt-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
            Aún no hemos activado el envío de esta web de prueba. Tus datos no se han enviado a ningún sitio.
          </p>
        )}
      </div>
    </form>
  );
}
