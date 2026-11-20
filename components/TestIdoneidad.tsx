"use client";

import Link from "next/link";
import { leerAtribucion } from "@/lib/atribucion";
import { apuntarContacto, avisarGTM } from "@/components/ContadorVistas";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LogoMarca from "@/components/LogoMarca";
import Logo from "@/components/Logo";
import { COLOR_OPCION, Confeti, Opcion, Reaccion } from "@/components/JuegoTest";
import Image from "next/image";
import BotonDictado from "@/components/BotonDictado";
import { CONTACTO } from "@/lib/contenido";
import { GASTO, SECTORES, URGE } from "@/lib/testOrden";

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
      <p className={`text-sm font-bold ${oscuro ? "text-estrella" : "text-noche-3"}`}>Si podemos ayudarte, esto es lo que te preparamos gratis</p>
      <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {MUESTRA.map((x, i) => (
          <li key={x.src} className={`overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/10 ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
            <Image src={x.src} alt={`Guía de ejemplo: ${x.t.toLowerCase()}`} width={360} height={304} className="h-auto w-full" />
            <p className="truncate px-1.5 py-1 text-[0.62rem] font-bold text-tinta sm:text-xs">{x.t}</p>
          </li>
        ))}
      </ul>
      <p className={`mt-2 text-xs ${oscuro ? "text-white/60" : "text-gris"}`}>Guía de ejemplo de un despacho ficticio. La tuya, con tus datos y más de 25 apartados.</p>
    </div>
  );
}

// El único test de la web: el test de idoneidad.
// Una pregunta por pantalla, en tramos, con frases, datos curiosos y confeti.
// Sirve a la vez para dar al cliente su nota y para que sepamos si encaja (etiqueta interna en el correo).

type Opc = { t: string; v: number }; // v: 0 a 3 puntos (solo cuenta en tramos que puntúan)
type Preg = { id: string; p: string; ayuda?: string; o: Opc[]; fallo?: string; arreglo?: string; peso?: number; logo?: string };
type Tramo = { id: string; titulo: string; intro: string; dato: string; video: string; color: string; logos: string[]; puntua: boolean; preguntas: Preg[]; extra?: boolean };

const T = (...xs: string[]): Opc[] => xs.map((t) => ({ t, v: 0 }));
const SN = (si: string, medias: string, no: string): Opc[] => [
  { t: si, v: 3 },
  { t: medias, v: 1 },
  { t: no, v: 0 },
];

const CAMBIAR = ["Lo antes posible", "En los próximos tres meses", "Más adelante", "No tengo prisa, solo estoy mirando"];
const CONVENCE = ["Empezaríamos en cuanto podáis", "Lo hablaría con mi socio o la dirección", "Lo compararía con otras propuestas", "Solo quiero ver ideas"];
const DECIDE = ["Yo", "Lo decido con mi socio o la dirección", "Lo propongo y decide otra persona"];

const TRAMOS: Tramo[] = [
  {
    id: "primero",
    titulo: "Tu empresa",
    intro: "Tres preguntas y tus datos de contacto.",
    dato: "Todo lo que contestes es para preparar tu estudio. No lo compartimos con nadie.",
    video: "despacho",
    color: "from-[#24387a] to-[#0e1a3d]",
    logos: ["Google Maps", "Google", "LinkedIn"],
    puntua: false,
    preguntas: [
      { id: "urge", p: "¿Qué te gustaría mejorar primero?", ayuda: "Elige lo que más te preocupa ahora.", o: T(...URGE) },
      { id: "sector", p: "¿A qué se dedica tu empresa?", ayuda: "Elige la opción que mejor describa tu actividad principal.", o: T(...SECTORES) },
      { id: "gasto", p: "¿Cuánto gastas al mes en marketing, en total?", ayuda: "Agencias, herramientas y anuncios, todo junto. Con una cifra aproximada nos vale.", o: T(...GASTO) },
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
      { id: "t3", p: "Si alguien pide presupuesto y no contesta, ¿le hacéis seguimiento?", o: SN("Sí, automático", "A mano, cuando nos acordamos", "No"), fallo: "Los presupuestos sin respuesta se quedan ahí: sin seguimiento, se pierden ventas hechas.", arreglo: "Seguimientos por correo y WhatsApp que salen solos.", peso: 3, logo: "Gmail" },
      { id: "v1", p: "De cada 10 personas que piden presupuesto, ¿cuántas acaban comprando?", o: [{ t: "Más de 4", v: 3 }, { t: "Entre 2 y 4", v: 2 }, { t: "Menos de 2", v: 0 }, { t: "No lo sé", v: 0 }], fallo: "No sabes cuántos presupuestos cierras, o cierras pocos: ahí hay ventas que se escapan.", arreglo: "Medir el cierre de cada presupuesto y mejorar lo que hace que se caigan.", peso: 3 },
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
      { id: "w5", p: "¿Tu dominio, tu web y los accesos están a tu nombre?", o: SN("Sí, todo", "Una parte", "No lo sé"), fallo: "Tu web no es del todo tuya: si cambias de proveedor puedes perderla.", arreglo: "Dominio y cuentas a tu nombre desde el primer día.", peso: 2 },
      { id: "comision", p: "¿Te cobran comisión sobre lo que inviertes en anuncios?", o: [{ t: "No", v: 3 }, { t: "Sí, un porcentaje", v: 0 }, { t: "No lo sé", v: 1 }, { t: "No hago anuncios", v: 3 }], fallo: "Pagas comisión sobre tus anuncios: cuanto más inviertes, más pagas a la agencia.", arreglo: "Cuota fija: cero comisiones sobre lo que inviertas.", peso: 2 },
    ],
  },
  {
    id: "buscas",
    titulo: "Lo que buscas",
    intro: "La última parte. Así sabemos cómo ayudarte mejor.",
    dato: "Con esto afinamos el estudio: lo que te propondremos primero y cómo lo plantearíamos.",
    video: "equipo-celebra",
    color: "from-[#7c3aed] to-[#0e1a3d]",
    logos: ["Google", "ChatGPT", "Gemini"],
    puntua: false,
    preguntas: [
      { id: "cambiar", p: "¿Cuándo quieres cambiar?", o: T(...CAMBIAR) },
      { id: "convence", p: "Si el estudio te convence, ¿qué harías?", o: T(...CONVENCE) },
      { id: "decide", p: "¿Quién decide la contratación?", o: T(...DECIDE) },
    ],
  },
];

const BASE = TRAMOS.filter((t) => !t.extra);
const IDX_BUSCAS = TRAMOS.findIndex((t) => t.id === "buscas");
const REACCION = [
  { t: "Aquí se te escapan clientes", tono: "mal" as const },
  { t: "Mejorable, pero tiene arreglo", tono: "medio" as const },
  { t: "No está mal", tono: "medio" as const },
  { t: "Muy bien, esto suma", tono: "bien" as const },
];
const ANOTADO: Record<string, string> = {
  sector: "Anotado: hablaremos de tu sector",
  gasto: "Anotado. Con esto vemos cuánto podrías ahorrar",
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
  p += [2, 1, 0][DECIDE.indexOf(t("decide"))] ?? 0;
  p += [0, 1, 2, 5, 0][GASTO.indexOf(t("gasto"))] ?? 0;
  return p >= 9 ? "ENCAJE ALTO" : p >= 5 ? "ENCAJE MEDIO" : "ENCAJE BAJO";
}

const NOTA_PREGUNTAS = TRAMOS.filter((t) => !t.extra && t.id !== "primero").reduce((a, t) => a + t.preguntas.length, 0);

const campo =
  "mt-1.5 w-full rounded-xl border-2 border-linea bg-white px-4 py-3 text-base text-tinta placeholder:text-gris/70 focus:border-noche focus:outline-none";

export default function TestIdoneidad() {
  const [resp, setResp] = useState<Record<string, number>>({});
  const [ti, setTi] = useState(0); // tramo actual (índice en TRAMOS); "datos" y "fin" van aparte
  const [qi, setQi] = useState(0);
  const [fase, setFase] = useState<"preguntas" | "elegir" | "datos" | "capturado" | "fin">("preguntas");
  const [novedadesOk, setNovedadesOk] = useState(false);
  const pedirNovedades = () => {
    setNovedadesOk(true);
    fetch("/api/solicitud", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ soloNovedades: true, correo: datosRef.current?.correo, nombre: datosRef.current?.nombre }) }).catch(() => undefined);
  };
  const [conNota, setConNota] = useState(false); // true cuando ha contestado el resto y enseñamos su nota
  const datosRef = useRef<{ correo: string; nombre: string } | null>(null);
  // Recorrido anónimo (sin cookies ni datos personales): una pantalla vista, una respuesta, un campo vacío. Ver /mesa/test.
  const sesion = useRef("");
  const vistas = useRef(new Set<string>());
  const pantallaActual = useRef("urge");
  const paso = (tipo: string, p: string, valor = "") => {
    try {
      if (!sesion.current) sesion.current = ((typeof crypto !== "undefined" && crypto.randomUUID?.()) || `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`).replace(/-/g, "");
      const { fuente } = leerAtribucion();
      const disp = window.matchMedia("(pointer: coarse)").matches ? "movil" : "pc";
      navigator.sendBeacon?.("/api/test-paso", JSON.stringify({ tipo, sesion: sesion.current, paso: p, valor, fuente, disp }));
    } catch {}
  };
  const [conExtra, setConExtra] = useState(false);
  const [reaccion, setReaccion] = useState<{ t: string; tono: "bien" | "medio" | "mal" | "neutro" } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [fiesta, setFiesta] = useState<string | null>(null);
  const [envio, setEnvio] = useState<"" | "enviando" | "enviado" | "sin-canal" | "error">("");
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const masRef = useRef<HTMLTextAreaElement>(null);

  const tramo = TRAMOS[ti];
  const preguntasVistas = conExtra ? TRAMOS : BASE;
  const total = preguntasVistas.reduce((a, t) => a + t.preguntas.length, 0);
  const hechas = Object.keys(resp).filter((k) => preguntasVistas.some((t) => t.preguntas.some((q) => q.id === k))).length;

  const enAmpliacion = fase === "elegir" || (fase === "preguntas" && ti >= 1);
  const totalA = total - TRAMOS[0].preguntas.length;
  const hechasA = Math.max(hechas - TRAMOS[0].preguntas.length, 0);
  const subir = () => requestAnimationFrame(() => caja.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const celebrar = (texto: string) => {
    setFiesta(texto);
    setConfeti(Date.now());
    setTimeout(() => setFiesta(null), 1800);
  };

  const finTramo = () => {
    setQi(0);
    setReaccion(null);
    if (tramo.id === "primero") {
      setFase("datos");
    } else if (tramo.id === "buscas") {
      celebrar("¡Lo tienes!");
      terminarAmpliacion();
    } else if (tramo.extra) {
      celebrar("¡Nota afinada!");
      terminarAmpliacion();
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
      setFase("preguntas");
      setTi(0);
      setQi(TRAMOS[0].preguntas.length - 1);
      return;
    }
    if (fase === "elegir") {
      setFase("preguntas");
      setTi(IDX_BUSCAS);
      setQi(TRAMOS[IDX_BUSCAS].preguntas.length - 1);
      return;
    }
    if (qi > 0) return setQi(qi - 1);
    if (ti === 1) return setFase("capturado");
    if (ti > 0) {
      if (tramo.extra) return setFase("elegir");
      setTi(ti - 1);
      setQi(TRAMOS[ti - 1].preguntas.length - 1);
    }
  };
  const elegir = (q: Preg, j: number) => {
    if (espera.current) clearTimeout(espera.current);
    setResp((r) => ({ ...r, [q.id]: j }));
    paso("respuesta", q.id, String(j));
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

  // Primer envío: tres toques y los datos. Se guarda y avisa al momento; la nota llega después, si la persona quiere.
  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const encaje = "PRIMER CONTACTO";
    datosRef.current = { correo: String(d.get("correo") ?? ""), nombre: String(d.get("nombre") ?? "") };
    const primeras = TRAMOS[0].preguntas.map((q) => `${q.p} ${resp[q.id] !== undefined ? q.o[resp[q.id]].t : "(sin contestar)"}`).join("\n");
    const texto =
      `Test de idoneidad: PRIMER CONTACTO (datos y tres respuestas; si luego contesta el resto, llegará otro aviso con su nota).\n` +
      `Nombre y cargo: ${d.get("nombre")}\nEmpresa: ${d.get("empresa")}\nWeb: ${d.get("web") || "-"}\nDónde: ${d.get("ciudad")}\n` +
      `Teléfono: ${d.get("telefono") || "-"}\nCorreo: ${d.get("correo")}\nAlgo más: ${d.get("mas") || "-"}\n\n` +
      primeras;
    setEnvio("enviando");
    let ok = false;
    try {
      const res = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: `[${encaje}]\n\n${texto}`, encaje, correo: d.get("correo"), nombre: d.get("nombre"), empresa: d.get("empresa"), telefono: d.get("telefono"), novedades: false, trampa: d.get("sitio_web"), ...leerAtribucion(), pagina: window.location.pathname }),
      });
      ok = res.ok;
    } catch {}
    subir();
    if (ok) {
      setConfeti(Date.now());
      paso("envio", "datos", "ok");
      avisarGTM("test_enviado");
      setEnvio("enviado");
      return setFase("capturado");
    }
    paso("envio", "datos", "error");
    setFase("fin");
    if (CONTACTO.whatsapp) {
      apuntarContacto("contacto_wa");
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto.slice(0, 1800))}`, "_blank", "noopener");
      return setEnvio("enviado");
    }
    if (CONTACTO.correo) {
      window.location.href = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent("Test de idoneidad")}&body=${encodeURIComponent(texto.slice(0, 1800))}`;
      return setEnvio("enviado");
    }
    setEnvio("sin-canal");
  }

  // Segundo envío (opcional): las respuestas de después y la nota. Se añade a la misma solicitud y avisa con el encaje de verdad.
  async function terminarAmpliacion() {
    setConNota(true);
    setFase("fin");
    setConfeti(Date.now());
    subir();
    const c = datosRef.current;
    if (!c) return;
    const encaje = etiquetaEncaje(resp);
    const texto =
      `AMPLIACIÓN del test (esta persona ya había enviado sus datos).\n` +
      `Nota: ${r.nota}/100 (${r.areas.map((a) => `${a.titulo} ${a.nota}`).join(", ")})\n\n` +
      respuestaTexto() +
      (r.fallos.length ? `\n\nFallos principales:\n- ${r.fallos.slice(0, 8).map((q) => q.fallo).join("\n- ")}` : "");
    try {
      const res = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ampliacion: true, texto: `[${encaje}]\n\n${texto}`, encaje, correo: c.correo, nombre: c.nombre, ...leerAtribucion(), pagina: window.location.pathname }),
      });
      paso("ampliado", "fin", res.ok ? "ok" : "error");
    } catch {
      paso("ampliado", "fin", "error");
    }
  }

  // Pantalla que se está viendo, para apuntar cada una una vez y la última a la que llegó cada persona.
  const pantalla = fase === "preguntas" ? (tramo.preguntas[qi] ?? tramo.preguntas[0]).id : fase;
  useEffect(() => {
    pantallaActual.current = pantalla;
    if (vistas.current.has(pantalla)) return;
    vistas.current.add(pantalla);
    paso("vista", pantalla);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantalla]);
  useEffect(() => {
    const salida = new Set<string>();
    const al = () => {
      if (document.visibilityState !== "hidden" || salida.has(pantallaActual.current)) return;
      salida.add(pantallaActual.current);
      paso("salida", pantallaActual.current);
    };
    document.addEventListener("visibilitychange", al);
    return () => document.removeEventListener("visibilitychange", al);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {fase === "preguntas" && tramo && (() => {
        const q = tramo.preguntas[qi] ?? tramo.preguntas[0];
        const letras = "ABCDEFG";
        const enNota = ti >= 1;
        const etiquetaPaso = !enNota ? `Pregunta ${qi + 1} de ${tramo.preguntas.length}` : `Tu nota · pregunta ${Math.min(hechasA + (resp[q.id] === undefined ? 1 : 0), totalA)} de ${totalA}`;
        const avancePaso = !enNota ? (qi + (resp[q.id] === undefined ? 0 : 1)) / tramo.preguntas.length : Math.min(hechasA / Math.max(totalA, 1), 1);
        return (
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.55)] ring-1 ring-linea">
            <div className="bg-noche px-5 py-3 text-sm font-extrabold text-white sm:hidden">
              {tramo.extra ? "Para afinar tu nota" : ti === 0 ? "Tres preguntas y tus datos" : tramo.titulo}
            </div>
            <div className="hidden items-center justify-between gap-4 px-9 pt-7 sm:flex">
              <Logo chico />
              <p className="rounded-full bg-niebla px-3 py-1 text-xs font-bold text-gris">Sin compromiso · sin pedirte accesos</p>
            </div>

            <div className="bg-[radial-gradient(ellipse_at_top_right,#eef2ff,transparent_60%)] p-5 sm:p-9">
              {ti === 0 && (
                <p className="mb-4 text-[0.95rem] leading-snug text-gris">
                  <b className="text-tinta">Descubre qué puede estar fallando, mira cómo podría quedar tu web y conoce qué haríamos primero y cuánto costaría.</b> Sin llamadas comerciales ni accesos.
                </p>
              )}
              <div className="flex items-center gap-3 text-sm font-extrabold text-gris">
                <span className="shrink-0">{etiquetaPaso}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-linea" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(avancePaso * 100)}>
                  <div className="h-full rounded-full bg-estrella transition-[width] duration-500" style={{ width: `${avancePaso * 100}%` }} />
                </div>
              </div>
              <fieldset key={q.id} className="entra mt-5">
                <legend className="flex items-start gap-3 text-xl font-extrabold sm:text-3xl">
                  {q.logo && (
                    <span className="flota grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-linea sm:h-14 sm:w-14">
                      <LogoMarca nombre={q.logo} tam={28} />
                    </span>
                  )}
                  <span className="pt-1 text-2xl leading-tight sm:text-3xl">{q.p}</span>
                </legend>
                {q.ayuda && <p className="mt-2 text-[0.95rem] font-normal text-gris">{q.ayuda}</p>}
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  {q.o.map((o, j) => (
                    <Opcion key={o.t} letra={letras[j]} texto={o.t} color={COLOR_OPCION[j % COLOR_OPCION.length]} activa={resp[q.id] === j} onClick={() => elegir(q, j)} />
                  ))}
                </div>
              </fieldset>
              {qi === 0 && <p className="mt-4 hidden text-sm text-gris sm:block">{tramo.dato}</p>}
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
                  <button type="button" onClick={() => terminarAmpliacion()} className="ml-auto rounded-full border border-linea px-5 py-2.5 text-sm font-bold text-gris hover:border-noche hover:text-tinta">
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
          <p className="mt-3 max-w-xl text-white/85">Diez toques más sobre tu web, Google y tus anuncios. Es opcional: si prefieres, terminamos ya.</p>
          <div className="mt-6 hidden max-w-xl sm:block"><Muestra oscuro /></div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => { setConExtra(true); setTi(TRAMOS.length - 1); setQi(0); setFase("preguntas"); subir(); }} className="rounded-full bg-estrella px-7 py-3.5 font-extrabold text-tinta hover:bg-estrella-2">
              Sí, afinar mi nota
            </button>
            <button type="button" onClick={() => terminarAmpliacion()} className="rounded-full border-2 border-white/40 px-7 py-3.5 font-bold hover:border-white">
              Terminar ya
            </button>
          </div>
          <button type="button" onClick={atras} className="mt-5 text-sm font-bold text-white/70 underline underline-offset-4 hover:text-white">
            Atrás
          </button>
        </div>
      )}

      {fase === "capturado" && (
        <div className="entra overflow-hidden rounded-[2rem] bg-noche p-7 text-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.7)] sm:p-10">
          <p className="text-sm font-bold text-estrella">¡Recibido!</p>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">Tu solicitud ya está enviada.</p>
          <p className="mt-3 max-w-xl text-white/85">Te escribimos por correo en 48 horas laborables.</p>
          <p className="mt-5 max-w-xl text-white/85">
            <b className="text-white">Opcional:</b> si quieres, mientras tanto te damos <b className="text-white">tu nota de marketing digital</b> y te decimos dónde se te escapan clientes. Son {NOTA_PREGUNTAS} preguntas más, sin escribir, y nos ayudan a preparar mejor tu estudio.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => { setTi(1); setQi(0); setFase("preguntas"); subir(); }} className="rounded-full bg-estrella px-7 py-3.5 font-extrabold text-tinta hover:bg-estrella-2">
              {`Sí, quiero mi nota (${NOTA_PREGUNTAS} preguntas)`}
            </button>
            <button type="button" onClick={() => { setFase("fin"); subir(); }} className="rounded-full border-2 border-white/40 px-7 py-3.5 font-bold hover:border-white">
              No, gracias
            </button>
          </div>
          <div className="mt-6 border-t border-white/15 pt-5">
            <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${novedadesOk ? "border-estrella bg-white/10" : "border-white/30 hover:border-white/60"}`}>
              <input
                type="checkbox"
                name="novedades"
                checked={novedadesOk}
                disabled={novedadesOk}
                onChange={(e) => { if (e.target.checked) pedirNovedades(); }}
                className="peer sr-only"
              />
              <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-white/70 bg-white/5 text-transparent peer-checked:border-estrella peer-checked:bg-estrella peer-checked:text-tinta peer-focus-visible:ring-2 peer-focus-visible:ring-white">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
              </span>
              <span className="text-[0.95rem] leading-snug text-white/90">
                {novedadesOk ? (
                  <><b className="text-white">Hecho.</b> Te escribiremos con unos pocos consejos. Te das de baja con un clic desde cualquier correo.</>
                ) : (
                  <><b className="text-white">Quiero recibir unos pocos consejos por correo.</b> Marca la casilla si te interesa; te das de baja con un clic desde cualquier correo.</>
                )}
              </span>
            </label>
          </div>
        </div>
      )}

      {fase === "datos" && (
        <form onSubmit={enviar} onBlurCapture={(e) => { const t = e.target as unknown as HTMLInputElement; if (!t.name || t.name === "sitio_web") return; paso("campo", t.name, t.type === "checkbox" ? (t.checked ? "ok" : "vacio") : t.value.trim() ? "ok" : "vacio"); }} onInvalidCapture={(e) => paso("invalido", (e.target as unknown as HTMLInputElement).name)} className="entra overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.55)] ring-1 ring-linea">
          <div className="px-5 pt-5 sm:px-9 sm:pt-7">
            <div className="mb-5 hidden items-center justify-between gap-4 sm:flex">
              <Logo chico />
              <p className="rounded-full bg-niebla px-3 py-1 text-xs font-bold text-gris">Sin compromiso · sin pedirte accesos</p>
            </div>
            <div className="flex items-center gap-3 text-sm font-extrabold text-gris">
              <span className="shrink-0">Último paso</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-linea" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={100}>
                <div className="h-full w-full rounded-full bg-estrella" />
              </div>
            </div>
            <p className="mt-5 text-2xl font-extrabold sm:text-3xl">¿A qué correo te respondemos?</p>
            <p className="mt-1 text-gris">Revisamos tus respuestas y te contestamos por escrito en 48 horas laborables. Si podemos ayudarte, preparamos tu estudio en menos de una semana.</p>
            <ul className="mt-4 hidden flex-wrap gap-x-6 gap-y-2 text-sm font-bold sm:flex">
              {["Sin compromiso", "Sin llamadas comerciales", "Sin pedirte accesos"].map((t) => (
                <li key={t} className="flex items-center gap-2"><span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-white"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-9">
            <label className="text-sm font-bold">
              Tu nombre
              <input name="nombre" required autoComplete="name" placeholder="Ej.: Ana López" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Correo
              <input name="correo" required type="email" autoComplete="email" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Empresa
              <input name="empresa" required autoComplete="organization" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Dónde estáis
              <input name="ciudad" required placeholder="Ciudad o provincia" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Vuestra web <span className="font-normal text-gris">(si tenéis; nos ayuda a preparar tu revisión)</span>
              <input name="web" className={campo} />
            </label>
            <label className="text-sm font-bold">
              Teléfono <span className="font-normal text-gris">(opcional; te escribimos por correo)</span>
              <input name="telefono" type="tel" autoComplete="tel" className={campo} />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              ¿Algo más que debamos saber? <span className="font-normal text-gris">(opcional)</span>
              <textarea name="mas" ref={masRef} rows={2} maxLength={1000} className={campo} />
              <BotonDictado destino={masRef} className="mt-2 font-normal" />
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
                {envio === "enviando" ? "Enviando…" : "Solicitar mi estudio gratuito"}
              </button>
            </div>
            <p className="text-xs text-gris sm:col-span-2">
              Usamos tus datos y lo público de tu web y de tus perfiles solo para preparar tu estudio y escribirte sobre él. Lo ves en un enlace privado que no aparece en Google. Más información en nuestra <Link href="/privacidad" className="underline">política de privacidad</Link>.
            </p>
          </div>
        </form>
      )}

      {fase === "fin" && (
        <div className="space-y-5" aria-live="polite">
          {conNota && (<>
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

          </>)}

          <div className="rounded-[2rem] bg-estrella p-7 sm:p-9">
            {envio === "enviado" && (
              <>
                <p className="text-2xl font-extrabold">¡Recibido! Ahora nos toca a nosotros.</p>
                <p className="mt-2 text-lg"><b>En 48 horas laborables te decimos si podemos ayudarte.</b> Mientras, mira nuestros trabajos.</p>
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
