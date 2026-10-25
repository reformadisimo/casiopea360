// La palabra clave de un titular, subrayada con un trazo dorado hecho a mano que se dibuja al llegar a ella.
// El trazo se anima con el scroll (sin JavaScript); donde el navegador no lo soporta, aparece ya dibujado.
export default function Subrayado({ children, color = "#ffc53d" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="subrayado pointer-events-none absolute -bottom-[0.08em] left-0 h-[0.28em] w-full">
        <path d="M3 10 C 40 2, 90 2, 120 7 S 180 12, 197 5" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" pathLength={1} />
      </svg>
    </span>
  );
}
