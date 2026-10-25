import PaginaLegal from "@/components/PaginaLegal";
import { EMPRESA } from "@/lib/schema";
import { meta } from "@/lib/meta";

export const metadata = meta("Política de privacidad", "Qué datos tratamos en Casiopea 360, para qué, durante cuánto tiempo y cuáles son tus derechos.", "/privacidad");

export default function Privacidad() {
  return (
    <PaginaLegal titulo="Política de privacidad" actualizado="24 de octubre de 2026">
      <p>Te explicamos con claridad qué datos tuyos tratamos, para qué y qué derechos tienes. Lo hacemos conforme al Reglamento General de Protección de Datos (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).</p>
      <h2>Responsable</h2>
      <p>
        {EMPRESA.razonSocial}, CIF {EMPRESA.cif}, con domicilio en {EMPRESA.calle}, {EMPRESA.cp} {EMPRESA.ciudad}. Para cualquier cosa sobre tus datos: {EMPRESA.correo}.
      </p>
      <h2>Qué datos tratamos</h2>
      <ul>
        <li><strong>Los que nos das en el formulario del estudio gratuito:</strong> nombre y cargo, empresa, web, ciudad, sector, facturación aproximada, número de empleados, cómo lleváis hoy el marketing, inversión en anuncios, teléfono y correo.</li>
        <li><strong>Los del test de idoneidad:</strong> tus respuestas y los datos de contacto que nos das al final (nombre, empresa, teléfono, correo, web y ciudad). Hasta que no envías el test, no nos llega nada.</li>
        <li><strong>Los de navegación:</strong> solo si aceptas las cookies de medición (ver la política de cookies).</li>
      </ul>
      <h2>Para qué los usamos y con qué base legal</h2>
      <ul>
        <li><strong>Estudiar tu solicitud y contestarte</strong>, encaje o no. Base legal: tu consentimiento y la aplicación, a petición tuya, de medidas previas a un contrato.</li>
        <li><strong>Enviarte el estudio y, si lo pides, un presupuesto.</strong> Misma base legal.</li>
        <li><strong>Estudiar tu test de idoneidad, contestarte y, si encajas, preparar tu estudio gratuito.</strong> Base legal: tu solicitud (medidas precontractuales).</li>
        <li><strong>Mandarte de vez en cuando correos con consejos o novedades</strong>, solo si lo aceptas expresamente. Puedes darte de baja en cualquier momento desde el propio correo.</li>
        <li><strong>Medir cómo se usa la web para mejorarla</strong>, solo con tu consentimiento de cookies.</li>
      </ul>
      <h2>Durante cuánto tiempo</h2>
      <p>Guardamos los datos de una solicitud un máximo de dos años si no llegamos a trabajar juntos, o mientras dure la relación y los plazos legales que correspondan si sí. Si nos pides que los borremos antes, lo hacemos.</p>
      <h2>A quién se los damos</h2>
      <p>
        No vendemos ni cedemos tus datos a nadie. Para que la web funcione usamos proveedores que solo los tratan por encargo nuestro: el alojamiento de la web (Vercel), el envío de correos (Resend) y, si aceptas cookies de medición, Google Analytics y Microsoft Clarity. Algunos están fuera del Espacio Económico Europeo; en ese caso se aplican las garantías que exige la ley, como las cláusulas contractuales tipo de la Comisión Europea.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedir el acceso, la rectificación, la supresión, la oposición, la limitación y la portabilidad de tus datos, y retirar tu consentimiento cuando quieras, escribiendo a {EMPRESA.correo}. Si crees que no lo hemos hecho bien, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).
      </p>
      <h2>Asistente con inteligencia artificial</h2>
      <p>Cuando esta web tenga asistente, te avisará siempre de que estás hablando con una inteligencia artificial. Lo que le escribas se usará solo para contestarte y para mejorar el servicio.</p>
      <p>Si usas el micrófono del asistente para hablar en vez de escribir, es tu navegador (Google Chrome, Apple Safari u otro) quien convierte tu voz en texto con su propio servicio. Casiopea 360 solo recibe el texto, nunca el audio.</p>
    </PaginaLegal>
  );
}
