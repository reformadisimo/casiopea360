import Link from "next/link";
import Constelacion from "@/components/Constelacion";
import VideoFondo from "@/components/VideoFondo";
import {
  BOTON,
  BOTON_CLARO,
  BandaCompromisos,
  BandaVideo,
  CintaHerramientas,
  ENVOLTORIO,
  SeccionCaos,
  SeccionEstudio,
  SeccionFrentes,
  SeccionEspecialistas,
  SeccionCRM,
  SeccionTambienIncluido,
  SeccionCostes,
  SeccionPromesas,
  SeccionLoFirmamos,
  SeccionPorQueBarato,
  SeccionMetodo,
  SeccionOrigen,
  SeccionParte,
  SeccionPreguntas,
  SeccionPuntosDolor,
  SeccionSolicitud,
  SeccionTrabajos,
} from "@/components/secciones";
import DatosEstructurados from "@/components/DatosEstructurados";
import { schemaPreguntas } from "@/lib/schema";

export default function Inicio() {
  return (
    <>
      <DatosEstructurados datos={schemaPreguntas()} />

      {/* Héroe: la constelación */}
      <section className="relative overflow-hidden bg-noche pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <VideoFondo nombre="constelaciones" alt="" prioridad />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noche/80 via-noche/25 to-transparent" />
        <div className={`${ENVOLTORIO} relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]`}>
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-estrella ring-1 ring-white/15">Todo. Mejor. En días. Y por mucho menos.</p>
            <h1 className="text-[2.7rem] font-extrabold sm:text-7xl">Crece en digital sin lidiar con cinco agencias.</h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
              Web, Google, anuncios, redes, CRM e IA con un solo equipo y una sola cuota fija. Tu web, en unos días y no en meses. Mucho más barato que contratarlo por separado, te lo gestionamos todo y sin darte la lata.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#solicitud" className={BOTON}>Solicita tu estudio gratuito</a>
              <Link href="/test" className={BOTON_CLARO}>Haz el test en 1 minuto</Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl px-2">
            <Constelacion />
            <p className="mt-4 text-center text-[0.95rem] text-white/65">Cinco frentes, un solo equipo.</p>
          </div>
        </div>
      </section>

      <CintaHerramientas />
      <SeccionPromesas />
      <SeccionLoFirmamos />
      <SeccionCaos />
      <SeccionPuntosDolor />
      <SeccionCostes />
      <SeccionPorQueBarato />
      <BandaVideo />
      <SeccionFrentes />
      <SeccionEspecialistas />
      <SeccionCRM />
      <SeccionTambienIncluido />
      <BandaCompromisos />
      <SeccionOrigen />
      <SeccionTrabajos />
      <SeccionParte />
      <SeccionMetodo />
      <SeccionPreguntas />
      <SeccionEstudio />
      <SeccionSolicitud />
    </>
  );
}
