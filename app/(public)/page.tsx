
import Hero from "@/components/Hero";
import EnfoqueEducativo from "@/components/EnfoqueEducativo";
import Esencia from "@/components/Esencia";
import OfertaEducativa from "@/components/OfertaEducativa";
import Simbolos from "@/components/Simbolos";
import InspirationBanner from "@/components/InspirationBanner";
import Footer from "@/components/Footer";
import Costos from "@/components/Costos";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <EnfoqueEducativo />
      <Esencia />
      <OfertaEducativa />
      <Simbolos />
      <Costos />
      <InspirationBanner />
      <Footer />

      {/* Aquí iremos agregando los demás componentes después */}
      {/* <CitaBiblica /> */}
      {/* <OfertaEducativa /> */}
    </main>
  );
}
