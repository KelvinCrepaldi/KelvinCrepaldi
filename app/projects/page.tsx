import type { Metadata } from "next";

import { ArchivePageShell } from "@/_components/archive/archive-page-shell";
import { ProjectListCard } from "@/_components/project/project-list-card";
import { publishedProjects } from "@/_utils/projects";
import { siteConfig } from "@/_utils/site";

const PROJECT_CONTENT_GUTTER = "px-6 md:px-10 lg:px-12 xl:px-14";

export const metadata: Metadata = {
  title: `Projetos // ${siteConfig.title}`,
  description:
    "Volumes de projetos — cases, experimentos e entregas documentadas com contexto técnico e decisões de arquitetura.",
  openGraph: {
    title: "Projetos",
    description:
      "Volumes de projetos — cases, experimentos e entregas documentadas com contexto técnico e decisões de arquitetura.",
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
};

export default function ProjectsIndexPage() {
  const projects = publishedProjects();
  const total = String(projects.length).padStart(3, "0");

  return (
    <ArchivePageShell variant="projects">
      <header
        className={`border-b border-outline-variant/20 bg-surface pt-8 pb-10 md:pt-10 md:pb-12 ${PROJECT_CONTENT_GUTTER}`}
      >
        <div className="w-full max-w-3xl">
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.4em] text-terminal-accent/90">
            PROJETOS // VOLUME_INDEX
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-on-surface md:text-6xl">
            Projetos
          </h1>
          <p className="mt-6 max-w-2xl text-body text-on-surface/75">
            Esta seção reúne os volumes do portfólio — produtos entregues,
            experimentos e arquiteturas que merecem contexto além do card da home.
            Cada volume documenta stack, decisões e o que foi aprendido no
            caminho.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-terminal-accent/60">
            TOTAL_VOLUMES: {total}
          </p>
        </div>
      </header>

      <div
        className={`flex flex-1 flex-col bg-surface-container-low/60 ${PROJECT_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
      >
        <ul className="flex w-full flex-col gap-1" role="list">
          {projects.map((project) => (
            <li key={project.slug} className="w-full">
              <ProjectListCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </ArchivePageShell>
  );
}
