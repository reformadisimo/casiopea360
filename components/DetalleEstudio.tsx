"use client";
import { useRef, useState } from "react";

/* Desplegable «Todo lo que incluye tu estudio» de la tarjeta del test (landing de Google).
   Cada punto es una promesa: el estudio real tiene que entregarlo (o decir que depende del caso). */

const FUNCIONARIA = ["Tu CRM", "Tu chat con IA", "Tu panel de control", "Seguimiento de correos"];

const BLOQUES: { t: string; p: string[] }[] = [
  { t: "Dónde estás hoy", p: ["Semáforo de tu situación por áreas", "Cómo te encuentra un cliente", "Qué tienes y merece conservarse", "Tu web: velocidad en móvil, fallos y mejoras", "Cómo apareces en Google y en las IA", "Tu ficha de Google y tus reseñas", "Frenos entre la visita y la consulta", "Quién controla dominio, web y cuentas, según tus datos"] },
  { t: "Tu competencia", p: ["Competidores de tu zona", "Sus anuncios públicos en Google y redes", "Portales y redes que tienen sentido para tu negocio"] },
  { t: "Cómo podría quedar tu web", p: ["Tu web rediseñada de muestra, también en móvil", "Mapa de páginas y contenidos", "Asistente con IA de muestra", "Calculadora o configurador, según tu caso", "Imagen y logo, según tu caso", "Plan para cambiar la web cuidando lo ganado en Google"] },
  { t: "Tus anuncios y contactos", p: ["Tus anuncios actuales y borradores de los nuevos", "Gasto y coste por contacto, si aportas datos suficientes", "Propuesta de WhatsApp con respuestas automáticas", "CRM de muestra o conexión del tuyo, y panel de ejemplo", "Recorrido hasta la firma y seguimiento de correos"] },
  { t: "Tu plan", p: ["Calendario de contenidos de tres meses", "Plan de 30 días, con prioridades y costes", "Plazos orientativos para cada actuación", "Comparativa y ahorro con costes y servicios comparables"] },
  { t: "Cómo trabajaríamos", p: ["Qué recibirías cada día, semana y mes", "Cómo pedirías cambios por WhatsApp", "Accesos al contratar, siempre a tu nombre"] },
];

export default function DetalleEstudio({ alAbrir }: { alAbrir?: () => void }) {
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const volver = () => {
    setAbierto(false);
    raiz.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div ref={raiz} className="mt-3 scroll-mt-20">
      <div className="rounded-2xl bg-niebla p-3 ring-1 ring-linea">
        <p className="text-[0.95rem] font-extrabold text-tinta">También verás cómo funcionaría:</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {FUNCIONARIA.map((f) => (
            <li key={f} className="rounded-full bg-white px-2.5 py-1 text-[0.85rem] font-bold text-tinta ring-1 ring-linea">{f}</li>
          ))}
        </ul>
        <p className="mt-1.5 text-[0.85rem] text-tinta/70">Con propuestas y ejemplos de muestra.</p>
      </div>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls="detalle-estudio"
        onClick={() => { if (!abierto) alAbrir?.(); setAbierto(!abierto); }}
        className="mt-2 flex w-full items-center justify-between gap-2 rounded-2xl bg-estrella px-4 py-2.5 text-left text-[0.95rem] font-extrabold text-tinta"
      >
        <span>{abierto ? "Cerrar detalles" : "Y mucho más: ver todo lo que incluye"}</span>
        <span aria-hidden="true" className={`transition-transform ${abierto ? "rotate-180" : ""}`}>▾</span>
      </button>
      {abierto && (
        <div id="detalle-estudio" className="mt-2 rounded-2xl bg-white p-4 ring-1 ring-linea">
          <p className="text-lg font-extrabold text-tinta">Todo lo que incluye tu estudio</p>
          <p className="text-[0.9rem] text-tinta/70">Análisis, propuestas y muestras para tu negocio.</p>
          <div className="mt-3 grid gap-4">
            {BLOQUES.map((b, i) => (
              <section key={b.t}>
                <h3 className="flex items-center gap-2 text-[0.95rem] font-extrabold text-tinta">
                  <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-tinta text-xs text-white">{i + 1}</span>
                  {b.t}
                </h3>
                <ul className="mt-1 grid gap-0.5 pl-8 text-[0.9rem] leading-snug text-tinta/90">
                  {b.p.map((x) => (
                    <li key={x} className="list-disc">{x}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-4 text-[0.8rem] leading-snug text-tinta/70">El estudio no requiere accesos. Las estimaciones se identifican como tales. Webs y herramientas de muestra. La puesta en marcha forma parte del servicio contratado.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={volver} className="rounded-full bg-tinta px-4 py-2 text-[0.9rem] font-extrabold text-white">Volver al formulario</button>
            <button type="button" onClick={() => setAbierto(false)} className="rounded-full px-4 py-2 text-[0.9rem] font-extrabold text-tinta ring-1 ring-linea">Cerrar detalles</button>
          </div>
        </div>
      )}
    </div>
  );
}
