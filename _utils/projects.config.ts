/**
 * Catálogo manual de projetos — edite esta lista para controlar ordem, dados exibidos
 * e quais entradas aparecem na home (`listOnHome: false` oculta só da grelha).
 *
 * Explicações em Markdown: `_utils/projects/explanations/{slug}.md`
 */

export type ProjectCatalogEntry = {
  slug: string;
  vol: string;
  title: string;
  excerpt: string;
  tags: string[];
  lastStableBuild: string;
  /** Menor = mais acima na sidebar e na ordem geral */
  sortOrder: number;
  /** Default: true. `false` = não lista no bloco Selected_Works da home */
  listOnHome?: boolean;
};

export const PROJECTS_CATALOG: ProjectCatalogEntry[] = [
  {
    slug: "totem-platform",
    vol: "VOL_01",
    title: "Totem_Platform",
    excerpt:
      "Plataforma completa de totens interativos: Dashboard Next.js + API, apps Vite no Electron, offline-first e integração com periféricos.",
    tags: ["Next.js", "Electron", "Vite", "Supabase"],
    lastStableBuild: "2024.08.15",
    sortOrder: 1,
    listOnHome: true,
  },
  {
    slug: "terminal-core",
    vol: "VOL_02",
    title: "Terminal_Core",
    excerpt:
      "Desktop application built with Electron for deep-level file system manipulation and indexing.",
    tags: ["Electron", "Node"],
    lastStableBuild: "2024.02.28",
    sortOrder: 2,
    listOnHome: true,
  },
  {
    slug: "nexus-api",
    vol: "VOL_03",
    title: "Nexus_API",
    excerpt:
      "Distributed backend architecture handling asynchronous data ingestion from multiple remote sensors.",
    tags: ["Express", "Redis"],
    lastStableBuild: "2023.11.15",
    sortOrder: 3,
    listOnHome: true,
  },
  {
    slug: "void-gallery",
    vol: "VOL_04",
    title: "Void_Gallery",
    excerpt:
      "Experimental visual engine built with Next.js for high-definition asset archival and rendering.",
    tags: ["Next.js", "Three.js"],
    lastStableBuild: "2024.05.01",
    sortOrder: 4,
    listOnHome: true,
  },
];

export type ProjectListItem = ProjectCatalogEntry & {
  content: string;
};

function sortedCatalog(): ProjectCatalogEntry[] {
  return [...PROJECTS_CATALOG].sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Todos os projetos (sidebar, rotas estáticas, etc.) */
export function getSortedCatalog(): ProjectCatalogEntry[] {
  return sortedCatalog();
}

/** Só os que devem aparecer na home */
export function getHomeCatalogEntries(): ProjectCatalogEntry[] {
  return sortedCatalog().filter((p) => p.listOnHome !== false);
}

export function getProjectFromCatalog(
  slug: string,
): ProjectCatalogEntry | undefined {
  return PROJECTS_CATALOG.find((p) => p.slug === slug);
}

export function catalogEntryToListItem(
  entry: ProjectCatalogEntry,
): ProjectListItem {
  return { ...entry, content: "" };
}
