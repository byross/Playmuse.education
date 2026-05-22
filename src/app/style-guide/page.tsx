"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { WaveSection, type Tone } from "@/components/layout/WaveSection";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { SpeechBanner } from "@/components/ui/SpeechBanner";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { IslandCard } from "@/components/ui/IslandCard";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";
import { Doodles } from "@/components/decor/Doodles";

const COLORS = [
  { name: "sun",        var: "--color-sun",        hex: "#F7C600" },
  { name: "sun-deep",   var: "--color-sun-deep",   hex: "#E8A11C" },
  { name: "ink",        var: "--color-ink",        hex: "#17130F" },
  { name: "paper",      var: "--color-paper",      hex: "#FCF3E5" },
  { name: "leaf",       var: "--color-leaf",       hex: "#5AAD40" },
  { name: "sky",        var: "--color-sky",        hex: "#28B4E0" },
  { name: "sand",       var: "--color-sand",       hex: "#E8B84B" },
  { name: "coral",      var: "--color-coral",      hex: "#F05590" },
  { name: "crystal",    var: "--color-crystal",    hex: "#8B60D0" },
  { name: "mint",       var: "--color-mint",       hex: "#10C896" },
  { name: "hotpink",    var: "--color-hotpink",    hex: "#FF3878" },
  { name: "tangerine",  var: "--color-tangerine",  hex: "#FF7220" },
  { name: "grape",      var: "--color-grape",      hex: "#7C3AED" },
  { name: "lemon",      var: "--color-lemon",      hex: "#FEF048" },
  { name: "sage",       var: "--color-sage",       hex: "#B0CC80" },
  { name: "lavender",   var: "--color-lavender",   hex: "#C0A8E8" },
];

function Block({
  title,
  tone = "cream",
  children,
}: {
  title: string;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <WaveSection tone={tone} className="relative py-12">
      <Doodles count={4} />
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="mb-7 text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
          {children}
        </Reveal>
      </div>
    </WaveSection>
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
                <p className="font-display text-sm font-bold text-ink">{c.name}</p>
                <p className="font-body text-xs text-ink/55">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rainbow gradient */}
        <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink p-4 shadow-[var(--shadow-sticker-sm)]"
          style={{ background: "var(--gradient-rainbow)" }}>
          <p className="font-display text-sm font-bold text-white [text-shadow:1px_1px_0_#17130f]">--gradient-rainbow</p>
        </div>
      </Block>

      {/* Typography */}
      <Block title={s.typography} tone="sky">
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border-[3px] border-ink bg-cream p-7 shadow-[var(--shadow-sticker-sm)]">
          <p className="font-hand text-5xl text-ink">Aa Hand · gooddog · 雅痞-繁 標題</p>
          <p className="font-display text-3xl text-ink/85">Aa Display · Arial Rounded · 圓潤標題</p>
          <hr className="border-ink/10" />
          <p className="font-body text-lg text-ink/80">
            Body — Cause. Thoughtful, joyful digital learning inspired by creativity and play.
          </p>
          <p className="font-body text-base text-ink/70">內文 — Chiron GoRound TC,從創意與遊戲中萌芽的數位學習體驗。</p>
          <hr className="border-ink/10" />
          <p className="rainbow-text font-hand text-4xl font-normal">Rainbow text 🌈</p>
          <p className="candy-text font-display text-3xl font-bold">Candy text 🍭</p>
        </div>
      </Block>

      {/* Buttons */}
      <Block title={s.buttons} tone="rose">
        <div className="flex flex-wrap items-center gap-4">
          <PillButton variant="sun">☀ Sun</PillButton>
          <PillButton variant="sky">🌊 Sky</PillButton>
          <PillButton variant="leaf">🌿 Leaf</PillButton>
          <PillButton variant="coral">🌸 Coral</PillButton>
          <PillButton variant="paper">📄 Paper</PillButton>
          <PillButton variant="mint">🌱 Mint</PillButton>
          <PillButton variant="pink">💖 Pink</PillButton>
          <PillButton variant="sun" size="lg">Large 🎉</PillButton>
          <PillButton variant="sky" size="sm">Small</PillButton>
        </div>
      </Block>

      {/* Components */}
      <Block title={s.components} tone="sage">
        <div className="flex flex-col gap-8">
          <SpeechBanner>Speech Banner 🎵</SpeechBanner>

          <div className="flex flex-wrap gap-4">
            {(["sun", "sky", "coral", "leaf", "crystal", "mint"] as const).map((color) => (
              <SpeechBubble key={color} color={color} tail="bottom">
                {color} bubble!
              </SpeechBubble>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {(["leaf", "coral", "crystal"] as const).map((accent, i) => (
              <IslandCard key={accent} accent={accent} badge={["🌿", "🌸", "💎"][i]}>
                <h3 className="font-display text-lg font-bold capitalize">{accent} card</h3>
                <p className="mt-2 font-body text-sm text-ink/65">
                  Ink-outlined sticker card with hover lift + tinted bg.
                </p>
              </IslandCard>
            ))}
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink">
            <WaveDivider className="text-sun" />
          </div>
        </div>
      </Block>

      {/* Motion */}
      <Block title={s.motion} tone="lavender">
        <div className="flex flex-wrap items-end gap-10 rounded-[var(--radius-card)] border-[3px] border-ink bg-sky-soft/30 p-8">
          {[
            { src: "/images/character/Lumi.png", label: "float" },
            { src: "/images/character/Finn.png", label: "hover me" },
            { src: "/images/character/Skye.png", label: "boing" },
          ].map((c, i) => (
            <div key={c.src} className="w-24">
              <FloatingCharacter
                src={c.src}
                alt={`${c.label} demo`}
                width={200}
                height={380}
                delay={i * 0.5}
                duration={6 + i}
              />
              <p className="mt-2 text-center font-display text-sm font-bold text-ink/70">{c.label}</p>
            </div>
          ))}
        </div>
      </Block>
    </>
  );
}
