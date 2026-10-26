import CrmEjemplo from "@/components/CrmEjemplo";
import { meta } from "@/lib/meta";

export const metadata = {
  ...meta(
    "CRM de ejemplo",
    "Así sería tu CRM con Casiopea 360: cada contacto con su ficha, lo que toca hoy y de dónde viene. Datos de ejemplo, para que lo toques todo.",
    "/crm-ejemplo",
  ),
  robots: { index: false, follow: true },
};

export default function Pagina() {
  return <CrmEjemplo />;
}
