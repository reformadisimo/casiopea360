import { NextRequest, NextResponse } from "next/server";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";
import { ROBOT, superaLimite } from "@/lib/contador";

export const dynamic = "force-dynamic";

/* Pasos de la visita — /api/evento (como en Reformadísimo, 31-oct-2026). Tabla propia `pasos_visita`:
   tipo, página, fuente, dispositivo y fecha. Ni IP guardada, ni cookies, ni datos de la persona. Sin robots.
   De momento, clics en WhatsApp (contacto_wa) y en llamar (contacto_tel), una vez por visita. */

const TIPOS = new Set(["contacto_wa", "contacto_tel"]);
const limpio = (v: unknown, n: number) => (typeof v === "string" ? v.replace(/[^\p{L}\p{N}/._:-]/gu, "").slice(0, n) : "");

export async function POST(req: NextRequest) {
  const nada = new NextResponse(null, { status: 204 });
  if (!hayBaseDeDatos()) return nada;
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || ROBOT.test(ua)) return nada;
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
  if (superaLimite(`e:${ip}`, 60)) return nada;
  try {
    const b = JSON.parse((await req.text()).slice(0, 1000) || "{}");
    const tipo = limpio(b.tipo, 30);
    if (!TIPOS.has(tipo)) return nada;
    const pagina = limpio(b.pagina, 150) || "/";
    const fuente = limpio(b.fuente, 60) || "directo";
    const disp = b.disp === "pc" ? "pc" : "movil";
    await asegurarTablas();
    await sql()`INSERT INTO pasos_visita (tipo, pagina, fuente, disp) VALUES (${tipo}, ${pagina}, ${fuente}, ${disp})`;
  } catch (e) {
    console.error("[evento] no apuntado:", e);
  }
  return nada;
}
