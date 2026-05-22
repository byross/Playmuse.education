"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

type Section = {
  h: string;
  p: readonly string[];
  list?: readonly string[];
  after?: readonly string[];
};

type LegalDoc = {
  title: string;
  sections: readonly Section[];
};

export function LegalPage({ docKey }: { docKey: "privacy" | "terms" | "cookies" }) {
  const { dict } = useLanguage();
  const doc = dict.legal[docKey] as LegalDoc;

  return (
    <>
      <PageHeader title={doc.title} intro={dict.legal.lastUpdated} tint="sky" />

      <section className="mx-auto max-w-3xl px-6 py-14">
        <article className="flex flex-col gap-9">
          {doc.sections.map((section, i) => (
            <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{section.h}</h2>
              <div className="mt-3 flex flex-col gap-3 font-body leading-relaxed text-ink/75">
                {section.p.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
                {section.list ? (
                  <ul className="ml-1 flex flex-col gap-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-deep" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.after?.map((para, j) => (
                  <p key={`a${j}`}>{para}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </article>
      </section>
    </>
  );
}
