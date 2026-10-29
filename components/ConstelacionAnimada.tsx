"use client";

import { useEffect, useState } from "react";

// La gráfica del aviso, en bucle de 9 segundos (gráfica de Ig, «grafica-estela-casiopea.svg»):
// 1. La línea de la W se dibuja de izquierda a derecha en unos 2 s.
// 2. Cada punto aparece cuando la línea llega a él, con un pequeño rebote, y se queda como una estela azul.
// 3. Al final se enciende el orbe de Estela: azul con centro blanco, halo que late y dos ondas que se expanden.
// 4. Brilla unos 6 s, se funde y vuelve a empezar.
// Con «reducir movimiento» se ve la gráfica completa y el orbe quietos.
const PUNTOS: { x: number; y: number; t: number }[] = [
  { x: 20, y: 135, t: 0.011 },
  { x: 60, y: 172, t: 0.061 },
  { x: 94, y: 132, t: 0.111 },
  { x: 126, y: 156, t: 0.15 },
];
const DUR = "9s";
const f = (n: number) => n.toFixed(3);

export default function ConstelacionAnimada({ className = "" }: { className?: string }) {
  const [quieto, setQuieto] = useState(false);
  useEffect(() => {
    try {
      setQuieto(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {}
  }, []);

  return (
    <svg aria-hidden="true" viewBox="0 0 250 210" overflow="visible" className={className}>
      <defs>
        <filter id="aviso-gl" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="aviso-gl2" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id="aviso-gl3" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <radialGradient id="aviso-core" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#EEF3FF" />
          <stop offset="100%" stopColor="#C9D8FF" />
        </radialGradient>
      </defs>
      <g>
        {!quieto && <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.933;0.983;1" dur={DUR} repeatCount="indefinite" />}

        {/* La línea */}
        <polyline
          points="20,135 60,172 94,132 126,156 175,77"
          fill="none"
          stroke="#C7CBE0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="240"
          strokeDashoffset={quieto ? 0 : 240}
        >
          {!quieto && <animate attributeName="stroke-dashoffset" values="240;240;0;0" keyTimes="0;0.011;0.233;1" dur={DUR} repeatCount="indefinite" />}
        </polyline>

        {/* Los puntos: aparecen al llegar la línea y se quedan como estelas */}
        {PUNTOS.map(({ x, y, t }) => {
          const salto = `0;${f(t)};${f(t + 0.017)};${f(t + 0.034)};1`;
          const onda = `0;${f(t)};${f(t + 0.002)};${f(t + 0.09)};1`;
          return (
            <g key={x}>
              {!quieto && (
                <circle cx={x} cy={y} r="0" fill="none" stroke="#7FA6FF" strokeWidth="2">
                  <animate attributeName="r" values="7;7;7;30;30" keyTimes={onda} dur={DUR} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.75;0;0" keyTimes={onda} dur={DUR} repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={x} cy={y} r={quieto ? 12 : 0} fill="#5B8CFF" opacity={quieto ? 0.5 : 0} filter="url(#aviso-gl3)">
                {!quieto && <animate attributeName="r" values="0;0;16;12;12" keyTimes={salto} dur={DUR} repeatCount="indefinite" />}
                {!quieto && <animate attributeName="opacity" values="0;0;0.7;0.5;0.5" keyTimes={salto} dur={DUR} repeatCount="indefinite" />}
              </circle>
              <circle cx={x} cy={y} r={quieto ? 7 : 0} fill="#E4E7F3">
                {!quieto && <animate attributeName="r" values="0;0;10;7;7" keyTimes={salto} dur={DUR} repeatCount="indefinite" />}
              </circle>
            </g>
          );
        })}

        {/* El orbe de Estela */}
        <g transform="translate(184,64)" opacity={quieto ? 1 : 0}>
          {!quieto && <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.228;0.256;1" dur={DUR} repeatCount="indefinite" />}
          {!quieto &&
            [0, 1.2].map((inicio) => (
              <circle key={inicio} r="17" fill="none" stroke="#5B8CFF" strokeWidth="2.5" opacity="0">
                <animate attributeName="r" values="17;44" dur="2.4s" begin={`${inicio}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin={`${inicio}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-width" values="3;0.6" dur="2.4s" begin={`${inicio}s`} repeatCount="indefinite" />
              </circle>
            ))}
          <circle r="23" fill="#2F6BFF" opacity="0.85" filter="url(#aviso-gl)">
            {!quieto && <animate attributeName="r" values="21;26;21" dur="2.4s" repeatCount="indefinite" />}
          </circle>
          <circle r="16" fill="#1F4FE8" />
          <circle r="16" fill="none" stroke="#7FA6FF" strokeWidth="1.6" filter="url(#aviso-gl2)" />
          <circle r="11.5" fill="url(#aviso-core)" />
        </g>
      </g>
    </svg>
  );
}
