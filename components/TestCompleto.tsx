"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LogoMarca from "@/components/LogoMarca";
import VideoFondo from "@/components/VideoFondo";
import EnviarResultado from "@/components/EnviarResultado";
import { BarraEstrella, COLOR_OPCION, Confeti, Opcion, Reaccion } from "@/components/JuegoTest";

// Test completo: 50 preguntas en 10 bloques más un bloque de gastos. Cada bloque se puede saltar.
// El primer bloque (tu empresa) no puntúa: sirve para personalizar el resultado.
// Da una nota por área, lo que pagas hoy (dinero y tiempo), dónde se escapan clientes
// y qué haríamos primero. No da nuestro precio: invita a pedir presupuesto.
// Todo se calcula en el navegador; no se envía nada.

type Opcion = { t: string; v: number }; // v: 0 a 3 puntos
type Pregunta = { id: string; p: string; o: Opcion[]; fallo: string; arreglo: string; peso: number };
type Bloque = { id: string; titulo: string; intro: string; preguntas: Pregunta[]; contexto?: boolean };

const SINO_NOSE = (si: string, aMedias: string, no: string): Opcion[] => [
  { t: si, v: 3 },
  { t: aMedias, v: 1 },
  { t: no, v: 0 },
];

const BLOQUES: Bloque[] = [
  {
    id: "empresa",
    titulo: "Tu empresa",
    contexto: true,
    intro: "Para que el resultado hable de tu caso y no de una empresa cualquiera. No puntúa.",
    preguntas: [
      { id: "e1", p: "¿A qué se dedica tu empresa?", o: [{ t: "Servicios a particulares", v: 0 }, { t: "Servicios a empresas", v: 0 }, { t: "Tienda o comercio", v: 0 }, { t: "Industria o fabricación", v: 0 }, { t: "Salud o bienestar", v: 0 }, { t: "Otra", v: 0 }], fallo: "", arreglo: "", peso: 0 },
      { id: "e2", p: "¿Cuánto factura al año, más o menos?", o: [{ t: "Menos de 500.000 €", v: 0 }, { t: "De 500.000 € a 4 millones", v: 0 }, { t: "De 4 a 20 millones", v: 0 }, { t: "Más de 20 millones", v: 0 }, { t: "Prefiero no decirlo", v: 0 }], fallo: "", arreglo: "", peso: 0 },
      { id: "e3", p: "¿Cuántas personas trabajan en ella?", o: [{ t: "Menos de 10", v: 0 }, { t: "De 10 a 50", v: 0 }, { t: "De 50 a 250", v: 0 }, { t: "Más de 250", v: 0 }], fallo: "", arreglo: "", peso: 0 },
      { id: "e4", p: "¿Dónde están tus clientes?", o: [{ t: "En mi ciudad o provincia", v: 0 }, { t: "En toda España", v: 0 }, { t: "También fuera de España", v: 0 }, { t: "Solo vendo por internet", v: 0 }], fallo: "", arreglo: "", peso: 0 },
      { id: "e5", p: "¿Qué es lo que más quieres conseguir este año?", o: [{ t: "Más clientes", v: 0 }, { t: "Clientes más rentables", v: 0 }, { t: "Pagar menos por el marketing", v: 0 }, { t: "Dejar de perseguir a proveedores", v: 0 }, { t: "Abrir un mercado nuevo", v: 0 }], fallo: "", arreglo: "", peso: 0 },
      { id: "e6", p: "¿Cuánto vale de media un cliente para ti?", o: [{ t: "Menos de 300 €", v: 0 }, { t: "De 300 € a 3.000 €", v: 0 }, { t: "De 3.000 € a 30.000 €", v: 0 }, { t: "Más de 30.000 €", v: 0 }], fallo: "", arreglo: "", peso: 0 },
    ],
  },
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
      { id: "c5", p: "Cuando pides algo, ¿cuánto tardan de media en hacerlo?", o: SINO_NOSE("Menos de 48 horas", "Una semana", "Más, o depende"), fallo: "Lo que pides tarda semanas: las oportunidades no esperan.", arreglo: "Respuesta el mismo día, 48 horas para lo del día a día y fecha cerrada para lo grande.", peso: 2 },
    ],
  },
  {
    id: "marca",
    titulo: "Competencia y marca",
    intro: "Cómo te ven al lado de los que compiten contigo por el mismo cliente.",
    preguntas: [
      { id: "m1", p: "¿Sabes quiénes son tus tres competidores principales en internet?", o: SINO_NOSE("Sí, y los vigilamos", "Más o menos", "No"), fallo: "No vigilas a tu competencia en internet: no sabes qué hacen para quitarte clientes.", arreglo: "Seguimiento mensual de tu competencia: posiciones, anuncios, precios y reseñas.", peso: 2 },
      { id: "m2", p: "Al lado de tu competencia, tu web y tus redes parecen…", o: SINO_NOSE("Mejores", "Parecidas", "Peores"), fallo: "Tu imagen digital está por debajo de la de tu competencia: el cliente compara y se va.", arreglo: "Web e imagen que te pongan por delante de tu competencia desde el primer vistazo.", peso: 2 },
      { id: "m3", p: "¿Está claro en tu web por qué elegirte a ti y no a otro?", o: SINO_NOSE("Sí, en la primera pantalla", "Hay que buscarlo", "No"), fallo: "Tu web no explica por qué elegirte: pareces uno más.", arreglo: "Mensaje claro en la primera pantalla: qué haces, para quién y por qué tú.", peso: 3 },
      { id: "m4", p: "¿Salen en tu web casos reales, opiniones o resultados de clientes?", o: SINO_NOSE("Sí, con nombre y foto", "Algunos, genéricos", "No"), fallo: "No enseñas pruebas reales: sin casos ni opiniones, cuesta confiar.", arreglo: "Casos reales y opiniones de clientes en las páginas que venden.", peso: 2 },
      { id: "m5", p: "¿Apareces en medios, directorios o rankings de tu sector?", o: SINO_NOSE("Sí, en varios", "En alguno", "No"), fallo: "No apareces en medios ni directorios: Google y las IA te dan menos autoridad.", arreglo: "Presencia en directorios del sector y propuestas de medios, siempre con tu visto bueno.", peso: 1 },
    ],
  },
  {
    id: "ventas",
    titulo: "Ventas y seguimiento",
    intro: "Lo que pasa entre que alguien te contacta y te paga. Aquí se pierde mucho dinero sin hacer ruido.",
    preguntas: [
      { id: "v1", p: "De cada 10 personas que piden presupuesto, ¿cuántas acaban comprando?", o: [{ t: "Más de 4", v: 3 }, { t: "Entre 2 y 4", v: 2 }, { t: "Menos de 2", v: 0 }, { t: "No lo sé", v: 0 }], fallo: "No sabes cuántos presupuestos cierras, o cierras pocos: ahí hay ventas que se escapan.", arreglo: "Medir el cierre de cada presupuesto y mejorar lo que hace que se caigan.", peso: 3 },
      { id: "v2", p: "¿Cuánto tardáis en enviar un presupuesto?", o: [{ t: "El mismo día", v: 3 }, { t: "Dos o tres días", v: 2 }, { t: "Una semana o más", v: 0 }], fallo: "Tardáis en enviar presupuestos: quien llega antes, suele ganar.", arreglo: "Calculadoras y plantillas para que el cliente tenga una cifra orientativa al momento.", peso: 2 },
      { id: "v3", p: "¿Sabes qué canal te trae los clientes que más facturan?", o: SINO_NOSE("Sí", "Me hago una idea", "No"), fallo: "No sabes qué canal trae los mejores clientes: inviertes a ciegas.", arreglo: "Atribución completa: de dónde viene cada cliente y cuánto factura.", peso: 3 },
      { id: "v4", p: "¿Tu equipo comercial recibe al momento cada contacto nuevo?", o: SINO_NOSE("Sí, con aviso al móvil", "Lo mira cuando puede", "No hay un sistema"), fallo: "Los contactos nuevos no llegan al momento a quien vende: se enfrían.", arreglo: "Aviso instantáneo a tu comercial con todo lo que el cliente ha hecho en la web.", peso: 2 },
      { id: "v5", p: "¿Vuelves a contactar con clientes antiguos para que repitan o te recomienden?", o: SINO_NOSE("Sí, con un plan", "A veces", "Nunca"), fallo: "No trabajas a tus clientes antiguos: son los más fáciles de volver a vender.", arreglo: "Correos y mensajes a clientes antiguos para repetir y recomendar.", peso: 1 },
    ],
  },
  {
    id: "contenido",
    titulo: "Contenido y vídeo",
    intro: "Lo que cuentas y cómo lo cuentas. Es lo que hace que te elijan antes de hablar contigo.",
    preguntas: [
      { id: "k1", p: "¿Tienes fotos y vídeos propios de tu trabajo, o usas imágenes de banco?", o: SINO_NOSE("Propios y buenos", "Mezcla", "De banco o ninguno"), fallo: "No tienes fotos ni vídeos propios: tu web parece la de cualquiera.", arreglo: "Guiones y plan de grabación; montamos lo que grabes o coordinamos una productora.", peso: 2 },
      { id: "k2", p: "¿Respondes en tu web las preguntas que más te hacen los clientes?", o: SINO_NOSE("Sí, todas", "Algunas", "No"), fallo: "Tu web no responde las dudas de tus clientes: te llaman para preguntar, o se van.", arreglo: "Preguntas frecuentes y artículos con las dudas reales de tus clientes.", peso: 2 },
      { id: "k3", p: "¿Tienes precios orientativos o una calculadora en la web?", o: SINO_NOSE("Sí", "Solo «pide presupuesto»", "No"), fallo: "Sin precios orientativos, muchos no se atreven a escribirte.", arreglo: "Calculadora de precio orientativo que además te trae contactos.", peso: 2 },
      { id: "k4", p: "Cuando alguien te pide información y no compra, ¿le haces seguimiento?", o: SINO_NOSE("Sí, con avisos y mensajes programados", "Cuando nos acordamos", "No"), fallo: "Sin seguimiento, los que dudan se olvidan de ti y acaban comprando a otro.", arreglo: "Seguimientos automáticos desde tu CRM: un mensaje o una llamada en el momento justo, nada de boletines masivos.", peso: 2 },
    ],
  },
];

// Logos de cada bloque y de cada pregunta, para que el test se lea de un vistazo.
const LOGOS_BLOQUE: Record<string, string[]> = {
  empresa: ["Google Maps", "Google", "LinkedIn"],
  web: ["Google Chrome", "PageSpeed", "Google"],
  google: ["Google", "Ficha de Google", "Bing", "ChatGPT", "Gemini"],
  anuncios: ["Google Ads", "Meta", "TikTok", "Bing"],
  redes: ["Instagram", "Facebook", "TikTok", "YouTube", "LinkedIn"],
  atencion: ["WhatsApp", "Gmail", "Claude"],
  control: ["Google Analytics", "Tag Manager", "Search Console"],
  marca: ["Semrush", "Google", "ChatGPT"],
  ventas: ["WhatsApp", "Gmail", "Google Analytics"],
  contenido: ["YouTube", "Instagram", "Gmail"],
};
const VIDEO_BLOQUE: Record<string, string> = {
  empresa: "despacho",
  web: "mano-pantalla",
  google: "ojo-pantallas",
  anuncios: "movil-corazones",
  redes: "holograma-redes",
  atencion: "neon-llamada",
  control: "puntos-luz",
  marca: "equipo-celebra",
  ventas: "hombre-celebra",
  contenido: "neon-sonrisa",
};
const ANIMO = ["¡Bien! Un bloque menos", "¡Vas como un cohete!", "¡Genial, sigue así!", "¡Ya queda menos!", "¡Estás a tope!", "¡Casi lo tienes!"];
const COLOR_BLOQUE: Record<string, string> = {
  empresa: "from-[#24387a] to-[#0e1a3d]",
  web: "from-[#1f6feb] to-[#0e1a3d]",
  google: "from-[#1a73e8] to-[#188038]",
  anuncios: "from-[#f9ab00] to-[#e8710a]",
  redes: "from-[#c13584] to-[#5851db]",
  atencion: "from-[#128c7e] to-[#075e54]",
  control: "from-[#e37400] to-[#24387a]",
  marca: "from-[#ff642d] to-[#24387a]",
  ventas: "from-[#0f9d58] to-[#0e1a3d]",
  contenido: "from-[#ff0000] to-[#8a1538]",
};
const LOGO_PREGUNTA: Record<string, string> = {
  e4: "Google Maps", w1: "Google", w2: "PageSpeed", g1: "Google", g2: "Ficha de Google", g3: "Ficha de Google", g4: "Ficha de Google",
  g5: "ChatGPT", a1: "Google Ads", a2: "Google Analytics", a4: "Meta", r1: "Instagram", r2: "TikTok", r3: "Facebook", r4: "YouTube",
  t1: "WhatsApp", t2: "Claude", t3: "Gmail", t5: "Ficha de Google", c1: "Google Analytics", c2: "Search Console", m1: "Semrush", m2: "Instagram",
  m5: "Google", v3: "Google Analytics", v4: "WhatsApp", v5: "Gmail", k1: "YouTube", k4: "Gmail",
};
const ICONO_CTX: Record<string, string> = {
  e1: "M4 21V8l8-5 8 5v13M9 21v-6h6v6",
  e2: "M15 6.5A5.5 5.5 0 1 0 15 17.5M6 10h7M6 14h7",
  e3: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 15c3 0 8 1 8 5",
  e5: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01",
  e6: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
};
const ANOTADO: Record<string, string> = {
  e1: "Anotado: hablaremos de tu sector",
  e2: "Anotado. No sale de tu navegador",
  e3: "Anotado",
  e4: "Perfecto, lo tendremos en cuenta",
  e5: "Esa será nuestra prioridad",
  e6: "Anotado: así sabremos lo que vale cada cliente que te traigamos",
};

const REACCION = [
  { t: "Aquí se te escapan clientes", c: "bg-rose-100 text-rose-800" },
  { t: "Mejorable, pero tiene arreglo", c: "bg-orange-100 text-orange-800" },
  { t: "No está mal", c: "bg-amber-100 text-amber-800" },
  { t: "Muy bien, esto suma", c: "bg-emerald-100 text-emerald-800" },
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
  const [saltados, setSaltados] = useState<string[]>([]);
  const [fiesta, setFiesta] = useState<string | null>(null);
  const [paso, setPaso] = useState(0); // 0..BLOQUES.length-1 bloques, BLOQUES.length gastos, TOTAL_PASOS resultado
  const [qi, setQi] = useState(0); // pregunta dentro del bloque
  const [reaccion, setReaccion] = useState<{ t: string; tono: "bien" | "medio" | "mal" | "neutro" } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caja = useRef<HTMLDivElement>(null);

  const ir = (n: number) => {
    setPaso(n);
    requestAnimationFrame(() => caja.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const reiniciar = () => {
    setResp({});
    setSaltados([]);
    setGastos(Object.fromEntries(PROVEEDORES.map((p) => [p.id, 0])));
    setInversion(0);
    setComision(0);
    setQi(0);
    ir(0);
  };

  const r = useMemo(() => {
    const puntuan = BLOQUES.filter((b) => !b.contexto && !saltados.includes(b.id));
    const areas = puntuan.map((b) => {
      const resp_ = b.preguntas.filter((q) => resp[q.id] !== undefined);
      const max = resp_.reduce((a, q) => a + 3 * q.peso, 0) || 1;
      const pts = resp_.reduce((a, q) => a + val(q, resp) * q.peso, 0);
      return { id: b.id, titulo: b.titulo, nota: Math.round((pts / max) * 100) };
    });
    const todas = puntuan.flatMap((b) => b.preguntas).filter((q) => resp[q.id] !== undefined);
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
      nota: max ? Math.round((pts / max) * 100) : 0,
      fallos,
      horasAno: Math.round(horasSemana * 46),
      proveedoresMes,
      comisionMes,
      tiempoMes,
      numProveedores: Object.values(gastos).filter((v) => v > 0).length,
      totalMes: proveedoresMes + comisionMes,
    };
  }, [resp, gastos, inversion, comision, saltados]);

  const bloque = BLOQUES[paso];
  const respondidas = Object.keys(resp).length;
  const saltar = () => {
    if (bloque && !saltados.includes(bloque.id)) setSaltados([...saltados, bloque.id]);
    setReaccion(null);
    setQi(0);
    ir(paso + 1);
  };
  const terminarBloque = () => {
    if (!bloque) return;
    setSaltados((s) => s.filter((x) => x !== bloque.id));
    setFiesta(ANIMO[paso % ANIMO.length]);
    setConfeti(Date.now());
    setTimeout(() => setFiesta(null), 1900);
    setQi(0);
    ir(paso + 1);
  };
  const siguiente = () => {
    setReaccion(null);
    if (!bloque) return;
    if (qi < bloque.preguntas.length - 1) setQi(qi + 1);
    else terminarBloque();
  };
  const atras = () => {
    if (espera.current) clearTimeout(espera.current);
    setReaccion(null);
    if (qi > 0) return setQi(qi - 1);
    if (paso > 0) {
      const previo = BLOQUES[paso - 1];
      setQi(previo ? previo.preguntas.length - 1 : 0);
      ir(paso - 1);
    }
  };
  const elegir = (q: Pregunta, j: number) => {
    if (espera.current) clearTimeout(espera.current);
    setResp((r) => ({ ...r, [q.id]: j }));
    if (bloque?.contexto) setReaccion({ t: ANOTADO[q.id] ?? "Anotado", tono: "neutro" });
    else {
      const v = q.o[j].v;
      setReaccion({ t: REACCION[v].t, tono: v >= 3 ? "bien" : v >= 1 ? "medio" : "mal" });
    }
    espera.current = setTimeout(siguiente, 1000);
  };
  const texto = (id: string) => {
    const q = BLOQUES[0].preguntas.find((x) => x.id === id);
    return q && resp[id] !== undefined ? q.o[resp[id]].t : null;
  };
  const totalPreguntas = BLOQUES.reduce((a, b) => a + b.preguntas.length, 0);

  const nivel =
    r.nota >= 75
      ? { t: "Tu marketing está en forma", d: "Tienes buena base. Aun así, hemos encontrado puntos donde ganar más clientes con lo mismo." }
      : r.nota >= 45
        ? { t: "Vas a medias", d: "Tienes piezas sueltas que funcionan, pero se te escapan clientes en varios sitios. Todo esto tiene arreglo, y rápido." }
        : { t: "Hay muchísimo margen", d: "Ahora mismo estás dejando la mayoría de los clientes de internet a tu competencia. La buena noticia: es donde antes se nota el cambio." };

  // Al ver el resultado, se guarda un resumen en esta visita para que viaje con la solicitud del estudio.
  useEffect(() => {
    if (paso !== TOTAL_PASOS) return;
    const perfil = BLOQUES[0].preguntas.map((q) => `${q.p} ${resp[q.id] !== undefined ? q.o[resp[q.id]].t : "(sin contestar)"}`).join("\n");
    const resumen = [
      `Nota: ${r.nota}/100`,
      `Por áreas: ${r.areas.map((a) => `${a.titulo} ${a.nota}`).join(", ")}`,
      `Gasto declarado: ${fmt(r.totalMes)} €/mes en proveedores y comisiones; ${fmt(inversion)} €/mes de inversión en anuncios`,
      saltados.length ? `Bloques saltados: ${saltados.join(", ")}` : "",
      perfil,
      `Fallos principales:\n- ${r.fallos.slice(0, 10).map((q) => q.fallo).join("\n- ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      sessionStorage.setItem("casiopea-test", resumen);
    } catch {}
  }, [paso, r, resp, saltados, inversion]);

  const color = (n: number) => (n >= 75 ? "bg-emerald-400" : n >= 45 ? "bg-estrella" : "bg-rose-400");

  return (
    <div ref={caja} className="relative scroll-mt-28">
      {fiesta && typeof document !== "undefined" && createPortal(
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
      {paso < TOTAL_PASOS && (
        <div className="mb-6">
          <BarraEstrella
            avance={respondidas / totalPreguntas}
            texto={respondidas === 0 ? "Empieza cuando quieras: la estrella te acompaña hasta la meta" : `¡Llevas ${respondidas} de ${totalPreguntas}! Bloque ${paso + 1} de ${TOTAL_PASOS}`}
          />
        </div>
      )}

      {bloque && (() => {
        const q = bloque.preguntas[qi] ?? bloque.preguntas[0];
        const letras = "ABCDEF";
        return (
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.55)] ring-1 ring-linea">
            <div className="relative overflow-hidden px-6 py-7 text-white sm:px-10 sm:py-8">
              <div aria-hidden="true" className="absolute inset-0">
                <VideoFondo key={bloque.id} nombre={VIDEO_BLOQUE[bloque.id] ?? "constelaciones-azules"} alt="" />
              </div>
              <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br opacity-[0.78] ${COLOR_BLOQUE[bloque.id] ?? "from-noche-3 to-noche"}`} />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
                <div className="max-w-xl">
                  <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">Bloque {paso + 1} de {TOTAL_PASOS}</p>
                  <p className="mt-2 text-3xl font-extrabold sm:text-4xl">{bloque.titulo}</p>
                  <p className="mt-1 text-white/90">{bloque.intro}</p>
                </div>
                <div aria-hidden="true" className="flex flex-wrap gap-2.5">
                  {(LOGOS_BLOQUE[bloque.id] ?? []).map((l, i) => (
                    <span key={l} className="flota grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-lg sm:h-14 sm:w-14" style={{ animationDelay: `${i * 0.35}s` }}>
                      <LogoMarca nombre={l} tam={28} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(ellipse_at_top_right,#eef2ff,transparent_60%)] p-6 sm:p-10">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {bloque.preguntas.map((x, i) => (
                  <span key={x.id} className={`h-2.5 rounded-full transition-all ${i === qi ? "w-8 bg-estrella" : resp[x.id] !== undefined ? "w-2.5 bg-noche" : "w-2.5 bg-linea"}`} />
                ))}
                <span className="ml-2 text-sm font-bold text-gris">Pregunta {qi + 1} de {bloque.preguntas.length}</span>
              </div>

              <fieldset key={q.id} className="entra mt-6">
                <legend className="flex items-start gap-4 text-2xl font-extrabold sm:text-3xl">
                  {ICONO_CTX[q.id] ? (
                    <span className="flota grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-estrella text-tinta shadow-md">
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONO_CTX[q.id]} /></svg>
                    </span>
                  ) : LOGO_PREGUNTA[q.id] ? (
                    <span className="flota grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-linea"><LogoMarca nombre={LOGO_PREGUNTA[q.id]} tam={32} /></span>
                  ) : (
                    <span className="flota grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-noche text-xl font-extrabold text-estrella shadow-md">{qi + 1}</span>
                  )}
                  <span className="pt-1.5">{q.p}</span>
                </legend>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {q.o.map((o, j) => (
                    <Opcion key={o.t} letra={letras[j]} texto={o.t} color={COLOR_OPCION[j % COLOR_OPCION.length]} activa={resp[q.id] === j} onClick={() => elegir(q, j)} />
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 min-h-[3.5rem]">{reaccion && <Reaccion texto={reaccion.t} tono={reaccion.tono} />}</div>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-linea pt-6">
                {(paso > 0 || qi > 0) && (
                  <button type="button" onClick={atras} className="rounded-full px-4 py-2.5 font-bold text-gris hover:bg-niebla hover:text-tinta">
                    Atrás
                  </button>
                )}
                {resp[q.id] !== undefined && !reaccion && (
                  <button type="button" onClick={siguiente} className="rounded-full bg-estrella px-6 py-2.5 font-bold text-tinta hover:bg-estrella-2">
                    {qi < bloque.preguntas.length - 1 ? "Siguiente" : "Terminar bloque"}
                  </button>
                )}
                <button type="button" onClick={saltar} className="ml-auto rounded-full border border-linea px-5 py-2.5 text-sm font-bold text-gris hover:border-noche hover:text-tinta">
                  Saltar este bloque
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {paso === BLOQUES.length && (
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-35px_rgba(14,26,61,0.55)] ring-1 ring-linea">
          <div className="relative overflow-hidden px-6 py-7 text-white sm:px-10 sm:py-8">
            <div aria-hidden="true" className="absolute inset-0"><VideoFondo nombre="papeles" alt="" /></div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#e8710a] to-[#0e1a3d] opacity-[0.84]" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
              <div className="max-w-xl">
                <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">Último bloque</p>
                <p className="mt-2 text-3xl font-extrabold sm:text-4xl">Lo que pagas hoy</p>
                <p className="mt-1 text-white/90">Toca el tramo más parecido. Si no tienes ese proveedor, déjalo en «Nada». No hace falta ser exacto.</p>
              </div>
              <div aria-hidden="true" className="flex gap-2.5">
                {["Google Ads", "Meta", "Semrush"].map((l, i) => (
                  <span key={l} className="flota grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-lg sm:h-14 sm:w-14" style={{ animationDelay: `${i * 0.35}s` }}><LogoMarca nombre={l} tam={28} /></span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-7 p-6 sm:p-10">
            {PROVEEDORES.map((p, k) => (
              <fieldset key={p.id}>
                <legend className="text-lg font-extrabold">{p.t}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TRAMOS.map((t) => {
                    const activo = gastos[p.id] === t.v;
                    const c = COLOR_OPCION[k % COLOR_OPCION.length];
                    return (
                      <button key={t.t} type="button" aria-pressed={activo} onClick={() => setGastos({ ...gastos, [p.id]: t.v })}
                        style={activo ? { background: c, borderColor: c } : undefined}
                        className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${activo ? "salta text-white" : "border-linea bg-white hover:-translate-y-0.5 hover:border-noche"}`}>
                        {t.t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <fieldset>
              <legend className="text-lg font-extrabold">Lo que inviertes en anuncios al mes</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {INVERSIONES.map((v) => (
                  <button key={v} type="button" aria-pressed={inversion === v} onClick={() => setInversion(v)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${inversion === v ? "salta border-noche bg-noche text-white" : "border-linea bg-white hover:-translate-y-0.5 hover:border-noche"}`}>
                    {v === 0 ? "Nada" : `${fmt(v)} €${v === 20000 ? " o más" : ""}`}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-lg font-extrabold">Comisión que te cobran sobre esa inversión</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {COMISIONES.map((c) => (
                  <button key={c.t} type="button" aria-pressed={comision === c.v && c.t !== "No lo sé"} onClick={() => setComision(c.v)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${comision === c.v ? "salta border-rose-500 bg-rose-500 text-white" : "border-linea bg-white hover:-translate-y-0.5 hover:border-noche"}`}>
                    {c.t}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-wrap items-center gap-3 border-t border-linea pt-6">
              <button type="button" onClick={atras} className="rounded-full px-4 py-2.5 font-bold text-gris hover:bg-niebla hover:text-tinta">
                Atrás
              </button>
              <button type="button" onClick={() => { setConfeti(Date.now()); ir(TOTAL_PASOS); }} className="rounded-full bg-estrella px-7 py-3.5 text-lg font-extrabold text-tinta shadow-lg hover:bg-estrella-2">
                Ver mi resultado
              </button>
            </div>
          </div>
        </div>
      )}

      {paso === TOTAL_PASOS && (
        <div className="space-y-6" aria-live="polite">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-noche p-7 text-white sm:p-10">
              <div>
                {[[8, 12], [82, 8], [90, 40], [70, 70], [12, 75], [45, 6]].map(([x, y], i) => (
                  <span key={i} aria-hidden="true" className="titila absolute h-2 w-2 rounded-full bg-estrella" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} />
                ))}
                <p className="text-sm text-white/70">Tu nota de marketing digital</p>
                <p className="mt-2 text-7xl font-extrabold leading-none text-estrella sm:text-8xl">
                  {r.nota}
                  <span className="text-3xl text-white/50"> / 100</span>
                </p>
                <p className="mt-5 text-2xl font-extrabold">{nivel.t}</p>
                <p className="mt-2 text-white/80">{nivel.d}</p>
                {(texto("e1") || texto("e5")) && (
                  <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-white/85">
                    <b className="text-estrella">Tu caso: </b>
                    {[
                      texto("e1") && texto("e1") !== "Otra" ? texto("e1") : null,
                      texto("e4") ? ({ "En mi ciudad o provincia": "clientes en tu zona", "En toda España": "clientes en toda España", "También fuera de España": "clientes también fuera de España", "Solo vendo por internet": "venta solo por internet" } as Record<string, string>)[texto("e4")!] : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                    {texto("e5") && <>. Tu prioridad: <b className="text-white">{texto("e5")?.toLowerCase()}</b>. El estudio gratuito empieza por ahí.</>}
                  </p>
                )}
                {saltados.length > 0 && (
                  <p className="mt-3 text-sm text-white/60">Has saltado {saltados.length} bloque{saltados.length === 1 ? "" : "s"}. La nota se calcula solo con lo que has contestado.</p>
                )}
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
                <p className="mt-1 text-4xl font-extrabold">{resp.c4 === undefined ? "Sin datos" : `${r.horasAno} h`}</p>
                <p className="text-sm">{resp.c4 === undefined ? "Contesta el bloque de medición y proveedores para calcularlo." : `al año coordinando proveedores, unos ${fmt(r.tiempoMes * 12)} € si tu hora vale ${VALOR_HORA} €.`}</p>
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
                Te preparamos un estudio gratuito y una cuota mensual fija, la misma para cualquier tamaño de empresa, que lo incluye <strong className="text-white">absolutamente todo</strong>: web, Google, anuncios, redes, automatizaciones, informes diarios y cada cambio que pidas en 48 horas. Sin comisiones sobre lo que inviertas y sin sorpresas.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/estudio-gratuito" className="rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2">
                  Quiero mi presupuesto
                </Link>
                <button type="button" onClick={reiniciar} className="rounded-full border border-white/30 px-7 py-3.5 font-bold hover:bg-white/10">
                  Repetir el test
                </button>
              </div>
              <div className="mt-8"><EnviarResultado origen="test completo" /></div>
              <p className="mt-6 text-sm text-white/60">Cifras orientativas, calculadas con tus respuestas en tu navegador. Solo nos llega algo si nos pides que te lo enviemos.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
