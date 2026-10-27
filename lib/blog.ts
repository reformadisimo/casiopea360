// Artículos del blog. Cada bloque es un párrafo, un subtítulo o una lista.
export type Bloque = { h2: string } | { h3: string } | { p: string } | { ul: string[] } | { ol: string[] };

export type Articulo = {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // AAAA-MM-DD
  lectura: string;
  categoria: string;
  video: string; // vídeo de cabecera y portada en el listado
  apoyo: { video: string; alt: string }; // vídeo a mitad del artículo
  respuesta: string; // respuesta corta al principio, pensada para Google y las IA
  cuerpo: Bloque[];
  // Enlaces opcionales a páginas de la web (servicio, demostración), al final del artículo.
  enlaces?: { texto: string; href: string }[];
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "como-no-ir-a-ciegas-con-tu-web-y-que-te-ensena-una-lupa",
    video: "ojo-pantallas",
    apoyo: { video: "telescopios", alt: "Telescopios apuntando al cielo para mirar con más detalle" },
    titulo: "Cómo dejar de ir a ciegas con tu web: lo que te enseña ver qué hace la gente",
    descripcion: "Tener visitas no es lo mismo que saber qué hacen en tu web. Qué herramientas te dicen cada cosa y cómo un mapa de calor propio permite mejorar tu web cada mes, sin adivinar.",
    fecha: "2026-10-27",
    lectura: "6 minutos",
    categoria: "Web",
    respuesta:
      "Para no ir a ciegas con tu web necesitas dos tipos de datos: cuánta gente llega y de dónde (Analytics, Search Console y los anuncios), y qué hace dentro: dónde toca, hasta dónde baja y dónde se va. Esto último lo enseña un mapa de calor, y permite mejorar la web cada mes cambiando una cosa y midiendo el resultado.",
    cuerpo: [
      { h2: "Tener visitas no es saber qué pasa" },
      { p: "Muchos dueños de negocio miran las visitas de su web como quien mira la puerta de su tienda: ven cuánta gente entra, pero no ven qué hace cuando está dentro. Si tienes un negocio con local, lo sabes de sobra: ves a quien mira, a quien pregunta y a quien se da la vuelta en el pasillo. En una web, todo eso ocurre a oscuras." },
      { p: "El resultado es que se decide a ciegas. Se cambia un color porque a alguien le gusta, se añade una sección porque la tiene la competencia, se rehace la web entera cada tres o cuatro años y nadie sabe de verdad si ha ido mejor o peor." },
      { h2: "Las herramientas que te dicen cuánta gente llega" },
      { p: "Primero hay que saber lo básico, y para eso hay herramientas muy buenas, casi todas gratuitas. Cada una responde a una pregunta distinta:" },
      { ul: [
        "Google Analytics: cuánta gente entra, desde dónde, a qué páginas y cuánta acaba contactando.",
        "Search Console: qué buscan en Google las personas que llegan a ti y en qué posición apareces.",
        "El seguimiento de tus anuncios (Google Ads y Meta): qué anuncio trae contactos y cuál solo trae clics.",
        "Tag Manager: la caja donde se ordenan todas esas etiquetas, para que lo que mide cada herramienta esté bien configurado y no se duplique ni se pierda.",
        "Tu CRM: qué contactos acaban siendo clientes y de dónde venían.",
      ] },
      { p: "Con eso ya sabes mucho: cuántos, de dónde y cuánto cuesta cada uno. Pero hay una pregunta que ninguna de ellas contesta del todo: qué hace la persona una vez dentro de tu página." },
      { h2: "Lo que pasa dentro de la página" },
      { p: "Ahí entra el mapa de calor. Es tu propia página con colores encima: donde más toca la gente se pinta de rojo, y donde casi nadie toca, de azul. Y a eso se le suman otras cosas útiles: hasta dónde baja la gente, cuántas personas se van sin hacer nada y qué páginas son las que hacen que alguien se marche de la web." },
      { p: "Lo que se ve suele sorprender, incluso a quien lleva años con su web. Por ejemplo:" },
      { ul: [
        "Un botón de contacto que casi nadie toca, no porque no interese, sino porque está tan abajo que casi nadie llega hasta él.",
        "Una foto grande que muchísima gente toca creyendo que es un enlace, y que no lleva a ninguna parte. Cada toque en vano es alguien que quería seguir y se ha quedado parado.",
        "Un artículo de tu blog al que llega mucha gente desde Google, que lo lee y se va sin ver nada más de tu web, porque no hay un siguiente paso claro.",
        "Una página donde mucha gente se va en menos de diez segundos, porque lo primero que ve no es lo que esperaba al pulsar el anuncio.",
      ] },
      { p: "Ninguna de estas cosas se descubre mirando una cifra de visitas. Se descubren viendo lo que hace la gente." },
      { h2: "Cómo se mejora una web con esto" },
      { p: "Cuando ves esto, mejorar deja de ser una cuestión de gustos. Se convierte en un ciclo sencillo:" },
      { ol: [
        "Miras qué hace la gente y dónde se pierde.",
        "Cambias una sola cosa: subir un botón, cambiar un titular, convertir una foto en enlace.",
        "Mides otra vez, con el mismo tipo de visitas, y comparas con la versión anterior.",
        "Si ha ido mejor, te quedas con el cambio. Si no, lo deshaces. Y vuelta a empezar.",
      ] },
      { p: "Es lo que se llama mejora continua. No necesita grandes rediseños, solo pequeños cambios cada mes que, sumados, hacen una web que cada vez funciona mejor. Y lo mejor es que cada cambio se apoya en algo que has visto, no en una suposición." },
      { h2: "Cuántos datos hacen falta, con honestidad" },
      { p: "Hay un riesgo en mirar datos: sacar conclusiones de muy pocas visitas. Si solo han entrado 30 personas, lo que veas puede ser pura casualidad. Por eso, en nuestra Lupa 360, cada conclusión indica lo fiable que es:" },
      { ul: [
        "Pistas: con menos de 100 visitas. Son indicios, no certezas.",
        "Tendencias: entre 100 y 1.000 visitas. Hay una dirección clara, pero conviene confirmarla.",
        "Datos firmes: a partir de unas 1.000 visitas. Ya se puede decidir con tranquilidad.",
      ] },
      { p: "No te prometemos que esto multiplique tus ventas. Lo que sí hace es que dejes de decidir a ciegas, y eso, sumado mes tras mes, suele notarse." },
      { h2: "Y la privacidad, qué" },
      { p: "Ver lo que hace la gente no significa espiarla. La Lupa 360 funciona solo con quienes aceptan las cookies de analítica, nunca guarda lo que la persona escribe (solo qué toca), no recoge datos personales y borra todo a los 90 días. Los datos son tuyos y están a tu nombre, como el resto de tus cuentas." },
      { h2: "Qué puedes hacer ahora" },
      { p: "Si tienes web, empieza por lo más sencillo: comprueba que tienes Analytics y Search Console y que están a tu nombre. Después, pregúntate qué es lo que más te gustaría saber de lo que hacen tus visitas dentro de tu página, y apúntalo. Esa lista es el punto de partida de cualquier mejora." },
      { p: "Si quieres ver cómo se ve una Lupa 360, hemos preparado una demostración con datos inventados, sobre nuestra propia web, para que la toques tú mismo. Y si quieres que miremos tu web juntos, el estudio gratuito empieza justo por ahí." },
    ],
    enlaces: [
      { texto: "Cómo funciona la Lupa 360", href: "/servicios/lupa-360" },
      { texto: "Probar la Lupa 360 de ejemplo", href: "/lupa-ejemplo" },
    ],
  },
  {
    slug: "si-tu-web-no-esta-a-tu-nombre-no-es-tuya",
    video: "lapiz-medicion",
    apoyo: { video: "equipo-portatil", alt: "Dos profesionales revisan juntos las cuentas de un negocio en un portátil" },
    titulo: "¿Está tu web realmente bajo tu control?",
    descripcion: "Muchos negocios no saben a nombre de quién están su web, su dominio o su cuenta de Google Ads. Por qué importa, qué riesgos tiene y cinco preguntas para comprobarlo hoy mismo.",
    fecha: "2026-10-26",
    lectura: "6 minutos",
    categoria: "Estrategia",
    respuesta:
      "Si tu dominio, tu web, tu cuenta de Google Ads o tu ficha de Google están a nombre de otra persona, esas cosas no son tuyas, aunque las hayas pagado: quien figura como propietario es quien manda. Puedes comprobarlo en cinco minutos preguntando a quien lleva tu marketing a nombre de quién está cada cuenta, si eres administrador, quién cobra comisión sobre la publicidad y si puedes llevarte tu web con todo lo que lleva dentro.",
    cuerpo: [
      { h2: "Una situación que se repite" },
      { p: "Imagina a Antonio. Tiene una empresa pequeña desde hace años y lleva tiempo pensando en cambiar de quien le gestiona la web y los anuncios. No está contento: las cosas no mejoran, las explicaciones son cada vez más largas y cuesta más conseguir una respuesta. Pero no se atreve a decirlo. Cada vez que lo piensa, le viene la misma duda: «Y si me voy, ¿qué pasa con mi web? ¿Y con mi dominio? ¿Y con los anuncios que llevo años pagando?»." },
      { p: "Antonio es un ejemplo inventado, pero seguro que te suena. Es una de las situaciones más habituales en cualquier negocio que ha confiado su presencia en internet a otra persona." },
      { h2: "Por qué pasa" },
      { p: "Casi nunca es mala intención. Pasa porque, al empezar, alguien tiene que abrir las cuentas, y lo más rápido es abrirlas con el propio correo: «Ya te lo doy hecho, tú no te preocupes de nada». Y el dueño del negocio, que tiene mil cosas en la cabeza, dice que sí. Con el tiempo, nadie vuelve a mirar de quién es cada cosa." },
      { p: "Hay otro motivo: estas cosas son poco visibles. Un dominio, una cuenta de anuncios o una ficha de Google no se ven como un local o una furgoneta. Si no sabes que existen, no sabes que tienes que preguntar por ellas." },
      { h2: "Qué cuentas hay que mirar" },
      { ul: [
        "El dominio: la dirección de tu web. Es lo que te identifica en internet.",
        "La web: dónde está guardada, con sus textos, sus fotos y sus formularios.",
        "Tu cuenta de Google Ads: donde se pagan los anuncios y se guarda el historial de lo que funciona.",
        "Google Analytics y Search Console: donde se mide cuánta gente entra y de dónde viene.",
        "Tu ficha de Google: la de tu negocio en el mapa, con tus reseñas.",
        "Tus redes sociales y la cuenta de empresa que las gestiona.",
        "Tus contactos y tus clientes: quién te ha pedido información y qué ha comprado.",
      ] },
      { h2: "Qué riesgos tiene no tener el control" },
      { p: "No hace falta imaginar nada dramático. Los problemas son prácticos y se repiten:" },
      { ul: [
        "No puedes cambiar de proveedor con tranquilidad, porque no sabes si te vas a llevar tus cosas.",
        "Si el propietario cierra la cuenta, o se olvida de renovar el dominio, puedes perder tu web de un día para otro.",
        "El historial de tus anuncios, que es lo que más cuesta de conseguir, se queda con quien figura como propietario.",
        "Pagas más de lo que crees: una parte de tu dinero en publicidad puede quedarse por el camino en forma de comisión.",
        "Si a quien lleva tus cuentas le pasa algo, no sabes dónde está nada, y nadie más puede entrar.",
      ] },
      { p: "Y hay un riesgo menos visible: cuando el cliente no puede irse, el proveedor tiene menos motivos para esforzarse. Una relación sana es aquella en la que uno se queda porque está contento, no porque no tenga salida." },
      { h2: "Cinco preguntas que puedes hacer hoy mismo" },
      { p: "No hace falta ser técnico. Basta con preguntar. Sirven con cualquier persona que lleve tu marketing, y también con nosotros:" },
      { ol: [
        "¿A nombre de quién está mi dominio? Debería estar a tu nombre, con tu correo como propietario.",
        "¿Soy administrador de mi cuenta de Google Ads? Si solo eres un usuario más, otra persona puede cerrarla o quedarse con el historial.",
        "¿Quién cobra la comisión sobre mi publicidad? Tu dinero para anuncios debería ir entero a los anuncios, y pagarse con tu tarjeta en tu cuenta.",
        "¿Puedo llevarme mi web con todo lo que lleva dentro? Los textos, las fotos, los formularios y el código tienen que poder salir contigo.",
        "¿Tengo mis contactos y mis clientes? Debes poder pedirlos y recibirlos, por ejemplo en una hoja de Excel.",
      ] },
      { p: "Si las respuestas son claras y rápidas, estás bien. Si te cuesta obtenerlas, o te dicen que «eso es complicado», conviene mirar con calma qué hay detrás. Sin enfadarse con nadie: lo importante es saberlo." },
      { h2: "Cómo queremos que sea con nosotros" },
      { p: "En Casiopea no queremos tener el control. Queremos que lo tengas tú. El cliente es el jefe. No queremos atar a nadie: queremos que te quedes porque te servimos." },
      { p: "Por eso trabajamos así:" },
      { ul: [
        "Todas tus cuentas están a tu nombre, con tu correo como propietario. Nosotros entramos como usuarios que tú invitas.",
        "Tú decides quién entra y puedes quitar el acceso a cualquiera, nosotros incluidos, en un minuto y sin avisar.",
        "Tu dinero en anuncios lo pagas con tu tarjeta, en tu cuenta, y va entero a los anuncios. Sin comisión sobre la inversión.",
        "Tu web acaba siendo tuya: te la regalamos a cambio de doce meses y, al cumplirlos, queda en una cuenta a tu nombre con una copia completa (textos, fotos, formularios y código). Si te vas antes, pagas solo la parte que falte, y te ayudamos con el traspaso.",
        "Tus contactos y tus clientes son tuyos: te los damos en una hoja de Excel cuando los pidas.",
        "Nada te ata a escondidas: hay doce meses de permanencia, porque la web te la regalamos, y a los tres meses puedes irte sin pagar nada si no has visto que mejoramos. Pasados los doce meses no hay ninguna.",
        "Todo queda apuntado en una ficha con tus cuentas: qué es cada una, quién es el propietario y quién tiene acceso.",
      ] },
      { p: "Una precisión, para que no haya sorpresas: la web que te regalamos pasa a tu nombre al cumplir los doce meses, o antes si pagas la parte que falte, y hasta entonces la alojamos nosotros. Lo que nunca retenemos es tu dominio, tus cuentas ni tus contactos." },
      { p: "Si un día decides dejarnos o cambiar de equipo, no tienes que pedirnos permiso ni darnos explicaciones. Nos lo dices, quitas los accesos, te llevas tus cuentas y tus contactos, y sin enfados." },
      { h2: "Qué puedes hacer ahora" },
      { p: "Empieza por lo más sencillo: apunta en una hoja de papel tus cuentas (dominio, web, Google Ads, Analytics, ficha de Google y redes) y, al lado de cada una, a nombre de quién está. Si no lo sabes, pregúntalo. Cuando lo tengas claro, sabrás cuánto control tienes hoy y qué convendría cambiar." },
      { p: "Si quieres que lo miremos juntos, sin compromiso, el estudio gratuito empieza justo por ahí: te contamos cómo está hoy tu marketing, de quién es cada cosa y qué haríamos. Y si decides quedarte como estás, también nos parece bien: lo importante es que tengas el control." },
    ],
  },
  {
    slug: "lo-que-de-verdad-cuesta-el-marketing-digital-reuniones-horas-y-tiempo",
    video: "lapiz-medicion",
    apoyo: { video: "equipo-portatil", alt: "Dos profesionales organizan el trabajo juntos en un portátil" },
    titulo: "Lo que de verdad cuesta el marketing digital: reuniones, horas y tiempo que no dedicas a tu negocio",
    descripcion: "La factura es solo una parte. El coste oculto de coordinar proveedores y por qué hacerlo todo con un solo equipo ahorra tiempo, esfuerzo y dinero.",
    fecha: "2026-10-26",
    lectura: "5 minutos",
    categoria: "Estrategia",
    respuesta:
      "El marketing digital cuesta más de lo que dice la factura: cuesta las reuniones con cada proveedor, las horas de coordinarlos, los meses hasta que todo funciona a la vez y el tiempo que tú no dedicas a tu negocio. Un solo equipo que lo hace todo y lo tiene conectado reduce ese coste oculto: menos reuniones, menos esfuerzo de tu parte y plazos de días en lugar de meses.",
    cuerpo: [
      { h2: "La factura es la parte pequeña" },
      { p: "Cuando alguien calcula cuánto le cuesta su marketing digital, suma lo que paga a la agencia, a quien lleva los anuncios y a quien mantiene la web. Casi nunca suma lo demás, que muchas veces pesa más: las reuniones, las horas de explicar lo mismo a cada proveedor y la atención que se le quita a la empresa." },
      { h2: "El coste que no sale en ninguna factura" },
      { ul: [
        "Reuniones: una por proveedor, y a veces otra para que se pongan de acuerdo entre ellos.",
        "Coordinación: acabas siendo tú quien pasa los mensajes de uno a otro y quien comprueba que cada pieza encaja con las demás.",
        "Plazo: hasta que web, anuncios, medición y CRM funcionan a la vez pasan meses, y durante ese tiempo se pierden contactos.",
        "Tu tiempo: cada hora que dedicas a coordinar es una hora que no dedicas a vender, a tu equipo o a tus clientes.",
        "Lo que se pierde en el camino: cuando nadie es responsable del conjunto, nadie ve lo que se cae entre dos proveedores.",
      ] },
      { h2: "Qué cambia con un solo equipo" },
      { p: "Cuando web, Google, anuncios, redes, CRM e inteligencia artificial las lleva el mismo equipo, desaparecen casi todas esas reuniones y el trabajo de unir las piezas. Quien te cuenta lo que se va a hacer es quien lo hace, y la automatización se encarga de lo repetitivo. Para ti queda una conversación y un panel donde ves cada día qué se ha hecho." },
      { h2: "Lo comprobamos en nuestras propias empresas" },
      { p: "Llevamos años viviéndolo desde los dos lados: pagando a varios proveedores y trabajando con un solo equipo. La diferencia más grande no está en la cuota: está en las semanas de agenda que dejas de gastar y en que cada cosa funciona porque está conectada con las demás." },
      { h2: "Haz la cuenta tú" },
      { ol: [
        "Apunta cuántas reuniones de marketing tuviste el último mes y cuánto duraron.",
        "Suma las horas que dedicaste a pasar información de un proveedor a otro.",
        "Calcula cuánto vale una hora de tu tiempo o de quien lo hace en tu empresa.",
        "Compara el total con la cuota de un solo equipo que lo hace todo y te enseña los resultados cada día.",
      ] },
      { p: "Si quieres que la hagamos contigo, empieza por el estudio gratuito: te contamos cómo está hoy tu marketing y qué haríamos." },
    ],
  },
  {
    slug: "por-que-un-director-de-marketing-deja-de-ver-lo-que-no-funciona",
    video: "lapiz-medicion",
    apoyo: { video: "equipo-portatil", alt: "Dos profesionales revisan juntos los resultados en un portátil" },
    titulo: "Por qué un director de marketing deja de ver lo que no funciona (y cómo recuperar la luz)",
    descripcion: "Cuando llevas el marketing de tu empresa todos los días, dejas de ver el conjunto. Por qué pasa incluso a los mejores equipos y qué cambia con una mirada 360 desde fuera.",
    fecha: "2026-10-26",
    lectura: "5 minutos",
    categoria: "Estrategia",
    respuesta:
      "A un director de marketing le pasa lo que a cualquiera que vive dentro de su trabajo: se acostumbra. Ve cada día los mismos números, cada proveedor le enseña su trozo y nadie mira el conjunto, así que deja de ver lo que no funciona y también lo que sí ha mejorado. Una mirada 360 desde fuera conecta web, anuncios, medición y CRM, y vuelve a poner luz donde la rutina la había apagado.",
    cuerpo: [
      { h2: "No es falta de talento, es falta de distancia" },
      { p: "Es una de las cosas más repetidas en cualquier empresa: cuanto más metido estás en el día a día, menos ves. No te pasa por no saber. Te pasa porque llevas meses mirando lo mismo desde el mismo sitio, apagando urgencias y respondiendo a cada proveedor. Y llega un momento en que sientes que nada funciona, empiezas a hacer cosas, cambias esto, pruebas aquello, y sigues sin saber por dónde tirar." },
      { h2: "Por qué deja de verse" },
      { ul: [
        "La costumbre: los mismos informes, los mismos números, la misma web. Lo que se ve a diario se vuelve invisible.",
        "Cada proveedor enseña su parte: la agencia de anuncios, sus clics; el SEO, sus posiciones; la web, su velocidad. Nadie enseña cómo encaja todo.",
        "Las urgencias se comen el tiempo de pensar: hay que contestar, aprobar, corregir, y casi nunca hay un hueco para dar un paso atrás.",
        "Tampoco se ve el progreso: cuando todo cambia poco a poco, no notas el salto que has dado hasta que alguien te lo pone delante.",
      ] },
      { h2: "Señales de que te falta luz" },
      { ul: [
        "Tienes datos de sobra, pero no sabes de dónde viene cada cliente.",
        "Cada vez que algo falla, la respuesta es «eso es cosa del otro proveedor».",
        "Inviertes en anuncios, pero no sabes qué parte te trae clientes de verdad.",
        "Llevas meses probando cosas sin una dirección clara.",
        "Sientes que todo es mejorable, pero no sabes qué mejorar primero.",
      ] },
      { h2: "Qué cambia con una visión 360" },
      { p: "Una mirada 360 no es hacer más cosas: es ver todas a la vez. Se ponen en la misma mesa la web, los anuncios, el SEO, las redes, la medición y el CRM, y se responde a lo que de verdad importa: de dónde viene cada cliente, dónde se pierden los contactos y qué merece más inversión y qué menos. Muchas veces el cambio no es añadir nada, sino ordenar lo que ya hay y quitar lo que no suma." },
      { h2: "Alguien que lo mire desde fuera" },
      { p: "Nos ha pasado en nuestras propias empresas: trabajando día a día, no ves el salto que has dado ni lo que te frena, hasta que alguien con otra mirada te lo muestra. Entonces se hace la luz. Por eso, cuando entramos en una empresa, lo primero que hacemos es mirar el conjunto, y sin vender nada: en el estudio gratuito te enseñamos dónde está cada cosa y qué haríamos." },
      { h2: "Cómo empezar, con nosotros o sin nosotros" },
      { ol: [
        "Apunta de dónde viene hoy cada cliente, aunque sea a mano.",
        "Pon en una sola hoja lo que pagas a cada proveedor y qué resultado te da cada uno.",
        "Elige un único objetivo medible, como el número de peticiones al mes, y revísalo cada semana.",
        "Pide a alguien de fuera que mire el conjunto y te diga qué ve. Si quieres que seamos nosotros, empieza por el test de idoneidad.",
      ] },
    ],
  },
  {
    slug: "cuanto-cuesta-el-marketing-digital-por-separado",
    video: "lapiz-medicion",
    apoyo: { video: "papeles", alt: "Facturas y papeles acumulados en una mesa" },
    titulo: "Cuánto cuesta el marketing digital de una empresa si lo contratas por separado",
    descripcion: "SEO, anuncios, redes, web, CRM y todo lo demás, servicio a servicio y por tamaño de empresa. La suma que casi nadie hace, con precios orientativos de 2026.",
    fecha: "2026-10-24",
    lectura: "7 minutos",
    categoria: "Precios",
    respuesta:
      "Contratar por separado lo básico (SEO, gestión de Google Ads y de Meta Ads, redes, mantenimiento web y licencias de CRM) cuesta en España, de forma orientativa, unos 1.900 € al mes en una pyme, unos 3.200 € en una empresa de más de un millón de facturación y más de 7.000 € en una gran empresa, sin contar la web y el CRM a medida. Si sumas reseñas, landings, vídeos, asistente con IA o medición de llamadas, la factura se dispara y pasas a tener diez o más proveedores.",
    cuerpo: [
      { h2: "Por qué casi nadie hace esta cuenta" },
      { p: "Cada proveedor llega por separado: un año contratas el SEO, al siguiente la agencia de anuncios, luego alguien para las redes y, cuando la web se queda vieja, una agencia web. Cada factura parece razonable por sí sola. El problema aparece cuando las sumas todas, y casi nadie lo hace." },
      { h2: "Lo básico, servicio a servicio" },
      { p: "Estos son precios orientativos del mercado español en 2026, según guías como las de Cronoshare, Duotach o Clientify. En tu caso puede ser algo más o algo menos:" },
      {
        ul: [
          "SEO: de 100 a 1.800 € al mes. Uno que trabaje de verdad, con contenidos cada semana, rara vez baja de 500 €.",
          "Gestión de Google Ads: de 350 a 1.500 € al mes, o un 10-20 % de lo que inviertes. Y eso solo la gestión.",
          "Anuncios en Instagram y Facebook: normalmente otra persona u otra agencia, con un esquema de precios parecido.",
          "Redes sociales y contenido: de 300 a 1.200 € al mes, según cuántas redes y cuántas publicaciones.",
          "Mantenimiento de la web: de 30 a 300 € al mes, y cada cambio se presupuesta aparte.",
          "Licencias de CRM: de 20 a 90 € por persona y mes.",
        ],
      },
      { p: "Y de una sola vez: una web a medida con calculadoras o un asistente cuesta de 6.000 a 25.000 €, y un CRM hecho a medida, de 5.000 a 35.000 €." },
      { h2: "Lo que casi siempre se olvida" },
      { p: "A lo básico se le van sumando herramientas sueltas: un programa de citas, otro para pedir reseñas, uno de firma electrónica, encuestas, un chatbot, landings para cada campaña, vídeos para redes, medición de llamadas, la vigilancia de la competencia. Cada una es una suscripción o un proveedor más. Una empresa mediana que lo tenga todo puede superar con facilidad los 5.000 € al mes, y una grande, los 12.000 €." },
      { h2: "El coste que no sale en ninguna factura" },
      { p: "Con seis o diez proveedores, alguien tiene que coordinarlos: reuniones, llamadas, correos repetidos y el clásico «eso es cosa del otro». Ese alguien suele ser el director o el dueño de la empresa, y sus horas también cuestan dinero. Además, nadie ve el conjunto: el de los anuncios no puede tocar la web y el de la web no mira los anuncios." },
      { h2: "Haz tu propia cuenta" },
      { p: "En nuestra calculadora puedes marcar lo que necesitas y ver, según el tamaño de tu empresa, lo que te costaría por separado, cuántos proveedores tendrías y cuántas facturas al mes. Con Casiopea 360, todo eso va dentro de una sola cuota fija, la misma para cualquier tamaño de empresa." },
    ],
  },
  {
    slug: "cuanto-se-tarda-en-hacer-una-web",
    video: "mano-pantalla",
    apoyo: { video: "equipo-celebra", alt: "Un equipo celebra delante del ordenador" },
    titulo: "Cuánto se tarda en hacer una web: por qué unos días y no cinco meses",
    descripcion: "En nuestra experiencia, muchas agencias tardan tres, cuatro o cinco meses. Te contamos dónde se va ese tiempo y cómo se puede tener una web mejor en unos días.",
    fecha: "2026-10-24",
    lectura: "5 minutos",
    categoria: "Web",
    respuesta:
      "Según nuestra experiencia, muchas agencias tardan de tres a cinco meses en entregar una web corporativa, sobre todo por las esperas entre fases: reuniones, propuestas, aprobaciones y colas de trabajo. Con un equipo que diseña, escribe y programa a la vez, y con la tecnología actual, una web a medida puede estar lista en unos días; normalmente menos de una semana.",
    cuerpo: [
      { h2: "Dónde se van los meses" },
      { p: "Cuando una web tarda cinco meses, casi nunca es porque alguien esté trabajando en ella cinco meses. El tiempo se va en esperas: la reunión de arranque, la propuesta de diseño, la espera a que el cliente apruebe, la cola del programador, los textos que nadie escribe, las fotos que no llegan, la revisión de la revisión." },
      { ul: ["Reuniones y propuestas antes de empezar.", "Diseño y programación hechos por personas o empresas distintas, una detrás de otra.", "Textos y fotos que se piden al cliente y tardan semanas.", "Cada cambio, un presupuesto nuevo y otra espera."] },
      { h2: "Cómo se hace en unos días" },
      { p: "Nosotros trabajamos al revés: preparamos los textos con lo que sabemos de tu negocio, diseñamos y programamos a la vez, y te enseñamos la web casi terminada para que la corrijas sobre algo real. La tecnología de hoy, incluida la inteligencia artificial, nos quita el trabajo repetitivo y nos deja el que hay que pensar." },
      { p: "Según el volumen de trabajo que tengamos, puede estar en 48 horas, en tres días o en una semana. Lo normal es no pasar de una semana. No lo garantizamos por escrito, igual que quien te dice tres meses tampoco te lo garantiza y luego tarda cinco." },
      { h2: "¿Más rápido es peor?" },
      { p: "No necesariamente. Lo que hace buena una web es que cargue rápido (Google lo mide con sus Core Web Vitals), que explique bien lo que haces y que ponga fácil pedirte presupuesto. Nada de eso depende de cuántos meses tarde. Nuestra intención es que la tuya sea mejor que la de quien te cobra 25.000 €, y que además la tengas en días y dentro de tu cuota." },
    ],
  },
  {
    slug: "que-es-un-crm-y-para-que-sirve",
    video: "neon-llamada",
    apoyo: { video: "llamada-sonrisa", alt: "Una persona sonríe al teléfono" },
    titulo: "Qué es un CRM y por qué tu empresa pierde clientes sin él",
    descripcion: "Un CRM es tu agenda de clientes, pero lista. Te explicamos en sencillo qué hace, qué ganas y cuándo te conviene uno a medida.",
    fecha: "2026-10-24",
    lectura: "5 minutos",
    categoria: "CRM",
    respuesta:
      "Un CRM es el programa donde se guarda cada contacto con su historia: de dónde vino, qué pidió, qué presupuesto se le envió y si acabó comprando. Ayuda a no dejar contactos sin seguimiento, a escribir en el momento justo y a saber qué canal de marketing trae clientes que de verdad facturan.",
    cuerpo: [
      { h2: "El problema que resuelve" },
      { p: "En muchas empresas los contactos están repartidos entre el correo, el WhatsApp de cada comercial, una hoja de cálculo y la memoria de alguien. Así es fácil que un presupuesto se quede sin respuesta o que nadie vuelva a llamar a quien dudaba. Y es imposible saber qué anuncio o qué página te trajo los mejores clientes." },
      { h2: "Qué hace un buen CRM" },
      { ul: ["Recoge cada contacto solo: formularios, chat, WhatsApp, llamadas y calculadoras, con la página y el anuncio de donde vino.", "Te dice en qué punto está cada uno: nuevo, presupuesto enviado, cliente.", "Te avisa de a quién toca llamar hoy, o le envía un mensaje en el momento justo.", "Te enseña qué canal trae clientes que firman, no solo clics."] },
      { h2: "Seguimientos, no boletines" },
      { p: "Un CRM no sirve para mandar el mismo correo a miles de personas. Sirve para el mensaje justo a la persona justa: el presupuesto que nadie contestó, la revisión del año que viene, la reseña cuando el cliente está contento." },
      { h2: "¿Uno del mercado o uno a medida?" },
      { p: "Si ya usas HubSpot, Zoho, Pipedrive u otro, lo normal es conectarlo a tu web y a tus anuncios y sacarle partido. Si no tienes ninguno, o el que tienes no encaja con tu forma de trabajar, uno a medida se adapta a tu negocio y no cobra licencias por persona. En Casiopea 360 hacemos las dos cosas, y va incluido en la cuota." },
    ],
  },
  {
    slug: "cinco-proveedores-de-marketing-y-ningun-responsable",
    video: "holograma-mesa",
    apoyo: { video: "despacho", alt: "Una reunión en un despacho" },
    titulo: "Cinco proveedores de marketing y ningún responsable: el coste oculto",
    descripcion: "Agencia web, SEO, anuncios, redes, CRM. Cada uno hace su parte y nadie responde del resultado. Qué te cuesta de verdad y cómo salir de ahí.",
    fecha: "2026-10-24",
    lectura: "5 minutos",
    categoria: "Estrategia",
    respuesta:
      "Tener el marketing repartido entre varios proveedores cuesta más que la suma de sus facturas: añade horas de coordinación, problemas que nadie arregla porque «es cosa del otro» y decisiones tomadas sin ver el conjunto. Un solo equipo responsable de todo reduce el coste, acelera los cambios y mide lo que importa, los clientes.",
    cuerpo: [
      { h2: "La escena de siempre" },
      { p: "Los anuncios traen visitas, pero nadie pide presupuesto. La agencia de anuncios dice que el problema es la web. El de la web dice que las visitas no son buenas. El SEO pide un cambio que el programador hará cuando tenga hueco. Y tú, en medio, reenviando correos." },
      { h2: "Lo que cuesta y no sale en la factura" },
      { ul: ["Horas de reuniones y llamadas con cada proveedor.", "Cambios que tardan semanas porque dependen de otro.", "Informes que no se hablan entre sí y que no responden a la pregunta clave: cuántos clientes y a qué coste.", "Datos y cuentas repartidos, y a veces ni siquiera a tu nombre."] },
      { h2: "Cuando el problema es el éxito" },
      { p: "Lo que buscamos es que no des abasto. Y nos ha pasado: negocios con poco trabajo que, con una web clara, buena visibilidad y un mensaje que se entiende, empiezan a recibir más peticiones de las que pueden atender. Entonces bajamos la publicidad en el momento y ajustamos para que lleguen las que puedes asumir. Con cinco proveedores, ese ajuste tarda semanas; con uno solo, minutos." },
      { h2: "Cómo salir" },
      { p: "Un solo equipo que lleve web, Google, anuncios, redes y CRM puede arreglar el mismo día lo que descubre en los datos. Y tú pasas de coordinar a decidir. Si quieres ver cómo quedaría en tu caso, empieza por el test o por el estudio gratuito." },
    ],
  },
  {
    slug: "cuantos-proveedores-necesita-una-web-que-trae-clientes",
    video: "papeles",
    apoyo: { video: "despacho", alt: "Una reunión tranquila con un solo equipo" },
    titulo: "Cuántos proveedores necesita una web que trae clientes (y por qué uno solo funciona mejor)",
    descripcion:
      "Una web que capta clientes necesita unos veinticinco oficios distintos. Te contamos cuáles son, qué pasa cuando cada uno va por su lado y cómo se trabaja con un solo equipo.",
    fecha: "2026-10-24",
    lectura: "6 minutos",
    categoria: "Estrategia",
    respuesta:
      "Según nuestro cálculo, una web que trae clientes necesita unos veinticinco oficios: diseño, programación, SEO técnico y local, anuncios, redes, analítica, automatización, legal y más. Es frecuente repartirlos entre varios proveedores, que no siempre se coordinan entre sí. Un solo equipo que lo vea todo a la vez arregla antes los problemas y te quita el trabajo de coordinar.",
    cuerpo: [
      { h2: "Los veinticinco oficios que hay detrás de una web que funciona" },
      {
        p: "Cuando una empresa piensa en su web, suele pensar en un diseñador y un programador. Pero para que esa web traiga clientes de verdad hacen falta muchos más oficios trabajando a la vez. Estos son los principales:",
      },
      {
        ul: [
          "Diseño gráfico y experiencia de usuario: que se vea bien y que el cliente llegue a pedir presupuesto sin perderse.",
          "Programación y herramientas a medida: que cargue rápido, sea segura y tenga calculadoras o configuradores.",
          "SEO técnico, de contenidos y SEO local: que Google entienda la web y la enseñe a quien busca cerca.",
          "Visibilidad en las IA: que ChatGPT, Gemini y el resto te recomienden cuando preguntan por lo tuyo.",
          "Anuncios en Google y en redes, con páginas pensadas para que te contacten.",
          "Redes sociales, fotografía y vídeo.",
          "Gestión de reseñas y de la ficha de Google.",
          "Analítica web y medición: saber qué funciona y qué no.",
          "Automatización: correos y WhatsApp que se envían solos, asistentes con inteligencia artificial.",
          "Legal y cumplimiento: avisos, privacidad y cookies como pide la ley.",
          "Seguridad, mantenimiento, pruebas y dirección del proyecto.",
        ],
      },
      { h2: "Qué pasa cuando cada uno va por su lado" },
      {
        p: "Lo normal es contratar a cinco o seis proveedores: una agencia para la web, un SEO, otra empresa para los anuncios, alguien para las redes. Cada uno hace su parte, factura por separado y manda su propio informe, si lo manda.",
      },
      {
        p: "El problema no es que trabajen mal, sino que nadie mira el conjunto. El que lleva los anuncios no puede cambiar la página a la que llegan las visitas. El SEO pide un cambio en la web y espera semanas a que el programador tenga hueco. Y el director de la empresa acaba haciendo de coordinador: reuniones con uno, llamadas con otro, el mismo correo repetido a todos.",
      },
      { h2: "Cómo se trabaja con un solo equipo" },
      {
        p: "Con un solo proveedor para todo, lo que se descubre en los datos se arregla en la web el mismo día. Si los anuncios traen visitas que se van, se cambia la página. Si muchos clientes preguntan lo mismo al asistente, se escribe un artículo. No hay que esperar a nadie ni repetir nada.",
      },
      {
        ul: [
          "Una sola persona de contacto y una sola factura.",
          "Un único informe con todo: web, Google, anuncios, redes y contactos.",
          "Cambios en horas, no en semanas.",
          "Menos tiempo tuyo en reuniones y correos.",
        ],
      },
      { h2: "¿Y si ya tengo proveedores?" },
      {
        p: "No hace falta cambiarlo todo de golpe. Lo primero es ver qué tienes, qué funciona y qué no. Para eso preparamos un estudio gratuito de tu marketing digital: tu web, tu ficha de Google, tus anuncios, tu competencia y cómo te ven las IA. Con eso decides con datos.",
      },
    ],
  },
  {
    slug: "comision-sobre-inversion-en-anuncios",
    video: "madrid-noche",
    apoyo: { video: "llamada-sonrisa", alt: "Un empresario sonríe al ver sus resultados en el móvil" },
    titulo: "¿Te cobran un porcentaje de lo que inviertes en anuncios? Lo que deberías saber",
    descripcion:
      "Muchas agencias cobran entre un 5 % y un 15 % de lo que inviertes en Google o Meta. Te explicamos cómo funciona, cuánto supone al año y qué cambia con un precio fijo.",
    fecha: "2026-10-24",
    lectura: "5 minutos",
    categoria: "Anuncios",
    respuesta:
      "Algunas agencias cobran una comisión, que varía mucho de un contrato a otro, sobre lo que el cliente invierte en anuncios. El problema es que así la agencia gana más cuanto más gastas, aunque los resultados no mejoren. Un precio fijo, con la inversión pagada directamente por el cliente a Google o Meta, alinea los intereses: lo importante es cuánto cuesta cada cliente, no cuánto se gasta.",
    cuerpo: [
      { h2: "Cómo funciona la comisión sobre la inversión" },
      {
        p: "Es un modelo muy extendido: además de una cuota por gestionar las campañas, la agencia cobra un porcentaje de lo que inviertes en Google Ads, Meta o TikTok. Suele estar entre el 5 % y el 15 %, y a veces es el único cobro.",
      },
      { h2: "Cuánto supone al año" },
      {
        p: "Parece poco, pero se acumula. Algunos ejemplos con una comisión del 10 %, solo como ilustración:",
      },
      {
        ul: [
          "Si inviertes 3.000 € al mes, pagas 300 € al mes de comisión: 3.600 € al año.",
          "Si inviertes 5.000 € al mes, son 500 € al mes: 6.000 € al año.",
          "Si inviertes 10.000 € al mes, son 1.000 € al mes: 12.000 € al año.",
        ],
      },
      { p: "Y eso sin contar la cuota de gestión, si la hay." },
      { h2: "El problema de fondo: los incentivos" },
      {
        p: "Con una comisión, la agencia gana más cuanto más gastas. No quiere decir que todas actúen mal, pero el incentivo está ahí: subir la inversión siempre le conviene, aunque los resultados no suban igual.",
      },
      {
        p: "Lo que de verdad importa para tu empresa es otra cosa: cuánto te cuesta cada cliente que llega. A veces la mejor decisión es invertir menos y mejor, añadir palabras negativas para no pagar por curiosos o arreglar la página a la que llegan las visitas.",
      },
      { h2: "La alternativa: precio fijo y la inversión, a tu nombre" },
      {
        ul: [
          "La cuenta de anuncios está a tu nombre y pagas a Google o a Meta con tu tarjeta.",
          "El proveedor cobra una cuota fija, inviertas lo que inviertas.",
          "Cada mes ves cuánto has invertido y cuánto te ha costado cada cliente.",
        ],
      },
      {
        p: "Así trabajamos en Casiopea 360: nunca cobramos un porcentaje de lo que inviertes, sean mil euros o un millón. Si quieres saber cuánto pagas hoy entre comisiones y proveedores, haz nuestro test de idoneidad: son unos 4 minutos y te da tu nota al momento.",
      },
    ],
  },
  {
    slug: "como-aparecer-en-chatgpt-y-google",
    video: "sonrisa-luces",
    apoyo: { video: "ojo-pantallas", alt: "Datos y pantallas reflejados en unas gafas" },
    titulo: "Cómo aparecer en ChatGPT y en Google cuando buscan lo que haces",
    descripcion:
      "Cada vez más clientes preguntan a ChatGPT o Gemini antes de buscar en Google. Te contamos qué se sabe hoy sobre cómo eligen a quién recomendar y qué puedes hacer, sin promesas mágicas.",
    fecha: "2026-10-24",
    lectura: "7 minutos",
    categoria: "Google y las IA",
    respuesta:
      "Las IA como ChatGPT o Gemini se apoyan en lo que encuentran publicado sobre tu empresa: tu web, tu ficha de Google, directorios, reseñas y menciones. Para aparecer ayuda tener una web clara que responda a las preguntas de tus clientes, los mismos datos en todas partes, buenas reseñas y presencia en los directorios de tu sector. Nadie puede garantizar que una IA te recomiende, pero sí ponerte en la mejor posición y medirlo.",
    cuerpo: [
      { h2: "Por qué importa ya" },
      {
        p: "Muchos clientes ya no empiezan en Google: preguntan directamente a un asistente de inteligencia artificial «qué empresa me recomiendas para…». Y la respuesta suele nombrar a tres o cuatro empresas. Si no estás entre ellas, para ese cliente no existes.",
      },
      { h2: "Qué se sabe hoy de cómo eligen" },
      {
        p: "Las IA no tienen una lista secreta: resumen lo que encuentran publicado. Los estudios que se han hecho en España y Portugal son pequeños y no siempre coinciden, pero todos apuntan en la misma dirección: pesan mucho las reseñas, los directorios y rankings del sector y una web propia con información clara.",
      },
      { h2: "Lo que sí puedes hacer" },
      {
        ol: [
          "Una web que responda a las preguntas de tus clientes en las dos primeras frases de cada página: qué haces, dónde, para quién y, si puedes, precios orientativos.",
          "Los mismos datos en todas partes: nombre, dirección, teléfono y servicios idénticos en la web, la ficha de Google y los directorios.",
          "Reseñas reales y contestadas, pedidas a tus clientes contentos de forma constante.",
          "Presencia en los directorios y rankings de tu sector, y también en Bing y en Apple, que alimentan a varias IA.",
          "Datos estructurados en la web (schema.org) y, si quieres, un archivo llms.txt que resuma quién eres; ningún buscador ni asistente garantiza que lo lea.",
          "Artículos que respondan dudas reales de tus clientes, con fuentes y fecha.",
        ],
      },
      { h2: "Lo que no funciona" },
      {
        ul: [
          "Las reseñas falsas: además de ser ilegales en España, las IA y Google cada vez las detectan mejor.",
          "Rellenar la web de palabras clave sin sentido.",
          "Pagar por «posicionamiento garantizado en ChatGPT»: nadie puede garantizarlo.",
        ],
      },
      { h2: "Cómo medirlo" },
      {
        p: "Se puede hacer cada mes: preguntar a ChatGPT, Gemini y Claude lo mismo que preguntaría un cliente («¿qué empresa de X me recomiendas en Madrid?») y apuntar quién sale. Hay herramientas que lo hacen a diario. Así sabes si vas avanzando.",
      },
      {
        p: "En nuestro estudio gratuito incluimos esta prueba: te decimos si las IA te recomiendan hoy y qué haríamos para mejorarlo.",
      },
    ],
  },
];

export const articuloPorSlug = (slug: string) => ARTICULOS.find((a) => a.slug === slug);
