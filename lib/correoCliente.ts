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
  cabecera?: boolean; // banda azul con el logo arriba (opcional)
  video?: { titulo: string; texto: string; imagen: string; href: string }; // imagen con botón de play que enlaza al vídeo (en un correo no se reproduce)
  muestras?: { titulo: string; texto: string; href: string; items: { imagen: string; pie: string }[] }; // tira de capturas de ejemplo
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
  const cabecera = c.cabecera
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1d2f78;border-radius:16px 16px 0 0"><tr><td align="center" style="padding:18px 22px"><a href="https://www.casiopea360.es" style="text-decoration:none"><img src="https://www.casiopea360.es/marca/icono-512.png" width="40" height="40" alt="" style="vertical-align:middle;border:0;border-radius:10px"><span style="${FUENTE};font-size:22px;font-weight:bold;color:#ffffff;vertical-align:middle;margin-left:10px">casiopea<span style="color:#ffc53d">360</span></span></a></td></tr></table>`
    : "";
  const video = c.video
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 18px"><tr><td>
<p style="margin:0 0 4px;${FUENTE};font-size:16px;font-weight:bold;color:${C.azul}">${fmt(c.video.titulo)}</p>
<p style="margin:0 0 10px;${FUENTE};font-size:15px;line-height:1.5;color:${C.tinta}">${fmt(c.video.texto)}</p>
<a href="${c.video.href}"><img src="${c.video.imagen}" width="516" alt="Pulsa para ver el vídeo" style="display:block;width:100%;max-width:516px;height:auto;border:0;border-radius:12px"></a>
</td></tr></table>`
    : "";
  const muestras = c.muestras
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 18px"><tr><td>
<p style="margin:0 0 4px;${FUENTE};font-size:16px;font-weight:bold;color:${C.azul}">${fmt(c.muestras.titulo)}</p>
<p style="margin:0 0 10px;${FUENTE};font-size:15px;line-height:1.5;color:${C.tinta}">${fmt(c.muestras.texto)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${c.muestras.items
        .map(
          (m) => `<td width="33%" valign="top" style="padding:0 4px"><a href="${c.muestras!.href}" style="text-decoration:none"><img src="${m.imagen}" width="160" alt="${esc(m.pie)}" style="display:block;width:100%;height:auto;border:1px solid ${C.linea};border-radius:8px"><span style="display:block;margin-top:5px;${FUENTE};font-size:13px;color:${C.gris};text-align:center">${esc(m.pie)}</span></a></td>`,
        )
        .join("")}</tr></table>
</td></tr></table>`
    : "";
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(c.titulo)}</title></head>
<body style="margin:0;padding:0;background-color:${C.fondo}">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${C.fondo}">${esc(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.fondo}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px"><tr><td>${cabecera}</td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.tarjeta};border-radius:${c.cabecera ? "0 0 16px 16px" : "16px"}"><tr><td style="padding:26px 22px">
${p(`<b>${fmt(c.saludo)}</b>`)}
${c.primero ? p(fmt(c.primero)) : ""}
${c.animo ? p(fmt(c.animo)) : ""}
${cajas}
${video}
${muestras}
${aviso}
${c.cierre ? p(fmt(c.cierre)) : ""}
${p(`Un abrazo fuerte,<br><b>${esc(c.firma)}</b>`, "margin-bottom:0")}
</td></tr></table>
<p style="margin:16px 0 0;${FUENTE};font-size:12px;line-height:1.5;color:${C.gris}">Casiopea 360 · Tu marketing digital, al máximo nivel.<br><a href="https://www.casiopea360.es" style="color:${C.gris}">casiopea360.es</a> · <a href="mailto:hola@casiopea360.es" style="color:${C.gris}">hola@casiopea360.es</a> · WhatsApp 619 394 733${c.pie ? `<br>${esc(c.pie)}` : ""}</p>
</td></tr></table>
</body></html>`;
}
