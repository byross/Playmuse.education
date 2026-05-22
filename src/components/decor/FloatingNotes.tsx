"use client";

import Image from "next/image";
import { motion } from "motion/react";

const NOTES = [
  { src: "/images/element/music_notes_1.png", top: "12%", left: "8%", size: 64, dur: 7, delay: 0 },
  { src: "/images/element/music_notes_2.png", top: "22%", left: "82%", size: 52, dur: 8, delay: 1.2 },
  { src: "/images/element/music_notes_3.png", top: "60%", left: "5%", size: 46, dur: 9, delay: 0.6 },
  { src: "/images/element/music_notes_4.png", top: "70%", left: "88%", size: 58, dur: 7.5, delay: 2 },
  { src: "/images/element/music_notes_5.png", top: "40%", left: "92%", size: 40, dur: 10, delay: 0.3 },
];

export function FloatingNotes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {NOTES.map((n, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: n.top, left: n.left, width: n.size }}
          animate={{ y: [0, -22, 0], rotate: [0, 12, -6, 0], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: n.dur, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={n.src} alt="" width={120} height={120} className="h-auto w-full rotate-90" />
        </motion.div>
      ))}
    </div>
  );
}
