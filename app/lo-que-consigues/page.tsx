import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ConsiguesCompleto, Ventana } from "@/components/Consigues";
import { PIEZAS } from "@/lib/consigues";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Un ejemplo real de lo que te llevas gratis",
  "Tu web nueva, tu guía de 29 apartados, los correos a tus clientes, tu panel y tu CRM. Mira un ejemplo real de cada cosa antes de pedirlo.",
  "/lo-que-consigues",
);

export default function LoQueConsigues() {
  const web = PIEZAS[0];
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Un ejemplo real", ruta: "/lo-que-consigues" }])} />
      <CabeceraPagina
        titulo="Un ejemplo real de todo lo que te llevas gratis."
        clave="ejemplo real"
        entradilla="Si pasas el test de idoneidad, esto es lo que recibes: gratis, sin ningún compromiso y en menos de una semana. No es una propuesta, es trabajo hecho. Y es solo el principio."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Un ejemplo real" }]}
        visual={<Ventana src={web.captura} alt="La web de ejemplo, en el ordenador y en el móvil" movil={web.movil} color={web.color} prioridad />}
        icono="regalo"
      />
      <ConsiguesCompleto />
    </>
  );
}
