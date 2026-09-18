import PreMatricula from "./PreMatricula";

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="/img/hero.webp"
      >
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#06141b]/85 via-[#06141b]/80 to-[#06141b]/40 z-10"></div>

      <div className="relative z-20 w-full max-w-[1180px] px-5 mx-auto flex flex-col items-start mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#e5ad20]"></span>
          <span className="text-[#e5ad20] text-[11px] font-bold tracking-[2px] uppercase">
            Educación con propósito cristiano
          </span>
        </div>

        <h1 className="font-serif text-[48px] md:text-[64px] leading-[1.1] mb-6 drop-shadow-lg">
          <span className="block text-white font-medium">
            Colegio de Educación Secundaria
          </span>
          <span className="block text-[#e5ad20] italic font-medium">
            en Campoalegre
          </span>
        </h1>

        <p className="text-white/80 text-[16px] md:text-[18px] leading-relaxed max-w-[550px] mb-10">
          Formamos jóvenes con excelencia académica, carácter ético y
          fundamentados en principios cristianos para liderar el futuro con
          sabiduría.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <PreMatricula />
          <a
            href="#nosotros"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent border border-white/20 text-white text-[14px] font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/40 text-center no-underline"
          >
            Conoce nuestro colegio
          </a>
        </div>
      </div>
    </section>
  );
}
