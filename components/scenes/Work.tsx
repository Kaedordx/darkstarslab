"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import SceneSeam from "@/components/SceneSeam";
import { work } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const DeviceShowcaseScene = dynamic(
  () => import("@/components/canvas/DeviceShowcaseScene"),
  { ssr: false }
);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
      return () => trigger.kill();
    });

    mm.add("(max-width: 767px)", () => {
      // Pinned scenes are the most fragile thing on mobile scroll (address-bar
      // resize, momentum scroll) — trade the pin for a lighter scrub-only pass.
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-void px-6"
    >
      <div className="absolute inset-0">
        {canvasVisible && (
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 6], fov: 42 }}
            gl={{ antialias: true }}
          >
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 6, 16]} />
            <DeviceShowcaseScene progressRef={progressRef} />
          </Canvas>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {work.eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={work.heading}
          className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl md:text-5xl"
        />
        <p className="mt-4 text-base text-ink-dim">{work.subhead}</p>
      </div>

      <SceneSeam toColor="#030304" />
    </section>
  );
}
