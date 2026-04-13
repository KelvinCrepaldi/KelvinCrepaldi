import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectArchiveSidebar } from "@/_components/project/archive-sidebar";
import { ProjectDetailHeader } from "@/_components/project/detail-header";
import { MarkdownArticle } from "@/_components/project/markdown-article";
import { getProject, PROJECTS_CATALOG } from "@/_utils/projects";

const PROJECT_CONTENT_GUTTER = "px-6 md:px-10 lg:px-12 xl:px-14";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS_CATALOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projeto" };
  return {
    title: `${project.title} // KELVIN CREPALDI // DEV`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <div className="relative z-10 min-h-[calc(100dvh_-_var(--site-header-height))]">
      <div className="flex flex-col lg:flex-row lg:items-start w-full lg:max-w-6xl lg:mx-auto">
        <ProjectArchiveSidebar currentSlug={slug} projects={PROJECTS_CATALOG} />

        <div className="order-1 flex min-w-0 flex-1 flex-col text-left lg:order-2">
          <ProjectDetailHeader
            project={project}
            subtitle={project.subtitle}
            contentGutterClass={PROJECT_CONTENT_GUTTER}
          />
          <div
            className={`bg-surface-container-low/60 flex flex-1 flex-col ${PROJECT_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
          >
            <div className="w-full max-w-3xl">
              <MarkdownArticle markdown={project.md} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
