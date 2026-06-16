import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LogArchiveMobileNav } from "@/_components/log/log-archive-mobile-nav";
import { LogArchiveSidebar } from "@/_components/log/log-archive-sidebar";
import { LogDetailHeader } from "@/_components/log/log-detail-header";
import { MarkdownArticle } from "@/_components/project/markdown-article";
import { getLog, LOGS_CATALOG } from "@/_utils/logs";
import { siteConfig } from "@/_utils/site";

const LOG_CONTENT_GUTTER = "px-6 md:px-10 lg:px-12 xl:px-14";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LOGS_CATALOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const log = getLog(slug);
  if (!log) return { title: "Log" };
  return {
    title: `${log.title} // ${siteConfig.title}`,
    description: log.excerpt,
    openGraph: {
      title: log.title,
      description: log.excerpt,
      type: "article",
      url: `${siteConfig.url}/log/${slug}`,
    },
    twitter: {
      card: "summary",
      title: log.title,
      description: log.excerpt,
    },
  };
}

export default async function LogPage({ params }: PageProps) {
  const { slug } = await params;
  const log = getLog(slug);

  if (!log) notFound();

  return (
    <div className="relative z-10 min-h-[calc(100dvh_-_var(--site-header-height))]">
      <LogArchiveMobileNav currentSlug={slug} logs={LOGS_CATALOG} />
      <div className="flex w-full flex-col lg:max-w-6xl lg:mx-auto lg:flex-row lg:items-start">
        <LogArchiveSidebar currentSlug={slug} logs={LOGS_CATALOG} />

        <div className="order-1 flex min-w-0 flex-1 flex-col text-left lg:order-2">
          <LogDetailHeader
            log={log}
            contentGutterClass={LOG_CONTENT_GUTTER}
          />
          <div
            className={`flex flex-1 flex-col bg-surface-container-low/60 ${LOG_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
          >
            <div className="w-full max-w-3xl">
              <MarkdownArticle markdown={log.md} className="log-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
