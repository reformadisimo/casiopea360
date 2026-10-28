import { NextResponse } from "next/server";
import { CORREO_BIENVENIDA_ASUNTO, CORREO_BIENVENIDA_HTML } from "@/lib/correoBienvenida";

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

  let datos: { texto?: string; correo?: string; nombre?: string; empresa?: string; novedades?: boolean; trampa?: string; encaje?: string };
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

  // Acuse de recibo al solicitante, con el correo de bienvenida de la serie. Siempre contestamos, encaje o no.
  const nombrePila = String(datos.nombre ?? "").trim().split(/\s+/)[0]?.slice(0, 40) || "";
  const escapar = (t: string) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
  await enviar({
    from: remitente,
    to: [correo],
    reply_to: destino,
    subject: CORREO_BIENVENIDA_ASUNTO.replace(", {{{FIRST_NAME}}}", nombrePila ? `, ${nombrePila}` : ""),
    html: CORREO_BIENVENIDA_HTML.replace("Hola, {{{FIRST_NAME}}}.", nombrePila ? `Hola, ${escapar(nombrePila)}.` : "Hola."),
  }).catch(() => null);

  // Serie de correos: solo si la persona marcó la casilla de recibir novedades.
  // Crea el contacto en Resend y lanza el evento que arranca la automatización.
  if (datos.novedades === true) {
    const api = (ruta: string, cuerpo: Record<string, unknown>) =>
      fetch(`https://api.resend.com${ruta}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      }).catch(() => null);
    await api("/contacts", { email: correo, first_name: nombrePila || undefined, unsubscribed: false, properties: { estado_casiopea: "activo" } });
    await api("/events/send", {
      event: "casiopea.test_novedades",
      email: correo,
      payload: { empresa: String(datos.empresa ?? "").slice(0, 120), encaje: String(datos.encaje ?? "").slice(0, 20) },
    });
  }

  return NextResponse.json({ ok: true });
}
