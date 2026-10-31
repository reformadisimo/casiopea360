import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/* Base de datos de Casiopea (Neon, conectada desde Vercel > Storage).
   Mientras no exista, todo lo que la usa se queda quieto sin dar error:
   el contador no apunta, las solicitudes siguen yendo por correo y el panel lo dice. */

const cadena = () => (process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "").trim();
export const hayBaseDeDatos = () => cadena().length > 0;

let _sql: NeonQueryFunction<false, false> | null = null;
export function sql(): NeonQueryFunction<false, false> {
  if (!_sql) _sql = neon(cadena());
  return _sql;
}

let tablasListas = false;
/** Crea las tablas la primera vez (idempotente). */
export async function asegurarTablas() {
  if (tablasListas) return;
  const q = sql();
  await q`CREATE TABLE IF NOT EXISTS vistas (id BIGSERIAL PRIMARY KEY, pagina TEXT NOT NULL, fuente TEXT, disp TEXT, entrada BOOLEAN, nuevo BOOLEAN, creado TIMESTAMPTZ NOT NULL DEFAULT now())`;
  await q`ALTER TABLE vistas ADD COLUMN IF NOT EXISTS entrada BOOLEAN`;
  await q`ALTER TABLE vistas ADD COLUMN IF NOT EXISTS nuevo BOOLEAN`;
  await q`CREATE INDEX IF NOT EXISTS vistas_por_fecha ON vistas (creado)`;
  await q`CREATE TABLE IF NOT EXISTS tiempos (id BIGSERIAL PRIMARY KEY, pagina TEXT NOT NULL, fuente TEXT, disp TEXT, segundos INT NOT NULL, rebote BOOLEAN, creado TIMESTAMPTZ NOT NULL DEFAULT now())`;
  await q`CREATE INDEX IF NOT EXISTS tiempos_por_fecha ON tiempos (creado)`;
  await q`CREATE TABLE IF NOT EXISTS solicitudes (
    id BIGSERIAL PRIMARY KEY,
    creado TIMESTAMPTZ NOT NULL DEFAULT now(),
    nombre TEXT, empresa TEXT, correo TEXT, telefono TEXT,
    encaje TEXT, novedades BOOLEAN, fuente TEXT, campana TEXT, pagina TEXT,
    texto TEXT, correo_enviado BOOLEAN
  )`;
  await q`CREATE INDEX IF NOT EXISTS solicitudes_por_fecha ON solicitudes (creado)`;
  tablasListas = true;
}

/** Fuente guardada (google-ads, meta, chatgpt, una web de procedencia, directo) a nombre legible. */
export function fuenteLegible(f: string | null | undefined): string {
  const v = (f ?? "").toLowerCase();
  if (v === "google-ads") return "Google Ads";
  if (v === "meta") return "Meta / Instagram";
  if (v === "chatgpt") return "ChatGPT Ads";
  if (!v || v === "directo") return "Directo";
  if (/google\.|^google$|bing\.|^bing$|duckduckgo|yahoo|ecosia/.test(v)) return "Google y buscadores (sin pagar)";
  if (/chatgpt\.com|openai|perplexity|gemini|claude\.ai|copilot/.test(v)) return "Asistentes de IA";
  if (/instagram|facebook|^fb$|^ig$|tiktok|linkedin|youtube|^l\.instagram/.test(v)) return "Redes sin pagar";
  if (/casiopea360/.test(v)) return "Directo";
  return "Referidos y otras webs";
}
