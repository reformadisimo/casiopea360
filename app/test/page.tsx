import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionSolicitud } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

// Herramienta indexable con texto propio (la que se posiciona por «estudio gratuito» es /estudio-gratuito; aquí no se repite su contenido).
export const metadata = {
  ...meta(
    "Test de marketing digital para empresas: tu nota",
    "Responde tres preguntas tocando, sin escribir, y descubre dónde se te escapan clientes en tu web, tus anuncios y tu posicionamiento en Google.",
    "/test",
  ),
};

export default function Test() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Haz el test", ruta: "/test" }])} />
      <CabeceraPagina
        titulo="¿Cómo está tu marketing digital?"
        clave="marketing digital"
        chip={{ grande: "Tocando", chico: "Sin escribir" }}
        entradilla="Tres toques y tus datos: te decimos dónde se te escapan clientes en tu web, tus anuncios y Google."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Haz el test" }]}
        video="movil-sonrisa"
        videoAlt="Una mujer sonríe mirando su móvil en la ciudad"
      />
      <SeccionSolicitud soloTest />
      <LlamadaFinal />
    </>
  );
}
