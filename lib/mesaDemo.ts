/* Mesa de control de DEMOSTRACIÓN (26-oct-2026, cl·v821): cifras inventadas, con forma creíble,
   para enseñar el panel a ChatGPT y a otros chats sin datos reales. Siempre dan lo mismo para el
   mismo día (generador con semilla), así que comparar periodos tiene sentido. */

const semilla = (t: string) => { let h = 2166136261; for (const c of t) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; };
const dias = (desde: string, hasta: string) => { const o: string[] = []; const d = new Date(`${desde}T12:00:00Z`); while (d.toISOString().slice(0, 10) <= hasta) { o.push(d.toISOString().slice(0, 10)); d.setUTCDate(d.getUTCDate() + 1); } return o; };
const poisson = (r: () => number, media: number) => { let k = 0, p = 1; const L = Math.exp(-media); do { k++; p *= r(); } while (p > L); return k - 1; };
const finde = (d: string) => [0, 6].includes(new Date(`${d}T12:00:00Z`).getUTCDay());
/** Crece poco a poco a lo largo del año, con menos actividad en agosto y en fin de semana. */
const ritmo = (d: string) => { const m = Number(d.slice(5, 7)); const meses = Date.parse(d) / (30 * 86400000) - 668; return (1 + 0.015 * meses) * (m === 8 ? 0.55 : m === 12 ? 0.8 : 1) * (finde(d) ? 0.6 : 1); };

const CANALES_WEB: [string, number][] = [["Google Ads", 0.32], ["Meta / Instagram", 0.22], ["Google (búsqueda)", 0.2], ["Directo o sin dato", 0.14], ["Asistentes de IA", 0.06], ["ChatGPT Ads", 0.06]];
const CANALES_GA: [string, number][] = [["Organic Search", 0.36], ["Paid Search", 0.24], ["Direct", 0.16], ["Paid Social", 0.14], ["Referral", 0.05], ["Organic Social", 0.05]];
const reparte = <T,>(r: () => number, n: number, pesos: [string, number][]): Record<string, number> => {
  const o: Record<string, number> = {};
  for (let i = 0; i < n; i++) { let x = r(); for (const [k, p] of pesos) { x -= p; if (x <= 0) { o[k] = (o[k] ?? 0) + 1; break; } } }
  return o;
};

export function datosDemo(hoy: string) {
  const desde = (() => { const d = new Date(`${hoy}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - 400); return d.toISOString().slice(0, 10); })();
  const web: Record<string, unknown> = {};
  const ga: { dia: string; canal: string; sesiones: number; usuarios: number; interes: number; clave: number }[] = [];
  const gsc: { dia: string; clics: number; impresiones: number; posicion: number }[] = [];
  const diario: [string, string, string, number, number, number, number][] = [];
  for (const d of dias(desde, hoy)) {
    const r = semilla(d), k = ritmo(d);
    const peticiones = poisson(r, 2.2 * k);
    const porCanal = reparte(r, peticiones, CANALES_WEB);
    const whatsapp = poisson(r, 4 * k), llamadas = poisson(r, 1.6 * k);
    web[d] = { peticiones, visitas: Math.min(peticiones, poisson(r, 0.9 * k)), calculos: poisson(r, 1.1 * k), porCanal, whatsapp, llamadas, clicsPorFuente: reparte(r, whatsapp + llamadas, CANALES_WEB), vistas: Math.round(260 * k * (0.8 + 0.4 * r())) };
    for (const [canal, p] of CANALES_GA) {
      const s = Math.round(95 * k * p * (0.75 + 0.5 * r()));
      ga.push({ dia: d, canal, sesiones: s, usuarios: Math.round(s * 0.85), interes: Math.round(s * (0.45 + 0.2 * r())), clave: poisson(r, s * 0.02) });
    }
    const imp = Math.round(9000 * k * (0.8 + 0.4 * r()));
    gsc.push({ dia: d, clics: Math.round(imp * (0.0045 + 0.002 * r())), impresiones: imp, posicion: Math.round((14 - 0.004 * dias(desde, d).length + 2 * r()) * 10) / 10 });
    if (d >= hoy.slice(0, 8) + "01" || dias(d, hoy).length <= 60) {
      const fila = (plat: string, camp: string, base: number, cpc: number, conv: number) => { const coste = Math.round(base * k * (0.7 + 0.6 * r()) * 100) / 100; const clics = Math.round(coste / cpc); diario.push([d, plat, camp, coste, clics, clics * (12 + Math.round(r() * 10)), poisson(r, conv * k)]); };
      fila("google", "Búsqueda", 70, 1.9, 0.7); fila("google", "Marca", 12, 0.6, 0.3);
      fila("meta", "Captación con formulario", 55, 0.35, 0.8); fila("meta", "Remarketing", 18, 0.5, 0.15);
      fila("chatgpt", "Tráfico a la web", 15, 1.2, 0.1);
    }
  }
  // Inversión mensual de los meses anteriores (sin desglose diario)
  const mensual: [string, string, string, number, number, number, number][] = [];
  const primero = diario[0]?.[0].slice(0, 7);
  for (const d of dias(desde, hoy)) if (d.endsWith("-15") && d.slice(0, 7) < (primero ?? "")) {
    const r = semilla(`m${d}`), k = ritmo(d);
    mensual.push([d.slice(0, 7), "google", "Búsqueda", Math.round(2200 * k * (0.8 + 0.4 * r())), Math.round(1150 * k), Math.round(14000 * k), Math.round(22 * k)]);
    mensual.push([d.slice(0, 7), "meta", "Captación con formulario", Math.round(1900 * k * (0.8 + 0.4 * r())), Math.round(5200 * k), Math.round(90000 * k), Math.round(26 * k)]);
  }
  // Ficha de Google, Instagram y reseñas inventadas (cl·v836)
  const ficha: [string, number, number, number, number, number][] = [];
  const ig: [string, number, number, number | null][] = [];
  const corte = (() => { const d = new Date(`${hoy}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - 3); return d.toISOString().slice(0, 10); })();
  for (const d of dias(desde, corte)) { const r = semilla(`f${d}`), k = ritmo(d); ficha.push([d, poisson(r, 38 * k), poisson(r, 22 * k), poisson(r, 2.4 * k), poisson(r, 0.8 * k), poisson(r, 2.5 * k)]); }
  for (const d of dias(desde, hoy).slice(-120)) { const r = semilla(`i${d}`); ig.push([d, Math.round(900 * (0.5 + r())), Math.round(1800 * (0.5 + r())), dias(d, hoy).length <= 30 ? poisson(r, 25) : null]); }
  const redes = {
    actualizado: hoy, ficha: { diario: ficha },
    instagram: { usuario: "climaejemplo", seguidores: 3200, publicaciones: 180, diario: ig },
    resenas: [{ fuente: "Google", nota: 4.7, escala: 5, total: 180, fecha: hoy, auto: true }, { fuente: "Habitissimo", nota: 4.5, escala: 5, total: 42, fecha: hoy, auto: false }],
    historial_resenas: [] as [string, string, number, number][],
  };
  return { web, ga, gsc, anuncios: { actualizado: hoy, diario, mensual }, redes, google: true };
}

const PAGINAS = ["/", "/aire-acondicionado-madrid", "/cuanto-cuesta-instalar-aire", "/calculadora-ahorro", "/aerotermia", "/contacto", "/mantenimiento", "/opiniones", "/blog/cuanto-cuesta-instalar-aire-acondicionado-en-madrid-en-2026", "/instalaciones/chamartin", "/quienes-somos", "/preguntas-frecuentes"];
export function detalleDemo(desde: string, hasta: string) {
  const r = semilla(`${desde}${hasta}`);
  const n = Math.max(1, dias(desde, hasta).length);
  const paginas = PAGINAS.map((p, i) => { const v = Math.round((n * 260 * 0.9 ** (i * 1.4)) / 3 * (0.8 + 0.4 * r())); return { pagina: p, n: v, movil: Math.round(v * 0.68) }; });
  const clicsPagina = PAGINAS.slice(0, 8).flatMap((p, i) => [{ pagina: p, canal: "whatsapp", n: Math.round(n * 4 * 0.75 ** i * 0.3) }, { pagina: p, canal: "llamar", n: Math.round(n * 1.6 * 0.75 ** i * 0.3) }]);
  const lupa = PAGINAS.slice(0, 8).map((p, i) => { const v = Math.round(n * 30 * 0.85 ** i); return { pagina: p, visitas: v, movil: Math.round(v * 0.7), pc: Math.round(v * 0.3), scroll_mediano: Math.round(35 + 40 * r()), llegan_al_final_pct: Math.round(8 + 30 * r()), segundos_activos_mediana: Math.round(25 + 70 * r()), se_van_en_menos_de_10s_pct: Math.round(15 + 25 * r()), toques_sin_respuesta: [["foto del salón", Math.round(3 + 10 * r())], ["precio por m²", Math.round(1 + 6 * r())]] as [string, number][] }; });
  const busq = ["aire acondicionado madrid", "climatizacion ejemplo", "cuanto cuesta instalar aire acondicionado en un piso", "empresa de climatizacion madrid", "aerotermia precio vivienda", "instalacion aire acondicionado chamartin", "precio split 3000 frigorias instalado", "mantenimiento aire acondicionado madrid"];
  const busquedas = busq.map((b, i) => { const im = Math.round(n * 900 * 0.7 ** i); const ctr = i === 1 ? 32 : 0.6 + 3 * r(); return { busqueda: b, clics: Math.round((im * ctr) / 100), impresiones: im, ctr_pct: Math.round(ctr * 10) / 10, posicion: i === 1 ? 1.1 : Math.round((6 + 14 * r()) * 10) / 10 }; });
  const gscPag = PAGINAS.slice(0, 8).map((p, i) => ({ pagina: `https://www.climatizacionejemplo.es${p}`, clics: Math.round(n * 12 * 0.7 ** i), impresiones: Math.round(n * 2500 * 0.7 ** i), posicion: Math.round((5 + 15 * r()) * 10) / 10 }));
  const tc = gscPag.reduce((a, x) => a + x.clics, 0), ti = gscPag.reduce((a, x) => a + x.impresiones, 0);
  const entradas = PAGINAS.slice(0, 10).map((p, i) => ({ pagina: p, sesiones: Math.round(n * 40 * 0.8 ** i), interes_pct: Math.round(40 + 30 * r()), clave: Math.round(n * 0.4 * 0.8 ** i) }));
  const orig: [string, number][] = [["Instagram", 0.2], ["Google Ads", 0.3], ["Recomendado", 0.18], ["Meta (anuncio)", 0.12], ["Web (formulario)", 0.1], ["Llamada", 0.1]];
  const crm = orig.map(([o, p]) => { const leads = Math.max(1, Math.round(n * 2.6 * p * (0.8 + 0.4 * r()))); const visitas = Math.round(leads * (o === "Recomendado" ? 0.7 : 0.38)); const presupuestos = Math.round(visitas * 0.8); const firmados = Math.round(presupuestos * (o === "Recomendado" ? 0.5 : 0.25)); return { origen: o, leads, visitas, presupuestos, firmados, firmado: firmados * Math.round(4200 + 3200 * r()), facturado: Math.round(firmados * 4000 * r()), descartados: Math.round(leads * 0.2), respondidos: leads, horas_resp: leads * (2 + 6 * r()), vencidas: Math.round(r() * 3) }; });
  const fr = (clave: string, ses: number, ip: number, ev: number) => ({ clave, sesiones: Math.round(ses), interes: Math.round(ses * ip), eventos: Math.round(ev), segundos: Math.round(ses * ip * (40 + 50 * r())) });
  const rebote = {
    dispositivo: [fr("mobile", n * 70, 0.48 + 0.08 * r(), n * 0.9), fr("desktop", n * 38, 0.62 + 0.08 * r(), n * 0.8), fr("tablet", n * 3, 0.55, n * 0.05)],
    zona: [fr("Community of Madrid", n * 78, 0.6, n * 1.6), fr("Andalusia", n * 6, 0.35, 0), fr("Catalonia", n * 5, 0.38, 0), fr("Castile-La Mancha", n * 4, 0.5, n * 0.05), fr("Valencian Community", n * 3, 0.36, 0)],
    tipo: [fr("new", n * 85, 0.5, n * 1.1), fr("returning", n * 26, 0.72, n * 0.6)],
    paginas: [
      fr("/", n * 30, 0.55, n * 0.5), fr("/aire-acondicionado-madrid", n * 16, 0.42, n * 0.12), fr("/blog/como-limpiar-los-filtros-del-aire-acondicionado", n * 14, 0.3, 0),
      fr("/cuanto-cuesta-instalar-aire", n * 11, 0.66, n * 0.4), fr("/calculadora-ahorro", n * 9, 0.7, n * 0.6), fr("/glosario/frigoria", n * 8, 0.18, 0), fr("/instalaciones/chamartin", n * 6, 0.35, n * 0.02),
      fr("/contacto", n * 5, 0.8, n * 0.5), fr("/blog/cuanto-cuesta-instalar-aire-acondicionado-en-madrid-en-2026", n * 5, 0.58, n * 0.1), fr("/aerotermia", n * 4, 0.62, n * 0.06),
    ],
  };
  return { rebote, paginas, clicsPagina, lupa, gsc: { totales: { clics: tc, impresiones: ti, ctr_pct: Math.round((tc / ti) * 1000) / 10, posicion: 12.4 }, busquedas, paginas: gscPag }, entradas, crm };
}
