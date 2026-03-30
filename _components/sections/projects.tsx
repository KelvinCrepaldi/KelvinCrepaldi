"use client";

import { LayoutGrid } from "lucide-react";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";
import { homeProjects } from "@/_utils/projects";
import { BlinkingDotRow } from "@/_components/_ui/animations/BlinkingDotRow";
import {
  ClockCircleCanvas,
  ClockCirclesBackground,
} from "@/_components/_ui/animations/ClockCircles";
import { ProjectCard } from "@/_components/project/project-card";

export function Projects() {
  const isMobile = useIsMobileLayout();
  const projects = homeProjects();
  const total = String(projects.length).padStart(3, "0");

  return (
    <section
      className="relative z-10 overflow-hidden bg-surface-container-low/92 px-6 md:px-12 py-24"
      id="projects"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-surface/35"
        aria-hidden
      />
      {!isMobile && (
        <ClockCirclesBackground>
          <ClockCircleCanvas
            mode="random"
            radius={180}
            tickCount={200}
            tickLength={8}
            opacity={0.1}
            strokeWidth={1.5}
            delay={5}
            degrees={72}
            speed={4.5}
          />
          <ClockCircleCanvas
            mode="random"
            radius={123}
            tickCount={48}
            tickLength={8}
            opacity={0.1}
            delay={3}
            degrees={72}
            speed={2.5}
          />
          <ClockCircleCanvas
            mode="linear"
            radius={115}
            tickCount={200}
            tickLength={5}
            opacity={0.09}
            duration={300}
            direction={-1}
          />
        </ClockCirclesBackground>
      )}
      <div className="relative z-10 mb-16 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <BlinkingDotRow count={4} size="sm" className="mb-1" />
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-on-surface">
              Selected_Works
            </h3>
          </div>
          <p className="text-sm opacity-60 mt-2 font-mono flex items-center gap-2 flex-wrap">
            <BlinkingDotRow count={3} size="sm" className="opacity-70" />
            TOTAL_RECORDS: {total}
          </p>
        </div>
        <div className="h-px bg-outline-variant flex-grow mx-8 hidden md:block mb-4" />
        <LayoutGrid
          className="w-10 h-10 md:w-12 md:h-12 opacity-20 text-on-surface shrink-0"
          strokeWidth={1.25}
          aria-hidden
        />
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
