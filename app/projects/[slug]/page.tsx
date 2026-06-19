import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchivePageShell } from "@/_components/archive/archive-page-shell";
import { ProjectDetailHeader } from "@/_components/project/detail-header";
import { MarkdownArticle } from "@/_components/project/markdown-article";
import { ScrollToTop } from "@/_components/_ui/ScrollToTop";
import { getProject, PROJECTS_CATALOG, projectCoverUrl } from "@/_utils/projects";
import { siteConfig } from "@/_utils/site";

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
  const cover = projectCoverUrl(slug, 1200, 630);
  return {
    title: `${project.title} // ${siteConfig.title}`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: "article",
      url: `${siteConfig.url}/projects/${slug}`,
      images: [{ url: cover, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [cover],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <ArchivePageShell variant="projects" currentSlug={slug}>
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
          <ScrollToTop />
        </div>
      </div>
    </ArchivePageShell>
  );
}
