import Link from "next/link";
import Logo from "@/components/Logo";
import BotonCookies from "@/components/BotonCookies";
import { LEGALES, MENU, SERVICIOS_MENU } from "@/lib/navegacion";

export default function Pie() {
  const empresa = [...MENU.filter((m) => m.texto !== "Servicios" && m.texto !== "Haz el test"), { texto: "Panel de ejemplo", href: "/panel" }];
  return (
    <footer className="bg-noche-2 text-white/85">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo claro completo />
          <p className="mt-4 max-w-xs text-[0.95rem]">
            Todo tu marketing digital con un solo equipo. Precio fijo, sin comisiones y un parte cada día.
          </p>
          <Link
            href="/estudio-gratuito"
            className="mt-6 inline-flex rounded-full bg-estrella px-5 py-2.5 text-sm font-bold text-tinta hover:bg-estrella-2"
          >
            Solicita tu estudio gratuito
          </Link>
        </div>
        <div>
          <p className="font-titular font-extrabold text-white">Servicios</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {SERVICIOS_MENU.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-block py-1 hover:text-white">
                  {s.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-titular font-extrabold text-white">Casiopea 360</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {empresa.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-block py-1 hover:text-white">
                  {m.texto}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/test" className="inline-block py-1 hover:text-white">
                Haz el test
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-titular font-extrabold text-white">Legal</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {LEGALES.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 hover:text-white">
                  {l.texto}
                </Link>
              </li>
            ))}
            <BotonCookies />
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pb-24 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-5 lg:pr-56">
          <p>Casiopea 360. Marketing digital 360 para empresas, desde Madrid.</p>
          <Link href="/#velocidad" className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5 font-bold text-white ring-1 ring-white/15 hover:bg-white/15">
            <span aria-hidden="true" className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="grid h-6 w-6 place-items-center rounded-full border-2 border-emerald-400 text-[0.6rem] text-emerald-300">100</span>)}</span>
            Predicamos con el ejemplo: esta web, en PageSpeed
          </Link>
        </div>
      </div>
    </footer>
  );
}
