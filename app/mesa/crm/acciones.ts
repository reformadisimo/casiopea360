"use server";
import { revalidatePath } from "next/cache";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";
import { ESTADOS } from "@/lib/crm";

/* Acciones del CRM de la mesa (19-nov-2026). Solo se llaman desde /mesa/crm, que va con clave (middleware.ts). */

export async function cambiarEstado(datos: FormData) {
  const id = Number(datos.get("id"));
  const estado = String(datos.get("estado") ?? "");
  if (!hayBaseDeDatos() || !Number.isInteger(id) || !ESTADOS.some((e) => e.clave === estado)) return;
  await asegurarTablas();
  await sql()`UPDATE solicitudes SET estado = ${estado}, actualizado = now() WHERE id = ${id}`;
  revalidatePath("/mesa/crm");
}

export async function guardarNota(datos: FormData) {
  const id = Number(datos.get("id"));
  const notas = String(datos.get("notas") ?? "").slice(0, 2000);
  if (!hayBaseDeDatos() || !Number.isInteger(id)) return;
  await asegurarTablas();
  await sql()`UPDATE solicitudes SET notas = ${notas}, actualizado = now() WHERE id = ${id}`;
  revalidatePath("/mesa/crm");
}

/* «Encaje sí/no» (20-nov-2026): decisión de una persona tras mirar la empresa. A = gasta más de 4.000 € al mes; B = entre 2.000 y 4.000 o «no lo sé» con web real; C = el resto. */
const ENCAJES = ["A", "B", "C", "no"];
export async function guardarEncaje(datos: FormData) {
  const id = Number(datos.get("id"));
  const ok = String(datos.get("encaje_ok") ?? "");
  const motivo = String(datos.get("motivo") ?? "").slice(0, 300);
  if (!hayBaseDeDatos() || !Number.isInteger(id) || !ENCAJES.includes(ok)) return;
  await asegurarTablas();
  await sql()`UPDATE solicitudes SET encaje_ok = ${ok}, motivo_descarte = ${motivo}, actualizado = now() WHERE id = ${id}`;
  revalidatePath("/mesa/crm");
}
