import Link from "next/link";
import { ChipIcono, Etiqueta, Nebulosa } from "@/components/Vida";
import { BOTON, ENVOLTORIO } from "@/components/secciones";
import Nitido from "@/components/Nitido";

/* «El problema casi nunca es tu producto: es que no te ven» (1-nov-2026, Ig).
   Lo que vemos al entrar en una empresa a la que no le va bien, y cómo lo arreglamos.
   Sin prometer resultados: es nuestra experiencia, no una garantía. */
const CAUSAS: [string, string, string][] = [
  ["pagina", "Una web antigua", "Lenta, anticuada o que no convence en el móvil."],
  ["lupa", "Mal posicionada", "Quien te busca en Google o en ChatGPT no te encuentra."],
  ["diana", "Campañas mal configuradas", "Pagas anuncios que no llegan a quien te compraría."],
  ["chat", "Redes abandonadas", "Nadie ve lo bien que trabajas."],
];

export default function SeccionVisibilidad() {
  return (
    <section className="relative overflow-hidden bg-niebla py-14 sm:py-20" aria-labelledby="visibilidad">
      <Nebulosa variante={2} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta icono="ojo">Lo que vemos casi siempre</Etiqueta>
        <h2 id="visibilidad" className="mt-5 max-w-4xl text-3xl font-extrabold text-tinta sm:text-5xl">
          <Nitido>Tu producto es bueno. <span className="text-noche-3">El problema es que no te ven.</span></Nitido>
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-gris">
          <b className="text-tinta">En las empresas a las que no les va bien, casi nunca falla el producto ni el servicio.</b> Falla la visibilidad, y suele ser por esto:
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAUSAS.map(([ic, t, d], k) => (
            <li key={t} className="rounded-[1.4rem] bg-white p-5 ring-1 ring-linea">
              <ChipIcono icono={ic} i={k} />
              <p className="mt-4 text-lg font-extrabold text-tinta">{t}</p>
              <p className="mt-1 text-gris">{d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-4 rounded-[1.6rem] bg-noche p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-lg">
            <b className="text-estrella">Lo arreglamos todo a la vez.</b> En nuestra experiencia, ese empujón se nota, y mucho.
          </p>
          <Link href="/test" className={`${BOTON} shrink-0`}>¿Es tu caso? Haz el test</Link>
        </div>
      </div>
    </section>
  );
}
