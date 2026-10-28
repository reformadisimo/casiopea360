"use client";
import Link from "next/link";
import CrmApp from "./CrmApp";
import { ESTADOS, ORIGENES, CANALES, MOTIVOS, FASES } from "@/lib/crmListas";

// Se marca antes de que el CRM pinte: todas sus llamadas van a los datos inventados (components/crm/demo.ts)
if (typeof window !== "undefined") (window as unknown as { __crmDemo?: boolean }).__crmDemo = true;

const listas = { estados: ESTADOS, origenes: ORIGENES, canales: CANALES, motivos: MOTIVOS, fases: FASES };

export default function DemoCrm() {
  return (
    <div className="mesa">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-[#11343d] px-4 py-2 text-[14px] text-white">
        <Link href="/" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">← Casiopea 360</Link>
        <p className="min-w-0 flex-1 basis-full sm:basis-0">
          CRM de ejemplo con <b>datos inventados</b> de una empresa ficticia, Climatización Ejemplo. Puedes tocarlo todo; no se guarda ni se envía nada.
        </p>
      </div>
      <CrmApp usuario={{ id: 1, email: "direccion1@ejemplo.es", nombre: "Lucía", rol: "admin", puesto: "Dirección" }} listas={listas} />
    </div>
  );
}
