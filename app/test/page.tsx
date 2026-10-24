import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionSolicitud } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Test de idoneidad: tu nota de marketing digital",
  "Unos 4 minutos, una pregunta cada vez y sin escribir: tu nota, dónde se te escapan clientes y, si encajas, tu estudio gratuito.",
  "/test",
);

export default function Test() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Haz el test", ruta: "/test" }])} />
      <CabeceraPagina
        titulo="¿Cómo está tu marketing digital?"
        entradilla="Unos 4 minutos, tocando, sin escribir. Te damos tu nota y dónde se te escapan clientes. Y si encajas, te preparamos gratis tu estudio completo."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Haz el test" }]}
        video="ojo-pantallas"
        videoAlt="Datos y pantallas reflejados en unas gafas"
      />
      <SeccionSolicitud />
      <LlamadaFinal />
    </>
  );
}
