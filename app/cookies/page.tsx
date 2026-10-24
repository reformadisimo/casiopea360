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
          <tr><td>De medición (Google Analytics)</td><td>Saber cuánta gente entra, de dónde viene y qué páginas funcionan</td><td>Sí</td></tr>
          <tr><td>Mapas de calor (Microsoft Clarity)</td><td>Ver de forma anónima dónde se pulsa y hasta dónde se lee, para mejorar la web</td><td>Sí</td></tr>
        </tbody>
      </table>
      <p>Hoy esta web todavía no tiene instaladas las cookies de medición. Cuando las instalemos, solo se activarán si las aceptas en el aviso de cookies, que tendrá el botón de rechazar al mismo nivel que el de aceptar, como pide la Agencia Española de Protección de Datos.</p>
      <h2>Cómo cambiar de opinión</h2>
      <p>Podrás cambiar tu elección en cualquier momento desde el enlace de cookies del pie de la web, o borrando las cookies desde la configuración de tu navegador.</p>
    </PaginaLegal>
  );
}
