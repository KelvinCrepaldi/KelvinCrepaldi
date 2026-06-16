import {
  Hero,
  Projects,
  RecentLogs,
  Skills,
  SystemLogs,
  Timeline,
} from "@/_components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <RecentLogs />
      <Timeline />
      <Skills />
      <SystemLogs />
    </>
  );
}
