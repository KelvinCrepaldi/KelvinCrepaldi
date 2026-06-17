import { ArchiveIndexContent } from "./archive-index-content";
import type { ArchiveSidebarVariant } from "./types";

const SIDEBAR_DESKTOP_H =
  "md:min-h-[calc(100dvh_-_var(--site-header-height))] md:h-[calc(100dvh_-_var(--site-header-height))]";

type ArchiveSidebarProps = {
  variant: ArchiveSidebarVariant;
  currentSlug?: string;
};

export function ArchiveSidebar({ variant, currentSlug }: ArchiveSidebarProps) {
  const projectSlug = variant === "projects" ? currentSlug : null;
  const logSlug = variant === "logs" ? currentSlug : null;

  return (
    <aside
      className={`order-2 hidden w-full shrink-0 flex-col border-b-2 border-outline-variant/35 bg-surface md:order-1 md:flex md:w-[min(17.5rem,100vw)] md:border-b-0 md:border-r-2 md:pl-0 md:pr-0 md:pt-0 md:sticky md:top-[var(--site-header-height)] ${SIDEBAR_DESKTOP_H}`}
      aria-label={variant === "projects" ? "Índice de volumes" : "Índice de logs"}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain md:pb-3">
        <ArchiveIndexContent
          projectSlug={projectSlug}
          showProjects={variant === "projects"}
          logSlug={logSlug}
          showLogs={variant === "logs"}
        />
      </div>
    </aside>
  );
}
