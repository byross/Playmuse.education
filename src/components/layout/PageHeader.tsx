"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SpeechBanner } from "@/components/ui/SpeechBanner";

type Props = {
  title: ReactNode;
  intro?: ReactNode;
  tint?: "sky" | "sand" | "coral" | "leaf" | "crystal";
};

const tints: Record<NonNullable<Props["tint"]>, string> = {
  sky: "from-sky-soft/50 to-paper",
  sand: "from-sun-soft/50 to-paper",
  coral: "from-rose/40 to-paper",
  leaf: "from-sage/45 to-paper",
  crystal: "from-lavender/45 to-paper",
};

export function PageHeader({ title, intro, tint = "sky" }: Props) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-b ${tints[tint]} px-6 pb-14 pt-16 text-center`}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6"
      >
        <SpeechBanner className="text-2xl sm:text-3xl">{title}</SpeechBanner>
        {intro ? (
          <p className="max-w-2xl font-body text-base leading-relaxed text-ink/70 sm:text-lg">{intro}</p>
        ) : null}
      </motion.div>
    </section>
  );
}
