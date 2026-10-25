// Pictograma de un término del glosario: dibujo de trazo sobre una loseta tintada con el color de su familia.
// Sin estado y sin datos propios: sirve igual en el servidor y en el cliente. Es decorativo (el nombre va escrito al lado).
export default function Picto({ d, color, tam = 56, fondo, className = "" }: { d: string; color: string; tam?: number; fondo?: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: tam, height: tam, borderRadius: tam * 0.3, background: fondo ?? `${color}1a`, color }}
    >
      <svg viewBox="0 0 24 24" width={tam * 0.58} height={tam * 0.58} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}
