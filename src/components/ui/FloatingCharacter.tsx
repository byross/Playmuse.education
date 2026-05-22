"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  delay?: number;
  duration?: number;
  priority?: boolean;
};

/** A character illustration that gently bobs and tilts, and reacts on hover. */
export function FloatingCharacter({
  src,
  alt,
  width,
  height,
  className = "",
  delay = 0,
  duration = 6,
  priority = false,
}: Props) {
  return (
    <motion.div
      className={`pointer-events-auto ${className}`}
      animate={{ y: [0, -14, 0], rotate: [0, -2, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.06, rotate: 3 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full select-none drop-shadow-[0_18px_22px_rgba(23,19,15,0.18)]"
        draggable={false}
      />
    </motion.div>
  );
}
