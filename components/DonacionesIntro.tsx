import ScrollExpand from "./ScrollExpand";

export default function DonacionesIntro() {
  return (
    <section className="relative isolate bg-[#061c24]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-1/2 z-10 h-64 w-64 -translate-y-1/2 rounded-full border border-white/15 sm:h-96 sm:w-96" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-0 z-10 h-full w-px bg-white/20" />
      <ScrollExpand
        src="/img/img-donaciones.webp"
        alt="Comunidad de Nuevos Comienzos College"
        title="¿Cómo puedo apoyar?"
        resetScrollOnMount
      />
    </section>
  );
}
