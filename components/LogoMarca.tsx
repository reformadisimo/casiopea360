// Logos de las plataformas con las que trabajamos. Si no hay fichero, se pinta una insignia con sus iniciales.
const LOGO: Record<string, string> = {
  Google: "google.svg",
  "Google Analytics": "google-analytics-icono.png",
  Analytics: "google-analytics-icono.png",
  "Search Console": "google-search-console.png",
  "Tag Manager": "googletagmanager.svg",
  "Google Ads": "google-ads-icono.png",
  "Ficha de Google": "google-business-profile-icono.png",
  "Google Maps": "googlemaps.svg",
  Meta: "meta.svg",
  Facebook: "facebook.png",
  Instagram: "instagram.jpg",
  LinkedIn: "linkedin.svg",
  TikTok: "tiktok.png",
  YouTube: "youtube.svg",
  WhatsApp: "whatsapp-business.jpg",
  "WhatsApp Business": "whatsapp-business.jpg",
  Gmail: "gmail.svg",
  Resend: "resend.svg",
  Semrush: "semrush.svg",
  PageSpeed: "pagespeedinsights.svg",
  Vercel: "vercel.svg",
  ChatGPT: "openai.svg",
  Gemini: "googlegemini.svg",
  Claude: "claude.svg",
  "App Store": "apple.svg",
  "Google Play": "googleplay.svg",
  "Google Chrome": "googlechrome.svg",
  Apple: "apple.svg",
};

export default function LogoMarca({ nombre, tam = 26, className = "" }: { nombre: string; tam?: number; className?: string }) {
  const f = LOGO[nombre];
  if (!f) {
    const bing = /Bing|Microsoft/.test(nombre);
    return (
      <span
        className={`grid shrink-0 place-items-center rounded-lg font-extrabold ${bing ? "text-white" : "bg-noche text-estrella"} ${className}`}
        style={{ width: tam, height: tam, fontSize: tam * (bing ? 0.6 : 0.4), background: bing ? "linear-gradient(135deg,#00b294,#0078d4)" : undefined }}
        aria-hidden="true"
      >
        {bing ? "b" : nombre.slice(0, 2)}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/logos/herramientas/${f}`} alt="" width={tam} height={tam} className={`shrink-0 rounded-md object-contain ${className}`} loading="lazy" />;
}
