import PanelEjemplo from "@/components/PanelEjemplo";
import { meta } from "@/lib/meta";

export const metadata = {
  ...meta(
    "Control de mandos de ejemplo",
    "Así verás tu marketing con Casiopea 360: contactos y clientes en tiempo real, de dónde viene cada uno, lo que cuesta y todo lo que hacemos. Datos de ejemplo.",
    "/panel",
  ),
  robots: { index: false, follow: true },
};

export default function Panel() {
  return <PanelEjemplo />;
}
