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
  respuesta: string; // respuesta corta al principio, pensada para Google y las IA
  cuerpo: Bloque[];
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "cuantos-proveedores-necesita-una-web-que-trae-clientes",
    video: "papeles",
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
          "SEO técnico, de contenidos y local: que Google entienda la web y la enseñe a quien busca cerca.",
          "Visibilidad en las IA: que ChatGPT, Gemini y el resto te recomienden cuando preguntan por lo tuyo.",
          "Anuncios en Google y en redes, con páginas pensadas para que te contacten.",
          "Redes sociales, fotografía y vídeo.",
          "Gestión de reseñas y de la ficha de Google.",
          "Analítica y medición: saber qué funciona y qué no.",
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
        p: "Lo que de verdad importa para tu empresa es otra cosa: cuánto te cuesta cada cliente que llega. A veces la mejor decisión es invertir menos y mejor, quitar palabras que traen curiosos o arreglar la página a la que llegan las visitas.",
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
        p: "Así trabajamos en Casiopea 360: nunca cobramos un porcentaje de lo que inviertes, sean mil euros o un millón. Si quieres saber cuánto pagas hoy entre comisiones y proveedores, prueba nuestra calculadora: tarda un minuto y no pide tus datos.",
      },
    ],
  },
  {
    slug: "como-aparecer-en-chatgpt-y-google",
    video: "sonrisa-luces",
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
