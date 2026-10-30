// «Mira un ejemplo de lo que conseguirías»: acceso directo, en muchas páginas, a la web completa de ejemplo
// (despacho ficticio Fuero Abogados) y a su guía, su panel y su CRM.
const FUERO = "https://fuero-abogados.vercel.app";

export default function VerEjemplo({ claro = false, className = "" }: { claro?: boolean; className?: string }) {
  const sub = claro ? "text-gris" : "text-white/70";
  const enl = claro ? "text-noche-3 hover:text-noche" : "text-estrella hover:text-estrella-2";
  return (
    <div className={`max-w-xl ${className}`}>
      <a
        href={FUERO}
        target="_blank"
        rel="noopener"
        className={`group flex items-center gap-4 rounded-[1.4rem] p-3 pr-5 transition-colors ${
          claro ? "bg-white ring-1 ring-linea hover:ring-noche" : "bg-white/10 ring-1 ring-white/20 hover:bg-white/15"
        }`}
      >
        {/* Miniatura: la web de ejemplo, dibujada en pequeño */}
        <span aria-hidden="true" className="relative grid h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-[#1d4636] shadow-lg">
          <span className="absolute inset-x-0 top-0 flex h-3 items-center gap-1 bg-white px-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d4636]" />
            <span className="h-1 w-8 rounded bg-[#1d4636]/40" />
          </span>
          <span className="absolute left-2 top-5 h-1.5 w-14 rounded bg-white/90" />
          <span className="absolute left-2 top-8 h-1.5 w-10 rounded bg-white/60" />
          <span className="absolute bottom-2 left-2 h-3 w-9 rounded-full bg-[#f2c14e]" />
          <span className="absolute bottom-2 right-2 h-6 w-7 rounded bg-white/25" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block font-extrabold leading-snug ${claro ? "text-tinta" : "text-white"}`}>Mira un ejemplo de lo que conseguirías</span>
          <span className={`mt-0.5 block text-sm ${sub}`}>Una web completa, hecha por nosotros, de un despacho inventado</span>
        </span>
        <span aria-hidden="true" className={`text-xl font-bold transition-transform group-hover:translate-x-1 ${claro ? "text-noche" : "text-estrella"}`}>↗</span>
      </a>
      <p className={`mt-2 pl-3 text-sm ${sub}`}>
        Y también su{" "}
        <a href={`${FUERO}/guia-fuero`} target="_blank" rel="noopener" className={`font-bold underline underline-offset-4 ${enl}`}>guía</a>,{" "}
        <a href="/panel" target="_blank" rel="noopener" className={`font-bold underline underline-offset-4 ${enl}`}>panel de control</a> y{" "}
        <a href="/crm-ejemplo" target="_blank" rel="noopener" className={`font-bold underline underline-offset-4 ${enl}`}>CRM</a>.
      </p>
    </div>
  );
}
