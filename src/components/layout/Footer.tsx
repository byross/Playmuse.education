"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WaveDivider } from "@/components/ui/WaveDivider";

export function Footer() {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: "/privacy", label: dict.footer.privacy },
    { href: "/terms", label: dict.footer.terms },
    { href: "/cookies", label: dict.footer.cookies },
  ];

  return (
    <footer className="mt-24">
      <WaveDivider className="text-sun" />
      <div className="bg-sun text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Image
              src="/playmuse_logo.png"
              alt="PlayMuse Education"
              width={817}
              height={578}
              className="h-14 w-auto self-start"
            />
            <p className="max-w-xs font-body text-sm font-medium text-ink/80">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-semibold">{dict.info.title}</h3>
            <address className="font-body text-sm not-italic leading-relaxed text-ink/80">
              {dict.info.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a className="mt-2 inline-block font-bold underline" href={`mailto:${dict.common.email}`}>
                {dict.common.email}
              </a>
            </address>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-semibold">{dict.footer.legalTitle}</h3>
            <ul className="flex flex-col gap-2 font-body text-sm font-medium text-ink/80">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-[3px] border-ink/15">
          <p className="mx-auto flex max-w-6xl items-center gap-1.5 px-6 py-4 font-body text-xs font-medium text-ink/70">
            <span className="inline-grid h-[1.1em] w-[1.1em] place-items-center rounded-full border border-current text-[0.7em] font-bold">
              ©
            </span>
            <span>
              {year} PlayMuse Education Limited. {dict.footer.rights}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
