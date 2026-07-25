"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { useLocale } from "@/_components/i18n/locale-provider";
import { formatLogDate, resolveLog, type LogPost } from "@/_utils/logs";

import {
  TechHoverEffects,
  techHoverMotion,
} from "@/_components/_ui/animations/TechHoverEffects";
import { LogTag } from "./log-tag";

const MotionLink = motion.create(Link);

type LogCardProps = {
  log: LogPost;
};

export function LogCard({ log }: LogCardProps) {
  const { locale } = useLocale();
  const resolved = resolveLog(log, locale);

  return (
    <MotionLink
      href={`/log/${log.slug}`}
      className="group relative flex w-full flex-col gap-2.5 overflow-hidden border border-outline-variant/25 bg-surface px-4 py-3.5 text-left transition-[border-color,box-shadow] duration-150 ease-out hover:border-on-surface hover:shadow-[2px_2px_0_0_rgb(var(--on-surface)/0.35)] md:flex-row md:items-center md:gap-5 md:px-5 md:py-4"
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      variants={techHoverMotion}
      transition={{ duration: 0.08, ease: "linear" }}
    >
      <TechHoverEffects />

      <div className="relative z-[1] flex shrink-0 flex-row items-baseline gap-2 md:w-28 md:flex-col md:items-start md:gap-0.5 lg:w-32">
        <span className="text-[9px] font-bold tracking-widest text-terminal-accent/65">
          {log.logId}
        </span>
        <p className="font-mono text-[9px] uppercase tracking-wider text-terminal-accent/55">
          {formatLogDate(log.publishedAt, locale)}
        </p>
      </div>

      <div className="relative z-[1] min-w-0 flex-1">
        <h4 className="text-base font-bold uppercase leading-snug tracking-tight text-on-surface md:text-lg">
          {resolved.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-body text-on-surface/65 md:max-w-3xl">
          {resolved.excerpt}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {log.tags.map((tag) => (
            <LogTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      <motion.span
        className="relative z-[1] inline-flex shrink-0 self-start text-on-surface md:self-center"
        variants={{
          rest: { x: 0, y: 0 },
          hover: {
            x: [0, -1, 1, -1, 0],
            y: [0, -1, 1, -1, 0],
            transition: { duration: 0.22, times: [0, 0.25, 0.5, 0.75, 1] },
          },
          tap: { x: 0, y: 0 },
        }}
      >
        <ArrowUpRight
          className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100"
          strokeWidth={2}
        />
      </motion.span>
    </MotionLink>
  );
}
