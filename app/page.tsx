export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#fbf8f2] px-4 text-center">
      <p className="text-sm tracking-[0.2em] text-[#1c8caa] uppercase">Casiopea 360</p>
      <h1 className="max-w-xl text-3xl font-semibold text-[#1f1f1f] sm:text-4xl">
        La web nueva de Reformadísimo empieza aquí.
      </h1>
      <a
        href="https://wa.me/34636154652"
        className="rounded-full bg-[#FFDE00] px-6 py-3 font-semibold text-[#1f1f1f]"
      >
        Reservar visita
      </a>
    </main>
  );
}
