import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#06141b] text-white px-5 text-center relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e5ad20]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        <span className="text-[#e5ad20] font-serif text-8xl md:text-9xl font-bold tracking-tighter mb-4">
          404
        </span>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">
          Página no encontrada
        </h1>
        <p className="text-white/70 text-lg mb-10 leading-relaxed">
          Parece que te has desviado del camino. La página que buscas no existe
          o ha sido movida temporalmente.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 rounded-xl bg-[#e5ad20] text-[#101820] text-[14px] font-bold tracking-[0.5px] transition-transform duration-300 hover:-translate-y-1 hover:bg-[#f5c344] no-underline"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
