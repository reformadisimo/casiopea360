// Correo de bienvenida del test de idoneidad. {{{FIRST_NAME}}} se sustituye al enviar (app/api/solicitud).
// 4-nov-2026: rehecho con la plantilla de correos (lib/correoCliente.ts) y al día con lo decidido:
// primero vemos si podemos ayudar (48 horas laborables); si podemos, el estudio en menos de una semana (normalmente tres días);
// si ahora no, lista de espera. Nunca «encajes o no».
import { correoCliente } from "@/lib/correoCliente";

export const CORREO_BIENVENIDA_ASUNTO = "Gracias, {{{FIRST_NAME}}}. Ya tenemos tu test";
export const CORREO_BIENVENIDA_HTML = correoCliente({
  titulo: "Gracias. Ya tenemos tu test",
  preheader: "Lo revisamos uno a uno. En 48 horas laborables te decimos si podemos ayudarte.",
  saludo: "Hola, {{{FIRST_NAME}}}.",
  primero: "**No tienes que hacer nada más.** Ni llamadas ni reuniones. Ahora nos toca a nosotros.",
  animo: "Gracias por dedicarle estos minutos. Esto es lo que va a pasar:",
  cajas: [
    { titulo: "Lo revisamos uno a uno", vinetas: ["Miramos tu web, cómo sales en Google y lo que nos has contado."] },
    { titulo: "En 48 horas laborables te decimos si podemos ayudarte", vinetas: ["Si podemos, nos ponemos con tu estudio, sin coste y sin compromiso.", "Si ahora no, te apuntamos en la lista de espera y te avisamos cuando haya hueco."] },
    { titulo: "Si podemos ayudarte, tu estudio en menos de una semana", vinetas: ["Normalmente, en unos tres días.", "Te llega a tu correo."] },
  ],
  aviso: { titular: "Tú, tranquilo.", texto: "Si quieres contarnos algo, contesta a este correo y lo leemos nosotros. Mientras, puedes ver", enlace: { texto: "cómo trabajamos.", href: "https://www.casiopea360.es/como-trabajamos" } },
  firma: "El equipo de Casiopea 360",
  pie: "Recibes este correo porque acabas de hacer el test de idoneidad en casiopea360.es.",
});
