import type { MetadataRoute } from "next";

import { LOGS_CATALOG } from "@/_utils/logs";
import { parseDotDate } from "@/_utils/dates";
import { PROJECTS_CATALOG } from "@/_utils/projects";
import { siteConfig } from "@/_utils/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const projectEntries = PROJECTS_CATALOG.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: parseDotDate(project.lastUpdate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const logEntries = LOGS_CATALOG.map((log) => ({
    url: `${base}/log/${log.slug}`,
    lastModified: parseDotDate(log.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/log`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectEntries,
    ...logEntries,
  ];
}
