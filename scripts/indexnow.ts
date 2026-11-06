// Avisa a Bing y a los buscadores que usan IndexNow de que hay una página nueva o cambiada.
// Uso: npx tsx scripts/indexnow.ts /blog/mi-articulo [/otra-ruta ...]
// Una URL cada vez (no se mandan listas). No hace nada mientras la web no sea indexable.
// La clave es pública por diseño: el buscador la comprueba en https://<dominio>/<clave>.txt (está en public/).
import { SITIO } from "../lib/navegacion";

const CLAVE = "945737db04db8631cd9ad73436d3509c";

async function main() {
  const rutas = process.argv.slice(2).filter((x) => x.startsWith("/"));
  if (!rutas.length) {
    console.log("Indica una o más rutas, por ejemplo: npx tsx scripts/indexnow.ts /blog/mi-articulo");
    return;
  }
  if (!SITIO.indexable) {
    console.log("La web todavía no es indexable (SITIO.indexable = false): no se avisa a nadie.");
    return;
  }
  for (const ruta of rutas) {
    const url = `${SITIO.url}${ruta}`;
    const r = await fetch(`https://api.indexnow.org/IndexNow?url=${encodeURIComponent(url)}&key=${CLAVE}`);
    console.log(r.status, url);
  }
}

main();
