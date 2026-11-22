import type { Metadata } from "next";
import { HeroAds, LogosAds, DoloresAds, VideoAds, RecibesAds, PrecioAds, DudasAds } from "@/components/LandingAds";

// Landing de los anuncios de búsqueda. No se indexa ni va al sitemap: para Google, la página es /estudio-gratuito.
export const metadata: Metadata = {
  title: { absolute: "Agencia de marketing digital en Madrid · Casiopea 360" },
  description: "Web, SEO, anuncios, redes y CRM en un solo equipo. Pide tu estudio gratuito: tres preguntas y tus datos, sin compromiso.",
  alternates: { canonical: "/estudio-gratuito" },
  robots: { index: false, follow: true },
};

export default function AgenciaMadrid() {
  return (
    <>
      <HeroAds />
      <LogosAds />
      <DoloresAds />
      <VideoAds />
      <RecibesAds />
      <PrecioAds />
      <DudasAds />
    </>
  );
}
