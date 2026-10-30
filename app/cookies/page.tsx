import PaginaLegal from "@/components/PaginaLegal";
import { meta } from "@/lib/meta";

export const metadata = meta("Política de cookies", "Qué cookies usa la web de Casiopea 360 y cómo puedes aceptarlas o rechazarlas.", "/cookies");

export default function Cookies() {
  return (
    <PaginaLegal titulo="Política de cookies" actualizado="24 de octubre de 2026">
      <p>Las cookies son pequeños archivos que una web guarda en tu navegador. Te contamos cuáles usamos y cómo decidir.</p>
      <h2>Las que usamos</h2>
      <table>
        <thead>
          <tr><th>Tipo</th><th>Para qué</th><th>¿Necesita tu permiso?</th></tr>
        </thead>
        <tbody>
          <tr><td>Técnicas</td><td>Que la web funcione y recordar tu elección sobre las cookies</td><td>No</td></tr>
          <tr><td>Contador propio de visitas (almacenamiento del navegador, sin cookies)</td><td>Contar cuántas personas y visitas recibe la web y de dónde llegan. Solo guarda en tu navegador la fecha de hoy y si ya has abierto la web en esta pestaña; no se envía nada que te identifique</td><td>No</td></tr>
          <tr><td>De medición (Google Analytics)</td><td>Saber cuánta gente entra, de dónde viene y qué páginas funcionan</td><td>Sí</td></tr>
          <tr><td>Mapas de calor (Microsoft Clarity)</td><td>Ver de forma anónima dónde se pulsa y hasta dónde se lee, para mejorar la web</td><td>Sí</td></tr>
        </tbody>
      </table>
      <p>Además, medimos de forma anónima cuántas visitas hay y a qué velocidad carga la web, con el servicio de nuestro alojamiento (Vercel). No usa cookies ni guarda datos que identifiquen a nadie.</p>
      <p>Las cookies de medición y los mapas de calor solo se activan si las aceptas en el aviso de cookies, que tiene el botón de rechazar al mismo nivel que el de aceptar, como pide la Agencia Española de Protección de Datos.</p>
      <h2>Cómo cambiar de opinión</h2>
      <p>Puedes cambiar tu elección en cualquier momento desde el enlace «Configurar cookies» del pie de la web, o borrando las cookies desde la configuración de tu navegador.</p>
    </PaginaLegal>
  );
}
