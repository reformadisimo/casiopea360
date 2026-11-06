// Las capturas de ejemplo existen en 1400 px y en 700 px (nombre-700.webp): el móvil y las tarjetas pequeñas no necesitan las grandes.
export function srcSetCaptura(src: string): { srcSet?: string; sizes?: string } {
  if (!/^\/ejemplo\/[a-z0-9-]+\.webp$/.test(src) || src.endsWith("-700.webp") || src.endsWith("-movil.webp")) return {};
  return { srcSet: `${src.replace(".webp", "-700.webp")} 700w, ${src} 1400w`, sizes: "(min-width: 1024px) 600px, 92vw" };
}
