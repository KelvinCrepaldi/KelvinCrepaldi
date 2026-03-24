import fs from "fs";
import path from "path";
import matter from "gray-matter";

const EXPLANATIONS_DIR = path.join(
  process.cwd(),
  "_utils",
  "projects",
  "explanations",
);

export type ProjectExplanation = {
  content: string;
  data: Record<string, unknown>;
};

export function getProjectExplanation(slug: string): ProjectExplanation | null {
  const filePath = path.join(EXPLANATIONS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { content: content.trim(), data: data as Record<string, unknown> };
}
