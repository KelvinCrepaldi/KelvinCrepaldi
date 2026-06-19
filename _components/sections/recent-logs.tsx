"use client";

import Link from "next/link";
import { ArrowUpRight, NotebookPen } from "lucide-react";

import { useLogsCatalog } from "@/hooks/useLogsCatalog";
import { formatLogDate } from "@/_utils/logs";
import { SectionHeader } from "@/_components/_ui/SectionHeader";
import { AnimatedPrimaryButton } from "@/_components/_ui/animations/AnimatedPrimaryButton";

export function RecentLogs() {
  const logs = useLogsCatalog("latest", 5);
  const total = String(logs.length).padStart(3, "0");

  return (
    <section
      id="log"
      className="relative z-10 overflow-hidden border-t border-outline-variant/30 bg-surface px-6 md:px-12 pt-24 pb-36 md:pb-44"
    >
      <div className="w-full lg:max-w-6xl lg:mx-auto">
        <SectionHeader
          title="Anotações"
          subtitle="ANOTAÇÕES // blog com experiências e aprendizados do dia a dia"
          icon={NotebookPen}
          meta={`LATEST_ENTRIES: ${total}`}
        />

        <ul className="relative z-10 flex flex-col" role="list">
          {logs.map((log) => (
            <li key={log.slug}>
              <Link
                href={`/log/${log.slug}`}
                className="group block border-b border-outline-variant/15 py-3.5 transition-colors hover:border-outline-variant/35 md:py-4"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <p className="min-w-0 text-base font-bold uppercase leading-snug tracking-tight text-on-surface group-hover:underline md:text-lg">
                    {log.title}
                  </p>
                  <p className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-terminal-accent/60 md:text-right">
                    {log.logId}
                    <span className="mx-1.5 opacity-40">—</span>
                    <time dateTime={log.publishedAt.replace(/\./g, "-")}>
                      {formatLogDate(log.publishedAt)}
                    </time>
                  </p>
                </div>
                <p className="mt-1.5 line-clamp-2 text-body text-on-surface/60 md:mt-2 md:max-w-4xl">
                  {log.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-10 flex justify-center">
          <AnimatedPrimaryButton
            href="/log"
            icon={ArrowUpRight}
            variant="outline"
            className="justify-center px-8 py-3"
          >
            Ver mais
          </AnimatedPrimaryButton>
        </div>
      </div>
    </section>
  );
}
