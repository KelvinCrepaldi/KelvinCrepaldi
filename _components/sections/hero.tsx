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
      className="relative overflow-hidden px-6 md:px-12 pt-16 pb-24 md:pt-32 md:pb-44"
    >
      <div className="w-full lg:max-w-6xl lg:mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <Intro />
        <TechStack items={DEFAULT_STACK} />
      </div>
    </section>
  );
}
