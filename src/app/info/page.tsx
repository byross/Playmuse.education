"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IslandCard } from "@/components/ui/IslandCard";
import { PillButton } from "@/components/ui/PillButton";

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
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      ),
    },
    {
      label: info.emailLabel,
      value: (
        <a className="font-semibold text-sky-deep underline underline-offset-4" href={`mailto:${info.email}`}>
          {info.email}
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHeader title={info.title} tint="sand" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <IslandCard accent="sand">
            <dl className="divide-y-2 divide-ink/10">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="font-display text-sm font-bold uppercase tracking-[0.12em] text-sun-deep">
                    {row.label}
                  </dt>
                  <dd className="font-body text-lg leading-relaxed text-ink/80">{row.value}</dd>
                </div>
              ))}
            </dl>
          </IslandCard>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <PillButton href={`mailto:${info.email}`} variant="sun" size="lg">
              {dict.common.enquiries}
            </PillButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
