import { resumenWeb } from "@/lib/resumen";

// Resumen de la web para asistentes de IA (formato llms.txt).
export const dynamic = "force-static";

export function GET() {
  return new Response(resumenWeb(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
