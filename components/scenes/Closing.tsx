"use client";

import TextReveal from "@/components/TextReveal";
import { closing, contactEmail } from "@/lib/content";

export default function Closing() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] flex-col justify-between border-t border-line bg-void px-6 py-28 md:px-12"
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <TextReveal
          as="h2"
          text={closing.headline}
          className="max-w-2xl font-display italic text-3xl font-normal leading-tight text-ink sm:text-4xl md:text-5xl"
        />

        <p className="mt-6 text-sm text-ink-dim">{contactEmail}</p>

        <a
          href={`mailto:${contactEmail}`}
          className="mt-10 bg-accent px-8 py-3 text-sm text-black transition-opacity hover:opacity-90"
        >
          {closing.cta}
        </a>
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-ink-faint md:flex-row">
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
