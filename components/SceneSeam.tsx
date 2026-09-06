type SceneSeamProps = {
  toColor: string;
  flip?: boolean;
};

/**
 * A diagonal "cut to next scene" seam instead of a flat divider.
 * Sits at the bottom of a scene, angled block bleeding the next
 * scene's background color up into the current one.
 */
export default function SceneSeam({ toColor, flip = false }: SceneSeamProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[12vh] translate-y-1/2"
      style={{
        background: toColor,
        clipPath: flip
          ? "polygon(0 100%, 100% 40%, 100% 100%)"
          : "polygon(0 40%, 100% 100%, 0 100%)",
      }}
    />
  );
}
