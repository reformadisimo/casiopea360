import FranjaVideos from "@/components/FranjaVideos";
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
        video="brujula"
        videoAlt="Una brújula sobre un mapa"
      />
      <SeccionMetodo />
      <FranjaVideos
        frase="Casi todo por correo. Cero reuniones que no quieras."
        detalle="Nos escribes, lo hacemos en 48 horas como máximo y te lo contamos en el parte del día."
        clips={[
          { nombre: "llamada-risa", alt: "Un cliente ríe al teléfono" },
          { nombre: "selfie-equipo", alt: "Un equipo se hace un selfie sonriendo" },
          { nombre: "mujer-celebra", alt: "Una directiva celebra un buen resultado" },
        ]}
      />
      <SeccionParte />
      <SeccionGarantias />
      <LlamadaFinal />
    </>
  );
}
