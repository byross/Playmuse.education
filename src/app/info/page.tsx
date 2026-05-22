"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { WaveSection } from "@/components/layout/WaveSection";
import { Reveal } from "@/components/ui/Reveal";
import { IslandCard } from "@/components/ui/IslandCard";
import { PillButton } from "@/components/ui/PillButton";
import { PeekingCharacter } from "@/components/ui/PeekingCharacter";
import { Doodles } from "@/components/decor/Doodles";

export default function InfoPage() {
  const { dict } = useLanguage();
  const info = dict.info;

  const rows = [
    { label: info.companyNameLabel, value: <span>{info.companyName}</span> },
    { label: info.natureLabel, value: <span>{info.nature}</span> },
    {
      label: info.addressLabel,
      value: (
        <span className="not-italic">
          {info.address.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </span>
      ),
    },
    {
      label: info.emailLabel,
      value: (
        <a
          className="font-bold text-sky-deep underline underline-offset-4"
          href={`mailto:${info.email}`}
        >
          {info.email}
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHeader title={info.title} tint="sand" />

      <WaveSection tone="sky" className="relative overflow-hidden py-16">
        <Doodles count={6} />
        <PeekingCharacter
          src="/images/character/Finn.png"
          alt="Finn peeking"
          side="right"
          width={120}
          height={220}
          bottom="60px"
        />

        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal variant="pop">
            <IslandCard accent="sand" badge="🏢">
              <dl className="divide-y-2 divide-ink/10">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6"
                  >
                    <dt className="font-display text-sm font-bold uppercase tracking-[0.12em] text-sun-deep">
                      {row.label}
                    </dt>
                    <dd className="font-body text-lg leading-relaxed text-ink/80">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </IslandCard>
          </Reveal>

          <Reveal delay={0.15} variant="pop">
            <div className="mt-10 flex justify-center">
              <PillButton href={`mailto:${info.email}`} variant="sun" size="lg">
                ✉ {dict.common.enquiries}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </WaveSection>
    </>
  );
}
