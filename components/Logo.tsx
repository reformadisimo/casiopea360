// Marca: la constelación de Casiopea (la W) dibujada como un gráfico que sube y acaba en una estrella dorada,
// sobre su loseta azul, y el nombre en una sola palabra gruesa: casiopea360, con el 360 en oro.
export default function Logo({ claro = false }: { claro?: boolean }) {
  const color = claro ? "#ffffff" : "#0e1a3d";
  const oro = claro ? "#ffc53d" : "#8a5d00"; // en fondo claro, oro más oscuro para que se lea
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      <span className="sr-only">Casiopea 360</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marca/icono.svg"
        alt=""
        width={44}
        height={44}
        className="h-9 w-9 rounded-[0.65rem] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_6px_22px_-4px_rgba(29,61,255,0.85)] sm:h-11 sm:w-11 sm:rounded-[0.8rem]"
      />
      <span aria-hidden="true" className="whitespace-nowrap font-titular text-[1.38rem] font-extrabold leading-none tracking-[-0.035em] sm:text-[1.7rem]" style={{ color }}>
        casiopea<span className="ml-[0.06em]" style={{ color: oro }}>360</span>
      </span>
    </span>
  );
}
