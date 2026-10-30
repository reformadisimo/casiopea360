import { NextRequest, NextResponse } from "next/server";

/* La mesa real de Casiopea (/mesa) enseña datos de verdad (también nombres y correos de quien hace el test),
   y el código de esta web es público: por eso va con clave, no basta con una dirección escondida.
   La clave la pone Ig en Vercel (variable MESA_CLAVE); el navegador la pide una vez y la recuerda.
   Sin MESA_CLAVE, la mesa no se abre a nadie. */
export function middleware(req: NextRequest) {
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

export const config = { matcher: ["/mesa", "/mesa/:path*"] };
