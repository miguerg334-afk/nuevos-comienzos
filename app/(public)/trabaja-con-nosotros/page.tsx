import Footer from "@/components/Footer";
import type { Metadata } from "next";
import TalentoForm from "@/components/TalentoForm";
import { ArrowDown, BriefcaseBusiness, Check, GraduationCap, HeartHandshake, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description: "Postúlate para formar parte de Nuevos Comienzos College. Convocatoria para docentes y profesionales en Campoalegre.",
  alternates: { canonical: "/trabaja-con-nosotros" },
  openGraph: { images: [{ url: "/img/trabaja-con-nosotros.webp", width: 1920, height: 1440, alt: "Trabaja con Nuevos Comienzos College" }] },
};

const areas = ["Matemáticas", "Ciencias Naturales", "Lengua Castellana", "Inglés", "Ciencias Sociales", "Educación Física", "Tecnología e Informática", "Orientación escolar"];

export default function TrabajaConNosotros() {
  return (
    <main className="min-h-screen bg-[#f6f3eb] text-[#06141b]">
      <section className="relative isolate min-h-[660px] overflow-hidden bg-[#061c24] px-6 pb-24 pt-40 text-white md:min-h-[720px] md:pb-28 md:pt-48">
        <img src="/img/trabaja-con-nosotros.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_78%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,16,21,0.64),rgba(3,16,21,0.34)_46%,rgba(3,16,21,0.08)_72%)]" />
        <div aria-hidden="true" className="absolute -right-28 -top-28 h-[520px] w-[520px] rounded-full border-[70px] border-white/[0.08]" />
        <div className="relative mx-auto max-w-6xl">
          <div><p className="mb-6 inline-flex items-center gap-2 text-xs font-medium tracking-wider text-[#e5ad20]"><BriefcaseBusiness size={16} aria-hidden="true" /> Trabaja con nosotros</p><h1 className="max-w-2xl font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl">Tu vocación puede <span className="italic text-[#e5ad20]">cambiar una historia.</span></h1><p className="mt-7 max-w-lg leading-8 text-white/70">Queremos conocer a docentes y profesionales que compartan nuestra misión educativa. Aquí, enseñar también es acompañar, inspirar y abrir caminos.</p><a href="#postulacion" className="mt-8 inline-flex items-center gap-4 border-b border-[#e5ad20]/50 pb-2 text-sm font-semibold text-[#e5ad20] transition-colors hover:text-white">Quiero ser parte<ArrowDown size={16} aria-hidden="true" /></a></div>
        </div>
        <div className="absolute bottom-10 right-10 hidden max-w-sm text-right lg:block">
          <p className="font-serif text-3xl leading-snug text-white">El conocimiento se<br />comparte.</p>
          <p className="mt-2 font-serif text-2xl italic text-[#e5ad20]">El propósito se contagia.</p>
          <div className="mt-6 flex items-center justify-end gap-3 text-xs tracking-wide text-white/60"><p>Nuevos Comienzos College · Campoalegre</p><span className="h-2 w-2 rounded-full bg-[#e5ad20]" /></div>
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
