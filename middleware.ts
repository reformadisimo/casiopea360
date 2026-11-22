import { NextRequest, NextResponse } from "next/server";

/* La mesa real de Casiopea (/mesa) enseña datos de verdad (también nombres y correos de quien hace el test),
   y el código de esta web es público: por eso va con clave, no basta con una dirección escondida.
   La clave la pone Ig en Vercel (variable MESA_CLAVE); el navegador la pide una vez y la recuerda.
   Sin MESA_CLAVE, la mesa no se abre a nadie. */
const LANDING = "/agencia-marketing-digital-madrid";

/* Prueba de titular en la landing de Google (22-nov-2026): la misma dirección enseña a la mitad el titular
   «Todo tu marketing digital. Un solo equipo.» (E) y a la otra mitad el claim (C). Sin cookies: el reparto sale
   de la conexión y el navegador de la visita (no se guarda nada), así la misma persona ve siempre la misma.
   Con ?v=e o ?v=c se fuerza una para verla. */
function repartoLanding(req: NextRequest) {
  const v = req.nextUrl.searchParams.get("v");
  let c: boolean;
  if (v === "c") c = true;
  else if (v === "e") c = false;
  else {
    const semilla = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() + "|" + (req.headers.get("user-agent") ?? "");
    let h = 2166136261;
    for (let i = 0; i < semilla.length; i++) { h ^= semilla.charCodeAt(i); h = Math.imul(h, 16777619); }
    c = ((h >>> 7) & 1) === 1;
  }
  if (!c) return NextResponse.next();
  const u = req.nextUrl.clone();
  u.pathname = LANDING + "/c";
  return NextResponse.rewrite(u);
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === LANDING) return repartoLanding(req);
  const clave = (process.env.MESA_CLAVE ?? "").trim();
  if (!clave) return new NextResponse("La mesa está cerrada: falta poner la clave MESA_CLAVE en Vercel.", { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } });
  const auth = req.headers.get("authorization") ?? "";
  if (auth.startsWith("Basic ")) {
    try {
      const [, pass] = atob(auth.slice(6)).split(":");
      if (pass && pass === clave) return NextResponse.next();
    } catch {}
  }
  return new NextResponse("Clave necesaria.", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Mesa de Casiopea 360", charset="UTF-8"', "content-type": "text/plain; charset=utf-8" } });
}

export const config = { matcher: ["/mesa", "/mesa/:path*", "/agencia-marketing-digital-madrid"] };
