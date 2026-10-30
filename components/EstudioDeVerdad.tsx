import Link from "next/link";
import { ESTUDIO_TOTAL } from "@/lib/contenido";

// «No te lo pierdas»: lo que de verdad se lleva quien encaja, encima del test.
// No son capturas sueltas: es la lista de lo que entregamos, y donde hay un ejemplo vivo en la web, se puede abrir.
const F = "https://fuero-abogados.vercel.app";
const PIEZAS: { t: string; d: string; color: string; href: string; ver: string }[] = [
  { t: "Tu guía completa", d: `${ESTUDIO_TOTAL} apartados: cómo estás, qué falla y qué haríamos`, color: "#1d4ed8", href: `${F}/guia-fuero`, ver: "Ver una guía de ejemplo" },
  { t: "Tu web, rediseñada entera", d: "Te enseñamos tu web nueva, página a página", color: "#be185d", href: F, ver: "Ver una web de ejemplo" },
  { t: "Tu panel de control", d: "Cada día ves de dónde llegan tus clientes", color: "#047857", href: "/panel", ver: "Probar un panel de ejemplo" },
  { t: "Tu CRM", d: "Tus contactos y su seguimiento, en una herramienta para ti", color: "#6d28d9", href: "/crm-ejemplo", ver: "Probar un CRM de ejemplo" },
  { t: "Tu competencia, sin secretos", d: "Quién gana en tu zona y qué anuncios pone", color: "#b45309", href: `${F}/guia-fuero#7-tus-competidores-en-madrid`, ver: "Ver un ejemplo" },
  { t: "Google y las IA", d: "Cómo te ven Google y ChatGPT, y qué falta para que te recomienden", color: "#0f766e", href: `${F}/guia-fuero#13-como-ponerte-por-delante-en-google-y-en-las-ia`, ver: "Ver un ejemplo" },
];

export default function EstudioDeVerdad() {
  return (
    <div id="estudio-de-verdad" className="mt-8 scroll-mt-28 rounded-[1.8rem] bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
      <p className="text-sm font-extrabold uppercase tracking-wider text-estrella">No te lo pierdas</p>
      <p className="mt-1 text-xl font-extrabold sm:text-2xl">Esto es lo que te preparamos si encajas.</p>
      <p className="mt-2 text-[0.95rem] text-white/80">
        Un día entero de trabajo de nuestro equipo, solo para tu empresa. <b className="text-white">Gratis, y es tuyo aunque no trabajes con nosotros.</b>
      </p>
      <ul className="mt-4 grid gap-2.5">
        {PIEZAS.map((x) => (
          <li key={x.t} className="flex gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
            <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: x.color, boxShadow: `0 0 12px ${x.color}` }} />
            <span className="min-w-0">
              <span className="block font-extrabold">{x.t}</span>
              <span className="block text-sm text-white/75">{x.d}</span>
              <Link href={x.href} target="_blank" rel="noopener" className="mt-1 inline-flex min-h-9 items-center text-sm font-bold text-estrella underline underline-offset-4 hover:text-estrella-2">
                  {x.ver} →
                </Link>
            </span>
          </li>
        ))}
      </ul>
      <Link href="/estudio-gratuito" className="mt-4 inline-flex min-h-10 items-center text-sm font-bold text-white underline decoration-estrella underline-offset-4">
        Ver los {ESTUDIO_TOTAL} apartados del estudio →
      </Link>
    </div>
  );
}
