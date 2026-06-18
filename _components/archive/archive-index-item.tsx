import Link from "next/link";

import type { ArchiveEntry } from "./types";

type ArchiveIndexItemProps = {
  entry: ArchiveEntry;
  active?: boolean;
  onNavigate?: () => void;
};

export function ArchiveIndexItem({
  entry,
  active = false,
  onNavigate,
}: ArchiveIndexItemProps) {
  return (
    <Link
      href={entry.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex flex-col gap-0.5 border border-transparent px-3 py-2.5 transition-colors duration-200",
        active
          ? "border-on-surface bg-on-surface text-surface"
          : "text-on-surface hover:border-outline-variant/40 hover:bg-surface-container-high/80",
      ].join(" ")}
    >
      <span
        className={[
          "text-[9px] font-mono uppercase tracking-widest",
          active ? "text-surface/70" : "text-terminal-accent/70",
        ].join(" ")}
      >
        {entry.code}
      </span>
      <span className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-tight">
        {entry.title}
      </span>
      <span
        className={[
          "truncate font-mono text-[9px]",
          active ? "text-surface/55" : "text-on-surface/45",
        ].join(" ")}
      >
        {entry.meta}
      </span>
    </Link>
  );
}
