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
      gsap.set(rows, { y: 24, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
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
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {services.eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={services.heading}
          className="mt-4 font-display italic text-3xl font-normal text-ink sm:text-4xl"
        />

        <div className="mt-16">
          {services.cards.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="flex flex-col gap-2 border-t border-line py-8 last:border-b sm:flex-row sm:items-baseline sm:gap-10"
            >
              <span className="font-display text-lg text-accent sm:w-12 sm:shrink-0">
                {card.number}
              </span>
              <h3 className="font-display text-xl text-ink sm:w-72 sm:shrink-0">
                {card.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
