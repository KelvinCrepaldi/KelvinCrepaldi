import type { LucideIcon } from "lucide-react";

import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";

const titleClassName =
  "min-w-0 flex-1 text-left text-4xl font-black uppercase tracking-tighter text-on-surface md:flex-none md:text-6xl";

const iconClassName =
  "h-10 w-10 shrink-0 text-on-surface opacity-20 md:h-12 md:w-12";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  meta?: string;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  meta,
  className = "",
}: SectionHeaderProps) {
  return (
    <header
      className={`relative z-10 mb-12 w-full md:mb-16 ${className}`.trim()}
    >
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full min-w-0 flex-1">
          <div className="flex w-full items-start justify-between gap-4">
            <h3 className={titleClassName}>{title}</h3>
            <Icon
              className={`${iconClassName} md:hidden`}
              strokeWidth={1.25}
              aria-hidden
            />
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-sm text-on-surface/70">
            <BlinkingDotRow count={3} size="sm" className="opacity-70" />
            {subtitle}
          </p>
          {meta ? (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-terminal-accent/60">
              {meta}
            </p>
          ) : null}
        </div>

        <div
          className="mb-4 hidden h-px flex-grow bg-outline-variant md:mx-8 md:block"
          aria-hidden
        />
        <Icon
          className={`${iconClassName} hidden shrink-0 md:block`}
          strokeWidth={1.25}
          aria-hidden
        />
      </div>
    </header>
  );
}
