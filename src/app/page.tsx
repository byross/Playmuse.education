"use client";

import Image from "next/image";
import { motion } from "motion/react";
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

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        className="relative overflow-hidden pb-0"
        style={{ background: "var(--color-paper)" }}
      >
        <FloatingNotes />
        <Doodles count={7} />

        {/* Centred hero layout */}
        <div className="relative mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center sm:pt-32">

          {/* Kicker badge */}
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

          {/* ——— Logo — hero centrepiece ——— */}
          <Reveal delay={0.1} variant="pop">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04, rotate: -1 }}
              className="mt-8 cursor-default md:mt-10"
            >
              <Image
                src="/playmuse_logo.png"
                alt="PlayMuse Education"
                width={817}
                height={578}
                priority
                className="h-auto w-[240px] select-none drop-shadow-[0_16px_48px_rgba(247,198,0,0.45)] sm:w-[360px] md:w-[500px] lg:w-[580px]"
                draggable={false}
              />
            </motion.div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl font-body text-base leading-relaxed text-ink/70 sm:text-lg">
              {dict.home.lead}
            </p>
          </Reveal>

          {/* CTA row */}
          <Reveal delay={0.3} variant="pop">
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PillButton href="/building" variant="sun" size="lg">
                🎵 {dict.home.ctaPrimary}
              </PillButton>
              <PillButton href="/about" variant="sky" size="lg">
                {dict.home.ctaSecondary} →
              </PillButton>
            </div>
          </Reveal>

          {/* Tappable note — plays chime */}
          <motion.button
            aria-label="Play a note"
            onClick={() => playSound("chime")}
            className="absolute right-[6%] top-[12%] cursor-pointer rounded-full border-[2px] border-ink bg-sun/80 p-2 shadow-[var(--shadow-sticker-sm)]"
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
          <motion.p
            className="absolute right-[2%] top-[22%] font-display text-[10px] font-bold text-ink/50"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            aria-hidden
          >
            tap me! 🎵
          </motion.p>

          {/* Left accent character — peeking from bottom-left */}
          <motion.div
            className="absolute -bottom-2 left-0 hidden w-28 md:block lg:w-36"
            animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <Image
              src="/images/character/Lumi.png"
              alt=""
              width={200}
              height={380}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </motion.div>

          {/* Right accent character — peeking from bottom-right */}
          <motion.div
            className="absolute -bottom-2 right-0 hidden w-28 md:block lg:w-36"
            animate={{ y: [0, -10, 0], rotate: [0, -2, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            aria-hidden
          >
            <Image
              src="/images/character/Rowan.png"
              alt=""
              width={200}
              height={380}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* KV yellow wave — brand bottom boundary */}
        <div className="pointer-events-none relative w-full" aria-hidden>
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
                  <SpeechBubble color={c.color as "sun" | "sky" | "coral" | "leaf" | "crystal"} tail="bottom">
                    {c.quote}
                  </SpeechBubble>
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
