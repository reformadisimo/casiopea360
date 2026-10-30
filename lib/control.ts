// Los siete compromisos de control del cliente. Una sola fuente para la portada y la página «Tu control».
export const COMPROMISOS: { icono: string; titulo: string; corto: string; puntos: string[] }[] = [
  {
    icono: "llave",
    titulo: "Todas tus cuentas, a tu nombre",
    corto: "Dominio, Google Ads, Analytics, ficha de Google y redes, con tu correo. Nosotros, invitados.",
    puntos: [
      "Dominio, Google Ads, Analytics, Search Console, Tag Manager, ficha de Google y redes.",
      "Con tu correo como propietario. Nosotros, invitados.",
      "Si alguna falta, lo arreglamos.",
    ],
  },
  {
    icono: "escudo",
    titulo: "Tú decides quién entra",
    corto: "Puedes quitar el acceso a cualquiera, nosotros incluidos, en un minuto.",
    puntos: [
      "Quitas el acceso a cualquiera, nosotros incluidos, en un minuto.",
      "Ojo: durante la permanencia, quitarnos el acceso no te libra de la cuota.",
    ],
  },
  {
    icono: "euro",
    titulo: "Tu dinero en anuncios va entero a los anuncios",
    corto: "Lo pagas con tu tarjeta, en tu cuenta. Sin comisión sobre la inversión.",
    puntos: [
      "Lo pagas tú, con tu tarjeta, en tu propia cuenta.",
      "Cero comisión sobre esa inversión: solo la cuota fija.",
    ],
  },
  {
    icono: "pagina",
    titulo: "La web acaba siendo tuya",
    corto: "A los doce meses, a tu nombre y con copia completa. Antes, pagas solo lo que falte.",
    puntos: [
      "A los doce meses, en una cuenta tuya.",
      "Con copia completa: textos, fotos, formularios y código.",
      "Antes, pagas solo lo que falte. Te ayudamos con el traspaso.",
    ],
  },
  {
    icono: "crm",
    titulo: "Tus contactos y tus clientes son tuyos",
    corto: "Te los damos en una hoja de Excel cuando los pidas.",
    puntos: [
      "Cuando los pidas, en un Excel con todo lo que sabemos de cada uno.",
      "Lo que vive en tus cuentas de Google o de Meta ya es tuyo.",
    ],
  },
  {
    icono: "calendario",
    titulo: "Nada te ata",
    corto: "Doce meses de permanencia, porque la web te la regalamos. A los tres puedes irte sin pagar nada si no mejoramos los indicadores acordados.",
    puntos: [
      "Doce meses de permanencia y ni uno más, porque la web te la regalamos.",
      "Si a los tres meses no hemos mejorado los indicadores que fijamos contigo al empezar, te vas sin pagar nada y con tu web.",
      "Importe y calendario, en la propuesta antes de firmar.",
    ],
  },
  {
    icono: "lista",
    titulo: "Todo apuntado en una ficha",
    corto: "Qué es cada cuenta, quién es el propietario y quién tiene acceso. Siempre al día.",
    puntos: [
      "Qué es cada cuenta, quién es el propietario y quién tiene acceso.",
      "La tienes tú y la actualizamos con cada cambio.",
    ],
  },
];

// Ejemplo hipotético de ficha de cuentas. Cada fila: [cuenta, cómo debe quedar, quién tiene acceso, icono del chip].
export const FICHA: [string, string, string, string][] = [
  ["Dominio (la dirección de tu web)", "A tu nombre, con tu correo", "Tú, propietario. Casiopea, invitada.", "globo"],
  ["Web", "Alojada por Casiopea doce meses; a tu nombre al cumplirlos o al pagar lo que falte", "Casiopea aloja hasta entonces. Tú, propietario después.", "pagina"],
  ["Google Ads", "Cuenta tuya, pagada con tu tarjeta", "Tú, administrador. Casiopea, usuaria invitada.", "diana"],
  ["Google Analytics", "Cuenta tuya", "Tú, propietario. Casiopea, invitada.", "grafica"],
  ["Search Console y Tag Manager", "Cuentas tuyas", "Tú, propietario. Casiopea, invitada.", "lupa"],
  ["Ficha de Google (tu negocio en el mapa)", "Con tu correo como propietario", "Tú, propietario. Casiopea, administradora invitada.", "mapa"],
  ["Facebook e Instagram", "Tu cuenta de empresa, con tu correo", "Tú, propietario. Casiopea, socia invitada.", "video"],
  ["Contactos y clientes", "Tuyos. En Excel cuando los pidas", "Tú. Casiopea los usa para trabajar contigo.", "crm"],
  ["Tu facturación y tu ticket medio", "Tuyos. Ni los vemos ni te los pedimos", "Tú. Se quedan en tu navegador. Nosotros vemos, como mucho, un índice.", "euro"],
  ["Herramientas de Casiopea (informes y panel de control)", "Son nuestras. Tus datos, no: son tuyos", "Casiopea. Tú ves tu panel.", "herramienta"],
];
