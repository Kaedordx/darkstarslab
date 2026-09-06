"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import { services } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current.filter(Boolean);
      gsap.set(rows, { opacity: 0, x: -30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative border-b border-line bg-void px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {services.eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={services.heading}
          className="mt-4 font-display text-4xl font-bold uppercase leading-none text-ink sm:text-5xl"
        />

        <div className="mt-16">
          {services.cards.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="relative overflow-hidden border-t border-line py-10 last:border-b md:py-14"
            >
              <span
                aria-hidden="true"
                className="text-outline pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 select-none font-display text-[9rem] font-bold leading-none md:block"
              >
                {card.number}
              </span>
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-16">
                <h3 className="font-display text-2xl font-bold uppercase leading-tight text-ink md:w-2/5 md:text-3xl">
                  {card.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-ink-dim md:w-2/5">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
