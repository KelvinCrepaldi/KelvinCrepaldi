export function RegistrationMark() {
  return (
    <span className="relative block h-3 w-3 shrink-0 text-on-surface/35">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  );
}

export function CrosshairMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative block h-4 w-4 shrink-0 rounded-full border border-on-surface/30 ${className}`.trim()}
    >
      <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-on-surface/25" />
      <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-on-surface/25" />
    </span>
  );
}

export function PerforatedStrip({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="h-1 w-1 shrink-0 bg-on-surface/30" />
      ))}
    </div>
  );
}

type CornerBracketProps = {
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
};

export function CornerBracket({ corner, className = "" }: CornerBracketProps) {
  const borderClass =
    corner === "top-left"
      ? "border-l border-t"
      : corner === "top-right"
        ? "border-r border-t"
        : corner === "bottom-left"
          ? "border-l border-b"
          : "border-r border-b";

  return (
    <span
      className={`block h-6 w-6 shrink-0 border-on-surface/30 ${borderClass} ${className}`.trim()}
      aria-hidden
    />
  );
}
