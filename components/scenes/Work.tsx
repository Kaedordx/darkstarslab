"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { work } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function ProjectTile({
  index,
  tag,
  title,
}: {
  index: string;
  tag: string;
  title: string;
}) {
  return (
    <div className="flex h-full w-[85vw] shrink-0 snap-start flex-col justify-between border-r border-line px-6 py-10 md:w-[36vw] md:px-12">
      <div className="flex items-start justify-between">
        <span className="font-display text-sm font-bold text-accent">
          {index}
        </span>
        <span className="text-xs uppercase tracking-widest text-ink-faint">
          {tag}
        </span>
      </div>

      {/* REPLACE WITH REAL PROJECT SCREENSHOTS ONCE AVAILABLE */}
      <div className="my-6 flex flex-1 items-center justify-center border border-line">
        <div className="flex w-3/4 flex-col gap-3">
          <div className="h-1.5 w-2/5 bg-accent/70" />
          <div className="h-3 w-full bg-white/[0.06]" />
          <div className="h-3 w-4/5 bg-white/[0.06]" />
          <div className="h-3 w-3/5 bg-white/[0.06]" />
        </div>
      </div>

      <p className="font-display text-lg font-bold uppercase text-ink">
        {title}
      </p>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(track, { x: -getDistance() * self.progress });
          },
        });

        return () => trigger.kill();
      });

      // Horizontal scroll-jacking is exactly the pinned-scene fragility we're
      // avoiding on small viewports — let the strip scroll natively instead.
      mm.add("(max-width: 767px)", () => {
        gsap.set(trackRef.current, { x: 0 });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden border-b border-line bg-void"
    >
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory items-stretch overflow-x-auto md:overflow-visible md:snap-none"
      >
        <div className="flex h-full w-[85vw] shrink-0 snap-start flex-col justify-center border-r border-line px-6 md:w-[34vw] md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            {work.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] text-ink sm:text-5xl">
            {work.heading}
          </h2>
          <p className="mt-4 max-w-xs text-sm text-ink-dim">{work.subhead}</p>
        </div>

        {work.projects.map((project) => (
          <ProjectTile key={project.index} {...project} />
        ))}
      </div>
    </section>
  );
}
