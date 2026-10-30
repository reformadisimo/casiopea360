import Link from "next/link";
import { ConsiguesGaleria } from "@/components/Consigues";
import { ESTUDIO_TOTAL } from "@/lib/contenido";

// «No te lo pierdas»: lo que de verdad se lleva quien encaja, con capturas reales de los ejemplos.
export default function EstudioDeVerdad() {
  return (
    <div id="estudio-de-verdad" className="mt-8 scroll-mt-28 rounded-[1.8rem] bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
      <p className="text-sm font-extrabold uppercase tracking-wider text-estrella">No te lo pierdas</p>
      <p className="mt-1 text-xl font-extrabold sm:text-2xl">Esto es lo que te preparamos si encajas.</p>
      <p className="mt-2 text-[0.95rem] text-white/80">
        Haz el test y, si podemos ayudarte, esto es lo que recibes, <b className="text-white">gratis y sin ningún compromiso</b>, en menos de una semana. No es una propuesta: es trabajo hecho. Y es solo el principio.
      </p>
      <ConsiguesGaleria />
      <Link href="/estudio-gratuito" className="mt-4 inline-flex min-h-10 items-center text-sm font-bold text-white/80 underline underline-offset-4 hover:text-white">
        Los {ESTUDIO_TOTAL} apartados de la guía, uno a uno →
      </Link>
    </div>
  );
}
