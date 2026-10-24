// Marca: la W de cinco estrellas y el nombre.
export default function Logo({ claro = false }: { claro?: boolean }) {
  const color = claro ? "#ffffff" : "#0e1a3d";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 44 26" aria-hidden="true" className="h-6 w-auto">
        <polyline points="3,7 12,21 22,11 32,23 41,3" fill="none" stroke="#ffc53d" strokeWidth="1.6" strokeLinejoin="round" />
        {[
          [3, 7],
          [12, 21],
          [22, 11],
          [32, 23],
          [41, 3],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#ffc53d" />
        ))}
      </svg>
      <span className="font-titular text-[1.2rem] font-extrabold tracking-tight" style={{ color }}>
        Casiopea<span className="font-medium"> 360</span>
      </span>
    </span>
  );
}
