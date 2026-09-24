import Footer from "@/components/Footer";
import type { Metadata } from "next";
import DonacionForm from "@/components/DonacionForm";
import DonacionesIntro from "@/components/DonacionesIntro";
import { ArrowUpRight, Globe2, Heart, HeartHandshake, Laptop, Landmark, ReceiptText, ShieldCheck, Sprout, Wifi } from "lucide-react";

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
        <section aria-labelledby="datos-bancarios" className="relative mt-20 overflow-hidden rounded-[32px] bg-[#09252e] p-6 text-white shadow-[0_28px_70px_-38px_rgba(6,30,39,0.65)] sm:p-9 md:mt-28 lg:p-12">
          <div aria-hidden="true" className="absolute -right-28 -top-32 h-96 w-96 rounded-full border border-white/[0.06]" />
          <div aria-hidden="true" className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#e5ad20]/10" />

          <div className="relative flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row md:items-end">
            <div className="flex items-start gap-5 sm:gap-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#e5ad20] text-[#09252e] shadow-[0_12px_30px_-12px_rgba(229,173,32,0.8)] sm:h-16 sm:w-16">
                <Landmark size={28} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5ad20]">Datos para realizar tu aporte</p>
                <h2 id="datos-bancarios" className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Tu apoyo puede empezar <span className="italic text-[#e5ad20]">desde cualquier lugar.</span>
                </h2>
              </div>
            </div>
            <div className="flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-6 text-white/70 backdrop-blur-sm">
              <ShieldCheck className="shrink-0 text-[#e5ad20]" size={22} strokeWidth={1.5} aria-hidden="true" />
              Cuenta oficial de la Fundación Social Nuevos Comienzos
            </div>
          </div>

          <div className="relative mt-8 grid gap-6 lg:grid-cols-2">
            <article className="group relative flex min-h-[330px] transform-gpu flex-col overflow-hidden rounded-[26px] border border-white/20 bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead5_100%)] p-6 text-[#09252e] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[#e5ad20]/60 hover:shadow-[0_32px_60px_-22px_rgba(0,0,0,0.55)] sm:aspect-[1.48/1] sm:min-h-0 sm:p-8">
              <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[42px] border-[#dca614]/[0.07] transition-transform duration-500 group-hover:scale-105" />
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-24 w-full bg-[linear-gradient(90deg,rgba(220,166,20,0.06),transparent)]" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b6c12]">Transferencia nacional</p>
                  <h3 className="mt-1 font-semibold">Desde Colombia</h3>
                </div>
                <p className="font-serif text-lg font-semibold tracking-wide">Bancolombia</p>
              </div>

              <div className="relative mt-5 flex items-center gap-4">
                <span aria-hidden="true" className="grid h-10 w-13 grid-cols-3 grid-rows-2 overflow-hidden rounded-lg border border-[#806b2f]/30 bg-[linear-gradient(135deg,#e7c866,#b8922e)] shadow-sm">
                  {[...Array(6)].map((_, index) => <span key={index} className="border-b border-r border-[#725d25]/25" />)}
                </span>
                <Wifi className="rotate-90 text-[#9b6c12]/70" size={27} strokeWidth={1.4} aria-hidden="true" />
              </div>

              <div className="relative mt-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">Número de cuenta</p>
                <p className="mt-1 font-serif text-[clamp(1.65rem,3vw,2.15rem)] tracking-[0.08em] text-[#8b6110]">459-000016-72</p>
              </div>

              <dl className="relative mt-auto grid grid-cols-[1fr_auto] items-end gap-5 pt-5">
                <div><dt className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">Titular</dt><dd className="mt-1 max-w-[26ch] text-sm font-semibold leading-5">Fundación Social Nuevos Comienzos</dd><dd className="mt-0.5 text-[11px] text-slate-500">NIT: 902091463</dd></div>
                <div className="text-right"><dt className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">Tipo</dt><dd className="mt-1 text-sm font-medium">Ahorros</dd></div>
              </dl>
            </article>

            <article className="group relative flex min-h-[350px] transform-gpu flex-col overflow-hidden rounded-[26px] border border-[#7f9ec4]/35 bg-[linear-gradient(135deg,#284b70_0%,#152d50_55%,#0e2341_100%)] p-6 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[#e5ad20]/55 hover:shadow-[0_32px_65px_-22px_rgba(4,13,30,0.9)] sm:aspect-[1.48/1] sm:min-h-0 sm:p-8">
              <div aria-hidden="true" className="absolute -right-16 -top-20 h-60 w-60 rounded-full border-[40px] border-[#e5ad20]/[0.06] transition-transform duration-500 group-hover:scale-105" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.04)_50%,transparent_70%)]" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e5ad20]">Transferencia internacional</p>
                  <h3 className="mt-1 font-semibold">Fuera de Colombia</h3>
                </div>
                <div className="flex items-center gap-2 text-white/80"><Globe2 size={18} strokeWidth={1.5} aria-hidden="true" /><span className="font-serif text-lg">Bancolombia S.A.</span></div>
              </div>

              <div className="relative mt-5 flex items-center gap-4">
                <span aria-hidden="true" className="grid h-10 w-13 grid-cols-3 grid-rows-2 overflow-hidden rounded-lg border border-[#efd271]/30 bg-[linear-gradient(135deg,#efd271,#a67d15)] shadow-sm">
                  {[...Array(6)].map((_, index) => <span key={index} className="border-b border-r border-[#715819]/30" />)}
                </span>
                <Wifi className="rotate-90 text-[#e5ad20]/80" size={27} strokeWidth={1.4} aria-hidden="true" />
              </div>

              <div className="relative mt-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">Cuenta de ahorros</p>
                <p className="mt-1 font-serif text-[clamp(1.65rem,3vw,2.15rem)] tracking-[0.08em] text-[#e5ad20]">459-000016-72</p>
              </div>

              <dl className="relative mt-auto grid grid-cols-[1fr_auto_auto] items-end gap-4 pt-5">
                <div><dt className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Beneficiario</dt><dd className="mt-1 max-w-[24ch] text-sm font-semibold leading-5 text-white/90">Fundación Social Nuevos Comienzos</dd></div>
                <div><dt className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">SWIFT</dt><dd className="mt-1 font-serif text-base tracking-wider text-[#e5ad20]">COLOCOBM</dd></div>
                <div className="text-right"><dt className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">País</dt><dd className="mt-1 text-sm font-medium text-white/90">Colombia</dd></div>
              </dl>
            </article>
          </div>
          <p className="relative mt-7 text-center text-xs leading-6 text-white/55">Realiza tu transferencia directamente utilizando los datos correspondientes a tu ubicación.</p>
        </section>
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
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-700">Cuando donas a la Fundación Nuevos Comienzos, cumples los requisitos establecidos por la legislación colombiana para obtener beneficios tributarios en el impuesto sobre la renta.</p>
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
