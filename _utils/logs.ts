import apiExpressTypeOrm from "@/_content/logs/api_express_typeOrm.md"

import { parseDotDate } from "./dates";

export { formatLogDate } from "./dates";

export type LogPost = {
  slug: string;
  logId: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  /** Texto longo em Markdown (corpo da página do log) */
  md: string;
  /** `true` = não entra no catálogo público */
  draft?: boolean;
};

const unsorted: LogPost[] = [
  {
    slug: "API_Express_TypeORM",
    logId: "LOG_001",
    title: "API_Express+TypeORM",
    excerpt:
      "Anotações para implementação de API com Express + TypeORM (com autenticação, middleware global e arquitetura organizada)",
    publishedAt: "2026.06.22",
    tags: ["Express", "Back-end"],
    md: apiExpressTypeOrm,
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
