"use client";
import Image from "next/image";

interface SimboloItem {
  titulo: string;
  descripcion: string;
  icono: (props: { size: number; color: string }) => React.ReactElement;
}

function IconoLibro({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconoCruz({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20M8 6h8" />
    </svg>
  );
}

function IconoPersonas({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconoPlaneta({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function Simbolos() {
  const caracteristicasIzquierda: SimboloItem[] = [
    {
      titulo: "El libro",
      descripcion:
        "Representa la búsqueda de la sabiduría y el conocimiento continuo.",
      icono: IconoLibro,
    },
    {
      titulo: "La cruz",
      descripcion:
        "Representa a Cristo como el fundamento inquebrantable de nuestra fe y formación.",
      icono: IconoCruz,
    },
  ];

  const caracteristicasDerecha: SimboloItem[] = [
    {
      titulo: "Las personas",
      descripcion:
        "Representan el crecimiento integral de cada estudiante en sabiduría, carácter y valores.",
      icono: IconoPersonas,
    },
    {
      titulo: "El planeta",
      descripcion:
        "Representa nuestra responsabilidad de impactar y servir al mundo con propósito.",
      icono: IconoPlaneta,
    },
  ];

  return (
    <section className="relative w-full flex items-center justify-center py-14 sm:py-16 md:py-24 lg:py-32 bg-[#fdfcfa] overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 900px 550px at 50% -10%, rgba(255, 149, 0, 0.14), transparent 70%),
            radial-gradient(ellipse 700px 450px at 15% 100%, rgba(255, 61, 113, 0.08), transparent 65%),
            radial-gradient(ellipse 700px 450px at 85% 100%, rgba(0, 168, 150, 0.08), transparent 65%),
            linear-gradient(180deg, #ffffff 0%, #fdfbf7 50%, #ffffff 100%)
          `,
        }}
      >
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full opacity-[0.12]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#ff9500" strokeWidth="1">
            <line x1="600" y1="-100" x2="150" y2="900" />
            <line x1="600" y1="-100" x2="420" y2="900" />
            <line x1="600" y1="-100" x2="600" y2="900" />
            <line x1="600" y1="-100" x2="780" y2="900" />
            <line x1="600" y1="-100" x2="1050" y2="900" />
          </g>
        </svg>
      </div>

      <div className="relative z-20 w-full max-w-[1300px] px-5 sm:px-8 mx-auto flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-10 md:mb-16 lg:mb-24 max-w-xl">
          <span className="inline-block text-[#e5820a] text-[11px] sm:text-xs font-bold tracking-[3px] uppercase mb-3">
            Identidad institucional
          </span>
          <h2 className="font-black italic text-[#0c1a24] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-3 tracking-tight">
            Símbolos del{" "}
            <span className="bg-gradient-to-r from-[#e5820a] to-[#e0295f] bg-clip-text text-transparent">
              Colegio
            </span>
          </h2>
          <p className="text-[#0c1a24]/60 font-medium text-sm sm:text-base md:text-lg">
            Cuatro figuras, una misma historia de fe y formación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 sm:gap-10 md:gap-12 lg:gap-6 items-center w-full">
          <div className="order-2 lg:order-1 flex flex-col gap-6 sm:gap-8 lg:gap-14">
            {caracteristicasIzquierda.map((item, index) => (
              <TarjetaSimbolo
                key={`izq-${index}`}
                item={item}
                lado="izquierda"
                acento={index === 0 ? "#e5820a" : "#00a896"}
              />
            ))}
          </div>

          <div className="order-1 lg:order-2 flex justify-center my-2 lg:my-0">
            <div className="relative w-[160px] h-[160px] xs:w-[180px] xs:h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]">
              <div className="absolute inset-[-14%] rounded-full bg-gradient-to-br from-[#e5820a]/15 via-transparent to-[#00a896]/15 blur-2xl pointer-events-none" />
              <div className="absolute inset-[-10%] rounded-full border border-[#e5820a]/25 pointer-events-none" />
              <div className="absolute inset-[-4%] rounded-full border border-[#0c1a24]/10 pointer-events-none" />
              <Image
                src="/img/escudo.webp"
                alt="Escudo Oficial"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 240px, (max-width: 1024px) 300px, 360px"
                className="object-contain drop-shadow-[0_10px_30px_rgba(229,130,10,0.18)] relative z-10 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:drop-shadow-[0_20px_40px_rgba(229,130,10,0.32)] cursor-pointer"
                priority
              />
            </div>
          </div>

          <div className="order-3 lg:order-3 flex flex-col gap-6 sm:gap-8 lg:gap-14">
            {caracteristicasDerecha.map((item, index) => (
              <TarjetaSimbolo
                key={`der-${index}`}
                item={item}
                lado="derecha"
                acento={index === 0 ? "#e0295f" : "#e5820a"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TarjetaSimbolo({
  item,
  lado,
  acento = "#e5820a",
}: {
  item: SimboloItem;
  lado: "izquierda" | "derecha";
  acento?: string;
}) {
  const esIzquierda = lado === "izquierda";
  const Icono = item.icono;

  return (
    <div
      className={`flex flex-col items-center text-center gap-3 ${
        esIzquierda
          ? "lg:items-end lg:text-right"
          : "lg:items-start lg:text-left"
      }`}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${acento}18` }}
      >
        <Icono size={22} color={acento} />
      </div>

      <h3 className="font-extrabold text-[#0c1a24] text-lg sm:text-xl md:text-2xl tracking-tight">
        {item.titulo}
      </h3>

      <div
        className="rounded-2xl px-4 py-3 sm:px-0 sm:py-0 sm:bg-transparent w-full sm:w-auto"
        style={{ backgroundColor: `${acento}0d` }}
      >
        <p className="text-[#0c1a24]/65 text-sm md:text-base leading-relaxed max-w-[34ch] sm:max-w-[32ch] lg:max-w-[26ch] mx-auto sm:mx-0">
          {item.descripcion}
        </p>
      </div>

      <div
        className={`flex items-center gap-2 w-full max-w-[200px] lg:max-w-none mt-1 ${
          esIzquierda ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <span
          className="h-px flex-1"
          style={{
            background: `linear-gradient(to right, transparent, ${acento}90, transparent)`,
          }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: acento }}
        />
        <span
          className="h-px flex-1 lg:hidden"
          style={{
            background: `linear-gradient(to left, transparent, ${acento}90, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
