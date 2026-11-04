import AlEntrar from "@/components/AlEntrar";

// Una pantallita de ejemplo dentro de una tarjeta (idea de Ícaro): barra con tres puntos, filas que entran una tras otra
// al llegar a pantalla y un pie que dice que es un ejemplo. Nada de datos reales.
export default function MiniPantalla({ titulo, filas, pie = "Ejemplo", className = "" }: { titulo: string; filas: { texto: string; marca: string }[]; pie?: string; className?: string }) {
  return (
    <AlEntrar className={className}>
      <div className="overflow-hidden rounded-2xl bg-white text-left text-tinta shadow-[0_14px_30px_-18px_rgba(14,26,61,0.5)] ring-1 ring-linea" role="img" aria-label={`Ejemplo de pantalla: ${titulo}. ${filas.map((f) => `${f.texto}, ${f.marca}`).join(". ")}.`}>
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-linea bg-niebla px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 truncate text-[0.7rem] font-extrabold uppercase tracking-wide text-gris">{titulo}</span>
        </div>
        <ul aria-hidden="true" className="grid gap-1.5 p-3">
          {filas.map((f, k) => (
            <li key={f.texto} className="aviso-entra flex items-center justify-between gap-2 rounded-lg bg-niebla px-2.5 py-2 text-[0.82rem] font-semibold leading-snug" style={{ animationDelay: `${0.3 + k * 0.6}s` }}>
              <span className="min-w-0">{f.texto}</span>
              <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-[0.7rem] font-extrabold text-emerald-700">✓ {f.marca}</span>
            </li>
          ))}
        </ul>
        <p aria-hidden="true" className="border-t border-linea px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wide text-gris">{pie}</p>
      </div>
    </AlEntrar>
  );
}
