"use client";

import { FolderKanban } from "lucide-react";

import { useIsMobileLayout } from "@/hooks/useIsMobileLayout";
import { useProjectsCatalog } from "@/hooks/useProjectsCatalog";
import { SectionHeader } from "@/_components/_ui/SectionHeader";
import {
  ClockCircleCanvas,
  ClockCirclesBackground,
} from "@/_components/_ui/animations/ClockCircles";
import { ProjectCard } from "@/_components/project/project-card";

export function Projects() {
  const isMobile = useIsMobileLayout();
  const projects = useProjectsCatalog("home");
  const total = String(projects.length).padStart(3, "0");

  return (
    <section
      className="relative z-10 overflow-hidden px-6 md:px-12 pt-24 pb-36 md:pb-44"
      id="projects"
    >
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
      <div className="w-full lg:max-w-content lg:mx-auto">
        <SectionHeader
          title="Projetos"
          subtitle="PROJETOS // cases e entregas selecionados da minha trajetória"
          icon={FolderKanban}
          meta={`TOTAL_RECORDS: ${total}`}
        />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
