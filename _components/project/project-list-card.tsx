"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { formatDotDate } from "@/_utils/dates";
import type { Project } from "@/_utils/projects";

import { ProjectTag } from "./project-tag";

const MotionLink = motion.create(Link);

type ProjectListCardProps = {
  project: Project;
};

export function ProjectListCard({ project }: ProjectListCardProps) {
  return (
    <MotionLink
      href={`/projects/${project.slug}`}
      className="card-scanlines group relative flex w-full flex-col gap-2.5 border border-outline-variant/25 bg-surface px-4 py-3.5 text-left transition-colors duration-300 hover:border-on-surface/50 md:flex-row md:items-center md:gap-5 md:px-5 md:py-4"
    >
      <div className="flex shrink-0 flex-row items-baseline gap-2 md:w-28 md:flex-col md:items-start md:gap-0.5 lg:w-32">
        <span className="text-[9px] font-bold tracking-widest text-terminal-accent/65">
          {project.vol}
        </span>
        <p className="font-mono text-[9px] uppercase tracking-wider text-terminal-accent/55">
          {formatDotDate(project.lastUpdate)}
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-base font-bold uppercase leading-snug tracking-tight text-on-surface md:text-lg">
          {project.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-body text-on-surface/65 md:max-w-3xl">
          {project.excerpt}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      <motion.span
        className="inline-flex shrink-0 self-start text-on-surface md:self-center"
        initial={false}
        whileHover={{ x: 3, y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <ArrowUpRight
          className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100"
          strokeWidth={2}
        />
      </motion.span>
    </MotionLink>
  );
}
