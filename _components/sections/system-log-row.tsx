import type { ReactNode } from "react";

type SystemLogRowProps = {
  level: ReactNode;
  time: string;
  message: ReactNode;
  tone?: "default" | "dark";
};

export function SystemLogRow({
  level,
  time,
  message,
  tone = "default",
}: SystemLogRowProps) {
  return (
    <div
      className={
        tone === "dark"
          ? "flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] font-mono leading-snug"
          : "flex items-start gap-3 text-[11px] font-mono leading-snug"
      }
    >
      <span className="shrink-0">{level}</span>
      <span
        className={
          tone === "dark"
            ? "text-white/35 shrink-0"
            : "text-on-surface/40 shrink-0"
        }
      >
        {time}
      </span>
      <span
        className={
          tone === "dark"
            ? "min-w-0 text-white/80 break-words"
            : "min-w-0 text-on-surface/80 break-words"
        }
      >
        {message}
      </span>
    </div>
  );
}
