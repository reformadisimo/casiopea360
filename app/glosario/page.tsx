import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import GlosarioBuscador from "@/components/GlosarioBuscador";
import { COLOR_SELLO, ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { Bocadillo, ChipIcono, Nebulosa } from "@/components/Vida";
import { glifoDe } from "@/lib/terminos/pictos";
import { meta } from "@/lib/meta";
import { schemaGlosario, schemaMigas } from "@/lib/schema";
import { FAMILIAS, TERMINOS, inicial, ordenAlfabetico } from "@/lib/terminos";

export const metadata = meta(
  "Glosario de marketing digital: qué significa cada término",
  "SEO, SEM, Analytics, CRM, landing, CPC y más de cien términos de marketing digital explicados sin jerga, con ejemplos de negocios reales.",
  "/glosario",
);

const quita = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Letra del índice como loseta de color (se pinta aquí, en el servidor, para no cargar el kit en el JS del buscador). */
function LetraViva({ l, k }: { l: string; k: number }) {
  const [fondo, sombra] = COLOR_SELLO[k % COLOR_SELLO.length];
  return (
    <span
      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl text-white shadow-[0_12px_24px_-12px_var(--s)] ${k % 2 ? "rotate-3" : "-rotate-3"}`}
      style={{ background: fondo, ["--s" as string]: sombra }}
    >
      {l}
    </span>
  );
}

export default function Glosario() {
  const ordenados = ordenAlfabetico(TERMINOS);
  const items = ordenados.map((t) => ({
    slug: t.slug,
    nombre: t.nombre,
    largo: t.largo,
    corta: t.corta,
    familia: t.familia,
    inicial: inicial(t),
    g: glifoDe(t.slug),
    buscable: quita([t.nombre, t.largo ?? "", ...(t.formas ?? []), t.corta].join(" ")),
  }));
  const abecedario = [...new Set(items.map((i) => i.inicial))];
  const piezas = {
    letras: Object.fromEntries(abecedario.map((l, k) => [l, <LetraViva key={l} l={l} k={k} />])),
    cuenta: <ChipIcono icono="lista" i={0} tam="h-9 w-9" />,
    vacio: <ChipIcono icono="lupa" i={3} tam="h-14 w-14" />,
  };
  return (
    <>
      <DatosEstructurados
        datos={[schemaGlosario(ordenados), schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Glosario", ruta: "/glosario" }])]}
      />
      <CabeceraPagina
        titulo="Marketing digital, sin jerga."
        clave="sin jerga"
        entradilla={`${TERMINOS.length} palabras que oirás en cualquier reunión de marketing, explicadas como si nunca las hubieras oído. Con un ejemplo de un negocio de verdad en cada una.`}
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Glosario" }]}
        video="movil-corazones"
        videoAlt="Un hombre sonríe al recibir me gusta en su móvil"
      />
      {/* La nebulosa va en su propio envoltorio recortado: si la sección llevara overflow-hidden, el buscador dejaría de ser sticky. */}
      <section className="relative bg-white pb-16 pt-6 sm:pb-20">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Nebulosa variante={1} />
        </div>
        <div className={`${ENVOLTORIO} relative`}>
          <Bocadillo className="mt-8 max-w-3xl">Si alguna palabra te suena a chino, es normal: el marketing digital está lleno de siglas.</Bocadillo>
          <p className="mt-5 max-w-3xl text-lg text-gris">
            Busca la que necesites o recorre los temas. Y si estás leyendo cualquier página de esta web, las palabras subrayadas llevan aquí.
          </p>
          <GlosarioBuscador items={items} familias={FAMILIAS.map((f) => ({ id: f.id, nombre: f.nombre, color: f.color }))} piezas={piezas} />
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
