import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionGarantias, SeccionMetodo, SeccionParte } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Cómo trabajamos",
  "Estudio gratuito, web hecha antes de decidir, 48 horas como máximo para todo y un parte cada día. Así trabajamos en Casiopea 360.",
  "/como-trabajamos",
);

export default function ComoTrabajamos() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Cómo trabajamos", ruta: "/como-trabajamos" }])} />
      <CabeceraPagina
        titulo="Rápido, por escrito y sin marearte."
        entradilla="Te quitamos el menor tiempo posible: casi todo por correo, 48 horas como máximo para lo que pidas, y cada día sabes qué hemos hecho."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos" }]}
      />
      <SeccionMetodo />
      <SeccionParte />
      <SeccionGarantias />
      <LlamadaFinal />
    </>
  );
}
