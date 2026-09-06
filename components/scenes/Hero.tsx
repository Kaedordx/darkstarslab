"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import { hero } from "@/lib/content";
import { usePrefersReducedMotion, useIsTouchDevice } from "@/lib/useReducedMotion";

const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const [showCue, setShowCue] = useState(true);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    // Mount the WebGL canvas on the next tick so it doesn't block first paint.
    const id = requestAnimationFrame(() => setCanvasVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setShowCue(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseDelay = reducedMotion ? 0 : 900;

  return (
    <section
      id="top"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-void"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: canvasVisible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0.3 : 1.4, ease: "easeOut" }}
      >
        {canvasVisible && (
          <HeroCanvas
            enableParallax={!isTouch && !reducedMotion}
            particleCount={isTouch ? 1200 : 4000}
            reducedDetail={isTouch}
          />
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-void/20 to-void" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <TextReveal
          as="h1"
          text={hero.headline}
          delay={baseDelay}
          className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: (baseDelay + 900) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 max-w-2xl text-base text-ink-dim sm:text-lg"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: (baseDelay + 1150) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] accent-glow"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#services"
            className="rounded-full border border-ink/20 px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/50"
          >
            {hero.secondaryCta}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-ink-dim"
        animate={{
          opacity: showCue ? 1 : 0,
          y: reducedMotion ? 0 : [0, 8, 0],
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {hero.scrollCue}
      </motion.div>
    </section>
  );
}
