"use client";
import Image from "next/image";

export default function OfertaEducativa() {
  const grados = [
    {
      numero: "6",
      titulo: "Sexto Grado",
      descripcion:
        "Transición acompañada hacia la secundaria, fortalecimiento del pensamiento lógico y cimientos de valores cristianos.",
    },
    {
      numero: "7",
      titulo: "Séptimo Grado",
      descripcion:
        "Desarrollo del pensamiento crítico, habilidades sociales, responsabilidad e indagación científica.",
    },
    {
      numero: "8",
      titulo: "Octavo Grado",
      descripcion:
        "Profundización académica, liderazgo participativo y afianzamiento de la identidad en valores.",
    },
    {
      numero: "9",
      titulo: "Noveno Grado",
      descripcion:
        "Preparación avanzada para la educación media, visión de proyecto de vida y servicio comunitario.",
    },
  ];

  return (
    <section
      id="oferta-educativa"
      className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden scroll-mt-20"
    >
      {/* 1. Imagen de fondo completa */}
      <Image
        src="/img/gradua.webp"
        alt="Promoción de graduados"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* 2. Capa oscura superpuesta (Overlay) para legibilidad */}
      <div className="absolute inset-0 bg-[#06141b]/60 backdrop-blur-[2px] z-10 pointer-events-none" />

      {/* 3. Contenido Principal */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mb-12 md:mb-16">
          <span className="text-[#e5ad20] text-[11px] font-bold tracking-[3px] uppercase mb-3 block">
            Nivel Secundario
          </span>
          <h2 className="font-serif text-white text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md">
            Nuestra Oferta Educativa
          </h2>
          <p className="text-white/85 text-base md:text-lg">
            Actualmente brindamos formación integral orientada a adolescentes en
            sus etapas clave de desarrollo intelectual y personal.
          </p>
        </div>

        {/* Tarjetas en Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {grados.map((grado, index) => (
            <div
              key={index}
              className="group relative bg-[#06141b]/20 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#e5ad20]/60 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#e5ad20] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-start mb-4">
                <span className="font-serif text-4xl lg:text-5xl text-[#e5ad20] font-medium transition-transform duration-300 group-hover:scale-105 origin-left">
                  {grado.numero}
                </span>
                <span className="text-[#e5ad20] text-lg lg:text-xl mt-1 font-serif">
                  º
                </span>
              </div>

              <h3 className="text-white font-bold text-lg lg:text-xl mb-2">
                {grado.titulo}
              </h3>
              <p className="text-white/75 text-xs lg:text-sm leading-relaxed">
                {grado.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
