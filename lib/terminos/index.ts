import type { FamiliaId, TerminoGlosario } from "./tipos";
import { BUSCADORES } from "./buscadores";
import { ANUNCIOS } from "./anuncios";
import { MEDICION } from "./medicion";
import { WEB } from "./web";
import { REDES } from "./redes";
import { CRM } from "./crm";
import { IA } from "./ia";
import { LEGAL } from "./legal";

export { FAMILIAS } from "./tipos";
export type { FamiliaId, TerminoGlosario } from "./tipos";

export const TERMINOS: TerminoGlosario[] = [
  ...BUSCADORES,
  ...ANUNCIOS,
  ...MEDICION,
  ...WEB,
  ...REDES,
  ...CRM,
  ...IA,
  ...LEGAL,
];

const MAPA = new Map(TERMINOS.map((t) => [t.slug, t]));

export function terminoPorSlug(slug: string): TerminoGlosario | undefined {
  return MAPA.get(slug);
}

export function terminosDeFamilia(f: FamiliaId): TerminoGlosario[] {
  return TERMINOS.filter((t) => t.familia === f);
}

export function relacionados(t: TerminoGlosario): TerminoGlosario[] {
  return t.rel.map((s) => MAPA.get(s)).filter((x): x is TerminoGlosario => Boolean(x));
}

/** Orden alfabético en español, sin distinguir tildes. */
export function ordenAlfabetico(lista: TerminoGlosario[]): TerminoGlosario[] {
  return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
}

export function inicial(t: TerminoGlosario): string {
  const c = t.nombre.normalize("NFD").replace(/[̀-ͯ]/g, "").charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
}
