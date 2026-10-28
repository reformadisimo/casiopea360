/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { Panel } from "./comun";

/* Guías del CRM por perfil (cl·v818). Cada persona ve la suya; dirección ve las cuatro. */

type Seccion = { id: string; titulo: string; puntos: string[] };
type Guia = { titulo: string; intro: string; secciones: Seccion[] };
export type Perfil = "direccion" | "técnico" | "instalación" | "recepcion";

export function perfilDe(rol: string, puesto?: string | null): Perfil {
  if (rol === "admin") return "direccion";
  const p = (puesto ?? "").toLowerCase();
  if (p.includes("jefe de instalaciones")) return "instalación";
  if (p.includes("arquitect") || p.includes("interior")) return "técnico";
  return "recepcion";
}

const COMUN: Seccion = {
  id: "basico",
  titulo: "Lo básico, para todos",
  puntos: [
    "Entras con tu correo y tu contraseña. Si la olvidas, en la entrada pulsa \"Primera vez\" y te llega un enlace nuevo.",
    "Al entrar, arriba del todo está \"Tu día\": lo que te toca a ti según tu puesto. Toca cualquier nombre para abrir su ficha.",
    "Debajo está la lista de clientes. Toca uno para abrir su ficha.",
    "Los recuadros de colores de arriba (Nuevo, Contactado, Visita programada…) son los pasos del camino de cada cliente. Toca uno para ver solo los que están en ese paso.",
    "Todo lo demás está en el botón \"Menú\", arriba: agenda, mensajes, instalaciones, buzón de ideas… Cada opción dice en una frase qué hace.",
    "Las fichas antiguas (del CRM anterior, de hace más de 4 meses) están en el archivo para que no molesten. Salen siempre al buscar por nombre o teléfono, y con el recuadro \"Ver el archivo\" se ven todas. Si tocas una, vuelve al día a día.",
    "En la ficha, lo de arriba es lo importante: \"Lo siguiente que toca\". Cuando lo hagas, escribe cómo fue (si quieres) y pulsa \"Hecho\". El CRM pone solo el paso siguiente.",
    "Si cambias algo de la ficha, pulsa \"Guardar cambios\" abajo. El parte de instalación y los mensajes tienen su propio botón.",
    "Todo queda apuntado con quién y cuándo, abajo en \"Seguimiento\".",
    "Cada mañana a las 8 te llega un correo con lo que te toca hoy y lo que se ha pasado de fecha.",
    "¿Echas algo en falta o se te ocurre una mejora? Escríbelo en \"Buzón de ideas\", dentro del Menú. Le llega a dirección.",
  ],
};

export const GUIAS: Record<Perfil, Guia> = {
  direccion: {
    titulo: "Guía de dirección (Lucía y Sergio)",
    intro: "Veis todo: todos los clientes, todas las instalaciones, las alarmas del equipo y quién tiene acceso. Esta guía explica qué controlar cada semana y cómo dar de alta a la gente.",
    secciones: [
      COMUN,
      {
        id: "primer-dia",
        titulo: "Tu primer día, paso a paso",
        puntos: [
          "1. Entra con tu correo y contraseña; te llegará un código de 6 cifras al correo: escríbelo.",
          "2. Mira arriba \"Tu día\": cinco recuadros con lo que pide atención. Toca cualquiera para ver los clientes que hay detrás.",
          "3. Abre el Menú y entra en \"Equipo y accesos\": da de alta a Marina, a los técnicos y a los jefes de instalación, con su puesto.",
          "4. Abre un cliente cualquiera y recorre su ficha: arriba verás en qué paso está y un índice \"Ir a\" para moverte por ella.",
          "5. Si echas algo en falta, escríbelo en el Buzón de ideas.",
        ],
      },
      {
        id: "cada-dia",
        titulo: "Qué mirar cada día (5 minutos)",
        puntos: [
          "\"Alarmas del equipo\": quién tiene seguimientos pasados de fecha y con qué cliente. Si alguien acumula, ábrele el cliente y escríbele desde la ficha.",
          "\"Lo mío de hoy\": los clientes sin asignar a nadie también os salen a vosotros, para que no se quede ninguno sin dueño.",
          "\"Agenda de visitas\": qué visitas hay esta semana y si todas tienen técnico.",
        ],
      },
      {
        id: "cada-semana",
        titulo: "Qué mirar cada semana",
        puntos: [
          "Presupuestos entregados en 48 horas: en \"Alarmas\" salen los que se han pasado.",
          "Informes de visita: toda visita hecha tiene que tener las impresiones del técnico. Sin ellas no se puede marcar como hecha.",
          "\"Instalaciones en marcha\": fase, avance, fin previsto (en rojo si va con retraso), horas y si hay posventa abierta.",
          "En el panel de control, pestaña \"Ventas\": leads, visitas, presupuestos y firmas por origen, y cuánto cuesta en anuncios cada instalación firmada.",
        ],
      },
      {
        id: "calendario",
        titulo: "Correo y Google Calendar",
        puntos: [
          "No hay que conectar nada: el CRM escribe al correo de cada persona.",
          "Las visitas programadas llegan al técnico como invitación de calendario y quedan en su Google Calendar.",
          "Cada mañana a las 8 cada persona recibe su lista del día; vosotros, además, las alarmas del equipo.",
          "Cuando asignáis un cliente o escribís un mensaje desde una ficha, a la persona le llega un correo con el enlace directo.",
        ],
      },
      {
        id: "equipo",
        titulo: "Dar de alta a alguien del equipo",
        puntos: [
          "Inicio, \"Equipo y accesos\". Elige su puesto (Técnico, Jefe de instalaciones, Recepción…), nombre, correo y qué puede ver.",
          "\"Administra\": lo ve todo y da accesos. Solo para vosotros dos.",
          "\"Equipo\": ve y edita todos los clientes. Para Marina.",
          "\"Solo lo asignado\": ve solo sus clientes y sus instalaciones. Para técnicos y jefes de instalación.",
          "Nadie entra sin que Sergio lo apruebe (Sergio: el correo de aprobación te llega a ti): le llega un correo con Aprobar o Rechazar. Al aprobar, a la persona le llega su enlace para crear la contraseña.",
          "Si alguien se va, pulsa \"Desactivar\": deja de poder entrar al momento y su historia se queda.",
        ],
      },
      {
        id: "datos",
        titulo: "Datos: importar, exportar y borrar",
        puntos: [
          "Seguridad: vosotros dos, al entrar, recibís además un código de 6 cifras en el correo (vale 10 minutos). Así nadie entra aunque conozca vuestra contraseña.",
          "Copias de seguridad: cada semana se guarda una copia completa del CRM (se conservan las 6 últimas). Si algo se borra por error, se pide a Casiopea que lo recupere.",
          "Todo esto está en el Menú.",
          "\"Subir el CRM antiguo\": carga el CSV del CRM anterior. Si lo subes dos veces no duplica.",
          "\"Descargar en Excel\": todos los clientes con todos sus campos (o lo que tengas filtrado). Para estadísticas.",
          "Si una persona pide que borremos sus datos (protección de datos), abre su ficha y pulsa \"Borrar sus datos personales\". Se queda solo la estadística.",
        ],
      },
      {
        id: "control",
        titulo: "El control sano del equipo",
        puntos: [
          "En el Menú, \"El equipo y sus alarmas\": cómo va cada persona este mes frente a su mes anterior (clientes, visitas, presupuestos a tiempo, firmas, horas de instalación) y sus seguimientos vencidos.",
          "No hay rankings entre compañeros: cada uno se compara consigo mismo. Es una pantalla que podríais enseñarles tal cual.",
          "Lo vencido le avisa primero a la persona (en su \"Tu día\" y en su correo de la mañana); a vosotros os llega en el resumen de la mañana.",
          "Para felicitar o preguntar por un cliente, escribidle desde la ficha: el mensaje queda junto al cliente.",
        ],
      },
      {
        id: "ideas",
        titulo: "Ideas para más adelante (sugerencias de Casiopea)",
        puntos: [
          "Fotos en la visita y en la instalación, subidas desde el móvil. Hace falta activar el almacén de archivos en Vercel (un clic).",
          "Avisar a Google y a Meta de qué contactos acabaron firmando: los anuncios aprenden a traer clientes que firman, no solo contactos. El CRM ya guarda el código del clic.",
          "Públicos similares a nuestros clientes y excluir a quien ya es cliente, con la base histórica y la de clientes de Sergio.",
          "Pedir la reseña sola al terminar la instalación: un correo automático con el enlace a Google, cuando se marque la fecha de entrega.",
          "Encuesta corta al cliente tras la visita (\"¿qué tal el técnico?\") y al entregar la instalación: nota de 1 a 10.",
          "Sincronizar la agenda de visitas con el Google Calendar de cada técnico.",
          "Registro de proveedores y equipos por instalación, con lo que cobra cada uno, para ver el margen real de cada instalación.",
        ],
      },
    ],
  },
  técnico: {
    titulo: "Guía para técnicos",
    intro: "Aquí tienes tus visitas y tus clientes: los que te asignan para la visita técnica y los que llevas hasta la firma. Lo más importante: el informe de la visita y el presupuesto en 48 horas.",
    secciones: [
      COMUN,
      {
        id: "primer-dia",
        titulo: "Tu primer día, paso a paso",
        puntos: [
          "1. Entra con tu correo y tu contraseña.",
          "2. Arriba, en \"Tu día\", verás tus próximas visitas y los presupuestos que tienes que entregar.",
          "3. Toca una visita: se abre la ficha del cliente con todo lo que se habló con él.",
          "4. Al salir de esa visita, abre la ficha, toca \"Visita hecha\", rellena el informe y pulsa \"Guardar cambios\".",
          "5. Cuando entregues el presupuesto, toca \"Presupuesto entregado\", pon fecha e importe y guarda. A partir de ahí el CRM te va diciendo cuándo llamar o escribir.",
        ],
      },
      {
        id: "visitas",
        titulo: "Tus visitas",
        puntos: [
          "En \"Agenda de visitas\" ves las tuyas de los próximos 14 días: día, hora, dirección, metros y teléfono.",
          "Cada visita que te asignan te llega al correo como invitación de calendario: pulsa \"Sí\" y queda en tu Google Calendar, con la dirección, el teléfono y un aviso una hora antes. Si cambia la hora o el día, el evento se mueve solo.",
          "Toca una visita para abrir la ficha del cliente y ver todo lo que se habló antes (notas de Marina, de dónde viene, qué pidió).",
          "Desde la ficha puedes llamar o mandarle un WhatsApp con un toque.",
        ],
      },
      {
        id: "informe",
        titulo: "Al salir de la visita: el informe (obligatorio)",
        puntos: [
          "Abre el cliente y toca \"Visita hecha\". Se abre el informe de la primera visita.",
          "Apunta quién estaba y quién decide, planta, ascensor, año del edificio y el estado de la casa.",
          "Marca en las casillas qué quieren instalar o cambiar: aerotermia, aire acondicionado, calefacción, agua caliente…",
          "Si te lo dicen: si tienen otros presupuestos y cuándo van a decidir.",
          "Las impresiones son obligatorias: cómo los has visto, qué les preocupa, qué les ha gustado y qué haría falta para que firmen. Sin ellas no se puede guardar la visita como hecha.",
          "Pon la probabilidad de que firmen (10, 25, 50, 75 o 90 %). Ayuda a saber dónde poner el esfuerzo.",
          "Pulsa \"Guardar cambios\".",
        ],
      },
      {
        id: "presupuesto",
        titulo: "El presupuesto, en 48 horas",
        puntos: [
          "En cuanto guardas la visita como hecha, el CRM te pone: \"Entregar el presupuesto (plazo: 48 horas)\".",
          "Cuando lo entregues, toca \"Presupuesto entregado\" y pon la fecha y el importe. Guarda.",
          "Si se pasan las 48 horas, sale en rojo y le llega la alarma a dirección.",
        ],
      },
      {
        id: "seguimiento",
        titulo: "Después del presupuesto: el seguimiento",
        puntos: [
          "El CRM te va marcando qué toca: llamar a los 3 días, correo a los 7, otra llamada a los 14 y último contacto a los 30.",
          "Si el cliente te dice cuándo va a decidir (\"lo hablamos y te digo el día 15\"), apúntalo en \"Día en que dice que decidirá\": el CRM te pondrá la llamada ese día.",
          "Si quiere instalarlo pero más adelante, márcalo \"Aplazado\" y pon cuándo volver a llamar. \"No firmó\" es solo para quien ya no quiere.",
          "¿No sabes qué escribirle? En la ficha, pulsa \"Escríbeme el mensaje\": te prepara el WhatsApp o el correo con lo que hay apuntado (lo que les preocupa, lo que les gustó). Léelo, cámbialo si quieres y pulsa \"Enviar por WhatsApp\": se abre tu WhatsApp con el texto puesto y queda apuntado en la ficha.",
          "Cada vez que lo hagas, escribe cómo fue (\"quiere verlo con su pareja\", \"le parece caro el baño\") y pulsa \"Hecho\".",
          "Si firma: toca \"Firmado\" y pon fecha e importe. Si no firma: \"No firmó\" y el motivo.",
          "¿Tienes una duda o necesitas algo de dirección? Escríbeles desde la ficha, en \"Escribir a alguien del equipo\".",
        ],
      },
      {
        id: "dudas",
        titulo: "Dudas que suelen salir",
        puntos: [
          "¿Y si me equivoco de paso? No pasa nada: toca el paso correcto y guarda otra vez. Todo queda en el historial.",
          "¿Y si el cliente no contesta? Pulsa \"Hecho\" y escribe \"no contesta\": el CRM te pone el siguiente intento. También puedes mandarle un WhatsApp con \"Escríbeme el mensaje\".",
          "¿Quién ve lo que escribo? Lo que apuntas en una ficha lo ven quienes llevan ese cliente y dirección. Nadie de fuera.",
          "¿Se me olvida guardar? Si dejas cambios sin guardar, la ficha te avisa en rojo y te pregunta antes de cerrarla.",
          "No encuentro a un cliente: búscalo por su teléfono, que es lo más fiable. También salen los antiguos.",
        ],
      },
    ],
  },
  instalación: {
    titulo: "Guía para jefes de instalación",
    intro: "Aquí ves tus instalaciones y apuntas cada día lo que pasa en ellas: horas, gente, equipos, lo hecho y las incidencias. Así dirección sabe cómo va cada instalación sin tener que llamarte.",
    secciones: [
      COMUN,
      {
        id: "primer-dia",
        titulo: "Tu primer día, paso a paso",
        puntos: [
          "1. Entra con tu correo y tu contraseña (mejor desde el móvil: guarda la página en la pantalla de inicio).",
          "2. Arriba, en \"Tu día\", están tus instalaciones. Las que salen en rojo no tienen el parte de hoy.",
          "3. Toca una instalación: se abre directamente en el parte del día.",
          "4. Pon tus horas, cuánta gente había, los equipos y en dos líneas qué se ha hecho. Pulsa \"Guardar el parte\".",
          "5. Si la instalación cambia de fase, sube la barra de avance o pon la fase nueva y pulsa \"Guardar cambios\".",
        ],
      },
      {
        id: "instalaciones",
        titulo: "Tus instalaciones",
        puntos: [
          "En \"Instalaciones en marcha\" están tus instalaciones con su fase, avance y fin previsto. En rojo, las que van con retraso.",
          "Toca una para abrir su ficha. En el apartado \"La instalación\" pones la fase en la que está y mueves la barra de avance. Pulsa \"Guardar cambios\".",
          "Si cambia la fecha de fin prevista, cámbiala ahí también.",
        ],
      },
      {
        id: "parte",
        titulo: "El parte del día",
        puntos: [
          "En la ficha de la instalación, \"Parte del día\": la fecha sale sola.",
          "Apunta tus horas en esa instalación, cuántas personas había y qué equipos (frigorista, electricista…).",
          "Escribe en dos líneas qué se ha hecho y, si las hay, las incidencias.",
          "Pulsa \"Guardar el parte\". Se suman tus horas por instalación y por mes.",
          "Mejor cada día al salir de la instalación, desde el móvil: son dos minutos.",
        ],
      },
      {
        id: "ajustes",
        titulo: "Ajustes y posventa",
        puntos: [
          "Ajuste: si algo cambia el importe de la instalación (el cliente pide un equipo más potente, hay que mover la unidad exterior…), apúntalo como \"Ajuste de la instalación\" con el importe y el motivo. Queda documentado.",
          "Posventa: si tras la entrega el cliente avisa de algo, apúntalo como \"Posventa\". Cuando esté arreglado, pulsa \"Marcar resuelta\".",
          "Para escribir al cliente (cómo va su instalación, avisar de una visita de un equipo…), pulsa \"Escríbeme el mensaje\" en su ficha: te lo prepara con los partes de instalación, lo revisas y lo envías por WhatsApp.",
          "Para cualquier cosa con dirección o con el técnico, escríbeles desde la ficha.",
        ],
      },
      {
        id: "dudas",
        titulo: "Dudas que suelen salir",
        puntos: [
          "¿Y si me equivoco de paso? No pasa nada: toca el paso correcto y guarda otra vez. Todo queda en el historial.",
          "¿Y si el cliente no contesta? Pulsa \"Hecho\" y escribe \"no contesta\": el CRM te pone el siguiente intento. También puedes mandarle un WhatsApp con \"Escríbeme el mensaje\".",
          "¿Quién ve lo que escribo? Lo que apuntas en una ficha lo ven quienes llevan ese cliente y dirección. Nadie de fuera.",
          "¿Se me olvida guardar? Si dejas cambios sin guardar, la ficha te avisa en rojo y te pregunta antes de cerrarla.",
          "No encuentro a un cliente: búscalo por su teléfono, que es lo más fiable. También salen los antiguos.",
        ],
      },
    ],
  },
  recepcion: {
    titulo: "Guía para recepción (Marina)",
    intro: "Eres la primera persona con la que habla cada cliente. Aquí apuntas a todo el que llama o escribe (también a los que no encajan), programas las visitas y te aseguras de que nadie se quede sin respuesta.",
    secciones: [
      COMUN,
      {
        id: "primer-dia",
        titulo: "Tu primer día, paso a paso",
        puntos: [
          "1. Entra con tu correo y tu contraseña.",
          "2. Arriba, en \"Tu día\", están los nuevos a los que llamar (con cuánto tiempo llevan esperando) y las visitas sin técnico.",
          "3. Cuando suene el teléfono o llegue un WhatsApp, pulsa \"+ Apuntar cliente nuevo\": nombre, teléfono, cómo nos conoció y las preguntas de la llamada. \"Dar de alta\".",
          "4. Cuando quede la visita, abre su ficha, toca \"Visita programada\", pon día, hora y técnico, y \"Guardar cambios\".",
          "5. Al final del día, mira que \"Lo mío de hoy\" se quede a cero.",
        ],
      },
      {
        id: "alta",
        titulo: "Alguien llama o escribe: darle de alta",
        puntos: [
          "Pulsa el botón amarillo \"+ Apuntar cliente nuevo\", arriba.",
          "Con nombre, teléfono, cómo nos ha conocido y qué ha pedido basta. Si te da más datos (correo, dirección, metros), ábrelos en \"Más datos\".",
          "De dónde viene: pregúntaselo siempre (\"¿cómo nos has conocido?\"). Es lo que nos dice qué funciona.",
          "Si te dicen quién les recomendó, apúntalo: así se lo agradecemos.",
          "Si es pequeña, fuera de zona o no es integral, apúntala igual y márcala como \"Descartado\" con el motivo. Así sabemos cuántas nos llegan.",
          "Antes de darle de alta, búscalo por su teléfono: si ya nos pidió presupuesto otra vez (aunque fuera en 2018), saldrá. Si el CRM avisa de \"puede estar repetido\", abre la ficha antigua y sigue desde ahí.",
          "Los que entran por la web aparecen solos, con su origen ya puesto.",
        ],
      },
      {
        id: "dia",
        titulo: "Tu día",
        puntos: [
          "Empieza por \"Lo mío de hoy\": los nuevos a los que llamar y los seguimientos que tocan.",
          "A un cliente nuevo se le llama lo antes posible: lo ideal, en menos de 30 minutos en horario de oficina. En \"Tu día\" verás cuánto tiempo lleva esperando cada uno (en rojo, más de media hora).",
          "Un lead nuevo se llama el mismo día. Si no contesta, el CRM te pone un segundo intento al día siguiente y un tercero a los 3 días.",
          "Cuando hables con él, toca \"Contactado\" y guarda.",
          "Si no contesta al teléfono, pulsa \"Escríbeme el mensaje\" en su ficha: te prepara un WhatsApp corto y amable para que te llame o te diga cuándo le viene bien.",
        ],
      },
      {
        id: "visita",
        titulo: "Programar la visita técnica",
        puntos: [
          "En la ficha, toca \"Visita programada\".",
          "Pon fecha, hora y el técnico que va. Pulsa \"Guardar cambios\".",
          "Al técnico le llega la visita como invitación de calendario a su correo: con un toque queda en su Google Calendar. Si cambias el día o la hora, se le actualiza sola.",
          "Revisa en \"Agenda de visitas\" que todas tengan técnico y hora.",
        ],
      },
      {
        id: "dudas",
        titulo: "Dudas que suelen salir",
        puntos: [
          "¿Y si me equivoco de paso? No pasa nada: toca el paso correcto y guarda otra vez. Todo queda en el historial.",
          "¿Y si el cliente no contesta? Pulsa \"Hecho\" y escribe \"no contesta\": el CRM te pone el siguiente intento. También puedes mandarle un WhatsApp con \"Escríbeme el mensaje\".",
          "¿Quién ve lo que escribo? Lo que apuntas en una ficha lo ven quienes llevan ese cliente y dirección. Nadie de fuera.",
          "¿Se me olvida guardar? Si dejas cambios sin guardar, la ficha te avisa en rojo y te pregunta antes de cerrarla.",
          "No encuentro a un cliente: búscalo por su teléfono, que es lo más fiable. También salen los antiguos.",
        ],
      },
    ],
  },
};

const NOMBRE: Record<Perfil, string> = { direccion: "Dirección", técnico: "Técnicos", instalación: "Jefes de instalación", recepcion: "Recepción" };

export function Guias({ perfil, cerrar }: { perfil: Perfil; cerrar: () => void }) {
  const [ver, setVer] = useState<Perfil>(perfil);
  const g = GUIAS[ver];
  return (
    <Panel titulo="Guía de uso" cerrar={cerrar} ancho="max-w-[760px]">
      {perfil === "direccion" ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(GUIAS) as Perfil[]).map((p) => (
            <button key={p} type="button" onClick={() => setVer(p)} className={`rounded-full border px-4 py-1.5 text-[14px] font-semibold ${ver === p ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>{NOMBRE[p]}</button>
          ))}
        </div>
      ) : null}
      <h3 className="font-serif text-[26px] italic leading-tight text-ink">{g.titulo}</h3>
      <p className="mt-2 text-[15.5px] leading-relaxed text-ink/75">{g.intro}</p>
      <nav className="mt-4 rounded-[18px] border border-line bg-white p-4">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] text-ink/50">Índice</p>
        <ol className="space-y-1">
          {g.secciones.map((s, i) => (
            <li key={s.id}><a href={`#guia-${s.id}`} className="text-[15px] font-semibold text-teal-deep underline-offset-4 hover:underline">{i + 1}. {s.titulo}</a></li>
          ))}
        </ol>
      </nav>
      {g.secciones.map((s, i) => (
        <section key={s.id} id={`guia-${s.id}`} className="mt-5 scroll-mt-4 rounded-[18px] border border-line bg-white p-5">
          <h4 className="text-[18px] font-bold text-ink"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow text-[14px]">{i + 1}</span>{s.titulo}</h4>
          <ul className="mt-3 space-y-2">
            {s.puntos.map((t, k) => (
              <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Panel>
  );
}

/* ── Bienvenida la primera vez que alguien entra (cl·v831) ── */
const BIENVENIDA: Record<Perfil, string[]> = {
  direccion: [
    "Arriba, \"Tu día\": lo que pide atención hoy (vencidos, presupuestos fuera de plazo, nuevos sin llamar…). Toca cualquier recuadro.",
    "Debajo, todos los clientes. Toca uno para abrir su ficha; arriba de la ficha ves en qué paso está y un índice para moverte.",
    "En \"Menú\" está todo lo demás: el equipo y sus alarmas, la agenda, las instalaciones, dar de alta a la gente, Excel.",
    "Si te pierdes, el botón \"Guía\" de arriba lo explica todo paso a paso.",
  ],
  técnico: [
    "Arriba, \"Tu día\": tus próximas visitas y los presupuestos que tienes que entregar.",
    "Al salir de una visita: abre al cliente, toca \"Visita hecha\" y rellena el informe (las impresiones son obligatorias).",
    "El CRM te dice cuándo llamar o escribir a cada cliente. Si no sabes qué decirle, pulsa \"Escríbeme el mensaje\".",
    "Cuando hagas algo, pulsa \"Hecho\". Si te pierdes, el botón \"Guía\" lo explica todo.",
  ],
  instalación: [
    "Arriba, \"Tu día\": tus instalaciones. En rojo, las que no tienen el parte de hoy.",
    "Toca una instalación y se abre en el parte del día: horas, gente, equipos y qué se ha hecho. \"Guardar el parte\".",
    "Si cambia de fase o avanza, muévelo en \"La instalación\" y pulsa \"Guardar cambios\".",
    "Para escribir al cliente o a la oficina, usa los botones de la ficha. El botón \"Guía\" lo explica todo.",
  ],
  recepcion: [
    "Arriba, \"Tu día\": los nuevos a los que llamar (y cuánto llevan esperando) y las visitas sin técnico.",
    "Cuando llame o escriba alguien: \"+ Apuntar cliente nuevo\". Con nombre, teléfono y cómo nos conoció basta.",
    "Para programar una visita: abre al cliente, toca \"Visita programada\", pon día, hora y técnico, y guarda.",
    "Busca siempre por teléfono antes de dar de alta: puede que ya lo conozcamos. El botón \"Guía\" lo explica todo.",
  ],
};
export function Bienvenida({ perfil, nombre, clave, verGuia }: { perfil: Perfil; nombre: string; clave: string; verGuia: () => void }) {
  const [ver, setVer] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem(clave)) setVer(true); } catch { /* sin almacenamiento: no se enseña */ } }, [clave]);
  const cerrar = () => { try { localStorage.setItem(clave, "1"); } catch { /* nada */ } setVer(false); };
  if (!ver) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 px-4">
      <div className="w-full max-w-[520px] rounded-[26px] bg-white p-6 shadow-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal-deep">Bienvenida al CRM</p>
        <h2 className="mt-1 font-serif text-[28px] italic leading-tight text-ink">Hola, {nombre}. Cuatro cosas y listo.</h2>
        <ol className="mt-4 space-y-3">
          {BIENVENIDA[perfil].map((t, i) => (
            <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-ink/85">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow text-[14px] font-bold text-ink">{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={cerrar} className="rounded-full bg-yellow px-6 py-3 text-[15px] font-bold text-ink">Entendido</button>
          <button type="button" onClick={() => { cerrar(); verGuia(); }} className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-teal-deep underline underline-offset-4">Ver la guía completa</button>
        </div>
      </div>
    </div>
  );
}
