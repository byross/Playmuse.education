"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "fade" | "pop";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  variant?: Variant;
};

/**
 * Scroll-reveal wrapper.
 * - "fade" (default): smooth ease-in-out slide up
 * - "pop": spring bounce-in — more energetic for children's content
 */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div", variant = "fade" }: Props) {
  const MotionTag = motion[as];

  if (variant === "pop") {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0, y, scale: 0.88 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 16,
          delay,
        }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.3, 0, 0, 1] }}
    >
      {children}
    </MotionTag>
  );
}
