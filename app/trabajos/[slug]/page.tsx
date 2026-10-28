import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import VideoFondo from "@/components/VideoFondo";
import { BOTON, ENVOLTORIO, LlamadaFinal, ICONO_SVG, Loseta } from "@/components/secciones";
import { Bocadillo, ChipIcono, Etiqueta, ListaViva, Nebulosa, iconoPorTexto } from "@/components/Vida";
import { CASOS, casoPorSlug } from "@/lib/casos";
import { TRABAJOS } from "@/lib/contenido";
import { PAGINAS_SERVICIO } from "@/lib/servicios";
import { schemaMigas } from "@/lib/schema";

const visibles = () => CASOS.filter((c) => TRABAJOS.find((t) => t.nombre === c.nombre)?.publicado);

export function generateStaticParams() {
  return visibles().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = casoPorSlug(slug);
  if (!c) return {};
  return {
    title: `Caso ${c.nombre}`,
    description: c.descripcionSeo,
    alternates: { canonical: `/trabajos/${c.slug}` },
    openGraph: { title: `Caso ${c.nombre} · Casiopea 360`, description: c.descripcionSeo, url: `/trabajos/${c.slug}`, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function PaginaCaso({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = casoPorSlug(slug);
  const t = c && TRABAJOS.find((x) => x.nombre === c.nombre);
  if (!c || !t || !t.publicado) notFound();
  const servicios = c.servicios.map((s) => PAGINAS_SERVICIO.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const otros = visibles().filter((x) => x.slug !== c.slug);
  return (
    <>
      <DatosEstructurados
        datos={schemaMigas([
          { texto: "Inicio", ruta: "/" },
          { texto: "Trabajos", ruta: "/trabajos" },
          { texto: c.nombre, ruta: `/trabajos/${c.slug}` },
        ])}
      />
      <CabeceraPagina
        titulo={c.titular}
        entradilla={`${t.sector}. ${t.resumen}`}
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Trabajos", href: "/trabajos" }, { texto: c.nombre }]}
        video={c.video}
        videoAlt={c.videoAlt}
      />

      {/* Los datos */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            {t.logo && (
              <Image src={t.logo.src} alt={`Logotipo de ${c.nombre}`} width={t.logo.ancho} height={t.logo.alto} className={`h-16 w-auto object-contain ${t.logo.ancho === t.logo.alto ? "rounded-2xl" : ""}`} />
            )}
            <a href={t.url} target="_blank" rel="noopener" className={`${BOTON} min-h-11`}>
              {t.enlaceTexto}
            </a>
          </div>
          <ul className={`mt-10 grid gap-5 ${c.datos.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {c.datos.map((d, i) => (
              <li key={d.texto} className={`relative overflow-hidden rounded-3xl p-7 ${i === 0 ? "bg-noche text-white" : "bg-niebla"}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: c.color }} />
                <Loseta icono={iconoPorTexto(d.texto, i)} i={i} />
                <p className={`mt-5 font-titular text-5xl font-extrabold ${i === 0 ? "text-estrella" : ""}`} style={i === 0 ? undefined : { color: c.color }}>
                  {d.cifra}
                </p>
                <p className={`mt-2 text-lg ${i === 0 ? "text-white/85" : "text-gris"}`}>{d.texto}</p>
              </li>
            ))}
          </ul>
          {c.nota && <p className="mt-4 text-sm text-gris">{c.nota}</p>}
        </div>
      </section>

      {/* El reto y lo que hicimos */}
      <section className="relative overflow-hidden bg-niebla py-16 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative grid items-start gap-10 lg:grid-cols-2`}>
          <div>
            <Etiqueta icono="bombilla">El punto de partida</Etiqueta>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">El reto.</h2>
            <p className="mt-5 text-lg text-gris">{c.reto}</p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem]">
              <VideoFondo nombre={c.video} alt={c.videoAlt} />
            </div>
          </div>
          <div>
            <Etiqueta icono="regalo" i={1}>Con la misma cuota</Etiqueta>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Lo que hicimos.</h2>
            <ListaViva items={c.hicimos} className="mt-6 [&>li]:bg-white [&>li]:text-[1.05rem] [&>li]:shadow-sm [&>li]:ring-1 [&>li]:ring-linea" />
            {servicios.length > 0 && (
              <div className="mt-8">
                <p className="flex items-center gap-3 font-bold">
                  <ChipIcono icono="herramienta" i={5} tam="h-9 w-9" />
                  Servicios que entraron en juego
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {servicios.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/servicios/${s.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold ring-1 ring-linea hover:ring-noche">
                        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                        {s.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Más casos */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <h2 className="flex items-center gap-3 text-3xl font-extrabold sm:gap-4 sm:text-4xl">
            <Loseta icono="trofeo" i={4} />
            <span>Más trabajos.</span>
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {otros.map((o, k) => (
              <li key={o.slug}>
                <Link href={`/trabajos/${o.slug}`} className="group inclina flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-linea">
                  <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md transition-transform group-hover:rotate-0 group-hover:scale-110 ${k % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: o.color }}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG.estrella}</svg>
                  </span>
                  <span className="mt-4 text-xl font-extrabold">{o.nombre}</span>
                  <span className="mt-2 text-gris">{o.titular}</span>
                  <span className="mt-auto pt-4 text-sm font-bold text-noche-3">Ver el caso →</span>
                </Link>
              </li>
            ))}
          </ul>
          <Bocadillo className="mt-8 max-w-3xl">Y muchos más que no podemos enseñar: hay clientes que prefieren discreción.</Bocadillo>
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
