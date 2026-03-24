import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownArticle } from "@/_components/MarkdownArticle";
import { ProjectArchiveSidebar } from "@/_components/ProjectArchiveSidebar";
import { ProjectDetailHeader } from "@/_components/ProjectDetailHeader";
import { getProjectExplanation } from "@/_utils/load-explanation";
import {
  getAllProjectsForNav,
  getProjectBySlug,
} from "@/_utils/load-projects";

const PROJECT_CONTENT_GUTTER =
  "px-6 md:px-10 lg:px-12 xl:px-14";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectsForNav().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projeto" };
  return {
    title: `${project.title} // THE_ARCHIVIST`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const navProjects = getAllProjectsForNav();
  const explanation = getProjectExplanation(slug);
  const subtitle =
    typeof explanation?.data.subtitle === "string"
      ? explanation.data.subtitle
      : undefined;

  return (
    <div className="relative z-10 flex min-h-[calc(100dvh_-_var(--site-header-height))] flex-col bg-surface-container-low/82 backdrop-blur-sm lg:flex-row lg:items-start">
      <ProjectArchiveSidebar currentSlug={slug} projects={navProjects} />

      <div className="order-1 flex min-w-0 flex-1 flex-col text-left lg:order-2">
        <ProjectDetailHeader
          project={project}
          subtitle={subtitle}
          contentGutterClass={PROJECT_CONTENT_GUTTER}
        />
        <div
          className={`flex flex-1 flex-col ${PROJECT_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
        >
          <div className="w-full max-w-3xl">
            {explanation ? (
              <MarkdownArticle markdown={explanation.content} />
            ) : (
              <p className="text-sm font-mono opacity-60">
                NO_EXPLANATION_FILE_FOUND_FOR_SLUG: {slug}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
