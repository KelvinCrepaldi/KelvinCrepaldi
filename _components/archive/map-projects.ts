import { PROJECTS_CATALOG } from "@/_utils/projects";

import type { ArchiveEntry } from "./types";

export function projectArchiveEntries(): ArchiveEntry[] {
  return PROJECTS_CATALOG.map((p) => ({
    slug: p.slug,
    code: p.vol,
    title: p.title,
    meta: `[${p.slug}]`,
    href: `/projects/${p.slug}`,
  }));
}
