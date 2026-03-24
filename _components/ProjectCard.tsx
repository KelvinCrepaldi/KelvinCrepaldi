"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { ProjectListItem } from "@/_utils/types";

import { BlinkingDot } from "./_ui/BlinkingDot";
import { ProjectTag } from "./ProjectTag";

const MotionLink = motion.create(Link);

type ProjectCardProps = {
  project: ProjectListItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <MotionLink
      href={`/projects/${project.slug}`}
      className="card-scanlines group relative bg-surface border border-outline-variant/25 p-6 flex flex-col min-h-[400px] text-left transition-colors duration-300 hover:border-on-surface/50"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <div className="flex justify-between items-start mb-8">
        <span className="text-[10px] font-bold tracking-widest opacity-40 inline-flex items-center gap-2 text-on-surface">
          <BlinkingDot size="sm" delay={0.2} className="opacity-60 bg-on-surface" />
          {project.vol}
        </span>
        <motion.span
          className="text-on-surface inline-flex"
          initial={false}
          whileHover={{ x: 3, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <ArrowUpRight
            className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity"
            strokeWidth={2}
          />
        </motion.span>
      </div>
      <div className="flex-grow">
        <h4 className="text-2xl font-bold uppercase mb-4 group-hover:italic transition-all text-on-surface">
          {project.title}
        </h4>
        <p className="text-sm text-on-surface/70 leading-relaxed mb-6">
          {project.excerpt}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} label={tag} />
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-outline-variant/15 text-[9px] font-mono opacity-40">
          LAST_STABLE_BUILD: {project.lastStableBuild}
        </div>
      </div>
    </MotionLink>
  );
}
