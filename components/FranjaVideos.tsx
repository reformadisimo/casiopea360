import VideoFondo from "@/components/VideoFondo";

type Clip = { nombre: string; alt: string };

// Franjas de vídeo para dar vida a las páginas interiores.
// "franja": tres vídeos a lo ancho con una frase grande encima.
// "mosaico": cuatro vídeos en rejilla desigual, con la frase al lado y etiquetas flotantes.
export default function FranjaVideos({
  clips,
  frase,
  detalle,
  etiquetas = [],
  tipo = "franja",
}: {
  clips: Clip[];
  frase: string;
  detalle?: string;
  etiquetas?: string[];
  tipo?: "franja" | "mosaico";
}) {
  if (tipo === "franja") {
    return (
      <section aria-label={frase} className="relative h-[62vh] min-h-[380px] overflow-hidden bg-noche">
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3">
          {clips.slice(0, 3).map((c, i) => (
            <div key={c.nombre} className={`relative h-full ${i > 0 ? "hidden sm:block" : ""}`}>
              <VideoFondo nombre={c.nombre} alt={c.alt} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/40 to-transparent" />
        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-16">
          <p className="max-w-3xl text-4xl font-extrabold text-white sm:text-6xl">{frase}</p>
          {detalle && <p className="mt-4 max-w-2xl text-lg text-white/80">{detalle}</p>}
        </div>
      </section>
    );
  }

  const [a, b, c, d] = clips;
  return (
    <section className="relative overflow-hidden bg-noche py-16 text-white sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <VideoFondo nombre="constelaciones-azules" alt="" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <p className="text-4xl font-extrabold sm:text-5xl">{frase}</p>
          {detalle && <p className="mt-5 text-lg text-white/80">{detalle}</p>}
          {etiquetas.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {etiquetas.map((e) => (
                <li key={e} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15 backdrop-blur">
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-estrella" />
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid h-[420px] grid-cols-6 grid-rows-6 gap-3 sm:h-[520px]">
          {a && (
            <div className="relative col-span-4 row-span-4 overflow-hidden rounded-[1.6rem] ring-1 ring-white/15">
              <VideoFondo nombre={a.nombre} alt={a.alt} />
            </div>
          )}
          {b && (
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.6rem] ring-1 ring-white/15">
              <VideoFondo nombre={b.nombre} alt={b.alt} />
            </div>
          )}
          {c && (
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.6rem] ring-1 ring-white/15">
              <VideoFondo nombre={c.nombre} alt={c.alt} />
            </div>
          )}
          {d && (
            <div className="relative col-span-4 row-span-2 overflow-hidden rounded-[1.6rem] ring-1 ring-white/15">
              <VideoFondo nombre={d.nombre} alt={d.alt} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
