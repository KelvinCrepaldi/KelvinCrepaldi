import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchivePageShell } from "@/_components/archive/archive-page-shell";
import { ProjectDetailHeader } from "@/_components/project/detail-header";
import { MarkdownArticle } from "@/_components/project/markdown-article";
import { ScrollToTop } from "@/_components/_ui/ScrollToTop";
import { getDictionary } from "@/_i18n/get-dictionary";
import { getRequestLocale } from "@/_i18n/server-locale";
import {
  getProject,
  PROJECTS_CATALOG,
  projectCoverUrl,
  resolveProject,
} from "@/_utils/projects";
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
  const locale = await getRequestLocale();
  const t = getDictionary(locale);
  if (!project) return { title: t.projects.fallbackTitle };
  const resolved = resolveProject(project, locale);
  const cover = projectCoverUrl(slug, 1200, 630);
  return {
    title: `${resolved.title} // ${siteConfig.title}`,
    description: resolved.excerpt,
    openGraph: {
      title: resolved.title,
      description: resolved.excerpt,
      type: "article",
      url: `${siteConfig.url}/projects/${slug}`,
      images: [{ url: cover, width: 1200, height: 630, alt: resolved.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.title,
      description: resolved.excerpt,
      images: [cover],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const locale = await getRequestLocale();
  const t = getDictionary(locale);
  const resolved = resolveProject(project, locale);

  return (
    <ArchivePageShell variant="projects" currentSlug={slug}>
      <ProjectDetailHeader
        project={resolved}
        subtitle={resolved.subtitle}
        coverAlt={t.projects.coverAlt.replace("{title}", resolved.title)}
        locale={locale}
        contentGutterClass={PROJECT_CONTENT_GUTTER}
      />
      <div
        className={`bg-surface-container-low/60 flex flex-1 flex-col ${PROJECT_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
      >
        <div className="w-full max-w-3xl">
          <MarkdownArticle markdown={resolved.md} />
          <ScrollToTop />
        </div>
      </div>
    </ArchivePageShell>
  );
}
