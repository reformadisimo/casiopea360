import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import TestRapido from "@/components/TestRapido";
import CalculadoraGastos from "@/components/CalculadoraGastos";
import { ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Test y calculadora de marketing digital",
  "Descubre en un minuto cómo está tu marketing digital y suma lo que pagas hoy a todos tus proveedores. Gratis y sin dejar tus datos.",
  "/test",
);

export default function Test() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Haz el test", ruta: "/test" }])} />
      <CabeceraPagina
        titulo="¿Cómo está tu marketing digital?"
        entradilla="Dos herramientas gratis, sin dejar tus datos: un test de un minuto y una calculadora de lo que pagas hoy."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Haz el test" }]}
        video="mujer-celebra"
        videoAlt="Una directiva celebra un buen resultado"
      />
      <section id="rapido" className={`${ENVOLTORIO} scroll-mt-24 py-16 sm:py-20`}>
        <h2 className="text-3xl font-extrabold sm:text-5xl">Test rápido</h2>
        <p className="mt-3 max-w-2xl text-lg text-gris">Siete preguntas de sí o no. Al final te decimos dónde estás perdiendo clientes.</p>
        <div className="mt-10">
          <TestRapido />
        </div>
      </section>
      <section id="calculadora" className="scroll-mt-24 bg-niebla py-16 sm:py-20">
        <div className={ENVOLTORIO}>
          <h2 className="text-3xl font-extrabold sm:text-5xl">Calculadora de lo que pagas hoy</h2>
          <p className="mt-3 max-w-2xl text-lg text-gris">Suma lo que te cuesta cada proveedor y las comisiones sobre tus anuncios. Te sorprenderá.</p>
          <div className="mt-10">
            <CalculadoraGastos />
          </div>
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
