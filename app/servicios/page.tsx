import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BandaCompromisos, LlamadaFinal, SeccionFrentes, SeccionOficios } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas, schemaServicios } from "@/lib/schema";

export const metadata = meta(
  "Servicios de marketing digital 360",
  "Web y apps, Google y las IA, anuncios, redes y automatización con inteligencia artificial. Todo con un solo equipo, precio fijo y sin comisiones.",
  "/servicios",
);

export default function Servicios() {
  return (
    <>
      <DatosEstructurados datos={[...schemaServicios(), schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Servicios", ruta: "/servicios" }])]} />
      <CabeceraPagina
        titulo="Todo lo digital, con un solo equipo."
        entradilla="Cinco frentes que normalmente llevan cinco empresas distintas. Con nosotros, uno solo, conectado y con un parte cada día."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Servicios" }]}
        video="fibra-luz"
        videoAlt="Fibras de luz que se cruzan y se conectan"
      />
      <SeccionFrentes completa />
      <BandaCompromisos />
      <SeccionOficios />
      <LlamadaFinal />
    </>
  );
}
