"use client";

import { motion } from "framer-motion";

type AnimatedChevronStackProps = {
  direction?: "up" | "down";
  className?: string;
};

function ChevronIcon({
  direction,
  className = "",
}: {
  direction: "up" | "down";
  className?: string;
}) {
  const path =
    direction === "up" ? "M1 6.5L7 1.5L13 6.5" : "M1 1.5L7 6.5L13 1.5";

  return (
    <svg
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function AnimatedChevronStack({
  direction = "down",
  className = "",
}: AnimatedChevronStackProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${className}`.trim()}
      aria-hidden
    >
      {Array.from({ length: 3 }, (_, i) => {
        const delay = direction === "up" ? (2 - i) * 0.35 : i * 0.35;

        return (
          <motion.span
            key={i}
            className="inline-flex text-on-surface"
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.08, 1] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          >
            <ChevronIcon direction={direction} className="h-2 w-3.5" />
          </motion.span>
        );
      })}
    </div>
  );
}
