import type { ReactNode } from "react";
import { WaveDivider } from "@/components/ui/WaveDivider";

export type Tone =
  | "cream"
  | "paper"
  | "sky"
  | "sage"
  | "sun"
  | "rose"
  | "lavender"
  | "coral"
  | "mint";

const TONES: Record<Tone, string> = {
  cream: "var(--color-cream)",
  paper: "var(--color-paper)",
  sky: "var(--color-band-sky)",
  sage: "var(--color-band-sage)",
  sun: "var(--color-band-sun)",
  rose: "var(--color-band-rose)",
  lavender: "var(--color-band-lavender)",
  coral: "var(--color-band-coral)",
  mint: "var(--color-band-mint)",
};

type Props = {
  tone?: Tone;
  className?: string;
  noWave?: boolean;
  id?: string;
  children: ReactNode;
};

export function WaveSection({ tone = "cream", className = "", noWave = false, id, children }: Props) {
  const color = TONES[tone];
  return (
    <section id={id} className={`relative ${className}`} style={{ background: color }}>
      {!noWave && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)]"
          style={{ color }}
        >
          <WaveDivider className="" height={64} />
        </div>
      )}
      {children}
    </section>
  );
}
