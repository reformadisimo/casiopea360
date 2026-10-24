"use client";

import { useState } from "react";
import { CONTACTO } from "@/lib/contenido";

// Test de idoneidad para el estudio gratuito.
// Mientras no haya canal de contacto configurado, avisa en vez de fingir que envía.
const FACTURACION = ["Menos de 1 millón", "De 1 a 4 millones", "De 4 a 10 millones", "Más de 10 millones"];
const EMPLEADOS = ["Menos de 10", "De 10 a 50", "De 50 a 250", "Más de 250"];
const INVERSION = ["Nada", "Menos de 1.000 € al mes", "De 1.000 a 5.000 € al mes", "Más de 5.000 € al mes"];
const HOY = ["Una agencia", "Varios proveedores", "Alguien de la casa", "Nadie, por ahora"];

export default function Diagnostico() {
  const [estado, setEstado] = useState<"" | "sin-canal">("");

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const texto =
      `Hola, quiero solicitar el estudio gratuito.\n` +
      `Nombre y cargo: ${d.get("nombre")}\n` +
      `Empresa: ${d.get("empresa")}\n` +
      `Web: ${d.get("web")}\n` +
      `Dónde están: ${d.get("ciudad")}\n` +
      `A qué se dedica: ${d.get("sector")}\n` +
      `Facturación aproximada: ${d.get("facturacion")}\n` +
      `Empleados: ${d.get("empleados")}\n` +
      `Cómo llevan hoy el marketing: ${d.get("hoy")}\n` +
      `Inversión en anuncios: ${d.get("inversion")}\n` +
      `Teléfono: ${d.get("telefono")}\n` +
      `Correo: ${d.get("correo")}`;
    if (CONTACTO.whatsapp) {
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
      return;
    }
    if (CONTACTO.correo) {
      window.location.href = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent("Solicitud de estudio gratuito")}&body=${encodeURIComponent(texto)}`;
      return;
    }
    setEstado("sin-canal");
  }

  const campo =
    "mt-1.5 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-estrella focus:outline-none";
  const etiqueta = "block text-sm font-bold text-white";

  const desplegable = (name: string, texto: string, opciones: string[]) => (
    <label className={etiqueta}>
      {texto}
      <select name={name} required defaultValue="" className={`${campo} [&>option]:text-tinta`}>
        <option value="" disabled>
          Elige una opción
        </option>
        {opciones.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );

  return (
    <form onSubmit={enviar} className="grid content-start gap-4 sm:grid-cols-2">
      <label className={etiqueta}>
        Tu nombre y cargo
        <input name="nombre" required autoComplete="name" placeholder="Ej.: Ana López, directora general" className={campo} />
      </label>
      <label className={etiqueta}>
        Empresa
        <input name="empresa" required autoComplete="organization" className={campo} />
      </label>
      <label className={etiqueta}>
        Vuestra web
        <input name="web" placeholder="Si no tenéis, déjalo en blanco" className={campo} />
      </label>
      <label className={etiqueta}>
        Dónde estáis
        <input name="ciudad" required placeholder="Ciudad o provincia" className={campo} />
      </label>
      <label className={etiqueta}>
        A qué os dedicáis
        <input name="sector" required placeholder="Ej.: carpintería de aluminio" className={campo} />
      </label>
      {desplegable("facturacion", "Facturación aproximada al año", FACTURACION)}
      {desplegable("empleados", "Empleados", EMPLEADOS)}
      {desplegable("hoy", "¿Quién os lleva hoy el marketing?", HOY)}
      {desplegable("inversion", "Inversión en anuncios", INVERSION)}
      <label className={etiqueta}>
        Teléfono
        <input name="telefono" required type="tel" autoComplete="tel" className={campo} />
      </label>
      <label className={etiqueta}>
        Correo
        <input name="correo" required type="email" autoComplete="email" className={campo} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-full bg-estrella px-7 py-4 text-lg font-bold text-tinta transition-colors hover:bg-estrella-2 sm:w-auto"
        >
          Solicitar mi estudio gratuito
        </button>
        <p className="mt-3 text-sm text-white/70">Lo revisa una persona y te escribimos siempre, encaje o no.</p>
        {estado === "sin-canal" && (
          <p role="status" className="mt-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
            Aún no hemos activado el envío de esta web de prueba. Tus datos no se han enviado a ningún sitio.
          </p>
        )}
      </div>
    </form>
  );
}
