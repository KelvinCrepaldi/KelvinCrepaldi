"use client";

import { useLocale, useTranslations } from "./locale-provider";
import type { Locale } from "@/_i18n/locales";

type LanguageSelectProps = {
  className?: string;
};

export function LanguageSelect({ className = "" }: LanguageSelectProps) {
  const { locale, setLocale, ready } = useLocale();
  const t = useTranslations();

  if (!ready) {
    return (
      <span
        className={`inline-flex h-9 w-[4.25rem] shrink-0 ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <label
      className={`relative z-[60] inline-flex h-9 shrink-0 items-center ${className}`.trim()}
    >
      <span className="sr-only">{t.language.label}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={t.language.label}
        className="h-9 cursor-pointer appearance-none border border-transparent bg-transparent px-2 font-space-grotesk text-xs font-bold uppercase tracking-widest outline-none transition-colors duration-300 hover:bg-on-surface/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface/40"
      >
        <option value="pt-BR">{t.language.pt}</option>
        <option value="en">{t.language.en}</option>
      </select>
    </label>
  );
}
