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
          ? "inline-flex animate-skill-chip-in items-center gap-1.5 border border-outline-variant/40 bg-surface-container px-2.5 py-1.5 font-mono text-sm font-bold uppercase tracking-tight text-on-surface opacity-0 transition-colors hover:border-on-surface/50 hover:bg-surface-container-high"
          : "inline-flex items-center gap-1.5 border border-transparent px-2.5 py-1.5 font-mono text-sm font-bold uppercase tracking-tight opacity-0"
      }
      style={visible ? { animationDelay: `${index * 40}ms` } : undefined}
    >
      {Icon ? (
        <Icon className="size-3.5 shrink-0 opacity-85 sm:size-4" aria-hidden />
      ) : null}
      {label}
    </span>
  );
}
