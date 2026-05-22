import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** The yellow rounded title banner used throughout the PlayMuse zone screens. */
export function SpeechBanner({ children, className = "" }: Props) {
  return (
    <span
      className={`relative inline-block rounded-full border-[3px] border-ink bg-sun px-7 py-2.5 font-hand text-2xl font-normal text-ink shadow-[var(--shadow-sticker)] sm:text-3xl ${className}`}
    >
      {children}
    </span>
  );
}
