import Footer from "@/components/Footer";
import type { Metadata } from "next";
import DonacionForm from "@/components/DonacionForm";
import DonacionesIntro from "@/components/DonacionesIntro";
import { ArrowUpRight, Heart, HeartHandshake, Laptop, ReceiptText, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "¿Cómo puedo apoyar?",
  description: "Conoce las formas de apoyar a Nuevos Comienzos College y contribuir a nuevas oportunidades educativas en Campoalegre.",
  alternates: { canonical: "/donativos" },
  openGraph: { images: [{ url: "/img/img-donaciones.webp", width: 1200, height: 675, alt: "Apoya a Nuevos Comienzos College" }] },
};

const opciones = [
  { Icon: Laptop, titulo: "Equipa un sueño", descripcion: "Dona mobiliario y equipos.", detalle: "Un computador, un pupitre o un libro pueden abrir un mundo de posibilidades.", categoria: "Recursos que abren caminos", color: "bg-[#eef1f3]", iconColor: "bg-[#dce5eb] text-[#355267]" },
  { Icon: Heart, titulo: "Invierte en una vida", descripcion: "Apadrina un estudiante.", detalle: "Acompaña una historia y sé parte de su oportunidad de aprender y crecer.", categoria: "Personas que dejan huella", color: "bg-[#f5ede7]", iconColor: "bg-[#edddd2] text-[#89553e]" },
  { Icon: Sprout, titulo: "Haz crecer una oportunidad", descripcion: "Apoya nuestros programas sociales.", detalle: "Ayúdanos a llevar la educación y el acompañamiento a más historias de vida.", categoria: "Ideas que transforman", color: "bg-[#edf1e9]", iconColor: "bg-[#dce5d4] text-[#506343]" },
];

export default function Donativos() {
  return (
    <main className="min-h-screen bg-[#fbf9f4] text-[#06141b]">
      <DonacionesIntro />
      <section id="formas-de-aportar" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-xs font-semibold tracking-wider text-[#a37017]">Tres formas de dejar huella</p><h2 className="font-serif text-4xl leading-tight md:text-5xl">Cada aporte tiene<br /><span className="italic text-[#9b6c12]">una historia por delante.</span></h2></div><p className="max-w-xs text-sm leading-7 text-slate-600">Elige la forma de sumarte que más conecta contigo. Tú puedes ser parte de ese comienzo.</p></div>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">{opciones.map(({ Icon, titulo, descripcion, detalle, categoria, color, iconColor }, index) => <article key={titulo} className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-[#06141b]/5 p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#06141b]/5 sm:p-10 lg:p-8 ${color}`}><div className="mb-8 flex items-center justify-between"><span className={`grid h-14 w-14 place-items-center rounded-2xl ${iconColor}`}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></span><span className="font-serif text-5xl text-[#06141b]/15" aria-hidden="true">0{index + 1}</span></div><p className="mb-3 text-xs font-medium tracking-wide text-slate-500">{categoria}</p><h3 className="font-serif text-3xl leading-tight">{titulo}</h3><p className="mt-4 font-medium leading-7">{descripcion}</p><p className="mt-2 max-w-sm text-sm leading-7 text-slate-600">{detalle}</p><div className="mt-auto pt-8"><DonacionForm modalidad={titulo} /></div></article>)}</div>
        <section aria-labelledby="por-que-donar" className="mt-20 md:mt-28">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs font-semibold tracking-wider text-[#a37017]">El sentido de tu aporte</p>
            <h2 id="por-que-donar" className="font-serif text-4xl leading-tight md:text-5xl">¿Por qué <span className="italic text-[#9b6c12]">donar?</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[28px] bg-[#eaf0ee] p-8 sm:p-10">
              <div className="mb-8 flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-[#28545a]"><HeartHandshake size={27} strokeWidth={1.5} aria-hidden="true" /></span><span className="font-serif text-5xl text-[#28545a]/20" aria-hidden="true">01</span></div>
              <h3 className="max-w-sm font-serif text-3xl leading-tight">Tu donación puede cambiar una historia.</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-700">Se transforma en oportunidades de educación, crecimiento y desarrollo, dando un nuevo propósito a tus recursos y ayudando a construir un nuevo comienzo.</p>
            </article>
            <article className="rounded-[28px] bg-[#f4efdf] p-8 sm:p-10">
              <div className="mb-8 flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-[#8a6b20]"><ReceiptText size={27} strokeWidth={1.5} aria-hidden="true" /></span><span className="font-serif text-5xl text-[#8a6b20]/20" aria-hidden="true">02</span></div>
              <h3 className="max-w-sm font-serif text-3xl leading-tight">Tu donación también puede generar beneficios tributarios.</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-700">Las donaciones a la Fundación Nuevos Comienzos pueden dar lugar a beneficios en el impuesto sobre la renta, siempre que la Fundación y la donación cumplan los requisitos de la legislación colombiana. Consulta con la Fundación la certificación correspondiente.</p>
              <a href="https://www.dian.gov.co/impuestos/sociedades/Regimen-Tributario-Especial-RTE/Preguntas_Frecuentes/Paginas/default.aspx" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#765918] underline underline-offset-4 hover:text-[#4d3810]">Conoce los requisitos de la DIAN <ArrowUpRight size={15} aria-hidden="true" /></a>
            </article>
          </div>
        </section>
        <div className="mt-16 rounded-[28px] bg-[#0b242c] p-8 text-white md:p-12"><div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-center"><p className="font-serif text-3xl">Un mismo propósito.<br /><span className="italic text-[#e5ad20]">Muchos nuevos comienzos.</span></p><ArrowUpRight size={36} strokeWidth={1} className="text-[#e5ad20]" aria-hidden="true" /></div><div className="grid gap-6 pt-8 text-sm text-white/80 md:grid-cols-3">{["Formar para la vida.", "Preparar para el trabajo.", "Desarrollar para el futuro."].map((text,i)=><p key={text} className="flex items-center gap-4"><span className="text-xs text-[#e5ad20]">0{i+1}</span>{text}</p>)}</div></div>
        <p className="mx-auto mt-8 max-w-lg text-center text-xs leading-6 text-slate-500">Por ahora, podemos coordinar tu aporte a través del formulario. Los pagos en línea estarán disponibles próximamente.</p>
      </section>
      <Footer />
    </main>
  );
}
