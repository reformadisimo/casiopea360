// Pildorita de version. Subirla en CADA cambio con regex + assert:
// re.sub(r'cas·v\d+', 'cas·vNNN', s) y comprobar que cambio.
export default function Versionante() {
  return (
    <div
      aria-hidden="true"
      data-versionante
      className="pointer-events-none fixed bottom-1.5 left-1.5 z-50 rounded-full bg-[#f5efe3]/80 px-2 py-0.5 text-[10px] font-medium text-[#3a3a3a]/80"
    >
      cas·v207
    </div>
  );
}
