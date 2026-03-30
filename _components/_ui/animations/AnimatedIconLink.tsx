"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type AnimatedIconLinkProps = {
  href: string;
  "aria-label": string;
  icon: LucideIcon;
};

export function AnimatedIconLink({
  href,
  "aria-label": ariaLabel,
  icon: Icon,
}: AnimatedIconLinkProps) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface bg-transparent hover:bg-on-surface hover:text-surface"
      whileHover={{
        scale: 1.08,
        rotate: -3,
        boxShadow: "3px 3px 0 0 rgba(54, 51, 34, 0.12)",
      }}
      whileTap={{ scale: 0.9, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <Icon className="w-4 h-4" strokeWidth={2} />
    </motion.a>
  );
}
