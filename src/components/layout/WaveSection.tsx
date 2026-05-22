import type { ReactNode } from "react";
import { WaveDivider } from "@/components/ui/WaveDivider";

export type Tone = "cream" | "paper" | "sky" | "sage" | "sun" | "rose" | "lavender";

const TONES: Record<Tone, string> = {
  cream: "var(--color-cream)",
  paper: "var(--color-paper)",
  sky: "var(--color-band-sky)",
  sage: "var(--color-band-sage)",
  sun: "var(--color-band-sun)",
  rose: "var(--color-band-rose)",
  lavender: "var(--color-band-lavender)",
};

type Props = {
  /** Background band colour; the wavy top edge is drawn in the same colour. */
  tone?: Tone;
  /** Classes for the <section> (padding, max-width, etc.). */
  className?: string;
  /** Hide the top wave (e.g. for the very first band right under a hero). */
  noWave?: boolean;
  id?: string;
  children: ReactNode;
};

/**
 * A full-width section with a soft background band and a wave-shaped top edge.
 * The wave is colour-matched to the band and overlaps the section above it,
 * so consecutive WaveSections read as a stack of wavy bands.
 */
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
