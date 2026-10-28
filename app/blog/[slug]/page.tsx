import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import VideoFondo from "@/components/VideoFondo";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { LlamadaFinal } from "@/components/secciones";
import { ARTICULOS, articuloPorSlug, type Bloque } from "@/lib/blog";
import { schemaArticulo, schemaFaqArticulo, schemaMigas } from "@/lib/schema";
import { CajaIdea, ChipIcono, ListaViva, PasosVivos, PreguntaViva, TituloVivo, idDe } from "@/components/ArticuloVisual";
import { glosar, type ContextoGlosario } from "@/lib/glosario";

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articuloPorSlug(slug);
  if (!a) return {};
  return {
    title: a.tituloSeo ?? a.titulo,
    description: a.descripcion,
    alternates: { canonical: `/blog/${a.slug}` },
    keywords: a.claves,
    authors: [{ name: "Casiopea 360" }],
    openGraph: {
      type: "article",
      title: a.tituloSeo ?? a.titulo,
      description: a.descripcion,
      publishedTime: a.fecha,
      modifiedTime: a.fecha,
      section: a.categoria,
      tags: a.claves,
      url: `/blog/${a.slug}`,
      locale: "es_ES",
      siteName: "Casiopea 360",
      images: [{ url: `/video/${a.video}.jpg`, alt: a.titulo }],
    },
    twitter: { card: "summary_large_image", title: a.tituloSeo ?? a.titulo, description: a.descripcion, images: [`/video/${a.video}.jpg`] },
  };
}

function Pinta({ b, g, n }: { b: Bloque; g: ContextoGlosario; n: number }) {
  if ("caja" in b) return <CajaIdea t={b.t}>{glosar(b.caja, g)}</CajaIdea>;
  if ("h2" in b) return <TituloVivo t={b.h2} i={n} />;
  if ("h3" in b) return <h3>{b.h3}</h3>;
  if ("ul" in b) return <ListaViva items={b.ul} render={(x) => glosar(x, g)} />;
  if ("ol" in b) return <PasosVivos items={b.ol} render={(x) => glosar(x, g)} />;
  return <p>{glosar(b.p, g)}</p>;
}

export default async function ArticuloBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articuloPorSlug(slug);
  if (!a) notFound();
  const fecha = new Date(a.fecha + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  // Cada término se enlaza al glosario una sola vez por artículo
  const g: ContextoGlosario = { usados: new Set<string>(), max: 3 };
  const otros = ARTICULOS.filter((x) => x.slug !== a.slug);
  // El vídeo de apoyo va justo antes del segundo subtítulo
  const titulos = a.cuerpo.map((b, i) => ("h2" in b ? i : -1)).filter((i) => i >= 0);
  const mitad = titulos[1] ?? Math.floor(a.cuerpo.length / 2);
  return (
    <>
      <DatosEstructurados
        datos={[
          schemaArticulo({ ...a, palabras: a.cuerpo.map((b) => ("caja" in b ? b.caja : "p" in b ? b.p : "ul" in b ? b.ul.join(" ") : "ol" in b ? b.ol.join(" ") : "h2" in b ? b.h2 : b.h3)).join(" ").split(/\s+/).length }),
          ...(a.faq?.length ? [schemaFaqArticulo(a.faq)] : []),
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
        <div className="rounded-[1.6rem] border-2 border-estrella bg-gradient-to-br from-estrella/20 via-white to-niebla p-6 text-lg">
          <p className="flex items-center gap-3 font-titular text-sm font-extrabold uppercase tracking-wide text-noche-3">
            <ChipIcono icono="estrella" i={4} tam="h-9 w-9" />
            En pocas palabras
          </p>
          <p className="mt-3">{glosar(a.respuesta, g)}</p>
        </div>
        {titulos.length >= 4 && (
          <nav aria-label="En este artículo" className="rounded-2xl bg-white p-4 ring-1 ring-linea sm:p-5">
            <p className="font-titular text-sm font-bold text-noche-3">En este artículo</p>
            <ol className="lv mt-3 !gap-1.5">
              {titulos.map((ti, k) => {
                const t = (a.cuerpo[ti] as { h2: string }).h2;
                return (
                  <li key={t}>
                    <a href={`#${idDe(t)}`} className="flex items-center gap-3 rounded-xl px-2 py-1.5 font-semibold no-underline hover:bg-niebla">
                      <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-estrella text-sm font-extrabold text-tinta">{k + 1}</span>
                      <span className="min-w-0">{t}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {a.cuerpo.map((b, i) => (
          <Fragment key={i}>
            {i === mitad && (
              <figure className="not-prose my-10 overflow-hidden rounded-[1.6rem] ring-1 ring-linea">
                <div className="relative aspect-[16/9]">
                  <VideoFondo nombre={a.apoyo.video} alt={a.apoyo.alt} />
                </div>
              </figure>
            )}
            <Pinta b={b} g={g} n={titulos.indexOf(i)} />
          </Fragment>
        ))}
        {a.faq && a.faq.length > 0 && (
          <>
            <TituloVivo t="Preguntas frecuentes" i={titulos.length} />
            <div>
              {a.faq.map((q, k) => (
                <PreguntaViva key={q.p} p={q.p} i={k}>{glosar(q.r, g)}</PreguntaViva>
              ))}
            </div>
          </>
        )}
        {a.fuentes && a.fuentes.length > 0 && (
          <>
            <TituloVivo t="Fuentes" i={titulos.length + 1} />
            <ul>
              {a.fuentes.map((f) => (
                <li key={f.href}><a href={f.href} target="_blank" rel="noopener noreferrer">{f.texto}</a></li>
              ))}
            </ul>
          </>
        )}
        {a.enlaces && (
          <p>
            {a.enlaces.map((e, i) => (
              <Fragment key={e.href}>
                {i > 0 && " · "}
                <Link href={e.href}>{e.texto}</Link>
              </Fragment>
            ))}
          </p>
        )}
        <p>
          <Link href="/estudio-gratuito">Solicita tu estudio gratuito</Link> o <Link href="/test">haz el test de idoneidad</Link>.
        </p>
        <p className="text-gris">
          ¿Alguna palabra te ha sonado rara? Las subrayadas llevan a su explicación; el <Link href="/glosario">glosario completo</Link> tiene todas.
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
