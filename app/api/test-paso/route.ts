import { NextRequest, NextResponse } from "next/server";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";
import { ROBOT, superaLimite } from "@/lib/contador";

export const dynamic = "force-dynamic";

/* Recorrido del test — /api/test-paso (19-nov-2026). Tabla propia `test_pasos`.
   Tipos: vista (pantalla vista), respuesta (pregunta y número de opción, no el texto), campo (ok o vacio, sin el contenido),
   invalido (campo que no pasó la comprobación), envio y ampliado (ok o error), salida (pantalla en la que se fue).
   Ni IP guardada, ni cookies, ni nada de lo que escribe la persona. Sin robots. */

const TIPOS = new Set(["vista", "respuesta", "campo", "invalido", "envio", "ampliado", "salida"]);
const limpio = (v: unknown, n: number) => (typeof v === "string" ? v.replace(/[^\p{L}\p{N}/._:-]/gu, "").slice(0, n) : "");

export async function POST(req: NextRequest) {
  const nada = new NextResponse(null, { status: 204 });
  if (!hayBaseDeDatos()) return nada;
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || ROBOT.test(ua)) return nada;
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
  if (superaLimite(`tp:${ip}`, 400)) return nada;
  try {
    const b = JSON.parse((await req.text()).slice(0, 1000) || "{}");
    const tipo = limpio(b.tipo, 20);
    const sesion = limpio(b.sesion, 40);
    if (!TIPOS.has(tipo) || sesion.length < 8) return nada;
    const paso = limpio(b.paso, 30);
    const valor = limpio(b.valor, 20);
    const fuente = limpio(b.fuente, 60) || "directo";
    const disp = b.disp === "pc" ? "pc" : "movil";
    await asegurarTablas();
    await sql()`INSERT INTO test_pasos (sesion, tipo, paso, valor, fuente, disp) VALUES (${sesion}, ${tipo}, ${paso}, ${valor}, ${fuente}, ${disp})`;
  } catch (e) {
    console.error("[test-paso] no apuntado:", e);
  }
  return nada;
}
