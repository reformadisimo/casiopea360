import Link from "next/link";
import { PIEZAS, PIEZAS_RESUMEN } from "@/lib/consigues";

// «Todo esto, gratis»: el regalo del estudio, a lo grande. Un abanico de capturas reales
// (la web nueva, la guía, los correos, el panel, el CRM) y una sola llamada: verlo de un vistazo.
export default function VerEjemplo({ claro = false, className = "" }: { claro?: boolean; className?: string }) {
  const abanico = PIEZAS_RESUMEN.slice(0, 5);
  return (
    <div className={`relative overflow-hidden rounded-[1.8rem] p-5 sm:p-6 ${claro ? "bg-white ring-1 ring-linea" : "bg-white/[0.08] ring-1 ring-white/20"} ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-estrella/25 blur-3xl" />
      <div className="relative grid gap-6">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-estrella px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-tinta">
            <span aria-hidden="true">★</span> Si podemos ayudarte, esto es lo que recibes
          </p>
          <p className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${claro ? "text-tinta" : "text-white"}`}>
            Tu web nueva, tu guía, tus correos, tu panel y tu CRM. <span className="text-estrella">Gratis y sin ningún compromiso.</span>
          </p>
          <ul className={`mt-3 grid gap-1.5 text-[0.95rem] ${claro ? "text-gris" : "text-white/80"}`}>
            {[
              ["Trabajo hecho,", "no una propuesta."],
              ["En tu correo", "en menos de una semana."],
              ["Ejemplo de un despacho inventado:", "el tuyo, con tu negocio."],
            ].map(([b, r]) => (
              <li key={b} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5 font-extrabold text-estrella">✓</span>
                <span><b className={claro ? "text-tinta" : "text-white"}>{b}</b> {r}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/lo-que-consigues"
            className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-estrella px-6 font-extrabold text-tinta shadow-[0_10px_30px_-10px_rgba(255,197,61,0.8)] hover:bg-estrella-2"
          >
            Ver un ejemplo real
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        {/* Abanico de capturas: cinco pantallas de verdad, una sobre otra */}
        <Link href="/lo-que-consigues" aria-label="Ver un ejemplo real" className="group relative block h-36 w-full max-w-[34rem] sm:h-40">
          {abanico.map((p, k) => (
            <span
              key={p.id}
              className="absolute left-0 top-0 block w-[42%] overflow-hidden rounded-xl bg-white shadow-[0_18px_40px_-16px_rgba(14,26,61,0.7)] ring-1 ring-black/10 transition-transform duration-300 group-hover:-translate-y-1 sm:w-44"
              style={{ left: `${k * 14.5}%`, transform: `translateY(${Math.abs(k - 2) * 8}px) rotate(${(k - 2) * 2.5}deg)`, zIndex: k, transformOrigin: "bottom center" }}
            >
              <span className="flex h-3 items-center gap-1 bg-[#eef0f4] px-1.5" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" /><span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" /><span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.captura} alt="" width={700} height={438} loading="lazy" decoding="async" className="block aspect-[16/11] w-full object-cover object-top" />
              <span className="block truncate px-2 py-1 text-center text-[0.72rem] font-extrabold text-white" style={{ background: p.color }}>{p.corto}</span>
            </span>
          ))}
        </Link>
      </div>
    </div>
  );
}
