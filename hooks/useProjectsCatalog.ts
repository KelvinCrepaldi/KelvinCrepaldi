"use client";

import { useMemo } from "react";

import {
  homeProjects,
  PROJECTS_CATALOG,
  type Project,
} from "@/_utils/projects";

export type CatalogMode = "home" | "all";

export function useProjectsCatalog(mode: CatalogMode = "home"): Project[] {
  return useMemo(() => {
    if (mode === "all") return PROJECTS_CATALOG;
    return homeProjects();
  }, [mode]);
}
