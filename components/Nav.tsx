"use client";

import { motion } from "framer-motion";
import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-6"
    >
      <a
        href="#top"
        className="font-display text-sm tracking-[0.25em] text-ink"
      >
        {nav.wordmark}
      </a>

      <nav className="hidden items-center gap-10 md:flex">
        {nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-ink-dim transition-colors hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="rounded-full border border-accent/40 px-5 py-2 text-sm text-ink transition-colors hover:bg-accent hover:text-black"
      >
        {nav.cta}
      </a>
    </motion.header>
  );
}
