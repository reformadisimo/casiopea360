import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal } from "@/components/secciones";
import { ARTICULOS, articuloPorSlug, type Bloque } from "@/lib/blog";
import { schemaArticulo, schemaMigas } from "@/lib/schema";

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articuloPorSlug(slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.descripcion,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", title: a.titulo, description: a.descripcion, publishedTime: a.fecha, url: `/blog/${a.slug}` },
  };
}

function Pinta({ b }: { b: Bloque }) {
  if ("h2" in b) return <h2>{b.h2}</h2>;
  if ("h3" in b) return <h3>{b.h3}</h3>;
  if ("ul" in b) return <ul>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>;
  if ("ol" in b) return <ol>{b.ol.map((x) => <li key={x}>{x}</li>)}</ol>;
  return <p>{b.p}</p>;
}

export default async function ArticuloBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articuloPorSlug(slug);
  if (!a) notFound();
  const fecha = new Date(a.fecha + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  const otros = ARTICULOS.filter((x) => x.slug !== a.slug);
  return (
    <>
      <DatosEstructurados
        datos={[
          schemaArticulo(a),
          schemaMigas([
            { texto: "Inicio", ruta: "/" },
            { texto: "Blog", ruta: "/blog" },
            { texto: a.titulo, ruta: `/blog/${a.slug}` },
          ]),
        ]}
      />
      <CabeceraPagina
        titulo={a.titulo}
        entradilla={`${a.categoria} · ${a.lectura} de lectura · ${fecha}`}
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Blog", href: "/blog" }, { texto: a.categoria }]}
        video={a.video}
      />
      <article className="prosa mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-2xl border-l-4 border-estrella bg-niebla p-6 text-lg">
          <p className="font-titular text-sm font-bold text-noche-3">En pocas palabras</p>
          <p className="mt-2">{a.respuesta}</p>
        </div>
        {a.cuerpo.map((b, i) => (
          <Pinta key={i} b={b} />
        ))}
        <p>
          <Link href="/estudio-gratuito">Solicita tu estudio gratuito</Link> o <Link href="/test">haz el test en un minuto</Link>.
        </p>
      </article>
      <section className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="font-titular text-2xl font-extrabold">Sigue leyendo</p>
        <ul className="mt-4 divide-y divide-linea border-y border-linea">
          {otros.map((o) => (
            <li key={o.slug}>
              <Link href={`/blog/${o.slug}`} className="block py-4 text-lg font-bold hover:text-noche-3">
                {o.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <LlamadaFinal />
    </>
  );
}
