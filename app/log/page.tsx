import type { Metadata } from "next";

import { LogsIndexContent } from "@/_components/log/logs-index-content";
import { siteConfig } from "@/_utils/site";

export const metadata: Metadata = {
  title: `Anotações // ${siteConfig.title}`,
  description:
    "Notas de campo, experiências e aprendizados — transmissões do dia a dia como desenvolvedor.",
  openGraph: {
    title: "Anotações",
    description:
      "Notas de campo, experiências e aprendizados — transmissões do dia a dia como desenvolvedor.",
    url: `${siteConfig.url}/log`,
    type: "website",
  },
};

export default function LogIndexPage() {
  return <LogsIndexContent />;
}
