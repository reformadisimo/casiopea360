"use client";

// Lupa 360 de ejemplo, a pantalla completa como una herramienta. TODOS LOS DATOS SON INVENTADOS y se dice.
// La web del marco es la propia web de Casiopea (mismo dominio); encima se pinta, dentro del propio
// documento del marco, el calor de los toques, los toques en vano y hasta dónde baja la gente.
// Estructura copiada del visor de la lupa de Reformadísimo (Ig, 27-oct): franja de filtros, conclusiones
// cerradas, tres columnas, nota para el desarrollador con chincheta. Aquí no hay API: todo sale de lib/lupaEjemplo.ts.
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
  type Conclusion,
  type Fuente,
  type TipoToque,
} from "@/lib/lupaEjemplo";

type Dispositivo = "movil" | "pc";
type Capas = { calor: boolean; vano: boolean; baja: boolean };
type Listas = { mas: [string, number][]; vano: [string, number][] };
type Marca = { x: number; y: number; elemento: string };
type Nota = { id: number; autor: string; texto: string; ruta: string; disp: Dispositivo; x: number | null; y: number | null; elemento: string; cuando: string };

// Colores: la estructura y la luz del visor de referencia, con los acentos de Casiopea.
const C = {
  tinta: "#141c33",
  noche: "#0e1a3d",
  enlace: "#24387a",
  estrella: "#ffc53d",
  amarillo: "#ffde00",
  crema: "#faf7f1",
  linea: "#e4ddd0",
  suave: "#535c7a",
  rojo: "#d6453d",
  verde: "#2f7d4f",
  ambar: "#b8731a",
};

const ANCHO: Record<Dispositivo, number> = { movil: 390, pc: 1366 };
const AUTORES = ["Tú", "Tu equipo"];
const CLAVE_NOTAS = "casiopea-lupa-demo-notas";

const etiquetaDe = (el: Element | null) => {
  if (!el) return "";
  const t = (el.getAttribute("aria-label") || el.getAttribute("alt") || (el as HTMLElement).innerText || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 50);
  return t || el.tagName.toLowerCase();
};

export default function LupaEjemplo() {
  const [dias, setDias] = useState(90);
  const [disp, setDisp] = useState<Dispositivo>("movil");
  const [version, setVersion] = useState<"todas" | "A" | "B">("todas");
  const [fuente, setFuente] = useState<Fuente | "todas">("todas");
  const [ruta, setRuta] = useState("/");
  const [capas, setCapas] = useState<Capas>({ calor: true, vano: true, baja: false });
  const [listas, setListas] = useState<Listas>({ mas: [], vano: [] });
  const [cargado, setCargado] = useState(0);
  const [disponible, setDisponible] = useState(400);
  const [ventana, setVentana] = useState({ w: 1440, h: 900 });
  const [notas, setNotas] = useState<Nota[]>([]);
  const [senalando, setSenalando] = useState(false);
  const [marca, setMarca] = useState<Marca | null>(null);
  const marco = useRef<HTMLIFrameElement>(null);
  const caja = useRef<HTMLDivElement>(null);

  const filtrados = useMemo(
    () =>
      TRAMOS.filter(
        (t) => t.dias < dias && t.movil === (disp === "movil") && (version === "todas" || t.version === version) && (fuente === "todas" || t.fuente === fuente),
      ),
    [dias, disp, version, fuente],
  );
  const deRuta = useMemo(() => filtrados.filter((t) => t.ruta === ruta), [filtrados, ruta]);
  const c = cifras(deRuta);
  const total = cifras(filtrados);
  const lista = useMemo(() => conclusiones(filtrados), [filtrados]);
  const caminos = useMemo(() => recorridos(filtrados), [filtrados]);
  const visitas = useMemo(() => new Set(filtrados.map((t) => t.sesion)).size, [filtrados]);
  const fia = fiabilidad(visitas);
  const notasPagina = useMemo(() => notas.filter((n) => n.ruta === ruta && n.disp === disp), [notas, ruta, disp]);

  const paginas = useMemo(
    () =>
      PAGINAS_DEMO.map((p) => {
        const f = filtrados.filter((t) => t.ruta === p.ruta);
        return { ...p, ...cifras(f) };
      }).sort((a, b) => b.vistas - a.vistas),
    [filtrados],
  );

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

  // Las notas se quedan en el navegador (no se envían a ningún sitio).
  useEffect(() => {
    try {
      const g = localStorage.getItem(CLAVE_NOTAS);
      if (g) setNotas(JSON.parse(g) as Nota[]);
    } catch {
      /* sin almacenamiento: las notas viven solo en esta pantalla */
    }
  }, []);
  const guardarNotas = (n: Nota[]) => {
    setNotas(n);
    try {
      localStorage.setItem(CLAVE_NOTAS, JSON.stringify(n));
    } catch {
      /* ignorar */
    }
  };
  useEffect(() => {
    setMarca(null);
    setSenalando(false);
  }, [ruta, disp]);

  // Tamaño de la ventana y ancho del hueco del marco: si el ordenador no cabe, se reduce a escala.
  useEffect(() => {
    const m = () => setVentana({ w: window.innerWidth, h: window.innerHeight });
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
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
  const escala = Math.min(1, (disponible - 12) / ancho);
  const altoVisual = ventana.w >= 1024 ? Math.max(520, Math.min(900, ventana.h - 300)) : 640;

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

  // Modo señalar: el siguiente toque dentro de la página no navega, deja una chincheta.
  useEffect(() => {
    if (!senalando) return;
    const doc = marco.current?.contentDocument;
    if (!doc) return;
    const alTocar = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const W = doc.documentElement.clientWidth || 1;
      setMarca({ x: Math.round((e.pageX / W) * 1000) / 10, y: Math.round(e.pageY), elemento: etiquetaDe(e.target as Element) });
      setSenalando(false);
    };
    doc.addEventListener("click", alTocar, true);
    doc.documentElement.style.cursor = "crosshair";
    return () => {
      doc.removeEventListener("click", alTocar, true);
      doc.documentElement.style.cursor = "";
    };
  }, [senalando, cargado]);

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
      if (pos === "fixed") el.setAttribute("data-lupa-oculto", "1");
    });

    const H = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
    const W = doc.documentElement.clientWidth || win.innerWidth;
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

    // Notas para el desarrollador: chinchetas amarillas numeradas; la que se está señalando, con anillo.
    const chincheta = (x: number, y: number, texto: string, viva: boolean) => {
      const c2 = doc.createElement("div");
      c2.textContent = texto;
      c2.style.cssText = `position:absolute;left:${(x / 100) * W - 14}px;top:${y - 14}px;width:28px;height:28px;border-radius:50%;background:#ffde00;color:#141c33;font:700 13px/24px system-ui,sans-serif;text-align:center;border:2px solid #141c33;box-shadow:0 0 0 ${viva ? 5 : 0}px rgba(255,222,0,.45),0 2px 8px rgba(0,0,0,.35)`;
      capa.appendChild(c2);
    };
    for (const n of notasPagina) if (n.x !== null && n.y !== null) chincheta(n.x, n.y, String(n.id), false);
    if (marca) chincheta(marca.x, marca.y, "+", true);
  }, [ruta, deRuta, capas, notasPagina, marca]);

  // Dibujar al cargar y cuando cambian los datos, el dispositivo o las capas; varias veces porque
  // la página del marco termina de colocarse con retraso (fotos, tipografías).
  useEffect(() => {
    const tiempos = [250, 900, 2200, 4500, 8000].map((ms) => window.setTimeout(dibujar, ms));
    return () => tiempos.forEach((t) => window.clearTimeout(t));
  }, [dibujar, cargado, disp]);

  const conDatos = deRuta.length > 0;
  const hayPagina = PAGINAS_DEMO.some((p) => p.ruta === ruta);
  const verEnLaWeb = (r: string) => {
    setRuta(r);
    caja.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div style={{ background: C.crema, color: C.tinta, minHeight: "100vh", fontFamily: "var(--font-schibsted), system-ui, sans-serif" }}>
      {/* Una sola franja: título, filtros y totales */}
      <header className="border-b px-4 py-3" style={{ background: "rgba(250,247,241,.96)", borderColor: C.linea }}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <h1 className="text-[19px] font-bold leading-tight">
            Lupa 360 <span className="font-normal" style={{ color: C.suave }}>· la web con lo que hace la gente encima</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-[13.5px]">
            <Grupo valor={String(dias)} set={(v) => setDias(Number(v))} ops={[["7", "7 días"], ["28", "28 días"], ["90", "90 días"]]} />
            <Grupo valor={disp} set={(v) => setDisp(v as Dispositivo)} ops={[["movil", "Móvil"], ["pc", "Ordenador"]]} />
            <Grupo valor={version} set={(v) => setVersion(v as "todas" | "A" | "B")} ops={[["todas", "Todas"], ["A", "Versión A"], ["B", "Versión B"]]} />
            <select
              value={fuente}
              onChange={(e) => setFuente(e.target.value as Fuente | "todas")}
              aria-label="De dónde vienen"
              className="h-9 rounded-full border bg-white px-3"
              style={{ borderColor: C.linea }}
            >
              <option value="todas">Todas las fuentes</option>
              {FUENTES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-2 text-[13.5px]" style={{ color: C.suave }}>
          <b style={{ color: C.tinta }}>{visitas}</b> visitas · <b style={{ color: C.tinta }}>{filtrados.length}</b> páginas vistas · <b style={{ color: C.tinta }}>{visitas ? (filtrados.length / visitas).toFixed(1).replace(".", ",") : "0"}</b> páginas por visita · <b style={{ color: C.tinta }}>{total.activo} s</b> activos por página · solo quien acepta cookies de analítica
        </p>
        <p className="mt-1 text-[12.5px] font-semibold" style={{ color: C.ambar }}>
          Datos de demostración sobre nuestra propia web. Son inventados.{" "}
          <Link href="/servicios/lupa-360" className="underline underline-offset-4" style={{ color: C.enlace }}>Cómo funciona la Lupa 360</Link>
        </p>
      </header>

      <Conclusiones lista={lista} visitas={visitas} fia={fia} ir={verEnLaWeb} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 p-4 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        {/* Páginas */}
        <aside className="min-w-0 lg:max-h-[calc(100vh-24px)] lg:overflow-y-auto">
          <p className="mb-2 text-[12px] font-bold uppercase tracking-[.12em]" style={{ color: C.suave }}>Páginas, de más a menos vistas</p>
          <select
            className="mb-3 h-10 w-full rounded-xl border bg-white px-3 lg:hidden"
            style={{ borderColor: C.linea }}
            value={ruta}
            onChange={(e) => setRuta(e.target.value)}
            aria-label="Página"
          >
            {!hayPagina && <option value={ruta}>{ruta}</option>}
            {paginas.map((p) => (
              <option key={p.ruta} value={p.ruta}>{p.nombre} · {p.vistas}</option>
            ))}
          </select>
          <ul className="hidden space-y-1 lg:block">
            {paginas.map((p) => (
              <li key={p.ruta}>
                <button
                  type="button"
                  onClick={() => setRuta(p.ruta)}
                  aria-current={ruta === p.ruta ? "page" : undefined}
                  className="w-full rounded-xl px-3 py-2 text-left text-[13.5px] transition-colors hover:bg-white/70"
                  style={{ background: ruta === p.ruta ? "#fff" : "transparent", boxShadow: ruta === p.ruta ? `inset 3px 0 0 ${C.estrella}` : undefined }}
                >
                  <span className="flex justify-between gap-2"><span className="truncate font-semibold">{p.nombre}</span><span style={{ color: C.suave }}>{p.vistas}</span></span>
                  <span className="mt-1 block h-1.5 rounded-full" style={{ background: C.linea }}>
                    <span className="block h-1.5 rounded-full" style={{ width: `${p.baja}%`, background: C.estrella }} />
                  </span>
                  <span className="mt-1 block text-[11.5px]" style={{ color: C.suave }}>bajan {p.baja} % · se van de la web {p.salida} %</span>
                </button>
              </li>
            ))}
          </ul>
          <details className="mt-4 hidden rounded-xl bg-white p-3 text-[12.5px] lg:block">
            <summary className="cursor-pointer font-bold">Recorridos más repetidos</summary>
            {caminos.length ? (
              <ol className="mt-2 space-y-1.5">
                {caminos.map((r) => (
                  <li key={r.texto}><b>{r.n}×</b> {r.texto}</li>
                ))}
              </ol>
            ) : (
              <p className="mt-2" style={{ color: C.suave }}>Aún no hay recorridos con este filtro.</p>
            )}
          </details>
        </aside>

        {/* La web, con la capa */}
        <section className="min-w-0" aria-label="La web con lo que hace la gente encima">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px]">
            <Casilla on={capas.calor} set={(v) => setCapas({ ...capas, calor: v })} color="linear-gradient(90deg,#2878ff,#28c878,#ffd200,#e62828)">Dónde tocan</Casilla>
            <Casilla on={capas.vano} set={(v) => setCapas({ ...capas, vano: v })} color={C.rojo}>Tocan y no pasa nada</Casilla>
            <Casilla on={capas.baja} set={(v) => setCapas({ ...capas, baja: v })} color={C.noche}>Hasta dónde bajan</Casilla>
            <a href={ruta} target="_blank" rel="noopener" className="ml-auto underline underline-offset-4" style={{ color: C.enlace }}>Abrir la página aparte ↗</a>
          </div>
          <div ref={caja} className="w-full min-w-0">
            <div
              className="mx-auto overflow-hidden rounded-[22px] border-[6px] bg-white shadow-xl"
              style={{ borderColor: C.noche, width: ancho * escala + 12, height: altoVisual + 12, maxWidth: "100%" }}
            >
              <iframe
                ref={marco}
                title="Tu web con la lupa encima"
                src="/"
                style={{ width: ancho, height: altoVisual / escala, transform: `scale(${escala})`, transformOrigin: "0 0", border: 0, background: "#fff" }}
              />
            </div>
          </div>
          {!hayPagina && <p className="mx-auto mt-3 max-w-[60ch] rounded-xl bg-white p-3 text-center text-[13px]" style={{ color: C.suave }}>Esta página no tiene datos de ejemplo. Elige una de la lista.</p>}
          {hayPagina && !conDatos && <p className="mx-auto mt-3 max-w-[60ch] rounded-xl bg-white p-3 text-center text-[13px]" style={{ color: C.suave }}>Con este filtro no hay visitas a esta página. Amplía el periodo o quita algún filtro.</p>}
          <p className="mx-auto mt-2 max-w-[60ch] text-center text-[12px]" style={{ color: C.suave }}>
            Desplázate dentro del marco. {disp === "pc" ? "En ordenador la posición de los toques es aproximada, porque las pantallas tienen anchos distintos." : "Los toques se colocan por su sitio en la página, tal y como la vio cada persona."}
          </p>
        </section>

        {/* Cifras de la página */}
        <aside className="min-w-0 space-y-3 lg:max-h-[calc(100vh-24px)] lg:overflow-y-auto">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-[12px] font-bold uppercase tracking-[.12em]" style={{ color: C.suave }}>Esta página</p>
            <p className="mt-1 break-all text-[17px] font-bold">{hayPagina ? nombreDe(ruta) : ruta}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-[13px]">
              <Cifra n={c.vistas} t="vistas" />
              <Cifra n={`${c.baja} %`} t="bajan de media" />
              <Cifra n={`${c.alFinal} %`} t="llegan al final" />
              <Cifra n={`${c.activo} s`} t="tiempo activo" />
              <Cifra n={`${c.rapidos} %`} t="se van en menos de 10 s" />
              <Cifra n={c.toques} t="toques" />
            </dl>
          </div>

          <NotaDesarrollador
            notas={notasPagina}
            marca={marca}
            senalando={senalando}
            setSenalando={setSenalando}
            quitarMarca={() => setMarca(null)}
            guardar={(autor, texto) => {
              const id = notas.reduce((m, n) => Math.max(m, n.id), 0) + 1;
              const cuando = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
              guardarNotas([...notas, { id, autor, texto, ruta, disp, x: marca?.x ?? null, y: marca?.y ?? null, elemento: marca?.elemento ?? "", cuando }]);
              setMarca(null);
            }}
            quitar={(id) => guardarNotas(notas.filter((n) => n.id !== id))}
          />

          <Bloque titulo="Microsoft Clarity · esta página (cifras de ejemplo)">
            <ul className="space-y-1">
              <Fila a="Sesiones" b={c.vistas} />
              <Fila a="Clics en algo que no responde" b={c.enVano} />
              <Fila a="Clics de rabia (repetidos)" b={Math.round(c.enVano * 0.3)} />
              <Fila a="Vuelven atrás enseguida" b={Math.round(c.vistas * 0.03)} />
              <li className="pt-1 text-[11.5px]" style={{ color: C.suave }}>En un cliente real, las grabaciones y los mapas de Clarity se ven en clarity.microsoft.com.</li>
            </ul>
          </Bloque>
          <Lista titulo="Lo más tocado" filas={listas.mas} vacio="Aún no hay toques." />
          <Lista titulo="Tocan y no pasa nada" filas={listas.vano} vacio="Ningún toque en vano. Bien." rojo />
          <Bloque titulo="Vienen de">
            {origenes.length ? (
              <ul className="space-y-1">
                {origenes.map(([nombre, n]) => (
                  <li key={nombre} className="flex justify-between gap-3">
                    <button type="button" className="truncate text-left underline underline-offset-2" style={{ color: C.enlace }} onClick={() => setFuente(nombre as Fuente)}>{nombre}</button>
                    <b>{n}</b>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: C.suave }}>Sin datos.</p>
            )}
          </Bloque>
          <Bloque titulo="Después van a">
            {despues.length ? (
              <ul className="space-y-1">
                {despues.map(([sig, n]) => (
                  <li key={sig} className="flex justify-between gap-3">
                    {sig === "salida" ? (
                      <span>Se van de la web</span>
                    ) : (
                      <button type="button" className="truncate text-left underline underline-offset-2" style={{ color: C.enlace }} onClick={() => setRuta(sig)}>{nombreDe(sig)}</button>
                    )}
                    <b>{n}</b>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: C.suave }}>Sin datos.</p>
            )}
          </Bloque>
          <p className="px-1 text-[12px]" style={{ color: C.suave }}>
            En un cliente real, esto se activa solo si la persona acepta las cookies de analítica, nunca guarda lo que escribe y los datos se borran a los 90 días. Los datos son tuyos.{" "}
            <Link href="/estudio-gratuito" className="font-bold underline underline-offset-4" style={{ color: C.enlace }}>Pide tu estudio gratuito</Link>
          </p>
        </aside>
      </div>
    </div>
  );
}

function Grupo({ valor, set, ops }: { valor: string; set: (v: string) => void; ops: [string, string][] }) {
  return (
    <span className="inline-flex flex-wrap rounded-full border bg-white p-0.5" style={{ borderColor: C.linea }}>
      {ops.map(([v, t]) => (
        <button
          key={v}
          type="button"
          onClick={() => set(v)}
          aria-pressed={valor === v}
          className="h-8 rounded-full px-3 font-semibold transition-colors"
          style={{ background: valor === v ? C.noche : "transparent", color: valor === v ? "#fff" : C.tinta }}
        >
          {t}
        </button>
      ))}
    </span>
  );
}

function Casilla({ on, set, color, children }: { on: boolean; set: (v: boolean) => void; color: string; children: React.ReactNode }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-white px-3 py-1.5 font-medium transition-opacity" style={{ borderColor: C.linea, opacity: on ? 1 : 0.55 }}>
      <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} className="sr-only" />
      <span className="h-3 w-5 rounded-full" style={{ background: color }} />
      {children}
    </label>
  );
}

function Cifra({ n, t }: { n: number | string; t: string }) {
  return (
    <div>
      <dd className="text-[22px] font-bold leading-none" style={{ color: C.enlace }}>{n}</dd>
      <dt className="mt-1 leading-snug" style={{ color: C.suave }}>{t}</dt>
    </div>
  );
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-[13px]">
      <p className="mb-2 text-[12px] font-bold uppercase tracking-[.12em]" style={{ color: C.suave }}>{titulo}</p>
      {children}
    </div>
  );
}

function Fila({ a, b }: { a: string; b: number | string }) {
  return (
    <li className="flex justify-between gap-3"><span>{a}</span><b>{b}</b></li>
  );
}

function Lista({ titulo, filas, vacio, rojo }: { titulo: string; filas: [string, number][]; vacio: string; rojo?: boolean }) {
  return (
    <Bloque titulo={titulo}>
      {filas.length ? (
        <ul className="space-y-1">
          {filas.map(([t, n]) => (
            <li key={t} className="flex justify-between gap-3">
              <span className="min-w-0 break-words" style={{ color: rojo ? C.rojo : undefined }}>{t}</span>
              <b>{n}</b>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: C.suave }}>{vacio}</p>
      )}
    </Bloque>
  );
}

/* Conclusiones: cerradas al entrar, para que lo primero que se vea sea la web con la lupa encima. */
function Conclusiones({ lista, visitas, fia, ir }: { lista: Conclusion[]; visitas: number; fia: ReturnType<typeof fiabilidad>; ir: (ruta: string) => void }) {
  const [abierto, setAbierto] = useState(false);
  const [todas, setTodas] = useState(false);
  const color = fia.nombre === "Pistas" ? C.ambar : fia.nombre === "Tendencias" ? C.enlace : C.verde;
  const cs = todas ? lista : lista.slice(0, 4);
  return (
    <section className="mx-4 mt-4 rounded-2xl bg-white px-4 py-3 sm:px-5" aria-label="Conclusiones">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="button" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} className="flex items-center gap-2 text-[18px] font-bold">
          Conclusiones <span className="text-[13px] font-medium" style={{ color: C.suave }}>({lista.length})</span>
          <span className="rounded-full px-3 py-1 text-[12.5px]" style={{ background: C.estrella, color: C.tinta }}>{abierto ? "Cerrar" : "Ver"}</span>
        </button>
        <span className="rounded-full px-3 py-1 text-[12.5px] font-semibold text-white" style={{ background: color }}>{fia.nombre}</span>
        <span className="text-[13px]" style={{ color: C.suave }}>{fia.texto}</span>
        <span className="ml-auto flex items-center gap-2 text-[12px]" style={{ color: C.suave }}>
          <span className="block h-1.5 w-28 rounded-full" style={{ background: C.linea }} role="progressbar" aria-valuenow={fia.avance} aria-valuemin={0} aria-valuemax={100} aria-label="Avance hacia las 1.000 visitas">
            <span className="block h-1.5 rounded-full" style={{ width: `${fia.avance}%`, background: color }} />
          </span>
          {visitas} de 1.000 visitas
        </span>
      </div>
      {!abierto ? null : cs.length ? (
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {cs.map((x) => (
            <li key={x.id} className="flex min-w-0 gap-3 rounded-xl border p-3" style={{ borderColor: C.linea }}>
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: x.nivel === "alerta" ? C.rojo : x.nivel === "bien" ? C.verde : C.ambar }} />
              <div className="min-w-0 text-[13.5px] leading-snug">
                <p className="font-bold">{x.titulo}</p>
                <p className="mt-1" style={{ color: C.suave }}><b>Qué pasa:</b> {x.que}</p>
                <p className="mt-1" style={{ color: C.suave }}><b>Qué conviene:</b> {x.conviene}</p>
                {x.ruta && (
                  <button type="button" onClick={() => ir(x.ruta as string)} className="mt-1.5 text-[13px] underline underline-offset-4" style={{ color: C.enlace }}>
                    Verlo en la web
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-[13.5px]" style={{ color: C.suave }}>
          Con este filtro hay pocas visitas por página (se necesitan 8 como mínimo) para sacar conclusiones. Amplía el periodo o quita algún filtro.
        </p>
      )}
      {abierto && lista.length > 4 && (
        <button type="button" onClick={() => setTodas(!todas)} className="mt-3 text-[13px] font-bold underline underline-offset-4">
          {todas ? "Ver menos" : `Ver las ${lista.length}`}
        </button>
      )}
    </section>
  );
}

/* Nota para el desarrollador. En la demo no se envía a ningún sitio: se queda en este navegador. */
function NotaDesarrollador(p: {
  notas: Nota[];
  marca: Marca | null;
  senalando: boolean;
  setSenalando: (v: boolean) => void;
  quitarMarca: () => void;
  guardar: (autor: string, texto: string) => void;
  quitar: (id: number) => void;
}) {
  const [autor, setAutor] = useState(AUTORES[0]);
  const [texto, setTexto] = useState("");
  const [enviada, setEnviada] = useState(false);
  const enviar = () => {
    if (!texto.trim()) return;
    p.guardar(autor, texto.trim());
    setTexto("");
    setEnviada(true);
  };
  return (
    <div className="rounded-2xl border-2 bg-white p-4 text-[13.5px]" style={{ borderColor: C.amarillo }}>
      <p className="text-[12px] font-bold uppercase tracking-[.12em]" style={{ color: C.suave }}>Nota para el desarrollador</p>
      <select value={autor} onChange={(e) => setAutor(e.target.value)} aria-label="Quién escribe" className="mt-2 h-9 w-full rounded-lg border bg-white px-2" style={{ borderColor: C.linea }}>
        {AUTORES.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>
      <textarea
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setEnviada(false);
        }}
        rows={3}
        aria-label="Qué cambiarías en esta página"
        placeholder="Qué cambiarías en esta página…"
        className="mt-2 w-full rounded-lg border p-2"
        style={{ borderColor: C.linea }}
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {p.marca ? (
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px]" style={{ background: "#fff8c2" }}>
            Sitio señalado <button type="button" onClick={p.quitarMarca} className="underline">quitar</button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => p.setSenalando(!p.senalando)}
            className="rounded-full border px-3 py-1.5 text-[12.5px] font-medium"
            style={{ borderColor: C.tinta, background: p.senalando ? C.tinta : "#fff", color: p.senalando ? "#fff" : C.tinta }}
          >
            {p.senalando ? "Toca el sitio en la página…" : "Señalar un sitio en la página"}
          </button>
        )}
        <button type="button" disabled={!texto.trim()} onClick={enviar} className="ml-auto rounded-full px-4 py-1.5 font-bold disabled:opacity-50" style={{ background: C.amarillo, color: C.tinta }}>
          Enviar
        </button>
      </div>
      <p className="mt-2 text-[12px]" style={{ color: C.suave }}>
        {enviada ? "Anotada. En tu versión, esto nos llega al momento por correo." : "En la demo no se envía a ningún sitio: se queda en tu navegador."}
      </p>
      {p.notas.length > 0 && (
        <ul className="mt-3 space-y-2 border-t pt-3" style={{ borderColor: C.linea }}>
          {p.notas.map((n) => (
            <li key={n.id} className="flex gap-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: n.x !== null ? C.amarillo : C.linea, color: C.tinta }}>{n.id}</span>
              <div className="min-w-0 flex-1">
                <p className="whitespace-pre-wrap break-words">{n.texto}</p>
                <p className="text-[11.5px]" style={{ color: C.suave }}>
                  {n.autor} · {n.cuando}{n.elemento ? ` · sobre «${n.elemento}»` : ""} ·{" "}
                  <button type="button" onClick={() => p.quitar(n.id)} className="underline">quitar</button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
