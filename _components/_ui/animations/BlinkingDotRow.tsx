"use client";

import { BlinkingDot } from "./BlinkingDot";

type BlinkingDotRowProps = {
  count?: number;
  className?: string;
  size?: "sm" | "md";
};

export function BlinkingDotRow({
  count = 3,
  className = "",
  size = "sm",
}: BlinkingDotRowProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`.trim()}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <BlinkingDot key={i} delay={i * 0.35} size={size} />
      ))}
    </span>
  );
}
