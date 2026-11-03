// Los ocho compromisos de control del cliente («Tú tienes el control de todo, siempre», 3-nov-2026). Una sola fuente para la portada y la página «Tu control».
export const COMPROMISOS: { icono: string; titulo: string; corto: string; puntos: string[] }[] = [
  {
    icono: "llave",
    titulo: "Todas tus cuentas, a tu nombre y con tu tarjeta",
    corto: "Dominio, correo, Google Ads, Meta, Analytics, ficha de Google, Bing y redes. Las pagas tú.",
    puntos: [
      "Dominio, correo, Google Ads, Meta, Analytics, Search Console, ficha de Google, Bing y redes.",
      "A tu nombre, con tu correo como propietario.",
      "Las pagas tú, con tu tarjeta. Ningún pago pasa por nosotros.",
    ],
  },
  {
    icono: "escudo",
    titulo: "Nosotros solo somos invitados",
    corto: "Entramos porque tú nos invitas. Nos quitas con un clic.",
    puntos: [
      "Entramos como administradores porque tú nos invitas.",
      "Nos quitas el acceso con un clic, a nosotros o a quien sea.",
    ],
  },
  {
    icono: "euro",
    titulo: "Tu dinero en anuncios va entero a los anuncios",
    corto: "En tu cuenta, con tu tarjeta. Sin comisión sobre la inversión.",
    puntos: [
      "Lo pagas tú, con tu tarjeta, en tu propia cuenta.",
      "Cero comisión sobre esa inversión: solo la cuota fija.",
    ],
  },
  {
    icono: "pagina",
    titulo: "Tu web es tuya, con copia completa",
    corto: "Te damos una copia completa y te la renovamos con cada cambio.",
    puntos: [
      "Copia completa desde el primer mes: textos, fotos, formularios y código.",
      "Te la renovamos cada vez que cambiamos algo.",
      "La alojamos nosotros doce meses. Después, en una cuenta tuya.",
    ],
  },
  {
    icono: "crm",
    titulo: "Tus contactos y tu CRM son tuyos",
    corto: "Te los descargas en Excel cuando quieras.",
    puntos: [
      "En un Excel, con todo lo que sabemos de cada uno, cuando quieras.",
      "Lo que vive en tus cuentas de Google o de Meta ya es tuyo.",
    ],
  },
  {
    icono: "candado",
    titulo: "Ni tu facturación ni tus contraseñas",
    corto: "No te las pedimos. Para trabajar nos basta con que nos invites.",
    puntos: [
      "No te pedimos tus contraseñas: nos invitas y entramos con nuestro usuario.",
      "Tampoco tu facturación. Como mucho, dos números si quieres.",
    ],
  },
  {
    icono: "lista",
    titulo: "Un inventario de todo lo tuyo",
    corto: "Qué tienes, dónde está y quién tiene acceso. Siempre al día.",
    puntos: [
      "Cada cuenta: qué es, dónde está, quién es el propietario y quién entra.",
      "Lo tienes tú y lo actualizamos con cada cambio.",
    ],
  },
  {
    icono: "mano",
    titulo: "Te vas cuando quieras, con todo lo tuyo",
    corto: "Sin pedirnos permiso. Preferimos que te quedes porque quieres.",
    puntos: [
      "Con cualquier otro proveedor, sin pedirnos permiso ni dar explicaciones.",
      "Te llevas cuentas, contactos y la copia de tu web.",
      "La web te la regalamos a cambio de doce meses: si te vas antes, pagas solo la parte que falte.",
      "A los tres meses, sin pagar nada si no hemos mejorado los indicadores que fijamos contigo al empezar.",
    ],
  },
];

// Ejemplo hipotético de ficha de cuentas. Cada fila: [cuenta, cómo debe quedar, quién tiene acceso, icono del chip].
export const FICHA: [string, string, string, string][] = [
  ["Dominio (la dirección de tu web)", "A tu nombre, con tu correo y tu tarjeta", "Tú, propietario. Casiopea, invitada.", "globo"],
  ["Web", "Copia completa en tus manos, renovada con cada cambio", "Casiopea la aloja doce meses. Después, en una cuenta tuya.", "pagina"],
  ["Correo de tu empresa", "A tu nombre, pagado con tu tarjeta", "Tú, propietario. Casiopea, solo si la invitas.", "chat"],
  ["Google Ads y Bing", "Cuentas tuyas, pagadas con tu tarjeta", "Tú, administrador. Casiopea, usuaria invitada.", "diana"],
  ["Google Analytics", "Cuenta tuya", "Tú, propietario. Casiopea, invitada.", "grafica"],
  ["Search Console y Tag Manager", "Cuentas tuyas", "Tú, propietario. Casiopea, invitada.", "lupa"],
  ["Ficha de Google (tu negocio en el mapa)", "Con tu correo como propietario", "Tú, propietario. Casiopea, administradora invitada.", "mapa"],
  ["Meta: Facebook, Instagram y sus anuncios", "Tu cuenta de empresa, con tu correo y tu tarjeta", "Tú, propietario. Casiopea, socia invitada.", "video"],
  ["LinkedIn y TikTok", "Tus páginas de empresa, con tu correo", "Tú, propietario. Casiopea, administradora invitada.", "video"],
  ["Contactos y CRM", "Tuyos. En Excel cuando quieras", "Tú. Casiopea los usa para trabajar contigo.", "crm"],
  ["Tu facturación y tu ticket medio", "Tuyos. Ni los vemos ni te los pedimos", "Tú. Se quedan en tu navegador. Nosotros vemos, como mucho, un índice.", "euro"],
  ["Herramientas de Casiopea (informes y panel de control)", "Son nuestras. Tus datos, no: son tuyos", "Casiopea. Tú ves tu panel.", "herramienta"],
];

// «¿Tienes tú el control? Revisa estas 10 cosas». Misma lista en la página y en el artículo del blog.
export const CHEQUEO: [string, string, string][] = [
  ["globo", "¿A nombre de quién está tu dominio?", "Y quién paga la renovación. Si caduca o es de otro, tu web puede desaparecer."],
  ["chat", "¿De quién es tu correo de empresa?", "Si lo controla otro, también controla tus mensajes."],
  ["diana", "¿Eres propietario de tu cuenta de Google Ads?", "Ahí está el historial de lo que funciona. Si solo eres invitado, no es tuya."],
  ["euro", "¿Con qué tarjeta se pagan tus anuncios?", "Con la tuya, en tu cuenta. Así sabes lo que va a los anuncios y lo que no."],
  ["grafica", "¿Eres propietario de Analytics y Search Console?", "Son la memoria de tu web: quién entra, de dónde viene y qué busca."],
  ["pagina", "¿Dónde está tu web y tienes una copia?", "Textos, fotos, formularios y código. Sin copia, no puedes llevártela."],
  ["mapa", "¿Quién es propietario de tu ficha de Google?", "Tus reseñas viven ahí. Debe estar con tu correo."],
  ["video", "¿Tus redes están a tu nombre?", "Facebook, Instagram, LinkedIn, TikTok y la cuenta desde la que se pagan sus anuncios."],
  ["crm", "¿Puedes descargar hoy tus contactos?", "Quién te pidió información y qué compró es tuyo, no de quien lo guarda."],
  ["lista", "¿Tienes una lista de todo y de quién entra?", "Si no la tienes, ese es el primer paso."],
];
