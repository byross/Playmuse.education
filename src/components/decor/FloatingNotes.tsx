"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSound } from "@/components/audio/SoundProvider";

const NOTES = [
  { src: "/images/element/music_notes_1.png", top: "10%", left: "6%",  size: 72, dur: 7,   delay: 0,   rotate: 90  },
  { src: "/images/element/music_notes_2.png", top: "20%", left: "84%", size: 58, dur: 8,   delay: 1.2, rotate: 90  },
  { src: "/images/element/music_notes_3.png", top: "62%", left: "4%",  size: 50, dur: 9,   delay: 0.6, rotate: 90  },
  { src: "/images/element/music_notes_4.png", top: "72%", left: "88%", size: 64, dur: 7.5, delay: 2,   rotate: 90  },
  { src: "/images/element/music_notes_5.png", top: "42%", left: "94%", size: 44, dur: 10,  delay: 0.3, rotate: 90  },
  { src: "/images/element/music_notes_1.png", top: "30%", left: "2%",  size: 40, dur: 8.5, delay: 1.8, rotate: 90  },
  { src: "/images/element/music_notes_3.png", top: "55%", left: "91%", size: 36, dur: 6.5, delay: 0.9, rotate: 90  },
];

const ELEMENTS = [
  { src: "/images/element/piano.png",   top: "15%", left: "76%", size: 56, dur: 11, delay: 0.5  },
  { src: "/images/element/harp.png",    top: "70%", left: "12%", size: 48, dur: 9,  delay: 1.4  },
  { src: "/images/element/cassette.png",top: "48%", left: "88%", size: 44, dur: 8,  delay: 2.2  },
];

export function FloatingNotes() {
  const { playSound } = useSound();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Music notes */}
      {NOTES.map((n, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute"
          style={{ top: n.top, left: n.left, width: n.size }}
          animate={{
            y: [0, -26, 0],
            rotate: [0, 14, -8, 0],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{ duration: n.dur, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={n.src}
            alt=""
            width={120}
            height={120}
            className="h-auto w-full drop-shadow-[0_4px_6px_rgba(23,19,15,0.15)]"
            style={{ transform: `rotate(${n.rotate}deg)` }}
          />
        </motion.div>
      ))}

      {/* Musical element stickers — tappable for fun! */}
      {ELEMENTS.map((el, i) => (
        <motion.div
          key={`el-${i}`}
          className="pointer-events-auto absolute cursor-pointer"
          style={{ top: el.top, left: el.left, width: el.size }}
          animate={{ y: [0, -12, 0], rotate: [0, 6, -4, 0], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: el.dur, delay: el.delay, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.4, rotate: 15 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => playSound("chime")}
        >
          <Image
            src={el.src}
            alt=""
            width={120}
            height={120}
            className="h-auto w-full drop-shadow-[0_6px_10px_rgba(23,19,15,0.2)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
