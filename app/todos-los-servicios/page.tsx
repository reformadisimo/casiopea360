import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { ChipIcono, Etiqueta, Nebulosa } from "@/components/Vida";
import { CATALOGO, TOTAL_CATALOGO } from "@/lib/catalogo";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Todos los servicios de Casiopea 360, en una lista",
  "Todo lo que hacemos en una lista: ficha de Google, reseñas, SEO, anuncios locales, web, redes, CRM e IA, con un solo equipo y una persona que te atiende.",
  "/todos-los-servicios",
);

export default function TodosLosServicios() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Servicios", ruta: "/servicios" }, { texto: "Todos los servicios", ruta: "/todos-los-servicios" }])} />
      <CabeceraPagina
        titulo="Todo lo que hacemos, en una sola lista."
        clave="en una sola lista"
        entradilla={`${TOTAL_CATALOGO} cosas, de la ficha de Google a los anuncios locales, la web, las redes y el CRM. Un solo equipo y una sola persona que te atiende.`}
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Servicios", href: "/servicios" }, { texto: "Todos los servicios" }]}
      />

      <section className="relative overflow-hidden bg-niebla py-10 sm:py-14">
        <div className={`${ENVOLTORIO} relative`}>
          <nav aria-label="Grupos de servicios" className="flex flex-wrap gap-2">
            {CATALOGO.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-extrabold text-tinta ring-1 ring-linea hover:bg-estrella/30">
                {g.nombre}
              </a>
            ))}
          </nav>
          <p className="mt-5 max-w-3xl text-gris">
            Todo esto va dentro de una cuota fija, sin permanencia. Aparte quedan solo lo que pagas tú directamente (anuncios en Google y Meta, grabación con equipo profesional y medios).{" "}
            <Link href="/servicios#precio" className="font-bold text-tinta underline underline-offset-4">Mira qué incluye y cuánto pagarías por separado</Link>.
          </p>
        </div>
      </section>

      {CATALOGO.map((g, gi) => (
        <section key={g.id} id={g.id} className={`relative overflow-hidden py-14 sm:py-20 ${gi % 2 ? "bg-niebla" : "bg-white"}`} aria-labelledby={`h-${g.id}`}>
          <Nebulosa variante={gi % 4} />
          <div className={`${ENVOLTORIO} relative`}>
            <Etiqueta icono={g.icono}>{g.nombre}</Etiqueta>
            <h2 id={`h-${g.id}`} className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-4xl">{g.frase}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.servicios.map((s, i) => (
                <li key={s.t} className={`${s.nuevo ? "flex flex-col" : "grid grid-cols-[auto_1fr] items-center sm:flex sm:flex-col sm:items-stretch"} gap-x-3 gap-y-2 rounded-[1.6rem] bg-white p-4 shadow-sm ring-1 ring-linea sm:gap-3 sm:p-6`}>
                  <div className="flex items-center gap-3">
                    <ChipIcono icono={g.icono} i={gi + i} tam="h-10 w-10" />
                    {s.nuevo && <span className="rounded-full bg-estrella/40 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-tinta">Nuevo en la lista</span>}
                  </div>
                  <h3 className="text-lg font-extrabold leading-snug text-tinta">{s.t}</h3>
                  <p className="col-span-2 text-[0.95rem] text-gris sm:text-base">{s.d}</p>
                  {s.enlace && (
                    <Link href={s.enlace.href} className="col-span-2 mt-auto inline-flex min-h-11 items-center font-bold text-tinta underline underline-offset-4">
                      {s.enlace.texto}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="relative overflow-hidden bg-white py-14 sm:py-20">
        <div className={`${ENVOLTORIO} relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]`}>
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">¿Echas algo en falta?</h2>
            <p className="mt-4 text-lg text-gris">
              La lista crece con lo que nos piden nuestros clientes. Si necesitas algo que no está, cuéntanoslo: si te conviene, lo hacemos; y si no, te lo decimos con el porqué.
            </p>
            <p className="mt-4 text-sm text-gris">
              Todo lo que hacemos lo planteamos como experiencia, nunca como garantía: nadie puede asegurar un primer puesto en Google ni que una reseña se retire. Prometemos método, constancia y que lo veas todo en tu panel.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="/estudio-gratuito" className={BOTON}>Quiero mi estudio gratuito</a>
            <Link href="/servicios" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 font-bold text-tinta underline underline-offset-4">Ver los servicios uno a uno</Link>
          </div>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
