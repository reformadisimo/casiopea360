import { NextRequest, NextResponse } from "next/server";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";
import { ROBOT, superaLimite } from "@/lib/contador";

export const dynamic = "force-dynamic";

/* Lupa propia — /api/lupa (19-nov-2026). Recibe, de components/ContadorVistas.tsx, los clics de una visita
   (posición a lo ancho en milésimas, píxeles desde arriba y si fue en algo que se pulsa) y hasta dónde bajó la persona.
   NO guarda IP, ni cookies, ni textos, ni lo que se escribe: solo posiciones. Sin robots. Se borra lo de más de 90 días. */

const INTERNAS = /^\/(panel|panel-antiguo|mesa|crm|crm-ejemplo|lupa-ejemplo|avisos-ejemplo|api)/;
const limpio = (v: unknown, n: number) => (typeof v === "string" ? v.replace(/[^\p{L}\p{N}/._:-]/gu, "").slice(0, n) : "");
const entero = (v: unknown, min: number, max: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
};

export async function POST(req: NextRequest) {
  const nada = new NextResponse(null, { status: 204 });
  if (!hayBaseDeDatos()) return nada;
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || ROBOT.test(ua)) return nada;
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
  if (superaLimite(`l:${ip}`, 300)) return nada;
  try {
    const b = JSON.parse((await req.text()).slice(0, 4000) || "{}");
    const pagina = limpio(b.pagina, 150);
    if (!pagina.startsWith("/") || INTERNAS.test(pagina)) return nada;
    const disp = b.disp === "pc" ? "pc" : "movil";
    const h = entero(b.h, 300, 60000);
    const xs: number[] = [], ys: number[] = [], as: boolean[] = [];
    if (Array.isArray(b.clics)) {
      for (const c of b.clics.slice(0, 40)) {
        if (!Array.isArray(c)) continue;
        const x = entero(c[0], 0, 1000), y = entero(c[1], 0, 60000);
        if (x === null || y === null) continue;
        xs.push(x); ys.push(y); as.push(c[2] === 1);
      }
    }
    const prof = b.prof === undefined ? null : entero(b.prof, 0, 100);
    if (!xs.length && prof === null) return nada;
    await asegurarTablas();
    const q = sql();
    if (xs.length) {
      await q`INSERT INTO lupa_clics (pagina, disp, x, y, h, activo)
        SELECT ${pagina}, ${disp}, u.x, u.y, ${h}, u.a FROM unnest(${xs}::int[], ${ys}::int[], ${as}::boolean[]) AS u(x, y, a)`;
    }
    if (prof !== null) await q`INSERT INTO lupa_scroll (pagina, disp, prof) VALUES (${pagina}, ${disp}, ${prof})`;
    if (Math.random() < 0.02) {
      await q`DELETE FROM lupa_clics WHERE creado < now() - interval '90 days'`;
      await q`DELETE FROM lupa_scroll WHERE creado < now() - interval '90 days'`;
    }
  } catch (e) {
    console.error("[lupa] no apuntado:", e);
  }
  return nada;
}
