export default function DonacionesIntro() {
  return (
    <section className="bg-[#061c24]">
      <div className="relative overflow-hidden bg-[#0a2831]">
        <img
          src="/img/img-donaciones.webp"
          alt="Estudiante de Nuevos Comienzos College celebrando su graduación"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,27,0.86),rgba(4,20,27,0.36)_52%,rgba(4,20,27,0.62))]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-28 select-none overflow-hidden whitespace-nowrap font-sans text-[clamp(5.5rem,17vw,16rem)] font-bold leading-[0.72] tracking-[-0.08em] text-white/[0.13] sm:top-32">
          APOYAR
        </div>

        <div className="relative flex min-h-[540px] flex-col justify-end p-7 pb-10 pt-36 sm:min-h-[640px] sm:p-10 sm:pb-14 sm:pt-44 lg:min-h-[700px] lg:p-14 lg:pb-16 lg:pt-48">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e5ad20] sm:text-xs">
              <span className="h-px w-9 bg-[#e5ad20]" />
              Nuevos Comienzos College
            </p>
            <h1 className="max-w-[10ch] font-serif text-5xl leading-[0.94] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.42)] sm:text-6xl lg:text-7xl">
              ¿Cómo puedo <span className="italic text-[#e5ad20]">apoyar?</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
              Una oportunidad. Un estudiante. Un futuro.
            </p>
            <a href="#formas-de-aportar" className="mt-7 inline-flex w-fit items-center gap-3 border-b border-[#e5ad20]/70 pb-2 text-sm font-semibold text-[#e5ad20] transition-colors hover:text-white">
              Conoce las formas de aportar <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="mt-7 flex w-fit items-center gap-4 rounded-2xl border border-white/20 bg-[#071d25]/65 px-5 py-4 text-white shadow-lg backdrop-blur-md sm:absolute sm:bottom-10 sm:right-10 sm:mt-0 lg:bottom-14 lg:right-14">
            <span className="font-serif text-3xl leading-none text-[#e5ad20]">3</span>
            <p className="text-xs leading-5 text-white/80">Formas de aportar.<br />Un mismo propósito.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
