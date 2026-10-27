"use client";

// Lupa 360 de ejemplo. TODOS LOS DATOS SON INVENTADOS y se dice en pantalla.
// La web que se ve en el marco es la propia web de Casiopea (mismo dominio), y encima se pinta el
// mapa de calor, los toques en vano y hasta dónde baja la gente, dentro del propio documento del marco.
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EN_VANO,
  FUENTES,
  PAGINAS_DEMO,
  TRAMOS,
  cifras,
  conclusiones,
  fiabilidad,
  nombreDe,
  recorridos,
  type Fuente,
  type TipoToque,
  type Tramo,
} from "@/lib/lupaEjemplo";

type Dispositivo = "movil" | "pc";
type Capas = { calor: boolean; vano: boolean; baja: boolean };
type Listas = { mas: [string, number][]; vano: [string, number][] };

const ANCHO: Record<Dispositivo, number> = { movil: 390, pc: 1366 };
const ALTO_VISOR: Record<Dispositivo, number> = { movil: 640, pc: 520 };

const NIVEL: Record<string, string> = {
  alerta: "border-red-400/60 bg-red-500/10",
  aviso: "border-estrella/60 bg-estrella/10",
  bien: "border-emerald-400/60 bg-emerald-500/10",
};
const ETIQUETA_NIVEL: Record<string, string> = { alerta: "Se pierde gente", aviso: "A mejorar", bien: "Funciona" };

function chip(activo: boolean) {
  return `rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${activo ? "bg-estrella text-tinta" : "bg-white/10 text-white hover:bg-white/20"}`;
}

export default function LupaEjemplo() {
  const [dias, setDias] = useState(90);
  const [disp, setDisp] = useState<Dispositivo>("movil");
  const [version, setVersion] = useState<"todas" | "A" | "B">("todas");
  const [fuente, setFuente] = useState<Fuente | "todas">("todas");
  const [ruta, setRuta] = useState("/");
  const [capas, setCapas] = useState<Capas>({ calor: true, vano: true, baja: false });
  const [listas, setListas] = useState<Listas>({ mas: [], vano: [] });
  const [cargado, setCargado] = useState(0);
  const [disponible, setDisponible] = useState(300);
  const marco = useRef<HTMLIFrameElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const visor = useRef<HTMLDivElement>(null);

  const filtrados = useMemo(
    () =>
      TRAMOS.filter(
        (t) => t.dias < dias && t.movil === (disp === "movil") && (version === "todas" || t.version === version) && (fuente === "todas" || t.fuente === fuente),
      ),
    [dias, disp, version, fuente],
  );
  const deRuta = useMemo(() => filtrados.filter((t) => t.ruta === ruta), [filtrados, ruta]);
  const c = cifras(deRuta);
  const fia = fiabilidad(filtrados.length);
  const lista = useMemo(() => conclusiones(filtrados), [filtrados]);
  const caminos = useMemo(() => recorridos(filtrados), [filtrados]);

  const paginas = useMemo(
    () =>
      PAGINAS_DEMO.map((p) => {
        const f = filtrados.filter((t) => t.ruta === p.ruta);
        return { ...p, ...cifras(f) };
      }).sort((a, b) => b.vistas - a.vistas),
    [filtrados],
  );
  const maxVistas = Math.max(1, ...paginas.map((p) => p.vistas));

  const origenes = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of deRuta) m.set(t.fuente, (m.get(t.fuente) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [deRuta]);
  const despues = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of deRuta) m.set(t.sig ?? "salida", (m.get(t.sig ?? "salida") ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [deRuta]);

  // Ancho disponible para el marco: si no cabe, se reduce a escala.
  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const medir = () => setDisponible(el.clientWidth);
    medir();
    const o = new ResizeObserver(medir);
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const ancho = ANCHO[disp];
  const escala = Math.min(1, disponible / ancho);
  const altoVisual = ALTO_VISOR[disp];

  // Primera carga del marco y seguimiento de la navegación dentro de él.
  useEffect(() => {
    const f = marco.current;
    if (!f) return;
    const alCargar = () => setCargado((n) => n + 1);
    f.addEventListener("load", alCargar);
    const vigila = window.setInterval(() => {
      try {
        const ruta2 = f.contentWindow?.location.pathname;
        if (ruta2 && ruta2 !== "about:blank") {
          const limpia = ruta2.replace(/\/$/, "") || "/";
          setRuta((r) => (limpia !== r ? limpia : r));
        }
      } catch {
        /* otro dominio: no se puede leer */
      }
    }, 600);
    return () => {
      f.removeEventListener("load", alCargar);
      window.clearInterval(vigila);
    };
  }, []);

  // Si se elige otra página en la lista, el marco va a ella.
  useEffect(() => {
    const f = marco.current;
    if (!f?.contentWindow) return;
    try {
      const actual = f.contentWindow.location.pathname.replace(/\/$/, "") || "/";
      if (actual !== ruta) f.contentWindow.location.replace(ruta);
    } catch {
      /* ignorar */
    }
  }, [ruta]);

  const dibujar = useCallback(() => {
    const f = marco.current;
    const doc = f?.contentDocument;
    const win = f?.contentWindow;
    if (!f || !doc || !win || !doc.body) return;
    const actual = win.location.pathname.replace(/\/$/, "") || "/";
    if (actual !== ruta) return;

    // Preparar la página del marco: todo visible y sin elementos fijos que tapen.
    if (!doc.getElementById("lupa-estilo")) {
      const s = doc.createElement("style");
      s.id = "lupa-estilo";
      s.textContent = ".rv{opacity:1!important;transform:none!important;transition:none!important}html{scroll-behavior:auto!important}[data-lupa-oculto]{visibility:hidden!important}#lupa-capa *{pointer-events:none!important}";
      doc.head.appendChild(s);
    }
    doc.querySelectorAll<HTMLElement>("body *").forEach((el) => {
      if (el.closest("#lupa-capa")) return;
      const pos = win.getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") el.setAttribute("data-lupa-oculto", "1");
    });

    const H = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
    const W = win.innerWidth;
    const alto = win.innerHeight;
    doc.getElementById("lupa-capa")?.remove();
    const capa = doc.createElement("div");
    capa.id = "lupa-capa";
    capa.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none;z-index:2147483000;overflow:hidden`;
    doc.body.appendChild(capa);

    // Elementos tocables, por tipo.
    const visible = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.width > 6 && r.height > 6 && !(el as HTMLElement).closest("[data-lupa-oculto]");
    };
    const NOMBRE_ETIQUETA: Record<string, string> = { img: "Foto", picture: "Foto", video: "Vídeo", a: "Enlace", button: "Botón", p: "Texto", li: "Texto", h2: "Titular", h3: "Titular", input: "Campo", textarea: "Campo", select: "Campo" };
    const textoDe = (el: Element) => {
      const h = el as HTMLElement;
      const t = (el.getAttribute("aria-label") || h.innerText || h.textContent || el.getAttribute("alt") || el.getAttribute("title") || "").replace(/\s+/g, " ").trim();
      return (t || NOMBRE_ETIQUETA[el.tagName.toLowerCase()] || "Elemento").slice(0, 34);
    };
    const todos = (sel: string) => [...doc.querySelectorAll(sel)].filter(visible);
    const esContacto = (el: Element) => /estudio|contact|whatsapp|llam|presupuesto|empieza|pide|reserva/i.test(`${el.textContent ?? ""} ${el.getAttribute("href") ?? ""}`);
    const enlaces = todos("a[href]");
    const botones = todos("button, [role=button]");
    const cand: Record<TipoToque, Element[]> = {
      contacto: [...enlaces, ...botones].filter(esContacto),
      enlace: enlaces.filter((e) => !esContacto(e)),
      campo: todos("input, textarea, select"),
      boton: botones,
      foto: todos("img, video, picture").filter((e) => !e.closest("a, button")),
      nada: todos("main h2, main h3, main p, main li").filter((e) => !e.closest("a, button")),
    };

    const pesoDe = (el: Element) => {
      const top = el.getBoundingClientRect().top + win.scrollY;
      return 1 / (1 + top / 1400);
    };

    type Punto = { x: number; y: number; tipo: TipoToque; etiqueta: string };
    const puntos: Punto[] = [];
    for (const t of deRuta) {
      const limite = (t.baja / 100) * H + alto * 0.8;
      for (const k of t.toques) {
        let lista2 = cand[k.tipo].length ? cand[k.tipo] : cand.nada;
        lista2 = lista2.filter((e) => e.getBoundingClientRect().top + win.scrollY <= limite);
        if (!lista2.length) continue;
        const pesos = lista2.map(pesoDe);
        const suma = pesos.reduce((s, p) => s + p, 0);
        let objetivo = k.a * suma;
        let elegido = lista2[lista2.length - 1];
        for (let i = 0; i < lista2.length; i++) {
          objetivo -= pesos[i];
          if (objetivo <= 0) {
            elegido = lista2[i];
            break;
          }
        }
        const r = elegido.getBoundingClientRect();
        const x = Math.min(W - 2, Math.max(2, r.left + win.scrollX + r.width * (0.15 + 0.7 * k.b)));
        const y = Math.min(H - 2, Math.max(2, r.top + win.scrollY + r.height * (0.2 + 0.6 * k.c)));
        puntos.push({ x, y, tipo: k.tipo, etiqueta: textoDe(elegido) });
      }
    }

    // Listas de lo más tocado y de lo que se toca en vano.
    const cuenta = (tipos: TipoToque[]) => {
      const m = new Map<string, number>();
      for (const p of puntos) if (tipos.includes(p.tipo)) m.set(p.etiqueta, (m.get(p.etiqueta) ?? 0) + 1);
      return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    };
    setListas({ mas: cuenta(["contacto", "enlace", "campo", "boton"]), vano: cuenta(EN_VANO) });

    // Mapa de calor (a media resolución, porque Safari no admite lienzos enormes).
    if (capas.calor && puntos.length) {
      const cw = Math.max(1, Math.ceil(W / 2));
      const ch = Math.max(1, Math.ceil(H / 2));
      const lienzo = doc.createElement("canvas");
      lienzo.width = cw;
      lienzo.height = ch;
      lienzo.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${ch * 2}px;opacity:.78`;
      const g = lienzo.getContext("2d");
      if (g) {
        for (const p of puntos) {
          const radio = 22;
          const gr = g.createRadialGradient(p.x / 2, p.y / 2, 0, p.x / 2, p.y / 2, radio);
          gr.addColorStop(0, "rgba(0,0,0,0.22)");
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.fillRect(p.x / 2 - radio, p.y / 2 - radio, radio * 2, radio * 2);
        }
        const paleta = doc.createElement("canvas");
        paleta.width = 256;
        paleta.height = 1;
        const gp = paleta.getContext("2d");
        if (gp) {
          const lg = gp.createLinearGradient(0, 0, 256, 0);
          lg.addColorStop(0, "rgb(30,80,255)");
          lg.addColorStop(0.3, "rgb(0,200,220)");
          lg.addColorStop(0.5, "rgb(60,220,90)");
          lg.addColorStop(0.75, "rgb(255,220,0)");
          lg.addColorStop(1, "rgb(255,40,20)");
          gp.fillStyle = lg;
          gp.fillRect(0, 0, 256, 1);
          const col = gp.getImageData(0, 0, 256, 1).data;
          const img = g.getImageData(0, 0, cw, ch);
          const d = img.data;
          for (let i = 0; i < d.length; i += 4) {
            const a = d[i + 3];
            if (!a) continue;
            const idx = Math.min(255, Math.round(a * 1.5)) * 4;
            d[i] = col[idx];
            d[i + 1] = col[idx + 1];
            d[i + 2] = col[idx + 2];
            d[i + 3] = Math.min(235, a * 2);
          }
          g.putImageData(img, 0, 0);
        }
      }
      capa.appendChild(lienzo);
    }

    // Franjas de hasta dónde baja la gente, cada 10 % de la página.
    if (capas.baja && deRuta.length) {
      for (let i = 0; i < 10; i++) {
        const llegan = Math.round((deRuta.filter((t) => t.baja >= i * 10).length / deRuta.length) * 100);
        const franja = doc.createElement("div");
        franja.style.cssText = `position:absolute;left:0;width:100%;top:${(H * i) / 10}px;height:${H / 10}px;background:rgba(14,26,61,${(((100 - llegan) / 100) * 0.62).toFixed(2)});border-top:1px dashed rgba(255,255,255,.55)`;
        const et = doc.createElement("div");
        et.textContent = `${llegan} % llega aquí`;
        et.style.cssText = "position:absolute;right:6px;top:6px;background:#0e1a3d;color:#fff;font:700 13px/1 system-ui,sans-serif;padding:6px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.6)";
        franja.appendChild(et);
        capa.appendChild(franja);
      }
    }

    // Puntos rojos donde tocan y no pasa nada.
    if (capas.vano) {
      for (const p of puntos) {
        if (!EN_VANO.includes(p.tipo)) continue;
        const d = doc.createElement("div");
        d.style.cssText = `position:absolute;left:${p.x - 8}px;top:${p.y - 8}px;width:16px;height:16px;border-radius:50%;background:#e11d48;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)`;
        capa.appendChild(d);
      }
    }
  }, [ruta, deRuta, capas]);

  // Dibujar al cargar y cuando cambian los datos, el dispositivo o las capas; varias veces porque
  // la página del marco termina de colocarse con retraso (fotos, tipografías).
  useEffect(() => {
    const tiempos = [250, 900, 2200, 4500, 8000].map((ms) => window.setTimeout(dibujar, ms));
    return () => tiempos.forEach((t) => window.clearTimeout(t));
  }, [dibujar, cargado, disp]);

  const conDatos = deRuta.length > 0;
  const hayPagina = PAGINAS_DEMO.some((p) => p.ruta === ruta);

  return (
    <div className="bg-noche pb-14 pt-24 text-white sm:pt-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl bg-estrella px-5 py-3 text-sm font-bold text-tinta">
          Datos de ejemplo sobre nuestra propia web. Son inventados: así verías la tuya, con tus visitas reales.
        </div>

        <header className="mt-6">
          <p className="text-sm font-bold text-white/70">Lupa 360 · demostración</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-5xl">La web con lo que hace la gente encima.</h1>
          <p className="mt-3 max-w-3xl text-lg text-white/80">
            Dónde tocan, dónde se paran y dónde se van. Cambias una cosa, vuelves a mirar y sabes si ha ido mejor. Sin adivinar.
          </p>
        </header>

        {/* Filtros */}
        <div className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-4 sm:p-5 lg:grid-cols-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/60">Periodo</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[7, 28, 90].map((d) => (
                <button key={d} type="button" className={chip(dias === d)} onClick={() => setDias(d)}>
                  {d} días
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/60">Dispositivo</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={chip(disp === "movil")} onClick={() => setDisp("movil")}>Móvil</button>
              <button type="button" className={chip(disp === "pc")} onClick={() => setDisp("pc")}>Ordenador</button>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/60">Versión de la web</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={chip(version === "todas")} onClick={() => setVersion("todas")}>Todas</button>
              <button type="button" className={chip(version === "A")} onClick={() => setVersion("A")}>Versión A</button>
              <button type="button" className={chip(version === "B")} onClick={() => setVersion("B")}>Versión B</button>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/60">De dónde vienen</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={chip(fuente === "todas")} onClick={() => setFuente("todas")}>Todas</button>
              {FUENTES.map((f) => (
                <button key={f} type="button" className={chip(fuente === f)} onClick={() => setFuente(f)}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Conclusiones */}
        <section className="mt-6" aria-labelledby="conclusiones">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="conclusiones" className="text-2xl font-extrabold sm:text-3xl">Lo que te diría la lupa</h2>
            <div className="min-w-0 max-w-md flex-1 basis-64">
              <p className="text-sm font-bold">
                {fia.nombre} <span className="font-normal text-white/70">· {filtrados.length} visitas en este filtro</span>
              </p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={fia.avance} aria-valuemin={0} aria-valuemax={100} aria-label="Avance hacia las 1.000 visitas">
                <div className="h-full rounded-full bg-estrella" style={{ width: `${fia.avance}%` }} />
              </div>
              <p className="mt-1 text-xs text-white/70">{fia.texto}</p>
            </div>
          </div>
          {lista.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-white/5 p-5 text-white/80">
              Con este filtro hay pocas visitas por página (se necesitan 8 como mínimo) para sacar conclusiones. Amplía el periodo o quita algún filtro.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {lista.map((x) => (
                <article key={x.id} className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${NIVEL[x.nivel]}`}>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/70">{ETIQUETA_NIVEL[x.nivel]}</p>
                  <h3 className="mt-1 text-lg font-extrabold leading-snug">{x.titulo}</h3>
                  <p className="mt-2 text-sm text-white/85"><b>Qué pasa:</b> {x.que}</p>
                  <p className="mt-1 text-sm text-white/85"><b>Qué conviene:</b> {x.conviene}</p>
                  {x.ruta && (
                    <button
                      type="button"
                      className="mt-3 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-tinta hover:bg-estrella"
                      onClick={() => {
                        setRuta(x.ruta as string);
                        visor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Verlo en la web
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Visor */}
        <div ref={visor} className="mt-8 grid scroll-mt-24 gap-5 lg:grid-cols-[240px_minmax(0,1fr)_280px]">
          {/* Páginas */}
          <aside className="min-w-0 rounded-2xl bg-white/5 p-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-white/70">Páginas, de más a menos vistas</h2>
            <ul className="mt-3 space-y-2">
              {paginas.map((p) => (
                <li key={p.ruta}>
                  <button
                    type="button"
                    onClick={() => setRuta(p.ruta)}
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${ruta === p.ruta ? "border-estrella bg-estrella/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                    aria-current={ruta === p.ruta ? "page" : undefined}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-bold">{p.nombre}</span>
                      <span className="text-sm text-white/70">{p.vistas} vistas</span>
                    </span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/15">
                      <span className="block h-full rounded-full bg-estrella" style={{ width: `${(p.vistas / maxVistas) * 100}%` }} />
                    </span>
                    <span className="mt-2 block text-xs text-white/70">Bajan {p.baja} % · Se van de la web {p.salida} %</span>
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-sm font-extrabold uppercase tracking-wide text-white/70">Recorridos más repetidos</h3>
            {caminos.length ? (
              <ul className="mt-2 space-y-1.5 text-sm text-white/85">
                {caminos.map((r) => (
                  <li key={r.texto} className="flex justify-between gap-2"><span className="min-w-0">{r.texto}</span><b>{r.n}</b></li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-white/70">Aún no hay recorridos con este filtro.</p>
            )}
          </aside>

          {/* La web con las capas encima */}
          <section className="min-w-0" aria-label="La web con lo que hace la gente encima">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl bg-white/5 px-4 py-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 font-bold">
                <input type="checkbox" checked={capas.calor} onChange={(e) => setCapas({ ...capas, calor: e.target.checked })} className="h-4 w-4 accent-yellow-400" />
                Dónde tocan
              </label>
              <label className="flex cursor-pointer items-center gap-2 font-bold">
                <input type="checkbox" checked={capas.vano} onChange={(e) => setCapas({ ...capas, vano: e.target.checked })} className="h-4 w-4 accent-yellow-400" />
                Tocan y no pasa nada
              </label>
              <label className="flex cursor-pointer items-center gap-2 font-bold">
                <input type="checkbox" checked={capas.baja} onChange={(e) => setCapas({ ...capas, baja: e.target.checked })} className="h-4 w-4 accent-yellow-400" />
                Hasta dónde bajan
              </label>
              <a href={ruta} target="_blank" rel="noreferrer" className="ml-auto font-bold text-estrella underline underline-offset-4">
                Abrir la página aparte ↗
              </a>
            </div>
            <p className="mt-2 text-xs text-white/70">Baja dentro del marco para verla entera. {disp === "pc" ? "En ordenador la posición de los toques es aproximada, porque las pantallas tienen anchos distintos." : ""}</p>

            <div ref={caja} className="mt-3 w-full min-w-0">
              <div
                className="mx-auto overflow-hidden rounded-2xl border-4 border-white/20 bg-white shadow-xl"
                style={{ width: ancho * escala + 8, height: altoVisual + 8, maxWidth: "100%" }}
              >
                <iframe
                  ref={marco}
                  title="Tu web con la lupa encima"
                  src="/"
                  style={{ width: ancho, height: altoVisual / escala, transform: `scale(${escala})`, transformOrigin: "top left", border: 0, background: "#fff" }}
                />
              </div>
            </div>
            {!hayPagina && <p className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-white/80">Esta página no tiene datos de ejemplo. Elige una de la lista.</p>}
            {hayPagina && !conDatos && <p className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-white/80">Con este filtro no hay visitas a esta página. Amplía el periodo o quita algún filtro.</p>}
          </section>

          {/* Cifras */}
          <aside className="min-w-0 space-y-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-white/70">{hayPagina ? nombreDe(ruta) : "Esta página"}</h2>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <Dato n={String(c.vistas)} t="vistas" />
                <Dato n={`${c.baja} %`} t="bajan de media" />
                <Dato n={`${c.alFinal} %`} t="llegan al final" />
                <Dato n={`${c.activo} s`} t="tiempo activo" />
                <Dato n={`${c.rapidos} %`} t="se van en menos de 10 s" />
                <Dato n={`${c.salida} %`} t="se van de la web" />
              </dl>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-white/70">Microsoft Clarity (cifras de ejemplo)</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-white/85">
                <li className="flex justify-between gap-2"><span>Clics en algo que no responde</span><b>{c.enVano}</b></li>
                <li className="flex justify-between gap-2"><span>Clics de rabia</span><b>{Math.round(c.enVano * 0.3)}</b></li>
                <li className="flex justify-between gap-2"><span>Vuelven atrás enseguida</span><b>{Math.round(c.vistas * 0.03)}</b></li>
              </ul>
            </div>
            <Lista titulo="Lo más tocado" filas={listas.mas} vacio="Aún no hay toques." />
            <Lista titulo="Lo que tocan en vano" filas={listas.vano} vacio="Nada que destacar." rojo />
            <div className="rounded-2xl bg-white/5 p-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-white/70">De dónde vienen</h3>
              <ul className="mt-2 space-y-1.5">
                {origenes.length ? origenes.map(([nombre, n]) => (
                  <li key={nombre}>
                    <button type="button" className="flex w-full justify-between gap-2 rounded-lg px-2 py-1 text-left text-sm hover:bg-white/10" onClick={() => setFuente(nombre as Fuente)}>
                      <span className="min-w-0">{nombre}</span><b>{n}</b>
                    </button>
                  </li>
                )) : <li className="text-sm text-white/70">Sin datos.</li>}
              </ul>
              <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-white/70">Adónde van después</h3>
              <ul className="mt-2 space-y-1.5">
                {despues.length ? despues.map(([sig, n]) => (
                  <li key={sig}>
                    {sig === "salida" ? (
                      <span className="flex justify-between gap-2 px-2 py-1 text-sm"><span>Se van de la web</span><b>{n}</b></span>
                    ) : (
                      <button type="button" className="flex w-full justify-between gap-2 rounded-lg px-2 py-1 text-left text-sm hover:bg-white/10" onClick={() => setRuta(sig)}>
                        <span className="min-w-0">{nombreDe(sig)}</span><b>{n}</b>
                      </button>
                    )}
                  </li>
                )) : <li className="text-sm text-white/70">Sin datos.</li>}
              </ul>
            </div>
          </aside>
        </div>

        <p className="mt-8 rounded-2xl bg-white/5 p-5 text-sm text-white/80">
          En un cliente real, esto se activa solo si la persona acepta las cookies de analítica, nunca guarda lo que escribe y los datos se borran a los 90 días. Los datos son tuyos.{" "}
          <Link href="/servicios/lupa-360" className="font-bold text-estrella underline underline-offset-4">Cómo funciona la Lupa 360</Link>
          {" · "}
          <Link href="/estudio-gratuito" className="font-bold text-estrella underline underline-offset-4">Pide tu estudio gratuito</Link>
        </p>
      </div>
    </div>
  );
}

function Dato({ n, t }: { n: string; t: string }) {
  return (
    <div className="min-w-0">
      <dd className="text-2xl font-extrabold leading-none">{n}</dd>
      <dt className="mt-1 text-xs text-white/70">{t}</dt>
    </div>
  );
}

function Lista({ titulo, filas, vacio, rojo }: { titulo: string; filas: [string, number][]; vacio: string; rojo?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-white/70">{titulo}</h3>
      <ul className="mt-2 space-y-1.5">
        {filas.length ? filas.map(([t, n]) => (
          <li key={t} className="flex justify-between gap-2 text-sm text-white/85">
            <span className="min-w-0 break-words">{rojo && <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full border border-white bg-rose-600 align-middle" aria-hidden="true" />}{t}</span>
            <b>{n}</b>
          </li>
        )) : <li className="text-sm text-white/70">{vacio}</li>}
      </ul>
    </div>
  );
}

export type { Tramo };
