import apiExpressTypeOrm from "@/_content/logs/api_express_typeOrm.md";
import apiExpressTypeOrmEn from "@/_content/logs/api_express_typeOrm.en.md";
import nextI18nLocaleProvider from "@/_content/logs/next_i18n_locale_provider.md";
import nextI18nLocaleProviderEn from "@/_content/logs/next_i18n_locale_provider.en.md";

import type { Locale } from "@/_i18n/locales";
import { L, pickLocalized, type LocalizedText } from "@/_i18n/localize";
import { parseDotDate } from "./dates";

export { formatLogDate } from "./dates";

export type LogPost = {
  slug: string;
  logId: string;
  title: string;
  excerpt: LocalizedText;
  publishedAt: string;
  tags: string[];
  /** Texto longo em Markdown (corpo da página do log) */
  md: LocalizedText;
  /** `true` = não entra no catálogo público */
  draft?: boolean;
};

export type ResolvedLogPost = Omit<LogPost, "excerpt" | "md"> & {
  excerpt: string;
  md: string;
};

export function resolveLog(log: LogPost, locale: Locale): ResolvedLogPost {
  return {
    ...log,
    excerpt: pickLocalized(log.excerpt, locale),
    md: pickLocalized(log.md, locale),
  };
}

const unsorted: LogPost[] = [
  {
    slug: "Next_i18n_LocaleProvider",
    logId: "LOG_002",
    title: "Next_i18n+LocaleProvider",
    excerpt: L(
      "Guia didático de i18n no Next.js App Router: detecção do navegador, localStorage, cookie, dicionários e Markdown em dois idiomas.",
      "A didactic guide to i18n in the Next.js App Router: browser detection, localStorage, cookies, dictionaries, and Markdown in two languages.",
    ),
    publishedAt: "2026.07.25",
    tags: ["Next.js", "i18n"],
    md: L(nextI18nLocaleProvider, nextI18nLocaleProviderEn),
  },
  {
    slug: "API_Express_TypeORM",
    logId: "LOG_001",
    title: "API_Express+TypeORM",
    excerpt: L(
      "Anotações para implementação de API com Express + TypeORM (com autenticação, middleware global e arquitetura organizada)",
      "Notes on implementing an API with Express + TypeORM (authentication, global middleware, and organized architecture)",
    ),
    publishedAt: "2026.06.22",
    tags: ["Express", "Back-end"],
    md: L(apiExpressTypeOrm, apiExpressTypeOrmEn),
  },
];

function parsePublishedAt(date: string): number {
  return parseDotDate(date).getTime();
}

/** Catálogo ordenado por data de publicação (mais recente primeiro). */
export const LOGS_CATALOG = [...unsorted]
  .filter((p) => p.draft !== true)
  .sort((a, b) => parsePublishedAt(b.publishedAt) - parsePublishedAt(a.publishedAt));

export const logBySlug = Object.fromEntries(
  LOGS_CATALOG.map((p) => [p.slug, p]),
) as Record<string, LogPost>;

export function publishedLogs(): LogPost[] {
  return LOGS_CATALOG;
}

export function latestLogs(count = 5): LogPost[] {
  return LOGS_CATALOG.slice(0, count);
}

export function getLog(slug: string): LogPost | undefined {
  return logBySlug[slug];
}
