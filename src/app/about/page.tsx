"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { WaveSection } from "@/components/layout/WaveSection";
import { Reveal } from "@/components/ui/Reveal";
import { IslandCard } from "@/components/ui/IslandCard";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { Doodles } from "@/components/decor/Doodles";

const APPROACH_BADGES = ["bg-sun", "bg-sky", "bg-coral"] as const;
const APPROACH_ACCENTS = ["leaf", "sky", "coral"] as const;
const APPROACH_EMOJIS = ["🎮", "🏠", "👨‍👩‍👧"] as const;

export default function AboutPage() {
  const { dict } = useLanguage();
  const a = dict.about;

  return (
    <>
      <PageHeader title={a.title} tint="leaf" />

      {/* ——— Mission ——— */}
      <WaveSection tone="mint" className="py-16">
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[1.4fr_1fr]">
          <Doodles count={5} />
          <Reveal>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">{a.missionTitle}</h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink/75">{a.missionBody}</p>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto flex flex-col items-center gap-3">
            <SpeechBubble color="sun">We make learning fun! ✨</SpeechBubble>
            <div className="w-44 sm:w-56">
              <FloatingCharacter src="/images/character/Lumi.png" alt="Lumi" width={300} height={560} />
            </div>
          </Reveal>
        </div>
      </WaveSection>

      {/* ——— Approach ——— */}
      <WaveSection tone="sage" className="py-16">
        <div className="relative mx-auto max-w-5xl px-6">
          <Doodles count={6} />
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">{a.approachTitle}</h2>
            <p className="mt-4 text-center font-body text-lg text-ink/70">{a.approachIntro}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {a.approach.map((item, i) => (
              <Reveal key={i} delay={i * 0.1} variant="pop">
                <IslandCard accent={APPROACH_ACCENTS[i]} badge={APPROACH_EMOJIS[i]} className="h-full">
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-display text-lg font-bold shadow-[var(--shadow-sticker-sm)] ${APPROACH_BADGES[i]}`}
                    >
                      {i + 1}
                    </span>
                    <p className="font-body font-medium leading-relaxed text-ink/80">{item}</p>
                  </div>
                </IslandCard>
              </Reveal>
            ))}
          </div>
        </div>
      </WaveSection>

      {/* ——— Background ——— */}
      <WaveSection tone="lavender" className="py-16">
        <div className="relative mx-auto max-w-3xl px-6">
          <Doodles count={4} />
          <Reveal>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">{a.backgroundTitle}</h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-5">
            {a.backgroundBody.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="font-body text-lg leading-relaxed text-ink/75">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Character accents */}
          <Reveal delay={0.2} className="mt-10 flex items-end justify-center gap-4">
            {["/images/character/Finn.png", "/images/character/Skye.png", "/images/character/Ash.png"].map((src, i) => (
              <div key={src} className="w-16 sm:w-20">
                <FloatingCharacter src={src} alt="" width={200} height={380} delay={i * 0.5} duration={5 + i} />
              </div>
            ))}
          </Reveal>
        </div>
      </WaveSection>
    </>
  );
}
