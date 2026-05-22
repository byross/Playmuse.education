"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSound } from "@/components/audio/SoundProvider";

type Side = "left" | "right";

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  side?: Side;
  bottom?: string;
  className?: string;
};

/**
 * A character that peeks in from the left or right edge of its container,
 * sliding in when it enters the viewport.
 * The parent section must have `position: relative; overflow: hidden`.
 */
export function PeekingCharacter({
  src,
  alt = "",
  width = 130,
  height = 240,
  side = "right",
  bottom = "0px",
  className = "",
}: Props) {
  const { playSound } = useSound();
  const isRight = side === "right";

  return (
    <motion.div
      className={`pointer-events-auto absolute z-10 ${isRight ? "right-0" : "left-0"} ${className}`}
      style={{ bottom, width }}
      initial={{ x: isRight ? "80%" : "-80%", opacity: 0 }}
      whileInView={{ x: isRight ? "22%" : "-22%", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.25 }}
      whileHover={{ x: isRight ? "0%" : "0%", scale: 1.12, rotate: isRight ? -6 : 6 }}
      onHoverStart={() => playSound("boing")}
    >
      {/* Inner float animation */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full select-none drop-shadow-[0_14px_18px_rgba(23,19,15,0.22)]"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
