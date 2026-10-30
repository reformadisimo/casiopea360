import Link from "next/link";
import VideoFondo from "@/components/VideoFondo";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { Bocadillo, ChipIcono, Nebulosa, iconoPorTexto } from "@/components/Vida";
import { ARTICULOS } from "@/lib/blog";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Blog de marketing digital",
  "Artículos claros sobre webs que traen clientes, Google, anuncios, redes y cómo aparecer en las IA. Sin jerga.",
  "/blog",
);

const fecha = (f: string) => new Date(f + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

// Un chip de color por categoría: el icono sale del texto y el color se repite para la misma categoría.
// "Estrategia" no tiene regla en iconoPorTexto (caería en el icono genérico), así que le damos la bombilla.
const CATEGORIAS = [...new Set(ARTICULOS.map((a) => a.categoria))];
const iconoCategoria = (c: string) => (c === "Estrategia" ? "bombilla" : iconoPorTexto(c));
const ChipCategoria = ({ c }: { c: string }) => <ChipIcono icono={iconoCategoria(c)} i={Math.max(0, CATEGORIAS.indexOf(c))} tam="h-9 w-9" />;

export default function Blog() {
  const [destacado, ...resto] = ARTICULOS;
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Blog", ruta: "/blog" }])} />
      <CabeceraPagina
        titulo="Marketing digital, contado claro."
        clave="claro"
        entradilla="Lo que aprendemos cada día con nuestras empresas y nuestros clientes, sin jerga y con ejemplos."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Blog" }]}
        video="movil-corazones"
        videoAlt="Un hombre sonríe al recibir me gusta en su móvil"
      />
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Link href={`/blog/${destacado.slug}`} className="group grid overflow-hidden rounded-[2rem] bg-noche text-white lg:grid-cols-2">
            <div className="relative min-h-[260px] overflow-hidden" aria-hidden="true">
              <VideoFondo nombre={destacado.video} alt="" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-7 sm:p-10">
              <p className="flex items-center gap-3 text-sm font-bold text-estrella">
                <ChipCategoria c={destacado.categoria} />
                <span>
                  {destacado.categoria} · {destacado.lectura}
                </span>
              </p>
              <h2 className="mt-4 text-3xl font-extrabold group-hover:underline sm:text-4xl">{destacado.titulo}</h2>
              <p className="mt-4 line-clamp-2 text-lg text-white/80">{destacado.descripcion}</p>
              <p className="mt-6 text-sm text-white/60">{fecha(destacado.fecha)}</p>
            </div>
          </Link>
          <Bocadillo className="mt-8 max-w-3xl">Todo lo que contamos aquí lo aprendemos cada día con nuestras empresas y nuestros clientes. Sin jerga y con ejemplos.</Bocadillo>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {resto.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-linea transition-shadow hover:ring-noche hover:shadow-[0_24px_48px_-32px_rgba(14,26,61,0.5)]">
                <div aria-hidden="true" className="relative aspect-[16/8] overflow-hidden">
                  <VideoFondo nombre={a.video} alt="" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="flex items-center gap-3 text-sm font-bold text-noche-3">
                    <ChipCategoria c={a.categoria} />
                    <span>
                      {a.categoria} · {a.lectura}
                    </span>
                  </p>
                  <h2 className="mt-4 text-2xl font-extrabold group-hover:underline">{a.titulo}</h2>
                  <p className="mt-3 line-clamp-2 flex-1 text-gris">{a.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
