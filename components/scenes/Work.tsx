"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import { work } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function DeviceMock({
  variant,
  className = "",
}: {
  variant: "browser" | "phone";
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-line bg-[#111113] ${className}`}
    >
      {variant === "browser" ? (
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
        </div>
      ) : (
        <div className="flex justify-center border-b border-line py-2.5">
          <span className="h-1 w-8 rounded-full bg-ink-faint" />
        </div>
      )}
      {/* REPLACE WITH REAL PROJECT SCREENSHOTS ONCE AVAILABLE */}
      <div className="flex flex-col gap-3 p-5">
        <div className="h-1.5 w-2/5 rounded-full bg-accent/70" />
        <div className="h-3 w-full rounded bg-white/[0.06]" />
        <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
        <div className="h-3 w-full rounded bg-white/[0.06]" />
        <div className="h-3 w-3/5 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          leftRef.current,
          { xPercent: -4, yPercent: 2 },
          { xPercent: -16, yPercent: -8 },
          0
        )
          .fromTo(
            rightRef.current,
            { xPercent: 4, yPercent: -2 },
            { xPercent: 16, yPercent: 10 },
            0
          )
          .fromTo(centerRef.current, { scale: 0.97 }, { scale: 1.05 }, 0);
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          [leftRef.current, centerRef.current, rightRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden border-t border-line bg-void px-6"
    >
      <div className="relative z-10 mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {work.eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={work.heading}
          className="mt-4 font-display italic text-3xl font-normal text-ink sm:text-4xl"
        />
        <p className="mt-4 text-base text-ink-dim">{work.subhead}</p>
      </div>

      <div className="relative h-[42vh] w-full max-w-4xl">
        <div
          ref={leftRef}
          className="absolute left-[6%] top-[14%] w-[44%] sm:left-[10%]"
        >
          <DeviceMock variant="browser" />
        </div>
        <div
          ref={centerRef}
          className="absolute left-1/2 top-0 w-[52%] -translate-x-1/2"
        >
          <DeviceMock variant="browser" />
        </div>
        <div ref={rightRef} className="absolute right-[6%] top-[24%] w-[22%]">
          <DeviceMock variant="phone" />
        </div>
      </div>
    </section>
  );
}
