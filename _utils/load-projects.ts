import {
  catalogEntryToListItem,
  getHomeCatalogEntries,
  getProjectFromCatalog,
  getSortedCatalog,
} from "./projects.config";
import type { ProjectListItem } from "./projects.config";

export type { ProjectListItem };

/** Projetos exibidos na secção Selected_Works (respeita `listOnHome`) */
export function getAllProjects(): ProjectListItem[] {
  return getHomeCatalogEntries().map(catalogEntryToListItem);
}

/** Todos os projetos do catálogo (navegação lateral, etc.) */
export function getAllProjectsForNav(): ProjectListItem[] {
  return getSortedCatalog().map(catalogEntryToListItem);
}

export function getProjectBySlug(slug: string): ProjectListItem | undefined {
  const entry = getProjectFromCatalog(slug);
  return entry ? catalogEntryToListItem(entry) : undefined;
}
