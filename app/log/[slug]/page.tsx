import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchivePageShell } from "@/_components/archive/archive-page-shell";
import { LogDetailHeader } from "@/_components/log/log-detail-header";
import { MarkdownArticle } from "@/_components/project/markdown-article";
import { ScrollToTop } from "@/_components/_ui/ScrollToTop";
import { getDictionary } from "@/_i18n/get-dictionary";
import { getRequestLocale } from "@/_i18n/server-locale";
import { getLog, LOGS_CATALOG, resolveLog } from "@/_utils/logs";
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
  const locale = await getRequestLocale();
  const t = getDictionary(locale);
  if (!log) return { title: t.logs.fallbackTitle };
  const resolved = resolveLog(log, locale);
  return {
    title: `${resolved.title} // ${siteConfig.title}`,
    description: resolved.excerpt,
    openGraph: {
      title: resolved.title,
      description: resolved.excerpt,
      type: "article",
      url: `${siteConfig.url}/log/${slug}`,
    },
    twitter: {
      card: "summary",
      title: resolved.title,
      description: resolved.excerpt,
    },
  };
}

export default async function LogPage({ params }: PageProps) {
  const { slug } = await params;
  const log = getLog(slug);

  if (!log) notFound();

  const locale = await getRequestLocale();
  const resolved = resolveLog(log, locale);

  return (
    <ArchivePageShell variant="logs" currentSlug={slug}>
      <LogDetailHeader
        log={resolved}
        locale={locale}
        contentGutterClass={LOG_CONTENT_GUTTER}
      />
      <div
        className={`flex flex-1 flex-col bg-surface-container-low/60 ${LOG_CONTENT_GUTTER} py-12 md:py-14 lg:py-16`}
      >
        <div className="w-full max-w-3xl">
          <MarkdownArticle markdown={resolved.md} className="log-md" />
          <ScrollToTop />
        </div>
      </div>
    </ArchivePageShell>
  );
}
