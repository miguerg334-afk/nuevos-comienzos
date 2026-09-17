export default function Esencia() {
  return (
    <section
      id="nosotros"
      className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed scroll-mt-28"
      style={{ backgroundImage: "url('/img/Jesus.webp')" }}
    >
      {/* Overlay oscuro para garantizar la lectura del texto */}
      <div className="absolute inset-0 bg-[#06141b]/50 z-10"></div>

      {/* Contenedor Principal */}
      <div className="relative z-20 w-full max-w-[1180px] px-5 mx-auto flex flex-col gap-20">
        {/* Parte Superior: Cita Bíblica */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-snug md:leading-tight mb-6">
            “Jesús crecía en sabiduría, en estatura y en gracia para con Dios y
            los hombres.”
          </h2>
          <span className="text-[#e5ad20] text-xs md:text-sm font-bold tracking-[3px] uppercase">
            Lucas 2:52
          </span>
        </div>

        {/* Parte Inferior: Nuestra Esencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start pt-16 border-t border-white/10">
          {/* Columna Izquierda */}
          <div>
            <span className="text-[#e5ad20] text-[11px] font-bold tracking-[2px] uppercase mb-4 block">
              Nuestra Esencia
            </span>
            <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              Una educación <br />
              <span className="text-[#e5ad20] italic">que transforma.</span>
            </h3>
          </div>

          {/* Columna Derecha */}
          <div className="flex flex-col gap-6 text-white/80 text-base md:text-lg leading-relaxed">
            <p>
              En Nuevos Comienzos College creemos que educar trasciende la
              enseñanza técnica. Acompañamos a cada estudiante en el
              descubrimiento de su fe, sus talentos y su propósito de vida.
            </p>
            <p>
              Construimos un ambiente donde la exigencia académica convive en
              armonía con la formación espiritual y humana, preparando líderes
              capaces de afrontar con madurez los retos del siglo XXI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
