// Tarjetita flotante sobre un vídeo con un dato real: cifra en grande y una línea debajo.
// Flota despacio para que el ojo la encuentre sin que moleste.
export default function ChipVideo({ grande, chico, pos = "abajo-izq", icono }: { grande: string; chico: string; pos?: "abajo-izq" | "abajo-der" | "arriba-izq" | "arriba-der"; icono?: React.ReactNode }) {
  const sitio = { "abajo-izq": "bottom-4 left-4", "abajo-der": "bottom-4 right-4", "arriba-izq": "top-4 left-4", "arriba-der": "top-4 right-4" }[pos];
  return (
    <div className={`chip-video pointer-events-none absolute z-10 flex items-center gap-3 rounded-2xl bg-noche/80 px-4 py-3 text-white shadow-[0_18px_40px_-16px_rgba(14,26,61,0.7)] ring-1 ring-white/20 backdrop-blur-md ${sitio}`}>
      {icono && (
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-estrella text-tinta">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{icono}</svg>
        </span>
      )}
      <span>
        <span className="block font-titular text-xl font-extrabold leading-none text-estrella sm:text-2xl">{grande}</span>
        <span className="mt-1 block text-xs font-bold text-white/85 sm:text-sm">{chico}</span>
      </span>
    </div>
  );
}
