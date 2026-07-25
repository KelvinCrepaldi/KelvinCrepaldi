"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { getDictionary } from "@/_i18n/get-dictionary";
import type { Dictionary } from "@/_i18n/messages/pt-BR";
import {
  DEFAULT_LOCALE,
  detectBrowserLocale,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  localeToHtmlLang,
  type Locale,
} from "@/_i18n/locales";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Dictionary;
  /** true após sincronizar locale no cliente */
  ready: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const s = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(s)) return s;
    return null;
  } catch {
    return null;
  }
}

function writeCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${maxAge};SameSite=Lax`;
}

function syncDomLang(locale: Locale) {
  document.documentElement.lang = localeToHtmlLang(locale);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  const applyLocale = useCallback(
    (next: Locale, { persist, refresh }: { persist: boolean; refresh: boolean }) => {
      setLocaleState(next);
      syncDomLang(next);
      writeCookie(next);
      if (persist) {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      }
      if (refresh) {
        router.refresh();
      }
    },
    [router],
  );

  useLayoutEffect(() => {
    const stored = readStoredLocale();
    const resolved =
      stored ??
      detectBrowserLocale(
        typeof navigator !== "undefined"
          ? navigator.languages?.length
            ? navigator.languages
            : [navigator.language]
          : undefined,
      );
    applyLocale(resolved, { persist: Boolean(stored), refresh: false });
    // Garante cookie mesmo na primeira visita (detecção do sistema)
    writeCookie(resolved);
    setReady(true);
  }, [applyLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      applyLocale(next, { persist: true, refresh: true });
    },
    [applyLocale],
  );

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, dictionary, ready }),
    [locale, setLocale, dictionary, ready],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useTranslations() {
  return useLocale().dictionary;
}
