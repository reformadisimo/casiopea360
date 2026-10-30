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
      { source: "/blog/te-regalamos-tu-web-tu-guia-y-tu-plan-si-pasas-el-test", destination: "/blog/tu-web-tu-guia-y-tu-plan-gratis", permanent: true },
      { source: "/blog/te-regalamos-tu-web-tu-guia-y-tu-plan", destination: "/blog/tu-web-tu-guia-y-tu-plan-gratis", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: seguridad }];
  },
};

export default nextConfig;
