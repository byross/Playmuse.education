"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";

export function NavBar() {
  const { dict } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/",         label: dict.nav.home     },
    { href: "/about",    label: dict.nav.about    },
    { href: "/building", label: dict.nav.building },
    { href: "/team",     label: dict.nav.team     },
    { href: "/info",     label: dict.nav.info     },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="border-b-[3px] border-ink bg-paper/90 backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          {/* Logo */}
          <Link href="/" aria-label="PlayMuse Education — Home" className="shrink-0">
            <motion.span
              className="inline-flex"
              whileHover={{ rotate: -4, scale: 1.06 }}
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 },
                whileHover: { type: "spring", stiffness: 300, damping: 10 },
              }}
            >
              <Image
                src="/playmuse_logo.png"
                alt="PlayMuse"
                width={817}
                height={578}
                priority
                className="h-10 w-auto sm:h-12"
              />
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 font-display text-sm font-bold transition-colors ${
                    active ? "text-ink" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border-[2.5px] border-ink bg-sun"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <SoundToggle />
            <LanguageToggle />

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={dict.nav.menu}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-sun shadow-[var(--shadow-sticker-sm)] lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-full rounded bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-full rounded bg-ink transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t-[3px] border-ink bg-paper lg:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
                {links.map((link, i) => {
                  const active = isActive(link.href);
                  const COLORS = ["bg-sun", "bg-sky", "bg-coral", "bg-leaf", "bg-crystal"];
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-base font-bold transition-colors ${
                        active
                          ? `${COLORS[i % COLORS.length]} border-[2px] border-ink text-ink shadow-[var(--shadow-sticker-sm)]`
                          : "text-ink/65 hover:text-ink"
                      }`}
                    >
                      {active && <span className="text-lg">★</span>}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
