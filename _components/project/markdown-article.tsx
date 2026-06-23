import { renderMarkdown } from "@/_utils/render-markdown";

type MarkdownArticleProps = {
  markdown: string;
  className?: string;
};

export async function MarkdownArticle({
  markdown,
  className = "project-md",
}: MarkdownArticleProps) {
  const content = await renderMarkdown(markdown);

  return <article className={className}>{content}</article>;
}
