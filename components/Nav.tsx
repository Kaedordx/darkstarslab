"use client";

import { motion } from "framer-motion";
import { nav } from "@/lib/content";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-line bg-void px-6 py-4 md:px-10"
    >
      <a href="#top" className="font-display text-sm font-bold tracking-tight text-ink">
        DARKSTARS_
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-widest text-ink-dim transition-colors hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="bg-accent px-4 py-2 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
      >
        {nav.cta}
      </a>
    </motion.header>
  );
}
