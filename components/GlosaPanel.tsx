import { glosasDe } from "@/lib/glosarioPanel";

// Debajo de un título o de una cifra: qué significa cada sigla o palabra en inglés que aparece.
export function Glosa({ textos, className = "" }: { textos: (string | undefined)[]; className?: string }) {
  const g = glosasDe(...textos);
  if (!g.length) return null;
  return (
    <p className={`text-xs leading-snug text-gris ${className}`}>
      {g.map(([palabra, explica], i) => (
        <span key={palabra}>
          {i > 0 && " · "}
          <b className="text-tinta">{palabra}</b>: {explica}
        </span>
      ))}
    </p>
  );
}

export type Quien = "nosotros" | "tuyo" | "opcional";

const ETIQUETA: Record<Quien, { texto: string; punto: string }> = {
  nosotros: { texto: "Lo hacemos nosotros", punto: "bg-emerald-500" },
  tuyo: { texto: "Es tuyo: lo gestionas tú", punto: "bg-amber-500" },
  opcional: { texto: "Opcional: lo enciendes tú", punto: "bg-violet-500" },
};

// Quién lleva cada cosa, siempre a la vista.
export function EtiquetaQuien({ quien }: { quien: Quien }) {
  const e = ETIQUETA[quien];
  return (
    <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gris">
      <span className={`h-2 w-2 rounded-full ${e.punto}`} aria-hidden="true" />
      {e.texto}
    </p>
  );
}
