"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export default function UniformesScrollExpand() {
  const section = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start 78%", "end 34%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, mass: 0.22 });
  const width = useTransform(progress, [0, 1], ["84%", "100%"]);
  const borderRadius = useTransform(progress, [0, 1], ["28px", "8px"]);
  const lift = useTransform(progress, [0, 1], [0, -8]);

  return (
    <div ref={section} className="mt-10 h-[118vh] min-h-[620px] md:h-[132vh] md:min-h-[760px]">
      <div className="sticky top-24 flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <motion.div
          style={reduceMotion ? undefined : { width, borderRadius, y: lift }}
          className="relative w-full overflow-hidden border border-[#d9e1dc] bg-white p-2 shadow-[0_30px_70px_-38px_rgba(6,30,39,0.48)] sm:p-4"
        >
          <Image
            src="/img/uniformes-con-escudo.png"
            alt="Propuesta de uniforme de diario con polo blanco y pantalón azul petróleo; uniforme deportivo azul petróleo, blanco y amarillo con pantalón deportivo y pantaloneta"
            width={1607}
            height={979}
            sizes="(max-width: 768px) 100vw, 1152px"
            className="h-auto w-full rounded-[16px]"
            priority={false}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/70" />
        </motion.div>
      </div>
    </div>
  );
}
