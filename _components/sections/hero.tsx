import { ScrollDownIndicator } from "@/_components/_ui/animations/ScrollDownIndicator";
import { TechnicalCornerMarks } from "@/_components/_ui/TechnicalCornerMarks";

import { Intro } from "./intro";
import { TechStack } from "./tech-stack";

const DEFAULT_STACK = [
  { label: "Next.js", index: "01" },
  { label: "React", index: "02" },
  { label: "TypeScript", index: "03" },
  { label: "Node.js", index: "04" },
  { label: "Supabase", index: "05" },
  { label: "Electron", index: "06" },
  { label: "Express", index: "07" },
  { label: "Docker", index: "08" },
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-var(--site-header-height))] flex-col overflow-hidden px-6 md:px-12 pt-16 pb-8 md:pt-32 md:pb-10"
    >
      <TechnicalCornerMarks />

      <div className="relative z-10 w-full flex-1 lg:mx-auto lg:max-w-content">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <Intro />
          <TechStack items={DEFAULT_STACK} />
        </div>
      </div>

      <div className="pointer-events-none relative z-10 flex shrink-0 justify-center pt-10 md:pt-12">
        <ScrollDownIndicator />
      </div>
    </section>
  );
}
