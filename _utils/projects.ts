import piratesPunchMd from "@/_content/projects/pirates-punch.md";
import defaultChatMd from "@/_content/projects/default-chat.md";
import leitorDeBoletoMd from "@/_content/projects/leitor-de-boleto.md";

export type Project = {
  slug: string;
  vol: string;
  title: string;
  excerpt: string;
  tags: string[];
  lastUpdate: string;
  sortOrder: number;
  /** Texto longo em Markdown (corpo da página do projeto) */
  md: string;
  subtitle: string;
  /** `false` = não entra na grelha da home */
  listOnHome?: boolean;
  /** Capa local em `/public` (ex.: `/projects/slug/cover.png`). Sem isso, usa Picsum. */
  cover?: string;
};

const PICSUM_BASE = "https://picsum.photos";

/**
 * Capa do projeto: path local (`cover`) ou placeholder Picsum estável por `slug`.
 * Mesma URL no card da home e no cabeçalho do detalhe — `width`/`height` só afetam o fallback Picsum.
 */
export function projectCoverUrl(
  slug: string,
  width = 1200,
  height = 675,
): string {
  const local = projectBySlug[slug]?.cover;
  if (local) return local;
  const safe = encodeURIComponent(slug);
  return `${PICSUM_BASE}/seed/${safe}/${width}/${height}`;
}

const unsorted: Project[] = [
  {
    slug: "pirates-punch",
    vol: "VOL_01",
    title: "Pirates_Punch",
    excerpt:
      "E-commerce full-stack com tema pirata: catálogo, auth JWT com cookies httpOnly, carrinho, checkout e perfil sobre API Express + PostgreSQL.",
    tags: ["Next.js", "Express", "TypeORM", "PostgreSQL"],
    lastUpdate: "2026.07.01",
    sortOrder: 1,
    listOnHome: true,
    subtitle: "Loja full-stack com API REST, seed e fluxo até o pedido",
    cover: "/projects/pirates-punch/cover.png",
    md: piratesPunchMd,
  },
  {
    slug: "default-chat",
    vol: "VOL_02",
    title: "Default_Chat",
    excerpt:
      "Chat em tempo real 1:1 e grupos públicos: amizades, Socket.io, NextAuth e PostgreSQL — demo local com Docker Compose.",
    tags: ["Next.js", "Socket.io", "NextAuth", "PostgreSQL"],
    lastUpdate: "2026.06.15",
    sortOrder: 2,
    listOnHome: true,
    subtitle: "Chat em tempo real com amigos e grupos públicos",
    cover: "/projects/default-chat/cover.png",
    md: defaultChatMd,
  },
  {
    slug: "leitor-de-boleto",
    vol: "VOL_03",
    title: "Leitor_de_Boleto",
    excerpt:
      "API que valida linhas digitáveis FEBRABAN (título 47 e convênio 48), extrai código de barras, valor e vencimento — com Jest.",
    tags: ["Express", "TypeScript", "Jest", "FEBRABAN"],
    lastUpdate: "2026.05.20",
    sortOrder: 3,
    listOnHome: true,
    subtitle: "Validador de boletos no padrão brasileiro",
    cover: "/projects/leitor-de-boleto/cover.jpg",
    md: leitorDeBoletoMd,
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

export function publishedProjects(): Project[] {
  return PROJECTS_CATALOG;
}
