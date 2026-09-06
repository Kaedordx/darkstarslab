"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import Starfield from "@/components/Starfield";
import { hero } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setShowCue(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseDelay = reducedMotion ? 0 : 500;

  return (
    <section
      id="top"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-void"
    >
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: baseDelay / 1000 }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-accent"
        >
          Darkstars Lab
        </motion.p>

        <TextReveal
          as="h1"
          text={hero.headline}
          delay={baseDelay + 150}
          className="font-display text-4xl italic font-normal leading-[1.15] text-ink sm:text-5xl md:text-6xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: (baseDelay + 750) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 max-w-xl text-base text-ink-dim sm:text-lg"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: (baseDelay + 950) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
        >
          <a
            href="#contact"
            className="bg-accent px-8 py-3 text-sm text-black transition-opacity hover:opacity-90"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#services"
            className="border-b border-ink/30 pb-0.5 text-sm text-ink-dim transition-colors hover:border-accent hover:text-ink"
          >
            {hero.secondaryCta}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-ink-faint"
        animate={{
          opacity: showCue ? 1 : 0,
          y: reducedMotion ? 0 : [0, 6, 0],
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {hero.scrollCue}
      </motion.div>
    </section>
  );
}
