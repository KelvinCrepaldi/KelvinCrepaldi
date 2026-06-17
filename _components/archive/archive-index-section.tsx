import { ArchiveIndexItem } from "./archive-index-item";
import type { ArchiveEntry } from "./types";

type ArchiveIndexSectionProps = {
  title: string;
  subtitle: string;
  footer?: string;
  entries: ArchiveEntry[];
  activeSlug?: string | null;
  ariaLabel: string;
  onNavigate?: () => void;
  className?: string;
};

export function ArchiveIndexSection({
  title,
  subtitle,
  footer,
  entries,
  activeSlug,
  ariaLabel,
  onNavigate,
  className = "",
}: ArchiveIndexSectionProps) {
  return (
    <section className={className}>
      <div className="mb-3 shrink-0 border-b border-outline-variant/25 bg-surface-container-low/82 px-4 py-3">
        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-outline">
          {title}
        </p>
        <p className="mt-1 text-[10px] font-mono tracking-tight text-on-surface/45">
          {subtitle}
        </p>
      </div>

      <nav
        className="flex flex-col gap-0.5 p-2"
        aria-label={ariaLabel}
      >
        {entries.map((entry) => (
          <ArchiveIndexItem
            key={entry.slug}
            entry={entry}
            active={activeSlug === entry.slug}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {footer ? (
        <p className="px-3 py-2 text-[8px] font-mono leading-relaxed text-on-surface/35">
          {footer}
        </p>
      ) : null}
    </section>
  );
}
