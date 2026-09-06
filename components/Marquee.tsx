export default function Marquee({ items }: { items: string[] }) {
  // Doubled so the -50% loop point is seamless.
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-accent py-3">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-6 text-sm tracking-wide text-white"
          >
            {item}
            <span aria-hidden="true" className="ml-6">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
