"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type AnimatedPrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  icon: LucideIcon;
  className?: string;
  variant?: "solid" | "outline";
};

const variantClass = {
  solid:
    "border-on-surface bg-on-surface text-surface hover:bg-surface hover:text-on-surface",
  outline:
    "border-on-surface bg-transparent text-on-surface hover:bg-on-surface hover:text-surface",
} as const;

export function AnimatedPrimaryButton({
  href,
  children,
  icon: Icon,
  className = "",
  variant = "solid",
}: AnimatedPrimaryButtonProps) {
  return (
    <motion.a
      href={href}
      className={`inline-flex items-center gap-2 border px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${variantClass[variant]} ${className}`.trim()}
      whileHover={{ scale: 1.03, boxShadow: "4px 4px 0 0 rgba(54, 51, 34, 0.2)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <motion.span
        aria-hidden
        className="inline-flex"
        whileHover={{ y: 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.span>
      {children}
    </motion.a>
  );
}
