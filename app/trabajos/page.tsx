import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionOrigen, SeccionTrabajos } from "@/components/secciones";
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
        video="hombre-celebra"
        videoAlt="Un empresario celebra delante de su ordenador"
      />
      <SeccionTrabajos titulo={false} />
      <SeccionOrigen />
      <LlamadaFinal />
    </>
  );
}
