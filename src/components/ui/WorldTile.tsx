"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSound } from "@/components/audio/SoundProvider";

type Accent = "leaf" | "sky" | "sand" | "coral" | "crystal";

const ACCENT_BAR: Record<Accent, string> = {
  leaf: "bg-leaf",
  sky: "bg-sky",
  sand: "bg-sand",
  coral: "bg-coral",
  crystal: "bg-crystal",
};

const ACCENT_BG: Record<Accent, string> = {
  leaf: "bg-[#c8ecb0]",
  sky: "bg-[#c0e8f8]",
  sand: "bg-[#fce870]",
  coral: "bg-[#ffc8d8]",
  crystal: "bg-[#d8c8f8]",
};

const ACCENT_PILL: Record<Accent, string> = {
  leaf: "bg-leaf text-ink",
  sky: "bg-sky text-ink",
  sand: "bg-sand text-ink",
  coral: "bg-coral text-ink",
  crystal: "bg-crystal text-ink",
};

type Props = {
  accent?: Accent;
  name: string;
  desc: string;
  imageSrc: string;
  exploreLabel?: string;
  className?: string;
};

/**
 * Gamified island level tile — looks like a tappable game world card.
 * Used on the home page Worlds section and building page.
 */
export function WorldTile({
  accent = "sky",
  name,
  desc,
  imageSrc,
  exploreLabel = "Explore",
  className = "",
}: Props) {
  const { playSound } = useSound();

  return (
    <motion.article
      whileHover={{ y: -12, rotate: -1, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => playSound("ding")}
      transition={{ type: "spring", stiffness: 280, damping: 15 }}
      className={`relative flex flex-col overflow-hidden rounded-[28px] border-[3px] border-ink shadow-[var(--shadow-sticker-lg)] ${ACCENT_BG[accent]} ${className}`}
    >
      {/* Colour bar */}
      <div className={`h-3 w-full shrink-0 ${ACCENT_BAR[accent]}`} />

      {/* Zone illustration */}
      <div className="flex flex-1 items-center justify-center px-4 pt-4 pb-1">
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full"
        >
          <Image
            src={imageSrc}
            alt={name}
            width={300}
            height={300}
            className="mx-auto h-auto max-h-36 w-auto select-none object-contain drop-shadow-[0_8px_12px_rgba(23,19,15,0.18)]"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="p-4 pt-2">
        <h3 className="font-display text-base font-bold text-ink">{name}</h3>
        <p className="mt-1 font-body text-xs leading-relaxed text-ink/65">{desc}</p>

        {/* Explore pill badge */}
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border-[2.5px] border-ink px-3 py-1 font-display text-xs font-bold shadow-[var(--shadow-sticker-sm)] ${ACCENT_PILL[accent]}`}
          >
            ★ {exploreLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
