"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { WaveSection } from "@/components/layout/WaveSection";
import { Reveal } from "@/components/ui/Reveal";
import { IslandCard } from "@/components/ui/IslandCard";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";

export default function TeamPage() {
  const { dict } = useLanguage();
  const t = dict.team;

  const profiles = [
    {
      role: t.founderRole,
      name: t.founderName,
      bio: t.founderBio,
      img: "/images/character/The Keeper_1.png",
      accent: "crystal" as const,
      flip: false,
    },
    {
      role: t.techRole,
      name: t.techName,
      bio: t.techBio,
      img: "/images/character/Muser_1_boy.png",
      accent: "sky" as const,
      flip: true,
    },
  ];

  return (
    <>
      <PageHeader title={t.title} tint="crystal" />

      <WaveSection tone="cream" className="py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
          {profiles.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <IslandCard accent={p.accent}>
                <div className={`flex flex-col gap-6 sm:items-center ${p.flip ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                  <div className="mx-auto w-32 shrink-0 sm:w-40">
                    <FloatingCharacter src={p.img} alt={p.name} width={300} height={560} duration={6 + i} />
                  </div>
                  <div className="flex-1">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-sun-deep">
                      {p.role}
                    </span>
                    <h2 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">{p.name}</h2>
                    <p className="mt-4 font-body leading-relaxed text-ink/75">{p.bio}</p>
                  </div>
                </div>
              </IslandCard>
            </Reveal>
          ))}
        </div>
      </WaveSection>

      {/* Contributors */}
      <WaveSection tone="lavender" className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold text-ink sm:text-4xl">{t.contributorsTitle}</h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-5">
            {t.contributorsBody.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-center font-body text-lg leading-relaxed text-ink/75">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["UK", "Japan", "Germany", "Hong Kong"].map((region) => (
                <span
                  key={region}
                  className="rounded-full border-[2.5px] border-ink bg-cream px-4 py-1.5 font-display text-sm font-semibold text-ink shadow-[var(--shadow-sticker-sm)]"
                >
                  {region}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </WaveSection>
    </>
  );
}
