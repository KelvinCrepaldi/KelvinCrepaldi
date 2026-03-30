"use client";

import { motion } from "framer-motion";

export function WaitingCursor() {
  return (
    <motion.span
      aria-hidden
      className="inline-block font-mono text-on-surface"
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut" }}
    >
      _
    </motion.span>
  );
}
