import CabeceraPagina from "@/components/CabeceraPagina";
import DatosEstructurados from "@/components/DatosEstructurados";
import { ConsiguesCompleto } from "@/components/Consigues";
import { PIEZAS } from "@/lib/consigues";
import { meta } from "@/lib/meta";
import { schemaMigas } from "@/lib/schema";

export const metadata = meta(
  "Un ejemplo real de lo que te preparamos gratis",
  "Tu web nueva, tu guía de 29 apartados, los correos a tus clientes, tu panel y tu CRM. Mira un ejemplo real de cada cosa antes de pedirlo.",
  "/lo-que-consigues",
);

export default function LoQueConsigues() {
  // Mosaico de la cabecera: las piezas que NO son la web (la web ya sale grande en la pieza 1, justo debajo)
  const mosaico = PIEZAS.filter((p) => ["guia", "correos", "panel", "crm"].includes(p.id));
  return (
    <>
      <DatosEstructurados datos={schemaMigas([{ texto: "Inicio", ruta: "/" }, { texto: "Un ejemplo real", ruta: "/lo-que-consigues" }])} />
      <CabeceraPagina
        titulo="Un ejemplo real de todo lo que te preparamos gratis."
        clave="ejemplo real"
        entradilla="Haz el test: si podemos ayudarte, lo recibes gratis, sin compromiso y en menos de una semana."
        migas={[{ texto: "Inicio", href: "/" }, { texto: "Un ejemplo real" }]}
        visual={
          <ul className="grid grid-cols-2 gap-3">
            {mosaico.map((p, k) => (
              <li key={p.id} className={k % 2 ? "translate-y-4" : ""}>
                <a href={`#${p.id}`} className="block overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-20px_rgba(14,26,61,0.6)] ring-1 ring-black/10 transition-transform hover:-translate-y-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.captura} alt={`${p.titulo}: captura del ejemplo`} width={700} height={438} loading={k < 2 ? "eager" : "lazy"} decoding="async" className="block aspect-[16/11] w-full object-cover object-top" />
                  <span className="block px-3 py-2 text-center text-sm font-extrabold text-white" style={{ background: p.color }}>{p.corto}</span>
                </a>
              </li>
            ))}
          </ul>
        }
        icono="regalo"
      />
      <ConsiguesCompleto />
    </>
  );
}
