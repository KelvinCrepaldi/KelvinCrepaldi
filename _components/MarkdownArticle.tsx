import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownArticleProps = {
  markdown: string;
  className?: string;
};

export function MarkdownArticle({
  markdown,
  className = "project-md",
}: MarkdownArticleProps) {
  return (
    <article className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
