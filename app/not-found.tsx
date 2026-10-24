import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import { ENVOLTORIO, BOTON } from "@/components/secciones";

export default function NoEncontrada() {
  return (
    <>
      <CabeceraPagina titulo="Esta página no existe." entradilla="Puede que el enlace esté mal o que la hayamos movido." migas={[{ texto: "Inicio", href: "/" }, { texto: "Página no encontrada" }]} />
      <section className={`${ENVOLTORIO} flex flex-col gap-3 py-16 sm:flex-row`}>
        <Link href="/" className={BOTON}>Ir al inicio</Link>
        <Link href="/servicios" className="inline-flex justify-center rounded-full border-2 border-noche px-7 py-3.5 font-bold">Ver servicios</Link>
      </section>
    </>
  );
}
