"use client";

import { useEffect, useRef, useState } from "react";
import { TIERRA } from "@/lib/tierra";

// La Tierra vista desde el espacio, girando, con el día y la noche reales en este momento
// y la hora de varias ciudades. La hora sale del reloj del dispositivo; el sol, de un cálculo astronómico.
const CIUDADES = [
  { n: "Madrid", tz: "Europe/Madrid", lon: -3.7, lat: 40.4 },
  { n: "Londres", tz: "Europe/London", lon: -0.1, lat: 51.5 },
  { n: "Nueva York", tz: "America/New_York", lon: -74, lat: 40.7 },
  { n: "México", tz: "America/Mexico_City", lon: -99.1, lat: 19.4 },
  { n: "Bogotá", tz: "America/Bogota", lon: -74.1, lat: 4.7 },
  { n: "Buenos Aires", tz: "America/Argentina/Buenos_Aires", lon: -58.4, lat: -34.6 },
  { n: "Dubái", tz: "Asia/Dubai", lon: 55.3, lat: 25.2 },
  { n: "Tokio", tz: "Asia/Tokyo", lon: 139.7, lat: 35.7 },
];
const RAD = Math.PI / 180;

function sol(fecha: Date) {
  const inicio = Date.UTC(fecha.getUTCFullYear(), 0, 0);
  const dia = (fecha.getTime() - inicio) / 86400000;
  const decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dia + 10));
  const horas = fecha.getUTCHours() + fecha.getUTCMinutes() / 60 + fecha.getUTCSeconds() / 3600;
  const lon = -15 * (horas - 12);
  return { lat: decl, lon };
}
const esDeDia = (lat: number, lon: number, s: { lat: number; lon: number }) =>
  Math.sin(lat * RAD) * Math.sin(s.lat * RAD) + Math.cos(lat * RAD) * Math.cos(s.lat * RAD) * Math.cos((lon - s.lon) * RAD) > 0;

export default function RelojMundo({ soloGlobo = false }: { soloGlobo?: boolean }) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const [ahora, setAhora] = useState<Date | null>(null);

  useEffect(() => {
    setAhora(new Date());
    const t = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const c = lienzo.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let quieto = false;
    try {
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    let visible = true;
    let marco = 0;
    const inicio = performance.now();
    const tamano = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = c.clientWidth;
      c.width = w * dpr;
      c.height = w * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    tamano();
    const ro = new ResizeObserver(tamano);
    ro.observe(c);

    const pintar = (ms: number) => {
      const w = c.clientWidth;
      const R = w * 0.44;
      const cx = w / 2;
      const cy = w / 2;
      const s = sol(new Date());
      const lon0 = -3.7 - ((ms - inicio) / 1000) * 6; // empieza mirando a Madrid y gira despacio
      const lat0 = 22;
      const sl0 = Math.sin(lat0 * RAD);
      const cl0 = Math.cos(lat0 * RAD);
      ctx.clearRect(0, 0, w, w);

      // halo atmosférico
      const halo = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.14);
      halo.addColorStop(0, "rgba(80,130,255,0.45)");
      halo.addColorStop(1, "rgba(80,130,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.14, 0, Math.PI * 2);
      ctx.fill();

      // océano
      const mar = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
      mar.addColorStop(0, "#1d3dff");
      mar.addColorStop(0.6, "#12267a");
      mar.addColorStop(1, "#0a1435");
      ctx.fillStyle = mar;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      const proyectar = (lon: number, lat: number) => {
        const sf = Math.sin(lat * RAD);
        const cf = Math.cos(lat * RAD);
        const dl = (lon - lon0) * RAD;
        const cosc = sl0 * sf + cl0 * cf * Math.cos(dl);
        return { x: cx + R * cf * Math.sin(dl), y: cy - R * (cl0 * sf - sl0 * cf * Math.cos(dl)), v: cosc };
      };

      // continentes en puntos: dorados de día, azulados de noche
      const r = Math.max(1, w / 380);
      const salto = w < 420 ? 4 : 2; // en pantallas pequeñas, la mitad de puntos: no se nota y cuesta la mitad
      for (let i = 0; i < TIERRA.length; i += salto) {
        const lon = TIERRA[i];
        const lat = TIERRA[i + 1];
        const p = proyectar(lon, lat);
        if (p.v <= 0) continue;
        const dia = esDeDia(lat, lon, s);
        ctx.fillStyle = dia ? `rgba(255,214,110,${0.55 + 0.45 * p.v})` : `rgba(175,200,255,${0.45 + 0.45 * p.v})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * (0.6 + 0.4 * p.v), 0, Math.PI * 2);
        ctx.fill();
      }

      // sombra de la noche, suave, desde el lado contrario al sol
      const ps = proyectar(s.lon, s.lat);
      const dx = ps.x - cx;
      const dy = ps.y - cy;
      const largo = Math.hypot(dx, dy) || 1;
      const ux = dx / largo;
      const uy = dy / largo;
      const noche = ctx.createLinearGradient(cx + ux * R, cy + uy * R, cx - ux * R, cy - uy * R);
      const k = ps.v; // si el sol está de cara, casi todo es de día
      noche.addColorStop(0, "rgba(5,10,30,0)");
      noche.addColorStop(Math.min(Math.max(0.5 + k * 0.45, 0.05), 0.95), "rgba(5,10,30,0)");
      noche.addColorStop(1, "rgba(5,10,30,0.35)");
      ctx.fillStyle = noche;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // ciudades
      ctx.font = `700 ${Math.max(10, w / 34)}px ui-sans-serif, system-ui, sans-serif`;
      for (const ci of CIUDADES) {
        const p = proyectar(ci.lon, ci.lat);
        if (p.v <= 0.08) continue;
        const pulso = 3 + 2 * Math.sin(ms / 400 + ci.lon);
        ctx.fillStyle = "rgba(255,197,61,0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2 + pulso, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffc53d";
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = Math.min(1, p.v * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(ci.n, p.x + r * 3.2, p.y + 4);
        ctx.globalAlpha = 1;
      }

      // brillo del borde
      ctx.strokeStyle = "rgba(160,190,255,0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
    };

    let ultimo = 0;
    const bucle = (ms: number) => {
      if (visible && ms - ultimo > 33) {
        ultimo = ms;
        pintar(ms);
      }
      if (!quieto) marco = requestAnimationFrame(bucle);
    };
    marco = requestAnimationFrame(bucle);
    const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
    io.observe(c);
    return () => {
      cancelAnimationFrame(marco);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const s = ahora ? sol(ahora) : null;
  if (soloGlobo) return <canvas ref={lienzo} className="aspect-square w-full" role="img" aria-label="La Tierra girando, con el día y la noche de este momento" />;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative mx-auto w-full max-w-[520px]">
        <canvas ref={lienzo} className="aspect-square w-full" role="img" aria-label="La Tierra girando, con el día y la noche de este momento" />
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {CIUDADES.map((ci, i) => {
          const dia = s ? esDeDia(ci.lat, ci.lon, s) : true;
          return (
            <li key={ci.n} className={`items-center justify-between gap-2 rounded-2xl bg-white/[0.07] px-3.5 py-2.5 ring-1 ring-white/10 sm:px-4 sm:py-3 ${i === 1 || i === 4 ? "hidden sm:flex" : "flex"}`}>
              <span>
                <span className="block text-sm text-white/70">{ci.n}</span>
                <span className="font-titular text-2xl font-extrabold tabular-nums">
                  {ahora ? ahora.toLocaleTimeString("es-ES", { timeZone: ci.tz, hour: "2-digit", minute: "2-digit" }) : "--:--"}
                  <span className="text-base text-white/50">{ahora ? ":" + ahora.toLocaleTimeString("es-ES", { timeZone: ci.tz, second: "2-digit" }).padStart(2, "0") : ""}</span>
                </span>
              </span>
              <span aria-label={dia ? "De día" : "De noche"} title={dia ? "De día" : "De noche"} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${dia ? "bg-estrella text-tinta" : "bg-white/10 text-white"}`}>
                {dia ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
