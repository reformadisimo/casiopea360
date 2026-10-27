import Link from "next/link";
import Mesa from "@/components/mesa/Mesa";
import { datosDemo } from "@/lib/mesaDemo";
import { temasDemo, resumenDemo, tareasDemo, relojesDemo, baseDemo } from "@/lib/panelDemo";

/* Panel de ejemplo de Casiopea 360 (27-oct-2026): la MISMA pantalla que la mesa de control de Reformadísimo
   (components/mesa/Mesa.tsx, copiada tal cual), con datos inventados de una empresa ficticia, "Climatización Ejemplo".
   No se envía nada ni se conecta nada real. */

const diaMadrid = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());

export default function PanelCasiopea() {
  const hoy = diaMadrid();
  const d = datosDemo(hoy);
  return (
    <div className="mesa">
      <style>{`body > *:not(main):not([data-versionante]) { display: none !important; } main#contenido { padding: 0 !important; background: #fff !important; background-image: none !important; }`}</style>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-4 gap-y-2 px-4 pt-4 text-[14px] print:hidden">
        <Link href="/" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">← Casiopea 360</Link>
        <p className="min-w-0 basis-full rounded-2xl border border-line bg-[#fbf6e6] px-4 py-2 sm:flex-1 sm:basis-0">
          Panel de ejemplo con <b>datos inventados</b> de una empresa ficticia. Así verás el tuyo, con tus datos reales y desde el móvil. La primera vez te lleva la guía de la mano; en pocos días te lo sabes. Aquí no se envía nada.
        </p>
      </div>
      <Mesa datos={{ ...(d as Parameters<typeof Mesa>[0]["datos"]), hoy, clave: "demo" }} temas={temasDemo} resumenHoy={resumenDemo} tareas={tareasDemo} relojes={relojesDemo} base={baseDemo} />
    </div>
  );
}
