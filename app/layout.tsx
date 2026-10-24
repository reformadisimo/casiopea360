import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Versionante from "@/components/Versionante";
import Medicion from "@/components/Medicion";
import AsistenteDiferido from "@/components/AsistenteDiferido";
import Cabecera from "@/components/Cabecera";
import Pie from "@/components/Pie";
import DatosEstructurados from "@/components/DatosEstructurados";
import { SITIO } from "@/lib/navegacion";
import { schemaOrganizacion, schemaWeb } from "@/lib/schema";

const titular = localFont({
  // Una sola fuente variable para todos los grosores: un archivo en lugar de cuatro.
  src: [{ path: "./fonts/schibsted-grotesk-latin-wght-normal.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: "Casiopea 360 · Todo tu marketing digital. Todo. Mejor. En días.",
    template: "%s · Casiopea 360",
  },
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  alternates: { canonical: "/" },
  robots: SITIO.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITIO.nombre,
    title: "Casiopea 360 · Todo tu marketing digital. Todo. Mejor. En días.",
    description: SITIO.descripcion,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Casiopea 360: crece en digital sin ir de proveedor en proveedor" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={titular.variable} style={{ backgroundColor: "#0e1a3d" }} suppressHydrationWarning>
      <head>
        {/* Si ya se eligió sobre las cookies, se oculta el aviso antes de pintar nada. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('casiopea-cookies'))document.documentElement.classList.add('cookies-decididas')}catch(e){}" }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <DatosEstructurados datos={[schemaOrganizacion(), schemaWeb()]} />
        <Cabecera />
        <main id="contenido">{children}</main>
        <Pie />
        <Versionante />
        <Medicion />
        <AsistenteDiferido />
      </body>
    </html>
  );
}
