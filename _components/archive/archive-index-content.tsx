import { ArchiveIndexSection } from "./archive-index-section";
import { logArchiveEntries } from "./map-logs";
import { projectArchiveEntries } from "./map-projects";

type ArchiveIndexContentProps = {
  projectSlug?: string | null;
  logSlug?: string | null;
  onNavigate?: () => void;
  showProjects?: boolean;
  showLogs?: boolean;
};

export function ArchiveIndexContent({
  projectSlug = null,
  logSlug = null,
  onNavigate,
  showProjects = true,
  showLogs = true,
}: ArchiveIndexContentProps) {
  return (
    <>
      {showProjects ? (
        <ArchiveIndexSection
          title="ARCHIVE_INDEX // VOLUMES"
          subtitle="QUICK_LINK_PROTOCOL"
          footer=":: SELECT_ENTRY_TO_MOUNT_VOLUME"
          entries={projectArchiveEntries()}
          activeSlug={projectSlug}
          ariaLabel="Lista de projetos"
          onNavigate={onNavigate}
        />
      ) : null}

      {showLogs ? (
        <ArchiveIndexSection
          title="LOG_INDEX // ENTRIES"
          subtitle="CHRONO_LINK_PROTOCOL"
          footer=":: SELECT_ENTRY_TO_MOUNT_LOG"
          entries={logArchiveEntries()}
          activeSlug={logSlug}
          ariaLabel="Lista de logs"
          onNavigate={onNavigate}
          className={showProjects ? "mt-6 border-t-2 border-outline-variant/30 pt-2" : ""}
        />
      ) : null}
    </>
  );
}
