// Plantilla de los correos de Casiopea (4-nov-2026, mismo estilo que los correos de AMS, con la paleta de Casiopea).
// Estructura «para dummies»: asunto corto y amable, saludo en negrita, primero lo que NO tiene que preocuparle,
// una frase de ánimo, cada tarea en una caja con título numerado y 2 a 4 viñetas, una caja amarilla de aviso,
// despedida breve y firma «Un abrazo fuerte,». Como mucho 3 cajas; si hay más, a la guía.
// PROCESO: el texto se enseña antes a Ig y no se envía NADA sin su visto bueno en ese mismo mensaje.
// Tono: tuteo, cálido, sin presión, «sin coste» (no «gratis»), sin emojis ni guiones largos, sin herramientas internas.

export type CajaCorreo = { titulo: string; vinetas: string[] };
export type Correo = {
  titulo: string; // <title> del HTML
  preheader: string; // lo que se ve en la bandeja junto al asunto
  saludo: string; // «Hola, Javi.» (va en negrita)
  primero?: string; // lo que no tiene que preocuparle, lo primero de todo
  animo?: string; // una frase de ánimo con lo que ya ha hecho
  cajas: CajaCorreo[]; // como mucho 3
  aviso?: { titular: string; texto: string; enlace?: { texto: string; href: string } };
  cierre?: string; // remitir a la guía, despedida breve
  firma: string; // «El equipo de Casiopea 360» o el nombre del encargado
  pie?: string; // por qué recibe el correo
};

const C = { fondo: "#eef1f8", tarjeta: "#ffffff", tinta: "#141c33", gris: "#535c7a", azul: "#24387a", caja: "#eef1f8", linea: "#d9deeb", aviso: "#fff4cc", avisoBorde: "#ffc53d" };
const FUENTE = "font-family:Arial,Helvetica,sans-serif";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// **negrita** dentro de los textos.
const fmt = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

export function correoCliente(c: Correo): string {
  if (c.cajas.length > 3) throw new Error("Como mucho 3 tareas por correo: las demás, en la guía.");
  const p = (t: string, extra = "") => `<p style="margin:0 0 14px;${FUENTE};font-size:16px;line-height:1.55;color:${C.tinta};${extra}">${t}</p>`;
  const cajas = c.cajas
    .map(
      (k, i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background:${C.caja};border-radius:12px"><tr><td style="padding:14px 16px">
<p style="margin:0 0 6px;${FUENTE};font-size:16px;font-weight:bold;color:${C.azul}">${i + 1}. ${fmt(k.titulo)}</p>
<ul style="margin:0;padding-left:20px;${FUENTE};font-size:15px;line-height:1.5;color:${C.tinta}">${k.vinetas.map((v) => `<li style="margin:2px 0">${fmt(v)}</li>`).join("")}</ul>
</td></tr></table>`,
    )
    .join("");
  const aviso = c.aviso
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 16px;background:${C.aviso};border-left:4px solid ${C.avisoBorde};border-radius:8px"><tr><td style="padding:14px 16px">
<p style="margin:0 0 4px;${FUENTE};font-size:16px;font-weight:bold;color:${C.tinta}">${fmt(c.aviso.titular)}</p>
<p style="margin:0;${FUENTE};font-size:15px;line-height:1.5;color:${C.tinta}">${fmt(c.aviso.texto)}${c.aviso.enlace ? ` <a href="${c.aviso.enlace.href}" style="color:${C.azul};font-weight:bold">${esc(c.aviso.enlace.texto)}</a>` : ""}</p>
</td></tr></table>`
    : "";
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(c.titulo)}</title></head>
<body style="margin:0;padding:0;background-color:${C.fondo}">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${C.fondo}">${esc(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.fondo}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.tarjeta};border-radius:16px"><tr><td style="padding:26px 22px">
${p(`<b>${fmt(c.saludo)}</b>`)}
${c.primero ? p(fmt(c.primero)) : ""}
${c.animo ? p(fmt(c.animo)) : ""}
${cajas}
${aviso}
${c.cierre ? p(fmt(c.cierre)) : ""}
${p(`Un abrazo fuerte,<br><b>${esc(c.firma)}</b>`, "margin-bottom:0")}
</td></tr></table>
<p style="margin:16px 0 0;${FUENTE};font-size:12px;line-height:1.5;color:${C.gris}">Casiopea 360 · Tu marketing digital, al máximo nivel.<br><a href="https://www.casiopea360.es" style="color:${C.gris}">casiopea360.es</a> · <a href="mailto:hola@casiopea360.es" style="color:${C.gris}">hola@casiopea360.es</a> · WhatsApp 619 394 733${c.pie ? `<br>${esc(c.pie)}` : ""}</p>
</td></tr></table>
</body></html>`;
}
