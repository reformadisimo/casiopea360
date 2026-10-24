import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Versionante from "@/components/Versionante";

const titular = localFont({
  src: [
    { path: "./fonts/schibsted-grotesk-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/schibsted-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/schibsted-grotesk-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/schibsted-grotesk-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-schibsted",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Casiopea 360 · Todo tu marketing digital, con un solo equipo",
  description:
    "Web, apps, Google, anuncios, redes y automatizaciones para tu empresa, con un solo proveedor. Todo a tu nombre y un parte cada día.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={titular.variable}>
      <body>
        {children}
        <Versionante />
      </body>
    </html>
  );
}
