import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ConsiguesCompleto, Ventana } from "@/components/Consigues";
import { PIEZAS } from "@/lib/consigues";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Lo que consigues con el estudio gratuito",
  "Tu web nueva, tu guía de 29 apartados, los correos a tus clientes, tu panel y tu CRM. Mira un ejemplo real de cada cosa antes de pedirlo.",
  "/lo-que-consigues",
);

export default function LoQueConsigues() {
  const web = PIEZAS[0];
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Lo que consigues", ruta: "/lo-que-consigues" }])} />
      <CabeceraPagina
        titulo="Esto es lo que consigues. Míralo antes de pedirlo."
        clave="Míralo"
        entradilla="Diez cosas, todas de verdad y todas tuyas. Las hemos hecho para un despacho inventado, Fuero Abogados, para que las toques como si fueras su cliente."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Lo que consigues" }]}
        visual={<Ventana src={web.captura} alt="La web de ejemplo, en el ordenador y en el móvil" movil={web.movil} color={web.color} prioridad />}
        icono="regalo"
      />
      <ConsiguesCompleto />
    </>
  );
}
