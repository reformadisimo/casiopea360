import Link from "next/link";
import Constelacion from "@/components/Constelacion";
import VideoFondo from "@/components/VideoFondo";
import {
  BOTON,
  BOTON_CLARO,
  BandaVideo,
  CintaHerramientas,
  ENVOLTORIO,
  SeccionEstudio,
  SeccionFrentes,
  SeccionEspecialistas,
  SeccionCRM,
  SeccionIncluidoCompacta,
  SeccionCostes,
  SeccionPromesas,
  SeccionLoFirmamos,
  SeccionVelocidad,
  SeccionPorQueBarato,
  SeccionParte,
  SeccionPreguntas,
  SeccionPuntosDolor,
  SeccionSolicitud,
  SeccionTrabajos,
} from "@/components/secciones";

export default function Inicio() {
  return (
    <>

      {/* Héroe: la constelación */}
      <section className="relative overflow-hidden bg-noche pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(80,120,255,0.35),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(60,90,255,0.3),transparent_40%),radial-gradient(1.5px_1.5px_at_10%_20%,#fff,transparent),radial-gradient(1.5px_1.5px_at_30%_70%,#cfe0ff,transparent),radial-gradient(1px_1px_at_60%_15%,#fff,transparent),radial-gradient(1.5px_1.5px_at_85%_40%,#fff,transparent),radial-gradient(1px_1px_at_70%_85%,#cfe0ff,transparent),radial-gradient(1.5px_1.5px_at_45%_45%,#fff,transparent)]">
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
              <Link prefetch={false} href="/test" className={BOTON_CLARO}>Haz el test en 1 minuto</Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-2 text-[0.8rem] font-bold sm:flex sm:flex-wrap sm:text-sm">
              {["Más de 22 años de oficio", "Tu web en días, no en meses", "La misma cuota para todos", "Sin comisiones"].map((t) => (
                <li key={t} className="flex min-h-9 items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 leading-tight text-white ring-1 ring-white/15 backdrop-blur sm:px-3.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-estrella" />
                  {t}
                </li>
              ))}
            </ul>
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
      <SeccionVelocidad />
      <SeccionPuntosDolor />
      <SeccionCostes />
      <SeccionPorQueBarato />
      <BandaVideo />
      <SeccionFrentes />
      <SeccionEspecialistas />
      <SeccionCRM />
      <SeccionIncluidoCompacta />
      <SeccionTrabajos />
      <SeccionParte />
      <SeccionPreguntas todas={false} />
      <SeccionEstudio />
      <SeccionSolicitud />
    </>
  );
}
