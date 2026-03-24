import { LayoutGrid } from "lucide-react";

import { getAllProjects } from "@/_utils/load-projects";

import { BlinkingDotRow } from "./_ui/BlinkingDotRow";
import { ClockCirclesBackground } from "./_ui/ClockCirclesBackground";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const projects = getAllProjects();
  const total = String(projects.length).padStart(3, "0");

  return (
    <section
      className="relative z-10 overflow-hidden bg-surface-container-low/80 backdrop-blur-sm px-6 md:px-12 py-24"
      id="projects"
    >
      <ClockCirclesBackground />
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
