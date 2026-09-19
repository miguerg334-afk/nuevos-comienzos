import { ArrowUpRight, BadgePercent, BookOpen, CalendarDays, Check, GraduationCap } from "lucide-react";
import PreMatricula from "./PreMatricula";

const instituciones = [
  "Liceo Cristiano Emanuel",
  "Colegio Gimnasio Nueva Colombia",
  "Institución Educativa Liceo Genios Huilenses",
];

export default function Costos() {
  return (
    <section id="costos" className="relative scroll-mt-28 overflow-hidden bg-[#f6f3eb] px-6 py-24 text-[#06141b] md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-16 h-96 w-96 rounded-full border border-[#b77908]/10" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 overflow-hidden rounded-[24px] border border-[#e5ad20]/25 bg-[#0b242c] p-6 text-white shadow-[0_20px_50px_-34px_rgba(6,20,27,0.7)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div>
            <p className="inline-flex rounded-full bg-[#e5ad20] px-3 py-1 text-sm font-bold text-[#06141b]">Admisiones abiertas</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">Cupos limitados. Asegura el tuyo. Da el primer paso hacia una educación que forma para la vida y prepara para el futuro.</p>
          </div>
          <div className="mt-5 shrink-0 sm:mt-0"><PreMatricula compact /></div>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b77908]/20 bg-[#e5ad20]/10 px-4 py-2 text-xs font-semibold text-[#805a13]"><GraduationCap size={16} aria-hidden="true" /> Admisiones · Nuevos Comienzos</span>
            <h2 className="font-serif text-4xl leading-[1.15] tracking-tight md:text-5xl">Un gran futuro<br /><span className="italic text-[#9b6c12]">comienza aquí.</span></h2>
            <p className="mt-6 max-w-md text-base leading-8 text-slate-600">Acompañamos a tu familia en el próximo paso. Conoce nuestros costos y beneficios y empieza a escribir una nueva historia con nosotros.</p>
            <div className="mt-8"><PreMatricula /></div>
            <p className="mt-4 text-base leading-6 text-slate-500">¿Más de un estudiante? Regístralos en una sola solicitud.</p>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-[#0b242c] p-7 text-white shadow-[0_24px_60px_-24px_rgba(6,20,27,0.4)] sm:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/[0.025]" />
            <div className="relative flex items-center justify-between gap-4 border-b border-white/15 pb-7"><div><p className="text-xs tracking-wider text-[#e5ad20]">Una inversión en su futuro</p><h3 className="mt-2 font-serif text-2xl">Costos y beneficios</h3></div><BookOpen className="h-8 w-8 shrink-0 text-[#e5ad20]" strokeWidth={1.4} aria-hidden="true" /></div>
            <div className="relative grid gap-8 py-9 sm:grid-cols-2 sm:gap-6">
              <div><p className="flex items-center gap-2 text-sm text-white/70"><GraduationCap size={17} aria-hidden="true" /> Matrícula</p><p className="mt-4 font-serif text-4xl tracking-tight sm:text-[42px]">$440.000</p><p className="mt-2 text-xs tracking-widest text-[#e5ad20]">COP</p></div>
              <div className="border-t border-white/15 pt-7 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"><p className="flex items-center gap-2 text-sm text-white/70"><CalendarDays size={17} aria-hidden="true" /> Pensión</p><p className="mt-4 font-serif text-4xl tracking-tight sm:text-[42px]">$400.000</p><p className="mt-2 text-xs tracking-widest text-[#e5ad20]">COP</p></div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/75"><BadgePercent size={19} className="shrink-0 text-[#e5ad20]" aria-hidden="true" /> Conoce el beneficio por institución de procedencia.</div>
          </div>
        </div>
        <div className="mt-14 grid overflow-hidden rounded-[24px] border border-[#d9cfb7] bg-white lg:grid-cols-[260px_1fr]">
          <div className="flex items-center gap-5 bg-[#eee6d3] p-8 lg:flex-col lg:items-start lg:justify-center"><span className="font-serif text-6xl tracking-tight text-[#775419]">10<span className="text-4xl">%</span></span><div><h3 className="font-semibold">Un beneficio especial</h3><p className="mt-1 text-base text-[#775419]">para tu nuevo comienzo</p></div></div>
          <div className="p-8 md:p-10"><p className="mb-5 text-base leading-6 text-slate-600">Descuento para estudiantes provenientes de estas instituciones:</p><ul className="space-y-4">{instituciones.map(nombre => <li key={nombre} className="flex items-start gap-3 text-base font-medium leading-6"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e5ad20]/15 text-[#8b6316]"><Check size={12} aria-hidden="true" /></span>{nombre}</li>)}</ul></div>
        </div>
        <aside className="mt-10 rounded-[24px] border border-[#d9cfb7] bg-white/70 p-7 md:p-9">
          <p className="max-w-4xl font-serif text-2xl leading-relaxed text-[#0b2832] md:text-3xl">“Una buena educación no solo prepara para aprobar materias; prepara para la vida, el propósito y el futuro.”</p>
          <div className="mt-6 grid gap-4 border-t border-[#0b2832]/10 pt-6 md:grid-cols-2">
            <p className="text-base leading-7 text-slate-600">Hay cosas en las que podemos ahorrar. La educación de nuestros hijos no debería ser una de ellas.</p>
            <p className="text-base leading-7 text-slate-600">Invertir hoy en educación es construir las oportunidades del mañana.</p>
          </div>
        </aside>
        <div className="mt-12 flex items-center gap-4 text-sm text-slate-600"><span className="h-px flex-1 bg-[#06141b]/10" /><p className="flex items-center gap-2 text-center">Tu próximo capítulo empieza con una decisión <ArrowUpRight className="hidden h-4 w-4 sm:block" aria-hidden="true" /></p><span className="h-px flex-1 bg-[#06141b]/10" /></div>
      </div>
    </section>
  );
}
