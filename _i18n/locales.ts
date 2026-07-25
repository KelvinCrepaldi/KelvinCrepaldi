export const LOCALES = ["pt-BR", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-BR";

export const LOCALE_STORAGE_KEY = "kelvin-portfolio-locale";
export const LOCALE_COOKIE = "kelvin-portfolio-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "pt-BR" || value === "en";
}

/** Normaliza tags BCP-47 / Accept-Language para um Locale suportado. */
export function normalizeLocale(raw: string | null | undefined): Locale | null {
  if (!raw) return null;
  const tag = raw.trim().toLowerCase();
  if (!tag) return null;
  if (tag === "pt-br" || tag === "pt_br" || tag.startsWith("pt")) {
    return "pt-BR";
  }
  if (tag === "en" || tag.startsWith("en-") || tag.startsWith("en_")) {
    return "en";
  }
  return null;
}

export function detectBrowserLocale(
  languages: readonly string[] | undefined,
): Locale {
  if (!languages?.length) return DEFAULT_LOCALE;
  for (const lang of languages) {
    const matched = normalizeLocale(lang);
    if (matched === "pt-BR") return "pt-BR";
  }
  for (const lang of languages) {
    const matched = normalizeLocale(lang);
    if (matched === "en") return "en";
  }
  // Idioma do sistema presente, mas não é pt → inglês
  return "en";
}

/** Parseia o header Accept-Language (ex.: `en-US,en;q=0.9,pt-BR;q=0.8`). */
export function detectFromAcceptLanguage(
  header: string | null | undefined,
): Locale {
  if (!header) return DEFAULT_LOCALE;
  const parts = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number(q.trim().slice(2)) : 1;
      return { tag: tag?.trim() ?? "", quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter((p) => p.tag)
    .sort((a, b) => b.quality - a.quality);

  if (!parts.length) return DEFAULT_LOCALE;

  for (const { tag } of parts) {
    if (normalizeLocale(tag) === "pt-BR") return "pt-BR";
  }
  return "en";
}

export function localeToHtmlLang(locale: Locale): string {
  return locale;
}

export function localeToIntl(locale: Locale): string {
  return locale === "pt-BR" ? "pt-BR" : "en-US";
}
