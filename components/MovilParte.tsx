// Maqueta de móvil con el parte diario tal como llega por WhatsApp. Cifras de ejemplo.
export default function MovilParte() {
  return (
    <figure className="mx-auto w-full max-w-[320px]">
      <div className="rounded-[2.4rem] bg-noche p-2.5 shadow-[0_30px_60px_-20px_rgba(14,26,61,0.55)]">
        <div className="overflow-hidden rounded-[1.9rem] bg-[#ece5dd]">
          <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-noche text-sm font-bold text-estrella">C</span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-bold">Casiopea 360</span>
              <span className="block text-xs opacity-80">en línea</span>
            </span>
          </div>
          <div className="space-y-2.5 px-3 py-4 text-[0.88rem] leading-snug text-[#111]">
            <p className="w-fit rounded-md bg-white/80 px-2 py-0.5 text-center text-[0.7rem] text-[#555] mx-auto">Hoy</p>
            <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
              <p className="font-bold">Tu parte de hoy</p>
              <p className="mt-1">Ayer entraron 84 personas en tu web y te escribieron 5: 3 por WhatsApp, 1 por teléfono y 1 por el formulario.</p>
              <p className="mt-1">Los anuncios gastaron 11,40 €.</p>
              <p className="mt-1">Todo funciona bien.</p>
              <p className="mt-1 text-right text-[0.68rem] text-[#5f5f5f]">08:02</p>
            </div>
            <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
              <p>Hay una reseña nueva de 5 estrellas. Te dejamos la respuesta preparada: ¿la publicamos?</p>
              <p className="mt-1 text-right text-[0.68rem] text-[#5f5f5f]">08:03</p>
            </div>
            <div className="ml-auto max-w-[70%] rounded-lg rounded-tr-none bg-[#dcf8c6] p-2.5 shadow-sm">
              <p>Sí, adelante</p>
              <p className="mt-1 text-right text-[0.68rem] text-[#5f5f5f]">08:15</p>
            </div>
            <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
              <p>Publicada. Que tengas buen día.</p>
              <p className="mt-1 text-right text-[0.68rem] text-[#5f5f5f]">08:16</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-gris">Un ejemplo de parte diario. Las cifras son ilustrativas.</figcaption>
    </figure>
  );
}
