import { FAMILIAS, TERMINOS, relacionados, terminoPorSlug } from "@/lib/terminos";
import { glifoDe } from "@/lib/terminos/pictos";

// Definición completa de un término, para mostrarla en una ventana sin salir de la página.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return TERMINOS.map((t) => ({ slug: t.slug }));
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = terminoPorSlug(slug);
  if (!t) return new Response("No existe", { status: 404 });
  return Response.json({
    slug: t.slug,
    g: glifoDe(t.slug),
    color: FAMILIAS.find((f) => f.id === t.familia)?.color ?? "#475569",
    nombre: t.nombre,
    largo: t.largo ?? null,
    corta: t.corta,
    def: t.def,
    ejemplo: t.ejemplo,
    rel: relacionados(t).map((r) => ({ slug: r.slug, nombre: r.nombre })),
  });
}
