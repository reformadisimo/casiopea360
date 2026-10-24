import { NextResponse } from "next/server";

// Recibe las solicitudes del estudio gratuito y las manda por correo con Resend.
// Se activa sola cuando existen estas variables en Vercel:
//   RESEND_API_KEY      clave de Resend
//   SOLICITUD_DESTINO   correo de Casiopea que recibe las solicitudes
//   SOLICITUD_REMITENTE remitente verificado en Resend, p. ej. "Casiopea 360 <hola@casiopea360.es>"
// Si faltan, responde 503 y el formulario usa WhatsApp o correo como hasta ahora.
export async function POST(req: Request) {
  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.SOLICITUD_DESTINO;
  const remitente = process.env.SOLICITUD_REMITENTE;
  if (!clave || !destino || !remitente) return NextResponse.json({ ok: false, configurado: false }, { status: 503 });

  let datos: { texto?: string; correo?: string; nombre?: string; trampa?: string; encaje?: string };
  try {
    datos = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Campo trampa para robots: si viene relleno, se da por buena sin enviar nada.
  if (datos.trampa) return NextResponse.json({ ok: true });
  const texto = String(datos.texto ?? "").slice(0, 12000);
  const correo = String(datos.correo ?? "").slice(0, 200);
  if (texto.length < 20 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return NextResponse.json({ ok: false }, { status: 400 });

  const enviar = (cuerpo: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });

  const aviso = await enviar({ from: remitente, to: [destino], reply_to: correo, subject: `[${String(datos.encaje ?? "SIN ETIQUETA").slice(0, 20)}] Test de idoneidad: ${String(datos.nombre ?? "").slice(0, 80)}`, text: texto });
  if (!aviso.ok) return NextResponse.json({ ok: false }, { status: 502 });

  // Acuse de recibo al solicitante: siempre contestamos, encaje o no.
  await enviar({
    from: remitente,
    to: [correo],
    subject: "Hemos recibido tu solicitud · Casiopea 360",
    text: `Hola${datos.nombre ? " " + String(datos.nombre).split(" ")[0] : ""}:\n\nGracias por hacer el test de idoneidad. Lo hemos recibido y te contestamos en un máximo de 48 horas laborables, encaje o no tu empresa con lo que hacemos.\n\nMientras tanto, puedes ver algunos de nuestros trabajos:\n- Reformadísimo: https://www.reformadisimo.es\n- AMS Cerramientos: https://ams-cerramientos-ejemplo.vercel.app\n- Tierno Centella: https://tierno-centella-web.vercel.app\n- Mi Estela: https://miestela.app\n\nUn saludo,\nEl equipo de Casiopea 360`,
  }).catch(() => null);

  return NextResponse.json({ ok: true });
}
