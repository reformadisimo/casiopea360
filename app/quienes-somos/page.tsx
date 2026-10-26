import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import CifrasEquipo from "@/components/CifrasEquipo";
import ChipVideo from "@/components/ChipVideo";
import Subrayado from "@/components/Subrayado";
import DatosEstructurados from "@/components/DatosEstructurados";
import FranjaVideos from "@/components/FranjaVideos";
import LogoMarca from "@/components/LogoMarca";
import VideoFondo from "@/components/VideoFondo";
import { BOTON, ENVOLTORIO, LlamadaFinal, SeccionPorQueBarato, SeccionTecnologia, SeccionNombre, SeccionVentaja, Loseta } from "@/components/secciones";
import { CREEMOS } from "@/lib/contenido";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Quiénes somos",
  "Profesionales con más de 22 años de experiencia en marketing digital y cuentas de Google Ads de hasta 60.000 € al mes. Lo hacemos todo, mejor y en días.",
  "/quienes-somos",
);

const HECHO: { t: string; d: string; logos: string[] }[] = [
  { t: "Anuncios en Google y en redes", d: "Desde presupuestos pequeños hasta cuentas de 60.000 € al mes en una sola empresa. Sabemos qué hacer con cada euro, sea mucho o poco.", logos: ["Google Ads", "Meta", "TikTok", "Bing"] },
  { t: "Webs que venden", d: "Rápidas, con calculadoras de precio y asistentes con inteligencia artificial que atienden de día y de noche.", logos: ["Google Chrome", "Vercel", "PageSpeed"] },
  { t: "Apps en las tiendas", d: "De la idea a la App Store y Google Play, con suscripciones de pago funcionando.", logos: ["App Store", "Google Play"] },
  { t: "Google y las IA", d: "Posicionamiento local y nacional, fichas de Google y Bing, y que ChatGPT y compañía te recomienden.", logos: ["Google", "Ficha de Google", "ChatGPT", "Gemini"] },
  { t: "Redes y contenido", d: "Calendario, diseño, vídeos cortos y artículos que atraen clientes.", logos: ["Instagram", "Facebook", "YouTube", "LinkedIn"] },
  { t: "Automatización y CRM", d: "Correos y WhatsApp que salen solos, CRM conectado o hecho a medida, y medición de todo.", logos: ["WhatsApp", "Gmail", "Google Analytics", "Tag Manager"] },
];

const COMO: [string, string][] = [
  ["Claros", "Por escrito y sin jerga. Si no se entiende, no lo hemos explicado bien."],
  ["Rápidos", "Respuesta el mismo día y lo del día a día en 48 horas. Lo grande, con fecha."],
  ["Sinceros", "Te decimos lo que no te conviene, aunque podamos cobrártelo."],
  ["Sin perseguirnos", "Sin reuniones innecesarias y casi todo por escrito. Tu tiempo es para tu negocio."],
  ["Tuyo", "El dominio y las cuentas, a tu nombre desde el primer día. La web, a los doce meses."],
];

export default function QuienesSomos() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Quiénes somos", ruta: "/quienes-somos" }])} />
      <CabeceraPagina
        titulo="Más de 22 años haciendo que el teléfono suene."
        clave="suene"
        chip={{ grande: "El mismo día", chico: "Respuesta a cada petición" }}
        entradilla="Somos profesionales con más de 22 años de experiencia en marketing digital. Lo hacemos todo, lo hacemos mejor y en días, por menos de lo que te costaría por separado. Y sin que tengas que perseguirnos."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Quiénes somos" }]}
        video="equipo-portatil"
        videoAlt="Dos profesionales trabajan con el portátil y el móvil en una oficina moderna"
      />

      <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-20">
        <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
        <div className={`${ENVOLTORIO} relative`}>
          <CifrasEquipo />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className={`${ENVOLTORIO} grid items-center gap-12 lg:grid-cols-2`}>
          <div>
            <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Por qué existimos</p>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Antes de daros este servicio, <Subrayado>fuimos clientes</Subrayado>.</h2>
            <p className="mt-6 text-lg text-gris">
              Tuvimos nuestros propios negocios y sufrimos lo mismo que tú: un proveedor para la web, otro para Google, otro para los anuncios, reuniones con todos y nadie que mirara el conjunto. Las webs tardaban meses y cada cambio era eterno.
            </p>
            <p className="mt-4 text-lg text-gris">
              Casiopea 360 es lo que entonces no encontramos: un solo equipo que lo hace todo, rápido, y que te enseña cada día lo que ha hecho. Seguimos llevando así nuestras propias empresas.
            </p>
            <Link href="/trabajos" className={`${BOTON} mt-8 inline-flex`}>Ver lo que hemos hecho</Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.4rem] bg-estrella/25 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><VideoFondo nombre="gafas-rojas" alt="Un compañero de unos cincuenta años trabaja con otros en una sala de ordenadores" /><ChipVideo grande="+22 años" chico="De experiencia en marketing digital" /></div>
          </div>
        </div>
      </section>

      <SeccionVentaja />

      <SeccionNombre />

      <section className="bg-white py-20 sm:py-28">
        <div className={ENVOLTORIO}>
          <div className="grid items-center gap-8 rounded-[2.2rem] bg-noche p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Una mirada desde fuera</p>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Damos luz a tu marketing.</h2>
              <p className="mt-5 text-lg text-white/85">
                Cuando llevas el marketing de tu empresa todos los días, dejas de verlo. Te acostumbras a los mismos números, cada proveedor te enseña su trozo y nadie mira el conjunto. Y hasta el mejor equipo acaba sin saber por dónde tirar.
              </p>
              <p className="mt-4 text-lg text-white/85">
                Nos ha pasado a nosotros. Por eso sabemos que el salto de gigante no se ve desde dentro, hasta que alguien con visión 360 te lo muestra.
              </p>
            </div>
            <div className="rounded-[1.8rem] bg-white/10 p-6 ring-1 ring-white/15">
              <p className="text-xl font-extrabold">¿Cómo es posible que un director de marketing necesite un empujón externo?</p>
              <p className="mt-3 text-white/80">Lo contamos con calma en un artículo.</p>
              <Link href="/blog/por-que-un-director-de-marketing-deja-de-ver-lo-que-no-funciona" className={`${BOTON} mt-5 inline-flex`}>Leer el artículo</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-niebla py-20 sm:py-28">
        <div className={ENVOLTORIO}>
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Lo hemos hecho todo. Y lo seguimos haciendo cada día.</h2>
          <div className="carrusel mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HECHO.map((h) => (
              <div key={h.t} className="flex flex-col rounded-[1.8rem] bg-white p-6 transition-transform hover:-translate-y-1 sm:p-7">
                <div className="flex gap-2">
                  {h.logos.map((l) => (
                    <span key={l} className="grid h-10 w-10 place-items-center rounded-xl bg-niebla"><LogoMarca nombre={l} tam={22} /></span>
                  ))}
                </div>
                <p className="mt-5 text-2xl font-extrabold">{h.t}</p>
                <p className="mt-2 text-gris">{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-28">
        <div aria-hidden="true" className="estrellas profundo absolute inset-0 opacity-60"><VideoFondo nombre="constelaciones-azules" alt="" /></div>
        <div className={`${ENVOLTORIO} relative`}>
          <p className="inline-block rounded-full bg-estrella px-4 py-1.5 text-sm font-bold text-tinta">Lo que creemos</p>
          <h2 className="mt-5 max-w-4xl text-4xl font-extrabold sm:text-6xl">Hacértelo mejor que quien te cobra el triple. Esa es la idea.</h2>
          <ul className="carrusel mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CREEMOS.map((c, i) => (
              <li key={c} className="rounded-[1.6rem] bg-white/[0.07] p-6 ring-1 ring-white/15 backdrop-blur-sm">
                <Loseta icono={["euro", "calendario", "telefono", "chip", "sonrisa", "cohete"][i]} i={i} />
                <p className="mt-3 text-[1.05rem] text-white/90">{c}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-lg text-white/80">
            Si alguien te pide 25.000 € por una web, nuestra intención es hacértela mejor dentro de tu cuota. Nos comprometemos por escrito con plazos, transparencia cada día y objetivos medibles. Y hasta hoy, esos resultados han llegado en todas las empresas con las que hemos trabajado: las que ves en nuestros trabajos y muchas más en más de veintidós años.
          </p>
        </div>
      </section>

      <SeccionPorQueBarato />
      <SeccionTecnologia />

      <FranjaVideos
        frase="Especialistas en todo, en la misma mesa."
        detalle="Cada frente con quien mejor lo domina, trabajando juntos para que todo empuje en la misma dirección."
        clips={[
          { nombre: "holograma-mesa", alt: "Dos personas ríen alrededor de un holograma" },
          { nombre: "neon-sonrisa", alt: "Una mujer sonríe mirando su tableta entre luces de neón" },
          { nombre: "ninos-conexion", alt: "Líneas de luz conectan a varias personas con sus ordenadores" },
        ]}
      />

      <section className="py-20 sm:py-28">
        <div className={ENVOLTORIO}>
          <h2 className="text-4xl font-extrabold sm:text-5xl">Cómo somos</h2>
          <div className="carrusel mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {COMO.map(([t, d], i) => (
              <div key={t} className="group inclina rounded-[1.8rem] border border-linea bg-white p-6">
                <Loseta icono={["chat", "reloj", "sonrisa", "calendario", "llave"][i]} i={i} />
                <p className="mt-4 text-2xl font-extrabold">{t}</p>
                <p className="mt-2 text-gris">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-5 rounded-[2rem] bg-noche p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <p className="max-w-2xl text-lg">
              <b className="text-estrella">Con quien hablas es con quien trabaja.</b> En el estudio gratuito te atiende directamente la persona que llevaría tu cuenta, sin comerciales por medio.
            </p>
            <Link href="/estudio-gratuito" className={`${BOTON} shrink-0 text-center`}>Pedir mi estudio gratuito</Link>
          </div>
        </div>
      </section>
      <LlamadaFinal />
    </>
  );
}
