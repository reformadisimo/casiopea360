"use client";

import { useEffect, useState } from "react";
import { ChipIcono } from "@/components/Vida";

// Tarjeta de la portada: una sola persona te atiende (sin nombre: lo conoces el primer día).
// El punto verde sale en horario de oficina (lunes a viernes, de 9:00 a 18:00, hora de Madrid); fuera, gris.
function abiertoAhora(): boolean {
  try {
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const dia = p.find((x) => x.type === "weekday")?.value ?? "";
    const hora = Number(p.find((x) => x.type === "hour")?.value ?? "0");
    return !["Sat", "Sun"].includes(dia) && hora >= 9 && hora < 18;
  } catch {
    return false;
  }
}

export default function TarjetaEncargadoPortada() {
  const [abierto, setAbierto] = useState<boolean | null>(null);
  useEffect(() => setAbierto(abiertoAhora()), []);
  return (
    <div className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-2xl bg-white/10 p-3.5 text-left ring-1 ring-white/20 backdrop-blur">
      <ChipIcono icono="sonrisa" i={2} tam="h-11 w-11" />
      <div className="min-w-0">
        <p className="font-extrabold leading-snug text-white">Una sola persona te atiende</p>
        <p className="text-sm leading-snug text-white/75">Tu encargado de proyecto, siempre el mismo.</p>
        <p className="mt-1 flex items-center gap-2 text-[0.8rem] font-bold text-white/90">
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${abierto ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.25)]" : "bg-white/40"}`} />
          {abierto === null ? "Te contesta en horario de oficina" : abierto ? "Ahora, en horario de oficina" : "Fuera de horario: te contesta al abrir"}
        </p>
      </div>
    </div>
  );
}
