"use client";

import { useState } from "react";

// Lo que costaría contratar cada cosa por separado según el tamaño de la empresa.
// Precios orientativos del mercado español (Cronoshare, Duotach, Clientify) y, donde se dice, estimación nuestra.
type Fila = { que: string; nota?: string; valores: [number, number, number] };
const TAMANOS = ["Pyme", "Más de 1 millón de facturación", "Gran empresa"] as const;

const MES: Fila[] = [
  { que: "SEO (posicionamiento en Google)", nota: "Mercado: de 100 a 1.800 € al mes", valores: [500, 900, 1800] },
  { que: "Gestión de Google Ads", nota: "Solo la gestión. Mercado: de 350 a 1.500 € al mes, o un 10-20 % de la inversión", valores: [400, 700, 1500] },
  { que: "Gestión de anuncios en Instagram y Facebook", nota: "Normalmente otra persona u otra agencia", valores: [350, 500, 1500] },
  { que: "Redes sociales y contenido", nota: "Mercado: de 300 a 1.200 € al mes", valores: [500, 800, 1200] },
  { que: "Mantenimiento y cambios de la web", nota: "Cada cambio, presupuesto y espera", valores: [100, 150, 300] },
  { que: "Licencias de CRM para tu equipo", nota: "De 20 a 90 € por persona y mes (HubSpot, Pipedrive, Zoho)", valores: [60, 150, 900] },
];
const UNA_VEZ: Fila[] = [
  { que: "Una web a medida, con calculadoras y asistente de IA", nota: "Una corporativa sencilla cuesta de 1.200 a 6.000 €; con herramientas a medida, mucho más", valores: [6000, 12000, 25000] },
  { que: "Un CRM a medida", nota: "Mercado: de 5.000 a 35.000 €, más mantenimiento", valores: [5000, 15000, 35000] },
];

const eur = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export default function CostesPorTamano() {
  const [t, setT] = useState(1);
  const mes = MES.reduce((a, f) => a + f.valores[t], 0);
  const unaVez = UNA_VEZ.reduce((a, f) => a + f.valores[t], 0);
  return (
    <div>
      <div role="tablist" aria-label="Tamaño de tu empresa" className="flex flex-wrap gap-2">
        {TAMANOS.map((n, i) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={t === i}
            onClick={() => setT(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all sm:text-base ${t === i ? "scale-105 bg-noche text-white shadow-lg" : "bg-white text-tinta ring-1 ring-linea hover:ring-noche"}`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-linea">
        {([["Cada mes", MES, true], ["Una sola vez", UNA_VEZ, false]] as [string, Fila[], boolean][]).map(([titulo, filas, mensual]) => (
          <div key={titulo}>
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-noche px-5 py-3 text-sm font-extrabold text-white sm:px-6">
              <span>{titulo}</span>
              <span className="text-right">Por separado</span>
              <span className="w-24 text-right text-estrella sm:w-28">Con nosotros</span>
            </div>
            {filas.map((f) => (
              <div key={f.que} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-linea px-5 py-4 first:border-t-0 sm:px-6">
                <span>
                  <b className="block">{f.que}</b>
                  {f.nota && <span className="block text-sm text-gris">{f.nota}</span>}
                </span>
                <span key={`${f.que}-${t}`} className="aparece text-right font-extrabold">
                  {eur(f.valores[t])}
                  {mensual && <span className="block text-xs font-normal text-gris">al mes</span>}
                </span>
                <span className="w-24 text-right sm:w-28">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800 sm:text-sm">✓ Incluido</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] border-2 border-dashed border-rose-300 bg-white p-7">
          <p className="text-sm font-bold text-rose-700">Por separado, {TAMANOS[t].toLowerCase()}</p>
          <p key={t} className="aparece mt-2 text-5xl font-extrabold">
            {eur(mes)} <span className="text-2xl text-gris">al mes</span>
          </p>
          <p className="mt-2 text-gris">
            {eur(mes * 12)} al año, más {eur(unaVez)} de web y CRM. El primer año, unos <b className="text-tinta">{eur(Math.round((mes * 12 + unaVez) / 1000) * 1000)}</b>. Y cinco o seis proveedores que coordinar tú.
          </p>
        </div>
        <div className="rounded-[2rem] bg-noche p-7 text-white">
          <p className="text-sm font-bold text-estrella">Con Casiopea 360</p>
          <p className="mt-2 text-4xl font-extrabold">La misma cuota fija para todos.</p>
          <p className="mt-3 text-white/85">Seas pyme, mediana o gran empresa, pagas lo mismo. Aquí no nos andamos con tonterías: una cuota que lo incluye todo, con la web y el CRM ya hechos y dentro.</p>
          <ul className="mt-4 space-y-1.5 text-white/85">
            <li>¿Quieres otra web? <b className="text-white">Incluida.</b></li>
            <li>¿Cambiar de diseño el año que viene? <b className="text-white">Incluido.</b></li>
            <li>¿Otro CRM o más funciones? <b className="text-white">Incluido.</b></li>
            <li>¿Una calculadora, una landing o un informe nuevo? <b className="text-white">Incluido.</b></li>
            <li>¿Reservas con WhatsApp, una tienda online o la web en inglés? <b className="text-white">Incluido.</b></li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-xs text-gris">
        Precios orientativos en España en 2026, según guías de Cronoshare, Duotach y Clientify; en gran empresa, estimación nuestra con la parte alta de esos rangos. En tu caso puede ser algo más o algo menos. Va aparte solo lo que pagas a terceros: la inversión en anuncios, la grabación de vídeo profesional y el espacio en radio o prensa.
      </p>
    </div>
  );
}
