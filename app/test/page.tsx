import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionSolicitud } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

// Es la herramienta, no una página que compita en Google: la que se posiciona por «estudio gratuito» es /estudio-gratuito.
export const metadata = {
  ...meta(
    "Test de idoneidad: tu nota de marketing digital",
    "Unos 5 minutos, una pregunta cada vez y sin escribir: tu nota, dónde se te escapan clientes y, si podemos ayudarte, tu estudio gratuito.",
    "/test",
  ),
  robots: { index: false, follow: true },
};

export default function Test() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Haz el test", ruta: "/test" }])} />
      <CabeceraPagina
        titulo="¿Cómo está tu marketing digital?"
        clave="marketing digital"
        chip={{ grande: "5 minutos", chico: "Tocando, sin escribir" }}
        entradilla="Te damos tu nota y dónde se te escapan clientes. Y si podemos ayudarte, te preparamos gratis tu estudio completo."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Haz el test" }]}
        video="movil-sonrisa"
        videoAlt="Una mujer sonríe mirando su móvil en la ciudad"
      />
      <SeccionSolicitud />
      <LlamadaFinal />
    </>
  );
}
