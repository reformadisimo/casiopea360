import FranjaVideos from "@/components/FranjaVideos";
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
      <FranjaVideos
        tipo="mosaico"
        frase="Todo conectado. Todo a la vez."
        detalle="Lo que pasa en tus anuncios se arregla en tu web el mismo día. Lo que preguntan tus clientes se convierte en artículo. Un solo equipo mirando el conjunto."
        etiquetas={["Web", "Google y las IA", "Anuncios", "Redes", "Automatización"]}
        clips={[
          { nombre: "llamada-sonrisa", alt: "Un hombre sonríe mirando su móvil de noche" },
          { nombre: "puntos-luz", alt: "Puntos de luz conectados entre sí" },
          { nombre: "mujer-movil", alt: "Una mujer consulta su móvil" },
          { nombre: "madrid-noche", alt: "Madrid de noche, a vista de pájaro" },
        ]}
      />
      <BandaCompromisos />
      <SeccionOficios />
      <LlamadaFinal />
    </>
  );
}
