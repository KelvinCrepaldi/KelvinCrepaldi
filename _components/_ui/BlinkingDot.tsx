"use client";

import { motion } from "framer-motion";

type BlinkingDotProps = {
  className?: string;
  delay?: number;
  size?: "sm" | "md";
};

const sizeClass = { sm: "w-1 h-1", md: "w-2 h-2" };

export function BlinkingDot({
  className = "",
  delay = 0,
  size = "md",
}: BlinkingDotProps) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block shrink-0 bg-on-surface ${sizeClass[size]} ${className}`.trim()}
      animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.08, 1] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
