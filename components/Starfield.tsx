// Fixed, hand-authored positions rather than Math.random() at render time —
// keeps this a pure static markup with no client JS, no WebGL, and no
// hydration risk. Same atmosphere as a particle field at effectively zero cost.
const STARS = [
  { top: "8%", left: "12%", size: 2, delay: "0s" },
  { top: "14%", left: "82%", size: 1, delay: "0.6s" },
  { top: "22%", left: "34%", size: 1, delay: "1.4s" },
  { top: "18%", left: "64%", size: 2, delay: "2.1s" },
  { top: "31%", left: "6%", size: 1, delay: "0.3s" },
  { top: "9%", left: "48%", size: 1, delay: "1.8s" },
  { top: "42%", left: "89%", size: 2, delay: "0.9s" },
  { top: "55%", left: "22%", size: 1, delay: "2.6s" },
  { top: "63%", left: "76%", size: 1, delay: "1.1s" },
  { top: "71%", left: "15%", size: 2, delay: "0.4s" },
  { top: "48%", left: "58%", size: 1, delay: "1.6s" },
  { top: "37%", left: "44%", size: 1, delay: "2.3s" },
  { top: "80%", left: "50%", size: 1, delay: "0.7s" },
  { top: "88%", left: "30%", size: 2, delay: "1.9s" },
  { top: "6%", left: "70%", size: 1, delay: "1.2s" },
  { top: "60%", left: "8%", size: 1, delay: "2.8s" },
  { top: "26%", left: "92%", size: 1, delay: "0.2s" },
  { top: "77%", left: "88%", size: 2, delay: "1.5s" },
];

export default function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ink motion-safe:animate-[twinkle_5s_ease-in-out_infinite]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}
