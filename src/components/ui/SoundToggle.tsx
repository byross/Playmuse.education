"use client";

import { motion } from "motion/react";
import { useSound } from "@/components/audio/SoundProvider";

export function SoundToggle({ className = "" }: { className?: string }) {
  const { enabled, toggleSound } = useSound();

  return (
    <motion.button
      type="button"
      onClick={toggleSound}
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
      aria-pressed={enabled}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-cream shadow-[var(--shadow-sticker-sm)] transition-colors ${
        enabled ? "bg-sun" : "bg-cream"
      } ${className}`}
      whileHover={{ scale: 1.12, rotate: -12 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 14 }}
    >
      {enabled ? (
        /* Speaker with waves */
        <svg viewBox="0 0 22 22" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M5 8H2a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V4L5 8z"
            fill="currentColor"
          />
          <path
            d="M14 8.5a4 4 0 010 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M17 6a7.5 7.5 0 010 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        /* Speaker muted */
        <svg viewBox="0 0 22 22" className="h-5 w-5 opacity-50" fill="none" aria-hidden>
          <path
            d="M5 8H2a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V4L5 8z"
            fill="currentColor"
          />
          <path
            d="M14 9l4 4m0-4l-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.button>
  );
}
