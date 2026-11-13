// Enlaces a los perfiles de Casiopea en redes, como iconos. Los usan la cabecera y el menú del móvil.
export const REDES = [
  {
    nombre: "LinkedIn",
    href: "https://www.linkedin.com/company/casiopea360",
    dibujo: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61596047848304",
    dibujo: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    nombre: "Instagram",
    href: "https://www.instagram.com/casiopea360.es",
    dibujo: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
];

export default function RedesIconos({ className = "" }: { className?: string }) {
  return (
    <ul className={`items-center gap-0.5 ${className}`}>
      {REDES.map((r) => (
        <li key={r.nombre}>
          <a
            href={r.href}
            target="_blank"
            rel="noopener me"
            aria-label={`Casiopea 360 en ${r.nombre}`}
            title={`Casiopea 360 en ${r.nombre}`}
            className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 hover:text-estrella 2xl:h-9 2xl:w-9"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {r.dibujo}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
