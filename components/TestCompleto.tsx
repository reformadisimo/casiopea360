"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

// Test completo: 30 preguntas en 6 bloques más un bloque de gastos.
// Da una nota por área, lo que pagas hoy (dinero y tiempo), dónde se escapan clientes
// y qué haríamos primero. No da nuestro precio: invita a pedir presupuesto.
// Todo se calcula en el navegador; no se envía nada.

type Opcion = { t: string; v: number }; // v: 0 a 3 puntos
type Pregunta = { id: string; p: string; o: Opcion[]; fallo: string; arreglo: string; peso: number };
type Bloque = { id: string; titulo: string; intro: string; preguntas: Pregunta[] };

const SINO_NOSE = (si: string, aMedias: string, no: string): Opcion[] => [
  { t: si, v: 3 },
  { t: aMedias, v: 1 },
  { t: no, v: 0 },
];

const BLOQUES: Bloque[] = [
  {
    id: "web",
    titulo: "Tu web",
    intro: "Tu escaparate abierto las 24 horas. Vamos a ver si vende o solo decora.",
    preguntas: [
      { id: "w1", p: "¿Cuándo se hizo o se renovó tu web?", o: [{ t: "Hace menos de 2 años", v: 3 }, { t: "Hace 2 a 4 años", v: 2 }, { t: "Hace más de 4 años", v: 0 }, { t: "No tengo web", v: 0 }], fallo: "Tu web se ha quedado vieja: el cliente lo nota en dos segundos y compara con la competencia.", arreglo: "Web nueva, rápida y pensada para pedir presupuesto, regalada con el servicio.", peso: 3 },
      { id: "w2", p: "¿Cuánto tarda en abrirse en el móvil?", o: [{ t: "Al instante", v: 3 }, { t: "Un par de segundos", v: 2 }, { t: "Se hace larga", v: 0 }, { t: "No lo sé", v: 1 }], fallo: "Una web lenta en el móvil pierde a casi la mitad de las visitas antes de que vean nada.", arreglo: "Optimizar la web para que cargue al momento en cualquier móvil.", peso: 3 },
      { id: "w3", p: "¿Puede un cliente pedirte presupuesto o cita desde la web en menos de un minuto?", o: SINO_NOSE("Sí, el botón está siempre a la vista", "Hay formulario, pero hay que buscarlo", "Solo hay un teléfono o un correo"), fallo: "Pedirte presupuesto cuesta demasiado: el que duda se va a otra web.", arreglo: "Botones de presupuesto y WhatsApp siempre a la vista, y formularios cortos.", peso: 3 },
      { id: "w4", p: "Si quieres cambiar un texto o una foto, ¿cuánto tardan?", o: SINO_NOSE("Unas horas", "Varios días", "Semanas, o nadie lo hace"), fallo: "Cada cambio en tu web es una odisea, así que la web se queda sin actualizar.", arreglo: "Cualquier cambio hecho en un máximo de 48 horas, incluido en la cuota.", peso: 2 },
      { id: "w5", p: "¿El dominio, el alojamiento y los accesos están a tu nombre?", o: SINO_NOSE("Sí, todo", "Una parte", "No lo sé"), fallo: "Tu web no es del todo tuya: si cambias de proveedor puedes perderla.", arreglo: "Poner dominio, alojamiento y cuentas a tu nombre desde el primer día.", peso: 2 },
      { id: "w6", p: "¿Tienes al día el aviso legal, la privacidad y el banner de cookies?", o: SINO_NOSE("Sí", "Creo que sí", "No"), fallo: "Los textos legales y las cookies no están al día: hay riesgo de sanción.", arreglo: "Aviso legal, privacidad y cookies como pide la ley.", peso: 1 },
    ],
  },
  {
    id: "google",
    titulo: "Google y las IA",
    intro: "Donde te buscan antes de llamarte. Y cada vez más, donde preguntan a ChatGPT.",
    preguntas: [
      { id: "g1", p: "Si buscas en Google lo que haces más tu ciudad, ¿dónde sales?", o: [{ t: "Entre los tres primeros", v: 3 }, { t: "En la primera página", v: 2 }, { t: "Más abajo", v: 0 }, { t: "No lo he mirado", v: 0 }], fallo: "No sales arriba en Google cuando te buscan: esos clientes llaman a otro.", arreglo: "Trabajo de posicionamiento técnico, local y de contenidos para subir en Google.", peso: 3 },
      { id: "g2", p: "¿Cómo está tu ficha de Google (la del mapa)?", o: SINO_NOSE("Completa, con fotos y al día", "Existe, pero nadie la cuida", "No tengo o no lo sé"), fallo: "Tu ficha de Google está descuidada, y es lo primero que ve quien te busca cerca.", arreglo: "Ficha de Google completa, con fotos, horarios y publicaciones cada semana.", peso: 3 },
      { id: "g3", p: "¿Cuántas reseñas tienes en Google?", o: [{ t: "Más de 100, con buena nota", v: 3 }, { t: "Entre 20 y 100", v: 2 }, { t: "Menos de 20", v: 0 }, { t: "No lo sé", v: 0 }], fallo: "Tienes pocas reseñas: tu competencia con más estrellas se lleva la confianza.", arreglo: "Petición automática de reseñas a tus clientes contentos.", peso: 3 },
      { id: "g4", p: "¿Contestas las reseñas, también las malas?", o: SINO_NOSE("Todas", "Algunas", "Ninguna"), fallo: "Las reseñas sin respuesta, sobre todo las malas, restan confianza.", arreglo: "Respuesta a todas las reseñas, con tu visto bueno en las delicadas.", peso: 2 },
      { id: "g5", p: "Si preguntas a ChatGPT por una empresa como la tuya en tu ciudad, ¿te nombra?", o: [{ t: "Sí", v: 3 }, { t: "No", v: 0 }, { t: "No lo he probado", v: 0 }], fallo: "Las IA no te recomiendan: para quien pregunta a ChatGPT, no existes.", arreglo: "Preparar tu web y tu presencia para que las IA te encuentren y te citen.", peso: 2 },
      { id: "g6", p: "¿Publicas artículos que respondan las dudas de tus clientes?", o: SINO_NOSE("Cada mes", "Alguna vez", "Nunca"), fallo: "No publicas contenido: Google y las IA no tienen nada nuevo que enseñar de ti.", arreglo: "Artículos cada mes con las preguntas reales de tus clientes.", peso: 2 },
    ],
  },
  {
    id: "anuncios",
    titulo: "Anuncios",
    intro: "El dinero que pones en Google, Instagram o TikTok. ¿Vuelve multiplicado o se evapora?",
    preguntas: [
      { id: "a1", p: "¿Haces anuncios en internet?", o: [{ t: "En Google y en redes", v: 3 }, { t: "Solo en uno de los dos", v: 2 }, { t: "Lo probamos y lo dejamos", v: 1 }, { t: "No", v: 0 }], fallo: "No tienes anuncios bien montados: dependes solo de que te encuentren.", arreglo: "Campañas en Google y redes, con la inversión que tú decidas.", peso: 2 },
      { id: "a2", p: "¿Sabes cuánto te cuesta cada cliente que llega por anuncios?", o: SINO_NOSE("Sí, al euro", "Más o menos", "No"), fallo: "No sabes lo que te cuesta cada cliente: no sabes si tus anuncios ganan o pierden dinero.", arreglo: "Medir el coste de cada contacto y de cada cliente, cada día.", peso: 3 },
      { id: "a3", p: "¿Adónde llevan tus anuncios?", o: [{ t: "A páginas hechas para cada campaña", v: 3 }, { t: "A la portada de la web", v: 1 }, { t: "No lo sé", v: 0 }, { t: "No hago anuncios", v: 0 }], fallo: "Tus anuncios llevan a una página que no convence: pagas visitas que se van.", arreglo: "Páginas específicas para cada campaña, probadas y mejoradas.", peso: 2 },
      { id: "a4", p: "¿La cuenta de anuncios está a tu nombre y la pagas tú?", o: [{ t: "Sí", v: 3 }, { t: "Es de la agencia", v: 0 }, { t: "No lo sé", v: 0 }, { t: "No hago anuncios", v: 1 }], fallo: "La cuenta de anuncios no es tuya: el historial y los datos se van con la agencia.", arreglo: "Cuenta de anuncios a tu nombre, pagada con tu tarjeta.", peso: 2 },
    ],
  },
  {
    id: "redes",
    titulo: "Redes e imagen",
    intro: "Instagram, TikTok, Facebook y tu imagen de marca. Lo que dice de ti antes de conocerte.",
    preguntas: [
      { id: "r1", p: "¿Cada cuánto publicáis en redes?", o: SINO_NOSE("Varias veces por semana", "Alguna vez al mes", "Casi nunca"), fallo: "Tus redes están paradas: dan sensación de empresa cerrada.", arreglo: "Publicaciones constantes, con calendario y tu aprobación.", peso: 2 },
      { id: "r2", p: "¿Usáis vídeo (reels, TikTok, historias)?", o: SINO_NOSE("Habitualmente", "A veces", "Nunca"), fallo: "No usas vídeo, que es lo que más alcance tiene hoy en redes.", arreglo: "Vídeos cortos editados para redes cada semana.", peso: 2 },
      { id: "r3", p: "¿Las redes os traen contactos o solo «me gusta»?", o: SINO_NOSE("Contactos, y los medimos", "No lo sabemos", "Nada"), fallo: "No sabes si tus redes traen clientes o solo aplausos.", arreglo: "Medir qué publicaciones traen contactos y repetir lo que funciona.", peso: 1 },
      { id: "r4", p: "¿Cómo ves tu logo y tu imagen de marca?", o: SINO_NOSE("Moderna y coherente en todas partes", "Algo anticuada", "Cada sitio va por su lado"), fallo: "Tu imagen está anticuada o es distinta en cada sitio: resta confianza.", arreglo: "Rediseño de logo e imagen si hace falta, incluido en la cuota.", peso: 1 },
    ],
  },
  {
    id: "atencion",
    titulo: "Atención y automatización",
    intro: "Lo que pasa después del primer contacto. Aquí es donde más clientes se pierden sin que nadie lo vea.",
    preguntas: [
      { id: "t1", p: "Cuando llega un contacto, ¿cuánto tardáis en responder?", o: [{ t: "Minutos", v: 3 }, { t: "Unas horas", v: 2 }, { t: "Un día o más", v: 0 }, { t: "Depende de quién lo vea", v: 0 }], fallo: "Tardas en responder: el cliente que espera suele contratar al primero que contesta.", arreglo: "Respuesta inmediata y aviso al momento a la persona que debe atender.", peso: 3 },
      { id: "t2", p: "¿Y si escriben de noche o en fin de semana?", o: SINO_NOSE("Responde un asistente o un mensaje automático", "Contestamos al día siguiente", "Se pierde"), fallo: "Fuera de horario nadie atiende, y es cuando más gente busca.", arreglo: "Asistente con inteligencia artificial que atiende las 24 horas.", peso: 2 },
      { id: "t3", p: "Si alguien pide presupuesto y no contesta, ¿le hacéis seguimiento?", o: SINO_NOSE("Sí, automático", "A mano, cuando nos acordamos", "No"), fallo: "Los presupuestos sin respuesta se quedan ahí: sin seguimiento, se pierden ventas hechas.", arreglo: "Correos y WhatsApp de seguimiento que salen solos.", peso: 3 },
      { id: "t4", p: "¿Dónde guardáis los contactos de clientes?", o: SINO_NOSE("En un programa de clientes (CRM)", "En una hoja de cálculo", "En el correo y en la cabeza"), fallo: "Tus contactos están desperdigados: nadie sabe en qué punto está cada cliente.", arreglo: "Todos los contactos en un mismo sitio, ordenados y con su historial.", peso: 2 },
      { id: "t5", p: "Al terminar un trabajo, ¿se pide la reseña al cliente?", o: SINO_NOSE("Sí, automáticamente", "A veces", "No"), fallo: "No pides reseñas al terminar: desperdicias a tus clientes contentos.", arreglo: "Mensaje automático pidiendo la reseña en el mejor momento.", peso: 1 },
    ],
  },
  {
    id: "control",
    titulo: "Medición y proveedores",
    intro: "¿Sabes qué funciona? ¿Y cuánto tiempo te cuesta que funcione?",
    preguntas: [
      { id: "c1", p: "¿Cada cuánto recibes un informe de resultados?", o: [{ t: "Cada día o cada semana", v: 3 }, { t: "Cada mes", v: 2 }, { t: "Cuando lo pido", v: 1 }, { t: "Nunca", v: 0 }], fallo: "No recibes informes: no sabes qué funciona ni en qué se va tu dinero.", arreglo: "Un parte de resultados cada día y un enlace con los datos en tiempo real.", peso: 3 },
      { id: "c2", p: "¿Entiendes esos informes?", o: SINO_NOSE("Sí, son claros", "A medias", "No, o no hay"), fallo: "Los informes que recibes no se entienden, así que no sirven para decidir.", arreglo: "Informes en lenguaje claro: contactos, clientes y lo que cuesta cada uno.", peso: 1 },
      { id: "c3", p: "¿Cuántos proveedores distintos llevan tu marketing digital?", o: [{ t: "Uno solo", v: 3 }, { t: "Dos o tres", v: 1 }, { t: "Cuatro o más", v: 0 }, { t: "Lo hacemos en casa como podemos", v: 0 }], fallo: "Tienes varios proveedores y nadie mira el conjunto: tú haces de coordinador.", arreglo: "Un solo equipo para todo, con una sola persona de contacto.", peso: 3 },
      { id: "c4", p: "¿Cuántas horas a la semana dedicas a reuniones, llamadas y correos con proveedores?", o: [{ t: "Menos de una", v: 3 }, { t: "Entre 2 y 4", v: 1 }, { t: "Entre 5 y 8", v: 0 }, { t: "Más de 8", v: 0 }], fallo: "Pierdes muchas horas coordinando proveedores, horas que no dedicas a tu negocio.", arreglo: "Todo por correo con un solo equipo: sin reuniones salvo que tú las quieras.", peso: 2 },
      { id: "c5", p: "Cuando pides algo, ¿cuánto tardan de media en hacerlo?", o: SINO_NOSE("Menos de 48 horas", "Una semana", "Más, o depende"), fallo: "Lo que pides tarda semanas: las oportunidades no esperan.", arreglo: "Máximo 48 horas para cualquier cosa que pidas.", peso: 2 },
    ],
  },
];

const HORAS = [0.5, 3, 6.5, 10]; // horas semanales según la respuesta de c4
const VALOR_HORA = 60; // valor orientativo de una hora de dirección

const TRAMOS = [
  { t: "Nada", v: 0 },
  { t: "Hasta 300 €", v: 200 },
  { t: "300 - 500 €", v: 400 },
  { t: "500 - 1.000 €", v: 750 },
  { t: "1.000 - 2.000 €", v: 1500 },
  { t: "Más de 2.000 €", v: 2500 },
];
const PROVEEDORES = [
  { id: "web", t: "Web: agencia, programador, mantenimiento" },
  { id: "seo", t: "SEO (posicionamiento en Google)" },
  { id: "anuncios", t: "Gestión de anuncios (sin contar lo invertido)" },
  { id: "redes", t: "Redes sociales y contenidos" },
  { id: "diseno", t: "Diseño, fotos e imagen" },
  { id: "herramientas", t: "Herramientas: CRM, correo, chat, alojamiento…" },
];
const INVERSIONES = [0, 500, 1000, 3000, 5000, 10000, 20000];
const COMISIONES = [
  { t: "No pago comisión", v: 0 },
  { t: "Un 5 %", v: 0.05 },
  { t: "Un 10 %", v: 0.1 },
  { t: "Un 15 % o más", v: 0.15 },
  { t: "No lo sé", v: 0.1 },
];

// resp guarda el índice de la opción elegida en cada pregunta
const val = (q: Pregunta, resp: Record<string, number>) => (resp[q.id] === undefined ? 0 : q.o[resp[q.id]].v);
const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const TOTAL_PASOS = BLOQUES.length + 1; // + gastos

export default function TestCompleto() {
  const [resp, setResp] = useState<Record<string, number>>({});
  const [gastos, setGastos] = useState<Record<string, number>>(Object.fromEntries(PROVEEDORES.map((p) => [p.id, 0])));
  const [inversion, setInversion] = useState(0);
  const [comision, setComision] = useState(0);
  const [paso, setPaso] = useState(0); // 0..BLOQUES.length-1 bloques, BLOQUES.length gastos, TOTAL_PASOS resultado
  const caja = useRef<HTMLDivElement>(null);

  const ir = (n: number) => {
    setPaso(n);
    requestAnimationFrame(() => caja.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const reiniciar = () => {
    setResp({});
    setGastos(Object.fromEntries(PROVEEDORES.map((p) => [p.id, 0])));
    setInversion(0);
    setComision(0);
    ir(0);
  };

  const r = useMemo(() => {
    const areas = BLOQUES.map((b) => {
      const max = b.preguntas.reduce((a, q) => a + 3 * q.peso, 0);
      const pts = b.preguntas.reduce((a, q) => a + val(q, resp) * q.peso, 0);
      return { id: b.id, titulo: b.titulo, nota: Math.round((pts / max) * 100) };
    });
    const todas = BLOQUES.flatMap((b) => b.preguntas);
    const max = todas.reduce((a, q) => a + 3 * q.peso, 0);
    const pts = todas.reduce((a, q) => a + val(q, resp) * q.peso, 0);
    const fallos = todas
      .filter((q) => val(q, resp) <= 1)
      .sort((a, b) => b.peso * (3 - val(b, resp)) - a.peso * (3 - val(a, resp)));
    const horasSemana = resp.c4 === undefined ? 0 : HORAS[resp.c4];
    const proveedoresMes = Object.values(gastos).reduce((a, b) => a + b, 0);
    const comisionMes = inversion * comision;
    const tiempoMes = horasSemana * 4.33 * VALOR_HORA;
    return {
      areas,
      nota: Math.round((pts / max) * 100),
      fallos,
      horasAno: Math.round(horasSemana * 46),
      proveedoresMes,
      comisionMes,
      tiempoMes,
      numProveedores: Object.values(gastos).filter((v) => v > 0).length,
      totalMes: proveedoresMes + comisionMes,
    };
  }, [resp, gastos, inversion, comision]);

  const bloque = BLOQUES[paso];
  const completo = bloque ? bloque.preguntas.every((q) => resp[q.id] !== undefined) : true;
  const respondidas = Object.keys(resp).length;
  const totalPreguntas = BLOQUES.reduce((a, b) => a + b.preguntas.length, 0);

  const nivel =
    r.nota >= 75
      ? { t: "Tu marketing está en forma", d: "Tienes buena base. Aun así, hemos encontrado puntos donde ganar más clientes con lo mismo." }
      : r.nota >= 45
        ? { t: "Vas a medias", d: "Tienes piezas sueltas que funcionan, pero se te escapan clientes en varios sitios. Todo esto tiene arreglo, y rápido." }
        : { t: "Hay muchísimo margen", d: "Ahora mismo estás dejando la mayoría de los clientes de internet a tu competencia. La buena noticia: es donde antes se nota el cambio." };

  const selector = "mt-2 w-full rounded-xl border border-linea bg-white px-4 py-3 text-base font-normal focus:border-noche focus:outline-none";
  const color = (n: number) => (n >= 75 ? "bg-emerald-400" : n >= 45 ? "bg-estrella" : "bg-rose-400");

  return (
    <div ref={caja} className="scroll-mt-28">
      {paso < TOTAL_PASOS && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gris">
            <span className="font-bold text-tinta">
              Bloque {paso + 1} de {TOTAL_PASOS}: {bloque ? bloque.titulo : "Lo que pagas hoy"}
            </span>
            <span>
              {respondidas} de {totalPreguntas} preguntas
            </span>
          </div>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: TOTAL_PASOS }).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i < paso ? "bg-noche" : i === paso ? "bg-estrella" : "bg-linea"}`} />
            ))}
          </div>
        </div>
      )}

      {bloque && (
        <div className="rounded-[2rem] border border-linea bg-white p-6 sm:p-10">
          <p className="text-3xl font-extrabold sm:text-4xl">{bloque.titulo}</p>
          <p className="mt-2 text-lg text-gris">{bloque.intro}</p>
          <ol className="mt-8 space-y-9">
            {bloque.preguntas.map((q, i) => (
              <li key={q.id}>
                <fieldset>
                  <legend className="text-lg font-bold">
                    <span className="mr-2 text-gris">{i + 1}.</span>
                    {q.p}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {q.o.map((o, j) => {
                      const activo = resp[q.id] === j;
                      return (
                        <button
                          key={o.t}
                          type="button"
                          aria-pressed={activo}
                          onClick={() => setResp({ ...resp, [q.id]: j })}
                          className={`rounded-full border px-4 py-2.5 text-left text-[0.95rem] transition-colors ${
                            activo ? "border-noche bg-noche font-bold text-white" : "border-linea hover:border-noche"
                          }`}
                        >
                          {o.t}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              disabled={!completo}
              onClick={() => ir(paso + 1)}
              className="rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente bloque
            </button>
            {paso > 0 && (
              <button type="button" onClick={() => ir(paso - 1)} className="font-bold underline underline-offset-4">
                Volver
              </button>
            )}
            {!completo && <span className="text-sm text-gris">Contesta todas para seguir.</span>}
          </div>
        </div>
      )}

      {paso === BLOQUES.length && (
        <div className="rounded-[2rem] border border-linea bg-white p-6 sm:p-10">
          <p className="text-3xl font-extrabold sm:text-4xl">Lo que pagas hoy</p>
          <p className="mt-2 text-lg text-gris">Elige el tramo más parecido. Si no tienes ese proveedor, déjalo en «Nada». No hace falta ser exacto.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PROVEEDORES.map((p) => (
              <label key={p.id} className="block text-sm font-bold">
                {p.t}
                <select className={selector} value={gastos[p.id]} onChange={(e) => setGastos({ ...gastos, [p.id]: Number(e.target.value) })}>
                  {TRAMOS.map((t) => (
                    <option key={t.t} value={t.v}>
                      {t.t}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label className="block text-sm font-bold">
              Lo que inviertes en anuncios al mes
              <select className={selector} value={inversion} onChange={(e) => setInversion(Number(e.target.value))}>
                {INVERSIONES.map((v) => (
                  <option key={v} value={v}>
                    {v === 0 ? "Nada" : `${fmt(v)} €${v === 20000 ? " o más" : ""}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-bold">
              Comisión que te cobran sobre esa inversión
              <select className={selector} value={COMISIONES.findIndex((c) => c.v === comision)} onChange={(e) => setComision(COMISIONES[Number(e.target.value)].v)}>
                {COMISIONES.map((c, i) => (
                  <option key={c.t} value={i}>
                    {c.t}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => ir(TOTAL_PASOS)} className="rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2">
              Ver mi resultado
            </button>
            <button type="button" onClick={() => ir(paso - 1)} className="font-bold underline underline-offset-4">
              Volver
            </button>
          </div>
        </div>
      )}

      {paso === TOTAL_PASOS && (
        <div className="space-y-6" aria-live="polite">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col justify-between rounded-[2rem] bg-noche p-7 text-white sm:p-10">
              <div>
                <p className="text-sm text-white/70">Tu nota de marketing digital</p>
                <p className="mt-2 text-7xl font-extrabold leading-none text-estrella sm:text-8xl">
                  {r.nota}
                  <span className="text-3xl text-white/50"> / 100</span>
                </p>
                <p className="mt-5 text-2xl font-extrabold">{nivel.t}</p>
                <p className="mt-2 text-white/80">{nivel.d}</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-linea bg-white p-7 sm:p-10">
              <p className="text-2xl font-extrabold">Tu nota por áreas</p>
              <ul className="mt-6 space-y-4">
                {r.areas.map((a) => (
                  <li key={a.id}>
                    <div className="flex justify-between text-sm font-bold">
                      <span>{a.titulo}</span>
                      <span>{a.nota}</span>
                    </div>
                    <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-niebla">
                      <div className={`h-full rounded-full ${color(a.nota)}`} style={{ width: `${Math.max(a.nota, 3)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] bg-estrella p-7 text-tinta sm:p-10">
            <p className="text-2xl font-extrabold">Lo que te cuesta hoy tu marketing</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-bold opacity-70">En proveedores y comisiones</p>
                <p className="mt-1 text-4xl font-extrabold">{fmt(r.totalMes * 12)} €</p>
                <p className="text-sm">al año{r.numProveedores > 0 ? `, repartidos entre ${r.numProveedores} proveedor${r.numProveedores === 1 ? "" : "es"}` : ""}</p>
              </div>
              <div>
                <p className="text-sm font-bold opacity-70">Solo en comisiones de anuncios</p>
                <p className="mt-1 text-4xl font-extrabold">{fmt(r.comisionMes * 12)} €</p>
                <p className="text-sm">al año. Con nosotros serían 0 €.</p>
              </div>
              <div>
                <p className="text-sm font-bold opacity-70">En tu propio tiempo</p>
                <p className="mt-1 text-4xl font-extrabold">{r.horasAno} h</p>
                <p className="text-sm">al año coordinando proveedores, unos {fmt(r.tiempoMes * 12)} € si tu hora vale {VALOR_HORA} €.</p>
              </div>
            </div>
          </div>

          {r.fallos.length > 0 && (
            <div className="rounded-[2rem] border border-linea bg-white p-7 sm:p-10">
              <p className="text-2xl font-extrabold">
                Dónde se te escapan clientes <span className="text-gris">({r.fallos.length})</span>
              </p>
              <p className="mt-1 text-gris">Ordenado de más a menos importante.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {r.fallos.map((q) => (
                  <li key={q.id} className="flex gap-3 rounded-2xl bg-niebla p-4">
                    <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-400" />
                    <span>{q.fallo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {r.fallos.length > 0 && (
            <div className="rounded-[2rem] border border-linea bg-white p-7 sm:p-10">
              <p className="text-2xl font-extrabold">Lo que haríamos la primera semana</p>
              <ol className="mt-6 space-y-4">
                {r.fallos.slice(0, 5).map((q, i) => (
                  <li key={q.id} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-noche font-extrabold text-estrella">{i + 1}</span>
                    <span className="pt-1.5 text-lg">{q.arreglo}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-gris">Y todo lo demás de la lista, en las semanas siguientes. Sin cobrarte nada aparte.</p>
            </div>
          )}

          <div className="relative overflow-hidden rounded-[2rem] bg-noche p-7 text-white sm:p-12">
            <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url(/video/constelaciones.jpg)" }} />
            <div className="relative max-w-2xl">
              <p className="text-3xl font-extrabold sm:text-4xl">Pide tu presupuesto</p>
              <p className="mt-4 text-lg text-white/85">
                Te preparamos un estudio gratuito y una cuota mensual fija, hecha para tu empresa, que lo incluye <strong className="text-white">absolutamente todo</strong>: web, Google, anuncios, redes, automatizaciones, informes diarios y cada cambio que pidas en 48 horas. Sin comisiones sobre lo que inviertas y sin sorpresas.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/estudio-gratuito" className="rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2">
                  Quiero mi presupuesto
                </Link>
                <button type="button" onClick={reiniciar} className="rounded-full border border-white/30 px-7 py-3.5 font-bold hover:bg-white/10">
                  Repetir el test
                </button>
              </div>
              <p className="mt-6 text-sm text-white/60">Cifras orientativas, calculadas con tus respuestas en tu navegador. No se ha enviado ningún dato.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
