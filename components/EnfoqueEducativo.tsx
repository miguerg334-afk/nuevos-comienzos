export default function EnfoqueEducativo() {
  const pilares = [
    {
      numero: "01",
      titulo: "Principios y valores",
      descripcion:
        "Formación integral basada en Principios y Valores Cristianos, fortaleciendo el carácter y el desarrollo personal de cada estudiante.",
      icono: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18m-9-9h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
        />
      ),
    },
    {
      numero: "02",
      titulo: "Énfasis en inglés",
      descripcion:
        "Programa académico con énfasis en inglés para abrir puertas al mundo, la comunicación global y nuevas oportunidades profesionales.",
      icono: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
        />
      ),
    },
    {
      numero: "03",
      titulo: "Artes y oficios",
      descripcion:
        "Formación práctica en competencias para el trabajo y el emprendimiento: costura, zapatería, construcción y otras artes y oficios.",
      icono: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.65 2.65 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      ),
    },
  ];

  return (
    <section
      id="enfoque-educativo"
      className="relative w-full overflow-hidden bg-white px-5 py-20 md:py-28 scroll-mt-28"
      aria-labelledby="enfoque-educativo-titulo"
    >
      {/* ═══════════════ CAPAS DE FONDO ═══════════════ */}

      {/* 1. Trama diagonal tipo papel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.9]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(6,20,27,0.06) 0px, rgba(6,20,27,0.06) 1px, transparent 1px, transparent 14px)",
        }}
      />

      {/* 2. Grid arquitectónico tipo blueprint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.9]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,20,27,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(6,20,27,0.09) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* 3. Haz diagonal decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(115deg, transparent 27%, rgba(229,173,32,0.05) 43%, rgba(229,173,32,0.14) 50%, rgba(229,173,32,0.05) 57%, transparent 73%)",
        }}
      />

      {/* 4. Puntos decorativos (dot grid) - esquina superior derecha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-8 hidden h-56 w-56 md:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(166,120,8,0.62) 1.3px, transparent 1.3px)",
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(circle at top right, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at top right, black 30%, transparent 75%)",
        }}
      />

      {/* 5. Puntos decorativos - esquina inferior izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-8 hidden h-56 w-56 md:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(6,20,27,0.52) 1.3px, transparent 1.3px)",
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(circle at bottom left, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom left, black 30%, transparent 75%)",
        }}
      />

      {/* 6. Vignette suave para enfocar el centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 48%, rgba(6,20,27,0.08) 100%)",
        }}
      />

      {/* 7. Línea vertical editorial izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-20 bottom-20 hidden w-px bg-gradient-to-b from-transparent via-[#e5ad20]/40 to-transparent lg:block"
      />

      {/* 8. Marca de agua tipográfica */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-10 hidden select-none font-serif text-[200px] leading-none text-[#06141b]/[0.065] md:block"
      >
        NC
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-[28%] h-[520px] w-[520px] rotate-12 rounded-[120px] border-2 border-[#06141b]/25 bg-[#06141b]/[0.025] shadow-[0_32px_80px_rgba(6,20,27,0.08)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-[8%] h-44 w-44 rounded-full border-[22px] border-[#e5ad20]/65" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[42%] top-[24%] hidden h-28 w-28 rotate-45 border border-[#06141b]/30 lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[26%] bottom-14 hidden h-24 w-24 rounded-full border-[10px] border-[#e5ad20]/35 lg:block" />

      {/* ═══════════════ CONTENIDO ═══════════════ */}

      <div className="relative mx-auto max-w-[1180px]">
        {/* Encabezado */}
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#e5ad20]" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#a67808]">
                Nuestra propuesta
              </span>
            </div>
            <h2
              id="enfoque-educativo-titulo"
              className="max-w-md font-serif text-4xl leading-[1.05] text-[#06141b] md:text-6xl"
            >
              Enfoque <span className="italic text-[#a67808]">educativo</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[#26343b]/80 md:text-base">
            Un modelo que integra fe, excelencia académica y habilidades
            prácticas para formar personas íntegras y preparadas para el futuro.
          </p>
        </div>

        {/* Pilares */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {pilares.map((pilar) => (
            <article
              key={pilar.numero}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e5ad20]/45 bg-[#f5df9d]/38 p-7 shadow-[0_22px_48px_-26px_rgba(110,76,8,0.3),0_1px_0_0_rgba(255,255,255,0.95)_inset] backdrop-blur-2xl transition-all duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-20 before:bg-gradient-to-b before:from-white/72 before:to-transparent hover:-translate-y-1 hover:border-[#a67808]/70 hover:bg-[#f8e9bd]/55 hover:shadow-[0_30px_55px_-20px_rgba(110,76,8,0.38)] md:p-8"
            >
              {/* Línea dorada superior animada */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#e5ad20] to-[#a67808] transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f6f0] ring-1 ring-[#e5ad20]/30 transition-colors duration-300 group-hover:bg-[#e5ad20]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-[#a67808]"
                    aria-hidden="true"
                  >
                    {pilar.icono}
                  </svg>
                </div>
                <span className="font-serif text-3xl italic text-[#06141b]/15 transition-colors duration-300 group-hover:text-[#e5ad20]/50">
                  {pilar.numero}
                </span>
              </div>

              <h3 className="mb-3 font-serif text-xl leading-snug text-[#06141b] md:text-2xl">
                {pilar.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-[#26343b]/90 md:text-base">
                {pilar.descripcion}
              </p>
            </article>
          ))}
        </div>

        {/* Cita / propósito final */}
        <figure className="relative mt-14 overflow-hidden rounded-2xl bg-[#06141b] px-7 py-10 md:mt-20 md:px-14 md:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#e5ad20]/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#a67808]/10 blur-3xl"
          />

          <span
            aria-hidden="true"
            className="absolute left-6 top-4 font-serif text-[80px] leading-none text-[#e5ad20]/40 md:left-10 md:text-[110px]"
          >
            &ldquo;
          </span>

          <blockquote className="relative mx-auto max-w-3xl text-center">
            <p className="font-serif text-2xl leading-snug text-[#f8f6f0] md:text-4xl">
              Formar para la <span className="italic text-[#e5ad20]">vida</span>
              , preparar para el{" "}
              <span className="italic text-[#e5ad20]">trabajo</span> y
              desarrollar para el{" "}
              <span className="italic text-[#e5ad20]">futuro</span>.
            </p>

            <figcaption className="mt-6 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[2px] text-[#f8f6f0]/60">
              <span className="h-px w-8 bg-[#e5ad20]/60" aria-hidden="true" />
              Nuestro propósito
              <span className="h-px w-8 bg-[#e5ad20]/60" aria-hidden="true" />
            </figcaption>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
