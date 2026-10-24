// Lo que costaría contratar cada cosa por separado según el tamaño de la empresa.
// Lo básico: precios orientativos del mercado español (Cronoshare, Duotach, Clientify).
// Lo demás (extra: true): estimación nuestra con precios habituales de herramientas y proveedores en 2026.
export type Fila = {
  id: string;
  que: string;
  nota?: string;
  valores: [number, number, number];
  mensual: boolean;
  quien: string; // a quién tendrías que contratar por separado
  extra?: boolean; // estimación nuestra
  base?: boolean; // marcado de entrada
};

export const TAMANOS = ["Pyme", "Más de 1 millón de facturación", "Gran empresa"] as const;

export const FILAS: Fila[] = [
  // Lo básico, cada mes
  { id: "seo", que: "SEO (posicionamiento en Google)", nota: "Mercado: de 100 a 1.800 € al mes", valores: [500, 900, 1800], mensual: true, quien: "Agencia SEO", base: true },
  { id: "gads", que: "Gestión de Google Ads", nota: "Solo la gestión. O un 10-20 % de lo que inviertes", valores: [400, 700, 1500], mensual: true, quien: "Agencia de anuncios", base: true },
  { id: "meta", que: "Anuncios en Instagram y Facebook", nota: "Normalmente otra persona u otra agencia", valores: [350, 500, 1500], mensual: true, quien: "Especialista en Meta", base: true },
  { id: "redes", que: "Redes sociales y contenido", nota: "Mercado: de 300 a 1.200 € al mes", valores: [500, 800, 1200], mensual: true, quien: "Community manager", base: true },
  { id: "mant", que: "Mantenimiento y cambios de la web", nota: "Cada cambio, presupuesto y espera", valores: [100, 150, 300], mensual: true, quien: "Programador web", base: true },
  { id: "crmlic", que: "Licencias de CRM para tu equipo", nota: "De 20 a 90 € por persona y mes", valores: [60, 150, 900], mensual: true, quien: "Programa de CRM", base: true },
  // Lo básico, una sola vez
  { id: "web", que: "Una web a medida, con calculadoras y asistente", nota: "Una sencilla, de 1.200 a 6.000 €; con herramientas, mucho más", valores: [6000, 12000, 25000], mensual: false, quien: "Agencia web", base: true },
  { id: "crm", que: "Un CRM a medida", nota: "Mercado: de 5.000 a 35.000 €", valores: [5000, 15000, 35000], mensual: false, quien: "Consultora de CRM", base: true },
  // Lo que también entra en la cuota, cada mes
  { id: "landings", que: "Landings para cada campaña", nota: "Una o dos páginas nuevas al mes", valores: [300, 600, 1200], mensual: true, quien: "Agencia web", extra: true },
  { id: "videos", que: "Vídeos cortos para redes y anuncios", nota: "Montaje con tu material o con IA", valores: [300, 700, 1500], mensual: true, quien: "Editor de vídeo", extra: true },
  { id: "resenas", que: "Gestión de reseñas", nota: "Pedirlas tras cada venta y contestar todas", valores: [100, 250, 600], mensual: true, quien: "Herramientas sueltas", extra: true },
  { id: "chat", que: "Asistente con IA en web y WhatsApp", nota: "Responde a cualquier hora", valores: [80, 250, 800], mensual: true, quien: "Proveedor de chatbot", extra: true },
  { id: "competencia", que: "Vigilancia de tu competencia", nota: "Licencias de análisis y un informe al mes", valores: [150, 300, 600], mensual: true, quien: "Consultor de mercado", extra: true },
  { id: "reservas", que: "Reservas y citas con recordatorio por WhatsApp", nota: "Programa de citas", valores: [30, 60, 150], mensual: true, quien: "Herramientas sueltas", extra: true },
  { id: "llamadas", que: "Medición de llamadas", nota: "Números por canal, conectados al CRM", valores: [50, 150, 400], mensual: true, quien: "Proveedor de telefonía", extra: true },
  { id: "firma", que: "Presupuestos con firma electrónica", nota: "Licencias de firma", valores: [30, 80, 250], mensual: true, quien: "Herramientas sueltas", extra: true },
  { id: "encuestas", que: "Encuestas de satisfacción", nota: "Automáticas tras cada trabajo", valores: [30, 80, 200], mensual: true, quien: "Herramientas sueltas", extra: true },
  { id: "recomienda", que: "Programa de recomendación", nota: "Trae a un amigo, con seguimiento", valores: [50, 150, 400], mensual: true, quien: "Herramientas sueltas", extra: true },
  { id: "legal", que: "Web accesible y textos legales al día", nota: "Accesibilidad, cookies y privacidad", valores: [30, 60, 150], mensual: true, quien: "Consultoría legal web", extra: true },
  // Lo que también entra en la cuota, una sola vez
  { id: "tienda", que: "Tienda online y Google Shopping", nota: "Pagos, envíos y catálogo en Google", valores: [3000, 8000, 20000], mensual: false, quien: "Agencia web", extra: true },
  { id: "area", que: "Área privada para tus clientes", nota: "Pedidos, documentos y estado de su trabajo", valores: [4000, 10000, 25000], mensual: false, quien: "Empresa de software", extra: true },
  { id: "internas", que: "Herramientas internas o intranet", nota: "Partes de trabajo, inventario, fichajes", valores: [3000, 8000, 20000], mensual: false, quien: "Empresa de software", extra: true },
  { id: "idiomas", que: "Web en varios idiomas", nota: "Traducción y posicionamiento en cada idioma", valores: [1500, 3000, 8000], mensual: false, quien: "Agencia web", extra: true },
  { id: "marca", que: "Diseño de tu marca", nota: "Logo, manual, tarjetas y papelería", valores: [1000, 3000, 8000], mensual: false, quien: "Estudio de diseño", extra: true },
];

// Compatibilidad con el resto de la web (asistente y textos).
export const MES = FILAS.filter((f) => f.mensual && f.base);
export const UNA_VEZ = FILAS.filter((f) => !f.mensual && f.base);
