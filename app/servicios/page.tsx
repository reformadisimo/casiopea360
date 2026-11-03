import FranjaVideos from "@/components/FranjaVideos";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BandaCompromisos,
  SeccionEspecialistas, SeccionFueraInternet, SeccionLoQueSea, SeccionTambienIncluido, SeccionPorQueBarato, SeccionVelocidad, SeccionTecnologia, SeccionCRM, SeccionCostes, LlamadaFinal, SeccionFrentes, SeccionOficios, BandaEnlaceControl } from "@/components/secciones";
import { SeccionFichaGoogle, SeccionPruebasAB } from "@/components/SeccionesVender";
import EjemploResenas from "@/components/EjemploResenas";
import { meta } from "@/lib/meta";
import { schemaMigas, schemaServicios } from "@/lib/schema";

export const metadata = meta(
  "Servicios de marketing digital 360",
  "Web y apps, Google y las IA, anuncios, redes y automatización con inteligencia artificial. Todo con un solo equipo, precio fijo y sin comisiones.",
  "/servicios",
);

export default function Servicios() {
  return (
    <>
      <DatosEstructurados datos={[...schemaServicios(), schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Servicios", ruta: "/servicios" }])]} />
      <CabeceraPagina
        ejemplo
        titulo="Todo lo digital, con un solo equipo."
        clave="un solo equipo"
        chip={{ grande: "En días", chico: "Tu web, no en meses" }}
        entradilla="Casi nunca falla tu producto: falla que no te ven. Arreglamos los cinco frentes a la vez, con un solo equipo y un parte cada día. Las redes van incluidas en tu cuota."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Servicios" }]}
        video="holograma-redes"
        videoAlt="Iconos de redes sociales flotan sobre un móvil"
      />
      <SeccionFrentes completa />
      <FranjaVideos
        tipo="mosaico"
        frase="Todo conectado. Todo a la vez."
        detalle="Lo que pasa en tus anuncios se arregla en tu web el mismo día. Lo que preguntan tus clientes se convierte en artículo."
        etiquetas={["Web", "Google y las IA", "Anuncios", "Redes", "Automatización"]}
        clips={[
          { nombre: "movil-sonrisa", alt: "Una mujer sonríe mirando su móvil en la ciudad" },
          { nombre: "holograma-mesa", alt: "Dos personas ríen alrededor de un holograma" },
          { nombre: "neon-llamada", alt: "Una mujer habla por el móvil entre luces de neón" },
          { nombre: "ninos-conexion", alt: "Líneas de luz conectan a varias personas con sus ordenadores" },
        ]}
      />
      <SeccionEspecialistas />
      <SeccionPruebasAB />
      <SeccionFichaGoogle />
      <EjemploResenas />
      <SeccionCostes />
      <SeccionPorQueBarato />
      <SeccionVelocidad />
      <SeccionTecnologia />
      <BandaCompromisos />
      <SeccionCRM />
      <SeccionLoQueSea />
      <SeccionTambienIncluido />
      <SeccionFueraInternet />
      <SeccionOficios />
      <BandaEnlaceControl />
      <LlamadaFinal />
    </>
  );
}
