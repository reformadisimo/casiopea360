import { conocimientoAsistente, instruccionesAsistente } from "@/lib/asistente";

// Asistente 24 horas de Casiopea 360, como los de Reformadísimo (Clara) y AMS.
// Variables de Vercel:
//   ANTHROPIC_API_KEY    obligatoria para que responda
//   ASISTENTE_MODELO     opcional, modelo preferido
//   RESEND_API_KEY, SOLICITUD_REMITENTE, SOLICITUD_DESTINO (o ASISTENTE_PARA): para avisar de quien pide que le contacten
// POST { mensajes: [{ role, content }] }                         -> texto en directo
// POST { accion: "contacto", nombre, contacto, consentimiento, mensajes } -> { ok }
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODELOS = [process.env.ASISTENTE_MODELO || "claude-sonnet-5-5", "claude-sonnet-4-5"];
const usos = new Map<string, number[]>();
type Mensaje = { role: "user" | "assistant"; content: string };

const limpia = (v: unknown, n: number) => String(v ?? "").replace(/[\r\t]+/g, " ").trim().slice(0, n);
function limite(clave: string, max: number, ms: number) {
  const t = Date.now();
  const lista = (usos.get(clave) ?? []).filter((x) => t - x < ms);
  if (lista.length >= max) return false;
  lista.push(t);
  usos.set(clave, lista);
  return true;
}
const json = (datos: unknown, status = 200) => Response.json(datos, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  let b: Record<string, unknown> = {};
  try {
    b = await req.json();
  } catch {
    return json({ error: "Petición no válida." }, 400);
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "x";

  if (b.accion === "contacto") {
    if (!limite("c" + ip, 4, 3600000)) return json({ ok: false, motivo: "demasiados" }, 429);
    const nombre = limpia(b.nombre, 80);
    const contacto = limpia(b.contacto, 120);
    const valido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contacto) || contacto.replace(/\D/g, "").length >= 9;
    if (!valido) return json({ ok: false, motivo: "contacto" }, 400);
    if (b.consentimiento !== true) return json({ ok: false, motivo: "consentimiento" }, 400);
    const clave = process.env.RESEND_API_KEY;
    const de = process.env.SOLICITUD_REMITENTE;
    const para = process.env.ASISTENTE_PARA || process.env.SOLICITUD_DESTINO;
    if (!clave || !de || !para) return json({ ok: false, motivo: "sin-correo" }, 503);
    const historial = (Array.isArray(b.mensajes) ? (b.mensajes as Mensaje[]) : [])
      .slice(-12)
      .map((m) => (m.role === "user" ? "Cliente: " : "Asistente: ") + limpia(m.content, 700))
      .join("\n");
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: de,
        to: [para],
        reply_to: contacto.includes("@") ? contacto : undefined,
        subject: `Te piden contacto desde el asistente: ${nombre || "sin nombre"}`,
        text: `Alguien ha pedido que le contactemos desde el asistente de la web.\n\nNombre: ${nombre || "(sin nombre)"}\nContacto: ${contacto}\n\nConversación:\n${historial}`,
      }),
    }).catch(() => null);
    return json({ ok: !!r?.ok }, r?.ok ? 200 : 502);
  }

  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "El asistente aún no está activado. Mientras tanto, pide tu estudio gratuito en /estudio-gratuito." }, 503);
  if (!limite("m" + ip, 30, 600000)) return json({ error: "Has enviado muchos mensajes seguidos. Espera unos minutos, por favor." }, 429);

  let m = (Array.isArray(b.mensajes) ? (b.mensajes as Mensaje[]) : [])
    .filter((x) => x && (x.role === "user" || x.role === "assistant") && typeof x.content === "string" && x.content.trim())
    .slice(-20)
    .map((x) => ({ role: x.role, content: x.content.slice(0, 4000) }));
  while (m.length && m[0].role === "assistant") m = m.slice(1);
  if (!m.length || m[m.length - 1].role !== "user") return json({ error: "Falta tu mensaje." }, 400);

  const hoy = new Intl.DateTimeFormat("es-ES", { dateStyle: "full", timeZone: "Europe/Madrid" }).format(new Date());
  const cod = new TextEncoder();

  const flujo = new ReadableStream({
    async start(ctrl) {
      let enviado = false;
      for (let i = 0; i < MODELOS.length; i++) {
        try {
          const r = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "x-api-key": process.env.ANTHROPIC_API_KEY as string, "anthropic-version": "2023-06-01", "content-type": "application/json" },
            body: JSON.stringify({
              model: MODELOS[i],
              max_tokens: 900,
              stream: true,
              messages: m,
              system: [
                { type: "text", text: conocimientoAsistente(), cache_control: { type: "ephemeral" } },
                { type: "text", text: instruccionesAsistente(hoy) },
              ],
            }),
          });
          if (!r.ok || !r.body) throw new Error("HTTP " + r.status);
          const lector = r.body.getReader();
          const dec = new TextDecoder();
          let resto = "";
          for (;;) {
            const { done, value } = await lector.read();
            if (done) break;
            resto += dec.decode(value, { stream: true });
            const lineas = resto.split("\n");
            resto = lineas.pop() ?? "";
            for (const l of lineas) {
              if (!l.startsWith("data:")) continue;
              try {
                const e = JSON.parse(l.slice(5));
                if (e.type === "content_block_delta" && e.delta?.type === "text_delta") {
                  enviado = true;
                  ctrl.enqueue(cod.encode(e.delta.text));
                }
              } catch {
                /* línea incompleta */
              }
            }
          }
          ctrl.close();
          return;
        } catch (e) {
          console.error("Modelo " + MODELOS[i] + " falló:", e instanceof Error ? e.message : e);
          if (enviado) break;
        }
      }
      ctrl.enqueue(cod.encode(enviado ? "\n\n(Se ha cortado la respuesta. Prueba otra vez.)" : "Ahora mismo no puedo responder. Prueba en un rato o pide tu estudio gratuito en /estudio-gratuito."));
      ctrl.close();
    },
  });
  return new Response(flujo, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } });
}
