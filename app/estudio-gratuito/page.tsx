import DatosEstructurados from "@/components/DatosEstructurados";
import { SeccionEstudio, SeccionSolicitud } from "@/components/secciones";
import SeccionDudasEstudio from "@/components/SeccionDudasEstudio";
import { SeccionPrecio } from "@/components/SeccionesVender";
import { HeroLanding, SeccionIncluye, SeccionMuestras, SeccionVideo, SeccionDolores, SeccionVentajas, SeccionPasos, SeccionEjemplos, FranjaConfianza } from "@/components/LandingEstudio";
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
      <SeccionMuestras />
      <FranjaConfianza />
      <SeccionDolores />
      <SeccionIncluye />
      <SeccionVentajas />
      <SeccionVideo />
      <SeccionPasos />
      <SeccionEjemplos />
      <SeccionEstudio />
      <SeccionDudasEstudio />
      <SeccionPrecio />
      <SeccionSolicitud />
    </>
  );
}
