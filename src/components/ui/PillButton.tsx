"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSound } from "@/components/audio/SoundProvider";

type Variant = "sun" | "sky" | "leaf" | "coral" | "paper" | "mint" | "pink";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
  leaf: "bg-leaf text-ink",
  coral: "bg-coral text-ink",
  paper: "bg-cream text-ink",
  mint: "bg-[#10c896] text-ink",
  pink: "bg-[#ff3878] text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-9 py-4 text-lg",
};

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
};

export function PillButton({
  children,
  href,
  onClick,
  variant = "sun",
  size = "md",
  className = "",
  ariaLabel,
}: Props) {
  const { playSound } = useSound();

  const base = `inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink font-display font-bold tracking-wide shadow-[var(--shadow-sticker)] transition-shadow ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = {
    whileHover: { y: -3, rotate: -2, scale: 1.06 },
    whileTap: { y: 2, scale: 0.94, rotate: 0 },
    transition: { type: "spring" as const, stiffness: 380, damping: 14 },
  };

  const handleClick = () => {
    playSound("pop");
    onClick?.();
  };

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <motion.a href={href} aria-label={ariaLabel} className={base} {...motionProps} onClick={handleClick}>
          {children}
        </motion.a>
      );
    }
    return (
      <motion.span className="inline-flex" {...motionProps} onClick={handleClick}>
        <Link href={href} aria-label={ariaLabel} className={base}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={base}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
