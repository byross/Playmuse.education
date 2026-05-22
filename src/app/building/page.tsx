"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { WaveSection } from "@/components/layout/WaveSection";
import { Reveal } from "@/components/ui/Reveal";
import { WorldTile } from "@/components/ui/WorldTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Doodles } from "@/components/decor/Doodles";

const PREVIEWS = [
  "/images/app-preview/PlayMuse_working source_o-01.jpg",
  "/images/app-preview/PlayMuse_working source_o-03.jpg",
  "/images/app-preview/PlayMuse_working source_o-04.jpg",
  "/images/app-preview/PlayMuse_working source_o-05.jpg",
];

const WORLD_IMGS = [
  "/images/map/zone-A.png",
  "/images/map/zone-B.png",
  "/images/element/wave.png",
  "/images/element/harp.png",
  "/images/map/Mountain.png",
];

const WORLD_ACCENTS = ["leaf", "sky", "sand", "coral", "crystal"] as const;

export default function BuildingPage() {
  const { dict } = useLanguage();
  const b = dict.building;

  return (
    <>
      <PageHeader title={b.title} tint="sky" />

      {/* ——— Intro + badge ——— */}
      <WaveSection tone="sky" className="relative px-6 py-14 text-center">
        <Doodles count={6} />
        <div className="relative mx-auto max-w-4xl">
          <Reveal variant="pop">
            <span className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-coral px-5 py-2 font-display text-sm font-bold text-ink shadow-[var(--shadow-sticker)]">
              <motion.span
                className="h-3 w-3 rounded-full bg-ink"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              🔨 {b.badge}
            </span>
          </Reveal>

          <Reveal delay={0.08} variant="pop">
            <h2 className="mt-6 text-3xl font-bold text-ink sm:text-4xl">{b.subtitle}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink/75">{b.intro}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-ink/65">{b.body}</p>
          </Reveal>
        </div>
      </WaveSection>

      {/* ——— Sound worlds (WorldTile grid) ——— */}
      <WaveSection tone="mint" className="py-16">
        <div className="relative mx-auto max-w-6xl px-6">
          <Doodles count={5} />
          <SectionHeading title={b.worldsTitle} banner />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {WORLD_ACCENTS.map((accent, i) => (
              <Reveal key={accent} delay={i * 0.08} variant="pop">
                <WorldTile
                  accent={accent}
                  name={b.worlds[i].name}
                  desc={b.worlds[i].desc}
                  imageSrc={WORLD_IMGS[i]}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </WaveSection>

      {/* ——— App preview ——— */}
      <WaveSection tone="lavender" className="py-20">
        <div className="relative mx-auto max-w-6xl px-6">
          <Doodles count={5} />
          <SectionHeading kicker="Sneak peek 👀" title={b.previewTitle} />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-center font-body leading-relaxed text-ink/70">
              {b.previewBody}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PREVIEWS.map((src, i) => (
              <Reveal key={src} delay={i * 0.08} variant="pop">
                <motion.div
                  whileHover={{ y: -8, rotate: i % 2 ? 1.2 : -1.2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  className="overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink shadow-[var(--shadow-sticker-lg)]"
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

          <Reveal delay={0.25}>
            <p className="mx-auto mt-10 max-w-xl rounded-[var(--radius-card)] border-[2.5px] border-dashed border-ink/40 bg-cream px-6 py-4 text-center font-body text-sm font-medium text-ink/65">
              {b.status}
            </p>
          </Reveal>
        </div>
      </WaveSection>
    </>
  );
}
