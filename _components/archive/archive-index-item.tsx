"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  TechHoverEffects,
  techHoverMotion,
} from "@/_components/_ui/animations/TechHoverEffects";
import type { ArchiveEntry } from "./types";

const MotionLink = motion.create(Link);

type ArchiveIndexItemProps = {
  entry: ArchiveEntry;
  active?: boolean;
  onNavigate?: () => void;
};

export function ArchiveIndexItem({
  entry,
  active = false,
  onNavigate,
}: ArchiveIndexItemProps) {
  return (
    <MotionLink
      href={entry.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={[
        "group relative flex flex-col gap-0.5 overflow-hidden border px-3 py-2.5 transition-[border-color,background-color,box-shadow,color] duration-150 ease-out",
        active
          ? "border-on-surface bg-on-surface text-surface"
          : "border-transparent text-on-surface hover:border-on-surface hover:shadow-[2px_2px_0_0_rgb(var(--on-surface)/0.2)]",
      ].join(" ")}
      whileHover={active ? undefined : "hover"}
      whileTap={active ? undefined : "tap"}
      initial="rest"
      variants={techHoverMotion}
      transition={{ duration: 0.08, ease: "linear" }}
    >
      {!active ? <TechHoverEffects intensity="subtle" /> : null}

      <span
        className={[
          "relative z-[1] text-[9px] font-mono uppercase tracking-widest",
          active ? "text-surface/70" : "text-terminal-accent/70",
        ].join(" ")}
      >
        {entry.code}
      </span>
      <span className="relative z-[1] line-clamp-2 text-xs font-bold uppercase leading-tight tracking-tight">
        {entry.title}
      </span>
      <span
        className={[
          "relative z-[1] truncate font-mono text-[9px]",
          active ? "text-surface/55" : "text-on-surface/45",
        ].join(" ")}
      >
        {entry.meta}
      </span>
    </MotionLink>
  );
}
