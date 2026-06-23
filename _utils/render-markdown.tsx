import * as jsxRuntime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { prettyCodeOptions } from "./markdown-rehype";

const production = {
  Fragment: jsxRuntime.Fragment,
  jsx: jsxRuntime.jsx,
  jsxs: jsxRuntime.jsxs,
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePrettyCode, prettyCodeOptions)
  .use(rehypeReact, production);

export async function renderMarkdown(markdown: string) {
  const file = await processor.process(markdown);
  return file.result;
}
