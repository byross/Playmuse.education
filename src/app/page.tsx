"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSound } from "@/components/audio/SoundProvider";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IslandCard } from "@/components/ui/IslandCard";
import { FloatingCharacter } from "@/components/ui/FloatingCharacter";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { WorldTile } from "@/components/ui/WorldTile";
import { FloatingNotes } from "@/components/decor/FloatingNotes";
import { Doodles } from "@/components/decor/Doodles";
import { WaveSection } from "@/components/layout/WaveSection";

const ZONES = [
  { accent: "leaf",    key: 0, img: "/images/map/zone-A.png"               },
  { accent: "sky",     key: 1, img: "/images/map/zone-B.png"               },
  { accent: "sand",    key: 2, img: "/images/element/wave.png"             },
  { accent: "coral",   key: 3, img: "/images/element/harp.png"             },
  { accent: "crystal", key: 4, img: "/images/map/Mountain.png"             },
] as const;

const CAST = [
  { src: "/images/character/Lumi.png",  name: "Lumi",  w: 200, h: 380, quote: "Let's sing! 🎵", color: "sun"     },
  { src: "/images/character/Finn.png",  name: "Finn",  w: 200, h: 380, quote: "Boom boom! 🥁", color: "sky"     },
  { src: "/images/character/Skye.png",  name: "Skye",  w: 200, h: 380, quote: "La la la! 🎶",  color: "coral"   },
  { src: "/images/character/Ash.png",   name: "Ash",   w: 200, h: 380, quote: "I ♥ music!",   color: "leaf"    },
  { src: "/images/character/Rowan.png", name: "Rowan", w: 200, h: 380, quote: "Play with me!", color: "crystal" },
] as const;

const CAST_BADGES = ["bg-sun", "bg-sky", "bg-coral", "bg-leaf", "bg-crystal"];

export default function Home() {
  const { dict } = useLanguage();
  const { playSound } = useSound();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pb-0 pt-14 sm:pt-20"
        style={{ background: "var(--color-paper)" }}
      >
        <FloatingNotes />
        <Doodles count={8} />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal variant="pop">
            <span className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-sun px-5 py-1.5 font-display text-xs font-bold uppercase tracking-[0.25em] text-ink shadow-[var(--shadow-sticker-sm)]">
              <motion.span
                animate={{ scale: [1, 1.6, 1], rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-base"
                aria-hidden
              >
                ★
              </motion.span>
              {dict.home.kicker}
            </span>
          </Reveal>

          <Reveal delay={0.08} variant="pop">
            <h1 className="mx-auto mt-5 max-w-3xl font-hand text-5xl font-normal leading-[1.1] text-ink sm:text-7xl">
              {dict.home.title}{" "}
              <span className="relative inline-block">
                <span className="candy-text">{dict.home.titleAccent}</span>
                <motion.svg
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                >
                  <motion.path
                    d="M4 10 C 80 2, 220 2, 296 9"
                    stroke="#f05590"
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

          <Reveal delay={0.24} variant="pop">
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PillButton href="/building" variant="sun" size="lg">
                🎵 {dict.home.ctaPrimary}
              </PillButton>
              <PillButton href="/about" variant="sky" size="lg">
                {dict.home.ctaSecondary} →
              </PillButton>
            </div>
          </Reveal>

          {/* Tappable interactive note — plays chime */}
          <motion.button
            aria-label="Play a note"
            onClick={() => playSound("chime")}
            className="absolute right-[6%] top-[8%] cursor-pointer rounded-full border-[2px] border-ink bg-sun/80 p-2 shadow-[var(--shadow-sticker-sm)]"
            animate={{ y: [0, -12, 0], rotate: [0, 15, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileTap={{ scale: 1.5, rotate: 30 }}
            whileHover={{ scale: 1.2 }}
          >
            <Image
              src="/images/element/music_notes_3.png"
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 rotate-90 select-none"
              draggable={false}
            />
          </motion.button>

          {/* Tap-me label */}
          <motion.p
            className="absolute right-[2%] top-[18%] font-display text-[10px] font-bold text-ink/50"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            aria-hidden
          >
            tap me! 🎵
          </motion.p>
        </div>

        {/* Map + peeking characters */}
        <motion.div style={{ y: mapY }} className="relative mx-auto mt-12 max-w-6xl px-4">
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
              className="h-auto w-full select-none drop-shadow-[0_20px_40px_rgba(23,19,15,0.18)]"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* KV yellow wave — matches brand key visual */}
        <div className="pointer-events-none relative mt-2 w-full" aria-hidden>
          <Image
            src="/footer_bg.png"
            alt=""
            width={1920}
            height={220}
            className="h-auto w-full select-none"
            priority
            draggable={false}
          />
        </div>
      </section>

      {/* ===================== WORLDS (gamified tiles) ===================== */}
      <WaveSection tone="sky" noWave className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading kicker="PlayMuse" title={dict.home.worldsTitle} banner />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center font-body text-base leading-relaxed text-ink/70">
              {dict.home.worldsBody}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {ZONES.map((zone, i) => (
              <Reveal key={zone.key} delay={i * 0.07} variant="pop">
                <WorldTile
                  accent={zone.accent}
                  name={dict.building.worlds[zone.key].name}
                  desc={dict.building.worlds[zone.key].desc}
                  imageSrc={zone.img}
                  exploreLabel={dict.common.explore}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </WaveSection>

      {/* ===================== CAST ===================== */}
      <WaveSection tone="rose" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={dict.home.castTitle} />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-center font-body text-base leading-relaxed text-ink/70">
              {dict.home.castBody}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-end justify-center gap-6 sm:gap-8">
            {CAST.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1} variant="pop">
                <div className="flex w-28 flex-col items-center gap-1 sm:w-36">
                  {/* Speech bubble */}
                  <SpeechBubble color={c.color as "sun" | "sky" | "coral" | "leaf" | "crystal"} tail="bottom">
                    {c.quote}
                  </SpeechBubble>

                  {/* Character */}
                  <div className="mt-1 w-full">
                    <FloatingCharacter
                      src={c.src}
                      alt={c.name}
                      width={c.w}
                      height={c.h}
                      delay={i * 0.4}
                      duration={6 + i * 0.5}
                    />
                  </div>

                  {/* Sticker name badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className={`sticker-badge ${CAST_BADGES[i]} text-ink`}
                  >
                    {c.name}
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </WaveSection>

      {/* ===================== STATUS + CONTACT ===================== */}
      <WaveSection tone="sun" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal variant="pop">
              <IslandCard accent="sand" badge="🚀" className="h-full">
                <h3 className="font-display text-2xl font-bold text-ink">{dict.home.statusTitle}</h3>
                <p className="mt-3 font-body leading-relaxed text-ink/70">{dict.home.statusBody}</p>
                <div className="mt-4">
                  <PillButton href="/building" variant="sky" size="sm">
                    {dict.nav.building} →
                  </PillButton>
                </div>
              </IslandCard>
            </Reveal>
            <Reveal delay={0.1} variant="pop">
              <IslandCard accent="coral" badge="✉" className="h-full">
                <h3 className="font-display text-2xl font-bold text-ink">{dict.home.contactTitle}</h3>
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
