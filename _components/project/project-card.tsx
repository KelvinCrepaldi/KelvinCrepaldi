"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatDotDate } from "@/_utils/dates";
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
      className="group relative flex min-h-[400px] flex-col overflow-hidden border border-outline-variant/25 bg-surface text-left transition-[border-color,box-shadow] duration-150 ease-out hover:border-on-surface hover:shadow-[2px_2px_0_0_rgb(var(--on-surface)/0.35)]"
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      variants={{
        rest: { x: 0, y: 0 },
        hover: { x: 0, y: 0 },
        tap: { x: 1, y: 1 },
      }}
      transition={{ duration: 0.08, ease: "linear" }}
    >
      {/* Cantos técnicos */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[5] h-2.5 w-2.5 border-l border-t border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-[5] h-2.5 w-2.5 border-r border-t border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[5] h-2.5 w-2.5 border-b border-l border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-[5] h-2.5 w-2.5 border-b border-r border-on-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />

      {/* Scanlines CRT */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:hidden max-md:hidden"
      >
        <span className="absolute inset-0 animate-[scanlines-down_0.45s_linear_infinite] bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgb(var(--on-surface)/0.08)_2px,rgb(var(--on-surface)/0.08)_4px)] bg-[length:100%_4px]" />
      </span>

      {/* Flash de boot / glitch */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] bg-on-surface/10"
        variants={{
          rest: { opacity: 0 },
          hover: {
            opacity: [0, 0.55, 0, 0.25, 0],
            transition: { duration: 0.28, times: [0, 0.15, 0.35, 0.55, 1] },
          },
          tap: { opacity: 0.15 },
        }}
      />

      <div className="relative z-[1] aspect-video w-full shrink-0 overflow-hidden">
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
      <div className="relative z-[1] flex flex-1 flex-col p-6">
        <div className="mb-8 flex items-start justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-terminal-accent/65">
            <BlinkingDot
              size="sm"
              delay={0.2}
              className="bg-on-surface opacity-60"
            />
            {project.vol}
          </span>
          <motion.span
            className="inline-flex text-on-surface"
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
              className="h-5 w-5 opacity-40 transition-opacity group-hover:opacity-100"
              strokeWidth={2}
            />
          </motion.span>
        </div>
        <div className="flex-grow">
          <h4 className="mb-4 text-2xl font-bold uppercase text-on-surface transition-all">
            {project.title}
          </h4>
          <p className="mb-4 text-body text-on-surface/70">
            {project.excerpt}
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <ProjectTag key={tag} label={tag} />
            ))}
          </div>
          <div className="mt-6 border-t border-outline-variant/15 pt-2 font-mono text-[9px] text-terminal-accent/50">
            LAST_UPDATE: {formatDotDate(project.lastUpdate)}
          </div>
        </div>
      </div>
    </MotionLink>
  );
}
