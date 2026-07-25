import piratesPunchMd from "@/_content/projects/pirates-punch.md";
import piratesPunchMdEn from "@/_content/projects/pirates-punch.en.md";
import defaultChatMd from "@/_content/projects/default-chat.md";
import defaultChatMdEn from "@/_content/projects/default-chat.en.md";
import leitorDeBoletoMd from "@/_content/projects/leitor-de-boleto.md";
import leitorDeBoletoMdEn from "@/_content/projects/leitor-de-boleto.en.md";

import type { Locale } from "@/_i18n/locales";
import { L, pickLocalized, type LocalizedText } from "@/_i18n/localize";

export type Project = {
  slug: string;
  vol: string;
  title: string;
  excerpt: LocalizedText;
  tags: string[];
  lastUpdate: string;
  sortOrder: number;
  /** Texto longo em Markdown (corpo da página do projeto) */
  md: LocalizedText;
  subtitle: LocalizedText;
  /** `false` = não entra na grelha da home */
  listOnHome?: boolean;
  /** Capa local em `/public` (ex.: `/projects/slug/cover.png`). Sem isso, usa Picsum. */
  cover?: string;
};

export type ResolvedProject = Omit<Project, "excerpt" | "md" | "subtitle"> & {
  excerpt: string;
  md: string;
  subtitle: string;
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

export function resolveProject(
  project: Project,
  locale: Locale,
): ResolvedProject {
  return {
    ...project,
    excerpt: pickLocalized(project.excerpt, locale),
    subtitle: pickLocalized(project.subtitle, locale),
    md: pickLocalized(project.md, locale),
  };
}

const unsorted: Project[] = [
  {
    slug: "pirates-punch",
    vol: "VOL_01",
    title: "Pirates_Punch",
    excerpt: L(
      "E-commerce full-stack com tema pirata: catálogo, auth JWT com cookies httpOnly, carrinho, checkout e perfil sobre API Express + PostgreSQL.",
      "Full-stack e-commerce with a pirate theme: catalog, JWT auth with httpOnly cookies, cart, checkout, and profile on an Express + PostgreSQL API.",
    ),
    tags: ["Next.js", "Express", "TypeORM", "PostgreSQL"],
    lastUpdate: "2026.07.01",
    sortOrder: 1,
    listOnHome: true,
    subtitle: L(
      "Loja full-stack com API REST, seed e fluxo até o pedido",
      "Full-stack store with REST API, seed data, and end-to-end order flow",
    ),
    cover: "/projects/pirates-punch/cover.png",
    md: L(piratesPunchMd, piratesPunchMdEn),
  },
  {
    slug: "default-chat",
    vol: "VOL_02",
    title: "Default_Chat",
    excerpt: L(
      "Chat em tempo real 1:1 e grupos públicos: amizades, Socket.io, NextAuth e PostgreSQL — demo local com Docker Compose.",
      "Real-time 1:1 chat and public groups: friendships, Socket.io, NextAuth, and PostgreSQL — local demo with Docker Compose.",
    ),
    tags: ["Next.js", "Socket.io", "NextAuth", "PostgreSQL"],
    lastUpdate: "2026.06.15",
    sortOrder: 2,
    listOnHome: true,
    subtitle: L(
      "Chat em tempo real com amigos e grupos públicos",
      "Real-time chat with friends and public groups",
    ),
    cover: "/projects/default-chat/cover.png",
    md: L(defaultChatMd, defaultChatMdEn),
  },
  {
    slug: "leitor-de-boleto",
    vol: "VOL_03",
    title: "Leitor_de_Boleto",
    excerpt: L(
      "API que valida linhas digitáveis FEBRABAN (título 47 e convênio 48), extrai código de barras, valor e vencimento — com Jest.",
      "API that validates FEBRABAN typed lines (47-digit bank slips and 48-digit collection bills), extracts barcode, amount, and due date — with Jest.",
    ),
    tags: ["Express", "TypeScript", "Jest", "FEBRABAN"],
    lastUpdate: "2026.05.20",
    sortOrder: 3,
    listOnHome: true,
    subtitle: L(
      "Validador de boletos no padrão brasileiro",
      "Brazilian boleto validator",
    ),
    cover: "/projects/leitor-de-boleto/cover.jpg",
    md: L(leitorDeBoletoMd, leitorDeBoletoMdEn),
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
