import Link from "next/link";

import type { ProjectListItem } from "@/_utils/types";

/** Desktop: usa `--site-header-height` (igual ao <main> e ao SiteHeader). */
const SIDEBAR_DESKTOP_H =
  "lg:min-h-[calc(100dvh_-_var(--site-header-height))] lg:h-[calc(100dvh_-_var(--site-header-height))]";

type ProjectArchiveSidebarProps = {
  currentSlug: string;
  projects: ProjectListItem[];
};

export function ProjectArchiveSidebar({
  currentSlug,
  projects,
}: ProjectArchiveSidebarProps) {
  return (
    <aside
      className={`order-2 hidden w-full shrink-0 flex-col border-b-2 border-outline-variant/35 bg-on-surface/[0.04] lg:order-1 lg:flex lg:w-[min(17.5rem,100vw)] lg:border-b-0 lg:border-r-2 lg:pl-0 lg:pr-0 lg:pt-0 lg:sticky lg:top-[var(--site-header-height)] ${SIDEBAR_DESKTOP_H}`}
      aria-label="Índice de volumes"
    >
      <div className="shrink-0 border-b border-outline-variant/25 bg-surface-container-low/50 px-4 py-3">
        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-outline">
          ARCHIVE_INDEX // VOLUMES
        </p>
        <p className="mt-1 text-[10px] font-mono tracking-tight text-on-surface/45">
          QUICK_LINK_PROTOCOL
        </p>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-row gap-0.5 overflow-x-auto overscroll-y-contain p-2 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-3"
        aria-label="Lista de projetos"
      >
        {projects.map((p) => {
          const active = p.slug === currentSlug;
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
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
                {p.vol}
              </span>
              <span className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-tight">
                {p.title}
              </span>
              <span
                className={[
                  "truncate font-mono text-[9px]",
                  active ? "text-surface/55" : "text-on-surface/40",
                ].join(" ")}
              >
                [{p.slug}]
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden shrink-0 border-t border-outline-variant/20 px-3 py-2 lg:block">
        <p className="text-[8px] font-mono leading-relaxed text-on-surface/35">
          :: SELECT_ENTRY_TO_MOUNT_VOLUME
        </p>
      </div>
    </aside>
  );
}
