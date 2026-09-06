"use client";

import TextReveal from "@/components/TextReveal";
import { closing, contactEmail } from "@/lib/content";

export default function Closing() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] flex-col justify-between bg-[#030304] px-6 py-28 md:px-12"
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <TextReveal
          as="h2"
          text={closing.headline}
          className="max-w-3xl font-display text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl"
        />

        <p className="mt-6 text-base text-ink-dim">{contactEmail}</p>

        <a
          href={`mailto:${contactEmail}`}
          className="mt-10 rounded-full bg-accent px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] accent-glow"
        >
          {closing.cta}
        </a>
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink-dim md:flex-row">
        <p>{closing.footerNote}</p>
        <div className="flex gap-6">
          {closing.footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
