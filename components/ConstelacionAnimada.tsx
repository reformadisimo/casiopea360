"use client";

import { useEffect, useState } from "react";

// La W de Casiopea dibujándose, en bucle de 9 segundos:
// 1. La línea se traza de izquierda a derecha (unos 2 s).
// 2. Cada punto se enciende cuando la línea llega a él: salta y suelta una onda, y se queda como una estela azul.
// 3. Al final se enciende la estrella dorada de Casiopea: halo que late y dos ondas que se expanden.
// 4. Brilla unos 6 s, se funde y vuelve a empezar.
// Con «reducir movimiento» se ve el dibujo terminado y quieto.
// La geometría es la del símbolo de la marca (public/marca/simbolo.svg), para que sea el mismo dibujo que el logo.
const PUNTOS: [number, number][] = [
  [13, 50],
  [32, 72],
  [50, 52],
  [66, 64],
];
const ESTRELLA = "84,8 88.23,18.18 99.22,19.06 90.85,26.22 93.4,36.94 84,31.2 74.6,36.94 77.15,26.22 68.78,19.06 79.77,18.18";
const DUR = "9s";
// Momento (0 a 1 del bucle) en que la línea llega a cada punto: empieza en 0.033 y tarda 0.189 en recorrer sus 120 unidades
const LLEGADA = [0, 29.07, 55.97, 75.97].map((d) => 0.033 + 0.189 * (d / 119.9));
const f = (n: number) => n.toFixed(4);

export default function ConstelacionAnimada({ className = "" }: { className?: string }) {
  const [quieto, setQuieto] = useState(false);
  useEffect(() => {
    try {
      setQuieto(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {}
  }, []);

  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" overflow="visible" className={className}>
      <defs>
        <filter id="aviso-brillo" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="aviso-brillo-fino" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>
      <g>
        {!quieto && <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.933;0.983;1" dur={DUR} repeatCount="indefinite" />}

        {/* La línea */}
        <polyline
          points="13,50 32,72 50,52 66,64 84,24"
          fill="none"
          stroke="#e4e7f3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="124"
          strokeDashoffset={quieto ? 0 : 124}
        >
          {!quieto && (
            <animate attributeName="stroke-dashoffset" values="124;124;0;0" keyTimes="0;0.033;0.222;1" calcMode="spline" keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
          )}
        </polyline>

        {/* Los puntos: cada uno se enciende al llegar la línea */}
        {PUNTOS.map(([x, y], k) => {
          const t = LLEGADA[k];
          const salto = `0;${f(t)};${f(t + 0.012)};${f(t + 0.026)};1`;
          const onda = `0;${f(t)};${f(t + 0.002)};${f(t + 0.09)};1`;
          return (
            <g key={x}>
              {/* Onda que suelta al encenderse */}
              {!quieto && (
                <circle cx={x} cy={y} r="0" fill="none" stroke="#7fa6ff" strokeWidth="1.5">
                  <animate attributeName="r" values="4;4;4;15;15" keyTimes={onda} dur={DUR} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes={onda} dur={DUR} repeatCount="indefinite" />
                </circle>
              )}
              {/* Estela azul */}
              <circle cx={x} cy={y} r={quieto ? 7 : 0} fill="#5b8cff" opacity={quieto ? 0.5 : 0} filter="url(#aviso-brillo)">
                {!quieto && <animate attributeName="r" values="0;0;10;7;7" keyTimes={salto} dur={DUR} repeatCount="indefinite" />}
                {!quieto && <animate attributeName="opacity" values="0;0;0.7;0.5;0.5" keyTimes={salto} dur={DUR} repeatCount="indefinite" />}
              </circle>
              {/* Núcleo blanco */}
              <circle cx={x} cy={y} r={quieto ? 4.4 : 0} fill="#f4f6ff">
                {!quieto && <animate attributeName="r" values="0;0;6;4.4;4.4" keyTimes={salto} dur={DUR} repeatCount="indefinite" />}
              </circle>
            </g>
          );
        })}

        {/* La estrella de Casiopea: aparece al final de la línea y brilla */}
        <g opacity={quieto ? 1 : 0}>
          {!quieto && <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.222;0.24;1" dur={DUR} repeatCount="indefinite" />}
          <g transform="translate(84 22)">
            <g>
              {!quieto && (
                <animateTransform attributeName="transform" type="scale" values="0;0;1.25;1;1" keyTimes="0;0.222;0.245;0.265;1" calcMode="spline" keySplines="0 0 1 1;0.3 1.4 0.6 1;0.3 0 0.5 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
              )}
              {/* Dos ondas doradas que se expanden */}
              {!quieto &&
                [0, 1.2].map((inicio) => (
                  <circle key={inicio} r="8" fill="none" stroke="#ffc53d" strokeWidth="2">
                    <animate attributeName="r" values="8;26" dur="2.4s" begin={`${inicio}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.75;0" dur="2.4s" begin={`${inicio}s`} repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="2.2;0.4" dur="2.4s" begin={`${inicio}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              {/* Halo que late */}
              <circle r="15" fill="#ffc53d" opacity="0.45" filter="url(#aviso-brillo)">
                {!quieto && <animate attributeName="r" values="13;18;13" dur="2.4s" repeatCount="indefinite" />}
                {!quieto && <animate attributeName="opacity" values="0.35;0.6;0.35" dur="2.4s" repeatCount="indefinite" />}
              </circle>
              {/* La estrella, centrada en (0,0) */}
              <g transform="translate(-84 -22)">
                <polygon points={ESTRELLA} fill="#ffc53d" />
                <polygon points={ESTRELLA} fill="none" stroke="#ffe08a" strokeWidth="1.2" filter="url(#aviso-brillo-fino)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
