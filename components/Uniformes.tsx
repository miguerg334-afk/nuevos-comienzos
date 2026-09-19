import { Dumbbell, Shirt } from "lucide-react";
import UniformesScrollExpand from "./UniformesScrollExpand";

const uniformes = [
  {
    numero: "01",
    nombre: "Uniforme de diario",
    uso: "Para ceremonias y actos especiales",
    descripcion:
      "Una presentación sobria que lleva los colores y el escudo del colegio. La propuesta muestra una camiseta tipo polo blanca con detalles en azul petróleo y amarillo dorado, acompañada de pantalón azul petróleo.",
    detalle: "Cuello y laterales con los colores institucionales · Escudo bordado",
    Icono: Shirt,
    fondo: "bg-[#edf3f3]",
    acento: "text-[#1b5260]",
  },
  {
    numero: "02",
    nombre: "Uniforme de educación física",
    uso: "Para actividad física y deportiva",
    descripcion:
      "Pensado para moverse con comodidad. La camiseta combina azul petróleo, blanco y amarillo dorado; se complementa con pantalón deportivo y pantaloneta.",
    detalle: "Tela deportiva transpirable · Pantalón deportivo y pantaloneta",
    Icono: Dumbbell,
    fondo: "bg-[#fff3d9]",
    acento: "text-[#a46c00]",
  },
];

export default function Uniformes() {
  return (
    <section
      id="uniformes"
      aria-labelledby="uniformes-titulo"
      className="scroll-mt-28 overflow-hidden bg-[#f8f7f2] px-6 py-20 text-[#0b2832] md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#a46c00]">
              Identidad que nos acompaña
            </p>
            <h2 id="uniformes-titulo" className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Nuestros <span className="italic text-[#a46c00]">uniformes</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-slate-600">
            Dos propuestas para cada momento de la vida escolar, con los colores y el escudo de Nuevos Comienzos College.
          </p>
        </div>

        <UniformesScrollExpand />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {uniformes.map(({ numero, nombre, uso, descripcion, detalle, Icono, fondo, acento }) => (
            <article key={numero} className={`rounded-[26px] p-7 sm:p-9 ${fondo}`}>
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80">
                  <Icono size={23} strokeWidth={1.6} className={acento} aria-hidden="true" />
                </span>
                <span className={`font-serif text-4xl opacity-35 ${acento}`} aria-hidden="true">{numero}</span>
              </div>
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.12em] ${acento}`}>{uso}</p>
              <h3 className="font-serif text-3xl">{nombre}</h3>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-700">{descripcion}</p>
              <p className="mt-7 border-t border-[#0b2832]/10 pt-5 text-base font-medium leading-6 text-slate-600">
                {detalle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
