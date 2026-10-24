import Link from "next/link";

// Franja de título para las páginas interiores, con las migas de pan.
export default function CabeceraPagina({
  titulo,
  entradilla,
  migas,
}: {
  titulo: string;
  entradilla?: string;
  migas: { texto: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-noche pb-14 pt-32 text-white sm:pb-20 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/video/constelaciones.jpg)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noche via-noche/80 to-noche/40" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <nav aria-label="Estás aquí" className="text-sm text-white/65">
          <ol className="flex flex-wrap items-center gap-2">
            {migas.map((m, i) => (
              <li key={m.texto} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {m.href ? (
                  <Link href={m.href} className="hover:text-white">
                    {m.texto}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/90">
                    {m.texto}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">{titulo}</h1>
        {entradilla && <p className="mt-5 max-w-2xl text-lg text-white/80 sm:text-xl">{entradilla}</p>}
      </div>
    </section>
  );
}
