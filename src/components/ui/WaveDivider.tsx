type Props = {
  /** Fill color of the wave (a CSS color or token via currentColor). */
  className?: string;
  flip?: boolean;
  height?: number;
};

/** A hand-drawn style wavy divider echoing the sound-wave motif of the brand. */
export function WaveDivider({ className = "text-sun", flip = false, height = 70 }: Props) {
  return (
    <div
      className={`pointer-events-none w-full ${className}`}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,40 C120,8 240,8 360,34 C480,60 600,72 720,52 C840,32 960,4 1080,18 C1200,32 1320,64 1440,46 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
