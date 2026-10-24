"use client";

import { useState } from "react";

// "Mándame mi resultado": el visitante recibe su nota por correo (y a nosotros nos llega el contacto).
export default function EnviarResultado({ resumen, origen, oscuro = true }: { resumen?: string; origen: string; oscuro?: boolean }) {
  const [estado, setEstado] = useState<"" | "enviando" | "ok" | "error" | "sin">("");
  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    let texto = resumen;
    if (!texto) {
      try {
        texto = sessionStorage.getItem("casiopea-test") ?? "";
      } catch {}
    }
    setEstado("enviando");
    const r = await fetch("/api/resultado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: f.get("correo"), nombre: f.get("nombre"), acepto: f.get("acepto") === "on", trampa: f.get("web"), resumen: texto, origen }),
    }).catch(() => null);
    setEstado(r?.ok ? "ok" : r?.status === 503 ? "sin" : "error");
  }
  if (estado === "ok") return <p className="aparece rounded-2xl bg-emerald-600 px-5 py-4 font-bold text-white">Hecho. Revisa tu correo: te lo acabamos de enviar.</p>;
  const campo = `w-full rounded-full px-4 py-3 text-tinta ${oscuro ? "bg-white" : "border border-linea bg-white"}`;
  return (
    <form onSubmit={enviar} className={`rounded-[1.6rem] p-5 ${oscuro ? "bg-white/10 ring-1 ring-white/15" : "bg-niebla"}`}>
      <p className="text-lg font-extrabold">¿Te lo mandamos por correo?</p>
      <p className={`mt-1 text-sm ${oscuro ? "text-white/75" : "text-gris"}`}>Te enviamos tu resultado para que lo tengas a mano o lo compartas con tu socio.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1.3fr_auto]">
        <label className="sr-only" htmlFor={`n-${origen}`}>Tu nombre</label>
        <input id={`n-${origen}`} name="nombre" autoComplete="given-name" placeholder="Tu nombre" className={campo} />
        <label className="sr-only" htmlFor={`c-${origen}`}>Tu correo</label>
        <input id={`c-${origen}`} name="correo" type="email" required autoComplete="email" placeholder="Tu correo" className={campo} />
        <input name="web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={estado === "enviando"} className="rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2 disabled:opacity-60">
          {estado === "enviando" ? "Enviando..." : "Mándamelo"}
        </button>
      </div>
      <label className={`mt-3 flex items-start gap-2 text-xs ${oscuro ? "text-white/70" : "text-gris"}`}>
        <input type="checkbox" name="acepto" required className="mt-0.5" />
        <span>Acepto que Casiopea 360 me envíe este resultado y pueda escribirme sobre él. Más en la <a href="/privacidad" className="underline">privacidad</a>.</span>
      </label>
      {estado === "error" && <p className="mt-2 text-sm font-bold text-rose-300">No se ha podido enviar. Prueba otra vez en un momento.</p>}
      {estado === "sin" && <p className="mt-2 text-sm font-bold text-estrella">El envío por correo estará activo en unos días. Mientras tanto, pide tu estudio gratuito y te lo contamos todo.</p>}
    </form>
  );
}
