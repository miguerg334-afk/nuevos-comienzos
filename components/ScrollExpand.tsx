"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start || 0.000001), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

type ScrollExpandProps = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  resetScrollOnMount?: boolean;
};

export default function ScrollExpand({ src, alt, title, className = "", resetScrollOnMount = false }: ScrollExpandProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (resetScrollOnMount) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [resetScrollOnMount]);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;
    const eased = smoothstep(0, 1, progress);
    const inset = 9 * (1 - eased);
    frame.style.clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${34 * (1 - eased)}px)`;
    image.style.transform = `scale(${1.12 - 0.12 * eased})`;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    let stageHeight = 0;
    let animationFrame = 0;
    let target = 0;
    let current = 0;
    const measure = () => {
      stageHeight = Math.min(Math.max(window.innerHeight * 0.72, 420), 620);
      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * 1.34}px`;
    };
    const getProgress = () => clamp(-track.getBoundingClientRect().top / (stageHeight * 0.34), 0, 1);
    const render = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0004) current = target;
      applyProgress(current);
      if (current !== target) animationFrame = requestAnimationFrame(render);
      else animationFrame = 0;
    };
    const onScroll = () => { target = getProgress(); if (!animationFrame) animationFrame = requestAnimationFrame(render); };
    const onResize = () => { measure(); target = getProgress(); current = target; applyProgress(current); };
    measure();
    target = getProgress();
    current = target;
    applyProgress(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [applyProgress]);

  return (
    <div ref={trackRef} className={`relative h-[96.5svh] min-h-[563px] max-h-[831px] ${className}`.trim()}>
      <div ref={stageRef} className="sticky top-0 h-[72svh] min-h-[420px] max-h-[620px] overflow-hidden">
        <div ref={frameRef} className="absolute inset-0 overflow-hidden [clip-path:inset(9%_9%_9%_9%_round_34px)] [will-change:clip-path]">
          <img ref={imageRef} src={src} alt={alt} draggable={false} className="h-full w-full origin-center object-cover object-center [will-change:transform]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,28,36,0.72),rgba(6,28,36,0.18)_58%,rgba(6,28,36,0.52))]" />
          {title && (
            <div className="absolute inset-0 flex items-center px-7 sm:px-12 lg:px-[clamp(3rem,10vw,12rem)]">
              <h1 className="max-w-[12ch] font-serif text-5xl leading-[0.95] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.58)] sm:text-6xl lg:text-8xl">
                {title}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
