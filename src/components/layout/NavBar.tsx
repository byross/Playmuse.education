"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function NavBar() {
  const { dict } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/building", label: dict.nav.building },
    { href: "/team", label: dict.nav.team },
    { href: "/info", label: dict.nav.info },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="border-b-[3px] border-ink bg-paper/85 backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="PlayMuse Education — Home" className="shrink-0">
            <motion.span
              className="inline-flex"
              whileHover={{ rotate: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
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

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
                    active ? "text-ink" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border-[2.5px] border-ink bg-sun"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
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
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 font-display text-base font-semibold ${
                      isActive(link.href) ? "bg-sun text-ink" : "text-ink/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
