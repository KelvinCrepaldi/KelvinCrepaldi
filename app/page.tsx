import { HomeHero } from "@/_components/HomeHero";
import { ProjectsSection } from "@/_components/ProjectsSection";
import { SystemLogsSection } from "@/_components/SystemLogsSection";
import { TimelineSection } from "@/_components/TimelineSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProjectsSection />
      <TimelineSection />
      <SystemLogsSection />
    </>
  );
}
