"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import SceneSeam from "@/components/SceneSeam";
import { services } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.set(cards, { y: 60, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0b0e17] px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {services.eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={services.heading}
          className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl md:text-5xl"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {services.cards.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="rounded-2xl border border-ink/10 bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <span className="font-display text-sm text-accent">
                {card.number}
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SceneSeam toColor="#05060a" />
    </section>
  );
}
