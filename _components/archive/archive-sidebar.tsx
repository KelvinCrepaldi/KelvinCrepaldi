import { ArchiveIndexContent } from "./archive-index-content";
import type { ArchiveSidebarVariant } from "./types";

type ArchiveSidebarProps = {
  variant: ArchiveSidebarVariant;
  currentSlug?: string;
};

export function ArchiveSidebar({ variant, currentSlug }: ArchiveSidebarProps) {
  const projectSlug = variant === "projects" ? currentSlug : null;
  const logSlug = variant === "logs" ? currentSlug : null;

  return (
    <aside
      className="order-2 hidden w-full shrink-0 flex-col border-b-2 border-outline-variant/35 bg-surface md:order-1 md:flex md:w-[min(17.5rem,100vw)] md:self-start md:border-b-0 md:border-r-2 md:pl-0 md:pr-0 md:pt-0 md:sticky md:top-0"
      aria-label={variant === "projects" ? "Índice de volumes" : "Índice de logs"}
    >
      <div className="flex flex-col md:pb-3">
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
