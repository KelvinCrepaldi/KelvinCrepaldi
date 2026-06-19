import {
  Hero,
  Projects,
  RecentLogs,
  Skills,
  SystemLogs,
  Timeline,
} from "@/_components/sections";
import { ScrollToTop } from "@/_components/_ui/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <RecentLogs />
      <Timeline />
      <Skills />
      <SystemLogs />
      <ScrollToTop variant="above-footer" />
    </>
  );
}
