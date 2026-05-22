"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "sun" | "sky" | "leaf" | "coral" | "paper";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
  leaf: "bg-leaf text-ink",
  coral: "bg-coral text-ink",
  paper: "bg-cream text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
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
  const base = `inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink font-display font-semibold tracking-wide shadow-[var(--shadow-sticker-sm)] transition-shadow ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = {
    whileHover: { y: -2, rotate: -1.5, scale: 1.04 },
    whileTap: { y: 1, scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
  };

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <motion.a href={href} aria-label={ariaLabel} className={base} {...motionProps}>
          {children}
        </motion.a>
      );
    }
    return (
      <motion.span className="inline-flex" {...motionProps}>
        <Link href={href} aria-label={ariaLabel} className={base}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} aria-label={ariaLabel} className={base} {...motionProps}>
      {children}
    </motion.button>
  );
}
