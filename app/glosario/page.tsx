import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import GlosarioBuscador from "@/components/GlosarioBuscador";
import { ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaGlosario, schemaMigas } from "@/lib/schema";
import { FAMILIAS, TERMINOS, inicial, ordenAlfabetico } from "@/lib/terminos";

export const metadata = meta(
  "Glosario de marketing digital: qué significa cada término",
  "SEO, SEM, Analytics, CRM, landing, CPC y más de cien términos de marketing digital explicados sin jerga, con ejemplos de negocios reales.",
  "/glosario",
);

const quita = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Glosario() {
  const ordenados = ordenAlfabetico(TERMINOS);
  const items = ordenados.map((t) => ({
    slug: t.slug,
    nombre: t.nombre,
    largo: t.largo,
    corta: t.corta,
    familia: t.familia,
    inicial: inicial(t),
    buscable: quita([t.nombre, t.largo ?? "", ...(t.formas ?? []), t.corta].join(" ")),
  }));
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
      <section className={`${ENVOLTORIO} pb-16 pt-6 sm:pb-20`}>
        <p className="max-w-3xl pt-8 text-lg text-gris">
          Si alguna palabra te suena a chino, es normal: el marketing digital está lleno de siglas. Busca la que necesites o recorre los temas. Y si estás leyendo cualquier página de esta web, las palabras subrayadas llevan aquí.
        </p>
        <GlosarioBuscador items={items} familias={FAMILIAS.map((f) => ({ id: f.id, nombre: f.nombre, color: f.color }))} />
      </section>
      <LlamadaFinal />
    </>
  );
}
