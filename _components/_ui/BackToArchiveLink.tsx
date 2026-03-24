"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const MotionLink = motion.create(Link);

export function BackToArchiveLink() {
  return (
    <MotionLink
      href="/#projects"
      className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-on-surface md:mb-9"
      whileHover={{ x: -5 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <motion.span
        aria-hidden
        animate={{ x: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2} />
      </motion.span>
      RETURN_TO_ARCHIVE
    </MotionLink>
  );
}
