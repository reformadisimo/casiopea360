import type { Metadata } from "next";
import "./globals.css";
import Versionante from "@/components/Versionante";

export const metadata: Metadata = {
  title: "Reformadísimo",
  description: "Reformas integrales en Madrid.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <Versionante />
      </body>
    </html>
  );
}
