"use client";

import { motion } from "motion/react";

/* ——— Shape renderers ——— */
const Star = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
    <path d="M12 2l2.8 8.2H23l-7 5.1 2.7 8.2L12 18.4l-6.7 5.1 2.7-8.2-7-5.1h8.2z" />
  </svg>
);

const Sparkle = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
    <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Dot = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const Heart = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Diamond = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
    <path d="M12 2l10 10-10 10L2 12z" />
  </svg>
);

type ShapeRenderer = (color: string) => React.ReactNode;

const SHAPES: ShapeRenderer[] = [
  (c) => <Star color={c} />,
  (c) => <Sparkle color={c} />,
  (c) => <Dot color={c} />,
  (c) => <Heart color={c} />,
  (c) => <Diamond color={c} />,
];

const COLORS = [
  "#f7c600", // sun
  "#f05590", // coral
  "#5aad40", // leaf
  "#28b4e0", // sky
  "#8b60d0", // crystal
  "#ff7220", // tangerine
  "#10c896", // mint
];

interface DoodleItem {
  x: string;
  y: string;
  size: number;
  shapeIdx: number;
  colorIdx: number;
  dur: number;
  delay: number;
  rotate: number;
}

const ALL_DOODLES: DoodleItem[] = [
  { x: "6%",  y: "12%", size: 20, shapeIdx: 0, colorIdx: 0, dur: 3.2, delay: 0,   rotate: 15  },
  { x: "88%", y: "8%",  size: 15, shapeIdx: 1, colorIdx: 1, dur: 4.0, delay: 0.6, rotate: -10 },
  { x: "92%", y: "55%", size: 22, shapeIdx: 0, colorIdx: 2, dur: 3.6, delay: 1.1, rotate: 25  },
  { x: "4%",  y: "65%", size: 14, shapeIdx: 3, colorIdx: 3, dur: 4.5, delay: 0.3, rotate: 0   },
  { x: "48%", y: "4%",  size: 17, shapeIdx: 2, colorIdx: 4, dur: 3.0, delay: 1.6, rotate: 30  },
  { x: "78%", y: "82%", size: 16, shapeIdx: 1, colorIdx: 5, dur: 5.0, delay: 0.9, rotate: -20 },
  { x: "18%", y: "90%", size: 19, shapeIdx: 0, colorIdx: 6, dur: 3.8, delay: 0.2, rotate: 10  },
  { x: "62%", y: "88%", size: 13, shapeIdx: 4, colorIdx: 0, dur: 4.2, delay: 1.4, rotate: -15 },
  { x: "32%", y: "6%",  size: 12, shapeIdx: 3, colorIdx: 1, dur: 3.4, delay: 0.7, rotate: 20  },
  { x: "76%", y: "30%", size: 18, shapeIdx: 0, colorIdx: 2, dur: 3.9, delay: 0.4, rotate: -8  },
];

type Props = {
  count?: number;
  className?: string;
};

/** Scattered twinkling doodle decorations — stars, sparkles, hearts, dots. */
export function Doodles({ count = 7, className = "" }: Props) {
  const items = ALL_DOODLES.slice(0, Math.min(count, ALL_DOODLES.length));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: item.x, top: item.y, width: item.size, height: item.size }}
          animate={{
            scale: [0.8, 1.35, 0.8],
            opacity: [0.45, 1, 0.45],
            rotate: [item.rotate, item.rotate + 30, item.rotate],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {SHAPES[item.shapeIdx](COLORS[item.colorIdx])}
        </motion.div>
      ))}
    </div>
  );
}
