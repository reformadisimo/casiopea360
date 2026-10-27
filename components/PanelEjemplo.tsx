"use client";

// Panel de control de ejemplo. TODOS LOS DATOS SON INVENTADOS y se dice en pantalla.
// En un cliente real cada bloque se alimenta de su fuente: la web (contactos, chat, herramientas),
// Google Analytics 4, Search Console, Google Ads, Meta, la ficha de Google, Google Trends, Semrush,
// Instagram, LinkedIn, TikTok, Resend (correos), PageSpeed, Clarity y Vercel. Todo pasa por Tag Manager.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LogoMarca from "@/components/LogoMarca";
import { EtiquetaQuien, Glosa, type Quien } from "@/components/GlosaPanel";
import { Herramientas360, IndiceValor, Mandos } from "@/components/PanelMandos";
import { FilaLuces, GRUPOS_MODULOS, GuiaInicio, IndiceLateral, Migas, PaginaModulo, Reloj, TarjetaGrupo, TarjetaModulo, hashDe, type Modulo, type Vista } from "@/components/PanelModulos";


const LOGO: Record<string, string> = {
  "Google Analytics": "google-analytics-icono.png",
  "Search Console": "google-search-console.png",
  "Tag Manager": "googletagmanager.svg",
  "Google Ads": "google-ads-icono.png",
  "Ficha de Google": "google-business-profile-icono.png",
  Meta: "meta.svg",
  Facebook: "facebook.png",
  Instagram: "instagram.jpg",
  LinkedIn: "linkedin.svg",
  TikTok: "tiktok.png",
  YouTube: "youtube.svg",
  WhatsApp: "whatsapp-business.jpg",
  Resend: "resend.svg",
  Semrush: "semrush.svg",
  PageSpeed: "pagespeedinsights.svg",
  Vercel: "vercel.svg",
  ChatGPT: "openai.svg",
  Gemini: "googlegemini.svg",
  Claude: "claude.svg",
};

function Logo({ nombre, tam = 26 }: { nombre: string; tam?: number }) {
  const f = LOGO[nombre];
  if (!f) {
    const bing = /Bing|Microsoft/.test(nombre);
    return (
      <span
        className={`grid shrink-0 place-items-center rounded-lg font-extrabold ${bing ? "text-white" : "bg-noche text-estrella"}`}
        style={{ width: tam, height: tam, fontSize: tam * (bing ? 0.6 : 0.42), background: bing ? "linear-gradient(135deg,#00b294,#0078d4)" : undefined }}
        aria-hidden="true"
      >
        {bing ? "b" : nombre.slice(0, 2)}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/logos/herramientas/${f}`} alt="" width={tam} height={tam} className="shrink-0 rounded-md object-contain" loading="lazy" />;
}

const CONECTADO: [string, string][] = [
  ["Tag Manager", "Todas las etiquetas"],
  ["Google Analytics", "Visitas y contactos"],
  ["Search Console", "Búsquedas en Google"],
  ["Google Ads", "Anuncios en Google"],
  ["Meta", "Píxel y anuncios"],
  ["Ficha de Google", "Llamadas y reseñas"],
  ["Google Trends", "Qué se busca"],
  ["Bing Webmaster", "Búsquedas en Bing"],
  ["Microsoft Ads", "Anuncios en Bing"],
  ["Ficha de Bing", "Mapa de Bing"],
  ["Semrush", "Posiciones"],
  ["Instagram", "Seguidores"],
  ["LinkedIn", "Empresas"],
  ["TikTok", "Vídeos"],
  ["WhatsApp", "Mensajes"],
  ["CRM", "Tus clientes"],
  ["Resend", "Correos"],
  ["Clarity", "Mapas de calor"],
  ["PageSpeed", "Velocidad"],
  ["ChatGPT", "Visibilidad IA"],
  ["Vercel", "Web y copias"],
];

// Datos de ejemplo: una empresa inventada de climatización en Madrid.
const CONTACTOS_30 = [4, 3, 6, 5, 2, 1, 7, 6, 5, 8, 6, 3, 2, 7, 9, 6, 10, 8, 4, 3, 9, 11, 8, 12, 10, 5, 4, 11, 13, 10];
const VISITAS_30 = [210, 180, 260, 240, 120, 110, 290, 280, 250, 330, 310, 150, 130, 340, 370, 320, 400, 350, 190, 160, 410, 440, 380, 470, 430, 220, 180, 460, 500, 450];

const ORIGEN: [string, number, string][] = [
  ["Google sin pagar", 31, "#2f6fe0"],
  ["Anuncios de Google", 27, "#ffc53d"],
  ["Anuncios de Instagram y Facebook", 14, "#c13584"],
  ["Ficha de Google (mapa)", 12, "#1fa463"],
  ["ChatGPT y otras IA", 6, "#8b5cf6"],
  ["Correos de seguimiento", 6, "#ff7a45"],
  ["Bing (sin pagar y anuncios)", 3, "#00a3a3"],
  ["Otros", 1, "#9aa3bd"],
];

const EMBUDO: [string, number, string][] = [
  ["Visitas a la web", 8640, "Gente que ha entrado este mes"],
  ["Usan una herramienta", 1210, "Calculadora de precio, test o configurador"],
  ["Dejan sus datos", 312, "Formulario, WhatsApp, llamada o chat"],
  ["Piden presupuesto", 168, "Con visita o medidas"],
];

const LEADS: { nombre: string; tema: string; origen: string; canal: string; cuando: string; estado: "Nuevo" | "Llamado" | "Presupuesto enviado" | "Cliente" }[] = [
  { nombre: "L. M.", tema: "Aerotermia para un chalet", origen: "Google Ads · campaña Aerotermia", canal: "Formulario", cuando: "Hace 9 min", estado: "Nuevo" },
  { nombre: "Comunidad Av. Europa 14", tema: "Climatización del portal", origen: "Google sin pagar · artículo de comunidades", canal: "Llamada", cuando: "Hoy, 09:20", estado: "Llamado" },
  { nombre: "J. R.", tema: "Split en dos dormitorios", origen: "Instagram · reel del verano", canal: "WhatsApp", cuando: "Ayer", estado: "Presupuesto enviado" },
  { nombre: "Oficinas Grupo Norte", tema: "Mantenimiento anual", origen: "ChatGPT · recomendó la empresa", canal: "Formulario", cuando: "Ayer", estado: "Presupuesto enviado" },
  { nombre: "A. G.", tema: "Caldera que no arranca", origen: "Ficha de Google · botón de llamar", canal: "Llamada", cuando: "Lunes", estado: "Cliente" },
  { nombre: "M. T.", tema: "Suelo radiante", origen: "Correo de seguimiento n.º 4", canal: "Formulario", cuando: "Lunes", estado: "Cliente" },
];

// El recorrido completo de un cliente, paso a paso: lo que permite saber exactamente de dónde viene.
const RECORRIDO: [string, string, string][] = [
  ["Lunes 6, 22:14", "Ve un anuncio en Instagram", "Campaña «Aerotermia, ahorra en la factura». Lo registra el píxel de Meta."],
  ["Lunes 6, 22:15", "Entra en la web desde el móvil", "Llega con su etiqueta de campaña (UTM): sabemos qué anuncio exacto pulsó."],
  ["Lunes 6, 22:19", "Usa la calculadora de ahorro", "Lo registra Tag Manager como evento «calculadora usada»."],
  ["Miércoles 8, 10:02", "Vuelve buscando en Google", "Busca la marca. Search Console y Analytics lo unen a su primera visita."],
  ["Miércoles 8, 10:06", "Pide presupuesto", "Formulario enviado: Analytics, Google Ads y Meta reciben la conversión."],
  ["Miércoles 8, 10:06", "Recibe la respuesta al momento", "Correo automático de bienvenida y aviso a tu comercial por WhatsApp."],
  ["Viernes 10, 18:30", "Abre el correo 2 de 5", "«Cómo funciona la aerotermia en tu casa». Lo registra Resend."],
  ["Martes 14, 12:00", "Firma el presupuesto", "Marcado como cliente: 9.400 €. El anuncio de Instagram se lleva el mérito."],
];

const CAMPANAS = [
  { nombre: "Aerotermia", inversion: 980, clics: 702, contactos: 38, clientes: 9 },
  { nombre: "Aire acondicionado", inversion: 860, clics: 655, contactos: 31, clientes: 7 },
  { nombre: "Mantenimiento empresas", inversion: 420, clics: 188, contactos: 12, clientes: 4 },
  { nombre: "Marca (tu nombre)", inversion: 90, clics: 240, contactos: 14, clientes: 3 },
];
const META_ADS = { inversion: 640, alcance: 61200, clics: 1480, contactos: 44, clientes: 8 };

const BUSQUEDAS: [string, number, number, number][] = [
  ["aerotermia madrid", 2400, 4, 9],
  ["instalación aire acondicionado madrid", 1900, 6, 14],
  ["empresa climatización madrid", 880, 3, 7],
  ["precio aerotermia chalet", 720, 2, 5],
  ["mantenimiento aire acondicionado oficinas", 390, 5, 18],
  ["suelo radiante precio m2", 1300, 8, 21],
];

// Google Trends: interés por "aire acondicionado" en Madrid, últimos 12 meses (0-100).
const TENDENCIA = [22, 18, 20, 31, 48, 79, 100, 92, 51, 30, 24, 21];
const MESES_12 = ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct"];


const REDES: { red: string; serie: number[]; color: string; extra: string }[] = [
  { red: "Instagram", serie: [1200, 1260, 1330, 1390, 1470, 1580, 1690, 1810, 1950, 2110, 2260, 2430], color: "#c13584", extra: "Reel más visto: «Así se instala una aerotermia en un día», 48.000 reproducciones" },
  { red: "LinkedIn", serie: [410, 418, 430, 445, 461, 480, 497, 515, 540, 566, 590, 621], color: "#0a66c2", extra: "2 publicaciones para administradores de fincas este mes" },
  { red: "Facebook", serie: [880, 884, 891, 899, 905, 914, 922, 931, 941, 950, 962, 975], color: "#1877f2", extra: "61.200 personas alcanzadas con anuncios en Madrid" },
  { red: "TikTok", serie: [0, 0, 40, 120, 260, 410, 600, 820, 1100, 1380, 1700, 2050], color: "#111111", extra: "Cuenta nueva: 2.050 seguidores en 10 semanas" },
];

const CORREOS: [string, number][] = [
  ["Hemos recibido tu petición", 81],
  ["Cómo funciona la aerotermia en tu casa", 63],
  ["Lo que ahorran nuestros clientes", 58],
  ["Las ayudas que puedes pedir", 66],
  ["¿Te preparamos el presupuesto?", 52],
];

const HERRAMIENTAS: [string, number][] = [
  ["Calculadora de ahorro con aerotermia", 512],
  ["Configurador de aire acondicionado", 344],
  ["Test: ¿qué sistema te conviene?", 201],
  ["Simulador de ayudas", 153],
];

const ETIQUETAS: { nombre: string; que: string; para: string }[] = [
  { nombre: "Google Analytics", que: "Cuenta cada visita y cada contacto", para: "Saber cuánta gente entra, por dónde y qué hace antes de escribirte." },
  { nombre: "Google Ads", que: "Etiqueta de conversión de Google", para: "Que Google sepa qué anuncio trajo cada contacto y enseñe más los que funcionan." },
  { nombre: "Meta", que: "Píxel y API de conversiones de Meta", para: "Lo mismo en Instagram y Facebook, también cuando el navegador bloquea cookies." },
  { nombre: "LinkedIn", que: "Etiqueta de LinkedIn", para: "Medir los contactos de empresas que llegan desde LinkedIn." },
  { nombre: "TikTok", que: "Píxel de TikTok", para: "Medir lo que traen los vídeos y anuncios de TikTok." },
  { nombre: "Microsoft Ads", que: "Etiqueta UET de Microsoft", para: "Medir los contactos que llegan desde los anuncios de Bing." },
  { nombre: "Clarity", que: "Mapas de calor y grabaciones anónimas", para: "Ver dónde pulsa la gente y dónde se atasca, para arreglarlo." },
  { nombre: "Resend", que: "Correos con seguimiento", para: "Saber qué correos se abren y cuáles traen clientes." },
  { nombre: "WhatsApp", que: "Botón con su propio evento", para: "Contar cada pulsación de WhatsApp y llamada desde la web." },
];

const ACTIVIDAD: [string, string, string][] = [
  ["Hoy, 10:42", "Web", "Movido arriba el botón de presupuesto en la página de aerotermia: en Clarity vimos que la mitad no llegaba a verlo."],
  ["Hoy, 09:15", "Anuncios", "Quitada la palabra «aire acondicionado barato»: traía curiosos, no clientes. Ahorro: 120 € al mes."],
  ["Ayer, 18:30", "Reseñas", "Contestadas 4 reseñas nuevas, con tu visto bueno en la de 3 estrellas."],
  ["Ayer, 12:00", "Blog", "Publicado: «Aerotermia o aire acondicionado: qué te conviene en Madrid»."],
  ["Ayer, 10:00", "Redes", "Montado y programado el reel de la instalación en Las Rozas."],
  ["Lunes, 08:00", "Panel", "Actualizado con los datos de la semana. Ya lo tienes en tu panel, sin esperar a ningún informe."],
  ["Domingo", "Tendencias", "Google Trends avisa: las búsquedas de aire acondicionado suben desde marzo. Preparamos la campaña de primavera."],
  ["Viernes", "Medición", "Añadido el evento «configurador terminado» en Tag Manager."],
  ["Jueves", "IA", "Actualizada la información para las IA con tus nuevas zonas de trabajo."],
];

const EVENTOS: [string, string, string][] = [
  ["visita", "Nueva visita desde Google", "Lee «¿Cuánto cuesta una aerotermia?»"],
  ["herramienta", "Alguien usa la calculadora de ahorro", "Chalet de 180 m² en Pozuelo"],
  ["visita", "Nueva visita desde un anuncio", "Campaña Aerotermia, en el móvil"],
  ["whatsapp", "Pulsación en WhatsApp", "Desde la página de aire acondicionado"],
  ["correo", "Correo abierto", "«Las ayudas que puedes pedir»"],
  ["visita", "Nueva visita desde Instagram", "Reel de la instalación en un día"],
  ["llamada", "Llamada desde la ficha de Google", "Botón de llamar del mapa"],
  ["chat", "Conversación con el asistente", "Pregunta por el mantenimiento anual"],
  ["visita", "Nueva visita desde ChatGPT", "Página de empresa"],
  ["contacto", "Nueva petición de presupuesto", "Formulario · Aerotermia · Google Ads"],
];

type Estado = "Recibida" | "En curso" | "Esperando tu aprobación" | "Hecha";
type Peticion = { id: number; que: string; area: string; pedida: string; prometida: string; estado: Estado; entregada?: string };
const PETICIONES_INICIALES: Peticion[] = [
  { id: 1, que: "Banner de la campaña de aerotermia para Instagram", area: "Diseño", pedida: "Hoy, 09:10", prometida: "Mañana, 09:10", estado: "Esperando tu aprobación" },
  { id: 2, que: "Página nueva: mantenimiento para comunidades", area: "Web", pedida: "Ayer, 17:40", prometida: "Lunes, 17:40", estado: "En curso" },
  { id: 3, que: "Subir el presupuesto de la campaña de aire acondicionado", area: "Anuncios", pedida: "Ayer, 12:05", prometida: "Hoy, 12:05", estado: "Hecha", entregada: "Ayer, 13:20" },
  { id: 4, que: "Artículo: ayudas para aerotermia en 2027", area: "Contenido", pedida: "Lunes", prometida: "Miércoles", estado: "Esperando tu aprobación" },
  { id: 5, que: "Conectar el formulario con el CRM del equipo comercial", area: "Automatización", pedida: "Lunes", prometida: "Viernes 23 (proyecto)", estado: "En curso" },
  { id: 6, que: "Cambiar el horario de agosto en la ficha de Google", area: "Google", pedida: "Lunes, 10:00", prometida: "Lunes, 18:00", estado: "Hecha", entregada: "Lunes, 10:25" },
  { id: 7, que: "Nuevo anuncio de radio para la campaña de verano", area: "Radio", pedida: "Viernes", prometida: "Fecha cerrada: 15 de mayo", estado: "En curso" },
];
const COLOR_ESTADO: Record<Estado, string> = {
  Recibida: "bg-sky-100 text-sky-800",
  "En curso": "bg-violet-100 text-violet-800",
  "Esperando tu aprobación": "bg-estrella/40 text-tinta",
  Hecha: "bg-emerald-100 text-emerald-800",
};
const DOCUMENTOS: [string, string][] = [
  ["Factura de septiembre", "Factura"],
  ["Factura de agosto", "Factura"],
];

// CRM de ejemplo: cada contacto entra solo con su origen y avanza por fases hasta cliente.
const FASES = ["Nuevo", "Contactado", "Presupuesto enviado", "Negociando", "Cliente", "No sigue"] as const;
type Fase = (typeof FASES)[number];
type Ficha = { id: number; nombre: string; tema: string; origen: string; valor: number; fase: Fase; seguimiento: string; canal: "WhatsApp" | "Llamada" | "Correo"; historia: [string, string][] };
const FICHAS_INICIALES: Ficha[] = [
  { id: 1, nombre: "L. M.", tema: "Aerotermia para un chalet", origen: "Google Ads · Aerotermia", valor: 9400, fase: "Nuevo", seguimiento: "Hoy, en 5 minutos", canal: "Llamada", historia: [["Hoy, 10:31", "Entra solo desde el formulario de la web"], ["Hoy, 10:29", "Usa la calculadora de ahorro"], ["Hoy, 10:24", "Llega desde un anuncio de Google"]] },
  { id: 2, nombre: "Comunidad Av. Europa 14", tema: "Climatización del portal", origen: "Google sin pagar", valor: 18600, fase: "Contactado", seguimiento: "Mañana, 10:00", canal: "Correo", historia: [["Ayer, 12:10", "Llamada: quieren visita la semana que viene"], ["Ayer, 09:20", "Llama desde la ficha de Google"]] },
  { id: 3, nombre: "J. R.", tema: "Split en dos dormitorios", origen: "Instagram · reel", valor: 2900, fase: "Presupuesto enviado", seguimiento: "Hoy, 17:00", canal: "WhatsApp", historia: [["Lunes", "Presupuesto enviado: 2.900 €"], ["Lunes", "Visita hecha"], ["Viernes", "Escribe por WhatsApp desde Instagram"]] },
  { id: 4, nombre: "Oficinas Grupo Norte", tema: "Mantenimiento anual", origen: "ChatGPT", valor: 7200, fase: "Negociando", seguimiento: "Jueves, 12:00", canal: "Llamada", historia: [["Martes", "Piden ajustar el precio de la segunda sede"], ["Lunes", "Presupuesto enviado: 7.200 €/año"], ["Jueves", "Llegan desde ChatGPT a la página de empresa"]] },
  { id: 5, nombre: "A. G.", tema: "Caldera que no arranca", origen: "Ficha de Google", valor: 1450, fase: "Cliente", seguimiento: "En 15 días: pedir reseña", canal: "WhatsApp", historia: [["Miércoles", "Firmado: 1.450 €"], ["Lunes", "Llamada desde el mapa de Google"]] },
  { id: 6, nombre: "M. T.", tema: "Suelo radiante", origen: "Seguimiento n.º 3", valor: 11800, fase: "Cliente", seguimiento: "En 6 meses: revisión", canal: "Correo", historia: [["Martes", "Firmado: 11.800 €"], ["Hace 3 semanas", "Recibe el seguimiento n.º 3 y vuelve a escribir"], ["Hace 5 semanas", "Pide presupuesto y se enfría"]] },
  { id: 7, nombre: "P. S.", tema: "Aire acondicionado en tienda", origen: "Anuncios de Instagram", valor: 4300, fase: "No sigue", seguimiento: "En marzo: volver a escribir", canal: "WhatsApp", historia: [["Viernes", "No sigue: lo deja para primavera"], ["Lunes", "Presupuesto enviado: 4.300 €"]] },
];
const COLOR_FASE: Record<Fase, string> = {
  Nuevo: "bg-sky-100 text-sky-800",
  Contactado: "bg-indigo-100 text-indigo-800",
  "Presupuesto enviado": "bg-violet-100 text-violet-800",
  Negociando: "bg-estrella/40 text-tinta",
  Cliente: "bg-emerald-100 text-emerald-800",
  "No sigue": "bg-niebla text-gris",
};
const LOGO_CANAL: Record<Ficha["canal"], string> = { WhatsApp: "WhatsApp", Llamada: "Ficha de Google", Correo: "Gmail" };

const MESES = ["May", "Jun", "Jul", "Ago", "Sep", "Oct"];
// Lo variable de cada mes: inversión en anuncios, vídeo profesional y notas de prensa (opcionales).
const GASTO_MES: { google: number; meta: number; video: number; prensa: number; clientes: number; contactos: number }[] = [
  { google: 1800, meta: 400, video: 0, prensa: 0, clientes: 22, contactos: 168 },
  { google: 2100, meta: 500, video: 900, prensa: 0, clientes: 29, contactos: 222 },
  { google: 2300, meta: 600, video: 0, prensa: 450, clientes: 34, contactos: 258 },
  { google: 1500, meta: 300, video: 0, prensa: 0, clientes: 21, contactos: 160 },
  { google: 2250, meta: 600, video: 0, prensa: 0, clientes: 37, contactos: 281 },
  { google: 2350, meta: 640, video: 0, prensa: 0, clientes: 41, contactos: 312 },
];

const num = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const eur = (n: number) => `${num(n)} €`;

function Contador({ valor, formato = num }: { valor: number; formato?: (n: number) => string }) {
  const [v, setV] = useState(valor);
  const anterior = useRef(valor);
  useEffect(() => {
    const desde = anterior.current === valor ? 0 : anterior.current;
    anterior.current = valor;
    const inicio = performance.now();
    let id = 0;
    const paso = (t: number) => {
      const p = Math.min(1, (t - inicio) / 800);
      setV(Math.round(desde + (valor - desde) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [valor]);
  return <>{formato(v)}</>;
}

// Caja con su explicación «para dummies» detrás del botón de interrogación.
function Caja({ titulo, fuente, ayuda, children, className = "", quien = "nosotros" }: { titulo: string; fuente?: string; ayuda?: string; children: React.ReactNode; className?: string; quien?: Quien }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <section className={`min-w-0 rounded-3xl border border-linea bg-white p-5 sm:p-7 ${className}`}>
      <EtiquetaQuien quien={quien} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-lg font-extrabold sm:text-xl">{titulo}</h2>
        <div className="flex items-center gap-2">
          {fuente && <span className="rounded-full bg-niebla px-3 py-1 text-xs font-bold text-gris">{fuente}</span>}
          {ayuda && (
            <button
              type="button"
              aria-expanded={abierta}
              aria-label={`Qué significa: ${titulo}`}
              onClick={() => setAbierta(!abierta)}
              className={`grid h-7 w-7 place-items-center rounded-full text-sm font-extrabold ${abierta ? "bg-noche text-estrella" : "bg-estrella/25 text-tinta hover:bg-estrella"}`}
            >
              ?
            </button>
          )}
        </div>
      </div>
      <Glosa textos={[titulo, fuente]} className="mt-2" />
      {abierta && ayuda && <p className="mt-3 rounded-2xl bg-estrella/15 p-4 text-[0.95rem]">{ayuda}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Grafico({ barras, linea }: { barras: number[]; linea: number[] }) {
  const [sel, setSel] = useState<number | null>(null);
  const [verBarras, setVerBarras] = useState(true);
  const [verLinea, setVerLinea] = useState(true);
  const max = Math.max(...barras);
  const maxL = Math.max(...linea);
  const w = 600;
  const h = 190;
  const paso = w / barras.length;
  const puntos = linea.map((v, i) => `${i * paso + paso / 2},${h - 18 - (v / maxL) * (h - 44)}`).join(" ");
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Contactos y visitas de los últimos 30 días (ejemplo)" onMouseLeave={() => setSel(null)}>
        {verBarras && barras.map((v, i) => {
          const alto = (v / max) * (h - 44);
          return (
            <g key={i} onMouseEnter={() => setSel(i)} onClick={() => setSel(i)}>
              <rect x={i * paso} y={0} width={paso} height={h - 18} fill="transparent" />
              <rect x={i * paso + 3} y={h - 18 - alto} width={paso - 6} height={alto} rx={4} fill="#ffc53d" opacity={sel === null || sel === i ? 1 : 0.35} className="pn-barra" style={{ animationDelay: `${i * 20}ms` }} />
            </g>
          );
        })}
        {verLinea && <polyline points={puntos} fill="none" stroke="#24387a" strokeWidth={2.5} strokeLinejoin="round" className="pn-trazo" />}
        <line x1={0} y1={h - 18} x2={w} y2={h - 18} stroke="#d9deeb" />
        <text x={0} y={h - 3} fontSize={11} fill="#535c7a">Hace 30 días</text>
        <text x={w} y={h - 3} fontSize={11} fill="#535c7a" textAnchor="end">Hoy</text>
      </svg>
      <p className="mt-2 min-h-[1.5rem] text-sm text-gris">
        {sel === null ? (
          "Pasa el dedo o el ratón por las barras para ver cada día."
        ) : (
          <>
            <b className="text-tinta">{sel === barras.length - 1 ? "Hoy" : `Hace ${barras.length - 1 - sel} días`}</b>: {barras[sel]} contactos y {num(linea[sel])} visitas
          </>
        )}
      </p>
      <div className="mt-1 flex flex-wrap gap-3 text-sm" role="group" aria-label="Qué mostrar en el gráfico">
        <button type="button" aria-pressed={verBarras} onClick={() => setVerBarras((v) => !v)} className={`flex items-center gap-2 rounded-full border px-3 py-1 font-bold ${verBarras ? "border-noche bg-white" : "border-linea text-gris line-through"}`}><span className="h-3 w-3 rounded bg-estrella" />Contactos</button>
        <button type="button" aria-pressed={verLinea} onClick={() => setVerLinea((v) => !v)} className={`flex items-center gap-2 rounded-full border px-3 py-1 font-bold ${verLinea ? "border-noche bg-white" : "border-linea text-gris line-through"}`}><span className="h-0.5 w-4 bg-noche-3" />Visitas</button>
      </div>
    </div>
  );
}

function Rosco({ datos, centro, sub }: { datos: [string, number, string][]; centro: string; sub: string }) {
  const [sel, setSel] = useState<number | null>(null);
  const total = datos.reduce((a, [, v]) => a + v, 0);
  let acum = 0;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[150px_1fr]">
      <svg viewBox="0 0 140 140" className="mx-auto w-40" role="img" aria-label={sub}>
        {datos.map(([n, v, color], i) => {
          const largo = (v / total) * c;
          const el = (
            <circle key={n} cx={70} cy={70} r={r} fill="none" stroke={color} strokeWidth={sel === i ? 26 : 22} strokeDasharray={`${largo} ${c - largo}`} strokeDashoffset={-acum} transform="rotate(-90 70 70)" onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)} className="transition-all" />
          );
          acum += largo;
          return el;
        })}
        <text x={70} y={68} textAnchor="middle" fontSize={sel === null ? 24 : 26} fontWeight={800} fill="#141c33">{sel === null ? centro : `${datos[sel][1]} %`}</text>
        <text x={70} y={87} textAnchor="middle" fontSize={10} fill="#535c7a">{sel === null ? sub : "de los contactos"}</text>
      </svg>
      <ul className="space-y-2 text-sm">
        {datos.map(([n, v, color], i) => (
          <li key={n} onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)} className={`flex items-center justify-between gap-3 rounded-lg px-2 py-1 ${sel === i ? "bg-niebla" : ""}`}>
            <span className="flex items-center gap-2"><span className="h-3 w-3 shrink-0 rounded-full" style={{ background: color }} />{n}</span>
            <b>{v} %</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Linea({ serie, color, alto = 56 }: { serie: number[]; color: string; alto?: number }) {
  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const w = 240;
  const p = serie.map((v, i) => `${(i / (serie.length - 1)) * w},${alto - 4 - ((v - min) / Math.max(1, max - min)) * (alto - 8)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${alto}`} className="w-full" aria-hidden="true">
      <polygon points={`0,${alto} ${p} ${w},${alto}`} fill={color} opacity={0.12} />
      <polyline points={p} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" className="pn-trazo" />
    </svg>
  );
}

function Medidor({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const color = valor >= 90 ? "#1fa463" : valor >= 50 ? "#f08c00" : "#e03131";
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <svg viewBox="0 0 76 76" width={76} height={76} aria-hidden="true">
        <circle cx={38} cy={38} r={r} fill="none" stroke="#eef1f8" strokeWidth={7} />
        <circle cx={38} cy={38} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${(valor / 100) * c} ${c}`} transform="rotate(-90 38 38)" strokeLinecap="round" />
        <text x={38} y={44} textAnchor="middle" fontSize={18} fontWeight={800} fill={color}>{valor}</text>
      </svg>
      <small className="text-gris">{etiqueta}</small>
    </div>
  );
}

const PERIODOS: [string, string, number][] = [
  ["hoy", "Hoy", 0.04], ["ayer", "Ayer", 0.04], ["7", "7 días", 0.25], ["28", "28 días", 0.95],
  ["3m", "3 meses", 2.8], ["mes", "Este mes", 1], ["pasado", "Mes pasado", 0.9], ["12m", "12 meses", 11],
];

const CANALES: [string, number, number][] = [
  ["Google Ads", 128, 18], ["Google (orgánico)", 74, 0], ["Meta (Facebook e Instagram)", 61, 10],
  ["Microsoft Ads", 19, 13], ["Directo y boca a boca", 30, 0],
];

function TablaCanales({ esc }: { esc: (n: number) => number }) {
  const [orden, setOrden] = useState(1);
  const filas = [...CANALES].sort((a, b) => (b[orden] as number) - (a[orden] as number));
  const cols = ["Canal", "Contactos", "Coste por contacto"];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[400px] text-left text-sm">
        <thead>
          <tr className="border-b border-linea text-gris">
            {cols.map((c, i) => (
              <th key={c} scope="col" className={`py-2 ${i > 0 ? "text-right" : ""}`}>
                {i === 0 ? c : <button type="button" onClick={() => setOrden(i)} className={`font-bold ${orden === i ? "text-tinta underline underline-offset-4" : ""}`}>{c}</button>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map(([n, c, e]) => (
            <tr key={n} className="border-b border-linea last:border-0">
              <td className="py-2 font-bold">{n}</td>
              <td className="py-2 text-right">{esc(c)}</td>
              <td className="py-2 text-right">{e ? `${e} €` : "sin anuncios"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cifra({ titulo, valor, formato, cambio, invertir = false, explicacion, contra = "que el mes pasado" }: { titulo: string; valor: number; formato?: (n: number) => string; cambio?: number; invertir?: boolean; explicacion: string; contra?: string }) {
  const bueno = cambio === undefined ? true : invertir ? cambio < 0 : cambio > 0;
  return (
    <div className="rounded-3xl border border-linea bg-white p-5">
      <p className="text-sm font-bold text-gris">{titulo}</p>
      <Glosa textos={[titulo]} className="mt-0.5" />
      <p className="mt-1 text-3xl font-extrabold sm:text-4xl"><Contador valor={valor} formato={formato} /></p>
      {cambio !== undefined && (
        <p className={`mt-1 text-sm font-bold ${bueno ? "text-emerald-700" : "text-rose-600"}`}>
          {cambio > 0 ? "▲" : "▼"} {Math.abs(cambio)} % <span className="font-normal text-gris">{contra}</span>
        </p>
      )}
      <p className="mt-2 text-sm text-gris">{explicacion}</p>
    </div>
  );
}

const ICONO_EVENTO: Record<string, string> = {
  visita: "bg-sky-400",
  herramienta: "bg-violet-400",
  whatsapp: "bg-emerald-400",
  correo: "bg-orange-400",
  llamada: "bg-emerald-500",
  chat: "bg-pink-400",
  contacto: "bg-estrella",
};


// Los parámetros que más importan, con su evolución de seis meses (datos inventados).
// mejor: "sube" si subir es bueno; "baja" si bajar es bueno.
const seg = (n: number) => (n >= 60 ? `${Math.floor(n / 60)}:${String(Math.round(n % 60)).padStart(2, "0")} min` : `${Math.round(n)} s`);
const PARAMETROS: { t: string; serie: number[]; mejor: "sube" | "baja"; f: (n: number) => string; ayuda: string }[] = [
  { t: "Contactos al mes", serie: [143, 171, 205, 238, 269, 312], mejor: "sube", f: (n) => num(n), ayuda: "Personas que te han escrito, llamado o pedido presupuesto. Es el número que más importa." },
  { t: "Tiempo que se quedan en tu web", serie: [52, 64, 81, 97, 108, 124], mejor: "sube", f: seg, ayuda: "Cuanto más se quedan, más les interesa lo que ven." },
  { t: "Tasa de rebote", serie: [68, 61, 55, 50, 47, 42], mejor: "baja", f: (n) => `${n} %`, ayuda: "Personas que entran y se van sin hacer nada. Cuanto más baja, mejor." },
  { t: "Visitas que acaban contactando", serie: [1.9, 2.4, 2.9, 3.3, 3.6, 4.1], mejor: "sube", f: (n) => `${n.toString().replace(".", ",")} %`, ayuda: "De cada 100 visitas, cuántas te contactan." },
  { t: "Páginas que ven por visita", serie: [1.8, 2.3, 2.8, 3.0, 3.0, 3.4], mejor: "sube", f: (n) => n.toString().replace(".", ","), ayuda: "Si miran más páginas, es que encuentran lo que buscan." },
  { t: "Velocidad de carga de tu web", serie: [4.8, 1.9, 1.2, 0.9, 0.8, 0.7], mejor: "baja", f: (n) => `${n.toString().replace(".", ",")} s`, ayuda: "Lo que tarda en abrirse. Cada segundo de más, se pierden visitas." },
  { t: "Coste por contacto", serie: [24, 20, 17, 15, 13, 12], mejor: "baja", f: (n) => `${n} €`, ayuda: "Lo invertido en anuncios dividido entre contactos. Cuanto más bajo, mejor." },
  { t: "Posición media en Google", serie: [14.2, 11.5, 8.9, 6.8, 6.1, 5.4], mejor: "baja", f: (n) => n.toString().replace(".", ","), ayuda: "Tu puesto medio cuando te buscan. Estar entre los 5 primeros es lo que trae llamadas." },
];

export default function PanelEjemplo() {
  const MODULOS_REF = useRef<Modulo[]>([]);
  const [vista, setVista] = useState<Vista>({});
  const [menu, setMenu] = useState(false);
  const [periodo, setPeriodo] = useState("mes");
  const [comp, setComp] = useState<"anterior" | "ano" | "nada">("anterior");
  const comparar: "mes" | "inicio" = comp === "ano" ? "inicio" : "mes";
  const per = PERIODOS.find(([id]) => id === periodo) ?? PERIODOS[5];
  const [desde, setDesde] = useState("2026-10-01");
  const [hasta, setHasta] = useState("2026-10-27");
  const diasRango = Math.max(1, Math.round((new Date(hasta).getTime() - new Date(desde).getTime()) / 86400000) + 1);
  const fp = periodo === "rango" ? (Number.isFinite(diasRango) ? diasRango / 30 : 1) : per[2];
  const esc = (n: number) => Math.max(1, Math.round(n * fp));
  const cmb = (n: number) => (comp === "nada" ? undefined : n);
  const contraTxt = comp === "ano" ? "que el mismo periodo del año pasado" : "que el periodo anterior";
  const [directo, setDirecto] = useState<{ id: number; tipo: string; titulo: string; detalle: string; hora: string }[]>([]);
  const [hoy, setHoy] = useState({ visitas: 318, contactos: 9, llamadas: 4 });
  const [ahora, setAhora] = useState(14);
  const [segundos, setSegundos] = useState(0);
  const [pedido, setPedido] = useState("");
  const [peticiones, setPeticiones] = useState<Peticion[]>(PETICIONES_INICIALES);
  const [nueva, setNueva] = useState("");
  const [fichas, setFichas] = useState<Ficha[]>(FICHAS_INICIALES);
  const [abierta, setAbierta] = useState<number>(1);
  const [hechos, setHechos] = useState<number[]>([]);
  const mover = (id: number, fase: Fase) =>
    setFichas((fs) => fs.map((f) => (f.id === id ? { ...f, fase, historia: [["Ahora mismo", `Pasa a «${fase}»`], ...f.historia] } : f)));
  const cambiaEstado = (id: number, estado: Estado) =>
    setPeticiones((ps) => ps.map((p) => (p.id === id ? { ...p, estado, entregada: estado === "Hecha" ? "Ahora mismo" : p.entregada } : p)));
  const anadir = () => {
    if (!nueva.trim()) return;
    const id = Date.now();
    setPeticiones((ps) => [{ id, que: nueva.trim(), area: "Nueva", pedida: "Ahora mismo", prometida: "Dentro de 48 horas", estado: "Recibida" }, ...ps]);
    setNueva("");
    setTimeout(() => cambiaEstado(id, "En curso"), 3500);
  };
  const [enviado, setEnviado] = useState(false);
  const [tipoMsg, setTipoMsg] = useState("Una mejora para el panel");
  const contador = useRef(0);

  useEffect(() => {
    const hora = () => new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const iniciales = EVENTOS.slice(0, 4).map((e, i) => ({ id: i, tipo: e[0], titulo: e[1], detalle: e[2], hora: hora() }));
    setDirecto(iniciales);
    contador.current = 4;
    const t = setInterval(() => {
      const e = EVENTOS[contador.current % EVENTOS.length];
      contador.current += 1;
      setDirecto((d) => [{ id: contador.current, tipo: e[0], titulo: e[1], detalle: e[2], hora: hora() }, ...d].slice(0, 7));
      setHoy((h) => ({
        visitas: h.visitas + (e[0] === "visita" ? 1 : 0),
        contactos: h.contactos + (e[0] === "contacto" ? 1 : 0),
        llamadas: h.llamadas + (e[0] === "llamada" ? 1 : 0),
      }));
      setAhora(9 + Math.floor(Math.random() * 12));
      setSegundos(0);
    }, 4500);
    const s = setInterval(() => setSegundos((x) => x + 1), 1000);
    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, []);

  // Se puede abrir una sección o una página concreta con el enlace (/panel#m-crm, /panel#g-anuncios) y el botón Atrás funciona
  useEffect(() => {
    const leer = () => {
      const h = window.location.hash.replace("#", "");
      const mods = MODULOS_REF.current;
      const viejo: Record<string, string> = { anuncios: "campanas", herramientas: "lupa", resumen: "contactos" };
      if (h.startsWith("m-")) { const m = mods.find((x) => x.id === h.slice(2)); setVista(m ? { g: m.grupo, m: m.id } : {}); return; }
      if (h.startsWith("g-")) { setVista({ g: h.slice(2) }); return; }
      const id = h in viejo ? viejo[h] : h;
      const m = mods.find((x) => x.id === id);
      setVista(m ? { g: m.grupo, m: m.id } : {});
    };
    leer();
    window.addEventListener("popstate", leer);
    return () => window.removeEventListener("popstate", leer);
  }, []);

  const gastoMes = GASTO_MES[GASTO_MES.length - 1];
  const variable = gastoMes.google + gastoMes.meta + gastoMes.video + gastoMes.prensa;

  const piezas = {
    contactos: (<>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["¿Llegan buenos contactos?", `${esc(312)} contactos`, "El 54 % pide presupuesto de verdad. Es mejor que el periodo anterior.", "anuncios", "Ver los anuncios"],
                  ["¿Los convertimos en clientes?", "Preparado para ti", "Se activa cuando marcas quién ha firmado. Nosotros no lo vemos ni te lo pedimos.", "crm", "Ver Lo tuyo"],
                  ["¿Qué canal trae más contactos?", "Aerotermia en Google", "Trae el 38 % de los contactos con el coste más bajo.", "anuncios", "Ver cada canal"],
                ].map(([q, v, t, dest, b]) => (
                  <div key={q} className="rounded-3xl border border-linea bg-white p-5">
                    <p className="text-sm font-bold text-gris">{q}</p>
                    <p className="mt-1 text-2xl font-extrabold">{v}</p>
                    <p className="mt-2 text-sm text-gris">{t}</p>
                    <button type="button" onClick={() => ir(dest === "anuncios" ? "campanas" : dest)} className="mt-2 text-sm font-bold text-noche-3 underline underline-offset-4">{b}</button>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4"><p className="font-extrabold">Alerta: 3 presupuestos sin respuesta</p><p className="mt-1 text-sm text-gris">Llevan más de 3 días esperando. Qué hacer: llámalos hoy; el correo de recordatorio ya ha salido.</p></div>
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4"><p className="font-extrabold">Alerta: la ficha de Google tiene 2 reseñas sin contestar</p><p className="mt-1 text-sm text-gris">Qué hacer: respóndelas esta semana. Te lo dejamos redactado en Tus peticiones.</p></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Cifra titulo="Contactos" valor={esc(312)} cambio={cmb(comparar === "mes" ? 16 : 118)} contra={contraTxt} explicacion="Personas que te han escrito, llamado o pedido presupuesto. Sale solo." />
                <Cifra titulo="Coste por contacto" valor={10} formato={eur} cambio={cmb(comparar === "mes" ? -8 : -41)} invertir contra={contraTxt} explicacion="Lo invertido en anuncios dividido entre los contactos que llegan. Cuanto más bajo, mejor." />
                <Cifra titulo="Visitas a la web" valor={esc(8640)} cambio={cmb(comparar === "mes" ? 9 : 87)} contra={contraTxt} explicacion="Personas distintas que han entrado en tu web." />
                <Cifra titulo="Contactos por cada 100 visitas" valor={36} formato={(n) => (n / 10).toFixed(1).replace(".", ",")} cambio={cmb(comparar === "mes" ? 6 : 22)} contra={contraTxt} explicacion="De cada 100 personas que entran, cuántas te dejan sus datos." />
              </div>
              <Caja titulo="Cada canal, de un vistazo" fuente="Ordena pulsando una columna" ayuda="Cada fila es un sitio por donde llegan clientes. Pulsa el título de una columna para ordenar de mayor a menor.">
                <TablaCanales esc={esc} />
              </Caja>
              <div className="grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
                <Caja titulo="Contactos y visitas, día a día" fuente="Analytics y la web" ayuda="Las barras amarillas son las personas que te han contactado cada día. La línea azul, las visitas a tu web. Si la línea sube y las barras no, la web no está convenciendo: ahí entramos nosotros.">
                  <Grafico barras={CONTACTOS_30} linea={VISITAS_30} />
                </Caja>
                <Caja titulo="Ahora mismo en tu web" fuente="En directo" ayuda="Lo que está pasando en este momento: quién entra, desde dónde, qué herramienta usa y quién te escribe.">
                  <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-2xl bg-niebla p-3"><p className="text-2xl font-extrabold"><Contador valor={hoy.visitas} /></p><p className="text-xs text-gris">visitas hoy</p></div>
                    <div className="rounded-2xl bg-niebla p-3"><p className="text-2xl font-extrabold"><Contador valor={hoy.contactos} /></p><p className="text-xs text-gris">contactos hoy</p></div>
                    <div className="rounded-2xl bg-niebla p-3"><p className="text-2xl font-extrabold"><Contador valor={hoy.llamadas} /></p><p className="text-xs text-gris">llamadas hoy</p></div>
                  </div>
                  <ul className="space-y-2" aria-live="polite">
                    {directo.map((e) => (
                      <li key={e.id} className="pn-entra flex gap-3 rounded-2xl border border-linea p-3">
                        <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${ICONO_EVENTO[e.tipo]}`} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold">{e.titulo}</span>
                          <span className="block truncate text-sm text-gris">{e.detalle}</span>
                        </span>
                        <span className="shrink-0 text-xs text-gris">{e.hora}</span>
                      </li>
                    ))}
                  </ul>
                </Caja>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Caja titulo="De dónde vienen tus contactos" fuente="Tag Manager y Analytics" ayuda="Cada persona que te contacta llega con una «etiqueta» que dice de dónde viene: Google, un anuncio concreto, Instagram, el mapa de Google, ChatGPT o un correo. Así sabemos qué funciona y dónde poner el dinero.">
                  <Rosco datos={ORIGEN} centro="312" sub="contactos" />
                </Caja>
                <Caja titulo="Herramientas conectadas" fuente="21 de 21 funcionando" ayuda="Todas las herramientas que miden tu negocio, conectadas en un solo sitio. El punto verde dice que están recibiendo datos ahora mismo.">
                  <ul className="grid grid-cols-2 gap-2">
                    {CONECTADO.map(([n, d]) => (
                      <li key={n} className="flex items-center gap-2 rounded-xl border border-linea p-2">
                        <Logo nombre={n} tam={22} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-bold">{n}</span>
                          <span className="block truncate text-[0.7rem] text-gris">{d}</span>
                        </span>
                        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" role="img" aria-label="Conectada" />
                      </li>
                    ))}
                  </ul>
                </Caja>
              </div>
    </>),
    costeContacto: (<>
                <Caja titulo="Lo que te cuesta cada contacto, mes a mes" fuente="Últimos 6 meses" ayuda="Dividimos lo invertido en anuncios entre los contactos que han llegado. Si la barra baja, cada contacto te sale más barato. En junio se grabó un vídeo y en julio se compró una nota de prensa: se ve en el gasto, no en la cuota.">
                  <div className="flex h-44 items-end gap-3">
                    {GASTO_MES.map((g, i) => {
                      const coste = (g.google + g.meta) / g.contactos;
                      return (
                        <div key={MESES[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                          <span className="text-xs font-bold">{eur(coste)}</span>
                          <div className="pn-barra w-full rounded-t-lg bg-noche-3" style={{ height: `${(coste / 16) * 100}%`, animationDelay: `${i * 60}ms` }} />
                          <span className="text-xs text-gris">{MESES[i]}</span>
                          <span className="h-4 text-[0.6rem] text-gris">{g.video ? "vídeo" : g.prensa ? "prensa" : ""}</span>
                        </div>
                      );
                    })}
                  </div>
                </Caja>
    </>),
    costeCliente: (<>
                <Caja quien="tuyo" titulo="Lo que te cuesta cada cliente" fuente="Preparado para ti" ayuda="Para calcularlo hace falta un dato que solo tienes tú: quién ha firmado. Si lo marcas en tu CRM, dividimos lo invertido entre tus clientes. Si no, no pasa nada y no te lo pedimos.">
                  <p className="text-sm text-gris"><b className="text-tinta">Se activa cuando marcas quién ha firmado.</b> Preparado para ti, por si quieres usarlo. Nosotros no lo vemos ni te lo pedimos.</p>
                  <div className="mt-4 flex h-32 items-end gap-3 opacity-80">
                    {GASTO_MES.map((g, i) => {
                      const coste = (g.google + g.meta) / g.clientes;
                      return (
                        <div key={MESES[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                          <span className="text-xs font-bold">{eur(coste)}</span>
                          <div className="w-full rounded-t-lg bg-sky-300" style={{ height: `${(coste / 110) * 100}%` }} />
                          <span className="text-xs text-gris">{MESES[i]}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-gris">Datos de demostración, como si hubieras marcado tus firmas.</p>
                </Caja>
    </>),
    gastos: (<>
              <Caja titulo="Qué va incluido y qué va aparte" fuente="Así de claro" ayuda="Pagas una cuota fija al mes que lo incluye todo. Lo único que va aparte es lo que pagas directamente a otros: lo que inviertes en anuncios, el vídeo profesional, el espacio en radio o prensa y, si quieres, una nota de prensa o un artículo en un medio.">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl bg-emerald-50 p-5">
                    <p className="font-extrabold text-emerald-800">Incluido en tu cuota fija</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {["Tu web, regalada, y todos los cambios en 48 horas", "SEO completo en Google y Bing: técnico, contenidos, fichas de mapa y visibilidad en las IA", "Gestión de anuncios en Google, Bing, Instagram, Facebook y TikTok, sin comisión", "Redes sociales, diseño y montaje de vídeos con tu material", "Correos y WhatsApp automáticos, asistente con IA",
                        "Conexión con tu CRM, o un CRM a medida si no tienes", "Dominio, servidor, seguridad y copias", "Este panel, siempre al día, en lugar de informes", "Gestión de campañas de radio y prensa: guion, voces, diseño y trato con los medios", "Rediseño del logo si lo necesitas", "Reservas online, reseñas, landings sin límite, encuestas y programa de recomendación", "Presupuestos con firma, tienda online, Google Shopping, web en varios idiomas y área privada para tus clientes", "Medición de llamadas, vigilancia de la competencia, y vídeos con IA"].map((t) => (
                        <li key={t} className="flex gap-2"><span className="text-emerald-700">✓</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-niebla p-5">
                    <p className="font-extrabold">Aparte, solo si tú quieres y siempre con tu visto bueno</p>
                    <ul className="mt-3 space-y-3 text-sm">
                      <li><b>Lo que inviertes en anuncios.</b> Lo pagas tú directamente a Google o a Meta, con tu tarjeta. Nosotros no cobramos ningún porcentaje.</li>
                      <li><b>La grabación de vídeo profesional.</b> La hace una productora audiovisual asociada y le pagas a ella directamente. El guion y el montaje van incluidos.</li>
                      <li><b>Notas de prensa y artículos en medios.</b> Los enlaces de calidad desde periódicos y revistas los cobra el medio. Te proponemos el medio con su precio y no se compra nada sin tu sí.</li>
                      <li><b>El espacio en radio o prensa.</b> Si hacemos una campaña de radio o un anuncio en un periódico, la emisora o el periódico te cobran a ti directamente. La idea, el guion, las voces y la gestión van incluidos.</li>
                    </ul>
                  </div>
                </div>
              </Caja>
                <Caja titulo="Lo que has gastado este mes" fuente="Octubre" ayuda="El desglose de lo que te ha costado el marketing este mes. La cuota es fija; lo demás depende de lo que decidas invertir.">
                  <ul className="divide-y divide-linea text-sm">
                    <li className="flex justify-between py-2"><span>Cuota mensual (todo incluido)</span><b>La que acordemos</b></li>
                    <li className="flex justify-between py-2"><span>SEO, web, servidor y dominio</span><b className="text-emerald-700">0 € (incluido)</b></li>
                    <li className="flex justify-between py-2"><span>Inversión en Google Ads</span><b>{eur(gastoMes.google)}</b></li>
                    <li className="flex justify-between py-2"><span>Inversión en Instagram y Facebook</span><b>{eur(gastoMes.meta)}</b></li>
                    <li className="flex justify-between py-2"><span>Vídeo profesional (opcional)</span><b>{eur(gastoMes.video)}</b></li>
                    <li className="flex justify-between py-2"><span>Notas de prensa (opcional)</span><b>{eur(gastoMes.prensa)}</b></li>
                    <li className="flex justify-between py-2 text-base"><span className="font-bold">Total variable</span><b>{eur(variable)}</b></li>
                  </ul>
                  <p className="mt-3 text-sm text-gris">Comisión sobre lo invertido: <b className="text-tinta">0 €</b>. Siempre.</p>
                </Caja>
    </>),
    peticiones: (<>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Cifra titulo="En curso" valor={peticiones.filter((p) => p.estado === "En curso" || p.estado === "Recibida").length} explicacion="Lo que estamos haciendo ahora mismo." />
                <Cifra titulo="Esperan tu visto bueno" valor={peticiones.filter((p) => p.estado === "Esperando tu aprobación").length} explicacion="Nada se publica sin que tú lo apruebes." />
                <Cifra titulo="Hechas este mes" valor={17 + peticiones.filter((p) => p.entregada === "Ahora mismo").length} cambio={13} explicacion="Peticiones tuyas terminadas en octubre." />
                <Cifra titulo="Plazos cumplidos" valor={96} formato={(n) => `${n} %`} explicacion="Entregas hechas dentro de la fecha que te dimos." />
              </div>
              <Caja titulo="Pide lo que necesites" fuente="Te respondemos el mismo día" ayuda="Escribe aquí lo que quieras: un cambio en la web, un anuncio nuevo, un artículo. Lo del día a día queda hecho en 48 horas como máximo; lo grande, con una fecha cerrada que te damos al momento. Ves quién lo lleva y en qué punto está, sin tener que preguntar.">
                <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); anadir(); }}>
                  <label htmlFor="nueva-peticion" className="sr-only">Nueva petición</label>
                  <input id="nueva-peticion" value={nueva} onChange={(e) => setNueva(e.target.value)} placeholder="Por ejemplo: cambiar las fotos de la portada" className="flex-1 rounded-full border border-linea px-5 py-3 focus:border-noche focus:outline-none" />
                  <button type="submit" className="rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">Nueva petición</button>
                </form>
                <p className="mt-2 text-xs text-gris">Demostración: prueba a escribir algo y verás cómo entra y pasa a «En curso».</p>
              </Caja>
              <Caja titulo="Tus peticiones" fuente="Al día" ayuda="Todo lo que nos has pedido, con la fecha en que lo pediste, la fecha que te prometimos y en qué punto está. Si algo necesita tu visto bueno, lo apruebas o pides cambios aquí mismo.">
                <ul className="space-y-3">
                  {peticiones.map((p) => (
                    <li key={p.id} className="pn-entra rounded-2xl border border-linea p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-extrabold">{p.que}</p>
                          <p className="mt-1 text-sm text-gris">
                            <span className="font-bold text-tinta">{p.area}</span> · Pedida: {p.pedida} · Prometida: {p.prometida}
                            {p.entregada && <> · <span className="font-bold text-emerald-700">Entregada: {p.entregada}</span></>}
                          </p>
                        </div>
                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${COLOR_ESTADO[p.estado]}`}>{p.estado}</span>
                      </div>
                      {p.estado === "Esperando tu aprobación" && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button type="button" onClick={() => cambiaEstado(p.id, "Hecha")} className="rounded-full bg-noche px-4 py-2 text-sm font-bold text-white hover:bg-noche-2">Aprobar</button>
                          <button type="button" onClick={() => cambiaEstado(p.id, "En curso")} className="rounded-full border border-linea px-4 py-2 text-sm font-bold hover:border-noche">Pedir cambios</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Caja>
    </>),
    informes: (<>
              <Caja titulo="Tu informe es este panel" fuente="Siempre al día" ayuda="Antes, un informe llegaba un día fijo y ya estaba viejo. Aquí no hay que esperar: todo lo que iba en el informe lo ves tú, ahora, y se actualiza solo.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-niebla p-4">
                    <h3 className="font-extrabold">Un informe de los de siempre</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-gris">
                      <li>Llega un día fijo: ya es de ayer.</li>
                      <li>Hay que esperar y pedirlo.</li>
                      <li>Un PDF que nadie vuelve a abrir.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-estrella/25 p-4">
                    <h3 className="font-extrabold">Con Casiopea</h3>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      <li>Se actualiza solo, cada día.</li>
                      <li>No esperas nada: lo tienes ahí.</li>
                      <li>Las luces te dicen qué mirar. Lo demás, cuando quieras.</li>
                    </ul>
                  </div>
                </div>
                <button type="button" onClick={() => window.print()} className="mt-4 rounded-full bg-noche px-5 py-2.5 text-sm font-bold text-white hover:bg-noche-2 print:hidden">Imprimir esta pantalla o guardarla en PDF</button>
                <p className="mt-2 text-xs text-gris">Imprime la pantalla en la que estás. Para tener el resumen entero, vuelve al inicio y pulsa imprimir.</p>
              </Caja>
              <Caja titulo="Tus facturas" fuente="Para descargar" ayuda="Tus facturas, siempre a mano. Sin pedirlas por correo.">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {DOCUMENTOS.map(([n, t]) => (
                    <li key={n} className="flex items-center gap-3 rounded-2xl bg-niebla p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xs font-extrabold text-rose-600">PDF</span>
                      <span className="min-w-0 flex-1"><span className="block font-bold">{n}</span><span className="block text-xs text-gris">{t} · en la demostración no se descarga</span></span>
                    </li>
                  ))}
                </ul>
              </Caja>
    </>),
    historico: (<>
              <Caja titulo="Los parámetros que más importan, de un vistazo" fuente={comp === "nada" ? "Sin comparar" : comp === "ano" ? "Frente al año pasado" : "Frente al periodo anterior"} ayuda="Aquí ves si tu web mejora de verdad. Verde es que va mejor; la línea, los seis últimos meses. Si a los tres meses no los ves mejorar, puedes irte sin pagar nada.">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {PARAMETROS.map((x) => {
                    const ahora = x.serie[5];
                    const ref = comparar === "mes" ? x.serie[4] : x.serie[0];
                    const cambio = Math.round(((ahora - ref) / ref) * 100);
                    const bueno = x.mejor === "sube" ? cambio >= 0 : cambio <= 0;
                    return (
                      <li key={x.t} className="rounded-2xl border border-linea p-4">
                        <p className="text-sm font-bold text-gris">{x.t}</p>
                        <p className="mt-1 text-3xl font-extrabold">{x.f(ahora)}</p>
                        <p className={`text-sm font-bold ${bueno ? "text-emerald-700" : "text-rose-600"}`}>
                          {cambio >= 0 ? "▲" : "▼"} {Math.abs(cambio)} % <span className="font-normal text-gris">{contraTxt}</span>
                        </p>
                        <div className="mt-2"><Linea serie={x.serie} color={bueno ? "#047857" : "#e11d48"} alto={44} /></div>
                        <p className="mt-1 text-xs text-gris">Antes: <b>{x.f(ref)}</b></p>
                        <p className="mt-2 text-xs text-gris">{x.ayuda}</p>
                      </li>
                    );
                  })}
                </ul>
              </Caja>
              <Caja titulo="Cómo has mejorado desde el primer día" fuente="Tus datos, mes a mes" ayuda="Aquí se ve si lo estamos haciendo mejor que antes. El primer mes es de partida: lo que ya tenías. Si a los tres meses no ves esta línea subir, puedes irte sin pagar nada y te quedas con la web.">
                <div className="grid grid-cols-6 items-end gap-2 sm:gap-4" style={{ height: 150 }}>
                  {[120, 158, 214, 246, 281, 312].map((v, i) => (
                    <div key={i} className="flex h-full flex-col items-center justify-end">
                      <span className="mb-1 text-xs font-bold">{v}</span>
                      <div className="pn-barra w-full rounded-t-lg" style={{ height: `${(v / 312) * 100}%`, background: i < 3 ? "#ffc53d" : "#1d4ed8" }} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-6 gap-2 text-center text-xs text-gris sm:gap-4">
                  {["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"].map((m) => <span key={m}>{m}</span>)}
                </div>
                <p className="mt-3 text-sm text-gris">Contactos al mes. En amarillo, los tres meses para demostrarlo: de 120 a 214 contactos. En azul, lo que viene después.</p>
              </Caja>
    </>),
    campanas: (<>
              <Caja titulo="Google Ads, campaña a campaña" fuente="Google Ads" ayuda="Lo que has invertido en cada campaña de Google, cuántas personas han pulsado, y cuántas te han contactado. La última columna es la que importa: lo que te cuesta cada contacto. Cuántos firman es cosa tuya y está en Lo tuyo.">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="text-gris"><tr><th className="pb-2">Campaña</th><th className="pb-2">Invertido</th><th className="pb-2">Clics</th><th className="pb-2">Contactos</th><th className="pb-2">Coste por contacto</th></tr></thead>
                    <tbody>
                      {CAMPANAS.map((c) => (
                        <tr key={c.nombre} className="border-t border-linea">
                          <td className="py-3 font-bold">{c.nombre}</td>
                          <td className="py-3">{eur(c.inversion)}</td>
                          <td className="py-3">{num(c.clics)}</td>
                          <td className="py-3">{c.contactos}</td>
                          <td className="py-3 font-extrabold">{eur(c.inversion / c.contactos)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Caja>
              <div className="grid gap-5 lg:grid-cols-2">
                <Caja titulo="Instagram y Facebook" fuente="Meta" ayuda="Los anuncios en Instagram y Facebook. El alcance son las personas distintas que los han visto. Lo medimos con el píxel de Meta y su API de conversiones, que funciona aunque el navegador bloquee cookies.">
                  <div className="grid grid-cols-2 gap-3">
                    {[["Invertido", eur(META_ADS.inversion)], ["Personas alcanzadas", num(META_ADS.alcance)], ["Clics", num(META_ADS.clics)], ["Contactos", String(META_ADS.contactos)], ["Coste por contacto", eur(META_ADS.inversion / META_ADS.contactos)]].map(([t, v]) => (
                      <div key={t} className="rounded-2xl bg-niebla p-4"><p className="text-xs text-gris">{t}</p><p className="text-xl font-extrabold">{v}</p></div>
                    ))}
                  </div>
                </Caja>
                <Caja titulo="Lo que hemos ajustado este mes" fuente="Nuestro equipo" ayuda="Los anuncios no se montan y se olvidan: se revisan cada día. Esto es lo que hemos cambiado y por qué.">
                  <ul className="space-y-3 text-sm">
                    <li className="rounded-2xl bg-niebla p-3"><b>Quitadas 23 búsquedas</b> que traían curiosos («barato», «gratis», «segunda mano»). Ahorro: 210 € al mes.</li>
                    <li className="rounded-2xl bg-niebla p-3"><b>Subido un 10 %</b> el presupuesto de aerotermia: es la que mejor coste por contacto tiene.</li>
                    <li className="rounded-2xl bg-niebla p-3"><b>Nuevo anuncio en vídeo</b> en Instagram con una instalación real. Ha bajado el coste por contacto un 18 %.</li>
                    <li className="rounded-2xl bg-niebla p-3"><b>Horario ajustado:</b> los anuncios ya no salen de 1 a 7 de la madrugada, cuando nadie pedía presupuesto.</li>
                  </ul>
                </Caja>
              </div>
    </>),
    google: (<>
              <Caja titulo="Dónde sales en Google" fuente="Search Console y Semrush" ayuda="Las búsquedas que más clientes te pueden traer, cuánta gente las hace al mes y en qué puesto sales. Salir entre los 3 primeros es lo que de verdad da llamadas.">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="text-gris"><tr><th className="pb-2">Búsqueda</th><th className="pb-2">Búsquedas al mes</th><th className="pb-2">Puesto hoy</th><th className="pb-2">Hace 3 meses</th></tr></thead>
                    <tbody>
                      {BUSQUEDAS.map(([b, v, hoyP, antes]) => (
                        <tr key={b} className="border-t border-linea">
                          <td className="py-3 font-bold">{b}</td>
                          <td className="py-3">{num(v)}</td>
                          <td className="py-3"><span className={`rounded-full px-3 py-1 text-xs font-extrabold ${hoyP <= 3 ? "bg-emerald-100 text-emerald-800" : "bg-niebla"}`}>{hoyP}.º</span></td>
                          <td className="py-3 text-gris">{antes}.º <span className="font-bold text-emerald-700">▲ {antes - hoyP}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Caja>
              <div className="grid gap-5 lg:grid-cols-2">
                <Caja titulo="Qué se busca en tu sector" fuente="Google Trends" ayuda="Google Trends nos dice cuándo la gente empieza a buscar lo que vendes. Así preparamos las campañas antes que tu competencia, no cuando ya es tarde.">
                  <p className="text-sm text-gris">Interés por «aire acondicionado» en Madrid, último año</p>
                  <div className="mt-3 flex h-40 items-end gap-1.5">
                    {TENDENCIA.map((v, i) => (
                      <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                        <div className="pn-barra w-full rounded-t-md" style={{ height: `${v}%`, background: v > 70 ? "#ffc53d" : "#24387a", animationDelay: `${i * 40}ms` }} title={`${MESES_12[i]}: ${v}`} />
                        <span className="text-[0.65rem] text-gris">{MESES_12[i]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 rounded-2xl bg-estrella/20 p-3 text-sm">Las búsquedas se disparan en abril. La campaña de primavera empieza el 15 de marzo.</p>
                </Caja>
                <Caja titulo="Tu ficha de Google (el mapa)" fuente="Ficha de Google" ayuda="La ficha que sale en Google Maps cuando te buscan cerca. Mucha gente llama directamente desde ahí sin entrar en tu web.">
                  <div className="grid grid-cols-2 gap-3">
                    {[["Veces que se ha visto", "14.820"], ["Llamadas desde la ficha", "96"], ["Cómo llegar", "212"], ["Visitas a la web", "740"]].map(([t, v]) => (
                      <div key={t} className="rounded-2xl bg-niebla p-4"><p className="text-xs text-gris">{t}</p><p className="text-xl font-extrabold">{v}</p></div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 rounded-2xl border border-linea p-4">
                    <p className="text-4xl font-extrabold">4,8</p>
                    <div><p className="text-estrella">★★★★★</p><p className="text-sm text-gris">312 reseñas · 18 nuevas este mes · todas contestadas</p></div>
                  </div>
                </Caja>
              </div>
              <Caja titulo="Bing: el buscador que tu competencia olvida" fuente="Bing Webmaster, Microsoft Ads y ficha de Bing" ayuda="En España casi todo el mundo busca en Google, pero Bing se lleva cerca del 3,5 % de las búsquedas, y en los ordenadores más del 12 %, porque viene de serie en Windows y en Edge. Además, Bing alimenta a Copilot y a otros asistentes de IA. Como casi nadie lo trabaja, es más fácil salir arriba y los anuncios suelen tener menos competencia. Va incluido en tu cuota.">
                <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                  <div className="rounded-2xl bg-gradient-to-br from-[#00b294] to-[#0078d4] p-5 text-white">
                    <p className="text-sm font-bold text-white/80">Cuota de búsquedas en España</p>
                    <div className="mt-3 flex items-end gap-6">
                      <div><p className="text-4xl font-extrabold">3,5 %</p><p className="text-xs text-white/80">en total</p></div>
                      <div><p className="text-4xl font-extrabold">12 %</p><p className="text-xs text-white/80">en ordenadores</p></div>
                    </div>
                    <p className="mt-3 text-xs text-white/75">Fuente: StatCounter, septiembre de 2026. Viene de serie en Windows y en Edge.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[["Visitas desde Bing", "312"], ["Contactos desde Bing", "11"], ["Puesto medio en Bing", "2,4.º"], ["Ficha de Bing: vistas", "1.940"], ["Anuncios de Bing: invertido", "120 €"], ["Coste por contacto en Bing", "21 €"]].map(([t, v]) => (
                      <div key={t} className="rounded-2xl bg-niebla p-4"><p className="text-xs text-gris">{t}</p><p className="text-xl font-extrabold">{v}</p></div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 rounded-2xl bg-estrella/20 p-3 text-sm">Pocos contactos, pero baratos: en Bing compiten menos empresas y el clic suele salir más barato. Por eso estamos en todas partes: Google, Bing, Apple Maps y las IA.</p>
              </Caja>
    </>),
    redes: (<>
              {REDES.map((r) => (
                <Caja key={r.red} titulo={r.red} fuente="Últimos 12 meses" ayuda="Cuántas personas te siguen y cómo ha ido creciendo. Lo importante no son los seguidores, sino cuántos acaban pidiendo presupuesto: eso lo ves en la pestaña de Clientes.">
                  <div className="flex items-center gap-3">
                    <Logo nombre={r.red} tam={34} />
                    <p className="text-3xl font-extrabold"><Contador valor={r.serie[r.serie.length - 1]} /></p>
                    <span className="text-sm font-bold text-emerald-700">+{num(r.serie[r.serie.length - 1] - r.serie[r.serie.length - 4])} en 3 meses</span>
                  </div>
                  <div className="mt-3"><Linea serie={r.serie} color={r.color} /></div>
                  <p className="mt-3 text-sm text-gris">{r.extra}</p>
                </Caja>
              ))}
    </>),
    web: (<>
              <Caja titulo="Velocidad y calidad de tu web" fuente="PageSpeed de Google" ayuda="Google puntúa tu web de 0 a 100. Por encima de 90 es verde: carga rápido y Google la premia. Una web lenta pierde a casi la mitad de las visitas.">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Medidor valor={98} etiqueta="Velocidad en el móvil" />
                  <Medidor valor={100} etiqueta="Accesibilidad" />
                  <Medidor valor={100} etiqueta="Buenas prácticas" />
                  <Medidor valor={100} etiqueta="SEO" />
                </div>
              </Caja>
              <div className="grid gap-5 lg:grid-cols-2">
                <Caja titulo="Lo que vemos en Clarity" fuente="Mapas de calor" ayuda="Clarity graba de forma anónima cómo se mueve la gente por tu web: dónde pulsa, hasta dónde baja y dónde se atasca. Es como mirar por encima del hombro a tus visitantes.">
                  <ul className="space-y-3 text-sm">
                    <li className="rounded-2xl bg-niebla p-3"><b>El 52 % no llegaba</b> al botón de presupuesto en la página de aerotermia. Lo hemos subido: ya lo ve el 91 %.</li>
                    <li className="rounded-2xl bg-niebla p-3"><b>Muchos pulsaban la foto</b> del equipo esperando ver más. Hemos añadido una galería de instalaciones.</li>
                    <li className="rounded-2xl bg-niebla p-3"><b>Clics de rabia</b> en el campo del teléfono: el formulario no aceptaba espacios. Arreglado el mismo día.</li>
                  </ul>
                </Caja>
                <Caja titulo="Seguridad y salud de la web" fuente="Vercel" ayuda="Tu web siempre encendida, segura y con copia de cada cambio. Si algo falla, volvemos a la versión anterior en un minuto.">
                  <ul className="grid grid-cols-2 gap-3 text-sm">
                    {[["Disponible", "99,99 %"], ["Copias guardadas", "312 versiones"], ["Certificado de seguridad", "Activo"], ["Ataques bloqueados este mes", "1.208"], ["Dominio y servidor", "A tu nombre"], ["Último cambio", "Hoy, 10:42"]].map(([t, v]) => (
                      <li key={t} className="rounded-2xl bg-niebla p-3"><p className="text-xs text-gris">{t}</p><p className="font-extrabold">{v}</p></li>
                    ))}
                  </ul>
                </Caja>
              </div>
    </>),
    crm: (<>
              <section className="rounded-3xl bg-noche p-6 text-white sm:p-8">
                <p className="text-sm font-bold text-estrella">Tu CRM, hecho a medida, si lo quieres</p>
                <p className="mt-2 text-2xl font-extrabold sm:text-3xl">Cada contacto entra solo, con de dónde vino. Tú solo lo mueves hasta cliente.</p>
                <p className="mt-2 text-white/75">Formulario, chat, WhatsApp, llamadas desde Google y calculadoras crean la ficha sin que nadie escriba nada. Y los seguimientos te avisan de a quién llamar hoy. Nada de boletines masivos: un mensaje a la persona justa en el momento justo.</p>
              </section>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Cifra titulo="Contactos este mes" valor={312} cambio={16} explicacion="Todos entran solos en tu CRM." />
                <Cifra titulo="En juego ahora" valor={fichas.filter((f) => ["Contactado", "Presupuesto enviado", "Negociando"].includes(f.fase)).reduce((a, f) => a + f.valor, 0)} formato={eur} explicacion="Presupuestos abiertos que aún se pueden ganar." />
                <Cifra titulo="Ganado este mes" valor={fichas.filter((f) => f.fase === "Cliente").reduce((a, f) => a + f.valor, 0) + 298300} formato={eur} cambio={14} explicacion="Presupuestos firmados que vinieron por internet." />
                <Cifra titulo="Cierre de presupuestos" valor={41} formato={(n) => `${n} %`} cambio={6} explicacion="De cada 100 presupuestos enviados, cuántos se firman." />
              </div>
              <Caja quien="tuyo" titulo="Tus contactos, fase a fase" fuente="Se actualiza solo" ayuda="Cada columna es una fase. Pulsa en un contacto para ver su ficha, de dónde vino, todo lo que ha pasado y cuándo toca el siguiente seguimiento. Puedes moverlo de fase con un toque.">
                <div className="-mx-1 overflow-x-auto pb-2">
                  <div className="flex min-w-max gap-3 px-1">
                    {FASES.map((fase) => {
                      const deFase = fichas.filter((f) => f.fase === fase);
                      return (
                        <div key={fase} className="w-56 shrink-0 rounded-2xl bg-niebla p-3">
                          <p className="flex items-center justify-between text-sm font-extrabold">{fase}<span className="rounded-full bg-white px-2 text-xs text-gris">{deFase.length}</span></p>
                          <ul className="mt-3 space-y-2">
                            {deFase.map((f) => (
                              <li key={f.id}>
                                <button type="button" onClick={() => setAbierta(f.id)} className={`pn-entra w-full rounded-xl bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 ${abierta === f.id ? "ring-2 ring-noche" : ""}`}>
                                  <span className="block text-sm font-extrabold">{f.nombre}</span>
                                  <span className="block text-xs text-gris">{f.tema}</span>
                                  <span className="mt-2 flex items-center justify-between text-xs"><span className="truncate text-noche-3">{f.origen}</span><b>{eur(f.valor)}</b></span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {(() => {
                  const f = fichas.find((x) => x.id === abierta);
                  if (!f) return null;
                  const i = FASES.indexOf(f.fase);
                  return (
                    <div className="mt-4 grid gap-4 rounded-2xl border border-linea p-5 lg:grid-cols-[1fr_1.2fr]">
                      <div>
                        <p className="text-xl font-extrabold">{f.nombre}</p>
                        <p className="text-gris">{f.tema}</p>
                        <p className="mt-3 text-sm"><b>De dónde vino:</b> {f.origen}</p>
                        <p className="text-sm"><b>Valor:</b> {eur(f.valor)}</p>
                        <p className="mt-2"><span className={`rounded-full px-3 py-1 text-xs font-bold ${COLOR_FASE[f.fase]}`}>{f.fase}</span></p>
                        <p className="mt-3 flex items-center gap-2 rounded-xl bg-estrella/20 p-3 text-sm"><LogoMarca nombre={LOGO_CANAL[f.canal]} tam={20} /><span><b>Siguiente seguimiento:</b> {f.canal.toLowerCase()} · {f.seguimiento}</span></p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {i < 4 && <button type="button" onClick={() => mover(f.id, FASES[i + 1])} className="rounded-full bg-noche px-4 py-2 text-sm font-bold text-white">Pasar a «{FASES[i + 1]}»</button>}
                          {f.fase !== "Cliente" && f.fase !== "No sigue" && <button type="button" onClick={() => mover(f.id, "Cliente")} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white">Ganado</button>}
                          {f.fase !== "No sigue" && <button type="button" onClick={() => mover(f.id, "No sigue")} className="rounded-full border border-linea px-4 py-2 text-sm font-bold">No sigue</button>}
                        </div>
                      </div>
                      <ol className="relative space-y-3 border-l-2 border-estrella pl-5">
                        {f.historia.map(([cuando, que], k) => (
                          <li key={k} className="relative"><span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-noche ring-4 ring-white" /><p className="text-xs font-bold text-gris">{cuando}</p><p className="text-sm">{que}</p></li>
                        ))}
                      </ol>
                    </div>
                  );
                })()}
              </Caja>
              <div className="grid gap-5 lg:grid-cols-2">
                <Caja quien="tuyo" titulo="Seguimientos de hoy" fuente="Te avisa el CRM" ayuda="El CRM te dice a quién escribir o llamar hoy y por qué, para que nadie que dudaba se quede sin respuesta. Algunos salen solos (un WhatsApp o un correo); otros te tocan a ti, como una llamada.">
                  <ul className="space-y-2">
                    {fichas.filter((f) => /Hoy|Mañana/.test(f.seguimiento)).map((f) => (
                      <li key={f.id} className={`flex items-center gap-3 rounded-2xl border border-linea p-3 ${hechos.includes(f.id) ? "opacity-50" : ""}`}>
                        <LogoMarca nombre={LOGO_CANAL[f.canal]} tam={24} />
                        <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{f.canal} a {f.nombre}</span><span className="block truncate text-xs text-gris">{f.tema} · {f.seguimiento}</span></span>
                        <button type="button" onClick={() => setHechos(hechos.includes(f.id) ? hechos.filter((x) => x !== f.id) : [...hechos, f.id])} className={`rounded-full px-3 py-1.5 text-xs font-bold ${hechos.includes(f.id) ? "bg-emerald-100 text-emerald-800" : "bg-noche text-white"}`}>{hechos.includes(f.id) ? "Hecho" : "Marcar hecho"}</button>
                      </li>
                    ))}
                  </ul>
                </Caja>
                <Caja quien="tuyo" titulo="Qué canal trae clientes de verdad" fuente="Del CRM, no de los clics" ayuda="Aquí no contamos visitas ni clics: contamos clientes que han firmado y lo que han facturado, según de dónde vinieron. Es el dato que decide dónde poner el dinero.">
                  <ul className="space-y-3">
                    {([["Anuncios de Google", 128000], ["Google sin pagar", 84000], ["Ficha de Google", 41000], ["Instagram y Facebook", 36000], ["Seguimientos", 22000], ["ChatGPT y otras IA", 7300]] as [string, number][]).map(([c, v]) => (
                      <li key={c}>
                        <div className="flex justify-between text-sm"><span>{c}</span><b>{eur(v)}</b></div>
                        <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-niebla"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${(v / 128000) * 100}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </Caja>
              </div>
    </>),
    clientes: (<>
              <Caja titulo="El camino hasta cliente" fuente="Este mes" ayuda="De cada 100 personas que entran en tu web, cuántas llegan a cada paso. Nuestro trabajo es que en cada escalón se caiga menos gente.">
                <ol className="space-y-3">
                  {EMBUDO.map(([paso, n, d], i) => (
                    <li key={paso}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-bold">{paso} <span className="font-normal text-gris">· {d}</span></span>
                        <span className="text-xl font-extrabold">{num(n)}</span>
                      </div>
                      <div className="mt-1 h-4 overflow-hidden rounded-full bg-niebla">
                        <div className="pn-barra h-full rounded-full" style={{ width: `${Math.max(4, (n / EMBUDO[0][1]) * 100)}%`, background: i === EMBUDO.length - 1 ? "#1fa463" : "#24387a", transformOrigin: "left", animationName: "none" }} />
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 rounded-2xl border border-dashed border-sky-300 bg-sky-50 p-3 text-sm"><b>Último paso: se hacen clientes.</b> Preparado para ti, por si quieres usarlo. Se activa cuando marcas quién ha firmado. Nosotros no lo vemos ni te lo pedimos.</p>
              </Caja>

              <Caja titulo="Así sabemos de dónde viene cada cliente" fuente="Un cliente real de ejemplo" ayuda="Esto es lo que hace posible una buena medición: seguimos el recorrido completo de cada persona, desde el primer anuncio que vio hasta que firmó. Por eso podemos decirte exactamente qué te trae clientes y qué no.">
                <ol className="relative space-y-5 border-l-2 border-estrella pl-6">
                  {RECORRIDO.map(([cuando, que, como], i) => (
                    <li key={cuando + que} className="pn-entra relative" style={{ animationDelay: `${i * 90}ms` }}>
                      <span className={`absolute -left-[33px] top-1 grid h-4 w-4 place-items-center rounded-full ${i === RECORRIDO.length - 1 ? "bg-emerald-500" : "bg-noche"} ring-4 ring-white`} />
                      <p className="text-xs font-bold text-gris">{cuando}</p>
                      <p className="font-extrabold">{que}</p>
                      <p className="text-sm text-gris">{como}</p>
                    </li>
                  ))}
                </ol>
              </Caja>

              <Caja quien="tuyo" titulo="Últimos contactos" fuente="La web, WhatsApp y llamadas" ayuda="Cada persona que te ha escrito, con lo que quiere, de dónde ha venido y en qué punto está. Todo entra solo en tu CRM (el que ya tengas o uno que te creamos), y tu equipo comercial lo ve igual, en el móvil.">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="text-gris">
                      <tr><th className="pb-2">Quién</th><th className="pb-2">Qué quiere</th><th className="pb-2">De dónde viene</th><th className="pb-2">Cómo</th><th className="pb-2">Estado</th></tr>
                    </thead>
                    <tbody>
                      {LEADS.map((l) => (
                        <tr key={l.nombre} className="border-t border-linea">
                          <td className="py-3 font-bold">{l.nombre}<span className="block text-xs font-normal text-gris">{l.cuando}</span></td>
                          <td className="py-3">{l.tema}</td>
                          <td className="py-3">{l.origen}</td>
                          <td className="py-3">{l.canal}</td>
                          <td className="py-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${l.estado === "Cliente" ? "bg-emerald-100 text-emerald-800" : l.estado === "Nuevo" ? "bg-estrella/40" : "bg-niebla"}`}>{l.estado}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Caja>

              <div className="grid gap-5 lg:grid-cols-2">
                <Caja titulo="Correos de seguimiento" fuente="Resend" ayuda="A quien te deja sus datos le llegan solos 5 correos durante dos semanas. Aquí ves qué porcentaje abre cada uno. Son ventas que antes se perdían por no insistir.">
                  <ul className="space-y-3">
                    {CORREOS.map(([c, p], i) => (
                      <li key={c}>
                        <div className="flex justify-between gap-3 text-sm"><span><b>{i + 1}.</b> {c}</span><b>{p} %</b></div>
                        <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-niebla"><div className="h-full rounded-full bg-orange-400" style={{ width: `${p}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gris">De media, el <b className="text-tinta">64 %</b> abre los correos. 9 personas de este mes pidieron presupuesto después de un correo.</p>
                </Caja>
                <Caja titulo="Herramientas de tu web" fuente="Tag Manager" ayuda="Las calculadoras y tests de tu web enganchan al visitante y le ayudan a decidir. Aquí ves cuántas veces se ha usado cada una este mes.">
                  <ul className="space-y-3">
                    {HERRAMIENTAS.map(([h, n]) => (
                      <li key={h}>
                        <div className="flex justify-between gap-3 text-sm"><span>{h}</span><b>{num(n)}</b></div>
                        <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-niebla"><div className="h-full rounded-full bg-violet-400" style={{ width: `${(n / HERRAMIENTAS[0][1]) * 100}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gris">El asistente de la web ha atendido <b className="text-tinta">186 conversaciones</b>, 41 de ellas fuera de horario.</p>
                </Caja>
              </div>
    </>),
    medicion: (<>
              <Caja titulo="Cómo medimos todo, explicado fácil" fuente="Tag Manager en el centro" ayuda="Tag Manager es como la centralita de tu web: desde ahí se colocan todas las «etiquetas» que cuentan visitas, clics, llamadas y contactos, y se mandan a Google, a Meta, a LinkedIn o a TikTok. Una sola instalación, sin tocar tu web cada vez.">
                <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
                  <ul className="space-y-2">
                    {["Visita a la web", "Uso de una calculadora", "Pulsación en WhatsApp", "Llamada desde el móvil", "Formulario enviado", "Conversación con el asistente"].map((t) => (
                      <li key={t} className="flex items-center gap-2 rounded-xl bg-niebla px-3 py-2 text-sm font-bold"><span className="h-2 w-2 rounded-full bg-estrella" />{t}</li>
                    ))}
                  </ul>
                  <div className="flex flex-col items-center gap-2 rounded-3xl bg-noche p-6 text-center text-white">
                    <Logo nombre="Tag Manager" tam={48} />
                    <p className="font-extrabold">Tag Manager</p>
                    <p className="max-w-[12rem] text-xs text-white/70">Recoge cada acción una vez y la reparte a todas las herramientas</p>
                  </div>
                  <ul className="space-y-2">
                    {["Google Analytics", "Google Ads", "Meta", "LinkedIn", "TikTok", "Clarity"].map((t) => (
                      <li key={t} className="flex items-center gap-2 rounded-xl border border-linea px-3 py-2 text-sm font-bold"><Logo nombre={t} tam={20} />{t}<span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" /></li>
                    ))}
                  </ul>
                </div>
              </Caja>
              <Caja titulo="Las etiquetas que llevan tu web" fuente="Todas activas" ayuda="Cada etiqueta tiene un trabajo. Las revisamos cada semana para que ningún contacto se quede sin contar.">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {ETIQUETAS.map((e) => (
                    <li key={e.nombre} className="flex gap-3 rounded-2xl border border-linea p-4">
                      <Logo nombre={e.nombre} tam={30} />
                      <span>
                        <span className="block font-extrabold">{e.que}</span>
                        <span className="block text-sm text-gris">{e.para}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Caja>
              <div className="grid gap-5 lg:grid-cols-3">
                <Caja titulo="Enlaces etiquetados" fuente="UTM" ayuda="Cada anuncio, correo o publicación lleva un enlace con una etiqueta invisible (UTM). Cuando alguien entra, sabemos de qué anuncio exacto viene.">
                  <p className="break-all rounded-2xl bg-niebla p-3 font-mono text-xs">tuweb.es/aerotermia?<b>utm_source</b>=instagram&<b>utm_campaign</b>=aerotermia-otono&<b>utm_content</b>=reel-instalacion</p>
                  <p className="mt-3 text-sm text-gris">Se lee: viene de Instagram, de la campaña de otoño, del reel de la instalación.</p>
                </Caja>
                <Caja titulo="Aunque bloqueen cookies" fuente="Conversiones desde el servidor" ayuda="Cada vez más navegadores bloquean las cookies. Por eso enviamos también los contactos directamente desde tu servidor a Google y a Meta, respetando siempre lo que la persona haya aceptado.">
                  <p className="text-4xl font-extrabold text-emerald-700">97 %</p>
                  <p className="text-sm text-gris">de los contactos queda atribuido a su origen. Sin esto, una parte importante se quedaría sin saber de dónde viene.</p>
                </Caja>
                <Caja titulo="Cookies y privacidad" fuente="Como pide la ley" ayuda="El banner de cookies cumple con la normativa española. Si alguien no acepta, no se le sigue: solo se cuenta de forma anónima.">
                  <p className="text-sm">Banner de cookies con <b>Aceptar</b>, <b>Rechazar</b> y <b>Configurar</b> al mismo nivel, como pide la Agencia Española de Protección de Datos.</p>
                  <p className="mt-3 text-sm text-gris">El 78 % de los visitantes acepta la medición.</p>
                </Caja>
              </div>
    </>),
    trabajo: (<>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Cifra titulo="Entregadas a tiempo" valor={98} formato={(n) => `${n} %`} cambio={2} explicacion="Tareas de este mes hechas dentro del plazo prometido. 63 de 64." />
                <Cifra titulo="Tareas hechas este mes" valor={64} cambio={9} explicacion="Cambios, campañas, artículos, diseños y correos." />
                <Cifra titulo="Lo que nos pediste" valor={17} cambio={13} explicacion="Peticiones tuyas este mes. Todas hechas." />
                <Cifra titulo="Tiempo medio de respuesta" valor={19} formato={(n) => `${n} h`} cambio={-12} invertir explicacion="Desde que pides algo hasta que está hecho. Máximo, 48 horas." />
              </div>
              <Caja titulo="Lo que hemos hecho, día a día" fuente="Registro" ayuda="Todo lo que hacemos queda apuntado aquí con su fecha y su porqué. Sin cajas negras.">
                <ol className="space-y-3">
                  {ACTIVIDAD.map(([cuando, area, que]) => (
                    <li key={cuando + que} className="grid gap-1 rounded-2xl border border-linea p-4 sm:grid-cols-[120px_110px_1fr] sm:gap-4">
                      <span className="text-sm text-gris">{cuando}</span>
                      <span><span className="rounded-full bg-noche px-3 py-1 text-xs font-bold text-white">{area}</span></span>
                      <span className="text-sm">{que}</span>
                    </li>
                  ))}
                </ol>
              </Caja>
    </>),
  };

  const MODULOS: Modulo[] = [
    { id: "lupa", grupo: "web", nombre: "Lupa 360", corto: "Lupa", linea: "Ves lo que hace la gente en tu web.", conclusion: "El 23 % de los toques no llevan a ningún sitio. Un cambio de media hora lo arregla.", luz: "atencion", icono: "lupa", contenido: <Herramientas360 solo="lupa" /> },
    { id: "sistemas", grupo: "web", nombre: "Sistemas", corto: "Sistemas", linea: "Comprobamos cada día que tu web, tus formularios y tus anuncios funcionan.", conclusion: "Hoy, 7 de 8 comprobaciones correctas. La octava se revisó ayer.", luz: "ok", icono: "escudo", contenido: <Herramientas360 solo="sistemas" /> },
    { id: "control360", grupo: "web", nombre: "Control 360", corto: "Control 360", linea: "Probamos tu recorrido completo como lo haría un cliente.", conclusion: "Última prueba completa, el lunes: todo correcto.", luz: "ok", icono: "camino", contenido: <Herramientas360 solo="recorrido" /> },
    { id: "web", grupo: "web", nombre: "La web", corto: "La web", linea: "Velocidad, seguridad y lo que ve Clarity.", conclusion: "Tu web va rápida, segura y con copia de cada cambio.", luz: "ok", icono: "globo", contenido: piezas.web },
    { id: "espejo", grupo: "dicen", nombre: "Espejo de la IA", corto: "Espejo IA", linea: "Ves qué dicen de ti ChatGPT, Gemini y Claude.", conclusion: "Sales en 16 de 18 respuestas. En 2 preguntas todavía no.", luz: "atencion", icono: "espejo", contenido: <Herramientas360 solo="espejo" /> },
    { id: "redes", grupo: "dicen", nombre: "Redes y reseñas", corto: "Redes", linea: "Instagram, LinkedIn, Facebook, TikTok y tus reseñas.", conclusion: "Todas las redes suben. Lo importante: cuántos te piden presupuesto.", luz: "ok", icono: "red", contenido: piezas.redes },
    { id: "vigia", grupo: "mercado", nombre: "Vigía", corto: "Vigía", linea: "Ves los cambios importantes de tu competencia.", conclusion: "Una empresa de tu zona ha bajado la revisión anual a 79 €.", luz: "ok", icono: "catalejo", contenido: <Herramientas360 solo="vigia" /> },
    { id: "contactos", grupo: "anuncios", nombre: "Contactos que llegan", corto: "Contactos", linea: "Cuánta gente te escribe, por qué canal y desde qué anuncio o página. Sale solo.", conclusion: `${esc(312)} contactos en este periodo, ${comp === "nada" ? "sin comparar" : "un 16 % más que antes"}.`, luz: "ok", icono: "persona", contenido: piezas.contactos },
    { id: "costecontacto", grupo: "anuncios", nombre: "Coste por contacto", corto: "Coste", linea: "Lo invertido en anuncios entre los contactos que llegan, por canal.", conclusion: "Cada contacto te cuesta 10 €, 8 % menos que antes.", luz: "ok", icono: "moneda", contenido: piezas.costeContacto },
    { id: "campanas", grupo: "anuncios", nombre: "Campañas", corto: "Campañas", linea: "Google Ads, Meta y Microsoft Ads, campaña a campaña.", conclusion: "Aerotermia es la que más contactos trae. Le hemos subido el presupuesto un 10 %.", luz: "ok", icono: "megafono", contenido: piezas.campanas },
    { id: "google", grupo: "anuncios", nombre: "Google, Bing y mapa", corto: "Google", linea: "Tus puestos, tu ficha de Google y Bing.", conclusion: "Sales en el mapa y en 4 búsquedas clave entre los tres primeros.", luz: "ok", icono: "mapa", contenido: piezas.google },
    { id: "crm", grupo: "tuyo", nombre: "Ventas (CRM)", corto: "Ventas", linea: "Tus contactos, fase a fase. El CRM es tuyo.", conclusion: "Preparado: se actualiza cuando mueves un contacto de fase.", luz: "preparado", icono: "embudo", contenido: piezas.crm },
    { id: "clientes", grupo: "tuyo", nombre: "Contactos que se hacen clientes", corto: "Clientes", linea: "Cuántos acaban firmando y de dónde viene cada uno.", conclusion: "Preparado: se activa cuando marcas quién ha firmado.", luz: "preparado", icono: "camino", contenido: piezas.clientes },
    { id: "costecliente", grupo: "tuyo", nombre: "Coste por cliente", corto: "Por cliente", linea: "Lo que te cuesta cada cliente que llega por internet.", conclusion: "Preparado: se activa cuando marcas tus firmas.", luz: "preparado", icono: "moneda", contenido: piezas.costeCliente },
    { id: "indice", grupo: "tuyo", nombre: "Índice de valor", corto: "Índice", linea: "Qué clientes valen más que tu media, sin decirnos cuánto facturas.", conclusion: "Preparado: se activa cuando pones tu ticket medio. Nunca euros.", luz: "preparado", icono: "estrella", contenido: <IndiceValor /> },
    { id: "opcionales", grupo: "tuyo", nombre: "Lo que decides tú", corto: "Opcionales", linea: "Tiempo de respuesta, llamadas y cierre. Apagado de serie.", conclusion: "Ahora mismo no compartes nada con nosotros.", luz: "preparado", icono: "ajustes", contenido: <Mandos /> },
    { id: "peticiones", grupo: "contigo", nombre: "Tus peticiones", corto: "Peticiones", linea: "Pides, te damos fecha y apruebas.", conclusion: "Todo lo que has pedido está hecho o en curso. Tiempo medio, 19 horas.", luz: "ok", icono: "chat", contenido: piezas.peticiones },
    { id: "gastos", grupo: "contigo", nombre: "Gastos", corto: "Gastos", linea: "Lo que has gastado este mes y lo que va aparte.", conclusion: "Comisión sobre lo invertido: 0 €. Siempre.", luz: "ok", icono: "caja", contenido: piezas.gastos },
    { id: "medicion", grupo: "contigo", nombre: "Cómo lo medimos", corto: "Medición", linea: "Tag Manager, etiquetas, cookies y privacidad, explicado fácil.", conclusion: "21 de 21 herramientas funcionando.", luz: "ok", icono: "ajustes", contenido: piezas.medicion },
    { id: "trabajo", grupo: "contigo", nombre: "Todo lo que hacemos", corto: "Trabajo", linea: "Un registro con fecha y con el porqué de cada cosa.", conclusion: "64 tareas este mes, el 98 % entregadas a tiempo.", luz: "ok", icono: "documento", contenido: piezas.trabajo },
    { id: "informes", grupo: "informes", nombre: "Tu informe y tus facturas", corto: "Informe", linea: "Este panel es tu informe: siempre al día, sin esperar a que nadie lo mande.", conclusion: "Hoy no hay nada que esperar: todo está al día. Tus facturas, dentro.", luz: "ok", icono: "documento", contenido: piezas.informes },
    { id: "historico", grupo: "historico", nombre: "Cómo has mejorado", corto: "Histórico", linea: "La evolución mes a mes desde el primer día.", conclusion: "En seis meses, de 120 a 312 contactos al mes.", luz: "ok", icono: "historia", contenido: piezas.historico },
  ];
  MODULOS_REF.current = MODULOS;
  const navegar = (v: Vista) => {
    setVista(v);
    setMenu(false);
    try { window.history.pushState(null, "", hashDe(v)); } catch { /* sin historial */ }
    setTimeout(() => {
      if (!v.g && !v.m) window.scrollTo({ top: 0 });
      else document.getElementById("panel-contenido")?.scrollIntoView({ block: "start" });
    }, 30);
  };
  const ir = (id: string) => { const m = MODULOS.find((x) => x.id === id); if (m) navegar({ g: m.grupo, m: m.id }); };
  const inicio = !vista.g && !vista.m;
  const atencion = MODULOS.filter((m) => m.luz === "atencion");
  const urgentes = MODULOS.filter((m) => m.luz === "problema");

  return (
    <div className="bg-niebla pb-20">
      <style>{`
        .pn-barra,.pn-trazo,.pn-entra,.pn-fade{animation:pnFade .35s ease-out both}
        @keyframes pnFade{from{opacity:0}to{opacity:1}}
        @media (prefers-reduced-motion: reduce){.pn-barra,.pn-trazo,.pn-entra,.pn-fade{animation:none}}
        @media print{body > *:not(main):not([data-versionante]){display:none!important}main#contenido{padding:0!important}}
      `}</style>

      <div className={`bg-noche text-white print:hidden ${inicio ? "pb-10 pt-24 sm:pt-28" : "pb-4 pt-24 sm:pt-28"}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {inicio && (
        <div className="rounded-2xl bg-estrella px-5 py-3 text-sm font-bold text-tinta">
          Panel de demostración con datos inventados de una empresa de ejemplo. Así verás el tuyo, con tus datos reales, en tiempo real y desde el móvil.
        </div>
        )}

        <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white/70">Control de mandos · Climatización Ejemplo, S.L.</p>
            {inicio ? (
              <>
                <h1 className="mt-1 text-3xl font-extrabold sm:text-5xl">Todo lo que pasa en tu sitio.</h1>
                <p className="mt-2 text-lg text-white/80">Casiopea te pone en el siguiente nivel: toda tu visión 360 en una pantalla.</p>
              </>
            ) : (
              <p className="mt-1 text-sm font-bold text-estrella">Datos de demostración de una empresa inventada</p>
            )}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-tinta shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {ahora} personas en tu web ahora · actualizado hace {segundos} s
          </div>
        </header>

        {inicio && (<>
        <section className="mt-6 rounded-3xl bg-white/5 p-5 text-white sm:p-7 lg:grid lg:grid-cols-2 lg:gap-8" aria-label="Resumen de hoy">
          <div>
          <p className="text-sm font-bold text-estrella">Resumen de hoy</p>
          <p className="mt-2 text-lg font-bold sm:text-xl">
            {urgentes.length ? `Hay algo urgente: ${urgentes.map((m) => m.nombre).join(" y ")}.` : `Hoy no hay nada urgente. Han llegado ${esc(312)} contactos en este periodo, a 10 € cada uno.`}
          </p>
          {atencion.length > 0 && <p className="mt-1 text-white/80">Piden un vistazo: {atencion.map((m) => m.nombre).join(" y ")}. Pulsa su luz y lo ves.</p>}
          </div>
          <div className="mt-4 border-t border-white/15 pt-4 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-sm font-bold text-estrella">Lo que te toca a ti hoy</p>
            <ul className="mt-2 space-y-2">
              {[["Llama a los 3 contactos que llevan más de 3 días sin respuesta.", "crm"], ["Contesta las 2 reseñas nuevas de tu ficha de Google.", "redes"]].map(([t, id]) => (
                <li key={id} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base">
                  <span>{t}</span>
                  <button type="button" onClick={() => ir(id)} className="text-sm font-bold text-estrella underline underline-offset-4">Ir</button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-white/60">Son las únicas cosas de hoy que dependen de ti. Todo lo demás lo llevamos nosotros.</p>
          </div>
        </section>

        <div className="mt-5" role="group" aria-label="Periodo">
          <div className="flex flex-wrap items-center gap-2">
            {PERIODOS.filter(([id]) => ["hoy", "ayer", "7", "28", "mes", "pasado"].includes(id)).map(([id, t]) => (
              <button key={id} type="button" aria-pressed={periodo === id} onClick={() => setPeriodo(id)} className={`rounded-full px-4 py-2 text-sm font-bold ${periodo === id ? "bg-estrella text-tinta" : "bg-white/10 text-white hover:bg-white/20"}`}>{t}</button>
            ))}
            <button type="button" aria-pressed={periodo === "rango"} onClick={() => setPeriodo("rango")} className={`rounded-full px-4 py-2 text-sm font-bold ${periodo === "rango" ? "bg-estrella text-tinta" : "bg-white/10 text-white hover:bg-white/20"}`}>Desde / hasta</button>
          </div>
          {periodo === "rango" && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2 font-bold">Desde <input type="date" value={desde} max={hasta} onChange={(e) => setDesde(e.target.value)} className="rounded-lg border border-linea px-2 py-1 font-normal text-tinta" /></label>
              <label className="flex items-center gap-2 font-bold">Hasta <input type="date" value={hasta} min={desde} onChange={(e) => setHasta(e.target.value)} className="rounded-lg border border-linea px-2 py-1 font-normal text-tinta" /></label>
              <span className="text-white/70">{diasRango} {diasRango === 1 ? "día" : "días"}</span>
            </div>
          )}
          <details className="mt-3 text-sm text-white/80">
            <summary className="cursor-pointer font-bold text-white">Comparar con otros periodos y cómo se lee ▾</summary>
            <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label="Comparar con">
              {([["anterior", "Periodo anterior"], ["ano", "Mismo periodo del año pasado"], ["nada", "Nada"]] as const).map(([id, t]) => (
                <button key={id} type="button" aria-pressed={comp === id} onClick={() => setComp(id)} className={`rounded-full px-3.5 py-1.5 font-bold ${comp === id ? "bg-white text-tinta" : "bg-white/10 text-white hover:bg-white/20"}`}>{t}</button>
              ))}
            </div>
            <p className="mt-2">El número grande es lo que ha pasado en el periodo. La flecha dice cuánto más o menos que el periodo con el que comparas. Verde es que va mejor, rojo es que va peor (en el coste por contacto, bajar es mejorar).</p>
          </details>
        </div>

        <div className="mt-4"><FilaLuces modulos={MODULOS} ir={ir} /></div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Reloj titulo="Contactos" valor={String(esc(312))} sub={comp === "nada" ? "sin comparar" : "16 % más que antes"} pct={78} />
          <Reloj titulo="Coste por contacto" valor="10 €" sub="bajar es mejorar" pct={33} invertir />
          <Reloj titulo="Presencia en IA" valor="16 de 18" sub="respuestas donde sales" pct={89} />
          <Reloj titulo="Salud de la web" valor="7 de 8" sub="comprobaciones de hoy" pct={88} />
        </div>
        <p className="mt-3 text-center text-xs text-white/70">Cómo leer los relojes: la aguja en la franja verde, va bien; en la naranja, atento; en la roja, hay que actuar. En el coste, cuanto más a la izquierda, mejor.</p>
        <p className="mt-1 text-center text-xs text-white/50">Última revisión: hoy 07:00 · Próxima: mañana 07:00 · Se actualiza solo, no hay informes que esperar.</p>
        </>)}
      </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

        <div className="mt-6 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          <div className="print:hidden">
            <IndiceLateral vista={vista} grupos={GRUPOS_MODULOS} modulos={MODULOS} navegar={navegar} abierto={menu} setAbierto={setMenu} />
            <a href="#escribenos" className="mt-3 hidden rounded-2xl bg-estrella px-4 py-3 text-center text-sm font-extrabold text-tinta hover:bg-estrella-2 lg:block">Escríbenos</a>
          </div>
          <div id="panel-contenido" className="mt-4 min-w-0 scroll-mt-24 space-y-5 lg:mt-0">
            {!inicio && <div className="print:hidden"><Migas vista={vista} grupos={GRUPOS_MODULOS} modulos={MODULOS} navegar={navegar} /></div>}

            {inicio && (
              <>
                <GuiaInicio />
                <h2 className="pt-2 text-xl font-extrabold">Elige una sección</h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {GRUPOS_MODULOS.map((g) => <TarjetaGrupo key={g.id} g={g} ms={MODULOS.filter((m) => m.grupo === g.id)} navegar={navegar} />)}
                </div>
              </>
            )}

            {vista.g && !vista.m && (() => {
              const g = GRUPOS_MODULOS.find((x) => x.id === vista.g);
              if (!g) return null;
              return (
                <section className="pn-fade space-y-3" aria-label={g.titulo}>
                  <div className="rounded-3xl bg-white p-5 ring-1 ring-linea sm:p-6" style={{ borderTop: `6px solid ${g.color}` }}>
                    <h2 className="text-2xl font-extrabold">{g.titulo}</h2>
                    <p className="mt-1 text-gris">{g.descripcion}</p>
                    {g.frase && <p className="mt-2 font-bold text-tinta">{g.frase}</p>}
                  </div>
                  {MODULOS.filter((m) => m.grupo === g.id).map((m) => <TarjetaModulo key={m.id} m={m} color={g.color} navegar={navegar} />)}
                </section>
              );
            })()}

            {vista.m && (() => {
              const m = MODULOS.find((x) => x.id === vista.m);
              if (!m) return null;
              const g = GRUPOS_MODULOS.find((x) => x.id === m.grupo);
              const hermanos = MODULOS.filter((x) => x.grupo === m.grupo);
              const i = hermanos.findIndex((x) => x.id === m.id);
              return <PaginaModulo m={m} color={g?.color ?? "#334155"} ant={hermanos[i - 1]} sig={hermanos[i + 1]} navegar={navegar} />;
            })()}
          </div>
        </div>

        <div className="mt-6 space-y-5">
              <p className="rounded-2xl bg-niebla p-4 text-sm text-gris">
                <b className="text-tinta">De dónde salen estos datos:</b> Google Analytics, Google Ads, Meta, Microsoft Ads, Search Console y los formularios de tu web. Actualizados hace unos minutos. Son datos de ejemplo de una empresa inventada.
              </p>

          <section id="escribenos" className="scroll-mt-24 rounded-3xl bg-noche p-6 text-white sm:p-8 print:hidden" aria-label="Escríbenos">
            <p className="text-xl font-extrabold">Escríbenos. Te contestamos por correo.</p>
            <p className="mt-1 text-white/75">Para pedirnos una mejora, un dato que echas de menos, darnos información que nos ayude con tus campañas, o contarnos una duda. En 24 a 48 horas lo tienes.</p>
            {enviado ? (
              <p className="mt-4 rounded-2xl bg-white/10 p-4 font-bold text-estrella">Recibido. Te contestamos por correo en 24 a 48 horas. (En esta demostración no se envía nada.)</p>
            ) : (
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (pedido.trim()) setEnviado(true);
                }}
              >
                <div className="flex flex-wrap gap-2" role="group" aria-label="De qué se trata">
                  {["Una mejora para el panel", "Un dato que echo de menos", "Información para vosotros", "Una duda", "Algo no funciona"].map((t) => (
                    <button key={t} type="button" aria-pressed={tipoMsg === t} onClick={() => setTipoMsg(t)} className={`rounded-full px-4 py-2 text-sm font-bold ${tipoMsg === t ? "bg-estrella text-tinta" : "bg-white/10 text-white hover:bg-white/20"}`}>{t}</button>
                  ))}
                </div>
                <label className="sr-only" htmlFor="pedido-panel">Tu mensaje</label>
                <textarea id="pedido-panel" rows={3} value={pedido} onChange={(e) => setPedido(e.target.value)} placeholder={tipoMsg === "Información para vosotros" ? "Por ejemplo: en noviembre hacemos una promoción de calderas" : "Por ejemplo: quiero ver los contactos por zona de Madrid"} className="w-full rounded-2xl bg-white px-5 py-3 text-tinta focus:outline-none focus:ring-4 focus:ring-estrella/50" />
                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">Enviar por correo</button>
                  <span className="text-xs text-white/60">Es un mensaje para tu equipo de Casiopea. No hace falta que escribas cifras de tu empresa.</span>
                </div>
              </form>
            )}
          </section>

          <p className="text-center text-sm text-gris">
            Datos inventados para la demostración. <Link href="/estudio-gratuito" className="font-bold text-tinta underline underline-offset-4">Pide tu estudio gratuito</Link> y te enseñamos cómo sería el tuyo.
          </p>
        </div>
      </div>
    </div>
  );
}
