import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";

export default function PaginaLegal({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: React.ReactNode }) {
  return (
    <>
      <CabeceraPagina
        titulo={titulo}
        entradilla={`Última actualización: ${actualizado}. Escrito en claro, sin letra pequeña.`}
        migas={[{ texto: "Inicio", href: "/" }, { texto: titulo }]}
        video="lapiz-medicion"
        videoAlt="Una mano mide y apunta con un lápiz"
      />
      <article className="prosa mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">{children}</article>
      <section className="mx-auto mb-20 w-full max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-niebla p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-extrabold">¿Te ha quedado alguna duda?</p>
            <p className="mt-1 text-gris">Pregúntale a nuestro asistente o escríbenos: te contestamos el mismo día.</p>
          </div>
          <Link href="/estudio-gratuito" className="shrink-0 rounded-full bg-noche px-6 py-3 font-bold text-white hover:bg-noche-2">Hablar con nosotros</Link>
        </div>
      </section>
    </>
  );
}
