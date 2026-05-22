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

const accentGlow: Record<Accent, string> = {
  leaf: "before:bg-leaf/30",
  sky: "before:bg-sky/30",
  sand: "before:bg-sand/30",
  coral: "before:bg-coral/30",
  crystal: "before:bg-crystal/30",
};

type Props = {
  accent?: Accent;
  children: ReactNode;
  className?: string;
};

export function IslandCard({ accent = "sky", children, className = "" }: Props) {
  return (
    <motion.article
      whileHover={{ y: -8, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`relative overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink bg-cream shadow-[var(--shadow-sticker)] before:absolute before:-right-10 before:-top-10 before:h-28 before:w-28 before:rounded-full before:blur-2xl before:content-[''] ${accentGlow[accent]} ${className}`}
    >
      <div className={`h-3 w-full ${accentBar[accent]}`} />
      <div className="p-6">{children}</div>
    </motion.article>
  );
}
