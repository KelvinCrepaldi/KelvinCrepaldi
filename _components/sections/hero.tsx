import { ScrollDownIndicator } from "@/_components/_ui/animations/ScrollDownIndicator";

import { Intro } from "./intro";
import { TechStack } from "./tech-stack";

const DEFAULT_STACK = [
  { label: "React", index: "01" },
  { label: "TypeScript", index: "02" },
  { label: "Next.js", index: "03" },
  { label: "Electron", index: "04" },
  { label: "Node.js", index: "05" },
  { label: "Express", index: "06" },
  { label: "Cursor", index: "07" },
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-var(--site-header-height))] flex-col overflow-hidden px-6 md:px-12 pt-16 pb-8 md:pt-32 md:pb-10"
    >
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
