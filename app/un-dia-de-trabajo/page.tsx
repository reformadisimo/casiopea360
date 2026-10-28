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
  { icono: "euro", t: "La búsqueda estaba frenada por presupuesto", que: "Google la marcaba como «limitada por presupuesto»: había clientes a la vista y no podía enseñar los anuncios. Y solo apuntaba a la ciudad, no a la provincia.", hicimos: "Campaña nueva para toda la provincia, con el presupuesto diario que hace falta." },
  { icono: "escudo", t: "Los anuncios prometían lo que no se puede prometer", que: "«Sin sorpresas», «plazos garantizados», «sin sobrecostes». Suenan bien, pero cuesta cumplirlas y acaban en clientes enfadados.", hicimos: "Textos honestos y concretos: visita técnica gratuita, presupuesto partida a partida, el equipo que lo hará." },
  { icono: "lupa", t: "La campaña de marca perdía búsquedas", que: "Quien buscaba el nombre de la empresa a veces no veía el anuncio: la puja máxima era demasiado baja. Y son los clientes más fáciles.", hicimos: "Subimos la puja y apuntamos a la web nueva en cuanto se retiró el proveedor anterior." },
];

const BORRADORES: [string, string, string][] = [
  ["lupa", "Búsqueda de Google", "La principal: quien busca lo que vendes. Dos grupos de anuncios, cada uno a su página, y palabras negativas para no pagar por curiosos."],
  ["pagina", "Red de contenido (contextual)", "Fotos de obras reales en webs de casa y decoración, con un clic muy barato. Excluimos de antemano once tipos de sitios que no convienen."],
  ["campana", "Remarketing en Google y Meta", "Anuncios solo para quien ya visitó la web, para que vuelva cuando esté listo."],
  ["video", "Meta hacia la web", "Instagram y Facebook hacia la web, con fotos y vídeos reales. Los formularios de Meta, que traían contactos de mala calidad, se paran."],
  ["trofeo", "Campaña de marca", "Que quien te busque por tu nombre te encuentre a ti, y no a un competidor."],
];

const MEDICION: [string, string, string][] = [
  ["diana", "La conversión que importa", "Que cada petición de visita llegue a Google Ads como una conversión. Sin eso, la puja automática trabaja a ciegas."],
  ["candado", "Conversiones mejoradas", "El correo del formulario, cifrado, ayuda a Google a reconocer a más personas. Y prepara el día en que le devolvamos las obras firmadas."],
  ["chip", "Conexión directa con Meta", "Cada contacto llega a Meta desde nuestro servidor, solo con base legal y respetando la privacidad de cada persona, para que aprenda a quién mostrar el anuncio."],
  ["ojo", "Avisos del píxel", "Los revisamos uno a uno: los que se arreglan solos, los que no importan y los que sí hay que corregir."],
];

const NO_SE_ENCIENDE: [string, string][] = [
  ["Si un canal no trae contactos, lo decimos.", "Un canal que gastaba y no traía ni un contacto se propone parar, aunque podríamos seguir cobrando por gestionarlo."],
  ["Nada de pagar dos veces.", "El mismo día que se encienden las campañas nuevas se pausan las anteriores, para no pagar por las mismas búsquedas."],
  ["Nada sin tu visto bueno.", "Hasta la prueba A/B de la web entera queda preparada y apagada hasta que lo confirmas."],
  ["Sin inventar contactos de prueba.", "No mandamos peticiones falsas que lleguen a tu equipo: se verifica con el primer contacto real."],
];

export default function UnDiaDeTrabajo() {
  const detalle = new Map(NO_SE_ENCIENDE);
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Cómo trabajamos", ruta: "/como-trabajamos" }, { texto: "Un día de trabajo", ruta: "/un-dia-de-trabajo" }])} />
      <CabeceraPagina
        titulo="Así es un día de trabajo real. Sin cajas negras."
        clave="sin cajas negras"
        entradilla="Lo que hicimos en una mañana al arrancar las campañas de una empresa de reformas: la nuestra. Lo contamos tal cual porque es lo que verás en la tuya."
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
            <p className="mt-3 text-gris">Aquí lo ves todo, con palabras claras y cada día en tu panel. Lo hacemos nosotros, con nuestras manos, en cada cliente.</p>
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
