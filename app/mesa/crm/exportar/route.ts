import { NextResponse } from "next/server";
import { asegurarTablas, hayBaseDeDatos, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

/* Descarga del CRM en Excel (CSV con ; y acentos bien, para abrir con doble clic). Va con clave: /mesa/* (middleware.ts). */
const celda = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

export async function GET() {
  if (!hayBaseDeDatos()) return new NextResponse("Sin base de datos.", { status: 503 });
  await asegurarTablas();
  const filas = (await sql()`SELECT creado, estado, nombre, empresa, correo, telefono, encaje, fuente, campana, aterrizaje, variante, encaje_ok, motivo_descarte, notas, texto FROM solicitudes ORDER BY creado DESC`) as unknown as Record<string, string>[];
  const cab = ["Fecha", "Estado", "Nombre", "Empresa", "Correo", "Teléfono", "Encaje", "Fuente", "Campaña", "Entró por", "Formulario", "Encaje real", "Motivo", "Notas", "Lo que contó en el test"];
  const lineas = [cab.map(celda).join(";")];
  for (const f of filas) {
    const fecha = new Date(f.creado).toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
    lineas.push([fecha, f.estado, f.nombre, f.empresa, f.correo, f.telefono, f.encaje, f.fuente, f.campana, f.aterrizaje, f.variante, f.encaje_ok, f.motivo_descarte, f.notas, f.texto].map(celda).join(";"));
  }
  return new NextResponse("﻿" + lineas.join("\r\n"), {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": 'attachment; filename="casiopea360-crm.csv"', "cache-control": "no-store" },
  });
}
