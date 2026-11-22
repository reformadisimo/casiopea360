import Link from "next/link";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ENVOLTORIO } from "@/components/secciones";
import { Etiqueta, Nebulosa, PreguntaViva } from "@/components/Vida";
import { schemaFaqArticulo } from "@/lib/schema";

// Lo que antes decía el artículo «Si podemos ayudarte, te preparamos gratis tu web nueva, tu guía y tu plan»:
// se fusionó aquí (6-nov-2026) para que una sola página compita por «estudio de marketing gratis».
const RAZONES: [string, string][] = [
  ["Demostrar, no prometer", "Enseñarte tu web hecha vale más que decirlo."],
  ["Decides con datos", "Lo ves, lo tocas y se lo enseñas a quien quieras."],
  ["Nos sale a cuenta", "Un día de trabajo es una inversión pequeña."],
];

const SI_NO_SIGO: [string, string][] = [
  ["La guía es tuya", "Te la descargas en PDF y la guardas."],
  ["Lo demás, un mes", "Web, correos, panel y CRM, en un enlace privado."],
  ["Y se acabó", "Cerramos el acceso. Sin letra pequeña ni llamadas."],
];

const FAQ: { p: string; r: string }[] = [
  { p: "¿De verdad es gratis?", r: "De verdad. Ni ahora ni después, y sin tarjeta ni firmas. Tú lo miras con calma y decides." },
  { p: "¿Me vais a llamar para venderme algo?", r: "Ni una llamada. Trabajamos por escrito y a tu ritmo; si quieres hablar, escríbenos tú." },
  { p: "¿Cuánto tarda?", r: "Menos de una semana, es un compromiso. Lo normal, tres días." },
  { p: "¿Y si ahora no podéis hacer el mío?", r: "Te escribimos igual y te avisamos cuando haya hueco: hacemos pocos estudios a la vez." },
  { p: "¿Qué tengo que daros para hacerlo?", r: "Casi nada: lo que contestes en el test. Lo demás lo miramos nosotros desde fuera: tu web, tu ficha, tus anuncios y tu competencia." },
  { p: "¿Puedo ver un ejemplo antes?", r: "Claro: uno entero, de un despacho inventado, en la página Un ejemplo real. Míralo con calma." },
];

export default function SeccionDudasEstudio() {
  return (
    <section className="relative overflow-hidden bg-niebla py-14 sm:py-20" aria-labelledby="dudas-estudio">
      <Nebulosa variante={1} />
      <DatosEstructurados datos={schemaFaqArticulo(FAQ)} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta icono="bombilla">Lo decimos claro, porque cuesta creerlo</Etiqueta>
        <h2 id="dudas-estudio" className="mt-5 max-w-3xl text-3xl font-extrabold text-tinta sm:text-5xl">¿Y por qué regalamos un día de trabajo?</h2>
        <p className="mt-5 max-w-3xl text-lg text-gris">No hay truco: si podemos ayudarte, un día entero de equipo para ti. Sin reunión y sin llamadas.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {RAZONES.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-noche p-6 text-white">
              <h3 className="text-lg font-extrabold text-estrella">{t}</h3>
              <p className="mt-2 text-sm text-white/80">{d}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-14 text-2xl font-extrabold text-tinta sm:text-3xl">¿Y si después no quiero seguir?</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {SI_NO_SIGO.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-noche p-6 text-white">
              <h3 className="text-lg font-extrabold text-estrella">{t}</h3>
              <p className="mt-2 text-sm text-white/80">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-gris">Nada te ata: míralo en <Link href="/tu-control" className="font-bold text-noche-3 underline underline-offset-4">Tu control</Link>.</p>
        <h3 className="mt-14 text-2xl font-extrabold text-tinta sm:text-3xl">El test no es un examen</h3>
        <p className="mt-3 max-w-3xl text-lg text-gris">Solo nos sirve para entender tu negocio. Hacemos pocos estudios a la vez; si hay lista de espera, te avisamos.</p>
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
