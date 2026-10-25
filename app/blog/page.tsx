import Link from "next/link";
import VideoFondo from "@/components/VideoFondo";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { ARTICULOS } from "@/lib/blog";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Blog de marketing digital",
  "Artículos claros sobre webs que traen clientes, Google, anuncios, redes y cómo aparecer en las IA. Sin jerga.",
  "/blog",
);

const fecha = (f: string) => new Date(f + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

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
      <section className={`${ENVOLTORIO} py-16 sm:py-20`}>
        <Link href={`/blog/${destacado.slug}`} className="group grid overflow-hidden rounded-[2rem] bg-noche text-white lg:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden" aria-hidden="true">
            <VideoFondo nombre={destacado.video} alt="" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-7 sm:p-10">
            <p className="text-sm font-bold text-estrella">
              {destacado.categoria} · {destacado.lectura}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold group-hover:underline sm:text-4xl">{destacado.titulo}</h2>
            <p className="mt-4 text-lg text-white/80">{destacado.descripcion}</p>
            <p className="mt-6 text-sm text-white/60">{fecha(destacado.fecha)}</p>
          </div>
        </Link>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {resto.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex flex-col overflow-hidden rounded-[2rem] border border-linea hover:border-noche">
              <div aria-hidden="true" className="relative aspect-[16/8] overflow-hidden">
                <VideoFondo nombre={a.video} alt="" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
              <p className="text-sm font-bold text-noche-3">
                {a.categoria} · {a.lectura}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold group-hover:underline">{a.titulo}</h2>
              <p className="mt-3 flex-1 text-gris">{a.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
