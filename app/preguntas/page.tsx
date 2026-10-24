import FranjaVideos from "@/components/FranjaVideos";
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
        video="sonrisa-luces"
        videoAlt="Una mujer con gorro sonríe mirando su móvil"
      />
      <SeccionPreguntas titulo={false} />
      <FranjaVideos
        tipo="mosaico"
        frase="¿Otra duda? Te contestamos el mismo día."
        detalle="Escríbenos lo que quieras saber. Sin comerciales insistiendo y sin letra pequeña."
        etiquetas={["Respuesta el mismo día", "Por escrito", "Sin compromiso"]}
        clips={[
          { nombre: "mujer-celebra", alt: "Una directiva celebra un buen resultado" },
          { nombre: "hombre-sonriendo", alt: "Un hombre sonríe en su oficina" },
          { nombre: "llamada-risa", alt: "Un hombre ríe al teléfono" },
          { nombre: "puntos-luz", alt: "Puntos de luz conectados entre sí" },
        ]}
      />
      <LlamadaFinal />
    </>
  );
}
