import totemMd from "@/_content/projects/totem-platform.md";
import terminalMd from "@/_content/projects/terminal-core.md";
import nexusMd from "@/_content/projects/nexus-api.md";
import voidMd from "@/_content/projects/void-gallery.md";

export type Project = {
  slug: string;
  vol: string;
  title: string;
  excerpt: string;
  tags: string[];
  lastStableBuild: string;
  sortOrder: number;
  /** Texto longo em Markdown (corpo da página do projeto) */
  md: string;
  subtitle: string;
  /** `false` = não entra na grelha da home */
  listOnHome?: boolean;
};

const unsorted: Project[] = [
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
    subtitle: "Plataforma de totens interativos com configuração em nuvem",
    md: totemMd,
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
    subtitle: "Aplicação desktop para indexação profunda",
    md: terminalMd,
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
    subtitle: "Backend distribuído para ingestão assíncrona",
    md: nexusMd,
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
    subtitle: "Motor visual experimental para arquivo em alta definição",
    md: voidMd,
  },
];

/** Catálogo ordenado por `sortOrder` — única fonte de verdade. */
export const PROJECTS_CATALOG = [...unsorted].sort(
  (a, b) => a.sortOrder - b.sortOrder,
);

export const projectBySlug = Object.fromEntries(
  PROJECTS_CATALOG.map((p) => [p.slug, p]),
) as Record<string, Project>;

export function homeProjects(): Project[] {
  return PROJECTS_CATALOG.filter((p) => p.listOnHome !== false);
}

export function getProject(slug: string): Project | undefined {
  return projectBySlug[slug];
}
