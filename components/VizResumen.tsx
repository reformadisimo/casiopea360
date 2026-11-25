/* Resumen visual de la oferta, justo tras el titular del artículo de la cuota (25-nov-2026). Cifras iguales que SeccionAhorro:
   cuota 1.800 €, por separado 4.000-4.800 €/mes, primer año 21.600 € frente a 54.000-63.600 €. */
const CHIPS = ["Un solo equipo", "Una persona de referencia", "Sin permanencia", "Tus cuentas y contactos son tuyos", "La inversión en anuncios va aparte"];

export default function VizResumen() {
  return (
    <section className="bg-white py-8 sm:py-10" aria-label="Resumen de la oferta">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-3xl bg-estrella p-5 text-tinta">
            <p className="text-sm font-extrabold uppercase tracking-wide">Con Casiopea 360</p>
            <p className="mt-1 text-4xl font-extrabold sm:text-5xl">1.800 €</p>
            <p className="font-bold">al mes + IVA, con todo dentro</p>
          </div>
          <div className="rounded-3xl bg-niebla p-5 text-tinta ring-1 ring-black/5">
            <p className="text-sm font-extrabold uppercase tracking-wide text-gris">Por separado</p>
            <p className="mt-1 text-3xl font-extrabold sm:text-4xl">4.000 – 4.800 €</p>
            <p className="font-bold text-gris">al mes (SEO, anuncios, redes y diseño)</p>
          </div>
          <div className="rounded-3xl bg-noche p-5 text-white">
            <p className="text-sm font-extrabold uppercase tracking-wide text-white/75">En el primer año</p>
            <p className="mt-1 text-3xl font-extrabold text-estrella sm:text-4xl">21.600 €</p>
            <p className="font-bold text-white/90">frente a 54.000 – 63.600 € por separado</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <li key={c} className="flex items-center gap-2 rounded-full bg-niebla px-3.5 py-1.5 text-sm font-bold text-tinta ring-1 ring-black/5"><span aria-hidden="true" className="text-emerald-600">✓</span>{c}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gris">Precios de mercado orientativos, sin IVA. Web y CRM, aparte en la comparación del año, se pagan una sola vez.</p>
      </div>
    </section>
  );
}
