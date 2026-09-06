# Darkstars Lab — Homepage

A scroll-driven, editorial-dark homepage for **Darkstars Lab**, built as a single continuous
scroll experience with five distinct "scenes" rather than stacked sections.

The visual language is deliberately restrained: near-black background throughout, a warm
muted-gold accent used sparingly (small numerals, one CTA, a hairline rule), an italic serif
for headlines against a plain sans for body copy, and hairline-divided editorial rows instead
of boxed cards. No WebGL — the "cinematic" feeling comes from typography, pacing, and scroll
choreography (Lenis + GSAP ScrollTrigger + Framer Motion reveals), not 3D effects, which keeps
every scene light on every device.

## Stack

- **Next.js 16 (App Router) + TypeScript**
- **Tailwind CSS v4** for layout/utility styling
- **Framer Motion** for text reveals and component-level animation
- **GSAP + ScrollTrigger** for scroll-driven scene staging, the pinned "Our Work" scrub, and Lenis integration
- **Lenis** for inertia-based smooth scrolling
- `next/font` (Fraunces for italic serif display type, Inter for body copy)

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
  globals.css          theme tokens (colors, fonts), grain texture, reduced-motion + Lenis wiring
components/
  Nav.tsx               minimal nav, fades in after the hero's opening shot settles
  TextReveal.tsx        word-by-word reveal (rise + blur-to-focus) used by every headline
  Starfield.tsx         static, hand-authored dot field with a CSS twinkle — hero atmosphere with no WebGL/JS cost
  SmoothScrollProvider.tsx   Lenis + GSAP ScrollTrigger wiring, skipped under prefers-reduced-motion
  scenes/
    Hero.tsx             Scene 1 — opening shot
    Services.tsx         Scene 2 — "What we do" (editorial numbered rows)
    Work.tsx              Scene 3 — pinned, scroll-scrubbed device mockups (the centerpiece)
    Why.tsx               Scene 4 — "Why Darkstars" (numbered rows)
    Closing.tsx           Scene 5 — closing shot + footer
lib/
  content.ts             single source of truth: all copy, the accent color, and the contact placeholder
  useReducedMotion.ts     prefers-reduced-motion hook (SSR-safe via useSyncExternalStore)
```

**To edit copy, the accent color, or CTA labels, edit `lib/content.ts` only** — no
animation code needs to change.

## Placeholders to replace before launch

- **Contact email** — currently `[REPLACE WITH REAL CONTACT EMAIL]` in `lib/content.ts` (`contactEmail`), shown in the Closing scene.
- **Project screenshots** — the Work scene's device mockups currently show abstract
  placeholder UI blocks. They're marked with an HTML comment
  (`REPLACE WITH REAL PROJECT SCREENSHOTS ONCE AVAILABLE`) in
  `components/scenes/Work.tsx`, inside `DeviceMock`. Swap that component's placeholder
  divs for real screenshots (`next/image`) once client work is available to show.

## Mobile & performance notes

- No WebGL/3D anywhere — the whole site is plain DOM + CSS transforms, animated only via
  `transform`/`opacity`/`filter`, which is what actually keeps scroll smooth on mid-range phones.
- The Work scene's pin is desktop-only (`gsap.matchMedia`, ≥768px); on mobile it becomes a
  lighter scrub-without-pin reveal, since pinned sections are the most failure-prone thing on
  small-viewport scroll.
- Everything backs off under `prefers-reduced-motion` (Lenis smoothing is skipped entirely;
  reveals shorten to a plain fade).

## Deploying

The project is a stock Next.js App Router app — deploy-ready for
[Vercel](https://vercel.com/new): connect the repo and it will build with no extra config.
