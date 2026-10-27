// Datos INVENTADOS de la demostración de la Lupa 360.
// Se generan con una semilla fija, así que siempre salen los mismos. No hay base de datos ni grabador.
// Cada "tramo" es lo que una persona hace en una página: de dónde viene, cuánto está, hasta dónde baja
// y qué toca. Los toques llevan tres números al azar (a, b, c) con los que la pantalla elige, en la web
// de verdad, qué elemento tocó, para que el calor caiga siempre sobre cosas que existen.

export type Fuente = "Anuncio de Google" | "Instagram y Facebook" | "Google" | "Directo";
export type TipoToque = "contacto" | "enlace" | "campo" | "boton" | "foto" | "nada";
export type Version = "A" | "B";

export type Toque = { tipo: TipoToque; a: number; b: number; c: number; t: number };
export type Tramo = {
  id: number;
  sesion: number;
  ruta: string;
  movil: boolean;
  version: Version;
  fuente: Fuente;
  dias: number; // hace cuántos días (0 a 89)
  seg: number; // segundos en la página
  activo: number; // segundos activo de verdad
  baja: number; // hasta qué % de la página baja (0 a 100)
  salio: boolean; // se va de la web desde esta página
  sig: string | null; // página a la que va después
  toques: Toque[];
};

export const FUENTES: Fuente[] = ["Anuncio de Google", "Instagram y Facebook", "Google", "Directo"];

export type PaginaDemo = { ruta: string; nombre: string };
export const PAGINAS_DEMO: PaginaDemo[] = [
  { ruta: "/", nombre: "Inicio" },
  { ruta: "/servicios", nombre: "Servicios" },
  { ruta: "/como-trabajamos", nombre: "Cómo trabajamos" },
  { ruta: "/blog", nombre: "Blog" },
  { ruta: "/quienes-somos", nombre: "Nosotros" },
  { ruta: "/estudio-gratuito", nombre: "Estudio gratuito" },
];
export const nombreDe = (ruta: string) => PAGINAS_DEMO.find((p) => p.ruta === ruta)?.nombre ?? ruta;

function semilla(n: number) {
  let a = n >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Perfil = {
  entrada: number; // peso de entrar por aquí
  sigue: number; // probabilidad de seguir a otra página
  siguientes: [string, number][];
  baja: [number, number]; // % medio al que baja (bajo, alto)
  pocoBaja: number; // fracción que casi no baja
  rapidos: number; // fracción que se va en menos de 10 s
  seg: number; // segundos típicos
  toques: number; // toques medios
  mezcla: Record<TipoToque, number>;
  fuentes: [Fuente, number][];
};

const PERFILES: Record<string, Perfil> = {
  // Inicio: mucha gente toca la foto grande creyendo que es un enlace.
  "/": {
    entrada: 40, sigue: 0.55, siguientes: [["/servicios", 0.4], ["/como-trabajamos", 0.25], ["/estudio-gratuito", 0.25], ["/quienes-somos", 0.1]],
    baja: [35, 100], pocoBaja: 0.12, rapidos: 0.14, seg: 70, toques: 2.4,
    mezcla: { contacto: 0.2, enlace: 0.3, campo: 0, boton: 0.1, foto: 0.28, nada: 0.12 },
    fuentes: [["Anuncio de Google", 0.35], ["Instagram y Facebook", 0.2], ["Google", 0.25], ["Directo", 0.2]],
  },
  "/servicios": {
    entrada: 15, sigue: 0.6, siguientes: [["/estudio-gratuito", 0.5], ["/como-trabajamos", 0.3], ["/", 0.2]],
    baja: [45, 100], pocoBaja: 0.1, rapidos: 0.1, seg: 95, toques: 2.8,
    mezcla: { contacto: 0.18, enlace: 0.35, campo: 0, boton: 0.12, foto: 0.1, nada: 0.25 },
    fuentes: [["Anuncio de Google", 0.4], ["Instagram y Facebook", 0.1], ["Google", 0.4], ["Directo", 0.1]],
  },
  // Cómo trabajamos: mucha gente se va casi enseguida.
  "/como-trabajamos": {
    entrada: 8, sigue: 0.22, siguientes: [["/estudio-gratuito", 0.5], ["/servicios", 0.5]],
    baja: [15, 55], pocoBaja: 0.5, rapidos: 0.5, seg: 25, toques: 1.2,
    mezcla: { contacto: 0.1, enlace: 0.3, campo: 0, boton: 0.05, foto: 0.3, nada: 0.25 },
    fuentes: [["Anuncio de Google", 0.15], ["Instagram y Facebook", 0.5], ["Google", 0.2], ["Directo", 0.15]],
  },
  // Blog: entran desde Google y se van sin ver nada más.
  "/blog": {
    entrada: 25, sigue: 0.14, siguientes: [["/", 0.6], ["/servicios", 0.4]],
    baja: [15, 70], pocoBaja: 0.4, rapidos: 0.22, seg: 45, toques: 0.9,
    mezcla: { contacto: 0.05, enlace: 0.5, campo: 0, boton: 0.05, foto: 0.2, nada: 0.2 },
    fuentes: [["Anuncio de Google", 0.03], ["Instagram y Facebook", 0.07], ["Google", 0.8], ["Directo", 0.1]],
  },
  "/quienes-somos": {
    entrada: 5, sigue: 0.5, siguientes: [["/estudio-gratuito", 0.6], ["/", 0.4]],
    baja: [40, 100], pocoBaja: 0.12, rapidos: 0.12, seg: 80, toques: 2,
    mezcla: { contacto: 0.2, enlace: 0.35, campo: 0, boton: 0.1, foto: 0.25, nada: 0.1 },
    fuentes: [["Anuncio de Google", 0.25], ["Instagram y Facebook", 0.25], ["Google", 0.25], ["Directo", 0.25]],
  },
  // Estudio gratuito: la página que más contactos trae.
  "/estudio-gratuito": {
    entrada: 7, sigue: 0.08, siguientes: [["/", 1]],
    baja: [60, 100], pocoBaja: 0.05, rapidos: 0.06, seg: 110, toques: 4.2,
    mezcla: { contacto: 0.3, enlace: 0.05, campo: 0.35, boton: 0.25, foto: 0.02, nada: 0.03 },
    fuentes: [["Anuncio de Google", 0.6], ["Instagram y Facebook", 0.2], ["Google", 0.1], ["Directo", 0.1]],
  },
};

function elegir<T>(opciones: [T, number][], r: number): T {
  const total = opciones.reduce((s, o) => s + o[1], 0);
  let acum = 0;
  for (const [v, p] of opciones) {
    acum += p / total;
    if (r <= acum) return v;
  }
  return opciones[opciones.length - 1][0];
}

function generar(): Tramo[] {
  const azar = semilla(360360);
  const tramos: Tramo[] = [];
  const entradas = Object.entries(PERFILES).map(([ruta, p]) => [ruta, p.entrada] as [string, number]);
  let sesion = 0;
  while (tramos.length < 400) {
    sesion += 1;
    const movil = azar() < 0.62;
    const version: Version = azar() < 0.5 ? "A" : "B";
    const dias = Math.floor(azar() * 90);
    let ruta: string | null = elegir(entradas, azar());
    let n = 0;
    while (ruta && n < 4) {
      const p: Perfil = PERFILES[ruta];
      const fuente: Fuente = n === 0 ? elegir(p.fuentes, azar()) : tramos[tramos.length - 1].fuente;
      const rapido: boolean = azar() < p.rapidos * (version === "B" ? 0.8 : 1);
      const seg = rapido ? 2 + Math.floor(azar() * 7) : Math.round(p.seg * (0.4 + azar() * 1.6));
      const activo = Math.max(1, Math.round(seg * (0.45 + azar() * 0.45)));
      const pocoBaja = azar() < p.pocoBaja || rapido;
      const baja = pocoBaja ? Math.floor(azar() * 20) : Math.round(p.baja[0] + azar() * (p.baja[1] - p.baja[0]));
      const sigue: boolean = !rapido && azar() < p.sigue;
      const sig: string | null = sigue ? elegir(p.siguientes, azar()) : null;
      const cuantos = rapido ? (azar() < 0.2 ? 1 : 0) : Math.round(p.toques * (0.3 + azar() * 1.4) * (baja / 100 + 0.3));
      const mezcla = { ...p.mezcla };
      if (version === "B") {
        mezcla.contacto *= 1.25;
        mezcla.nada *= 0.8;
      }
      const opciones = (Object.entries(mezcla) as [TipoToque, number][]).filter((o) => o[1] > 0);
      const toques: Toque[] = [];
      for (let i = 0; i < cuantos; i++) {
        toques.push({ tipo: elegir(opciones, azar()), a: azar(), b: azar(), c: azar(), t: Math.max(1, Math.round(azar() * seg)) });
      }
      tramos.push({ id: tramos.length, sesion, ruta, movil, version, fuente, dias, seg, activo, baja, salio: !sig, sig, toques });
      ruta = sig;
      n += 1;
    }
  }
  return tramos;
}

export const TRAMOS: Tramo[] = generar();

// ---------------------------------------------------------------------------------------------
// Cálculos sobre un conjunto de tramos (ya filtrado)
// ---------------------------------------------------------------------------------------------

export const EN_VANO: TipoToque[] = ["foto", "nada"];

export type Cifras = {
  vistas: number;
  baja: number; // % medio
  alFinal: number; // % que llega al final
  activo: number; // segundos
  rapidos: number; // % que se va en menos de 10 s
  salida: number; // % que se va de la web desde aquí
  toques: number;
  enVano: number;
  contactos: number;
};

export function cifras(t: Tramo[]): Cifras {
  const n = t.length;
  if (!n) return { vistas: 0, baja: 0, alFinal: 0, activo: 0, rapidos: 0, salida: 0, toques: 0, enVano: 0, contactos: 0 };
  let baja = 0, final = 0, activo = 0, rapidos = 0, salida = 0, toques = 0, enVano = 0, contactos = 0;
  for (const x of t) {
    baja += x.baja;
    if (x.baja >= 90) final += 1;
    activo += x.activo;
    if (x.seg < 10) rapidos += 1;
    if (x.salio) salida += 1;
    toques += x.toques.length;
    for (const k of x.toques) {
      if (EN_VANO.includes(k.tipo)) enVano += 1;
      if (k.tipo === "contacto" || k.tipo === "campo") contactos += 1;
    }
  }
  return {
    vistas: n,
    baja: Math.round(baja / n),
    alFinal: Math.round((final / n) * 100),
    activo: Math.round(activo / n),
    rapidos: Math.round((rapidos / n) * 100),
    salida: Math.round((salida / n) * 100),
    toques,
    enVano,
    contactos,
  };
}

export function fiabilidad(visitas: number): { nombre: "Pistas" | "Tendencias" | "Firmes"; texto: string; avance: number } {
  const avance = Math.min(100, Math.round((visitas / 1000) * 100));
  if (visitas < 100) return { nombre: "Pistas", texto: "Son indicios: con menos de 100 visitas puede ser casualidad.", avance };
  if (visitas < 1000) return { nombre: "Tendencias", texto: "Hay una dirección clara, pero aún conviene confirmarla.", avance };
  return { nombre: "Firmes", texto: "Con más de 1.000 visitas, ya se puede decidir con tranquilidad.", avance };
}

export type Conclusion = {
  id: string;
  nivel: "alerta" | "aviso" | "bien";
  ruta: string | null;
  titulo: string;
  que: string;
  conviene: string;
};

const MIN_VISTAS = 8;

// Reglas fijas, sin IA: con los mismos datos salen siempre las mismas conclusiones.
export function conclusiones(t: Tramo[]): Conclusion[] {
  const lista: Conclusion[] = [];
  const porPagina = new Map<string, Tramo[]>();
  for (const x of t) porPagina.set(x.ruta, [...(porPagina.get(x.ruta) ?? []), x]);

  let mejor: { ruta: string; n: number; parte: number } | null = null;

  for (const [ruta, filas] of porPagina) {
    if (filas.length < MIN_VISTAS) continue;
    const c = cifras(filas);
    const nombre = nombreDe(ruta);
    const poco = Math.round((filas.filter((f) => f.baja < 25).length / filas.length) * 100);
    const totalToques = filas.reduce((s, f) => s + f.toques.length, 0);

    // La página de contacto es el final natural del recorrido: irse de ella no es perder a nadie.
    if (c.salida >= 60 && ruta !== "/estudio-gratuito") {
      lista.push({
        id: `salida-${ruta}`, nivel: "alerta", ruta,
        titulo: `En «${nombre}», ${c.salida} de cada 100 personas se van de la web`,
        que: "Entran, miran y no siguen a ninguna otra página.",
        conviene: "Poner al final un siguiente paso claro: un botón para contactar o un enlace a lo que más ayuda a decidir.",
      });
    }
    if (poco >= 45) {
      lista.push({
        id: `pocobaja-${ruta}`, nivel: "aviso", ruta,
        titulo: `En «${nombre}», casi nadie baja: ${poco} de cada 100 se quedan arriba`,
        que: "Lo que está más abajo casi no se ve.",
        conviene: "Subir lo importante, o hacer más corto lo de arriba para que se asome lo siguiente.",
      });
    }
    if (c.rapidos >= 30) {
      lista.push({
        id: `rapidos-${ruta}`, nivel: "alerta", ruta,
        titulo: `En «${nombre}», ${c.rapidos} de cada 100 se van en menos de 10 segundos`,
        que: "Lo primero que ven no es lo que esperaban.",
        conviene: "Revisar el titular y lo primero que se ve, y comprobar que coincide con lo que prometía el enlace o el anuncio del que vienen.",
      });
    }
    if (totalToques >= 5 && c.enVano / Math.max(1, totalToques) >= 0.2) {
      lista.push({
        id: `vano-${ruta}`, nivel: "aviso", ruta,
        titulo: `En «${nombre}», ${c.enVano} toques no llevan a ningún sitio`,
        que: "La gente toca fotos o textos creyendo que son botones, y no pasa nada.",
        conviene: "Convertir esas fotos o tarjetas en enlaces, o hacer que no parezcan botones.",
      });
    }
    const buenos = filas.reduce((s, f) => s + f.toques.filter((k) => k.tipo === "contacto" || k.tipo === "campo").length, 0);
    if (!mejor || buenos / filas.length > mejor.parte) mejor = { ruta, n: filas.length, parte: buenos / filas.length };
  }

  const sesiones = new Map<number, number>();
  for (const x of t) sesiones.set(x.sesion, (sesiones.get(x.sesion) ?? 0) + 1);
  if (sesiones.size >= MIN_VISTAS) {
    const una = [...sesiones.values()].filter((v) => v === 1).length;
    const parte = Math.round((una / sesiones.size) * 100);
    if (parte >= 55) {
      lista.push({
        id: "una-pagina", nivel: "aviso", ruta: null,
        titulo: `${parte} de cada 100 visitas ven una sola página`,
        que: "Entran por una página y no siguen.",
        conviene: "Enlazar mejor cada página con la siguiente más lógica, para llevar a la persona hasta el contacto.",
      });
    }
  }

  if (mejor && mejor.n >= MIN_VISTAS && mejor.parte >= 1) {
    lista.push({
      id: "mejor", nivel: "bien", ruta: mejor.ruta,
      titulo: `«${nombreDe(mejor.ruta)}» es la página donde más se pulsa contactar`,
      que: `Por cada visita, ${mejor.parte.toFixed(1).replace(".", ",")} toques en contacto o en el formulario.`,
      conviene: "Llevar más gente hacia esta página y cuidar que no se estropee.",
    });
  }
  return lista;
}

export type Recorrido = { texto: string; n: number };
export function recorridos(t: Tramo[]): Recorrido[] {
  const porSesion = new Map<number, Tramo[]>();
  for (const x of t) porSesion.set(x.sesion, [...(porSesion.get(x.sesion) ?? []), x]);
  const cuenta = new Map<string, number>();
  for (const filas of porSesion.values()) {
    if (filas.length < 2) continue;
    const texto = filas.sort((a, b) => a.id - b.id).map((f) => nombreDe(f.ruta)).join(" → ");
    cuenta.set(texto, (cuenta.get(texto) ?? 0) + 1);
  }
  return [...cuenta.entries()].map(([texto, n]) => ({ texto, n })).sort((a, b) => b.n - a.n).slice(0, 4);
}
