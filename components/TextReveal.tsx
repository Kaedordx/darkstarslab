"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  staggerMs?: number;
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: (staggerMs: number) => ({
    transition: { staggerChildren: staggerMs / 1000 },
  }),
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(10px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Splits text into words, revealing each with a rise + blur-to-focus
 * motion — the manual, open-source stand-in for GSAP SplitText.
 */
export default function TextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  staggerMs = 60,
  once = true,
}: TextRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        aria-label={text}
        style={{ display: "inline" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.6 }}
        variants={container}
        custom={staggerMs}
        transition={{ delayChildren: delay / 1000 }}
      >
        {words.map((w, i) => (
          <span className="reveal-word" key={`${w}-${i}`} aria-hidden="true">
            <motion.span
              className="reveal-word-inner"
              variants={reducedMotion ? wordReduced : word}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
