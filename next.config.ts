import type { NextConfig } from "next";

// Cabeceras de seguridad para todas las páginas.
const seguridad = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // El CSS va dentro del HTML: una petición menos que bloquee el primer pintado.
  // experimental: { inlineCss: true }, (desactivado: duplicaba el CSS dentro de la página)
  async redirects() {
    return [
      // Páginas fusionadas para que una sola compita por cada búsqueda (6-nov-2026).
      { source: "/blog/te-regalamos-tu-web-tu-guia-y-tu-plan-si-pasas-el-test", destination: "/estudio-gratuito", permanent: true },
      { source: "/blog/te-regalamos-tu-web-tu-guia-y-tu-plan", destination: "/estudio-gratuito", permanent: true },
      { source: "/blog/tu-web-tu-guia-y-tu-plan-gratis", destination: "/estudio-gratuito", permanent: true },
      { source: "/blog/cinco-proveedores-de-marketing-y-ningun-responsable", destination: "/blog/cuantos-proveedores-necesita-una-web-que-trae-clientes", permanent: true },
      { source: "/blog/lo-que-de-verdad-cuesta-el-marketing-digital-reuniones-horas-y-tiempo", destination: "/blog/marketing-sin-reuniones-ni-llamadas-asi-te-quitamos-el-menor-tiempo", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: seguridad }];
  },
};

export default nextConfig;
