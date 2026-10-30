import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import Subrayado from "@/components/Subrayado";
import { BOTON, ENVOLTORIO, LlamadaFinal } from "@/components/secciones";
import { glosar } from "@/lib/glosario";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";
import { Bocadillo, ChipIcono, Etiqueta, ListaViva, Nebulosa, TarjetaViva } from "@/components/Vida";

export const metadata = meta(
  "Un día de trabajo real: así arrancamos tus campañas",
  "Lo que hacemos por dentro cuando ponemos en marcha el marketing de una empresa: qué revisamos, qué corregimos, cómo se mide y qué se enciende solo con tu visto bueno.",
  "/un-dia-de-trabajo",
);

const HALLAZGOS: { icono: string; t: string; que: string; hicimos: string }[] = [
  { icono: "euro", t: "La búsqueda estaba frenada por presupuesto", que: "«Limitada por presupuesto»: había clientes y no salían los anuncios. Y solo cubría la ciudad.", hicimos: "Campaña nueva para toda la provincia, con el presupuesto que hace falta." },
  { icono: "escudo", t: "Los anuncios prometían lo que no se puede prometer", que: "«Sin sorpresas», «plazos garantizados». Suenan bien, pero acaban en clientes enfadados.", hicimos: "Textos concretos: visita técnica gratuita y presupuesto partida a partida." },
  { icono: "lupa", t: "La campaña de marca perdía búsquedas", que: "Quien buscaba la empresa por su nombre a veces no veía el anuncio. La puja era baja.", hicimos: "Subimos la puja y apuntamos a la web nueva." },
];

const BORRADORES: [string, string, string][] = [
  ["lupa", "Búsqueda de Google", "La principal: quien busca lo que vendes. Cada grupo de anuncios, a su página, y sin pagar por curiosos."],
  ["pagina", "Red de contenido (contextual)", "Fotos de obras reales en webs de casa y decoración. Clic barato y sin sitios que no convienen."],
  ["campana", "Remarketing en Google y Meta", "Anuncios solo para quien ya visitó la web, para que vuelva cuando esté listo."],
  ["video", "Meta hacia la web", "Instagram y Facebook hacia la web, con fotos y vídeos reales. Paramos los formularios de Meta: traían malos contactos."],
  ["trofeo", "Campaña de marca", "Que quien te busque por tu nombre te encuentre a ti, y no a un competidor."],
];

const MEDICION: [string, string, string][] = [
  ["diana", "La conversión que importa", "Cada petición de visita llega a Google Ads como conversión. Si no, la puja va a ciegas."],
  ["candado", "Conversiones mejoradas", "El correo del formulario, cifrado, ayuda a Google a reconocer a más personas."],
  ["chip", "Conexión directa con Meta", "Cada contacto llega a Meta desde nuestro servidor, con base legal y respetando la privacidad. Así aprende a quién enseñar el anuncio."],
  ["ojo", "Avisos del píxel", "Los revisamos uno a uno: los que se arreglan solos, los que no importan y los que sí hay que corregir."],
];

const NO_SE_ENCIENDE: [string, string][] = [
  ["Si un canal no trae contactos, lo decimos.", "Si gasta y no trae contactos, proponemos pararlo."],
  ["Nada de pagar dos veces.", "Al encender las nuevas, se pausan las anteriores."],
  ["Nada sin tu visto bueno.", "Hasta la prueba A/B queda apagada hasta que lo confirmas."],
  ["Sin inventar contactos de prueba.", "Se verifica con el primer contacto real, sin molestar a tu equipo."],
];

export default function UnDiaDeTrabajo() {
  const detalle = new Map(NO_SE_ENCIENDE);
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Cómo trabajamos", ruta: "/como-trabajamos" }, { texto: "Un día de trabajo", ruta: "/un-dia-de-trabajo" }])} />
      <CabeceraPagina
        ejemplo
        titulo="Así es un día de trabajo real. Sin cajas negras."
        clave="sin cajas negras"
        entradilla="Una mañana real arrancando las campañas de una empresa de reformas, la nuestra. Es lo que verás en la tuya."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Un día de trabajo" }]}
      />

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="lupa">Primero, mirar qué falla</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Lo que encontramos al abrir las cuentas.</h2>
          <p className="mt-4 max-w-3xl text-lg text-gris">Antes de tocar nada, revisamos cada campaña. Aquí, tres cosas que cambiaban todo el plan.</p>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {HALLAZGOS.map((h, i) => (
              <TarjetaViva
                key={h.t}
                icono={h.icono}
                i={i}
                titulo={h.t}
                texto={h.que}
                className="bg-niebla ring-0"
                hijo={
                  <p className="mt-1 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm">
                    <ChipIcono icono="check" i={2} tam="h-8 w-8" />
                    <span className="min-w-0 pt-1"><b>Qué hicimos.</b> {h.hicimos}</span>
                  </p>
                }
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={1} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="herramienta">Después, montar todo en borrador</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Cinco campañas listas, sin gastar un euro.</h2>
          <Bocadillo className="mt-5 max-w-3xl">Quedan pausadas. Se encienden el día acordado, cuando tú das el visto bueno.</Bocadillo>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {BORRADORES.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={glosar(d, { max: 2 })} chip={`Campaña ${i + 1}`} />
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
        <Nebulosa oscura variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta tono="estrella" icono="grafica">Y antes de encender, medir</Etiqueta>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Si no se mide bien, se gasta a ciegas.</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {MEDICION.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} claro />
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={3} />
        <div className={`${ENVOLTORIO} relative grid gap-10 lg:grid-cols-2`}>
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Y lo que no se enciende, <Subrayado>también cuenta</Subrayado>.</h2>
            <ListaViva
              className="mt-6 text-lg"
              items={NO_SE_ENCIENDE.map(([b]) => b)}
              render={(b) => (
                <>
                  <b className="text-tinta">{b}</b> <span className="text-gris">{detalle.get(b)}</span>
                </>
              )}
            />
          </div>
          <div className="rounded-[2rem] bg-niebla p-7 sm:p-9">
            <Etiqueta icono="bombilla">Por qué te lo contamos</Etiqueta>
            <p className="mt-4 text-2xl font-extrabold">Lo normal es no saber nunca qué ocurre dentro de tus campañas.</p>
            <p className="mt-3 text-gris"><b className="text-tinta">Aquí lo ves todo</b>, con palabras claras y cada día en tu panel.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/estudio-gratuito" className={BOTON}>Quiero mi estudio gratuito</Link>
              <Link href="/panel" className="inline-flex min-h-11 items-center rounded-full border border-noche px-6 py-3 font-bold hover:bg-white">Ver el panel de ejemplo</Link>
            </div>
          </div>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
