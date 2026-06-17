import offlineFirstSyncMd from "@/_content/logs/offline-first-sync.md";
import electronIpcMd from "@/_content/logs/electron-ipc-peripherals.md";
import firstIncidentMd from "@/_content/logs/first-production-incident.md";
import typescriptMigrationMd from "@/_content/logs/typescript-migration.md";
import curitibaMeetupMd from "@/_content/logs/curitiba-dev-meetup.md";

export type LogPost = {
  slug: string;
  logId: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  /** Texto longo em Markdown (corpo da página do log) */
  md: string;
  /** `true` = não entra no catálogo público */
  draft?: boolean;
};

const unsorted: LogPost[] = [
  {
    slug: "offline-first-sync",
    logId: "LOG_001",
    title: "Offline_First_Sync",
    excerpt:
      "Lições de sincronização offline em totens: filas idempotentes, checkpoints e o que aprendi quando o relógio do cliente mentiu.",
    publishedAt: "2025.06.14",
    tags: ["offline-first", "Electron", "totens"],
    md: offlineFirstSyncMd,
  },
  {
    slug: "electron-ipc-peripherals",
    logId: "LOG_002",
    title: "Electron_IPC_Peripherals",
    excerpt:
      "Como padronizamos IPC, preload e postMessage para impressoras e maquininhas sem virar um emaranhado de canais.",
    publishedAt: "2025.05.28",
    tags: ["Electron", "IPC", "hardware"],
    md: electronIpcMd,
  },
  {
    slug: "first-production-incident",
    logId: "LOG_003",
    title: "First_Production_Incident",
    excerpt:
      "Primeiro incidente sério em produção: cache, versão divergente e o post-mortem que mudou nosso checklist de deploy.",
    publishedAt: "2025.04.02",
    tags: ["produção", "deploy", "post-mortem"],
    md: firstIncidentMd,
  },
  {
    slug: "typescript-migration",
    logId: "LOG_004",
    title: "TypeScript_Migration",
    excerpt:
      "Migração gradual de JS para TS em monorepo: onde começar, o que tipar primeiro e por que strict pode esperar.",
    publishedAt: "2025.02.18",
    tags: ["TypeScript", "arquitetura", "DX"],
    md: typescriptMigrationMd,
  },
  {
    slug: "curitiba-dev-meetup",
    logId: "LOG_005",
    title: "Curitiba_Dev_Meetup",
    excerpt:
      "Notas de um meetup local em Curitiba — comunidade, CI com orçamento zero e por que ainda vale ir presencialmente.",
    publishedAt: "2025.01.09",
    tags: ["comunidade", "carreira", "Curitiba"],
    md: curitibaMeetupMd,
  },
];

const TEST_LOG_COUNT = 15;

const testLogs: LogPost[] = Array.from({ length: TEST_LOG_COUNT }, (_, i) => {
  const n = i + 6;
  const padded = String(n).padStart(3, "0");
  const slug = `test-log-${padded}`;

  return {
    slug,
    logId: `LOG_${padded}`,
    title: `Test_Log_${padded}`,
    excerpt: `Entrada de teste ${padded} para validar scroll do índice lateral de logs.`,
    publishedAt: `2024.${String(Math.max(1, 12 - Math.floor(i / 2))).padStart(2, "0")}.${String((i % 28) + 1).padStart(2, "0")}`,
    tags: ["test", "scroll"],
    md: `# Test Log ${padded}\n\nConteúdo placeholder para teste de scroll no sidebar.`,
  };
});

function parsePublishedAt(date: string): number {
  return new Date(date.replace(/\./g, "-")).getTime();
}

/** Catálogo ordenado por data de publicação (mais recente primeiro). */
export const LOGS_CATALOG = [...unsorted, ...testLogs]
  .filter((p) => p.draft !== true)
  .sort((a, b) => parsePublishedAt(b.publishedAt) - parsePublishedAt(a.publishedAt));

export const logBySlug = Object.fromEntries(
  LOGS_CATALOG.map((p) => [p.slug, p]),
) as Record<string, LogPost>;

export function publishedLogs(): LogPost[] {
  return LOGS_CATALOG;
}

export function latestLogs(count = 5): LogPost[] {
  return LOGS_CATALOG.slice(0, count);
}

export function getLog(slug: string): LogPost | undefined {
  return logBySlug[slug];
}

export function formatLogDate(publishedAt: string): string {
  const [year, month, day] = publishedAt.split(".");
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const m = months[parseInt(month, 10) - 1] ?? month;
  return `${day} ${m} ${year}`;
}
