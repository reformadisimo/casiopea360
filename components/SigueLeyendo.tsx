import Link from "next/link";
import { ENVOLTORIO } from "@/components/secciones";

// Tira de enlaces «Sigue por aquí» al final de páginas que reciben pocos enlaces.
export default function SigueLeyendo({ enlaces }: { enlaces: { texto: string; href: string }[] }) {
  return (
    <nav aria-label="Sigue por aquí" className="bg-white py-12">
      <div className={ENVOLTORIO}>
        <p className="font-titular text-sm font-extrabold uppercase tracking-wide text-noche-3">Sigue por aquí</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="inline-flex min-h-11 items-center rounded-full bg-niebla px-5 py-2 font-bold leading-snug text-tinta ring-1 ring-linea hover:ring-noche">
                {e.texto}{"\u00a0"}→
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
