// Pildorita de version. Subirla en CADA cambio con regex + assert:
// re.sub(r'cas·v\d+', 'cas·vNNN', s) y comprobar que cambio.
export default function Versionante() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-3 left-3 z-50 rounded-full bg-[#f5efe3] px-2.5 py-1 text-[11px] font-medium text-[#3a3a3a] shadow-sm"
    >
      cas·v40
    </div>
  );
}
