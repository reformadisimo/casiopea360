import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import CalculadoraInversion from "@/components/CalculadoraInversion";
import { BOTON, ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";
import { Nebulosa } from "@/components/Vida";

export const metadata = meta(
  "Calculadora: cuánto te puede dejar tu inversión en anuncios",
  "Mueve tus números (lo que inviertes, lo que cuesta cada contacto, cuántos son buenos, cuántos cierras y lo que deja cada cliente) y mira cuánto entra al mes. Todo se queda en tu navegador.",
  "/calculadora",
);

export default function Calculadora() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Calculadora", ruta: "/calculadora" }])} />
      <CabeceraPagina
        titulo="Cuánto te puede dejar tu inversión cada mes."
        clave="cada mes."
        entradilla="Mueve tus números y mira el resultado al momento. Es la misma cuenta que hacemos al empezar con cada cliente."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Servicios", href: "/servicios" }, { texto: "Calculadora" }]}
      />
      <section className="relative overflow-hidden bg-niebla py-12 sm:py-16">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative`}>
          <CalculadoraInversion />
          <div className="mt-10 flex flex-col gap-4 rounded-[1.6rem] bg-white p-6 ring-1 ring-linea sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-lg text-gris">
              <b className="text-tinta">¿Lo miramos con tus datos de verdad?</b> En el estudio, sin coste, vemos dónde se te escapan los contactos y qué tocaríamos primero.
            </p>
            <Link href="/test" className={`${BOTON} shrink-0`}>Haz el test</Link>
          </div>
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
