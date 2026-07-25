"use client";

import { ArchivePageShell } from "@/_components/archive/archive-page-shell";
import { ProjectListCard } from "@/_components/project/project-list-card";
import { ScrollToTop } from "@/_components/_ui/ScrollToTop";
import { useTranslations } from "@/_components/i18n/locale-provider";
import { publishedProjects } from "@/_utils/projects";

const PROJECT_CONTENT_GUTTER = "px-6 md:px-10 lg:px-12 xl:px-14";

export function ProjectsIndexContent() {
  const projects = publishedProjects();
  const total = String(projects.length).padStart(3, "0");
  const t = useTranslations();

  return (
    <ArchivePageShell variant="projects">
      <header
        className={`border-b border-outline-variant/20 bg-surface pt-8 pb-10 md:pt-10 md:pb-12 ${PROJECT_CONTENT_GUTTER}`}
      >
        <div className="w-full max-w-3xl">
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.4em] text-terminal-accent/90">
            {t.projectsPage.eyebrow}
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-on-surface md:text-6xl">
            {t.projectsPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-body text-on-surface/75">
            {t.projectsPage.intro}
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-terminal-accent/60">
            TOTAL_VOLUMES: {total}
          </p>
        </div>
      </header>

      <div
        className={`flex flex-1 flex-col bg-surface-container-low/60 ${PROJECT_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
      >
        <ul className="flex w-full flex-col gap-5" role="list">
          {projects.map((project) => (
            <li key={project.slug} className="w-full">
              <ProjectListCard project={project} />
            </li>
          ))}
        </ul>

        <ScrollToTop />
      </div>
    </ArchivePageShell>
  );
}
