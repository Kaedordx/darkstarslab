"use client";

import { motion, type Variants } from "framer-motion";
import SceneSeam from "@/components/SceneSeam";
import { why } from "@/lib/content";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Why() {
  return (
    <section className="relative overflow-hidden bg-[#030304] px-6 py-28 md:px-12 md:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[60vw] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {why.eyebrow}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10"
        >
          {why.points.map((point) => (
            <motion.div key={point.number} variants={item}>
              <span className="font-display text-6xl font-medium text-accent/80 md:text-7xl">
                {point.number}
              </span>
              <h3 className="mt-6 font-display text-xl text-ink">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SceneSeam toColor="#030304" />
    </section>
  );
}
