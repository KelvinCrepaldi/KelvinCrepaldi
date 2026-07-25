import type { ComponentType } from "react";

type SkillChipProps = {
  label: string;
  icon?: ComponentType<{ className?: string }>;
  index?: number;
  visible?: boolean;
};

export function SkillChip({
  label,
  icon: Icon,
  index = 0,
  visible = false,
}: SkillChipProps) {
  return (
    <span
      className={
        visible
          ? "inline-flex animate-skill-chip-in items-center gap-1 border border-outline-variant/35 bg-surface-container px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-tight text-on-surface opacity-0 transition-colors hover:border-on-surface/45 hover:bg-surface-container-high sm:text-xs"
          : "inline-flex items-center gap-1 border border-transparent px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-tight opacity-0 sm:text-xs"
      }
      style={visible ? { animationDelay: `${index * 12}ms` } : undefined}
    >
      {Icon ? (
        <Icon className="size-3 shrink-0 opacity-80" aria-hidden />
      ) : null}
      {label}
    </span>
  );
}
