import Link from "next/link";
import { ConsiguesGaleria } from "@/components/Consigues";
import { ESTUDIO_TOTAL } from "@/lib/contenido";

// «No te lo pierdas»: lo que preparamos si podemos ayudar, con capturas reales de los ejemplos.
export default function EstudioDeVerdad() {
  return (
    <div id="estudio-de-verdad" className="mt-8 scroll-mt-28 rounded-[1.8rem] bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
      <p className="text-sm font-extrabold uppercase tracking-wider text-estrella">No te lo pierdas</p>
      <p className="mt-1 text-xl font-extrabold sm:text-2xl">Esto es lo que te preparamos si podemos ayudarte.</p>
      <ul className="mt-3 flex flex-wrap gap-2 text-sm font-bold text-white">
        {["Gratis y sin ningún compromiso", "En menos de una semana", "Trabajo hecho, no una propuesta"].map((t) => (
          <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15">
            <span aria-hidden="true" className="text-estrella">✓</span>
            {t}
          </li>
        ))}
      </ul>
      <ConsiguesGaleria />
      <Link href="/estudio-gratuito" className="mt-4 inline-flex min-h-10 items-center text-sm font-bold text-white/80 underline underline-offset-4 hover:text-white">
        Los {ESTUDIO_TOTAL} apartados de la guía, uno a uno →
      </Link>
    </div>
  );
}
