# Darkstars Lab — Cinematic Homepage

A scroll-driven, cinematic homepage for **Darkstars Lab**, built as a single continuous
scroll experience with five distinct "scenes" rather than stacked sections.

## Stack

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** for layout/utility styling
- **Framer Motion** for text reveals and component-level animation
- **GSAP + ScrollTrigger** for scroll-driven scene staging, the pinned "Our Work" scrub, and Lenis integration
- **React Three Fiber + drei** for the hero starfield/glass shapes and the 3D device showcase
- **Lenis** for inertia-based smooth scrolling
- `next/font` (Space Grotesk for display type, Inter for body copy)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
app/
  layout.tsx          fonts, metadata, wraps the page in the Lenis smooth-scroll provider
  page.tsx             assembles the five scenes
  globals.css          theme tokens (colors, fonts), reduced-motion + Lenis wiring
components/
  Nav.tsx               sticky nav, fades in after the hero's opening shot settles
  TextReveal.tsx        word-by-word reveal (rise + blur-to-focus) used by every headline
  SceneSeam.tsx         diagonal clip-path "cut to next scene" divider between sections
  SmoothScrollProvider.tsx   Lenis + GSAP ScrollTrigger wiring, skipped under prefers-reduced-motion
  scenes/
    Hero.tsx             Scene 1 — opening shot
    Services.tsx         Scene 2 — "What we do"
    Work.tsx              Scene 3 — pinned 3D device showcase (the centerpiece)
    Why.tsx               Scene 4 — "Why Darkstars"
    Closing.tsx           Scene 5 — closing shot + footer
  canvas/
    Starfield.tsx         R3F particle starfield (hero background)
    FloatingShapes.tsx     drifting glass/metal shapes with cursor parallax (desktop only)
    HeroCanvas.tsx          hero's Canvas + lighting + parallax wiring
    DeviceShowcaseScene.tsx  the browser/laptop/phone 3D showcase used in the Work scene
lib/
  content.ts             single source of truth: all copy, the accent color, and the contact placeholder
  useReducedMotion.ts     prefers-reduced-motion / touch-device hooks
```

**To edit copy, the accent color, or CTA labels, edit `lib/content.ts` only** — no
animation code needs to change.

## Placeholders to replace before launch

- **Contact email** — currently `[REPLACE WITH REAL CONTACT EMAIL]` in `lib/content.ts` (`contactEmail`), shown in the Closing scene.
- **Project screenshots** — the Work scene's three 3D device mockups currently show abstract
  placeholder UI blocks. They're marked with an HTML comment
  (`REPLACE WITH REAL PROJECT SCREENSHOTS ONCE AVAILABLE`) in
  `components/canvas/DeviceShowcaseScene.tsx`, inside `PlaceholderScreen`. Swap that
  component's markup for real screenshots (as `<img>`/`next/image` inside the existing
  `<Html transform>` panels) once client work is available to show.

## Mobile & performance notes

- The hero and Work-scene WebGL canvases are lazy-mounted (next tick / `IntersectionObserver`)
  so they never block first paint.
- Particle count and shape detail drop on touch devices, and cursor parallax is disabled
  without a real cursor.
- The Work scene's pin is desktop-only (`gsap.matchMedia`, ≥768px); on mobile it becomes a
  lighter scrub-without-pin reveal, since pinned sections are the most failure-prone thing on
  small-viewport scroll.
- All animation runs off `transform`/`opacity`/`filter`, and everything backs off under
  `prefers-reduced-motion` (Lenis smoothing is skipped entirely; reveals shorten to a plain fade).

## Deploying

The project is a stock Next.js App Router app — deploy-ready for
[Vercel](https://vercel.com/new): connect the repo and it will build with no extra config.
