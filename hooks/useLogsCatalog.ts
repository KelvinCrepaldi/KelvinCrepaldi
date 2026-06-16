"use client";

import { useMemo } from "react";

import {
  latestLogs,
  publishedLogs,
  type LogPost,
} from "@/_utils/logs";

export type LogsCatalogMode = "latest" | "all";

export function useLogsCatalog(
  mode: LogsCatalogMode = "latest",
  latestCount = 5,
): LogPost[] {
  return useMemo(() => {
    if (mode === "all") return publishedLogs();
    return latestLogs(latestCount);
  }, [mode, latestCount]);
}
