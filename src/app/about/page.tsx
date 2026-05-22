"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IslandCard } from "@/components/ui/IslandCard";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";

export default function AboutPage() {
  const { dict } = useLanguage();
  const a = dict.about;

  return (
    <>
      <PageHeader title={a.title} tint="leaf" />

      {/* Mission */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{a.missionTitle}</h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink/75">{a.missionBody}</p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-40 sm:w-52">
            <FloatingCharacter src="/images/character/Lumi.png" alt="Lumi" width={300} height={560} />
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-sage/25 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold text-ink sm:text-4xl">{a.approachTitle}</h2>
            <p className="mt-4 text-center font-body text-lg text-ink/70">{a.approachIntro}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {a.approach.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <IslandCard accent={(["leaf", "sky", "coral"] as const)[i]} className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-sun font-display font-bold">
                      {i + 1}
                    </span>
                    <p className="font-body font-medium leading-relaxed text-ink/80">{item}</p>
                  </div>
                </IslandCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{a.backgroundTitle}</h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {a.backgroundBody.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="font-body text-lg leading-relaxed text-ink/75">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
