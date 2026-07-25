import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";

const titleClassName =
  "min-w-0 text-left text-3xl font-black uppercase tracking-tighter text-on-surface md:text-5xl";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <header
      className={`relative z-10 mb-12 w-full md:mb-16 ${className}`.trim()}
    >
      <h3 className={titleClassName}>{title}</h3>
      <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-base text-on-surface/70 md:text-lg">
        <BlinkingDotRow count={3} size="sm" className="opacity-70" />
        {subtitle}
      </p>
    </header>
  );
}
