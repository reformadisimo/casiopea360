"use client";
import { useEffect, useRef, useState } from "react";

/* Lupa propia de Casiopea (19-nov-2026): la página real dentro de un marco y, encima, el mapa de calor de los clics
   (azul = pocos, rojo = muchos), más la raya donde llega la mitad de las personas. Todo en el navegador de quien mira. */

type Punto = [number, number, number]; // x en milésimas, y en píxeles, 1 si fue en algo que se pulsa
type Modo = "todos" | "activos" | "muertos";

const ANCHO = { pc: 1280, movil: 390 } as const;

export default function LupaViva({ pagina, disp, alto, puntos, alcance }: { pagina: string; disp: "pc" | "movil"; alto: number; puntos: Punto[]; alcance: number[] }) {
  const W = ANCHO[disp];
  const H = Math.min(Math.max(alto, 600), 12000);
  const caja = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const [escala, setEscala] = useState(1);
  const [modo, setModo] = useState<Modo>("todos");
  const [calor, setCalor] = useState(true);

  useEffect(() => {
    const ajustar = () => { const a = caja.current?.clientWidth ?? W; setEscala(Math.min(1, a / W)); };
    ajustar();
    const o = new ResizeObserver(ajustar);
    if (caja.current) o.observe(caja.current);
    return () => o.disconnect();
  }, [W]);

  const visibles = puntos.filter((p) => (modo === "todos" ? true : modo === "activos" ? p[2] === 1 : p[2] === 0));

  useEffect(() => {
    const c = lienzo.current;
    if (!c) return;
    const g = c.getContext("2d", { willReadFrequently: true });
    if (!g) return;
    g.clearRect(0, 0, W, H);
    if (!calor || !visibles.length) return;
    const radio = disp === "pc" ? 34 : 24;
    // 1) acumular intensidad en el canal alfa
    for (const [x, y] of visibles) {
      const px = (x / 1000) * W;
      if (y > H) continue;
      const r = g.createRadialGradient(px, y, 0, px, y, radio);
      r.addColorStop(0, "rgba(0,0,0,0.22)");
      r.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = r;
      g.fillRect(px - radio, y - radio, radio * 2, radio * 2);
    }
    // 2) pintar cada punto según su intensidad: azul, verde, amarillo, rojo
    const img = g.getImageData(0, 0, W, H);
    const d = img.data;
    const paleta = (t: number): [number, number, number] => {
      const tramos: [number, number, number][] = [[40, 90, 255], [30, 200, 120], [255, 220, 40], [240, 40, 40]];
      const k = Math.min(0.999, Math.max(0, t)) * (tramos.length - 1);
      const i = Math.floor(k), f = k - i;
      const a = tramos[i], b = tramos[i + 1];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    };
    for (let i = 3; i < d.length; i += 4) {
      const a = d[i];
      if (!a) continue;
      const [r, gg, bb] = paleta(a / 255 / 0.85);
      d[i - 3] = r; d[i - 2] = gg; d[i - 1] = bb;
      d[i] = Math.min(235, 70 + a * 1.3);
    }
    g.putImageData(img, 0, 0);
  }, [visibles, calor, W, H, disp]);

  // Raya donde llega la mitad de las personas: la banda más baja a la que llega al menos el 50 %.
  let mitad = 0;
  alcance.forEach((v, i) => { if (v >= 50) mitad = (i + 1) * 10; });
  const yMitad = Math.round((mitad / 100) * H);

  const BOTON = "rounded-full px-4 py-2 text-sm font-bold ring-1 ring-black/10 transition-colors";
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {([["todos", "Todos los clics"], ["activos", "Donde se puede pulsar"], ["muertos", "Donde no pasa nada"]] as [Modo, string][]).map(([m, t]) => (
          <button key={m} type="button" onClick={() => setModo(m)} className={`${BOTON} ${modo === m ? "bg-noche text-white" : "bg-white text-tinta hover:bg-niebla"}`}>{t}</button>
        ))}
        <button type="button" onClick={() => setCalor((v) => !v)} className={`${BOTON} ${calor ? "bg-white text-tinta" : "bg-estrella text-tinta"}`}>{calor ? "Ocultar el calor" : "Ver el calor"}</button>
        <span className="text-sm text-tinta/60">{visibles.length} clics en este mapa</span>
      </div>
      <div ref={caja} className="w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/10">
        <div style={{ width: W * escala, height: H * escala, position: "relative" }}>
          <div style={{ width: W, height: H, transform: `scale(${escala})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
            <iframe src={pagina} title={`Página ${pagina}`} width={W} height={H} loading="lazy" style={{ border: 0, display: "block", width: W, height: H }} />
            <canvas ref={lienzo} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H, pointerEvents: "none" }} />
            {mitad > 0 && (
              <div style={{ position: "absolute", left: 0, right: 0, top: yMitad, pointerEvents: "none", borderTop: "3px dashed #ffc53d" }}>
                <span style={{ position: "absolute", right: 8, top: 4, background: "#16286b", color: "#fff", fontSize: 14, fontWeight: 700, padding: "4px 10px", borderRadius: 999 }}>
                  Hasta aquí llega la mitad de las personas
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
