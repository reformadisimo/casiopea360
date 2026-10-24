// Marca: la C con la estela y las cinco estrellas de Casiopea, y el nombre.
export default function Logo({ claro = false }: { claro?: boolean }) {
  const color = claro ? "#ffffff" : "#0e1a3d";
  return (
    <span className="inline-flex items-center gap-1.5 sm:gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={claro ? "/marca/simbolo.svg" : "/marca/simbolo-oscuro.svg"} alt="" width={40} height={39} className="h-8 w-auto sm:h-10" />
      <span className="whitespace-nowrap font-titular text-[1.05rem] font-extrabold tracking-tight sm:text-[1.3rem]" style={{ color }}>
        Casiopea<span className="font-normal opacity-90"> 360</span>
      </span>
    </span>
  );
}
