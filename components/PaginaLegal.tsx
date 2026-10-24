import CabeceraPagina from "@/components/CabeceraPagina";

export default function PaginaLegal({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: React.ReactNode }) {
  return (
    <>
      <CabeceraPagina titulo={titulo} entradilla={`Última actualización: ${actualizado}.`} migas={[{ texto: "Inicio", href: "/" }, { texto: titulo }]} />
      <article className="prosa mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">{children}</article>
    </>
  );
}
