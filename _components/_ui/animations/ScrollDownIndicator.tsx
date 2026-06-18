"use client";

import { motion } from "framer-motion";

type ScrollDownIndicatorProps = {
  className?: string;
};

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M1 1.5L7 6.5L13 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ScrollDownIndicator({ className = "" }: ScrollDownIndicatorProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${className}`.trim()}
      aria-hidden
    >
      {Array.from({ length: 3 }, (_, i) => (
        <motion.span
          key={i}
          className="inline-flex text-on-surface"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.08, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        >
          <ChevronDownIcon className="h-2 w-3.5" />
        </motion.span>
      ))}
    </div>
  );
}
