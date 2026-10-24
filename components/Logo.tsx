// Marca: la C con la estrella sobre su loseta azul y, al lado, el rótulo de Rosa:
// CASIOPEA en mayúsculas espaciadas, el 360 en oro entre dos rayas y, en grande, MARKETING DIGITAL.
export default function Logo({ claro = false, completo = false }: { claro?: boolean; completo?: boolean }) {
  const color = claro ? "#ffffff" : "#0e1a3d";
  const oro = claro ? "#ffc53d" : "#8a5d00"; // en fondo claro, oro más oscuro para que se lea
  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3">
      <span className="sr-only">Casiopea 360</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marca/icono.svg"
        alt=""
        width={44}
        height={44}
        className="h-9 w-9 rounded-[0.7rem] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_6px_22px_-4px_rgba(29,61,255,0.85)] sm:h-11 sm:w-11 sm:rounded-[0.85rem]"
      />
      <span aria-hidden="true" className="flex flex-col items-center leading-none">
        <span className="whitespace-nowrap pl-[0.2em] font-titular text-[0.98rem] font-extrabold tracking-[0.2em] sm:text-[1.1rem]" style={{ color }}>
          CASIOPEA
        </span>
        <span className="mt-[3px] flex w-full items-center gap-1.5">
          <span className="h-px flex-1" style={{ background: oro, opacity: 0.8 }} />
          <span className="font-titular text-[0.72rem] font-extrabold tracking-[0.08em] sm:text-[0.8rem]" style={{ color: oro }}>
            360
          </span>
          <span className="h-px flex-1" style={{ background: oro, opacity: 0.8 }} />
        </span>
        {completo && (
          <span className="mt-[5px] whitespace-nowrap pl-[0.32em] text-[0.56rem] font-bold tracking-[0.32em]" style={{ color, opacity: 0.8 }}>
            MARKETING DIGITAL
          </span>
        )}
      </span>
    </span>
  );
}
