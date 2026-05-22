"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NOTES = [
  "/images/element/music_notes_1.png",
  "/images/element/music_notes_2.png",
  "/images/element/music_notes_3.png",
  "/images/element/music_notes_4.png",
  "/images/element/music_notes_5.png",
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  angle: number;
  src: string;
  size: number;
  randomX: number;
  randomY: number;
  randomRotate: number;
}

interface Props {
  /** Min pixel distance the cursor must travel before dropping the next note. */
  spacing?: number;
  /** Rotate notes to follow the direction of movement. */
  followMouseDirection?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  /** Max simultaneous notes in the trail. */
  maxPoints?: number;
}

/**
 * Global music-note cursor trail (adapted from reactbits.dev/text-animations/text-cursor).
 * As the pointer moves, randomised music-note images appear behind it and gently
 * float, then fade out. Fixed, full-viewport, pointer-events disabled.
 */
export default function MusicNoteCursor({
  spacing = 70,
  followMouseDirection = false,
  exitDuration = 0.7,
  removalInterval = 45,
  maxPoints = 12,
}: Props) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastMoveTimeRef = useRef<number>(0);
  const idCounter = useRef<number>(0);

  useEffect(() => {
    const makeItem = (x: number, y: number, angle: number): TrailItem => ({
      id: idCounter.current++,
      x,
      y,
      angle: followMouseDirection ? angle : 0,
      src: NOTES[Math.floor(Math.random() * NOTES.length)],
      size: 30 + Math.random() * 28,
      randomX: Math.random() * 16 - 8,
      randomY: Math.random() * 16 - 8,
      randomRotate: Math.random() * 24 - 12,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setTrail((prev) => {
        let newTrail = [...prev];
        if (newTrail.length === 0) {
          newTrail.push(makeItem(mouseX, mouseY, 0));
        } else {
          const last = newTrail[newTrail.length - 1];
          const dx = mouseX - last.x;
          const dy = mouseY - last.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance >= spacing) {
            let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
            rawAngle = ((rawAngle + 180) % 360) - 180;
            const steps = Math.floor(distance / spacing);
            for (let i = 1; i <= steps; i++) {
              const t = (spacing * i) / distance;
              newTrail.push(makeItem(last.x + dx * t, last.y + dy * t, rawAngle));
            }
          }
        }
        if (newTrail.length > maxPoints) {
          newTrail = newTrail.slice(newTrail.length - maxPoints);
        }
        return newTrail;
      });
      lastMoveTimeRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spacing, maxPoints, followMouseDirection]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: item.x, top: item.y, width: item.size, height: item.size }}
            initial={{ opacity: 0, scale: 0.4, rotate: item.angle }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, item.randomX, 0],
              y: [0, item.randomY - 10, 0],
              rotate: [item.angle, item.angle + item.randomRotate, item.angle],
            }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{
              opacity: { duration: exitDuration, ease: "easeOut" },
              scale: { duration: 0.3, ease: "backOut" },
              x: { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              y: { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              rotate: { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            }}
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="60px"
              className="rotate-90 select-none object-contain drop-shadow-[0_4px_6px_rgba(23,19,15,0.18)]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
