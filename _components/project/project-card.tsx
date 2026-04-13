"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { projectCoverUrl, type Project } from "@/_utils/projects";

import { BlinkingDot } from "@/_components/_ui/animations/BlinkingDot";
import { ProjectTag } from "./project-tag";

const MotionLink = motion.create(Link);

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const coverSrc = projectCoverUrl(project.slug, 960, 576);

  return (
    <MotionLink
      href={`/projects/${project.slug}`}
      className="card-scanlines group relative flex min-h-[400px] flex-col overflow-hidden border border-outline-variant/25 bg-surface text-left transition-colors duration-300 hover:border-on-surface/50"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden">
        <div className="absolute inset-y-0 left-[-9%] h-full w-[118%] translate-x-[5%] transition-transform duration-0 ease-linear will-change-transform group-hover:translate-x-[-6%] group-hover:duration-[10000ms] motion-reduce:translate-x-0 motion-reduce:group-hover:translate-x-0 motion-reduce:transition-none">
          <Image
            src={coverSrc}
            alt={`Capa do projeto ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
            priority={false}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-primary opacity-100 mix-blend-color transition-opacity duration-500 ease-out group-hover:opacity-0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/15 to-transparent transition-opacity duration-500 group-hover:via-surface/25"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.35)_2px,rgba(0,0,0,0.35)_3px)] opacity-[0.12] mix-blend-overlay transition-opacity duration-500 group-hover:opacity-[0.08]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-8 flex items-start justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-on-surface opacity-40">
            <BlinkingDot
              size="sm"
              delay={0.2}
              className="bg-on-surface opacity-60"
            />
            {project.vol}
          </span>
          <motion.span
            className="inline-flex text-on-surface"
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
        <div className="flex-grow">
          <h4 className="mb-4 text-2xl font-bold uppercase text-on-surface transition-all">
            {project.title}
          </h4>
          <p className="mb-4 text-sm leading-relaxed text-on-surface/70">
            {project.excerpt}
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <ProjectTag key={tag} label={tag} />
            ))}
          </div>
          <div className="mt-6 border-t border-outline-variant/15 pt-2 font-mono text-[9px] opacity-40">
            LAST_STABLE_BUILD: {project.lastStableBuild}
          </div>
        </div>
      </div>
    </MotionLink>
  );
}
