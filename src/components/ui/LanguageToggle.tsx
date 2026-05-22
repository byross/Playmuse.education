"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center rounded-full border-[3px] border-ink bg-cream p-0.5 font-display text-sm font-semibold shadow-[var(--shadow-sticker-sm)] ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["en", "zh"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className="relative z-10 rounded-full px-3 py-1 transition-colors"
            style={{ color: active ? "var(--color-ink)" : "rgba(23,19,15,0.45)" }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-sun"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
            {code === "en" ? "EN" : "繁中"}
          </button>
        );
      })}
    </div>
  );
}
