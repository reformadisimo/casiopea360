import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import VideoFondo from "@/components/VideoFondo";
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
  // El vídeo de apoyo va justo antes del segundo subtítulo
  const titulos = a.cuerpo.map((b, i) => ("h2" in b ? i : -1)).filter((i) => i >= 0);
  const mitad = titulos[1] ?? Math.floor(a.cuerpo.length / 2);
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
          <Fragment key={i}>
            {i === mitad && (
              <figure className="not-prose my-10 overflow-hidden rounded-[1.6rem] ring-1 ring-linea">
                <div className="relative aspect-[16/9]">
                  <VideoFondo nombre={a.apoyo.video} alt={a.apoyo.alt} />
                </div>
              </figure>
            )}
            <Pinta b={b} />
          </Fragment>
        ))}
        <p>
          <Link href="/estudio-gratuito">Solicita tu estudio gratuito</Link> o <Link href="/test">haz el test en un minuto</Link>.
        </p>
      </article>
      <section className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
        <p className="font-titular text-3xl font-extrabold">Sigue leyendo</p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otros.slice(0, 3).map((o) => (
            <li key={o.slug}>
              <Link href={`/blog/${o.slug}`} className="group block overflow-hidden rounded-[1.6rem] bg-white shadow-sm ring-1 ring-linea transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(14,26,61,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/video/${o.video}.webp`} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="block p-5">
                  <span className="text-sm font-bold text-noche-3">{o.categoria} · {o.lectura}</span>
                  <span className="mt-1 block text-lg font-extrabold leading-snug">{o.titulo}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <LlamadaFinal />
    </>
  );
}
