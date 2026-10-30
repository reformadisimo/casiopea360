import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BOTON, ENVOLTORIO, LlamadaFinal, SeccionMiedoAlCambio } from "@/components/secciones";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";
import { Bocadillo, ChipIcono, Etiqueta, ListaViva, Nebulosa, TarjetaViva } from "@/components/Vida";

export const metadata = meta(
  "Miedo al cambio: prueba la web nueva sin riesgo",
  "Test A/B entre tu web actual y la nueva, con el reparto de visitas que elijas, salida a los tres meses sin pagar nada si no mejoramos los indicadores acordados, y tus cuentas siempre tuyas.",
  "/miedo-al-cambio",
);

const PASOS: [string, string, string][] = [
  ["pagina", "Dejamos tu web como está", "No la tocamos ni la apagamos. Sigue funcionando mientras hacemos la nueva."],
  ["herramienta", "Montamos la nueva al lado", "La preparamos, la medimos igual que la tuya y la dejamos lista para recibir visitas."],
  ["mano", "Tú eliges el reparto", "La mitad de las visitas, seis de cada diez o siete. El porcentaje que te dé tranquilidad."],
  ["grafica", "Comparas con tus datos", "Según tus visitas, en días o semanas ves cuál trae más contactos y clientes."],
  ["check", "Decides tú", "Si gana la nueva, recibe todas las visitas. Si no te convence, paras cuando quieras."],
];

const PREGUNTAS: { icono: string; p: string; r: string }[] = [
  { icono: "ojo", p: "¿Pierdo visitas durante la prueba?", r: "Tu web actual recibe las visitas que tú decidas. Si quieres, empezamos con poco y subimos poco a poco." },
  { icono: "reloj", p: "¿Cuánto dura?", r: "Con muchas visitas, unos días; con pocas, unas semanas. Te lo decimos antes de empezar." },
  { icono: "escudo", p: "¿Y si la nueva no mejora?", r: "Deciden los números. Y si a los tres meses no hemos mejorado los indicadores que fijamos contigo al empezar, te vas sin pagar nada y con tu web." },
  { icono: "firma", p: "¿Me prometéis que va a ganar?", r: "No. Hasta hoy ha ganado en todos nuestros clientes, pero eso se comprueba contigo." },
];

const PANEL = [
  "Comparas con el mes pasado o con el día que empezamos.",
  "Con la prueba A/B, ves lado a lado la web actual y la nueva.",
  "Si a los tres meses no mejoran los indicadores fijados contigo, te vas sin pagar nada.",
];

const EVOLUCION = [16, 21, 29, 33, 38, 41];

export default function MiedoAlCambio() {
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Miedo al cambio", ruta: "/miedo-al-cambio" }])} />
      <CabeceraPagina
        ejemplo
        titulo="¿Te da miedo cambiar? Pruébalo sin riesgo."
        clave="sin riesgo"
        entradilla="La web nueva, al lado de la tuya. Tú eliges cuántas visitas ve cada una y decides con tus números."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Cómo trabajamos", href: "/como-trabajamos" }, { texto: "Miedo al cambio" }]}
      />

      <SeccionMiedoAlCambio />

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <Nebulosa variante={0} />
        <div className={`${ENVOLTORIO} relative`}>
          <Etiqueta icono="cohete">Paso a paso</Etiqueta>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Así es la prueba</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PASOS.map(([ic, t, d], i) => (
              <TarjetaViva key={t} icono={ic} i={i} titulo={t} texto={d} chip={`Paso ${i + 1}`} className="!p-5 [&>h3]:text-lg" />
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-noche py-20 text-white sm:py-24">
        <Nebulosa oscura variante={1} />
        <div className={`${ENVOLTORIO} relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]`}>
          <div>
            <Etiqueta tono="cristal" icono="grafica">Tu panel de control</Etiqueta>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Lo ves tú, cada día, sin pedírnoslo.</h2>
            <p className="mt-4 text-lg text-white/85"><b className="text-white">Visitas, contactos, clientes y lo que cuesta cada uno</b>, en tiempo real y desde el móvil.</p>
            <ListaViva items={PANEL} claro className="mt-5" />
            <Link href="/panel" className={`${BOTON} mt-7 inline-flex`}>Ver el panel de ejemplo</Link>
          </div>
          <div className="rounded-[2rem] bg-white p-6 text-tinta sm:p-8" role="img" aria-label="Ejemplo: clientes nuevos al mes, de 16 en el primer mes a 41 en el sexto">
            <p className="text-sm font-bold text-gris">Ejemplo con datos inventados</p>
            <p className="mt-1 flex items-center gap-3 text-xl font-extrabold">
              <ChipIcono icono="grafica" i={0} tam="h-9 w-9" />
              Clientes nuevos al mes
            </p>
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

      <section className="relative overflow-hidden bg-niebla py-20 sm:py-24">
        <Nebulosa variante={2} />
        <div className={`${ENVOLTORIO} relative`}>
          <h2 className="flex items-center gap-3 text-3xl font-extrabold sm:gap-4 sm:text-4xl">
            <ChipIcono icono="chat" i={1} />
            <span className="min-w-0">Lo que suele preguntarse</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PREGUNTAS.map((x, i) => (
              <TarjetaViva key={x.p} como="div" icono={x.icono} i={i + 2} titulo={x.p} texto={x.r} />
            ))}
          </div>
          <Bocadillo className="mt-8 max-w-3xl">No se puede prometer. Lo comprobamos contigo, con tus datos.</Bocadillo>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
