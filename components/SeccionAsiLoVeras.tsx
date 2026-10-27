import Image from "next/image";
import Link from "next/link";
import { BOTON, ENVOLTORIO } from "@/components/secciones";

/* "Así lo verás tú": el panel de ejemplo, a la vista desde la portada. Las imágenes son capturas del propio panel de ejemplo
   (datos inventados de una empresa ficticia). Incluye lo que decimos sobre los errores: se buscan cada día y, si el cliente ve uno, avisa con un toque. */
export default function SeccionAsiLoVeras() {
  return (
    <section className="bg-niebla py-14 sm:py-20" aria-labelledby="asi-lo-veras">
      <div className={`${ENVOLTORIO} grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]`}>
        <div>
          <p className="etiqueta inline-block rounded-full px-4 py-1.5 text-sm font-bold">Tu panel</p>
          <h2 id="asi-lo-veras" className="mt-5 text-3xl font-extrabold sm:text-5xl">Así lo verás tú</h2>
          <p className="mt-5 text-lg text-gris">
            Entras, y en diez segundos sabes si todo va bien, qué mirar hoy y qué hacer. Sin números que no entiendes: cinco baterías de colores, cuatro cifras y una tarea. Funciona en el móvil, lo puedes oír en voz alta y le puedes preguntar con tus palabras.
          </p>
          <p className="mt-4 text-lg text-gris">
            <b className="text-tinta">Ninguna herramienta está libre de errores, y la nuestra tampoco.</b> La diferencia es que los buscamos cada día y, si ves uno, nos lo cuentas con un toque y lo arreglamos. Nos encanta encontrarlos: cada uno que arreglamos es un problema menos para ti.
          </p>
          <Link href="/panel" className={`${BOTON} mt-8 inline-flex`}>Abrir el panel de ejemplo</Link>
          <p className="mt-3 text-sm text-gris">Datos inventados de una empresa ficticia. No se envía nada.</p>
        </div>
        <div className="relative">
          <Image src="/panel/ejemplo-escritorio.jpg" alt="Panel de control de ejemplo en un ordenador: conclusión del día, tarea principal y cinco baterías de estado" width={1280} height={900} className="w-full rounded-2xl border border-linea shadow-xl" />
          <Image src="/panel/ejemplo-movil.jpg" alt="El mismo panel en el móvil" width={780} height={1688} className="absolute -bottom-6 right-3 hidden w-[28%] rounded-2xl border border-linea shadow-2xl sm:block" />
        </div>
      </div>
    </section>
  );
}
