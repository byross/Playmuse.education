import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SpeechBanner } from "./SpeechBanner";

type Props = {
  title: ReactNode;
  kicker?: ReactNode;
  banner?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ title, kicker, banner = false, align = "center", className = "" }: Props) {
  return (
    <Reveal className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className}`}>
      {kicker ? (
        <span className="font-body text-sm font-bold uppercase tracking-[0.2em] text-sun-deep">
          {kicker}
        </span>
      ) : null}
      {banner ? (
        <SpeechBanner>{title}</SpeechBanner>
      ) : (
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">{title}</h2>
      )}
    </Reveal>
  );
}
