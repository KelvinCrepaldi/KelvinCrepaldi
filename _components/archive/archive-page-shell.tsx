import type { ReactNode } from "react";

import { ArchiveSidebar } from "./archive-sidebar";
import type { ArchiveSidebarVariant } from "./types";

type ArchivePageShellProps = {
  variant: ArchiveSidebarVariant;
  currentSlug?: string;
  children: ReactNode;
};

export function ArchivePageShell({
  variant,
  currentSlug,
  children,
}: ArchivePageShellProps) {
  return (
    <div className="relative z-10 md:min-h-[calc(100dvh-var(--site-header-height))]">
      <div className="flex w-full flex-col md:mx-auto md:min-h-[inherit] md:max-w-content md:flex-row md:items-stretch">
        <ArchiveSidebar variant={variant} currentSlug={currentSlug} />

        <div className="order-1 flex min-w-0 flex-1 flex-col text-left md:order-2">
          {children}
        </div>
      </div>
    </div>
  );
}
