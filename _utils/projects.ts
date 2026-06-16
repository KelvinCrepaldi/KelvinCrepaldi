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

const PICSUM_BASE = "https://picsum.photos";

/**
 * Capa placeholder estável por `slug` (Lorem Picsum com seed).
 * Mesma URL no card da home e no cabeçalho do detalhe — só variar `width`/`height` conforme o layout.
 */
export function projectCoverUrl(
  slug: string,
  width = 1200,
  height = 675,
): string {
  const safe = encodeURIComponent(slug);
  return `${PICSUM_BASE}/seed/${safe}/${width}/${height}`;
}

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
      "Aplicação desktop em Electron para manipulação e indexação profunda do sistema de arquivos.",
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
      "Arquitetura backend distribuída para ingestão assíncrona de dados de múltiplos sensores remotos.",
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
      "Galeria arquivística para ativos pesados (imagens e cenas 3D) com carregamento progressivo e foco no objeto.",
    tags: ["Next.js", "Three.js"],
    lastStableBuild: "2023.09.01",
    sortOrder: 4,
    listOnHome: true,
    subtitle: "Navegação deliberada de ativos visuais pesados",
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

export const HOME_PROJECTS_LIMIT = 3;

export function homeProjects(limit = HOME_PROJECTS_LIMIT): Project[] {
  return PROJECTS_CATALOG.filter((p) => p.listOnHome !== false).slice(
    0,
    limit,
  );
}

export function getProject(slug: string): Project | undefined {
  return projectBySlug[slug];
}
