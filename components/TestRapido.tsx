"use client";

import Link from "next/link";
import { useState } from "react";

// Test rápido: siete preguntas de sí o no y un resultado al momento.
// Todo se calcula en el navegador; no se envía nada.
const PREGUNTAS = [
  { p: "¿Tu web carga rápido en el móvil?", consejo: "Una web lenta pierde a la mitad de las visitas antes de que la vean." },
  { p: "¿Sales en Google cuando buscan lo que haces en tu zona?", consejo: "Si no sales, esos clientes se los lleva tu competencia." },
  { p: "¿Contestas todas las reseñas de Google?", consejo: "Las reseñas sin respuesta restan confianza, sobre todo las malas." },
  { p: "¿Sabes cuánto te cuesta cada cliente que llega por internet?", consejo: "Sin ese dato, no sabes si tus anuncios ganan o pierden dinero." },
  { p: "¿Alguien atiende los mensajes que llegan de noche o en fin de semana?", consejo: "Quien escribe a las once de la noche y no recibe respuesta, escribe a otro." },
  { p: "¿Un solo proveedor lleva todo tu marketing digital?", consejo: "Con varios proveedores, nadie mira el conjunto y tú haces de coordinador." },
  { p: "¿Recibes cada semana un informe claro de resultados?", consejo: "Lo que no se mide no se puede mejorar." },
];

export default function TestRapido() {
  const [respuestas, setRespuestas] = useState<(boolean | null)[]>(PREGUNTAS.map(() => null));
  const [paso, setPaso] = useState(0);
  const terminado = paso >= PREGUNTAS.length;
  const sies = respuestas.filter((r) => r === true).length;

  function responder(valor: boolean) {
    const nuevas = [...respuestas];
    nuevas[paso] = valor;
    setRespuestas(nuevas);
    setPaso(paso + 1);
  }

  function reiniciar() {
    setRespuestas(PREGUNTAS.map(() => null));
    setPaso(0);
  }

  const nivel =
    sies >= 6
      ? { titulo: "Vas muy bien.", texto: "Tu marketing está en buena forma. Aun así, un estudio puede encontrar dónde ganar más con lo mismo." }
      : sies >= 3
        ? { titulo: "Vas a medias.", texto: "Tienes una base, pero estás dejando escapar clientes en varios puntos. Son cosas que se arreglan." }
        : { titulo: "Hay mucho margen.", texto: "Ahora mismo tu negocio es casi invisible por internet. La buena noticia: es justo donde más se nota el cambio." };

  return (
    <div className="rounded-[2rem] bg-noche p-6 text-white sm:p-10">
      {!terminado ? (
        <>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>
              Pregunta {paso + 1} de {PREGUNTAS.length}
            </span>
            {paso > 0 && (
              <button type="button" onClick={() => setPaso(paso - 1)} className="underline underline-offset-4 hover:text-white">
                Volver atrás
              </button>
            )}
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
            <div className="h-full rounded-full bg-estrella transition-all duration-300" style={{ width: `${(paso / PREGUNTAS.length) * 100}%` }} />
          </div>
          <p className="mt-10 font-titular text-3xl font-extrabold sm:text-4xl" aria-live="polite">
            {PREGUNTAS[paso].p}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-md">
            <button type="button" onClick={() => responder(true)} className="rounded-2xl bg-estrella px-6 py-5 text-xl font-bold text-tinta hover:bg-estrella-2">
              Sí
            </button>
            <button type="button" onClick={() => responder(false)} className="rounded-2xl border-2 border-white/40 px-6 py-5 text-xl font-bold hover:border-white">
              No
            </button>
          </div>
        </>
      ) : (
        <div aria-live="polite">
          <p className="text-sm text-white/70">Tu resultado</p>
          <div className="mt-4 flex items-end gap-4">
            <p className="font-titular text-7xl font-extrabold leading-none text-estrella">
              {sies}
              <span className="text-4xl text-white/50">/{PREGUNTAS.length}</span>
            </p>
          </div>
          <p className="mt-6 font-titular text-3xl font-extrabold">{nivel.titulo}</p>
          <p className="mt-3 max-w-xl text-lg text-white/80">{nivel.texto}</p>
          {sies < PREGUNTAS.length && (
            <div className="mt-8">
              <p className="font-bold">Dónde estás perdiendo clientes:</p>
              <ul className="mt-3 space-y-3">
                {PREGUNTAS.map((q, i) =>
                  respuestas[i] === false ? (
                    <li key={q.p} className="flex gap-3 text-white/85">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-estrella" />
                      {q.consejo}
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/estudio-gratuito" className="inline-flex justify-center rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2">
              Quiero mi estudio gratuito
            </Link>
            <button type="button" onClick={reiniciar} className="inline-flex justify-center rounded-full border border-white/35 px-7 py-3.5 font-bold hover:border-white">
              Repetir el test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
