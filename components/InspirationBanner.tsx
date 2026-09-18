"use client";

import React from "react";
import ScrollVelocity from "./ScrollVelocity";
import PreMatricula from "./PreMatricula";

export const InspirationBanner: React.FC = () => {
  const bannerTexts: React.ReactNode[] = [
    <span key="1" className="inline-flex items-center gap-3">
      <span className="font-serif font-normal text-[#e2e8f0]">
        Tu futuro no está lejos,
      </span>
      <span className="font-serif italic text-[#f59e0b] font-normal">
        está aquí
      </span>
      <span className="ml-6 text-2xl text-[#f59e0b]/50">•</span>
    </span>,
  ];

  return (
    <section className="w-full bg-[#080c14] p-4 md:p-8 flex justify-center items-center">
      {/* Contenedor oscuro con degradado profundo y bordes sutiles */}
      <div className="w-full max-w-6xl rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] via-[#111e36] to-[#182847] px-6 py-10 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden shadow-2xl">
        {/* ScrollVelocity con texto claro y acento dorado */}
        <div className="w-full lg:w-3/4 overflow-hidden">
          <ScrollVelocity
            texts={bannerTexts}
            velocity={60}
            className="text-3xl md:text-5xl lg:text-6xl tracking-tight"
            numCopies={4}
            damping={50}
            stiffness={400}
          />
        </div>

        {/* Botón CTA dorado de alto contraste */}
        <div className="flex-shrink-0 z-10 w-full sm:w-auto text-center">
          <PreMatricula />
        </div>
      </div>
    </section>
  );
};

export default InspirationBanner;
