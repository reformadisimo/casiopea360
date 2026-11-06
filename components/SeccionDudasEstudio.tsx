import Link from "next/link";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ENVOLTORIO } from "@/components/secciones";
import { Etiqueta, Nebulosa, PreguntaViva, TarjetaViva } from "@/components/Vida";
import { schemaFaqArticulo } from "@/lib/schema";

// Lo que antes decía el artículo «Si podemos ayudarte, te preparamos gratis tu web nueva, tu guía y tu plan»:
// se fusionó aquí (6-nov-2026) para que una sola página compita por «estudio de marketing gratis».
const RAZONES: [string, string, string][] = [
  ["video", "Es la mejor forma de demostrar lo que hacemos", "Decir que hacemos webs en días y no en meses suena a frase hecha. Enseñarte tu web ya hecha, no."],
  ["grafica", "Así decides con datos", "Ves exactamente qué tendrías, lo tocas, se lo enseñas a quien quieras, y luego hablamos o no."],
  ["euro", "Nos sale a cuenta", "Sin oficinas ni gastos fijos, y con herramientas ya montadas, un día de trabajo es una inversión pequeña. Y si luego te quedas, es el principio de años de trabajo juntos."],
];

const SI_NO_SIGO: string[] = [
  "La guía te la puedes descargar en PDF y guardarla.",
  "La web, los correos, el panel y el CRM los ves en un enlace privado durante un mes, para mirarlo con calma y enseñárselo a quien quieras.",
  "Si no seguimos, pasado ese mes cerramos el acceso y ya está.",
];

const FAQ: { p: string; r: string }[] = [
  { p: "¿De verdad es gratis?", r: "Sí. No pagas nada por el estudio, ni antes ni después. No pedimos tarjeta ni firmas nada." },
  { p: "¿Me vais a llamar para venderme algo?", r: "No. Trabajamos por escrito. Recibes el estudio por correo y, si quieres hablar, nos escribes tú." },
  { p: "¿Cuánto tarda?", r: "Menos de una semana desde que empezamos tu estudio. Es un compromiso, no una estimación. Lo normal es tenerlo en tres días." },
  { p: "¿Y si ahora no podéis hacer el mío?", r: "Te escribimos igual, con tu nota y lo que mejoraríamos primero. Hacemos pocos estudios a la vez y hay lista de espera; si no es ahora, te avisamos cuando haya hueco." },
  { p: "¿Qué tengo que daros para hacerlo?", r: "Solo lo que contestes en el test. El estudio lo hacemos con lo que se ve desde fuera: tu web, tu ficha de Google, tus anuncios y tu competencia." },
  { p: "¿Puedo ver un ejemplo antes?", r: "Sí: hay uno entero, hecho para un despacho inventado, con la web, la guía, los correos, el panel y el CRM. Está en la página Un ejemplo real." },
];

export default function SeccionDudasEstudio() {
  return (
    <section className="relative overflow-hidden bg-niebla py-14 sm:py-20" aria-labelledby="dudas-estudio">
      <Nebulosa variante={1} />
      <DatosEstructurados datos={schemaFaqArticulo(FAQ)} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta icono="bombilla">Lo decimos claro, porque cuesta creerlo</Etiqueta>
        <h2 id="dudas-estudio" className="mt-5 max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">¿Y por qué regalamos un día de trabajo?</h2>
        <p className="mt-5 max-w-3xl text-lg text-gris">
          Cuando alguien lo lee por primera vez, suele pensar que hay truco. <b className="text-tinta">No lo hay.</b> Si vemos que podemos ayudarte, nuestro equipo dedica un día entero a tu negocio y te envía el resultado. Gratis, sin compromiso, sin reunión y sin que nadie te llame para venderte nada.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {RAZONES.map(([ic, t, d], i) => (
            <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} chip={`Razón ${i + 1}`} />
          ))}
        </ul>
        <h3 className="mt-14 text-2xl font-extrabold text-tinta sm:text-3xl">¿Y qué pasa si después no quiero seguir?</h3>
        <p className="mt-3 max-w-3xl text-lg text-gris">Nada. Esto es lo que pasa con cada cosa:</p>
        <ul className="mt-4 grid max-w-3xl gap-2 text-lg text-gris">
          {SI_NO_SIGO.map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-0.5 font-extrabold text-noche-3">✓</span>
              <span className="min-w-0">{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-lg text-gris">
          No hay letra pequeña, ni permanencia, ni una llamada incómoda. Lo decimos en <Link href="/tu-control" className="font-bold text-noche-3 underline underline-offset-4">Tu control</Link> y lo cumplimos: nada te ata.
        </p>
        <h3 className="mt-14 text-2xl font-extrabold text-tinta sm:text-3xl">El test no es un examen</h3>
        <p className="mt-3 max-w-3xl text-lg text-gris">
          No buscamos empresas perfectas ni queremos ponerte nota para quedar por encima. El test nos sirve para entender tu negocio y ver si de verdad podemos aportarte algo. Cada estudio son días de trabajo de varias personas: solo podemos hacer unos pocos a la vez y hoy tenemos lista de espera. Si no podemos ahora, te lo decimos igual, con tu nota, y te avisamos en cuanto haya hueco.
        </p>
        <h3 className="mt-14 text-2xl font-extrabold text-tinta sm:text-3xl">Preguntas sobre el estudio</h3>
        <div className="mt-5 grid max-w-3xl gap-3">
          {FAQ.map((f, i) => (
            <PreguntaViva key={f.p} p={f.p} i={i}>
              <p className="text-gris">{f.r}</p>
            </PreguntaViva>
          ))}
        </div>
      </div>
    </section>
  );
}
