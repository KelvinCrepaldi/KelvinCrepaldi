"use client";

import { ArchiveIndexContent } from "@/_components/archive/archive-index-content";
import { useTranslations } from "@/_components/i18n/locale-provider";
import {
  getLogSlugFromPath,
  getProjectSlugFromPath,
} from "@/_utils/layout";

import { MobileDrawerShell } from "./mobile-drawer-shell";

type MobileArchiveDrawerProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileArchiveDrawer({
  open,
  pathname,
  onClose,
}: MobileArchiveDrawerProps) {
  const projectSlug = getProjectSlugFromPath(pathname);
  const logSlug = getLogSlugFromPath(pathname);
  const t = useTranslations();

  return (
    <MobileDrawerShell
      open={open}
      side="left"
      id="mobile-archive-drawer"
      titleId="mobile-archive-title"
      title="ARCHIVE_TERMINAL // INDEX"
      closeLabel={t.nav.closeArchive}
      onClose={onClose}
    >
      <ArchiveIndexContent
        projectSlug={projectSlug}
        logSlug={logSlug}
        onNavigate={onClose}
      />
    </MobileDrawerShell>
  );
}
