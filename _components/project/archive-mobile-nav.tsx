import Link from "next/link";

import type { Project } from "@/_utils/projects";

type ProjectArchiveMobileNavProps = {
  currentSlug: string;
  projects: Project[];
};

export function ProjectArchiveMobileNav({
  currentSlug,
  projects,
}: ProjectArchiveMobileNavProps) {
  return (
    <nav
      className="order-0 flex w-full flex-col border-b-2 border-outline-variant/35 bg-surface lg:hidden"
      aria-label="Índice de volumes"
    >
      <div className="shrink-0 border-b border-outline-variant/25 bg-surface-container-low/82 px-4 py-2.5">
        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-outline">
          ARCHIVE_INDEX // VOLUMES
        </p>
      </div>
      <div className="flex gap-1 overflow-x-auto overscroll-x-contain p-2">
        {projects.map((p) => {
          const active = p.slug === currentSlug;
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={[
                "flex min-w-[9.5rem] shrink-0 flex-col gap-0.5 border px-3 py-2 transition-colors duration-200",
                active
                  ? "border-on-surface bg-on-surface text-surface"
                  : "border-outline-variant/25 text-on-surface hover:border-outline-variant/40 hover:bg-surface-container-high/80",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={[
                  "text-[9px] font-mono uppercase tracking-widest",
                  active ? "text-surface/70" : "text-outline",
                ].join(" ")}
              >
                {p.vol}
              </span>
              <span className="line-clamp-1 text-xs font-bold uppercase leading-tight tracking-tight">
                {p.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
