import type { Metadata } from "next";

import { ArchivePageShell } from "@/_components/archive/archive-page-shell";
import { LogCard } from "@/_components/log/log-card";
import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import { publishedLogs } from "@/_utils/logs";
import { siteConfig } from "@/_utils/site";

const LOG_CONTENT_GUTTER = "px-6 md:px-10 lg:px-12 xl:px-14";

export const metadata: Metadata = {
  title: `Field_Logs // ${siteConfig.title}`,
  description:
    "Notas de campo, experiências e aprendizados — transmissões do dia a dia como desenvolvedor.",
  openGraph: {
    title: "Field_Logs",
    description:
      "Notas de campo, experiências e aprendizados — transmissões do dia a dia como desenvolvedor.",
    url: `${siteConfig.url}/log`,
    type: "website",
  },
};

export default function LogIndexPage() {
  const logs = publishedLogs();
  const total = String(logs.length).padStart(3, "0");

  return (
    <ArchivePageShell variant="logs">
      <header
        className={`border-b border-outline-variant/20 bg-surface pt-8 pb-10 md:pt-10 md:pb-12 ${LOG_CONTENT_GUTTER}`}
      >
        <div className="w-full max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <BlinkingDotRow count={4} size="sm" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-outline">
              FIELD_LOGS // TRANSMISSION_ARCHIVE
            </p>
          </div>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-on-surface md:text-6xl">
            Field_Logs
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-on-surface/75 md:text-base">
            Esta seção reúne notas de campo, experiências e reflexões do dia a
            dia como desenvolvedor — incidentes em produção, decisões de
            arquitetura, aprendizados em comunidade e tudo que não cabe num case
            de projeto, mas vale registrar.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-on-surface/45">
            TOTAL_ENTRIES: {total}
          </p>
        </div>
      </header>

      <div
        className={`flex flex-1 flex-col bg-surface-container-low/60 ${LOG_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
      >
        <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
          {logs.map((log) => (
            <LogCard key={log.slug} log={log} />
          ))}
        </div>
      </div>
    </ArchivePageShell>
  );
}
