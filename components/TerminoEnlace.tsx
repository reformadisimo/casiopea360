import { useId } from "react";
import Link from "next/link";

// Palabra técnica enlazada al glosario. La definición sale al pasar el ratón,
// al enfocar con el teclado o, en pantallas táctiles, al primer toque.
// Todo el texto va ya en el HTML del servidor; el aviso táctil lo gestiona GlosarioTactil.
export default function TerminoEnlace({
  slug,
  nombre,
  corta,
  texto,
}: {
  slug: string;
  nombre: string;
  corta: string;
  texto: string;
}) {
  const id = useId();
  return (
    <span className="gl">
      <Link href={`/glosario/${slug}`} className="gl-a" aria-describedby={id}>
        {texto}
      </Link>
      <span role="tooltip" id={id} className="gl-tip">
        <span className="gl-tip-in">
          <b className="gl-tip-t">{nombre}</b>
          <span className="gl-tip-d">{corta}</span>
          <span className="gl-tip-m" aria-hidden="true">Ver la explicación completa</span>
        </span>
      </span>
    </span>
  );
}
