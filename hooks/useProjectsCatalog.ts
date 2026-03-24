"use client";

import { useMemo } from "react";

import {
  catalogEntryToListItem,
  getHomeCatalogEntries,
  getSortedCatalog,
  type ProjectListItem,
} from "@/_utils/projects.config";

export type UseProjectsCatalogMode = "home" | "all";

/**
 * Lista de projetos a partir do catálogo manual (`_utils/projects.config.ts`).
 * - `home`: só entradas com `listOnHome !== false` (igual à grelha da home).
 * - `all`: catálogo completo ordenado por `sortOrder` (sidebar, menus).
 */
export function useProjectsCatalog(
  mode: UseProjectsCatalogMode = "home",
): ProjectListItem[] {
  return useMemo(() => {
    if (mode === "all") {
      return getSortedCatalog().map(catalogEntryToListItem);
    }
    return getHomeCatalogEntries().map(catalogEntryToListItem);
  }, [mode]);
}
