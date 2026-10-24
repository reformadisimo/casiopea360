import { FRENTES } from "@/lib/contenido";

// La W de Casiopea: cinco estrellas, una por frente, unidas en el orden en que se dibuja.
const PUNTOS = [
  { x: 48, y: 96, rx: 0, ry: -24, ancla: "start" as const },
  { x: 172, y: 262, rx: 0, ry: 40, ancla: "middle" as const },
  { x: 300, y: 146, rx: 0, ry: -26, ancla: "middle" as const },
  { x: 436, y: 292, rx: 0, ry: 40, ancla: "middle" as const },
  { x: 556, y: 58, rx: 0, ry: -24, ancla: "end" as const },
];

export default function Constelacion() {
  return (
    <svg
      viewBox="0 0 604 360"
      role="img"
      aria-label="La constelación de Casiopea: cinco estrellas unidas, una por cada frente del servicio"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <radialGradient id="halo">
          <stop offset="0%" stopColor="#ffc53d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffc53d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {PUNTOS.slice(0, -1).map((p, i) => {
        const q = PUNTOS[i + 1];
        return (
          <line
            key={`l${i}`}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke="#ffd978"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            className="trazo"
            style={{ animationDelay: `${0.35 + i * 0.45}s` }}
          />
        );
      })}

      {PUNTOS.map((p, i) => (
        <g key={`e${i}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r="26"
            fill="url(#halo)"
            className="estrella-punto"
            style={{ animationDelay: `${0.15 + i * 0.45}s` }}
          />
          <circle
            cx={p.x}
            cy={p.y}
            r="6.5"
            fill="#ffc53d"
            className="estrella-punto"
            style={{ animationDelay: `${0.15 + i * 0.45}s` }}
          />
          <text
            x={p.x + p.rx}
            y={p.y + p.ry}
            textAnchor={p.ancla}
            fill="#ffffff"
            fontSize="21"
            fontWeight="700"
            style={{ fontFamily: "var(--font-titular)", animationDelay: `${0.4 + i * 0.45}s` }}
            className="estrella-rotulo"
          >
            {FRENTES[i].nombre}
          </text>
        </g>
      ))}
    </svg>
  );
}
