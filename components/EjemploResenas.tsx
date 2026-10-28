import Image from "next/image";
import { ENVOLTORIO, Loseta } from "@/components/secciones";
import { Etiqueta, Nebulosa } from "@/components/Vida";

/* Cómo quedaría pedir reseñas: la tarjeta con QR, el mensaje de WhatsApp y el bloque en la web del cliente.
   Todo de ejemplo, con una empresa ficticia ("Climatización Ejemplo"). El logo es un marcador: en producto va el logo del cliente.
   El QR del ejemplo lleva a nuestro artículo, nunca a una ficha real. */

const AZUL = "#2f6fd0";
const NARANJA = "#e08a00";

function LogoEjemplo({ claro = false }: { claro?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none"><rect width="34" height="34" rx="9" fill={AZUL} /><path d="M17 7v20M8.3 12l17.4 10M8.3 22l17.4-10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg>
      <span className={`text-[15px] font-extrabold leading-tight ${claro ? "text-white" : "text-tinta"}`}>Climatización<br />Ejemplo</span>
    </span>
  );
}

function Estrellas({ n = 5, tam = 18, color = NARANJA }: { n?: number; tam?: number; color?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width={tam} height={tam} viewBox="0 0 24 24" fill={color}><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.5 6 20.9l1.3-6.7-5-4.7 6.8-.8z" /></svg>
      ))}
    </span>
  );
}

/** 1. La tarjeta que se entrega al terminar el trabajo (o se envía como imagen por WhatsApp). */
function Tarjeta() {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-3xl bg-white p-5 shadow-xl ring-1 ring-linea" role="img" aria-label="Tarjeta de ejemplo: ¿Nos ayudas con tu opinión? Con el logo de la empresa, un código QR y tres pasos.">
      <div className="flex items-center justify-between gap-2">
        <LogoEjemplo />
        <span className="text-right text-[11px] font-bold leading-tight" style={{ color: NARANJA }}>Gracias por<br />confiar en nosotros</span>
      </div>
      <p className="mt-4 text-[26px] font-extrabold leading-[1.05] text-tinta">¿Nos ayudas con <span style={{ color: NARANJA }}>tu opinión</span>?</p>
      <p className="mt-1 text-[13px] text-gris">Solo te lleva un minuto y a nosotros nos ayuda muchísimo.</p>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-niebla p-3">
        <Image src="/ejemplos-qr.svg" alt="" width={104} height={104} className="h-[104px] w-[104px] shrink-0 rounded-lg bg-white p-1.5" unoptimized />
        <p className="text-[12.5px] leading-snug text-tinta"><b className="text-[#0f8a4b]">Con otro móvil:</b> abre la cámara y apunta a este cuadro. <b className="text-[#0f8a4b]">Desde este móvil:</b> pulsa el enlace del mensaje.</p>
      </div>
      <ol className="mt-3 divide-y divide-linea text-[13px] text-tinta">
        {["Pulsa el enlace o apunta con la cámara", "Marca las estrellas", "Escribe una frase y pulsa «Publicar»"].map((t, i) => (
          <li key={t} className="flex items-center gap-2.5 py-1.5"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-extrabold text-white" style={{ background: NARANJA }}>{i + 1}</span>{t}</li>
        ))}
      </ol>
      <div className="mt-2 flex flex-col items-center gap-0.5"><Estrellas tam={22} /><span className="text-[11.5px] text-gris">Climatización Ejemplo · Madrid</span></div>
    </div>
  );
}

/** 2. El mensaje de WhatsApp que el equipo envía (o que el cliente reenvía). */
function Whatsapp() {
  return (
    <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[2rem] bg-[#efe7dd] shadow-xl ring-1 ring-linea" role="img" aria-label="Ejemplo de mensaje de WhatsApp pidiendo una reseña, con la tarjeta y el enlace a Google.">
      <div className="flex items-center gap-2 bg-[#075e54] px-4 py-3 text-white">
        <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold">M</span>
        <span className="text-[14px] font-bold leading-tight">María (cliente)<br /><span className="text-[11px] font-normal opacity-80">en línea</span></span>
      </div>
      <div className="space-y-2 px-3 py-4" aria-hidden="true">
        <div className="ml-auto w-[62%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-1.5 shadow-sm">
          <div className="rounded-lg bg-white p-2 text-[9px] leading-tight text-tinta">
            <div className="flex items-center justify-between"><span className="font-extrabold" style={{ color: AZUL }}>Climatización Ejemplo</span><span style={{ color: NARANJA }}>Gracias</span></div>
            <p className="mt-1 text-[12px] font-extrabold leading-none">¿Nos ayudas con <span style={{ color: NARANJA }}>tu opinión</span>?</p>
            <div className="mt-1 flex items-center gap-1"><Image src="/ejemplos-qr.svg" alt="" width={38} height={38} className="h-[38px] w-[38px]" unoptimized /><span className="text-[8px]">Apunta con la cámara</span></div>
          </div>
          <p className="mt-0.5 text-right text-[10px] text-gris">20:14</p>
        </div>
        <div className="ml-auto w-[86%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-1.5 shadow-sm">
          <div className="rounded-lg bg-white/70 p-2">
            <p className="text-[12.5px] font-bold text-tinta">Dejar una reseña</p>
            <p className="text-[11px] text-gris">search.google.com</p>
          </div>
          <p className="px-1 pt-1.5 text-[13.5px] leading-snug text-tinta">
            Hola, soy Laura, de Climatización Ejemplo. Gracias por confiar en nosotros. Si estás contenta con el trabajo, me ayudaría mucho que dejaras tu opinión en Google. Solo tienes que pulsar este enlace y escribir dos líneas:
          </p>
          <p className="break-all px-1 pt-1 text-[13px] font-semibold text-[#0b7a57] underline">https://search.google.com/local/writereview?placeid=EJEMPLO</p>
          <p className="mt-0.5 text-right text-[10px] text-gris">20:16 <span style={{ color: AZUL }}>✓✓</span></p>
        </div>
      </div>
    </div>
  );
}

/** 3. El bloque que se pone en la web del cliente, con su logo y la invitación a recomendarle. */
function EnLaWeb() {
  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-linea" role="img" aria-label="Ejemplo de bloque en la web del cliente: con su logo, la nota en Google y un botón para dejar una opinión.">
      <div className="flex items-center gap-1.5 bg-niebla px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f06a6a]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f2c14e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#5cc26f]" />
        <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-1 text-[11px] text-gris">climatizacionejemplo.es</span>
      </div>
      <div className="flex items-center justify-between border-b border-linea px-4 py-3" aria-hidden="true">
        <LogoEjemplo />
        <span className="flex gap-3 text-[12px] font-semibold text-gris"><span>Servicios</span><span>Contacto</span></span>
      </div>
      <div className="px-5 py-6 text-center" aria-hidden="true">
        <Estrellas tam={26} />
        <p className="mt-1 text-[13px] font-bold text-tinta">4,7 sobre 5 · 180 opiniones en Google</p>
        <h4 className="mt-3 text-[22px] font-extrabold leading-tight text-tinta">¿Te ha gustado cómo trabajamos?</h4>
        <p className="mx-auto mt-2 max-w-xs text-[14px] text-gris">Si es así, recomiéndanos. Una opinión tuya en Google ayuda a otros vecinos a encontrarnos, y a nosotros nos hace mucha ilusión.</p>
        <span className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[15px] font-extrabold text-tinta" style={{ background: "#ffc53d" }}>Dejar mi opinión en Google</span>
        <p className="mt-2 text-[12px] text-gris">Te lleva un minuto. Solo tienes que escribir dos líneas.</p>
      </div>
    </div>
  );
}

export default function EjemploResenas() {
  const piezas: [string, string, React.ReactNode][] = [
    ["La tarjeta", "Se entrega el mismo día que termina el trabajo, o se envía como imagen. Lleva el logo de tu empresa y un QR que abre directamente la ventana de reseñas.", <Tarjeta key="t" />],
    ["El mensaje de WhatsApp", "Corto, amable y con un solo paso. Tu cliente lo recibe, lo pulsa y escribe dos líneas. También puede reenviarlo a quien quiera.", <Whatsapp key="w" />],
    ["En tu web", "Un bloque con tu logo, tu nota y una invitación a recomendarte. Quien ya te conoce lo ve y deja su opinión con un toque.", <EnLaWeb key="e" />],
  ];
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="ejemplo-resenas">
      <Nebulosa variante={2} />
      <div className={`${ENVOLTORIO} relative`}>
        <Etiqueta icono="estrella">Así quedaría</Etiqueta>
        <h2 id="ejemplo-resenas" className="mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">Pedir una reseña, bonito y fácil</h2>
        <p className="mt-4 max-w-3xl text-lg text-gris">Te lo dejamos todo preparado, con el logo de tu empresa arriba: la tarjeta, el mensaje y el bloque de tu web. Ejemplo con una empresa ficticia.</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {piezas.map(([t, d, nodo], k) => (
            <figure key={t} className="flex flex-col gap-4">
              {nodo}
              <figcaption className="mx-auto max-w-[340px] text-center">
                <Loseta icono={["regalo", "chat", "pagina"][k]} i={k + 1} className="mx-auto mb-3" />
                <b className="text-lg text-tinta">{t}</b>
                <span className="mt-1 block text-gris">{d}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
