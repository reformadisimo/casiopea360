import LupaEjemplo from "@/components/LupaEjemplo";
import { meta } from "@/lib/meta";
import VolverWeb from "@/components/VolverWeb";

export const metadata = {
  ...meta(
    "Lupa 360 de ejemplo",
    "Así verías lo que hace la gente en tu web: dónde toca, dónde se para y dónde se va. Datos de ejemplo sobre nuestra propia web.",
    "/lupa-ejemplo",
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
      <VolverWeb que="Lupa 360 de ejemplo" />
      <LupaEjemplo />
    </>
  );
}
