import { NextRequest, NextResponse } from "next/server";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

/* Páginas vistas — /api/vista. Contador anónimo (components/ContadorVistas.tsx).
   Ni IP guardada, ni cookies, ni datos de la persona. Sin base de datos, no hace nada. */

const ROBOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|inspectiontool|preview|python|curl|wget|httpclient|java\/|go-http|node-fetch|axios|phantom|puppeteer|playwright|selenium|facebookexternalhit|mediapartners|adsbot|gptbot|chatgpt-user|oai-searchbot|bytespider|ahrefs|semrush|mj12|dataforseo|yandex|baidu|petal/i;

// Freno por conexión (en memoria de cada instancia): 200 por hora.
const cuenta = new Map<string, { n: number; desde: number }>();
function superaLimite(ip: string) {
  const ahora = Date.now();
  const x = cuenta.get(ip);
  if (!x || ahora - x.desde > 3600_000) { cuenta.set(ip, { n: 1, desde: ahora }); if (cuenta.size > 5000) cuenta.clear(); return false; }
  x.n += 1;
  return x.n > 200;
}

const limpio = (v: unknown, n: number) => (typeof v === "string" ? v.replace(/[^\p{L}\p{N}/._:-]/gu, "").slice(0, n) : "");

export async function POST(req: NextRequest) {
  const nada = new NextResponse(null, { status: 204 });
  if (!hayBaseDeDatos()) return nada;
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || ROBOT.test(ua)) return nada;
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
  if (superaLimite(ip)) return nada;
  try {
    const b = JSON.parse((await req.text()).slice(0, 2000) || "{}");
    const pagina = limpio(b.pagina, 150);
    if (!pagina.startsWith("/")) return nada;
    const fuente = limpio(b.fuente, 60) || "directo";
    const disp = b.disp === "pc" ? "pc" : "movil";
    await asegurarTablas();
    await sql()`INSERT INTO vistas (pagina, fuente, disp, entrada, nuevo) VALUES (${pagina}, ${fuente}, ${disp}, ${b.entrada === true}, ${b.nuevo === true})`;
  } catch (e) {
    console.error("[vista] no apuntada:", e);
  }
  return nada;
}
