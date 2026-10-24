"use client";

import { useState } from "react";
import { CONTACTO } from "@/lib/contenido";

// Test de idoneidad para el estudio gratuito: datos de la empresa y preguntas para saber si va en serio.
// Mientras no haya canal de contacto configurado, avisa en vez de fingir que envía.
const FACTURACION = ["Menos de 1 millón", "De 1 a 4 millones", "De 4 a 10 millones", "Más de 10 millones"];
const EMPLEADOS = ["Menos de 10", "De 10 a 50", "De 50 a 250", "Más de 250"];
const INVERSION = ["Nada", "Menos de 1.000 € al mes", "De 1.000 a 5.000 € al mes", "Más de 5.000 € al mes"];
const HOY = ["Una agencia", "Varios proveedores", "Alguien de la casa", "Nadie, por ahora"];
const MARKETING = ["Menos de 500 € al mes", "De 500 a 1.500 € al mes", "De 1.500 a 3.000 € al mes", "Más de 3.000 € al mes", "No lo sé"];
const CAMBIAR = ["Lo antes posible", "En los próximos tres meses", "Más adelante", "No tengo prisa, solo estoy mirando"];
const CONVENCE = ["Empezaríamos en cuanto podáis", "Lo hablaría con mi socio o la dirección", "Lo compararía con otras propuestas", "Solo quiero ver ideas"];
const REUNION = ["Sí, esta misma semana", "Sí, en las próximas semanas", "Prefiero que me lo enviéis por correo"];
const DECIDE = ["Yo", "Lo decido con mi socio o la dirección", "Lo propongo y decide otra persona"];
const URGE = ["Más clientes", "Una web nueva", "Dejar de coordinar proveedores", "Medir lo que funciona", "Pagar menos por lo mismo"];

// Etiqueta interna para priorizar (solo la ve Casiopea en el correo).
function encaje(d: FormData) {
  const v = (k: string) => String(d.get(k));
  const cambiar = CAMBIAR.indexOf(v("cambiar"));
  if (cambiar === 3 || v("convence") === CONVENCE[3]) return "SOLO CURIOSEA";
  let p = [3, 2, 0][cambiar] ?? 0;
  p += [3, 2, 0][CONVENCE.indexOf(v("convence"))] ?? 0;
  p += [2, 1, 0][REUNION.indexOf(v("reunion"))] ?? 0;
  p += [2, 1, 0][DECIDE.indexOf(v("decide"))] ?? 0;
  p += [0, 1, 2, 2, 0][MARKETING.indexOf(v("marketing"))] ?? 0;
  if (v("inversion") !== INVERSION[0]) p += 1;
  if (v("facturacion") !== FACTURACION[0]) p += 1;
  return p >= 10 ? "ENCAJE ALTO" : p >= 6 ? "ENCAJE MEDIO" : "ENCAJE BAJO";
}

export default function Diagnostico() {
  const [estado, setEstado] = useState<"" | "sin-canal" | "enviando" | "enviado">("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const etiqueta = encaje(d);
    const texto =
      `Hola, quiero solicitar el estudio gratuito.\n` +
      `Nombre y cargo: ${d.get("nombre")}\n` +
      `Empresa: ${d.get("empresa")}\n` +
      `Web: ${d.get("web")}\n` +
      `Dónde están: ${d.get("ciudad")}\n` +
      `A qué se dedica: ${d.get("sector")}\n` +
      `Facturación aproximada: ${d.get("facturacion")}\n` +
      `Empleados: ${d.get("empleados")}\n` +
      `Cómo llevan hoy el marketing: ${d.get("hoy")}\n` +
      `Inversión en anuncios: ${d.get("inversion")}\n` +
      `Inversión en marketing sin anuncios: ${d.get("marketing")}\n` +
      `Cuándo quiere cambiar: ${d.get("cambiar")}\n` +
      `Si el estudio le convence: ${d.get("convence")}\n` +
      `Reunión de 30 minutos: ${d.get("reunion")}\n` +
      `Quién decide: ${d.get("decide")}\n` +
      `Lo que más le urge: ${d.get("urge")}\n` +
      `Algo más: ${d.get("mas") || "-"}\n` +
      `Teléfono: ${d.get("telefono")}\n` +
      `Correo: ${d.get("correo")}`;
    // Si ha hecho el test completo en esta visita, sus respuestas viajan con la solicitud.
    let test = "";
    try {
      test = sessionStorage.getItem("casiopea-test") ?? "";
    } catch {}
    const completo = test ? `${texto}\n\n--- Resultado de su test completo ---\n${test}` : texto;
    setEstado("enviando");
    try {
      const r = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: `[${etiqueta}]\n\n${completo}`, encaje: etiqueta, correo: d.get("correo"), nombre: d.get("nombre"), trampa: d.get("sitio_web") }),
      });
      if (r.ok) {
        setEstado("enviado");
        return;
      }
    } catch {}
    setEstado("");
    if (CONTACTO.whatsapp) {
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
      return;
    }
    if (CONTACTO.correo) {
      window.location.href = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent("Solicitud de estudio gratuito")}&body=${encodeURIComponent(texto)}`;
      return;
    }
    setEstado("sin-canal");
  }

  const campo =
    "mt-1.5 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-estrella focus:outline-none";
  const etiqueta = "block text-sm font-bold text-white";

  const desplegable = (name: string, texto: string, opciones: string[]) => (
    <label className={etiqueta}>
      {texto}
      <select name={name} required defaultValue="" className={`${campo} [&>option]:text-tinta`}>
        <option value="" disabled>
          Elige una opción
        </option>
        {opciones.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );

  return (
    <form onSubmit={enviar} className="grid content-start gap-4 sm:grid-cols-2">
      <label className={etiqueta}>
        Tu nombre y cargo
        <input name="nombre" required autoComplete="name" placeholder="Ej.: Ana López, directora general" className={campo} />
      </label>
      <label className={etiqueta}>
        Empresa
        <input name="empresa" required autoComplete="organization" className={campo} />
      </label>
      <label className={etiqueta}>
        Vuestra web
        <input name="web" placeholder="Si no tenéis, déjalo en blanco" className={campo} />
      </label>
      <label className={etiqueta}>
        Dónde estáis
        <input name="ciudad" required placeholder="Ciudad o provincia" className={campo} />
      </label>
      <label className={etiqueta}>
        A qué os dedicáis
        <input name="sector" required placeholder="Ej.: carpintería de aluminio" className={campo} />
      </label>
      {desplegable("facturacion", "Facturación aproximada al año", FACTURACION)}
      {desplegable("empleados", "Empleados", EMPLEADOS)}
      {desplegable("hoy", "¿Quién os lleva hoy el marketing?", HOY)}
      {desplegable("inversion", "¿Cuánto inviertes al mes en anuncios?", INVERSION)}
      {desplegable("marketing", "¿Cuánto inviertes al mes en marketing, sin contar anuncios? (agencias, proveedores, herramientas)", MARKETING)}
      {desplegable("cambiar", "¿Cuándo quieres cambiar?", CAMBIAR)}
      {desplegable("convence", "Si el estudio te convence, ¿qué harías?", CONVENCE)}
      {desplegable("reunion", "¿Nos dedicarías 30 minutos para presentártelo?", REUNION)}
      {desplegable("decide", "¿Quién decide la contratación?", DECIDE)}
      {desplegable("urge", "¿Qué es lo que más te urge?", URGE)}
      <label className={`${etiqueta} sm:col-span-2`}>
        ¿Algo más que debamos saber? <span className="font-normal text-white/60">(opcional)</span>
        <textarea name="mas" rows={3} maxLength={1000} className={campo} />
      </label>
      <label className={etiqueta}>
        Teléfono
        <input name="telefono" required type="tel" autoComplete="tel" className={campo} />
      </label>
      <label className={etiqueta}>
        Correo
        <input name="correo" required type="email" autoComplete="email" className={campo} />
      </label>
      <div className="sm:col-span-2">
        <label className="hidden" aria-hidden="true">
          No rellenes esto
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
        <button
          type="submit"
          disabled={estado === "enviando" || estado === "enviado"}
          className="w-full rounded-full bg-estrella px-7 py-4 text-lg font-bold text-tinta transition-colors hover:bg-estrella-2 disabled:opacity-60 sm:w-auto"
        >
          {estado === "enviando" ? "Enviando…" : estado === "enviado" ? "Recibido" : "Enviar mi test de idoneidad"}
        </button>
        <p className="mt-3 text-sm text-white/70">Lo revisamos uno a uno y te escribimos siempre, encaje o no.</p>
        {estado === "enviado" && (
          <p role="status" className="mt-3 rounded-xl bg-emerald-500/20 px-4 py-3 text-sm font-bold text-white">
            Recibido. Te hemos enviado un correo de confirmación y te contestamos en un máximo de 48 horas laborables. Mientras tanto, echa un vistazo a nuestros trabajos.
          </p>
        )}
        {estado === "sin-canal" && (
          <p role="status" className="mt-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
            Aún no hemos activado el envío de esta web de prueba. Tus datos no se han enviado a ningún sitio.
          </p>
        )}
      </div>
    </form>
  );
}
