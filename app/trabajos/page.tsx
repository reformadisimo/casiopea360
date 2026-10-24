import FranjaVideos from "@/components/FranjaVideos";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionOrigen, SeccionTrabajos, SeccionConfidenciales } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Trabajos reales",
  "Webs, apps y marketing funcionando hoy: Reformadísimo, Mi Estela, AMS Cerramientos y Tierno Centella.",
  "/trabajos",
);

export default function Trabajos() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Trabajos", ruta: "/trabajos" }])} />
      <CabeceraPagina
        titulo="Trabajos reales, funcionando hoy."
        entradilla="Webs con calculadoras y asistentes de IA, una app en las dos tiendas cobrando suscripciones. Entra y pruébalos."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Trabajos" }]}
        video="equipo-celebra"
        videoAlt="Un equipo celebra un buen resultado delante del ordenador"
      />
      <SeccionTrabajos titulo={false} />
      <SeccionConfidenciales />
      <FranjaVideos
        frase="Empresas de verdad, con clientes de verdad."
        detalle="Reformas, cerramientos, abogados, una app familiar. Distintos sectores, la misma forma de trabajar."
        clips={[
          { nombre: "gran-via", alt: "La Gran Vía de Madrid de noche" },
          { nombre: "despacho", alt: "Una reunión distendida en un despacho" },
          { nombre: "arquitecto-mesa", alt: "Un arquitecto trabaja en su mesa" },
        ]}
      />
      <SeccionOrigen />
      <LlamadaFinal />
    </>
  );
}
