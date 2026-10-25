"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = { slug: string; nombre: string; largo?: string; corta: string; familia: string; inicial: string; buscable: string };
type Familia = { id: string; nombre: string; color: string };

const quitaTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Índice del glosario: buscador, familias y letras. Todos los términos van ya en el HTML del servidor.
export default function GlosarioBuscador({ items, familias }: { items: Item[]; familias: Familia[] }) {
  const [q, setQ] = useState("");
  const [fam, setFam] = useState<string>("todas");
  const color = (id: string) => familias.find((f) => f.id === id)?.color ?? "#24387a";
  const nombreFam = (id: string) => familias.find((f) => f.id === id)?.nombre ?? "";

  const visibles = useMemo(() => {
    const t = quitaTildes(q.trim());
    return items.filter((i) => (fam === "todas" || i.familia === fam) && (!t || i.buscable.includes(t)));
  }, [items, q, fam]);

  const letras = useMemo(() => [...new Set(visibles.map((i) => i.inicial))], [visibles]);
  const abecedario = useMemo(() => [...new Set(items.map((i) => i.inicial))], [items]);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-linea bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <label htmlFor="gl-buscar" className="sr-only">Buscar un término</label>
        <div className="relative">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gris" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5" /></svg>
          <input
            id="gl-buscar"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca un término: SEO, CRM, landing…"
            className="w-full rounded-full border border-linea bg-niebla py-3.5 pl-12 pr-5 text-base focus:border-noche focus:bg-white focus:outline-none"
            autoComplete="off"
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar por tema">
          {[{ id: "todas", nombre: "Todos", color: "#0e1a3d" }, ...familias].map((f) => {
            const activo = fam === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFam(f.id)}
                aria-pressed={activo}
                className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition-colors"
                style={activo ? { background: f.color, borderColor: f.color, color: "#fff" } : { borderColor: "#d9deeb", color: "#141c33" }}
              >
                {f.nombre}
              </button>
            );
          })}
        </div>
        <nav aria-label="Ir a una letra" className="mt-3 hidden flex-wrap gap-1 sm:flex">
          {abecedario.map((l) => {
            const hay = letras.includes(l);
            return hay ? (
              <a key={l} href={`#letra-${l}`} className="grid h-8 w-8 place-items-center rounded-full text-sm font-extrabold text-noche-3 hover:bg-noche hover:text-white">{l}</a>
            ) : (
              <span key={l} className="grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-linea">{l}</span>
            );
          })}
        </nav>
      </div>

      <p className="mt-6 text-sm font-bold text-gris" aria-live="polite">
        {visibles.length === items.length ? `${items.length} términos` : `${visibles.length} de ${items.length} términos`}
      </p>

      {visibles.length === 0 && (
        <div className="mt-6 rounded-3xl bg-niebla p-8 text-center">
          <p className="text-xl font-extrabold">No encontramos «{q}».</p>
          <p className="mt-2 text-gris">Prueba con otra palabra, o cuéntanos qué te falta y lo añadimos.</p>
        </div>
      )}

      {letras.map((l) => (
        <section key={l} id={`letra-${l}`} className="scroll-mt-48 pt-8">
          <h2 className="font-titular text-4xl font-extrabold text-noche-3">{l}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.filter((i) => i.inicial === l).map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/glosario/${i.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-linea bg-white p-5 transition-all hover:-translate-y-1 hover:border-noche hover:shadow-[0_20px_40px_-26px_rgba(14,26,61,0.5)]"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: color(i.familia) }}>{nombreFam(i.familia)}</span>
                  <span className="mt-1 text-xl font-extrabold leading-snug group-hover:text-[#1d4ed8]">{i.nombre}</span>
                  {i.largo && <span className="text-sm text-gris">{i.largo}</span>}
                  <span className="mt-2 flex-1 text-[0.97rem] text-gris">{i.corta}</span>
                  <span className="mt-3 text-sm font-bold text-noche-3 group-hover:underline">Leer la explicación</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
