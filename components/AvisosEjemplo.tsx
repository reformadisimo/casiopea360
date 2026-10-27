"use client";

// Demostración de Avisos y recordatorios. TODO ES INVENTADO y se dice. No se envía nada de verdad.
// Un móvil dibujado con los avisos como llegarían por WhatsApp o por SMS, y al lado cuándo sale cada uno y por qué.
import Link from "next/link";
import { useState } from "react";

const C = { tinta: "#141c33", noche: "#0e1a3d", enlace: "#24387a", crema: "#faf7f1", linea: "#e4ddd0", suave: "#535c7a", verde: "#0f766e", ambar: "#92400e" };

type Canal = "wa" | "sms";
type Quien = "cliente" | "dueno";
type AvisoId = "confirmacion" | "recordatorio" | "dueno" | "resena";

type Msg = { aviso: AvisoId; dia: string; hora: string; texto: string; enlace?: string; boton?: string };

const NEGOCIO = "Clínica Ejemplo";

const MENSAJES: Record<Quien, Msg[]> = {
  cliente: [
    { aviso: "confirmacion", dia: "Lunes", hora: "10:02", texto: `${NEGOCIO}: hemos recibido tu petición de cita. Te llamamos hoy antes de las 14:00. Si prefieres que te escribamos, contesta a este mensaje.` },
    { aviso: "recordatorio", dia: "Martes", hora: "18:00", texto: `${NEGOCIO}: mañana miércoles tienes cita a las 17:30. ¿Vienes?`, enlace: "ejemplo.es/c/8f3k", boton: "Confirmar o pedir otra hora" },
    { aviso: "recordatorio", dia: "Miércoles", hora: "15:30", texto: `${NEGOCIO}: te esperamos hoy a las 17:30. Si no puedes venir, avísanos aquí.`, enlace: "ejemplo.es/c/8f3k", boton: "Pedir otra hora" },
    { aviso: "resena", dia: "Sábado", hora: "11:00", texto: `Gracias por venir a ${NEGOCIO}. Si te ha ido bien, ¿nos dejas tu opinión en Google? Te lleva un minuto.`, enlace: "ejemplo.es/o/2m9x", boton: "Dejar mi opinión" },
  ],
  dueno: [
    { aviso: "dueno", dia: "Lunes", hora: "10:02", texto: "Contacto nuevo: Laura M. ha pedido cita para el miércoles a las 17:30. Teléfono 600 00 00 00. Llámala hoy." },
    { aviso: "dueno", dia: "Lunes", hora: "12:40", texto: "Contacto nuevo: Pedro R. ha dejado su teléfono desde la página de revisiones. Teléfono 600 00 00 01." },
  ],
};

const AVISOS: { id: AvisoId; titulo: string; quien: Quien; cuando: string; porque: string }[] = [
  { id: "recordatorio", titulo: "Recordatorio de cita", quien: "cliente", cuando: "El día antes y un par de horas antes de la cita, entre las 9:00 y las 21:00.", porque: "Es lo que más valor da: menos plantones y menos llamadas para confirmar. Lleva un enlace para confirmar o pedir otra hora." },
  { id: "confirmacion", titulo: "Confirmación al momento", quien: "cliente", cuando: "En segundos, cuando alguien pide cita o deja su teléfono en un formulario.", porque: "Así sabe que le hemos recibido aunque no mire el correo. Solo si ha dejado su teléfono para eso." },
  { id: "dueno", titulo: "Aviso al dueño", quien: "dueno", cuando: "Cuando entra un contacto nuevo o una cita. Llega a tu móvil, no al del cliente.", porque: "Para que la respuesta de una persona también llegue pronto: cuanto antes se llama, más se convierte." },
  { id: "resena", titulo: "Petición de reseña", quien: "cliente", cuando: "Unos días después de terminar el trabajo, solo a clientes con los que se ha trabajado.", porque: "Más reseñas sin esfuerzo, y ayuda a que las inteligencias artificiales te recomienden." },
];

function Burbuja({ m, canal, resaltado }: { m: Msg; canal: Canal; resaltado: boolean }) {
  const wa = canal === "wa";
  return (
    <div
      className="max-w-[86%] rounded-2xl px-3 py-2 text-[13.5px] leading-snug"
      style={{
        background: wa ? "#ffffff" : "#e9e9ee",
        color: "#111827",
        borderTopLeftRadius: 6,
        outline: resaltado ? `2px solid ${C.verde}` : "2px solid transparent",
        outlineOffset: 2,
        boxShadow: wa ? "0 1px 1px rgba(0,0,0,.12)" : "none",
        transition: "outline-color .25s",
      }}
    >
      <p>{m.texto}</p>
      {m.enlace && !wa && <p className="mt-1 break-all underline" style={{ color: "#1d4ed8" }}>{m.enlace}</p>}
      {m.boton && wa && (
        <p className="mt-2 rounded-lg border px-3 py-1.5 text-center text-[13px] font-bold" style={{ borderColor: "#cbd5e1", color: C.verde }}>
          {m.boton}
        </p>
      )}
      {wa && <p className="mt-1 text-right text-[11px]" style={{ color: "#6b7280" }}>{m.hora}</p>}
      {!wa && <p className="mt-1 text-[11px]" style={{ color: "#6b7280" }}>{m.hora}</p>}
    </div>
  );
}

export default function AvisosEjemplo() {
  const [canal, setCanal] = useState<Canal>("wa");
  const [quien, setQuien] = useState<Quien>("cliente");
  const [sel, setSel] = useState<AvisoId>("recordatorio");
  const mensajes = MENSAJES[quien];
  const wa = canal === "wa";
  const remitente = wa ? NEGOCIO : "CLINICAEJ";
  const elegir = (id: AvisoId) => {
    setSel(id);
    const a = AVISOS.find((x) => x.id === id);
    if (a) setQuien(a.quien);
  };

  let diaAnterior = "";
  return (
    <div style={{ background: C.crema, color: C.tinta, minHeight: "100vh" }}>
      <style>{`
        @keyframes avFade{from{opacity:0}to{opacity:1}}
        .av-fade{animation:avFade .35s ease-out both}
        @media (prefers-reduced-motion: reduce){.av-fade{animation:none}}
      `}</style>

      <header className="border-b px-4 py-4 sm:px-8" style={{ borderColor: C.linea, background: "#fff" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[.12em]" style={{ color: C.suave }}>Avisos y recordatorios · ejemplo</p>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Así le llegarían los avisos a tu cliente</h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/servicios/avisos-recordatorios" className="underline underline-offset-4" style={{ color: C.enlace }}>Cómo funciona</Link>
            <Link href="/estudio-gratuito" className="rounded-full px-4 py-2" style={{ background: "#ffc53d", color: C.noche }}>Pide tu estudio gratuito</Link>
          </div>
        </div>
        <p className="mx-auto mt-2 max-w-6xl text-[13px] font-semibold" style={{ color: C.ambar }}>
          Datos de demostración: el negocio, la persona y los teléfonos son inventados. No se envía ningún mensaje de verdad.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* Móvil dibujado */}
        <section aria-label="Móvil de ejemplo" className="mx-auto w-full max-w-[360px]">
          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Canal">
            {([["wa", "WhatsApp"], ["sms", "Ver como SMS"]] as [Canal, string][]).map(([v, t]) => (
              <button key={v} type="button" onClick={() => setCanal(v)} aria-pressed={canal === v} className="h-10 rounded-full px-4 text-sm font-bold" style={{ background: canal === v ? C.noche : "#fff", color: canal === v ? "#fff" : C.tinta, border: `1px solid ${canal === v ? C.noche : C.linea}` }}>
                {t}
              </button>
            ))}
          </div>
          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Quién lo recibe">
            {([["cliente", "Móvil de tu cliente"], ["dueno", "Tu móvil"]] as [Quien, string][]).map(([v, t]) => (
              <button key={v} type="button" onClick={() => { setQuien(v); setSel(v === "dueno" ? "dueno" : "recordatorio"); }} aria-pressed={quien === v} className="h-10 rounded-full px-4 text-sm font-bold" style={{ background: quien === v ? C.verde : "#fff", color: quien === v ? "#fff" : C.tinta, border: `1px solid ${quien === v ? C.verde : C.linea}` }}>
                {t}
              </button>
            ))}
          </div>

          <div className="rounded-[38px] border-[10px] p-0 shadow-xl" style={{ borderColor: "#1f2937", background: "#1f2937" }}>
            <div className="overflow-hidden rounded-[28px]" style={{ background: wa ? "#efeae2" : "#ffffff" }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: wa ? C.verde : "#f3f4f6", color: wa ? "#fff" : "#111827" }}>
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold" style={{ background: wa ? "rgba(255,255,255,.2)" : "#d1d5db" }}>CE</span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-bold">{remitente}</p>
                  <p className="text-[11.5px] opacity-80">{wa ? "Cuenta de empresa" : "Mensaje de texto (SMS)"}</p>
                </div>
              </div>
              <div key={`${canal}-${quien}`} className="av-fade flex min-h-[430px] flex-col gap-2 px-3 py-4">
                {mensajes.map((m, i) => {
                  const nuevoDia = m.dia !== diaAnterior;
                  diaAnterior = m.dia;
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      {nuevoDia && <p className="mx-auto rounded-full px-3 py-0.5 text-[11px] font-bold" style={{ background: wa ? "#e1dccf" : "#f3f4f6", color: "#4b5563" }}>{m.dia}</p>}
                      <Burbuja m={m} canal={canal} resaltado={m.aviso === sel} />
                    </div>
                  );
                })}
                {!wa && quien === "cliente" && (
                  <p className="mt-2 text-center text-[11.5px]" style={{ color: "#6b7280" }}>Este remitente no admite respuestas. Por eso cada SMS lleva su enlace o el WhatsApp del negocio.</p>
                )}
                {wa && quien === "cliente" && (
                  <p className="mt-2 text-center text-[11.5px]" style={{ color: "#6b7280" }}>La persona puede contestar y la conversación sigue en el WhatsApp del negocio.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cuándo sale cada uno */}
        <section aria-label="Cuándo sale cada aviso" className="min-w-0">
          <h2 className="text-xl font-extrabold">Cuándo sale cada aviso y por qué</h2>
          <p className="mt-1 text-[15px]" style={{ color: C.suave }}>Pulsa uno y mira cuál es en el móvil. Salen solos: tú no tienes que enviar nada.</p>
          <ol className="mt-4 space-y-3">
            {AVISOS.map((a, i) => (
              <li key={a.id}>
                <button type="button" onClick={() => elegir(a.id)} aria-pressed={sel === a.id} className="w-full rounded-2xl border bg-white p-4 text-left" style={{ borderColor: sel === a.id ? C.verde : C.linea, boxShadow: sel === a.id ? `0 0 0 2px ${C.verde}` : "none" }}>
                  <p className="text-[12px] font-bold uppercase tracking-wide" style={{ color: C.verde }}>Aviso {i + 1}</p>
                  <p className="text-[17px] font-extrabold">{a.titulo}</p>
                  <p className="mt-1 text-[14.5px]"><b>Cuándo sale:</b> {a.cuando}</p>
                  <p className="mt-1 text-[14.5px]" style={{ color: C.suave }}>{a.porque}</p>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 ring-1" style={{ ["--tw-ring-color" as string]: C.linea }}>
              <p className="text-[12px] font-bold uppercase tracking-wide" style={{ color: C.suave }}>Cuánto cuesta</p>
              <p className="mt-1 text-[14.5px]"><b>Incluido en tu cuota.</b> Solo pagas los mensajes que se envían, directamente a WhatsApp o a tu proveedor de SMS, sin comisión nuestra. Orientativo: un SMS en España ronda los 0,09 dólares, y un recordatorio doble por cita sale por menos de 20 céntimos. El precio lo marca el proveedor.</p>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1" style={{ ["--tw-ring-color" as string]: C.linea }}>
              <p className="text-[12px] font-bold uppercase tracking-wide" style={{ color: C.suave }}>Con permiso y con cabeza</p>
              <p className="mt-1 text-[14.5px]">Solo a quien ha pedido la cita o ha dejado su teléfono, y la reseña solo a clientes con los que se ha trabajado. Cada mensaje dice de quién viene. Nunca de noche. Sin publicidad.</p>
            </div>
          </div>
          <p className="mt-5 text-[14px]" style={{ color: C.suave }}>
            Te lo recomendamos según tu negocio: encaja sobre todo donde hay citas o visitas.{" "}
            <Link href="/servicios/avisos-recordatorios" className="font-bold underline underline-offset-4" style={{ color: C.enlace }}>Ver el servicio completo</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
