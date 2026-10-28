"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LogoMarca from "@/components/LogoMarca";
import VideoFondo from "@/components/VideoFondo";
import { BarraEstrella, COLOR_OPCION, Confeti, Opcion, Reaccion } from "@/components/JuegoTest";
import Image from "next/image";
import { CONTACTO } from "@/lib/contenido";

// Muestra de la guía que recibirá (despacho ficticio, difuminada).
const MUESTRA = [
  { src: "/marca/muestra-1.webp", t: "Tu guía" },
  { src: "/marca/muestra-2.webp", t: "Semáforo" },
  { src: "/marca/muestra-3.webp", t: "Tu web" },
  { src: "/marca/muestra-4.webp", t: "Competencia" },
];
function Muestra({ oscuro = false }: { oscuro?: boolean }) {
  return (
    <div>
      <p className={`text-sm font-bold ${oscuro ? "text-estrella" : "text-noche-3"}`}>Si encajas, esto es lo que te preparamos gratis</p>
      <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {MUESTRA.map((x, i) => (
          <li key={x.src} className={`overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/10 ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
            <Image src={x.src} alt={`Guía de ejemplo: ${x.t.toLowerCase()}`} width={360} height={304} className="h-auto w-full" />
            <p className="truncate px-1.5 py-1 text-[0.62rem] font-bold text-tinta sm:text-xs">{x.t}</p>
          </li>
        ))}
      </ul>
      <p className={`mt-2 text-xs ${oscuro ? "text-white/60" : "text-gris"}`}>Guía de ejemplo de un despacho ficticio. La tuya, con tus datos y 29 apartados.</p>
    </div>
  );
}

// El único test de la web: el test de idoneidad.
// Una pregunta por pantalla, en tramos, con frases, datos curiosos y confeti.
// Sirve a la vez para dar al cliente su nota y para que sepamos si encaja (etiqueta interna en el correo).

type Opc = { t: string; v: number }; // v: 0 a 3 puntos (solo cuenta en tramos que puntúan)
type Preg = { id: string; p: string; o: Opc[]; fallo?: string; arreglo?: string; peso?: number; logo?: string };
type Tramo = { id: string; titulo: string; intro: string; dato: string; video: string; color: string; logos: string[]; puntua: boolean; preguntas: Preg[]; extra?: boolean };

const T = (...xs: string[]): Opc[] => xs.map((t) => ({ t, v: 0 }));
const SN = (si: string, medias: string, no: string): Opc[] => [
  { t: si, v: 3 },
  { t: medias, v: 1 },
  { t: no, v: 0 },
];

const FACTURACION = ["Menos de 1 millón", "De 1 a 4 millones", "De 4 a 10 millones", "Más de 10 millones", "Prefiero no decirlo"];
const MARKETING = ["Menos de 500 € al mes", "De 500 a 1.500 € al mes", "De 1.500 a 3.000 € al mes", "De 3.000 a 5.000 € al mes", "De 5.000 a 10.000 € al mes", "Más de 10.000 € al mes", "No lo sé"];
const INVERSION = ["Nada", "Menos de 1.000 € al mes", "De 1.000 a 5.000 € al mes", "De 5.000 a 10.000 € al mes", "Más de 10.000 € al mes"];
const CAMBIAR = ["Lo antes posible", "En los próximos tres meses", "Más adelante", "No tengo prisa, solo estoy mirando"];
const CONVENCE = ["Empezaríamos en cuanto podáis", "Lo hablaría con mi socio o la dirección", "Lo compararía con otras propuestas", "Solo quiero ver ideas"];
const REUNION = ["Sí, esta misma semana", "Sí, en las próximas semanas", "Prefiero que me lo enviéis por correo"];
const DECIDE = ["Yo", "Lo decido con mi socio o la dirección", "Lo propongo y decide otra persona"];

const TRAMOS: Tramo[] = [
  {
    id: "empresa",
    titulo: "Tu empresa",
    intro: "Para conocerte un poco. Cinco toques y listo.",
    dato: "Todo lo que contestes es para preparar tu estudio. No lo compartimos con nadie.",
    video: "despacho",
    color: "from-[#24387a] to-[#0e1a3d]",
    logos: ["Google Maps", "Google", "LinkedIn"],
    puntua: false,
    preguntas: [
      { id: "sector", p: "¿A qué se dedica tu empresa?", o: T("Servicios a particulares", "Servicios a empresas", "Tienda o comercio", "Industria o fabricación", "Salud o bienestar", "Otra") },
      { id: "facturacion", p: "¿Cuánto factura al año, más o menos?", o: T(...FACTURACION) },
      { id: "empleados", p: "¿Cuántas personas trabajan en ella?", o: T("Menos de 10", "De 10 a 50", "De 50 a 250", "Más de 250") },
      { id: "zona", p: "¿Dónde están tus clientes?", o: T("En mi ciudad o provincia", "En toda España", "También fuera de España", "Solo vendo por internet"), logo: "Google Maps" },
      { id: "valor", p: "¿Cuánto vale de media un cliente para ti?", o: T("Menos de 300 €", "De 300 € a 3.000 €", "De 3.000 € a 30.000 €", "Más de 30.000 €") },
    ],
  },
  {
    id: "ventas",
    titulo: "Cómo atiendes y vendes",
    intro: "Lo que pasa cuando alguien te escribe. Aquí se escapan más clientes de los que crees.",
    dato: "La mayoría de la gente contrata a la primera empresa que le responde. La rapidez vende más que el precio.",
    video: "neon-llamada",
    color: "from-[#128c7e] to-[#075e54]",
    logos: ["WhatsApp", "Gmail", "Claude"],
    puntua: true,
    preguntas: [
      { id: "t1", p: "Cuando llega un contacto, ¿cuánto tardáis en responder?", o: [{ t: "Minutos", v: 3 }, { t: "Unas horas", v: 2 }, { t: "Un día o más", v: 0 }, { t: "Depende de quién lo vea", v: 0 }], fallo: "Tardas en responder: el cliente que espera suele contratar al primero que contesta.", arreglo: "Respuesta inmediata y aviso al momento a quien debe atender.", peso: 3, logo: "WhatsApp" },
      { id: "t2", p: "¿Y si os escriben de noche o en fin de semana?", o: SN("Responde un asistente o un mensaje automático", "Contestamos al día siguiente", "Se pierde"), fallo: "Fuera de horario nadie atiende, y es cuando más gente busca.", arreglo: "Asistente con inteligencia artificial que atiende las 24 horas.", peso: 2, logo: "Claude" },
      { id: "t3", p: "Si alguien pide presupuesto y no contesta, ¿le hacéis seguimiento?", o: SN("Sí, automático", "A mano, cuando nos acordamos", "No"), fallo: "Los presupuestos sin respuesta se quedan ahí: sin seguimiento, se pierden ventas hechas.", arreglo: "Seguimientos por correo y WhatsApp que salen solos.", peso: 3, logo: "Gmail" },
      { id: "t4", p: "¿Dónde guardáis los contactos de clientes?", o: SN("En un programa de clientes (CRM)", "En una hoja de cálculo", "En el correo y en la cabeza"), fallo: "Tus contactos están desperdigados: nadie sabe en qué punto está cada cliente.", arreglo: "Tu CRM a medida, con cada contacto y su historial.", peso: 2 },
      { id: "v1", p: "De cada 10 personas que piden presupuesto, ¿cuántas acaban comprando?", o: [{ t: "Más de 4", v: 3 }, { t: "Entre 2 y 4", v: 2 }, { t: "Menos de 2", v: 0 }, { t: "No lo sé", v: 0 }], fallo: "No sabes cuántos presupuestos cierras, o cierras pocos: ahí hay ventas que se escapan.", arreglo: "Medir el cierre de cada presupuesto y mejorar lo que hace que se caigan.", peso: 3 },
      { id: "v2", p: "¿Cuánto tardáis en enviar un presupuesto?", o: [{ t: "El mismo día", v: 3 }, { t: "Dos o tres días", v: 2 }, { t: "Una semana o más", v: 0 }], fallo: "Tardáis en enviar presupuestos: quien llega antes, suele ganar.", arreglo: "Calculadoras para que el cliente tenga una cifra orientativa al momento.", peso: 2 },
      { id: "v3", p: "¿Sabes qué canal te trae los clientes que más facturan?", o: SN("Sí", "Me hago una idea", "No"), fallo: "No sabes qué canal trae los mejores clientes: inviertes a ciegas.", arreglo: "Saber de dónde viene cada cliente y cuánto factura.", peso: 3, logo: "Google Analytics" },
      { id: "v4", p: "¿Quien vende recibe al momento cada contacto nuevo?", o: SN("Sí, con aviso al móvil", "Lo mira cuando puede", "No hay un sistema"), fallo: "Los contactos nuevos no llegan al momento a quien vende: se enfrían.", arreglo: "Aviso instantáneo con todo lo que el cliente ha hecho en tu web.", peso: 2 },
    ],
  },
  {
    id: "proveedores",
    titulo: "Tus proveedores y lo que pagas",
    intro: "Con esto calculamos cuánto podrías ahorrar. No hace falta ser exacto.",
    dato: "Muchas agencias cobran entre un 10 y un 20 % de lo que inviertes en anuncios. Nosotros, cero.",
    video: "papeles",
    color: "from-[#e8710a] to-[#0e1a3d]",
    logos: ["Google Ads", "Meta", "Semrush"],
    puntua: true,
    preguntas: [
      { id: "c3", p: "¿Cuántos proveedores distintos llevan tu marketing digital?", o: [{ t: "Uno solo", v: 3 }, { t: "Dos o tres", v: 1 }, { t: "Cuatro o más", v: 0 }, { t: "Lo hacemos en casa como podemos", v: 0 }], fallo: "Tienes varios proveedores y nadie mira el conjunto: tú haces de coordinador.", arreglo: "Un solo equipo para todo, con una sola persona de contacto.", peso: 3 },
      { id: "c4", p: "¿Cuántas horas a la semana dedicas a reuniones, llamadas y correos con ellos?", o: [{ t: "Menos de una", v: 3 }, { t: "Entre 2 y 4", v: 1 }, { t: "Entre 5 y 8", v: 0 }, { t: "Más de 8", v: 0 }], fallo: "Pierdes muchas horas coordinando proveedores, horas que no dedicas a tu negocio.", arreglo: "Todo por escrito con un solo equipo: sin reuniones salvo que tú las quieras.", peso: 2 },
      { id: "c5", p: "Cuando les pides algo, ¿cuánto tardan de media?", o: SN("Menos de 48 horas", "Una semana", "Más, o depende"), fallo: "Lo que pides tarda semanas: las oportunidades no esperan.", arreglo: "Respuesta el mismo día y 48 horas para lo del día a día.", peso: 2 },
      { id: "w5", p: "¿Tu dominio, tu web y los accesos están a tu nombre?", o: SN("Sí, todo", "Una parte", "No lo sé"), fallo: "Tu web no es del todo tuya: si cambias de proveedor puedes perderla.", arreglo: "Dominio y cuentas a tu nombre desde el primer día.", peso: 2 },
      { id: "a4", p: "¿La cuenta de anuncios está a tu nombre y la pagas tú?", o: [{ t: "Sí", v: 3 }, { t: "Es de la agencia", v: 0 }, { t: "No lo sé", v: 0 }, { t: "No hago anuncios", v: 1 }], fallo: "La cuenta de anuncios no es tuya: el historial y los datos se van con la agencia.", arreglo: "Cuenta de anuncios a tu nombre, pagada con tu tarjeta.", peso: 2, logo: "Google Ads" },
      { id: "marketing", p: "¿Cuánto pagas al mes en marketing, sin contar anuncios? (agencias, proveedores, herramientas)", o: T(...MARKETING) },
      { id: "inversion", p: "¿Y cuánto inviertes al mes en anuncios?", o: T(...INVERSION), logo: "Meta" },
      { id: "comision", p: "¿Te cobran comisión sobre lo que inviertes en anuncios?", o: [{ t: "No", v: 3 }, { t: "Sí, un porcentaje", v: 0 }, { t: "No lo sé", v: 1 }, { t: "No hago anuncios", v: 3 }], fallo: "Pagas comisión sobre tus anuncios: cuanto más inviertes, más pagas a la agencia.", arreglo: "Cuota fija: cero comisiones sobre lo que inviertas.", peso: 2 },
    ],
  },
  {
    id: "buscas",
    titulo: "Lo que buscas",
    intro: "La última parte. Así sabemos cómo ayudarte mejor.",
    dato: "Preparar un estudio nos lleva un día entero de trabajo. Por eso lo hacemos solo a empresas a las que podemos ayudar de verdad.",
    video: "equipo-celebra",
    color: "from-[#7c3aed] to-[#0e1a3d]",
    logos: ["Google", "ChatGPT", "Gemini"],
    puntua: false,
    preguntas: [
      { id: "urge", p: "¿Qué es lo que más te urge?", o: T("Más clientes", "Una web nueva", "Dejar de coordinar proveedores", "Medir lo que funciona", "Pagar menos por lo mismo") },
      { id: "cambiar", p: "¿Cuándo quieres cambiar?", o: T(...CAMBIAR) },
      { id: "convence", p: "Si el estudio te convence, ¿qué harías?", o: T(...CONVENCE) },
      { id: "decide", p: "¿Quién decide la contratación?", o: T(...DECIDE) },
      { id: "reunion", p: "¿Nos dedicarías 30 minutos para presentártelo?", o: T(...REUNION) },
    ],
  },
  {
    id: "afinar",
    titulo: "Afina tu nota",
    intro: "Opcional: diez toques más sobre tu web, Google y tus anuncios.",
    dato: "Solo el 48 % de las webs aprueba en el móvil la velocidad que pide Google (HTTP Archive, 2025).",
    video: "ojo-pantallas",
    color: "from-[#1a73e8] to-[#188038]",
    logos: ["Google", "PageSpeed", "ChatGPT"],
    puntua: true,
    extra: true,
    preguntas: [
      { id: "w1", p: "¿Cuándo se hizo o se renovó tu web?", o: [{ t: "Hace menos de 2 años", v: 3 }, { t: "Hace 2 a 4 años", v: 2 }, { t: "Hace más de 4 años", v: 0 }, { t: "No tengo web", v: 0 }], fallo: "Tu web se ha quedado vieja: el cliente lo nota en dos segundos.", arreglo: "Web nueva, rápida y pensada para pedir presupuesto.", peso: 3, logo: "Google Chrome" },
      { id: "w2", p: "¿Cuánto tarda en abrirse en el móvil?", o: [{ t: "Al instante", v: 3 }, { t: "Un par de segundos", v: 2 }, { t: "Se hace larga", v: 0 }, { t: "No lo sé", v: 1 }], fallo: "Una web lenta en el móvil pierde a muchas visitas antes de que vean nada.", arreglo: "Una web que cargue al momento en cualquier móvil.", peso: 3, logo: "PageSpeed" },
      { id: "w3", p: "¿Se puede pedir presupuesto o cita desde tu web en menos de un minuto?", o: SN("Sí, el botón está siempre a la vista", "Hay formulario, pero hay que buscarlo", "Solo hay un teléfono o un correo"), fallo: "Pedirte presupuesto cuesta demasiado: el que duda se va a otra web.", arreglo: "Botones de presupuesto y WhatsApp siempre a la vista.", peso: 3 },
      { id: "g1", p: "Si buscas en Google lo que haces más tu ciudad, ¿dónde sales?", o: [{ t: "Entre los tres primeros", v: 3 }, { t: "En la primera página", v: 2 }, { t: "Más abajo", v: 0 }, { t: "No lo he mirado", v: 0 }], fallo: "No sales arriba en Google cuando te buscan: esos clientes llaman a otro.", arreglo: "Posicionamiento local y de contenidos para subir en Google.", peso: 3, logo: "Google" },
      { id: "g2", p: "¿Cómo está tu ficha de Google, la del mapa?", o: SN("Completa, con fotos y al día", "Existe, pero nadie la cuida", "No tengo o no lo sé"), fallo: "Tu ficha de Google está descuidada, y es lo primero que ve quien te busca cerca.", arreglo: "Ficha de Google completa y con publicaciones cada semana.", peso: 3, logo: "Ficha de Google" },
      { id: "g3", p: "¿Cuántas reseñas tienes en Google?", o: [{ t: "Más de 100, con buena nota", v: 3 }, { t: "Entre 20 y 100", v: 2 }, { t: "Menos de 20", v: 0 }, { t: "No lo sé", v: 0 }], fallo: "Tienes pocas reseñas: tu competencia con más estrellas se lleva la confianza.", arreglo: "Petición automática de reseñas a tus clientes contentos.", peso: 3, logo: "Ficha de Google" },
      { id: "g4", p: "¿Contestas las reseñas, también las malas?", o: SN("Todas", "Algunas", "Ninguna"), fallo: "Las reseñas sin respuesta restan confianza.", arreglo: "Respuesta a todas las reseñas, con tu visto bueno.", peso: 2, logo: "Ficha de Google" },
      { id: "g5", p: "Si preguntas a ChatGPT por una empresa como la tuya en tu ciudad, ¿te nombra?", o: [{ t: "Sí", v: 3 }, { t: "No", v: 0 }, { t: "No lo he probado", v: 0 }], fallo: "Las IA no te recomiendan: para quien pregunta a ChatGPT, no existes.", arreglo: "Preparar tu web para que las IA te encuentren y te citen.", peso: 2, logo: "ChatGPT" },
      { id: "a2", p: "¿Sabes cuánto te cuesta cada cliente que llega por anuncios?", o: SN("Sí, al euro", "Más o menos", "No"), fallo: "No sabes lo que te cuesta cada cliente: no sabes si tus anuncios ganan o pierden dinero.", arreglo: "Medir el coste de cada contacto y de cada cliente, cada día.", peso: 3, logo: "Google Analytics" },
      { id: "m3", p: "¿Está claro en tu web por qué elegirte a ti y no a otro?", o: SN("Sí, en la primera pantalla", "Hay que buscarlo", "No"), fallo: "Tu web no explica por qué elegirte: pareces uno más.", arreglo: "Mensaje claro en la primera pantalla: qué haces y por qué tú.", peso: 3 },
    ],
  },
];

const BASE = TRAMOS.filter((t) => !t.extra);
const REACCION = [
  { t: "Aquí se te escapan clientes", tono: "mal" as const },
  { t: "Mejorable, pero tiene arreglo", tono: "medio" as const },
  { t: "No está mal", tono: "medio" as const },
  { t: "Muy bien, esto suma", tono: "bien" as const },
];
const ANOTADO: Record<string, string> = {
  sector: "Anotado: hablaremos de tu sector",
  facturacion: "Anotado. Queda entre nosotros",
  zona: "Perfecto, lo tendremos en cuenta",
  valor: "Así sabremos lo que vale cada cliente que te traigamos",
  marketing: "Anotado: con esto calculamos tu ahorro",
  inversion: "Y todo eso, entero para tus anuncios: sin comisiones",
  urge: "Esa será nuestra prioridad",
  cambiar: "Anotado",
  convence: "Gracias por la sinceridad",
  decide: "Perfecto",
  reunion: "¡Genial!",
};
const ANIMO = ["¡Primer tramo hecho!", "¡Vas como un cohete!", "¡Ya casi está!", "¡Último paso!"];

function etiquetaEncaje(r: Record<string, number>) {
  const t = (id: string) => {
    const q = TRAMOS.flatMap((x) => x.preguntas).find((x) => x.id === id);
    return q && r[id] !== undefined ? q.o[r[id]].t : "";
  };
  if (t("cambiar") === CAMBIAR[3] || t("convence") === CONVENCE[3]) return "SOLO CURIOSEA";
  let p = [3, 2, 0][CAMBIAR.indexOf(t("cambiar"))] ?? 0;
  p += [3, 2, 0][CONVENCE.indexOf(t("convence"))] ?? 0;
  p += [2, 1, 0][REUNION.indexOf(t("reunion"))] ?? 0;
  p += [2, 1, 0][DECIDE.indexOf(t("decide"))] ?? 0;
  p += [0, 1, 2, 3, 3, 3, 0][MARKETING.indexOf(t("marketing"))] ?? 0;
  if (t("inversion") && t("inversion") !== INVERSION[0]) p += 1;
  if (t("facturacion") && t("facturacion") !== FACTURACION[0]) p += 1;
  return p >= 10 ? "ENCAJE ALTO" : p >= 6 ? "ENCAJE MEDIO" : "ENCAJE BAJO";
}

const campo =
  "mt-1.5 w-full rounded-xl border-2 border-linea bg-white px-4 py-3 text-base text-tinta placeholder:text-gris/70 focus:border-noche focus:outline-none";

export default function TestIdoneidad() {
  const [resp, setResp] = useState<Record<string, number>>({});
  const [ti, setTi] = useState(0); // tramo actual (índice en TRAMOS); "datos" y "fin" van aparte
  const [qi, setQi] = useState(0);
  const [fase, setFase] = useState<"preguntas" | "elegir" | "datos" | "fin">("preguntas");
  const [conExtra, setConExtra] = useState(false);
  const [reaccion, setReaccion] = useState<{ t: string; tono: "bien" | "medio" | "mal" | "neutro" } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [fiesta, setFiesta] = useState<string | null>(null);
  const [envio, setEnvio] = useState<"" | "enviando" | "enviado" | "sin-canal" | "error">("");
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caja = useRef<HTMLDivElement>(null);

  const tramo = TRAMOS[ti];
  const preguntasVistas = conExtra ? TRAMOS : BASE;
  const total = preguntasVistas.reduce((a, t) => a + t.preguntas.length, 0);
  const hechas = Object.keys(resp).filter((k) => preguntasVistas.some((t) => t.preguntas.some((q) => q.id === k))).length;

  const subir = () => requestAnimationFrame(() => caja.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const celebrar = (texto: string) => {
    setFiesta(texto);
    setConfeti(Date.now());
    setTimeout(() => setFiesta(null), 1800);
  };

  const finTramo = () => {
    setQi(0);
    setReaccion(null);
    if (tramo.id === "buscas") {
      celebrar("¡Lo tienes!");
      setFase("elegir");
    } else if (tramo.extra) {
      celebrar("¡Nota afinada!");
      setFase("datos");
    } else {
      celebrar(ANIMO[ti % ANIMO.length]);
      setTi(ti + 1);
    }
    subir();
  };
  const siguiente = () => {
    setReaccion(null);
    if (qi < tramo.preguntas.length - 1) setQi(qi + 1);
    else finTramo();
  };
  const atras = () => {
    if (espera.current) clearTimeout(espera.current);
    setReaccion(null);
    if (fase === "datos") {
      setFase(conExtra ? "preguntas" : "elegir");
      if (conExtra) {
        setTi(TRAMOS.length - 1);
        setQi(TRAMOS[TRAMOS.length - 1].preguntas.length - 1);
      }
      return;
    }
    if (fase === "elegir") {
      setFase("preguntas");
      setTi(3);
      setQi(TRAMOS[3].preguntas.length - 1);
      return;
    }
    if (qi > 0) return setQi(qi - 1);
    if (ti > 0) {
      const previo = tramo.extra ? 3 : ti - 1;
      if (tramo.extra) return setFase("elegir");
      setTi(previo);
      setQi(TRAMOS[previo].preguntas.length - 1);
    }
  };
  const elegir = (q: Preg, j: number) => {
    if (espera.current) clearTimeout(espera.current);
    setResp((r) => ({ ...r, [q.id]: j }));
    if (tramo.puntua && q.peso) {
      const x = REACCION[q.o[j].v];
      setReaccion({ t: x.t, tono: x.tono });
    } else setReaccion({ t: ANOTADO[q.id] ?? "Anotado", tono: "neutro" });
    espera.current = setTimeout(siguiente, 950);
  };

  const r = useMemo(() => {
    const puntuan = TRAMOS.filter((t) => t.puntua && (conExtra || !t.extra));
    const areas = puntuan.map((t) => {
      const qs = t.preguntas.filter((q) => q.peso && resp[q.id] !== undefined);
      const max = qs.reduce((a, q) => a + 3 * (q.peso ?? 0), 0) || 1;
      const pts = qs.reduce((a, q) => a + q.o[resp[q.id]].v * (q.peso ?? 0), 0);
      return { id: t.id, titulo: t.titulo, nota: Math.round((pts / max) * 100) };
    });
    const todas = puntuan.flatMap((t) => t.preguntas).filter((q) => q.peso && resp[q.id] !== undefined);
    const max = todas.reduce((a, q) => a + 3 * (q.peso ?? 0), 0);
    const pts = todas.reduce((a, q) => a + q.o[resp[q.id]].v * (q.peso ?? 0), 0);
    const fallos = todas
      .filter((q) => q.o[resp[q.id]].v <= 1)
      .sort((a, b) => (b.peso ?? 0) * (3 - b.o[resp[b.id]].v) - (a.peso ?? 0) * (3 - a.o[resp[a.id]].v));
    return { areas, nota: max ? Math.round((pts / max) * 100) : 0, fallos };
  }, [resp, conExtra]);

  const respuestaTexto = () =>
    TRAMOS.filter((t) => conExtra || !t.extra)
      .map((t) => `— ${t.titulo} —\n` + t.preguntas.map((q) => `${q.p} ${resp[q.id] !== undefined ? q.o[resp[q.id]].t : "(sin contestar)"}`).join("\n"))
      .join("\n\n");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const encaje = etiquetaEncaje(resp);
    const texto =
      `Test de idoneidad completado.\n` +
      `Nombre y cargo: ${d.get("nombre")}\nEmpresa: ${d.get("empresa")}\nWeb: ${d.get("web") || "-"}\nDónde: ${d.get("ciudad")}\n` +
      `Teléfono: ${d.get("telefono")}\nCorreo: ${d.get("correo")}\nAlgo más: ${d.get("mas") || "-"}\n\n` +
      `Nota: ${r.nota}/100 (${r.areas.map((a) => `${a.titulo} ${a.nota}`).join(", ")})\n\n` +
      respuestaTexto() +
      (r.fallos.length ? `\n\nFallos principales:\n- ${r.fallos.slice(0, 8).map((q) => q.fallo).join("\n- ")}` : "");
    setEnvio("enviando");
    let ok = false;
    try {
      const res = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: `[${encaje}]\n\n${texto}`, encaje, correo: d.get("correo"), nombre: d.get("nombre"), trampa: d.get("sitio_web") }),
      });
      ok = res.ok;
    } catch {}
    setFase("fin");
    setConfeti(Date.now());
    subir();
    if (ok) return setEnvio("enviado");
    if (CONTACTO.whatsapp) {
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto.slice(0, 1800))}`, "_blank", "noopener");
      return setEnvio("enviado");
    }
    if (CONTACTO.correo) {
      window.location.href = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent("Test de idoneidad")}&body=${encodeURIComponent(texto.slice(0, 1800))}`;
      return setEnvio("enviado");
    }
    setEnvio("sin-canal");
  }

  useEffect(() => () => {
    if (espera.current) clearTimeout(espera.current);
  }, []);

  const color = (n: number) => (n >= 75 ? "bg-emerald-500" : n >= 45 ? "bg-estrella" : "bg-rose-500");
  const nivel =
    r.nota >= 75
      ? { t: "Tu marketing está en forma", d: "Buena base. Aun así, hay puntos donde ganar más clientes con lo mismo." }
      : r.nota >= 45
        ? { t: "Vas a medias", d: "Hay piezas que funcionan, pero se te escapan clientes en varios sitios. Tiene arreglo, y rápido." }
        : { t: "Hay muchísimo margen", d: "Ahora mismo dejas muchos clientes a tu competencia. Es justo donde antes se nota el cambio." };

  return (
    <div ref={caja} className="relative scroll-mt-28 text-tinta">
      {fiesta && typeof document !== "undefined" &&
        createPortal(
          <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-24 z-50 flex justify-center px-4">
            <div className="fiesta relative rounded-full bg-noche px-6 py-3 text-lg font-extrabold text-estrella shadow-2xl ring-2 ring-estrella">
              {fiesta}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <span key={i} aria-hidden="true" className="chispa absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-estrella" style={{ ["--ang" as string]: `${i * 45}deg` }} />
              ))}
            </div>
          </div>,
          document.body,
        )}
      <Confeti disparo={confeti} />

      {fase !== "fin" && (
        <div className="mb-5 rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-linea">
          <BarraEstrella
            avance={fase === "datos" ? 0.97 : hechas / total}
            texto={fase === "datos" ? "¡Último paso! Dinos a quién enviárselo" : hechas === 0 ? "Unos 5 minutos. La estrella te acompaña hasta la meta" : `¡Llevas ${hechas} de ${total}! Te quedan ${Math.max(total - hechas, 0)}`}
          />
        </div>
      )}

      {fase === "preguntas" && tramo && (() => {
        const q = tramo.preguntas[qi] ?? tramo.preguntas[0];
        const letras = "ABCDEFG";
        return (
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.55)] ring-1 ring-linea">
            <div className="relative overflow-hidden px-6 py-6 text-white sm:px-9 sm:py-7">
              <div aria-hidden="true" className="absolute inset-0">
                <VideoFondo key={tramo.id} nombre={tramo.video} alt="" />
              </div>
              <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br opacity-[0.8] ${tramo.color}`} />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-xl">
                  <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
                    {tramo.extra ? "Opcional" : `Parte ${ti + 1} de ${BASE.length}`}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold sm:text-3xl">{tramo.titulo}</p>
                  <p className="mt-1 text-white/90">{tramo.intro}</p>
                </div>
                <div aria-hidden="true" className="hidden gap-2 sm:flex">
                  {tramo.logos.map((l, i) => (
                    <span key={l} className="flota grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-lg" style={{ animationDelay: `${i * 0.35}s` }}>
                      <LogoMarca nombre={l} tam={26} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(ellipse_at_top_right,#eef2ff,transparent_60%)] p-5 sm:p-9">
              {qi === 0 && (
                <p className="aparece mb-5 flex items-start gap-2.5 rounded-2xl bg-estrella/25 px-4 py-3 text-sm font-bold">
                  <span aria-hidden="true" className="text-lg leading-none">★</span>
                  <span>{tramo.dato}</span>
                </p>
              )}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {tramo.preguntas.map((x, i) => (
                  <span key={x.id} className={`h-2.5 rounded-full transition-all ${i === qi ? "w-8 bg-estrella" : resp[x.id] !== undefined ? "w-2.5 bg-noche" : "w-2.5 bg-linea"}`} />
                ))}
                <span className="ml-2 text-sm font-bold text-gris">{qi + 1} de {tramo.preguntas.length}</span>
              </div>
              <fieldset key={q.id} className="entra mt-5">
                <legend className="flex items-start gap-3 text-xl font-extrabold sm:text-3xl">
                  {q.logo ? (
                    <span className="flota grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-linea sm:h-14 sm:w-14">
                      <LogoMarca nombre={q.logo} tam={28} />
                    </span>
                  ) : (
                    <span className="flota grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-noche text-lg font-extrabold text-estrella shadow-md sm:h-14 sm:w-14">{hechas + (resp[q.id] === undefined ? 1 : 0)}</span>
                  )}
                  <span className="pt-1">{q.p}</span>
                </legend>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  {q.o.map((o, j) => (
                    <Opcion key={o.t} letra={letras[j]} texto={o.t} color={COLOR_OPCION[j % COLOR_OPCION.length]} activa={resp[q.id] === j} onClick={() => elegir(q, j)} />
                  ))}
                </div>
              </fieldset>
              <div className={reaccion ? "mt-5" : "mt-2"}>{reaccion && <Reaccion texto={reaccion.t} tono={reaccion.tono} />}</div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {(ti > 0 || qi > 0) && (
                  <button type="button" onClick={atras} className="rounded-full px-4 py-2.5 font-bold text-gris hover:bg-niebla hover:text-tinta">
                    Atrás
                  </button>
                )}
                {resp[q.id] !== undefined && !reaccion && (
                  <button type="button" onClick={siguiente} className="rounded-full bg-estrella px-6 py-2.5 font-bold text-tinta hover:bg-estrella-2">
                    Siguiente
                  </button>
                )}
                {tramo.extra && (
                  <button type="button" onClick={() => { setFase("datos"); subir(); }} className="ml-auto rounded-full border border-linea px-5 py-2.5 text-sm font-bold text-gris hover:border-noche hover:text-tinta">
                    Terminar aquí
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {fase === "elegir" && (
        <div className="entra overflow-hidden rounded-[2rem] bg-noche p-7 text-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.7)] sm:p-10">
          <p className="text-sm font-bold text-estrella">¡Ya está lo importante!</p>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">¿Afinamos tu nota?</p>
          <p className="mt-3 max-w-xl text-white/85">Diez toques más sobre tu web, Google y tus anuncios. Un minuto. Es opcional: si prefieres, terminamos ya.</p>
          <div className="mt-6 max-w-xl"><Muestra oscuro /></div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => { setConExtra(true); setTi(TRAMOS.length - 1); setQi(0); setFase("preguntas"); subir(); }} className="rounded-full bg-estrella px-7 py-3.5 font-extrabold text-tinta hover:bg-estrella-2">
              Sí, afinar mi nota
            </button>
            <button type="button" onClick={() => { setFase("datos"); subir(); }} className="rounded-full border-2 border-white/40 px-7 py-3.5 font-bold hover:border-white">
              Terminar ya
            </button>
          </div>
          <button type="button" onClick={atras} className="mt-5 text-sm font-bold text-white/70 underline underline-offset-4 hover:text-white">
            Atrás
          </button>
        </div>
      )}

      {fase === "datos" && (
        <form onSubmit={enviar} className="entra overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.55)] ring-1 ring-linea">
          <div className="bg-noche px-6 py-6 text-white sm:px-9">
            <p className="text-sm font-bold text-estrella">Último paso</p>
            <p className="mt-1 text-2xl font-extrabold sm:text-3xl">¿A quién le enviamos tu resultado?</p>
            <p className="mt-1 text-white/85">Lo revisamos uno a uno y te contestamos en 48 horas laborables, encaje o no.</p>
            <div className="mt-5"><Muestra oscuro /></div>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-9">
            <label className="text-sm font-bold">
              Tu nombre y cargo
              <input name="nombre" required autoComplete="name" placeholder="Ej.: Ana López, directora" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Empresa
              <input name="empresa" required autoComplete="organization" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Teléfono
              <input name="telefono" required type="tel" autoComplete="tel" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Correo
              <input name="correo" required type="email" autoComplete="email" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Vuestra web <span className="font-normal text-gris">(si tenéis)</span>
              <input name="web" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Dónde estáis
              <input name="ciudad" required placeholder="Ciudad o provincia" className={campo} />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              ¿Algo más que debamos saber? <span className="font-normal text-gris">(opcional)</span>
              <textarea name="mas" rows={2} maxLength={1000} className={campo} />
            </label>
            <label className="hidden" aria-hidden="true">
              No rellenes esto
              <input name="sitio_web" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <button type="button" onClick={atras} className="rounded-full px-4 py-2.5 font-bold text-gris hover:bg-niebla hover:text-tinta">
                Atrás
              </button>
              <button type="submit" disabled={envio === "enviando"} className="flex-1 rounded-full bg-estrella px-7 py-4 text-lg font-extrabold text-tinta hover:bg-estrella-2 disabled:opacity-60 sm:flex-none">
                {envio === "enviando" ? "Enviando…" : "Ver mi resultado"}
              </button>
            </div>
            <p className="text-xs text-gris sm:col-span-2">
              Usamos tus datos solo para responderte. Más información en nuestra <Link href="/privacidad" className="underline">política de privacidad</Link>.
            </p>
          </div>
        </form>
      )}

      {fase === "fin" && (
        <div className="space-y-5" aria-live="polite">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="relative overflow-hidden rounded-[2rem] bg-noche p-7 text-white sm:p-9">
              {[[8, 12], [82, 8], [90, 40], [70, 70], [12, 75], [45, 6]].map(([x, y], i) => (
                <span key={i} aria-hidden="true" className="titila absolute h-2 w-2 rounded-full bg-estrella" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} />
              ))}
              <p className="text-sm text-white/70">Tu nota de marketing digital</p>
              <p className="mt-2 text-7xl font-extrabold leading-none text-estrella">
                {r.nota}
                <span className="text-3xl text-white/50"> / 100</span>
              </p>
              <p className="mt-4 text-2xl font-extrabold">{nivel.t}</p>
              <p className="mt-2 text-white/85">{nivel.d}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-linea sm:p-9">
              <p className="text-xl font-extrabold">Tu semáforo</p>
              <ul className="mt-5 space-y-4">
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
              {!conExtra && <p className="mt-4 text-sm text-gris">Tu web, Google y tus anuncios los miramos nosotros en el estudio, con datos reales.</p>}
            </div>
          </div>

          {r.fallos.length > 0 && (
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-linea sm:p-9">
              <p className="text-xl font-extrabold">Dónde se te escapan clientes, y cómo lo arreglaríamos</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {r.fallos.slice(0, 6).map((q) => (
                  <li key={q.id} className="rounded-2xl bg-niebla p-4">
                    <p className="flex gap-2.5 font-bold"><span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-500" />{q.fallo}</p>
                    <p className="mt-2 flex gap-2.5 text-[0.95rem] text-gris"><span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />{q.arreglo}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-[2rem] bg-estrella p-7 sm:p-9">
            {envio === "enviado" && (
              <>
                <p className="text-2xl font-extrabold">¡Recibido! Ahora nos toca a nosotros.</p>
                <p className="mt-2 text-lg">Revisamos tu caso y en 48 horas laborables te decimos si te preparamos tu estudio gratuito. Mientras, échale un vistazo a nuestros trabajos.</p>
              </>
            )}
            {envio === "sin-canal" && (
              <>
                <p className="text-2xl font-extrabold">Este es tu resultado.</p>
                <p className="mt-2 text-lg">Aún no hemos activado el envío en esta web de prueba, así que tus datos no se han enviado a ningún sitio.</p>
              </>
            )}
            <div className="mt-6 rounded-2xl bg-white/70 p-4"><Muestra /></div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/trabajos" className="rounded-full bg-noche px-6 py-3 font-bold text-white hover:bg-noche-2">Ver nuestros trabajos</Link>
              <Link href="/estudio-gratuito#estudio" className="rounded-full border-2 border-noche px-6 py-3 font-bold hover:bg-noche hover:text-white">Qué incluye el estudio</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
