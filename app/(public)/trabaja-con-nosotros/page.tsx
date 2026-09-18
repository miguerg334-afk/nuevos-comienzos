import Footer from "@/components/Footer";
import TalentoForm from "@/components/TalentoForm";
import { ArrowDown, BookOpen, BriefcaseBusiness, Check, GraduationCap, HeartHandshake, Lightbulb } from "lucide-react";

const areas = ["Matemáticas", "Ciencias Naturales", "Lengua Castellana", "Inglés", "Ciencias Sociales", "Educación Física", "Tecnología e Informática", "Orientación escolar"];

export default function TrabajaConNosotros() {
  return (
    <main className="min-h-screen bg-[#f6f3eb] text-[#06141b]">
      <section className="relative overflow-hidden bg-[#061c24] px-6 pb-20 pt-40 text-white md:pb-24 md:pt-48">
        <div aria-hidden="true" className="absolute -right-28 -top-28 h-[520px] w-[520px] rounded-full border-[70px] border-white/[0.025]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div><p className="mb-6 inline-flex items-center gap-2 text-xs font-medium tracking-wider text-[#e5ad20]"><BriefcaseBusiness size={16} aria-hidden="true" /> Trabaja con nosotros</p><h1 className="max-w-2xl font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl">Tu vocación puede <span className="italic text-[#e5ad20]">cambiar una historia.</span></h1><p className="mt-7 max-w-lg leading-8 text-white/70">Queremos conocer a docentes y profesionales que compartan nuestra misión educativa. Aquí, enseñar también es acompañar, inspirar y abrir caminos.</p><a href="#postulacion" className="mt-8 inline-flex items-center gap-4 border-b border-[#e5ad20]/50 pb-2 text-sm font-semibold text-[#e5ad20] transition-colors hover:text-white">Quiero formar parte <ArrowDown size={16} aria-hidden="true" /></a></div>
          <div className="relative rounded-[28px] border border-white/15 bg-white/[0.035] p-8 sm:p-10"><span className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-[#e5ad20]/10"><BookOpen size={32} className="text-[#e5ad20]" strokeWidth={1.3} aria-hidden="true" /></span><p className="font-serif text-3xl leading-snug">El conocimiento se comparte.<br /><span className="italic text-[#e5ad20]">El propósito se contagia.</span></p><div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6"><span className="h-2 w-2 rounded-full bg-[#e5ad20]" /><p className="text-xs tracking-wide text-white/60">Nuevos Comienzos College · Campoalegre</p></div></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-14"><div className="grid gap-8 border-b border-[#06141b]/10 pb-14 md:grid-cols-3">{[{Icon:GraduationCap,titulo:"Enseñar con propósito",texto:"Formar para la vida, más allá del aula."},{Icon:HeartHandshake,titulo:"Acompañar con valores",texto:"Crecer juntos desde nuestros principios cristianos."},{Icon:Lightbulb,titulo:"Inspirar nuevos caminos",texto:"Preparar a los jóvenes para su futuro."}].map(({Icon,titulo,texto})=><div key={titulo} className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#b77908]/20 text-[#967026]"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span><div><h2 className="text-sm font-semibold">{titulo}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{texto}</p></div></div>)}</div></section>
      <section id="postulacion" className="mx-auto grid max-w-6xl scroll-mt-28 gap-10 px-6 pb-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <aside className="space-y-8"><div><p className="mb-4 text-xs font-semibold tracking-wider text-[#9b6c12]">Tu próximo paso</p><h2 className="font-serif text-4xl leading-tight">Hay un lugar para<br /><span className="italic text-[#9b6c12]">tu talento.</span></h2><p className="mt-5 text-sm leading-7 text-slate-600">Cuéntanos quién eres y qué te mueve a enseñar. Recibimos perfiles en las siguientes especialidades:</p></div><div className="rounded-2xl border border-[#ded7c8] bg-[#f0ece2] p-6 sm:p-8"><h3 className="mb-5 text-sm font-semibold">Especialidades convocadas</h3><ul className="grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-1">{areas.map(area=><li key={area} className="flex items-center gap-3 text-sm text-slate-600"><span className="h-1 w-1 shrink-0 rounded-full bg-[#a97d28]" />{area}</li>)}</ul></div><div className="px-1"><h3 className="mb-4 font-serif text-xl">Antes de comenzar</h3><ul className="space-y-3 text-sm text-slate-600"><li className="flex items-center gap-3"><Check size={16} className="text-[#9b6c12]" aria-hidden="true" /> Ten lista tu hoja de vida.</li><li className="flex items-start gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#9b6c12]" aria-hidden="true" /> Adjunta tu carta de recomendación pastoral.</li></ul></div></aside>
        <TalentoForm />
      </section>
      <Footer />
    </main>
  );
}
