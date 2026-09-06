"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import Marquee from "@/components/Marquee";
import { hero, ticker } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const baseDelay = reducedMotion ? 0 : 400;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-void pt-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 hidden origin-left -rotate-90 whitespace-nowrap text-xs uppercase tracking-[0.4em] text-ink-faint md:block"
      >
        South African Digital Studio
      </span>

      <div className="relative flex flex-1 items-center px-6 md:pl-24 md:pr-16">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: baseDelay / 1000 }}
            className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent"
          >
            <span className="inline-block h-2 w-2 bg-accent" />
            Darkstars Lab
          </motion.p>

          <TextReveal
            as="h1"
            text={hero.headline}
            delay={baseDelay + 100}
            className="font-display text-[13vw] font-bold uppercase leading-[0.92] tracking-tight text-ink sm:text-[9vw] lg:text-[6.5vw]"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: (baseDelay + 650) / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 max-w-md text-sm leading-relaxed text-ink-dim sm:text-base"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: (baseDelay + 850) / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="bg-accent px-7 py-3.5 text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-85"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#services"
              className="flex items-center gap-2 px-1 py-3.5 text-sm uppercase tracking-wide text-ink transition-colors hover:text-accent"
            >
              {hero.secondaryCta}
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <Marquee items={ticker} />
    </section>
  );
}
