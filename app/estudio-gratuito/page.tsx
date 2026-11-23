import DatosEstructurados from "@/components/DatosEstructurados";
import SeccionDudasEstudio from "@/components/SeccionDudasEstudio";
import { SeccionPrecio } from "@/components/SeccionesVender";
import { HeroLanding, MuestraHero, SeccionIncluye, SeccionVideo, SeccionDolores, SeccionPasos, SeccionEjemplos, FranjaConfianza } from "@/components/LandingEstudio";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Estudio gratuito de tu marketing digital",
  "Tu plan de marketing digital gratis y a medida: situación, competencia, web rediseñada, anuncios, CRM y asistente con IA. Empieza con el test.",
  "/estudio-gratuito",
);

export default function EstudioGratuito() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Estudio gratuito", ruta: "/estudio-gratuito" }])} />
      <HeroLanding />
      <MuestraHero />
      <FranjaConfianza />
      <SeccionDolores />
      <SeccionIncluye />
      <SeccionVideo />
      <SeccionPasos />
      <SeccionEjemplos />
      <SeccionDudasEstudio />
      <SeccionPrecio compacta />
    </>
  );
}
