"use client";

import { motion } from "framer-motion";

type TechHoverEffectsProps = {
  /** full = cards; subtle = sidemenus (weaker scanlines/flash) */
  intensity?: "full" | "subtle";
};

const flashOpacity = {
  full: [0, 0.55, 0, 0.25, 0] as const,
  subtle: [0, 0.28, 0, 0.12, 0] as const,
};

export const techHoverMotion = {
  rest: { x: 0, y: 0 },
  hover: { x: 0, y: 0 },
  tap: { x: 1, y: 1 },
} as const;

/** Overlay CRT + cantos + flash. Parent precisa de `group`, `relative` e variants hover/tap/rest. */
export function TechHoverEffects({
  intensity = "full",
}: TechHoverEffectsProps) {
  const subtle = intensity === "subtle";
  const corner = subtle ? "h-1.5 w-1.5" : "h-2.5 w-2.5";
  const scanAlpha = subtle ? "0.04" : "0.08";
  const flashClass = subtle ? "bg-on-surface/5" : "bg-on-surface/10";

  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 z-[5] ${corner} border-l border-t border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 z-[5] ${corner} border-r border-t border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 left-0 z-[5] ${corner} border-b border-l border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 right-0 z-[5] ${corner} border-b border-r border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
      />

      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-200 motion-reduce:hidden max-md:hidden",
          subtle ? "group-hover:opacity-50" : "group-hover:opacity-100",
        ].join(" ")}
      >
        <span
          className="absolute inset-0 animate-[scanlines-down_0.45s_linear_infinite] bg-[length:100%_4px]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgb(var(--on-surface) / ${scanAlpha}) 2px, rgb(var(--on-surface) / ${scanAlpha}) 4px)`,
          }}
        />
      </span>

      <motion.span
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[4] ${flashClass}`}
        variants={{
          rest: { opacity: 0 },
          hover: {
            opacity: [...flashOpacity[intensity]],
            transition: { duration: 0.28, times: [0, 0.15, 0.35, 0.55, 1] },
          },
          tap: { opacity: subtle ? 0.08 : 0.15 },
        }}
      />
    </>
  );
}
