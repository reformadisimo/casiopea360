import FranjaVideos from "@/components/FranjaVideos";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import TestRapido from "@/components/TestRapido";
import TestCompleto from "@/components/TestCompleto";
import { ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Test de marketing digital: rápido y completo",
  "Un test de un minuto y otro completo de 50 preguntas: tu nota por áreas, lo que pagas hoy y dónde se te escapan clientes. Gratis y sin dejar tus datos.",
  "/test",
);

export default function Test() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Haz el test", ruta: "/test" }])} />
      <CabeceraPagina
        titulo="¿Cómo está tu marketing digital?"
        entradilla="Dos tests gratis y sin dejar tus datos: uno de un minuto para hacerte una idea y otro completo, a fondo, que te dice tu nota, lo que pagas y por dónde se te escapan clientes."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Haz el test" }]}
        video="ojo-pantallas"
        videoAlt="Datos y pantallas reflejados en unas gafas"
      />
      <section id="rapido" className={`${ENVOLTORIO} scroll-mt-24 py-16 sm:py-20`}>
        <h2 className="text-3xl font-extrabold sm:text-5xl">Test rápido</h2>
        <p className="mt-3 max-w-2xl text-lg text-gris">Siete preguntas de sí o no. Un minuto para hacerte una idea.</p>
        <div className="mt-10">
          <TestRapido />
        </div>
      </section>
      <FranjaVideos
        frase="Un minuto para hacerte una idea. Doce para saberlo todo."
        clips={[
          { nombre: "mujer-movil", alt: "Una mujer consulta su móvil" },
          { nombre: "fibra-luz", alt: "Fibras de luz que se cruzan" },
          { nombre: "hombre-celebra", alt: "Un empresario celebra delante de su ordenador" },
        ]}
      />
      <section id="completo" className="scroll-mt-24 bg-niebla py-16 sm:py-20">
        <span id="calculadora" className="block scroll-mt-24" aria-hidden="true" />
        <div className={ENVOLTORIO}>
          <p className="inline-block rounded-full bg-noche px-4 py-1.5 text-sm font-bold text-estrella">Unos 12 minutos · 50 preguntas · puedes saltar bloques</p>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Test completo: tu marketing, a fondo</h2>
          <p className="mt-3 max-w-2xl text-lg text-gris">Tu empresa, tu web, Google y las IA, anuncios, redes, atención a clientes, competencia, ventas, contenido y lo que pagas hoy. Si un bloque no te apetece, te lo saltas. Al final: tu nota por áreas, lo que te cuesta en dinero y en horas, dónde se te escapan clientes y qué haríamos primero.</p>
          <div className="mt-10">
            <TestCompleto />
          </div>
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
