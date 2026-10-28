import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import VideoFondo from "@/components/VideoFondo";
import { BOTON, ENVOLTORIO, LlamadaFinal, Loseta, ICONO_SVG, SeccionPreguntas } from "@/components/secciones";

const ICONO_SERVICIO: Record<string, string> = { "diseno-web": "pagina", "seo-google-ia": "lupa", "publicidad-google-ads-redes": "euro", "redes-sociales": "video", "automatizacion-ia": "chip", "crm-a-medida": "crm", "lupa-360": "lupa", "avisos-recordatorios": "chat" };
import { glosar } from "@/lib/glosario";
import { ARTICULOS } from "@/lib/blog";
import { PAGINAS_SERVICIO, incluyeDe, paginaServicio } from "@/lib/servicios";
import { schemaMigas } from "@/lib/schema";
import { SITIO } from "@/lib/navegacion";
import { Bocadillo, ChipIcono, Etiqueta, ListaViva, Nebulosa, iconoPorTexto } from "@/components/Vida";

export function generateStaticParams() {
  return PAGINAS_SERVICIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = paginaServicio(slug);
  if (!p) return {};
  return {
    title: p.tituloSeo,
    description: p.descripcionSeo,
    alternates: { canonical: `/servicios/${p.slug}` },
    openGraph: { title: `${p.tituloSeo} · Casiopea 360`, description: p.descripcionSeo, url: `/servicios/${p.slug}`, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function PaginaDeServicio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = paginaServicio(slug);
  if (!p) notFound();
  const incluye = incluyeDe(p);
  const articulos = p.articulos.map((s) => ARTICULOS.find((a) => a.slug === s)).filter((a) => a !== undefined);
  const otros = PAGINAS_SERVICIO.filter((x) => x.slug !== p.slug);
  const url = `${SITIO.url}/servicios/${p.slug}`;
  const enlaceClaro = "inline-flex min-h-11 items-center font-bold text-estrella";
  return (
    <>
      <DatosEstructurados
        datos={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: p.nombre,
            serviceType: p.tituloSeo,
            description: p.descripcionSeo,
            provider: { "@id": `${SITIO.url}/#empresa` },
            areaServed: { "@type": "Country", name: "España" },
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.preguntas.map((q) => ({ "@type": "Question", name: q.p, acceptedAnswer: { "@type": "Answer", text: q.r } })),
          },
          schemaMigas([
            { texto: "Inicio", ruta: "/" },
            { texto: "Servicios", ruta: "/servicios" },
            { texto: p.nombre, ruta: `/servicios/${p.slug}` },
          ]),
        ]}
      />
      <CabeceraPagina
        titulo={p.titular}
        entradilla={p.entradilla}
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Servicios", href: "/servicios" }, { texto: p.nombre }]}
        video={p.video}
        videoAlt={p.videoAlt}
      />

      {/* Lo que te pasa y cómo lo arreglamos */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="chat">¿Te suena?</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl">Lo que nos cuentan. Y lo que hacemos.</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {p.dolores.map((d, i) => (
              <li key={d.dolor} className={`relative overflow-hidden rounded-3xl p-7 ${i === 0 ? "bg-noche text-white" : "bg-niebla"}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: p.color }} />
                <Loseta icono={iconoPorTexto(d.dolor, i)} i={i} />
                <p className="mt-5 text-xl font-extrabold leading-snug">{glosar(d.dolor)}</p>
                <p className={`mt-4 ${i === 0 ? "text-white/85" : "text-gris"}`}>
                  <b className={i === 0 ? "text-estrella" : "text-tinta"}>Lo arreglamos así:</b> {glosar(d.arreglo)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="relative overflow-hidden bg-niebla py-16 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative grid items-start gap-10 lg:grid-cols-[1fr_1fr]`}>
          <div className="lg:sticky lg:top-28">
            <Etiqueta icono="regalo">Dentro de tu cuota</Etiqueta>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Qué incluye.</h2>
            <Bocadillo className="mt-5 max-w-md">Sin extras escondidos ni presupuestos por cada cosa. Y con el mismo equipo que lleva el resto de tu marketing.</Bocadillo>
            <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[2rem] lg:block">
              <VideoFondo nombre={p.video2} alt={p.videoAlt2} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.8rem] bg-white p-4 pt-6 shadow-sm ring-1 ring-linea sm:p-5 sm:pt-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: p.color }} />
            <ListaViva items={incluye} render={(s) => glosar(s)} className="[&>li]:text-[1.05rem]" />
          </div>
        </div>
      </section>

      {/* Cómo lo hacemos */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <h2 className="flex max-w-3xl items-center gap-3 text-4xl font-extrabold sm:gap-4 sm:text-5xl">
            <Loseta icono="cohete" i={2} />
            <span>Cómo lo hacemos.</span>
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.como.map((c, i) => (
              <li key={c.paso} className="group inclina rounded-3xl bg-white p-6 ring-1 ring-linea">
                <div className="flex items-center justify-between">
                  <Loseta icono={["lupa", "pincel", "cohete", "lista"][i % 4]} i={i} />
                  <span aria-hidden="true" className="font-titular text-4xl font-extrabold opacity-30" style={{ color: p.color }}>0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{c.paso}</h3>
                <p className="mt-2 text-gris">{glosar(c.texto)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Plazos y dato */}
      <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-24">
        <Nebulosa oscura variante={3} />
        <div className={`${ENVOLTORIO} relative grid gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <Etiqueta tono="estrella">Por escrito</Etiqueta>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">En días, no en meses.</h2>
            <dl className="mt-8 divide-y divide-white/10 rounded-3xl bg-white/[0.06] ring-1 ring-white/10">
              {p.plazos.map((x, i) => (
                <div key={x.que} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <dt className="flex items-center gap-3 text-white/85">
                    <ChipIcono icono={iconoPorTexto(x.que, i)} i={i} tam="h-10 w-10" />
                    <span className="min-w-0">{x.que}</span>
                  </dt>
                  <dd className="pl-[3.25rem] font-extrabold text-estrella sm:pl-0 sm:text-right">{x.cuando}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-5">
            {p.dato && (
              <div className="rounded-3xl bg-white p-7 text-tinta">
                <Loseta icono="grafica" i={2} />
                <p className="mt-5 font-titular text-6xl font-extrabold" style={{ color: p.color }}>
                  {p.dato.cifra}
                </p>
                <p className="mt-3 text-lg">{p.dato.texto}</p>
                <p className="mt-3 text-sm text-gris">Fuente: {p.dato.fuente}</p>
              </div>
            )}
            {p.caso && (
              <Link href={`/trabajos/${p.caso.slug}`} className="group rounded-3xl bg-white/[0.08] p-7 ring-1 ring-white/15 transition-colors hover:bg-white/[0.12]">
                <p className="flex items-center gap-3 text-sm font-bold text-estrella">
                  <Loseta icono="trofeo" i={4} />
                  Un caso real
                </p>
                <p className="mt-4 text-2xl font-extrabold">{p.caso.nombre}</p>
                <p className="mt-2 text-white/80">{p.caso.texto}</p>
                <p className="mt-4 font-bold text-estrella">
                  Ver el caso <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </p>
              </Link>
            )}
            {p.demo && (
              <Link href={p.demo.href} className="group rounded-3xl bg-white/[0.08] p-7 ring-1 ring-white/15 transition-colors hover:bg-white/[0.12]">
                <p className="flex items-center gap-3 text-sm font-bold text-estrella">
                  <Loseta icono="ojo" i={1} />
                  Demostración
                </p>
                <p className="mt-4 text-2xl font-extrabold">{p.demo.titulo}</p>
                <p className="mt-2 text-white/80">{p.demo.texto}</p>
                <p className="mt-4 font-bold text-estrella">{p.demo.enlace}</p>
              </Link>
            )}
            {!p.dato && !p.caso && !p.demo && (
              <div className="rounded-3xl bg-white/[0.08] p-7 ring-1 ring-white/15">
                <Loseta icono="grafica" i={0} />
                <p className="mt-4 text-2xl font-extrabold">Y lo ves todo en tu panel.</p>
                <p className="mt-2 text-white/80">Cada petición, quién la lleva y cuándo estará lista. Sin preguntar.</p>
                <Link href="/panel" className={`${enlaceClaro} mt-3`}>
                  Ver un panel de ejemplo →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <SeccionPreguntas propias={p.preguntas} fondo="bg-white" />

      {/* Todo lo demás, en la misma cuota */}
      <section className="relative overflow-hidden bg-niebla py-16 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <h2 className="flex max-w-3xl items-center gap-3 text-4xl font-extrabold sm:gap-4 sm:text-5xl">
            <Loseta icono="fiesta" i={3} />
            <span>Y todo lo demás, en la misma cuota.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gris">Un solo equipo para todo, conectado. Lo que pasa en un frente se aprovecha en los demás el mismo día.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((o, k) => (
              <li key={o.slug}>
                <Link href={`/servicios/${o.slug}`} className="group inclina flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-linea">
                  <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md transition-transform group-hover:rotate-0 group-hover:scale-110 ${k % 2 ? "rotate-6" : "-rotate-6"}`} style={{ background: o.color }}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONO_SVG[ICONO_SERVICIO[o.slug] ?? "estrella"]}</svg>
                  </span>
                  <span className="mt-4 text-lg font-extrabold">{o.nombre}</span>
                  <span className="mt-1 text-sm text-gris">{o.titular}</span>
                  <span className="mt-auto pt-3 text-sm font-bold text-noche-3">Ver más →</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/servicios#incluido" className="inline-flex min-h-11 items-center font-bold text-noche-3 underline underline-offset-4">Y 16 cosas más que también entran</Link>
            <span aria-hidden="true" className="text-gris">·</span>
            <Link href="/servicios#costes" className="inline-flex min-h-11 items-center font-bold text-noche-3 underline underline-offset-4">Cuánto te costaría por separado</Link>
          </div>
        </div>
      </section>

      {articulos.length > 0 && (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <Nebulosa variante={1} />
          <div className={`${ENVOLTORIO} relative`}>
            <h2 className="flex items-center gap-3 text-3xl font-extrabold sm:gap-4 sm:text-4xl">
              <Loseta icono="prensa" i={5} />
              <span>Para saber más.</span>
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {articulos.map((a, k) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="group flex h-full items-center gap-4 overflow-hidden rounded-3xl ring-1 ring-linea transition-colors hover:bg-niebla">
                    <span className="relative h-28 w-32 shrink-0 overflow-hidden">
                      <VideoFondo nombre={a.video} alt="" />
                    </span>
                    <span className="py-4 pr-5">
                      <span className="flex items-center gap-2 text-sm text-gris">
                        <ChipIcono icono={iconoPorTexto(a.categoria, k)} i={k + 1} tam="h-8 w-8" />
                        <span>{a.categoria} · {a.lectura}</span>
                      </span>
                      <span className="mt-2 block font-extrabold leading-snug group-hover:underline">{a.titulo}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/estudio-gratuito" className={`${BOTON} min-h-11`}>Quiero mi estudio gratuito</Link>
            </div>
          </div>
        </section>
      )}
      <LlamadaFinal />
    </>
  );
}
