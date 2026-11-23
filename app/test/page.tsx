import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionSolicitud } from "@/components/secciones";
import { SeccionCadaDia } from "@/components/LandingEstudio";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

// Herramienta indexable con texto propio (la que se posiciona por «estudio gratuito» es /estudio-gratuito; aquí no se repite su contenido).
export const metadata = {
  ...meta(
    "Pide tu estudio gratuito de marketing digital",
    "Déjanos tu nombre, tu correo y la web de tu empresa: te escribimos en 48 horas laborables y, si podemos ayudarte, preparamos tu estudio gratuito.",
    "/test",
  ),
};

export default function Test() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Estudio gratuito", ruta: "/test" }])} />
      <CabeceraPagina
        titulo="Pide tu estudio gratuito"
        clave="estudio gratuito"
        entradilla="Tu nombre, tu correo y la web de tu empresa. Nada más."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Estudio gratuito" }]}
      />
      <SeccionSolicitud soloTest />
      <SeccionCadaDia fuera />
      <LlamadaFinal />
    </>
  );
}
