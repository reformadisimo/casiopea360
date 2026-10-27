import AvisosEjemplo from "@/components/AvisosEjemplo";
import { meta } from "@/lib/meta";

export const metadata = {
  ...meta(
    "Avisos y recordatorios de ejemplo",
    "Así le llegarían los avisos a tu cliente, por WhatsApp o por SMS. Datos de ejemplo, inventados. No se envía nada.",
    "/avisos-ejemplo",
  ),
  robots: { index: false, follow: true },
};

export default function Pagina() {
  return (
    <>
      {/* A pantalla completa, como una herramienta: fuera cabecera, pie, cookies y asistente. Se deja la pildora de versión. */}
      <style>{`
        body > *:not(main):not([data-versionante]) { display: none !important; }
        main#contenido { padding: 0 !important; background: #faf7f1 !important; background-image: none !important; }
      `}</style>
      <AvisosEjemplo />
    </>
  );
}
