import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal, SeccionPreguntas } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas, schemaPreguntas } from "@/lib/schema";

export const metadata = meta(
  "Preguntas frecuentes",
  "Cuánto cuesta, cuánto tardáis, si la web es mía, si hay permanencia, qué tengo que hacer yo. Las dudas habituales, contestadas.",
  "/preguntas",
);

export default function Preguntas() {
  return (
    <>
      <DatosEstructurados datos={[schemaPreguntas(), schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Preguntas", ruta: "/preguntas" }])]} />
      <CabeceraPagina
        titulo="Lo que nos suelen preguntar."
        entradilla="Si tu duda no está aquí, pregúntanos: te contestamos el mismo día."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Preguntas" }]}
      />
      <SeccionPreguntas titulo={false} />
      <LlamadaFinal />
    </>
  );
}
