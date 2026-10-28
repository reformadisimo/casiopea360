import FranjaVideos from "@/components/FranjaVideos";
import GloboDiferido from "@/components/GloboDiferido";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionLoFirmamos, SeccionMetodo, SeccionParte, SeccionEmpezamos, SeccionPuntosDolor } from "@/components/secciones";
import { SeccionPruebasAB, SeccionTiempo, SeccionPorQueContratarnos, SeccionComoTrabajamos } from "@/components/SeccionesVender";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Cómo trabajamos: pídelo y lo hacemos",
  "Respuesta el mismo día, 48 horas para el día a día, tu web en unos días y tu panel siempre al día. Casi todo por escrito y sin reuniones que no hagan falta.",
  "/como-trabajamos",
);

export default function ComoTrabajamos() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Cómo trabajamos", ruta: "/como-trabajamos" }])} />
      <CabeceraPagina
        titulo="Pídelo. Lo hacemos. Y sabes cuándo estará listo."
        clave="listo"
        entradilla="Casi todo por correo. Respuesta el mismo día, 48 horas para lo del día a día y fecha cerrada para lo grande. En tu panel, cada petición y cuándo estará lista."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos" }]}
        visual={<GloboDiferido />}
      />
      <SeccionEmpezamos base="/estudio-gratuito" />
      <SeccionTiempo />
      <SeccionPorQueContratarnos />
      <SeccionMetodo />
      <SeccionComoTrabajamos />
      <FranjaVideos
        frase="Casi todo por correo. Cero reuniones que no quieras."
        detalle="Escribes. Respondemos el mismo día. Lo hacemos en 48 horas como máximo. Y te lo contamos en el parte del día."
        clips={[
          { nombre: "llamada-risa", alt: "Un cliente ríe al teléfono" },
          { nombre: "graba-movil", alt: "Una mujer graba un vídeo con el móvil en una cafetería" },
          { nombre: "mujer-celebra", alt: "Una directiva celebra un buen resultado" },
        ]}
      />
      <SeccionPuntosDolor />
      <SeccionPruebasAB />
      <SeccionParte />
      <SeccionLoFirmamos />
      <LlamadaFinal />
    </>
  );
}
