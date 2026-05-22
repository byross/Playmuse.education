"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IslandCard } from "@/components/ui/IslandCard";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";
import { FloatingNotes } from "@/components/decor/FloatingNotes";
import { WaveSection } from "@/components/layout/WaveSection";

const ZONES = [
  { accent: "leaf", key: 0 },
  { accent: "sky", key: 1 },
  { accent: "sand", key: 2 },
  { accent: "coral", key: 3 },
  { accent: "crystal", key: 4 },
] as const;

const CAST = [
  { src: "/images/character/Lumi.png", name: "Lumi", w: 200, h: 380 },
  { src: "/images/character/Finn.png", name: "Finn", w: 200, h: 380 },
  { src: "/images/character/Skye.png", name: "Skye", w: 200, h: 380 },
  { src: "/images/character/Ash.png", name: "Ash", w: 200, h: 380 },
  { src: "/images/character/Rowan.png", name: "Rowan", w: 200, h: 380 },
];

export default function Home() {
  const { dict } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const cloudsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-paper via-sky-soft/40 to-sky/30 pb-40 pt-14 sm:pt-20"
      >
        <FloatingNotes />

        {/* soft parallax clouds */}
        <motion.div style={{ y: cloudsY }} className="pointer-events-none absolute inset-x-0 top-10" aria-hidden>
          <div className="absolute left-[10%] h-24 w-48 rounded-full bg-white/70 blur-2xl" />
          <div className="absolute right-[14%] top-10 h-20 w-40 rounded-full bg-white/60 blur-2xl" />
          <div className="absolute left-[40%] top-24 h-16 w-56 rounded-full bg-white/50 blur-2xl" />
        </motion.div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-sun-deep">
              {dict.home.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-4 max-w-3xl font-hand text-5xl font-normal leading-[1.08] text-ink sm:text-7xl">
              {dict.home.title}{" "}
              <span className="relative inline-block text-sun-deep">
                {dict.home.titleAccent}
                <motion.svg
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-sun sm:h-3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <motion.path
                    d="M4 10 C 80 2, 220 2, 296 9"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-ink/75 sm:text-lg">
              {dict.home.lead}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PillButton href="/building" variant="sun" size="lg">
                {dict.home.ctaPrimary}
              </PillButton>
              <PillButton href="/about" variant="paper" size="lg">
                {dict.home.ctaSecondary}
              </PillButton>
            </div>
          </Reveal>
        </div>

        {/* islands map + floating characters */}
        <motion.div style={{ y: mapY }} className="relative mx-auto mt-14 max-w-6xl px-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/map/full_map.png"
              alt="The five sound-wave islands of PlayMuse"
              width={3508}
              height={960}
              priority
              className="h-auto w-full select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== WORLDS ===================== */}
      <WaveSection tone="cream" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading kicker="PlayMuse" title={dict.home.worldsTitle} banner />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center font-body text-base leading-relaxed text-ink/70">
              {dict.home.worldsBody}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {ZONES.map((zone, i) => (
              <Reveal key={zone.key} delay={i * 0.08}>
                <IslandCard accent={zone.accent} className="h-full">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {dict.building.worlds[zone.key].name}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">
                    {dict.building.worlds[zone.key].desc}
                  </p>
                </IslandCard>
              </Reveal>
            ))}
          </div>
        </div>
      </WaveSection>

      {/* ===================== CAST ===================== */}
      <WaveSection tone="sky" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={dict.home.castTitle} />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-center font-body text-base leading-relaxed text-ink/70">
              {dict.home.castBody}
            </p>
          </Reveal>
          <div className="mt-12 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {CAST.map((c, i) => (
              <div key={c.name} className="w-24 sm:w-32">
                <FloatingCharacter
                  src={c.src}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  delay={i * 0.4}
                  duration={6 + i * 0.5}
                />
                <p className="mt-2 text-center font-display text-sm font-semibold text-ink/70">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </WaveSection>

      {/* ===================== STATUS + CONTACT ===================== */}
      <WaveSection tone="cream" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <IslandCard accent="sand" className="h-full">
                <h3 className="font-display text-2xl font-semibold text-ink">{dict.home.statusTitle}</h3>
                <p className="mt-3 font-body leading-relaxed text-ink/70">{dict.home.statusBody}</p>
              </IslandCard>
            </Reveal>
            <Reveal delay={0.1}>
              <IslandCard accent="coral" className="h-full">
                <h3 className="font-display text-2xl font-semibold text-ink">{dict.home.contactTitle}</h3>
                <p className="mt-3 font-body leading-relaxed text-ink/70">{dict.home.contactBody}</p>
                <div className="mt-5">
                  <PillButton href={`mailto:${dict.common.email}`} variant="sun">
                    {dict.common.email}
                  </PillButton>
                </div>
              </IslandCard>
            </Reveal>
          </div>
        </div>
      </WaveSection>
    </>
  );
}
