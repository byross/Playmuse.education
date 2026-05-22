"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IslandCard } from "@/components/ui/IslandCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PREVIEWS = [
  "/images/app-preview/PlayMuse_working source_o-01.jpg",
  "/images/app-preview/PlayMuse_working source_o-03.jpg",
  "/images/app-preview/PlayMuse_working source_o-05.jpg",
  "/images/app-preview/PlayMuse_working source_o-07.jpg",
];

const WORLD_IMG = [
  "/images/map/zone-A.png",
  "/images/map/zone-B.png",
  "/images/map/Mountain.png",
];

const WORLD_ACCENT = ["leaf", "sky", "sand", "coral", "crystal"] as const;

export default function BuildingPage() {
  const { dict } = useLanguage();
  const b = dict.building;

  return (
    <>
      <PageHeader title={b.title} tint="sky" />

      {/* Intro + status badge */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-coral px-4 py-1.5 font-display text-sm font-semibold text-ink shadow-[var(--shadow-sticker-sm)]">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-ink"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            {b.badge}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-3xl font-semibold text-ink sm:text-4xl">{b.subtitle}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink/75">{b.intro}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-ink/65">{b.body}</p>
        </Reveal>
      </section>

      {/* Sound worlds */}
      <section className="bg-sky-soft/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={b.worldsTitle} banner />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WORLD_IMG.map((img, i) => (
              <Reveal key={img} delay={i * 0.1}>
                <IslandCard accent={WORLD_ACCENT[i]} className="h-full">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto w-full max-w-[240px]"
                  >
                    <Image src={img} alt={b.worlds[i].name} width={600} height={560} className="h-auto w-full" />
                  </motion.div>
                  <h3 className="mt-3 text-center font-display text-xl font-semibold text-ink">{b.worlds[i].name}</h3>
                  <p className="mt-2 text-center font-body text-sm leading-relaxed text-ink/65">{b.worlds[i].desc}</p>
                </IslandCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* App preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="Sneak peek" title={b.previewTitle} />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center font-body leading-relaxed text-ink/70">{b.previewBody}</p>
        </Reveal>
        <div className="mt-12 grid gap-7 sm:grid-cols-2">
          {PREVIEWS.map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, rotate: i % 2 ? 0.8 : -0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink shadow-[var(--shadow-sticker)]"
              >
                <Image
                  src={src}
                  alt={`PlayMuse concept screen ${i + 1}`}
                  width={892}
                  height={630}
                  className="h-auto w-full"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl rounded-[var(--radius-card)] border-[2.5px] border-dashed border-ink/40 bg-cream px-6 py-4 text-center font-body text-sm font-medium text-ink/65">
            {b.status}
          </p>
        </Reveal>
      </section>
    </>
  );
}
