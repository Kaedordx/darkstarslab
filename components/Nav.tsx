"use client";

import { motion } from "framer-motion";
import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12"
    >
      <a href="#top" className="text-xs tracking-[0.3em] text-ink">
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
        className="border-b border-transparent text-sm text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {nav.cta}
      </a>
    </motion.header>
  );
}
