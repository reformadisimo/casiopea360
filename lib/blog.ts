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
};

export const ARTICULOS: Articulo[] = [
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
    descripcion: "Lo habitual son tres, cuatro o cinco meses. Te contamos dónde se va ese tiempo y cómo se puede tener una web mejor en unos días.",
    fecha: "2026-10-24",
    lectura: "5 minutos",
    categoria: "Web",
    respuesta:
      "Una agencia suele tardar de tres a cinco meses en entregar una web corporativa, sobre todo por las esperas entre fases: reuniones, propuestas, aprobaciones y colas de trabajo. Con un equipo que diseña, escribe y programa a la vez, y con la tecnología actual, una web a medida puede estar lista en unos días; normalmente menos de una semana.",
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
      "Un CRM es el programa donde se guarda cada contacto con su historia: de dónde vino, qué pidió, qué presupuesto se le envió y si acabó comprando. Sirve para no perder ningún cliente, para hacer seguimiento en el momento justo y para saber qué canal de marketing trae clientes que de verdad facturan.",
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
      "Una web que trae clientes necesita alrededor de veinticinco oficios: diseño, programación, SEO técnico y local, anuncios, redes, analítica, automatización, legal y más. Lo habitual es repartirlos entre cinco o seis proveedores, que no se coordinan entre sí. Un solo equipo que lo vea todo a la vez arregla antes los problemas y te quita el trabajo de coordinar.",
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
      "Muchas agencias cobran entre un 5 % y un 15 % de lo que inviertes en Google o Meta. Te explicamos cómo funciona, cuánto supone al año y por qué un precio fijo es más justo.",
    fecha: "2026-10-24",
    lectura: "5 minutos",
    categoria: "Anuncios",
    respuesta:
      "Muchas agencias cobran una comisión de entre el 5 % y el 15 % sobre lo que el cliente invierte en anuncios. El problema es que así la agencia gana más cuanto más gastas, aunque los resultados no mejoren. Un precio fijo, con la inversión pagada directamente por el cliente a Google o Meta, alinea los intereses: lo importante es cuánto cuesta cada cliente, no cuánto se gasta.",
    cuerpo: [
      { h2: "Cómo funciona la comisión sobre la inversión" },
      {
        p: "Es un modelo muy extendido: además de una cuota por gestionar las campañas, la agencia cobra un porcentaje de lo que inviertes en Google Ads, Meta o TikTok. Suele estar entre el 5 % y el 15 %, y a veces es el único cobro.",
      },
      { h2: "Cuánto supone al año" },
      {
        p: "Parece poco, pero se acumula. Algunos ejemplos con una comisión del 10 %:",
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
          "Datos estructurados en la web (schema.org) y un archivo llms.txt que resuma quién eres para los asistentes.",
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
