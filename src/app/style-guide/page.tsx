"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { SpeechBanner } from "@/components/ui/SpeechBanner";
import { IslandCard } from "@/components/ui/IslandCard";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";

const COLORS = [
  { name: "sun", var: "--color-sun", hex: "#F7C600" },
  { name: "sun-deep", var: "--color-sun-deep", hex: "#E8A11C" },
  { name: "ink", var: "--color-ink", hex: "#17130F" },
  { name: "paper", var: "--color-paper", hex: "#FCF3E5" },
  { name: "leaf", var: "--color-leaf", hex: "#7FB069" },
  { name: "sky", var: "--color-sky", hex: "#5BC4E8" },
  { name: "sky-deep", var: "--color-sky-deep", hex: "#1E6FA8" },
  { name: "sand", var: "--color-sand", hex: "#E8B84B" },
  { name: "coral", var: "--color-coral", hex: "#E87DA0" },
  { name: "crystal", var: "--color-crystal", hex: "#9B7BC4" },
  { name: "sage", var: "--color-sage", hex: "#C5D6A0" },
  { name: "rose", var: "--color-rose", hex: "#E8B5BE" },
  { name: "lavender", var: "--color-lavender", hex: "#C9B8E0" },
  { name: "sky-soft", var: "--color-sky-soft", hex: "#BCDDF0" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Reveal>
        <h2 className="mb-7 text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        {children}
      </Reveal>
    </section>
  );
}

export default function StyleGuidePage() {
  const { dict } = useLanguage();
  const s = dict.styleGuide;

  return (
    <>
      <PageHeader title={s.title} intro={s.subtitle} tint="sand" />

      {/* Colours */}
      <Block title={s.colors}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink shadow-[var(--shadow-sticker-sm)]"
            >
              <div className="h-20" style={{ background: `var(${c.var})` }} />
              <div className="bg-cream px-3 py-2">
                <p className="font-display text-sm font-semibold text-ink">{c.name}</p>
                <p className="font-body text-xs text-ink/55">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Typography */}
      <Block title={s.typography}>
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border-[3px] border-ink bg-cream p-7 shadow-[var(--shadow-sticker-sm)]">
          <p className="font-hand text-5xl text-ink">Aa Hand · gooddog · 雅痞-繁 標題</p>
          <p className="font-display text-3xl text-ink/85">Aa Display · Arial Rounded · 圓潤標題</p>
          <hr className="border-ink/10" />
          <p className="font-body text-lg text-ink/80">
            Body — Cause. Thoughtful, joyful digital learning inspired by creativity and play.
          </p>
          <p className="font-body text-base text-ink/70">內文 — Chiron GoRound TC,從創意與遊戲中萌芽的數位學習體驗。</p>
        </div>
      </Block>

      {/* Buttons */}
      <Block title={s.buttons}>
        <div className="flex flex-wrap items-center gap-4">
          <PillButton variant="sun">Sun</PillButton>
          <PillButton variant="sky">Sky</PillButton>
          <PillButton variant="leaf">Leaf</PillButton>
          <PillButton variant="coral">Coral</PillButton>
          <PillButton variant="paper">Paper</PillButton>
          <PillButton variant="sun" size="lg">
            Large
          </PillButton>
          <PillButton variant="sky" size="sm">
            Small
          </PillButton>
        </div>
      </Block>

      {/* Components */}
      <Block title={s.components}>
        <div className="flex flex-col gap-8">
          <SpeechBanner>Speech Banner</SpeechBanner>
          <div className="grid gap-5 sm:grid-cols-3">
            {(["leaf", "coral", "crystal"] as const).map((accent) => (
              <IslandCard key={accent} accent={accent}>
                <h3 className="font-display text-lg font-semibold capitalize">{accent} card</h3>
                <p className="mt-2 font-body text-sm text-ink/65">Ink-outlined sticker card with hover lift.</p>
              </IslandCard>
            ))}
          </div>
          <div className="overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink">
            <WaveDivider className="text-sun" />
          </div>
        </div>
      </Block>

      {/* Motion */}
      <Block title={s.motion}>
        <div className="flex flex-wrap items-end gap-10 rounded-[var(--radius-card)] border-[3px] border-ink bg-sky-soft/30 p-8">
          <div className="w-24">
            <FloatingCharacter src="/images/character/Lumi.png" alt="float demo" width={200} height={380} />
            <p className="mt-2 text-center font-display text-sm font-semibold text-ink/70">float</p>
          </div>
          <div className="w-24">
            <FloatingCharacter src="/images/character/Finn.png" alt="float demo" width={200} height={380} duration={8} delay={0.5} />
            <p className="mt-2 text-center font-display text-sm font-semibold text-ink/70">hover me</p>
          </div>
        </div>
      </Block>
    </>
  );
}
