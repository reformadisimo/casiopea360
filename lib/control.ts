// Los siete compromisos de control del cliente. Una sola fuente para la portada y la página «Tu control».
export const COMPROMISOS: { icono: string; titulo: string; corto: string; largo: string }[] = [
  {
    icono: "llave",
    titulo: "Todas tus cuentas, a tu nombre",
    corto: "Dominio, Google Ads, Analytics, Search Console, Tag Manager, ficha de Google y redes, con tu correo como propietario. Nosotros entramos como invitados.",
    largo: "El dominio (la dirección de tu web), Google Ads, Analytics, Search Console, Tag Manager, tu ficha de Google y tus redes se abren con tu correo, y tú eres el propietario de cada una. Nosotros entramos como usuarios a los que tú invitas. Si algún día falta algo a tu nombre, lo arreglamos.",
  },
  {
    icono: "escudo",
    titulo: "Tú decides quién entra",
    corto: "Puedes quitar el acceso a cualquiera, nosotros incluidos, en un minuto. Nadie te lo puede impedir.",
    largo: "Tú invitas y tú quitas. Puedes retirar el acceso a cualquier persona, también a nosotros, en un minuto y sin avisar. Nadie te lo puede impedir. Lo que sí tienes que saber: mientras dura la permanencia (ver el compromiso 6), quitarnos el acceso no te libra de las cuotas.",
  },
  {
    icono: "euro",
    titulo: "Tu dinero en anuncios va entero a los anuncios",
    corto: "Lo pagas con tu tarjeta, en tu cuenta. Sin comisión sobre la inversión.",
    largo: "El dinero que inviertes en publicidad lo pagas tú, con tu tarjeta, en tu propia cuenta, y va entero a los anuncios. No cobramos ninguna comisión sobre esa inversión. Lo que nos pagas es nuestra cuota fija, nada más.",
  },
  {
    icono: "pagina",
    titulo: "La web es tuya",
    corto: "Queda en una cuenta a tu nombre, o te entregamos una copia completa: textos, fotos, formularios y código.",
    largo: "Tu web queda en una cuenta a tu nombre, o te entregamos una copia completa con los textos, las fotos, los formularios y el código, funcionando en tu propia cuenta. Si te vas, te ayudamos con el traspaso para que no se caiga nada por el camino.",
  },
  {
    icono: "crm",
    titulo: "Tus contactos y tus clientes son tuyos",
    corto: "Te los damos en una hoja de Excel cuando los pidas.",
    largo: "La gente que te contacta y tus clientes son tuyos. Cuando los pidas, te los damos en una hoja de Excel, con todo lo que sabemos de cada uno. Lo que ya vive en tus cuentas de Google o de Meta, ya es tuyo.",
  },
  {
    icono: "calendario",
    titulo: "Nada te ata",
    corto: "Seis meses de permanencia, y a los tres puedes irte si no mejoramos. Todo lo construido es tuyo.",
    largo: "Lo decimos claro: hay seis meses de permanencia, porque la web te la regalamos. Si a los tres meses no has visto que mejoramos, te puedes ir. Y aunque te vayas, todo lo construido es tuyo. Después de los seis meses no hay ninguna: sigues porque te compensa, no porque no puedas irte.",
  },
  {
    icono: "lista",
    titulo: "Todo apuntado en una ficha",
    corto: "Qué es cada cuenta, quién es el propietario y quién tiene acceso. Siempre al día.",
    largo: "Te damos una ficha con todas tus cuentas: qué es cada una, quién es el propietario y quién tiene acceso. La tienes tú y la mantenemos al día cada vez que algo cambia, para que nunca tengas que preguntarte de quién es qué.",
  },
];

// Ejemplo hipotético de ficha de cuentas.
export const FICHA: [string, string, string][] = [
  ["Dominio (la dirección de tu web)", "A tu nombre, con tu correo como propietario", "Tú, propietario. Casiopea, como invitada."],
  ["Web", "En una cuenta a tu nombre, o con una copia completa en tu poder", "Tú, propietario. Casiopea, como invitada."],
  ["Google Ads", "Cuenta tuya, pagada con tu tarjeta", "Tú, administrador. Casiopea, como usuaria invitada."],
  ["Google Analytics", "Cuenta tuya", "Tú, propietario. Casiopea, como invitada."],
  ["Search Console y Tag Manager", "Cuentas tuyas", "Tú, propietario. Casiopea, como invitada."],
  ["Ficha de Google (tu negocio en el mapa)", "Con tu correo como propietario", "Tú, propietario. Casiopea, como administradora invitada."],
  ["Facebook e Instagram", "Tu cuenta de empresa, con tu correo como propietario", "Tú, propietario. Casiopea, como socia invitada."],
  ["Contactos y clientes", "Tuyos. En Excel cuando los pidas", "Tú. Casiopea los usa para trabajar contigo."],
  ["Herramientas de Casiopea (informes y panel de control)", "Son nuestras. Tus datos, no: son tuyos", "Casiopea. Tú ves tu panel."],
];
