import Link from "next/link";
import VideoFondo from "@/components/VideoFondo";

// Franja de título de las páginas interiores: texto a la izquierda y un vídeo con personas o luz a la derecha.
// En el móvil, el vídeo va debajo del texto, en su tarjeta y bien visible.
export default function CabeceraPagina({
  titulo,
  entradilla,
  migas,
  video,
  videoAlt = "",
  visual,
}: {
  titulo: string;
  entradilla?: string;
  migas: { texto: string; href?: string }[];
  video?: string;
  videoAlt?: string;
  visual?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-noche pb-14 pt-28 text-white sm:pb-20 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <VideoFondo nombre="constelaciones" alt="" prioridad />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noche/80 via-noche/25 to-transparent" />
      <div className={`relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 ${video || visual ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div>
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
        {visual && <div className="relative mt-2 lg:mt-0">{visual}</div>}
        {!visual && video && (
          <div className="relative mt-2 lg:mt-0">
            <div className="absolute -inset-3 rounded-[2.4rem] bg-estrella/20 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] ring-1 ring-white/15 lg:aspect-[4/3] lg:rounded-[2rem]">
              <VideoFondo nombre={video} alt={videoAlt} />
            </div>
            <span aria-hidden="true" className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-estrella shadow-[0_0_0_8px_rgba(255,197,61,0.25),0_0_30px_rgba(255,197,61,0.8)]" />
          </div>
        )}
      </div>
    </section>
  );
}
