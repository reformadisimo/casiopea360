import FranjaVideos from "@/components/FranjaVideos";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { SeccionEstudio, SeccionSolicitud } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Estudio gratuito de tu marketing digital",
  "Analizamos tu web, tu ficha de Google, tus anuncios, tu competencia y cómo te ven las IA. Lo preparamos a medida para empresas a las que podemos ayudar.",
  "/estudio-gratuito",
);

export default function EstudioGratuito() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Estudio gratuito", ruta: "/estudio-gratuito" }])} />
      <CabeceraPagina
        titulo="Tu estudio gratuito, hecho a medida."
        entradilla="Te contamos cómo está hoy tu marketing, qué te está haciendo perder clientes y qué haríamos. Con datos reales y sin compromiso."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Estudio gratuito" }]}
        video="mujer-cielo"
        videoAlt="Una persona mira al cielo de noche"
      />
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
