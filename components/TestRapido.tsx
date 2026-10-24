"use client";

import Link from "next/link";
import { useState } from "react";
import LogoMarca from "@/components/LogoMarca";
import VideoFondo from "@/components/VideoFondo";
import EnviarResultado from "@/components/EnviarResultado";
import { BarraEstrella, Confeti, Estrella, Reaccion } from "@/components/JuegoTest";

// Test rápido: siete preguntas de sí o no, una a una, con vídeo, reacción y confeti al final.
// Todo se calcula en el navegador; no se envía nada.
const PREGUNTAS = [
  { logo: "PageSpeed", video: "mano-pantalla", color: "from-[#1f6feb]/85 to-[#0e1a3d]/90", p: "¿Tu web carga rápido en el móvil?", bien: "¡Bien! La mitad de tu competencia no puede decir lo mismo.", consejo: "Una web lenta pierde a la mitad de las visitas antes de que la vean." },
  { logo: "Google", video: "ojo-pantallas", color: "from-[#1a73e8]/85 to-[#188038]/85", p: "¿Sales en Google cuando buscan lo que haces en tu zona?", bien: "¡Genial! Ahí es donde te buscan antes de llamarte.", consejo: "Si no sales, esos clientes se los lleva tu competencia." },
  { logo: "Ficha de Google", video: "neon-sonrisa", color: "from-[#f59e0b]/85 to-[#e8457a]/85", p: "¿Contestas todas las reseñas de Google?", bien: "¡Eso es cuidar a tus clientes!", consejo: "Las reseñas sin respuesta restan confianza, sobre todo las malas." },
  { logo: "Google Analytics", video: "puntos-luz", color: "from-[#e37400]/85 to-[#24387a]/90", p: "¿Sabes cuánto te cuesta cada cliente que llega por internet?", bien: "¡Muy bien! Pocos lo saben al euro.", consejo: "Sin ese dato, no sabes si tus anuncios ganan o pierden dinero." },
  { logo: "WhatsApp", video: "neon-llamada", color: "from-[#128c7e]/85 to-[#075e54]/90", p: "¿Alguien atiende los mensajes que llegan de noche o en fin de semana?", bien: "¡Perfecto! Es cuando más gente busca.", consejo: "Quien escribe a las once de la noche y no recibe respuesta, escribe a otro." },
  { logo: "Google Ads", video: "holograma-mesa", color: "from-[#7c3aed]/85 to-[#e8457a]/80", p: "¿Un solo proveedor lleva todo tu marketing digital?", bien: "¡Qué tranquilidad! Una sola persona a la que llamar.", consejo: "Con varios proveedores, nadie mira el conjunto y tú haces de coordinador." },
  { logo: "Gmail", video: "equipo-celebra", color: "from-[#0f9d58]/85 to-[#0e1a3d]/90", p: "¿Recibes cada semana un informe claro de resultados?", bien: "¡Así se decide con datos!", consejo: "Lo que no se mide no se puede mejorar." },
];

export default function TestRapido() {
  const [respuestas, setRespuestas] = useState<(boolean | null)[]>(PREGUNTAS.map(() => null));
  const [paso, setPaso] = useState(0);
  const [reaccion, setReaccion] = useState<{ t: string; bien: boolean } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const terminado = paso >= PREGUNTAS.length;
  const sies = respuestas.filter((r) => r === true).length;
  const q = PREGUNTAS[Math.min(paso, PREGUNTAS.length - 1)];

  function responder(valor: boolean) {
    if (reaccion) return;
    const nuevas = [...respuestas];
    nuevas[paso] = valor;
    setRespuestas(nuevas);
    setReaccion({ t: valor ? q.bien : q.consejo, bien: valor });
    setTimeout(() => {
      setReaccion(null);
      setPaso((p) => p + 1);
      if (paso + 1 >= PREGUNTAS.length) setConfeti(Date.now());
    }, valor ? 1100 : 1700);
  }

  function reiniciar() {
    setRespuestas(PREGUNTAS.map(() => null));
    setPaso(0);
    setReaccion(null);
  }

  const nivel =
    sies >= 6
      ? { titulo: "¡Vas como un cohete!", texto: "Tu marketing está en buena forma. Aun así, un estudio puede encontrar dónde ganar más con lo mismo." }
      : sies >= 3
        ? { titulo: "Vas a medias.", texto: "Tienes una base, pero estás dejando escapar clientes en varios puntos. Son cosas que se arreglan, y rápido." }
        : { titulo: "Hay muchísimo margen.", texto: "Ahora mismo tu negocio es casi invisible por internet. La buena noticia: es justo donde más se nota el cambio." };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-noche text-white shadow-[0_30px_70px_-30px_rgba(14,26,61,0.7)]">
      <Confeti disparo={confeti} />
      {!terminado ? (
        <div className="relative min-h-[460px] p-6 sm:p-10">
          <div aria-hidden="true" className="absolute inset-0">
            <VideoFondo key={q.video} nombre={q.video} alt="" />
          </div>
          <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${q.color}`} />
          <div className="relative">
            <div className="flex items-center justify-between text-sm font-bold text-white/85">
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Pregunta {paso + 1} de {PREGUNTAS.length}</span>
              {paso > 0 && !reaccion && (
                <button type="button" onClick={() => setPaso(paso - 1)} className="underline underline-offset-4 hover:text-white">
                  Volver atrás
                </button>
              )}
            </div>
            <div className="mt-5">
              <BarraEstrella avance={paso / PREGUNTAS.length} oscuro />
            </div>
            <div key={paso} className="entra mt-10 flex items-start gap-4 sm:gap-5">
              <span className="flota grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white shadow-xl sm:h-20 sm:w-20">
                <LogoMarca nombre={q.logo} tam={40} />
              </span>
              <p className="font-titular text-3xl font-extrabold leading-tight drop-shadow sm:text-5xl" aria-live="polite">
                {q.p}
              </p>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => responder(true)}
                className={`flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-5 text-2xl font-extrabold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-emerald-500 ${reaccion?.bien ? "salta ring-4 ring-white" : ""}`}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                Sí
              </button>
              <button
                type="button"
                onClick={() => responder(false)}
                className={`flex items-center justify-center gap-3 rounded-2xl bg-rose-600 px-6 py-5 text-2xl font-extrabold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-rose-500 ${reaccion && !reaccion.bien ? "salta ring-4 ring-white" : ""}`}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                No
              </button>
            </div>
            <div className="mt-6 min-h-[3.5rem]">{reaccion && <Reaccion texto={reaccion.t} tono={reaccion.bien ? "bien" : "neutro"} claro />}</div>
          </div>
        </div>
      ) : (
        <div className="relative p-6 sm:p-10" aria-live="polite">
          {[[6, 14], [88, 10], [94, 46], [74, 78], [10, 80], [48, 6], [30, 60]].map(([x, y], i) => (
            <span key={i} aria-hidden="true" className="titila absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.35}s` }}>
              <Estrella className="h-4 w-4" />
            </span>
          ))}
          <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <div
              className="mx-auto grid h-44 w-44 place-items-center rounded-full p-3 sm:h-52 sm:w-52"
              style={{ background: `conic-gradient(#ffc53d ${(sies / PREGUNTAS.length) * 360}deg, rgba(255,255,255,0.12) 0deg)` }}
            >
              <div className="grid h-full w-full place-items-center rounded-full bg-noche text-center">
                <div>
                  <p className="font-titular text-6xl font-extrabold leading-none text-estrella sm:text-7xl">
                    {sies}
                    <span className="text-3xl text-white/50">/{PREGUNTAS.length}</span>
                  </p>
                  <p className="mt-1 text-sm text-white/70">respuestas en verde</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-titular text-4xl font-extrabold">{nivel.titulo}</p>
              <p className="mt-3 max-w-xl text-lg text-white/80">{nivel.texto}</p>
            </div>
          </div>
          {sies < PREGUNTAS.length && (
            <div className="relative mt-10">
              <p className="text-xl font-extrabold">Dónde estás perdiendo clientes</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {PREGUNTAS.map((p, i) =>
                  respuestas[i] === false ? (
                    <li key={p.p} className="aparece flex items-start gap-3 rounded-2xl bg-white/[0.08] p-4 ring-1 ring-white/10" style={{ animationDelay: `${i * 0.08}s` }}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white"><LogoMarca nombre={p.logo} tam={22} /></span>
                      <span className="text-white/90">{p.consejo}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}
          <div className="relative mt-10">
            <EnviarResultado
              origen="test rápido"
              resumen={`Respuestas en verde: ${sies} de ${PREGUNTAS.length}. ${nivel.titulo}\n\nDónde estás perdiendo clientes:\n${PREGUNTAS.filter((_, i) => respuestas[i] === false).map((p) => "- " + p.consejo).join("\n") || "- En nada de lo que hemos preguntado. Enhorabuena."}`}
            />
          </div>
          <div className="relative mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/estudio-gratuito" className="inline-flex justify-center rounded-full bg-estrella px-7 py-3.5 font-bold text-tinta hover:bg-estrella-2">
              Quiero mi estudio gratuito
            </Link>
            <a href="#completo" className="inline-flex justify-center rounded-full bg-white/10 px-7 py-3.5 font-bold hover:bg-white/20">
              Hacer el test completo
            </a>
            <button type="button" onClick={reiniciar} className="inline-flex justify-center rounded-full border border-white/35 px-7 py-3.5 font-bold hover:border-white">
              Repetir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
