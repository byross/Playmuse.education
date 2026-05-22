"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Accent = "leaf" | "sky" | "sand" | "coral" | "crystal";

const accentBar: Record<Accent, string> = {
  leaf: "bg-leaf",
  sky: "bg-sky",
  sand: "bg-sand",
  coral: "bg-coral",
  crystal: "bg-crystal",
};

// Vivid glow behind the card
const accentGlow: Record<Accent, string> = {
  leaf: "before:bg-leaf/40",
  sky: "before:bg-sky/40",
  sand: "before:bg-sand/40",
  coral: "before:bg-coral/40",
  crystal: "before:bg-crystal/40",
};

// Subtle tinted background per accent
const accentCardBg: Record<Accent, string> = {
  leaf: "bg-[#e8f7de]",
  sky: "bg-[#ddf3fc]",
  sand: "bg-[#fff8d6]",
  coral: "bg-[#ffe8f2]",
  crystal: "bg-[#f0eaff]",
};

type Props = {
  accent?: Accent;
  children: ReactNode;
  className?: string;
  /** Optional emoji/icon shown as a small top-right corner sticker */
  badge?: string;
};

export function IslandCard({ accent = "sky", children, className = "", badge }: Props) {
  return (
    <motion.article
      whileHover={{ y: -12, rotate: -0.8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
      className={`relative overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink shadow-[var(--shadow-sticker)] before:absolute before:-right-10 before:-top-10 before:h-32 before:w-32 before:rounded-full before:blur-2xl before:content-[''] ${accentGlow[accent]} ${accentCardBg[accent]} ${className}`}
    >
      {/* Colour bar */}
      <div className={`h-3.5 w-full ${accentBar[accent]}`} />

      {/* Optional corner badge */}
      {badge && (
        <span className="absolute right-3 top-5 z-20 text-2xl" aria-hidden>
          {badge}
        </span>
      )}

      <div className="p-6">{children}</div>
    </motion.article>
  );
}
