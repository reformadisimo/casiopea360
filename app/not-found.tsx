import Link from "next/link";
import VideoFondo from "@/components/VideoFondo";
import { ENVOLTORIO, BOTON } from "@/components/secciones";
import { Bocadillo, Etiqueta, Nebulosa } from "@/components/Vida";

// Página de error con gracia: la estrella se ha salido de la constelación.
export default function NoEncontrada() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-noche pt-28 text-white">
      <div aria-hidden="true" className="absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones" alt="" prioridad /></div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-noche via-noche/70 to-transparent" />
      <Nebulosa oscura variante={3} />
      <div className={`${ENVOLTORIO} relative grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr]`}>
        <div>
          <Etiqueta tono="cristal" icono="mapa">Error 404</Etiqueta>
          <h1 className="mt-5 text-5xl font-extrabold sm:text-7xl">Esta estrella se ha salido de la constelación.</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">La página que buscas no existe o la hemos movido.</p>
          <Bocadillo claro className="mt-5 max-w-xl">Pero no te vayas: aquí cerca tienes lo importante.</Bocadillo>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/" className={`${BOTON} min-h-11`}>Volver al inicio</Link>
            <Link href="/test" className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/40 px-7 py-3.5 font-bold hover:border-white">Hacer el test en 1 minuto</Link>
            <Link href="/estudio-gratuito" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-7 py-3.5 font-bold hover:bg-white/20">Pedir mi estudio gratuito</Link>
          </div>
        </div>
        <div aria-hidden="true" className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/simbolo.svg" alt="" className="absolute inset-0 h-full w-full opacity-90" />
          <span className="flota absolute -right-6 -top-6 grid h-16 w-16 place-items-center rounded-full bg-estrella text-2xl font-extrabold text-tinta shadow-[0_0_40px_rgba(255,197,61,0.8)]">?</span>
        </div>
      </div>
    </section>
  );
}
