import type { ReactNode } from "react";

type BgColor = "sun" | "sky" | "coral" | "leaf" | "crystal" | "mint" | "cream" | "lemon";

const BG_CLASSES: Record<BgColor, { bg: string; fill: string }> = {
  sun: { bg: "bg-sun", fill: "#f7c600" },
  sky: { bg: "bg-sky", fill: "#28b4e0" },
  coral: { bg: "bg-coral", fill: "#f05590" },
  leaf: { bg: "bg-leaf", fill: "#5aad40" },
  crystal: { bg: "bg-crystal", fill: "#8b60d0" },
  mint: { bg: "bg-[#10c896]", fill: "#10c896" },
  cream: { bg: "bg-cream", fill: "#fff6e3" },
  lemon: { bg: "bg-lemon", fill: "#fef048" },
};

type Props = {
  children: ReactNode;
  color?: BgColor;
  /** Where the tail points — toward the character */
  tail?: "bottom" | "bottom-left" | "bottom-right" | "none";
  className?: string;
};

/**
 * Cute comic-style speech bubble for mascot personality.
 * The tail points DOWN by default (character stands below the bubble).
 */
export function SpeechBubble({ children, color = "sun", tail = "bottom", className = "" }: Props) {
  const { bg, fill } = BG_CLASSES[color];

  const tailClass = {
    "bottom": "left-1/2 -translate-x-1/2",
    "bottom-left": "left-5",
    "bottom-right": "right-5",
    "none": "hidden",
  }[tail];

  return (
    <div className={`relative inline-block text-center ${className}`}>
      {/* Bubble */}
      <div
        className={`relative z-10 rounded-2xl border-[2.5px] border-ink ${bg} px-3 py-1.5 font-display text-xs font-bold text-ink shadow-[2px_2px_0_#17130f]`}
      >
        {children}
      </div>

      {/* Tail — black outline triangle */}
      {tail !== "none" && (
        <>
          <span
            className={`absolute -bottom-[10px] z-10 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent ${tailClass}`}
            style={{ borderTopColor: "#17130f" }}
            aria-hidden
          />
          {/* Tail — colored fill triangle (slightly smaller, inset) */}
          <span
            className={`absolute -bottom-[7px] z-20 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${tailClass}`}
            style={{ borderTopColor: fill }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
