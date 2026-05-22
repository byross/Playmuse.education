"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { Doodles } from "@/components/decor/Doodles";

export function Footer() {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: "/privacy", label: dict.footer.privacy },
    { href: "/terms",   label: dict.footer.terms   },
    { href: "/cookies", label: dict.footer.cookies  },
  ];

  return (
    <footer className="mt-0">
      {/*
        Outer wrapper: relative but NOT overflow-hidden.
        This lets the WaveDivider's negative translate escape upward
        into the preceding section, exactly like WaveSection does.
      */}
      <div className="relative">
        {/* Wave that overlaps into the section above */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[calc(100%-1px)]"
          style={{ color: "var(--color-sun)" }}
        >
          <WaveDivider height={80} />
        </div>

        {/*
          Inner content wrapper: overflow-hidden keeps Doodles
          and other absolutely-placed decorations clipped inside.
        */}
        <div className="relative overflow-hidden bg-sun text-ink">
          <Doodles count={6} />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr_auto]">
            {/* Brand column */}
            <div className="flex flex-col gap-4">
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="w-fit"
              >
                <Image
                  src="/logo_animation.gif"
                  alt="PlayMuse Education"
                  width={1578}
                  height={1217}
                  unoptimized
                  className="h-14 w-auto"
                />
              </motion.div>
              <p className="max-w-xs font-body text-sm font-medium text-ink/80">
                {dict.footer.tagline}
              </p>
              {/* Decorative music notes row */}
              <div className="flex gap-2 text-xl" aria-hidden>
                {["🎵", "🎶", "🎸", "🎹", "🥁"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Info column */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-bold">{dict.info.title}</h3>
              <address className="font-body text-sm not-italic leading-relaxed text-ink/80">
                {dict.info.address.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
                <a
                  className="mt-2 inline-block rounded-full border-[2px] border-ink bg-ink px-3 py-1 font-display text-xs font-bold text-sun shadow-[var(--shadow-sticker-sm)] transition-transform hover:scale-105"
                  href={`mailto:${dict.common.email}`}
                >
                  ✉ {dict.common.email}
                </a>
              </address>
            </div>

            {/* Legal column */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-bold">{dict.footer.legalTitle}</h3>
              <ul className="flex flex-col gap-2 font-body text-sm font-medium text-ink/80">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Waving character */}
            <div className="hidden md:flex md:items-end">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-24"
              >
                <Image
                  src="/images/character/Muser_1_girl.png"
                  alt="PlayMuse character waving"
                  width={200}
                  height={380}
                  className="h-auto w-full select-none drop-shadow-[0_8px_14px_rgba(23,19,15,0.2)]"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>

          <div className="border-t-[3px] border-ink/20">
            <p className="mx-auto flex max-w-6xl items-center gap-1.5 px-6 py-4 font-body text-xs font-medium text-ink/70">
              <span className="inline-grid h-[1.1em] w-[1.1em] place-items-center rounded-full border border-current text-[0.7em] font-bold">
                ©
              </span>
              <span>
                {year} PlayMuse Education Limited. {dict.footer.rights}
              </span>
            </p>
          </div>

        </div>{/* end overflow-hidden inner */}
      </div>{/* end outer relative */}
    </footer>
  );
}
