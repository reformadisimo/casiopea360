"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Picto from "@/components/Picto";

type Dato = { slug: string; g: string; color: string; nombre: string; largo: string | null; corta: string; def: string[]; ejemplo: string; rel: { slug: string; nombre: string }[] };

// Las palabras del glosario repartidas por la web:
// 1. La burbuja de definición no se sale de la pantalla (la desplaza o la pone debajo).
// 2. En pantallas táctiles, el primer toque abre la burbuja.
// 3. Al pulsar la palabra se abre la explicación completa en una ventana, sin salir de la página.
//    El botón «atrás» del móvil o del navegador la cierra. Con Ctrl, la rueda o «abrir en pestaña nueva»
//    sigue funcionando como un enlace normal a su página del glosario.
export default function GlosarioTactil() {
  const [dato, setDato] = useState<Dato | null>(null);
  const [cargando, setCargando] = useState(false);
  const [fallo, setFallo] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const ruta = usePathname();

  // Si se cambia de página, la ventana se cierra
  useEffect(() => {
    setDato(null);
    setFallo(false);
  }, [ruta]);
  const origen = useRef<HTMLElement | null>(null);
  const abiertoConHistorial = useRef(false);

  const cargar = useCallback(async (slug: string) => {
    setCargando(true);
    setFallo(false);
    try {
      const r = await fetch(`/glosario/datos/${slug}`);
      if (!r.ok) throw new Error();
      setDato((await r.json()) as Dato);
    } catch {
      setFallo(true);
    } finally {
      setCargando(false);
    }
  }, []);

  const cerrar = useCallback(() => {
    if (abiertoConHistorial.current) {
      abiertoConHistorial.current = false;
      history.back();
    } else {
      setDato(null);
      setFallo(false);
      origen.current?.focus?.();
    }
  }, []);

  const abrir = useCallback(
    (slug: string, desde: HTMLElement | null) => {
      origen.current = desde;
      if (!abiertoConHistorial.current) {
        history.pushState({ glosario: slug }, "");
        abiertoConHistorial.current = true;
      }
      void cargar(slug);
    },
    [cargar],
  );

  useEffect(() => {
    const colocar = (gl: Element) => {
      const tip = gl.querySelector<HTMLElement>(".gl-tip");
      if (!tip) return;
      gl.classList.remove("gl-abajo");
      tip.style.setProperty("--gl-dx", "0px");
      const antes = tip.style.display;
      tip.style.display = "block";
      const r = tip.getBoundingClientRect();
      tip.style.display = antes;
      const margen = 10;
      let dx = 0;
      if (r.left < margen) dx = margen - r.left;
      else if (r.right > window.innerWidth - margen) dx = window.innerWidth - margen - r.right;
      tip.style.setProperty("--gl-dx", `${dx}px`);
      if (r.top < 70) gl.classList.add("gl-abajo");
    };

    const alEntrar = (e: Event) => {
      const gl = (e.target as Element | null)?.closest?.(".gl");
      if (gl) colocar(gl);
    };

    const cerrarBurbujas = (salvo?: Element | null) => {
      document.querySelectorAll(".gl.gl-abierto").forEach((n) => {
        if (n !== salvo) n.classList.remove("gl-abierto");
      });
    };

    let ultimoPuntero = "";
    const alBajar = (e: PointerEvent) => {
      ultimoPuntero = e.pointerType;
    };

    const alPulsar = (e: MouseEvent) => {
      const objetivo = e.target as Element | null;
      const enlace = objetivo?.closest?.("a.gl-a") as HTMLAnchorElement | null;
      if (!enlace) {
        cerrarBurbujas();
        return;
      }
      // Pulsaciones con Ctrl, Cmd, Mayús o rueda: enlace normal (pestaña nueva)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const gl = enlace.closest(".gl");
      if (!gl) return;
      const tactil = ultimoPuntero === "touch" || ultimoPuntero === "pen" || window.matchMedia("(hover: none)").matches;
      if (tactil && !gl.classList.contains("gl-abierto")) {
        e.preventDefault();
        cerrarBurbujas(gl);
        gl.classList.add("gl-abierto");
        colocar(gl);
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      cerrarBurbujas();
      const slug = enlace.getAttribute("href")?.split("/").pop();
      if (slug) abrir(slug, enlace);
    };

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrarBurbujas();
        (document.activeElement as HTMLElement | null)?.blur?.();
      }
    };

    const alVolver = () => {
      abiertoConHistorial.current = false;
      setDato(null);
      setFallo(false);
      origen.current?.focus?.();
    };

    document.addEventListener("pointerover", alEntrar);
    document.addEventListener("focusin", alEntrar);
    document.addEventListener("pointerdown", alBajar, true);
    document.addEventListener("click", alPulsar, true);
    document.addEventListener("keydown", alTeclear);
    window.addEventListener("popstate", alVolver);
    return () => {
      document.removeEventListener("pointerover", alEntrar);
      document.removeEventListener("focusin", alEntrar);
      document.removeEventListener("pointerdown", alBajar, true);
      document.removeEventListener("click", alPulsar, true);
      document.removeEventListener("keydown", alTeclear);
      window.removeEventListener("popstate", alVolver);
    };
  }, [abrir]);

  const visible = dato !== null || cargando || fallo;

  // Con la ventana abierta: el fondo no se mueve, Esc cierra, el foco se queda dentro
  useEffect(() => {
    if (!visible) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    caja.current?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "Tab" && caja.current) {
        const f = caja.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!f.length) return;
        const primero = f[0];
        const ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    };
    document.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = previo;
      document.removeEventListener("keydown", esc);
    };
  }, [visible, cerrar]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <button type="button" aria-label="Cerrar la explicación" tabIndex={-1} onClick={cerrar} className="absolute inset-0 cursor-default bg-noche/70 backdrop-blur-sm" />
      <div
        ref={caja}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={dato ? `Qué significa ${dato.nombre}` : "Explicación del término"}
        className="relative max-h-[88dvh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-white p-6 text-tinta shadow-2xl outline-none sm:rounded-[2rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="font-titular text-sm font-bold text-noche-3">Glosario</p>
          <button type="button" onClick={cerrar} className="-mr-2 -mt-2 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold hover:bg-niebla">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
            Cerrar
          </button>
        </div>

        {cargando && !dato && <p className="mt-6 text-gris" aria-live="polite">Un momento…</p>}
        {fallo && (
          <p className="mt-6">
            No hemos podido cargar la explicación. <button type="button" onClick={cerrar} className="font-bold underline">Cerrar</button>
          </p>
        )}
        {dato && (
          <div aria-live="polite">
            <div className="mt-3 flex items-center gap-4">
              <Picto d={dato.g} color={dato.color} tam={64} />
              <div>
                <h2 className="font-titular text-3xl font-extrabold leading-tight">{dato.nombre}</h2>
                {dato.largo && <p className="text-gris">{dato.largo}</p>}
              </div>
            </div>
            <p className="mt-4 rounded-2xl border-l-4 border-estrella bg-niebla p-4 text-lg font-semibold">{dato.corta}</p>
            {dato.def.map((p) => (
              <p key={p} className="mt-4 leading-relaxed">{p}</p>
            ))}
            <p className="mt-5 text-sm font-bold text-noche-3">Un ejemplo</p>
            <p className="mt-1 leading-relaxed">{dato.ejemplo}</p>
            {dato.rel.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-bold text-noche-3">Palabras relacionadas</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dato.rel.slice(0, 6).map((r) => (
                    <button key={r.slug} type="button" onClick={() => void cargar(r.slug)} className="rounded-full border border-linea px-3.5 py-1.5 text-sm font-bold hover:border-[#1d4ed8] hover:text-[#1d4ed8]">
                      {r.nombre}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" onClick={cerrar} className="rounded-full bg-estrella px-6 py-3 font-bold text-tinta hover:bg-estrella-2">
                Seguir donde estaba
              </button>
              <Link href={`/glosario/${dato.slug}`} onClick={() => { abiertoConHistorial.current = false; }} className="font-bold text-noche-3 underline decoration-estrella decoration-2 underline-offset-4 hover:text-[#1d4ed8]">
                Ver la página completa
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
