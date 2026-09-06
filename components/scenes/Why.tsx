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
    <section className="relative bg-accent px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">
          {why.eyebrow}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10"
        >
          {why.points.map((point) => (
            <motion.div key={point.number} variants={item}>
              <span className="font-display text-5xl font-bold text-white/35 md:text-6xl">
                {point.number}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight text-white">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
