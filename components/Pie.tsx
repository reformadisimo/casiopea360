import Link from "next/link";
import Logo from "@/components/Logo";
import BotonCookies from "@/components/BotonCookies";
import { LEGALES, MENU, SERVICIOS_MENU } from "@/lib/navegacion";

export default function Pie() {
  const empresa = [...MENU.filter((m) => m.texto !== "Servicios" && m.texto !== "Haz el test"), { texto: "Panel de ejemplo", href: "/panel" }];
  return (
    <footer className="bg-noche-2 text-white/75">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo claro />
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
                <Link href={s.href} className="hover:text-white">
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
                <Link href={m.href} className="hover:text-white">
                  {m.texto}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/test" className="hover:text-white">
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
                <Link href={l.href} className="hover:text-white">
                  {l.texto}
                </Link>
              </li>
            ))}
            <BotonCookies />
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-sm sm:px-6">Casiopea 360. Marketing digital 360 para empresas, desde Madrid.</p>
      </div>
    </footer>
  );
}
