import { LOGS_CATALOG, formatLogDate } from "@/_utils/logs";

import type { ArchiveEntry } from "./types";

export function logArchiveEntries(): ArchiveEntry[] {
  return LOGS_CATALOG.map((log) => ({
    slug: log.slug,
    code: log.logId,
    title: log.title,
    meta: formatLogDate(log.publishedAt),
    href: `/log/${log.slug}`,
  }));
}
