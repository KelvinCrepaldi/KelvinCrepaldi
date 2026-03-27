import { HomeHero } from "@/_components/HomeHero";
import { ProjectsSection } from "@/_components/ProjectsSection";
import { SkillsSection } from "@/_components/SkillsSection";
import { SystemLogsSection } from "@/_components/SystemLogsSection";
import { TimelineSection } from "@/_components/TimelineSection";
import { LazyRenderOnView } from "@/_components/_ui/LazyRenderOnView";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <LazyRenderOnView placeholderClassName="min-h-[70vh]">
        <ProjectsSection />
      </LazyRenderOnView>
      <LazyRenderOnView placeholderClassName="min-h-[60vh]">
        <TimelineSection />
      </LazyRenderOnView>
      <LazyRenderOnView placeholderClassName="min-h-[56vh]">
        <SkillsSection />
      </LazyRenderOnView>
      <LazyRenderOnView placeholderClassName="min-h-[52vh]">
        <SystemLogsSection />
      </LazyRenderOnView>
    </>
  );
}
