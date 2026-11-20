/* Gasto de Meta (Instagram y Facebook) para la mesa de Casiopea, leído DIRECTO de la API de Meta,
   sin Supermetrics (sin límite de cuentas ni coste). Apagado mientras no existan las dos variables
   de Vercel: META_ADS_TOKEN (token de usuario del sistema, solo lectura de anuncios) y META_ADS_CUENTA
   (por ejemplo act_4756427021304011). Si falla o falta algo, devuelve vacío: la mesa no se rompe.
   Filas con la misma forma que la mesa: [día, plataforma, campaña, coste, clics, impresiones, contactos]. */

export type FilaAdsMeta = [string, string, string, number, number, number, number];

const VERSION = "v21.0";

export async function anunciosMeta(dias = 90): Promise<{ actualizado: string; filas: FilaAdsMeta[] }> {
  const token = (process.env.META_ADS_TOKEN ?? "").trim();
  const cuenta = (process.env.META_ADS_CUENTA ?? "").trim();
  if (!token || !/^act_\d+$/.test(cuenta)) return { actualizado: "", filas: [] };
  const hoy = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
  const d = new Date(`${hoy}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - dias);
  const desde = d.toISOString().slice(0, 10);
  const filas: FilaAdsMeta[] = [];
  try {
    let url: string | null = `https://graph.facebook.com/${VERSION}/${cuenta}/insights?` + new URLSearchParams({
      level: "campaign", time_increment: "1", limit: "500",
      time_range: JSON.stringify({ since: desde, until: hoy }),
      fields: "date_start,campaign_name,spend,inline_link_clicks,impressions,actions",
      access_token: token,
    }).toString();
    for (let i = 0; url && i < 10; i++) {
      const r: Response = await fetch(url, { next: { revalidate: 1800 } });
      if (!r.ok) return { actualizado: "", filas: [] };
      const j = (await r.json()) as { data?: Record<string, unknown>[]; paging?: { next?: string } };
      for (const x of j.data ?? []) {
        const acciones = (x.actions as { action_type: string; value: string }[] | undefined) ?? [];
        const contactos = acciones.filter((a) => /^lead$|onsite_conversion\.lead_grouped|offsite_conversion\.fb_pixel_lead/.test(a.action_type)).reduce((s, a) => s + Number(a.value || 0), 0);
        filas.push([String(x.date_start), "meta", String(x.campaign_name ?? "Sin nombre"), Math.round(Number(x.spend ?? 0) * 100) / 100, Number(x.inline_link_clicks ?? 0), Number(x.impressions ?? 0), contactos]);
      }
      url = j.paging?.next ?? null;
    }
  } catch {
    return { actualizado: "", filas: [] };
  }
  filas.sort((a, b) => a[0].localeCompare(b[0]));
  return { actualizado: hoy, filas };
}
