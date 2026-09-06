"use client";

import { motion, type Variants } from "framer-motion";
import { why } from "@/lib/content";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Why() {
  return (
    <section className="relative border-t border-line px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {why.eyebrow}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="mt-12"
        >
          {why.points.map((point) => (
            <motion.div
              key={point.number}
              variants={item}
              className="flex flex-col gap-2 border-t border-line py-8 last:border-b sm:flex-row sm:items-baseline sm:gap-10"
            >
              <span className="font-display text-lg text-accent sm:w-12 sm:shrink-0">
                {point.number}
              </span>
              <h3 className="font-display text-xl text-ink sm:w-72 sm:shrink-0">
                {point.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
