import { HeroIntro } from "./HeroIntro";
import { TechStackPanel } from "./TechStackPanel";

const DEFAULT_STACK = [
  { label: "React", index: "01" },
  { label: "Vite", index: "02" },
  { label: "Next.js", index: "03" },
  { label: "Electron", index: "04" },
  { label: "Node.js", index: "05" },
  { label: "Express", index: "06" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-16 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-8">
      <HeroIntro />
      <TechStackPanel items={DEFAULT_STACK} />
    </section>
  );
}
