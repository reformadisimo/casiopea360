// Lo que costaría contratar cada cosa por separado según el tamaño de la empresa.
// Precios orientativos del mercado español (Cronoshare, Duotach, Clientify) y, donde se dice, estimación nuestra.
export type Fila = { que: string; nota?: string; valores: [number, number, number] };
export const TAMANOS = ["Pyme", "Más de 1 millón de facturación", "Gran empresa"] as const;

export const MES: Fila[] = [
  { que: "SEO (posicionamiento en Google)", nota: "Mercado: de 100 a 1.800 € al mes", valores: [500, 900, 1800] },
  { que: "Gestión de Google Ads", nota: "Solo la gestión. Mercado: de 350 a 1.500 € al mes, o un 10-20 % de la inversión", valores: [400, 700, 1500] },
  { que: "Gestión de anuncios en Instagram y Facebook", nota: "Normalmente otra persona u otra agencia", valores: [350, 500, 1500] },
  { que: "Redes sociales y contenido", nota: "Mercado: de 300 a 1.200 € al mes", valores: [500, 800, 1200] },
  { que: "Mantenimiento y cambios de la web", nota: "Cada cambio, presupuesto y espera", valores: [100, 150, 300] },
  { que: "Licencias de CRM para tu equipo", nota: "De 20 a 90 € por persona y mes (HubSpot, Pipedrive, Zoho)", valores: [60, 150, 900] },
];
export const UNA_VEZ: Fila[] = [
  { que: "Una web a medida, con calculadoras y asistente de IA", nota: "Una corporativa sencilla cuesta de 1.200 a 6.000 €; con herramientas a medida, mucho más", valores: [6000, 12000, 25000] },
  { que: "Un CRM a medida", nota: "Mercado: de 5.000 a 35.000 €, más mantenimiento", valores: [5000, 15000, 35000] },
];

