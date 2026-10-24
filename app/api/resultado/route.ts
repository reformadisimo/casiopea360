import { NextResponse } from "next/server";

// "Mándame mi resultado": envía al visitante el resultado de su test y nos avisa a nosotros.
// Usa las mismas variables que la solicitud del estudio (RESEND_API_KEY, SOLICITUD_DESTINO, SOLICITUD_REMITENTE).
export async function POST(req: Request) {
  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.SOLICITUD_DESTINO;
  const remitente = process.env.SOLICITUD_REMITENTE;
  if (!clave || !destino || !remitente) return NextResponse.json({ ok: false, configurado: false }, { status: 503 });
  let d: { correo?: string; nombre?: string; resumen?: string; origen?: string; acepto?: boolean; trampa?: string };
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (d.trampa) return NextResponse.json({ ok: true });
  const correo = String(d.correo ?? "").trim().slice(0, 200);
  const resumen = String(d.resumen ?? "").slice(0, 8000);
  const origen = String(d.origen ?? "test").slice(0, 40);
  const nombre = String(d.nombre ?? "").slice(0, 80);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo) || resumen.length < 10 || d.acepto !== true) return NextResponse.json({ ok: false }, { status: 400 });
  const enviar = (cuerpo: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
  const r = await enviar({
    from: remitente,
    to: [correo],
    subject: `Tu resultado del ${origen} · Casiopea 360`,
    text: `Hola${nombre ? " " + nombre.split(" ")[0] : ""}:\n\nAquí tienes tu resultado del ${origen}:\n\n${resumen}\n\nSi quieres que lo veamos a fondo, pide tu estudio gratuito: lo preparamos a mano y te contestamos siempre, encajes o no.\n\nUn saludo,\nEl equipo de Casiopea 360`,
  });
  if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  await enviar({ from: remitente, to: [destino], reply_to: correo, subject: `Resultado del ${origen} enviado a ${correo}`, text: `${nombre ? nombre + "\n" : ""}${correo}\n\n${resumen}` }).catch(() => null);
  return NextResponse.json({ ok: true });
}
