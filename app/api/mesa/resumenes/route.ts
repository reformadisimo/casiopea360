import { NextRequest, NextResponse } from "next/server";
import { llaveMesa } from "@/lib/mesaReal";

/* Resúmenes por correo de la mesa real de Casiopea: se activarán cuando esté la clave de envío de Resend. */
export async function GET(req: NextRequest) {
  if (!llaveMesa() || req.nextUrl.searchParams.get("k") !== llaveMesa()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, lista: [] });
}
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (!llaveMesa() || b?.k !== llaveMesa()) return NextResponse.json({ ok: false, error: "Sin permiso." }, { status: 401 });
  return NextResponse.json({ ok: false, error: "Los resúmenes por correo se activan cuando esté la clave de envío de correos (Resend)." });
}
