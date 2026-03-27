import { HeroIntro } from "./HeroIntro";
import { TechStackPanel } from "./TechStackPanel";

const DEFAULT_STACK = [
  { label: "React", index: "01" },
  { label: "Next.js", index: "02" },
  { label: "TypeScript", index: "03" },
  { label: "Electron", index: "04" },
  { label: "Vite", index: "05" },
  { label: "Tailwind CSS", index: "06" },
  { label: "Node.js", index: "07" },
  { label: "Express", index: "08" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-16 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-8">
      <HeroIntro />
      <TechStackPanel items={DEFAULT_STACK} />
    </section>
  );
}
