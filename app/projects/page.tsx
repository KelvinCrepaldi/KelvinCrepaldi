import type { Metadata } from "next";

import { ProjectsIndexContent } from "@/_components/project/projects-index-content";
import { siteConfig } from "@/_utils/site";

export const metadata: Metadata = {
  title: `Projetos // ${siteConfig.title}`,
  description:
    "Volumes de projetos — cases, experimentos e entregas documentadas com contexto técnico e decisões de arquitetura.",
  openGraph: {
    title: "Projetos",
    description:
      "Volumes de projetos — cases, experimentos e entregas documentadas com contexto técnico e decisões de arquitetura.",
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
};

export default function ProjectsIndexPage() {
  return <ProjectsIndexContent />;
}
