// Marca: la C con la estela y las estrellas de Casiopea sobre su loseta azul (el mismo azul de Mi Estela), y el nombre.
export default function Logo({ claro = false }: { claro?: boolean }) {
  const color = claro ? "#ffffff" : "#0e1a3d";
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marca/icono.svg"
        alt=""
        width={44}
        height={44}
        className="h-9 w-9 rounded-[0.7rem] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_6px_22px_-4px_rgba(29,61,255,0.85)] sm:h-11 sm:w-11 sm:rounded-[0.85rem]"
      />
      <span className="whitespace-nowrap font-titular text-[1.05rem] font-extrabold tracking-tight sm:text-[1.2rem]" style={{ color }}>
        Casiopea<span className="font-normal opacity-90"> 360</span>
      </span>
    </span>
  );
}
