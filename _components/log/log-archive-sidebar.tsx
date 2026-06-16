import Link from "next/link";

import { formatLogDate, type LogPost } from "@/_utils/logs";

const SIDEBAR_DESKTOP_H =
  "lg:min-h-[calc(100dvh_-_var(--site-header-height))] lg:h-[calc(100dvh_-_var(--site-header-height))]";

type LogArchiveSidebarProps = {
  currentSlug?: string;
  logs: LogPost[];
};

export function LogArchiveSidebar({
  currentSlug,
  logs,
}: LogArchiveSidebarProps) {
  return (
    <aside
      className={`order-2 hidden w-full shrink-0 flex-col border-b-2 border-outline-variant/35 bg-surface lg:order-1 lg:flex lg:w-[min(17.5rem,100vw)] lg:border-b-0 lg:border-r-2 lg:pl-0 lg:pr-0 lg:pt-0 lg:sticky lg:top-[var(--site-header-height)] ${SIDEBAR_DESKTOP_H}`}
      aria-label="Índice de logs"
    >
      <div className="shrink-0 border-b border-outline-variant/25 bg-surface-container-low/82 px-4 py-3">
        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-outline">
          LOG_INDEX // ENTRIES
        </p>
        <p className="mt-1 text-[10px] font-mono tracking-tight text-on-surface/45">
          CHRONO_LINK_PROTOCOL
        </p>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-row gap-0.5 overflow-x-auto overscroll-y-contain p-2 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-3"
        aria-label="Lista de logs"
      >
        {logs.map((log) => {
          const active = currentSlug === log.slug;
          return (
            <Link
              key={log.slug}
              href={`/log/${log.slug}`}
              aria-current={active ? "page" : undefined}
              className={[
                "group flex min-w-[10.5rem] flex-col gap-0.5 border border-transparent px-3 py-2.5 transition-colors duration-200 lg:min-w-0",
                active
                  ? "border-on-surface bg-on-surface text-surface"
                  : "text-on-surface hover:border-outline-variant/40 hover:bg-surface-container-high/80",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[9px] font-mono uppercase tracking-widest",
                  active ? "text-surface/70" : "text-outline",
                ].join(" ")}
              >
                {log.logId}
              </span>
              <span className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-tight">
                {log.title}
              </span>
              <span
                className={[
                  "truncate font-mono text-[9px]",
                  active ? "text-surface/55" : "text-on-surface/40",
                ].join(" ")}
              >
                {formatLogDate(log.publishedAt)}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden shrink-0 border-t border-outline-variant/20 px-3 py-2 lg:block">
        <p className="text-[8px] font-mono leading-relaxed text-on-surface/35">
          :: SELECT_ENTRY_TO_MOUNT_LOG
        </p>
      </div>
    </aside>
  );
}
