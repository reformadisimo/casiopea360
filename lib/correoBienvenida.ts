// Correo de bienvenida del test de idoneidad. {{{FIRST_NAME}}} se sustituye al enviar (app/api/solicitud).
// 4-nov-2026: rehecho con la plantilla de correos (lib/correoCliente.ts) y al día con lo decidido:
// primero vemos si podemos ayudar (48 horas laborables); si podemos, el estudio en menos de una semana (normalmente tres días);
// si ahora no, lista de espera. Nunca «encajes o no».
import { correoCliente } from "@/lib/correoCliente";

export const CORREO_BIENVENIDA_ASUNTO = "Gracias, {{{FIRST_NAME}}}. Ya tenemos tu test";
export const CORREO_BIENVENIDA_HTML = correoCliente({
  titulo: "Gracias. Ya tenemos tu test",
  preheader: "Lo revisamos uno a uno. En 48 horas laborables te decimos si podemos ayudarte.",
  cabecera: true,
  saludo: "Hola, {{{FIRST_NAME}}}.",
  primero: "**No tienes que hacer nada más.** Ni llamadas ni reuniones. Ahora nos toca a nosotros.",
  animo: "Gracias por dedicarle estos minutos. Esto es lo que va a pasar:",
  cajas: [
    { titulo: "Lo revisamos uno a uno", vinetas: ["Miramos tu web, cómo sales en Google y lo que nos has contado."] },
    { titulo: "En 48 horas laborables te decimos si podemos ayudarte", vinetas: ["Si podemos, nos ponemos con tu estudio, sin coste y sin compromiso.", "Si ahora no, te apuntamos en la lista de espera y te avisamos cuando haya hueco."] },
    { titulo: "Si podemos ayudarte, tu estudio en menos de una semana", vinetas: ["Normalmente, en unos tres días.", "Te llega a tu correo."] },
  ],
  video: {
    titulo: "Mientras te leemos, esto es lo que hacemos",
    texto: "Son 40 segundos. Sin prisa: el vídeo no se va a ninguna parte.",
    imagen: "https://www.casiopea360.es/correo/video.jpg",
    href: "https://www.casiopea360.es/estudio-gratuito?utm_source=correo&utm_campaign=bienvenida",
  },
  muestras: {
    titulo: "Y esto es lo que podrías tener",
    texto: "Ejemplos con datos inventados, para que veas el estilo. Pulsa y míralos en grande.",
    href: "https://www.casiopea360.es/lo-que-consigues?utm_source=correo&utm_campaign=bienvenida",
    items: [
      { imagen: "https://www.casiopea360.es/correo/web.jpg", pie: "Tu web" },
      { imagen: "https://www.casiopea360.es/correo/guia.jpg", pie: "Tu guía" },
      { imagen: "https://www.casiopea360.es/correo/panel.jpg", pie: "Tu panel" },
    ],
  },
  aviso: { titular: "Tú, tranquilo.", texto: "Si quieres contarnos algo, contesta a este correo y lo leemos nosotros. Mientras, puedes ver", enlace: { texto: "cómo trabajamos.", href: "https://www.casiopea360.es/como-trabajamos" } },
  firma: "El equipo de Casiopea 360",
  pie: "Recibes este correo porque acabas de pedir tu estudio gratuito en casiopea360.es.",
});
