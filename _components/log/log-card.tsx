"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { formatLogDate, type LogPost } from "@/_utils/logs";

import { BlinkingDot } from "@/_components/_ui/animations/BlinkingDot";
import { LogTag } from "./log-tag";

const MotionLink = motion.create(Link);

type LogCardProps = {
  log: LogPost;
};

export function LogCard({ log }: LogCardProps) {
  return (
    <MotionLink
      href={`/log/${log.slug}`}
      className="card-scanlines group relative flex min-h-[220px] flex-col border border-outline-variant/25 bg-surface p-6 text-left transition-colors duration-300 hover:border-on-surface/50"
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-on-surface opacity-40">
          <BlinkingDot
            size="sm"
            delay={0.2}
            className="bg-on-surface opacity-60"
          />
          {log.logId}
        </span>
        <motion.span
          className="inline-flex shrink-0 text-on-surface"
          initial={false}
          whileHover={{ x: 3, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <ArrowUpRight
            className="h-5 w-5 opacity-40 transition-opacity group-hover:opacity-100"
            strokeWidth={2}
          />
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-on-surface/45">
          {formatLogDate(log.publishedAt)}
        </p>
        <h4 className="mb-3 text-xl font-bold uppercase leading-tight tracking-tight text-on-surface">
          {log.title}
        </h4>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-on-surface/70">
          {log.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {log.tags.map((tag) => (
            <LogTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </MotionLink>
  );
}
