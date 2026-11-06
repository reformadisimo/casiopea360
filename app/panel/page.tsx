import { meta } from "@/lib/meta";
import { SITIO } from "@/lib/navegacion";
import PanelCasiopea from "@/components/mesa/PanelCasiopea";

export const dynamic = "force-dynamic";

export const metadata = {
  ...meta(
    "Así lo verás tú",
    "Un panel de control de ejemplo, con datos inventados de una empresa ficticia: qué va bien, qué mirar hoy y qué hacer, en lenguaje llano y desde el móvil.",
    "/panel",
  ),
  // Ejemplo declarado, con datos inventados: indexable el día del lanzamiento (el resto de ejemplos siguen en noindex).
  robots: { index: SITIO.indexable, follow: true },
};

export default function Panel() {
  return <PanelCasiopea />;
}
