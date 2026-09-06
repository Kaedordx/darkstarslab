"use client";

import TextReveal from "@/components/TextReveal";
import Marquee from "@/components/Marquee";
import { closing, contactEmail, ticker } from "@/lib/content";

export default function Closing() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] flex-col justify-between bg-void"
    >
      <div className="flex flex-1 flex-col justify-center px-6 py-24 md:px-10">
        <div className="max-w-4xl">
          <TextReveal
            as="h2"
            text={closing.headline}
            className="font-display text-4xl font-bold uppercase leading-[0.95] text-ink sm:text-5xl md:text-6xl"
          />

          <p className="mt-6 text-sm text-ink-dim">{contactEmail}</p>

          <a
            href={`mailto:${contactEmail}`}
            className="mt-10 inline-block bg-accent px-8 py-3.5 text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-85"
          >
            {closing.cta}
          </a>
        </div>
      </div>

      <Marquee items={ticker} />

      <footer className="flex flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-ink-faint md:flex-row md:px-10">
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
