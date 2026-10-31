/* De dónde viene un contacto, en una línea legible para los avisos internos (servidor y cliente). */

const limpio = (v: unknown, n: number) => (typeof v === "string" ? v.replace(/[\r\n\t]/g, " ").trim().slice(0, n) : "");

export function describirOrigen(d: { fuente?: unknown; campana?: unknown; aterrizaje?: unknown }): string {
  const fuente = limpio(d.fuente, 60).toLowerCase();
  const campana = limpio(d.campana, 80);
  const aterrizaje = limpio(d.aterrizaje, 150);
  let t: string;
  if (!fuente) t = "sin dato";
  else if (fuente === "directo") t = "directo o sin dato (escribió la dirección, un favorito, un buscador sin anuncio o una app que no dice de dónde viene)";
  else if (fuente === "google-ads") t = "Google Ads (anuncio)";
  else if (fuente === "meta") t = "Meta / Instagram (anuncio)";
  else if (fuente === "chatgpt") t = "ChatGPT Ads (anuncio)";
  else t = `viene de ${fuente}`;
  if (campana) t += `, campaña «${campana}»`;
  if (aterrizaje) t += `; entró por ${aterrizaje}`;
  return t;
}
