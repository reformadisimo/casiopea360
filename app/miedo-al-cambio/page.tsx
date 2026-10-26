import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, ENVOLTORIO, LlamadaFinal, SeccionMiedoAlCambio } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Miedo al cambio: prueba la web nueva sin riesgo",
  "Test A/B entre tu web actual y la nueva, con el reparto de visitas que elijas, salida a los tres meses si no mejoramos y todo lo construido es tuyo.",
  "/miedo-al-cambio",
);

const PASOS: [string, string][] = [
  ["Dejamos tu web como está", "No la tocamos ni la apagamos. Sigue funcionando mientras hacemos la nueva."],
  ["Montamos la nueva al lado", "La preparamos, la medimos igual que la tuya y la dejamos lista para recibir visitas."],
  ["Tú eliges el reparto", "La mitad de las visitas, seis de cada diez o siete. El porcentaje que te dé tranquilidad."],
  ["Comparas con tus datos", "En unos días o semanas, según las visitas que tengas, ves cuál consigue más contactos y más clientes."],
  ["Decides tú", "Si la nueva gana, pasa a recibir todas las visitas. Si no te convence, paras la prueba cuando quieras."],
];

const PREGUNTAS: { p: string; r: string }[] = [
  { p: "¿Pierdo visitas durante la prueba?", r: "Tu web actual sigue recibiendo la parte de visitas que tú decidas. Si te da más seguridad, empezamos con un reparto pequeño y lo vamos subiendo." },
  { p: "¿Cuánto dura?", r: "Depende de las visitas que tengas: con mucho tráfico, unos días; con poco, unas semanas. Te lo decimos antes de empezar." },
  { p: "¿Y si la nueva no mejora?", r: "No la imponemos. Lo enseñan los números, y a los tres meses, si no has visto que mejoramos, puedes irte y quedarte con todo lo construido." },
  { p: "¿Me prometéis que va a ganar?", r: "No se puede prometer. Hasta hoy ha funcionado mejor en todos los clientes con los que hemos trabajado, pero lo comprobamos contigo, con tus datos." },
];

const EVOLUCION = [16, 21, 29, 33, 38, 41];

export default function MiedoAlCambio() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Miedo al cambio", ruta: "/miedo-al-cambio" }])} />
      <CabeceraPagina
        titulo="¿Te da miedo cambiar? Pruébalo sin riesgo."
        clave="sin riesgo"
        entradilla="Es normal. Por eso no te pedimos que cierres los ojos: ponemos la web nueva al lado de la tuya, tú eliges cuántas visitas ve cada una y decides con tus propios números. Y si en tres meses no has visto que mejoramos, te puedes ir."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Miedo al cambio" }]}
      />

      <SeccionMiedoAlCambio />

      <section className="bg-white py-20 sm:py-24">
        <div className={ENVOLTORIO}>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Paso a paso</p>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Así es la prueba</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {PASOS.map(([t, d], i) => (
              <li key={t} className="rounded-[1.6rem] border border-linea p-5">
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-estrella text-lg font-extrabold text-tinta">{i + 1}</span>
                <p className="mt-3 text-lg font-extrabold leading-snug">{t}</p>
                <p className="mt-2 text-gris">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-noche py-20 text-white sm:py-24">
        <div className={`${ENVOLTORIO} grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]`}>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-estrella">Tu panel de control</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">Lo ves tú, cada día, sin pedírnoslo.</h2>
            <p className="mt-4 text-lg text-white/85">Visitas, contactos, clientes y lo que cuesta cada uno, en tiempo real y desde el móvil. Con la evolución desde el primer día, para que veas con tus ojos si estamos mejorando, no porque nosotros lo digamos.</p>
            <ul className="mt-5 space-y-2 text-white/90">
              <li className="flex gap-3"><span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-estrella" />Comparas con el mes pasado o con el día que empezamos.</li>
              <li className="flex gap-3"><span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-estrella" />Con la prueba A/B, ves lado a lado la web actual y la nueva.</li>
              <li className="flex gap-3"><span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-estrella" />Si a los tres meses no ves la línea subir, te puedes ir.</li>
            </ul>
            <Link href="/panel" className={`${BOTON} mt-7 inline-flex`}>Ver el panel de ejemplo</Link>
          </div>
          <div className="rounded-[2rem] bg-white p-6 text-tinta sm:p-8" role="img" aria-label="Ejemplo: clientes nuevos al mes, de 16 en el primer mes a 41 en el sexto">
            <p className="text-sm font-bold text-gris">Ejemplo con datos inventados</p>
            <p className="mt-1 text-xl font-extrabold">Clientes nuevos al mes</p>
            <div className="mt-5 grid grid-cols-6 items-end gap-2 sm:gap-4" style={{ height: 180 }}>
              {EVOLUCION.map((v, i) => (
                <div key={i} className="flex h-full flex-col items-center justify-end">
                  <span className="mb-1 text-xs font-bold">{v}</span>
                  <div className="w-full rounded-t-lg" style={{ height: `${(v / 41) * 100}%`, background: i < 3 ? "#ffc53d" : "#1d4ed8" }} />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-6 gap-2 text-center text-xs text-gris sm:gap-4">
              {["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"].map((m) => <span key={m}>{m}</span>)}
            </div>
            <p className="mt-4 text-sm text-gris">En amarillo, los tres meses para demostrarlo. En azul, lo que viene después.</p>
          </div>
        </div>
      </section>

      <section className="bg-niebla py-20 sm:py-24">
        <div className={ENVOLTORIO}>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Lo que suele preguntarse</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PREGUNTAS.map((x) => (
              <div key={x.p} className="rounded-[1.6rem] border border-linea bg-white p-6">
                <h3 className="text-lg font-extrabold">{x.p}</h3>
                <p className="mt-2 text-gris">{x.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
