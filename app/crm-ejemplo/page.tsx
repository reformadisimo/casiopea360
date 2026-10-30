import DemoCrm from "@/components/crm/DemoCrm";
import { meta } from "@/lib/meta";

export const dynamic = "force-dynamic";

export const metadata = {
  ...meta(
    "CRM de ejemplo",
    "Así sería tu CRM con Casiopea 360: cada contacto con su ficha, lo que toca hoy, el informe de la consulta, el procedimiento y de dónde viene cada cliente. Datos inventados, para que lo toques todo.",
    "/crm-ejemplo",
  ),
  robots: { index: false, follow: true },
};

export default function Pagina() {
  return (
    <>
      <style>{`body > *:not(main):not([data-versionante]) { display: none !important; } main#contenido { padding: 0 !important; background: #fff !important; background-image: none !important; }`}</style>
      <DemoCrm />
    </>
  );
}
