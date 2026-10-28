import type { Metadata } from "next";
import Link from "next/link";
import { CajaIdea, ChipIcono, TituloVivo, iconoPorTexto } from "@/components/Vida";
import { notFound } from "next/navigation";
import Picto from "@/components/Picto";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, LlamadaFinal } from "@/components/secciones";
import { glifoDe } from "@/lib/terminos/pictos";
import { glosar } from "@/lib/glosario";
import { articulosQueMencionan } from "@/lib/glosario-uso";
import { PAGINAS_SERVICIO } from "@/lib/servicios";
import { schemaMigas, schemaTermino } from "@/lib/schema";
import { FAMILIAS, TERMINOS, relacionados, terminoPorSlug } from "@/lib/terminos";

export function generateStaticParams() {
  return TERMINOS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = terminoPorSlug(slug);
  if (!t) return {};
  const titulo = `${t.nombre.replace(/\s*\(.*\)\s*$/, "")}: qué es, significado y ejemplo`;
  return {
    title: titulo,
    description: t.corta,
    alternates: { canonical: `/glosario/${t.slug}` },
    openGraph: { type: "article", title: `${titulo} · Casiopea 360`, description: t.corta, url: `/glosario/${t.slug}`, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function Termino({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = terminoPorSlug(slug);
  if (!t) notFound();
  const fam = FAMILIAS.find((f) => f.id === t.familia);
  const rel = relacionados(t);
  const servicio = t.servicio ? PAGINAS_SERVICIO.find((s) => s.slug === t.servicio) : undefined;
  const articulos = articulosQueMencionan(t);
  const usados = new Set<string>();
  const ctx = { usados, excluir: t.slug, max: 2 };
  const nombreCorto = t.nombre.replace(/\s*\(.*\)\s*$/, "");
  return (
    <>
      <DatosEstructurados
        datos={[
          schemaTermino(t),
          schemaMigas([
            { texto: "Inicio", ruta: "/" },
            { texto: "Glosario", ruta: "/glosario" },
            { texto: t.nombre, ruta: `/glosario/${t.slug}` },
          ]),
        ]}
      />
      <CabeceraPagina
        titulo={`${nombreCorto}: qué es y para qué sirve`}
        entradilla={t.largo ?? fam?.frase}
        visual={<Picto d={glifoDe(t.slug)} color={fam?.color ?? "#475569"} tam={140} fondo="#ffffff" className="mx-auto lg:ml-auto lg:mr-0" />}
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Glosario", href: "/glosario" }, { texto: t.nombre }]}
      />
      <article className="prosa mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <CajaIdea t="En pocas palabras">{t.corta}</CajaIdea>
        <TituloVivo t="Explicado sin tecnicismos" i={0} />
        {t.def.map((p) => (
          <p key={p}>{glosar(p, ctx)}</p>
        ))}
        <TituloVivo t="Un ejemplo" i={1} />
        <p>{glosar(t.ejemplo, ctx)}</p>
        {servicio && (
          <p>
            Es parte de lo que hacemos en <Link href={`/servicios/${servicio.slug}`}>{servicio.nombre}</Link>.
          </p>
        )}
      </article>

      {rel.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
          <h2 className="flex items-center gap-3 font-titular text-2xl font-extrabold"><ChipIcono icono="lista" i={2} /> Palabras relacionadas</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {rel.map((r, k) => (
              <li key={r.slug}>
                <Link href={`/glosario/${r.slug}`} className="group flex h-full items-start gap-3 rounded-2xl bg-niebla p-4 transition-colors hover:bg-white hover:ring-1 hover:ring-noche">
                  <ChipIcono icono={iconoPorTexto(r.nombre + " " + r.corta, k)} i={k + 3} tam="h-10 w-10" />
                  <span className="min-w-0">
                    <span className="block font-extrabold group-hover:text-[#1d4ed8]">{r.nombre}</span>
                    <span className="mt-1 block text-sm text-gris">{r.corta}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {articulos.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-4 pb-4 pt-10 sm:px-6">
          <h2 className="flex items-center gap-3 font-titular text-2xl font-extrabold"><ChipIcono icono="prensa" i={4} /> Donde lo contamos en el blog</h2>
          <ul className="mt-4 grid gap-2.5">
            {articulos.map((a, k) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="flex min-h-11 items-center gap-3 rounded-2xl bg-white px-4 py-3 font-bold text-tinta ring-1 ring-linea hover:text-[#1d4ed8] hover:ring-noche">
                  <ChipIcono icono={iconoPorTexto(a.categoria, k)} i={k} tam="h-9 w-9" />
                  <span className="min-w-0">{a.titulo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 sm:px-6">
        <Link href="/glosario" className={BOTON}>Ver todo el glosario</Link>
      </section>
      <LlamadaFinal />
    </>
  );
}
