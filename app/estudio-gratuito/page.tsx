import FranjaVideos from "@/components/FranjaVideos";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { SeccionEstudio, SeccionSolicitud, SeccionEmpezamos } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Estudio gratuito de tu marketing digital",
  "Tu plan completo de marketing digital, gratis y a medida: situación, competencia, propuesta de rediseño de tu web, anuncios, CRM y asistente con IA. Empieza por el test de idoneidad.",
  "/estudio-gratuito",
);

export default function EstudioGratuito() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Estudio gratuito", ruta: "/estudio-gratuito" }])} />
      <CabeceraPagina
        titulo="Tu estudio gratuito: tu plan completo, hecho a medida."
        entradilla="Dónde estás hoy, tu competencia, la propuesta de rediseño de tu web, tus anuncios, tu plan y cómo trabajaríamos. Empieza por el test de idoneidad: son dos minutos."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Estudio gratuito" }]}
        video="mujer-cielo"
        videoAlt="Una persona mira al cielo de noche"
      />
      <SeccionEmpezamos />
      <SeccionEstudio />
      <FranjaVideos
        frase="Miramos tu negocio con telescopio."
        detalle="Tu web, tu ficha de Google, tus anuncios, tu competencia y lo que dicen de ti las IA. Todo, antes de proponerte nada."
        clips={[
          { nombre: "telescopios", alt: "Telescopios bajo un cielo estrellado" },
          { nombre: "hombre-sonriendo", alt: "Un empresario sonríe satisfecho" },
          { nombre: "constelaciones-azules", alt: "Constelaciones unidas por líneas de luz" },
        ]}
      />
      <SeccionSolicitud />
    </>
  );
}
