import PaginaLegal from "@/components/PaginaLegal";
import { EMPRESA } from "@/lib/schema";
import { meta } from "@/lib/meta";

export const metadata = meta("Aviso legal", "Datos del titular de la web de Casiopea 360 y condiciones de uso.", "/aviso-legal");

export default function AvisoLegal() {
  return (
    <PaginaLegal titulo="Aviso legal" actualizado="24 de octubre de 2026">
      <h2>Quién está detrás de esta web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), te informamos de que esta web es titularidad de:
      </p>
      <ul>
        <li><strong>Titular:</strong> {EMPRESA.razonSocial}</li>
        <li><strong>CIF:</strong> {EMPRESA.cif}</li>
        <li><strong>Domicilio social:</strong> {EMPRESA.calle}, {EMPRESA.cp} {EMPRESA.ciudad}</li>
        <li><strong>Registro:</strong> {EMPRESA.registro}</li>
        <li><strong>Correo:</strong> {EMPRESA.correo}</li>
        <li><strong>Nombre comercial:</strong> Casiopea 360</li>
      </ul>
      <h2>Para qué sirve esta web</h2>
      <p>
        Esta web informa sobre los servicios de marketing digital de Casiopea 360 y permite solicitar un estudio gratuito, hacer un test y ponerse en contacto con nosotros.
      </p>
      <h2>Condiciones de uso</h2>
      <p>
        Al navegar por esta web aceptas usarla de forma lícita y de buena fe. No está permitido usarla para dañar a terceros, introducir programas maliciosos ni intentar acceder a zonas no públicas.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, el diseño, la marca y el código de esta web pertenecen a su titular o se usan con licencia. Los vídeos e imágenes de ambiente están licenciados a través de Artgrid. No puedes copiarlos ni reutilizarlos sin permiso por escrito.
      </p>
      <p>
        Las marcas de terceros que aparecen (Google, Meta, TikTok, LinkedIn y otras) pertenecen a sus dueños y se citan solo para indicar con qué plataformas trabajamos. No implican ninguna relación comercial con ellas.
      </p>
      <h2>Enlaces a otras webs</h2>
      <p>
        Desde esta web enlazamos a trabajos que hemos hecho y a otras páginas. No respondemos del contenido de webs que no son nuestras.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        Cuidamos que la información de esta web sea correcta y esté al día, pero puede contener errores. Los plazos y resultados que mencionamos son orientativos: no garantizamos posiciones en Google ni recomendaciones de las IA.
      </p>
      <h2>Ley aplicable</h2>
      <p>Este aviso se rige por la legislación española. Para cualquier conflicto, las partes se someten a los juzgados y tribunales que correspondan según la ley.</p>
    </PaginaLegal>
  );
}
