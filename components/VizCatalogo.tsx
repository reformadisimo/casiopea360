import { CATALOGO } from "@/lib/catalogo";

/* Lista de lo que va dentro de la cuota, en tarjetas por grupo (sale de lib/catalogo.ts; para el artículo de la cuota). */
const COLORES = ["#1f6feb", "#e8457a", "#0f9d58", "#f59e0b", "#7c3aed", "#0ea5a4"];

export default function VizCatalogo() {
  return (
    <section className="bg-noche py-12 text-white sm:py-16" aria-label="Todo lo que va dentro de la cuota">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-estrella">Todo dentro de una cuota</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-extrabold sm:text-4xl">Seis frentes. Un solo equipo. Una sola factura.</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {CATALOGO.map((g, i) => (
            <li key={g.id} className="rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/10" style={{ borderTop: `6px solid ${COLORES[i % COLORES.length]}` }}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-extrabold">{g.nombre}</h3>
                <span className="shrink-0 rounded-full bg-estrella px-2.5 py-0.5 text-sm font-extrabold text-tinta">{g.servicios.length}</span>
              </div>
              <p className="mt-1 text-sm text-white/75">{g.frase}</p>
              <ul className="mt-4 grid gap-1.5 text-[0.95rem] font-semibold">
                {g.servicios.map((s) => (
                  <li key={s.t} className="flex items-start gap-2"><span aria-hidden="true" className="text-estrella">✓</span><span>{s.t}</span></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
