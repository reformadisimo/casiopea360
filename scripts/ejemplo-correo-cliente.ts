// Ejemplo de correo a un cliente con la plantilla (inventado, para enseñarlo; no se envía).
import { correoCliente } from "../lib/correoCliente";
import { writeFileSync } from "node:fs";
const html = correoCliente({
  titulo: "Ya queda poco: tres cosas pequeñas",
  preheader: "Tres cosas pequeñas, sin prisa. Están paso a paso en tu guía.",
  saludo: "Hola, Álvaro.",
  primero: "Lo primero: **no te agobies con las fechas.** La web nueva sigue en su dirección de prueba y tu web de siempre funciona igual.",
  animo: "Ya nos diste los accesos de Analytics, y eso era lo más pesado. Gracias.",
  cajas: [
    { titulo: "Tu ficha de Google (la más importante)", vinetas: ["Abre el correo de invitación de Google que te ha llegado.", "Pulsa «Aceptar». Nada más.", "Si sale otra cosa, mándanos un pantallazo y lo vemos juntos."] },
    { titulo: "Revisa los textos de acoso laboral", vinetas: ["Están en tu guía, apartado 8.", "Dinos solo lo que cambiarías. Lo demás lo damos por bueno."] },
    { titulo: "Las preguntas del apartado 24", vinetas: ["Son cortas.", "Haz las que puedas hoy y las demás, otro día."] },
  ],
  aviso: { titular: "Todo es tuyo. Tú tienes el control.", texto: "Cada cuenta está a tu nombre y nosotros solo somos invitados. Lo tienes todo en tu hoja de control (es privada, no la compartas):", enlace: { texto: "abrir la hoja de control.", href: "https://www.casiopea360.es/tu-control" } },
  cierre: "Las tres están explicadas paso a paso en tu guía, en el recuadro verde «Tus tareas pendientes».",
  firma: "Tu encargado de proyecto en Casiopea 360",
});
writeFileSync(process.argv[2] ?? "ejemplo-correo.html", html);
console.log("ok");
