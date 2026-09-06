# Darkstars Lab — Homepage

A scroll-driven homepage for **Darkstars Lab** built as a single continuous scroll
experience with five distinct "scenes." The visual language is a bold, graphic
poster style — not the moody cinematic-serif look that's the obvious default for a
"premium dark site": true black, one vivid violet accent used in solid blocks (not
tinted text), heavy uppercase grotesk for headlines paired with mono type for
everything else, a looping ticker marquee, and asymmetric left-aligned layouts
instead of centered stacks. No WebGL anywhere — motion comes from Lenis + GSAP
ScrollTrigger + Framer Motion, which keeps every scene light on every device.

## Stack

- **Next.js 16 (App Router) + TypeScript**
- **Tailwind CSS v4** for layout/utility styling
- **Framer Motion** for text reveals and component-level animation
- **GSAP + ScrollTrigger** for scroll-driven scene staging, the Work scene's horizontal scroll-jack, and Lenis integration
- **Lenis** for inertia-based smooth scrolling
- `next/font` (Space Grotesk for bold display type, IBM Plex Mono for labels/body/nav)

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
  globals.css          theme tokens (colors, fonts), marquee keyframes, reduced-motion + Lenis wiring
components/
  Nav.tsx               structural nav (full-width border, not a floating pill)
  Marquee.tsx           looping ticker band, used to bookend Hero and Closing
  TextReveal.tsx        word-by-word reveal (rise + blur-to-focus) used by every headline
  SmoothScrollProvider.tsx   Lenis + GSAP ScrollTrigger wiring, skipped under prefers-reduced-motion
  scenes/
    Hero.tsx             Scene 1 — huge left-aligned uppercase headline, vertical rail label, marquee
    Services.tsx         Scene 2 — hairline rows with oversized hollow numerals as background type
    Work.tsx              Scene 3 — horizontal scroll-jacked project gallery (the centerpiece)
    Why.tsx               Scene 4 — full color-inverted (solid accent) block, the scene's "mood cut"
    Closing.tsx           Scene 5 — matches Hero's poster treatment + marquee bookend, footer
lib/
  content.ts             single source of truth: all copy, project tile data, the accent color, contact placeholder
  useReducedMotion.ts     prefers-reduced-motion hook (SSR-safe via useSyncExternalStore)
```

**To edit copy, the accent color, project tiles, or CTA labels, edit `lib/content.ts`
only** — no animation code needs to change.

## Placeholders to replace before launch

- **Contact email** — currently `[REPLACE WITH REAL CONTACT EMAIL]` in `lib/content.ts` (`contactEmail`), shown in the Closing scene.
- **Project screenshots** — the Work scene's tiles currently show abstract placeholder
  UI blocks. They're marked with an HTML comment
  (`REPLACE WITH REAL PROJECT SCREENSHOTS ONCE AVAILABLE`) in
  `components/scenes/Work.tsx`, inside `ProjectTile`. Swap that placeholder markup
  for real screenshots (`next/image`) once client work is available to show.

## How the Work scene works

Scrolling into `#work` pins the section and converts vertical scroll into horizontal
motion across the intro panel + project tiles (GSAP ScrollTrigger `scrub` driving a
`transform: translateX` on the track, recomputed on resize via `invalidateOnRefresh`).
On viewports under 768px the pin is skipped entirely — horizontal scroll-jacking is
exactly the kind of pinned-scene fragility that breaks on mobile browsers — and the
same track becomes a native horizontal scroll-snap strip instead.

## Mobile & performance notes

- No WebGL/3D anywhere — the whole site is plain DOM + CSS transforms, animated only via
  `transform`/`opacity`/`filter`.
- The marquee is a single CSS `@keyframes` loop (no JS per-frame cost) and is paused
  outright under `prefers-reduced-motion`, along with every other animation.

## Deploying

The project is a stock Next.js App Router app — deploy-ready for
[Vercel](https://vercel.com/new): connect the repo and it will build with no extra config.
