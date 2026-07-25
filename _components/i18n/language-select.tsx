"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { LOCALES, type Locale } from "@/_i18n/locales";

import { useLocale, useTranslations } from "./locale-provider";

type LanguageSelectProps = {
  className?: string;
};

export function LanguageSelect({ className = "" }: LanguageSelectProps) {
  const { locale, setLocale, ready } = useLocale();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const labels: Record<Locale, string> = {
    "pt-BR": t.language.pt,
    en: t.language.en,
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!ready) {
    return (
      <span
        className={`inline-flex h-9 w-[4.25rem] shrink-0 ${className}`}
        aria-hidden
      />
    );
  }

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`relative z-[60] inline-flex h-9 shrink-0 items-center ${className}`.trim()}
    >
      <button
        type="button"
        aria-label={t.language.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-9 cursor-pointer items-center gap-1 border border-transparent bg-transparent px-2 font-space-grotesk text-xs font-bold uppercase tracking-widest outline-none transition-colors duration-300 hover:bg-on-surface/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface/40"
      >
        <span>{labels[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t.language.label}
          className="absolute right-0 top-[calc(100%+0.35rem)] min-w-full overflow-hidden border border-outline-variant/40 bg-surface/70 py-1 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:bg-surface/75"
        >
          {LOCALES.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => choose(code)}
                  className={`flex w-full items-center px-3 py-2 text-left font-space-grotesk text-xs font-bold uppercase tracking-widest text-on-surface transition-colors duration-150 ${
                    selected
                      ? "bg-on-surface/12"
                      : "bg-transparent hover:bg-on-surface/8"
                  }`}
                >
                  {labels[code]}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
