import LupaEjemplo from "@/components/LupaEjemplo";
import { meta } from "@/lib/meta";

export const metadata = {
  ...meta(
    "Lupa 360 de ejemplo",
    "Así verías lo que hace la gente en tu web: dónde toca, dónde se para y dónde se va. Datos de ejemplo sobre nuestra propia web.",
    "/lupa-ejemplo",
  ),
  robots: { index: false, follow: true },
};

export default function Pagina() {
  return <LupaEjemplo />;
}
